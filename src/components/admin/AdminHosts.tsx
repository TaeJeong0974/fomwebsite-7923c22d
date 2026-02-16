import { useEffect, useState } from "react";
import { adminApi } from "@/lib/adminApi";
import { toast } from "sonner";

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
  const fieldClass = "w-full px-4 py-3 rounded-xl border border-white/30 bg-muted/60 backdrop-blur-sm text-foreground text-body-sm focus:ring-2 focus:ring-primary/30 focus:border-primary/50 outline-none transition-all";
  const labelClass = "text-body-sm font-medium text-muted-foreground";

  if (editing) {
    return (
      <div className="max-w-lg space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-section-header font-medium text-foreground">{editing.id === "new" ? "New Host" : "Edit Host"}</h2>
          <button onClick={cancel} className="text-body-sm text-muted-foreground hover:text-foreground">← Back</button>
        </div>
        <div className="rounded-2xl border border-white/20 bg-white/30 backdrop-blur-sm shadow-glass overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-3 border-b border-white/15 bg-white/20">
            <h3 className="text-body-sm font-semibold text-foreground tracking-wide uppercase">Host Details</h3>
          </div>
          <div className="p-5 space-y-4">
            <div className="space-y-1"><label className={labelClass}>Name *</label><input className={fieldClass} value={form.name} onChange={(e) => set("name", e.target.value)} /></div>
            <div className="space-y-1"><label className={labelClass}>Title</label><input className={fieldClass} value={form.title} onChange={(e) => set("title", e.target.value)} /></div>
            <div className="space-y-1"><label className={labelClass}>Bio</label><textarea className={`${fieldClass} min-h-[80px]`} value={form.bio} onChange={(e) => set("bio", e.target.value)} /></div>
            <div className="space-y-1"><label className={labelClass}>Image URL</label><input className={fieldClass} value={form.image_url} onChange={(e) => set("image_url", e.target.value)} /></div>
            <div className="space-y-1"><label className={labelClass}>LinkedIn URL</label><input className={fieldClass} value={form.linkedin_url} onChange={(e) => set("linkedin_url", e.target.value)} /></div>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={save} disabled={saving} className="px-6 py-3 rounded-xl bg-foreground text-background font-medium hover:opacity-90 disabled:opacity-50 transition-opacity">
            {saving ? "Saving…" : "Save"}
          </button>
          <button onClick={cancel} className="px-6 py-3 rounded-xl border border-white/30 text-foreground text-body-sm hover:bg-white/20 transition-colors">Cancel</button>
        </div>
      </div>
    );
  }

  if (loading) return <div className="py-12 text-center text-muted-foreground text-body-sm">Loading hosts…</div>;

  if (error) return (
    <div className="py-12 text-center space-y-3">
      <p className="text-destructive text-body-sm">Failed to load hosts: {error}</p>
      <button onClick={fetchHosts} className="text-body-sm text-primary hover:underline">Retry</button>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-section-header font-medium text-foreground">Hosts</h2>
        <button onClick={startCreate} className="px-4 py-2.5 rounded-xl bg-foreground text-background text-body-sm font-medium hover:opacity-90 transition-opacity">+ New Host</button>
      </div>
      <div className="rounded-xl overflow-hidden border border-white/20">
        <table className="w-full">
          <thead>
            <tr className="bg-white/30 backdrop-blur-sm">
              <th className="text-table-header text-left px-4 py-3 text-muted-foreground">Name</th>
              <th className="text-table-header text-left px-4 py-3 text-muted-foreground">Title</th>
              <th className="text-table-header text-right px-4 py-3 text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hosts.map((h) => (
              <tr key={h.id} className="border-t border-white/15 hover:bg-white/20 transition-colors">
                <td className="px-4 py-3 text-body-sm text-foreground">{h.name}</td>
                <td className="px-4 py-3 text-body-sm text-muted-foreground">{h.title || "—"}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button onClick={() => startEdit(h)} className="text-body-sm text-foreground/70 hover:text-foreground transition-colors">Edit</button>
                  <button onClick={() => handleDelete(h.id)} className="text-body-sm text-destructive/70 hover:text-destructive transition-colors">Delete</button>
                </td>
              </tr>
            ))}
            {hosts.length === 0 && (
              <tr><td colSpan={3} className="px-4 py-8 text-center text-muted-foreground text-body-sm">No hosts yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHosts;
