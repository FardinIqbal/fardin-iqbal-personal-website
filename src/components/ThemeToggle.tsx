"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { useTheme, THEMES, Theme } from "./ThemeProvider";

// Artistic theme icons as mini compositions
function ThemeIcon({ themeKey, isActive }: { themeKey: Theme; isActive: boolean }) {
  const iconVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  const icons: Record<Theme, React.ReactNode> = {
    light: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <defs>
          <linearGradient id="light-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f0f0f0" />
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="18" fill="url(#light-grad)" stroke="#e0e0e0" strokeWidth="1" />
        <motion.circle
          cx="20" cy="20" r="8"
          fill="#fbbf24"
          initial={{ scale: 0.8, opacity: 0.8 }}
          animate={{ scale: [0.8, 1, 0.8], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <motion.line
            key={angle}
            x1={20 + Math.cos((angle * Math.PI) / 180) * 11}
            y1={20 + Math.sin((angle * Math.PI) / 180) * 11}
            x2={20 + Math.cos((angle * Math.PI) / 180) * 15}
            y2={20 + Math.sin((angle * Math.PI) / 180) * 15}
            stroke="#fbbf24"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </svg>
    ),
    dark: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <circle cx="20" cy="20" r="18" fill="#000000" stroke="#333" strokeWidth="1" />
        <motion.circle
          cx="16" cy="18" r="10"
          fill="#1a1a1a"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        {[[12, 10], [26, 12], [30, 24], [22, 30], [10, 26]].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx} cy={cy} r={1}
            fill="#fff"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </svg>
    ),
    midnight: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <defs>
          <linearGradient id="midnight-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="100%" stopColor="#0d111c" />
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="18" fill="url(#midnight-grad)" stroke="#2d4a6f" strokeWidth="1" />
        {[[8, 8], [32, 10], [28, 28], [12, 32], [20, 16], [26, 20], [14, 22]].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx} cy={cy} r={i % 2 === 0 ? 1.2 : 0.8}
            fill="#e2e8f0"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
        <motion.path
          d="M24 12 Q28 16 26 22 Q22 20 24 12"
          fill="#6366f1"
          opacity="0.4"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </svg>
    ),
    sepia: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <defs>
          <linearGradient id="sepia-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fdf8f0" />
            <stop offset="100%" stopColor="#f0e6d3" />
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="18" fill="url(#sepia-grad)" stroke="#d4c4a8" strokeWidth="1" />
        {/* Book pages */}
        <motion.rect x="12" y="14" width="16" height="12" rx="1" fill="#e8dcc8" stroke="#c4b49a" strokeWidth="0.5"
          animate={{ y: [14, 13, 14] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <line x1="14" y1="17" x2="26" y2="17" stroke="#a89070" strokeWidth="0.8" />
        <line x1="14" y1="20" x2="24" y2="20" stroke="#a89070" strokeWidth="0.8" />
        <line x1="14" y1="23" x2="22" y2="23" stroke="#a89070" strokeWidth="0.8" />
      </svg>
    ),
    nord: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <defs>
          <linearGradient id="nord-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4c566a" />
            <stop offset="100%" stopColor="#2e3440" />
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="18" fill="url(#nord-grad)" stroke="#5e6779" strokeWidth="1" />
        {/* Aurora effect */}
        <motion.path
          d="M8 24 Q14 18 20 22 Q26 26 32 20"
          stroke="#88c0d0"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.5 }}
          animate={{ pathLength: [0, 1, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.path
          d="M6 28 Q12 22 20 26 Q28 30 34 24"
          stroke="#81a1c1"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        />
        {/* Snow peaks */}
        <path d="M10 32 L16 26 L22 32 L28 24 L34 32" fill="none" stroke="#eceff4" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    tokyo: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <defs>
          <linearGradient id="tokyo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#24283b" />
            <stop offset="100%" stopColor="#1a1b26" />
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="18" fill="url(#tokyo-grad)" stroke="#414868" strokeWidth="1" />
        {/* Neon lines */}
        <motion.line x1="10" y1="28" x2="10" y2="18" stroke="#bb9af7" strokeWidth="2" strokeLinecap="round"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.line x1="16" y1="30" x2="16" y2="14" stroke="#7aa2f7" strokeWidth="2" strokeLinecap="round"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        />
        <motion.line x1="22" y1="28" x2="22" y2="12" stroke="#f7768e" strokeWidth="2" strokeLinecap="round"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        />
        <motion.line x1="28" y1="30" x2="28" y2="16" stroke="#9ece6a" strokeWidth="2" strokeLinecap="round"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
        />
        {/* Reflection */}
        <line x1="8" y1="32" x2="32" y2="32" stroke="#565f89" strokeWidth="0.5" />
      </svg>
    ),
    emerald: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <defs>
          <linearGradient id="emerald-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0f1714" />
            <stop offset="100%" stopColor="#1a2e25" />
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="18" fill="url(#emerald-grad)" stroke="#2d4a3e" strokeWidth="1" />
        {/* Trees */}
        <motion.path d="M12 30 L12 24 L8 24 L12 18 L10 18 L14 12 L18 18 L16 18 L20 24 L16 24 L16 30"
          fill="#34d399" fillOpacity="0.6"
          animate={{ y: [0, -1, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.path d="M24 30 L24 26 L21 26 L24 21 L22 21 L26 16 L30 21 L28 21 L31 26 L28 26 L28 30"
          fill="#10b981" fillOpacity="0.8"
          animate={{ y: [0, -1, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />
        {/* Fireflies */}
        {[[10, 14], [30, 12], [18, 10]].map(([cx, cy], i) => (
          <motion.circle key={i} cx={cx} cy={cy} r="1" fill="#fef08a"
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.7 }}
          />
        ))}
      </svg>
    ),
    rose: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <defs>
          <linearGradient id="rose-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff5f7" />
            <stop offset="100%" stopColor="#ffe4e9" />
          </linearGradient>
          <linearGradient id="petal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fda4af" />
            <stop offset="100%" stopColor="#fb7185" />
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="18" fill="url(#rose-grad)" stroke="#fecdd3" strokeWidth="1" />
        {/* Rose petals */}
        <motion.ellipse cx="20" cy="18" rx="6" ry="4" fill="url(#petal-grad)"
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ transformOrigin: "20px 20px" }}
        />
        <motion.ellipse cx="16" cy="20" rx="5" ry="3" fill="#fb7185" fillOpacity="0.8"
          animate={{ rotate: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.3 }}
          style={{ transformOrigin: "20px 20px" }}
        />
        <motion.ellipse cx="24" cy="20" rx="5" ry="3" fill="#f43f5e" fillOpacity="0.7"
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.6 }}
          style={{ transformOrigin: "20px 20px" }}
        />
        <circle cx="20" cy="20" r="3" fill="#e11d48" />
        {/* Leaves */}
        <path d="M14 26 Q12 30 16 28 Q14 26 14 26" fill="#86efac" />
        <path d="M26 26 Q28 30 24 28 Q26 26 26 26" fill="#86efac" />
      </svg>
    ),
  };

  return (
    <motion.div
      className="w-12 h-12 rounded-xl overflow-hidden"
      variants={iconVariants}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      style={{
        boxShadow: isActive
          ? `0 0 0 2px rgb(var(--color-background)), 0 0 0 4px #3b82f6`
          : "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {icons[themeKey]}
    </motion.div>
  );
}

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isDark = resolvedTheme === "dark";

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      isExpanded &&
      panelRef.current &&
      buttonRef.current &&
      !panelRef.current.contains(e.target as Node) &&
      !buttonRef.current.contains(e.target as Node)
    ) {
      setIsExpanded(false);
    }
  }, [isExpanded]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const themeEntries = Object.entries(THEMES) as [Theme, typeof THEMES[Theme]][];

  return (
    <div className="relative">
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsExpanded(false)}
            />

            {/* Panel */}
            <motion.div
              ref={panelRef}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-x-4 bottom-4 p-6 rounded-2xl z-50 sm:absolute sm:inset-auto sm:bottom-auto sm:top-14 sm:right-0 sm:w-[380px]"
              style={{
                background: THEMES[theme].isDark
                  ? "linear-gradient(145deg, #1a1a1a, #0a0a0a)"
                  : "linear-gradient(145deg, #ffffff, #f5f5f5)",
                border: `1px solid ${THEMES[theme].isDark ? '#333' : '#e0e0e0'}`,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
              }}
            >
              {/* Close button */}
              <motion.button
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-foreground/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-foreground-muted" />
              </motion.button>

              <div className="space-y-6">
                {/* Header */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Appearance</h3>
                  <p className="text-sm text-foreground-muted mt-1">Choose your visual experience</p>
                </div>

                {/* Theme Grid */}
                <div className="grid grid-cols-4 gap-4">
                  {themeEntries.map(([key, config], index) => (
                    <motion.button
                      key={key}
                      onClick={() => {
                        setTheme(key);
                      }}
                      className="flex flex-col items-center gap-2 p-2 rounded-xl transition-colors hover:bg-foreground/5"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ThemeIcon themeKey={key} isActive={theme === key} />
                      <div className="text-center">
                        <span className={`text-xs font-medium block ${
                          theme === key ? "text-foreground" : "text-foreground-muted"
                        }`}>
                          {config.name}
                        </span>
                        <span className="text-[10px] text-foreground-subtle">
                          {config.description}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toggle Button - Animated palette icon */}
      <motion.button
        ref={buttonRef}
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative p-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-foreground/5 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Theme settings"
      >
        <div className="relative w-5 h-5">
          <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5">
            {/* Palette shape */}
            <motion.path
              d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.5 0 2.5-1 2.5-2.5 0-.6-.2-1.1-.5-1.5-.3-.4-.5-.9-.5-1.5 0-1.1.9-2 2-2h2.5c3 0 5.5-2.5 5.5-5.5C21.5 5.5 17.5 2 12 2z"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ pathLength: isExpanded ? 1 : 1 }}
            />
            {/* Color dots */}
            <motion.circle cx="7" cy="10" r="1.5" fill="currentColor" stroke="none"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            />
            <motion.circle cx="10" cy="6" r="1.5" fill="currentColor" stroke="none"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
            <motion.circle cx="15" cy="6" r="1.5" fill="currentColor" stroke="none"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            />
            <motion.circle cx="18" cy="10" r="1.5" fill="currentColor" stroke="none"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
            />
          </svg>
        </div>
      </motion.button>
    </div>
  );
}
