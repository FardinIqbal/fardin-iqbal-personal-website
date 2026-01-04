"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Clock, BookOpen } from "lucide-react";
import type { BlogPost } from "@/types";

interface EssaysSectionProps {
  posts: BlogPost[];
}

function EssayCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative py-8 border-b border-border/30 hover:border-border/60 transition-colors">
          {/* Date and reading time */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono text-foreground-subtle uppercase tracking-wider">
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="text-foreground-subtle/50">|</span>
            <span className="flex items-center gap-1.5 text-xs text-foreground-subtle">
              <Clock className="w-3 h-3" />
              {post.readingTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-display font-medium text-foreground mb-3 tracking-tight group-hover:text-foreground-muted transition-colors pr-12">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-foreground-muted font-serif text-base leading-relaxed max-w-2xl">
            {post.description}
          </p>

          {/* Arrow indicator */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
            <ArrowUpRight className="w-5 h-5 text-foreground-subtle" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function EssaysSection({ posts }: EssaysSectionProps) {
  // Show only the 3 most recent essays
  const featuredPosts = posts.slice(0, 3);

  return (
    <section id="essays" className="py-24 md:py-32 bg-background-secondary relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg className="w-full h-full">
          <defs>
            <pattern id="essayGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#essayGrid)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 text-foreground-subtle" />
            <span className="text-xs font-mono text-foreground-subtle uppercase tracking-widest">
              Writing
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-foreground mb-4 tracking-tight">
            Essays
          </h2>
          <p className="text-foreground-muted text-lg max-w-xl leading-relaxed font-serif">
            Reflections on technology, philosophy, and the craft of building software.
          </p>
        </motion.div>

        {/* Essay List */}
        <div className="mb-12">
          {featuredPosts.map((post, index) => (
            <EssayCard key={post.slug} post={post} index={index} />
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-foreground-muted transition-colors group"
          >
            View all essays
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
