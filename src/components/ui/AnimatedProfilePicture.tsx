"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";

interface AnimatedProfilePictureProps {
  size?: number;
}

export function AnimatedProfilePicture({
  size = 350,
}: AnimatedProfilePictureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ width: size, height: size }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main 3D container */}
      <motion.div
        className="absolute inset-0"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
      >
        {/* Background glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgb(59 130 246 / 0.15) 0%, transparent 70%)",
          }}
          animate={{
            scale: isHovered ? 1.2 : 1,
            opacity: isHovered ? 1 : 0.5,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Grid pattern */}
        <motion.div
          className="absolute inset-4 rounded-xl overflow-hidden border border-border/50"
          style={{
            background: "rgb(var(--color-background-secondary))",
          }}
        >
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgb(var(--color-foreground-subtle))" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Orbiting elements container */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Center orb */}
            <motion.div
              className="relative w-20 h-20 rounded-full"
              style={{
                background: "linear-gradient(135deg, rgb(59 130 246) 0%, rgb(139 92 246) 100%)",
                boxShadow: "0 0 60px rgb(59 130 246 / 0.5)",
              }}
              animate={{
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Inner glow */}
              <motion.div
                className="absolute inset-2 rounded-full bg-white/20"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Orbit ring 1 */}
            <motion.div
              className="absolute w-36 h-36 rounded-full border border-primary-500/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary-400"
                style={{ boxShadow: "0 0 10px rgb(59 130 246 / 0.8)" }}
              />
            </motion.div>

            {/* Orbit ring 2 */}
            <motion.div
              className="absolute w-52 h-52 rounded-full border border-purple-500/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-purple-400"
                style={{ boxShadow: "0 0 8px rgb(139 92 246 / 0.8)" }}
              />
              <motion.div
                className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400"
                style={{ boxShadow: "0 0 8px rgb(34 211 238 / 0.8)" }}
              />
            </motion.div>

            {/* Orbit ring 3 */}
            <motion.div
              className="absolute w-72 h-72 rounded-full border border-cyan-500/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-300"
                style={{ boxShadow: "0 0 6px rgb(34 211 238 / 0.6)" }}
              />
            </motion.div>

            {/* Floating particles - pre-defined positions to avoid hydration mismatch */}
            {[
              { left: "35%", top: "40%", duration: 2.5 },
              { left: "55%", top: "35%", duration: 3 },
              { left: "45%", top: "60%", duration: 2.8 },
              { left: "60%", top: "50%", duration: 3.2 },
              { left: "40%", top: "55%", duration: 2.6 },
              { left: "50%", top: "45%", duration: 2.9 },
            ].map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white/40"
                style={{
                  left: particle.left,
                  top: particle.top,
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>

          {/* Text initials */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: "translateZ(20px)" }}
          >
            <motion.span
              className="text-5xl font-bold bg-gradient-to-r from-primary-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
              animate={{
                opacity: isHovered ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              FI
            </motion.span>
          </motion.div>

          {/* Scan line effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(0deg, transparent 0%, rgb(59 130 246 / 0.03) 50%, transparent 100%)",
              backgroundSize: "100% 8px",
            }}
          />
        </motion.div>

        {/* Corner accents */}
        <motion.div
          className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-primary-500/50 rounded-tl"
          animate={{ opacity: isHovered ? 1 : 0.5 }}
        />
        <motion.div
          className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-primary-500/50 rounded-tr"
          animate={{ opacity: isHovered ? 1 : 0.5 }}
        />
        <motion.div
          className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-primary-500/50 rounded-bl"
          animate={{ opacity: isHovered ? 1 : 0.5 }}
        />
        <motion.div
          className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-primary-500/50 rounded-br"
          animate={{ opacity: isHovered ? 1 : 0.5 }}
        />
      </motion.div>

      {/* Pulse effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-primary-500/20 pointer-events-none"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
