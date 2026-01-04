"use client";

import { CommandPalette } from "./CommandPalette";
import { CursorSpotlight } from "./CursorSpotlight";
import { ConsoleEasterEgg } from "./ConsoleEasterEgg";
import { KonamiCode } from "./KonamiCode";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Guestbook } from "./Guestbook";

export function PortfolioEnhancements() {
  return (
    <>
      {/* Command Palette - opens with Cmd+K */}
      <CommandPalette />

      {/* Cursor Spotlight - subtle glow following mouse */}
      <CursorSpotlight />

      {/* Console Easter Egg - ASCII art and commands */}
      <ConsoleEasterEgg />

      {/* Konami Code - Matrix rain effect */}
      <KonamiCode />

      {/* Theme Switcher - code editor themes */}
      <ThemeSwitcher />

      {/* Guestbook - visitor messages */}
      <Guestbook />
    </>
  );
}
