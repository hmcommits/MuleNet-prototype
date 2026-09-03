"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Cpu,
  Globe,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Activity,
  Wifi,
  Server,
  Network,
} from "lucide-react";
import { GraphNode } from "@/lib/mockData";
import VelocityMeter from "./VelocityMeter";

interface ThreatPanelProps {
  selectedNode: GraphNode | null;
  velocityValue: number;
  isAttackActive: boolean;
}

// ── SVG circular risk gauge ─────────────────────────────────
function RiskGauge({ score }: { score: number }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const color = score >= 80 ? "#DC143C" : score >= 50 ? "#FF8C00" : "#00F5FF";
  const dash = (score / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 90 90" className="w-full h-full -rotate-90">
          {/* Track */}
          <circle cx="45" cy="45" r={r} fill="none" stroke="#1e293b" strokeWidth="8" />
          {/* Progress */}
          <motion.circle
            cx="45" cy="45" r={r}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${circ}`}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: circ - dash }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold font-mono" style={{ color }}>{score}%</span>
          <span className="text-[8px] uppercase tracking-widest text-slate-500">Risk</span>
        </div>
      </div>
      <span
        className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
        style={{ color, background: `${color}15`, border: `1px solid ${color}33` }}
      >
        {score >= 80 ? "CRITICAL" : score >= 50 ? "ELEVATED" : "NOMINAL"}
      </span>
    </div>
  );
}

function DataRow({
  icon: Icon,
  label,
  value,
  mono = false,
}: {
  icon: React.FC<{ size?: number; className?: string }>;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-slate-800/40 last:border-0">
      <div className="mt-0.5 p-1.5 rounded-lg" style={{ background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.15)" }}>
        <Icon size={11} className="text-cyan-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-0.5">{label}</div>
        <div className={`text-sm text-slate-100 break-all ${mono ? "font-mono text-xs" : "font-medium"}`}>
          {value}
        </div>
      </div>
    </div>
  );
}


export default function ThreatPanel({ selectedNode, velocityValue, isAttackActive }: ThreatPanelProps) {
  return (
    <aside className="flex flex-col gap-3 w-80 flex-shrink-0">

      {/* ── Network Telemetry ── */}
      <div
        className="rounded-2xl border border-slate-800/60 p-4"
        style={{
          background: "linear-gradient(135deg, rgba(0,245,255,0.03) 0%, rgba(2,6,23,0.92) 100%)",
          backdropFilter: "blur(16px)",
        }}
      >
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
          <Activity size={11} className="text-cyan-400" />
          Network Telemetry
          <motion.div
            className="ml-auto flex items-center gap-1 text-[9px] font-bold"
            style={{ color: isAttackActive ? "#DC143C" : "#00F5FF" }}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: isAttackActive ? "#DC143C" : "#00F5FF" }} />
            {isAttackActive ? "ALERT" : "LIVE"}
          </motion.div>
        </h3>

        <VelocityMeter value={velocityValue} isCritical={isAttackActive} />

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {[
            { label: "Nodes Tracked", value: "11", icon: Network },
            { label: "Active Edges", value: isAttackActive ? "24" : "14", icon: Wifi },
            { label: "Risk Clusters", value: isAttackActive ? "1" : "0", icon: AlertTriangle },
            { label: "Scan Latency", value: "48ms", icon: Server },
          ].map(({ label, value, icon: Icon }) => (
            <motion.div
              key={label}
              className="rounded-xl p-2.5 text-center"
              style={{
                background: "rgba(2,6,23,0.7)",
                border: "1px solid rgba(30,41,59,0.8)",
              }}
              whileHover={{ borderColor: "rgba(0,245,255,0.3)", scale: 1.02 }}
              transition={{ duration: 0.15 }}
            >
              <Icon size={11} className="text-slate-600 mx-auto mb-1" />
              <div className="text-base font-bold text-cyan-300 font-mono">{value}</div>
              <div className="text-[9px] text-slate-600 mt-0.5">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Node Inspector ── */}
      <div
        className="rounded-2xl border border-slate-800/60 p-4 flex-1"
        style={{
          background: "linear-gradient(135deg, rgba(168,85,247,0.03) 0%, rgba(2,6,23,0.92) 100%)",
          backdropFilter: "blur(16px)",
        }}
      >
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
          <Shield size={11} className="text-purple-400" />
          Node Inspector
        </h3>

        <AnimatePresence mode="wait">
          {selectedNode ? (
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              {/* Risk gauge */}
              <div className="flex justify-center mb-4">
                <RiskGauge score={selectedNode.details.riskScore} />
              </div>

              <div className="text-sm font-semibold text-white text-center mb-3">
                {selectedNode.label}
              </div>

              <DataRow icon={Shield} label="Account ID" value={selectedNode.details.accountId} mono />
              <DataRow icon={Cpu} label="Device Hash" value={selectedNode.details.deviceHash} mono />
              <DataRow icon={Globe} label="Subnet" value={selectedNode.details.subnet} mono />
              {selectedNode.details.bank && (
                <DataRow icon={TrendingUp} label="Institution" value={selectedNode.details.bank} />
              )}
              {selectedNode.details.lastTx && (
                <DataRow icon={Activity} label="Last Transaction" value={selectedNode.details.lastTx} mono />
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-10 text-center gap-3"
            >
              {/* Animated hexagon placeholder */}
              <motion.div
                className="relative w-16 h-16 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 60 60" width="60" height="60">
                  <polygon
                    points="30,4 54,17 54,43 30,56 6,43 6,17"
                    fill="none"
                    stroke="rgba(0,245,255,0.15)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                </svg>
                <Shield size={18} className="absolute text-cyan-400/25" />
              </motion.div>
              <p className="text-sm text-slate-600">Click any 3D node</p>
              <p className="text-xs text-slate-700">to inspect telemetry data</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
