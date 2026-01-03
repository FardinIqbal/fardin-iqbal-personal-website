"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Code2, Lightbulb } from "lucide-react";
import type { Profile } from "@/lib/content";
import { AnimatedProfilePicture } from "@/components/ui/AnimatedProfilePicture";

interface AboutProps {
  profile: Profile;
}

export function About({ profile }: AboutProps) {
  return (
    <section id="about" className="py-32 bg-background-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-foreground mb-6 tracking-tight">
            About Me
          </h2>
          <p className="text-foreground-muted text-lg md:text-xl font-serif leading-relaxed max-w-2xl">
            Get to know me a little better
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Animated Profile Visual - Neural Network Style */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-start"
          >
            <AnimatedProfilePicture size={350} />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="space-y-6">
              {profile.bio.map((paragraph, index) => (
                <p key={index} className="text-foreground-muted font-serif text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}

              {/* Info cards - staggered animation */}
              <div className="grid sm:grid-cols-2 gap-4 pt-6">
                {[
                  { Icon: GraduationCap, title: "Education", line1: `${profile.education.degree} ${profile.education.major}`, line2: profile.education.school },
                  { Icon: MapPin, title: "Location", line1: profile.location, line2: "Open to relocation" },
                  { Icon: Code2, title: "Focus Areas", line1: "Full-Stack Development", line2: "Systems Programming" },
                  { Icon: Lightbulb, title: "Interests", line1: "AI/ML Applications", line2: "Open Source" },
                ].map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                    whileHover={{ y: -2 }}
                    className="flex items-start gap-3 p-5 rounded-lg bg-background border border-border hover:border-foreground/10 hover:shadow-lg hover:shadow-foreground/5 transition-all duration-300 group"
                  >
                    <card.Icon className="w-5 h-5 text-foreground-subtle mt-0.5 group-hover:text-foreground transition-colors duration-300" />
                    <div>
                      <p className="font-sans font-medium text-foreground text-sm">{card.title}</p>
                      <p className="text-sm text-foreground-muted font-serif">{card.line1}</p>
                      <p className="text-sm text-foreground-subtle font-serif">{card.line2}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
