"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, ArrowRight, Zap, Users, Cpu, TrendingDown } from "lucide-react";
import { GraphNode } from "@/lib/mockData";

// Circular risk score gauge
function RiskGauge({ score }: { score: number }) {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const color = score >= 80 ? "#DC143C" : score >= 50 ? "#FF8C00" : "#00F5FF";
  const progress = (score / 100) * circ;

  return (
    <div className="relative w-24 h-24 flex-shrink-0">
      <svg viewBox="0 0 96 96" className="w-full h-full -rotate-90">
        {/* Track */}
        <circle cx="48" cy="48" r={r} fill="none" stroke="#1e293b" strokeWidth="9" />
        {/* Tick marks */}
        {[0, 25, 50, 75, 100].map((pct) => {
          const a = (pct / 100) * 2 * Math.PI;
          return (
            <line
              key={pct}
              x1={48 + (r - 6) * Math.cos(a)} y1={48 + (r - 6) * Math.sin(a)}
              x2={48 + (r + 3) * Math.cos(a)} y2={48 + (r + 3) * Math.sin(a)}
              stroke="#334155" strokeWidth="1.5"
            />
          );
        })}
        {/* Progress */}
        <motion.circle
          cx="48" cy="48" r={r}
          fill="none"
          stroke={color}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - progress }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      {/* Center */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold font-mono leading-none" style={{ color }}>{score}</span>
        <span className="text-[9px] text-slate-500 mt-0.5">/100</span>
      </div>
    </div>
  );
}

const RISK_REASONS = [
  {
    icon: Zap,
    label: "Rapid Fund Movement",
    detail: "High velocity transactions layered within 1.4 seconds",
    color: "#DC143C",
  },
  {
    icon: Users,
    label: "Multiple New Beneficiaries",
    detail: "Funds distributed to 4 mule accounts simultaneously",
    color: "#FF8C00",
  },
  {
    icon: Cpu,
    label: "Shared Device Detected",
    detail: "Ghost Farm — Xiaomi_Redmi_CanvasHash_99X links 4 accounts",
    color: "#FF8C00",
  },
  {
    icon: TrendingDown,
    label: "Scatter-Gather Pattern",
    detail: "₹11L dispersed then converged to Mochatrade crypto off-ramp",
    color: "#DC143C",
  },
];

interface AiInsightsPanelProps {
  selectedNode: GraphNode | null;
  isAttackActive: boolean;
  onOpenDossier: () => void;
}

export default function AiInsightsPanel({ selectedNode, isAttackActive, onOpenDossier }: AiInsightsPanelProps) {
  const riskScore = isAttackActive ? 96 : selectedNode ? selectedNode.details.riskScore : 12;
  const riskLabel = riskScore >= 80 ? "CRITICAL RISK" : riskScore >= 50 ? "HIGH RISK" : "LOW RISK";
  const riskLabelColor = riskScore >= 80 ? "#DC143C" : riskScore >= 50 ? "#FF8C00" : "#34d399";

  return (
    <aside
      className="w-72 flex-shrink-0 rounded-2xl border border-slate-800/50 overflow-hidden flex flex-col"
      style={{ background: "rgba(8,14,30,0.95)" }}
    >
      {/* Header */}
      <div className="px-4 py-3.5 border-b border-slate-800/50 flex items-center gap-2">
        <BrainCircuit size={14} className="text-cyan-400" />
        <h3 className="text-sm font-bold text-white">AI Insights</h3>
        <div
          className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded"
          style={{ background: "rgba(0,245,255,0.08)", color: "#00F5FF", border: "1px solid rgba(0,245,255,0.2)" }}
        >
          GNNExplainer
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Risk score gauge */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-3">Network Risk Score</p>
          <div className="flex items-center gap-4">
            <RiskGauge score={riskScore} />
            <div>
              <motion.div
                key={riskLabel}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold"
                style={{
                  color: riskLabelColor,
                  background: `${riskLabelColor}15`,
                  border: `1px solid ${riskLabelColor}40`,
                  boxShadow: isAttackActive ? `0 0 12px ${riskLabelColor}33` : "none",
                }}
              >
                {riskLabel}
              </motion.div>
              {isAttackActive && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[9px] text-slate-500 mt-2 leading-relaxed"
                >
                  Scatter-gather network<br />confirmed. 4-node cluster<br />isolated.
                </motion.p>
              )}
            </div>
          </div>
        </div>

        {/* Why risky */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">
            Why is this network risky?
          </p>
          <div className="space-y-2">
            <AnimatePresence>
              {(isAttackActive ? RISK_REASONS : RISK_REASONS.slice(0, 1)).map(
                ({ icon: Icon, label, detail, color }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ delay: i * 0.12 }}
                    className="flex items-start gap-3 p-2.5 rounded-xl"
                    style={{
                      background: `${color}08`,
                      border: `1px solid ${color}22`,
                    }}
                  >
                    <div
                      className="p-1.5 rounded-lg flex-shrink-0"
                      style={{ background: `${color}15` }}
                    >
                      <Icon size={11} style={{ color }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{ color }}>{label}</p>
                      <p className="text-[9px] text-slate-500 mt-0.5 leading-relaxed">{detail}</p>
                    </div>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Selected node quick stats */}
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl p-3 space-y-2"
            style={{ background: "rgba(0,245,255,0.04)", border: "1px solid rgba(0,245,255,0.12)" }}
          >
            <p className="text-[9px] uppercase tracking-widest text-slate-500">Selected Node</p>
            <p className="text-xs font-bold text-white">{selectedNode.label}</p>
            <div className="grid grid-cols-2 gap-1.5 text-[9px]">
              <div className="text-slate-500">Account</div>
              <div className="font-mono text-slate-300 truncate">{selectedNode.details.accountId}</div>
              <div className="text-slate-500">Device</div>
              <div className="font-mono text-slate-300 truncate">{selectedNode.details.deviceHash.split("_")[0]}</div>
              <div className="text-slate-500">Subnet</div>
              <div className="font-mono text-slate-300">{selectedNode.details.subnet}</div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="p-4 border-t border-slate-800/50">
        <motion.button
          onClick={onOpenDossier}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-white relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(220,20,60,0.7), rgba(185,28,28,0.9))",
            border: "1px solid rgba(220,20,60,0.4)",
            boxShadow: "0 0 16px rgba(220,20,60,0.3)",
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
          <span className="relative z-10">View Full Analysis</span>
          <ArrowRight size={12} className="relative z-10" />
        </motion.button>
      </div>
    </aside>
  );
}
