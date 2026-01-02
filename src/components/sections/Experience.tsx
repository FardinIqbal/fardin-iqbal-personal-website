"use client";

import { motion } from "framer-motion";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import type { Experience } from "@/lib/content";

interface ExperienceSectionProps {
  experience: Experience[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-24 bg-background-secondary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Experience
          </h2>
          <p className="text-foreground-muted text-lg">
            Where I&apos;ve worked and what I&apos;ve built
          </p>
        </motion.div>

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
