"use client";

import { motion } from "framer-motion";
import type { SkillCategory } from "@/lib/content";
import { Code2, Database, Wrench, Cloud } from "lucide-react";

interface SkillsSectionProps {
  skills: SkillCategory[];
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Languages": Code2,
  "Frameworks & Libraries": Cloud,
  "Databases": Database,
  "Tools & Platforms": Wrench,
};

// Number of skills to show on mobile before "+N more"
const MOBILE_SKILL_LIMIT = 5;

function SkillCard({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  const Icon = categoryIcons[category.title] || Code2;
  const remainingCount = Math.max(0, category.skills.length - MOBILE_SKILL_LIMIT);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -2 }}
      className="p-6 sm:p-7 rounded-lg bg-background-secondary border border-border/50 hover:border-accent/40 transition-all duration-500 hover-lift group"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 sm:mb-5">
        <motion.div
          className="p-2 sm:p-2.5 rounded-lg bg-background-tertiary"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-foreground-muted group-hover:text-accent transition-colors" />
        </motion.div>
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-foreground">
            {category.title}
          </h3>
          <p className="text-xs sm:text-sm text-foreground-subtle">
            {category.skills.length} technologies
          </p>
        </div>
      </div>

      {/* Skills - show all on desktop, limited on mobile */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {/* Mobile: limited skills */}
        {category.skills.slice(0, MOBILE_SKILL_LIMIT).map((skill, skillIndex) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.3,
              delay: index * 0.1 + skillIndex * 0.03
            }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(var(--color-foreground-subtle), 0.2)"
            }}
            className="px-3 py-1.5 text-xs rounded-full bg-background-tertiary/60 text-foreground-subtle border border-border/40 cursor-default sm:inline font-inter"
          >
            {skill}
          </motion.span>
        ))}

        {/* Desktop: remaining skills */}
        {category.skills.slice(MOBILE_SKILL_LIMIT).map((skill, skillIndex) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.3,
              delay: index * 0.1 + (MOBILE_SKILL_LIMIT + skillIndex) * 0.03
            }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(var(--color-foreground-subtle), 0.2)"
            }}
            className="hidden sm:inline px-3 py-1.5 text-xs rounded-full bg-background-tertiary/60 text-foreground-subtle border border-border/40 cursor-default font-inter"
          >
            {skill}
          </motion.span>
        ))}

        {/* Mobile: "+N more" indicator */}
        {remainingCount > 0 && (
          <span className="sm:hidden px-2 py-0.5 text-xs rounded-md bg-background-tertiary/50 text-foreground-subtle">
            +{remainingCount} more
          </span>
        )}
      </div>
    </motion.div>
  );
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="editorial-section bg-background">
      <div className="editorial-container">
        {/* Section header - editorial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="mb-16"
        >
          <div className="chapter-marker mb-6">Skills</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-6 tracking-tight leading-[1.15]">
            Skills
          </h2>
          <p className="text-foreground-muted text-lg md:text-xl max-w-2xl leading-[1.75] font-serif">
            The tools and technologies I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {skills.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
