"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface MagneticTarget {
  element: HTMLElement;
  rect: DOMRect;
  strength: number;
}

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const magneticTargetRef = useRef<MagneticTarget | null>(null);

  // Smoother spring for cursor following
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Slower spring for the ring (creates trailing effect)
  const ringSpringConfig = { damping: 30, stiffness: 200, mass: 0.8 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  // Even slower for glow
  const glowSpringConfig = { damping: 40, stiffness: 150, mass: 1 };
  const glowX = useSpring(mouseX, glowSpringConfig);
  const glowY = useSpring(mouseY, glowSpringConfig);

  const findMagneticTarget = useCallback((x: number, y: number): MagneticTarget | null => {
    const magneticElements = document.querySelectorAll('[data-magnetic], a, button');
    let closestTarget: MagneticTarget | null = null;
    let closestDistance = Infinity;

    magneticElements.forEach((el) => {
      const element = el as HTMLElement;
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
      );

      // Magnetic radius - elements pull cursor when within this distance
      const magneticRadius = Math.max(rect.width, rect.height) * 1.5;
      const strength = element.dataset.magneticStrength
        ? parseFloat(element.dataset.magneticStrength)
        : 0.3;

      if (distance < magneticRadius && distance < closestDistance) {
        closestDistance = distance;
        closestTarget = { element, rect, strength };
      }
    });

    return closestTarget;
  }, []);

  useEffect(() => {
    // Only show custom cursor on desktop
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return;
    }

    // Hide default cursor
    document.body.style.cursor = 'none';

    const updateMousePosition = (e: MouseEvent) => {
      let targetX = e.clientX;
      let targetY = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Find magnetic target
      const target = findMagneticTarget(e.clientX, e.clientY);
      magneticTargetRef.current = target;

      if (target) {
        const centerX = target.rect.left + target.rect.width / 2;
        const centerY = target.rect.top + target.rect.height / 2;

        // Calculate magnetic pull
        const pullX = (centerX - e.clientX) * target.strength;
        const pullY = (centerY - e.clientY) * target.strength;

        targetX = e.clientX + pullX;
        targetY = e.clientY + pullY;
      }

      mouseX.set(targetX);
      mouseY.set(targetY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-magnetic]');

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
      const interactive = target.closest('a, button, [data-magnetic]');

      if (interactive) {
        setIsHovering(false);
        setHoverText(null);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [isVisible, findMagneticTarget, mouseX, mouseY]);

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
