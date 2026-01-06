"use client";

import { motion } from "framer-motion";
import type { Profile } from "@/lib/content";

interface AboutProps {
  profile: Profile;
}

export function About({ profile }: AboutProps) {
  return (
    <section id="about" className="editorial-section bg-background">
      <div className="editorial-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="mb-16"
        >
          <div className="chapter-marker mb-6">About</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-8 tracking-tight leading-[1.15]">
            Building software that matters
          </h2>
        </motion.div>

        {/* Info - Elegant editorial layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 pb-8 border-b border-border/30">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Education */}
              <div>
                <p className="text-xs font-inter uppercase tracking-[0.12em] text-foreground-subtle mb-3">Education</p>
                <p className="font-serif text-base text-foreground mb-1">
                  {profile.education.degree} {profile.education.major}
                </p>
                <p className="font-serif text-base text-foreground-muted">
                  {profile.education.school}
                </p>
              </div>

              {/* Location */}
              <div>
                <p className="text-xs font-inter uppercase tracking-[0.12em] text-foreground-subtle mb-3">Location</p>
                <p className="font-serif text-base text-foreground-muted mb-1">
                  {profile.location}
                </p>
                <p className="font-serif text-sm text-foreground-subtle">
                  Open to relocation
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <p className="text-xs font-inter uppercase tracking-[0.12em] text-foreground-subtle mb-3">Focus Areas</p>
              <ul className="space-y-2.5">
                <li className="font-serif text-base text-foreground-muted">Full-Stack Development</li>
                <li className="font-serif text-base text-foreground-muted">Systems Programming</li>
                <li className="font-serif text-base text-foreground-muted">AI/ML Applications</li>
                <li className="font-serif text-base text-foreground-muted">Open Source</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Bio - Refined editorial style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="space-y-7 max-w-none"
        >
          {/* First paragraph with drop cap */}
          {profile.bio.length > 0 && (
            <p className="drop-cap lead text-foreground-muted font-serif text-lg md:text-xl leading-[1.85]">
              {profile.bio[0]}
            </p>
          )}

          {/* Remaining paragraphs */}
          {profile.bio.slice(1).map((paragraph, index) => (
            <p
              key={index}
              className="text-foreground-muted font-serif text-lg md:text-xl leading-[1.85]"
            >
              {paragraph}
            </p>
          ))}

          {/* Closing statement */}
          <p className="text-foreground-muted font-serif text-lg md:text-xl leading-[1.85] pt-2">
            Focused on building products that solve real problems with clean, maintainable code.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
