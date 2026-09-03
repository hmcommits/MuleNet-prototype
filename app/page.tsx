"use client";

import { useState, useCallback, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftRight, AlertTriangle, Shield, IndianRupee, Network, Globe2, Zap } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import KpiCard from "@/components/KpiCard";
import GraphVisualizer from "@/components/GraphVisualizer";
import AiInsightsPanel from "@/components/AiInsightsPanel";
import TransactionTimeline from "@/components/TransactionTimeline";
import AlertToast from "@/components/AlertToast";
import DossierPanel from "@/components/DossierPanel";
import { GraphNode } from "@/lib/mockData";

// ── Spark data ────────────────────────────────────────────────
const SPARKS = {
  tx:       [12, 18, 14, 22, 19, 28, 24, 31, 26, 35, 30, 38],
  alerts:   [2,  3,  5,  4,  8,  6,  9,  12, 8,  15, 10, 37],
  accounts: [80, 85, 92, 88, 95, 98, 101, 96, 104, 108, 110, 112],
  funds:    [0.8, 1.2, 1.5, 1.1, 1.8, 2.1, 1.9, 2.4, 2.8, 3.1, 3.4, 3.62],
};

// ── Network summary bar under graph ───────────────────────────
function NetworkSummary({ isAttackActive }: { isAttackActive: boolean }) {
  return (
    <div className="flex items-center gap-6 px-5 py-3 border-t border-slate-800/50">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" style={{ boxShadow: "0 0 6px #00F5FF" }} />
        <div>
          <p className="text-[10px] font-bold text-cyan-400">Safe Network</p>
          <p className="text-[9px] text-slate-500">1,842 Accounts · Low Risk</p>
        </div>
      </div>
      <div className="h-6 w-px bg-slate-800" />
      <div className="text-center">
        <p className="text-xs font-bold text-white">Total Connections</p>
        <p className="text-[10px] text-slate-500">{isAttackActive ? "4,334" : "4,326"} · Across 2 Networks</p>
      </div>
      <div className="h-6 w-px bg-slate-800" />
      <div className="flex items-center gap-2">
        <motion.span
          className="w-2.5 h-2.5 rounded-full bg-red-500"
          animate={isAttackActive ? { scale: [1, 1.4, 1], opacity: [1, 0.4, 1] } : {}}
          transition={{ duration: 0.8, repeat: Infinity }}
          style={{ boxShadow: isAttackActive ? "0 0 8px #DC143C" : "none" }}
        />
        <div>
          <p className="text-[10px] font-bold text-red-400">Mule Network</p>
          <p className="text-[9px] text-slate-500">{isAttackActive ? "6" : "28"} Accounts · {isAttackActive ? "ACTIVE ATTACK" : "High Risk"}</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [isAttackActive, setIsAttackActive] = useState(false);
  const [showDossier, setShowDossier] = useState(false);

  const handleNodeSelect = useCallback((node: GraphNode | null) => setSelectedNode(node), []);
  const handleAttackStart = useCallback(() => setIsAttackActive(true), []);
  const handleAttackReset = useCallback(() => { setIsAttackActive(false); setSelectedNode(null); }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[#030712]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar />

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-4 space-y-4 max-w-[1600px] mx-auto">

            {/* ── KPI Row ── */}
            <div className="flex gap-3">
              <KpiCard
                label="Live Transactions Scanned"
                value="24,786+"
                change="+12.4%"
                changePositive={true}
                sparkData={SPARKS.tx}
                sparkColor="#00F5FF"
                iconBg="rgba(0,245,255,0.08)"
                icon={<ArrowLeftRight size={16} className="text-cyan-400" />}
              />
              <KpiCard
                label="Fraud Alerts Today"
                value="37"
                change="+15.8%"
                changePositive={false}
                sparkData={SPARKS.alerts}
                sparkColor="#DC143C"
                iconBg="rgba(220,20,60,0.08)"
                icon={<AlertTriangle size={16} className="text-red-400" />}
              />
              <KpiCard
                label="High-Risk Accounts"
                value="112"
                change="+8.3%"
                changePositive={false}
                sparkData={SPARKS.accounts}
                sparkColor="#FF8C00"
                iconBg="rgba(255,140,0,0.08)"
                icon={<Shield size={16} className="text-orange-400" />}
              />
              <KpiCard
                label="Funds Quarantined"
                value="₹42.5M"
                change="+18.7%"
                changePositive={true}
                sparkData={SPARKS.funds}
                sparkColor="#34d399"
                iconBg="rgba(52,211,153,0.08)"
                icon={<IndianRupee size={16} className="text-emerald-400" />}
              />
            </div>

            {/* ── Network Graph + AI Insights ── */}
            <div className="flex gap-3 items-start">
              {/* Graph panel */}
              <div
                className="flex-1 rounded-2xl border border-slate-800/50 overflow-hidden min-w-0"
                style={{ background: "rgba(8,14,30,0.9)" }}
              >
                {/* Graph header */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800/50">
                  <div className="flex items-center gap-2">
                    <Network size={14} className="text-cyan-400" />
                    <h2 className="text-sm font-bold text-white">Network Graph</h2>
                    <div className="text-[9px] text-slate-500 px-1.5 py-0.5 rounded border border-slate-800/60">
                      ⓘ H-GNN Topology
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-[10px] text-slate-500">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" /> Normal Account
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500">
                      <span className="w-2 h-2 rounded-full bg-red-500" /> Money Mule / High Risk
                    </div>
                    <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium text-slate-400 border border-slate-800 hover:border-slate-600 transition-colors">
                      <Globe2 size={11} /> Layout
                    </button>
                  </div>
                </div>

                {/* 3D Graph */}
                <GraphVisualizer
                  onNodeSelect={handleNodeSelect}
                  onAttackStart={handleAttackStart}
                  onAttackReset={handleAttackReset}
                />

                {/* Network summary */}
                <NetworkSummary isAttackActive={isAttackActive} />
              </div>

              {/* AI Insights */}
              <AiInsightsPanel
                selectedNode={selectedNode}
                isAttackActive={isAttackActive}
                onOpenDossier={() => setShowDossier(true)}
              />
            </div>

            {/* ── Transaction Timeline ── */}
            <TransactionTimeline isAttackActive={isAttackActive} />

            {/* ── GNNExplainer Dossier (hidden by default, shown on demand) ── */}
            <AnimatePresence>
              {showDossier && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <DossierPanel />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pb-4 text-center text-[9px] font-mono text-slate-700">
              MuleNet v2.1 · H-GNN + GNNExplainer · RBI SOP Compliant · I4C × RBIH MoU 2026
            </div>
          </div>
        </div>
      </div>

      {/* Alert toast */}
      <AlertToast isAttackActive={isAttackActive} onInvestigate={() => setShowDossier(true)} />
    </div>
  );
}
