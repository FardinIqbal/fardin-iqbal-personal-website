"use client";

import { useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { haptic } from "@/lib/haptics";
import { cn } from "@/lib/utils";

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface TouchRippleProps {
  children: ReactNode;
  className?: string;
  rippleColor?: string;
  disabled?: boolean;
  hapticFeedback?: "light" | "medium" | "heavy" | "selection" | "none";
  onClick?: () => void;
  as?: "button" | "div" | "a";
  href?: string;
}

export function TouchRipple({
  children,
  className = "",
  rippleColor = "rgba(255, 255, 255, 0.3)",
  disabled = false,
  hapticFeedback = "selection",
  onClick,
  as = "button",
  href,
}: TouchRippleProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const addRipple = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return;

      const element = e.currentTarget as HTMLElement;
      const rect = element.getBoundingClientRect();

      let x: number, y: number;

      if ("touches" in e) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      }

      // Calculate ripple size based on element dimensions
      const size = Math.max(rect.width, rect.height) * 2;

      const newRipple: Ripple = {
        id: Date.now(),
        x,
        y,
        size,
      };

      setRipples((prev) => [...prev, newRipple]);

      // Trigger haptic feedback
      if (hapticFeedback !== "none") {
        haptic(hapticFeedback);
      }

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    },
    [disabled, hapticFeedback]
  );

  const Component = as === "a" ? "a" : as === "div" ? "div" : "button";

  const props = {
    className: cn(
      "relative overflow-hidden",
      disabled && "opacity-50 cursor-not-allowed",
      className
    ),
    onMouseDown: addRipple,
    onTouchStart: addRipple,
    onClick: disabled ? undefined : onClick,
    ...(as === "a" && { href }),
    ...(as === "button" && { type: "button" as const }),
  };

  return (
    <Component {...props}>
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x - ripple.size / 2,
              top: ripple.y - ripple.size / 2,
              width: ripple.size,
              height: ripple.size,
              backgroundColor: rippleColor,
            }}
          />
        ))}
      </AnimatePresence>
    </Component>
  );
}

/**
 * Higher-order component to add ripple effect to any component
 */
export function withRipple<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  rippleProps?: Partial<Omit<TouchRippleProps, "children">>
) {
  return function WithRippleComponent(props: P) {
    return (
      <TouchRipple {...rippleProps}>
        <WrappedComponent {...props} />
      </TouchRipple>
    );
  };
}
