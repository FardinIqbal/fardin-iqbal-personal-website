"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { socialLinks } from "@/data/social";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <Link
              href="/"
              className="text-lg font-bold gradient-text hover:opacity-80 transition-opacity"
            >
              Fardin Iqbal
            </Link>
            <p className="text-sm text-foreground-muted mt-2">
              &copy; {currentYear} Fardin Iqbal. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <Link
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-white/5 transition-colors"
                  aria-label={link.name}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Built with */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-foreground-muted flex items-center justify-center gap-1">
            Built with <Heart className="w-4 h-4 text-primary-500" /> using Next.js & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
