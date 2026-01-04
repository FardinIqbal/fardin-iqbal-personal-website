"use client";

import { motion } from "framer-motion";

interface AvailabilityStatusProps {
  status: "available" | "busy" | "building";
  message?: string;
}

export function AvailabilityStatus({
  status = "building",
  message = "Building Neo Provider",
}: AvailabilityStatusProps) {
  const statusConfig = {
    available: {
      color: "bg-green-500",
      text: "Available for work",
      pulse: true,
    },
    busy: {
      color: "bg-yellow-500",
      text: "Currently busy",
      pulse: false,
    },
    building: {
      color: "bg-blue-500",
      text: message,
      pulse: true,
    },
  };

  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background-secondary/50 border border-border/50"
    >
      <span className="relative flex h-2 w-2">
        {config.pulse && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.color} opacity-75`}
          />
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${config.color}`}
        />
      </span>
      <span className="text-xs text-foreground-muted">{config.text}</span>
    </motion.div>
  );
}
