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

function SkillCard({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  const Icon = categoryIcons[category.title] || Code2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="p-6 rounded-xl bg-background-secondary border border-border hover:border-foreground-subtle transition-colors"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-lg bg-background-tertiary">
          <Icon className="w-5 h-5 text-foreground-muted" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">
            {category.title}
          </h3>
          <p className="text-sm text-foreground-subtle">
            {category.skills.length} technologies
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-1 text-sm rounded-md bg-background-tertiary text-foreground-muted"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header - clean */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Skills
          </h2>
          <p className="text-foreground-muted text-lg max-w-2xl">
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
