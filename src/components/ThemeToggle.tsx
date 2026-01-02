"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-3 rounded-xl bg-foreground text-background border-2 border-foreground shadow-lg overflow-hidden"
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9, rotate: -5 }}
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        animate={{
          boxShadow: resolvedTheme === "dark"
            ? ["0 0 20px rgb(147 197 253 / 0.3)", "0 0 40px rgb(147 197 253 / 0.5)", "0 0 20px rgb(147 197 253 / 0.3)"]
            : ["0 0 20px rgb(251 191 36 / 0.3)", "0 0 40px rgb(251 191 36 / 0.5)", "0 0 20px rgb(251 191 36 / 0.3)"],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <AnimatePresence mode="wait">
        {resolvedTheme === "dark" ? (
          <motion.div
            key="moon"
            initial={{ rotate: -180, opacity: 0, scale: 0 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 180, opacity: 0, scale: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
            className="relative"
          >
            <Moon className="w-5 h-5" />
            {/* Stars around moon */}
            {[
              { x: -8, y: -6, size: 2, delay: 0 },
              { x: 10, y: -4, size: 1.5, delay: 0.1 },
              { x: 8, y: 8, size: 2, delay: 0.2 },
            ].map((star, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-current"
                style={{
                  width: star.size,
                  height: star.size,
                  left: `calc(50% + ${star.x}px)`,
                  top: `calc(50% + ${star.y}px)`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: star.delay,
                }}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 180, opacity: 0, scale: 0 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -180, opacity: 0, scale: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
            className="relative"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Sun className="w-5 h-5" />
            </motion.div>
            {/* Sun rays */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <motion.div
                  key={angle}
                  className="absolute w-0.5 h-2 bg-current origin-center"
                  style={{
                    transform: `rotate(${angle}deg) translateY(-12px)`,
                  }}
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scaleY: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: angle / 360,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
