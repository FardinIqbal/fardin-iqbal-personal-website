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
      style={{
        borderBottom: "2px solid rgb(var(--accent-red)/0.15)",
        background: "linear-gradient(to bottom, rgb(var(--color-background)), rgb(var(--color-background-secondary)/0.3))"
      }}
    >
      {/* Subtle accent red gradient - like essay hero */}
      <div 
        className="absolute top-0 right-0 w-2/5 h-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgb(var(--accent-red)/0.03) 0%, transparent 70%)"
        }}
      />

      {/* Content */}
      <div className="editorial-container text-center relative z-10">
        {/* Chapter marker with accent red - like essay hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div 
            className="chapter-marker"
            style={{ color: "rgb(var(--accent-red))" }}
          >
            Introduction
          </div>
        </motion.div>

        {/* Name - elegant serif with refined typography */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-semibold text-foreground tracking-tight leading-[1.08] mb-10 relative"
        >
          {/* Accent red line above name - like essay hero title */}
          <span 
            className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-px block"
            style={{
              background: "linear-gradient(to right, transparent, rgb(var(--accent-red)), transparent)",
              opacity: 0.5
            }}
          />
          {profile.name}
        </motion.h1>

        {/* Tagline - refined editorial style */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-foreground-muted leading-[1.75] max-w-[600px] mx-auto font-serif font-light mb-16"
        >
          {profile.tagline}
        </motion.p>

        {/* Hero Meta - refined New Yorker style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
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
