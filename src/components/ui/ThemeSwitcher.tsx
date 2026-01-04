"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check, X, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { haptic } from "@/lib/haptics";

interface ThemeColors {
  background: string;        // RGB triplet "R G B"
  backgroundSecondary: string;
  backgroundTertiary: string;
  foreground: string;
  foregroundMuted: string;
  foregroundSubtle: string;
  border: string;
  borderSubtle: string;
  surface: string;
  surfaceHover: string;
  accent: string;
  preview: string[];         // Hex for preview swatches
}

interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
}

// Light theme colors (used when in light mode)
const LIGHT_THEME = {
  background: "253 251 247",
  backgroundSecondary: "248 246 240",
  backgroundTertiary: "240 237 230",
  foreground: "28 25 23",
  foregroundMuted: "75 70 65",
  foregroundSubtle: "120 115 108",
  border: "220 215 205",
  borderSubtle: "232 228 220",
  surface: "255 253 249",
  surfaceHover: "250 248 243",
  accent: "30 58 138",
};

const themes: Theme[] = [
  {
    id: "default",
    name: "Warm Dark",
    colors: {
      background: "18 16 14",
      backgroundSecondary: "26 24 21",
      backgroundTertiary: "38 35 31",
      foreground: "245 243 238",
      foregroundMuted: "185 180 172",
      foregroundSubtle: "156 151 143",
      border: "55 50 45",
      borderSubtle: "42 38 34",
      surface: "24 22 19",
      surfaceHover: "34 31 27",
      accent: "30 58 138",
      preview: ["#12100e", "#1a1815", "#f5f3ee", "#1e3a8a"],
    },
  },
  {
    id: "dracula",
    name: "Dracula",
    colors: {
      background: "40 42 54",
      backgroundSecondary: "68 71 90",
      backgroundTertiary: "98 102 124",
      foreground: "248 248 242",
      foregroundMuted: "189 147 249",
      foregroundSubtle: "139 233 253",
      border: "68 71 90",
      borderSubtle: "55 58 74",
      surface: "50 52 66",
      surfaceHover: "60 62 78",
      accent: "189 147 249",
      preview: ["#282a36", "#44475a", "#f8f8f2", "#bd93f9"],
    },
  },
  {
    id: "nord",
    name: "Nord",
    colors: {
      background: "46 52 64",
      backgroundSecondary: "59 66 82",
      backgroundTertiary: "67 76 94",
      foreground: "236 239 244",
      foregroundMuted: "216 222 233",
      foregroundSubtle: "136 192 208",
      border: "76 86 106",
      borderSubtle: "59 66 82",
      surface: "59 66 82",
      surfaceHover: "67 76 94",
      accent: "136 192 208",
      preview: ["#2e3440", "#3b4252", "#eceff4", "#88c0d0"],
    },
  },
  {
    id: "monokai",
    name: "Monokai",
    colors: {
      background: "39 40 34",
      backgroundSecondary: "62 61 50",
      backgroundTertiary: "85 82 66",
      foreground: "248 248 242",
      foregroundMuted: "166 226 46",
      foregroundSubtle: "117 113 94",
      border: "62 61 50",
      borderSubtle: "50 50 42",
      surface: "50 50 42",
      surfaceHover: "62 61 50",
      accent: "249 38 114",
      preview: ["#272822", "#3e3d32", "#f8f8f2", "#f92672"],
    },
  },
  {
    id: "solarized",
    name: "Solarized",
    colors: {
      background: "0 43 54",
      backgroundSecondary: "7 54 66",
      backgroundTertiary: "88 110 117",
      foreground: "131 148 150",
      foregroundMuted: "147 161 161",
      foregroundSubtle: "101 123 131",
      border: "7 54 66",
      borderSubtle: "0 43 54",
      surface: "7 54 66",
      surfaceHover: "88 110 117",
      accent: "38 139 210",
      preview: ["#002b36", "#073642", "#839496", "#268bd2"],
    },
  },
  {
    id: "github",
    name: "GitHub Dark",
    colors: {
      background: "13 17 23",
      backgroundSecondary: "22 27 34",
      backgroundTertiary: "33 38 45",
      foreground: "201 209 217",
      foregroundMuted: "139 148 158",
      foregroundSubtle: "110 118 129",
      border: "48 54 61",
      borderSubtle: "33 38 45",
      surface: "22 27 34",
      surfaceHover: "33 38 45",
      accent: "88 166 255",
      preview: ["#0d1117", "#161b22", "#c9d1d9", "#58a6ff"],
    },
  },
];

export function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("default");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Apply colors to CSS variables
  const applyColors = (colors: typeof LIGHT_THEME) => {
    const root = document.documentElement;
    root.style.setProperty("--color-background", colors.background);
    root.style.setProperty("--color-background-secondary", colors.backgroundSecondary);
    root.style.setProperty("--color-background-tertiary", colors.backgroundTertiary);
    root.style.setProperty("--color-foreground", colors.foreground);
    root.style.setProperty("--color-foreground-muted", colors.foregroundMuted);
    root.style.setProperty("--color-foreground-subtle", colors.foregroundSubtle);
    root.style.setProperty("--color-border", colors.border);
    root.style.setProperty("--color-border-subtle", colors.borderSubtle);
    root.style.setProperty("--color-surface", colors.surface);
    root.style.setProperty("--color-surface-hover", colors.surfaceHover);
    root.style.setProperty("--theme-accent", colors.accent);
  };

  const applyTheme = (themeId: string) => {
    const theme = themes.find((t) => t.id === themeId);
    if (!theme) return;

    applyColors(theme.colors);
    document.documentElement.setAttribute("data-color-theme", themeId);
  };

  useEffect(() => {
    // Check initial mode
    const isLight = document.documentElement.classList.contains("light");
    setIsDarkMode(!isLight);

    // Load saved color theme (only apply if in dark mode)
    const saved = localStorage.getItem("portfolio-theme");
    if (saved && !isLight) {
      setCurrentTheme(saved);
      applyTheme(saved);
    } else if (isLight) {
      applyColors(LIGHT_THEME);
    }

    // Listen for open event from command palette
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-theme-switcher", handleOpen);

    // Listen for light/dark mode changes
    const handleModeChange = (e: CustomEvent<{ theme: string }>) => {
      const isLight = e.detail.theme === "light";
      setIsDarkMode(!isLight);

      if (isLight) {
        // In light mode, apply light theme colors
        applyColors(LIGHT_THEME);
        document.documentElement.setAttribute("data-color-theme", "light");
      } else {
        // In dark mode, restore saved color theme
        const savedTheme = localStorage.getItem("portfolio-theme") || "default";
        setCurrentTheme(savedTheme);
        applyTheme(savedTheme);
      }
    };

    window.addEventListener("theme-mode-change", handleModeChange as EventListener);

    return () => {
      window.removeEventListener("open-theme-switcher", handleOpen);
      window.removeEventListener("theme-mode-change", handleModeChange as EventListener);
    };
  }, []);

  const selectTheme = (themeId: string) => {
    haptic("selection");
    setCurrentTheme(themeId);
    applyTheme(themeId);
    localStorage.setItem("portfolio-theme", themeId);
  };

  // Hide the color theme button in light mode
  if (!isDarkMode) return null;

  return (
    <>
      {/* Floating Button - Only shown in dark mode */}
      <motion.button
        onClick={() => {
          haptic("light");
          setIsOpen(true);
        }}
        className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-background-secondary border border-border shadow-lg hover:bg-background-tertiary transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Change color theme (dark mode only)"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        <Palette className="w-5 h-5 text-foreground-muted" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed bottom-24 left-6 z-50 w-72 bg-background border border-border rounded-xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <Moon className="w-4 h-4 text-foreground-subtle" />
                  <h3 className="font-medium text-foreground">Dark Mode Themes</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-foreground-subtle hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Themes Grid */}
              <div className="p-3 grid grid-cols-2 gap-2">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => selectTheme(theme.id)}
                    className={cn(
                      "relative p-3 rounded-lg border transition-all text-left",
                      currentTheme === theme.id
                        ? "border-foreground/30 bg-foreground/5"
                        : "border-border hover:border-foreground/20"
                    )}
                  >
                    {/* Preview Colors */}
                    <div className="flex gap-1 mb-2">
                      {theme.colors.preview.map((color, i) => (
                        <div
                          key={i}
                          className="w-4 h-4 rounded-full border border-white/10"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>

                    {/* Name */}
                    <p className="text-sm font-medium text-foreground">{theme.name}</p>

                    {/* Check */}
                    {currentTheme === theme.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2"
                      >
                        <Check className="w-4 h-4 text-green-400" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
