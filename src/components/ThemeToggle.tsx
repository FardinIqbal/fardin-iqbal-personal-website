"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-3 rounded-xl bg-foreground text-background border-2 border-foreground shadow-lg overflow-visible"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Emerald glow */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        animate={{
          boxShadow: [
            "0 0 12px rgb(16 185 129 / 0.4)",
            "0 0 24px rgb(16 185 129 / 0.6)",
            "0 0 12px rgb(16 185 129 / 0.4)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <div className="relative w-5 h-5">
        {/* Moon icon - clear and recognizable */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            opacity: isDark ? 1 : 0,
            rotate: isDark ? 0 : -90,
            scale: isDark ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={isDark ? { rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Moon className="w-5 h-5" strokeWidth={2.5} />
          </motion.div>

          {/* Twinkling stars around moon */}
          {[
            { x: -9, y: -7, size: 3, delay: 0 },
            { x: 10, y: -5, size: 2.5, delay: 0.3 },
            { x: 8, y: 8, size: 3, delay: 0.6 },
          ].map((star, i) => (
            <motion.div
              key={i}
              className="absolute bg-emerald-400 rounded-full"
              style={{
                width: star.size,
                height: star.size,
                left: `calc(50% + ${star.x}px)`,
                top: `calc(50% + ${star.y}px)`,
              }}
              animate={
                isDark
                  ? {
                      opacity: [0.2, 1, 0.2],
                      scale: [0.8, 1.2, 0.8],
                    }
                  : { opacity: 0, scale: 0 }
              }
              transition={{
                duration: 1.5,
                repeat: isDark ? Infinity : 0,
                delay: star.delay,
              }}
            />
          ))}
        </motion.div>

        {/* Sun icon - clear and recognizable */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            opacity: isDark ? 0 : 1,
            rotate: isDark ? 90 : 0,
            scale: isDark ? 0.5 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={isDark ? {} : { rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Sun className="w-5 h-5" strokeWidth={2.5} />
          </motion.div>

          {/* Radiating particles around sun */}
          {[
            { x: -10, y: -8, delay: 0 },
            { x: 11, y: -6, delay: 0.25 },
            { x: 9, y: 9, delay: 0.5 },
            { x: -8, y: 10, delay: 0.75 },
          ].map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-emerald-400 rounded-full"
              style={{
                left: `calc(50% + ${particle.x}px)`,
                top: `calc(50% + ${particle.y}px)`,
              }}
              animate={
                isDark
                  ? { opacity: 0, scale: 0 }
                  : {
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.3, 0.5],
                    }
              }
              transition={{
                duration: 1.2,
                repeat: isDark ? 0 : Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.button>
  );
}
