"use client";

import { useEffect, useState } from "react";

// Subtle ambient background with gradient glows - no heavy effects
export function AmbientBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Base dark background */}
      <div
        className="fixed inset-0 -z-20"
        style={{ backgroundColor: "#0a0a0f" }}
      />

      {/* Top center glow - subtle emerald */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 -z-10 pointer-events-none"
        style={{
          width: "100%",
          maxWidth: "1200px",
          height: "600px",
          background: "radial-gradient(ellipse at 50% 0%, rgba(34, 197, 94, 0.08) 0%, transparent 60%)",
        }}
      />

      {/* Bottom right accent glow */}
      <div
        className="fixed bottom-0 right-0 -z-10 pointer-events-none"
        style={{
          width: "600px",
          height: "400px",
          background: "radial-gradient(ellipse at 100% 100%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)",
        }}
      />

      {/* Vignette for depth */}
      <div
        className="fixed inset-0 pointer-events-none z-30"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(0,0,0,0.3) 100%)",
        }}
      />
    </>
  );
}
