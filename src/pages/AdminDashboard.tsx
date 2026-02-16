import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearAdminSession } from "@/lib/adminApi";
import AdminEpisodes from "@/components/admin/AdminEpisodes";
import AdminHosts from "@/components/admin/AdminHosts";

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
    <div className="min-h-screen bg-background pt-20 pb-10 container-padding">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-display-md text-foreground" style={{ color: 'hsl(var(--foreground))' }}>CMS Dashboard</h1>
          <button onClick={handleLogout} className="text-body-sm text-muted-foreground hover:text-foreground transition-colors">
            Sign Out
          </button>
        </div>

        <div className="flex gap-1">
          {(["episodes", "hosts"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-xl text-body-sm font-medium capitalize transition-all ${
                tab === t
                  ? "glass border border-white/30 shadow-glass text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="glass rounded-2xl border border-white/20 shadow-glass p-5 sm:p-6">
          {tab === "episodes" && <AdminEpisodes />}
          {tab === "hosts" && <AdminHosts />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
