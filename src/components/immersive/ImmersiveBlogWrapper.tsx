"use client";

import { ReactNode, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoodProvider, Mood } from "./MoodSystem";
import { ParticleBackground } from "./ParticleBackground";
import { AmbientAudio } from "./AmbientAudio";
import { ReadingProgress, ScrollReveal, GlowText, PullQuote, SectionDivider } from "./ScrollAnimations";

interface ImmersiveBlogWrapperProps {
  children: ReactNode;
  content: string;
  tags?: string[];
  overrideMood?: Mood;
  title: string;
  description?: string;
}

// Loading screen with atmospheric transition
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0f]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-16 h-16 rounded-full border-2 border-indigo-500/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 w-16 h-16 rounded-full border-2 border-t-indigo-500 border-r-transparent border-b-transparent border-l-transparent"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 w-12 h-12 rounded-full bg-indigo-500/10"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
}

// Immersive title with staggered letter animation
function ImmersiveTitle({ title }: { title: string }) {
  const words = title.split(" ");

  return (
    <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-4">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.8,
                delay: wordIndex * 0.1 + charIndex * 0.03,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{
                background: "linear-gradient(135deg, rgb(var(--mood-primary)) 0%, rgb(var(--mood-secondary)) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}

// Floating particles overlay for extra depth
function FloatingDots() {
  const dots = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    duration: 10 + Math.random() * 20,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden opacity-30">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
            background: "rgb(var(--mood-primary))",
            boxShadow: `0 0 ${dot.size * 2}px rgba(var(--mood-primary), 0.5)`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function ImmersiveBlogWrapper({
  children,
  content,
  tags = [],
  overrideMood,
  title,
  description,
}: ImmersiveBlogWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);

  return (
    <MoodProvider content={content} tags={tags} overrideMood={overrideMood}>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-screen"
      >
        {/* Particle background */}
        <ParticleBackground />

        {/* Floating overlay dots */}
        <FloatingDots />

        {/* Reading progress indicator */}
        <ReadingProgress />

        {/* Main content */}
        <div className="relative z-20">
          {/* Hero section with title */}
          <header className="min-h-[60vh] flex flex-col justify-center items-center text-center px-4 pt-32 pb-16">
            <ScrollReveal>
              <ImmersiveTitle title={title} />
            </ScrollReveal>

            {description && (
              <ScrollReveal>
                <motion.p
                  className="text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  {description}
                </motion.p>
              </ScrollReveal>
            )}

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <motion.div
                className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <motion.div
                  className="w-1 h-2 rounded-full bg-white/40"
                  animate={{ opacity: [0.4, 1, 0.4], y: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          </header>

          {/* Content area */}
          <main className="relative">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
              {/* Section divider before content */}
              <SectionDivider />

              {/* Blog content with immersive prose styling */}
              <ScrollReveal>
                <div className="immersive-prose">{children}</div>
              </ScrollReveal>
            </div>
          </main>
        </div>

        {/* Ambient audio control */}
        <AmbientAudio enabled={audioEnabled} onToggle={setAudioEnabled} />

        {/* Vignette overlay */}
        <div
          className="fixed inset-0 pointer-events-none z-30"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.4) 100%)",
          }}
        />
      </motion.div>

      {/* Global immersive styles */}
      <style jsx global>{`
        .immersive-prose {
          color: rgba(255, 255, 255, 0.85);
        }

        .immersive-prose h1,
        .immersive-prose h2,
        .immersive-prose h3,
        .immersive-prose h4 {
          color: rgb(var(--mood-primary));
          text-shadow: 0 0 30px rgba(var(--mood-primary), 0.3);
          margin-top: 3rem;
          margin-bottom: 1.5rem;
        }

        .immersive-prose h2 {
          font-size: 2rem;
          border-left: 3px solid rgb(var(--mood-primary));
          padding-left: 1rem;
        }

        .immersive-prose h3 {
          font-size: 1.5rem;
        }

        .immersive-prose p {
          line-height: 1.9;
          margin-bottom: 1.5rem;
          font-size: 1.125rem;
        }

        .immersive-prose a {
          color: rgb(var(--mood-secondary));
          text-decoration: none;
          border-bottom: 1px solid rgba(var(--mood-secondary), 0.3);
          transition: all 0.3s ease;
        }

        .immersive-prose a:hover {
          color: rgb(var(--mood-primary));
          border-bottom-color: rgb(var(--mood-primary));
          text-shadow: 0 0 10px rgba(var(--mood-primary), 0.5);
        }

        .immersive-prose blockquote {
          border-left: 4px solid rgb(var(--mood-primary));
          background: rgba(var(--mood-primary), 0.05);
          padding: 1.5rem 2rem;
          margin: 2rem 0;
          border-radius: 0 8px 8px 0;
          font-style: italic;
          color: rgba(255, 255, 255, 0.9);
        }

        .immersive-prose code {
          background: rgba(var(--mood-primary), 0.1);
          border: 1px solid rgba(var(--mood-primary), 0.2);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-size: 0.9em;
        }

        .immersive-prose pre {
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(var(--mood-primary), 0.2);
          border-radius: 12px;
          padding: 1.5rem;
          overflow-x: auto;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .immersive-prose pre code {
          background: none;
          border: none;
          padding: 0;
        }

        .immersive-prose ul,
        .immersive-prose ol {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }

        .immersive-prose li {
          margin-bottom: 0.5rem;
          line-height: 1.8;
        }

        .immersive-prose li::marker {
          color: rgb(var(--mood-primary));
        }

        .immersive-prose hr {
          border: none;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgb(var(--mood-primary)),
            transparent
          );
          margin: 3rem 0;
        }

        .immersive-prose strong {
          color: rgb(var(--mood-primary));
          font-weight: 600;
        }

        .immersive-prose em {
          color: rgba(255, 255, 255, 0.95);
        }

        .immersive-prose img {
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
          margin: 2rem 0;
        }
      `}</style>
    </MoodProvider>
  );
}

// Re-export components for use in MDX
export { GlowText, PullQuote, ScrollReveal, SectionDivider };
