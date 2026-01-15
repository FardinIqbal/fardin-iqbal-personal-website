"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types";

interface BlogListProps {
  posts: BlogPost[];
  allTags: string[];
}

export function BlogList({ posts, allTags }: BlogListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredPosts = activeTag
    ? posts.filter((post) =>
        post.tags.some((tag) => tag.toLowerCase() === activeTag.toLowerCase())
      )
    : posts;

  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <div>
      {/* Tag Filter */}
      {allTags.length > 0 && (
        <div className="mb-12 pb-8 border-b border-border">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={cn(
                "px-3 py-1.5 font-sans text-xs font-medium transition-colors border rounded-full",
                !activeTag
                  ? "bg-accent text-white border-accent"
                  : "bg-transparent text-foreground-secondary hover:text-foreground border-border hover:border-border-hover"
              )}
            >
              All
            </button>
            {allTags.slice(0, 8).map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={cn(
                  "px-3 py-1.5 font-sans text-xs font-medium transition-colors border rounded-full",
                  activeTag === tag
                    ? "bg-accent text-white border-accent"
                    : "bg-transparent text-foreground-secondary hover:text-foreground border-border hover:border-border-hover"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <div className="mb-8">
          <span className="font-sans text-xs font-medium text-accent uppercase tracking-wider mb-6 block">
            Featured
          </span>
          {featuredPosts.map((post, index) => (
            <PostItem key={post.slug} post={post} index={index} />
          ))}
        </div>
      )}

      {/* Regular Posts */}
      {regularPosts.length > 0 ? (
        <div>
          {regularPosts.map((post, index) => (
            <PostItem key={post.slug} post={post} index={index + featuredPosts.length} />
          ))}
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-body text-foreground-secondary mb-4">No posts found.</p>
          <button
            onClick={() => setActiveTag(null)}
            className="font-sans text-sm text-accent hover:underline"
          >
            Clear filter
          </button>
        </div>
      ) : null}
    </div>
  );
}

function PostItem({ post, index }: { post: BlogPost; index: number }) {
  const isExternal = !!post.externalUrl;
  const href = isExternal ? post.externalUrl! : `/blog/${post.slug}`;

  const LinkComponent = isExternal ? "a" : Link;
  const linkProps = isExternal
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className="group"
    >
      <LinkComponent {...linkProps} className="block py-8 border-b border-border hover:border-border-hover transition-colors">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-3">
          <time className="font-sans text-sm text-foreground-muted">
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
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
        <h2 className="font-display text-2xl font-medium text-foreground mb-3 tracking-tight group-hover:text-accent transition-colors">
          {post.title}
        </h2>

        {/* Description */}
        <p className="font-body text-foreground-secondary text-base leading-relaxed mb-4 line-clamp-2">
          {post.description}
        </p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 font-sans text-xs text-foreground-muted bg-background-secondary border border-border rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </LinkComponent>
    </motion.article>
  );
}
