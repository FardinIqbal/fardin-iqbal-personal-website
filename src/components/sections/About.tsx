"use client";

import { motion } from "framer-motion";
import type { Profile } from "@/lib/content";

interface AboutProps {
  profile: Profile;
}

export function About({ profile }: AboutProps) {
  return (
    <section id="about" className="editorial-section bg-background relative">
      {/* Subtle accent red background gradient - like essay hero */}
      <div 
        className="absolute top-0 right-0 w-2/5 h-full pointer-events-none opacity-30"
        style={{
          background: "radial-gradient(ellipse at center, rgb(var(--accent-red)/0.03) 0%, transparent 70%)"
        }}
      />

      <div className="editorial-container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="chapter-marker mb-6">About</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-8 tracking-tight leading-[1.15] relative">
            Building software that matters
            {/* Accent red line above title - matching navbar style */}
            <span 
              className="absolute -top-4 left-0 w-16 h-px block bg-[rgb(var(--accent-red))]"
            />
          </h2>
        </motion.div>

        {/* Bio - Clean editorial style */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
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

          {/* Closing statement with accent red border - like essay subtitle */}
          <p 
            className="text-foreground-muted font-serif text-lg md:text-xl leading-[1.85] pt-2 pl-6 ml-2 relative"
            style={{ 
              borderLeft: "2px solid rgb(var(--accent-red)/0.3)",
              paddingLeft: "1.5rem",
              marginLeft: "0.5rem"
            }}
          >
            {/* Accent red quote mark */}
            <span 
              className="absolute -left-4 top-0 text-4xl font-serif"
              style={{ color: "rgb(var(--accent-red)/0.2)" }}
            >
              "
            </span>
            Focused on building products that solve real problems with clean, maintainable code.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
