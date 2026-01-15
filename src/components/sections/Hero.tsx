"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Profile } from "@/lib/content";

interface HeroProps {
  profile: Profile;
}

export function Hero({ profile }: HeroProps) {
  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-12 pt-16"
    >
      <div className="max-w-5xl mx-auto text-center flex-1 flex flex-col justify-center">
        {/* Name - Commanding presence */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-medium text-foreground tracking-[-0.04em] leading-[0.9] mb-8"
        >
          {profile.name}
        </motion.h1>

        {/* Tagline - Elegant italic */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-body text-xl md:text-2xl lg:text-3xl italic text-foreground-secondary leading-relaxed max-w-2xl mx-auto mb-10"
        >
          {profile.tagline}
        </motion.p>

        {/* Meta info - Small caps styling */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center gap-4 font-sans text-xs tracking-[0.15em] uppercase text-foreground-muted"
        >
          <span>Software Engineer</span>
          <span className="text-accent">·</span>
          <span>Stony Brook University</span>
        </motion.div>
      </div>

      {/* Scroll indicator - Subtle CTA */}
      <motion.button
        onClick={scrollToWork}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mb-12 flex flex-col items-center gap-2 text-foreground-muted hover:text-foreground transition-colors cursor-pointer group"
        aria-label="Scroll to work"
      >
        <span className="font-sans text-xs tracking-[0.15em] uppercase">View Work</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 group-hover:text-accent transition-colors" />
        </motion.div>
      </motion.button>
    </section>
  );
}
