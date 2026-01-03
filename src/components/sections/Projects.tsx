"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import type { Project, ProjectCategory } from "@/lib/content";

// Featured project IDs (flagship work)
const FEATURED_IDS = ["prometheus", "neo-provider", "dynamic-memory-allocator", "localelo"];

function FeaturedCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const gradients: Record<string, string> = {
    ai: "from-violet-500/10 to-indigo-500/5",
    web: "from-blue-500/10 to-cyan-500/5",
    systems: "from-orange-500/10 to-red-500/5",
    ml: "from-pink-500/10 to-purple-500/5",
    tools: "from-emerald-500/10 to-green-500/5",
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      className="group"
    >
      <Link href={`/projects/${project.id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl border border-border/50 hover:border-border transition-all duration-500">
          {/* Gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradients[project.category]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

          {/* Content */}
          <div className="relative p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              {/* Left side - text content */}
              <div className="flex-1 min-w-0">
                {/* Category */}
                <span className="inline-block text-xs font-medium tracking-widest uppercase text-foreground-subtle mb-4">
                  {project.category === "ai" && "AI Infrastructure"}
                  {project.category === "web" && "Full-Stack"}
                  {project.category === "systems" && "Systems"}
                  {project.category === "ml" && "Machine Learning"}
                  {project.category === "tools" && "Tools"}
                </span>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-display font-medium text-foreground mb-4 tracking-tight group-hover:text-foreground transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-foreground-muted text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
                  {project.narrative || project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm rounded-full bg-background-tertiary/50 text-foreground-subtle border border-border/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right side - arrow indicator */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center group-hover:border-foreground/20 group-hover:bg-foreground/5 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 text-foreground-subtle group-hover:text-foreground transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function ArchiveRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="group border-b border-border/30 last:border-0 hover:bg-foreground/[0.02] transition-colors"
    >
      {/* Year */}
      <td className="py-4 pr-4 text-sm text-foreground-subtle font-mono whitespace-nowrap hidden md:table-cell">
        2024
      </td>

      {/* Project Name */}
      <td className="py-4 pr-4">
        <Link
          href={`/projects/${project.id}`}
          className="text-foreground font-medium hover:text-foreground-muted transition-colors inline-flex items-center gap-2"
        >
          {project.title}
          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </td>

      {/* Category */}
      <td className="py-4 pr-4 text-sm text-foreground-subtle hidden lg:table-cell">
        {project.category === "ai" && "AI"}
        {project.category === "web" && "Web"}
        {project.category === "systems" && "Systems"}
        {project.category === "ml" && "ML"}
        {project.category === "tools" && "Tools"}
      </td>

      {/* Tech */}
      <td className="py-4 pr-4 hidden sm:table-cell">
        <span className="text-sm text-foreground-subtle">
          {project.tech.slice(0, 3).join(" · ")}
        </span>
      </td>

      {/* Links */}
      <td className="py-4 text-right">
        <div className="flex items-center justify-end gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-foreground-subtle hover:text-foreground transition-colors"
              aria-label="View source code"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-foreground-subtle hover:text-foreground transition-colors"
              aria-label="View live demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </td>
    </motion.tr>
  );
}

interface ProjectsSectionProps {
  projects: Project[];
  categories: Record<string, ProjectCategory>;
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  // Split into featured and archive
  const featured = projects.filter((p) => FEATURED_IDS.includes(p.id));
  const archive = projects.filter((p) => !FEATURED_IDS.includes(p.id));

  return (
    <section id="projects" className="relative py-32 md:py-40 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-20 md:mb-28"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-foreground mb-6 tracking-tight">
            Selected Work
          </h2>
          <p className="text-foreground-muted text-lg md:text-xl max-w-xl leading-relaxed">
            A curated collection of projects spanning systems programming, AI infrastructure, and full-stack development.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-6 mb-32">
          {featured.map((project, i) => (
            <FeaturedCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Archive Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-sm font-medium tracking-widest uppercase text-foreground-subtle mb-8">
            Archive
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="pb-3 pr-4 text-left text-xs font-medium tracking-widest uppercase text-foreground-subtle hidden md:table-cell">
                    Year
                  </th>
                  <th className="pb-3 pr-4 text-left text-xs font-medium tracking-widest uppercase text-foreground-subtle">
                    Project
                  </th>
                  <th className="pb-3 pr-4 text-left text-xs font-medium tracking-widest uppercase text-foreground-subtle hidden lg:table-cell">
                    Type
                  </th>
                  <th className="pb-3 pr-4 text-left text-xs font-medium tracking-widest uppercase text-foreground-subtle hidden sm:table-cell">
                    Built with
                  </th>
                  <th className="pb-3 text-right text-xs font-medium tracking-widest uppercase text-foreground-subtle">
                    Links
                  </th>
                </tr>
              </thead>
              <tbody>
                {archive.map((project, i) => (
                  <ArchiveRow key={project.id} project={project} index={i} />
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
