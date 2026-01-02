"use client";

import { ReactNode, useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SectionMoodProvider, useSectionMood } from "./SectionMoodProvider";
import { AmbientAudio } from "./AmbientAudio";
import { CustomCursor } from "../effects/CustomCursor";

// Global cursor position for particle influence
const cursorPosition = { x: 0, y: 0, active: false };

// Three.js Particles component for mood-reactive background
function Particles() {
  const { palette, particles: particleConfig, scrollVelocity } = useSectionMood();
  const meshRef = useRef<THREE.Points>(null);
  const particleCount = particleConfig.count;
  const cursorInfluence = useRef(new THREE.Vector3());

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      col[i * 3] = 1;
      col[i * 3 + 1] = 1;
      col[i * 3 + 2] = 1;
    }
    return [pos, col];
  }, [particleCount]);

  // Parse palette color string to RGB values
  const targetColor = useMemo(() => {
    const rgb = palette.primary.split(",").map((v) => parseFloat(v.trim()) / 255);
    return new THREE.Color(rgb[0], rgb[1], rgb[2]);
  }, [palette.primary]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const geometry = meshRef.current.geometry;
    const posArray = geometry.attributes.position.array as Float32Array;
    const colArray = geometry.attributes.color.array as Float32Array;

    // Speed multiplier based on scroll velocity
    const speedMultiplier = 1 + scrollVelocity * 0.5;

    // Convert cursor screen position to 3D space (approximate)
    cursorInfluence.current.set(
      (cursorPosition.x / window.innerWidth - 0.5) * 16,
      -(cursorPosition.y / window.innerHeight - 0.5) * 12,
      0
    );

    const particlePos = new THREE.Vector3();
    const pushForce = new THREE.Vector3();

    for (let i = 0; i < particleCount; i++) {
      // Gentle floating motion
      posArray[i * 3 + 1] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.002 * particleConfig.speed * speedMultiplier;
      posArray[i * 3] += Math.cos(state.clock.elapsedTime * 0.3 + i * 0.5) * 0.001 * particleConfig.speed * speedMultiplier;

      // Cursor influence - particles are pushed away from cursor
      if (cursorPosition.active) {
        particlePos.set(posArray[i * 3], posArray[i * 3 + 1], posArray[i * 3 + 2]);
        const dist = particlePos.distanceTo(cursorInfluence.current);

        if (dist < 3) {
          pushForce.subVectors(particlePos, cursorInfluence.current).normalize();
          const strength = (3 - dist) * 0.02;
          posArray[i * 3] += pushForce.x * strength;
          posArray[i * 3 + 1] += pushForce.y * strength;
        }
      }

      // Wrap around
      if (posArray[i * 3 + 1] > 10) posArray[i * 3 + 1] = -10;
      if (posArray[i * 3 + 1] < -10) posArray[i * 3 + 1] = 10;
      if (posArray[i * 3] > 10) posArray[i * 3] = -10;
      if (posArray[i * 3] < -10) posArray[i * 3] = 10;

      // Lerp colors toward target
      colArray[i * 3] += (targetColor.r - colArray[i * 3]) * delta * 2;
      colArray[i * 3 + 1] += (targetColor.g - colArray[i * 3 + 1]) * delta * 2;
      colArray[i * 3 + 2] += (targetColor.b - colArray[i * 3 + 2]) * delta * 2;
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={particleConfig.size * 0.05}
        vertexColors
        transparent
        opacity={particleConfig.opacity}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Floating orbs for extra depth
function FloatingOrbs() {
  const { palette } = useSectionMood();
  const groupRef = useRef<THREE.Group>(null);

  const orbs = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 5 - 3,
      ] as [number, number, number],
      scale: 0.5 + Math.random() * 1,
      speed: 0.2 + Math.random() * 0.3,
    }));
  }, []);

  const targetColor = useMemo(() => {
    const rgb = palette.accent.split(",").map((v) => parseFloat(v.trim()) / 255);
    return new THREE.Color(rgb[0], rgb[1], rgb[2]);
  }, [palette.accent]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      child.position.y += Math.sin(state.clock.elapsedTime * orbs[i].speed) * 0.005;
      child.position.x += Math.cos(state.clock.elapsedTime * orbs[i].speed * 0.5) * 0.003;
      if (child instanceof THREE.Mesh) {
        (child.material as THREE.MeshBasicMaterial).color.lerp(targetColor, 0.02);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.position} scale={orb.scale}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color={targetColor} transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

// Cursor tracker component
function CursorTracker() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorPosition.x = e.clientX;
      cursorPosition.y = e.clientY;
      cursorPosition.active = true;
    };

    const handleMouseLeave = () => {
      cursorPosition.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return null;
}

// Three.js Canvas wrapper
function ParticleBackground() {
  return (
    <>
      <CursorTracker />
      <div className="fixed inset-0 -z-5 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true }}
        >
          <Particles />
          <FloatingOrbs />
        </Canvas>
      </div>
    </>
  );
}

// Film grain overlay using CSS noise
function FilmGrain() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-40 opacity-[0.03] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

// Animated film grain that updates
function AnimatedFilmGrain() {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKey((k) => k + 1);
    }, 100); // Update grain every 100ms for subtle movement
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      key={key}
      className="fixed inset-0 pointer-events-none z-40 opacity-[0.04]"
      style={{
        background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch' seed='${key}'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        mixBlendMode: "overlay",
      }}
    />
  );
}

// Vignette overlay for cinematic depth
function Vignette() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-30"
      style={{
        background:
          "radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.4) 100%)",
      }}
    />
  );
}

// Loading screen with atmospheric transition
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    // Check if we've already shown loading screen this session
    const hasLoaded = sessionStorage.getItem("portfolio-loaded");
    if (hasLoaded) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      sessionStorage.setItem("portfolio-loaded", "true");
      onComplete();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Skip if already loaded
  if (typeof window !== "undefined" && sessionStorage.getItem("portfolio-loaded")) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "#0a120e" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Outer ring */}
        <motion.div
          className="w-20 h-20 rounded-full border-2"
          style={{ borderColor: "rgba(34, 197, 94, 0.3)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner spinning ring */}
        <motion.div
          className="absolute inset-0 w-20 h-20 rounded-full border-2 border-t-emerald-500 border-r-transparent border-b-transparent border-l-transparent"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        {/* Center glow */}
        <motion.div
          className="absolute inset-3 w-14 h-14 rounded-full"
          style={{ background: "rgba(34, 197, 94, 0.15)" }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
}

// Floating dots overlay for extra depth (mood-aware)
function FloatingDots() {
  const { palette } = useSectionMood();

  const dots = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 3,
    duration: 15 + Math.random() * 20,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden opacity-20">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
            background: `rgb(${palette.primary})`,
            boxShadow: `0 0 ${dot.size * 2}px rgba(${palette.primary}, 0.5)`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Dynamic background that transitions with mood
function DynamicBackground() {
  const { palette } = useSectionMood();

  return (
    <div
      className="fixed inset-0 -z-10 transition-colors duration-700 ease-out"
      style={{ backgroundColor: palette.background }}
    >
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[120px] transition-all duration-700"
        style={{ background: palette.glow }}
      />
      {/* Bottom accent */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[300px] rounded-full blur-[100px] opacity-30 transition-all duration-700"
        style={{ background: `rgba(${palette.accent}, 0.2)` }}
      />
    </div>
  );
}

// Ambient audio wrapper that gets values from SectionMoodProvider
function PortfolioAmbientAudio({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}) {
  const { audio, palette } = useSectionMood();
  return (
    <AmbientAudio
      enabled={enabled}
      onToggle={onToggle}
      audioConfig={audio}
      palette={palette}
    />
  );
}

// Reading/scroll progress bar
function ScrollProgress() {
  const { palette } = useSectionMood();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY / scrollHeight;
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
      style={{
        background: `linear-gradient(90deg, rgb(${palette.primary}), rgb(${palette.secondary}))`,
        scaleX: progress,
      }}
    />
  );
}

interface ImmersivePortfolioWrapperProps {
  children: ReactNode;
}

function ImmersiveContent({ children }: ImmersivePortfolioWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Skip loading for reduced motion
  useEffect(() => {
    if (prefersReducedMotion) {
      setIsLoading(false);
    }
  }, [prefersReducedMotion]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && !prefersReducedMotion && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-screen"
      >
        {/* Background layers */}
        <DynamicBackground />

        {/* Three.js Particle Background */}
        {!prefersReducedMotion && <ParticleBackground />}

        {/* Floating elements */}
        {!prefersReducedMotion && <FloatingDots />}

        {/* Main content */}
        <div className="relative z-20">{children}</div>

        {/* Overlays */}
        <Vignette />
        {!prefersReducedMotion && <AnimatedFilmGrain />}

        {/* UI elements */}
        <ScrollProgress />
        <CustomCursor />
        <PortfolioAmbientAudio enabled={audioEnabled} onToggle={setAudioEnabled} />
      </motion.div>
    </>
  );
}

export function ImmersivePortfolioWrapper({ children }: ImmersivePortfolioWrapperProps) {
  return (
    <SectionMoodProvider>
      <ImmersiveContent>{children}</ImmersiveContent>
    </SectionMoodProvider>
  );
}
