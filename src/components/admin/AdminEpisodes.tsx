import { useEffect, useState, useCallback } from "react";
import { adminApi } from "@/lib/adminApi";
import { toast } from "sonner";
import { podcastEpisodes, podcastHosts } from "@/lib/podcastData";
import { EPISODE_IMAGES } from "@/lib/episodeImages";
import { PixelGrip, PixelSpinner } from "./PixelIcons";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import EpisodeForm from "./EpisodeForm";
import { MacButton, MacStatusChip, MacTable, MacImagePreview, MAC_FONT, MAC_TITLE_FONT } from "./MacOS";
import MacConfirmDialog from "./MacConfirmDialog";

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

const macFont = MAC_FONT;

// ── Sortable Row ──
const SortableRow = ({ ep, stale, isPromoting, canPromote, onEdit, onDelete, onPromote }: {
  ep: Episode; stale: boolean; isPromoting: boolean; canPromote: boolean;
  onEdit: (id: string) => void; onDelete: (id: string) => void; onPromote: (id: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: ep.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
    position: 'relative' as const,
  };

  return (
    <tr ref={setNodeRef} style={style} className="border-b border-black/20 last:border-0 hover:bg-black/5">
      <td className="px-2 py-2">
        <button type="button" {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing touch-none p-0.5">
          <PixelGrip className="h-3 w-3" />
        </button>
      </td>
      <td className="px-2 py-2 text-[11px] text-gray-500" style={macFont}>{ep.episode_number ?? "—"}</td>
      <td className="px-2 py-1.5 w-10">
        {(() => {
          const img = EPISODE_IMAGES[ep.slug];
          return img ? (
            <MacImagePreview src={img} alt={ep.title} className="w-8 h-8 rounded object-cover border border-black/20" />
          ) : (
            <div className="w-8 h-8 rounded border border-black/20 bg-gray-100" />
          );
        })()}
      </td>
      <td className="px-2 py-2 text-[11px] font-bold" style={macFont}>{ep.title}</td>
      <td className="px-2 py-2 text-[11px] hidden sm:table-cell" style={macFont}>{ep.guest_name || "—"}</td>
      <td className="px-2 py-2 text-[11px] hidden sm:table-cell" style={macFont}>{ep.guest_company || "—"}</td>
      <td className="px-2 py-2">
        <MacStatusChip status={ep.status || (ep.published ? "published" : "draft")} />
      </td>
      <td className="px-2 py-2 text-center hidden sm:table-cell">
        {canPromote ? (
          <MacButton
            onClick={() => onPromote(ep.id)}
            disabled={isPromoting}
            primary={stale}
            className="text-[10px] px-2 py-0.5"
          >
            {isPromoting ? "…" : !stale ? "✓ Live" : "Push"}
          </MacButton>
        ) : (
          <span className="text-[10px] text-gray-400" style={macFont}>—</span>
        )}
      </td>
      <td className="px-2 py-2 text-right">
        <div className="inline-flex items-center gap-1">
          <MacButton onClick={() => onEdit(ep.id)} className="text-[10px] px-2 py-0.5">Edit</MacButton>
          <MacButton onClick={() => onDelete(ep.id)} className="text-[10px] px-2 py-0.5">Del</MacButton>
        </div>
      </td>
    </tr>
  );
};

const AdminEpisodes = ({ onSwitchToSpeakers }: { onSwitchToSpeakers?: () => void }) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [promoting, setPromoting] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleSeed = async () => {
    if (!confirm("This will import all episodes from the static site data into the CMS. Existing episodes with the same slug will be updated. Continue?")) return;
    setSeeding(true);
    try {
      const staticData = podcastEpisodes.map(ep => ({
        ...ep,
        hosts: ep.hosts || podcastHosts,
      }));
      await adminApi("seed-from-static", {
        episodes: staticData,
        hosts: podcastHosts,
      });
      toast.success("Imported all episodes from site data");
      fetchEpisodes();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Seed failed");
    }
    setSeeding(false);
  };

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

  const [confirmAction, setConfirmAction] = useState<{ message: string; action: () => void } | null>(null);

  const handleDelete = (id: string) => {
    const ep = episodes.find((e) => e.id === id);
    setConfirmAction({
      message: `Delete episode\n"${ep?.title || "Untitled"}"?`,
      action: async () => {
        setConfirmAction(null);
        try {
          await adminApi("delete-episode", { id });
          toast.success("Deleted");
          fetchEpisodes();
        } catch (err: unknown) {
          toast.error(err instanceof Error ? err.message : "Delete failed");
        }
      },
    });
  };

  const handlePromote = (id: string) => {
    const ep = episodes.find((e) => e.id === id);
    setConfirmAction({
      message: `Push "${ep?.title || "Untitled"}"\nto live?`,
      action: async () => {
        setConfirmAction(null);
        setPromoting(id);
        try {
          await adminApi("promote-to-live", { id });
          toast.success("Pushed to live");
          fetchEpisodes();
        } catch (err: unknown) {
          toast.error(err instanceof Error ? err.message : "Promote failed");
        }
        setPromoting(null);
      },
    });
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = episodes.findIndex((ep) => ep.id === active.id);
    const newIndex = episodes.findIndex((ep) => ep.id === over.id);
    const reordered = arrayMove(episodes, oldIndex, newIndex);

    const updated = reordered.map((ep, i) => ({ ...ep, episode_number: i + 1 }));
    setEpisodes(updated);

    try {
      await adminApi("reorder-episodes", {
        orders: updated.map((ep) => ({ id: ep.id, episode_number: ep.episode_number })),
      });
      toast.success("Order saved");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Reorder failed");
      fetchEpisodes();
    }
  };

  const isLiveStale = (ep: Episode) => {
    if (!ep.promoted_at) return true;
    if (!ep.updated_at) return false;
    return new Date(ep.updated_at) > new Date(ep.promoted_at);
  };

  if (editing) return <EpisodeForm episodeId={editing} onDone={() => { setEditing(null); fetchEpisodes(); }} onSwitchToSpeakers={onSwitchToSpeakers} />;
  if (creating) return <EpisodeForm onDone={() => { setCreating(false); fetchEpisodes(); }} onSwitchToSpeakers={onSwitchToSpeakers} />;

  if (loading) return <div className="py-8 text-center text-[11px]" style={macFont}>Loading episodes…</div>;

  if (error) return (
    <div className="py-8 text-center space-y-2">
      <p className="text-[11px]" style={macFont}>Failed to load episodes: {error}</p>
      <MacButton onClick={fetchEpisodes}>Retry</MacButton>
    </div>
  );

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold" style={MAC_TITLE_FONT}>
          Episodes ({episodes.length})
        </span>
        <div className="flex items-center gap-1">
          <MacButton onClick={handleSeed} disabled={seeding}>
            {seeding ? <PixelSpinner className="h-3 w-3" /> : null}
            {seeding ? "Importing…" : "Import"}
          </MacButton>
          <MacButton primary onClick={() => setCreating(true)}>+ New</MacButton>
        </div>
      </div>

      <MacTable>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={episodes.map((ep) => ep.id)} strategy={verticalListSortingStrategy}>
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-black bg-white">
                  <th className="w-8 px-2 py-1.5" />
                  <th className="text-left px-2 py-1.5 text-[10px] font-bold uppercase" style={macFont}>#</th>
                  <th className="w-10 px-2 py-1.5" />
                  <th className="text-left px-2 py-1.5 text-[10px] font-bold uppercase" style={macFont}>Title</th>
                  <th className="text-left px-2 py-1.5 text-[10px] font-bold uppercase hidden sm:table-cell" style={macFont}>Guest</th>
                  <th className="text-left px-2 py-1.5 text-[10px] font-bold uppercase hidden sm:table-cell" style={macFont}>Company</th>
                  <th className="text-left px-2 py-1.5 text-[10px] font-bold uppercase" style={macFont}>Status</th>
                  <th className="text-center px-2 py-1.5 text-[10px] font-bold uppercase hidden sm:table-cell" style={macFont}>Live</th>
                  <th className="text-right px-2 py-1.5 text-[10px] font-bold uppercase" style={macFont}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {episodes.map((ep) => (
                  <SortableRow
                    key={ep.id}
                    ep={ep}
                    stale={isLiveStale(ep)}
                    isPromoting={promoting === ep.id}
                    canPromote={ep.status === "published" || ep.status === "upcoming"}
                    onEdit={setEditing}
                    onDelete={handleDelete}
                    onPromote={handlePromote}
                  />
                ))}
                {episodes.length === 0 && (
                  <tr><td colSpan={8} className="px-4 py-8 text-center text-[11px] text-gray-400" style={macFont}>No episodes yet</td></tr>
                )}
              </tbody>
            </table>
          </SortableContext>
        </DndContext>
      </MacTable>
      {confirmAction && (
        <MacConfirmDialog
          message={confirmAction.message}
          onConfirm={confirmAction.action}
          onCancel={() => setConfirmAction(null)}
        />
      )}
    </div>
  );
};

export default AdminEpisodes;
