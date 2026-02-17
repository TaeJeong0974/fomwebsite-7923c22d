import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { clearAdminSession } from "@/lib/adminApi";
import AdminEpisodes from "@/components/admin/AdminEpisodes";
import AdminHosts from "@/components/admin/AdminHosts";
import AdminSpeakers from "@/components/admin/AdminSpeakers";
import { MacDesktop, MacMenuBar } from "@/components/admin/MacOS";
import DraggableWindow from "@/components/admin/DraggableWindow";
import fomPixelLogo from "@/assets/fom-pixel-logo.png";
import fomBlackIcon from "/favicon-black.svg";
import { playDialupSound } from "@/lib/dialupSound";

const macFont = { fontFamily: "'Chicago', 'Geneva', monospace" };

type WindowId = "episodes" | "hosts" | "speakers";

interface WindowState {
  id: WindowId;
  title: string;
  icon: string;
}

const WINDOWS: WindowState[] = [
  { id: "episodes", title: "Content Manager", icon: "📺" },
  { id: "hosts", title: "Hosts", icon: "🎙️" },
  { id: "speakers", title: "Speakers", icon: "🗣️" },
];

const DEFAULT_POSITIONS: Record<WindowId, { x: number; y: number }> = {
  episodes: { x: 30, y: 40 },
  hosts: { x: 80, y: 80 },
  speakers: { x: 130, y: 120 },
};

const DEFAULT_SIZES: Record<WindowId, { width: number; height: number }> = {
  episodes: { width: 900, height: 550 },
  hosts: { width: 650, height: 450 },
  speakers: { width: 650, height: 450 },
};

/* ── Clock ── */
const MenuBarClock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  const fmt = time.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  return <span style={macFont}>{fmt}</span>;
};

/* ── Boot Screen ── */
const BootScreen = ({ onDone }: { onDone: () => void }) => {
  const [stage, setStage] = useState<"happy" | "loading" | "welcome">("happy");

  useEffect(() => {
    const sound = playDialupSound(2.5);
    const t1 = setTimeout(() => setStage("loading"), 800);
    const t2 = setTimeout(() => setStage("welcome"), 2000);
    const t3 = setTimeout(onDone, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); sound.stop(); };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center gap-4">
      {stage === "happy" && (
        <div className="text-6xl animate-pulse" style={{ imageRendering: "pixelated" }}>
          {/* Happy Mac pixel art as text */}
          <svg width="64" height="64" viewBox="0 0 16 16" style={{ imageRendering: "pixelated" }}>
            <rect x="4" y="1" width="8" height="12" fill="black" />
            <rect x="5" y="2" width="6" height="7" fill="white" />
            <rect x="5" y="9" width="6" height="3" fill="#c0c0c0" />
            <rect x="7" y="10" width="2" height="1" fill="black" />
            {/* Eyes */}
            <rect x="6" y="3" width="1" height="2" fill="black" />
            <rect x="9" y="3" width="1" height="2" fill="black" />
            {/* Nose */}
            <rect x="7" y="5" width="2" height="1" fill="#c0c0c0" />
            {/* Smile */}
            <rect x="6" y="7" width="1" height="1" fill="black" />
            <rect x="7" y="8" width="2" height="1" fill="black" />
            <rect x="9" y="7" width="1" height="1" fill="black" />
            {/* Base */}
            <rect x="3" y="13" width="10" height="1" fill="black" />
            <rect x="5" y="14" width="6" height="1" fill="black" />
          </svg>
        </div>
      )}
      {stage === "loading" && (
        <div className="flex flex-col items-center gap-3">
          <svg width="64" height="64" viewBox="0 0 16 16" style={{ imageRendering: "pixelated" }}>
            <rect x="4" y="1" width="8" height="12" fill="black" />
            <rect x="5" y="2" width="6" height="7" fill="white" />
            <rect x="5" y="9" width="6" height="3" fill="#c0c0c0" />
            <rect x="7" y="10" width="2" height="1" fill="black" />
            <rect x="6" y="3" width="1" height="2" fill="black" />
            <rect x="9" y="3" width="1" height="2" fill="black" />
            <rect x="7" y="5" width="2" height="1" fill="#c0c0c0" />
            <rect x="6" y="7" width="1" height="1" fill="black" />
            <rect x="7" y="8" width="2" height="1" fill="black" />
            <rect x="9" y="7" width="1" height="1" fill="black" />
            <rect x="3" y="13" width="10" height="1" fill="black" />
            <rect x="5" y="14" width="6" height="1" fill="black" />
          </svg>
          <span className="text-xs font-bold" style={macFont}>Starting up…</span>
          {/* Progress bar */}
          <div className="w-48 h-3 border-2 border-black bg-white overflow-hidden">
            <div className="h-full bg-black animate-[bootProgress_1.5s_ease-in-out_forwards]" />
          </div>
        </div>
      )}
      {stage === "welcome" && (
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-bold" style={macFont}>Welcome to FOM CMS</span>
        </div>
      )}

      <style>{`
        @keyframes bootProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

/* ── 1-bit Pixel Art Icons (System 7 style) ── */
const PixelIcon = ({ type, selected }: { type: WindowId | "website"; selected: boolean }) => {
  const fill = selected ? "white" : "black";
  const bg = selected ? "black" : "white";

  const icons: Record<WindowId | "website", JSX.Element> = {
    // TV/monitor icon for Content Manager
    episodes: (
      <svg width="32" height="32" viewBox="0 0 16 16" fill="none" style={{ imageRendering: "pixelated" }}>
        <rect width="16" height="16" fill={bg} />
        <rect x="2" y="2" width="12" height="9" fill={fill} />
        <rect x="3" y="3" width="10" height="7" fill={bg} />
        <rect x="4" y="4" width="8" height="5" fill={fill} />
        <rect x="5" y="5" width="6" height="3" fill={bg} />
        <rect x="6" y="12" width="4" height="1" fill={fill} />
        <rect x="4" y="13" width="8" height="1" fill={fill} />
      </svg>
    ),
    // Microphone icon for Hosts
    hosts: (
      <svg width="32" height="32" viewBox="0 0 16 16" fill="none" style={{ imageRendering: "pixelated" }}>
        <rect width="16" height="16" fill={bg} />
        <rect x="6" y="1" width="4" height="8" rx="0" fill={fill} />
        <rect x="7" y="2" width="2" height="6" fill={bg} />
        <rect x="4" y="5" width="1" height="4" fill={fill} />
        <rect x="11" y="5" width="1" height="4" fill={fill} />
        <rect x="5" y="9" width="6" height="1" fill={fill} />
        <rect x="7" y="10" width="2" height="2" fill={fill} />
        <rect x="5" y="12" width="6" height="1" fill={fill} />
      </svg>
    ),
    // Person/podium icon for Speakers
    speakers: (
      <svg width="32" height="32" viewBox="0 0 16 16" fill="none" style={{ imageRendering: "pixelated" }}>
        <rect width="16" height="16" fill={bg} />
        <rect x="7" y="1" width="2" height="2" fill={fill} />
        <rect x="6" y="3" width="4" height="1" fill={fill} />
        <rect x="5" y="4" width="6" height="3" fill={fill} />
        <rect x="7" y="7" width="2" height="2" fill={fill} />
        <rect x="3" y="9" width="10" height="1" fill={fill} />
        <rect x="4" y="10" width="8" height="1" fill={fill} />
        <rect x="5" y="11" width="6" height="3" fill={fill} />
        <rect x="6" y="11" width="4" height="3" fill={bg} />
      </svg>
    ),
    // Globe/internet icon for Website
    website: (
      <svg width="32" height="32" viewBox="0 0 16 16" fill="none" style={{ imageRendering: "pixelated" }}>
        <rect width="16" height="16" fill={bg} />
        <rect x="5" y="1" width="6" height="1" fill={fill} />
        <rect x="3" y="2" width="2" height="1" fill={fill} />
        <rect x="11" y="2" width="2" height="1" fill={fill} />
        <rect x="2" y="3" width="1" height="2" fill={fill} />
        <rect x="13" y="3" width="1" height="2" fill={fill} />
        <rect x="1" y="5" width="1" height="4" fill={fill} />
        <rect x="14" y="5" width="1" height="4" fill={fill} />
        <rect x="2" y="9" width="1" height="2" fill={fill} />
        <rect x="13" y="9" width="1" height="2" fill={fill} />
        <rect x="3" y="11" width="2" height="1" fill={fill} />
        <rect x="11" y="11" width="2" height="1" fill={fill} />
        <rect x="5" y="12" width="6" height="1" fill={fill} />
        {/* Horizontal lines */}
        <rect x="2" y="5" width="12" height="1" fill={fill} />
        <rect x="2" y="8" width="12" height="1" fill={fill} />
        {/* Vertical line */}
        <rect x="7" y="1" width="2" height="12" fill={fill} />
      </svg>
    ),
  };

  return icons[type];
};

/* ── Desktop Icon with Folder wrapper ── */
const DesktopIcon = ({
  type,
  label,
  selected,
  onClick,
  onDoubleClick,
}: {
  type: WindowId;
  label: string;
  selected: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
}) => (
  <button
    className="flex flex-col items-center gap-0.5 group"
    onClick={(e) => { e.stopPropagation(); onClick(); onDoubleClick(); }}
  >
    {/* Folder shape */}
    <div className={`relative ${selected ? "invert" : ""}`}>
      <svg width="48" height="40" viewBox="0 0 48 40" style={{ imageRendering: "pixelated" }}>
        {/* Folder tab */}
        <rect x="2" y="0" width="16" height="6" fill="black" />
        <rect x="3" y="1" width="14" height="4" fill="white" />
        {/* Folder body */}
        <rect x="0" y="5" width="48" height="35" fill="black" />
        <rect x="1" y="6" width="46" height="33" fill="white" />
        <rect x="2" y="7" width="44" height="31" fill="white" />
        {/* Bottom shadow line */}
        <rect x="1" y="38" width="46" height="1" fill="#808080" />
        <rect x="47" y="6" width="1" height="33" fill="#808080" />
      </svg>
      {/* Icon centered inside folder */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ paddingTop: 6 }}>
        <div className="scale-75">
          <PixelIcon type={type} selected={false} />
        </div>
      </div>
    </div>
    <span
      className={`text-[11px] font-bold px-1.5 py-0.5 ${
        selected ? "bg-black text-white" : "bg-white/80 text-black"
      }`}
      style={macFont}
    >
      {label}
    </span>
  </button>
);

/* ── Menu Dropdown ── */
const MenuDropdown = ({
  label,
  items,
  isOpen,
  onToggle,
  onClose,
}: {
  label: string;
  items: { label: string; onClick: () => void; shortcut?: string; divider?: boolean }[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={onToggle}
        className={`cursor-default px-2 text-sm ${isOpen ? "bg-black text-white" : ""}`}
        style={macFont}
      >
        {label}
      </button>
      {isOpen && (
        <div
          className="absolute left-0 top-full mt-0 border-2 border-black bg-white min-w-[160px] py-0.5 z-[60]"
          style={{ boxShadow: "2px 2px 0px #000" }}
        >
          {items.map((item, i) =>
            item.divider ? (
              <div key={i} className="border-t border-black my-0.5 mx-1" />
            ) : (
              <button
                key={i}
                className="w-full text-left px-3 py-1 text-sm hover:bg-black hover:text-white flex justify-between"
                style={macFont}
                onClick={() => { item.onClick(); onClose(); }}
              >
                <span>{item.label}</span>
                {item.shortcut && <span className="text-xs opacity-60">{item.shortcut}</span>}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

const AdminDashboard = () => {
  const [booting, setBooting] = useState(true);
  const [loading, setLoading] = useState(true);
  const [openWindows, setOpenWindows] = useState<Set<WindowId>>(new Set(["episodes"]));
  const [windowOrder, setWindowOrder] = useState<WindowId[]>(["episodes"]);
  const [selectedIcon, setSelectedIcon] = useState<WindowId | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("fom-admin") !== "true") {
      navigate("/admin");
      return;
    }
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    clearAdminSession();
    navigate("/admin");
  };

  const openWindow = useCallback((id: WindowId) => {
    setOpenWindows((prev) => new Set([...prev, id]));
    setWindowOrder((prev) => [...prev.filter((w) => w !== id), id]);
    setSelectedIcon(null);
  }, []);

  const closeWindow = useCallback((id: WindowId) => {
    setOpenWindows((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setWindowOrder((prev) => prev.filter((w) => w !== id));
  }, []);

  const bringToFront = useCallback((id: WindowId) => {
    setWindowOrder((prev) => [...prev.filter((w) => w !== id), id]);
  }, []);

  const handleBootDone = useCallback(() => setBooting(false), []);

  const activeWindow = windowOrder[windowOrder.length - 1] || null;

  if (loading) return (
    <MacDesktop className="flex items-center justify-center">
      <span className="text-sm font-bold text-black" style={macFont}>Loading…</span>
    </MacDesktop>
  );

  const closedWindows = WINDOWS.filter((w) => !openWindows.has(w.id));

  const fileMenuItems = [
    { label: "New Window", onClick: () => {}, shortcut: "⌘N" },
    { label: "", onClick: () => {}, divider: true },
    { label: "Close Window", onClick: () => { if (activeWindow) closeWindow(activeWindow); }, shortcut: "⌘W" },
    { label: "", onClick: () => {}, divider: true },
    { label: "Sign Out", onClick: handleLogout, shortcut: "⌘Q" },
  ];

  const viewMenuItems = WINDOWS.map((w) => ({
    label: `${openWindows.has(w.id) ? "✓ " : "  "}${w.title}`,
    onClick: () => openWindows.has(w.id) ? bringToFront(w.id) : openWindow(w.id),
  }));

  return (
    <MacDesktop className="pt-0 overflow-hidden" style={{ height: "100vh" }}>
      {booting && <BootScreen onDone={handleBootDone} />}

      {/* Menu Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <MacMenuBar>
          <div className="flex items-center gap-1">
            <img src={fomBlackIcon} alt="FOM" className="h-4 w-auto" />
            <span className="text-sm font-bold" style={macFont}>CMS</span>
          </div>

          <MenuDropdown
            label="File"
            items={fileMenuItems}
            isOpen={openMenu === "file"}
            onToggle={() => setOpenMenu(openMenu === "file" ? null : "file")}
            onClose={() => setOpenMenu(null)}
          />
          <MenuDropdown
            label="View"
            items={viewMenuItems}
            isOpen={openMenu === "view"}
            onToggle={() => setOpenMenu(openMenu === "view" ? null : "view")}
            onClose={() => setOpenMenu(null)}
          />

          <div className="flex-1" />
          <MenuBarClock />
        </MacMenuBar>
      </div>

      {/* Desktop area */}
      <div
        className="relative w-full"
        style={{ height: "calc(100vh - 22px)", marginTop: 22 }}
        onClick={() => { setSelectedIcon(null); setOpenMenu(null); }}
      >
        {/* Staging Banner */}
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 z-[6] border-2 border-black bg-[#fffde6] px-4 py-1.5 flex items-center gap-2"
          style={{ boxShadow: "2px 2px 0px #000", ...macFont }}
        >
          <span className="text-base">⚠️</span>
          <span className="text-[11px] font-bold">STAGING MODE — Edits here are not live on the website</span>
        </div>

        {/* Desktop Icons — always show all three on the right */}
        <div className="absolute top-4 right-4 flex flex-col gap-4 z-[5]">
          {WINDOWS.map((w) => (
            <DesktopIcon
              key={w.id}
              type={w.id}
              label={w.title}
              selected={selectedIcon === w.id}
              onClick={() => { setSelectedIcon(w.id); }}
              onDoubleClick={() => openWindows.has(w.id) ? bringToFront(w.id) : openWindow(w.id)}
            />
          ))}
          {/* Website link icon */}
          <button
            className="flex flex-col items-center gap-0.5 group"
            onClick={() => window.open("https://fomwebsite.lovable.app/", "_blank")}
          >
            <div
              className="border-2 border-black p-0.5 bg-white"
              style={{ boxShadow: "2px 2px 0px #000" }}
            >
              <PixelIcon type="website" selected={false} />
            </div>
            <span
              className="text-sm font-bold px-1.5 py-0.5 rounded-sm bg-white/80 text-black"
              style={macFont}
            >
              Website
            </span>
          </button>
        </div>

        {/* Draggable Windows */}
        {WINDOWS.filter((w) => openWindows.has(w.id)).map((w) => {
          const zIdx = windowOrder.indexOf(w.id) + 10;
          return (
            <DraggableWindow
              key={w.id}
              id={w.id}
              title={w.title}
              defaultPosition={DEFAULT_POSITIONS[w.id]}
              defaultSize={DEFAULT_SIZES[w.id]}
              isActive={activeWindow === w.id}
              zIndex={zIdx}
              onFocus={() => bringToFront(w.id)}
              onClose={() => closeWindow(w.id)}
            >
              <div className="p-3 sm:p-4">
                {w.id === "episodes" && (
                  <AdminEpisodes onSwitchToSpeakers={() => openWindow("speakers")} />
                )}
                {w.id === "hosts" && <AdminHosts />}
                {w.id === "speakers" && <AdminSpeakers />}
              </div>
            </DraggableWindow>
          );
        })}
      </div>
    </MacDesktop>
  );
};

export default AdminDashboard;
