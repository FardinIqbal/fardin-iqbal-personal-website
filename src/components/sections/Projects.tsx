"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project, ProjectCategory } from "@/lib/content";
import { AnimatedProjectVisual } from "@/components/ui/AnimatedProjectVisual";

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
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -2 }}
      className="group"
    >
      {/* Card - elegant with subtle hover */}
      <div className="relative overflow-hidden rounded-lg bg-surface border border-border hover:border-foreground/10 hover:shadow-lg hover:shadow-foreground/5 transition-all duration-300">
        {/* Visual */}
        <div className="relative h-48 overflow-hidden">
          <AnimatedProjectVisual projectId={project.id} category={project.category} />

          {/* Category badge - animated */}
          <motion.div
            className="absolute top-3 left-3"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
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
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-lg font-display font-semibold text-foreground mb-3 group-hover:text-primary-500 transition-colors duration-300">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-foreground-muted font-serif text-sm leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech stack - staggered animation */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 4).map((tech, techIndex) => (
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
            {project.tech.length > 4 && (
              <span className="px-2 py-0.5 text-xs text-foreground-subtle">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          {/* Links - with hover animation */}
          <div className="flex items-center gap-4 pt-3 border-t border-border">
            {project.github && (
              <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>Code</span>
                </Link>
              </motion.div>
            )}
            {project.live && (
              <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Demo</span>
                </Link>
              </motion.div>
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
    <div className="mb-20 last:mb-0">
      {/* Category Header - elegant */}
      <div className="mb-10">
        <h3 className="text-2xl font-display font-semibold text-foreground mb-3 tracking-tight">
          {category.title}
        </h3>
        <p className="text-foreground-muted font-serif text-lg leading-relaxed">
          {category.description}
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      className="relative py-32 bg-background"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - elegant editorial style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-foreground mb-6 tracking-tight">
            Projects
          </h2>
          <p className="text-foreground-muted font-serif text-lg md:text-xl max-w-2xl leading-relaxed">
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
