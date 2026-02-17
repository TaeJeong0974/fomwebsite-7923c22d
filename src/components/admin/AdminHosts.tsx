import { useEffect, useState } from "react";
import { adminApi } from "@/lib/adminApi";
import { toast } from "sonner";
import { Info, Plus, Pencil, Trash2 } from "lucide-react";

const FieldHint = ({ children }: { children: React.ReactNode }) => (
  <p className="flex items-start gap-1.5 mt-1.5 text-xs leading-snug text-gray-500">
    <Info className="h-3.5 w-3.5 mt-px shrink-0 text-gray-400" />
    <span>{children}</span>
  </p>
);

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
  const fieldClass = "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary/40 outline-none transition-all placeholder:text-gray-300";
  const labelClass = "text-sm font-medium text-gray-700";

  if (editing) {
    return (
      <div className="w-full space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-dark-foreground" style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)' }}>{editing.id === "new" ? "New Host" : "Edit Host"}</h2>
          <button onClick={cancel} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">← Back</button>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Host Details</h3>
          </div>
          <div className="p-6 space-y-5">
            <div className="space-y-1.5"><label className={labelClass}>Name *</label><input className={fieldClass} value={form.name} onChange={(e) => set("name", e.target.value)} /><FieldHint>Display name shown on episode cards and detail pages</FieldHint></div>
            <div className="space-y-1.5"><label className={labelClass}>Title</label><input className={fieldClass} value={form.title} onChange={(e) => set("title", e.target.value)} /><FieldHint>Job title — e.g. "Co-founder, Frontlines Media"</FieldHint></div>
            <div className="space-y-1.5"><label className={labelClass}>Bio</label><textarea className={`${fieldClass} min-h-[100px]`} value={form.bio} onChange={(e) => set("bio", e.target.value)} /><FieldHint>Short bio shown in the "About the Host" section</FieldHint></div>
            <div className="space-y-1.5"><label className={labelClass}>Image URL</label><input className={fieldClass} value={form.image_url} onChange={(e) => set("image_url", e.target.value)} /><FieldHint>Square headshot — used on cards and detail pages</FieldHint></div>
            <div className="space-y-1.5"><label className={labelClass}>LinkedIn URL</label><input className={fieldClass} value={form.linkedin_url} onChange={(e) => set("linkedin_url", e.target.value)} /><FieldHint>Full LinkedIn profile URL — linked from the host bio</FieldHint></div>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={save} disabled={saving} className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-sm hover:shadow-md hover:brightness-105 disabled:opacity-50 transition-all">
            {saving ? "Saving…" : "Save"}
          </button>
          <button onClick={cancel} className="px-6 py-2.5 rounded-full text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors">Cancel</button>
        </div>
      </div>
    );
  }

  if (loading) return <div className="py-16 text-center text-gray-400 text-sm">Loading hosts…</div>;

  if (error) return (
    <div className="py-16 text-center space-y-3">
      <p className="text-destructive text-sm">Failed to load hosts: {error}</p>
      <button onClick={fetchHosts} className="text-sm text-primary hover:underline">Retry</button>
    </div>
  );

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-dark-foreground" style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)' }}>Hosts</h2>
        <button
          onClick={startCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-sm hover:shadow-md hover:brightness-105 transition-all"
        >
          <Plus className="h-4 w-4" />
          New Host
        </button>
      </div>

      <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Name</th>
              <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Title</th>
              <th className="text-right px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hosts.map((h) => (
              <tr key={h.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/80 transition-colors">
                <td className="px-6 py-5 text-sm font-medium text-gray-900">{h.name}</td>
                <td className="px-6 py-5 text-sm text-gray-500">{h.title || "—"}</td>
                <td className="px-6 py-5 text-right">
                  <div className="inline-flex items-center gap-1">
                    <button onClick={() => startEdit(h)} className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors" title="Edit">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(h.id)} className="p-2 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {hosts.length === 0 && (
              <tr><td colSpan={3} className="px-6 py-12 text-center text-gray-400 text-sm">No hosts yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHosts;
