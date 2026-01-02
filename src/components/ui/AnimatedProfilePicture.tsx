"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

interface AnimatedProfilePictureProps {
  size?: number;
}

export function AnimatedProfilePicture({
  size = 350,
}: AnimatedProfilePictureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for mouse movement
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
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `conic-gradient(from 0deg,
            rgb(59 130 246 / 0.3),
            rgb(139 92 246 / 0.3),
            rgb(34 211 238 / 0.2),
            rgb(59 130 246 / 0.3))`,
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Glow blur layer */}
      <motion.div
        className="absolute inset-2 rounded-xl blur-xl"
        style={{
          background: "radial-gradient(circle, rgb(59 130 246 / 0.2) 0%, transparent 70%)",
        }}
        animate={{
          scale: isHovered ? 1.1 : 1,
          opacity: isHovered ? 0.6 : 0.3,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Main image container with 3D effect */}
      <motion.div
        className="absolute inset-3 rounded-xl overflow-hidden border border-border"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          borderColor: isHovered ? "rgb(59 130 246 / 0.5)" : "rgb(var(--color-border))",
          boxShadow: isHovered
            ? "0 25px 50px -12px rgba(59, 130, 246, 0.25)"
            : "0 10px 40px -10px rgba(0, 0, 0, 0.3)",
        }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src="/images/profile/profile-art.png"
          alt="Fardin Iqbal"
          width={size - 24}
          height={size - 24}
          className="object-cover w-full h-full"
          priority
        />

        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)",
          }}
          initial={{ x: "-100%", y: "-100%" }}
          animate={{
            x: isHovered ? "100%" : "-100%",
            y: isHovered ? "100%" : "-100%",
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Pulse ring animation */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-primary-500/30 pointer-events-none"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.4, 0, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Second pulse ring with delay */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-primary-500/20 pointer-events-none"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.2, 0, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />
    </div>
  );
}
