"use client";

import { motion } from "motion/react";
import { DURATION, EASE_OUT, STAGGER } from "./timing";

const TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  p: motion.p,
  span: motion.span,
};

export function RiseText({
  text,
  as = "span",
  by = "word",
  trigger = "view",
  delay = 0,
  className = "",
}: {
  text: string;
  as?: keyof typeof TAGS;
  by?: "char" | "word";
  trigger?: "mount" | "view";
  delay?: number;
  className?: string;
}) {
  const Tag = TAGS[as];
  const parts = by === "char" ? Array.from(text) : text.split(" ");
  const play =
    trigger === "mount"
      ? { animate: "shown" }
      : { whileInView: "shown", viewport: { once: true, amount: 0.5 } };

  return (
    <Tag
      aria-label={text}
      className={className}
      initial="hidden"
      {...play}
      variants={{
        hidden: {},
        shown: {
          transition: {
            staggerChildren: by === "char" ? STAGGER.char : STAGGER.word,
            delayChildren: delay,
          },
        },
      }}
    >
      {parts.map((part, index) => (
        <span key={`${part}-${index}`} aria-hidden="true">
          <span className="-mx-[0.08em] -my-[0.15em] inline-block overflow-hidden px-[0.08em] py-[0.15em] align-bottom">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "115%" },
                shown: {
                  y: "0%",
                  transition: { duration: DURATION.text, ease: EASE_OUT },
                },
              }}
            >
              {part}
            </motion.span>
          </span>
          {by === "word" && index < parts.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
