"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMood } from "./MoodSystem";

function Particles() {
  const { palette, particles: particleConfig } = useMood();
  const pointsRef = useRef<THREE.Points>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Parse RGB from palette
  const color = useMemo(() => {
    const [r, g, b] = palette.primary.split(",").map((n) => parseInt(n.trim()) / 255);
    return new THREE.Color(r, g, b);
  }, [palette.primary]);

  const secondaryColor = useMemo(() => {
    const [r, g, b] = palette.secondary.split(",").map((n) => parseInt(n.trim()) / 255);
    return new THREE.Color(r, g, b);
  }, [palette.secondary]);

  // Generate particle positions
  const { positions, velocities, colors } = useMemo(() => {
    const count = particleConfig.count * 10;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Spread particles in a wide field
      positions[i3] = (Math.random() - 0.5) * 50;
      positions[i3 + 1] = (Math.random() - 0.5) * 50;
      positions[i3 + 2] = (Math.random() - 0.5) * 30 - 10;

      // Random velocities
      velocities[i3] = (Math.random() - 0.5) * particleConfig.speed * 0.1;
      velocities[i3 + 1] = (Math.random() - 0.5) * particleConfig.speed * 0.1;
      velocities[i3 + 2] = (Math.random() - 0.5) * particleConfig.speed * 0.05;

      // Blend between primary and secondary colors
      const blend = Math.random();
      const c = color.clone().lerp(secondaryColor, blend);
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    return { positions, velocities, colors };
  }, [particleConfig, color, secondaryColor]);

  // Track scroll
  useEffect(() => {
    const handleScroll = () => {
      const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate particles
  useFrame((state) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < positions.length / 3; i++) {
      const i3 = i * 3;

      // Move particles
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      // Add wave motion based on scroll
      positions[i3 + 1] += Math.sin(time * 0.5 + positions[i3] * 0.1) * 0.01;

      // Wrap around
      if (positions[i3] > 25) positions[i3] = -25;
      if (positions[i3] < -25) positions[i3] = 25;
      if (positions[i3 + 1] > 25) positions[i3 + 1] = -25;
      if (positions[i3 + 1] < -25) positions[i3 + 1] = 25;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Rotate based on scroll
    pointsRef.current.rotation.y = scrollProgress * Math.PI * 0.5;
    pointsRef.current.rotation.x = Math.sin(scrollProgress * Math.PI) * 0.2;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={particleConfig.size * 0.05}
        vertexColors
        transparent
        opacity={particleConfig.opacity}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function FloatingOrbs() {
  const { palette } = useMood();
  const groupRef = useRef<THREE.Group>(null);

  const orbs = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        -5 - Math.random() * 10,
      ] as [number, number, number],
      scale: 0.5 + Math.random() * 1.5,
      speed: 0.2 + Math.random() * 0.3,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  const color = useMemo(() => {
    const [r, g, b] = palette.accent.split(",").map((n) => parseInt(n.trim()) / 255);
    return new THREE.Color(r, g, b);
  }, [palette.accent]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    groupRef.current.children.forEach((orb, i) => {
      const config = orbs[i];
      orb.position.y = config.position[1] + Math.sin(time * config.speed + config.offset) * 2;
      orb.position.x = config.position[0] + Math.cos(time * config.speed * 0.5 + config.offset) * 1;
    });
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.position} scale={orb.scale}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.1} />
        </mesh>
      ))}
    </group>
  );
}

export function ParticleBackground() {
  const { palette } = useMood();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: palette.background }}
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Particles />
        <FloatingOrbs />
        <ambientLight intensity={0.5} />
      </Canvas>

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${palette.glow} 0%, transparent 50%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 80% 80%, rgba(${palette.accent}, 0.1) 0%, transparent 40%)`,
        }}
      />
    </div>
  );
}
