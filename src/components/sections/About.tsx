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
