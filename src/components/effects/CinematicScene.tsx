"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";

// Smooth cursor tracking with physics easing
const cursor = { x: 0, y: 0, targetX: 0, targetY: 0 };

function useCursorParallax() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursor.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      cursor.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
}

// Floating orbs with glow
function GlowingOrbs() {
  const groupRef = useRef<THREE.Group>(null);

  const orbs = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        -5 - Math.random() * 10
      ),
      scale: 0.3 + Math.random() * 0.5,
      speed: 0.3 + Math.random() * 0.4,
      offset: Math.random() * Math.PI * 2,
      color: i % 2 === 0 ? "#22c55e" : "#3b82f6",
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    // Smooth cursor following
    cursor.x += (cursor.targetX - cursor.x) * 0.05;
    cursor.y += (cursor.targetY - cursor.y) * 0.05;

    // Apply cursor parallax to group
    groupRef.current.position.x = cursor.x * 1.5;
    groupRef.current.position.y = -cursor.y * 1;

    // Animate each orb
    groupRef.current.children.forEach((child, i) => {
      const orb = orbs[i];
      child.position.y = orb.position.y + Math.sin(time * orb.speed + orb.offset) * 2;
      child.position.x = orb.position.x + Math.cos(time * orb.speed * 0.7 + orb.offset) * 1;
    });
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.position} scale={orb.scale}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color={orb.color} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

// Subtle particle field
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 500;

  const { positions, opacities } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const ops = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
      ops[i] = 0.2 + Math.random() * 0.6;
    }

    return { positions: pos, opacities: ops };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.elapsedTime;

    // Subtle rotation based on scroll and time
    pointsRef.current.rotation.y = time * 0.02;
    pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;

    // Cursor influence on rotation
    pointsRef.current.rotation.y += cursor.x * 0.1;
    pointsRef.current.rotation.x += cursor.y * 0.05;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.08}
        color="#22c55e"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Gradient background plane
function BackgroundGradient() {
  return (
    <mesh position={[0, 0, -20]}>
      <planeGeometry args={[100, 100]} />
      <shaderMaterial
        uniforms={{
          uColor1: { value: new THREE.Color("#0a0a0f") },
          uColor2: { value: new THREE.Color("#0f1a14") },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          varying vec2 vUv;
          void main() {
            vec3 color = mix(uColor1, uColor2, vUv.y);
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
}

// Camera with scroll-based subtle movement
function ScrollCamera() {
  const { camera } = useThree();
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    // Subtle camera movement based on scroll
    const scrollProgress = scrollY.current / (document.body.scrollHeight - window.innerHeight || 1);
    camera.position.z = 15 + scrollProgress * 3;
    camera.position.y = scrollProgress * -2;
    camera.rotation.x = scrollProgress * 0.1;
  });

  return null;
}

// Main scene component
function Scene() {
  useCursorParallax();

  return (
    <>
      <BackgroundGradient />
      <ParticleField />
      <GlowingOrbs />
      <ScrollCamera />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

export function CinematicScene() {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  if (!mounted || prefersReducedMotion) {
    // Fallback for SSR or reduced motion
    return (
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: "linear-gradient(to bottom, #0a0a0f, #0f1a14)",
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false }}
      >
        <Scene />
      </Canvas>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.4) 100%)",
        }}
      />
    </div>
  );
}
