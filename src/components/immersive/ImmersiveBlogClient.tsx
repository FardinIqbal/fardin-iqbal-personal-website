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
  const [mobileNavVisible, setMobileNavVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen for mobile nav visibility changes
  useEffect(() => {
    const handleNavVisibility = (e: CustomEvent<{ visible: boolean }>) => {
      setMobileNavVisible(e.detail.visible);
    };

    window.addEventListener("mobileNavVisibility", handleNavVisibility as EventListener);
    return () => window.removeEventListener("mobileNavVisibility", handleNavVisibility as EventListener);
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

      {/* Hero Section - Premium on all devices */}
      <header className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-5 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-foreground-subtle hover:text-foreground transition-colors group mb-6 sm:mb-8"
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
            className="flex flex-wrap gap-2 mb-5 sm:mb-6"
          >
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-background-tertiary text-foreground-muted border border-border"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Title - Premium typography */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.12] sm:leading-[1.1] mb-5 sm:mb-6"
          >
            {title}
          </motion.h1>

          {/* Description - Elegant subtitle */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-foreground-muted leading-relaxed mb-6 sm:mb-8 font-serif"
            >
              {description}
            </motion.p>
          )}

          {/* Meta - Refined spacing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex items-center gap-4 sm:gap-6 text-sm text-foreground-subtle"
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
      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="h-px bg-border origin-left"
        />
      </div>

      {/* Article Content - Premium reading experience */}
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="py-12 sm:py-16 px-5 sm:px-6"
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

      {/* Scroll to top button - positioned above music player, syncs with mobile nav */}
      <motion.div
        className="fixed right-4 sm:right-6 z-40"
        initial={false}
        animate={{
          // Mobile: music player at 96px when nav visible + ~56px player height + 8px gap = 160px
          // When nav hidden: music player at 24px + 56px + 8px = 88px
          bottom: mobileNavVisible ? 160 : 88,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        style={{ bottom: 88 }}
      >
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
          className="p-3.5 rounded-full bg-foreground text-background border-2 border-foreground shadow-xl md:hidden"
          aria-label="Scroll to top"
        >
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronUp className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Desktop scroll to top - static position */}
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
        className="fixed bottom-24 right-6 p-3.5 rounded-full bg-foreground text-background border-2 border-foreground shadow-xl z-40 hidden md:block"
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
