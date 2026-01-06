"use client";

import { motion } from "framer-motion";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import type { Experience } from "@/lib/content";

interface ExperienceSectionProps {
  experience: Experience[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section id="experience" className="editorial-section bg-background">
      <div className="editorial-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="mb-16"
        >
          <div className="chapter-marker mb-6">Experience</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-6 tracking-tight leading-[1.15]">
            Experience
          </h2>
          <p className="text-foreground-muted text-lg md:text-xl font-serif leading-[1.75]">
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
