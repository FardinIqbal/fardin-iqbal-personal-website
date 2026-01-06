"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Code2, Lightbulb, ArrowUpRight } from "lucide-react";
import type { Profile } from "@/lib/content";

interface AboutProps {
  profile: Profile;
}

export function About({ profile }: AboutProps) {
  const cards = [
    {
      Icon: GraduationCap,
      title: "Education",
      line1: `${profile.education.degree} ${profile.education.major}`,
      line2: profile.education.school
    },
    {
      Icon: MapPin,
      title: "Location",
      line1: profile.location,
      line2: "Open to relocation"
    },
    {
      Icon: Code2,
      title: "Focus Areas",
      line1: "Full-Stack Development",
      line2: "Systems Programming"
    },
    {
      Icon: Lightbulb,
      title: "Interests",
      line1: "AI/ML Applications",
      line2: "Open Source"
    },
  ];

  return (
    <section id="about" className="editorial-section bg-background relative overflow-hidden">
      {/* Subtle background accent - hidden on mobile */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.02] pointer-events-none hidden md:block">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <pattern id="aboutGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#aboutGrid)" />
        </svg>
      </div>

      <div className="editorial-container relative">
        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="chapter-marker">About</div>
            <h2 className="text-3xl font-display font-semibold text-foreground tracking-tight leading-tight">
              Building software that matters
            </h2>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5 mb-10"
          >
            {profile.bio.map((paragraph, index) => (
              <p
                key={index}
                className="text-foreground-muted font-serif text-base leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Info cards - 2x2 grid on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 gap-3 mb-8"
          >
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.25 + i * 0.05 }}
                className="p-4 rounded-xl bg-background/50 border border-border"
              >
                <card.Icon className="w-5 h-5 text-foreground-subtle mb-2" />
                <p className="text-sm text-foreground font-medium leading-tight">{card.line1}</p>
                <p className="text-xs text-foreground-subtle mt-1">{card.line2}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.a
            href="#contact"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground"
          >
            Get in touch
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </div>

        {/* Desktop Layout - Two columns */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-16">
          {/* Left column - Header + Cards */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="sticky top-32"
            >
              <div className="chapter-marker">About</div>

              <h2 className="text-5xl font-display font-semibold text-foreground mb-8 tracking-tight leading-tight">
                Building software that matters
              </h2>

              {/* Quick stats */}
              <div className="space-y-4 mb-8">
                {cards.map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center group-hover:bg-foreground/10 transition-colors">
                      <card.Icon className="w-4 h-4 text-foreground-subtle group-hover:text-foreground transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground font-medium">{card.line1}</p>
                      <p className="text-xs text-foreground-subtle">{card.line2}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href="#contact"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-foreground-muted transition-colors group"
              >
                Get in touch
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
            </motion.div>
          </div>

          {/* Right column - Bio */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-8"
            >
              {/* First paragraph with drop cap */}
              {profile.bio.length > 0 && (
                <p className="drop-cap lead text-foreground-muted font-serif">
                  {profile.bio[0]}
                </p>
              )}

              {/* Remaining paragraphs */}
              {profile.bio.slice(1).map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="text-foreground-muted font-serif text-lg leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}

              {/* Decorative divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-16 h-px bg-border origin-left"
              />

              {/* Quote */}
              <motion.blockquote
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-foreground-subtle font-serif italic text-base border-l-2 border-foreground/10 pl-4"
              >
                Focused on building products that solve real problems with clean, maintainable code.
              </motion.blockquote>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
