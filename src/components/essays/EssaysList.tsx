"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
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
      {/* Tag Filter */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10 pb-8 border-b border-border">
          <button
            onClick={() => setActiveTag(null)}
            className={cn(
              "px-3 py-1.5 text-sm rounded-full transition-all",
              !activeTag
                ? "bg-foreground text-background"
                : "bg-background-tertiary text-foreground-muted hover:text-foreground border border-border"
            )}
          >
            All
          </button>
          {allTags.slice(0, 8).map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={cn(
                "px-3 py-1.5 text-sm rounded-full transition-all",
                activeTag === tag
                  ? "bg-foreground text-background"
                  : "bg-background-tertiary text-foreground-muted hover:text-foreground border border-border"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Essays List */}
      {filteredPosts.length > 0 ? (
        <div className="divide-y divide-border/50">
          {filteredPosts.map((post, index) => (
            <EssayItem key={post.slug} post={post} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-foreground-muted">No essays found.</p>
          <button
            onClick={() => setActiveTag(null)}
            className="mt-4 text-foreground-subtle hover:text-foreground text-sm transition-colors"
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
}

function EssayItem({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group py-8 first:pt-0"
    >
      <Link href={`/essays/${post.slug}`} className="block">
        {/* Date and reading time */}
        <div className="flex items-center gap-3 mb-3 text-sm text-foreground-subtle">
          <time>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          <span className="text-foreground-subtle/30">|</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readingTime}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-display font-medium text-foreground mb-2 tracking-tight group-hover:text-foreground-muted transition-colors flex items-start gap-2">
          <span>{post.title}</span>
          <ArrowUpRight className="w-4 h-4 flex-shrink-0 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </h2>

        {/* Description */}
        <p className="text-foreground-muted font-serif leading-relaxed line-clamp-2">
          {post.description}
        </p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs rounded bg-background-tertiary text-foreground-subtle"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </motion.article>
  );
}
