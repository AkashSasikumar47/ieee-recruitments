"use client";

import { motion } from "motion/react";
import { DURATION, EASE_OUT, STAGGER } from "@/components/motion/timing";

const TAGS = { h1: motion.h1, h2: motion.h2, p: motion.p };

export function TwoTone({
  text,
  as = "h2",
  tone = "light",
  trigger = "view",
  delay = 0,
  className = "",
}: {
  text: string;
  as?: keyof typeof TAGS;
  tone?: "light" | "blue";
  trigger?: "mount" | "view";
  delay?: number;
  className?: string;
}) {
  const Tag = TAGS[as];
  const words = text.split(" ");
  const soft = tone === "blue" ? "text-primary-faint" : "text-primary-soft";
  const play =
    trigger === "mount"
      ? { animate: "shown" }
      : { whileInView: "shown", viewport: { once: true, amount: 0.4 } };

  return (
    <Tag
      aria-label={text.replaceAll("*", "")}
      className={`font-heading font-bold tracking-[-0.03em] uppercase ${className}`}
      initial="hidden"
      {...play}
      variants={{
        hidden: {},
        shown: {
          transition: { staggerChildren: STAGGER.word, delayChildren: delay },
        },
      }}
    >
      {words.map((word, index) => {
        const isSoft = word.startsWith("*");
        const clean = word.replaceAll("*", "");
        return (
          <span key={`${word}-${index}`} aria-hidden="true">
            <span className="-my-[0.1em] inline-block overflow-hidden py-[0.1em] align-bottom">
              <motion.span
                className={`inline-block ${isSoft ? soft : ""}`}
                variants={{
                  hidden: { y: "110%" },
                  shown: {
                    y: "0%",
                    transition: { duration: DURATION.text, ease: EASE_OUT },
                  },
                }}
              >
                {clean}
              </motion.span>
            </span>
            {index < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </Tag>
  );
}
