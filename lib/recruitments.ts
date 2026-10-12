import type { Database } from "@ieee/supabase/types";

type Tables = Database["public"]["Tables"];

export type Drive = Pick<
  Tables["ieee_recruitments_drives"]["Row"],
  "id" | "name" | "is_open" | "created_at"
>;

export type Stage =
  "applied" | "shortlisted" | "interviewed" | "selected" | "not_selected";

export type Applicant = Omit<
  Tables["ieee_recruitments_applications"]["Row"],
  "drive_id"
> & {
  stages: Record<string, { stage: Stage; notes: string }>;
};

export type Change = Pick<
  Tables["ieee_recruitments_changes"]["Row"],
  "id" | "domain" | "stage" | "notes_changed" | "actor_email" | "created_at"
>;

export const STAGES: { value: Stage; label: string }[] = [
  { value: "applied", label: "Applied" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "interviewed", label: "Interviewed" },
  { value: "selected", label: "Selected" },
  { value: "not_selected", label: "Not selected" },
];

export const STAGE_LABELS = Object.fromEntries(
  STAGES.map((stage) => [stage.value, stage.label]),
) as Record<Stage, string>;

export const MAX_SELECTED = 2;

export function stageOf(applicant: Applicant, domain: string): Stage {
  return applicant.stages[domain]?.stage ?? "applied";
}
