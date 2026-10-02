"use client";

import { MotionConfig } from "motion/react";
import { SmoothScroll } from "./smooth-scroll";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>{children}</SmoothScroll>
    </MotionConfig>
  );
}
