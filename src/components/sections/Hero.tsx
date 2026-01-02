"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import type { Profile } from "@/lib/content";
import { useSectionMood } from "@/components/immersive/SectionMoodProvider";

// Staggered letter animation component
function AnimatedName({ name }: { name: string }) {
  const { palette } = useSectionMood();
  const words = name.split(" ");

  return (
    <span className="block">
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
                delay: 0.3 + wordIndex * 0.15 + charIndex * 0.04,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{
                background: `linear-gradient(135deg, rgb(${palette.primary}) 0%, rgb(${palette.secondary}) 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: `0 0 40px rgba(${palette.primary}, 0.3)`,
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}

interface HeroProps {
  profile: Profile;
}

export function Hero({ profile }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <section
      id="hero"
      data-section="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background handled by ImmersivePortfolioWrapper */}

      {/* Content */}
      <motion.div
        style={{
          y: springY,
          opacity,
        }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Status badge - clean and minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background-tertiary border border-border mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-sm text-foreground-muted">
            Open to opportunities
          </span>
        </motion.div>

        {/* Name with staggered letter animation */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
        >
          <motion.span
            className="block text-foreground-muted text-3xl sm:text-4xl md:text-5xl font-normal mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Hi, I&apos;m
          </motion.span>
          <AnimatedName name={profile.name} />
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl sm:text-2xl text-foreground-muted font-light mb-6 max-w-2xl mx-auto"
        >
          {profile.tagline}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-foreground-subtle text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {profile.bio[0]}
        </motion.p>

        {/* CTA Buttons - Vercel style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
          >
            View My Work
            <ArrowDown className="w-4 h-4" />
          </Link>

          <Link
            href={profile.resumeUrl}
            target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-background-tertiary hover:border-foreground-subtle transition-all"
          >
            Download Resume
          </Link>
        </motion.div>

        {/* Social Links - minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center justify-center gap-2"
        >
          {[
            { icon: Github, href: profile.social.github, label: "GitHub" },
            { icon: Linkedin, href: profile.social.linkedin, label: "LinkedIn" },
            { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <Link
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="p-3 rounded-lg text-foreground-muted hover:text-foreground hover:bg-background-tertiary transition-all"
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
            </Link>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator - clean */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <Link
          href="#about"
          className="flex flex-col items-center gap-2 text-foreground-subtle hover:text-foreground transition-colors"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </Link>
      </motion.div>

    </section>
  );
}
