"use client";

import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { formatDate } from "@/lib/utils";
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
      
      {/* Reading time indicator - refined New Yorker style */}
      <div className="fixed top-6 right-8 z-40 font-inter text-[0.65rem] text-foreground-subtle uppercase tracking-[0.12em] opacity-50">
        {readingTime}
      </div>

      {/* Hero Section - Refined New Yorker style */}
      <header className="essay-hero min-h-[85vh] flex flex-col justify-center py-32 relative border-b border-border/50">
        <div className="editorial-container">
          {/* Chapter marker - refined spacing */}
          <div className="hero-chapter mb-12">Essay</div>
          
          {/* Title - elegant typography */}
          <h1 className="essay-hero-title mb-10">
            {title}
          </h1>

          {/* Subtitle - refined spacing */}
          {description && (
            <p className="essay-hero-subtitle mb-16 max-w-2xl">
              {description}
            </p>
          )}

          {/* Meta - refined spacing */}
          <div className="essay-hero-meta">
            <span>By Fardin Iqbal</span>
            <span className="text-foreground-subtle/60">·</span>
            <span>{formatDate(date)}</span>
            {tags.length > 0 && (
              <>
                <span className="text-foreground-subtle/60">·</span>
                <span>{tags[0]}</span>
              </>
            )}
          </div>
        </div>

      </header>

      {/* Article Content - Refined New Yorker sections */}
      <main className="py-20">
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

      {/* Music Player */}
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
