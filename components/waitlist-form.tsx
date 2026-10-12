"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@ieee/ui/components/button";
import { Input } from "@ieee/ui/components/input";
import { Label } from "@ieee/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ieee/ui/components/select";
import { Textarea } from "@ieee/ui/components/textarea";
import { Brackets } from "@/components/brackets";
import { DURATION, EASE_OUT } from "@/components/motion/timing";
import { Reveal } from "@/components/motion/reveal";
import { TwoTone } from "@/components/two-tone";
import { DEGREES, DOMAINS, STEPS, YEARS } from "@/lib/content";

const STAGES = ["You", "Academics", "Domains", "Review"] as const;

const MAX_DOMAINS = 3;

const EMPTY = {
  name: "",
  register_number: "",
  email: "",
  phone: "",
  degree: "",
  department: "",
  year: "",
  linkedin: "",
  github: "",
  experience: "",
  resume: "",
};

type Values = typeof EMPTY;

const LABEL = "text-xs font-semibold tracking-wide uppercase";

function Field({
  id,
  label,
  hint,
  className = "",
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label htmlFor={id} className={LABEL}>
        {label}
        {hint && <span className="text-primary-soft font-normal">{hint}</span>}
      </Label>
      {children}
    </div>
  );
}

function sampleCode() {
  return `REC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export function WaitlistForm({ preselect }: { preselect?: string }) {
  const form = useRef<HTMLFormElement>(null);
  const [stage, setStage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [values, setValues] = useState<Values>(EMPTY);
  const [pickError, setPickError] = useState<"degree" | "year" | null>(null);
  const [domains, setDomains] = useState<string[]>(
    DOMAINS.some((domain) => domain.code === preselect) && preselect
      ? [preselect]
      : [],
  );
  const [domainError, setDomainError] = useState(false);
  const [code, setCode] = useState<string | null>(null);

  function set(key: keyof Values, upper = false) {
    return (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const value = upper
        ? event.target.value.toUpperCase()
        : event.target.value;
      setValues((current) => ({ ...current, [key]: value }));
    };
  }

  function go(next: number) {
    setDirection(next > stage ? 1 : -1);
    setStage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function forward() {
    if (stage === 1) {
      const missing = (["degree", "year"] as const).find((key) => !values[key]);
      if (missing) {
        setPickError(missing);
        return;
      }
    }
    const inputs = form.current?.querySelectorAll<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >("input, select, textarea");
    for (const input of inputs ?? []) {
      if (!input.reportValidity()) return;
    }
    if (STAGES[stage] === "Domains" && domains.length === 0) {
      setDomainError(true);
      return;
    }
    if (stage === STAGES.length - 1) {
      setCode(sampleCode());
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    go(stage + 1);
  }

  function toggle(codeName: string) {
    setDomainError(false);
    setDomains((current) =>
      current.includes(codeName)
        ? current.filter((item) => item !== codeName)
        : current.length < MAX_DOMAINS
          ? [...current, codeName]
          : current,
    );
  }

  if (code)
    return <Confirmation code={code} name={values.name} domains={domains} />;

  const review = [
    {
      stage: 0,
      rows: [
        ["Name", values.name],
        ["Register number", values.register_number],
        ["SRM email", values.email],
        ["WhatsApp", values.phone],
      ],
    },
    {
      stage: 1,
      rows: [
        ["Degree", values.degree],
        ["Department", values.department],
        ["Year", values.year],
        ["LinkedIn", values.linkedin || "—"],
        ["GitHub", values.github || "—"],
      ],
    },
    {
      stage: 2,
      rows: [
        ...domains.map((item, index) => [
          `Choice ${index + 1}`,
          DOMAINS.find((domain) => domain.code === item)?.name ?? item,
        ]),
        ["Experience", values.experience || "—"],
        ["Resume", values.resume || "—"],
      ],
    },
  ];

  return (
    <div className="grid gap-10 px-gutter pt-10 pb-20 md:grid-cols-12 md:gap-6 md:pt-16 md:pb-32">
      <aside className="flex flex-col gap-8 md:sticky md:top-28 md:col-span-4 md:self-start">
        <Reveal trigger="mount" y={8}>
          <p className="text-primary-soft text-xs font-semibold tracking-wide uppercase">
            ↳ Waitlist · Recruitments
          </p>
        </Reveal>
        <TwoTone
          as="h1"
          trigger="mount"
          delay={0.1}
          text="Join the *waitlist*"
          className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.92]"
        />
        <ol className="grid grid-cols-4 gap-2 md:flex md:flex-col md:gap-0 md:border-t">
          {STAGES.map((item, index) => {
            const done = index < stage;
            const current = index === stage;
            return (
              <li
                key={item}
                className={`flex flex-col gap-2 text-xs font-semibold uppercase md:flex-row md:items-center md:justify-between md:border-b md:py-3 md:text-sm ${
                  current ? "" : "text-primary-soft"
                }`}
              >
                <span className="h-1 bg-muted md:hidden">
                  <motion.span
                    className="block h-full bg-primary"
                    initial={false}
                    animate={{ width: done || current ? "100%" : "0%" }}
                    transition={{ duration: DURATION.step, ease: EASE_OUT }}
                  />
                </span>
                <span>
                  0{index + 1}. {item}
                </span>
                {done && <Check className="hidden size-4 md:block" />}
              </li>
            );
          })}
        </ol>
        <p className="text-primary-soft hidden max-w-xs text-xs leading-relaxed md:block">
          Recruitment is closed for now. Preview only: the waitlist isn&apos;t
          collecting entries yet, so nothing you enter here is sent anywhere.
        </p>
      </aside>

      <form
        ref={form}
        onSubmit={(event) => {
          event.preventDefault();
          forward();
        }}
        className="flex flex-col gap-10 md:col-span-7 md:col-start-6"
      >
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={stage}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: DURATION.step, ease: EASE_OUT }}
            className="flex flex-col gap-6"
          >
            <h2 className="font-heading text-2xl font-bold tracking-[-0.02em] uppercase md:text-3xl">
              0{stage + 1}. {STAGE_TITLES[stage]}
            </h2>

            {stage === 0 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Full name" className="sm:col-span-2">
                  <Input
                    id="name"
                    required
                    autoComplete="name"
                    maxLength={100}
                    value={values.name}
                    onChange={set("name")}
                    className="h-12 text-base"
                  />
                </Field>
                <Field id="register_number" label="Register number">
                  <Input
                    id="register_number"
                    required
                    pattern="RA[0-9]{13}"
                    title="RA followed by 13 digits"
                    placeholder="RA2511003010001"
                    maxLength={15}
                    value={values.register_number}
                    onChange={set("register_number", true)}
                    className="h-12 font-mono text-base"
                  />
                </Field>
                <Field id="phone" label="WhatsApp number">
                  <Input
                    id="phone"
                    type="tel"
                    required
                    inputMode="numeric"
                    pattern="[6-9][0-9]{9}"
                    title="A 10-digit mobile number"
                    maxLength={10}
                    value={values.phone}
                    onChange={set("phone")}
                    className="h-12 font-mono text-base"
                  />
                </Field>
                <Field id="email" label="SRM email" className="sm:col-span-2">
                  <Input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    pattern="[A-Za-z0-9._%+\-]+@srmist\.edu\.in"
                    title="Your @srmist.edu.in address"
                    placeholder="ab1234@srmist.edu.in"
                    value={values.email}
                    onChange={set("email")}
                    className="h-12 text-base"
                  />
                </Field>
              </div>
            )}

            {stage === 1 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="degree" label="Degree">
                  <Select
                    required
                    value={values.degree || undefined}
                    onValueChange={(value) => {
                      setPickError(null);
                      setValues((current) => ({ ...current, degree: value }));
                    }}
                  >
                    <SelectTrigger id="degree" className="h-12 w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {DEGREES.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {pickError === "degree" && (
                    <p
                      role="alert"
                      className="text-sm font-semibold text-destructive"
                    >
                      Choose your degree.
                    </p>
                  )}
                </Field>
                <Field id="year" label="Year of study">
                  <Select
                    required
                    value={values.year || undefined}
                    onValueChange={(value) => {
                      setPickError(null);
                      setValues((current) => ({ ...current, year: value }));
                    }}
                  >
                    <SelectTrigger id="year" className="h-12 w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {YEARS.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {pickError === "year" && (
                    <p
                      role="alert"
                      className="text-sm font-semibold text-destructive"
                    >
                      Choose your year of study.
                    </p>
                  )}
                </Field>
                <Field
                  id="department"
                  label="Department"
                  className="sm:col-span-2"
                >
                  <Input
                    id="department"
                    required
                    maxLength={100}
                    placeholder="e.g. Computer Science and Engineering"
                    value={values.department}
                    onChange={set("department")}
                    className="h-12 text-base"
                  />
                </Field>
                <Field id="linkedin" label="LinkedIn " hint="(optional)">
                  <Input
                    id="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/…"
                    value={values.linkedin}
                    onChange={set("linkedin")}
                    className="h-12 text-base"
                  />
                </Field>
                <Field id="github" label="GitHub " hint="(optional)">
                  <Input
                    id="github"
                    type="url"
                    placeholder="https://github.com/…"
                    value={values.github}
                    onChange={set("github")}
                    className="h-12 text-base"
                  />
                </Field>
              </div>
            )}

            {stage === 2 && (
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <p className={`${LABEL} flex justify-between`}>
                    <span>Pick up to three, in order</span>
                    <span className="text-primary-soft tabular-nums">
                      {domains.length}/{MAX_DOMAINS}
                    </span>
                  </p>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {DOMAINS.map((domain) => {
                      const rank = domains.indexOf(domain.code);
                      const picked = rank >= 0;
                      const full = !picked && domains.length >= MAX_DOMAINS;
                      return (
                        <li key={domain.code}>
                          <Button
                            type="button"
                            variant={picked ? "default" : "outline"}
                            aria-pressed={picked}
                            disabled={full}
                            onClick={() => toggle(domain.code)}
                            className="h-auto w-full justify-between gap-3 px-4 py-3 text-left whitespace-normal"
                          >
                            <span className="flex flex-col">
                              <span className="font-display text-2xl leading-none font-normal">
                                {domain.code}
                              </span>
                              <span className="text-xs font-semibold uppercase">
                                {domain.name}
                              </span>
                            </span>
                            <span className="flex size-7 shrink-0 items-center justify-center border text-xs font-bold">
                              {picked ? rank + 1 : "+"}
                            </span>
                          </Button>
                        </li>
                      );
                    })}
                  </ul>
                  {domainError && (
                    <p
                      role="alert"
                      className="text-sm font-semibold text-destructive"
                    >
                      Pick at least one domain.
                    </p>
                  )}
                </div>
                <Field id="experience" label="Experience " hint="(optional)">
                  <Textarea
                    id="experience"
                    rows={4}
                    maxLength={1000}
                    placeholder="Projects, clubs, events or anything you've built."
                    value={values.experience}
                    onChange={set("experience")}
                    className="text-base"
                  />
                </Field>
                <Field id="resume" label="Resume link " hint="(optional)">
                  <Input
                    id="resume"
                    type="url"
                    placeholder="https://drive.google.com/…"
                    value={values.resume}
                    onChange={set("resume")}
                    className="h-12 text-base"
                  />
                  <span className="text-primary-soft text-xs">
                    Set the Drive link so anyone at SRM can open it.
                  </span>
                </Field>
              </div>
            )}

            {stage === 3 && (
              <div className="flex flex-col gap-8">
                {review.map((group) => (
                  <section key={group.stage} className="flex flex-col gap-3">
                    <div className="flex items-center justify-between border-b pb-2">
                      <h3 className={LABEL}>
                        0{group.stage + 1}. {STAGES[group.stage]}
                      </h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-xs font-bold uppercase"
                        onClick={() => go(group.stage)}
                      >
                        Edit
                      </Button>
                    </div>
                    <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                      {group.rows.map(([label, value]) => (
                        <div
                          key={label}
                          className="flex min-w-0 flex-col gap-0.5"
                        >
                          <dt className="text-primary-soft text-xs uppercase">
                            {label}
                          </dt>
                          <dd className="truncate font-semibold">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </section>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-3 border-t pt-6">
          {stage > 0 && (
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="h-12 flex-1 font-bold uppercase"
              onClick={() => go(stage - 1)}
            >
              <ArrowLeft /> Back
            </Button>
          )}
          <Button
            type="submit"
            size="lg"
            className="h-12 flex-1 font-bold uppercase"
          >
            {stage === STAGES.length - 1 ? "Join the waitlist" : "Next"}
            <ArrowRight />
          </Button>
        </div>
        <p className="text-primary-soft text-xs leading-relaxed md:hidden">
          Preview only: the waitlist isn&apos;t collecting entries yet.
        </p>
      </form>
    </div>
  );
}

const STAGE_TITLES = [
  "About you",
  "Your academics",
  "Your domains",
  "Check and join",
];

function Confirmation({
  code,
  name,
  domains,
}: {
  code: string;
  name: string;
  domains: string[];
}) {
  return (
    <section className="bg-primary px-gutter pt-14 pb-20 text-primary-foreground md:pt-20 md:pb-28">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="flex flex-col gap-8 md:col-span-7">
          <Reveal trigger="mount" y={8}>
            <p className="text-primary-faint text-xs font-semibold tracking-wide uppercase">
              ↳ On the waitlist
            </p>
          </Reveal>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.text, ease: EASE_OUT }}
            className="font-display text-[clamp(4.5rem,13vw,13rem)] leading-[0.82] uppercase"
          >
            You&apos;re on
            <br />
            <span className="text-primary-faint">the list</span>
          </motion.h1>
          <Reveal
            trigger="mount"
            delay={0.3}
            className="text-primary-faint max-w-md"
          >
            Thanks, {name.split(" ")[0] || "there"}. Keep your waitlist code
            handy. You&apos;ll hear first when recruitment for{" "}
            {domains.join(", ")} opens.
          </Reveal>
        </div>
        <Reveal
          trigger="mount"
          delay={0.4}
          className="md:col-span-4 md:col-start-9"
        >
          <Brackets className="text-primary-faint">
            <div className="flex flex-col gap-6 bg-primary-foreground/10 p-6">
              <div className="flex flex-col gap-1">
                <span className="text-primary-faint text-xs font-semibold uppercase">
                  Waitlist code
                </span>
                <span className="font-display text-5xl leading-none">
                  {code}
                </span>
              </div>
              <ol className="flex flex-col gap-4 border-t border-primary-foreground/20 pt-5">
                {STEPS.map((step, index) => (
                  <li
                    key={step.title}
                    className="flex justify-between gap-4 text-sm"
                  >
                    <span className="font-bold uppercase">
                      0{index + 1}. {step.title}
                    </span>
                    <span className="text-primary-faint">
                      {index === 0 ? "Done" : step.date}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Brackets>
          <Button
            variant="secondary"
            size="lg"
            className="mt-8 h-12 w-full font-bold uppercase"
            asChild
          >
            <Link href="/">Back to home</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
