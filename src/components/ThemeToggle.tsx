"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { haptic } from "@/lib/haptics";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes: Array<{ id: "light" | "dark" | "sepia"; label: string }> = [
    { id: "light", label: "Light" },
    { id: "dark", label: "Dark" },
    { id: "sepia", label: "Sepia" },
  ];

  return (
    <div className="fixed top-8 right-8 z-50 flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => {
            haptic("selection");
            setTheme(t.id);
          }}
          className={cn(
            "w-2 h-2 rounded-full transition-all duration-200",
            theme === t.id
              ? "scale-160"
              : "scale-100 hover:scale-140",
            t.id === "light" && "bg-[#faf9f7] border border-gray-300",
            t.id === "dark" && "bg-[#0a0a0a]",
            t.id === "sepia" && "bg-[#f4ecd8] border border-[#d4cbb8]"
          )}
          aria-label={`Switch to ${t.label} theme`}
          title={t.label}
        />
      ))}
    </div>
  );
}
