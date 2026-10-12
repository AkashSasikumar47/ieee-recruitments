"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@ieee/ui/components/button";
import { Checkbox } from "@ieee/ui/components/checkbox";
import { Input } from "@ieee/ui/components/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ieee/ui/components/table";
import { ApplicantPanel } from "@/components/admin/applicant-panel";
import { Choice } from "@/components/choice";
import { DOMAINS, YEARS } from "@/lib/content";
import { toCsv } from "@/lib/csv";
import {
  STAGE_LABELS,
  STAGES,
  stageOf,
  type Applicant,
  type Stage,
} from "@/lib/recruitments";

const DATE = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  timeZone: "Asia/Kolkata",
});

const LABEL = "text-xs font-semibold tracking-wide uppercase";

function download(applicants: Applicant[], roundName: string) {
  const rows = [
    [
      "Code",
      "Name",
      "Register number",
      "SRM email",
      "WhatsApp",
      "Degree",
      "Department",
      "Year",
      "Choice 1",
      "Stage 1",
      "Choice 2",
      "Stage 2",
      "Choice 3",
      "Stage 3",
      "LinkedIn",
      "GitHub",
      "Resume",
      "Experience",
      "Applied",
    ],
    ...applicants.map((applicant) => [
      applicant.code,
      applicant.name,
      applicant.register_number,
      applicant.email,
      applicant.phone,
      applicant.degree,
      applicant.department,
      applicant.year,
      ...[0, 1, 2].flatMap((index) => {
        const domain = applicant.domains[index];
        return domain
          ? [domain, STAGE_LABELS[stageOf(applicant, domain)]]
          : ["", ""];
      }),
      applicant.linkedin,
      applicant.github,
      applicant.resume,
      applicant.experience,
      applicant.created_at.slice(0, 10),
    ]),
  ];
  const blob = new Blob([toCsv(rows)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${roundName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function ApplicationsBoard({
  applicants,
  roundName,
}: {
  applicants: Applicant[];
  roundName: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("all");
  const [preference, setPreference] = useState("any");
  const [stage, setStage] = useState<Stage | "any">("any");
  const [year, setYear] = useState("all");
  const [department, setDepartment] = useState("all");
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [moving, setMoving] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const search = useDeferredValue(query.trim().toLowerCase());

  const departments = useMemo(
    () =>
      [...new Set(applicants.map((applicant) => applicant.department))]
        .sort()
        .map((value) => ({ value, label: value })),
    [applicants],
  );

  const counts = useMemo(
    () =>
      Object.fromEntries(
        DOMAINS.map((item) => [
          item.code,
          applicants.filter((applicant) =>
            applicant.domains.includes(item.code),
          ).length,
        ]),
      ),
    [applicants],
  );

  const shown = useMemo(() => {
    const list = applicants.filter((applicant) => {
      const at = domain === "all" ? -1 : applicant.domains.indexOf(domain);
      if (domain !== "all" && at === -1) return false;
      if (domain !== "all" && preference !== "any" && at + 1 !== +preference) {
        return false;
      }
      if (
        stage !== "any" &&
        !(domain === "all" ? applicant.domains : [domain]).some(
          (code) => stageOf(applicant, code) === stage,
        )
      ) {
        return false;
      }
      if (year !== "all" && applicant.year !== year) return false;
      if (department !== "all" && applicant.department !== department) {
        return false;
      }
      return (
        !search ||
        [
          applicant.name,
          applicant.register_number,
          applicant.email,
          applicant.phone,
          applicant.code,
        ].some((value) => value.toLowerCase().includes(search))
      );
    });
    return domain === "all"
      ? list
      : list.sort(
          (a, b) => a.domains.indexOf(domain) - b.domains.indexOf(domain),
        );
  }, [applicants, domain, preference, stage, year, department, search]);

  const filtered =
    Boolean(search) ||
    domain !== "all" ||
    stage !== "any" ||
    year !== "all" ||
    department !== "all";
  const chosen = shown.filter((applicant) => picked.has(applicant.id));
  const all = shown.length > 0 && chosen.length === shown.length;

  function pickDomain(value: string) {
    setDomain(value);
    setPreference("any");
    setPicked(new Set());
  }

  function clear() {
    setQuery("");
    pickDomain("all");
    setStage("any");
    setYear("all");
    setDepartment("all");
  }

  async function move(next: Stage) {
    if (moving || domain === "all" || chosen.length === 0) return;
    setMoving(true);
    const response = await fetch("/api/admin/stages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ids: chosen.map((applicant) => applicant.id),
        domain,
        stage: next,
      }),
    }).catch(() => null);
    const body = (await response?.json().catch(() => null)) as {
      changed?: number;
      error?: string;
    } | null;
    setMoving(false);
    if (!response?.ok) {
      toast.error(body?.error ?? "Couldn't update the stage.");
      return;
    }
    toast.success(
      `${body?.changed ?? 0} moved to ${STAGE_LABELS[next].toLowerCase()} in ${domain}`,
    );
    setPicked(new Set());
    router.refresh();
  }

  return (
    <section className="flex flex-col">
      <div className="flex flex-col gap-4 border-b px-gutter py-5">
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={domain === "all" ? "default" : "outline"}
            onClick={() => pickDomain("all")}
            className="font-semibold uppercase"
          >
            All
            <span className="opacity-70">{applicants.length}</span>
          </Button>
          {DOMAINS.map((item) => (
            <Button
              key={item.code}
              size="sm"
              variant={domain === item.code ? "default" : "outline"}
              onClick={() => pickDomain(item.code)}
              title={item.name}
              className="font-semibold uppercase"
            >
              {item.code}
              <span className="opacity-70">{counts[item.code]}</span>
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-60 flex-1">
            <Search className="text-primary-soft pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Name, register number, email, phone or code"
              aria-label="Search applicants"
              className="h-9 bg-card pl-9"
            />
          </div>
          {domain !== "all" && (
            <Choice
              value={preference}
              onChange={setPreference}
              label="Preference"
              className="h-9 w-auto"
              options={[
                { value: "any", label: "Any choice" },
                { value: "1", label: "1st choice" },
                { value: "2", label: "2nd choice" },
                { value: "3", label: "3rd choice" },
              ]}
            />
          )}
          <Choice
            value={stage}
            onChange={(value) => setStage(value as Stage | "any")}
            label="Stage"
            className="h-9 w-auto"
            options={[{ value: "any", label: "Any stage" }, ...STAGES]}
          />
          <Choice
            value={year}
            onChange={setYear}
            label="Year"
            className="h-9 w-auto"
            options={[
              { value: "all", label: "Any year" },
              ...YEARS.map((value) => ({ value, label: value })),
            ]}
          />
          {departments.length > 1 && (
            <Choice
              value={department}
              onChange={setDepartment}
              label="Department"
              className="h-9 w-auto max-w-56"
              options={[
                { value: "all", label: "Any department" },
                ...departments,
              ]}
            />
          )}
          {filtered && (
            <Button
              size="sm"
              variant="outline"
              onClick={clear}
              className="font-semibold uppercase"
            >
              Clear
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            disabled={shown.length === 0}
            onClick={() => download(shown, roundName)}
            className="ml-auto font-semibold uppercase"
          >
            <Download /> Export {shown.length}
          </Button>
        </div>
        {domain !== "all" && (
          <div className="flex flex-wrap items-center gap-2 border-t pt-4">
            <p className={`${LABEL} mr-2`}>
              {chosen.length
                ? `${chosen.length} picked · move in ${domain} to`
                : `Tick people to move them in ${domain}`}
            </p>
            {STAGES.map((item) => (
              <Button
                key={item.value}
                size="sm"
                variant="outline"
                disabled={chosen.length === 0 || moving}
                onClick={() => move(item.value)}
                className="font-semibold uppercase"
              >
                {item.label}
              </Button>
            ))}
          </div>
        )}
      </div>

      {shown.length === 0 ? (
        <div className="flex flex-col items-start gap-4 px-gutter py-16">
          <p className="font-display text-5xl uppercase">
            {applicants.length ? "No matches" : "Nobody yet"}
          </p>
          <p className="text-primary-soft text-sm">
            {applicants.length
              ? "Nobody matches these filters."
              : `No one has joined ${roundName.toLowerCase() === "waitlist" ? "the waitlist" : roundName} yet.`}
          </p>
          {filtered && (
            <Button
              variant="outline"
              onClick={clear}
              className="font-semibold uppercase"
            >
              Clear filters
            </Button>
          )}
        </div>
      ) : (
        <div className="px-gutter pb-16">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {domain !== "all" && (
                  <TableHead className="w-10 pl-0">
                    <Checkbox
                      className="rounded-none"
                      checked={all}
                      onCheckedChange={(checked) =>
                        setPicked(
                          checked
                            ? new Set(shown.map((applicant) => applicant.id))
                            : new Set(),
                        )
                      }
                      aria-label="Pick everyone shown"
                    />
                  </TableHead>
                )}
                <TableHead
                  className={`${LABEL} ${domain === "all" ? "pl-0" : ""}`}
                >
                  Applicant
                </TableHead>
                <TableHead className={`${LABEL} hidden md:table-cell`}>
                  Year · Department
                </TableHead>
                <TableHead className={LABEL}>
                  {domain === "all" ? "Choices" : `${domain} stage`}
                </TableHead>
                <TableHead
                  className={`${LABEL} hidden pr-0 text-right sm:table-cell`}
                >
                  Joined
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shown.map((applicant) => (
                <TableRow
                  key={applicant.id}
                  className="cursor-pointer"
                  onClick={() => {
                    setOpenId(applicant.id);
                    setPanelOpen(true);
                  }}
                >
                  {domain !== "all" && (
                    <TableCell
                      className="pl-0"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <Checkbox
                        className="rounded-none"
                        checked={picked.has(applicant.id)}
                        onCheckedChange={(checked) =>
                          setPicked((current) => {
                            const next = new Set(current);
                            if (checked) next.add(applicant.id);
                            else next.delete(applicant.id);
                            return next;
                          })
                        }
                        aria-label={`Pick ${applicant.name}`}
                      />
                    </TableCell>
                  )}
                  <TableCell className={domain === "all" ? "pl-0" : ""}>
                    <div className="flex flex-col">
                      <span className="font-semibold">{applicant.name}</span>
                      <span className="text-primary-soft text-xs">
                        {applicant.register_number}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-col">
                      <span>{applicant.year}</span>
                      <span className="text-primary-soft max-w-56 truncate text-xs">
                        {applicant.department}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {domain === "all" ? (
                      <div className="flex flex-wrap gap-1">
                        {applicant.domains.map((code, index) => {
                          const current = stageOf(applicant, code);
                          return (
                            <span
                              key={code}
                              title={STAGE_LABELS[current]}
                              className={`border px-1.5 py-0.5 text-xs font-semibold ${
                                current === "selected"
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : current === "not_selected"
                                    ? "text-primary-soft line-through"
                                    : current === "applied"
                                      ? ""
                                      : "border-primary"
                              }`}
                            >
                              {index + 1}·{code}
                            </span>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <span className="font-semibold">
                          {STAGE_LABELS[stageOf(applicant, domain)]}
                        </span>
                        <span className="text-primary-soft text-xs">
                          Choice {applicant.domains.indexOf(domain) + 1}
                        </span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-primary-soft hidden pr-0 text-right text-xs sm:table-cell">
                    {DATE.format(new Date(applicant.created_at))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <ApplicantPanel
        key={openId ?? "none"}
        open={panelOpen}
        applicant={
          applicants.find((applicant) => applicant.id === openId) ?? null
        }
        onClose={() => setPanelOpen(false)}
      />
    </section>
  );
}
