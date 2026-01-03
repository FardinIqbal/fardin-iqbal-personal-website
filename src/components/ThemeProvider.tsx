"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "midnight" | "sepia" | "nord" | "tokyo" | "emerald" | "rose";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: "dark" as const,
      resolvedTheme: "dark" as const,
      setTheme: () => {},
    };
  }
  return context;
}

// Theme configurations
export const THEMES: Record<Theme, {
  name: string;
  isDark: boolean;
  bg: string;
  fg: string;
  description: string;
}> = {
  light: {
    name: "Light",
    isDark: false,
    bg: "#ffffff",
    fg: "#0f0f0f",
    description: "Clean & bright"
  },
  dark: {
    name: "Dark",
    isDark: true,
    bg: "#000000",
    fg: "#ffffff",
    description: "Pure black"
  },
  midnight: {
    name: "Midnight",
    isDark: true,
    bg: "#0d111c",
    fg: "#e2e8f0",
    description: "Cosmic blue"
  },
  sepia: {
    name: "Sepia",
    isDark: false,
    bg: "#fdf8f0",
    fg: "#3e2f25",
    description: "Vintage paper"
  },
  nord: {
    name: "Nord",
    isDark: true,
    bg: "#2e3440",
    fg: "#eceff4",
    description: "Arctic frost"
  },
  tokyo: {
    name: "Tokyo",
    isDark: true,
    bg: "#1a1b26",
    fg: "#c0caf5",
    description: "Neon nights"
  },
  emerald: {
    name: "Emerald",
    isDark: true,
    bg: "#0f1714",
    fg: "#dcede6",
    description: "Deep forest"
  },
  rose: {
    name: "Rose",
    isDark: false,
    bg: "#fffbfc",
    fg: "#43142b",
    description: "Soft blush"
  },
};

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({ children, defaultTheme = "dark" }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;

    // Remove all theme classes
    Object.keys(THEMES).forEach(key => root.classList.remove(key));

    // Add new theme class
    root.classList.add(t);
  };

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as Theme | null;
    const initialTheme = stored && THEMES[stored] ? stored : defaultTheme;
    setThemeState(initialTheme);
    applyTheme(initialTheme);
  }, [defaultTheme]);

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem("theme", newTheme);
    setThemeState(newTheme);
    applyTheme(newTheme);
  };

  const resolvedTheme = THEMES[theme]?.isDark ? "dark" : "light";

  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
