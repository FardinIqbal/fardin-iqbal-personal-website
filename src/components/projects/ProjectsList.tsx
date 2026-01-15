"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project, ProjectCategory } from "@/lib/content";

interface ProjectsListProps {
  projects: Project[];
  categories: Record<string, ProjectCategory>;
}

const categoryLabels: Record<string, string> = {
  all: "All",
  ai: "AI",
  web: "Full-Stack",
  systems: "Systems",
  ml: "Machine Learning",
  tools: "Tools",
};

export function ProjectsList({ projects, categories }: ProjectsListProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredProjects = activeCategory
    ? projects.filter((p) => p.category === activeCategory)
    : projects;

  const categoryKeys = Object.keys(categories);

  return (
    <div>
      {/* Category Filter */}
      <div className="mb-12 pb-8 border-b border-border">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "px-3 py-1.5 font-sans text-xs font-medium transition-colors border rounded-full",
              !activeCategory
                ? "bg-accent text-white border-accent"
                : "bg-transparent text-foreground-secondary hover:text-foreground border-border hover:border-border-hover"
            )}
          >
            All
          </button>
          {categoryKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(activeCategory === key ? null : key)}
              className={cn(
                "px-3 py-1.5 font-sans text-xs font-medium transition-colors border rounded-full",
                activeCategory === key
                  ? "bg-accent text-white border-accent"
                  : "bg-transparent text-foreground-secondary hover:text-foreground border-border hover:border-border-hover"
              )}
            >
              {categoryLabels[key] || key}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <div>
        {filteredProjects.map((project, index) => (
          <ProjectItem key={project.id} project={project} index={index} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <p className="font-body text-foreground-secondary mb-4">No projects found.</p>
          <button
            onClick={() => setActiveCategory(null)}
            className="font-sans text-sm text-accent hover:underline"
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
}

function ProjectItem({ project, index }: { project: Project; index: number }) {
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on a link
    if ((e.target as HTMLElement).closest('a')) {
      return;
    }
    router.push(`/projects/${project.id}`);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className="group cursor-pointer premium-card"
      onClick={handleCardClick}
    >
      <div className="py-8 border-b border-border hover:border-border-hover transition-colors">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          {/* Left: Content */}
          <div className="flex-1 min-w-0">
            {/* Category and year */}
            <div className="flex items-center gap-3 mb-3">
              <span className="font-sans text-xs font-medium tracking-wider uppercase text-foreground-muted">
                {categoryLabels[project.category] || project.category}
              </span>
              <span className="text-foreground-muted">·</span>
              <span className="font-sans text-xs text-foreground-muted">
                {project.year}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-display text-2xl font-medium text-foreground mb-3 tracking-tight group-hover:text-accent transition-colors">
              {project.title}
            </h2>

            {/* Description */}
            <p className="font-body text-foreground-secondary text-base leading-relaxed mb-4 max-w-2xl">
              {project.narrative || project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 font-sans text-xs text-foreground-muted bg-background-secondary border border-border rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Links */}
          <div className="flex-shrink-0 flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-foreground-muted hover:text-foreground transition-colors"
                aria-label="View source code"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-foreground-muted hover:text-foreground transition-colors"
                aria-label="View live site"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
            <div className="hidden md:flex w-10 h-10 rounded-full border border-border items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all">
              <ArrowUpRight className="w-4 h-4 text-foreground-muted group-hover:text-accent transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
