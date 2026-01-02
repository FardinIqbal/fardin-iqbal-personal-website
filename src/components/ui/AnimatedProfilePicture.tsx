"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";

interface AnimatedProfilePictureProps {
  size?: number;
}

export function AnimatedProfilePicture({
  size = 280,
}: AnimatedProfilePictureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

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
      {/* Subtle ambient glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgb(16 185 129 / 0.15) 0%, transparent 70%)",
        }}
        animate={{
          scale: isHovered ? 1.4 : 1.2,
          opacity: isHovered ? 1 : 0.6,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Rotating ring - single subtle ring */}
      <motion.div
        className="absolute inset-2 rounded-full"
        style={{
          border: "1px solid rgb(16 185 129 / 0.3)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

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
        {/* Outer circle - border */}
        <div
          className="absolute inset-4 rounded-full border-2 border-foreground/10"
        />

        {/* Main circle */}
        <motion.div
          className="absolute inset-6 rounded-full overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgb(var(--color-background-secondary)) 0%, rgb(var(--color-background-tertiary)) 100%)",
            boxShadow: isHovered
              ? "0 0 40px rgb(16 185 129 / 0.3), inset 0 0 20px rgb(16 185 129 / 0.1)"
              : "0 0 20px rgb(16 185 129 / 0.1)",
          }}
          animate={{
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Subtle grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="profileGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#profileGrid)" />
          </svg>

          {/* Initials */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="text-5xl font-bold text-foreground tracking-tight"
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              FI
            </motion.span>
          </div>

          {/* Subtle shine effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{
              x: isHovered ? "100%" : "-100%",
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>

        {/* Corner dots - minimal accent */}
        {[0, 90, 180, 270].map((angle, i) => (
          <motion.div
            key={angle}
            className="absolute w-2 h-2 rounded-full bg-emerald-500"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${angle}deg) translateX(${size / 2 - 16}px) translateY(-50%)`,
            }}
            animate={{
              scale: isHovered ? [1, 1.3, 1] : 1,
              opacity: isHovered ? 1 : 0.5,
            }}
            transition={{
              duration: 0.8,
              delay: i * 0.1,
              repeat: isHovered ? Infinity : 0,
            }}
          />
        ))}
      </motion.div>

      {/* Status indicator - single pulsing dot */}
      <motion.div
        className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-emerald-500"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          boxShadow: "0 0 10px rgb(16 185 129 / 0.5)",
        }}
      />
    </div>
  );
}
