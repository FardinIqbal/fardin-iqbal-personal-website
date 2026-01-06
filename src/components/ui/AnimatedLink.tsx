"use client";

import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { haptic } from "@/lib/haptics";

interface AnimatedLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  variant?: "underline" | "highlight" | "arrow" | "bracket";
}

export function AnimatedLink({
  href,
  children,
  className,
  external = false,
  variant = "underline",
}: AnimatedLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    haptic("light");
  };

  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  const variants = {
    underline: (
      <span className="relative">
        {children}
        <motion.span
          className="absolute bottom-0 left-0 h-[1px] bg-current"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? "100%" : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </span>
    ),
    highlight: (
      <span className="relative">
        <motion.span
          className="absolute inset-0 -z-10 bg-foreground/10 rounded"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
        <span className="relative px-1">{children}</span>
      </span>
    ),
    arrow: (
      <span className="inline-flex items-center gap-1">
        {children}
        <motion.span
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ duration: 0.2 }}
        >
          →
        </motion.span>
      </span>
    ),
    bracket: (
      <span className="relative">
        <motion.span
          className="absolute -left-2"
          initial={{ opacity: 0, x: 4 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 4 }}
          transition={{ duration: 0.2 }}
        >
          [
        </motion.span>
        {children}
        <motion.span
          className="absolute -right-2"
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -4 }}
          transition={{ duration: 0.2 }}
        >
          ]
        </motion.span>
      </span>
    ),
  };

  const Component = external ? "a" : Link;

  return (
    <Component
      href={href}
      {...linkProps}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "inline-block text-foreground hover:text-foreground transition-colors",
        className
      )}
    >
      {variants[variant]}
    </Component>
  );
}

// Text that reveals on hover
export function RevealText({
  children,
  revealed,
  className,
}: {
  children: ReactNode;
  revealed: ReactNode;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={cn("relative inline-block overflow-hidden", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.span
        className="inline-block"
        animate={{ y: isHovered ? "-100%" : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute left-0 top-0 inline-block"
        initial={{ y: "100%" }}
        animate={{ y: isHovered ? 0 : "100%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {revealed}
      </motion.span>
    </span>
  );
}

// Glitch text effect
export function GlitchText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={cn("relative inline-block", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10">{children}</span>
      {isHovered && (
        <>
          <motion.span
            className="absolute inset-0 text-red-500/50"
            animate={{ x: [-2, 2, -2], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 0.1, repeat: Infinity }}
          >
            {children}
          </motion.span>
          <motion.span
            className="absolute inset-0 text-[rgb(var(--accent-red))]/50"
            animate={{ x: [2, -2, 2], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 0.1, repeat: Infinity }}
          >
            {children}
          </motion.span>
        </>
      )}
    </span>
  );
}
