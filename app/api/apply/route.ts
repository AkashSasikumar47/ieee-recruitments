import { NextResponse } from "next/server";
import { createClient } from "@ieee/supabase/server";
import { DEGREES, DOMAINS, YEARS } from "@/lib/content";

const MESSAGES: Record<string, string> = {
  already_applied:
    "This register number is already on the list for this round.",
  invalid_domains: "Pick between one and three different domains.",
};

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function fail(error: string) {
  return NextResponse.json({ error }, { status: 400 });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;
  if (!body) return fail("Something went wrong. Try again.");

  const entry = {
    name: text(body.name, 100),
    register_number: text(body.register_number, 15).toUpperCase(),
    email: text(body.email, 120).toLowerCase(),
    phone: text(body.phone, 10),
    degree: text(body.degree, 40),
    department: text(body.department, 100),
    year: text(body.year, 20),
    linkedin: text(body.linkedin, 300),
    github: text(body.github, 300),
    experience: text(body.experience, 1000),
    resume: text(body.resume, 300),
    domains: (Array.isArray(body.domains) ? body.domains : [])
      .filter((item): item is string => typeof item === "string")
      .slice(0, 3),
  };

  if (!entry.name) return fail("Enter your full name.");
  if (!/^RA\d{13}$/.test(entry.register_number)) {
    return fail("Enter a valid register number, like RA2211003010001.");
  }
  if (!/^[A-Za-z0-9._%+-]+@srmist\.edu\.in$/.test(entry.email)) {
    return fail("Use your SRM email address (ending in @srmist.edu.in).");
  }
  if (!/^[6-9]\d{9}$/.test(entry.phone)) {
    return fail("Enter a valid 10-digit WhatsApp number.");
  }
  if (!DEGREES.includes(entry.degree)) return fail("Pick your degree.");
  if (!YEARS.includes(entry.year)) return fail("Pick your year of study.");
  if (!entry.department) return fail("Enter your department.");
  if (
    entry.domains.length === 0 ||
    entry.domains.some(
      (code) => !DOMAINS.some((domain) => domain.code === code),
    )
  ) {
    return fail(MESSAGES.invalid_domains!);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("ieee_recruitments_apply", {
    entry,
  });
  if (error || !data) {
    const code = error?.code === "23505" ? "already_applied" : error?.message;
    return fail(
      MESSAGES[code ?? ""] ?? "Couldn't save your details. Try again.",
    );
  }

  return NextResponse.json({ code: data });
}
