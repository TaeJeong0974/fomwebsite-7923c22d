import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearAdminSession } from "@/lib/adminApi";
import AdminEpisodes from "@/components/admin/AdminEpisodes";
import AdminHosts from "@/components/admin/AdminHosts";
import AdminSpeakers from "@/components/admin/AdminSpeakers";
import { MacDesktop, MacMenuBar, MacWindow } from "@/components/admin/MacOS";

const TABS = ["episodes", "hosts", "speakers"] as const;
type Tab = typeof TABS[number];

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("episodes");
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

  if (loading) return (
    <MacDesktop className="flex items-center justify-center">
      <span className="text-xs font-bold text-black" style={{ fontFamily: "'Chicago', 'Geneva', monospace" }}>Loading…</span>
    </MacDesktop>
  );

  return (
    <MacDesktop className="pt-0">
      {/* Menu Bar — fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <MacMenuBar>
          <span className="text-sm">🍎</span>
          <span className="cursor-default">File</span>
          <span className="cursor-default">Edit</span>
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`cursor-default capitalize ${tab === t ? "underline" : ""}`}
            >
              {t}
            </button>
          ))}
          <div className="flex-1" />
          <button onClick={handleLogout} className="cursor-default hover:underline">
            Sign Out
          </button>
        </MacMenuBar>
      </div>

      {/* Desktop Content */}
      <div className="pt-[30px] p-4 sm:p-6 lg:p-8">
        <MacWindow title="Content Manager" className="max-w-6xl mx-auto">
          <div className="p-3 sm:p-4">
            {/* Tabs as retro buttons */}
            <div className="flex gap-1 mb-3 border-b border-black pb-2">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-3 py-1 text-xs font-bold capitalize border border-black rounded-[3px] transition-none ${
                    tab === t
                      ? "bg-black text-white"
                      : "bg-white text-black active:bg-black active:text-white"
                  }`}
                  style={{ fontFamily: "'Chicago', 'Geneva', monospace" }}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Content */}
            {tab === "episodes" && <AdminEpisodes onSwitchToSpeakers={() => setTab("speakers")} />}
            {tab === "hosts" && <AdminHosts />}
            {tab === "speakers" && <AdminSpeakers />}
          </div>
        </MacWindow>
      </div>
    </MacDesktop>
  );
};

export default AdminDashboard;
