import { useEffect, useState } from "react";
import { adminApi } from "@/lib/adminApi";
import { toast } from "sonner";
import { MacButton, MacWindow, MacInput, MacTextarea, MacLabel, MacFieldHint } from "./MacOS";

const macFont = { fontFamily: "'Geneva', 'Helvetica Neue', monospace" };

interface Host {
  id: string;
  name: string;
  title: string | null;
  bio: string | null;
  image_url: string | null;
  linkedin_url: string | null;
}

const EMPTY = { name: "", title: "", bio: "", image_url: "", linkedin_url: "" };

const AdminHosts = () => {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [editing, setEditing] = useState<Host | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchHosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await adminApi("list-hosts");
      setHosts(result.data || []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load";
      setError(msg);
      toast.error(msg);
    }
    setLoading(false);
  };

  useEffect(() => { fetchHosts(); }, []);

  const startEdit = (h: Host) => {
    setEditing(h);
    setForm({ name: h.name, title: h.title || "", bio: h.bio || "", image_url: h.image_url || "", linkedin_url: h.linkedin_url || "" });
  };

  const startCreate = () => {
    setEditing({ id: "new", name: "", title: null, bio: null, image_url: null, linkedin_url: null });
    setForm(EMPTY);
  };

  const cancel = () => setEditing(null);

  const save = async () => {
    if (!form.name) { toast.error("Name is required"); return; }
    setSaving(true);
    const payload: Record<string, unknown> = {
      name: form.name,
      title: form.title || null,
      bio: form.bio || null,
      image_url: form.image_url || null,
      linkedin_url: form.linkedin_url || null,
    };
    if (editing?.id !== "new") payload.id = editing!.id;

    try {
      await adminApi("upsert-host", payload);
      toast.success("Saved");
      setEditing(null);
      fetchHosts();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this host?")) return;
    try {
      await adminApi("delete-host", { id });
      toast.success("Deleted");
      fetchHosts();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  if (editing) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold" style={{ fontFamily: "'Chicago', 'Geneva', monospace" }}>
            {editing.id === "new" ? "New Host" : "Edit Host"}
          </span>
          <MacButton onClick={cancel}>← Back</MacButton>
        </div>
        <MacWindow title="Host Details">
          <div className="p-3 space-y-3">
            <div className="space-y-1"><MacLabel>Name *</MacLabel><MacInput value={form.name} onChange={(e) => set("name", e.target.value)} /><MacFieldHint>Display name shown on episode cards</MacFieldHint></div>
            <div className="space-y-1"><MacLabel>Title</MacLabel><MacInput value={form.title} onChange={(e) => set("title", e.target.value)} /><MacFieldHint>e.g. "Co-founder, Frontlines Media"</MacFieldHint></div>
            <div className="space-y-1"><MacLabel>Bio</MacLabel><MacTextarea value={form.bio} onChange={(e) => set("bio", e.target.value)} /><MacFieldHint>Short bio for the host section</MacFieldHint></div>
            <div className="space-y-1"><MacLabel>Image URL</MacLabel><MacInput value={form.image_url} onChange={(e) => set("image_url", e.target.value)} /><MacFieldHint>Square headshot URL</MacFieldHint></div>
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

  if (loading) return <div className="py-8 text-center text-[11px]" style={macFont}>Loading hosts…</div>;

  if (error) return (
    <div className="py-8 text-center space-y-2">
      <p className="text-[11px]" style={macFont}>Failed to load hosts: {error}</p>
      <MacButton onClick={fetchHosts}>Retry</MacButton>
    </div>
  );

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold" style={{ fontFamily: "'Chicago', 'Geneva', monospace" }}>
          Hosts ({hosts.length})
        </span>
        <MacButton primary onClick={startCreate}>+ New</MacButton>
      </div>

      <div className="border border-black overflow-hidden" style={{ boxShadow: "inset 1px 1px 0px #999" }}>
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-black bg-white">
              <th className="text-left px-2 py-1.5 text-[10px] font-bold uppercase" style={macFont}>Name</th>
              <th className="text-left px-2 py-1.5 text-[10px] font-bold uppercase" style={macFont}>Title</th>
              <th className="text-right px-2 py-1.5 text-[10px] font-bold uppercase" style={macFont}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hosts.map((h) => (
              <tr key={h.id} className="border-b border-black/20 last:border-0 hover:bg-black/5">
                <td className="px-2 py-2 text-[11px] font-bold" style={macFont}>{h.name}</td>
                <td className="px-2 py-2 text-[11px]" style={macFont}>{h.title || "—"}</td>
                <td className="px-2 py-2 text-right">
                  <div className="inline-flex items-center gap-1">
                    <MacButton onClick={() => startEdit(h)} className="text-[10px] px-2 py-0.5">Edit</MacButton>
                    <MacButton onClick={() => handleDelete(h.id)} className="text-[10px] px-2 py-0.5">Del</MacButton>
                  </div>
                </td>
              </tr>
            ))}
            {hosts.length === 0 && (
              <tr><td colSpan={3} className="px-4 py-8 text-center text-[11px] text-gray-400" style={macFont}>No hosts yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHosts;
