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
    <section id="about" className="py-24 bg-background-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            About Me
          </h2>
          <p className="text-foreground-muted text-lg">
            Get to know me a little better
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Animated Profile Visual - Neural Network Style */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center lg:justify-start"
          >
            <AnimatedProfilePicture size={350} />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="space-y-5">
              {profile.bio.map((paragraph, index) => (
                <p key={index} className="text-foreground-muted leading-relaxed">
                  {paragraph}
                </p>
              ))}

              {/* Info cards - staggered animation */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
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
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    className="flex items-start gap-3 p-4 rounded-lg bg-background border border-border hover:border-foreground-subtle group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <card.Icon className="w-5 h-5 text-foreground-muted mt-0.5 group-hover:text-foreground transition-colors" />
                    </motion.div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{card.title}</p>
                      <p className="text-sm text-foreground-muted">{card.line1}</p>
                      <p className="text-sm text-foreground-subtle">{card.line2}</p>
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
