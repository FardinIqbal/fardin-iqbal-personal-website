"use client";

import { motion, useScroll, useSpring } from "framer-motion";

interface ScrollProgressProps {
  position?: "top" | "bottom";
  color?: string;
  height?: number;
  showPercentage?: boolean;
}

export function ScrollProgress({
  position = "top",
  color = "rgb(var(--theme-accent))",
  height = 3,
  showPercentage = false,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed left-0 right-0 z-50 origin-left"
        style={{
          [position]: 0,
          height,
          scaleX,
          background: `linear-gradient(90deg, ${color}, ${color}dd)`,
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="fixed left-0 right-0 z-50 origin-left pointer-events-none"
        style={{
          [position]: 0,
          height: height * 3,
          scaleX,
          background: `linear-gradient(90deg, ${color}40, ${color}20)`,
          filter: "blur(8px)",
        }}
      />

      {/* Optional percentage display */}
      {showPercentage && (
        <motion.div
          className="fixed right-4 z-50 px-2 py-1 text-xs font-mono bg-background/80 backdrop-blur-sm border border-border rounded"
          style={{
            [position]: position === "top" ? height + 8 : height + 8,
          }}
        >
          <motion.span>
            {/* This will be updated by the scroll progress */}
          </motion.span>
        </motion.div>
      )}
    </>
  );
}

// Circular scroll progress indicator
export function CircularScrollProgress({
  size = 48,
  strokeWidth = 3,
  color = "rgb(var(--theme-accent))",
}: {
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.div
      className="fixed bottom-24 right-6 z-40"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <svg width={size} height={size} className="rotate-[-90deg]">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgb(var(--color-border))"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          style={{
            pathLength,
            strokeDasharray: circumference,
            strokeDashoffset: 0,
          }}
        />
      </svg>
    </motion.div>
  );
}
