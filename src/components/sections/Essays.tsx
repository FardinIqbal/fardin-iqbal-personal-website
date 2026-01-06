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
      <Link href={`/essays/${post.slug}`} className="block">
        <div className="relative py-10 border-b border-border/30 hover:border-border/60 transition-colors duration-500">
          {/* Date and reading time */}
          <div className="flex items-center gap-4 mb-5">
            <span className="text-xs font-inter text-foreground-subtle uppercase tracking-[0.1em]">
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="text-foreground-subtle/40">·</span>
            <span className="flex items-center gap-1.5 text-xs text-foreground-subtle font-inter">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-4 tracking-tight leading-[1.2] group-hover:text-foreground-muted transition-colors pr-12">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-foreground-muted font-serif text-lg md:text-xl leading-[1.75] max-w-2xl">
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

// Manually curated featured essay slugs (in display order)
const FEATURED_ESSAY_SLUGS = [
  "why-love-needs-no-reason",
  "building-prometheus",
  "big-minds-case-manager",
  "grappler-to-engineer",
];

export function EssaysSection({ posts }: EssaysSectionProps) {
  // Show manually curated featured essays
  const featuredPosts = FEATURED_ESSAY_SLUGS
    .map(slug => posts.find(p => p.slug === slug))
    .filter((p): p is BlogPost => p !== undefined);

  return (
    <section id="essays" className="editorial-section bg-background relative overflow-hidden">

      <div className="editorial-container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="mb-20"
        >
          <div className="chapter-marker mb-6">Writing</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-6 tracking-tight leading-[1.15]">
            Essays
          </h2>
          <p className="text-foreground-muted text-lg md:text-xl max-w-2xl leading-[1.75] font-serif">
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
            href="/essays"
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
