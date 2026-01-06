"use client";

import { CommandPalette } from "./CommandPalette";
import { ConsoleEasterEgg } from "./ConsoleEasterEgg";
import { KonamiCode } from "./KonamiCode";
import { ThemeToggle } from "../ThemeToggle";
import { SmoothScroll } from "./SmoothScroll";
import { MobileBottomNav } from "./MobileBottomNav";

export function PortfolioEnhancements() {
  return (
    <>
      {/* Smooth Scroll - Lenis */}
      <SmoothScroll />

      {/* Command Palette - opens with Cmd+K */}
      <CommandPalette />


      {/* Console Easter Egg - ASCII art and commands */}
      <ConsoleEasterEgg />

      {/* Konami Code - elegant particle effect */}
      <KonamiCode />

      {/* Theme Toggle - light/dark mode switcher */}
      <ThemeToggle />

      {/* Mobile Bottom Navigation - thumb-friendly nav with haptics */}
      <MobileBottomNav />
    </>
  );
}
