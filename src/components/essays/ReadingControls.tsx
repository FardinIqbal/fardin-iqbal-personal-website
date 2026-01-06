"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings2, Type, Maximize2, AlignJustify, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReadingSettings {
  fontSize: number;
  lineHeight: number;
  contentWidth: number;
  fontFamily: "serif" | "sans" | "classic";
  theme: "default" | "sepia";
}

const DEFAULT_SETTINGS: ReadingSettings = {
  fontSize: 19,
  lineHeight: 1.75,
  contentWidth: 680,
  fontFamily: "serif",
  theme: "default",
};

const THEMES = [
  { id: "default", name: "Default", bg: "bg-background", preview: "bg-background" },
  { id: "sepia", name: "Sepia", bg: "bg-[#f4f1ea]", preview: "bg-[#f4f1ea]" },
] as const;

const FONTS = [
  { id: "serif", name: "Serif", sample: "Aa", className: "font-serif" },
  { id: "sans", name: "Sans", sample: "Aa", className: "font-sans" },
  { id: "classic", name: "Classic", sample: "Aa", className: "font-display" },
] as const;

export function ReadingControls() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<ReadingSettings>(DEFAULT_SETTINGS);

  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("essay-reading-settings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      } catch (e) {
        console.error("Failed to parse reading settings:", e);
      }
    }
  }, []);

  // Apply settings to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--essay-font-size", `${settings.fontSize}px`);
    root.style.setProperty("--essay-line-height", `${settings.lineHeight}`);
    root.style.setProperty("--essay-content-width", `${settings.contentWidth}px`);

    // Apply font family
    const articleEl = document.querySelector(".essay-content");
    if (articleEl) {
      articleEl.classList.remove("font-serif", "font-sans", "font-display");
      articleEl.classList.add(
        settings.fontFamily === "serif" ? "font-serif" :
        settings.fontFamily === "sans" ? "font-sans" : "font-display"
      );
    }

    // Apply theme - default uses main site theme, sepia uses sepia
    if (settings.theme === "default") {
      document.body.removeAttribute("data-essay-theme");
    } else {
      document.body.setAttribute("data-essay-theme", settings.theme);
    }
  }, [settings]);

  // Save settings to localStorage
  const updateSettings = (updates: Partial<ReadingSettings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    localStorage.setItem("essay-reading-settings", JSON.stringify(newSettings));
  };

  return (
    <>
      {/* FAB Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full",
          "bg-background-tertiary border border-border",
          "flex items-center justify-center",
          "shadow-lg hover:shadow-xl transition-all",
          "hover:border-foreground/20 hover:scale-105",
          isOpen && "bg-foreground text-background border-foreground"
        )}
        aria-label="Reading settings"
      >
        <Settings2 className="w-5 h-5" />
      </motion.button>

      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 left-6 z-40 w-80 max-w-[calc(100vw-3rem)]"
          >
            <div className="bg-background-tertiary border border-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <h3 className="text-sm font-medium text-foreground">Reading Settings</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-foreground-subtle hover:text-foreground hover:bg-foreground/5 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 space-y-6">
                {/* Theme */}
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-foreground-subtle mb-3">
                    Theme
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {THEMES.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => updateSettings({ theme: theme.id as ReadingSettings["theme"] })}
                        className={cn(
                          "aspect-square rounded-lg border-2 transition-all",
                          theme.preview,
                          settings.theme === theme.id
                            ? "border-[rgb(var(--accent-red))] ring-2 ring-[rgb(var(--accent-red))]/20"
                            : "border-border hover:border-foreground/20"
                        )}
                        title={theme.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Font Family */}
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-foreground-subtle mb-3">
                    Font
                  </p>
                  <div className="flex gap-2">
                    {FONTS.map((font) => (
                      <button
                        key={font.id}
                        onClick={() => updateSettings({ fontFamily: font.id as ReadingSettings["fontFamily"] })}
                        className={cn(
                          "flex-1 py-3 px-2 rounded-lg border transition-all text-center",
                          settings.fontFamily === font.id
                            ? "border-[rgb(var(--accent-red))] bg-[rgb(var(--accent-red))]/10 text-foreground"
                            : "border-border text-foreground-muted hover:border-foreground/20"
                        )}
                      >
                        <span className={cn("block text-lg mb-0.5", font.className)}>
                          {font.sample}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider opacity-60">
                          {font.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Size */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Type className="w-3.5 h-3.5 text-foreground-subtle" />
                      <span className="text-xs text-foreground-muted">Font Size</span>
                    </div>
                    <span className="text-xs font-mono text-foreground-subtle">
                      {settings.fontSize}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="14"
                    max="24"
                    value={settings.fontSize}
                    onChange={(e) => updateSettings({ fontSize: parseInt(e.target.value) })}
                    className="w-full h-1 bg-border rounded-full appearance-none cursor-pointer accent-foreground"
                  />
                </div>

                {/* Line Height */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <AlignJustify className="w-3.5 h-3.5 text-foreground-subtle" />
                      <span className="text-xs text-foreground-muted">Line Height</span>
                    </div>
                    <span className="text-xs font-mono text-foreground-subtle">
                      {settings.lineHeight.toFixed(1)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1.4"
                    max="2.2"
                    step="0.1"
                    value={settings.lineHeight}
                    onChange={(e) => updateSettings({ lineHeight: parseFloat(e.target.value) })}
                    className="w-full h-1 bg-border rounded-full appearance-none cursor-pointer accent-foreground"
                  />
                </div>

                {/* Content Width */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Maximize2 className="w-3.5 h-3.5 text-foreground-subtle" />
                      <span className="text-xs text-foreground-muted">Width</span>
                    </div>
                    <span className="text-xs font-mono text-foreground-subtle">
                      {settings.contentWidth}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="520"
                    max="840"
                    step="20"
                    value={settings.contentWidth}
                    onChange={(e) => updateSettings({ contentWidth: parseInt(e.target.value) })}
                    className="w-full h-1 bg-border rounded-full appearance-none cursor-pointer accent-foreground"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
