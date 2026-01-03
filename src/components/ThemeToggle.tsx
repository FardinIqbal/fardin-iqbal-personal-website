"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Sun, Moon, X, Type, Check } from "lucide-react";
import { useTheme, THEMES, ACCENTS, FONT_SIZES, BaseTheme, AccentColor, FontSize } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, resolvedTheme, accent, fontSize, setTheme, setAccent, setFontSize } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isDark = resolvedTheme === "dark";

  // Click outside to close
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

  const themeEntries = Object.entries(THEMES) as [BaseTheme, typeof THEMES[BaseTheme]][];
  const accentEntries = Object.entries(ACCENTS) as [AccentColor, typeof ACCENTS[AccentColor]][];
  const fontSizeEntries = Object.entries(FONT_SIZES) as [FontSize, typeof FONT_SIZES[FontSize]][];

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
              className="fixed inset-0 bg-black/50 backdrop-blur-sm sm:hidden z-40"
              onClick={() => setIsExpanded(false)}
            />

            {/* Panel */}
            <motion.div
              ref={panelRef}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="fixed bottom-0 left-0 right-0 p-4 pb-6 bg-background border-t border-border rounded-t-2xl z-50
                sm:absolute sm:bottom-auto sm:top-12 sm:left-auto sm:right-0 sm:p-4 sm:rounded-xl sm:border sm:shadow-2xl sm:w-[340px]"
            >
              {/* Close button - mobile */}
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-3 right-3 p-2 text-foreground-subtle hover:text-foreground sm:hidden"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-5">
                {/* Header */}
                <div className="flex items-center gap-3 pr-8 sm:pr-0">
                  <Palette className="w-4 h-4" style={{ color: ACCENTS[accent].color }} />
                  <span className="text-sm font-medium text-foreground">Appearance</span>
                </div>

                {/* Theme Selection */}
                <div className="space-y-2">
                  <span className="text-xs text-foreground-subtle uppercase tracking-wider">Theme</span>
                  <div className="grid grid-cols-4 sm:grid-cols-4 gap-2">
                    {themeEntries.map(([key, config]) => (
                      <button
                        key={key}
                        onClick={() => setTheme(key)}
                        className={`group relative flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all ${
                          theme === key
                            ? "bg-foreground/10 ring-2 ring-offset-2 ring-offset-background"
                            : "hover:bg-foreground/5"
                        }`}
                        style={{
                          ["--tw-ring-color" as string]: theme === key ? ACCENTS[accent].color : undefined
                        } as React.CSSProperties}
                      >
                        <div
                          className={`w-8 h-8 rounded-full border-2 transition-all ${
                            theme === key ? "border-transparent" : "border-foreground/20"
                          }`}
                          style={{
                            backgroundColor: config.preview,
                            borderColor: theme === key ? ACCENTS[accent].color : undefined
                          }}
                        >
                          {theme === key && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-full h-full flex items-center justify-center"
                            >
                              <Check className="w-4 h-4" style={{ color: config.isDark ? "#fff" : "#000" }} />
                            </motion.div>
                          )}
                        </div>
                        <span className={`text-[10px] ${theme === key ? "text-foreground font-medium" : "text-foreground-muted"}`}>
                          {config.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Accent Color */}
                <div className="space-y-2">
                  <span className="text-xs text-foreground-subtle uppercase tracking-wider">Accent</span>
                  <div className="flex gap-2 flex-wrap">
                    {accentEntries.map(([key, config]) => (
                      <button
                        key={key}
                        onClick={() => setAccent(key)}
                        className={`relative w-8 h-8 rounded-full transition-all ${
                          accent === key ? "ring-2 ring-offset-2 ring-offset-background" : "hover:scale-110"
                        }`}
                        style={{
                          backgroundColor: config.color,
                          ["--tw-ring-color" as string]: accent === key ? config.color : undefined
                        } as React.CSSProperties}
                        title={config.name}
                      >
                        {accent === key && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <Check className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Size */}
                <div className="space-y-2">
                  <span className="text-xs text-foreground-subtle uppercase tracking-wider">Text Size</span>
                  <div className="flex gap-2">
                    {fontSizeEntries.map(([key, config]) => (
                      <button
                        key={key}
                        onClick={() => setFontSize(key)}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm transition-all flex items-center justify-center gap-2 ${
                          fontSize === key
                            ? "text-white font-medium"
                            : "bg-foreground/5 text-foreground-muted hover:bg-foreground/10 hover:text-foreground"
                        }`}
                        style={{
                          backgroundColor: fontSize === key ? ACCENTS[accent].color : undefined
                        }}
                      >
                        <Type className="w-3.5 h-3.5" style={{
                          transform: `scale(${config.scale})`
                        }} />
                        <span>{config.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Toggle */}
                <div className="pt-2 border-t border-border/50">
                  <button
                    onClick={() => setTheme(isDark ? "light" : "dark")}
                    className="w-full py-2.5 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-all flex items-center justify-center gap-2 text-sm text-foreground-muted hover:text-foreground"
                  >
                    {isDark ? (
                      <>
                        <Sun className="w-4 h-4" />
                        <span>Switch to Light</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-4 h-4" />
                        <span>Switch to Dark</span>
                      </>
                    )}
                  </button>
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

        {/* Accent indicator dot */}
        <div
          className="absolute bottom-1 right-1 w-2 h-2 rounded-full"
          style={{ backgroundColor: ACCENTS[accent].color }}
        />
      </motion.button>
    </div>
  );
}
