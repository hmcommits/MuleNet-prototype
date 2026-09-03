"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, Shield, CheckCircle2, X } from "lucide-react";
import { DOSSIER_ROWS, CASE_META } from "@/lib/mockData";
import DossierModal from "./DossierModal";

export default function DossierPanel() {
  const [loadingStage, setLoadingStage] = useState<
    "idle" | "stage1" | "stage2" | "stage3" | "done"
  >("idle");
  const [showModal, setShowModal] = useState(false);

  const startGeneration = async () => {
    setLoadingStage("stage1");
    await delay(1100);
    setLoadingStage("stage2");
    await delay(1000);
    setLoadingStage("stage3");
    await delay(900);
    setLoadingStage("done");
    setShowModal(true);
  };

  const stageLabels: Record<string, string> = {
    stage1: "Compiling Subgraph Evidence...",
    stage2: "Fetching Device Telemetry...",
    stage3: "Generating Legal Framework...",
    done: "Dossier Ready",
  };

  return (
    <>
      <section
        className="rounded-2xl border border-slate-800/80 overflow-hidden backdrop-blur-sm"
        style={{ background: "rgba(2,6,23,0.9)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/60">
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg"
              style={{ background: "rgba(0,245,255,0.1)", border: "1px solid #00F5FF33" }}
            >
              <Shield size={16} className="text-cyan-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">GNNExplainer — Minimal Subgraph</h2>
              <p className="text-[10px] text-slate-500 mt-0.5">
                AI-isolated fraud evidence chain · {DOSSIER_ROWS.length} transactions
              </p>
            </div>
          </div>
          <div className="text-[10px] font-mono text-slate-600 border border-slate-800 px-2 py-1 rounded">
            CASE {CASE_META.caseNumber}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-800/60 bg-slate-900/40">
                {["Timestamp", "Source Hash", "Destination Hash", "Amount", "Velocity Alert"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {DOSSIER_ROWS.map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-slate-800/40 hover:bg-slate-800/30 transition-colors group"
                >
                  <td className="px-4 py-2.5 font-mono text-slate-400">{row.timestamp}</td>
                  <td className="px-4 py-2.5 font-mono text-cyan-400/80">{row.sourceHash}</td>
                  <td className="px-4 py-2.5 font-mono text-orange-400/80">{row.destHash}</td>
                  <td className="px-4 py-2.5 font-semibold text-white">{row.amount}</td>
                  <td className="px-4 py-2.5">
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                      style={{
                        color: "#DC143C",
                        background: "#DC143C15",
                        border: "1px solid #DC143C44",
                      }}
                    >
                      {row.velocityAlert}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div className="px-6 py-5 border-t border-slate-800/60 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Total illicit funds: <span className="text-white font-bold">{CASE_META.totalFundsIllicit}</span>
            {" · "}
            Velocity window: <span className="text-red-400 font-bold">{CASE_META.velocityWindow}</span>
          </div>

          <motion.button
            onClick={loadingStage === "idle" ? startGeneration : undefined}
            disabled={loadingStage !== "idle" && loadingStage !== "done"}
            whileHover={loadingStage === "idle" ? { scale: 1.03 } : {}}
            whileTap={loadingStage === "idle" ? { scale: 0.97 } : {}}
            className="relative flex items-center gap-3 px-6 py-3 rounded-xl font-bold text-sm overflow-hidden cursor-pointer disabled:cursor-not-allowed"
            style={{
              background:
                loadingStage === "done"
                  ? "linear-gradient(135deg, #064e3b, #065f46)"
                  : "linear-gradient(135deg, #7f1d1d, #991b1b, #dc2626)",
              border:
                loadingStage === "done"
                  ? "1px solid #10b98155"
                  : "1px solid #DC143C66",
              color: "#fff",
              boxShadow:
                loadingStage === "done"
                  ? "0 0 20px #10b98133"
                  : "0 0 20px #DC143C44, 0 4px 15px rgba(220,20,60,0.3)",
            }}
          >
            {/* Shimmer */}
            {loadingStage === "idle" && (
              <motion.div
                className="absolute inset-0 -skew-x-12"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            )}

            {loadingStage === "idle" && <FileText size={16} />}
            {(loadingStage === "stage1" || loadingStage === "stage2" || loadingStage === "stage3") && (
              <motion.div
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
              />
            )}
            {loadingStage === "done" && <CheckCircle2 size={16} className="text-emerald-400" />}

            <span className="relative z-10">
              {loadingStage === "idle" && "Generate Evidentiary Dossier (Sec 102 CrPC)"}
              {loadingStage !== "idle" &&
                loadingStage !== "done" &&
                stageLabels[loadingStage]}
              {loadingStage === "done" && "View Dossier"}
            </span>

            {loadingStage === "idle" && <Download size={14} className="relative z-10 opacity-60" />}
          </motion.button>
        </div>
      </section>

      <AnimatePresence>
        {showModal && (
          <DossierModal onClose={() => { setShowModal(false); setLoadingStage("idle"); }} />
        )}
      </AnimatePresence>
    </>
  );
}

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
