"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Filter, Download, Search, AlertCircle, ArrowLeftRight } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

// Full dummy dataset for transactions
const ALL_TRANSACTIONS = [
  { id: "TX-9021A", time: "2026-09-03 21:12:45", from: "A/c 0x8F9A ***2A1C", to: "A/c 0xMCH ***7E9B", amount: "₹2,80,000", type: "IMPS", riskScore: 98, status: "Flagged", details: "Scatter phase detected" },
  { id: "TX-9021B", time: "2026-09-03 21:12:45", from: "A/c 0xB3C4 ***9F2D", to: "A/c 0xMCH ***7E9B", amount: "₹3,10,000", type: "NEFT", riskScore: 97, status: "Flagged", details: "Mule account transfer" },
  { id: "TX-9020A", time: "2026-09-03 21:12:44", from: "A/c 0xA1B2 ***C3D4", to: "A/c 0x8F9A ***2A1C", amount: "₹2,80,000", type: "IMPS", riskScore: 94, status: "Flagged", details: "Structuring pattern" },
  { id: "TX-9020B", time: "2026-09-03 21:12:44", from: "A/c 0xA1B2 ***C3D4", to: "A/c 0xB3C4 ***9F2D", amount: "₹3,10,000", type: "UPI",  riskScore: 91, status: "Monitoring", details: "Suspicious origin" },
  { id: "TX-8911",  time: "2026-09-03 21:10:02", from: "A/c 0x2F3A ***BB1C", to: "A/c 0x4D5E ***CC2D", amount: "₹12,500",   type: "UPI",  riskScore: 22, status: "Low Risk", details: "Standard P2P" },
  { id: "TX-8804",  time: "2026-09-03 21:05:18", from: "A/c 0x9A1B ***EE3F", to: "A/c 0xMCH ***7E9B", amount: "₹95,000",   type: "IMPS", riskScore: 67, status: "Monitoring", details: "High value for account" },
  { id: "TX-8799",  time: "2026-09-03 20:55:10", from: "A/c 0x5C6D ***FF4A", to: "A/c 0x7E8F ***GG5B", amount: "₹4,200",    type: "UPI",  riskScore: 12, status: "Low Risk", details: "Merchant payment" },
  { id: "TX-8750",  time: "2026-09-03 20:42:05", from: "A/c 0x1A2B ***HH6C", to: "A/c 0x3C4D ***II7D", amount: "₹50,000",   type: "NEFT", riskScore: 82, status: "Flagged", details: "Velocity mismatch" },
  { id: "TX-8712",  time: "2026-09-03 20:15:33", from: "A/c 0xMCH ***7E9B",  to: "A/c 0x9A1B ***EE3F", amount: "₹1,20,000", type: "RTGS", riskScore: 99, status: "Blocked", details: "Blacklisted destination" },
  { id: "TX-8601",  time: "2026-09-03 19:30:00", from: "A/c 0x4D5E ***CC2D", to: "A/c 0x2F3A ***BB1C", amount: "₹8,000",    type: "UPI",  riskScore: 15, status: "Low Risk", details: "Standard P2P" },
];

function statusStyle(s: string) {
  switch (s) {
    case "Flagged":    return { color: "#DC143C", bg: "rgba(220,20,60,0.12)", border: "rgba(220,20,60,0.3)" };
    case "Monitoring": return { color: "#FF8C00", bg: "rgba(255,140,0,0.1)",  border: "rgba(255,140,0,0.3)" };
    case "Blocked":    return { color: "#ef4444", bg: "rgba(239,68,68,0.15)", border: "rgba(239,68,68,0.4)" };
    default:           return { color: "#34d399", bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.3)" };
  }
}

function riskColor(score: number) {
  if (score >= 80) return "#DC143C";
  if (score >= 50) return "#FF8C00";
  return "#34d399";
}

export default function TransactionsPage() {
  const [filter, setFilter] = useState("All");

  const filteredTx = filter === "All" ? ALL_TRANSACTIONS : ALL_TRANSACTIONS.filter(tx => tx.status === filter);

  return (
    <div className="flex h-screen overflow-hidden bg-[#030712]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar />

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 max-w-[1600px] mx-auto w-full">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <ArrowLeftRight className="text-cyan-400" />
                Transactions Ledger
              </h1>
              <p className="text-sm text-slate-500 mt-1">Real-time ledger of network activity and risk scoring.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 p-1 rounded-lg" style={{ background: "rgba(15,23,42,0.8)", border: "1px solid rgba(30,41,59,0.8)" }}>
                {["All", "Flagged", "Monitoring", "Low Risk"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors ${filter === f ? 'bg-slate-800 text-cyan-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-slate-800/80 text-white border border-slate-700 hover:bg-slate-700 transition-colors">
                <Filter size={14} /> Filters
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-slate-900 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-[0_0_15px_rgba(0,245,255,0.3)]">
                <Download size={14} /> Export CSV
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div
            className="rounded-2xl border border-slate-800/50 overflow-hidden"
            style={{ background: "rgba(8,14,30,0.9)" }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-800/60 bg-slate-900/50">
                    <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">TX ID</th>
                    <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Timestamp</th>
                    <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Source</th>
                    <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Destination</th>
                    <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Amount</th>
                    <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Method</th>
                    <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Risk Score</th>
                    <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Status</th>
                    <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {filteredTx.map((row, i) => {
                      const ss = statusStyle(row.status);
                      const rc = riskColor(row.riskScore);
                      return (
                        <motion.tr
                          key={row.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2, delay: i * 0.03 }}
                          className="border-b border-slate-800/30 hover:bg-slate-800/30 transition-colors group"
                        >
                          <td className="px-5 py-4 font-mono text-xs text-slate-400 whitespace-nowrap">{row.id}</td>
                          <td className="px-5 py-4 font-mono text-xs text-slate-500 whitespace-nowrap">{row.time}</td>
                          <td className="px-5 py-4 font-mono text-cyan-400/80 whitespace-nowrap">{row.from}</td>
                          <td className="px-5 py-4 font-mono text-orange-400/80 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <ArrowRight size={12} className="text-slate-600" />
                              {row.to}
                            </div>
                          </td>
                          <td className="px-5 py-4 font-bold text-white whitespace-nowrap">{row.amount}</td>
                          <td className="px-5 py-4">
                            <span className="px-2 py-1 rounded text-[10px] font-bold text-slate-400 border border-slate-700/60 bg-slate-800/40">
                              {row.type}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-20 h-1.5 rounded-full bg-slate-800/80 overflow-hidden">
                                <motion.div
                                  className="h-full rounded-full"
                                  style={{ background: rc, width: `${row.riskScore}%`, boxShadow: `0 0 6px ${rc}` }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${row.riskScore}%` }}
                                  transition={{ duration: 0.8, delay: 0.2 }}
                                />
                              </div>
                              <span className="font-bold font-mono text-sm" style={{ color: rc }}>{row.riskScore}</span>
                            </div>
                            <div className="text-[10px] text-slate-500 mt-1 truncate max-w-[120px]" title={row.details}>
                              {row.details}
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className="px-2.5 py-1 rounded-md text-[10px] font-bold whitespace-nowrap inline-flex items-center gap-1.5"
                              style={{ color: ss.color, background: ss.bg, border: `1px solid ${ss.border}` }}
                            >
                              {row.status === "Flagged" || row.status === "Blocked" ? <AlertCircle size={10} /> : null}
                              {row.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <button className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:underline">
                              View details
                            </button>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
            
            {/* Pagination Mock */}
            <div className="px-5 py-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
              <div>Showing {filteredTx.length} of 142,853 transactions</div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded bg-slate-800/50 hover:bg-slate-700 border border-slate-700/50">Previous</button>
                <button className="px-3 py-1.5 rounded bg-slate-800/50 hover:bg-slate-700 border border-slate-700/50">Next</button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
