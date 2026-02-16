import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearAdminSession } from "@/lib/adminApi";
import AdminEpisodes from "@/components/admin/AdminEpisodes";
import AdminHosts from "@/components/admin/AdminHosts";
import { LogOut } from "lucide-react";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"episodes" | "hosts">("episodes");
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

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-20 sm:pt-24 pb-16 px-4 sm:px-8 lg:px-12">
      <div className="w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-dark-foreground tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>Content Manager</h1>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground hover:bg-black/5 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>

        {/* Tabs — Google-style underline */}
        <div className="border-b border-border">
          <div className="flex gap-0">
            {(["episodes", "hosts"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative px-6 py-3 text-sm font-medium capitalize transition-colors ${
                  tab === t
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
                {tab === t && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div>
          {tab === "episodes" && <AdminEpisodes />}
          {tab === "hosts" && <AdminHosts />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
