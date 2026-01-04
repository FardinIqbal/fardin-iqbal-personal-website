"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Github, ExternalLink, ChevronDown } from "lucide-react";
import type { Project, ProjectCategory } from "@/lib/content";

// Featured project IDs (flagship work)
const FEATURED_IDS = ["prometheus", "versecraft", "dynamic-memory-allocator", "localelo"];

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
          <div className="relative p-5 sm:p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              {/* Left side - text content */}
              <div className="flex-1 min-w-0">
                {/* Category */}
                <span className="inline-block text-xs font-medium tracking-widest uppercase text-foreground-subtle mb-3 md:mb-4">
                  {project.category === "ai" && "AI Infrastructure"}
                  {project.category === "web" && "Full-Stack"}
                  {project.category === "systems" && "Systems"}
                  {project.category === "ml" && "Machine Learning"}
                  {project.category === "tools" && "Tools"}
                </span>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-foreground mb-3 md:mb-4 tracking-tight group-hover:text-foreground transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-foreground-muted text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6 max-w-2xl">
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

function ArchiveCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const categoryLabels: Record<string, string> = {
    ai: "AI",
    web: "Web",
    systems: "Systems",
    ml: "ML",
    tools: "Tools",
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="group"
    >
      <Link href={`/projects/${project.id}`} className="block">
        <div className="flex items-start gap-4 py-4 px-4 -mx-4 rounded-lg hover:bg-foreground/[0.02] transition-colors">
          {/* Year badge */}
          <span className="flex-shrink-0 text-xs font-mono text-foreground-subtle bg-background-tertiary/50 px-2 py-1 rounded">
            {project.year}
          </span>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-foreground font-medium truncate group-hover:text-foreground-muted transition-colors">
                {project.title}
              </h4>
              <ArrowUpRight className="w-3 h-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-foreground-subtle" />
            </div>

            {/* Tech stack - visible on all screens */}
            <p className="text-sm text-foreground-subtle truncate">
              {project.tech.slice(0, 3).join(" · ")}
            </p>
          </div>

          {/* Category + Links */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="hidden sm:inline text-xs text-foreground-subtle">
              {categoryLabels[project.category]}
            </span>

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
        </div>
      </Link>
    </motion.article>
  );
}

interface ProjectsSectionProps {
  projects: Project[];
  categories: Record<string, ProjectCategory>;
}

// Number of archive projects to show initially on mobile
const INITIAL_ARCHIVE_COUNT = 4;

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [showAllArchive, setShowAllArchive] = useState(false);

  // Split into featured and archive
  const featured = projects.filter((p) => FEATURED_IDS.includes(p.id));
  const archive = projects
    .filter((p) => !FEATURED_IDS.includes(p.id))
    .sort((a, b) => parseInt(b.year) - parseInt(a.year));

  const visibleArchive = showAllArchive ? archive : archive.slice(0, INITIAL_ARCHIVE_COUNT);
  const hiddenCount = archive.length - INITIAL_ARCHIVE_COUNT;

  return (
    <section id="projects" className="relative py-24 md:py-32 lg:py-40 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-foreground mb-4 md:mb-6 tracking-tight">
            Selected Work
          </h2>
          <p className="text-foreground-muted text-base md:text-lg max-w-xl leading-relaxed">
            A curated collection of projects spanning systems programming, AI infrastructure, and full-stack development.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-4 md:space-y-6 mb-20 md:mb-28">
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
          <h3 className="text-sm font-medium tracking-widest uppercase text-foreground-subtle mb-6">
            Archive
          </h3>

          <div className="divide-y divide-border/30">
            <AnimatePresence mode="popLayout">
              {visibleArchive.map((project, i) => (
                <ArchiveCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </div>

          {/* View More / View Less Button */}
          {hiddenCount > 0 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => setShowAllArchive(!showAllArchive)}
              className="mt-6 flex items-center gap-2 text-sm font-medium text-foreground-subtle hover:text-foreground transition-colors group"
            >
              <span>{showAllArchive ? "Show less" : `View ${hiddenCount} more projects`}</span>
              <motion.div
                animate={{ rotate: showAllArchive ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </motion.button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
