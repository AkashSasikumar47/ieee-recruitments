"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@ieee/ui/components/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@ieee/ui/components/sheet";
import { Textarea } from "@ieee/ui/components/textarea";
import { Choice } from "@/components/choice";
import { DOMAINS } from "@/lib/content";
import {
  MAX_SELECTED,
  STAGE_LABELS,
  STAGES,
  stageOf,
  type Applicant,
  type Change,
  type Stage,
} from "@/lib/recruitments";

const LABEL = "text-primary-soft text-xs font-semibold tracking-wide uppercase";

const DATE = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Asia/Kolkata",
});

function link(value: string) {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

function DomainCard({
  applicant,
  code,
  index,
  onSaved,
}: {
  applicant: Applicant;
  code: string;
  index: number;
  onSaved: () => void;
}) {
  const router = useRouter();
  const saved = applicant.stages[code];
  const [stage, setStage] = useState<Stage>(stageOf(applicant, code));
  const [notes, setNotes] = useState(saved?.notes ?? "");
  const [saving, setSaving] = useState(false);
  const domain = DOMAINS.find((item) => item.code === code);
  const dirty =
    stage !== stageOf(applicant, code) || notes.trim() !== (saved?.notes ?? "");
  const selectedElsewhere = applicant.domains.filter(
    (other) => other !== code && stageOf(applicant, other) === "selected",
  ).length;

  async function save() {
    setSaving(true);
    const response = await fetch("/api/admin/stages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ids: [applicant.id],
        domain: code,
        stage,
        notes: notes.trim(),
      }),
    }).catch(() => null);
    const body = (await response?.json().catch(() => null)) as {
      error?: string;
    } | null;
    setSaving(false);
    if (!response?.ok) {
      toast.error(body?.error ?? "Couldn't save.");
      return;
    }
    toast.success(`${code} saved`);
    onSaved();
    router.refresh();
  }

  return (
    <li className="flex flex-col gap-3 border bg-card p-4">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-semibold">
          {index + 1}. {domain?.name ?? code}
        </p>
        <span className={LABEL}>{code}</span>
      </div>
      <Choice
        value={stage}
        onChange={(value) => setStage(value as Stage)}
        label={`${code} stage`}
        options={STAGES.map((item) => ({
          ...item,
          label:
            item.value === "selected" &&
            selectedElsewhere >= MAX_SELECTED &&
            stage !== "selected"
              ? `${item.label} (already in ${MAX_SELECTED})`
              : item.label,
        }))}
      />
      <Textarea
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        maxLength={2000}
        rows={2}
        placeholder="Notes for this domain"
        aria-label={`${code} notes`}
        className="bg-background"
      />
      <Button
        size="sm"
        disabled={!dirty || saving}
        onClick={save}
        className="self-start font-semibold uppercase"
      >
        {saving ? "Saving…" : "Save"}
      </Button>
    </li>
  );
}

function History({ id, version }: { id: string; version: number }) {
  const [changes, setChanges] = useState<Change[] | null>(null);

  useEffect(() => {
    let live = true;
    fetch(`/api/admin/applications/${id}/history`)
      .then((response) => (response.ok ? response.json() : { changes: [] }))
      .then((body: { changes: Change[] }) => {
        if (live) setChanges(body.changes);
      })
      .catch(() => {
        if (live) setChanges([]);
      });
    return () => {
      live = false;
    };
  }, [id, version]);

  if (!changes) return <p className="text-primary-soft text-sm">Loading…</p>;
  if (changes.length === 0) {
    return <p className="text-primary-soft text-sm">No changes yet.</p>;
  }
  return (
    <ol className="flex flex-col gap-3 border-l pl-4">
      {changes.map((change) => (
        <li key={change.id} className="flex flex-col gap-0.5">
          <span className="text-sm">
            {change.domain} → {STAGE_LABELS[change.stage as Stage]}
            {change.notes_changed && " · notes edited"}
          </span>
          <span className="text-primary-soft text-xs">
            {change.actor_email || "Someone"} ·{" "}
            {DATE.format(new Date(change.created_at))}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function ApplicantPanel({
  open,
  applicant,
  onClose,
}: {
  open: boolean;
  applicant: Applicant | null;
  onClose: () => void;
}) {
  const [version, setVersion] = useState(0);
  const links = applicant
    ? [
        { label: "LinkedIn", value: applicant.linkedin },
        { label: "GitHub", value: applicant.github },
        { label: "Resume", value: applicant.resume },
      ].filter((item) => item.value)
    : [];

  return (
    <Sheet open={open} onOpenChange={(next) => !next && onClose()}>
      <SheetContent className="w-full gap-0 overflow-y-auto bg-background p-0 sm:max-w-xl">
        {applicant && (
          <>
            <div className="flex flex-col gap-2 border-b bg-primary px-6 pt-10 pb-6 text-primary-foreground md:px-8">
              <span className="text-primary-faint text-xs font-semibold tracking-wide uppercase">
                ↳ {applicant.code}
              </span>
              <SheetTitle className="font-display text-5xl leading-[0.9] font-normal text-primary-foreground uppercase">
                {applicant.name}
              </SheetTitle>
              <SheetDescription className="text-primary-faint text-sm">
                {applicant.register_number} · {applicant.year} ·{" "}
                {applicant.degree}, {applicant.department}
              </SheetDescription>
            </div>
            <div className="flex flex-col gap-8 px-6 py-6 md:px-8">
              <section className="flex flex-col gap-3">
                <h3 className={LABEL}>Contact</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-semibold"
                    asChild
                  >
                    <a
                      href={`https://wa.me/91${applicant.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp {applicant.phone}
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-semibold"
                    asChild
                  >
                    <a href={`mailto:${applicant.email}`}>{applicant.email}</a>
                  </Button>
                  {links.map((item) => (
                    <Button
                      key={item.label}
                      variant="outline"
                      size="sm"
                      className="font-semibold"
                      asChild
                    >
                      <a
                        href={link(item.value)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink /> {item.label}
                      </a>
                    </Button>
                  ))}
                </div>
              </section>

              {applicant.experience && (
                <section className="flex flex-col gap-3">
                  <h3 className={LABEL}>Experience</h3>
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {applicant.experience}
                  </p>
                </section>
              )}

              <section className="flex flex-col gap-3">
                <h3 className={LABEL}>
                  Domains · selected in up to {MAX_SELECTED}
                </h3>
                <ul className="flex flex-col gap-3">
                  {applicant.domains.map((code, index) => (
                    <DomainCard
                      key={`${code}-${applicant.stages[code]?.stage ?? "applied"}-${applicant.stages[code]?.notes ?? ""}`}
                      applicant={applicant}
                      code={code}
                      index={index}
                      onSaved={() => setVersion((value) => value + 1)}
                    />
                  ))}
                </ul>
              </section>

              <section className="flex flex-col gap-3">
                <h3 className={LABEL}>History</h3>
                <History id={applicant.id} version={version} />
              </section>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
