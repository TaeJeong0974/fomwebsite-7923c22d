import { useEffect, useState } from "react";
import { adminApi } from "@/lib/adminApi";
import { toast } from "sonner";
import { ArrowUpCircle, CheckCircle2, Loader2 } from "lucide-react";
import EpisodeForm from "./EpisodeForm";

interface Episode {
  id: string;
  slug: string;
  title: string;
  guest_name: string | null;
  guest_company: string | null;
  status: string;
  published: boolean;
  episode_number: number | null;
  promoted_at: string | null;
  updated_at: string | null;
}

const STATUS_STYLES: Record<string, string> = {
  published: "text-green-600",
  upcoming: "text-amber-600",
  draft: "text-muted-foreground",
  deleted: "text-destructive",
};

const AdminEpisodes = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [promoting, setPromoting] = useState<string | null>(null);

  const fetchEpisodes = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await adminApi("list-episodes");
      setEpisodes(result.data || []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load";
      setError(msg);
      toast.error(msg);
    }
    setLoading(false);
  };

  useEffect(() => { fetchEpisodes(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this episode?")) return;
    try {
      await adminApi("delete-episode", { id });
      toast.success("Deleted");
      fetchEpisodes();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const handlePromote = async (id: string) => {
    setPromoting(id);
    try {
      await adminApi("promote-to-live", { id });
      toast.success("Pushed to live");
      fetchEpisodes();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Promote failed");
    }
    setPromoting(null);
  };

  const isLiveStale = (ep: Episode) => {
    if (!ep.promoted_at) return true;
    if (!ep.updated_at) return false;
    return new Date(ep.updated_at) > new Date(ep.promoted_at);
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
        <button onClick={() => setCreating(true)} className="px-4 py-2.5 rounded-xl bg-foreground text-background text-body-sm font-medium hover:opacity-90 transition-opacity">
          + New Episode
        </button>
      </div>
      <div className="rounded-xl overflow-hidden border border-white/20">
        <table className="w-full">
          <thead>
            <tr className="bg-white/30 backdrop-blur-sm">
              <th className="text-table-header text-left px-4 py-3 text-muted-foreground">#</th>
              <th className="text-table-header text-left px-4 py-3 text-muted-foreground">Title</th>
              <th className="text-table-header text-left px-4 py-3 text-muted-foreground">Guest</th>
              <th className="text-table-header text-left px-4 py-3 text-muted-foreground">Status</th>
              <th className="text-table-header text-center px-4 py-3 text-muted-foreground">Live</th>
              <th className="text-table-header text-right px-4 py-3 text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((ep) => {
              const stale = isLiveStale(ep);
              const isPromoting = promoting === ep.id;
              const canPromote = ep.status === "published" || ep.status === "upcoming";

              return (
                <tr key={ep.id} className="border-t border-white/15 hover:bg-white/20 transition-colors">
                  <td className="px-4 py-3 text-body-sm text-muted-foreground">{ep.episode_number ?? "—"}</td>
                  <td className="px-4 py-3 text-body-sm text-foreground">{ep.title}</td>
                  <td className="px-4 py-3 text-body-sm text-muted-foreground">{ep.guest_name}{ep.guest_company ? ` (${ep.guest_company})` : ""}</td>
                  <td className="px-4 py-3">
                    <span className={`badge-status capitalize ${STATUS_STYLES[ep.status] || "text-muted-foreground"}`}>
                      {ep.status || (ep.published ? "published" : "draft")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {canPromote ? (
                      <button
                        onClick={() => handlePromote(ep.id)}
                        disabled={isPromoting}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          !stale
                            ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
                            : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                        } disabled:opacity-50`}
                        title={stale ? "Staging has unpublished changes" : "Live is up to date"}
                      >
                        {isPromoting ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : !stale ? (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        ) : (
                          <ArrowUpCircle className="h-3.5 w-3.5" />
                        )}
                        {isPromoting ? "Pushing…" : !stale ? "Live" : "Push to Live"}
                      </button>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => setEditing(ep.id)} className="text-body-sm text-foreground/70 hover:text-foreground transition-colors">Edit</button>
                    <button onClick={() => handleDelete(ep.id)} className="text-body-sm text-destructive/70 hover:text-destructive transition-colors">Delete</button>
                  </td>
                </tr>
              );
            })}
            {episodes.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground text-body-sm">No episodes yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminEpisodes;
