"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";

interface EssayPageProps {
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  compiledContent: string;
}

export function EssayPage({
  title,
  description,
  date,
  readingTime,
  tags,
  compiledContent,
}: EssayPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Reading progress bar */}
      <ReadingProgress />

      {/* Header */}
      <header className="pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/essays"
              className="inline-flex items-center gap-2 text-sm text-foreground-subtle hover:text-foreground transition-colors group mb-8"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Essays
            </Link>
          </motion.div>

          {/* Meta - date and reading time */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="flex items-center gap-4 text-sm text-foreground-subtle mb-6"
          >
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(date)}
            </span>
            <span className="text-foreground-subtle/30">|</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {readingTime}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-foreground tracking-tight leading-[1.15] mb-6"
          >
            {title}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-lg sm:text-xl text-foreground-muted leading-relaxed font-serif"
            >
              {description}
            </motion.p>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-wrap gap-2 mt-8"
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-background-tertiary text-foreground-subtle"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </header>

      {/* Divider */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="h-px bg-border origin-left"
        />
      </div>

      {/* Article Content */}
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="py-12 sm:py-16 px-4 sm:px-6"
      >
        <div
          className="prose-article"
          dangerouslySetInnerHTML={{ __html: compiledContent }}
        />
      </motion.article>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 border-t border-border">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/essays"
            className="inline-flex items-center gap-2 text-sm text-foreground-subtle hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to all essays
          </Link>
        </div>
      </footer>
    </div>
  );
}

function ReadingProgress() {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-foreground/10 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        className="h-full bg-foreground origin-left"
        style={{
          scaleX: 0,
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false }}
      />
    </motion.div>
  );
}
