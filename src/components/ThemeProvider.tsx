"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: Theme;
  setTheme: (theme: Theme, e?: React.MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: "light" as const,
      resolvedTheme: "light" as const,
      setTheme: () => {},
    };
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({ children, defaultTheme = "light" }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionOrigin, setTransitionOrigin] = useState({ x: 0, y: 0 });
  const [transitionTheme, setTransitionTheme] = useState<Theme>(defaultTheme);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(t);
  };

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as Theme | null;
    const initialTheme = stored || defaultTheme;
    setThemeState(initialTheme);
    setTransitionTheme(initialTheme);
    applyTheme(initialTheme);
  }, [defaultTheme]);

  const setTheme = useCallback((newTheme: Theme, e?: React.MouseEvent) => {
    // Get click position for the ripple effect
    if (e) {
      setTransitionOrigin({ x: e.clientX, y: e.clientY });
    } else {
      // Default to top-right (where toggle usually is)
      setTransitionOrigin({ x: window.innerWidth - 60, y: 30 });
    }

    setTransitionTheme(newTheme);
    setIsTransitioning(true);

    // Apply theme after a short delay for the animation
    setTimeout(() => {
      localStorage.setItem("theme", newTheme);
      setThemeState(newTheme);
      applyTheme(newTheme);
    }, 400);

    // End transition
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  }, []);

  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  // Calculate the maximum distance from click point to screen corners
  const maxRadius = Math.sqrt(
    Math.max(
      Math.pow(transitionOrigin.x, 2) + Math.pow(transitionOrigin.y, 2),
      Math.pow(window.innerWidth - transitionOrigin.x, 2) + Math.pow(transitionOrigin.y, 2),
      Math.pow(transitionOrigin.x, 2) + Math.pow(window.innerHeight - transitionOrigin.y, 2),
      Math.pow(window.innerWidth - transitionOrigin.x, 2) + Math.pow(window.innerHeight - transitionOrigin.y, 2)
    )
  );

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme: theme, setTheme }}>
      {children}

      {/* Cinematic theme transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <>
            {/* Main circular reveal */}
            <motion.div
              initial={{
                clipPath: `circle(0px at ${transitionOrigin.x}px ${transitionOrigin.y}px)`
              }}
              animate={{
                clipPath: `circle(${maxRadius * 1.5}px at ${transitionOrigin.x}px ${transitionOrigin.y}px)`
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="fixed inset-0 z-[9999] pointer-events-none"
              style={{
                backgroundColor: transitionTheme === "dark" ? "#000" : "#fff",
              }}
            />

            {/* Glowing ring effect */}
            <motion.div
              initial={{
                scale: 0,
                opacity: 1,
              }}
              animate={{
                scale: maxRadius / 50,
                opacity: 0,
              }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
              className="fixed z-[10000] pointer-events-none rounded-full"
              style={{
                width: 100,
                height: 100,
                left: transitionOrigin.x - 50,
                top: transitionOrigin.y - 50,
                border: `3px solid ${transitionTheme === "dark" ? "#10b981" : "#10b981"}`,
                boxShadow: `0 0 60px 20px ${transitionTheme === "dark" ? "rgba(16, 185, 129, 0.5)" : "rgba(16, 185, 129, 0.5)"}`,
              }}
            />

            {/* Particle burst */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const distance = 150 + Math.random() * 100;
              return (
                <motion.div
                  key={i}
                  initial={{
                    x: transitionOrigin.x,
                    y: transitionOrigin.y,
                    scale: 1,
                    opacity: 1,
                  }}
                  animate={{
                    x: transitionOrigin.x + Math.cos(angle) * distance,
                    y: transitionOrigin.y + Math.sin(angle) * distance,
                    scale: 0,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.6 + Math.random() * 0.3,
                    ease: "easeOut",
                  }}
                  className="fixed z-[10001] pointer-events-none rounded-full bg-emerald-500"
                  style={{
                    width: 8 + Math.random() * 8,
                    height: 8 + Math.random() * 8,
                    boxShadow: "0 0 10px rgba(16, 185, 129, 0.8)",
                  }}
                />
              );
            })}

            {/* Flash effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 0.4, times: [0, 0.1, 1] }}
              className="fixed inset-0 z-[9998] pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${transitionOrigin.x}px ${transitionOrigin.y}px, rgba(16, 185, 129, 0.4) 0%, transparent 50%)`,
              }}
            />
          </>
        )}
      </AnimatePresence>
    </ThemeContext.Provider>
  );
}
