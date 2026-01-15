"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { socialLinks } from "@/data/social";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-full mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Name and tagline */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <Link
              href="/"
              className="font-display text-lg font-medium tracking-tight text-foreground hover:text-accent transition-colors duration-200"
            >
              Fardin Iqbal
            </Link>
            <p className="font-sans text-sm text-foreground-secondary">
              Building things that matter
            </p>
          </div>

          {/* Center: Social links */}
          <div className="flex items-center gap-5">
            {socialLinks.map((link, index) => {
              const Icon = iconMap[link.icon];
              return (
                <motion.div
                  key={link.name}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.15 }}
                >
                  <Link
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground-secondary hover:text-foreground transition-colors duration-200"
                    aria-label={link.name}
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Copyright */}
          <p className="font-sans text-sm text-foreground-muted">
            &copy; {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
}
