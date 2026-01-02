"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import type { ComponentProps } from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const variants = {
  primary:
    "bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/25",
  secondary:
    "bg-background-tertiary hover:bg-background-secondary text-foreground border border-border",
  outline:
    "border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10",
  ghost: "text-foreground-muted hover:text-foreground hover:bg-white/5",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  external,
  className,
  onClick,
  disabled,
  type = "button",
}: ButtonProps) {
  const baseStyles = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    variants[variant],
    sizes[size],
    className
  );

  const MotionComponent = motion.button;

  if (href) {
    const linkProps: ComponentProps<typeof Link> = {
      href,
      className: baseStyles,
      ...(external && { target: "_blank", rel: "noopener noreferrer" }),
    };

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-block"
      >
        <Link {...linkProps}>{children}</Link>
      </motion.div>
    );
  }

  return (
    <MotionComponent
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={baseStyles}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </MotionComponent>
  );
}
