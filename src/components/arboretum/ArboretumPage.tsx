"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArboretumData, Insight, ThematicBranch, BRANCH_COLORS } from "@/types/arboretum";
import { PasswordGate } from "./PasswordGate";
import { InsightCard } from "./InsightCard";
import { InsightDetail } from "./InsightDetail";
import { TreeVisualization } from "./TreeVisualization";
import {
  TreeDeciduous,
  Filter,
  Grid3X3,
  Network,
  Eye,
  EyeOff,
  Download
} from "lucide-react";

interface ArboretumPageProps {
  data: ArboretumData;
}

const BRANCH_LABELS: Record<ThematicBranch, string> = {
  relationships: "Relationships",
  career: "Career",
  trauma: "Trauma",
  joy: "Joy",
  growth: "Growth",
  identity: "Identity",
  purpose: "Purpose",
};

export function ArboretumPage({ data }: ArboretumPageProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
  const [activeBranch, setActiveBranch] = useState<ThematicBranch | "all">("all");
  const [viewMode, setViewMode] = useState<"grid" | "tree">("grid");
  const [showConnections, setShowConnections] = useState(true);
  const [showShadow, setShowShadow] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("arboretum_auth");
    setIsAuthenticated(stored === "a]k#9Xm$2pL@vR7n");
  }, []);

  // Filter insights
  const filteredInsights = data.insights.filter((insight) => {
    if (activeBranch !== "all" && insight.branch !== activeBranch) return false;
    return true;
  });

  // Group by branch for grid view
  const groupedInsights = data.insights.reduce((acc, insight) => {
    if (!acc[insight.branch]) acc[insight.branch] = [];
    acc[insight.branch].push(insight);
    return acc;
  }, {} as Record<ThematicBranch, Insight[]>);

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <TreeDeciduous className="w-8 h-8 text-foreground-subtle" />
        </motion.div>
      </div>
    );
  }

  // Password gate
  if (!isAuthenticated) {
    return <PasswordGate onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <TreeDeciduous className="w-5 h-5 text-emerald-500" />
              <h1 className="text-lg font-semibold text-foreground">The Arboretum</h1>
            </div>

            <div className="flex items-center gap-2">
              {/* View mode toggle */}
              <div className="flex items-center bg-background-tertiary rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-background text-foreground"
                      : "text-foreground-subtle hover:text-foreground"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("tree")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "tree"
                      ? "bg-background text-foreground"
                      : "text-foreground-subtle hover:text-foreground"
                  }`}
                >
                  <Network className="w-4 h-4" />
                </button>
              </div>

              {/* Connections toggle */}
              <button
                onClick={() => setShowConnections(!showConnections)}
                className={`p-2 rounded-lg transition-colors ${
                  showConnections
                    ? "bg-primary-500/10 text-primary-500"
                    : "text-foreground-subtle hover:text-foreground"
                }`}
                title="Toggle connections"
              >
                <Network className="w-4 h-4" />
              </button>

              {/* Shadow toggle */}
              <button
                onClick={() => setShowShadow(!showShadow)}
                className={`p-2 rounded-lg transition-colors ${
                  showShadow
                    ? "bg-purple-500/10 text-purple-500"
                    : "text-foreground-subtle hover:text-foreground"
                }`}
                title="Toggle shadow self"
              >
                {showShadow ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>

              {/* Export */}
              <button
                onClick={() => alert("PDF export coming soon")}
                className="p-2 rounded-lg text-foreground-subtle hover:text-foreground transition-colors"
                title="Export PDF"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Intro section */}
      <section className="py-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <p className="text-foreground-muted leading-relaxed">
              A living visualization of insights, patterns, and the architecture of self.
              These nodes represent observations synthesized from journal entries and
              conversations over time. The connections between them reveal deeper patterns.
            </p>
          </motion.div>

          {/* Branch filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 mt-6"
          >
            <button
              onClick={() => setActiveBranch("all")}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all ${
                activeBranch === "all"
                  ? "bg-foreground text-background"
                  : "bg-background-tertiary text-foreground-muted hover:text-foreground border border-border"
              }`}
            >
              <Filter className="w-3 h-3" />
              All Branches
            </button>
            {(Object.keys(BRANCH_LABELS) as ThematicBranch[]).map((branch) => {
              const count = groupedInsights[branch]?.length || 0;
              if (count === 0) return null;
              return (
                <button
                  key={branch}
                  onClick={() => setActiveBranch(branch)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all ${
                    activeBranch === branch
                      ? "text-background"
                      : "bg-background-tertiary text-foreground-muted hover:text-foreground border border-border"
                  }`}
                  style={
                    activeBranch === branch
                      ? { backgroundColor: BRANCH_COLORS[branch] }
                      : undefined
                  }
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: BRANCH_COLORS[branch] }}
                  />
                  {BRANCH_LABELS[branch]}
                  <span className="text-xs opacity-60">({count})</span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {viewMode === "grid" ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {filteredInsights.map((insight, index) => (
                  <InsightCard
                    key={insight.id}
                    insight={insight}
                    index={index}
                    showShadow={showShadow}
                    onClick={() => setSelectedInsight(insight)}
                    connections={
                      showConnections
                        ? insight.connections.map((c) => {
                            const target = data.insights.find((i) => i.id === c.targetId);
                            return target?.title || "";
                          }).filter(Boolean)
                        : []
                    }
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="tree"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <TreeVisualization
                  insights={filteredInsights}
                  allInsights={data.insights}
                  showConnections={showConnections}
                  showShadow={showShadow}
                  onInsightClick={setSelectedInsight}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Insight detail modal */}
      <AnimatePresence>
        {selectedInsight && (
          <InsightDetail
            insight={selectedInsight}
            allInsights={data.insights}
            showShadow={showShadow}
            onClose={() => setSelectedInsight(null)}
            onNavigate={(id) => {
              const next = data.insights.find((i) => i.id === id);
              if (next) setSelectedInsight(next);
            }}
          />
        )}
      </AnimatePresence>

      {/* Stats footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-foreground-subtle">
            <div className="flex items-center gap-6">
              <span>{data.insights.length} insights</span>
              <span>
                {data.insights.reduce((acc, i) => acc + i.connections.length, 0)} connections
              </span>
              <span>
                Spanning {Math.min(...data.insights.map((i) => i.temporal.year))} -{" "}
                {Math.max(...data.insights.map((i) => i.temporal.year))}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Constantly evolving</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
