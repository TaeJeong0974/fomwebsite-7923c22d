import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PixelUpload } from "./PixelIcons";
import { adminApi } from "@/lib/adminApi";
import { toast } from "sonner";
import { MacButton, MacWindow, MacInput, MacTextarea, MacLabel, MacFieldHint, MacTable, MacImagePreview, MAC_FONT, MAC_TITLE_FONT } from "./MacOS";

const macFont = MAC_FONT;

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

const EMPTY = { name: "", title: "", company: "", company_domain: "", bio: "", image_url: "", linkedin_url: "" };

const AdminSpeakers = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [editing, setEditing] = useState<Speaker | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const imageFileRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) { toast.error("Please select an image file"); return; }
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `speakers/${(form.name || "untitled").replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.${ext}`;
    try {
      const { error } = await supabase.storage.from("episode-images").upload(path, file, { upsert: true });
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from("episode-images").getPublicUrl(path);
      set("image_url", publicUrl);
      toast.success("Image uploaded");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    }
    setUploading(false);
  };

  const fetchSpeakers = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await adminApi("list-speakers");
      setSpeakers(result.data || []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load";
      setError(msg);
      toast.error(msg);
    }
    setLoading(false);
  };

  useEffect(() => { fetchSpeakers(); }, []);

  const startEdit = (s: Speaker) => {
    setEditing(s);
    setForm({
      name: s.name, title: s.title || "", company: s.company || "",
      company_domain: s.company_domain || "", bio: s.bio || "",
      image_url: s.image_url || "", linkedin_url: s.linkedin_url || "",
    });
  };

  const startCreate = () => {
    setEditing({ id: "new", name: "", title: null, company: null, company_domain: null, bio: null, image_url: null, linkedin_url: null });
    setForm(EMPTY);
  };

  const cancel = () => setEditing(null);

  const save = async () => {
    if (!form.name) { toast.error("Name is required"); return; }
    setSaving(true);
    const payload: Record<string, unknown> = {
      name: form.name, title: form.title || null, company: form.company || null,
      company_domain: form.company_domain || null, bio: form.bio || null,
      image_url: form.image_url || null, linkedin_url: form.linkedin_url || null,
    };
    if (editing?.id !== "new") payload.id = editing!.id;

    try {
      await adminApi("upsert-speaker", payload);
      toast.success("Saved");
      setEditing(null);
      fetchSpeakers();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this speaker?")) return;
    try {
      await adminApi("delete-speaker", { id });
      toast.success("Deleted");
      fetchSpeakers();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  if (editing) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold" style={MAC_TITLE_FONT}>
            {editing.id === "new" ? "New Speaker" : "Edit Speaker"}
          </span>
          <MacButton onClick={cancel}>← Back</MacButton>
        </div>
        <MacWindow title="Speaker Details">
          <div className="p-3 space-y-3">
            <div className="space-y-1"><MacLabel>Name *</MacLabel><MacInput value={form.name} onChange={(e) => set("name", e.target.value)} /><MacFieldHint>Display name on cards and detail pages</MacFieldHint></div>
            <div className="space-y-1"><MacLabel>Title</MacLabel><MacInput value={form.title} onChange={(e) => set("title", e.target.value)} /><MacFieldHint>e.g. "VP of Marketing"</MacFieldHint></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1"><MacLabel>Company</MacLabel><MacInput value={form.company} onChange={(e) => set("company", e.target.value)} /><MacFieldHint>Company name</MacFieldHint></div>
              <div className="space-y-1"><MacLabel>Domain</MacLabel><MacInput value={form.company_domain} onChange={(e) => set("company_domain", e.target.value)} placeholder="acme.com" /><MacFieldHint>For logo fetch</MacFieldHint></div>
            </div>
            <div className="space-y-1"><MacLabel>Bio</MacLabel><MacTextarea value={form.bio} onChange={(e) => set("bio", e.target.value)} minHeight="100px" /><MacFieldHint>Speaker bio for detail pages</MacFieldHint></div>
            <div className="space-y-1">
              <MacLabel>Image</MacLabel>
              <div className="flex gap-1">
                <MacInput value={form.image_url} onChange={(e) => set("image_url", e.target.value)} placeholder="URL or upload →" />
                <input ref={imageFileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} />
                <MacButton onClick={() => imageFileRef.current?.click()} disabled={uploading}>
                  <PixelUpload className="h-3 w-3" />
                  {uploading ? "…" : ""}
                </MacButton>
              </div>
              {form.image_url && <MacImagePreview src={form.image_url} alt={form.name || "Speaker"} className="mt-1 h-16 object-cover border border-black" />}
              <MacFieldHint>Square headshot</MacFieldHint>
            </div>
            <div className="space-y-1"><MacLabel>LinkedIn URL</MacLabel><MacInput value={form.linkedin_url} onChange={(e) => set("linkedin_url", e.target.value)} /><MacFieldHint>Full profile URL</MacFieldHint></div>
          </div>
        </MacWindow>
        <div className="flex gap-2">
          <MacButton primary onClick={save} disabled={saving}>{saving ? "Saving…" : "Save"}</MacButton>
          <MacButton onClick={cancel}>Cancel</MacButton>
        </div>
      </div>
    );
  }

  if (loading) return <div className="py-8 text-center text-[11px]" style={macFont}>Loading speakers…</div>;

  if (error) return (
    <div className="py-8 text-center space-y-2">
      <p className="text-[11px]" style={macFont}>Failed to load speakers: {error}</p>
      <MacButton onClick={fetchSpeakers}>Retry</MacButton>
    </div>
  );

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold" style={MAC_TITLE_FONT}>
          Speakers ({speakers.length})
        </span>
        <MacButton primary onClick={startCreate}>+ New</MacButton>
      </div>

      <MacTable>
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-black bg-white">
              <th className="text-left px-2 py-1.5 text-[10px] font-bold uppercase" style={macFont}>Name</th>
              <th className="text-left px-2 py-1.5 text-[10px] font-bold uppercase hidden sm:table-cell" style={macFont}>Title</th>
              <th className="text-left px-2 py-1.5 text-[10px] font-bold uppercase hidden sm:table-cell" style={macFont}>Company</th>
              <th className="text-right px-2 py-1.5 text-[10px] font-bold uppercase" style={macFont}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {speakers.map((s) => (
              <tr key={s.id} className="border-b border-black/20 last:border-0 hover:bg-black/5">
                <td className="px-2 py-2 text-[11px] font-bold" style={macFont}>{s.name}</td>
                <td className="px-2 py-2 text-[11px] hidden sm:table-cell" style={macFont}>{s.title || "—"}</td>
                <td className="px-2 py-2 text-[11px] hidden sm:table-cell" style={macFont}>{s.company || "—"}</td>
                <td className="px-2 py-2 text-right">
                  <div className="inline-flex items-center gap-1">
                    <MacButton onClick={() => startEdit(s)} className="text-[10px] px-2 py-0.5">Edit</MacButton>
                    <MacButton onClick={() => handleDelete(s.id)} className="text-[10px] px-2 py-0.5">Del</MacButton>
                  </div>
                </td>
              </tr>
            ))}
            {speakers.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-[11px] text-gray-400" style={macFont}>No speakers yet</td></tr>
            )}
          </tbody>
        </table>
      </MacTable>
    </div>
  );
};

export default AdminSpeakers;
