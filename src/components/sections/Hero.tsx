"use client";

import { motion } from "framer-motion";
import type { Profile } from "@/lib/content";

interface HeroProps {
  profile: Profile;
}

export function Hero({ profile }: HeroProps) {
  return (
    <section
      id="hero"
      className="min-h-[85vh] flex items-center justify-center px-6 lg:px-12 pt-24"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-foreground tracking-tight leading-[1.05] mb-8"
        >
          {profile.name}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-body text-xl md:text-2xl text-foreground-secondary leading-relaxed max-w-2xl mx-auto mb-10"
        >
          {profile.tagline}
        </motion.p>

        {/* Meta info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-3 font-sans text-sm text-foreground-muted"
        >
          <span>Software Engineer</span>
          <span className="text-border">|</span>
          <span>Stony Brook University</span>
        </motion.div>
      </div>
    </section>
  );
}
