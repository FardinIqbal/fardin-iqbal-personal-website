"use client";

import { motion } from "framer-motion";
import { Sun, Moon, BookOpen } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { haptic } from "@/lib/haptics";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes: Array<{ id: "light" | "dark" | "sepia"; label: string; icon: typeof Sun }> = [
    { id: "light", label: "Light", icon: Sun },
    { id: "dark", label: "Dark", icon: Moon },
    { id: "sepia", label: "Sepia", icon: BookOpen },
  ];

  const currentIndex = themes.findIndex((t) => t.id === theme);
  const nextTheme = themes[(currentIndex + 1) % themes.length];
  const Icon = themes[currentIndex].icon;

  const handleClick = () => {
    haptic("selection");
    setTheme(nextTheme.id);
  };

  return (
    <motion.button
      onClick={handleClick}
      className={cn(
        "fixed top-8 right-8 z-50 w-10 h-10 rounded-full",
        "bg-background-tertiary border border-border",
        "flex items-center justify-center",
        "opacity-60 hover:opacity-100 transition-opacity",
        "hover:border-foreground/20"
      )}
      aria-label={`Switch to ${nextTheme.label} theme`}
      title={`Current: ${themes[currentIndex].label} - Click for ${nextTheme.label}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-4 h-4 text-foreground" />
    </motion.button>
  );
}
