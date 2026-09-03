"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Shield, Cpu, Globe, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { GraphNode } from "@/lib/mockData";
import VelocityMeter from "./VelocityMeter";

interface ThreatPanelProps {
  selectedNode: GraphNode | null;
  velocityValue: number;
  isAttackActive: boolean;
}

function RiskBadge({ score }: { score: number }) {
  const color =
    score >= 80 ? "#DC143C" : score >= 50 ? "#FF8C00" : "#00F5FF";
  const label =
    score >= 80 ? "CRITICAL" : score >= 50 ? "ELEVATED" : "NOMINAL";
  const Icon = score >= 80 ? AlertTriangle : score >= 50 ? TrendingUp : CheckCircle;

  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
      style={{
        color,
        border: `1px solid ${color}55`,
        background: `${color}11`,
        boxShadow: `0 0 12px ${color}33`,
      }}
    >
      <Icon size={12} />
      {score}% — {label}
    </div>
  );
}

function DataRow({
  icon: Icon,
  label,
  value,
  mono = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-slate-800/60 last:border-0">
      <div className="mt-0.5 p-1.5 rounded bg-slate-800/60">
        <Icon size={12} className="text-cyan-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-0.5">{label}</div>
        <div
          className={`text-sm text-slate-200 truncate ${mono ? "font-mono text-xs" : "font-medium"}`}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

export default function ThreatPanel({
  selectedNode,
  velocityValue,
  isAttackActive,
}: ThreatPanelProps) {
  return (
    <aside className="flex flex-col gap-4 w-80 flex-shrink-0">
      {/* ── Velocity Meter ── */}
      <div
        className="rounded-xl border border-slate-800/80 p-4 backdrop-blur-sm"
        style={{ background: "rgba(2,6,23,0.85)" }}
      >
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Network Telemetry
        </h3>
        <VelocityMeter
          value={velocityValue}
          isCritical={isAttackActive}
        />

        {/* Mini stats */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {[
            { label: "Nodes Tracked", value: "11" },
            { label: "Active Edges", value: isAttackActive ? "24" : "14" },
            { label: "Risk Clusters", value: isAttackActive ? "1" : "0" },
            { label: "Scan Latency", value: "48ms" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-slate-900/60 rounded-lg p-2 text-center">
              <div className="text-base font-bold text-cyan-300">{value}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Node Inspector ── */}
      <div
        className="rounded-xl border border-slate-800/80 p-4 backdrop-blur-sm flex-1"
        style={{ background: "rgba(2,6,23,0.85)" }}
      >
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
          Node Inspector
        </h3>

        <AnimatePresence mode="wait">
          {selectedNode ? (
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-0"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-white">
                  {selectedNode.label}
                </span>
                <RiskBadge score={selectedNode.details.riskScore} />
              </div>

              <DataRow
                icon={Shield}
                label="Account ID"
                value={selectedNode.details.accountId}
                mono
              />
              <DataRow
                icon={Cpu}
                label="Device Hash"
                value={selectedNode.details.deviceHash}
                mono
              />
              <DataRow
                icon={Globe}
                label="Subnet"
                value={selectedNode.details.subnet}
                mono
              />
              {selectedNode.details.bank && (
                <DataRow
                  icon={TrendingUp}
                  label="Institution"
                  value={selectedNode.details.bank}
                />
              )}
              {selectedNode.details.lastTx && (
                <DataRow
                  icon={TrendingUp}
                  label="Last Transaction"
                  value={selectedNode.details.lastTx}
                  mono
                />
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-10 text-center"
            >
              <div
                className="w-12 h-12 rounded-full mb-3 flex items-center justify-center"
                style={{ background: "rgba(0,245,255,0.08)", border: "1px solid #00F5FF22" }}
              >
                <Shield size={20} className="text-cyan-400/40" />
              </div>
              <p className="text-sm text-slate-600">Click any node on the graph</p>
              <p className="text-xs text-slate-700 mt-1">to inspect its telemetry</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}

