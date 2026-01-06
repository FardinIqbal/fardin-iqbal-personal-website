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
      className="editorial-hero relative"
    >
      {/* Content */}
      <div className="editorial-container text-center">

        {/* Chapter marker */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="chapter-marker mb-12"
        >
          Introduction
        </motion.div>

        {/* Name - elegant serif with refined typography */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-semibold text-foreground tracking-tight leading-[1.08] mb-10"
        >
          {profile.name}
        </motion.h1>

        {/* Tagline - refined editorial style */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="text-xl md:text-2xl text-foreground-muted leading-[1.75] max-w-[600px] mx-auto font-serif font-light mb-16"
        >
          {profile.tagline}
        </motion.p>

        {/* Hero Meta - refined New Yorker style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="editorial-meta justify-center"
        >
          <span>Software Engineer</span>
          <span className="text-foreground-subtle/60">·</span>
          <span>Stony Brook University</span>
        </motion.div>
      </div>
    </section>
  );
}
