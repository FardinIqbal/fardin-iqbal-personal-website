"use client";

import { CommandPalette } from "./CommandPalette";
import { CursorSpotlight } from "./CursorSpotlight";
import { ConsoleEasterEgg } from "./ConsoleEasterEgg";
import { KonamiCode } from "./KonamiCode";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Guestbook } from "./Guestbook";
import { SmoothScroll } from "./SmoothScroll";
import { MobileBottomNav } from "./MobileBottomNav";
import { ScrollProgress } from "./ScrollProgress";

export function PortfolioEnhancements() {
  return (
    <>
      {/* Smooth Scroll - Lenis */}
      <SmoothScroll />

      {/* Scroll Progress Indicator - top bar showing scroll position */}
      <ScrollProgress />

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

      {/* Guestbook - visitor messages with confetti */}
      <Guestbook />

      {/* Mobile Bottom Navigation - thumb-friendly nav with haptics */}
      <MobileBottomNav />
    </>
  );
}
