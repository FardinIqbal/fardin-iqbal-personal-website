"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import type { Profile } from "@/lib/content";

// Staggered letter animation component
function AnimatedText({ text, className }: { text: string; className?: string }) {
  const letters = text.split("");

  return (
    <span className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.1 + index * 0.03,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
          className="inline-block"
          style={{ display: letter === " " ? "inline" : "inline-block" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}


interface HeroProps {
  profile: Profile;
}

export function Hero({ profile }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <section
      id="hero"
      ref={containerRef}
      className="editorial-hero relative overflow-hidden"
    >
      {/* Clean background */}
      <div className="absolute inset-0 bg-background" />

      {/* Content */}
      <motion.div
        style={{
          y: springY,
          opacity,
        }}
        className="relative z-10 editorial-container text-center"
      >

        {/* Name - elegant serif with staggered animation */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="chapter-marker mb-10"
          >
            Introduction
          </motion.div>
          <h1 className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-semibold text-foreground tracking-tight leading-[1.1] mb-8">
            <AnimatedText text={profile.name} />
          </h1>
        </motion.h1>

        {/* Tagline - elegant serif */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-foreground-muted leading-[1.7] max-w-[520px] mx-auto font-light mb-12"
        >
          {profile.tagline}
        </motion.p>

        {/* Hero Meta - New Yorker style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="editorial-meta justify-center"
        >
          <span>Software Engineer</span>
          <span>Stony Brook University</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator - New Yorker style */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-foreground-subtle"
      >
        <span className="text-[0.65rem] font-inter uppercase tracking-[0.1em]">Begin the journey</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>

    </section>
  );
}
