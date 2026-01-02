"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project, ProjectCategory } from "@/lib/content";
import { ProjectVisual } from "@/components/ui/ProjectVisual";

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
    >
      {/* Card - clean Vercel style */}
      <div className="relative overflow-hidden rounded-xl bg-background-secondary border border-border hover:border-foreground-subtle transition-colors">
        {/* Visual */}
        <div className="relative h-48 overflow-hidden">
          <ProjectVisual projectId={project.id} category={project.category} />

          {/* Category badge - clean */}
          <div className="absolute top-3 left-3">
            <span
              className={cn(
                "px-2 py-1 text-xs font-medium rounded-md",
                "bg-background/80 backdrop-blur-sm border border-border text-foreground-muted"
              )}
            >
              {project.category === "systems" && "Systems"}
              {project.category === "ml" && "ML / Data"}
              {project.category === "web" && "Full-Stack"}
              {project.category === "tools" && "Tools"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary-500 transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-foreground-muted text-sm leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech stack - minimal */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-xs rounded bg-background-tertiary text-foreground-subtle"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="px-2 py-0.5 text-xs text-foreground-subtle">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          {/* Links - clean */}
          <div className="flex items-center gap-4 pt-3 border-t border-border">
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Code</span>
              </Link>
            )}
            {project.live && (
              <Link
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Demo</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function CategorySection({
  category,
  categoryId,
  categoryProjects,
}: {
  category: ProjectCategory;
  categoryId: string;
  categoryProjects: Project[];
}) {
  return (
    <div className="mb-16 last:mb-0">
      {/* Category Header - clean */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {category.title}
        </h3>
        <p className="text-foreground-muted">
          {category.description}
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categoryProjects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}

interface ProjectsSectionProps {
  projects: Project[];
  categories: Record<string, ProjectCategory>;
}

export function ProjectsSection({ projects, categories }: ProjectsSectionProps) {
  // Group projects by category
  const categoryOrder = ["systems", "ml", "web", "tools"];
  const categorizedProjects = categoryOrder
    .filter(catId => categories[catId])
    .map((catId) => ({
      id: catId,
      category: categories[catId],
      projects: projects.filter((p) => p.category === catId),
    }))
    .filter(({ projects }) => projects.length > 0);

  return (
    <section
      id="projects"
      data-section="projects"
      className="relative py-24 bg-transparent"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - clean Vercel style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Projects
          </h2>
          <p className="text-foreground-muted text-lg max-w-2xl">
            From low-level memory allocators to full-stack applications.
            Each project taught me something new.
          </p>
        </motion.div>

        {/* Projects by Category */}
        {categorizedProjects.map(({ id, category, projects: catProjects }) => (
          <CategorySection
            key={id}
            categoryId={id}
            category={category}
            categoryProjects={catProjects}
          />
        ))}
      </div>
    </section>
  );
}
