import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/auth";
import { DOMAINS } from "@/lib/content";
import { STAGES } from "@/lib/recruitments";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function fail(error: string, status = 400) {
  return NextResponse.json({ error }, { status });
}

export async function POST(request: Request) {
  const supabase = await getAdminClient();
  if (!supabase) return fail("Unauthorized", 401);

  const body = (await request.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;
  const ids = Array.isArray(body?.ids)
    ? body.ids.filter(
        (id): id is string => typeof id === "string" && UUID.test(id),
      )
    : [];
  const domain = typeof body?.domain === "string" ? body.domain : "";
  const stage = typeof body?.stage === "string" ? body.stage : "";
  const notes =
    typeof body?.notes === "string" ? body.notes.trim().slice(0, 2000) : null;

  if (
    ids.length === 0 ||
    ids.length > 500 ||
    !DOMAINS.some((item) => item.code === domain) ||
    !STAGES.some((item) => item.value === stage)
  ) {
    return fail("Invalid request");
  }

  const { data, error } = await supabase.rpc("ieee_recruitments_set_stage", {
    targets: ids,
    target_domain: domain,
    new_stage: stage,
    new_notes: notes ?? undefined,
  });
  if (error) {
    return fail(
      error.message.includes("too_many_selected")
        ? "Someone can be selected in two domains at most. Change one of their other domains first."
        : "Couldn't update the stage.",
    );
  }
  return NextResponse.json({ changed: data });
}
