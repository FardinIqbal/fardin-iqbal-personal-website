"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Brain,
  Target,
  AlertTriangle,
  Flame,
  Moon,
  Compass,
  Lock,
  Eye,
  TrendingUp,
  Clock,
  Zap,
  Heart,
  Shield
} from "lucide-react";

// Insight card component
function InsightCard({
  title,
  icon: Icon,
  children,
  color = "primary",
  delay = 0
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  color?: "primary" | "amber" | "rose" | "emerald" | "purple";
  delay?: number;
}) {
  const colors = {
    primary: "from-primary-500/20 to-primary-500/5 border-primary-500/30",
    amber: "from-amber-500/20 to-amber-500/5 border-amber-500/30",
    rose: "from-rose-500/20 to-rose-500/5 border-rose-500/30",
    emerald: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30",
    purple: "from-purple-500/20 to-purple-500/5 border-purple-500/30",
  };

  const iconColors = {
    primary: "text-primary-400",
    amber: "text-amber-400",
    rose: "text-rose-400",
    emerald: "text-emerald-400",
    purple: "text-purple-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`p-6 rounded-2xl bg-gradient-to-br ${colors[color]} border backdrop-blur-sm`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg bg-background/50 ${iconColors[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      <div className="text-foreground-muted space-y-3 text-sm leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
}

function PatternItem({ pattern, implication }: { pattern: string; implication: string }) {
  return (
    <div className="flex gap-3 py-2 border-b border-white/5 last:border-0">
      <div className="w-1.5 h-1.5 rounded-full bg-foreground-subtle mt-2 flex-shrink-0" />
      <div>
        <p className="text-foreground">{pattern}</p>
        <p className="text-foreground-subtle text-xs mt-1">{implication}</p>
      </div>
    </div>
  );
}

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to site</span>
          </Link>
          <div className="flex items-center gap-2 text-foreground-subtle text-sm">
            <Lock className="w-4 h-4" />
            <span>Private</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6"
          >
            <Eye className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-400">For Your Eyes Only</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Deep </span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Self-Insights
            </span>
          </h1>
          <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
            Patterns, triggers, and observations from your journal analysis.
            The things you might not see about yourself.
          </p>
        </motion.div>

        {/* Core Insight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-12 p-8 rounded-3xl bg-gradient-to-br from-rose-500/10 via-purple-500/10 to-primary-500/10 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-rose-500/20">
              <Brain className="w-6 h-6 text-rose-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">The Core Avoidance Loop</h2>
              <p className="text-foreground-subtle text-sm">The pattern underneath the patterns</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-sm mb-6">
            {["Fear of failure", "Don't attempt", "Dream stays alive", "Guilt builds", "Procrastinate", "Feel worse", "Fear grows", "Repeat"].map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-background/50 text-foreground-muted">
                  {step}
                </span>
                {i < 7 && <span className="text-foreground-subtle">→</span>}
              </div>
            ))}
          </div>

          <p className="text-foreground-muted text-center">
            <strong className="text-foreground">Key insight:</strong> Not trading keeps trading as a potential escape.
            Actually trading and failing would remove the backup plan. The paralysis is protective.
          </p>
        </motion.div>

        {/* Insights Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <InsightCard title="Productivity Blockers" icon={Clock} color="amber" delay={0.4}>
            <PatternItem
              pattern="Late waking (after 12pm)"
              implication="Misses trading window, compounds guilt throughout the day"
            />
            <PatternItem
              pattern="Phone scrolling (~6 hours/day)"
              implication="Primary time sink, escape mechanism"
            />
            <PatternItem
              pattern="Break degeneration"
              implication="2-3 weeks into any break, habits collapse"
            />
            <PatternItem
              pattern="Paper trading vs real"
              implication="Avoidance of high-stakes commitment"
            />
          </InsightCard>

          <InsightCard title="Emotional Triggers" icon={Flame} color="rose" delay={0.5}>
            <PatternItem
              pattern="Others succeeding"
              implication="Triggers comparison, self-worth tied to relative position"
            />
            <PatternItem
              pattern="Not invited to events"
              implication="Feeling peripheral, need to feel vital/special"
            />
            <PatternItem
              pattern="Teaching parents tech"
              implication="Explosive anger - unresolved childhood dynamic"
            />
            <PatternItem
              pattern="Relaxation"
              implication="Triggers guilt - worth = productivity"
            />
          </InsightCard>

          <InsightCard title="Environment Effects" icon={Compass} color="emerald" delay={0.6}>
            <PatternItem
              pattern="Temporary spaces (home during break)"
              implication="Can't focus, leaves mess, nothing feels permanent"
            />
            <PatternItem
              pattern="Stable, familiar spaces"
              implication="Most productive, can build routines"
            />
            <PatternItem
              pattern="Cluttered room"
              implication="Leads to cluttered mind - environment shapes state"
            />
            <PatternItem
              pattern="Group settings"
              implication="Surface-level only; deeper connection in 1-on-1"
            />
          </InsightCard>

          <InsightCard title="Goal Pursuit Patterns" icon={Target} color="purple" delay={0.7}>
            <PatternItem
              pattern="Multiple goals, uneven follow-through"
              implication="Previous years had too many goals"
            />
            <PatternItem
              pattern="Plans meticulously, doesn't execute"
              implication="Rarely follows the calendar"
            />
            <PatternItem
              pattern="BJJ/gym consistent, trading not"
              implication="Physical habits stick, financial don't"
            />
            <PatternItem
              pattern="Content ideas abundant"
              implication="Editing bottleneck - switched to reels as workaround"
            />
          </InsightCard>
        </div>

        {/* Shadow Work Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-foreground/10">
              <Shield className="w-5 h-5 text-foreground-muted" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Shadow Work</h2>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-background-secondary border border-border">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Intellectual Identity Protection
              </h4>
              <p className="text-foreground-muted text-sm">
                When you don't know something, there's a tendency to exaggerate or make things up.
                This protects the identity of being the "smart one" but creates distance from authentic connection.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-background-secondary border border-border">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                Worth = Productivity Equation
              </h4>
              <p className="text-foreground-muted text-sm">
                Relaxation triggers guilt because your self-worth is tied to output.
                This makes rest feel like failure, creating a cycle of burnout and shame.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-background-secondary border border-border">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-400" />
                The Trading Paradox
              </h4>
              <p className="text-foreground-muted text-sm">
                Trading remains a "potential escape" as long as you don't actually commit to it.
                Succeeding would prove capability; failing would remove the fantasy.
                Paper trading keeps both possibilities alive without risking either.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Paths Forward */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-primary-500/10 border border-emerald-500/20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-emerald-500/20">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Leverage Points</h2>
              <p className="text-foreground-subtle text-sm">What might actually move the needle</p>
            </div>
          </div>

          <div className="space-y-4 text-foreground-muted">
            <div className="flex gap-3">
              <span className="text-emerald-400 font-bold">1.</span>
              <p><strong className="text-foreground">Physical habits as anchor:</strong> BJJ and gym are consistent. Use these as the foundation - schedule other commitments around them, not the reverse.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-emerald-400 font-bold">2.</span>
              <p><strong className="text-foreground">Environment design:</strong> You're highly sensitive to environment. Invest in making your space feel permanent and ordered, even during breaks at home.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-emerald-400 font-bold">3.</span>
              <p><strong className="text-foreground">One goal, not many:</strong> Historical pattern shows too many goals leads to none. Pick the single most important thing and protect it ruthlessly.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-emerald-400 font-bold">4.</span>
              <p><strong className="text-foreground">Make it real:</strong> The paper trading pattern applies everywhere. At some point, you have to make the real trade, publish the real content, send the real message. The fantasy is comfortable but static.</p>
            </div>
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-foreground-subtle text-sm mt-12"
        >
          These insights are synthesized from your journal entries and patterns observed over time.
          <br />
          They're meant to illuminate, not judge. Growth comes from seeing clearly.
        </motion.p>
      </main>
    </div>
  );
}
