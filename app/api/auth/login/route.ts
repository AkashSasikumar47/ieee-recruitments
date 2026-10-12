import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@ieee/supabase/server";

function to(request: NextRequest, pathname: string, error?: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = "";
  if (error) url.searchParams.set("error", error);
  return NextResponse.redirect(url, 303);
}

export async function POST(request: NextRequest) {
  const form = await request.formData().catch(() => null);
  const email = String(form?.get("email") ?? "").trim();
  const password = String(form?.get("password") ?? "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return to(request, "/admin/login", "credentials");

  const { data: isAdmin } = await supabase.rpc("ieee_shared_is_admin");
  if (!isAdmin) {
    await supabase.auth.signOut();
    return to(request, "/admin/login", "admin");
  }

  return to(request, "/admin");
}
