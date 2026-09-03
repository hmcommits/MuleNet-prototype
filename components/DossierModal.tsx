"use client";

import { motion } from "framer-motion";
import { X, Shield, Download, FileText, Hash, Cpu, Globe, AlertTriangle } from "lucide-react";
import { DOSSIER_ROWS, CASE_META, GRAPH_NODES } from "@/lib/mockData";

interface DossierModalProps {
  onClose: () => void;
}

export default function DossierModal({ onClose }: DossierModalProps) {
  const muleNodes = GRAPH_NODES.filter((n) => n.risk === "mule");

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700/60"
        style={{
          background: "linear-gradient(180deg, #0a0f1e 0%, #060b18 100%)",
          boxShadow: "0 0 60px rgba(220,20,60,0.2), 0 25px 50px rgba(0,0,0,0.8)",
        }}
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* ─── Official Header ─── */}
        <div
          className="px-8 py-6 border-b border-slate-700/60"
          style={{
            background: "linear-gradient(90deg, rgba(220,20,60,0.08), rgba(0,0,0,0))",
          }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div
                className="p-3 rounded-xl"
                style={{
                  background: "rgba(220,20,60,0.12)",
                  border: "1px solid rgba(220,20,60,0.3)",
                  boxShadow: "0 0 20px rgba(220,20,60,0.2)",
                }}
              >
                <Shield size={28} className="text-red-500" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-red-500/80 mb-1">
                  Government of India · Ministry of Home Affairs
                </div>
                <h2 className="text-xl font-bold text-white">Evidentiary Dossier</h2>
                <div className="text-xs text-slate-400 mt-0.5">
                  Pursuant to Section 102, Code of Criminal Procedure, 1973
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Case meta strip */}
          <div className="mt-5 grid grid-cols-3 gap-4">
            {[
              { label: "Case Reference", value: CASE_META.caseNumber, mono: true },
              { label: "NCRP Reference", value: CASE_META.ncrpRef, mono: true },
              { label: "Date & Time", value: `${CASE_META.reportDate}, ${CASE_META.reportTime}` },
              { label: "AI Engine", value: CASE_META.analyst },
              { label: "Total Illicit Funds", value: CASE_META.totalFundsIllicit },
              { label: "Scatter-Gather Window", value: CASE_META.velocityWindow },
            ].map(({ label, value, mono }) => (
              <div key={label} className="bg-slate-900/60 rounded-lg px-3 py-2">
                <div className="text-[9px] uppercase tracking-widest text-slate-500 mb-1">{label}</div>
                <div
                  className={`text-sm text-white font-semibold ${mono ? "font-mono text-xs" : ""}`}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Body ─── */}
        <div className="px-8 py-6 space-y-6">

          {/* Legal statement */}
          <div
            className="rounded-xl p-4 text-xs leading-relaxed text-slate-400"
            style={{ background: "rgba(220,20,60,0.05)", border: "1px solid rgba(220,20,60,0.15)" }}
          >
            <span className="text-red-400 font-bold">NOTICE:</span> This document has been
            automatically compiled by the MuleNet Autonomous Evidence Engine (v2.1) pursuant to the
            Supreme Court of India order dated August 4, 2026, and the Reserve Bank of India SOP on
            Mule Account Detection. The contents constitute a prima facie case for the imposition of
            a temporary debit hold under the Prevention of Money Laundering Act (PMLA), 2002, and
            shall be submitted to the National Cyber Crime Reporting Portal (NCRP).
          </div>

          {/* Subgraph Evidence */}
          <div>
            <SectionHeader icon={FileText} title="Section I — AI-Isolated Evidence Subgraph" />
            <div className="mt-3 overflow-x-auto rounded-xl border border-slate-800/60">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-900/60">
                    {["#", "Timestamp", "Source Hash", "Destination Hash", "Amount (INR)", "Dwell Alert"].map((h) => (
                      <th key={h} className="text-left px-3 py-2.5 text-[9px] uppercase tracking-widest text-slate-500 font-bold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DOSSIER_ROWS.map((row, i) => (
                    <tr key={i} className="border-t border-slate-800/40 hover:bg-slate-800/20">
                      <td className="px-3 py-2 text-slate-600 font-mono">{String(i + 1).padStart(2, "0")}</td>
                      <td className="px-3 py-2 font-mono text-slate-400 whitespace-nowrap">{row.timestamp}</td>
                      <td className="px-3 py-2 font-mono text-cyan-400/80">{row.sourceHash}</td>
                      <td className="px-3 py-2 font-mono text-orange-400/80">{row.destHash}</td>
                      <td className="px-3 py-2 font-semibold text-white">{row.amount}</td>
                      <td className="px-3 py-2">
                        <span className="text-[9px] font-bold text-red-400 bg-red-950/40 border border-red-900/40 px-1.5 py-0.5 rounded">
                          {row.velocityAlert}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Device Telemetry */}
          <div>
            <SectionHeader icon={Cpu} title="Section II — Ghost Farm Device Telemetry" />
            <div className="mt-3 grid grid-cols-2 gap-3">
              <TelemetryCard label="Emulator Device Hash" value={CASE_META.ghostFarmHash} icon={Cpu} />
              <TelemetryCard label="Shared IP Subnet" value={CASE_META.fraudSubnet} icon={Globe} />
              <TelemetryCard label="Accounts Linked to Device" value={`${muleNodes.length} accounts (Mule-1 → Mule-4)`} icon={Hash} />
              <TelemetryCard label="Detection Basis" value="Shared device fingerprint pre-empts account linkage" icon={AlertTriangle} highlight />
            </div>
          </div>

          {/* Risk Analysis */}
          <div>
            <SectionHeader icon={AlertTriangle} title="Section III — H-GNN Risk Assessment" />
            <div className="mt-3 space-y-2">
              {muleNodes.map((node) => (
                <div key={node.id} className="flex items-center justify-between bg-slate-900/50 rounded-lg px-4 py-2.5 border border-slate-800/40">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 rounded-full bg-red-600" />
                    <div>
                      <div className="text-sm font-semibold text-white">{node.label}</div>
                      <div className="text-[10px] font-mono text-slate-500">{node.details.accountId}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-red-400">{node.details.riskScore}%</div>
                    <div className="text-[9px] uppercase text-slate-500">Risk Score</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Signature block */}
          <div className="border-t border-slate-800/60 pt-5 grid grid-cols-3 gap-4">
            {[
              { role: "Initiating System", value: "MuleNet AI Engine v2.1" },
              { role: "Regulatory Authority", value: "Reserve Bank of India" },
              { role: "Forwarding Portal", value: "NCRP · I4C · MHA" },
            ].map(({ role, value }) => (
              <div key={role} className="text-center">
                <div className="border-b border-slate-700 pb-2 mb-2">
                  <div className="h-6" />
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500">{role}</div>
                <div className="text-xs text-slate-300 mt-0.5">{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div
          className="px-8 py-4 border-t border-slate-800/60 flex items-center justify-between"
          style={{ background: "rgba(2,6,23,0.6)" }}
        >
          <div className="text-[10px] text-slate-600 font-mono">
            MuleNet v2.1 · H-GNN + GNNExplainer · Auto-generated {CASE_META.reportDate}
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white"
            style={{
              background: "linear-gradient(135deg, #0369a1, #0284c7)",
              border: "1px solid #0ea5e955",
              boxShadow: "0 0 15px #0ea5e933",
            }}
          >
            <Download size={14} />
            Export PDF (mock)
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SectionHeader({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={14} className="text-cyan-400" />
      <h3 className="text-sm font-bold text-slate-200">{title}</h3>
      <div className="flex-1 h-px bg-slate-800/60" />
    </div>
  );
}

function TelemetryCard({
  label,
  value,
  icon: Icon,
  highlight = false,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  highlight?: boolean;
}) {
  return (
    <div
      className="rounded-lg p-3 flex items-start gap-3"
      style={{
        background: highlight ? "rgba(220,20,60,0.07)" : "rgba(15,23,42,0.6)",
        border: highlight ? "1px solid rgba(220,20,60,0.25)" : "1px solid rgba(30,41,59,0.8)",
      }}
    >
      <Icon size={14} className={highlight ? "text-red-400 mt-0.5" : "text-cyan-400 mt-0.5"} />
      <div>
        <div className="text-[9px] uppercase tracking-widest text-slate-500 mb-1">{label}</div>
        <div className="text-xs font-semibold text-white font-mono">{value}</div>
      </div>
    </div>
  );
}

