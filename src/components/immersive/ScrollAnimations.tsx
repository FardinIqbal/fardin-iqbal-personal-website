"use client";

import { useRef, useEffect, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useMood } from "./MoodSystem";

// Reveal text line by line as user scrolls
export function ScrollReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

// Parallax effect for elements
export function Parallax({
  children,
  speed = 0.5,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  );
}

// Text that reveals character by character
export function TextReveal({
  children,
  className = "",
  staggerDelay = 0.02,
}: {
  children: string;
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  const characters = children.split("");

  return (
    <span ref={ref} className={className}>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.4,
            delay: i * staggerDelay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

// Glowing emphasis for key phrases
export function GlowText({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { palette } = useMood();

  return (
    <span
      className={`relative ${className}`}
      style={{
        color: `rgb(${palette.primary})`,
        textShadow: `0 0 20px rgba(${palette.primary}, 0.5), 0 0 40px rgba(${palette.primary}, 0.3)`,
      }}
    >
      {children}
    </span>
  );
}

// Hero section that fades on scroll
export function FadingHero({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.9]);
  const y = useTransform(scrollY, [0, 400], [0, 100]);

  return (
    <motion.div
      className={`sticky top-0 ${className}`}
      style={{ opacity, scale, y }}
    >
      {children}
    </motion.div>
  );
}

// Pull quote with dramatic entrance
export function PullQuote({
  children,
  author,
  className = "",
}: {
  children: ReactNode;
  author?: string;
  className?: string;
}) {
  const ref = useRef<HTMLQuoteElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const { palette } = useMood();

  return (
    <motion.blockquote
      ref={ref}
      className={`relative my-16 py-8 px-6 ${className}`}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ background: `rgb(${palette.primary})` }}
      />
      <div
        className="absolute -left-2 top-0 h-8 w-8 opacity-20"
        style={{
          background: `radial-gradient(circle, rgba(${palette.primary}, 0.5) 0%, transparent 70%)`,
        }}
      />
      <p className="text-2xl md:text-3xl font-light italic text-white/90 leading-relaxed">
        {children}
      </p>
      {author && (
        <footer className="mt-4 text-sm" style={{ color: `rgb(${palette.secondary})` }}>
          {author}
        </footer>
      )}
    </motion.blockquote>
  );
}

// Section divider with animated line
export function SectionDivider({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { palette } = useMood();

  return (
    <div ref={ref} className={`relative h-24 flex items-center justify-center ${className}`}>
      <motion.div
        className="h-px w-full max-w-md"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          background: `linear-gradient(90deg, transparent, rgb(${palette.primary}), transparent)`,
        }}
      />
      <motion.div
        className="absolute w-2 h-2 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{ background: `rgb(${palette.primary})`, boxShadow: palette.glow }}
      />
    </div>
  );
}

// Progress indicator
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const { palette } = useMood();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
      style={{
        scaleX,
        background: `linear-gradient(90deg, rgb(${palette.primary}), rgb(${palette.secondary}))`,
      }}
    />
  );
}
