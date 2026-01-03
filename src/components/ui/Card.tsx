"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingSizes = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  children,
  className,
  hover = true,
  padding = "md",
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "rounded-lg bg-surface border border-border",
        hover && "transition-all duration-300 hover:shadow-lg hover:shadow-foreground/5 hover:border-foreground/10",
        paddingSizes[padding],
        className
      )}
    >
      {children}
    </motion.div>
  );
}
