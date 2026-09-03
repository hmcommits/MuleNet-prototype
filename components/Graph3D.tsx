"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Sphere,
  Box,
  Octahedron,
  Trail,
  Sparkles,
  MeshDistortMaterial,
  Float,
  Text,
} from "@react-three/drei";
import * as THREE from "three";
import { GraphNode, GraphEdge, GRAPH_NODES, GRAPH_EDGES, FRAUD_EDGES } from "@/lib/mockData";

// ── Color mappings ──────────────────────────────────────────
function nodeColor(risk: GraphNode["risk"], isLit: boolean) {
  if (isLit) return "#DC143C";
  switch (risk) {
    case "victim":     return "#A855F7";
    case "mule":       return "#DC143C";
    case "suspicious": return "#FF8C00";
    default:           return "#00F5FF";
  }
}

// ── 3D positions (spread into z-depth too) ─────────────────
const NODE_3D: Record<string, [number, number, number]> = {
  victim:       [0,    0,    0],
  mule1:        [-3.5, 2.5, -1],
  mule2:        [3.5,  2.5, -1],
  mule3:        [-3.5,-2.5,  1],
  mule4:        [3.5, -2.5,  1],
  merchant:     [0,   -4,   -2],
  ghost_farm:   [0,    4.5,  2],
  subnet_fraud: [5.5,  0,    0],
  subnet_safe:  [-5.5, 0,    0],
  safe1:        [-4.5,-3.5,  2],
  safe2:        [4.5, -3.5,  2],
  susp1:        [5,    1.5,  1],
};

// ── Single 3D node ─────────────────────────────────────────
function Node3D({
  node,
  isSelected,
  isLit,
  onClick,
}: {
  node: GraphNode;
  isSelected: boolean;
  isLit: boolean;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const color = nodeColor(node.risk, isLit);
  const pos = NODE_3D[node.id] ?? [0, 0, 0];
  const scale = node.id === "victim" ? 1.1 : node.id === "merchant" ? 0.95 : 0.75;

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (isLit ? 3 : 0.5);
      if (isSelected) meshRef.current.rotation.x += delta * 1.5;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={isSelected ? 0.8 : 0.3}>
      <group position={pos as [number, number, number]} onClick={onClick}>
        {/* Outer glow ring */}
        <mesh>
          <ringGeometry args={[scale + 0.15, scale + 0.28, 32]} />
          <meshBasicMaterial color={color} transparent opacity={isSelected || isLit ? 0.6 : 0.15} side={THREE.DoubleSide} />
        </mesh>

        {/* Main shape */}
        <mesh ref={meshRef} scale={scale}>
          {node.type === "device" ? (
            <boxGeometry args={[1, 1, 1]} />
          ) : node.type === "subnet" ? (
            <octahedronGeometry args={[1, 0]} />
          ) : node.id === "ghost_farm" ? (
            <icosahedronGeometry args={[1, 0]} />
          ) : (
            <sphereGeometry args={[1, 32, 32]} />
          )}
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isLit ? 1.8 : isSelected ? 1.2 : 0.35}
            metalness={0.4}
            roughness={0.2}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Point light at node */}
        <pointLight color={color} intensity={isLit ? 4 : isSelected ? 2 : 0.8} distance={3} />

        {/* Label */}
        <Text
          position={[0, -(scale + 0.45), 0]}
          fontSize={0.22}
          color={color}
          anchorX="center"
          anchorY="middle"
          outlineColor="#000"
          outlineWidth={0.02}
        >
          {node.label}
        </Text>
      </group>
    </Float>
  );
}

// ── 3D Edge (tube) ─────────────────────────────────────────
function Edge3D({
  source,
  target,
  color = "#00F5FF",
  opacity = 0.2,
  animated = false,
}: {
  source: [number, number, number];
  target: [number, number, number];
  color?: string;
  opacity?: number;
  animated?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  const points = useMemo(() => {
    const mid: [number, number, number] = [
      (source[0] + target[0]) / 2,
      (source[1] + target[1]) / 2,
      (source[2] + target[2]) / 2 + 0.5,
    ];
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(...source),
      new THREE.Vector3(...mid),
      new THREE.Vector3(...target),
    ]);
  }, [source, target]);

  const geometry = useMemo(
    () => new THREE.TubeGeometry(points, 20, animated ? 0.035 : 0.018, 8, false),
    [points, animated]
  );

  useFrame((state) => {
    if (meshRef.current && animated) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.5 + Math.sin(state.clock.elapsedTime * 5) * 0.8;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={animated ? 2 : 0.3}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

// ── Particle flood on attack ───────────────────────────────
function AttackParticles({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <Sparkles
      count={120}
      scale={[14, 10, 6]}
      size={3}
      speed={0.8}
      color="#DC143C"
      opacity={0.7}
    />
  );
}

// ── Ambient floating particles ─────────────────────────────
function AmbientParticles() {
  return (
    <Sparkles
      count={60}
      scale={[18, 14, 8]}
      size={1.5}
      speed={0.2}
      color="#00F5FF"
      opacity={0.3}
    />
  );
}

// ── Camera auto-rotate ─────────────────────────────────────
function CameraRig({ isAttackActive }: { isAttackActive: boolean }) {
  const { camera } = useThree();
  useFrame((state) => {
    if (!isAttackActive) {
      camera.position.x = Math.sin(state.clock.elapsedTime * 0.08) * 12;
      camera.position.z = 10 + Math.cos(state.clock.elapsedTime * 0.06) * 2;
      camera.lookAt(0, 0, 0);
    }
  });
  return null;
}

// ── Fraud pulse ring on victim during attack ───────────────
function PulseRing({ active }: { active: boolean }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    if (ref.current && active) {
      ref.current.scale.x += delta * 2;
      ref.current.scale.y += delta * 2;
      if (ref.current.scale.x > 6) {
        ref.current.scale.set(1, 1, 1);
      }
      const mat = ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, 0.7 - (ref.current.scale.x - 1) / 8);
    }
  });
  if (!active) return null;
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <ringGeometry args={[0.9, 1.1, 64]} />
      <meshBasicMaterial color="#DC143C" transparent opacity={0.5} side={THREE.DoubleSide} />
    </mesh>
  );
}

// ── Main Scene ─────────────────────────────────────────────
function Scene({
  selectedNodeId,
  isAttackActive,
  activeEdgeIds,
  onNodeClick,
}: {
  selectedNodeId: string | null;
  isAttackActive: boolean;
  activeEdgeIds: string[];
  onNodeClick: (node: GraphNode) => void;
}) {
  const fraudEdgeSet = new Set(activeEdgeIds);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[0, 0, 0]} intensity={1} color="#00F5FF" distance={20} />

      {/* Camera */}
      <CameraRig isAttackActive={isAttackActive} />
      {isAttackActive && (
        <OrbitControls enableZoom={true} enablePan={false} autoRotate={false} />
      )}

      {/* Ambient particles */}
      <AmbientParticles />
      <AttackParticles active={isAttackActive} />
      <PulseRing active={isAttackActive} />

      {/* Static edges */}
      {GRAPH_EDGES.map((e) => {
        const src = NODE_3D[e.source];
        const dst = NODE_3D[e.target];
        if (!src || !dst) return null;
        return (
          <Edge3D
            key={e.id}
            source={src}
            target={dst}
            color="#00F5FF"
            opacity={0.15}
          />
        );
      })}

      {/* Fraud edges — only when active */}
      {FRAUD_EDGES.filter((e) => fraudEdgeSet.has(e.id)).map((e) => {
        const src = NODE_3D[e.source];
        const dst = NODE_3D[e.target];
        if (!src || !dst) return null;
        return (
          <Edge3D
            key={e.id}
            source={src}
            target={dst}
            color="#DC143C"
            opacity={0.9}
            animated={true}
          />
        );
      })}

      {/* Nodes */}
      {GRAPH_NODES.map((node) => (
        <Node3D
          key={node.id}
          node={node}
          isSelected={selectedNodeId === node.id}
          isLit={
            isAttackActive &&
            (node.risk === "mule" ||
              node.id === "victim" ||
              node.id === "merchant" ||
              node.id === "ghost_farm")
          }
          onClick={() => onNodeClick(node)}
        />
      ))}
    </>
  );
}

// ── Exported Canvas wrapper ────────────────────────────────
export interface Graph3DProps {
  selectedNodeId: string | null;
  isAttackActive: boolean;
  activeEdgeIds: string[];
  onNodeClick: (node: GraphNode) => void;
}

export default function Graph3D({
  selectedNodeId,
  isAttackActive,
  activeEdgeIds,
  onNodeClick,
}: Graph3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 2, 12], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
    >
      <fog attach="fog" args={["#020617", 18, 35]} />
      <Scene
        selectedNodeId={selectedNodeId}
        isAttackActive={isAttackActive}
        activeEdgeIds={activeEdgeIds}
        onNodeClick={onNodeClick}
      />
    </Canvas>
  );
}
