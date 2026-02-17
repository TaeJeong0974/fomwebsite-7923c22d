import { useEffect, useState } from "react";
import { adminApi } from "@/lib/adminApi";
import { toast } from "sonner";
import { ArrowUpCircle, CheckCircle2, Loader2, Plus, Pencil, Trash2 } from "lucide-react";
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

const STATUS_CHIP: Record<string, string> = {
  published: "bg-green-100 text-green-800",
  upcoming: "bg-amber-100 text-amber-800",
  draft: "bg-gray-100 text-gray-600",
  deleted: "bg-red-100 text-red-700",
};

const AdminEpisodes = ({ onSwitchToSpeakers }: { onSwitchToSpeakers?: () => void }) => {
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

  if (editing) return <EpisodeForm episodeId={editing} onDone={() => { setEditing(null); fetchEpisodes(); }} onSwitchToSpeakers={onSwitchToSpeakers} />;
  if (creating) return <EpisodeForm onDone={() => { setCreating(false); fetchEpisodes(); }} onSwitchToSpeakers={onSwitchToSpeakers} />;

  if (loading) return <div className="py-16 text-center text-muted-foreground text-sm">Loading episodes…</div>;

  if (error) return (
    <div className="py-16 text-center space-y-3">
      <p className="text-destructive text-sm">Failed to load episodes: {error}</p>
      <button onClick={fetchEpisodes} className="text-sm text-primary hover:underline">Retry</button>
    </div>
  );

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-dark-foreground" style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)' }}>Episodes</h2>
        <button
          onClick={() => setCreating(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-sm hover:shadow-md hover:brightness-105 transition-all"
        >
          <Plus className="h-4 w-4" />
          New Episode
        </button>
      </div>

      {/* Card table */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">#</th>
              <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Title</th>
              <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 hidden sm:table-cell">Guest</th>
              <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 hidden sm:table-cell">Company</th>
              <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
              <th className="text-center px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 hidden sm:table-cell">Live</th>
              <th className="text-right px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((ep) => {
              const stale = isLiveStale(ep);
              const isPromoting = promoting === ep.id;
              const canPromote = ep.status === "published" || ep.status === "upcoming";

              return (
                <tr key={ep.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/80 transition-colors">
                  <td className="px-3 sm:px-6 py-3.5 sm:py-5 text-sm text-gray-400 font-medium">{ep.episode_number ?? "—"}</td>
                  <td className="px-3 sm:px-6 py-3.5 sm:py-5 text-sm font-medium text-gray-900">{ep.title}</td>
                  <td className="px-3 sm:px-6 py-3.5 sm:py-5 text-sm text-gray-500 hidden sm:table-cell">{ep.guest_name || "—"}</td>
                  <td className="px-3 sm:px-6 py-3.5 sm:py-5 text-sm text-gray-500 hidden sm:table-cell">{ep.guest_company || "—"}</td>
                  <td className="px-3 sm:px-6 py-3.5 sm:py-5">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${STATUS_CHIP[ep.status] || "bg-gray-100 text-gray-600"}`}>
                      {ep.status || (ep.published ? "published" : "draft")}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-3.5 sm:py-5 text-center hidden sm:table-cell">
                    {canPromote ? (
                      <button
                        onClick={() => handlePromote(ep.id)}
                        disabled={isPromoting}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          !stale
                            ? "bg-green-50 text-green-700 hover:bg-green-100"
                            : "bg-amber-50 text-amber-700 hover:bg-amber-100"
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
                        {isPromoting ? "Pushing…" : !stale ? "Live" : "Push"}
                      </button>
                    ) : (
                      <span className="text-xs text-gray-300">—</span>
                    )}
                  </td>
                  <td className="px-3 sm:px-6 py-3.5 sm:py-5 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => setEditing(ep.id)}
                        className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(ep.id)}
                        className="p-2 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {episodes.length === 0 && (
              <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-400 text-sm">No episodes yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminEpisodes;
