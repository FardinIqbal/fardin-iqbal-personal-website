"use client";

import { useEffect, useRef, useState } from "react";

// Liquid gradient background that responds to scroll and cursor
// No particles - just beautiful shifting colors
export function LiquidBackground() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      timeRef.current += 0.005;
      const t = timeRef.current;

      // Calculate scroll progress (0 to 1)
      const scrollProgress = Math.min(scrollY / (document.body.scrollHeight - window.innerHeight || 1), 1);

      // Create gradient that shifts based on scroll and time
      const gradient = ctx.createRadialGradient(
        canvas.width * (0.3 + mousePos.x * 0.4),
        canvas.height * (0.3 + mousePos.y * 0.4),
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.8
      );

      // Color palette that shifts with scroll
      // Hero: emerald -> About: purple -> Skills: cyan -> Projects: blue
      const hue1 = 150 + scrollProgress * 60 + Math.sin(t) * 10; // Primary hue
      const hue2 = 200 + scrollProgress * 40 + Math.cos(t * 0.7) * 15; // Secondary hue

      gradient.addColorStop(0, `hsla(${hue1}, 70%, 15%, 0.4)`);
      gradient.addColorStop(0.5, `hsla(${hue2}, 60%, 8%, 0.6)`);
      gradient.addColorStop(1, `hsla(220, 50%, 5%, 1)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add subtle noise texture
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 8;
        data[i] += noise;
        data[i + 1] += noise;
        data[i + 2] += noise;
      }
      ctx.putImageData(imageData, 0, 0);

      // Add floating gradient orbs (subtle, not particles)
      const orbCount = 3;
      for (let i = 0; i < orbCount; i++) {
        const orbX = canvas.width * (0.2 + 0.6 * Math.sin(t * 0.3 + i * 2));
        const orbY = canvas.height * (0.3 + 0.4 * Math.cos(t * 0.2 + i * 1.5));
        const orbRadius = 200 + 100 * Math.sin(t + i);

        const orbGradient = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, orbRadius);
        const orbHue = hue1 + i * 30;
        orbGradient.addColorStop(0, `hsla(${orbHue}, 80%, 50%, 0.08)`);
        orbGradient.addColorStop(1, `hsla(${orbHue}, 80%, 50%, 0)`);

        ctx.fillStyle = orbGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [mounted, scrollY, mousePos]);

  if (!mounted) {
    return <div className="fixed inset-0 -z-10 bg-[#0a0a0f]" />;
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10"
        style={{ background: "#0a0a0f" }}
      />
      {/* Vignette */}
      <div
        className="fixed inset-0 -z-5 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </>
  );
}
