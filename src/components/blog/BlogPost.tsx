"use client";

import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface BlogPostProps {
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  compiledContent: string;
}

export function BlogPost({
  title,
  description,
  date,
  readingTime,
  tags,
  compiledContent,
}: BlogPostProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Reading progress bar */}
      <ReadingProgress />

      {/* Article */}
      <article className="pt-24 pb-20 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-sans text-sm text-foreground-muted hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-12">
            {/* Meta */}
            <div className="flex items-center gap-3 mb-6">
              <time className="font-sans text-sm text-foreground-muted">
                {formatDate(date)}
              </time>
              <span className="text-foreground-muted">·</span>
              <span className="flex items-center gap-1.5 font-sans text-sm text-foreground-muted">
                <Clock className="w-3.5 h-3.5" />
                {readingTime}
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-display text-4xl md:text-5xl font-medium text-foreground tracking-tight leading-tight mb-6"
              dangerouslySetInnerHTML={{ __html: title }}
            />

            {/* Description */}
            {description && (
              <p className="font-body text-xl text-foreground-secondary leading-relaxed mb-6">
                {description}
              </p>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 font-sans text-xs text-foreground-muted bg-background-secondary border border-border rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Content */}
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: compiledContent }}
          />

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-border">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-sans text-sm text-foreground-muted hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </footer>
        </div>
      </article>
    </div>
  );
}

function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[100] bg-accent"
      style={{ scaleX }}
    />
  );
}
