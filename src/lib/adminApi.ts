import { supabase } from "@/integrations/supabase/client";

const getPassword = () => sessionStorage.getItem("fom-admin-pw") || "";

export const adminApi = async (action: string, payload?: Record<string, unknown>) => {
  const { data, error } = await supabase.functions.invoke("admin-data", {
    body: { password: getPassword(), action, payload },
  });
  if (error) throw new Error(error.message || "Request failed");
  if (data?.error) throw new Error(data.error);
  return data;
};

export const setAdminPassword = (pw: string) => {
  sessionStorage.setItem("fom-admin-pw", pw);
  sessionStorage.setItem("fom-admin", "true");
};

export const clearAdminSession = () => {
  sessionStorage.removeItem("fom-admin-pw");
  sessionStorage.removeItem("fom-admin");
};
