import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import EpisodeForm from "./EpisodeForm";

interface Episode {
  id: string;
  slug: string;
  title: string;
  guest_name: string | null;
  guest_company: string | null;
  published: boolean;
  episode_number: number | null;
}

const AdminEpisodes = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchEpisodes = async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from("episodes")
      .select("id, slug, title, guest_name, guest_company, published, episode_number")
      .order("episode_number", { ascending: true });
    if (err) { setError(err.message); toast.error(err.message); }
    else setEpisodes(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchEpisodes(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this episode?")) return;
    const { error } = await supabase.from("episodes").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); fetchEpisodes(); }
  };

  if (editing) return <EpisodeForm episodeId={editing} onDone={() => { setEditing(null); fetchEpisodes(); }} />;
  if (creating) return <EpisodeForm onDone={() => { setCreating(false); fetchEpisodes(); }} />;

  if (loading) return <div className="py-12 text-center text-muted-foreground text-body-sm">Loading episodes…</div>;

  if (error) return (
    <div className="py-12 text-center space-y-3">
      <p className="text-destructive text-body-sm">Failed to load episodes: {error}</p>
      <button onClick={fetchEpisodes} className="text-body-sm text-primary hover:underline">Retry</button>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-section-header font-medium text-foreground">Episodes</h2>
        <button onClick={() => setCreating(true)} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-body-sm font-medium">
          + New Episode
        </button>
      </div>
      <div className="border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-muted">
              <th className="text-table-header text-left px-4 py-3 text-muted-foreground">#</th>
              <th className="text-table-header text-left px-4 py-3 text-muted-foreground">Title</th>
              <th className="text-table-header text-left px-4 py-3 text-muted-foreground">Guest</th>
              <th className="text-table-header text-left px-4 py-3 text-muted-foreground">Status</th>
              <th className="text-table-header text-right px-4 py-3 text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((ep) => (
              <tr key={ep.id} className="border-t border-border hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3 text-body-sm text-muted-foreground">{ep.episode_number ?? "—"}</td>
                <td className="px-4 py-3 text-body-sm text-foreground">{ep.title}</td>
                <td className="px-4 py-3 text-body-sm text-muted-foreground">{ep.guest_name}{ep.guest_company ? ` (${ep.guest_company})` : ""}</td>
                <td className="px-4 py-3">
                  <span className={`badge-status ${ep.published ? "text-green-600" : "text-muted-foreground"}`}>
                    {ep.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button onClick={() => setEditing(ep.id)} className="text-body-sm text-primary hover:underline">Edit</button>
                  <button onClick={() => handleDelete(ep.id)} className="text-body-sm text-destructive hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {episodes.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground text-body-sm">No episodes yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminEpisodes;
