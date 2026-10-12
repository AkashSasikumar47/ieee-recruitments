import { createClient } from "@ieee/supabase/server";

export async function getAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: admin } = await supabase.rpc("ieee_shared_is_admin");
  return admin ? { supabase, email: user.email ?? "" } : null;
}

export async function getAdminClient() {
  return (await getAdmin())?.supabase ?? null;
}

export async function getDrive() {
  const supabase = await createClient();
  const { data } = await supabase.rpc("ieee_recruitments_status");
  return data ?? null;
}
