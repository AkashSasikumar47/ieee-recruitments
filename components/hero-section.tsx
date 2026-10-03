"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@ieee/ui/components/button";
import { HeroArt } from "@/components/hero-art";
import { Reveal } from "@/components/motion/reveal";
import { DURATION, EASE_IN_OUT, HERO } from "@/components/motion/timing";
import { TwoTone } from "@/components/two-tone";
import { DOMAINS, DRIVE } from "@/lib/content";

export function HeroSection() {
  const [index, setIndex] = useState(0);
  const domain = DOMAINS[index] ?? DOMAINS[0]!;

  useEffect(() => {
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % DOMAINS.length),
      HERO.cycle * 1000,
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative isolate flex h-svh min-h-[36rem] flex-col justify-end overflow-hidden bg-primary px-site-4 pt-24 pb-[max(7rem,calc(env(safe-area-inset-bottom)+5.5rem))] text-primary-foreground md:px-site-8 md:pb-8">
      <HeroArt active={index} />
      <TwoTone
        as="h1"
        tone="blue"
        trigger="mount"
        delay={HERO.title}
        text="Find your *place* in"
        className="text-[clamp(1.6rem,4.2vw,4rem)] leading-none"
      />
      <div
        className="font-display relative -mt-[0.03em] -ml-[0.032em] h-[0.86em] overflow-hidden text-[clamp(4.25rem,19.5vw,20rem)] leading-[0.86] uppercase"
        aria-live="polite"
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={domain.word}
            className="block whitespace-nowrap"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: DURATION.roll, ease: EASE_IN_OUT }}
          >
            {domain.word}
          </motion.span>
        </AnimatePresence>
      </div>
      <Reveal
        trigger="mount"
        delay={HERO.details}
        y={12}
        className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-primary-foreground/20 pt-5"
      >
        <p className="text-xs font-semibold tracking-wide uppercase">
          <span className="text-primary-faint">IEEE SRMIST · Recruitments</span>
          <br />
          {DRIVE.status} · {DRIVE.opens} – {DRIVE.closes}
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="h-12 px-6 text-sm font-bold tracking-wide uppercase"
          asChild
        >
          <Link href="/apply">
            Apply now <ArrowRight />
          </Link>
        </Button>
      </Reveal>
    </section>
  );
}
