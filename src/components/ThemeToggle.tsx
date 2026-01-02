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
      className="relative p-3 rounded-xl bg-foreground text-background border-2 border-foreground shadow-lg overflow-hidden"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Emerald glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        animate={{
          boxShadow: [
            "0 0 15px rgb(16 185 129 / 0.3)",
            "0 0 30px rgb(16 185 129 / 0.5)",
            "0 0 15px rgb(16 185 129 / 0.3)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <div className="relative w-5 h-5">
        {/* Moon icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            opacity: isDark ? 1 : 0,
            rotate: isDark ? 0 : -90,
            scale: isDark ? 1 : 0.5,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Moon className="w-5 h-5" />
          {/* Emerald stars around moon */}
          {[
            { x: -8, y: -6, size: 2, delay: 0 },
            { x: 10, y: -4, size: 1.5, delay: 0.1 },
            { x: 8, y: 8, size: 2, delay: 0.2 },
          ].map((star, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-emerald-400"
              style={{
                width: star.size,
                height: star.size,
                left: `calc(50% + ${star.x}px)`,
                top: `calc(50% + ${star.y}px)`,
              }}
              animate={
                isDark
                  ? {
                      opacity: [0.3, 1, 0.3],
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

        {/* Sun icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            opacity: isDark ? 0 : 1,
            rotate: isDark ? 90 : 0,
            scale: isDark ? 0.5 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.div
            animate={isDark ? {} : { rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Sun className="w-5 h-5" />
          </motion.div>
          {/* Emerald sun rays */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={isDark ? {} : { rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <motion.div
                key={angle}
                className="absolute w-0.5 h-2 bg-emerald-400 origin-center"
                style={{
                  transform: `rotate(${angle}deg) translateY(-12px)`,
                }}
                animate={
                  isDark
                    ? { opacity: 0, scaleY: 0 }
                    : {
                        opacity: [0.4, 1, 0.4],
                        scaleY: [0.8, 1.2, 0.8],
                      }
                }
                transition={{
                  duration: 1,
                  repeat: isDark ? 0 : Infinity,
                  delay: angle / 360,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.button>
  );
}
