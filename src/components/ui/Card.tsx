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
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.3 }}
      className={cn(
        "rounded-xl bg-background-secondary border border-border",
        hover && "transition-shadow duration-300 hover:shadow-xl hover:shadow-primary-500/5",
        paddingSizes[padding],
        className
      )}
    >
      {children}
    </motion.div>
  );
}
