"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArboretumData, Insight, BRANCH_COLORS } from "@/types/arboretum";
import { PasswordGate } from "./PasswordGate";
import { ComprehensiveReport } from "./ComprehensiveReport";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  TreeDeciduous,
  FileText,
  Sparkles,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface ArboretumPageProps {
  data: ArboretumData;
}

export function ArboretumPage({ data }: ArboretumPageProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<"insights" | "report">("insights");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("arboretum_auth");
    setIsAuthenticated(stored === "a]k#9Xm$2pL@vR7n");
  }, []);

  // Sort insights by year (newest first), then by creation date
  const sortedInsights = [...data.insights].sort((a, b) => {
    if (b.temporal.year !== a.temporal.year) {
      return b.temporal.year - a.temporal.year;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Group by year for timeline
  const insightsByYear = sortedInsights.reduce((acc, insight) => {
    const year = insight.temporal.year;
    if (!acc[year]) acc[year] = [];
    acc[year].push(insight);
    return acc;
  }, {} as Record<number, Insight[]>);

  const years = Object.keys(insightsByYear)
    .map(Number)
    .sort((a, b) => b - a);

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

  if (!isAuthenticated) {
    return <PasswordGate onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-16">
        {/* Sub-header with tabs */}
        <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              <div className="flex items-center gap-3">
                <TreeDeciduous className="w-5 h-5 text-emerald-500" />
                <h1 className="text-lg font-semibold text-foreground">The Arboretum</h1>
              </div>

              {/* Tab Navigation */}
              <div className="relative flex items-center gap-1 bg-background-tertiary rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("insights")}
                  className="relative flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors z-10"
                >
                  {activeTab === "insights" && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-background rounded-md"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  <span
                    className={`relative z-10 flex items-center gap-2 transition-colors ${
                      activeTab === "insights"
                        ? "text-foreground"
                        : "text-foreground-subtle hover:text-foreground"
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span className="hidden sm:inline">Insights</span>
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("report")}
                  className="relative flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors z-10"
                >
                  {activeTab === "report" && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-background rounded-md"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  <span
                    className={`relative z-10 flex items-center gap-2 transition-colors ${
                      activeTab === "report"
                        ? "text-foreground"
                        : "text-foreground-subtle hover:text-foreground"
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span className="hidden sm:inline">Full Report</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

      <AnimatePresence mode="wait">
        {activeTab === "insights" ? (
          <motion.main
            key="insights"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="py-8"
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Intro */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-foreground-muted mb-12 max-w-2xl"
              >
                Observations and patterns synthesized from journal entries and conversations.
                A living record of insights about the self.
              </motion.p>

              {/* Timeline */}
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

                {years.map((year, yearIndex) => (
                  <motion.div
                    key={year}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: yearIndex * 0.1 }}
                    className="mb-12"
                  >
                    {/* Year marker */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center relative z-10">
                        <Calendar className="w-4 h-4 text-emerald-500" />
                      </div>
                      <h2 className="text-xl font-semibold text-foreground">{year}</h2>
                      <span className="text-sm text-foreground-subtle">
                        {insightsByYear[year].length} insight{insightsByYear[year].length !== 1 ? "s" : ""}
                      </span>
                    </div>

                    {/* Insights for this year */}
                    <div className="space-y-4 ml-12">
                      {insightsByYear[year].map((insight, index) => (
                        <InsightTimelineCard
                          key={insight.id}
                          insight={insight}
                          index={index}
                          isExpanded={expandedId === insight.id}
                          onToggle={() =>
                            setExpandedId(expandedId === insight.id ? null : insight.id)
                          }
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Status indicator */}
              <div className="mt-16 flex items-center justify-center gap-2 text-sm text-foreground-subtle">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Constantly evolving</span>
              </div>
            </div>
          </motion.main>
        ) : (
          <motion.main
            key="report"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="py-8"
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <ComprehensiveReport data={data} />
            </div>
          </motion.main>
        )}
      </AnimatePresence>
      </div>
      <Footer />
    </>
  );
}

function InsightTimelineCard({
  insight,
  index,
  isExpanded,
  onToggle,
}: {
  insight: Insight;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const branchColor = BRANCH_COLORS[insight.branch];

  return (
    <motion.article
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-background-secondary border border-border rounded-xl overflow-hidden hover:border-foreground-subtle transition-colors"
    >
      <button
        onClick={onToggle}
        className="w-full p-5 text-left flex items-start justify-between gap-4"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: branchColor }}
            />
            <span className="text-xs text-foreground-subtle capitalize">
              {insight.branch}
            </span>
            {insight.temporal.isFoundational && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
                Foundational
              </span>
            )}
          </div>
          <h3 className="text-foreground font-medium">{insight.title}</h3>
          {!isExpanded && (
            <p className="text-sm text-foreground-muted mt-1 line-clamp-2">
              {insight.content}
            </p>
          )}
        </div>
        <div className="flex-shrink-0 text-foreground-subtle">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0 space-y-4">
              <p className="text-foreground-muted leading-relaxed whitespace-pre-wrap">
                {insight.content}
              </p>

              {insight.shadowSelf && (
                <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20">
                  <p className="text-xs text-purple-400 font-medium mb-1">Shadow Self</p>
                  <p className="text-sm text-foreground-muted">
                    {insight.shadowSelf.inversion}
                  </p>
                  {insight.shadowSelf.underlyingFear && (
                    <p className="text-xs text-purple-400/70 mt-2">
                      Underlying fear: {insight.shadowSelf.underlyingFear}
                    </p>
                  )}
                </div>
              )}

              {insight.microWorld?.narrative && (
                <div className="p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
                  <p className="text-xs text-cyan-400 font-medium mb-1">Deeper Narrative</p>
                  <p className="text-sm text-foreground-muted italic">
                    {insight.microWorld.narrative}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-2">
                {insight.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-background-tertiary text-foreground-subtle"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
