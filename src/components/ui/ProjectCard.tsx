"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, ArrowUpRight, Star } from "lucide-react";
import type { Project } from "@/types";
import { SkillBadge } from "./SkillBadge";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animations
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  // Spotlight effect position
  const spotlightX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const spotlightY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative overflow-hidden rounded-2xl bg-background-secondary border border-white/5 cursor-pointer"
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 opacity-0 blur-sm z-0"
        animate={{ opacity: isHovered ? 0.6 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Spotlight effect */}
      <motion.div
        className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${spotlightX}% ${spotlightY}%, rgba(99, 102, 241, 0.15), transparent 60%)`,
        }}
      />

      {/* Card content */}
      <div className="relative z-20 bg-background-secondary rounded-2xl overflow-hidden">
        {/* Image with parallax */}
        <div className="relative h-52 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(20px)",
            }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </motion.div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background-secondary via-background-secondary/60 to-transparent" />

          {/* Category badge with glow */}
          <motion.div
            className="absolute top-4 left-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <span className="relative px-3 py-1.5 text-xs font-medium rounded-full bg-background/90 backdrop-blur-md text-foreground-muted capitalize border border-white/10">
              <motion.span
                className="absolute inset-0 rounded-full bg-primary-500/20 blur-md -z-10"
                animate={{ opacity: isHovered ? 1 : 0 }}
              />
              {project.category}
            </span>
          </motion.div>

          {/* Featured badge */}
          {project.featured && (
            <motion.div
              className="absolute top-4 right-4"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.4, type: "spring" }}
            >
              <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-primary-500/20 to-purple-500/20 backdrop-blur-md text-primary-300 border border-primary-500/30">
                <Star className="w-3 h-3 fill-primary-400" />
                Featured
              </span>
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <motion.h3
            className="text-xl font-bold text-foreground mb-3 group-hover:text-primary-400 transition-colors flex items-center gap-2"
            style={{ transform: "translateZ(40px)" }}
          >
            {project.title}
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight className="w-5 h-5 text-primary-400" />
            </motion.span>
          </motion.h3>

          <p className="text-foreground-muted text-sm mb-5 line-clamp-2 leading-relaxed">
            {project.narrative || project.description}
          </p>

          {/* Tech stack with stagger animation */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.slice(0, 4).map((tech, techIndex) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + techIndex * 0.05 + 0.2 }}
              >
                <SkillBadge name={tech} size="sm" />
              </motion.div>
            ))}
            {project.tech.length > 4 && (
              <motion.span
                className="px-2 py-1 text-xs text-foreground-muted bg-background/50 rounded-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                +{project.tech.length - 4}
              </motion.span>
            )}
          </div>

          {/* Links with hover animations */}
          <div className="flex items-center gap-4 pt-4 border-t border-white/5">
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Github className="w-4 h-4" />
                </motion.div>
                <span className="group-hover/link:underline underline-offset-4">Source</span>
              </Link>
            )}
            {project.live && (
              <Link
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ExternalLink className="w-4 h-4" />
                </motion.div>
                <span className="group-hover/link:underline underline-offset-4">Live Demo</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Animated corner accents */}
      <motion.div
        className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-primary-500/0 group-hover:border-primary-500/50 rounded-tl-2xl transition-colors duration-500"
        style={{ transform: "translateZ(60px)" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-purple-500/0 group-hover:border-purple-500/50 rounded-br-2xl transition-colors duration-500"
        style={{ transform: "translateZ(60px)" }}
      />
    </motion.article>
  );
}
