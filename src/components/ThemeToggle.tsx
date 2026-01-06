"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { haptic } from "@/lib/haptics";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mobileNavVisible, setMobileNavVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile vs desktop
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Listen for mobile nav visibility changes
  useEffect(() => {
    const handleNavVisibility = (e: CustomEvent<{ visible: boolean }>) => {
      setMobileNavVisible(e.detail.visible);
    };

    window.addEventListener("mobileNavVisibility", handleNavVisibility as EventListener);
    return () => window.removeEventListener("mobileNavVisibility", handleNavVisibility as EventListener);
  }, []);

  const themes: Array<{ id: "light" | "dark"; label: string; icon: typeof Sun | typeof Moon }> = [
    { id: "light", label: "Light", icon: Sun },
    { id: "dark", label: "Dark", icon: Moon },
  ];

  const currentIndex = themes.findIndex((t) => t.id === theme);
  const nextTheme = themes[(currentIndex + 1) % themes.length];
  const Icon = themes[currentIndex].icon;

  const handleClick = () => {
    haptic("selection");
    setTheme(nextTheme.id);
  };

  return (
    <motion.div
      className="fixed left-4 md:left-6 z-40 bottom-6"
      initial={false}
      animate={{
        bottom: isMobile ? (mobileNavVisible ? 96 : 24) : 24,
      }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
    >
      <motion.button
        onClick={handleClick}
        className="p-3 rounded-full bg-background border-2 border-accent-red/40 text-accent-red shadow-lg shadow-accent-red/10 hover:border-accent-red/60 hover:bg-accent-red/5 transition-all backdrop-blur-sm"
        aria-label={`Switch to ${nextTheme.label} theme`}
        title={`Current: ${themes[currentIndex].label} - Click for ${nextTheme.label}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        <Icon className="w-5 h-5 text-accent-red" />
      </motion.button>
    </motion.div>
  );
}
