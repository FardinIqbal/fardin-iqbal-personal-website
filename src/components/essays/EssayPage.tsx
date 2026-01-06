"use client";

import Link from "next/link";
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
      
      {/* Reading time indicator - exact New Yorker style */}
      <div className="fixed top-8 left-8 z-40 font-inter text-[0.65rem] text-foreground-subtle uppercase tracking-[0.1em] opacity-60">
        {readingTime}
      </div>

      {/* Hero Section - New Yorker style */}
      <header className="essay-hero min-h-[90vh] flex flex-col justify-center py-24 relative border-b border-border">
        <div className="editorial-container">
          {/* Chapter marker */}
          <div className="hero-chapter mb-10">Essay</div>
          
          {/* Title */}
          <h1 className="essay-hero-title mb-8">
            {title}
          </h1>

          {/* Subtitle */}
          {description && (
            <p className="essay-hero-subtitle mb-12">
              {description}
            </p>
          )}

          {/* Meta */}
          <div className="essay-hero-meta">
            <span>By Fardin Iqbal</span>
            <span>{formatDate(date)}</span>
            {tags.length > 0 && <span>{tags[0]}</span>}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-foreground-subtle">
          <span className="text-[0.65rem] font-inter uppercase tracking-[0.1em]">Begin the journey</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </motion.div>
        </div>
      </header>

      {/* Article Content - New Yorker sections */}
      <main>
        <article
          className="essay-article-content prose-article"
          dangerouslySetInnerHTML={{ __html: compiledContent }}
        />
      </main>

      {/* Footer */}
      <footer className="essay-footer py-20 text-center text-foreground-subtle font-inter text-xs tracking-[0.02em] leading-[2]">
        <div className="editorial-container">
          <p><strong>Built by Fardin Iqbal</strong></p>
          <p>Software Engineer & Writer</p>
          <p className="mt-6">
            <Link href="/essays" className="text-[rgb(var(--accent-red))] no-underline hover:underline">
              Back to Essays
            </Link>
          </p>
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
      className="fixed top-0 left-0 right-0 h-[1px] z-[1000]"
      style={{ opacity: 0.6 }}
    >
      <motion.div
        className="h-full origin-left"
        style={{ 
          scaleX,
          background: "rgb(var(--accent-red))"
        }}
      />
    </motion.div>
  );
}
