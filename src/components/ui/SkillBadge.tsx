"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SkillBadgeProps {
  name: string;
  className?: string;
  size?: "sm" | "md";
}

export function SkillBadge({ name, className, size = "md" }: SkillBadgeProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={cn(
        "inline-flex items-center rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20",
        "transition-colors duration-200 hover:bg-primary-500/20",
        size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm",
        className
      )}
    >
      {name}
    </motion.span>
  );
}
