"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types";
import { BlogCard } from "./BlogCard";

// Category definitions - these are special tags for filtering
const CATEGORIES = [
  { id: "all", label: "All Posts" },
  { id: "technical", label: "Technical" },
  { id: "book-review", label: "Books" },
  { id: "movie-review", label: "Movies" },
  { id: "course-review", label: "Courses" },
  { id: "thoughts", label: "Thoughts" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

interface BlogFilterProps {
  posts: BlogPost[];
  allTags: string[];
}

export function BlogFilter({ posts, allTags }: BlogFilterProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Filter posts by category and tag
  const filteredPosts = posts.filter((post) => {
    // Category filter
    if (activeCategory !== "all") {
      const hasCategory = post.tags.some(
        (tag) => tag.toLowerCase() === activeCategory.toLowerCase()
      );
      if (!hasCategory) return false;
    }

    // Tag filter
    if (activeTag) {
      const hasTag = post.tags.some(
        (tag) => tag.toLowerCase() === activeTag.toLowerCase()
      );
      if (!hasTag) return false;
    }

    return true;
  });

  // Get available tags (excluding category tags)
  const categoryIds = CATEGORIES.map((c) => c.id.toLowerCase());
  const availableTags = allTags.filter(
    (tag) => !categoryIds.includes(tag.toLowerCase())
  );

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              setActiveCategory(category.id);
              setActiveTag(null);
            }}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-full transition-all",
              activeCategory === category.id
                ? "bg-foreground text-background"
                : "bg-background-tertiary text-foreground-muted hover:text-foreground border border-border hover:border-foreground-subtle"
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Tag Filter (optional, for deeper filtering) */}
      {availableTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-foreground-subtle text-sm py-1">Tags:</span>
          {availableTags.slice(0, 10).map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={cn(
                "px-3 py-1 text-xs rounded-full transition-all",
                activeTag === tag
                  ? "bg-primary-500 text-white"
                  : "bg-background-secondary text-foreground-muted hover:text-foreground border border-border"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <motion.div
          key={`${activeCategory}-${activeTag}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="grid gap-6"
        >
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-20">
          <p className="text-foreground-muted text-lg">
            No posts found for this filter.
          </p>
          <button
            onClick={() => {
              setActiveCategory("all");
              setActiveTag(null);
            }}
            className="mt-4 text-primary-400 hover:text-primary-300 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
