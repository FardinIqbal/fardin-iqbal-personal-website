"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/content";

const FEATURED_IDS = ["prometheus", "versecraft", "dynamic-memory-allocator", "localelo"];

interface WorkSectionProps {
  projects: Project[];
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group cursor-pointer premium-card"
      onClick={handleCardClick}
    >
      <div className="py-8 border-b border-border hover:border-border-hover transition-colors duration-200">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          {/* Left: Content */}
          <div className="flex-1 min-w-0">
            {/* Category label */}
            <span className="inline-block font-sans text-xs font-medium tracking-wider uppercase text-foreground-muted mb-3">
              {project.category === "ai" && "AI Infrastructure"}
              {project.category === "web" && "Full-Stack"}
              {project.category === "systems" && "Systems"}
              {project.category === "ml" && "Machine Learning"}
              {project.category === "tools" && "Developer Tools"}
            </span>

            {/* Title */}
            <h3 className="font-display text-2xl md:text-3xl font-medium text-foreground mb-3 tracking-tight group-hover:text-accent transition-colors duration-200">
              {project.title}
            </h3>

            {/* Description */}
            <p className="font-body text-foreground-secondary text-lg leading-relaxed mb-4 max-w-2xl">
              {project.narrative || project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 font-sans text-xs font-medium text-foreground-muted bg-background-secondary border border-border rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Arrow */}
          <div className="flex-shrink-0 hidden md:flex items-center gap-3">
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
            <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all duration-200">
              <ArrowUpRight className="w-4 h-4 text-foreground-muted group-hover:text-accent transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function WorkSection({ projects }: WorkSectionProps) {
  const featured = projects.filter((p) => FEATURED_IDS.includes(p.id));

  return (
    <section id="work" className="py-24 md:py-32 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-4">
            Selected Work
          </h2>
          <p className="font-body text-lg text-foreground-secondary max-w-2xl">
            Projects spanning systems programming, AI infrastructure, and full-stack development.
          </p>
        </motion.div>

        {/* Project List */}
        <div>
          {featured.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-12"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-sans text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors group"
          >
            View all projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
