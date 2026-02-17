import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { setAdminPassword } from "@/lib/adminApi";
import { toast } from "sonner";
import { MacDesktop, MacWindow, MacInput, MacButton, MacLabel } from "@/components/admin/MacOS";

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

      setAdminPassword(password);
      navigate("/admin/dashboard");
    } catch {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <MacDesktop className="flex items-center justify-center">
      <MacWindow title="Admin Login" className="w-full max-w-xs">
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div className="space-y-1">
            <MacLabel>Password</MacLabel>
            <MacInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <MacButton primary type="submit" disabled={loading} className="w-full">
            {loading ? "Verifying…" : "Enter"}
          </MacButton>
        </form>
      </MacWindow>
    </MacDesktop>
  );
};

export default AdminLogin;
