import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("verify-admin-password", {
        body: { password },
      });

      if (error || !data?.success) {
        toast.error("Invalid password");
        setLoading(false);
        return;
      }

      sessionStorage.setItem("fom-admin", "true");
      navigate("/admin/dashboard");
    } catch {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 rounded-2xl border border-border bg-card shadow-lg space-y-6"
      >
        <h1 className="text-display-md text-center text-foreground">Admin</h1>
        <div className="space-y-2">
          <label className="text-body-sm text-muted-foreground">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {loading ? "Verifying…" : "Enter"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
