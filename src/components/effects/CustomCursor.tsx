"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Fast, responsive spring for cursor (almost instant)
  const springConfig = { damping: 50, stiffness: 800, mass: 0.1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Slightly slower for the ring (subtle trailing)
  const ringSpringConfig = { damping: 40, stiffness: 400, mass: 0.2 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  // Glow follows loosely
  const glowSpringConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const glowX = useSpring(mouseX, glowSpringConfig);
  const glowY = useSpring(mouseY, glowSpringConfig);

  useEffect(() => {
    // Only show custom cursor on desktop
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return;
    }

    // Inject global CSS to hide ALL cursors
    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);
    styleRef.current = style;

    const updateMousePosition = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      // Direct 1:1 mapping - no magnetic effect (cleaner, more responsive)
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])');

      if (interactive) {
        setIsHovering(true);

        // Check for custom hover text
        const hoverLabel = (interactive as HTMLElement).dataset.cursorText;
        if (hoverLabel) {
          setHoverText(hoverLabel);
        }
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])');

      if (interactive) {
        setIsHovering(false);
        setHoverText(null);
      }
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      if (styleRef.current) {
        styleRef.current.remove();
      }
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-foreground rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.5 : isHovering ? 0.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Cursor ring - expands on hover */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] hidden md:block border-2 border-foreground/40"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 60 : 40,
          height: isHovering ? 60 : 40,
          opacity: isHovering ? 0.8 : 0.4,
          borderColor: isHovering ? "rgb(var(--color-foreground))" : "rgb(var(--color-foreground) / 0.4)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      {/* Hover text label */}
      {hoverText && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <span className="px-3 py-1.5 text-xs font-medium bg-foreground text-background rounded-full whitespace-nowrap">
            {hoverText}
          </span>
        </motion.div>
      )}

      {/* Trailing glow */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 rounded-full pointer-events-none z-[9997] hidden md:block"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgb(var(--theme-accent) / 0.1) 0%, transparent 70%)",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.5,
        }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
}
