"use client";

import { CommandPalette } from "./CommandPalette";
import { CursorSpotlight } from "./CursorSpotlight";
import { ConsoleEasterEgg } from "./ConsoleEasterEgg";
import { KonamiCode } from "./KonamiCode";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { SmoothScroll } from "./SmoothScroll";
import { MobileBottomNav } from "./MobileBottomNav";

export function PortfolioEnhancements() {
  return (
    <>
      {/* Smooth Scroll - Lenis */}
      <SmoothScroll />

      {/* Command Palette - opens with Cmd+K */}
      <CommandPalette />

      {/* Cursor Spotlight - subtle glow following mouse */}
      <CursorSpotlight />

      {/* Console Easter Egg - ASCII art and commands */}
      <ConsoleEasterEgg />

      {/* Konami Code - elegant particle effect */}
      <KonamiCode />

      {/* Theme Switcher - code editor themes */}
      <ThemeSwitcher />

      {/* Mobile Bottom Navigation - thumb-friendly nav with haptics */}
      <MobileBottomNav />
    </>
  );
}
