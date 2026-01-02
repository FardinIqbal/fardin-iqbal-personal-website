"use client";

import { motion } from "framer-motion";
import { Insight, BRANCH_COLORS, EMOTION_COLORS } from "@/types/arboretum";
import {
  X,
  Calendar,
  Sparkles,
  Link2,
  Eye,
  ArrowRight,
  Anchor,
} from "lucide-react";

interface InsightDetailProps {
  insight: Insight;
  allInsights: Insight[];
  showShadow: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

const CONNECTION_TYPE_LABELS: Record<string, string> = {
  caused_by: "Caused by",
  led_to: "Led to",
  echoes: "Echoes",
  contrasts: "Contrasts with",
  transforms: "Transforms into",
  heals: "Heals",
};

export function InsightDetail({
  insight,
  allInsights,
  showShadow,
  onClose,
  onNavigate,
}: InsightDetailProps) {
  const branchColor = BRANCH_COLORS[insight.branch];
  const emotionColor = EMOTION_COLORS[insight.emotion.tone];

  // Get connected insights
  const connectedInsights = insight.connections
    .map((conn) => {
      const target = allInsights.find((i) => i.id === conn.targetId);
      return target ? { ...conn, insight: target } : null;
    })
    .filter(Boolean) as { targetId: string; type: string; strength: number; insight: Insight }[];

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed inset-4 md:inset-x-auto md:inset-y-8 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl z-50 bg-background border border-border rounded-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex-shrink-0 p-6 border-b border-border">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: branchColor }}
                />
                <span className="text-sm text-foreground-subtle capitalize">
                  {insight.branch}
                </span>
                {insight.temporal.isFoundational && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-emerald-500/10 text-emerald-500">
                    <Anchor className="w-3 h-3" />
                    Foundational
                  </span>
                )}
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                {insight.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-foreground-subtle hover:text-foreground hover:bg-background-tertiary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <span className="inline-flex items-center gap-1 text-sm text-foreground-subtle">
              <Calendar className="w-4 h-4" />
              {insight.temporal.year}
            </span>
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
            <span className="text-sm text-foreground-subtle">
              Intensity: {Math.round(insight.emotion.intensity * 100)}%
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Main content */}
          <div>
            <p className="text-foreground-muted leading-relaxed whitespace-pre-wrap">
              {insight.content}
            </p>
          </div>

          {/* Shadow self */}
          {showShadow && insight.shadowSelf && (
            <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-purple-400">
                  Shadow Self
                </span>
              </div>
              <p className="text-sm text-foreground-muted mb-2">
                {insight.shadowSelf.inversion}
              </p>
              {insight.shadowSelf.underlyingFear && (
                <p className="text-xs text-purple-400/70">
                  Underlying fear: {insight.shadowSelf.underlyingFear}
                </p>
              )}
            </div>
          )}

          {/* Connections */}
          {connectedInsights.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Link2 className="w-4 h-4 text-foreground-subtle" />
                <span className="text-sm font-medium text-foreground">
                  Connections
                </span>
              </div>
              <div className="space-y-2">
                {connectedInsights.map(({ type, strength, insight: connected }) => (
                  <button
                    key={connected.id}
                    onClick={() => onNavigate(connected.id)}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-background-secondary border border-border hover:border-foreground-subtle hover:bg-background-tertiary transition-all group text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-foreground-subtle">
                          {CONNECTION_TYPE_LABELS[type] || type}
                        </span>
                        <span className="text-xs text-foreground-subtle opacity-50">
                          ({Math.round(strength * 100)}%)
                        </span>
                      </div>
                      <p className="text-sm text-foreground truncate group-hover:text-primary-500 transition-colors">
                        {connected.title}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-foreground-subtle group-hover:text-foreground flex-shrink-0 ml-2 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Emotional metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-background-secondary border border-border">
              <p className="text-xs text-foreground-subtle mb-1">Buoyancy</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-background-tertiary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${((insight.emotion.buoyancy + 1) / 2) * 100}%`,
                      backgroundColor:
                        insight.emotion.buoyancy > 0 ? "#10b981" : "#ef4444",
                    }}
                  />
                </div>
                <span className="text-sm text-foreground tabular-nums">
                  {insight.emotion.buoyancy > 0 ? "+" : ""}
                  {insight.emotion.buoyancy.toFixed(1)}
                </span>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-background-secondary border border-border">
              <p className="text-xs text-foreground-subtle mb-1">Intensity</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-background-tertiary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${insight.emotion.intensity * 100}%`,
                      backgroundColor: emotionColor,
                    }}
                  />
                </div>
                <span className="text-sm text-foreground tabular-nums">
                  {Math.round(insight.emotion.intensity * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-4 border-t border-border bg-background-secondary">
          <p className="text-xs text-foreground-subtle text-center">
            Last updated: {new Date(insight.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </motion.div>
    </>
  );
}
