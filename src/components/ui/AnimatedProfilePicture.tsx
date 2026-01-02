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
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig);

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
      {/* Massive outer glow */}
      <motion.div
        className="absolute -inset-20 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgb(59 130 246 / 0.3) 0%, rgb(139 92 246 / 0.2) 40%, transparent 70%)",
        }}
        animate={{
          scale: isHovered ? 1.3 : 1,
          opacity: isHovered ? 1 : 0.6,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Rotating gradient rings */}
      <motion.div
        className="absolute -inset-8"
        style={{
          background: `conic-gradient(from 0deg,
            transparent 0deg,
            rgb(59 130 246 / 0.5) 60deg,
            rgb(139 92 246 / 0.5) 120deg,
            rgb(236 72 153 / 0.4) 180deg,
            rgb(34 211 238 / 0.5) 240deg,
            rgb(16 185 129 / 0.4) 300deg,
            transparent 360deg)`,
          borderRadius: "50%",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Counter-rotating ring */}
      <motion.div
        className="absolute -inset-4"
        style={{
          background: `conic-gradient(from 180deg,
            transparent 0deg,
            rgb(236 72 153 / 0.4) 90deg,
            transparent 180deg,
            rgb(34 211 238 / 0.4) 270deg,
            transparent 360deg)`,
          borderRadius: "50%",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
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
        {/* Hexagonal frame */}
        <div className="absolute inset-2 overflow-hidden" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgb(15 23 42) 0%, rgb(30 41 59) 100%)",
            }}
          />

          {/* Animated grid */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgb(59 130 246 / 0.2)" strokeWidth="0.5" />
              </pattern>
              <linearGradient id="gridFade" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                <stop offset="50%" stopColor="white" stopOpacity="0.1" />
                <stop offset="100%" stopColor="white" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexGrid)" mask="url(#gridFade)" />
          </svg>

          {/* Central energy core */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Outer pulse rings */}
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                className="absolute rounded-full border-2"
                style={{
                  width: 60 + ring * 40,
                  height: 60 + ring * 40,
                  borderColor: `rgb(59 130 246 / ${0.4 - ring * 0.1})`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: ring * 0.4,
                }}
              />
            ))}

            {/* Energy core */}
            <motion.div
              className="relative w-24 h-24 rounded-full"
              style={{
                background: "linear-gradient(135deg, rgb(59 130 246) 0%, rgb(139 92 246) 50%, rgb(236 72 153) 100%)",
                boxShadow: `
                  0 0 60px rgb(59 130 246 / 0.8),
                  0 0 100px rgb(139 92 246 / 0.5),
                  inset 0 0 30px rgba(255,255,255,0.3)
                `,
              }}
              animate={{
                scale: isHovered ? [1, 1.15, 1.1] : 1,
                boxShadow: isHovered
                  ? [
                      "0 0 60px rgb(59 130 246 / 0.8), 0 0 100px rgb(139 92 246 / 0.5), inset 0 0 30px rgba(255,255,255,0.3)",
                      "0 0 80px rgb(59 130 246 / 1), 0 0 140px rgb(139 92 246 / 0.7), inset 0 0 40px rgba(255,255,255,0.5)",
                      "0 0 60px rgb(59 130 246 / 0.8), 0 0 100px rgb(139 92 246 / 0.5), inset 0 0 30px rgba(255,255,255,0.3)",
                    ]
                  : "0 0 60px rgb(59 130 246 / 0.8), 0 0 100px rgb(139 92 246 / 0.5), inset 0 0 30px rgba(255,255,255,0.3)",
              }}
              transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
            >
              {/* Core inner glow */}
              <motion.div
                className="absolute inset-4 rounded-full bg-white/30 backdrop-blur-sm"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />

              {/* Initials */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  className="text-3xl font-black text-white drop-shadow-lg"
                  style={{ textShadow: "0 0 20px rgba(255,255,255,0.8)" }}
                  animate={{
                    textShadow: isHovered
                      ? ["0 0 20px rgba(255,255,255,0.8)", "0 0 40px rgba(255,255,255,1)", "0 0 20px rgba(255,255,255,0.8)"]
                      : "0 0 20px rgba(255,255,255,0.8)",
                  }}
                  transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
                >
                  FI
                </motion.span>
              </div>
            </motion.div>

            {/* Orbiting satellites - Ring 1 */}
            <motion.div
              className="absolute w-44 h-44"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              {[0, 120, 240].map((angle) => (
                <motion.div
                  key={angle}
                  className="absolute w-4 h-4 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, rgb(59 130 246), rgb(34 211 238))",
                    boxShadow: "0 0 15px rgb(59 130 246 / 0.8), 0 0 30px rgb(34 211 238 / 0.5)",
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${angle}deg) translateX(88px) translateY(-50%)`,
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: angle / 360 }}
                />
              ))}
            </motion.div>

            {/* Orbiting satellites - Ring 2 (counter) */}
            <motion.div
              className="absolute w-56 h-56"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              {[45, 135, 225, 315].map((angle) => (
                <motion.div
                  key={angle}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, rgb(139 92 246), rgb(236 72 153))",
                    boxShadow: "0 0 12px rgb(139 92 246 / 0.8)",
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${angle}deg) translateX(112px) translateY(-50%)`,
                  }}
                />
              ))}
            </motion.div>

            {/* Orbiting satellites - Ring 3 */}
            <motion.div
              className="absolute w-72 h-72"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              {[0, 72, 144, 216, 288].map((angle) => (
                <motion.div
                  key={angle}
                  className="absolute w-2 h-2 rounded-full bg-cyan-400"
                  style={{
                    boxShadow: "0 0 8px rgb(34 211 238 / 0.8)",
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${angle}deg) translateX(144px) translateY(-50%)`,
                  }}
                />
              ))}
            </motion.div>

            {/* Data streams */}
            {[
              { angle: 30, delay: 0 },
              { angle: 150, delay: 0.5 },
              { angle: 270, delay: 1 },
            ].map(({ angle, delay }) => (
              <motion.div
                key={angle}
                className="absolute w-1 h-20 origin-bottom"
                style={{
                  background: "linear-gradient(to top, rgb(59 130 246 / 0.8), transparent)",
                  transform: `rotate(${angle}deg)`,
                  bottom: "50%",
                  left: "calc(50% - 2px)",
                }}
                animate={{
                  scaleY: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay,
                }}
              />
            ))}

            {/* Floating particles */}
            {[
              { x: -60, y: -40, size: 3 },
              { x: 70, y: -50, size: 2 },
              { x: -50, y: 60, size: 2.5 },
              { x: 60, y: 50, size: 2 },
              { x: -30, y: -70, size: 1.5 },
              { x: 40, y: 70, size: 2 },
              { x: -70, y: 20, size: 1.5 },
              { x: 80, y: -20, size: 2.5 },
            ].map((particle, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: particle.size,
                  height: particle.size,
                  left: `calc(50% + ${particle.x}px)`,
                  top: `calc(50% + ${particle.y}px)`,
                  boxShadow: `0 0 ${particle.size * 3}px rgba(255,255,255,0.8)`,
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.4, 1, 0.4],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + i * 0.2,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>

          {/* Scan line */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(180deg, transparent 0%, rgb(59 130 246 / 0.1) 50%, transparent 100%)",
              backgroundSize: "100% 4px",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "0% 100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Holographic overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none mix-blend-overlay"
            style={{
              background: "linear-gradient(135deg, transparent 0%, rgb(255 255 255 / 0.1) 50%, transparent 100%)",
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Corner brackets */}
        {[
          { top: 0, left: 0, rotate: 0 },
          { top: 0, right: 0, rotate: 90 },
          { bottom: 0, right: 0, rotate: 180 },
          { bottom: 0, left: 0, rotate: 270 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8"
            style={{
              ...pos,
              transform: `rotate(${pos.rotate}deg)`,
            }}
            animate={{
              opacity: isHovered ? 1 : 0.5,
            }}
          >
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-500 to-transparent" />
            <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-primary-500 to-transparent" />
          </motion.div>
        ))}
      </motion.div>

      {/* Status indicators */}
      <motion.div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1"
        animate={{ opacity: isHovered ? 1 : 0.7 }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-primary-500"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
