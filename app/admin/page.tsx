import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminFooter } from "@/components/admin/admin-footer";
import { AdminHeader } from "@/components/admin/admin-header";
import { ApplicationsBoard } from "@/components/admin/applications-board";
import { RoundBar } from "@/components/admin/round-bar";
import { getAdmin } from "@/lib/auth";
import type { Applicant, Stage } from "@/lib/recruitments";

export const metadata: Metadata = {
  title: "Admin | Recruitments",
  robots: { index: false },
};

export default async function AdminPage({ searchParams }: PageProps<"/admin">) {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");

  const { round } = await searchParams;
  const { data: drives } = await admin.supabase
    .from("ieee_recruitments_drives")
    .select("id, name, is_open, created_at")
    .order("created_at", { ascending: false });

  const list = drives ?? [];
  const current =
    round === "waitlist"
      ? null
      : (list.find((drive) => drive.id === round) ??
        list.find((drive) => drive.is_open) ??
        (round ? null : list[0]) ??
        null);

  const query = admin.supabase
    .from("ieee_recruitments_applications")
    .select(
      "id, code, name, register_number, email, phone, degree, department, year, linkedin, github, experience, resume, domains, created_at, stages:ieee_recruitments_stages(domain, stage, notes)",
    )
    .order("created_at", { ascending: false });
  const { data } = await (current
    ? query.eq("drive_id", current.id)
    : query.is("drive_id", null));

  const applicants: Applicant[] = (data ?? []).map(({ stages, ...row }) => ({
    ...row,
    stages: Object.fromEntries(
      stages.map((item) => [
        item.domain,
        { stage: item.stage as Stage, notes: item.notes },
      ]),
    ),
  }));

  return (
    <>
      <AdminHeader />
      <main className="flex-1">
        <RoundBar drives={list} current={current?.id ?? null} />
        <ApplicationsBoard
          key={current?.id ?? "waitlist"}
          applicants={applicants}
          roundName={current?.name ?? "Waitlist"}
        />
      </main>
      <AdminFooter />
    </>
  );
}
