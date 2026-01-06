"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
        <div className="mb-14 pb-10 border-b border-border">
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setActiveTag(null)}
              className={cn(
                "px-4 py-1.5 text-xs font-sans font-medium transition-all duration-200 border rounded-sm",
                !activeTag
                  ? "bg-accent-red text-white border-accent-red shadow-sm"
                  : "bg-background-tertiary text-foreground-muted hover:text-foreground hover:border-accent-red/60 border-border hover:bg-background-secondary"
              )}
            >
              All
            </button>
            {allTags.slice(0, 10).map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={cn(
                  "px-4 py-1.5 text-xs font-sans font-medium transition-all duration-200 border rounded-sm",
                  activeTag === tag
                    ? "bg-accent-red text-white border-accent-red shadow-sm"
                    : "bg-background-tertiary text-foreground-muted hover:text-foreground hover:border-accent-red/60 border-border hover:bg-background-secondary"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Essays List */}
      {filteredPosts.length > 0 ? (
        <div>
          {filteredPosts.map((post, index) => (
            <EssayItem key={post.slug} post={post} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-foreground-muted font-serif text-lg mb-4">No essays found.</p>
          <button
            onClick={() => setActiveTag(null)}
            className="text-accent-red hover:text-accent-red/80 text-sm font-sans transition-colors underline underline-offset-4"
          >
            Clear filter
          </button>
        </div>
      )}
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
      className="group py-10 border-b border-border last:border-b-0 hover:bg-background-secondary/30 transition-colors duration-300 rounded-lg px-2 -mx-2"
    >
      <LinkComponent {...linkProps} className="block">
        <div className="flex items-start gap-6">
          {/* Editorial accent line - more visible */}
          <div className="flex-shrink-0 pt-1 relative">
            <div className="w-1 h-16 bg-accent-red/20 group-hover:bg-accent-red transition-all duration-300 rounded-full"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-accent-red rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Date and reading time - editorial style */}
            <div className="flex items-center gap-2.5 mb-4 text-xs font-sans text-foreground-subtle">
              <time className="font-medium">
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span className="text-accent-red/40">·</span>
              <span className="flex items-center gap-1.5 group-hover:text-accent-red/80 transition-colors">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime}
              </span>
              {isExternal && (
                <>
                  <span className="text-accent-red/40">·</span>
                  <span className="flex items-center gap-1.5 text-accent-red">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </>
              )}
            </div>

            {/* Title - editorial serif with accent */}
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-foreground mb-4 tracking-tight leading-tight group-hover:text-accent-red transition-colors duration-300">
              {post.title}
            </h2>

            {/* Description - editorial style */}
            <p className="text-foreground-muted font-serif text-base sm:text-lg leading-relaxed mb-5 line-clamp-2">
              {post.description}
            </p>

            {/* Tags - editorial style with lighter accent red */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-sans font-medium bg-accent-red/10 text-accent-red/80 border border-accent-red/30 group-hover:border-accent-red/60 group-hover:text-accent-red group-hover:bg-accent-red/15 transition-all duration-300 rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="px-3 py-1 text-xs font-sans text-accent-red/60">
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
