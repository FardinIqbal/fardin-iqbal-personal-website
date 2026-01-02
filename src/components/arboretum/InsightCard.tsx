"use client";

import { motion } from "framer-motion";
import { Insight, BRANCH_COLORS, EMOTION_COLORS } from "@/types/arboretum";
import { Link2, Calendar, Sparkles } from "lucide-react";

interface InsightCardProps {
  insight: Insight;
  index: number;
  showShadow: boolean;
  onClick: () => void;
  connections: string[];
}

export function InsightCard({
  insight,
  index,
  showShadow,
  onClick,
  connections,
}: InsightCardProps) {
  const branchColor = BRANCH_COLORS[insight.branch];
  const emotionColor = EMOTION_COLORS[insight.emotion.tone];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={onClick}
      className="group relative p-5 bg-background-secondary border border-border rounded-xl cursor-pointer transition-all hover:border-foreground-subtle hover:bg-background-tertiary"
    >
      {/* Intensity indicator */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl opacity-60"
        style={{
          background: `linear-gradient(to right, ${branchColor}, transparent)`,
          opacity: insight.emotion.intensity,
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: branchColor }}
          />
          <span className="text-xs text-foreground-subtle capitalize">
            {insight.branch}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-foreground-subtle">
          <Calendar className="w-3 h-3" />
          {insight.temporal.year}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-foreground font-medium mb-2 group-hover:text-primary-500 transition-colors line-clamp-2">
        {insight.title}
      </h3>

      {/* Content preview */}
      <p className="text-sm text-foreground-muted line-clamp-3 mb-4">
        {showShadow && insight.shadowSelf
          ? insight.shadowSelf.inversion
          : insight.content}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {/* Emotion tag */}
        <span
          className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs"
          style={{
            backgroundColor: `${emotionColor}15`,
            color: emotionColor,
          }}
        >
          <Sparkles className="w-3 h-3" />
          {insight.emotion.tone}
        </span>

        {/* Connection count */}
        {connections.length > 0 && (
          <span className="flex items-center gap-1 text-xs text-foreground-subtle">
            <Link2 className="w-3 h-3" />
            {connections.length}
          </span>
        )}
      </div>

      {/* Foundational indicator */}
      {insight.temporal.isFoundational && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-background" />
      )}
    </motion.article>
  );
}
