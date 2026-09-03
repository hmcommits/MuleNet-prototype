"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface TxRow {
  time: string;
  from: string;
  to: string;
  amount: string;
  type: string;
  riskScore: number;
  status: "Flagged" | "Monitoring" | "Low Risk" | "Blocked";
}

const INITIAL_ROWS: TxRow[] = [
  { time: "21:12:45", from: "A/c 0x8F9A ***2A1C", to: "A/c 0xMCH ***7E9B", amount: "₹2,80,000", type: "IMPS", riskScore: 98, status: "Flagged" },
  { time: "21:12:45", from: "A/c 0xB3C4 ***9F2D", to: "A/c 0xMCH ***7E9B", amount: "₹3,10,000", type: "NEFT", riskScore: 97, status: "Flagged" },
  { time: "21:12:44", from: "A/c 0xA1B2 ***C3D4", to: "A/c 0x8F9A ***2A1C", amount: "₹2,80,000", type: "IMPS", riskScore: 94, status: "Flagged" },
  { time: "21:12:44", from: "A/c 0xA1B2 ***C3D4", to: "A/c 0xB3C4 ***9F2D", amount: "₹3,10,000", type: "UPI",  riskScore: 91, status: "Monitoring" },
  { time: "21:10:02", from: "A/c 0x2F3A ***BB1C", to: "A/c 0x4D5E ***CC2D", amount: "₹12,500",   type: "UPI",  riskScore: 22, status: "Low Risk" },
  { time: "21:05:18", from: "A/c 0x9A1B ***EE3F", to: "A/c 0xMCH ***7E9B", amount: "₹95,000",   type: "IMPS", riskScore: 67, status: "Monitoring" },
];

const NEW_ROWS: TxRow[] = [
  { time: "21:12:46", from: "A/c 0xD5E6 ***1B3F", to: "A/c 0xMCH ***7E9B", amount: "₹2,40,000", type: "IMPS", riskScore: 96, status: "Flagged" },
  { time: "21:12:46", from: "A/c 0xF7G8 ***4C5A", to: "A/c 0xMCH ***7E9B", amount: "₹2,70,000", type: "NEFT", riskScore: 95, status: "Flagged" },
];

function statusStyle(s: TxRow["status"]) {
  switch (s) {
    case "Flagged":    return { color: "#DC143C", bg: "rgba(220,20,60,0.12)", border: "rgba(220,20,60,0.3)" };
    case "Monitoring": return { color: "#FF8C00", bg: "rgba(255,140,0,0.1)",  border: "rgba(255,140,0,0.3)" };
    case "Blocked":    return { color: "#DC143C", bg: "rgba(220,20,60,0.12)", border: "rgba(220,20,60,0.3)" };
    default:           return { color: "#34d399", bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.3)" };
  }
}

function riskColor(score: number) {
  if (score >= 80) return "#DC143C";
  if (score >= 50) return "#FF8C00";
  return "#34d399";
}

export default function TransactionTimeline({ isAttackActive }: { isAttackActive: boolean }) {
  const [rows, setRows] = useState<TxRow[]>(INITIAL_ROWS);
  const [newRowIds, setNewRowIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!isAttackActive) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < NEW_ROWS.length) {
        setRows((prev) => [NEW_ROWS[i], ...prev.slice(0, 7)]);
        setNewRowIds((prev) => new Set([...prev, i]));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 1200);
    return () => clearInterval(interval);
  }, [isAttackActive]);

  return (
    <div
      className="rounded-2xl border border-slate-800/50 overflow-hidden"
      style={{ background: "rgba(8,14,30,0.9)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-bold text-white">Transaction Timeline</h2>
          <motion.div
            className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-bold"
            style={{ background: "rgba(220,20,60,0.12)", border: "1px solid rgba(220,20,60,0.3)", color: "#DC143C" }}
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            LIVE
          </motion.div>
        </div>
        <button className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
          View All Transactions <ArrowRight size={12} />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-800/40">
              {["TIME", "FROM", "TO", "AMOUNT", "TYPE", "RISK SCORE", "STATUS"].map((h) => (
                <th key={h} className="text-left px-4 py-2.5 text-[9px] font-bold uppercase tracking-widest text-slate-600">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {rows.slice(0, 6).map((row, i) => {
                const ss = statusStyle(row.status);
                const rc = riskColor(row.riskScore);
                return (
                  <motion.tr
                    key={`${row.time}-${row.from}-${i}`}
                    initial={{ opacity: 0, y: -16, backgroundColor: "rgba(220,20,60,0.1)" }}
                    animate={{ opacity: 1, y: 0, backgroundColor: "rgba(0,0,0,0)" }}
                    transition={{ duration: 0.4 }}
                    className="border-b border-slate-800/30 hover:bg-slate-800/20 transition-colors group"
                  >
                    <td className="px-4 py-2.5 font-mono text-slate-500 whitespace-nowrap">{row.time}</td>
                    <td className="px-4 py-2.5 font-mono text-cyan-400/80 whitespace-nowrap">{row.from}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <ArrowRight size={10} className="text-slate-600" />
                        <span className="font-mono text-orange-400/80 whitespace-nowrap">{row.to}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 font-semibold text-white whitespace-nowrap">{row.amount}</td>
                    <td className="px-4 py-2.5">
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold text-slate-400 border border-slate-700/60 bg-slate-800/40">
                        {row.type}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-slate-800/80 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: rc, width: `${row.riskScore}%`, boxShadow: `0 0 4px ${rc}` }}
                            initial={{ width: 0 }}
                            animate={{ width: `${row.riskScore}%` }}
                            transition={{ duration: 0.6, delay: i * 0.05 }}
                          />
                        </div>
                        <span className="font-bold font-mono text-xs" style={{ color: rc }}>{row.riskScore}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap"
                        style={{ color: ss.color, background: ss.bg, border: `1px solid ${ss.border}` }}
                      >
                        {row.status}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
