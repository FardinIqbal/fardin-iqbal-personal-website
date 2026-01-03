"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, X, Check } from "lucide-react";
import { useTheme, THEMES, Theme } from "./ThemeProvider";

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
            {/* Mobile backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm sm:hidden z-40"
              onClick={() => setIsExpanded(false)}
            />

            {/* Panel */}
            <motion.div
              ref={panelRef}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="fixed bottom-0 left-0 right-0 p-5 pb-8 z-50
                sm:absolute sm:bottom-auto sm:top-12 sm:left-auto sm:right-0 sm:p-4 sm:rounded-xl sm:w-[320px]"
              style={{
                background: `rgb(${THEMES[theme].isDark ? '20 20 20' : '255 255 255'})`,
                borderTop: '1px solid rgb(var(--color-border))',
                boxShadow: '0 -10px 40px rgba(0,0,0,0.2)',
              }}
            >
              {/* Close button - mobile */}
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-foreground/10 transition-colors sm:hidden"
              >
                <X className="w-5 h-5 text-foreground-muted" />
              </button>

              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">Choose Theme</span>
                </div>

                {/* Theme Grid */}
                <div className="grid grid-cols-4 gap-3">
                  {themeEntries.map(([key, config]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setTheme(key);
                        setIsExpanded(false);
                      }}
                      className="group flex flex-col items-center gap-2 p-2 rounded-lg transition-all hover:bg-foreground/5"
                    >
                      {/* Theme preview circle */}
                      <div
                        className={`relative w-10 h-10 rounded-full transition-all overflow-hidden ${
                          theme === key
                            ? "ring-2 ring-offset-2 ring-blue-500 ring-offset-background"
                            : "hover:scale-110"
                        }`}
                        style={{ background: config.bg }}
                      >
                        {/* Inner color indicator */}
                        <div
                          className="absolute inset-[3px] rounded-full"
                          style={{
                            background: `linear-gradient(135deg, ${config.bg} 50%, ${config.fg} 50%)`
                          }}
                        />
                        {/* Check mark */}
                        {theme === key && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-0 flex items-center justify-center bg-blue-500/80"
                          >
                            <Check className="w-4 h-4 text-white" strokeWidth={3} />
                          </motion.div>
                        )}
                      </div>
                      {/* Theme name */}
                      <span className={`text-[11px] leading-tight text-center ${
                        theme === key ? "text-foreground font-medium" : "text-foreground-muted"
                      }`}>
                        {config.name}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Current theme description */}
                <div className="pt-3 border-t border-border/50 text-center">
                  <span className="text-xs text-foreground-subtle">
                    {THEMES[theme].description}
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        ref={buttonRef}
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        whileTap={{ scale: 0.95 }}
        aria-label="Theme settings"
      >
        <div className="relative w-5 h-5">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={false}
            animate={{
              opacity: isDark ? 1 : 0,
              scale: isDark ? 1 : 0.5,
              rotate: isDark ? 0 : 90,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Moon className="w-5 h-5" strokeWidth={1.5} />
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={false}
            animate={{
              opacity: isDark ? 0 : 1,
              scale: isDark ? 0.5 : 1,
              rotate: isDark ? -90 : 0,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Sun className="w-5 h-5" strokeWidth={1.5} />
          </motion.div>
        </div>
      </motion.button>
    </div>
  );
}
