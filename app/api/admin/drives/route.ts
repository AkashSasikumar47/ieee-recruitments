import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/auth";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function fail(error: string, status = 400) {
  return NextResponse.json({ error }, { status });
}

export async function POST(request: Request) {
  const supabase = await getAdminClient();
  if (!supabase) return fail("Unauthorized", 401);

  const body = (await request.json().catch(() => null)) as {
    drive_id?: unknown;
    name?: unknown;
  } | null;
  const driveId = typeof body?.drive_id === "string" ? body.drive_id : "";
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  if (driveId ? !UUID.test(driveId) : !name || name.length > 80) {
    return fail("Give the round a name of up to 80 characters.");
  }

  let target = driveId;
  if (!target) {
    const { data: created, error: creating } = await supabase
      .from("ieee_recruitments_drives")
      .insert({ name })
      .select("id")
      .single();
    if (creating || !created) return fail("Couldn't create the round.");
    target = created.id;
  }

  const { data, error } = await supabase.rpc("ieee_recruitments_open", {
    target,
    new_name: name,
  });
  if (error) return fail("Couldn't open the round.");
  return NextResponse.json({ id: data });
}

export async function PATCH() {
  const supabase = await getAdminClient();
  if (!supabase) return fail("Unauthorized", 401);

  const { error } = await supabase
    .from("ieee_recruitments_drives")
    .update({ is_open: false })
    .eq("is_open", true);
  if (error) return fail("Couldn't close the round.");
  return NextResponse.json({ ok: true });
}
