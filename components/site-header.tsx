"use client";

import { useState } from "react";
import { IeeeLogo } from "@ieee/ui/layout/ieee-logo";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { DURATION, EASE_OUT, HERO, YOU } from "@/components/motion/timing";
import { Wordmark } from "@/components/wordmark";

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const { scrollY } = useScroll();
  const [overHero, setOverHero] = useState(overlay);

  useMotionValueEvent(scrollY, "change", (y) => {
    if (overlay) setOverHero(y < window.innerHeight - 64);
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: DURATION.reveal,
        ease: EASE_OUT,
        delay: overlay ? YOU.header : HERO.header,
      }}
      className={`${overlay ? "fixed" : "sticky"} inset-x-0 top-0 z-40 transition-colors duration-500 ${
        overHero
          ? "bg-transparent text-primary-foreground"
          : "border-b bg-background text-primary"
      }`}
    >
      <div className="flex items-center justify-between px-gutter pt-[max(0.75rem,env(safe-area-inset-top))] pb-3">
        <Link href="/" aria-label="Recruitments home">
          <Wordmark className="text-[2rem] md:text-[2.4rem]" />
        </Link>
        <a
          href="https://ieeesrmist.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="IEEE SRMIST"
        >
          <IeeeLogo tone={overHero ? "light" : "dark"} preload />
        </a>
      </div>
    </motion.header>
  );
}
