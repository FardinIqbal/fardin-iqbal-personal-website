"use client";

import { motion } from "framer-motion";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import type { Experience } from "@/lib/content";

interface ExperienceSectionProps {
  experience: Experience[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-32 bg-background-secondary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-foreground mb-4 tracking-tight">
            Experience
          </h2>
          <p className="text-foreground-muted text-lg font-serif leading-relaxed">
            Click any role to see details
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {experience.map((exp, index) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
