"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Insight, ThematicBranch, BRANCH_COLORS } from "@/types/arboretum";

interface TreeVisualizationProps {
  insights: Insight[];
  allInsights: Insight[];
  showConnections: boolean;
  showShadow: boolean;
  onInsightClick: (insight: Insight) => void;
}

interface NodePosition {
  x: number;
  y: number;
  insight: Insight;
}

const BRANCH_ANGLES: Record<ThematicBranch, number> = {
  relationships: -60,
  career: -30,
  trauma: 180,
  joy: 30,
  growth: 0,
  identity: 60,
  purpose: -90,
};

export function TreeVisualization({
  insights,
  allInsights,
  showConnections,
  showShadow,
  onInsightClick,
}: TreeVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: Math.max(600, window.innerHeight - 300),
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Calculate node positions
  const nodePositions = useMemo(() => {
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    const positions: NodePosition[] = [];

    // Group by branch
    const byBranch = insights.reduce((acc, insight) => {
      if (!acc[insight.branch]) acc[insight.branch] = [];
      acc[insight.branch].push(insight);
      return acc;
    }, {} as Record<ThematicBranch, Insight[]>);

    Object.entries(byBranch).forEach(([branch, branchInsights]) => {
      const angle = (BRANCH_ANGLES[branch as ThematicBranch] * Math.PI) / 180;
      const branchLength = Math.min(dimensions.width, dimensions.height) * 0.35;

      branchInsights.forEach((insight, i) => {
        const isFoundational = insight.temporal.isFoundational;
        const distance = isFoundational
          ? 30 + Math.random() * 40
          : 80 + (i / branchInsights.length) * branchLength;

        const spreadAngle = angle + (Math.random() - 0.5) * 0.4;
        const x = centerX + Math.cos(spreadAngle) * distance;
        const y = centerY + Math.sin(spreadAngle) * distance;

        positions.push({ x, y, insight });
      });
    });

    return positions;
  }, [insights, dimensions]);

  // Get position by insight ID
  const getPosition = (id: string) => {
    return nodePositions.find((p) => p.insight.id === id);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl bg-background-secondary border border-border overflow-hidden"
      style={{ height: dimensions.height }}
    >
      <svg
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0"
      >
        {/* Grid pattern */}
        <defs>
          <pattern
            id="tree-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-border"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tree-grid)" opacity="0.5" />

        {/* Center trunk */}
        <circle
          cx={dimensions.width / 2}
          cy={dimensions.height / 2}
          r={20}
          className="fill-emerald-500/20 stroke-emerald-500/40"
          strokeWidth={2}
        />

        {/* Connections */}
        {showConnections &&
          nodePositions.map(({ insight }) =>
            insight.connections.map((conn) => {
              const target = getPosition(conn.targetId);
              const source = getPosition(insight.id);
              if (!target || !source) return null;

              const isHighlighted =
                hoveredId === insight.id || hoveredId === conn.targetId;

              return (
                <motion.line
                  key={`${insight.id}-${conn.targetId}`}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={BRANCH_COLORS[insight.branch]}
                  strokeWidth={isHighlighted ? 2 : 1}
                  strokeOpacity={isHighlighted ? 0.6 : conn.strength * 0.3}
                  strokeDasharray={conn.type === "echoes" ? "4 4" : undefined}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
              );
            })
          )}

        {/* Branch lines to center */}
        {nodePositions.map(({ x, y, insight }) => (
          <line
            key={`branch-${insight.id}`}
            x1={dimensions.width / 2}
            y1={dimensions.height / 2}
            x2={x}
            y2={y}
            stroke={BRANCH_COLORS[insight.branch]}
            strokeWidth={1}
            strokeOpacity={0.1}
          />
        ))}
      </svg>

      {/* Nodes */}
      {nodePositions.map(({ x, y, insight }, index) => {
        const isHovered = hoveredId === insight.id;
        const size = insight.temporal.isFoundational
          ? 16
          : 10 + insight.emotion.intensity * 10;

        return (
          <motion.button
            key={insight.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.02 }}
            onClick={() => onInsightClick(insight)}
            onMouseEnter={() => setHoveredId(insight.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="absolute -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: x, top: y }}
          >
            <motion.div
              animate={{
                scale: isHovered ? 1.3 : 1,
                boxShadow: isHovered
                  ? `0 0 20px ${BRANCH_COLORS[insight.branch]}60`
                  : "none",
              }}
              className="rounded-full transition-colors"
              style={{
                width: size,
                height: size,
                backgroundColor: showShadow && insight.shadowSelf
                  ? "#8b5cf6"
                  : BRANCH_COLORS[insight.branch],
                border: insight.temporal.isFoundational
                  ? "2px solid rgba(255,255,255,0.3)"
                  : undefined,
              }}
            />

            {/* Tooltip */}
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-background border border-border rounded-lg shadow-xl z-10 whitespace-nowrap pointer-events-none"
              >
                <p className="text-sm font-medium text-foreground">
                  {insight.title}
                </p>
                <p className="text-xs text-foreground-subtle capitalize">
                  {insight.branch} | {insight.temporal.year}
                </p>
              </motion.div>
            )}
          </motion.button>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 p-3 bg-background/80 backdrop-blur-sm border border-border rounded-lg">
        <p className="text-xs text-foreground-subtle mb-2">Branches</p>
        <div className="flex flex-wrap gap-2">
          {(Object.entries(BRANCH_COLORS) as [ThematicBranch, string][]).map(
            ([branch, color]) => {
              const count = insights.filter((i) => i.branch === branch).length;
              if (count === 0) return null;
              return (
                <div key={branch} className="flex items-center gap-1">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-xs text-foreground-subtle capitalize">
                    {branch}
                  </span>
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* Node count */}
      <div className="absolute bottom-4 right-4 px-3 py-2 bg-background/80 backdrop-blur-sm border border-border rounded-lg">
        <p className="text-sm text-foreground-subtle">
          {insights.length} nodes
        </p>
      </div>
    </div>
  );
}
