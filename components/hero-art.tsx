"use client";

import { AnimatePresence, motion } from "motion/react";
import { ART, EASE_IN_OUT, EASE_OUT, YOU } from "@/components/motion/timing";
import { DOMAINS } from "@/lib/content";

const NODES = [
  [180, 120],
  [360, 60],
  [520, 170],
  [700, 90],
  [860, 200],
  [300, 260],
  [600, 320],
  [820, 380],
  [460, 430],
  [890, 520],
] as const;

const EDGES = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [0, 5],
  [5, 2],
  [2, 6],
  [6, 4],
  [6, 7],
  [7, 4],
  [5, 8],
  [8, 6],
  [7, 9],
  [8, 7],
  [1, 5],
] as const;

export function HeroArt({ active }: { active: number }) {
  const point = NODES[active % NODES.length]!;
  const code = DOMAINS[active]?.code ?? "";

  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMaxYMin meet"
      className="text-primary-faint pointer-events-none absolute top-16 -right-[12.5%] -z-10 h-[62%] w-[125%] md:top-12 md:right-[max(2rem,calc((100%-var(--container-site))/2+2rem))] md:w-[calc(min(100%,var(--container-site))*0.72)]"
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: ART.drift, ease: "easeInOut", repeat: Infinity }}
    >
      <g stroke="currentColor" strokeWidth="1" fill="none" opacity="0.28">
        {EDGES.map(([from, to], index) => {
          const a = NODES[from]!;
          const b = NODES[to]!;
          return (
            <motion.line
              key={`${from}-${to}`}
              x1={a[0]}
              y1={a[1]}
              x2={b[0]}
              y2={b[1]}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: ART.draw,
                ease: EASE_OUT,
                delay: ART.start + index * ART.stagger,
              }}
            />
          );
        })}
      </g>
      <g fill="currentColor">
        {NODES.map(([x, y], index) => (
          <motion.circle
            key={index}
            cx={x}
            cy={y}
            initial={{ r: 0, opacity: 0 }}
            animate={{ r: 3, opacity: 0.5 }}
            transition={{
              duration: ART.draw / 2,
              ease: EASE_OUT,
              delay: ART.start + index * ART.stagger,
            }}
          />
        ))}
      </g>
      <motion.g
        initial={{ x: point[0], y: point[1], opacity: 0 }}
        animate={{ x: point[0], y: point[1], opacity: 1 }}
        transition={{
          default: { duration: ART.hop, ease: EASE_IN_OUT },
          opacity: { duration: 0.2, delay: YOU.done - 0.1 },
        }}
      >
        <circle
          data-you
          r="5"
          className="fill-primary-foreground"
          opacity="0.8"
        />
        <motion.circle
          r="5"
          fill="none"
          className="stroke-primary-foreground"
          strokeWidth="1"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{
            duration: ART.ping,
            ease: EASE_OUT,
            repeat: Infinity,
          }}
        />
        <AnimatePresence mode="wait">
          <motion.text
            key={code}
            x="14"
            y="-10"
            className="fill-primary-foreground text-[15px] font-semibold tracking-[0.08em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: ART.label, ease: EASE_OUT }}
          >
            {code}
          </motion.text>
        </AnimatePresence>
      </motion.g>
    </motion.svg>
  );
}
