import { useEffect, useMemo, useRef, useState } from "react";
import { adminApi } from "@/lib/adminApi";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, GripVertical, ChevronUp, ChevronDown, Eye, EyeOff } from "lucide-react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MacWindow, MacButton, MacInput, MacTextarea, MacLabel, MacFieldHint } from "./MacOS";
import PodcastCard from "@/components/podcast/PodcastCard";
import type { PodcastEpisode } from "@/lib/podcastData";

const macFont = { fontFamily: "'Geneva', 'Helvetica Neue', monospace" };

interface Speaker {
  id: string;
  name: string;
  title: string | null;
  company: string | null;
  company_domain: string | null;
  bio: string | null;
  image_url: string | null;
  linkedin_url: string | null;
}

interface Props {
  episodeId?: string;
  onDone: () => void;
  onSwitchToSpeakers?: () => void;
}

interface Host {
  id: string;
  name: string;
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
  subscribe_headline: "",
};

// ── Sortable Topic Item ──
const SortableTopicItem = ({ id, topic, index, total, onRemove, onMove, onEdit }: {
  id: string; topic: string; index: number; total: number;
  onRemove: (i: number) => void; onMove: (i: number, dir: -1 | 1) => void;
  onEdit: (i: number, value: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1, zIndex: isDragging ? 10 : undefined };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-1.5 py-1 px-1.5 border-b border-black/20 last:border-0 group">
      <button type="button" {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing touch-none p-0.5 shrink-0">
        <GripVertical className="h-3 w-3" />
      </button>
      <input
        type="text"
        value={topic}
        onChange={(e) => onEdit(index, e.target.value)}
        className="text-[11px] flex-1 bg-transparent border-none outline-none focus:ring-0 p-0"
        style={macFont}
      />
      <div className="flex items-center gap-0.5 shrink-0">
        <button type="button" onClick={() => onMove(index, -1)} disabled={index === 0} className="p-0.5 disabled:opacity-20">
          <ChevronUp className="h-3 w-3" />
        </button>
        <button type="button" onClick={() => onMove(index, 1)} disabled={index === total - 1} className="p-0.5 disabled:opacity-20">
          <ChevronDown className="h-3 w-3" />
        </button>
        <button type="button" onClick={() => onRemove(index)} className="p-0.5 text-black hover:text-gray-600 ml-0.5 text-xs font-bold">×</button>
      </div>
    </div>
  );
};

// ── Sortable Topic List ──
const SortableTopicList = ({ topics, onReorder, onRemove, onMove, onEdit }: {
  topics: string[]; onReorder: (t: string[]) => void;
  onRemove: (i: number) => void; onMove: (i: number, dir: -1 | 1) => void;
  onEdit: (i: number, value: string) => void;
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
        <div>
          {topics.map((t, i) => (
            <SortableTopicItem key={`topic-${i}`} id={`topic-${i}`} topic={t} index={i} total={topics.length} onRemove={onRemove} onMove={onMove} onEdit={onEdit} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

// ── Card Preview ──
const CardPreview = ({ form }: { form: typeof EMPTY }) => {
  const [open, setOpen] = useState(false);

  const mockEpisode: PodcastEpisode = useMemo(() => ({
    id: 0,
    slug: form.slug || "preview",
    name: form.guest_name || "Guest Name",
    title: form.guest_title || "Title",
    company: form.guest_company || "Company",
    companyDomain: form.guest_company_domain || "",
    overview: form.description || "",
    fullDescription: form.full_description || "",
    bio: form.guest_bio || "",
    topics: form.topics || [],
    chapters: [],
    youtubeUrl: form.youtube_url || "",
    spotifyUrl: form.spotify_url || "",
    duration: form.duration || "",
    publishedDate: form.publish_date || "Coming Soon",
    comingSoon: form.status === "upcoming",
    linkedInUrl: form.guest_linkedin_url || undefined,
    previewVideoUrl: form.preview_video_url || undefined,
    pullQuote: form.pull_quote || undefined,
  }), [form]);

  return (
    <MacWindow title="Card Preview">
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase tracking-wider" style={macFont}>
            {open ? "Live preview of homepage card" : "Click to preview card"}
          </span>
          <MacButton onClick={() => setOpen(!open)}>
            {open ? <><EyeOff className="h-3 w-3 mr-1" /> Hide</> : <><Eye className="h-3 w-3 mr-1" /> Show</>}
          </MacButton>
        </div>
        {open && (
          <div className="bg-background rounded-lg p-4 border border-black/10 max-w-[320px] mx-auto">
            <PodcastCard
              episode={mockEpisode}
              isUpcoming={form.status === "upcoming"}
              image={form.guest_image_url || undefined}
            />
          </div>
        )}
      </div>
    </MacWindow>
  );
};

// ── Mac select styling ──
const macSelectClass = "w-full px-2 py-1.5 text-sm border-2 border-black bg-[#555] text-white outline-none focus:ring-0 appearance-none cursor-default bg-[length:10px] bg-[right_6px_center] bg-no-repeat" +
  " [background-image:url(\"data:image/svg+xml,%3Csvg%20width='10'%20height='6'%20viewBox='0%200%2010%206'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20d='M1%201L5%205L9%201'%20stroke='white'%20stroke-width='1.5'/%3E%3C/svg%3E\")]";

const EpisodeForm = ({ episodeId, onDone, onSwitchToSpeakers }: Props) => {
  const [form, setForm] = useState(EMPTY);
  const [topicInput, setTopicInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [allHosts, setAllHosts] = useState<Host[]>([]);
  const [allSpeakers, setAllSpeakers] = useState<Speaker[]>([]);
  const [selectedSpeakerId, setSelectedSpeakerId] = useState<string | null>(null);
  const [selectedHostIds, setSelectedHostIds] = useState<string[]>([]);

  useEffect(() => {
    adminApi("list-hosts").then((res) => setAllHosts(res.data || [])).catch(() => {});
    adminApi("list-speakers").then((res) => setAllSpeakers(res.data || [])).catch(() => {});

    if (!episodeId) return;
    const load = async () => {
      try {
        const [epResult, hostsResult] = await Promise.all([
          adminApi("get-episode", { id: episodeId }),
          adminApi("get-episode-hosts", { episode_id: episodeId }),
        ]);
        const data = epResult.data;
        if (data) {
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
            subscribe_headline: data.subscribe_headline || "",
          });
        }
        setSelectedHostIds(hostsResult.data || []);
      } catch (err: unknown) {
        toast.error(err instanceof Error ? err.message : "Failed to load episode");
      }
    };
    load();
  }, [episodeId]);

  // Auto-match speaker
  useEffect(() => {
    if (!form.guest_name || allSpeakers.length === 0) return;
    const match = allSpeakers.find(
      (s) => s.name.toLowerCase() === form.guest_name.toLowerCase()
    );
    if (match) setSelectedSpeakerId(match.id);
  }, [form.guest_name, allSpeakers]);

  const set = (key: string, value: unknown) => setForm((f) => ({ ...f, [key]: value }));

  const applySpeaker = (speaker: Speaker | null) => {
    if (!speaker) {
      setSelectedSpeakerId(null);
      setForm((f) => ({ ...f, guest_name: "", guest_title: "", guest_company: "", guest_company_domain: "", guest_bio: "", guest_image_url: "", guest_linkedin_url: "" }));
      return;
    }
    setSelectedSpeakerId(speaker.id);
    setForm((f) => ({
      ...f,
      guest_name: speaker.name || "",
      guest_title: speaker.title || "",
      guest_company: speaker.company || "",
      guest_company_domain: speaker.company_domain || "",
      guest_bio: speaker.bio || "",
      guest_image_url: speaker.image_url || "",
      guest_linkedin_url: speaker.linkedin_url || "",
    }));
  };

  const handleSave = async () => {
    if (!form.slug || !form.title) { toast.error("Slug and title are required"); return; }
    setSaving(true);
    const payload: Record<string, unknown> = {
      slug: form.slug, title: form.title, subtitle: form.subtitle || null,
      episode_number: form.episode_number || null,
      description: form.description || null, full_description: form.full_description || null,
      duration: form.duration || null,
      guest_name: form.guest_name || null, guest_title: form.guest_title || null,
      guest_company: form.guest_company || null, guest_company_domain: form.guest_company_domain || null,
      guest_bio: form.guest_bio || null, guest_image_url: form.guest_image_url || null,
      guest_linkedin_url: form.guest_linkedin_url || null,
      poster_image_url: form.poster_image_url || null, og_image_url: form.og_image_url || null,
      preview_video_url: form.preview_video_url || null,
      apple_url: form.apple_url || null, spotify_url: form.spotify_url || null,
      youtube_url: form.youtube_url || null,
      published: form.status === 'published', status: form.status,
      publish_date: form.publish_date || null,
      topics: form.topics,
      pull_quote: form.pull_quote || null, pull_quote_attribution: form.pull_quote_attribution || null,
      subscribe_headline: form.subscribe_headline || null,
    };
    if (episodeId) payload.id = episodeId;

    try {
      const result = await adminApi("upsert-episode", payload);
      const savedId = episodeId || result.data?.id;
      if (savedId) {
        await adminApi("set-episode-hosts", { episode_id: savedId, host_ids: selectedHostIds });
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

  const [uploading, setUploading] = useState<string | null>(null);
  const posterFileRef = useRef<HTMLInputElement>(null);
  const ogFileRef = useRef<HTMLInputElement>(null);
  const guestImageFileRef = useRef<HTMLInputElement>(null);

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

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold" style={{ fontFamily: "'Chicago', 'Geneva', monospace" }}>
          {episodeId ? (form.title || "Untitled Episode") : "New Episode"}
        </span>
        <div className="flex gap-1">
          {form.slug && (
            <>
              <MacButton onClick={() => window.open(`${window.location.origin}/#podcast`, "_blank")}>
                🏠 Homepage
              </MacButton>
              {form.status !== 'draft' && (
                <MacButton onClick={() => window.open(`${window.location.origin}/podcast/${form.slug}`, "_blank")}>
                  👁 Page
                </MacButton>
              )}
            </>
          )}
          <MacButton onClick={onDone}>← Back</MacButton>
        </div>
      </div>

      {/* ── Live Card Preview ── */}
      <CardPreview form={form} />

      <div className="space-y-4">
        {/* ── 1. Status ── */}
        <MacWindow title="Status">
          <div className="p-3 space-y-2">
            <MacLabel>Status</MacLabel>
            <div className="flex gap-1 flex-wrap">
              {(["draft", "upcoming", "published", "deleted"] as const).map((value) => (
                <MacButton
                  key={value}
                  primary={form.status === value}
                  onClick={() => set("status", value)}
                  className="capitalize text-[10px]"
                >
                  {value}
                </MacButton>
              ))}
            </div>
            <p className="text-[10px] text-gray-500 italic" style={macFont}>
              {form.status === 'upcoming' ? 'Card on homepage, no detail page' :
               form.status === 'published' ? 'Full detail page with video' :
               form.status === 'draft' ? 'Not visible on site' : 'Soft-deleted'}
            </p>
            {form.status === 'upcoming' && (
              <div className="space-y-1 pt-1">
                <MacLabel>Subscribe Headline</MacLabel>
                <MacInput value={form.subscribe_headline} onChange={(e) => set("subscribe_headline", e.target.value)} placeholder="e.g. We'll Let You Know When Lena's Live" />
                <MacFieldHint>Custom headline in the subscribe drawer</MacFieldHint>
              </div>
            )}
          </div>
        </MacWindow>

        {/* ── 2. Header ── */}
        <MacWindow title="Header">
          <div className="p-3 space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <MacLabel>Slug *</MacLabel>
                <MacInput value={form.slug} onChange={(e) => set("slug", e.target.value)} />
                <MacFieldHint>URL identifier</MacFieldHint>
              </div>
              <div className="space-y-1">
                <MacLabel>Episode #</MacLabel>
                <MacInput type="number" value={String(form.episode_number)} onChange={(e) => set("episode_number", parseInt(e.target.value) || 0)} />
              </div>
              <div className="space-y-1">
                <MacLabel>Duration</MacLabel>
                <MacInput value={form.duration} onChange={(e) => set("duration", e.target.value)} placeholder="52 min" />
              </div>
            </div>
            <div className="space-y-1">
              <MacLabel>Title *</MacLabel>
              <MacInput value={form.title} onChange={(e) => set("title", e.target.value)} />
            </div>
            <div className="space-y-1">
              <MacLabel>Overview</MacLabel>
              <MacInput value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} />
              <MacFieldHint>One-line hook for cards</MacFieldHint>
            </div>
          </div>
        </MacWindow>

        {/* ── 3. Video ── */}
        <MacWindow title="Video">
          <div className="p-3 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1"><MacLabel>YouTube URL</MacLabel><MacInput value={form.youtube_url} onChange={(e) => set("youtube_url", e.target.value)} /></div>
              <div className="space-y-1"><MacLabel>Spotify URL</MacLabel><MacInput value={form.spotify_url} onChange={(e) => set("spotify_url", e.target.value)} /></div>
              <div className="space-y-1"><MacLabel>Apple Podcasts URL</MacLabel><MacInput value={form.apple_url} onChange={(e) => set("apple_url", e.target.value)} /></div>
              <div className="space-y-1"><MacLabel>Preview Video URL</MacLabel><MacInput value={form.preview_video_url} onChange={(e) => set("preview_video_url", e.target.value)} /></div>
            </div>
          </div>
        </MacWindow>

        {/* ── 4. About this Episode ── */}
        <MacWindow title="About this Episode">
          <div className="p-3 space-y-2">
            <div className="space-y-1">
              <MacLabel>Short Description</MacLabel>
              <MacTextarea value={form.description} onChange={(e) => set("description", e.target.value)} minHeight="60px" />
              <MacFieldHint>SEO meta — keep under 160 chars</MacFieldHint>
            </div>
            <div className="space-y-1">
              <MacLabel>Full Description</MacLabel>
              <MacTextarea value={form.full_description} onChange={(e) => set("full_description", e.target.value)} minHeight="180px" />
            </div>
          </div>
        </MacWindow>

        {/* ── 5. Quote ── */}
        <MacWindow title="Quote">
          <div className="p-3 space-y-2">
            <MacTextarea value={form.pull_quote} onChange={(e) => set("pull_quote", e.target.value)} placeholder="A memorable quote…" minHeight="60px" />
            <div className="space-y-1">
              <MacLabel>Attribution</MacLabel>
              <select
                className={macSelectClass}
                value={form.pull_quote_attribution}
                onChange={(e) => set("pull_quote_attribution", e.target.value)}
                style={macFont}
              >
                <option value="">Select speaker…</option>
                {form.guest_name && <option value={form.guest_name}>{form.guest_name} (Guest)</option>}
                {allHosts.map((h) => (
                  <option key={h.id} value={h.name}>{h.name} (Host)</option>
                ))}
              </select>
            </div>
          </div>
        </MacWindow>

        {/* ── 6. Topics Covered ── */}
        <MacWindow title="Topics Covered">
          <div className="p-3 space-y-2">
            <div className="flex gap-1">
              <MacInput value={topicInput} onChange={(e) => setTopicInput(e.target.value)} placeholder="Add a topic" onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTopic())} />
              <MacButton onClick={addTopic}>Add</MacButton>
            </div>
            <MacFieldHint>Drag to reorder. Click to edit.</MacFieldHint>
            <div className="border border-black" style={{ boxShadow: "inset 1px 1px 0px #999" }}>
              <SortableTopicList
                topics={form.topics}
                onReorder={(updated) => set("topics", updated)}
                onRemove={removeTopic}
                onMove={moveTopic}
                onEdit={(i, value) => { const updated = [...form.topics]; updated[i] = value; set("topics", updated); }}
              />
              {form.topics.length === 0 && (
                <p className="px-2 py-3 text-[10px] text-gray-400 text-center" style={macFont}>No topics yet</p>
              )}
            </div>
          </div>
        </MacWindow>

        {/* ── 7. About the Speaker ── */}
        <MacWindow title="About the Speaker">
          <div className="p-3 space-y-2">
            <div className="flex gap-1">
              <select
                className={macSelectClass}
                value=""
                onChange={(e) => {
                  const speaker = allSpeakers.find((s) => s.id === e.target.value);
                  applySpeaker(speaker || null);
                }}
                style={macFont}
              >
                <option value="">— Choose a speaker —</option>
                {allSpeakers.filter((s) => s.id !== selectedSpeakerId).map((s) => (
                  <option key={s.id} value={s.id}>{s.name}{s.company ? ` · ${s.company}` : ""}</option>
                ))}
              </select>
              {onSwitchToSpeakers && <MacButton onClick={onSwitchToSpeakers}>+ New</MacButton>}
            </div>
            {selectedSpeakerId && (
              <div className="flex flex-wrap gap-1">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold border border-black bg-black text-white" style={macFont}>
                  {form.guest_name}{form.guest_company ? ` · ${form.guest_company}` : ""}
                  <button type="button" onClick={() => applySpeaker(null)} className="hover:opacity-70">×</button>
                </span>
              </div>
            )}
            <div className="space-y-1">
              <MacLabel>Guest Image</MacLabel>
              <div className="flex gap-1">
                <MacInput value={form.guest_image_url} onChange={(e) => set("guest_image_url", e.target.value)} placeholder="URL or upload →" />
                <input ref={guestImageFileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], "guest_image_url")} />
                <MacButton onClick={() => guestImageFileRef.current?.click()} disabled={uploading === "guest_image_url"}>
                  <Upload className="h-3 w-3" />
                  {uploading === "guest_image_url" ? "…" : ""}
                </MacButton>
              </div>
              {form.guest_image_url && <img src={form.guest_image_url} alt="Guest" className="mt-1 h-16 object-cover border border-black" />}
            </div>
          </div>
        </MacWindow>

        {/* ── 8. About the Host ── */}
        <MacWindow title="About the Host">
          <div className="p-3 space-y-2">
            <select
              className={macSelectClass}
              value=""
              onChange={(e) => {
                if (e.target.value && !selectedHostIds.includes(e.target.value)) {
                  setSelectedHostIds((prev) => [...prev, e.target.value]);
                }
              }}
              style={macFont}
            >
              <option value="">— Choose a host —</option>
              {allHosts.filter((h) => !selectedHostIds.includes(h.id)).map((h) => (
                <option key={h.id} value={h.id}>{h.name}</option>
              ))}
            </select>
            {selectedHostIds.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedHostIds.map((hostId) => {
                  const host = allHosts.find((h) => h.id === hostId);
                  if (!host) return null;
                  return (
                    <span key={hostId} className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold border border-black bg-black text-white" style={macFont}>
                      {host.name}
                      <button type="button" onClick={() => setSelectedHostIds((prev) => prev.filter((id) => id !== hostId))} className="hover:opacity-70">×</button>
                    </span>
                  );
                })}
              </div>
            )}
            {allHosts.length === 0 && <p className="text-[10px] text-gray-400" style={macFont}>No hosts available</p>}
          </div>
        </MacWindow>

        {/* ── 9. Images & SEO ── */}
        <MacWindow title="Images & SEO">
          <div className="p-3 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <MacLabel>Poster Image</MacLabel>
                <div className="flex gap-1">
                  <MacInput value={form.poster_image_url} onChange={(e) => set("poster_image_url", e.target.value)} placeholder="URL or upload →" />
                  <input ref={posterFileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], "poster_image_url")} />
                  <MacButton onClick={() => posterFileRef.current?.click()} disabled={uploading === "poster_image_url"}>
                    <Upload className="h-3 w-3" />
                    {uploading === "poster_image_url" ? "…" : ""}
                  </MacButton>
                </div>
                {form.poster_image_url && <img src={form.poster_image_url} alt="Poster" className="mt-1 h-16 object-cover border border-black" />}
              </div>
              <div className="space-y-1">
                <MacLabel>OG Image</MacLabel>
                <div className="flex gap-1">
                  <MacInput value={form.og_image_url} onChange={(e) => set("og_image_url", e.target.value)} placeholder="URL or upload →" />
                  <input ref={ogFileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], "og_image_url")} />
                  <MacButton onClick={() => ogFileRef.current?.click()} disabled={uploading === "og_image_url"}>
                    <Upload className="h-3 w-3" />
                    {uploading === "og_image_url" ? "…" : ""}
                  </MacButton>
                </div>
                {form.og_image_url && <img src={form.og_image_url} alt="OG" className="mt-1 h-16 object-cover border border-black" />}
              </div>
            </div>
          </div>
        </MacWindow>

        {/* ── Save ── */}
        <div className="flex gap-2 pt-2">
          <MacButton primary onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : episodeId ? "Save" : "Create"}
          </MacButton>
          <MacButton onClick={onDone}>Cancel</MacButton>
        </div>
      </div>
    </div>
  );
};

export default EpisodeForm;
