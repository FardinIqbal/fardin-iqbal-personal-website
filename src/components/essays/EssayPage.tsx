"use client";

import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { formatDate } from "@/lib/utils";
import { MusicPlayer } from "./MusicPlayer";
import { TableOfContents } from "./TableOfContents";

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
      
      {/* Reading time indicator - positioned top-left like reference */}
      <div className="reading-time">
        {readingTime}
      </div>

      {/* Hero Section - Matching reference exactly */}
      <header className="hero">
        <div className="container">
          <div className="hero-chapter">Essay</div>
          <h1 dangerouslySetInnerHTML={{ __html: title }} />
          {description && (
            <p className="hero-subtitle">{description}</p>
          )}
          <div className="hero-meta">
            <span>By Fardin Iqbal</span>
            <span>{formatDate(date)}</span>
            {tags.length > 0 && <span>{tags[0]}</span>}
          </div>
        </div>
        <div 
          className="scroll-indicator"
          onClick={() => {
            const main = document.querySelector('main');
            if (main) {
              main.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
        >
          <span>Begin reading</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </header>

      {/* Article Content - Wrapped in main with sections */}
      <main>
        <div className="container">
          <article
            className="prose-article"
            dangerouslySetInnerHTML={{ __html: compiledContent }}
          />
        </div>
      </main>

      {/* Footer */}
      <footer>
        <div className="container">
          <p><strong>Built by Fardin Iqbal</strong></p>
          <p>Software Engineer & Writer</p>
          <p style={{ marginTop: '1.5rem' }}>
            <Link href="/essays" className="footer-link">
              Back to Essays
            </Link>
          </p>
        </div>
      </footer>

      {/* Music Player */}
      <MusicPlayer />

      {/* Table of Contents */}
      <TableOfContents />
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
      className="fixed top-0 left-0 right-0 h-[2px] z-[1000]"
    >
      <motion.div
        className="h-full origin-left transition-all"
        style={{ 
          scaleX,
          background: "linear-gradient(90deg, rgb(var(--accent-red)), rgb(96 165 250))",
          opacity: 0.6
        }}
      />
    </motion.div>
  );
}

