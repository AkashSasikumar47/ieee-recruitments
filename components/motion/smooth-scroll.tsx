"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import "lenis/dist/lenis.css";

function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (window.location.hash) return;
    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname, lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <>
        <ScrollReset />
        {children}
      </>
    );
  }

  return (
    <ReactLenis
      root
      options={{ lerp: 0.075, smoothWheel: true, anchors: true, autoRaf: true }}
    >
      <ScrollReset />
      {children}
    </ReactLenis>
  );
}
