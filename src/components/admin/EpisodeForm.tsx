import { useEffect, useRef, useState } from "react";
import { adminApi } from "@/lib/adminApi";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, GripVertical, ChevronUp, ChevronDown, Info } from "lucide-react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// ── Inline Hint ──
const FieldHint = ({ children }: { children: React.ReactNode }) => (
  <p className="flex items-start gap-1.5 mt-1 text-[11px] leading-snug text-muted-foreground/70">
    <Info className="h-3 w-3 mt-px shrink-0 text-muted-foreground/50" />
    <span>{children}</span>
  </p>
);

interface Props {
  episodeId?: string;
  onDone: () => void;
}

interface Host {
  id: string;
  name: string;
}

interface Newsletter {
  title: string;
  url: string;
  source?: string;
}

const EMPTY = {
  slug: "", title: "", subtitle: "", episode_number: 0,
  description: "", full_description: "", duration: "",
  guest_name: "", guest_title: "", guest_company: "", guest_company_domain: "",
  guest_bio: "", guest_image_url: "", guest_linkedin_url: "",
  poster_image_url: "", og_image_url: "", preview_video_url: "",
  apple_url: "", spotify_url: "", youtube_url: "",
  status: "draft" as "published" | "upcoming" | "draft" | "deleted",
  publish_date: "",
  topics: [] as string[], pull_quote: "", pull_quote_attribution: "",
};

// ── Sortable Topic Item ──
const SortableTopicItem = ({ id, topic, index, total, onRemove, onMove }: {
  id: string; topic: string; index: number; total: number;
  onRemove: (i: number) => void; onMove: (i: number, dir: -1 | 1) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1, zIndex: isDragging ? 10 : undefined };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2 py-1.5 px-3 rounded-xl bg-white/30 border border-white/20 group">
      <button type="button" {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing touch-none p-0.5 text-muted-foreground/50 hover:text-muted-foreground shrink-0">
        <GripVertical className="h-3.5 w-3.5" />
      </button>
      <span className="text-body-sm text-foreground flex-1">{topic}</span>
      <div className="flex items-center gap-0.5 shrink-0">
        <button type="button" onClick={() => onMove(index, -1)} disabled={index === 0} className="p-0.5 rounded text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">
          <ChevronUp className="h-3.5 w-3.5" />
        </button>
        <button type="button" onClick={() => onMove(index, 1)} disabled={index === total - 1} className="p-0.5 rounded text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
        <button type="button" onClick={() => onRemove(index)} className="p-0.5 rounded text-destructive hover:text-destructive/80 transition-colors ml-1">×</button>
      </div>
    </div>
  );
};

// ── Sortable Topic List ──
const SortableTopicList = ({ topics, onReorder, onRemove, onMove }: {
  topics: string[]; onReorder: (t: string[]) => void;
  onRemove: (i: number) => void; onMove: (i: number, dir: -1 | 1) => void;
}) => {
  const ids = topics.map((_, i) => `topic-${i}`);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = ids.indexOf(active.id as string);
    const newIndex = ids.indexOf(over.id as string);
    onReorder(arrayMove(topics, oldIndex, newIndex));
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <div className="space-y-1">
          {topics.map((t, i) => (
            <SortableTopicItem key={`topic-${i}`} id={`topic-${i}`} topic={t} index={i} total={topics.length} onRemove={onRemove} onMove={onMove} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

// ── Glass Section Container ──
const GlassSection = ({ label, number, children }: { label: string; number: number; children: React.ReactNode }) => (
  <div className="rounded-2xl border border-white/20 bg-white/30 backdrop-blur-sm shadow-glass overflow-hidden">
    <div className="flex items-center gap-3 px-5 py-3 border-b border-white/15 bg-white/20">
      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-foreground/[0.08] text-[11px] font-semibold text-muted-foreground">{number}</span>
      <h3 className="text-body-sm font-semibold text-foreground tracking-wide uppercase">{label}</h3>
    </div>
    <div className="p-5 space-y-4">
      {children}
    </div>
  </div>
);

const EpisodeForm = ({ episodeId, onDone }: Props) => {
  const [form, setForm] = useState(EMPTY);
  const [topicInput, setTopicInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [allHosts, setAllHosts] = useState<Host[]>([]);
  const [selectedHostIds, setSelectedHostIds] = useState<string[]>([]);
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [nlForm, setNlForm] = useState({ title: "", url: "" });

  useEffect(() => {
    adminApi("list-hosts").then((res) => setAllHosts(res.data || [])).catch(() => {});

    if (!episodeId) return;
    const load = async () => {
      try {
        const [epResult, hostsResult, nlResult] = await Promise.all([
          adminApi("get-episode", { id: episodeId }),
          adminApi("get-episode-hosts", { episode_id: episodeId }),
          adminApi("get-newsletters", { episode_id: episodeId }),
        ]);
        const data = epResult.data;
        if (!data) { toast.error("Failed to load"); onDone(); return; }
        setForm({
          slug: data.slug || "",
          title: data.title || "",
          subtitle: data.subtitle || "",
          episode_number: data.episode_number || 0,
          description: data.description || "",
          full_description: data.full_description || "",
          duration: data.duration || "",
          guest_name: data.guest_name || "",
          guest_title: data.guest_title || "",
          guest_company: data.guest_company || "",
          guest_company_domain: data.guest_company_domain || "",
          guest_bio: data.guest_bio || "",
          guest_image_url: data.guest_image_url || "",
          guest_linkedin_url: data.guest_linkedin_url || "",
          poster_image_url: data.poster_image_url || "",
          og_image_url: data.og_image_url || "",
          preview_video_url: data.preview_video_url || "",
          apple_url: data.apple_url || "",
          spotify_url: data.spotify_url || "",
          youtube_url: data.youtube_url || "",
          status: data.status || "draft",
          publish_date: data.publish_date || "",
          topics: (data.topics as string[]) || [],
          pull_quote: data.pull_quote || "",
          pull_quote_attribution: data.pull_quote_attribution || "",
        });
        setSelectedHostIds(hostsResult.data || []);
        setNewsletters((nlResult.data || []).map((n: Newsletter & { id?: string }) => ({ title: n.title, url: n.url, source: n.source })));
      } catch {
        toast.error("Failed to load episode");
        onDone();
      }
    };
    load();
  }, [episodeId]);

  const set = (key: string, value: unknown) => setForm((f) => ({ ...f, [key]: value }));

  const toggleHost = (hostId: string) => {
    setSelectedHostIds((prev) =>
      prev.includes(hostId) ? prev.filter((id) => id !== hostId) : [...prev, hostId]
    );
  };

  const handleSave = async () => {
    if (!form.slug || !form.title) { toast.error("Slug and title are required"); return; }
    setSaving(true);
    const payload: Record<string, unknown> = {
      slug: form.slug,
      title: form.title,
      subtitle: form.subtitle || null,
      episode_number: form.episode_number || null,
      description: form.description || null,
      full_description: form.full_description || null,
      duration: form.duration || null,
      guest_name: form.guest_name || null,
      guest_title: form.guest_title || null,
      guest_company: form.guest_company || null,
      guest_company_domain: form.guest_company_domain || null,
      guest_bio: form.guest_bio || null,
      guest_image_url: form.guest_image_url || null,
      guest_linkedin_url: form.guest_linkedin_url || null,
      poster_image_url: form.poster_image_url || null,
      og_image_url: form.og_image_url || null,
      preview_video_url: form.preview_video_url || null,
      apple_url: form.apple_url || null,
      spotify_url: form.spotify_url || null,
      youtube_url: form.youtube_url || null,
      published: form.status === 'published',
      status: form.status,
      publish_date: form.publish_date || null,
      topics: form.topics,
      pull_quote: form.pull_quote || null,
      pull_quote_attribution: form.pull_quote_attribution || null,
    };
    if (episodeId) payload.id = episodeId;

    try {
      const result = await adminApi("upsert-episode", payload);
      const savedId = episodeId || result.data?.id;
      if (savedId) {
        await Promise.all([
          adminApi("set-episode-hosts", { episode_id: savedId, host_ids: selectedHostIds }),
          adminApi("set-newsletters", { episode_id: savedId, newsletters }),
        ]);
      }
      toast.success(episodeId ? "Updated" : "Created");
      onDone();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    }
    setSaving(false);
  };

  const addTopic = () => {
    if (!topicInput.trim()) return;
    set("topics", [...form.topics, topicInput.trim()]);
    setTopicInput("");
  };

  const removeTopic = (i: number) => set("topics", form.topics.filter((_, idx) => idx !== i));

  const moveTopic = (i: number, dir: -1 | 1) => {
    const next = i + dir;
    if (next < 0 || next >= form.topics.length) return;
    const updated = [...form.topics];
    [updated[i], updated[next]] = [updated[next], updated[i]];
    set("topics", updated);
  };

  const addNewsletter = () => {
    if (!nlForm.title.trim() || !nlForm.url.trim()) return;
    setNewsletters((prev) => [...prev, { title: nlForm.title.trim(), url: nlForm.url.trim() }]);
    setNlForm({ title: "", url: "" });
  };

  const removeNewsletter = (i: number) => setNewsletters((prev) => prev.filter((_, idx) => idx !== i));

  const [uploading, setUploading] = useState<string | null>(null);
  const posterFileRef = useRef<HTMLInputElement>(null);
  const ogFileRef = useRef<HTMLInputElement>(null);
  const guestFileRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (file: File, fieldKey: string) => {
    if (!file.type.startsWith("image/")) { toast.error("Please select an image file"); return; }
    setUploading(fieldKey);
    const ext = file.name.split(".").pop();
    const path = `${form.slug || "untitled"}/${fieldKey}-${Date.now()}.${ext}`;
    try {
      const { error } = await supabase.storage.from("episode-images").upload(path, file, { upsert: true });
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from("episode-images").getPublicUrl(path);
      set(fieldKey, publicUrl);
      toast.success("Image uploaded");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    }
    setUploading(null);
  };

  const fieldClass = "w-full px-4 py-3 rounded-xl border border-white/30 bg-muted/60 backdrop-blur-sm text-foreground text-body-sm focus:ring-2 focus:ring-primary/30 focus:border-primary/50 outline-none transition-all";
  const labelClass = "text-body-sm font-medium text-muted-foreground";

  const groupDivider = (
    <div className="flex items-center gap-4 py-1">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-section-header font-medium text-foreground">{episodeId ? "Edit Episode" : "New Episode"}</h2>
        <button onClick={onDone} className="text-body-sm text-muted-foreground hover:text-foreground">← Back</button>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* ── 1. Header ── */}
        <GlassSection label="Header" number={1}>
          <div className="space-y-2">
            <label className={labelClass}>Status</label>
            <div className="flex gap-2">
              {([
                { value: "draft", label: "Draft", color: "bg-white/40 text-muted-foreground border-white/30" },
                { value: "upcoming", label: "Upcoming", color: "bg-amber-50 text-amber-700 border-amber-200" },
                { value: "published", label: "Published", color: "bg-green-50 text-green-700 border-green-200" },
                { value: "deleted", label: "Deleted", color: "bg-red-50 text-destructive border-red-200" },
              ] as const).map(({ value, label, color }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => set("status", value)}
                  className={`px-4 py-2 rounded-xl text-body-sm font-medium border transition-all ${
                    form.status === value
                      ? `${color} ring-2 ring-offset-1 ring-foreground/20`
                      : "bg-white/20 text-muted-foreground border-white/20 hover:border-white/40 opacity-60"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {form.status === 'upcoming' ? 'Card on homepage, no detail page' :
               form.status === 'published' ? 'Full detail page with video' :
               form.status === 'draft' ? 'Not visible on site' : 'Soft-deleted'}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className={labelClass}>Slug *</label>
              <input className={fieldClass} value={form.slug} onChange={(e) => set("slug", e.target.value)} />
              <FieldHint>URL-safe identifier — e.g. "sara-varni". Cannot be changed after publish.</FieldHint>
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Episode #</label>
              <input className={fieldClass} type="number" value={form.episode_number} onChange={(e) => set("episode_number", parseInt(e.target.value) || 0)} />
              <FieldHint>Sequential number shown on cards and detail pages</FieldHint>
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Duration</label>
              <input className={fieldClass} value={form.duration} onChange={(e) => set("duration", e.target.value)} placeholder="e.g. 52 min" />
              <FieldHint>Approximate length — displayed on episode cards</FieldHint>
            </div>
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Title *</label>
            <input className={fieldClass} value={form.title} onChange={(e) => set("title", e.target.value)} />
            <FieldHint>Guest name or episode name — shown as the page heading</FieldHint>
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Overview (Subtitle)</label>
            <input className={fieldClass} value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} />
            <FieldHint>One-line hook shown on cards and as the hero headline</FieldHint>
          </div>
        </GlassSection>

        {/* ── 2. Video ── */}
        <GlassSection label="Video" number={2}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className={labelClass}>YouTube URL</label>
              <input className={fieldClass} value={form.youtube_url} onChange={(e) => set("youtube_url", e.target.value)} />
              <FieldHint>Full YouTube video URL — used for the embedded player</FieldHint>
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Spotify URL</label>
              <input className={fieldClass} value={form.spotify_url} onChange={(e) => set("spotify_url", e.target.value)} />
              <FieldHint>Spotify episode link — powers the "Listen on Spotify" button</FieldHint>
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Apple Podcasts URL</label>
              <input className={fieldClass} value={form.apple_url} onChange={(e) => set("apple_url", e.target.value)} />
              <FieldHint>Apple Podcasts link — powers the "Listen on Apple" button</FieldHint>
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Preview Video URL</label>
              <input className={fieldClass} value={form.preview_video_url} onChange={(e) => set("preview_video_url", e.target.value)} />
              <FieldHint>Short teaser clip — autoplays on the episode card hover</FieldHint>
            </div>
          </div>
        </GlassSection>

        {/* ── 3. About this Episode ── */}
        <GlassSection label="About this Episode" number={3}>
          <div className="space-y-1">
            <label className={labelClass}>Short Description</label>
            <textarea className={`${fieldClass} min-h-[80px]`} value={form.description} onChange={(e) => set("description", e.target.value)} />
            <FieldHint>Used for SEO meta description and card previews — keep under 160 characters</FieldHint>
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Full Description</label>
            <textarea className={`${fieldClass} min-h-[160px]`} value={form.full_description} onChange={(e) => set("full_description", e.target.value)} />
            <FieldHint>Long-form "About this Episode" section on the detail page</FieldHint>
          </div>
        </GlassSection>

        {/* ── 4. Quote ── */}
        <GlassSection label="Quote" number={4}>
          <div className="space-y-1">
            <textarea className={`${fieldClass} min-h-[80px]`} value={form.pull_quote} onChange={(e) => set("pull_quote", e.target.value)} placeholder="A memorable quote from the episode…" />
            <FieldHint>Highlighted quote shown in a large callout on the detail page</FieldHint>
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Attribution</label>
            <select className={fieldClass} value={form.pull_quote_attribution} onChange={(e) => set("pull_quote_attribution", e.target.value)}>
              <option value="">Select speaker…</option>
              {form.guest_name && <option value={form.guest_name}>{form.guest_name} (Guest)</option>}
              {allHosts.map((h) => (
                <option key={h.id} value={h.name}>{h.name} (Host)</option>
              ))}
            </select>
            <FieldHint>Who said the quote — appears below the pull quote</FieldHint>
          </div>
        </GlassSection>

        {/* ── 5. Topics Covered ── */}
        <GlassSection label="Topics Covered" number={5}>
          <div className="flex gap-2">
            <input className={fieldClass} value={topicInput} onChange={(e) => setTopicInput(e.target.value)} placeholder="Add a topic" onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTopic())} />
            <button type="button" onClick={addTopic} className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-body-sm whitespace-nowrap">Add</button>
          </div>
          <FieldHint>Key themes discussed — drag to reorder. Shown as pills on the detail page.</FieldHint>
          <SortableTopicList
            topics={form.topics}
            onReorder={(updated) => set("topics", updated)}
            onRemove={removeTopic}
            onMove={moveTopic}
          />
        </GlassSection>

        {/* ── Group divider: People ── */}
        {groupDivider}

        {/* ── 6. About the Speaker ── */}
        <GlassSection label="About the Speaker" number={6}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className={labelClass}>Name</label>
              <input className={fieldClass} value={form.guest_name} onChange={(e) => set("guest_name", e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Title</label>
              <input className={fieldClass} value={form.guest_title} onChange={(e) => set("guest_title", e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Company</label>
              <input className={fieldClass} value={form.guest_company} onChange={(e) => set("guest_company", e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Company Domain</label>
              <input className={fieldClass} value={form.guest_company_domain} onChange={(e) => set("guest_company_domain", e.target.value)} placeholder="e.g. samsara.com" />
              <FieldHint>Used to fetch the company logo via Clearbit</FieldHint>
            </div>
            <div className="col-span-2 space-y-1">
              <label className={labelClass}>LinkedIn URL</label>
              <input className={fieldClass} value={form.guest_linkedin_url} onChange={(e) => set("guest_linkedin_url", e.target.value)} />
            </div>
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Bio</label>
            <textarea className={`${fieldClass} min-h-[80px]`} value={form.guest_bio} onChange={(e) => set("guest_bio", e.target.value)} />
            <FieldHint>Starts with a verb (e.g. "is the CMO at…") — displayed under the guest photo</FieldHint>
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Guest Image</label>
            <div className="flex gap-2">
              <input className={fieldClass} value={form.guest_image_url} onChange={(e) => set("guest_image_url", e.target.value)} placeholder="URL or upload →" />
              <input ref={guestFileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], "guest_image_url")} />
              <button type="button" onClick={() => guestFileRef.current?.click()} disabled={uploading === "guest_image_url"} className="px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-body-sm whitespace-nowrap flex items-center gap-1.5 hover:opacity-80 disabled:opacity-50">
                <Upload className="h-3.5 w-3.5" />
                {uploading === "guest_image_url" ? "…" : "Upload"}
              </button>
            </div>
            {form.guest_image_url && <img src={form.guest_image_url} alt="Guest" className="mt-2 h-20 w-20 rounded-xl object-cover border border-white/20" />}
          </div>
        </GlassSection>

        {/* ── 7. About the Host ── */}
        <GlassSection label="About the Host" number={7}>
          <div className="flex flex-wrap gap-2">
            {allHosts.map((h) => (
              <button
                key={h.id}
                type="button"
                onClick={() => toggleHost(h.id)}
                className={`px-4 py-2 rounded-lg text-body-sm font-medium transition-colors border ${
                  selectedHostIds.includes(h.id)
                    ? "bg-foreground text-background border-foreground"
                    : "bg-white/30 text-muted-foreground border-white/30 hover:border-white/50"
                }`}
              >
                {h.name}
              </button>
            ))}
            {allHosts.length === 0 && <p className="text-body-sm text-muted-foreground">No hosts available</p>}
          </div>
          <FieldHint>Select one or more hosts for this episode — shown in the "About the Host" section</FieldHint>
        </GlassSection>

        {/* ── Group divider: Assets & Publishing ── */}
        {groupDivider}

        {/* ── 8. Images & SEO ── */}
        <GlassSection label="Images & SEO" number={8}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className={labelClass}>Poster Image</label>
              <div className="flex gap-2">
                <input className={fieldClass} value={form.poster_image_url} onChange={(e) => set("poster_image_url", e.target.value)} placeholder="URL or upload →" />
                <input ref={posterFileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], "poster_image_url")} />
                <button type="button" onClick={() => posterFileRef.current?.click()} disabled={uploading === "poster_image_url"} className="px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-body-sm whitespace-nowrap flex items-center gap-1.5 hover:opacity-80 disabled:opacity-50">
                  <Upload className="h-3.5 w-3.5" />
                  {uploading === "poster_image_url" ? "…" : "Upload"}
                </button>
              </div>
              {form.poster_image_url && <img src={form.poster_image_url} alt="Poster" className="mt-2 h-20 rounded-xl object-cover border border-white/20" />}
            </div>
            <div className="space-y-1">
              <label className={labelClass}>OG Image</label>
              <div className="flex gap-2">
                <input className={fieldClass} value={form.og_image_url} onChange={(e) => set("og_image_url", e.target.value)} placeholder="URL or upload →" />
                <input ref={ogFileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], "og_image_url")} />
                <button type="button" onClick={() => ogFileRef.current?.click()} disabled={uploading === "og_image_url"} className="px-3 py-2 rounded-lg bg-secondary text-secondary-foreground text-body-sm whitespace-nowrap flex items-center gap-1.5 hover:opacity-80 disabled:opacity-50">
                  <Upload className="h-3.5 w-3.5" />
                  {uploading === "og_image_url" ? "…" : "Upload"}
                </button>
              </div>
              {form.og_image_url && <img src={form.og_image_url} alt="OG" className="mt-2 h-20 rounded-xl object-cover border border-white/20" />}
            </div>
          </div>
        </GlassSection>

        {/* ── 9. Publishing ── */}
        <GlassSection label="Publishing" number={9}>
          <div className="space-y-1">
            <label className={labelClass}>Publish Date</label>
            <input className={fieldClass} type="date" value={form.publish_date} onChange={(e) => set("publish_date", e.target.value)} />
          </div>
        </GlassSection>

        <div className="flex gap-3 pt-4">
          <button onClick={handleSave} disabled={saving} className="px-6 py-3 rounded-xl bg-foreground text-background font-medium hover:opacity-90 disabled:opacity-50 transition-opacity">
            {saving ? "Saving…" : episodeId ? "Update Episode" : "Create Episode"}
          </button>
          <button onClick={onDone} className="px-6 py-3 rounded-xl border border-white/30 text-foreground text-body-sm hover:bg-white/20 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EpisodeForm;
