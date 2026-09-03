"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Zap } from "lucide-react";
import { GRAPH_NODES, GRAPH_EDGES, FRAUD_EDGES, GraphNode, GraphEdge } from "@/lib/mockData";

interface GraphVisualizerProps {
  onNodeSelect: (node: GraphNode | null) => void;
  onAttackStart: () => void;
  onAttackReset: () => void;
}

// ── Node Shape Renderers ──────────────────────────────────────
function getNodeColor(risk: GraphNode["risk"], isActive: boolean) {
  if (isActive) return "#DC143C";
  switch (risk) {
    case "victim": return "#A855F7";
    case "mule": return "#DC143C";
    case "suspicious": return "#FF8C00";
    case "safe":
    default: return "#00F5FF";
  }
}

function getNodeGlow(risk: GraphNode["risk"], isActive: boolean) {
  const c = getNodeColor(risk, isActive);
  return `0 0 16px ${c}88, 0 0 32px ${c}44`;
}

function NodeShape({
  node,
  isSelected,
  isAttackActive,
  onClick,
}: {
  node: GraphNode;
  isSelected: boolean;
  isAttackActive: boolean;
  onClick: () => void;
}) {
  const isHighlighted =
    isAttackActive &&
    (node.risk === "mule" || node.id === "victim" || node.id === "merchant" || node.id === "ghost_farm");
  const color = getNodeColor(node.risk, isHighlighted);
  const size = node.id === "victim" ? 28 : node.id === "merchant" ? 24 : node.type === "device" ? 22 : node.type === "subnet" ? 20 : 18;

  const sharedProps = {
    onClick,
    style: {
      cursor: "pointer",
      filter: isSelected || isHighlighted
        ? `drop-shadow(0 0 8px ${color}) drop-shadow(0 0 16px ${color}66)`
        : `drop-shadow(0 0 4px ${color}66)`,
    } as React.CSSProperties,
  };

  return (
    <g transform={`translate(${node.x}, ${node.y})`} {...sharedProps}>
      {/* Pulse ring on selected/highlighted */}
      {(isSelected || isHighlighted) && (
        <motion.circle
          cx={0}
          cy={0}
          r={size + 8}
          fill="none"
          stroke={color}
          strokeWidth={1}
          animate={{ r: [size + 8, size + 18], opacity: [0.6, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
        />
      )}

      {/* Shape based on type */}
      {node.type === "account" || node.type === "merchant" || node.id === "victim" ? (
        <circle cx={0} cy={0} r={size} fill={`${color}22`} stroke={color} strokeWidth={isSelected ? 2.5 : 1.5} />
      ) : node.type === "device" ? (
        <rect x={-size} y={-size} width={size * 2} height={size * 2} rx={4}
          fill={`${color}22`} stroke={color} strokeWidth={isSelected ? 2.5 : 1.5} />
      ) : (
        // Hexagon for subnet
        <polygon
          points={hexPoints(size)}
          fill={`${color}22`}
          stroke={color}
          strokeWidth={isSelected ? 2.5 : 1.5}
        />
      )}

      {/* Label */}
      <text
        x={0}
        y={size + 14}
        textAnchor="middle"
        fontSize={9}
        fill={color}
        style={{ pointerEvents: "none", fontFamily: "monospace", fontWeight: 600 }}
      >
        {node.label}
      </text>
    </g>
  );
}

function hexPoints(r: number) {
  return Array.from({ length: 6 })
    .map((_, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      return `${r * Math.cos(angle)},${r * Math.sin(angle)}`;
    })
    .join(" ");
}

// ── Animated Edge ─────────────────────────────────────────────
function Edge({
  edge,
  nodes,
  isFraudAnimating,
  animDelay,
}: {
  edge: GraphEdge;
  nodes: GraphNode[];
  isFraudAnimating: boolean;
  animDelay: number;
}) {
  const src = nodes.find((n) => n.id === edge.source);
  const dst = nodes.find((n) => n.id === edge.target);
  if (!src || !dst) return null;

  const color = edge.isFraud ? "#DC143C" : "#00F5FF";
  const strokeWidth = edge.isFraud ? 2 : 1;
  const opacity = edge.isFraud ? 0.9 : 0.25;

  // Compute path
  const dx = dst.x - src.x;
  const dy = dst.y - src.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const mx = (src.x + dst.x) / 2 - (dy / len) * 20;
  const my = (src.y + dst.y) / 2 + (dx / len) * 20;
  const d = `M ${src.x} ${src.y} Q ${mx} ${my} ${dst.x} ${dst.y}`;

  const pathId = `path-${edge.id}`;

  return (
    <g>
      {isFraudAnimating && edge.isFraud && (
        <motion.path
          id={pathId}
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray="6 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity }}
          transition={{ duration: 0.6, delay: animDelay, ease: "easeOut" }}
        />
      )}
      {!edge.isFraud && (
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          opacity={opacity}
          strokeDasharray="4 6"
        />
      )}

      {/* Flowing particle on fraud edges */}
      {isFraudAnimating && edge.isFraud && (
        <motion.circle r={4} fill={color}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0], offsetDistance: ["0%", "100%"] }}
          transition={{ duration: 1.2, delay: animDelay + 0.6, ease: "easeInOut" }}
          style={{ offsetPath: `path("${d}")` } as React.CSSProperties}
        />
      )}

      {/* Amount label */}
      {edge.amount && isFraudAnimating && (
        <motion.text
          x={mx}
          y={my - 6}
          textAnchor="middle"
          fontSize={8}
          fill={color}
          fontWeight={700}
          fontFamily="monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: animDelay + 0.8 }}
        >
          {edge.amount}
        </motion.text>
      )}
    </g>
  );
}

// ── Main Component ─────────────────────────────────────────────
export default function GraphVisualizer({
  onNodeSelect,
  onAttackStart,
  onAttackReset,
}: GraphVisualizerProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [attackPhase, setAttackPhase] = useState<"idle" | "scatter" | "gather" | "done">("idle");
  const [activeEdges, setActiveEdges] = useState<GraphEdge[]>([]);

  const handleNodeClick = useCallback(
    (node: GraphNode) => {
      setSelectedNodeId(node.id);
      onNodeSelect(node);
    },
    [onNodeSelect]
  );

  const simulateAttack = useCallback(async () => {
    onAttackStart();
    setAttackPhase("scatter");

    // Phase 1: Scatter — victim to mules
    const scatterEdges = FRAUD_EDGES.filter((e) => e.source === "victim");
    setActiveEdges(scatterEdges);
    await sleep(1800);

    // Phase 2: Gather — mules to merchant
    setAttackPhase("gather");
    const gatherEdges = FRAUD_EDGES.filter((e) => e.target === "merchant");
    setActiveEdges([...scatterEdges, ...gatherEdges]);
    await sleep(1800);

    setAttackPhase("done");
  }, [onAttackStart]);

  const resetAttack = useCallback(() => {
    setAttackPhase("idle");
    setActiveEdges([]);
    setSelectedNodeId(null);
    onAttackReset();
    onNodeSelect(null);
  }, [onAttackReset, onNodeSelect]);

  const isAttackActive = attackPhase !== "idle";
  const fraudEdgeDelay = (edgeId: string) => {
    const scatter = FRAUD_EDGES.filter((e) => e.source === "victim");
    const gather = FRAUD_EDGES.filter((e) => e.target === "merchant");
    const si = scatter.findIndex((e) => e.id === edgeId);
    const gi = gather.findIndex((e) => e.id === edgeId);
    if (si >= 0) return si * 0.15;
    if (gi >= 0) return gi * 0.15;
    return 0;
  };

  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight: 480 }}>



      {/* SVG Graph */}
      <svg
        viewBox="0 0 800 660"
        className="w-full"
        style={{ minHeight: 520 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setSelectedNodeId(null);
            onNodeSelect(null);
          }
        }}
      >
        {/* Static edges */}
        {GRAPH_EDGES.map((edge) => (
          <Edge
            key={edge.id}
            edge={edge}
            nodes={GRAPH_NODES}
            isFraudAnimating={false}
            animDelay={0}
          />
        ))}

        {/* Active fraud edges */}
        {activeEdges.map((edge) => (
          <Edge
            key={edge.id}
            edge={edge}
            nodes={GRAPH_NODES}
            isFraudAnimating={true}
            animDelay={fraudEdgeDelay(edge.id)}
          />
        ))}

        {/* Nodes */}
        {GRAPH_NODES.map((node) => (
          <NodeShape
            key={node.id}
            node={node}
            isSelected={selectedNodeId === node.id}
            isAttackActive={isAttackActive}
            onClick={() => handleNodeClick(node)}
          />
        ))}
      </svg>

      {/* Control buttons */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {attackPhase === "idle" ? (
          <motion.button
            onClick={simulateAttack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #7f1d1d, #b91c1c)",
              border: "1px solid rgba(220,20,60,0.5)",
              color: "#fff",
              boxShadow: "0 0 20px rgba(220,20,60,0.4), 0 4px 12px rgba(0,0,0,0.5)",
            }}
          >
            <Zap size={15} />
            Simulate Attack
          </motion.button>
        ) : attackPhase === "done" ? (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={resetAttack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer"
            style={{
              background: "rgba(15,23,42,0.9)",
              border: "1px solid rgba(100,116,139,0.4)",
              color: "#94a3b8",
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            }}
          >
            <RotateCcw size={14} />
            Reset
          </motion.button>
        ) : (
          <div
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold"
            style={{
              background: "rgba(220,20,60,0.15)",
              border: "1px solid rgba(220,20,60,0.3)",
              color: "#DC143C",
            }}
          >
            <motion.div
              className="w-3.5 h-3.5 border-2 border-red-800 border-t-red-400 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
            />
            {attackPhase === "scatter" ? "Scatter Phase..." : "Gather Phase..."}
          </div>
        )}
      </div>
    </div>
  );
}

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

