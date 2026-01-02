"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Experience } from "@/lib/content";
import { Building2, MapPin, Calendar, Briefcase, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExperienceCardProps {
  experience: Experience;
  index?: number;
}

export function ExperienceCard({ experience, index = 0 }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative pl-6 pb-8 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-2 bottom-0 w-px bg-border" />

      {/* Timeline dot - animated */}
      <motion.div
        className="absolute left-0 top-2 -translate-x-1/2 w-2 h-2 rounded-full bg-foreground-muted"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 300 }}
      />

      {/* Card */}
      <motion.div
        className="rounded-lg bg-background border border-border p-5 hover:border-foreground-subtle transition-colors"
        whileHover={{ x: 4, transition: { duration: 0.2 } }}
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="text-base font-semibold text-foreground mb-1">
              {experience.role}
            </h3>
            <div className="flex items-center gap-1.5 text-sm text-foreground-muted">
              <Building2 className="w-4 h-4" />
              <span>{experience.company}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5 text-sm text-foreground-subtle">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{experience.period}</span>
            </div>
            {experience.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{experience.location}</span>
              </div>
            )}
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded-md font-medium",
                experience.type === "full-time" && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                experience.type === "part-time" && "bg-blue-500/10 text-blue-600 dark:text-blue-400",
                experience.type === "internship" && "bg-purple-500/10 text-purple-600 dark:text-purple-400",
                experience.type === "contract" && "bg-orange-500/10 text-orange-600 dark:text-orange-400"
              )}
            >
              {experience.type}
            </span>
          </div>
        </div>

        {/* Description */}
        {experience.description && (
          <p className="text-foreground-muted text-sm mb-4 leading-relaxed">
            {experience.description}
          </p>
        )}

        {/* Highlights */}
        {experience.highlights && experience.highlights.length > 0 && (
          <div className="mb-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors mb-2"
            >
              <span>Key Achievements</span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1.5 overflow-hidden"
                >
                  {experience.highlights.map((item, i) => (
                    <li
                      key={i}
                      className="text-foreground-muted text-sm pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-foreground-subtle"
                    >
                      {item}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Tech stack - staggered animation */}
        {experience.tech && experience.tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {experience.tech.map((tech, techIndex) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.1 + techIndex * 0.03
                }}
                whileHover={{ scale: 1.05 }}
                className="px-2 py-0.5 text-xs rounded bg-background-tertiary text-foreground-subtle"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
