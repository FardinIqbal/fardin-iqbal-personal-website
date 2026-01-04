"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

/**
 * Ultra-minimal scroll progress for blog posts only
 * - Hair-thin line (1px)
 * - No glow effects
 * - Fades in after scrolling starts
 * - Subtle opacity
 */
export function BlogScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Fade in after user starts scrolling
  const opacity = useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 0.5, 0.5, 0]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100 && !hasScrolled) {
        setHasScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-px z-50 origin-left"
      style={{
        scaleX,
        opacity,
        background: "rgb(var(--color-foreground))",
      }}
    />
  );
}

/**
 * Reading progress with time estimate
 * Shows "X min left" that counts down as you scroll
 */
export function ReadingProgress({ totalReadingTime }: { totalReadingTime: number }) {
  const { scrollYProgress } = useScroll();
  const [minutesLeft, setMinutesLeft] = useState(totalReadingTime);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      const remaining = Math.ceil(totalReadingTime * (1 - progress));
      setMinutesLeft(Math.max(0, remaining));
    });

    return () => unsubscribe();
  }, [scrollYProgress, totalReadingTime]);

  if (minutesLeft === 0) return null;

  return (
    <motion.div
      className="fixed top-4 right-4 z-50 px-3 py-1.5 text-xs font-mono text-foreground-subtle bg-background/80 backdrop-blur-sm border border-border/50 rounded-full"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      {minutesLeft} min left
    </motion.div>
  );
}

/**
 * Vertical edge progress indicator
 * Thin line on the right edge, like a scrollbar highlight
 */
export function VerticalScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 right-0 w-px h-full z-50 origin-top hidden md:block"
      style={{
        scaleY,
        background: "linear-gradient(to bottom, rgb(var(--color-foreground) / 0.3), rgb(var(--color-foreground) / 0.1))",
      }}
    />
  );
}

// Keep the old exports for backward compatibility but mark as deprecated
/** @deprecated Use BlogScrollProgress instead */
export function ScrollProgress({
  position = "top",
  height = 1,
}: {
  position?: "top" | "bottom";
  color?: string;
  height?: number;
  showPercentage?: boolean;
}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 right-0 z-50 origin-left"
      style={{
        [position]: 0,
        height,
        scaleX,
        background: "rgb(var(--color-foreground) / 0.3)",
      }}
    />
  );
}

/** @deprecated Use BlogScrollProgress instead */
export function CircularScrollProgress() {
  return null; // Removed - not used
}
