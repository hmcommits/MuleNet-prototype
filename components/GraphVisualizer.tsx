"use client";

import { useState, useCallback, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, RotateCcw, Eye, Globe2 } from "lucide-react";
import { FRAUD_EDGES, GraphNode } from "@/lib/mockData";

// Lazy load the 3D canvas — SSR-safe
const Graph3D = lazy(() => import("./Graph3D"));

interface GraphVisualizerProps {
  onNodeSelect: (node: GraphNode | null) => void;
  onAttackStart: () => void;
  onAttackReset: () => void;
}

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export default function GraphVisualizer({
  onNodeSelect,
  onAttackStart,
  onAttackReset,
}: GraphVisualizerProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [attackPhase, setAttackPhase] = useState<"idle" | "scatter" | "gather" | "done">("idle");
  const [activeEdgeIds, setActiveEdgeIds] = useState<string[]>([]);

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
    const scatterIds = FRAUD_EDGES.filter((e) => e.source === "victim").map((e) => e.id);
    setActiveEdgeIds(scatterIds);
    await sleep(2000);
    setAttackPhase("gather");
    const gatherIds = FRAUD_EDGES.filter((e) => e.target === "merchant").map((e) => e.id);
    setActiveEdgeIds([...scatterIds, ...gatherIds]);
    await sleep(2000);
    setAttackPhase("done");
  }, [onAttackStart]);

  const resetAttack = useCallback(() => {
    setAttackPhase("idle");
    setActiveEdgeIds([]);
    setSelectedNodeId(null);
    onAttackReset();
    onNodeSelect(null);
  }, [onAttackReset, onNodeSelect]);

  const isAttackActive = attackPhase !== "idle";

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 30%, rgba(0,245,255,0.04) 0%, rgba(2,6,23,0.98) 60%)",
        minHeight: 480,
      }}
>
      {/* ── Top bar ── */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 pt-4 pb-2 pointer-events-none">
        <motion.div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md"
          style={{
            background: isAttackActive ? "rgba(220,20,60,0.18)" : "rgba(0,245,255,0.1)",
            border: isAttackActive ? "1px solid rgba(220,20,60,0.45)" : "1px solid rgba(0,245,255,0.3)",
            color: isAttackActive ? "#DC143C" : "#00F5FF",
          }}
        >
          <motion.span
            className="w-2 h-2 rounded-full"
            style={{ background: isAttackActive ? "#DC143C" : "#00F5FF" }}
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
          <Globe2 size={11} />
          {isAttackActive ? "⚠ SCATTER-GATHER ATTACK DETECTED" : "H-GNN Topology · Live Monitoring"}
        </motion.div>

        {/* Legend */}
        <div
          className="flex gap-3 px-3 py-2 rounded-xl backdrop-blur-md"
          style={{ background: "rgba(2,6,23,0.7)", border: "1px solid rgba(255,255,255,0.05)" }}
        >
          {[
            { color: "#A855F7", label: "Victim" },
            { color: "#DC143C", label: "Mule/Farm" },
            { color: "#FF8C00", label: "Suspect" },
            { color: "#00F5FF", label: "Safe" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: color, boxShadow: `0 0 5px ${color}` }} />
              <span className="text-[9px] text-slate-400">{label}</span>
            </div>
          ))}
          <div className="w-px bg-slate-800" />
          <div className="flex items-center gap-1 text-[9px] text-slate-500">
            <Eye size={9} /> Click node to inspect
          </div>
        </div>
      </div>

      {/* ── 3D Canvas ── */}
      <div style={{ height: 420 }}>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full text-slate-600 text-sm">
              <motion.div
                className="flex flex-col items-center gap-3"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="w-10 h-10 border-2 border-cyan-900 border-t-cyan-400 rounded-full animate-spin" />
                Initializing H-GNN Topology…
              </motion.div>
            </div>
          }
        >
          <Graph3D
            selectedNodeId={selectedNodeId}
            isAttackActive={isAttackActive}
            activeEdgeIds={activeEdgeIds}
            onNodeClick={handleNodeClick}
          />
        </Suspense>
      </div>

      {/* ── Control buttons ── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        <AnimatePresence mode="wait">
          {attackPhase === "idle" && (
            <motion.button
              key="simulate"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={simulateAttack}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="relative flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-bold overflow-hidden cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #450a0a, #7f1d1d, #b91c1c)",
                border: "1px solid rgba(220,20,60,0.55)",
                color: "#fff",
                boxShadow: "0 0 30px rgba(220,20,60,0.5), 0 8px 24px rgba(0,0,0,0.6)",
              }}
            >
              {/* shimmer */}
              <motion.div
                className="absolute inset-0"
                style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)", skewX: "-20deg" }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
              <Zap size={16} className="relative z-10" />
              <span className="relative z-10">Simulate Attack</span>
            </motion.button>
          )}

          {(attackPhase === "scatter" || attackPhase === "gather") && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-bold"
              style={{
                background: "rgba(220,20,60,0.15)",
                border: "1px solid rgba(220,20,60,0.35)",
                color: "#DC143C",
              }}
            >
              <motion.div
                className="w-4 h-4 border-2 border-red-900 border-t-red-400 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
              />
              {attackPhase === "scatter" ? "Scatter Phase — Dispersing Funds…" : "Gather Phase — Converging on Mochatrade…"}
            </motion.div>
          )}

          {attackPhase === "done" && (
            <motion.button
              key="reset"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={resetAttack}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold cursor-pointer"
              style={{
                background: "rgba(15,23,42,0.9)",
                border: "1px solid rgba(100,116,139,0.4)",
                color: "#94a3b8",
                boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
              }}
            >
              <RotateCcw size={14} />
              Reset Graph
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(0deg, rgba(2,6,23,0.9) 0%, transparent 100%)" }}
      />
    </div>
  );
}
