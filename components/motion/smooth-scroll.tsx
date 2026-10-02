"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import "lenis/dist/lenis.css";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) return children;

  return (
    <ReactLenis
      root
      options={{ lerp: 0.075, smoothWheel: true, anchors: true, autoRaf: true }}
    >
      {children}
    </ReactLenis>
  );
}
