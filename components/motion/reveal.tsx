"use client";

import { motion } from "motion/react";
import { DURATION, EASE_OUT } from "./timing";

const TAGS = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
  p: motion.p,
  header: motion.header,
};

export function Reveal({
  as = "div",
  trigger = "view",
  delay = 0,
  y = 32,
  className,
  children,
}: {
  as?: keyof typeof TAGS;
  trigger?: "mount" | "view";
  delay?: number;
  y?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const Tag = TAGS[as];
  const shown = { opacity: 1, y: 0, filter: "blur(0px)" };
  const play =
    trigger === "mount"
      ? { animate: shown }
      : { whileInView: shown, viewport: { once: true, amount: 0.3 } };

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      {...play}
      transition={{ duration: DURATION.reveal, ease: EASE_OUT, delay }}
    >
      {children}
    </Tag>
  );
}
