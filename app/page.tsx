"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import GraphVisualizer from "@/components/GraphVisualizer";
import ThreatPanel from "@/components/ThreatPanel";
import DossierPanel from "@/components/DossierPanel";
import { GraphNode } from "@/lib/mockData";

export default function Home() {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [velocityValue, setVelocityValue] = useState(12);
  const [isAttackActive, setIsAttackActive] = useState(false);

  const handleNodeSelect = useCallback((node: GraphNode | null) => {
    setSelectedNode(node);
    if (node) {
      setVelocityValue(Math.min(95, node.details.riskScore));
    }
  }, []);

  const handleAttackStart = useCallback(() => {
    setIsAttackActive(true);
    setVelocityValue(94);
  }, []);

  const handleAttackReset = useCallback(() => {
    setIsAttackActive(false);
    setVelocityValue(12);
    setSelectedNode(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#020617" }}>
      <Header />

      <main className="flex-1 flex flex-col gap-4 p-4 max-w-[1600px] w-full mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 pt-1">
          <div
            className="h-px flex-1"
            style={{ background: "linear-gradient(90deg, #00F5FF33, transparent)" }}
          />
          <span className="text-[9px] uppercase tracking-[0.25em] text-slate-600 font-bold">
            H-GNN Topology · Real-Time Surveillance
          </span>
          <div
            className="h-px flex-1"
            style={{ background: "linear-gradient(270deg, #00F5FF33, transparent)" }}
          />
        </div>

        {/* Hero: Graph + Sidebar */}
        <div className="flex gap-4 items-start">
          {/* Graph takes remaining width */}
          <div className="flex-1 min-w-0">
            <GraphVisualizer
              onNodeSelect={handleNodeSelect}
              onAttackStart={handleAttackStart}
              onAttackReset={handleAttackReset}
            />
          </div>

          {/* Sidebar */}
          <ThreatPanel
            selectedNode={selectedNode}
            velocityValue={velocityValue}
            isAttackActive={isAttackActive}
          />
        </div>

        {/* Section label */}
        <div className="flex items-center gap-3">
          <div
            className="h-px flex-1"
            style={{ background: "linear-gradient(90deg, #DC143C33, transparent)" }}
          />
          <span className="text-[9px] uppercase tracking-[0.25em] text-slate-600 font-bold">
            GNNExplainer · Evidentiary Chain · Legal Dossier
          </span>
          <div
            className="h-px flex-1"
            style={{ background: "linear-gradient(270deg, #DC143C33, transparent)" }}
          />
        </div>

        {/* Dossier panel */}
        <DossierPanel />

        {/* Footer */}
        <footer className="text-center py-4 text-[10px] text-slate-700 font-mono">
          MuleNet v2.1 · H-GNN + GNNExplainer · Prototype · RBI SOP Compliant ·{" "}
          <span className="text-slate-600">I4C × RBIH MoU 2026</span>
        </footer>
      </main>
    </div>
  );
}
