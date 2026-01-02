"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Cursor glow that illuminates content underneath
export function CursorGlow() {
  const [mounted, setMounted] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Smooth spring animation
  const springConfig = { damping: 25, stiffness: 200 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-50 mix-blend-soft-light"
      style={{
        x: smoothX,
        y: smoothY,
        width: 400,
        height: 400,
        marginLeft: -200,
        marginTop: -200,
        background: "radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%)",
        filter: "blur(40px)",
      }}
    />
  );
}
