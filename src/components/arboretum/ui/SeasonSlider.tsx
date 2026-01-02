"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Snowflake, Flower2, Sun, Leaf } from "lucide-react";
import { Season } from "@/types/arboretum";

interface SeasonSliderProps {
  currentSeason: Season;
  progress: number;
  onChange: (season: Season, progress: number) => void;
}

const SEASONS: { season: Season; icon: typeof Snowflake; label: string; color: string }[] = [
  { season: "winter", icon: Snowflake, label: "Winter", color: "#93c5fd" },
  { season: "spring", icon: Flower2, label: "Spring", color: "#86efac" },
  { season: "summer", icon: Sun, label: "Summer", color: "#fcd34d" },
  { season: "autumn", icon: Leaf, label: "Autumn", color: "#fdba74" },
];

export function SeasonSlider({ currentSeason, progress, onChange }: SeasonSliderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);

      // Map slider value (0-100) to season
      let season: Season;
      let seasonProgress: number;

      if (value < 25) {
        season = "winter";
        seasonProgress = value / 25;
      } else if (value < 50) {
        season = "spring";
        seasonProgress = (value - 25) / 25;
      } else if (value < 75) {
        season = "summer";
        seasonProgress = (value - 50) / 25;
      } else {
        season = "autumn";
        seasonProgress = (value - 75) / 25;
      }

      onChange(season, seasonProgress);
    },
    [onChange]
  );

  // Convert current state to slider value
  const sliderValue = (() => {
    const seasonIndex = SEASONS.findIndex((s) => s.season === currentSeason);
    return seasonIndex * 25 + progress * 25;
  })();

  const currentSeasonData = SEASONS.find((s) => s.season === currentSeason);
  const Icon = currentSeasonData?.icon || Flower2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto"
    >
      <div className="flex flex-col items-center gap-3">
        {/* Season indicator */}
        <motion.div
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-background-secondary/50 backdrop-blur-sm border border-border"
          animate={{
            borderColor: isDragging ? currentSeasonData?.color : "rgba(255,255,255,0.1)",
          }}
        >
          <Icon
            className="w-4 h-4"
            style={{ color: currentSeasonData?.color }}
          />
          <span className="text-sm text-foreground-muted">
            {currentSeasonData?.label}
          </span>
        </motion.div>

        {/* Slider */}
        <div className="relative w-80">
          {/* Track background */}
          <div className="absolute inset-0 h-2 rounded-full bg-gradient-to-r from-blue-300/30 via-green-300/30 via-yellow-300/30 to-orange-300/30" />

          {/* Season markers */}
          <div className="absolute inset-0 flex justify-between items-center px-1">
            {SEASONS.map((s, i) => (
              <button
                key={s.season}
                onClick={() => onChange(s.season, 0.5)}
                className="relative z-10"
              >
                <div
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSeason === s.season
                      ? "scale-125"
                      : "scale-100 opacity-50"
                  }`}
                  style={{ backgroundColor: s.color }}
                />
              </button>
            ))}
          </div>

          {/* Input slider */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleSliderChange}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            className="relative z-20 w-full h-2 appearance-none bg-transparent cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:shadow-lg
              [&::-webkit-slider-thumb]:cursor-grab
              [&::-webkit-slider-thumb]:active:cursor-grabbing
              [&::-webkit-slider-thumb]:transition-transform
              [&::-webkit-slider-thumb]:hover:scale-110
              [&::-moz-range-thumb]:w-5
              [&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-white
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:shadow-lg
              [&::-moz-range-thumb]:cursor-grab"
          />
        </div>

        {/* Description */}
        <p className="text-xs text-foreground-subtle text-center max-w-xs">
          {currentSeason === "winter" && "Bare structure. Only foundational insights visible."}
          {currentSeason === "spring" && "Full bloom. All insights revealed."}
          {currentSeason === "summer" && "Peak intensity. Maximum visibility."}
          {currentSeason === "autumn" && "Reflection. Patterns emerge from falling leaves."}
        </p>
      </div>
    </motion.div>
  );
}
