"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

export function KonamiCode() {
  const [inputSequence, setInputSequence] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(false);

  const checkKonamiCode = useCallback((sequence: string[]) => {
    const lastN = sequence.slice(-KONAMI_CODE.length);
    return KONAMI_CODE.every((key, i) => lastN[i] === key);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...inputSequence, e.code].slice(-KONAMI_CODE.length);
      setInputSequence(newSequence);

      if (checkKonamiCode(newSequence)) {
        setIsActive(true);
        setInputSequence([]);
        setTimeout(() => setIsActive(false), 8000);
      }
    };

    const handleTrigger = () => {
      setIsActive(true);
      setTimeout(() => setIsActive(false), 5000);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("trigger-matrix", handleTrigger);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("trigger-matrix", handleTrigger);
    };
  }, [inputSequence, checkKonamiCode]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] overflow-hidden cursor-pointer"
          onClick={() => setIsActive(false)}
        >
          {/* Elegant particle field */}
          <ParticleField />

          {/* Aurora gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

          {/* Floating orbs */}
          <FloatingOrbs />

          {/* Center message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center px-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="mb-6"
              >
                <span className="text-6xl">✨</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-3xl md:text-5xl font-display font-medium text-foreground mb-4 tracking-tight"
              >
                You found it
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-foreground-muted text-lg max-w-md mx-auto"
              >
                The classic Konami code still works.
                <br />
                <span className="text-foreground-subtle text-sm mt-2 block">
                  Click anywhere to continue
                </span>
              </motion.p>

              {/* Code display */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="mt-8 flex items-center justify-center gap-1 flex-wrap"
              >
                {["↑", "↑", "↓", "↓", "←", "→", "←", "→", "B", "A"].map((key, i) => (
                  <motion.kbd
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + i * 0.05 }}
                    className="px-2 py-1 text-xs font-mono bg-background-tertiary border border-border rounded text-foreground-subtle"
                  >
                    {key}
                  </motion.kbd>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
    }

    const particles: Particle[] = [];
    const colors = [
      "99, 102, 241",   // indigo
      "139, 92, 246",   // violet
      "168, 85, 247",   // purple
      "59, 130, 246",   // blue
    ];

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.fill();

        // Draw glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity * 0.1})`;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
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
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
    />
  );
}

function FloatingOrbs() {
  const orbs = [
    { size: 300, x: "20%", y: "30%", color: "from-indigo-500/20 to-purple-500/20", delay: 0 },
    { size: 400, x: "70%", y: "60%", color: "from-blue-500/15 to-indigo-500/15", delay: 0.5 },
    { size: 250, x: "50%", y: "20%", color: "from-violet-500/15 to-pink-500/15", delay: 1 },
  ];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            opacity: { delay: orb.delay, duration: 1 },
            scale: { delay: orb.delay, duration: 8, repeat: Infinity, ease: "easeInOut" },
            x: { delay: orb.delay, duration: 10, repeat: Infinity, ease: "easeInOut" },
            y: { delay: orb.delay, duration: 12, repeat: Infinity, ease: "easeInOut" },
          }}
          className={`absolute rounded-full bg-gradient-to-br ${orb.color} blur-3xl`}
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
}
