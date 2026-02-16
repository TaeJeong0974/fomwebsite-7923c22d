import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) { toast.error(error.message); setLoading(false); return; }
      toast.success("Account created! You can now sign in.");
      setMode("login");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { toast.error(error.message); setLoading(false); return; }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { toast.error("Authentication failed"); setLoading(false); return; }

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin");

    if (!roles || roles.length === 0) {
      toast.error("You do not have admin access");
      await supabase.auth.signOut();
      setLoading(false);
      return;
    }
    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 rounded-2xl border border-border bg-card shadow-lg space-y-6"
      >
        <h1 className="text-display-md text-center text-foreground">
          {mode === "login" ? "Admin Login" : "Create Account"}
        </h1>
        <div className="space-y-2">
          <label className="text-body-sm text-muted-foreground">Email</label>
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-body-sm text-muted-foreground">Password</label>
          <input
            type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
          />
        </div>
        <button
          type="submit" disabled={loading}
          className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {loading ? "Please wait…" : mode === "login" ? "Sign In" : "Sign Up"}
        </button>
        <p className="text-center text-body-sm text-muted-foreground">
          {mode === "login" ? (
            <>No account? <button type="button" onClick={() => setMode("signup")} className="text-primary hover:underline">Sign up</button></>
          ) : (
            <>Have an account? <button type="button" onClick={() => setMode("login")} className="text-primary hover:underline">Sign in</button></>
          )}
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
