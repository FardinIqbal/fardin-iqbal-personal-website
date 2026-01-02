"use client";

import { motion } from "framer-motion";
import { Moon, Link, Waves } from "lucide-react";
import { ArboretumViewState, ThematicBranch } from "@/types/arboretum";

interface ControlPanelProps {
  viewState: ArboretumViewState;
  onToggleShadow: () => void;
  onToggleConnections: () => void;
  branches: ThematicBranch[];
}

export function ControlPanel({
  viewState,
  onToggleShadow,
  onToggleConnections,
}: ControlPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-auto"
    >
      <div className="flex flex-col gap-2 p-3 rounded-xl bg-background-secondary/50 backdrop-blur-sm border border-border">
        {/* Shadow Self Toggle */}
        <button
          onClick={onToggleShadow}
          className={`p-3 rounded-lg transition-all ${
            viewState.shadowMode
              ? "bg-purple-500/20 border border-purple-500/40 text-purple-400"
              : "bg-background-tertiary/50 border border-transparent text-foreground-muted hover:text-foreground"
          }`}
          title="Toggle Shadow Self"
        >
          <Moon className="w-5 h-5" />
        </button>

        {/* Connections Toggle */}
        <button
          onClick={onToggleConnections}
          className={`p-3 rounded-lg transition-all ${
            viewState.showConnections
              ? "bg-blue-500/20 border border-blue-500/40 text-blue-400"
              : "bg-background-tertiary/50 border border-transparent text-foreground-muted hover:text-foreground"
          }`}
          title="Show Memory Threads"
        >
          <Link className="w-5 h-5" />
        </button>

        {/* Echo Mode Toggle */}
        <button
          className={`p-3 rounded-lg transition-all ${
            viewState.echoMode
              ? "bg-red-500/20 border border-red-500/40 text-red-400"
              : "bg-background-tertiary/50 border border-transparent text-foreground-muted hover:text-foreground"
          }`}
          title="Echo Chamber (coming soon)"
          disabled
        >
          <Waves className="w-5 h-5" />
        </button>
      </div>

      {/* Labels */}
      <div className="mt-4 text-right">
        {viewState.shadowMode && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-purple-400"
          >
            Shadow Self Active
          </motion.p>
        )}
        {viewState.showConnections && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-blue-400"
          >
            Connections Visible
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
