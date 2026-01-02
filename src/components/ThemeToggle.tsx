"use client";

import { motion } from "framer-motion";
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
            "0 0 30px rgb(16 185 129 / 0.6)",
            "0 0 15px rgb(16 185 129 / 0.3)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <div className="relative w-6 h-6">
        {/* Moon - visible in dark mode */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            opacity: isDark ? 1 : 0,
            rotate: isDark ? 0 : -90,
            scale: isDark ? 1 : 0.3,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Moon body */}
          <motion.div
            className="w-5 h-5 rounded-full bg-current relative overflow-hidden"
            animate={isDark ? { rotate: [0, 5, -5, 0] } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Moon crater shadows */}
            <motion.div
              className="absolute w-2 h-2 rounded-full bg-foreground/20"
              style={{ top: "20%", left: "15%" }}
              animate={isDark ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute w-1.5 h-1.5 rounded-full bg-foreground/15"
              style={{ top: "50%", right: "20%" }}
              animate={isDark ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            />
          </motion.div>

          {/* Orbiting stars */}
          <motion.div
            className="absolute inset-0"
            animate={isDark ? { rotate: 360 } : {}}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <motion.div
                key={angle}
                className="absolute w-1 h-1 rounded-full bg-emerald-400"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${angle}deg) translateX(14px) translateY(-50%)`,
                }}
                animate={
                  isDark
                    ? {
                        opacity: [0.3, 1, 0.3],
                        scale: [0.8, 1.3, 0.8],
                      }
                    : { opacity: 0, scale: 0 }
                }
                transition={{
                  duration: 1.5,
                  repeat: isDark ? Infinity : 0,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>

          {/* Twinkling stars - stationary */}
          {[
            { x: -10, y: -8, size: 2 },
            { x: 11, y: -6, size: 1.5 },
            { x: 9, y: 9, size: 2 },
            { x: -8, y: 8, size: 1.5 },
          ].map((star, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-emerald-300"
              style={{
                width: star.size,
                height: star.size,
                left: `calc(50% + ${star.x}px)`,
                top: `calc(50% + ${star.y}px)`,
              }}
              animate={
                isDark
                  ? {
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.5, 0.5],
                    }
                  : { opacity: 0, scale: 0 }
              }
              transition={{
                duration: 1.2,
                repeat: isDark ? Infinity : 0,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>

        {/* Sun - visible in light mode */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            opacity: isDark ? 0 : 1,
            rotate: isDark ? 90 : 0,
            scale: isDark ? 0.3 : 1,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Sun core - rotating */}
          <motion.div
            className="w-4 h-4 rounded-full bg-current relative"
            animate={isDark ? {} : { rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {/* Inner glow */}
            <motion.div
              className="absolute inset-0.5 rounded-full bg-emerald-400/30"
              animate={isDark ? {} : { scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Rotating rays - first layer */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={isDark ? {} : { rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <motion.div
                key={angle}
                className="absolute w-0.5 h-2.5 bg-emerald-400 origin-center rounded-full"
                style={{
                  transform: `rotate(${angle}deg) translateY(-10px)`,
                }}
                animate={
                  isDark
                    ? { opacity: 0, scaleY: 0 }
                    : {
                        opacity: [0.5, 1, 0.5],
                        scaleY: [0.7, 1.3, 0.7],
                      }
                }
                transition={{
                  duration: 1,
                  repeat: isDark ? 0 : Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </motion.div>

          {/* Counter-rotating rays - second layer */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={isDark ? {} : { rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
              <motion.div
                key={angle}
                className="absolute w-0.5 h-1.5 bg-current origin-center rounded-full"
                style={{
                  transform: `rotate(${angle}deg) translateY(-12px)`,
                }}
                animate={
                  isDark
                    ? { opacity: 0, scaleY: 0 }
                    : {
                        opacity: [0.3, 0.8, 0.3],
                        scaleY: [0.6, 1.2, 0.6],
                      }
                }
                transition={{
                  duration: 1.5,
                  repeat: isDark ? 0 : Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </motion.div>

          {/* Solar flares / particles */}
          {[
            { x: -9, y: -7, delay: 0 },
            { x: 10, y: -5, delay: 0.3 },
            { x: 8, y: 8, delay: 0.6 },
            { x: -7, y: 9, delay: 0.9 },
          ].map((flare, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-emerald-400"
              style={{
                left: `calc(50% + ${flare.x}px)`,
                top: `calc(50% + ${flare.y}px)`,
              }}
              animate={
                isDark
                  ? { opacity: 0, scale: 0 }
                  : {
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.5, 0.5],
                      y: [0, -3, 0],
                    }
              }
              transition={{
                duration: 1.5,
                repeat: isDark ? 0 : Infinity,
                delay: flare.delay,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.button>
  );
}
