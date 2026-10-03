"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { DURATION, EASE_OUT, HERO } from "@/components/motion/timing";
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
        delay: HERO.header,
      }}
      className={`${overlay ? "fixed" : "sticky"} inset-x-0 top-0 z-40 transition-colors duration-500 ${
        overHero
          ? "bg-transparent text-primary-foreground"
          : "border-b bg-background text-primary"
      }`}
    >
      <div className="flex items-center justify-between px-site-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 md:px-site-8">
        <Link href="/" aria-label="Recruitments home">
          <Wordmark className="text-[2rem] md:text-[2.4rem]" />
        </Link>
        <a
          href="https://ieeesrmist.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="IEEE SRMIST"
        >
          <Image
            src="/logos/ieee-srmist-logo.png"
            alt="IEEE SRMIST"
            width={34}
            height={34}
            preload
            className={`transition-[filter] duration-500 ${overHero ? "drop-shadow-[0_0_1.5px_var(--primary-foreground)]" : ""}`}
          />
        </a>
      </div>
    </motion.header>
  );
}
