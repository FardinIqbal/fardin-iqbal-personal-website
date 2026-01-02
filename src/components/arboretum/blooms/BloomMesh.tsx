"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Insight } from "@/types/arboretum";

interface BloomMeshProps {
  insight: Insight;
  position: THREE.Vector3;
  seasonProgress: number;
  shadowMode: boolean;
  onClick: () => void;
  isFocused: boolean;
}

export function BloomMesh({
  insight,
  position,
  seasonProgress,
  shadowMode,
  onClick,
  isFocused,
}: BloomMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(Math.random() * 100);

  // Parse bloom color
  const color = useMemo(() => {
    return new THREE.Color(insight.bloom.color);
  }, [insight.bloom.color]);

  // Shadow mode inverts to show fears/avoidance
  const displayColor = useMemo(() => {
    if (shadowMode && insight.shadowSelf) {
      // Invert to darker, more muted color
      return new THREE.Color(insight.bloom.color).multiplyScalar(0.3);
    }
    return color;
  }, [shadowMode, insight.shadowSelf, insight.bloom.color, color]);

  // Animate the bloom
  useFrame((_, delta) => {
    timeRef.current += delta;

    if (meshRef.current) {
      // Gentle floating motion based on buoyancy
      const floatAmount = insight.emotion.buoyancy * 0.3;
      meshRef.current.position.y =
        position.y + Math.sin(timeRef.current * 0.5) * floatAmount;

      // Rotation
      meshRef.current.rotation.y = timeRef.current * 0.2;

      // Scale pulsing
      const pulse = 1 + Math.sin(timeRef.current * 2) * 0.05 * insight.bloom.glow;
      const focusScale = isFocused ? 1.5 : 1;
      const seasonScale = seasonProgress;
      meshRef.current.scale.setScalar(
        insight.bloom.size * pulse * focusScale * seasonScale
      );
    }

    if (glowRef.current) {
      // Glow animation
      const glowPulse = 0.8 + Math.sin(timeRef.current * 1.5) * 0.2;
      glowRef.current.scale.setScalar(insight.bloom.size * 1.5 * glowPulse);

      // Glow material opacity
      const material = glowRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = insight.bloom.glow * 0.3 * seasonProgress;
    }
  });

  // Don't render if season is too early and not foundational
  if (seasonProgress < 0.2 && !insight.temporal.isFoundational) {
    return null;
  }

  return (
    <group position={position}>
      {/* Main bloom mesh */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      >
        {/* Bloom geometry - icosahedron for organic feel */}
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial
          color={displayColor}
          emissive={displayColor}
          emissiveIntensity={insight.bloom.glow * (shadowMode ? 0.2 : 0.5)}
          roughness={0.3}
          metalness={0.2}
          transparent
          opacity={seasonProgress}
        />
      </mesh>

      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial
          color={displayColor}
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Inner core light */}
      <pointLight
        color={displayColor}
        intensity={insight.bloom.glow * seasonProgress * (isFocused ? 2 : 0.5)}
        distance={2}
        decay={2}
      />

      {/* Focus ring when selected */}
      {isFocused && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.6, 0.7, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}
