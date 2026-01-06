"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowUpRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types";

interface EssaysListProps {
  posts: BlogPost[];
  allTags: string[];
}

export function EssaysList({ posts, allTags }: EssaysListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredPosts = activeTag
    ? posts.filter((post) =>
        post.tags.some((tag) => tag.toLowerCase() === activeTag.toLowerCase())
      )
    : posts;

  return (
    <div>
      {/* Editorial Tag Filter */}
      {allTags.length > 0 && (
        <div className="mb-12 pb-8 border-b border-border">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={cn(
                "px-3 py-1 text-xs font-sans transition-colors duration-200 border",
                !activeTag
                  ? "bg-accent-red text-white border-accent-red"
                  : "bg-transparent text-foreground-muted hover:text-foreground hover:border-accent-red/50 border-border"
              )}
            >
              All
            </button>
            {allTags.slice(0, 10).map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={cn(
                  "px-3 py-1 text-xs font-sans transition-colors duration-200 border",
                  activeTag === tag
                    ? "bg-accent-red text-white border-accent-red"
                    : "bg-transparent text-foreground-muted hover:text-foreground hover:border-accent-red/50 border-border"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Essays List with smooth animations */}
      <AnimatePresence mode="wait">
        {filteredPosts.length > 0 ? (
          <motion.div
            key="essays-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-0"
          >
            {filteredPosts.map((post, index) => (
              <EssayItem key={post.slug} post={post} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="no-essays"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center py-20"
          >
            <p className="text-foreground-muted font-serif text-lg mb-4">No essays found.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTag(null)}
              className="text-accent-red hover:text-accent-red/80 text-sm font-sans transition-colors underline underline-offset-4"
            >
              Clear filter
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EssayItem({ post, index }: { post: BlogPost; index: number }) {
  const isExternal = !!post.externalUrl;
  const href = isExternal ? post.externalUrl! : `/essays/${post.slug}`;
  
  // For external URLs, use anchor tag to support target="_blank"
  // For internal links, use Next.js Link
  const LinkComponent = isExternal ? "a" : Link;
  const linkProps = isExternal
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.02,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group py-8 border-b border-border last:border-b-0"
    >
      <LinkComponent {...linkProps} className="block">
        <div className="flex items-start gap-6">
          {/* Editorial accent line - subtle */}
          <div className="flex-shrink-0 pt-1">
            <div className="w-0.5 h-12 bg-accent-red/0 group-hover:bg-accent-red transition-colors duration-300"></div>
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Date and reading time - editorial style */}
            <div className="flex items-center gap-2 mb-3 text-xs font-sans text-foreground-subtle">
              <time>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span className="text-foreground-subtle/30">·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                {post.readingTime}
              </span>
              {isExternal && (
                <>
                  <span className="text-foreground-subtle/30">·</span>
                  <span className="flex items-center gap-1.5 text-accent-red/70">
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </>
              )}
            </div>

            {/* Title - editorial serif */}
            <h2 className="text-xl sm:text-2xl font-serif font-medium text-foreground mb-3 tracking-tight leading-snug group-hover:text-accent-red transition-colors duration-300">
              {post.title}
            </h2>

            {/* Description - editorial style */}
            <p className="text-foreground-muted font-serif text-base leading-relaxed mb-4 line-clamp-2">
              {post.description}
            </p>

            {/* Tags - minimal editorial style */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs font-sans bg-transparent text-foreground-subtle border border-border/50 group-hover:border-accent-red/50 group-hover:text-accent-red transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="px-2 py-0.5 text-xs font-sans text-foreground-subtle/60">
                    +{post.tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </LinkComponent>
    </motion.article>
  );
}
