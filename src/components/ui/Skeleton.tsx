"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "rounded";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "wave" | "none";
}

export function Skeleton({
  className,
  variant = "text",
  width,
  height,
  animation = "pulse",
}: SkeletonProps) {
  const variantClasses = {
    text: "h-4 rounded",
    circular: "rounded-full aspect-square",
    rectangular: "rounded-none",
    rounded: "rounded-xl",
  };

  const animationClasses = {
    pulse: "animate-pulse",
    wave: "",
    none: "",
  };

  const baseStyle: React.CSSProperties = {
    width: width ?? (variant === "text" ? "100%" : undefined),
    height: height ?? (variant === "text" ? undefined : "100%"),
  };

  if (animation === "wave") {
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-foreground/5",
          variantClasses[variant],
          className
        )}
        style={baseStyle}
      >
        <motion.div
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
          animate={{ translateX: ["−100%", "100%"] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "linear",
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-foreground/5",
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      style={baseStyle}
    />
  );
}

// Common skeleton patterns
export function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={cn(
            "h-4",
            i === lines - 1 && "w-4/5" // Last line shorter
          )}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "p-6 rounded-xl border border-border bg-background-secondary",
        className
      )}
    >
      {/* Image placeholder */}
      <Skeleton variant="rounded" className="w-full h-48 mb-4" />

      {/* Title */}
      <Skeleton variant="text" className="h-6 w-3/4 mb-2" />

      {/* Description */}
      <SkeletonText lines={2} />

      {/* Tags */}
      <div className="flex gap-2 mt-4">
        <Skeleton variant="rounded" className="h-6 w-16" />
        <Skeleton variant="rounded" className="h-6 w-20" />
        <Skeleton variant="rounded" className="h-6 w-14" />
      </div>
    </div>
  );
}

export function SkeletonAvatar({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <Skeleton
      variant="circular"
      className={cn(sizeClasses[size], className)}
    />
  );
}

export function SkeletonBlogCard({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-4", className)}>
      {/* Thumbnail */}
      <Skeleton variant="rounded" className="w-24 h-24 flex-shrink-0" />

      {/* Content */}
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" className="h-5 w-3/4" />
        <Skeleton variant="text" className="h-4 w-full" />
        <Skeleton variant="text" className="h-4 w-2/3" />
        <div className="flex gap-2 pt-2">
          <Skeleton variant="rounded" className="h-5 w-16" />
          <Skeleton variant="rounded" className="h-5 w-20" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonProfile({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <SkeletonAvatar size="lg" />
      <div className="space-y-2">
        <Skeleton variant="text" className="h-5 w-32" />
        <Skeleton variant="text" className="h-4 w-24" />
      </div>
    </div>
  );
}

// Grid of skeleton cards
export function SkeletonGrid({
  count = 6,
  columns = 3,
  className,
}: {
  count?: number;
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const gridClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-6", gridClasses[columns], className)}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <SkeletonCard />
        </motion.div>
      ))}
    </div>
  );
}
