"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Theme {
  id: string;
  name: string;
  colors: {
    background: string;
    foreground: string;
    accent: string;
    preview: string[];
  };
}

const themes: Theme[] = [
  {
    id: "default",
    name: "Midnight",
    colors: {
      background: "#0a0a0a",
      foreground: "#fafafa",
      accent: "#6366f1",
      preview: ["#0a0a0a", "#1a1a1a", "#6366f1", "#fafafa"],
    },
  },
  {
    id: "dracula",
    name: "Dracula",
    colors: {
      background: "#282a36",
      foreground: "#f8f8f2",
      accent: "#bd93f9",
      preview: ["#282a36", "#44475a", "#bd93f9", "#f8f8f2"],
    },
  },
  {
    id: "nord",
    name: "Nord",
    colors: {
      background: "#2e3440",
      foreground: "#eceff4",
      accent: "#88c0d0",
      preview: ["#2e3440", "#3b4252", "#88c0d0", "#eceff4"],
    },
  },
  {
    id: "monokai",
    name: "Monokai",
    colors: {
      background: "#272822",
      foreground: "#f8f8f2",
      accent: "#f92672",
      preview: ["#272822", "#3e3d32", "#f92672", "#f8f8f2"],
    },
  },
  {
    id: "solarized",
    name: "Solarized",
    colors: {
      background: "#002b36",
      foreground: "#839496",
      accent: "#268bd2",
      preview: ["#002b36", "#073642", "#268bd2", "#839496"],
    },
  },
  {
    id: "github",
    name: "GitHub Dark",
    colors: {
      background: "#0d1117",
      foreground: "#c9d1d9",
      accent: "#58a6ff",
      preview: ["#0d1117", "#161b22", "#58a6ff", "#c9d1d9"],
    },
  },
];

export function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("default");

  useEffect(() => {
    // Load saved theme
    const saved = localStorage.getItem("portfolio-theme");
    if (saved) {
      setCurrentTheme(saved);
      applyTheme(saved);
    }

    // Listen for open event from command palette
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-theme-switcher", handleOpen);
    return () => window.removeEventListener("open-theme-switcher", handleOpen);
  }, []);

  const applyTheme = (themeId: string) => {
    const theme = themes.find((t) => t.id === themeId);
    if (!theme) return;

    const root = document.documentElement;
    root.style.setProperty("--color-background", theme.colors.background);
    root.style.setProperty("--color-foreground", theme.colors.foreground);
    root.style.setProperty("--color-primary", theme.colors.accent);

    // Update CSS variables for the theme
    if (themeId === "default") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", themeId);
    }
  };

  const selectTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    applyTheme(themeId);
    localStorage.setItem("portfolio-theme", themeId);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-background-secondary border border-border shadow-lg hover:bg-background-tertiary transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Change theme"
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
                <h3 className="font-medium text-foreground">Theme</h3>
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
