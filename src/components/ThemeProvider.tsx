"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: "dark" as const,
      setTheme: () => {},
    };
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({ children, defaultTheme = "dark" }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(t);

    // Dispatch custom event for theme change (used by ThemeSwitcher)
    window.dispatchEvent(new CustomEvent("theme-mode-change", { detail: { theme: t } }));
  };

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as Theme | null;
    const initialTheme = stored === "light" || stored === "dark" ? stored : defaultTheme;
    setThemeState(initialTheme);
    applyTheme(initialTheme);
  }, [defaultTheme]);

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem("theme", newTheme);
    setThemeState(newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
