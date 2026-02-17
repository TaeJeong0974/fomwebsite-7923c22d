import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearAdminSession } from "@/lib/adminApi";
import AdminEpisodes from "@/components/admin/AdminEpisodes";
import AdminHosts from "@/components/admin/AdminHosts";
import AdminSpeakers from "@/components/admin/AdminSpeakers";
import { MacDesktop, MacMenuBar, MacWindow } from "@/components/admin/MacOS";

type WindowId = "episodes" | "hosts" | "speakers";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [openWindows, setOpenWindows] = useState<Set<WindowId>>(new Set(["episodes", "hosts", "speakers"]));
  const [activeWindow, setActiveWindow] = useState<WindowId>("episodes");
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

  const toggleWindow = (id: WindowId) => {
    setOpenWindows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        setActiveWindow(id);
      }
      return next;
    });
  };

  const bringToFront = (id: WindowId) => setActiveWindow(id);

  if (loading) return (
    <MacDesktop className="flex items-center justify-center">
      <span className="text-xs font-bold text-black" style={{ fontFamily: "'Chicago', 'Geneva', monospace" }}>Loading…</span>
    </MacDesktop>
  );

  const windows: { id: WindowId; title: string; icon: string }[] = [
    { id: "episodes", title: "Content Manager", icon: "📺" },
    { id: "hosts", title: "Hosts", icon: "🎙️" },
    { id: "speakers", title: "Speakers", icon: "🗣️" },
  ];

  return (
    <MacDesktop className="pt-0">
      {/* Menu Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <MacMenuBar>
          <span className="text-sm">🍎</span>
          <span className="cursor-default font-bold">Finder</span>
          <span className="cursor-default">File</span>
          <span className="cursor-default">Edit</span>
          <span className="cursor-default">View</span>
          {windows.map((w) => (
            <button
              key={w.id}
              onClick={() => toggleWindow(w.id)}
              className={`cursor-default capitalize ${openWindows.has(w.id) ? "font-bold underline" : ""}`}
            >
              {w.id}
            </button>
          ))}
          <div className="flex-1" />
          <button onClick={handleLogout} className="cursor-default hover:underline">
            Sign Out
          </button>
        </MacMenuBar>
      </div>

      {/* Desktop with windows */}
      <div className="pt-[30px] p-4 sm:p-6 lg:p-8 space-y-4">
        {/* Desktop icons for closed windows */}
        {windows.some((w) => !openWindows.has(w.id)) && (
          <div className="flex gap-6 mb-4 justify-end">
            {windows.filter((w) => !openWindows.has(w.id)).map((w) => (
              <button
                key={w.id}
                onClick={() => toggleWindow(w.id)}
                className="flex flex-col items-center gap-1 group"
              >
                <div
                  className="w-12 h-10 border-2 border-black bg-white flex items-center justify-center text-lg"
                  style={{ boxShadow: "2px 2px 0px #000" }}
                >
                  {w.icon}
                </div>
                <span
                  className="text-[10px] font-bold text-black group-hover:underline"
                  style={{ fontFamily: "'Chicago', 'Geneva', monospace" }}
                >
                  {w.title}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Episodes Window */}
        {openWindows.has("episodes") && (
          <div
            className={`max-w-6xl mx-auto relative ${activeWindow === "episodes" ? "z-30" : "z-10"}`}
            onClick={() => bringToFront("episodes")}
          >
            <MacWindow
              title="Content Manager"
              className={activeWindow !== "episodes" ? "opacity-95" : ""}
              onClose={() => toggleWindow("episodes")}
            >
              <div className="p-3 sm:p-4">
                <AdminEpisodes onSwitchToSpeakers={() => { setOpenWindows((p) => new Set([...p, "speakers"])); setActiveWindow("speakers"); }} />
              </div>
            </MacWindow>
          </div>
        )}

        {/* Hosts Window */}
        {openWindows.has("hosts") && (
          <div
            className={`max-w-4xl mx-auto relative ${activeWindow === "hosts" ? "z-30" : "z-10"}`}
            onClick={() => bringToFront("hosts")}
          >
            <MacWindow
              title="Hosts"
              className={activeWindow !== "hosts" ? "opacity-95" : ""}
              onClose={() => toggleWindow("hosts")}
            >
              <div className="p-3 sm:p-4">
                <AdminHosts />
              </div>
            </MacWindow>
          </div>
        )}

        {/* Speakers Window */}
        {openWindows.has("speakers") && (
          <div
            className={`max-w-4xl mx-auto relative ${activeWindow === "speakers" ? "z-30" : "z-10"}`}
            onClick={() => bringToFront("speakers")}
          >
            <MacWindow
              title="Speakers"
              className={activeWindow !== "speakers" ? "opacity-95" : ""}
              onClose={() => toggleWindow("speakers")}
            >
              <div className="p-3 sm:p-4">
                <AdminSpeakers />
              </div>
            </MacWindow>
          </div>
        )}
      </div>
    </MacDesktop>
  );
};

export default AdminDashboard;
