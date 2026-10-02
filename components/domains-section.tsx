"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ieee/ui/components/accordion";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/section-label";
import { TwoTone } from "@/components/two-tone";
import { DOMAINS } from "@/lib/content";

export function DomainsSection() {
  const [open, setOpen] = useState("");

  return (
    <section id="domains" className="px-4 py-20 md:px-8 md:py-32">
      <div className="grid gap-8 md:grid-cols-12">
        <SectionLabel className="md:col-span-3">Domains</SectionLabel>
        <div className="flex flex-col gap-6 md:col-span-9">
          <TwoTone
            text="Ten domains. *Pick* up to *three.*"
            className="text-[clamp(1.9rem,4.4vw,4.25rem)] leading-[0.95]"
          />
          <Reveal
            as="p"
            className="text-primary-soft max-w-md text-sm leading-relaxed"
          >
            Choose in order of preference. Every domain you pick reads your
            application, so pick the ones you&apos;d really show up for.
          </Reveal>
        </div>
      </div>

      <div className="mt-16 md:mt-24">
        <div className="text-primary-soft hidden gap-4 border-b pb-3 text-xs font-semibold uppercase md:flex">
          <span className="grid flex-1 grid-cols-11 gap-4">
            <span className="col-span-2">Code</span>
            <span className="col-span-4">Domain</span>
            <span className="col-span-5">What it&apos;s about</span>
          </span>
          <span className="w-5" />
        </div>
        <Accordion
          type="single"
          collapsible
          value={open}
          onValueChange={setOpen}
        >
          {DOMAINS.map((domain, index) => (
            <Reveal key={domain.code} delay={Math.min(index, 5) * 0.05} y={16}>
              <AccordionItem
                value={domain.code}
                className="border-b last:border-b"
              >
                <AccordionTrigger className="group items-center py-5 hover:no-underline md:py-6 [&>svg]:size-5 [&>svg]:text-primary">
                  <span className="grid flex-1 grid-cols-[4.5rem_1fr] items-center gap-4 md:grid-cols-11">
                    <span className="font-display text-primary-soft text-3xl leading-none transition-colors group-hover:text-primary md:col-span-2 md:text-5xl">
                      {domain.code}
                    </span>
                    <span className="font-heading text-lg font-bold tracking-[-0.02em] uppercase md:col-span-4 md:text-xl">
                      {domain.name}
                    </span>
                    <span className="text-primary-soft hidden text-sm font-normal md:col-span-5 md:block">
                      {domain.blurb}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="grid gap-6 pb-8 md:grid-cols-12 md:gap-4">
                  <p className="text-primary-soft text-sm md:hidden">
                    {domain.blurb}
                  </p>
                  <ul className="flex flex-col gap-2 md:col-span-4 md:col-start-7">
                    {domain.work.map((item) => (
                      <li
                        key={item}
                        className="text-sm font-semibold uppercase"
                      >
                        ~ {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/apply?domain=${encodeURIComponent(domain.code)}`}
                    className="inline-flex items-center gap-1 self-end text-xs font-bold tracking-wide uppercase underline-offset-4 hover:underline md:col-span-2 md:justify-self-end"
                  >
                    Apply for {domain.code} <ArrowUpRight className="size-4" />
                  </Link>
                </AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
