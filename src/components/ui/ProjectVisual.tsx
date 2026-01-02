"use client";

import { cn } from "@/lib/utils";

interface ProjectVisualProps {
  projectId: string;
  category: string;
  className?: string;
}

// Memory Allocator - memory blocks grid with animation
function MemoryAllocatorVisual() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <defs>
        <linearGradient id="mem-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(239 68 68 / 0.3)" />
          <stop offset="100%" stopColor="rgb(249 115 22 / 0.2)" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />
      {/* Memory blocks with staggered animation */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((row) =>
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((col) => {
          const isAllocated = (row + col) % 3 === 0 || (row * col) % 5 === 0;
          return (
            <rect
              key={`${row}-${col}`}
              x={20 + col * 30}
              y={15 + row * 22}
              width="26"
              height="18"
              rx="2"
              fill={isAllocated ? "url(#mem-grad)" : "rgb(var(--color-border))"}
              opacity={isAllocated ? 1 : 0.3}
              className={isAllocated ? "animate-pulse-glow" : ""}
              style={{ animationDelay: `${(row + col) * 0.1}s` }}
            />
          );
        })
      )}
      {/* Pointer arrows with flow animation */}
      <path d="M60 100 L90 100 L85 95 M90 100 L85 105" stroke="rgb(239 68 68 / 0.6)" strokeWidth="2" fill="none" className="animate-data-flow" />
      <path d="M180 60 L180 90 L175 85 M180 90 L185 85" stroke="rgb(249 115 22 / 0.6)" strokeWidth="2" fill="none" className="animate-data-flow" style={{ animationDelay: "0.5s" }} />
    </svg>
  );
}

// Game Server - network nodes with connections and animations
function GameServerVisual() {
  const nodes = [
    { x: 200, y: 100, r: 20, main: true },
    { x: 80, y: 60, r: 12 },
    { x: 320, y: 60, r: 12 },
    { x: 80, y: 140, r: 12 },
    { x: 320, y: 140, r: 12 },
    { x: 140, y: 40, r: 8 },
    { x: 260, y: 40, r: 8 },
    { x: 140, y: 160, r: 8 },
    { x: 260, y: 160, r: 8 },
  ];
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />
      {/* Connection lines with data flow animation */}
      {nodes.slice(1).map((node, i) => (
        <line
          key={i}
          x1={200}
          y1={100}
          x2={node.x}
          y2={node.y}
          stroke="rgb(239 68 68 / 0.3)"
          strokeWidth="1"
          className="animate-data-flow"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
      {/* Nodes with pulse animation */}
      {nodes.map((node, i) => (
        <g key={i}>
          <circle
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill={node.main ? "rgb(239 68 68 / 0.2)" : "rgb(var(--color-border))"}
            stroke={node.main ? "rgb(239 68 68 / 0.6)" : "rgb(var(--color-foreground-subtle))"}
            strokeWidth={node.main ? 2 : 1}
            className={node.main ? "animate-pulse-glow" : ""}
          />
          {/* Ping effect for non-main nodes */}
          {!node.main && (
            <circle
              cx={node.x}
              cy={node.y}
              r={node.r + 3}
              fill="none"
              stroke="rgb(239 68 68 / 0.3)"
              strokeWidth="1"
              className="animate-pulse-glow"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          )}
          {node.main && (
            <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="10" fill="rgb(239 68 68)">
              S
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

// Movie Revenue - bar chart with film reel and animations
function MovieRevenueVisual() {
  const bars = [65, 85, 45, 95, 70, 55, 80, 60, 90, 50];
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />
      {/* Bars with staggered pulse animation */}
      {bars.map((h, i) => (
        <rect
          key={i}
          x={40 + i * 35}
          y={180 - h * 1.5}
          width="25"
          height={h * 1.5}
          rx="2"
          fill={`rgb(168 85 247 / ${0.3 + (h / 100) * 0.4})`}
          className="animate-pulse-glow"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
      {/* Film reel accent with rotation */}
      <g style={{ transformOrigin: "350px 40px" }} className="animate-rotate-slow">
        <circle cx="350" cy="40" r="25" fill="none" stroke="rgb(168 85 247 / 0.4)" strokeWidth="3" />
        <circle cx="350" cy="40" r="8" fill="rgb(168 85 247 / 0.3)" className="animate-pulse-glow" />
        {/* Film reel holes - pre-calculated positions */}
        <circle cx={367} cy={40} r="4" fill="rgb(var(--color-background-tertiary))" />
        <circle cx={358.5} cy={54.72} r="4" fill="rgb(var(--color-background-tertiary))" />
        <circle cx={341.5} cy={54.72} r="4" fill="rgb(var(--color-background-tertiary))" />
        <circle cx={333} cy={40} r="4" fill="rgb(var(--color-background-tertiary))" />
        <circle cx={341.5} cy={25.28} r="4" fill="rgb(var(--color-background-tertiary))" />
        <circle cx={358.5} cy={25.28} r="4" fill="rgb(var(--color-background-tertiary))" />
      </g>
    </svg>
  );
}

// Energy Demand - lightning with chart and animations
function EnergyDemandVisual() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />
      {/* Wave chart with flowing animation */}
      <path
        d="M20 150 Q60 100, 100 120 T180 90 T260 110 T340 70 T380 90"
        className="animate-data-flow"
        fill="none"
        stroke="rgb(168 85 247 / 0.4)"
        strokeWidth="2"
      />
      <path
        d="M20 150 Q60 100, 100 120 T180 90 T260 110 T340 70 T380 90 L380 180 L20 180 Z"
        fill="rgb(168 85 247 / 0.1)"
      />
      {/* Lightning bolt */}
      <path
        d="M320 30 L290 80 L310 80 L280 130 L340 70 L315 70 L340 30 Z"
        fill="rgb(250 204 21 / 0.3)"
        stroke="rgb(250 204 21 / 0.6)"
        strokeWidth="1"
      />
    </svg>
  );
}

// Spectrum Analyzer - waveform visualization
function SpectrumAnalyzerVisual() {
  const frequencies = [30, 50, 70, 90, 80, 60, 85, 95, 75, 55, 40, 60, 80, 70, 45, 65, 85, 55, 35, 50];
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />
      {/* Spectrum bars */}
      {frequencies.map((h, i) => (
        <rect
          key={i}
          x={20 + i * 19}
          y={100 - h / 2}
          width="15"
          height={h}
          rx="2"
          fill={`hsl(${260 + i * 5}, 70%, ${50 + (h / 100) * 20}%)`}
          opacity={0.6}
        />
      ))}
      {/* Stars */}
      {[{ x: 350, y: 40 }, { x: 370, y: 60 }, { x: 340, y: 70 }, { x: 360, y: 30 }].map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r="2" fill="rgb(168 85 247 / 0.6)" />
      ))}
    </svg>
  );
}

// FairShare - split money visualization
function FairShareVisual() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />
      {/* Main circle split into sections */}
      <circle cx="200" cy="100" r="70" fill="none" stroke="rgb(59 130 246 / 0.3)" strokeWidth="2" />
      <path d="M200 30 L200 100 L270 100 A70 70 0 0 0 200 30" fill="rgb(59 130 246 / 0.2)" />
      <path d="M200 100 L200 170 L130 100 A70 70 0 0 1 200 170" fill="rgb(34 197 94 / 0.2)" />
      <path d="M200 100 L130 100 A70 70 0 0 1 200 30" fill="rgb(168 85 247 / 0.2)" />
      <path d="M200 100 L270 100 A70 70 0 0 1 200 170" fill="rgb(249 115 22 / 0.2)" />
      {/* Dollar sign */}
      <text x="200" y="108" textAnchor="middle" fontSize="24" fill="rgb(var(--color-foreground-subtle))" fontWeight="bold">
        $
      </text>
      {/* Small person icons */}
      {[{ x: 80, y: 60 }, { x: 320, y: 60 }, { x: 80, y: 140 }, { x: 320, y: 140 }].map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y - 8} r="8" fill="rgb(var(--color-border))" />
          <path d={`M${p.x - 10} ${p.y + 15} Q${p.x} ${p.y}, ${p.x + 10} ${p.y + 15}`} fill="rgb(var(--color-border))" />
        </g>
      ))}
    </svg>
  );
}

// MindMesh - neural network / mind map
function MindMeshVisual() {
  const nodes = [
    { x: 200, y: 100, r: 15, color: "59 130 246" },
    { x: 120, y: 60, r: 10, color: "168 85 247" },
    { x: 280, y: 60, r: 10, color: "34 197 94" },
    { x: 100, y: 130, r: 8, color: "249 115 22" },
    { x: 300, y: 130, r: 8, color: "236 72 153" },
    { x: 160, y: 160, r: 8, color: "6 182 212" },
    { x: 240, y: 160, r: 8, color: "250 204 21" },
    { x: 60, y: 80, r: 6, color: "168 85 247" },
    { x: 340, y: 80, r: 6, color: "34 197 94" },
  ];
  const connections = [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,7],[2,8],[1,3],[2,4]];
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />
      {/* Connections */}
      {connections.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="rgb(59 130 246 / 0.2)"
          strokeWidth="1"
        />
      ))}
      {/* Nodes */}
      {nodes.map((node, i) => (
        <circle
          key={i}
          cx={node.x}
          cy={node.y}
          r={node.r}
          fill={`rgb(${node.color} / 0.3)`}
          stroke={`rgb(${node.color} / 0.6)`}
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}

// Reddit Clone - upvote/comment thread
function RedditCloneVisual() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />
      {/* Post cards */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${40 + i * 120}, ${30 + i * 20})`}>
          <rect width="100" height="120" rx="4" fill="rgb(var(--color-border))" opacity="0.3" />
          {/* Upvote */}
          <path d="M15 60 L25 45 L35 60" fill="none" stroke="rgb(249 115 22 / 0.6)" strokeWidth="2" />
          <text x="25" y="75" textAnchor="middle" fontSize="10" fill="rgb(var(--color-foreground-subtle))">
            {42 - i * 10}
          </text>
          {/* Content lines */}
          <rect x="45" y="30" width="45" height="4" rx="2" fill="rgb(var(--color-foreground-subtle))" opacity="0.5" />
          <rect x="45" y="40" width="35" height="3" rx="1" fill="rgb(var(--color-foreground-subtle))" opacity="0.3" />
          <rect x="45" y="50" width="40" height="3" rx="1" fill="rgb(var(--color-foreground-subtle))" opacity="0.3" />
          {/* Comments */}
          <rect x="45" y="90" width="30" height="10" rx="2" fill="rgb(59 130 246 / 0.2)" />
        </g>
      ))}
    </svg>
  );
}

// Computational Geometry - triangulation
function GeometryVisual() {
  const points = [
    { x: 80, y: 40 }, { x: 200, y: 30 }, { x: 320, y: 50 },
    { x: 60, y: 100 }, { x: 150, y: 120 }, { x: 250, y: 100 }, { x: 340, y: 110 },
    { x: 100, y: 170 }, { x: 200, y: 160 }, { x: 300, y: 175 },
  ];
  const triangles = [
    [0, 1, 4], [1, 2, 5], [0, 3, 4], [2, 5, 6],
    [3, 4, 7], [4, 5, 8], [5, 6, 9], [7, 8, 4], [8, 9, 5],
  ];
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />
      {/* Triangles */}
      {triangles.map((t, i) => (
        <polygon
          key={i}
          points={t.map(pi => `${points[pi].x},${points[pi].y}`).join(' ')}
          fill={`hsl(${140 + i * 15}, 60%, 50%)`}
          fillOpacity="0.15"
          stroke="rgb(34 197 94 / 0.4)"
          strokeWidth="1"
        />
      ))}
      {/* Points */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="rgb(34 197 94 / 0.6)" />
      ))}
    </svg>
  );
}

// Print Spooler - queue visualization
function PrintSpoolerVisual() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />
      {/* Printer */}
      <rect x="280" y="70" width="80" height="60" rx="4" fill="rgb(var(--color-border))" />
      <rect x="290" y="50" width="60" height="25" rx="2" fill="rgb(var(--color-border))" opacity="0.6" />
      <rect x="295" y="130" width="50" height="8" rx="1" fill="rgb(239 68 68 / 0.3)" />
      {/* Queue items */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={40 + i * 55} y={80} width="45" height="40" rx="2" fill="rgb(var(--color-border))" opacity={0.8 - i * 0.15} />
          <rect x={45 + i * 55} y={88} width="35" height="3" rx="1" fill="rgb(var(--color-foreground-subtle))" opacity="0.5" />
          <rect x={45 + i * 55} y={95} width="25" height="3" rx="1" fill="rgb(var(--color-foreground-subtle))" opacity="0.3" />
        </g>
      ))}
      {/* Arrow */}
      <path d="M250 100 L270 100 M265 95 L270 100 L265 105" stroke="rgb(239 68 68 / 0.5)" strokeWidth="2" fill="none" />
    </svg>
  );
}

// HTTP Server - request/response
function WebServerVisual() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />
      {/* Client */}
      <rect x="40" y="70" width="60" height="60" rx="4" fill="rgb(var(--color-border))" />
      <rect x="50" y="80" width="40" height="30" rx="2" fill="rgb(59 130 246 / 0.2)" />
      {/* Server */}
      <rect x="300" y="50" width="60" height="100" rx="4" fill="rgb(var(--color-border))" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx="330" cy={70 + i * 25} r="6" fill="rgb(34 197 94 / 0.4)" />
      ))}
      {/* Request arrow */}
      <path d="M110 85 L290 85" stroke="rgb(59 130 246 / 0.4)" strokeWidth="2" strokeDasharray="8 4" />
      <path d="M280 80 L290 85 L280 90" fill="rgb(59 130 246 / 0.4)" />
      <text x="200" y="78" textAnchor="middle" fontSize="10" fill="rgb(59 130 246 / 0.6)">GET /api</text>
      {/* Response arrow */}
      <path d="M290 115 L110 115" stroke="rgb(34 197 94 / 0.4)" strokeWidth="2" />
      <path d="M120 110 L110 115 L120 120" fill="rgb(34 197 94 / 0.4)" />
      <text x="200" y="130" textAnchor="middle" fontSize="10" fill="rgb(34 197 94 / 0.6)">200 OK</text>
    </svg>
  );
}

// TCP Flow - network packets
function TCPFlowVisual() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />
      {/* Flow lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <path
            d={`M30 ${40 + i * 30} Q200 ${50 + i * 25}, 370 ${35 + i * 32}`}
            fill="none"
            stroke={`hsl(${200 + i * 20}, 60%, 50%)`}
            strokeWidth="2"
            strokeOpacity="0.4"
          />
          {/* Packets */}
          {[0, 1, 2].map((j) => (
            <circle
              key={j}
              cx={80 + j * 100 + i * 10}
              cy={45 + i * 28 + j * 3}
              r="4"
              fill={`hsl(${200 + i * 20}, 60%, 50%)`}
              fillOpacity="0.6"
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

// OSM Parser - map grid
function OSMParserVisual() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />
      {/* Grid */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <line x1={40 + i * 60} y1="20" x2={40 + i * 60} y2="180" stroke="rgb(var(--color-border))" strokeWidth="1" />
          <line x1="20" y1={30 + i * 28} x2="380" y2={30 + i * 28} stroke="rgb(var(--color-border))" strokeWidth="1" />
        </g>
      ))}
      {/* Roads */}
      <path d="M40 80 Q150 90, 200 50 T340 100" fill="none" stroke="rgb(239 68 68 / 0.5)" strokeWidth="3" />
      <path d="M100 160 L100 80 L250 80" fill="none" stroke="rgb(239 68 68 / 0.4)" strokeWidth="2" />
      {/* POI markers */}
      {[{ x: 100, y: 80 }, { x: 200, y: 50 }, { x: 250, y: 80 }].map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="6" fill="rgb(249 115 22 / 0.5)" />
      ))}
    </svg>
  );
}

// Airbnb Analysis - buildings with location pins
function AirbnbVisual() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />
      {/* Buildings */}
      {[
        { x: 60, h: 80 }, { x: 100, h: 100 }, { x: 140, h: 60 },
        { x: 200, h: 120 }, { x: 240, h: 90 }, { x: 280, h: 70 }, { x: 320, h: 110 },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={180 - b.h} width="30" height={b.h} fill="rgb(168 85 247 / 0.2)" stroke="rgb(168 85 247 / 0.4)" />
          {/* Windows */}
          {Array.from({ length: Math.floor(b.h / 20) }).map((_, j) => (
            <rect key={j} x={b.x + 8} y={185 - b.h + 8 + j * 18} width="14" height="10" fill="rgb(250 204 21 / 0.3)" />
          ))}
        </g>
      ))}
      {/* Location pins */}
      {[{ x: 115, y: 50 }, { x: 215, y: 30 }, { x: 335, y: 40 }].map((p, i) => (
        <g key={i}>
          <path
            d={`M${p.x} ${p.y + 15} L${p.x} ${p.y + 5} A8 8 0 1 1 ${p.x} ${p.y + 5}`}
            fill="rgb(236 72 153 / 0.6)"
          />
          <circle cx={p.x} cy={p.y} r="4" fill="rgb(var(--color-background-tertiary))" />
        </g>
      ))}
    </svg>
  );
}

// VerseCraft - typography/quill
function VerseCraftVisual() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />
      {/* Paper */}
      <rect x="80" y="30" width="180" height="140" rx="2" fill="rgb(var(--color-border))" opacity="0.3" />
      {/* Text lines */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x="100"
          y={50 + i * 20}
          width={100 + Math.sin(i) * 40}
          height="4"
          rx="2"
          fill="rgb(var(--color-foreground-subtle))"
          opacity={0.3 + i * 0.1}
        />
      ))}
      {/* Quill */}
      <path
        d="M300 40 Q320 80, 310 140 L305 140 Q312 90, 295 55 Z"
        fill="rgb(59 130 246 / 0.3)"
        stroke="rgb(59 130 246 / 0.5)"
      />
      <path d="M305 140 L310 160 L315 140" fill="rgb(59 130 246 / 0.4)" />
    </svg>
  );
}

// RoomMatch - swipe cards
function RoomMatchVisual() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />
      {/* Stacked cards */}
      {[2, 1, 0].map((i) => (
        <g key={i} transform={`translate(${150 + i * 8}, ${30 + i * 5}) rotate(${(i - 1) * 5}, 50, 70)`}>
          <rect width="100" height="140" rx="8" fill="rgb(var(--color-border))" stroke="rgb(var(--color-foreground-subtle))" strokeOpacity="0.3" />
          <circle cx="50" cy="50" r="25" fill="rgb(59 130 246 / 0.2)" />
          <rect x="20" y="90" width="60" height="6" rx="3" fill="rgb(var(--color-foreground-subtle))" opacity="0.4" />
          <rect x="30" y="105" width="40" height="4" rx="2" fill="rgb(var(--color-foreground-subtle))" opacity="0.3" />
        </g>
      ))}
      {/* Swipe indicators */}
      <path d="M100 100 L70 100 M80 90 L70 100 L80 110" stroke="rgb(239 68 68 / 0.5)" strokeWidth="3" fill="none" />
      <path d="M300 100 L330 100 M320 90 L330 100 L320 110" stroke="rgb(34 197 94 / 0.5)" strokeWidth="3" fill="none" />
    </svg>
  );
}

// Cold Caller - classroom/list
function ColdCallerVisual() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />
      {/* List */}
      <rect x="40" y="30" width="150" height="140" rx="4" fill="rgb(var(--color-border))" opacity="0.3" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <circle cx="60" cy={55 + i * 25} r="8" fill={i === 2 ? "rgb(34 197 94 / 0.4)" : "rgb(var(--color-foreground-subtle))"} opacity={i === 2 ? 1 : 0.3} />
          <rect x="80" y={50 + i * 25} width="80" height="10" rx="2" fill="rgb(var(--color-foreground-subtle))" opacity={i === 2 ? 0.6 : 0.3} />
        </g>
      ))}
      {/* Microphone */}
      <ellipse cx="300" cy="100" rx="30" ry="45" fill="rgb(var(--color-border))" />
      <rect x="285" y="145" width="30" height="8" rx="4" fill="rgb(var(--color-border))" />
      <rect x="295" y="153" width="10" height="20" fill="rgb(var(--color-border))" />
      <rect x="280" y="170" width="40" height="5" rx="2" fill="rgb(var(--color-border))" />
      {/* Sound waves */}
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${340 + i * 15} 80 Q${350 + i * 15} 100, ${340 + i * 15} 120`}
          fill="none"
          stroke="rgb(34 197 94 / 0.4)"
          strokeWidth="2"
          opacity={1 - i * 0.25}
        />
      ))}
    </svg>
  );
}

// Trading Simulator - candlestick chart
function TradingVisual() {
  const candles = [
    { o: 100, c: 120, h: 130, l: 90 },
    { o: 120, c: 110, h: 125, l: 100 },
    { o: 110, c: 140, h: 145, l: 105 },
    { o: 140, c: 130, h: 150, l: 125 },
    { o: 130, c: 150, h: 160, l: 120 },
    { o: 150, c: 145, h: 160, l: 140 },
    { o: 145, c: 170, h: 175, l: 140 },
    { o: 170, c: 160, h: 180, l: 155 },
  ];
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />
      {/* Candles */}
      {candles.map((c, i) => {
        const isGreen = c.c > c.o;
        const bodyTop = Math.min(c.o, c.c);
        const bodyHeight = Math.abs(c.c - c.o);
        return (
          <g key={i}>
            {/* Wick */}
            <line
              x1={50 + i * 40}
              y1={200 - c.h}
              x2={50 + i * 40}
              y2={200 - c.l}
              stroke={isGreen ? "rgb(34 197 94 / 0.6)" : "rgb(239 68 68 / 0.6)"}
              strokeWidth="1"
            />
            {/* Body */}
            <rect
              x={40 + i * 40}
              y={200 - bodyTop - bodyHeight}
              width="20"
              height={Math.max(bodyHeight, 2)}
              fill={isGreen ? "rgb(34 197 94 / 0.4)" : "rgb(239 68 68 / 0.4)"}
              stroke={isGreen ? "rgb(34 197 94 / 0.6)" : "rgb(239 68 68 / 0.6)"}
            />
          </g>
        );
      })}
    </svg>
  );
}

// Default fallback - abstract pattern based on category
function DefaultVisual({ category }: { category: string }) {
  const colors: Record<string, string> = {
    systems: "239 68 68",
    ml: "168 85 247",
    web: "59 130 246",
    tools: "34 197 94",
  };
  const color = colors[category] || "99 102 241";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />
      {/* Abstract circles */}
      {[...Array(6)].map((_, i) => (
        <circle
          key={i}
          cx={60 + i * 60}
          cy={100 + Math.sin(i) * 30}
          r={20 + i * 5}
          fill={`rgb(${color} / ${0.1 + i * 0.05})`}
          stroke={`rgb(${color} / 0.3)`}
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

// Map project IDs to their visual components
const visualMap: Record<string, React.FC> = {
  "dynamic-memory-allocator": MemoryAllocatorVisual,
  "concurrent-game-server": GameServerVisual,
  "posix-printer-spooler": PrintSpoolerVisual,
  "openstreetmap-parser": OSMParserVisual,
  "web-server-proxy": WebServerVisual,
  "tcp-flow-analysis": TCPFlowVisual,
  "movie-revenue-prediction": MovieRevenueVisual,
  "energy-demand-prediction": EnergyDemandVisual,
  "nyc-airbnb-analysis": AirbnbVisual,
  "spectrum-analyzer": SpectrumAnalyzerVisual,
  "fairshare": FairShareVisual,
  "mindmesh-ai": MindMeshVisual,
  "reddit-clone": RedditCloneVisual,
  "versecraft": VerseCraftVisual,
  "roommatch": RoomMatchVisual,
  "computational-geometry": GeometryVisual,
  "cold-caller": ColdCallerVisual,
  "trading-simulation": TradingVisual,
};

export function ProjectVisual({ projectId, category, className }: ProjectVisualProps) {
  const VisualComponent = visualMap[projectId];

  return (
    <div className={cn("w-full h-full overflow-hidden", className)}>
      {VisualComponent ? (
        <VisualComponent />
      ) : (
        <DefaultVisual category={category} />
      )}
    </div>
  );
}
