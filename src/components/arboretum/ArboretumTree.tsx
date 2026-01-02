"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  ArboretumData,
  ArboretumViewState,
  Insight,
  BRANCH_COLORS,
  ThematicBranch,
} from "@/types/arboretum";
import { BloomMesh } from "./blooms/BloomMesh";
import { MemoryThread } from "./effects/MemoryThread";

interface ArboretumTreeProps {
  data: ArboretumData;
  viewState: ArboretumViewState;
  onInsightClick: (insightId: string) => void;
}

// Branch configuration for positioning
const BRANCH_ANGLES: Record<ThematicBranch, number> = {
  relationships: Math.PI * 0.25,
  career: -Math.PI * 0.17,
  trauma: Math.PI * 0.75,
  joy: -Math.PI * 0.33,
  growth: 0,
  identity: Math.PI * 0.5,
  purpose: -Math.PI * 0.5,
};

// Calculate bloom position on the tree
function getBloomPosition(
  insight: Insight,
  index: number,
  total: number
): THREE.Vector3 {
  const branch = insight.branch;
  const angle = BRANCH_ANGLES[branch];
  const isFoundational = insight.temporal.isFoundational;

  if (isFoundational) {
    // Root blooms - below ground
    const rootAngle = (index / total) * Math.PI * 2;
    const rootRadius = 2 + Math.random() * 2;
    return new THREE.Vector3(
      Math.cos(rootAngle) * rootRadius,
      -1 - Math.random() * 2,
      Math.sin(rootAngle) * rootRadius
    );
  }

  // Branch blooms - positioned along branches
  const yearOffset = (insight.temporal.year - 2015) / 10;
  const baseHeight = 2 + yearOffset * 8;
  const branchLength = 3 + yearOffset * 2;
  const randomOffset = (index % 5) * 0.5;

  const x = Math.cos(angle) * (branchLength + randomOffset);
  const y = baseHeight + Math.sin(insight.emotion.buoyancy * 0.5) * 2;
  const z = Math.sin(angle) * (branchLength + randomOffset);

  return new THREE.Vector3(x, y, z);
}

export function ArboretumTree({
  data,
  viewState,
  onInsightClick,
}: ArboretumTreeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  // Calculate bloom positions
  const bloomPositions = useMemo(() => {
    return data.insights.map((insight, index) =>
      getBloomPosition(insight, index, data.insights.length)
    );
  }, [data.insights]);

  // Animate the tree
  useFrame((_, delta) => {
    timeRef.current += delta;

    if (groupRef.current) {
      // Gentle sway
      groupRef.current.rotation.y = Math.sin(timeRef.current * 0.1) * 0.02;
    }
  });

  // Filter insights based on season
  const visibleInsights = useMemo(() => {
    if (viewState.seasonProgress < 0.3) {
      // Winter - only show foundational
      return data.insights.filter((i) => i.temporal.isFoundational);
    }
    if (viewState.seasonProgress < 0.6) {
      // Early spring - foundational + high intensity
      return data.insights.filter(
        (i) => i.temporal.isFoundational || i.emotion.intensity > 0.7
      );
    }
    // Full spring - all insights
    return data.insights;
  }, [data.insights, viewState.seasonProgress]);

  return (
    <group ref={groupRef}>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <circleGeometry args={[15, 64]} />
        <meshStandardMaterial
          color="#0a1a0a"
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Trunk */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 8, 16]} />
        <meshStandardMaterial
          color="#2d1f1a"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Growth rings on trunk (visible texture) */}
      {data.config.rings.map((ring, i) => {
        const y = -2 + (i / data.config.rings.length) * 8;
        return (
          <mesh key={ring.year} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.35 + i * 0.02, 0.02, 8, 32]} />
            <meshStandardMaterial
              color="#3d2f2a"
              transparent
              opacity={ring.density}
            />
          </mesh>
        );
      })}

      {/* Branches */}
      {Object.entries(BRANCH_ANGLES).map(([branch, angle]) => {
        const branchInsights = data.insights.filter((i) => i.branch === branch);
        const weight = branchInsights.reduce(
          (acc, i) => acc + i.emotion.buoyancy,
          0
        ) / Math.max(branchInsights.length, 1);
        const droop = weight < 0 ? Math.abs(weight) * 0.3 : 0;

        return (
          <group key={branch} rotation={[0, angle, 0]}>
            {/* Main branch */}
            <mesh position={[2, 4 - droop, 0]} rotation={[0, 0, -0.4 - droop]}>
              <cylinderGeometry args={[0.08, 0.15, 4, 8]} />
              <meshStandardMaterial
                color={BRANCH_COLORS[branch as ThematicBranch]}
                transparent
                opacity={0.6}
                emissive={BRANCH_COLORS[branch as ThematicBranch]}
                emissiveIntensity={0.2}
              />
            </mesh>

            {/* Sub-branches */}
            <mesh position={[3.5, 5 - droop, 0.5]} rotation={[0.2, 0, -0.6 - droop]}>
              <cylinderGeometry args={[0.03, 0.06, 2, 6]} />
              <meshStandardMaterial
                color={BRANCH_COLORS[branch as ThematicBranch]}
                transparent
                opacity={0.4}
              />
            </mesh>
            <mesh position={[3, 5.5 - droop, -0.5]} rotation={[-0.3, 0, -0.5 - droop]}>
              <cylinderGeometry args={[0.03, 0.06, 1.5, 6]} />
              <meshStandardMaterial
                color={BRANCH_COLORS[branch as ThematicBranch]}
                transparent
                opacity={0.4}
              />
            </mesh>
          </group>
        );
      })}

      {/* Root system */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <mesh
            key={`root-${i}`}
            position={[
              Math.cos(angle) * 1.5,
              -2.5,
              Math.sin(angle) * 1.5,
            ]}
            rotation={[0.8, angle, 0]}
          >
            <cylinderGeometry args={[0.05, 0.15, 3, 6]} />
            <meshStandardMaterial
              color="#1a0f0a"
              roughness={1}
            />
          </mesh>
        );
      })}

      {/* Blooms (insights) */}
      {visibleInsights.map((insight, index) => {
        const originalIndex = data.insights.findIndex((i) => i.id === insight.id);
        const position = bloomPositions[originalIndex];

        return (
          <BloomMesh
            key={insight.id}
            insight={insight}
            position={position}
            seasonProgress={viewState.seasonProgress}
            shadowMode={viewState.shadowMode}
            onClick={() => onInsightClick(insight.id)}
            isFocused={viewState.focusedInsightId === insight.id}
          />
        );
      })}

      {/* Memory threads (connections) */}
      {viewState.showConnections &&
        data.insights.map((insight, index) =>
          insight.connections.map((connection) => {
            const targetIndex = data.insights.findIndex(
              (i) => i.id === connection.targetId
            );
            if (targetIndex === -1) return null;

            return (
              <MemoryThread
                key={`${insight.id}-${connection.targetId}`}
                start={bloomPositions[index]}
                end={bloomPositions[targetIndex]}
                strength={connection.strength}
                type={connection.type}
              />
            );
          })
        )}

      {/* Ambient particles (sap flow simulation) */}
      <SapParticles config={data.config.sapFlow} viewState={viewState} />
    </group>
  );
}

// Sap flow particles
function SapParticles({
  viewState,
}: {
  config: ArboretumData["config"]["sapFlow"];
  viewState: ArboretumViewState;
}) {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 100;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.3;
      const height = Math.random() * 10 - 2;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (!particlesRef.current) return;

    const positionAttribute = particlesRef.current.geometry.getAttribute(
      "position"
    ) as THREE.BufferAttribute;

    for (let i = 0; i < particleCount; i++) {
      // Move particles upward along trunk
      positionAttribute.array[i * 3 + 1] += delta * 0.5;

      // Reset when too high
      if (positionAttribute.array[i * 3 + 1] > 8) {
        positionAttribute.array[i * 3 + 1] = -2;
      }
    }

    positionAttribute.needsUpdate = true;
  });

  if (viewState.seasonProgress < 0.5) return null;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color="#10b981"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
