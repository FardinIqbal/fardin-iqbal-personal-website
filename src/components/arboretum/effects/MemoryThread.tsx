"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { ConnectionType } from "@/types/arboretum";

interface MemoryThreadProps {
  start: THREE.Vector3;
  end: THREE.Vector3;
  strength: number;
  type: ConnectionType;
}

const TYPE_COLORS: Record<ConnectionType, string> = {
  caused_by: "#ef4444",
  led_to: "#3b82f6",
  echoes: "#8b5cf6",
  contrasts: "#f59e0b",
  transforms: "#10b981",
  heals: "#06b6d4",
};

export function MemoryThread({ start, end, strength, type }: MemoryThreadProps) {
  // Create curved path between points
  const points = useMemo(() => {
    const midPoint = new THREE.Vector3()
      .addVectors(start, end)
      .multiplyScalar(0.5);

    // Add curve based on distance
    const distance = start.distanceTo(end);
    midPoint.y += distance * 0.3;

    const curve = new THREE.QuadraticBezierCurve3(start, midPoint, end);
    return curve.getPoints(50).map(p => [p.x, p.y, p.z] as [number, number, number]);
  }, [start, end]);

  const color = TYPE_COLORS[type];

  return (
    <group>
      {/* Main thread line using drei's Line component */}
      <Line
        points={points}
        color={color}
        lineWidth={1}
        transparent
        opacity={strength * 0.6}
        dashed
        dashSize={0.2}
        gapSize={0.1}
      />

      {/* Particle flowing along thread */}
      <FlowingParticle start={start} end={end} color={color} speed={strength} />
    </group>
  );
}

function FlowingParticle({
  start,
  end,
  color,
  speed,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color: string;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const progressRef = useRef(Math.random());

  // Create curve for particle path
  const curve = useMemo(() => {
    const midPoint = new THREE.Vector3()
      .addVectors(start, end)
      .multiplyScalar(0.5);
    const distance = start.distanceTo(end);
    midPoint.y += distance * 0.3;
    return new THREE.QuadraticBezierCurve3(start, midPoint, end);
  }, [start, end]);

  useFrame((_, delta) => {
    progressRef.current += delta * speed * 0.3;
    if (progressRef.current > 1) progressRef.current = 0;

    if (meshRef.current) {
      const point = curve.getPoint(progressRef.current);
      meshRef.current.position.copy(point);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}
