"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Home, ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      color: string;
      density: number;
    }

    const particles: Particle[] = [];
    const colors = ["#6366f1", "#8b5cf6", "#a855f7", "#3b82f6"];

    // Create "404" text particles
    ctx.font = "bold 200px sans-serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("404", canvas.width / 2, canvas.height / 2);

    const textData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Sample text pixels
    const gap = 4;
    for (let y = 0; y < canvas.height; y += gap) {
      for (let x = 0; x < canvas.width; x += gap) {
        const index = (y * canvas.width + x) * 4;
        const alpha = textData.data[index + 3];
        if (alpha > 128) {
          particles.push({
            x: x,
            y: y,
            baseX: x,
            baseY: y,
            size: Math.random() * 2 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            density: Math.random() * 30 + 1,
          });
        }
      }
    }

    let animationId: number;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const moveX = forceDirectionX * force * p.density;
          const moveY = forceDirectionY * force * p.density;

          p.x -= moveX;
          p.y -= moveY;
        } else {
          // Return to base position
          if (p.x !== p.baseX) {
            const dx = p.x - p.baseX;
            p.x -= dx / 10;
          }
          if (p.y !== p.baseY) {
            const dy = p.y - p.baseY;
            p.y -= dy / 10;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Gradient orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl"
          animate={{
            x: mousePos.x * 0.05,
            y: mousePos.y * 0.05,
          }}
          style={{ left: "20%", top: "30%" }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"
          animate={{
            x: -mousePos.x * 0.03,
            y: -mousePos.y * 0.03,
          }}
          style={{ right: "20%", bottom: "30%" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-32"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
            className="mb-6"
          >
            <Sparkles className="w-12 h-12 text-indigo-400 mx-auto" />
          </motion.div>

          <h2 className="text-2xl md:text-3xl font-display font-medium text-foreground mb-4">
            Page not found
          </h2>

          <p className="text-foreground-muted mb-8 max-w-md mx-auto">
            Move your cursor around to interact with the particles.
            <br />
            <span className="text-foreground-subtle text-sm">
              The page you're looking for doesn't exist.
            </span>
          </p>

          <div className="flex items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg font-medium hover:bg-foreground/90 transition-colors"
              >
                <Home className="w-4 h-4" />
                Go home
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium text-foreground hover:bg-background-tertiary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Go back
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Keyboard hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 text-foreground-subtle text-sm"
        >
          Press{" "}
          <kbd className="px-2 py-1 bg-background-tertiary border border-border rounded text-xs mx-1">
            ⌘K
          </kbd>{" "}
          to search
        </motion.p>
      </div>
    </div>
  );
}
