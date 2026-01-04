"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ImmersiveBlogWrapper } from "./ImmersiveBlogWrapper";
import { formatDate } from "@/lib/utils";
import { Mood } from "./MoodSystem";
import { CodeCopyButton } from "@/components/ui/CodeCopyButton";
import { BlogScrollProgress } from "@/components/ui/ScrollProgress";

interface ImmersiveBlogClientProps {
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  compiledContent: string;
  rawContent: string;
}

export function ImmersiveBlogClient({
  title,
  description,
  date,
  readingTime,
  tags,
  compiledContent,
  rawContent,
}: ImmersiveBlogClientProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const moodTag = tags.find((tag): tag is Mood =>
    ["philosophical", "technical", "intense", "calm", "nostalgic", "hopeful", "mysterious"].includes(
      tag.toLowerCase()
    )
  );

  return (
    <ImmersiveBlogWrapper
      content={rawContent}
      tags={tags}
      title={title}
      description={description}
      overrideMood={moodTag?.toLowerCase() as Mood | undefined}
    >
      {/* Ultra-minimal reading progress */}
      <BlogScrollProgress />

      {/* Hero Section */}
      <header className="pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-foreground-subtle hover:text-foreground transition-colors group mb-8"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              All posts
            </Link>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium rounded-full bg-background-tertiary text-foreground-muted border border-border"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.1] mb-6"
          >
            {title}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-foreground-muted leading-relaxed mb-8"
            >
              {description}
            </motion.p>
          )}

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex items-center gap-6 text-sm text-foreground-subtle"
          >
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(date)}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {readingTime}
            </span>
          </motion.div>
        </div>
      </header>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="h-px bg-border origin-left"
        />
      </div>

      {/* Article Content */}
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="py-16 px-4 sm:px-6"
      >
        <div
          className="prose-article max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: compiledContent }}
        />
        <CodeCopyButton />
      </motion.article>

      {/* Footer divider */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="h-px bg-border" />
      </div>

      {/* Post footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="py-16 px-4 sm:px-6"
      >
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to all posts
          </Link>
        </div>
      </motion.footer>

      {/* Scroll to top button - positioned above music player */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0.8,
          pointerEvents: showScrollTop ? "auto" : "none",
        }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 p-3.5 rounded-full bg-foreground text-background border-2 border-foreground shadow-xl z-40"
        aria-label="Scroll to top"
      >
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronUp className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </ImmersiveBlogWrapper>
  );
}
