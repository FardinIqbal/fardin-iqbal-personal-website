"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { ImmersiveBlogWrapper } from "./ImmersiveBlogWrapper";
import { SkillBadge } from "@/components/ui/SkillBadge";
import { formatDate } from "@/lib/utils";
import { Mood } from "./MoodSystem";

interface ImmersiveBlogClientProps {
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  compiledContent: string;
  rawContent: string;
}

export function ImmersiveBlogClient({
  title,
  description,
  date,
  readingTime,
  tags,
  compiledContent,
  rawContent,
}: ImmersiveBlogClientProps) {
  // Determine mood from tags if available
  const moodTag = tags.find((tag): tag is Mood =>
    ["philosophical", "technical", "intense", "calm", "nostalgic", "hopeful", "mysterious"].includes(
      tag.toLowerCase()
    )
  );

  return (
    <ImmersiveBlogWrapper
      content={rawContent}
      tags={tags}
      title={title}
      description={description}
      overrideMood={moodTag?.toLowerCase() as Mood | undefined}
    >
      {/* Back link with fade */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-12"
      >
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to blog
        </Link>
      </motion.div>

      {/* Meta information */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex flex-wrap items-center gap-4 text-sm text-foreground-subtle mb-6"
      >
        <span className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          {formatDate(date)}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          {readingTime}
        </span>
      </motion.div>

      {/* Tags */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex flex-wrap gap-2 mb-12"
      >
        {tags.map((tag, index) => (
          <motion.div
            key={tag}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + index * 0.1 }}
          >
            <SkillBadge name={tag} size="sm" />
          </motion.div>
        ))}
      </motion.div>

      {/* Content */}
      <div
        className="prose prose-lg max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: compiledContent }}
      />
    </ImmersiveBlogWrapper>
  );
}
