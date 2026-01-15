"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Clock, ExternalLink } from "lucide-react";
import type { BlogPost } from "@/types";

interface WritingSectionProps {
  posts: BlogPost[];
}

const FEATURED_SLUGS = [
  "why-love-needs-no-reason",
  "building-prometheus",
  "big-minds-case-manager",
  "grappler-to-engineer",
];

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  const isExternal = !!post.externalUrl;
  const href = isExternal ? post.externalUrl! : `/blog/${post.slug}`;

  const LinkComponent = isExternal ? "a" : Link;
  const linkProps = isExternal
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group premium-card"
    >
      <LinkComponent {...linkProps} className="block">
        <div className="py-8 border-b border-border hover:border-border-hover transition-colors duration-200">
          {/* Meta */}
          <div className="flex items-center gap-4 mb-4">
            <span className="font-sans text-sm text-foreground-muted">
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="text-foreground-muted">·</span>
            <span className="flex items-center gap-1.5 font-sans text-sm text-foreground-muted">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime}
            </span>
            {isExternal && (
              <>
                <span className="text-foreground-muted">·</span>
                <span className="flex items-center gap-1.5 font-sans text-sm text-foreground-muted">
                  <ExternalLink className="w-3.5 h-3.5" />
                  External
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="font-display text-2xl md:text-3xl font-medium text-foreground mb-3 tracking-tight group-hover:text-accent transition-colors duration-200 pr-8">
            {post.title}
          </h3>

          {/* Description */}
          <p className="font-body text-foreground-secondary text-lg leading-relaxed max-w-2xl">
            {post.description}
          </p>
        </div>
      </LinkComponent>
    </motion.article>
  );
}

export function WritingSection({ posts }: WritingSectionProps) {
  const featuredPosts = FEATURED_SLUGS
    .map((slug) => posts.find((p) => p.slug === slug))
    .filter((p): p is BlogPost => p !== undefined);

  return (
    <section id="writing" className="py-24 md:py-32 px-6 lg:px-12 bg-background-secondary">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-4">
            Writing
          </h2>
          <p className="font-body text-lg text-foreground-secondary max-w-2xl">
            Reflections on technology, philosophy, and the craft of building software.
          </p>
        </motion.div>

        {/* Post List */}
        <div>
          {featuredPosts.map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} />
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-sans text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors group"
          >
            View all posts
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
