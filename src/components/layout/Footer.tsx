"use client";

import Link from "next/link";
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
    <footer className="border-t border-border/50 bg-background">
      <div className="editorial-container">
        <div className="flex flex-col items-center justify-center gap-10 text-center py-20">
          {/* Logo & Copyright - Refined editorial style */}
          <div>
            <Link
              href="/"
              className="text-lg font-serif font-normal text-foreground hover:opacity-70 transition-opacity duration-300 tracking-tight"
            >
              Fardin Iqbal
            </Link>
            <p className="text-xs font-inter text-foreground-subtle mt-4 uppercase tracking-[0.1em]">
              &copy; {currentYear} Fardin Iqbal
            </p>
          </div>

          {/* Social Links - Refined minimal */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <Link
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground-muted hover:text-foreground transition-colors duration-300"
                  aria-label={link.name}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                </Link>
              );
            })}
          </div>

          {/* Built with - Refined editorial style */}
          <div className="pt-8 border-t border-border/30">
            <p className="text-xs font-inter text-foreground-subtle uppercase tracking-[0.1em]">
              Built with Next.js & Tailwind
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
