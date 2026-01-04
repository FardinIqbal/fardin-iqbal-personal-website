"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { formatDate } from "@/lib/utils";
import { ReadingControls } from "./ReadingControls";
import { MusicPlayer } from "./MusicPlayer";

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
    <div className="essay-wrapper min-h-screen bg-background transition-colors duration-300">
      {/* Reading progress bar */}
      <ReadingProgress />

      {/* Header */}
      <header className="pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto" style={{ maxWidth: "var(--essay-content-width, 680px)" }}>
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
      <div className="px-4 sm:px-6" style={{ maxWidth: "var(--essay-content-width, 680px)", margin: "0 auto" }}>
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
          className="essay-content prose-article"
          dangerouslySetInnerHTML={{ __html: compiledContent }}
        />
      </motion.article>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 border-t border-border">
        <div className="max-w-2xl mx-auto" style={{ maxWidth: "var(--essay-content-width, 680px)" }}>
          <Link
            href="/essays"
            className="inline-flex items-center gap-2 text-sm text-foreground-subtle hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to all essays
          </Link>
        </div>
      </footer>

      {/* Reading Controls & Music Player */}
      <ReadingControls />
      <MusicPlayer />
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
      className="fixed top-0 left-0 right-0 h-0.5 bg-foreground/10 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        className="h-full bg-foreground origin-left"
        style={{ scaleX }}
      />
    </motion.div>
  );
}
