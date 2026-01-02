"use client";

import { CustomCursor } from "./CustomCursor";
import { ScrollProgress } from "./ParallaxSection";
import { GlobalMusicPlayer } from "./GlobalMusicPlayer";

export function GlobalEffects() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <GlobalMusicPlayer />
    </>
  );
}
