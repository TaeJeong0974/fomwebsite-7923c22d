import { useEffect, useRef, useState } from "react";
import { adminApi } from "@/lib/adminApi";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload } from "lucide-react";

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
  published: false, publish_date: "",
  topics: [] as string[], pull_quote: "", pull_quote_attribution: "",
};

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
          published: data.published,
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
      published: form.published,
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

  const fieldClass = "w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-body-sm focus:ring-2 focus:ring-primary outline-none";
  const labelClass = "text-body-sm font-medium text-muted-foreground";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-section-header font-medium text-foreground">{episodeId ? "Edit Episode" : "New Episode"}</h2>
        <button onClick={onDone} className="text-body-sm text-muted-foreground hover:text-foreground">← Back</button>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* ── 1. Header ── */}
        <h3 className="text-body font-medium text-foreground">Header</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className={labelClass}>Slug *</label>
            <input className={fieldClass} value={form.slug} onChange={(e) => set("slug", e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Episode #</label>
            <input className={fieldClass} type="number" value={form.episode_number} onChange={(e) => set("episode_number", parseInt(e.target.value) || 0)} />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Duration</label>
            <input className={fieldClass} value={form.duration} onChange={(e) => set("duration", e.target.value)} placeholder="e.g. 52 min" />
          </div>
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Title *</label>
          <input className={fieldClass} value={form.title} onChange={(e) => set("title", e.target.value)} />
          <p className="text-xs text-muted-foreground mt-1">Guest name or episode name — shown as the page heading</p>
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Overview (Subtitle)</label>
          <input className={fieldClass} value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} />
          <p className="text-xs text-muted-foreground mt-1">One-line hook shown on cards and as the hero headline</p>
        </div>

        {/* ── 2. Video ── */}
        <hr className="border-border" />
        <h3 className="text-body font-medium text-foreground">Video</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className={labelClass}>YouTube URL</label>
            <input className={fieldClass} value={form.youtube_url} onChange={(e) => set("youtube_url", e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Spotify URL</label>
            <input className={fieldClass} value={form.spotify_url} onChange={(e) => set("spotify_url", e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Apple Podcasts URL</label>
            <input className={fieldClass} value={form.apple_url} onChange={(e) => set("apple_url", e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Preview Video URL</label>
            <input className={fieldClass} value={form.preview_video_url} onChange={(e) => set("preview_video_url", e.target.value)} />
          </div>
        </div>

        {/* ── 3. About this Episode ── */}
        <hr className="border-border" />
        <h3 className="text-body font-medium text-foreground">About this Episode</h3>
        <div className="space-y-1">
          <label className={labelClass}>Short Description</label>
          <textarea className={`${fieldClass} min-h-[80px]`} value={form.description} onChange={(e) => set("description", e.target.value)} />
          <p className="text-xs text-muted-foreground mt-1">Used for SEO meta description and card previews</p>
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Full Description</label>
          <textarea className={`${fieldClass} min-h-[160px]`} value={form.full_description} onChange={(e) => set("full_description", e.target.value)} />
          <p className="text-xs text-muted-foreground mt-1">Long-form "About this Episode" section on the detail page</p>
        </div>

        {/* ── 4. Quote ── */}
        <hr className="border-border" />
        <h3 className="text-body font-medium text-foreground">Quote</h3>
        <div className="space-y-1">
          <textarea className={`${fieldClass} min-h-[80px]`} value={form.pull_quote} onChange={(e) => set("pull_quote", e.target.value)} placeholder="A memorable quote from the episode…" />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Attribution</label>
          <input className={fieldClass} value={form.pull_quote_attribution} onChange={(e) => set("pull_quote_attribution", e.target.value)} />
        </div>

        {/* ── 5. Topics Covered ── */}
        <hr className="border-border" />
        <h3 className="text-body font-medium text-foreground">Topics Covered</h3>
        <div className="flex gap-2">
          <input className={fieldClass} value={topicInput} onChange={(e) => setTopicInput(e.target.value)} placeholder="Add a topic" onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTopic())} />
          <button type="button" onClick={addTopic} className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-body-sm whitespace-nowrap">Add</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {form.topics.map((t, i) => (
            <span key={i} className="badge-status gap-2">
              {t}
              <button onClick={() => removeTopic(i)} className="text-destructive hover:text-destructive/80">×</button>
            </span>
          ))}
        </div>

        {/* ── 6. About the Speaker ── */}
        <hr className="border-border" />
        <h3 className="text-body font-medium text-foreground">About the Speaker</h3>
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
          </div>
          <div className="col-span-2 space-y-1">
            <label className={labelClass}>LinkedIn URL</label>
            <input className={fieldClass} value={form.guest_linkedin_url} onChange={(e) => set("guest_linkedin_url", e.target.value)} />
          </div>
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Bio</label>
          <textarea className={`${fieldClass} min-h-[80px]`} value={form.guest_bio} onChange={(e) => set("guest_bio", e.target.value)} />
          <p className="text-xs text-muted-foreground mt-1">Starts with a verb (e.g. "is the CMO at…")</p>
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
          {form.guest_image_url && <img src={form.guest_image_url} alt="Guest" className="mt-2 h-20 w-20 rounded-lg object-cover border border-border" />}
        </div>

        {/* ── 7. About the Host ── */}
        <hr className="border-border" />
        <h3 className="text-body font-medium text-foreground">About the Host</h3>
        <div className="flex flex-wrap gap-2">
          {allHosts.map((h) => (
            <button
              key={h.id}
              type="button"
              onClick={() => toggleHost(h.id)}
              className={`px-4 py-2 rounded-lg text-body-sm font-medium transition-colors border ${
                selectedHostIds.includes(h.id)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:border-primary"
              }`}
            >
              {h.name}
            </button>
          ))}
          {allHosts.length === 0 && <p className="text-body-sm text-muted-foreground">No hosts available</p>}
        </div>

        {/* ── 8. Images & SEO ── */}
        <hr className="border-border" />
        <h3 className="text-body font-medium text-foreground">Images & SEO</h3>
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
            {form.poster_image_url && <img src={form.poster_image_url} alt="Poster" className="mt-2 h-20 rounded-lg object-cover border border-border" />}
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
            {form.og_image_url && <img src={form.og_image_url} alt="OG" className="mt-2 h-20 rounded-lg object-cover border border-border" />}
          </div>
        </div>

        {/* ── 9. Publishing ── */}
        <hr className="border-border" />
        <h3 className="text-body font-medium text-foreground">Publishing</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className={labelClass}>Publish Date</label>
            <input className={fieldClass} type="date" value={form.publish_date} onChange={(e) => set("publish_date", e.target.value)} />
          </div>
          <div className="flex items-center gap-3 pt-6">
            <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} className="w-4 h-4 accent-primary" />
            <label className={labelClass}>Published</label>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button onClick={handleSave} disabled={saving} className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 disabled:opacity-50 transition-opacity">
            {saving ? "Saving…" : episodeId ? "Update Episode" : "Create Episode"}
          </button>
          <button onClick={onDone} className="px-6 py-3 rounded-lg border border-border text-foreground text-body-sm hover:bg-muted transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EpisodeForm;
