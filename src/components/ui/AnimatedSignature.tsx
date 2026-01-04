"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedSignatureProps {
  text?: string;
  className?: string;
  delay?: number;
}

export function AnimatedSignature({
  text = "Fardin Iqbal",
  className,
  delay = 0,
}: AnimatedSignatureProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className={cn("font-serif italic text-foreground-muted", className)}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <svg
        viewBox="0 0 200 60"
        className="w-full h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M10 45 Q20 20, 35 35 T60 30 Q70 25, 80 35 T100 30 Q110 35, 120 30 T140 35 Q150 25, 165 35 T190 30"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{
            pathLength: { duration: 2, delay: delay + 0.2, ease: "easeInOut" },
            opacity: { duration: 0.5, delay },
          }}
        />
        {/* Decorative flourish */}
        <motion.path
          d="M180 35 Q185 25, 190 30 Q192 35, 188 38"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{
            pathLength: { duration: 0.5, delay: delay + 2, ease: "easeOut" },
            opacity: { duration: 0.3, delay: delay + 2 },
          }}
        />
      </svg>
      <motion.span
        className="block text-center text-sm mt-2"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: delay + 2.2 }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
}

// Typed signature effect
export function TypedSignature({
  text = "Built with care by Fardin Iqbal",
  className,
  speed = 50,
}: {
  text?: string;
  className?: string;
  speed?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className={cn("font-mono text-sm text-foreground-subtle", className)}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: i * (speed / 1000) }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        className="inline-block w-2 h-4 bg-foreground-subtle ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </motion.div>
  );
}

// Animated initials logo
export function AnimatedInitials({
  initials = "FI",
  className,
}: {
  initials?: string;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(
        "relative w-12 h-12 flex items-center justify-center font-display font-bold text-lg",
        className
      )}
      whileHover="hover"
    >
      {/* Border animation */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 48 48"
      >
        <motion.rect
          x="2"
          y="2"
          width="44"
          height="44"
          rx="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>

      {/* Initials */}
      <motion.span
        className="relative z-10"
        variants={{
          hover: { scale: 1.1 },
        }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {initials}
      </motion.span>

      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-foreground/5"
        variants={{
          hover: { opacity: 1 },
        }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}
