"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedGradientProps {
  className?: string;
  colors?: string[];
  speed?: number;
  blur?: number;
}

export function AnimatedGradient({
  className,
  colors = [
    "rgb(var(--theme-accent) / 0.15)",
    "rgb(var(--color-foreground) / 0.05)",
    "rgb(var(--theme-accent) / 0.1)",
  ],
  speed = 10,
  blur = 100,
}: AnimatedGradientProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Animated blobs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: colors[0],
          filter: `blur(${blur}px)`,
          top: "10%",
          left: "10%",
        }}
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: colors[1],
          filter: `blur(${blur}px)`,
          top: "50%",
          right: "10%",
        }}
        animate={{
          x: [0, -80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: speed * 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: colors[2],
          filter: `blur(${blur}px)`,
          bottom: "10%",
          left: "30%",
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 60, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: speed * 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

// Mesh gradient (more subtle)
export function MeshGradient({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none opacity-30", className)}>
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="40" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
          </filter>
          <radialGradient id="gradient1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgb(var(--theme-accent))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="gradient2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgb(var(--color-foreground))" stopOpacity="0.1" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <g filter="url(#goo)">
          <motion.circle
            cx="20%"
            cy="30%"
            r="200"
            fill="url(#gradient1)"
            animate={{
              cx: ["20%", "30%", "25%", "20%"],
              cy: ["30%", "40%", "25%", "30%"],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="70%"
            cy="60%"
            r="250"
            fill="url(#gradient2)"
            animate={{
              cx: ["70%", "60%", "75%", "70%"],
              cy: ["60%", "50%", "70%", "60%"],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>
      </svg>
    </div>
  );
}
