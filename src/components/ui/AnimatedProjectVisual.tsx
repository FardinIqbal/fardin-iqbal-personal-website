"use client";

import { motion } from "framer-motion";

interface AnimatedProjectVisualProps {
  projectId: string;
  category: string;
}

// Dynamic Memory Allocator - Memory blocks with allocation animation
function MemoryAllocatorVisual() {
  const blocks = [
    { x: 20, w: 60, allocated: true, delay: 0 },
    { x: 85, w: 40, allocated: false, delay: 0.1 },
    { x: 130, w: 80, allocated: true, delay: 0.2 },
    { x: 215, w: 30, allocated: false, delay: 0.3 },
    { x: 250, w: 70, allocated: true, delay: 0.4 },
    { x: 325, w: 55, allocated: false, delay: 0.5 },
  ];

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <defs>
        <linearGradient id="mem-alloc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(239 68 68 / 0.6)" />
          <stop offset="100%" stopColor="rgb(249 115 22 / 0.4)" />
        </linearGradient>
        <linearGradient id="mem-free-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(var(--color-border))" />
          <stop offset="100%" stopColor="rgb(var(--color-background-tertiary))" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />

      {/* Memory heap visualization */}
      <motion.text
        x="20" y="30"
        fill="rgb(var(--color-foreground-subtle))"
        fontSize="10"
        fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
      >
        0x7fff0000
      </motion.text>

      {/* Memory blocks */}
      {blocks.map((block, i) => (
        <motion.g key={i}>
          <motion.rect
            x={block.x}
            y={50}
            width={block.w}
            height={100}
            rx="4"
            fill={block.allocated ? "url(#mem-alloc-grad)" : "url(#mem-free-grad)"}
            stroke={block.allocated ? "rgb(239 68 68 / 0.8)" : "rgb(var(--color-border))"}
            strokeWidth="2"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{
              scaleY: 1,
              opacity: 1,
              boxShadow: block.allocated ? "0 0 20px rgb(239 68 68 / 0.3)" : "none"
            }}
            transition={{ delay: block.delay, duration: 0.4, ease: "easeOut" }}
            style={{ transformOrigin: `${block.x + block.w/2}px 150px` }}
          />
          {block.allocated && (
            <motion.text
              x={block.x + block.w/2}
              y={105}
              textAnchor="middle"
              fill="rgb(239 68 68 / 0.9)"
              fontSize="8"
              fontFamily="monospace"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ delay: block.delay + 0.3, duration: 2, repeat: Infinity }}
            >
              USED
            </motion.text>
          )}
        </motion.g>
      ))}

      {/* Pointer arrows */}
      <motion.path
        d="M50 170 L50 155 M45 160 L50 155 L55 160"
        stroke="rgb(239 68 68 / 0.7)"
        strokeWidth="2"
        fill="none"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      />
      <motion.text
        x="50" y="185"
        textAnchor="middle"
        fill="rgb(var(--color-foreground-subtle))"
        fontSize="9"
        fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.9 }}
      >
        *ptr
      </motion.text>
    </svg>
  );
}

// Concurrent Game Server - Network nodes with data packets
function GameServerVisual() {
  const clients = [
    { x: 60, y: 50 },
    { x: 60, y: 100 },
    { x: 60, y: 150 },
    { x: 340, y: 50 },
    { x: 340, y: 100 },
    { x: 340, y: 150 },
  ];

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />

      {/* Server (center) */}
      <motion.rect
        x="175" y="70"
        width="50" height="60"
        rx="6"
        fill="rgb(239 68 68 / 0.2)"
        stroke="rgb(239 68 68 / 0.8)"
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      />
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx="200"
            cy={82 + i * 15}
            r="4"
            fill="rgb(34 197 94)"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.g>

      {/* Connection lines and packets */}
      {clients.map((client, i) => (
        <motion.g key={i}>
          <motion.line
            x1={client.x}
            y1={client.y}
            x2="200"
            y2="100"
            stroke="rgb(239 68 68 / 0.3)"
            strokeWidth="1"
            strokeDasharray="4 2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          />
          {/* Data packet animation */}
          <motion.circle
            r="4"
            fill="rgb(59 130 246)"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              cx: [client.x, 200],
              cy: [client.y, 100],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "linear",
            }}
          />
        </motion.g>
      ))}

      {/* Client nodes */}
      {clients.map((client, i) => (
        <motion.circle
          key={`client-${i}`}
          cx={client.x}
          cy={client.y}
          r="12"
          fill="rgb(var(--color-background-secondary))"
          stroke="rgb(var(--color-border))"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
        />
      ))}
    </svg>
  );
}

// Printer Spooler - Document queue animation
function PrinterSpoolerVisual() {
  const docs = [0, 1, 2, 3];

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />

      {/* Queue of documents */}
      {docs.map((i) => (
        <motion.g key={i}>
          <motion.rect
            x={50 + i * 50}
            y={60}
            width="40"
            height="50"
            rx="2"
            fill="rgb(var(--color-background-secondary))"
            stroke="rgb(239 68 68 / 0.5)"
            strokeWidth="1"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 50 + i * 50, opacity: 1 }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
          />
          {/* Document lines */}
          {[0, 1, 2].map((line) => (
            <motion.rect
              key={line}
              x={55 + i * 50}
              y={70 + line * 12}
              width="30"
              height="3"
              fill="rgb(var(--color-border))"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: i * 0.2 + 0.3 + line * 0.1 }}
            />
          ))}
        </motion.g>
      ))}

      {/* Printer */}
      <motion.rect
        x="280" y="50"
        width="80" height="70"
        rx="6"
        fill="rgb(var(--color-background-secondary))"
        stroke="rgb(239 68 68 / 0.6)"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Printing animation */}
      <motion.rect
        x="290" y="130"
        width="60" height="40"
        rx="2"
        fill="rgb(var(--color-background))"
        stroke="rgb(34 197 94 / 0.6)"
        strokeWidth="1"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 130, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
      />

      {/* Arrow */}
      <motion.path
        d="M240 85 L270 85 M262 78 L270 85 L262 92"
        stroke="rgb(239 68 68 / 0.6)"
        strokeWidth="2"
        fill="none"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </svg>
  );
}

// OpenStreetMap Parser - Map grid with paths
function MapParserVisual() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />

      {/* Grid lines */}
      {[...Array(9)].map((_, i) => (
        <motion.line
          key={`v-${i}`}
          x1={40 + i * 40}
          y1="20"
          x2={40 + i * 40}
          y2="180"
          stroke="rgb(var(--color-border))"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: i * 0.05 }}
        />
      ))}
      {[...Array(5)].map((_, i) => (
        <motion.line
          key={`h-${i}`}
          x1="20"
          y1={40 + i * 35}
          x2="380"
          y2={40 + i * 35}
          stroke="rgb(var(--color-border))"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: i * 0.05 }}
        />
      ))}

      {/* Roads/paths */}
      <motion.path
        d="M40 100 Q120 60, 200 100 T360 80"
        stroke="rgb(239 68 68 / 0.7)"
        strokeWidth="4"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.path
        d="M80 180 L80 40 L280 40"
        stroke="rgb(249 115 22 / 0.6)"
        strokeWidth="3"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Location markers */}
      {[[120, 100], [280, 40], [200, 100]].map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r="6"
          fill="rgb(239 68 68)"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 1 + i * 0.2, duration: 0.4 }}
        />
      ))}
    </svg>
  );
}

// Web Server Proxy - HTTP requests flowing
function WebProxyVisual() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />

      {/* Client */}
      <motion.rect
        x="30" y="70" width="60" height="60" rx="8"
        fill="rgb(var(--color-background-secondary))"
        stroke="rgb(59 130 246 / 0.6)"
        strokeWidth="2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      />
      <motion.text x="60" y="105" textAnchor="middle" fill="rgb(var(--color-foreground-subtle))" fontSize="10">
        Client
      </motion.text>

      {/* Proxy */}
      <motion.rect
        x="160" y="60" width="80" height="80" rx="8"
        fill="rgb(239 68 68 / 0.15)"
        stroke="rgb(239 68 68 / 0.7)"
        strokeWidth="2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      />
      <motion.text x="200" y="105" textAnchor="middle" fill="rgb(239 68 68)" fontSize="10" fontWeight="bold">
        Proxy
      </motion.text>

      {/* Server */}
      <motion.rect
        x="310" y="70" width="60" height="60" rx="8"
        fill="rgb(var(--color-background-secondary))"
        stroke="rgb(34 197 94 / 0.6)"
        strokeWidth="2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      />
      <motion.text x="340" y="105" textAnchor="middle" fill="rgb(var(--color-foreground-subtle))" fontSize="10">
        Server
      </motion.text>

      {/* Request packets */}
      <motion.circle
        r="5"
        fill="rgb(59 130 246)"
        animate={{
          cx: [95, 155, 155, 245, 305],
          cy: [100, 100, 100, 100, 100],
          opacity: [0, 1, 1, 1, 0],
        }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      />

      {/* Response packets */}
      <motion.circle
        r="5"
        fill="rgb(34 197 94)"
        animate={{
          cx: [305, 245, 245, 155, 95],
          cy: [100, 100, 100, 100, 100],
          opacity: [0, 1, 1, 1, 0],
        }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 2.5 }}
      />

      {/* Cache indicator */}
      <motion.rect
        x="175" y="150" width="50" height="25" rx="4"
        fill="rgb(168 85 247 / 0.2)"
        stroke="rgb(168 85 247 / 0.5)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />
      <motion.text x="200" y="167" textAnchor="middle" fill="rgb(168 85 247)" fontSize="8">
        Cache
      </motion.text>
    </svg>
  );
}

// TCP Flow Analysis - Packet streams
function TCPFlowVisual() {
  const packets = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />

      {/* Flow lines */}
      <motion.path
        d="M30 50 Q200 30, 370 50"
        stroke="rgb(59 130 246 / 0.4)"
        strokeWidth="20"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.path
        d="M30 100 Q200 120, 370 100"
        stroke="rgb(239 68 68 / 0.4)"
        strokeWidth="20"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
      <motion.path
        d="M30 150 Q200 170, 370 150"
        stroke="rgb(34 197 94 / 0.4)"
        strokeWidth="20"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      />

      {/* Packets flowing */}
      {packets.map((i) => (
        <motion.rect
          key={i}
          width="12"
          height="8"
          rx="2"
          fill="rgb(var(--color-foreground))"
          initial={{ opacity: 0 }}
          animate={{
            x: [30, 370],
            y: [45 + (i % 3) * 50, 45 + (i % 3) * 50 + Math.sin(i) * 5],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "linear",
          }}
        />
      ))}

      {/* Labels */}
      <motion.text x="20" y="30" fill="rgb(59 130 246)" fontSize="10" fontFamily="monospace">
        TCP:80
      </motion.text>
      <motion.text x="20" y="85" fill="rgb(239 68 68)" fontSize="10" fontFamily="monospace">
        TCP:443
      </motion.text>
      <motion.text x="20" y="135" fill="rgb(34 197 94)" fontSize="10" fontFamily="monospace">
        TCP:22
      </motion.text>
    </svg>
  );
}

// Movie Revenue Prediction - Film reel with chart
function MovieRevenueVisual() {
  const bars = [45, 75, 55, 95, 65, 85, 70, 90, 60, 80];

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />

      {/* Bar chart */}
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={30 + i * 25}
          y={180 - h * 1.2}
          width="18"
          rx="2"
          fill={`rgb(168 85 247 / ${0.4 + (h / 100) * 0.5})`}
          initial={{ height: 0, y: 180 }}
          animate={{
            height: h * 1.2,
            y: 180 - h * 1.2,
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            height: { duration: 0.6, delay: i * 0.08 },
            y: { duration: 0.6, delay: i * 0.08 },
            opacity: { duration: 2, repeat: Infinity, delay: i * 0.1 }
          }}
        />
      ))}

      {/* Film reel */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "340px 60px" }}
      >
        <circle cx="340" cy="60" r="35" fill="none" stroke="rgb(168 85 247 / 0.6)" strokeWidth="4" />
        <circle cx="340" cy="60" r="12" fill="rgb(168 85 247 / 0.4)" />
        {/* Pre-calculated positions to avoid hydration mismatch */}
        {[
          { cx: 364, cy: 60 },
          { cx: 352, cy: 81 },
          { cx: 328, cy: 81 },
          { cx: 316, cy: 60 },
          { cx: 328, cy: 39 },
          { cx: 352, cy: 39 },
        ].map((pos, i) => (
          <circle
            key={i}
            cx={pos.cx}
            cy={pos.cy}
            r="6"
            fill="rgb(var(--color-background-tertiary))"
          />
        ))}
      </motion.g>

      {/* Prediction line */}
      <motion.path
        d="M30 130 Q130 100, 200 90 T280 50"
        stroke="rgb(34 197 94 / 0.8)"
        strokeWidth="2"
        strokeDasharray="4 2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
      />
    </svg>
  );
}

// Energy Demand Prediction - House with energy flow
function EnergyDemandVisual() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />

      {/* House */}
      <motion.path
        d="M80 110 L130 70 L180 110 L180 170 L80 170 Z"
        fill="rgb(var(--color-background-secondary))"
        stroke="rgb(168 85 247 / 0.6)"
        strokeWidth="2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ transformOrigin: "130px 120px" }}
      />

      {/* Window */}
      <motion.rect
        x="100" y="125" width="25" height="25"
        fill="rgb(251 191 36 / 0.4)"
        stroke="rgb(168 85 247 / 0.4)"
        animate={{ fill: ["rgb(251 191 36 / 0.2)", "rgb(251 191 36 / 0.6)", "rgb(251 191 36 / 0.2)"] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Energy waves */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx="130"
          cy="100"
          r={20 + i * 15}
          fill="none"
          stroke="rgb(34 197 94 / 0.4)"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}

      {/* Usage chart */}
      <motion.g>
        {[40, 60, 35, 80, 55, 70, 45].map((h, i) => (
          <motion.rect
            key={i}
            x={230 + i * 22}
            y={170 - h}
            width="16"
            height={h}
            rx="2"
            fill={`rgb(34 197 94 / ${0.3 + (h / 100) * 0.5})`}
            initial={{ height: 0, y: 170 }}
            animate={{ height: h, y: 170 - h }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
          />
        ))}
      </motion.g>

      {/* Sun/Weather */}
      <motion.circle
        cx="320" cy="45" r="20"
        fill="rgb(251 191 36 / 0.6)"
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <motion.line
          key={i}
          x1={320 + 28 * Math.cos((angle * Math.PI) / 180)}
          y1={45 + 28 * Math.sin((angle * Math.PI) / 180)}
          x2={320 + 38 * Math.cos((angle * Math.PI) / 180)}
          y2={45 + 38 * Math.sin((angle * Math.PI) / 180)}
          stroke="rgb(251 191 36 / 0.5)"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
    </svg>
  );
}

// NYC Airbnb - City skyline with data points
function AirbnbAnalysisVisual() {
  const buildings = [
    { x: 20, h: 80, w: 30 },
    { x: 55, h: 120, w: 25 },
    { x: 85, h: 60, w: 35 },
    { x: 125, h: 140, w: 20 },
    { x: 150, h: 90, w: 28 },
    { x: 183, h: 110, w: 22 },
    { x: 210, h: 70, w: 32 },
  ];

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />

      {/* Buildings */}
      {buildings.map((b, i) => (
        <motion.rect
          key={i}
          x={b.x}
          y={180 - b.h}
          width={b.w}
          height={b.h}
          fill="rgb(var(--color-background-secondary))"
          stroke="rgb(168 85 247 / 0.4)"
          strokeWidth="1"
          initial={{ height: 0, y: 180 }}
          animate={{ height: b.h, y: 180 - b.h }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        />
      ))}

      {/* Data points (listings) */}
      {[[40, 130], [70, 90], [110, 110], [140, 60], [170, 100], [200, 130]].map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r="5"
          fill="rgb(239 68 68)"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 0.7] }}
          transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
        />
      ))}

      {/* Price chart */}
      <motion.path
        d="M260 150 L280 120 L300 140 L320 90 L340 110 L360 70 L380 85"
        stroke="rgb(34 197 94)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
      />

      {/* Dollar signs */}
      <motion.text x="270" y="50" fill="rgb(34 197 94 / 0.6)" fontSize="20" fontWeight="bold"
        animate={{ y: [50, 45, 50] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        $
      </motion.text>
    </svg>
  );
}

// Spectrum Analyzer - Space with waveforms
function SpectrumAnalyzerVisual() {
  const frequencies = [30, 50, 70, 90, 60, 80, 45, 65, 85, 55, 75, 40, 60, 80, 50];

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <defs>
        <radialGradient id="space-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(88 28 135 / 0.3)" />
          <stop offset="100%" stopColor="rgb(var(--color-background-tertiary))" />
        </radialGradient>
      </defs>
      <rect width="400" height="200" fill="url(#space-grad)" />

      {/* Stars */}
      {[...Array(20)].map((_, i) => (
        <motion.circle
          key={i}
          cx={20 + (i * 19) % 360}
          cy={20 + (i * 37) % 160}
          r={1 + (i % 2)}
          fill="rgb(var(--color-foreground))"
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2 + i % 3, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      {/* Spectrum bars */}
      {frequencies.map((h, i) => (
        <motion.rect
          key={i}
          x={30 + i * 24}
          y={180 - h}
          width="18"
          rx="2"
          fill={`hsl(${260 + i * 5}, 70%, ${40 + (h / 100) * 30}%)`}
          initial={{ height: 0, y: 180 }}
          animate={{
            height: [h * 0.5, h, h * 0.7, h * 0.9, h * 0.5],
            y: [180 - h * 0.5, 180 - h, 180 - h * 0.7, 180 - h * 0.9, 180 - h * 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.05,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Planet */}
      <motion.circle
        cx="350" cy="50" r="25"
        fill="rgb(59 130 246 / 0.3)"
        stroke="rgb(59 130 246 / 0.5)"
        strokeWidth="2"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.ellipse
        cx="350" cy="50" rx="35" ry="8"
        fill="none"
        stroke="rgb(168 85 247 / 0.5)"
        strokeWidth="2"
        initial={{ rotate: -20 }}
        animate={{ rotate: [-20, -15, -20] }}
        transition={{ duration: 5, repeat: Infinity }}
        style={{ transformOrigin: "350px 50px" }}
      />
    </svg>
  );
}

// FairShare - Expense splitting visualization
function FairShareVisual() {
  const segments = [
    { start: 0, end: 120, color: "rgb(239 68 68 / 0.6)" },
    { start: 120, end: 200, color: "rgb(59 130 246 / 0.6)" },
    { start: 200, end: 280, color: "rgb(34 197 94 / 0.6)" },
    { start: 280, end: 360, color: "rgb(168 85 247 / 0.6)" },
  ];

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />

      {/* Pie chart */}
      {segments.map((seg, i) => {
        const r = 60;
        const cx = 120;
        const cy = 100;
        const startAngle = (seg.start - 90) * (Math.PI / 180);
        const endAngle = (seg.end - 90) * (Math.PI / 180);
        const x1 = cx + r * Math.cos(startAngle);
        const y1 = cy + r * Math.sin(startAngle);
        const x2 = cx + r * Math.cos(endAngle);
        const y2 = cy + r * Math.sin(endAngle);
        const largeArc = seg.end - seg.start > 180 ? 1 : 0;

        return (
          <motion.path
            key={i}
            d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`}
            fill={seg.color}
            stroke="rgb(var(--color-background-tertiary))"
            strokeWidth="2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.2, type: "spring" }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        );
      })}

      {/* Dollar symbol */}
      <motion.text
        x="120" y="108" textAnchor="middle"
        fill="rgb(var(--color-foreground))"
        fontSize="24" fontWeight="bold"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
      >
        $
      </motion.text>

      {/* Balance cards */}
      {[
        { y: 40, amount: "+$45", color: "rgb(34 197 94)" },
        { y: 80, amount: "-$32", color: "rgb(239 68 68)" },
        { y: 120, amount: "+$18", color: "rgb(34 197 94)" },
        { y: 160, amount: "-$31", color: "rgb(239 68 68)" },
      ].map((item, i) => (
        <motion.g key={i}>
          <motion.rect
            x="220" y={item.y - 12} width="140" height="28" rx="4"
            fill="rgb(var(--color-background-secondary))"
            stroke="rgb(var(--color-border))"
            initial={{ x: 420, opacity: 0 }}
            animate={{ x: 220, opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.15 }}
          />
          <motion.text
            x="350" y={item.y + 5} textAnchor="end"
            fill={item.color} fontSize="14" fontWeight="bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 + i * 0.15 }}
          >
            {item.amount}
          </motion.text>
        </motion.g>
      ))}
    </svg>
  );
}

// MindMesh AI - Neural mind map
function MindMeshVisual() {
  const nodes = [
    { x: 200, y: 100, r: 25, main: true },
    { x: 100, y: 60, r: 15 },
    { x: 300, y: 60, r: 15 },
    { x: 80, y: 140, r: 12 },
    { x: 320, y: 140, r: 12 },
    { x: 150, y: 160, r: 10 },
    { x: 250, y: 160, r: 10 },
  ];

  const connections = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
    [1, 3], [2, 4], [3, 5], [4, 6],
  ];

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />

      {/* Connections */}
      {connections.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="rgb(168 85 247 / 0.4)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0.2, 0.5, 0.2] }}
          transition={{
            pathLength: { duration: 0.5, delay: i * 0.1 },
            opacity: { duration: 2, repeat: Infinity, delay: i * 0.15 }
          }}
        />
      ))}

      {/* Thought pulses */}
      {[1, 2, 3, 4].map((_, i) => (
        <motion.circle
          key={`pulse-${i}`}
          cx="200"
          cy="100"
          r="25"
          fill="none"
          stroke="rgb(168 85 247 / 0.3)"
          strokeWidth="2"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.g key={i}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill={node.main ? "rgb(168 85 247 / 0.4)" : "rgb(59 130 246 / 0.3)"}
            stroke={node.main ? "rgb(168 85 247)" : "rgb(59 130 246 / 0.6)"}
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
          />
          {node.main && (
            <motion.text
              x={node.x}
              y={node.y + 4}
              textAnchor="middle"
              fill="rgb(var(--color-foreground))"
              fontSize="12"
              fontWeight="bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              AI
            </motion.text>
          )}
        </motion.g>
      ))}
    </svg>
  );
}

// Reddit Clone - Comment threads
function RedditCloneVisual() {
  const comments = [
    { x: 40, y: 30, w: 280, indent: 0 },
    { x: 70, y: 65, w: 250, indent: 1 },
    { x: 100, y: 100, w: 220, indent: 2 },
    { x: 70, y: 135, w: 250, indent: 1 },
    { x: 40, y: 170, w: 280, indent: 0 },
  ];

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />

      {/* Comments */}
      {comments.map((c, i) => (
        <motion.g key={i}>
          {/* Indent line */}
          {c.indent > 0 && (
            <motion.line
              x1={40 + (c.indent - 1) * 30 + 15}
              y1={c.y - 10}
              x2={40 + (c.indent - 1) * 30 + 15}
              y2={c.y + 20}
              stroke="rgb(var(--color-border))"
              strokeWidth="2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: i * 0.15 }}
            />
          )}

          {/* Comment box */}
          <motion.rect
            x={c.x}
            y={c.y}
            width={c.w}
            height="28"
            rx="4"
            fill="rgb(var(--color-background-secondary))"
            stroke="rgb(var(--color-border))"
            initial={{ opacity: 0, x: c.x - 20 }}
            animate={{ opacity: 1, x: c.x }}
            transition={{ delay: i * 0.15 }}
          />

          {/* Upvote */}
          <motion.path
            d={`M${c.x + c.w + 15} ${c.y + 20} L${c.x + c.w + 22} ${c.y + 8} L${c.x + c.w + 29} ${c.y + 20}`}
            fill="rgb(249 115 22 / 0.6)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.15 + 0.2, type: "spring" }}
            style={{ transformOrigin: `${c.x + c.w + 22}px ${c.y + 14}px` }}
          />
        </motion.g>
      ))}

      {/* Vote animation */}
      <motion.text
        x="365" y="50" textAnchor="middle"
        fill="rgb(249 115 22)"
        fontSize="14" fontWeight="bold"
        animate={{ y: [50, 45, 50], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        +1
      </motion.text>
    </svg>
  );
}

// VerseCraft - Poetry flowing text
function VerseCraftVisual() {
  const lines = [
    "the quiet stars",
    "whisper secrets",
    "to the night",
    "while we sleep",
  ];

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />

      {/* Decorative feather/quill */}
      <motion.path
        d="M340 30 Q360 80, 350 150 Q345 160, 340 150 Q335 80, 355 30"
        fill="rgb(168 85 247 / 0.3)"
        stroke="rgb(168 85 247 / 0.6)"
        strokeWidth="1"
        initial={{ opacity: 0, rotate: -10 }}
        animate={{ opacity: 1, rotate: 0 }}
        style={{ transformOrigin: "347px 90px" }}
      />

      {/* Poetry lines */}
      {lines.map((line, i) => (
        <motion.text
          key={i}
          x="50"
          y={50 + i * 38}
          fill="rgb(var(--color-foreground-muted))"
          fontSize="16"
          fontStyle="italic"
          fontFamily="Georgia, serif"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 0.8, x: 0 }}
          transition={{ delay: i * 0.4, duration: 0.8 }}
        >
          {line.split('').map((char, j) => (
            <motion.tspan
              key={j}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.4 + j * 0.03 }}
            >
              {char}
            </motion.tspan>
          ))}
        </motion.text>
      ))}

      {/* Ink drops */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={350 + i * 5}
          cy={160 + i * 10}
          r={3 - i * 0.5}
          fill="rgb(168 85 247 / 0.5)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2 + i * 0.2 }}
        />
      ))}
    </svg>
  );
}

// RoomMatch - Swipe cards
function RoomMatchVisual() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />

      {/* Stacked cards */}
      {[2, 1, 0].map((i) => (
        <motion.rect
          key={i}
          x={140 - i * 8}
          y={25 + i * 5}
          width="120"
          height="150"
          rx="12"
          fill="rgb(var(--color-background-secondary))"
          stroke="rgb(var(--color-border))"
          strokeWidth="2"
          initial={{ x: 400, rotate: 10 }}
          animate={{
            x: 140 - i * 8,
            rotate: i === 0 ? [0, -5, 5, 0] : -i * 3,
          }}
          transition={{
            x: { delay: (2 - i) * 0.2, duration: 0.5 },
            rotate: i === 0 ? { duration: 2, repeat: Infinity, repeatDelay: 1 } : { delay: (2 - i) * 0.2 }
          }}
          style={{ transformOrigin: "200px 100px" }}
        />
      ))}

      {/* Profile avatar placeholder */}
      <motion.circle
        cx="200" cy="70" r="25"
        fill="rgb(59 130 246 / 0.3)"
        stroke="rgb(59 130 246 / 0.6)"
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
      />

      {/* Swipe indicators */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        {/* X button */}
        <motion.circle cx="90" cy="150" r="20" fill="rgb(239 68 68 / 0.2)" stroke="rgb(239 68 68 / 0.6)" strokeWidth="2" />
        <motion.path d="M82 142 L98 158 M98 142 L82 158" stroke="rgb(239 68 68)" strokeWidth="2" />

        {/* Heart button */}
        <motion.circle cx="310" cy="150" r="20" fill="rgb(34 197 94 / 0.2)" stroke="rgb(34 197 94 / 0.6)" strokeWidth="2" />
        <motion.path
          d="M310 145 C305 140, 298 145, 310 158 C322 145, 315 140, 310 145"
          fill="rgb(34 197 94)"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{ transformOrigin: "310px 150px" }}
        />
      </motion.g>

      {/* Match text */}
      <motion.text
        x="200" y="120" textAnchor="middle"
        fill="rgb(var(--color-foreground-subtle))"
        fontSize="10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.2 }}
      >
        Swipe to match
      </motion.text>
    </svg>
  );
}

// Computational Geometry - Triangulation
function GeometryVisual() {
  const points = [
    { x: 60, y: 40 }, { x: 150, y: 30 }, { x: 280, y: 50 },
    { x: 340, y: 90 }, { x: 300, y: 160 }, { x: 180, y: 170 },
    { x: 80, y: 150 }, { x: 120, y: 100 },
  ];

  const triangles = [
    [0, 1, 7], [1, 2, 7], [2, 3, 7], [3, 4, 7],
    [4, 5, 7], [5, 6, 7], [6, 0, 7],
  ];

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />

      {/* Triangles */}
      {triangles.map((t, i) => (
        <motion.polygon
          key={i}
          points={t.map(pi => `${points[pi].x},${points[pi].y}`).join(' ')}
          fill={`hsl(${140 + i * 15}, 60%, 40%)`}
          fillOpacity="0.2"
          stroke="rgb(34 197 94 / 0.6)"
          strokeWidth="1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.15, duration: 0.4 }}
          style={{ transformOrigin: "200px 100px" }}
        />
      ))}

      {/* Points */}
      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="5"
          fill="rgb(34 197 94)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8 + i * 0.08, type: "spring" }}
        />
      ))}

      {/* Voronoi hint lines */}
      <motion.path
        d="M120 100 L200 100 L200 50"
        stroke="rgb(168 85 247 / 0.4)"
        strokeWidth="1"
        strokeDasharray="4 4"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      />
    </svg>
  );
}

// Cold Caller - Classroom
function ColdCallerVisual() {
  const students = [
    [80, 70], [140, 70], [200, 70], [260, 70], [320, 70],
    [80, 120], [140, 120], [200, 120], [260, 120], [320, 120],
    [80, 170], [140, 170], [200, 170], [260, 170], [320, 170],
  ];

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />

      {/* Teacher desk */}
      <motion.rect
        x="160" y="15" width="80" height="25" rx="4"
        fill="rgb(var(--color-background-secondary))"
        stroke="rgb(34 197 94 / 0.6)"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Students */}
      {students.map(([x, y], i) => {
        const isSelected = i === 7; // Random selected student
        return (
          <motion.g key={i}>
            <motion.circle
              cx={x}
              cy={y}
              r="18"
              fill={isSelected ? "rgb(251 191 36 / 0.3)" : "rgb(var(--color-background-secondary))"}
              stroke={isSelected ? "rgb(251 191 36)" : "rgb(var(--color-border))"}
              strokeWidth={isSelected ? 3 : 1}
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                boxShadow: isSelected ? "0 0 20px rgb(251 191 36 / 0.5)" : "none"
              }}
              transition={{ delay: i * 0.05, type: "spring" }}
            />
            {isSelected && (
              <motion.text
                x={x} y={y + 4}
                textAnchor="middle"
                fill="rgb(251 191 36)"
                fontSize="10"
                fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ?
              </motion.text>
            )}
          </motion.g>
        );
      })}

      {/* Selection beam */}
      <motion.line
        x1="200" y1="35"
        x2="200" y2="120"
        stroke="rgb(251 191 36 / 0.5)"
        strokeWidth="3"
        strokeDasharray="5 5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 0.8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
      />
    </svg>
  );
}

// Trading Simulation - Candlestick chart
function TradingVisual() {
  const candles = [
    { o: 100, c: 120, h: 130, l: 90 },
    { o: 120, c: 110, h: 125, l: 100 },
    { o: 110, c: 140, h: 145, l: 105 },
    { o: 140, c: 130, h: 150, l: 125 },
    { o: 130, c: 155, h: 165, l: 120 },
    { o: 155, c: 145, h: 165, l: 140 },
    { o: 145, c: 170, h: 178, l: 140 },
    { o: 170, c: 160, h: 180, l: 155 },
  ];

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />

      {/* Grid lines */}
      {[50, 100, 150].map((y) => (
        <motion.line
          key={y}
          x1="30" y1={y} x2="370" y2={y}
          stroke="rgb(var(--color-border))"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
        />
      ))}

      {/* Candlesticks */}
      {candles.map((c, i) => {
        const isGreen = c.c > c.o;
        const bodyTop = 200 - Math.max(c.o, c.c);
        const bodyHeight = Math.abs(c.c - c.o);
        return (
          <motion.g key={i}>
            {/* Wick */}
            <motion.line
              x1={50 + i * 40}
              y1={200 - c.h}
              x2={50 + i * 40}
              y2={200 - c.l}
              stroke={isGreen ? "rgb(34 197 94)" : "rgb(239 68 68)"}
              strokeWidth="2"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              style={{ transformOrigin: `${50 + i * 40}px ${200 - (c.h + c.l) / 2}px` }}
            />
            {/* Body */}
            <motion.rect
              x={40 + i * 40}
              y={bodyTop}
              width="20"
              height={Math.max(bodyHeight, 3)}
              rx="2"
              fill={isGreen ? "rgb(34 197 94 / 0.6)" : "rgb(239 68 68 / 0.6)"}
              stroke={isGreen ? "rgb(34 197 94)" : "rgb(239 68 68)"}
              strokeWidth="1"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 + 0.1 }}
              style={{ transformOrigin: `${50 + i * 40}px ${bodyTop + bodyHeight / 2}px` }}
            />
          </motion.g>
        );
      })}

      {/* Trend line */}
      <motion.path
        d="M50 110 Q150 90, 200 70 T350 30"
        stroke="rgb(59 130 246 / 0.6)"
        strokeWidth="2"
        fill="none"
        strokeDasharray="4 2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
      />

      {/* Price tag */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <rect x="320" y="15" width="60" height="25" rx="4" fill="rgb(34 197 94 / 0.2)" />
        <text x="350" y="32" textAnchor="middle" fill="rgb(34 197 94)" fontSize="12" fontWeight="bold">
          +12.4%
        </text>
      </motion.g>
    </svg>
  );
}

// Default visual for unmapped projects
function DefaultVisual({ category }: { category: string }) {
  const colors: Record<string, string> = {
    systems: "239, 68, 68",
    ml: "168, 85, 247",
    web: "59, 130, 246",
    tools: "34, 197, 94",
  };
  const color = colors[category] || "99, 102, 241";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="rgb(var(--color-background-tertiary))" />
      {[...Array(8)].map((_, i) => (
        <motion.circle
          key={i}
          cx={50 + i * 45}
          cy={100 + Math.sin(i * 0.8) * 30}
          r={15 + i * 3}
          fill={`rgba(${color}, ${0.15 + i * 0.05})`}
          stroke={`rgba(${color}, 0.4)`}
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: [0.3, 0.7, 0.3],
            y: [0, -10, 0]
          }}
          transition={{
            scale: { duration: 0.5, delay: i * 0.1 },
            opacity: { duration: 3, repeat: Infinity, delay: i * 0.2 },
            y: { duration: 4, repeat: Infinity, delay: i * 0.15 }
          }}
        />
      ))}
    </svg>
  );
}

// Map project IDs to visual components
const visualMap: Record<string, React.FC<any>> = {
  "dynamic-memory-allocator": MemoryAllocatorVisual,
  "concurrent-game-server": GameServerVisual,
  "posix-printer-spooler": PrinterSpoolerVisual,
  "openstreetmap-parser": MapParserVisual,
  "web-server-proxy": WebProxyVisual,
  "tcp-flow-analysis": TCPFlowVisual,
  "movie-revenue-prediction": MovieRevenueVisual,
  "energy-demand-prediction": EnergyDemandVisual,
  "nyc-airbnb-analysis": AirbnbAnalysisVisual,
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

export function AnimatedProjectVisual({ projectId, category }: AnimatedProjectVisualProps) {
  const VisualComponent = visualMap[projectId];

  return (
    <div className="w-full h-full overflow-hidden">
      {VisualComponent ? (
        <VisualComponent />
      ) : (
        <DefaultVisual category={category} />
      )}
    </div>
  );
}
