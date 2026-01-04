"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, GitCommit, Star, GitFork } from "lucide-react";
import Link from "next/link";

interface GitHubStats {
  totalContributions: number;
  currentStreak: number;
  recentActivity: {
    type: string;
    repo: string;
    date: string;
  }[];
}

export function GitHubActivity() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated data - in production, fetch from GitHub API
    // You'd need a server endpoint to avoid exposing tokens
    const mockStats: GitHubStats = {
      totalContributions: 847,
      currentStreak: 12,
      recentActivity: [
        { type: "push", repo: "neo-provider", date: "2 hours ago" },
        { type: "push", repo: "FardinIqbal.github.io", date: "5 hours ago" },
        { type: "star", repo: "anthropics/claude-code", date: "1 day ago" },
      ],
    };

    // Simulate loading
    setTimeout(() => {
      setStats(mockStats);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-24 bg-background-tertiary rounded-lg" />
      </div>
    );
  }

  if (!stats) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl border border-border/50 bg-background-secondary/30"
    >
      <div className="flex items-center gap-2 mb-4">
        <Github className="w-4 h-4 text-foreground-subtle" />
        <span className="text-sm font-medium text-foreground-muted">GitHub Activity</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-2xl font-semibold text-foreground">{stats.totalContributions}</p>
          <p className="text-xs text-foreground-subtle">contributions this year</p>
        </div>
        <div>
          <p className="text-2xl font-semibold text-foreground">{stats.currentStreak}</p>
          <p className="text-xs text-foreground-subtle">day streak</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-2">
        {stats.recentActivity.map((activity, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            {activity.type === "push" && <GitCommit className="w-3 h-3 text-green-400" />}
            {activity.type === "star" && <Star className="w-3 h-3 text-yellow-400" />}
            {activity.type === "fork" && <GitFork className="w-3 h-3 text-blue-400" />}
            <span className="text-foreground-muted truncate">{activity.repo}</span>
            <span className="text-foreground-subtle ml-auto flex-shrink-0">{activity.date}</span>
          </div>
        ))}
      </div>

      {/* Link */}
      <Link
        href="https://github.com/FardinIqbal"
        target="_blank"
        className="block mt-4 text-xs text-foreground-subtle hover:text-foreground transition-colors"
      >
        View on GitHub →
      </Link>
    </motion.div>
  );
}

// Contribution graph visualization
export function ContributionGraph() {
  // Generate mock contribution data for the last 52 weeks
  const weeks = Array.from({ length: 52 }, () =>
    Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))
  );

  const getColor = (level: number) => {
    const colors = [
      "bg-background-tertiary",
      "bg-green-900/50",
      "bg-green-700/60",
      "bg-green-500/70",
      "bg-green-400",
    ];
    return colors[level] || colors[0];
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-[3px] min-w-max">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[3px]">
            {week.map((day, dayIndex) => (
              <motion.div
                key={dayIndex}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: weekIndex * 0.01 + dayIndex * 0.01 }}
                className={`w-[10px] h-[10px] rounded-sm ${getColor(day)}`}
                title={`${day} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
