"use client";

import { motion } from "framer-motion";
import { X, Link, AlertTriangle, Lightbulb } from "lucide-react";
import { Insight, BRANCH_COLORS, EMOTION_COLORS } from "@/types/arboretum";

interface InsightPanelProps {
  insight: Insight;
  onClose: () => void;
  allInsights: Insight[];
}

export function InsightPanel({ insight, onClose, allInsights }: InsightPanelProps) {
  const branchColor = BRANCH_COLORS[insight.branch];
  const emotionColor = EMOTION_COLORS[insight.emotion.tone];

  // Find connected insights
  const connectedInsights = insight.connections
    .map((conn) => {
      const target = allInsights.find((i) => i.id === conn.targetId);
      return target ? { ...conn, insight: target } : null;
    })
    .filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="absolute right-6 top-24 bottom-24 w-96 pointer-events-auto overflow-hidden"
    >
      <div className="h-full flex flex-col rounded-2xl bg-background-secondary/90 backdrop-blur-xl border border-border overflow-hidden">
        {/* Header */}
        <div
          className="p-6 border-b border-border"
          style={{
            background: `linear-gradient(135deg, ${branchColor}10, transparent)`,
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <div
              className="px-3 py-1 rounded-full text-xs font-medium capitalize"
              style={{
                backgroundColor: `${branchColor}20`,
                color: branchColor,
              }}
            >
              {insight.branch}
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-background-tertiary transition-colors"
            >
              <X className="w-5 h-5 text-foreground-muted" />
            </button>
          </div>

          <h2 className="text-xl font-bold text-white mb-2">{insight.title}</h2>

          <div className="flex items-center gap-3 text-sm">
            <span className="text-foreground-subtle">{insight.temporal.year}</span>
            <span
              className="px-2 py-0.5 rounded text-xs capitalize"
              style={{
                backgroundColor: `${emotionColor}20`,
                color: emotionColor,
              }}
            >
              {insight.emotion.tone}
            </span>
            {insight.temporal.isFoundational && (
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-xs">
                Foundational
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Main content */}
          <div>
            <p className="text-foreground-muted leading-relaxed">
              {insight.content}
            </p>
          </div>

          {/* Micro World */}
          {insight.microWorld && (
            <div className="p-4 rounded-xl bg-background-tertiary/50">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-foreground">
                  Deeper View
                </span>
              </div>
              <p className="text-sm text-foreground-muted">
                {insight.microWorld.narrative}
              </p>
              {insight.microWorld.quotes && insight.microWorld.quotes.length > 0 && (
                <blockquote className="mt-3 pl-3 border-l-2 border-foreground-subtle">
                  <p className="text-sm italic text-foreground-muted">
                    &ldquo;{insight.microWorld.quotes[0].text}&rdquo;
                  </p>
                  <cite className="text-xs text-foreground-subtle">
                    — {insight.microWorld.quotes[0].source}
                  </cite>
                </blockquote>
              )}
            </div>
          )}

          {/* Shadow Self */}
          {insight.shadowSelf && (
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-400">
                  Shadow Self
                </span>
              </div>
              <p className="text-sm text-foreground-muted mb-2">
                {insight.shadowSelf.inversion}
              </p>
              {insight.shadowSelf.underlyingFear && (
                <p className="text-xs text-purple-300/70">
                  <strong>Fear:</strong> {insight.shadowSelf.underlyingFear}
                </p>
              )}
              {insight.shadowSelf.avoidance && (
                <p className="text-xs text-purple-300/70 mt-1">
                  <strong>Avoiding:</strong> {insight.shadowSelf.avoidance}
                </p>
              )}
            </div>
          )}

          {/* Connections */}
          {connectedInsights.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Link className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-foreground">
                  Connected Insights
                </span>
              </div>
              <div className="space-y-2">
                {connectedInsights.map((conn) => {
                  if (!conn) return null;
                  const targetColor = BRANCH_COLORS[conn.insight.branch];
                  return (
                    <div
                      key={conn.targetId}
                      className="p-3 rounded-lg bg-background-tertiary/50 flex items-center gap-3"
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: targetColor }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">
                          {conn.insight.title}
                        </p>
                        <p className="text-xs text-foreground-subtle capitalize">
                          {conn.type.replace("_", " ")}
                        </p>
                      </div>
                      <div
                        className="w-12 h-1 rounded-full bg-foreground-subtle/20"
                        title={`Strength: ${Math.round(conn.strength * 100)}%`}
                      >
                        <div
                          className="h-full rounded-full bg-blue-400"
                          style={{ width: `${conn.strength * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tags */}
          {insight.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {insight.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded bg-background-tertiary text-foreground-subtle"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between text-xs text-foreground-subtle">
            <span>
              Emotional Intensity: {Math.round(insight.emotion.intensity * 100)}%
            </span>
            <span>
              Buoyancy: {insight.emotion.buoyancy > 0 ? "+" : ""}
              {insight.emotion.buoyancy.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
