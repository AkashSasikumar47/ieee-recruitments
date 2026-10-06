"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { DOMAINS } from "@/lib/content";
import { EASE_IN_OUT, EASE_OUT, YOU } from "./timing";

export function YouAreHere() {
  const reduced = useReducedMotion();
  const dot = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [done, setDone] = useState(false);
  const [ring, setRing] = useState<"closed" | "open" | "folded">("closed");
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }
    setRadius(Math.min(window.innerWidth, window.innerHeight) * 0.3);
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";
    const opening = window.setTimeout(() => setRing("open"), YOU.spokes * 1000);
    const folding = window.setTimeout(
      () => setRing("folded"),
      YOU.collapse * 1000,
    );
    let flights: ReturnType<typeof animate>[] = [];
    const fly = window.setTimeout(() => {
      const from = dot.current?.getBoundingClientRect();
      const to = document.querySelector("[data-you]")?.getBoundingClientRect();
      if (!from || !to) return;
      const options = { duration: YOU.flyFor, ease: EASE_IN_OUT };
      flights = [
        animate(
          x,
          to.left + to.width / 2 - (from.left + from.width / 2),
          options,
        ),
        animate(
          y,
          to.top + to.height / 2 - (from.top + from.height / 2),
          options,
        ),
      ];
    }, YOU.fly * 1000);
    const finish = window.setTimeout(() => {
      document.documentElement.style.overflow = "";
      setDone(true);
    }, YOU.done * 1000);
    return () => {
      window.clearTimeout(opening);
      window.clearTimeout(folding);
      window.clearTimeout(fly);
      window.clearTimeout(finish);
      flights.forEach((flight) => flight.stop());
      document.documentElement.style.overflow = "";
    };
  }, [reduced, x, y]);

  if (done) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 text-primary-foreground"
    >
      {DOMAINS.map((domain, index) => {
        const angle = (index / DOMAINS.length) * Math.PI * 2 - Math.PI / 2;
        const reach = radius * 1.18;
        const open = ring === "open";
        const step = {
          duration: open ? YOU.spokesFor : YOU.collapseFor,
          ease: open ? EASE_OUT : EASE_IN_OUT,
          delay: open ? index * YOU.label : 0,
        };
        return (
          <div key={domain.code}>
            <motion.span
              className="absolute top-1/2 left-1/2 h-px origin-left bg-primary-foreground/30"
              style={{
                width: radius,
                rotate: `${(angle * 180) / Math.PI}deg`,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: open ? 1 : 0 }}
              transition={step}
            />
            <motion.span
              className="absolute top-1/2 left-1/2 text-xs font-semibold tracking-[0.08em] whitespace-nowrap md:text-sm"
              style={{ translate: "-50% -50%" }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.6 }}
              animate={
                open
                  ? {
                      x: Math.cos(angle) * reach,
                      y: Math.sin(angle) * reach,
                      opacity: 1,
                      scale: 1,
                    }
                  : { x: 0, y: 0, opacity: 0, scale: 0.6 }
              }
              transition={step}
            >
              {domain.code}
            </motion.span>
          </div>
        );
      })}
      <motion.span
        ref={dot}
        className="absolute top-1/2 left-1/2 -mt-[5px] -ml-[5px] block size-2.5 rounded-full bg-primary-foreground"
        style={{ x, y }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: EASE_OUT, delay: YOU.dot }}
      >
        <motion.span
          className="absolute inset-0 rounded-full border border-primary-foreground"
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: 5, opacity: 0 }}
          transition={{ duration: 1.4, ease: EASE_OUT, repeat: Infinity }}
        />
        <motion.span
          className="absolute top-1/2 left-5 -translate-y-1/2 text-xs font-semibold tracking-[0.12em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            duration: YOU.fly,
            times: [0, 0.15, 0.85, 1],
            delay: YOU.dot + 0.2,
          }}
        >
          YOU
        </motion.span>
      </motion.span>
    </div>
  );
}
