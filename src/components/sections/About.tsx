"use client";

import { motion } from "framer-motion";
import type { Profile } from "@/lib/content";

interface AboutProps {
  profile: Profile;
}

export function About({ profile }: AboutProps) {
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="editorial-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="chapter-marker mb-4">About</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-foreground mb-6 tracking-tight leading-tight">
            Building software that matters
          </h2>
        </motion.div>

        {/* Info - Simple, elegant list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 space-y-2 font-inter text-sm text-foreground-muted"
        >
          <p>{profile.education.degree} {profile.education.major}</p>
          <p>{profile.education.school}</p>
          <p className="pt-2">{profile.location}</p>
          <p>Open to relocation</p>
          <div className="pt-4 space-y-1">
            <p className="text-foreground font-medium">Focus Areas</p>
            <p>Full-Stack Development</p>
            <p>Systems Programming</p>
            <p>AI/ML Applications</p>
            <p>Open Source</p>
          </div>
        </motion.div>

        {/* Bio - Editorial style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* First paragraph with drop cap */}
          {profile.bio.length > 0 && (
            <p className="drop-cap lead text-foreground-muted font-serif text-lg leading-relaxed">
              {profile.bio[0]}
            </p>
          )}

          {/* Remaining paragraphs */}
          {profile.bio.slice(1).map((paragraph, index) => (
            <p
              key={index}
              className="text-foreground-muted font-serif text-lg leading-relaxed"
            >
              {paragraph}
            </p>
          ))}

          {/* Closing statement */}
          <p className="text-foreground-muted font-serif text-lg leading-relaxed pt-4">
            Focused on building products that solve real problems with clean, maintainable code.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
