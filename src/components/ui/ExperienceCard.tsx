"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Experience } from "@/lib/content";
import { Building2, MapPin, Calendar, ChevronRight } from "lucide-react";

interface ExperienceCardProps {
  experience: Experience;
  index?: number;
}

export function ExperienceCard({ experience, index = 0 }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => setIsExpanded(!isExpanded);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative pl-6 pb-6 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-2 bottom-0 w-px bg-border" />

      {/* Timeline dot */}
      <motion.div
        className="absolute left-0 top-2 -translate-x-1/2 w-2 h-2 rounded-full bg-foreground-subtle"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08 + 0.2, duration: 0.3, ease: "easeOut" }}
      />

      {/* Card */}
      <motion.div
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-controls={`experience-details-${experience.id}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className="cursor-pointer rounded-lg bg-background border border-border p-5 transition-all duration-300 hover:border-foreground/20 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
        layout
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Header - Always visible */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1.5">
              <h3 className="text-base font-display font-semibold text-foreground">
                {experience.role}
              </h3>
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-foreground-subtle"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.div>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-foreground-muted">
              <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{experience.company}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1 text-sm text-foreground-subtle flex-shrink-0">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{experience.period}</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full border border-border text-foreground-subtle capitalize">
              {experience.type}
            </span>
          </div>
        </div>

        {/* Expandable content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              id={`experience-details-${experience.id}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-border">
                {/* Location */}
                {experience.location && (
                  <div className="flex items-center gap-1.5 text-sm text-foreground-subtle mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{experience.location}</span>
                  </div>
                )}

                {/* Description */}
                {experience.description && (
                  <p className="text-foreground-muted font-serif text-sm mb-4 leading-relaxed">
                    {experience.description}
                  </p>
                )}

                {/* Highlights */}
                {experience.highlights && experience.highlights.length > 0 && (
                  <ul className="space-y-2 mb-4">
                    {experience.highlights.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03, duration: 0.3 }}
                        className="text-foreground-muted text-sm pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-foreground-subtle before:font-bold font-serif leading-relaxed"
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                )}

                {/* Tech stack */}
                {experience.tech && experience.tech.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border">
                    {experience.tech.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: techIndex * 0.02, duration: 0.2 }}
                        className="px-2 py-0.5 text-xs rounded bg-background-tertiary text-foreground-subtle"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
