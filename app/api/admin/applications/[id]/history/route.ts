import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/auth";

export async function GET(
  _request: Request,
  { params }: RouteContext<"/api/admin/applications/[id]/history">,
) {
  const supabase = await getAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data } = await supabase
    .from("ieee_recruitments_changes")
    .select("id, domain, stage, notes_changed, actor_email, created_at")
    .eq("application_id", (await params).id)
    .order("created_at", { ascending: false })
    .limit(40);

  return NextResponse.json({ changes: data ?? [] });
}
