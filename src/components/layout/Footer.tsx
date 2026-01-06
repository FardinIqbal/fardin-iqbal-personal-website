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
    <footer className="border-t border-border bg-background">
      <div className="max-w-content mx-auto px-8 py-16">
        <div className="flex flex-col items-center justify-center gap-8 text-center">
          {/* Logo & Copyright - Editorial style */}
          <div>
            <Link
              href="/"
              className="text-base font-serif font-normal text-foreground hover:opacity-80 transition-opacity tracking-tight"
            >
              Fardin Iqbal
            </Link>
            <p className="text-xs font-inter text-foreground-subtle mt-3 uppercase tracking-wider">
              &copy; {currentYear} Fardin Iqbal
            </p>
          </div>

          {/* Social Links - Minimal */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <Link
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground-muted hover:text-foreground transition-colors"
                  aria-label={link.name}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                </Link>
              );
            })}
          </div>

          {/* Built with - Editorial style */}
          <div className="pt-8 border-t border-border">
            <p className="text-xs font-inter text-foreground-subtle uppercase tracking-wider">
              Built with Next.js & Tailwind
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
