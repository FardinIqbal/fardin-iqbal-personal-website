"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";
import { SkillBadge } from "@/components/ui/SkillBadge";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="p-6 rounded-xl bg-background-secondary border border-border hover:border-primary-500/30 transition-all duration-300">
          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-foreground-muted mb-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readingTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary-400 transition-colors">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-foreground-muted text-sm mb-4 line-clamp-2">
            {post.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <SkillBadge key={tag} name={tag} size="sm" />
            ))}
          </div>

          {/* Read more */}
          <span className="inline-flex items-center gap-1 text-sm text-primary-400 group-hover:gap-2 transition-all">
            Read more
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
