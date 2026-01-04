"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 0.6, // Snappier, more responsive
      easing: (t) => 1 - Math.pow(1 - t, 3), // Cubic ease-out - quick start, smooth end
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.2, // Slightly faster wheel response
      touchMultiplier: 1.5, // Better touch response
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Expose lenis to window for scroll-to functionality
    // @ts-expect-error - Adding to window
    window.lenis = lenis;

    return () => {
      lenis.destroy();
      // @ts-expect-error - Removing from window
      delete window.lenis;
    };
  }, []);

  return null;
}
