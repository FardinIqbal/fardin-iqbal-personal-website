"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Base themes
export type BaseTheme = "light" | "dark" | "midnight" | "sepia" | "ocean" | "forest" | "rose";

// Accent colors
export type AccentColor = "blue" | "emerald" | "violet" | "amber" | "rose" | "cyan";

// Font sizes
export type FontSize = "small" | "default" | "large";

interface ThemeConfig {
  base: BaseTheme;
  accent: AccentColor;
  fontSize: FontSize;
}

interface ThemeContextType {
  theme: BaseTheme;
  resolvedTheme: "light" | "dark";
  accent: AccentColor;
  fontSize: FontSize;
  setTheme: (theme: BaseTheme) => void;
  setAccent: (accent: AccentColor) => void;
  setFontSize: (size: FontSize) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: "dark" as const,
      resolvedTheme: "dark" as const,
      accent: "blue" as const,
      fontSize: "default" as const,
      setTheme: () => {},
      setAccent: () => {},
      setFontSize: () => {},
    };
  }
  return context;
}

// Theme configurations
export const THEMES: Record<BaseTheme, { name: string; isDark: boolean; preview: string; description: string }> = {
  light: { name: "Light", isDark: false, preview: "#ffffff", description: "Clean and bright" },
  dark: { name: "Dark", isDark: true, preview: "#0a0a0f", description: "Easy on the eyes" },
  midnight: { name: "Midnight", isDark: true, preview: "#0f0f1a", description: "Deep blue darkness" },
  sepia: { name: "Sepia", isDark: false, preview: "#f5f0e6", description: "Warm and classic" },
  ocean: { name: "Ocean", isDark: true, preview: "#0a1929", description: "Deep sea vibes" },
  forest: { name: "Forest", isDark: true, preview: "#0a1a0a", description: "Natural and calm" },
  rose: { name: "Rose", isDark: false, preview: "#fff5f5", description: "Soft and elegant" },
};

export const ACCENTS: Record<AccentColor, { name: string; color: string; hover: string }> = {
  blue: { name: "Blue", color: "#3b82f6", hover: "#2563eb" },
  emerald: { name: "Emerald", color: "#10b981", hover: "#059669" },
  violet: { name: "Violet", color: "#8b5cf6", hover: "#7c3aed" },
  amber: { name: "Amber", color: "#f59e0b", hover: "#d97706" },
  rose: { name: "Rose", color: "#f43f5e", hover: "#e11d48" },
  cyan: { name: "Cyan", color: "#06b6d4", hover: "#0891b2" },
};

export const FONT_SIZES: Record<FontSize, { name: string; scale: number }> = {
  small: { name: "Small", scale: 0.9 },
  default: { name: "Default", scale: 1 },
  large: { name: "Large", scale: 1.1 },
};

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: BaseTheme;
}

export function ThemeProvider({ children, defaultTheme = "dark" }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<BaseTheme>(defaultTheme);
  const [accent, setAccentState] = useState<AccentColor>("blue");
  const [fontSize, setFontSizeState] = useState<FontSize>("default");
  const [mounted, setMounted] = useState(false);

  const applyTheme = (t: BaseTheme, a: AccentColor, f: FontSize) => {
    const root = document.documentElement;

    // Remove all theme classes
    Object.keys(THEMES).forEach(key => root.classList.remove(key));
    root.classList.remove("light", "dark");

    // Add new theme class
    root.classList.add(t);
    root.classList.add(THEMES[t].isDark ? "dark" : "light");

    // Set accent color CSS variables
    const accentConfig = ACCENTS[a];
    root.style.setProperty("--accent", accentConfig.color);
    root.style.setProperty("--accent-hover", accentConfig.hover);
    root.style.setProperty("--accent-foreground", "#ffffff");

    // Set font size
    root.style.setProperty("--font-scale", FONT_SIZES[f].scale.toString());
    root.style.fontSize = `${FONT_SIZES[f].scale * 100}%`;

    // Apply theme-specific CSS variables
    applyThemeVariables(t);
  };

  const applyThemeVariables = (t: BaseTheme) => {
    const root = document.documentElement;

    switch (t) {
      case "midnight":
        root.style.setProperty("--background", "#0f0f1a");
        root.style.setProperty("--foreground", "#e5e7eb");
        root.style.setProperty("--background-secondary", "#1a1a2e");
        root.style.setProperty("--background-tertiary", "#252542");
        break;
      case "sepia":
        root.style.setProperty("--background", "#f5f0e6");
        root.style.setProperty("--foreground", "#3d3530");
        root.style.setProperty("--background-secondary", "#ebe5d9");
        root.style.setProperty("--background-tertiary", "#ddd5c5");
        break;
      case "ocean":
        root.style.setProperty("--background", "#0a1929");
        root.style.setProperty("--foreground", "#b8c7dc");
        root.style.setProperty("--background-secondary", "#0f2744");
        root.style.setProperty("--background-tertiary", "#15345a");
        break;
      case "forest":
        root.style.setProperty("--background", "#0a1a0a");
        root.style.setProperty("--foreground", "#c5d9c5");
        root.style.setProperty("--background-secondary", "#0f2a0f");
        root.style.setProperty("--background-tertiary", "#153a15");
        break;
      case "rose":
        root.style.setProperty("--background", "#fff5f5");
        root.style.setProperty("--foreground", "#4a3535");
        root.style.setProperty("--background-secondary", "#ffe8e8");
        root.style.setProperty("--background-tertiary", "#ffd9d9");
        break;
      default:
        // Reset to default (handled by CSS)
        root.style.removeProperty("--background");
        root.style.removeProperty("--foreground");
        root.style.removeProperty("--background-secondary");
        root.style.removeProperty("--background-tertiary");
    }
  };

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme") as BaseTheme | null;
    const storedAccent = localStorage.getItem("accent") as AccentColor | null;
    const storedFontSize = localStorage.getItem("fontSize") as FontSize | null;

    const initialTheme = storedTheme || defaultTheme;
    const initialAccent = storedAccent || "blue";
    const initialFontSize = storedFontSize || "default";

    setThemeState(initialTheme);
    setAccentState(initialAccent);
    setFontSizeState(initialFontSize);
    applyTheme(initialTheme, initialAccent, initialFontSize);
  }, [defaultTheme]);

  const setTheme = (newTheme: BaseTheme) => {
    localStorage.setItem("theme", newTheme);
    setThemeState(newTheme);
    applyTheme(newTheme, accent, fontSize);
  };

  const setAccent = (newAccent: AccentColor) => {
    localStorage.setItem("accent", newAccent);
    setAccentState(newAccent);
    applyTheme(theme, newAccent, fontSize);
  };

  const setFontSize = (newSize: FontSize) => {
    localStorage.setItem("fontSize", newSize);
    setFontSizeState(newSize);
    applyTheme(theme, accent, newSize);
  };

  const resolvedTheme = THEMES[theme].isDark ? "dark" : "light";

  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{
      theme,
      resolvedTheme,
      accent,
      fontSize,
      setTheme,
      setAccent,
      setFontSize
    }}>
      {children}
    </ThemeContext.Provider>
  );
}
