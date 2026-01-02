"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export function TextReveal({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  const words = children.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

interface CharacterRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export function CharacterReveal({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.02,
}: CharacterRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const characters = children.split("");

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 50, rotateX: -90 },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
                delay: delay + index * staggerDelay,
              },
            },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

interface GradientTextRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export function GradientTextReveal({
  children,
  className = "",
  delay = 0,
}: GradientTextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.span
      ref={ref}
      className={`inline-block bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text ${className}`}
      initial={{ opacity: 0, backgroundPosition: "200% 0" }}
      animate={
        isInView
          ? {
              opacity: 1,
              backgroundPosition: "0% 0",
              transition: {
                opacity: { duration: 0.5, delay },
                backgroundPosition: { duration: 1.5, delay: delay + 0.2 },
              },
            }
          : {}
      }
      style={{ backgroundSize: "200% 100%" }}
    >
      <motion.span
        initial={{ opacity: 0, y: 30 }}
        animate={
          isInView
            ? {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] },
              }
            : {}
        }
        className="text-transparent"
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
