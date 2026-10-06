"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { BADGE } from "@/components/motion/timing";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/section-label";
import { DRIVE } from "@/lib/content";

const RING = "Waitlist open · Join IEEE SRMIST · Recruitments · ";

export function ClosingSection() {
  return (
    <section className="relative overflow-hidden bg-primary px-gutter py-20 text-primary-foreground md:py-28">
      <div className="flex items-start justify-between gap-6">
        <SectionLabel tone="blue">Ready?</SectionLabel>
        <motion.svg
          viewBox="0 0 100 100"
          aria-hidden="true"
          className="size-24 shrink-0 md:size-36"
          animate={{ rotate: 360 }}
          transition={{
            duration: BADGE.spin,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <defs>
            <path
              id="ring"
              d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0"
            />
          </defs>
          <circle cx="50" cy="50" r="29" className="fill-primary-foreground" />
          <text className="fill-primary-foreground text-[7.4px] font-semibold tracking-[0.12em] uppercase">
            <textPath href="#ring">{RING}</textPath>
          </text>
        </motion.svg>
      </div>
      <Reveal y={40}>
        <Link
          href="/waitlist"
          className="group font-display mt-6 flex items-end justify-between gap-4 text-[clamp(5rem,22vw,24rem)] leading-[0.8] uppercase"
        >
          <span className="transition-transform duration-700 group-hover:translate-x-4">
            Waitlist
          </span>
          <ArrowUpRight className="mb-[0.08em] size-[0.4em] shrink-0 transition-transform duration-700 group-hover:translate-x-2 group-hover:-translate-y-2" />
        </Link>
      </Reveal>
      <Reveal
        delay={0.15}
        className="mt-10 flex flex-wrap justify-between gap-4 border-t border-primary-foreground/20 pt-5 text-xs font-semibold tracking-wide uppercase"
      >
        <p>
          {DRIVE.status} · {DRIVE.waitlist}
        </p>
        <p className="text-primary-faint">Takes about five minutes</p>
      </Reveal>
    </section>
  );
}
