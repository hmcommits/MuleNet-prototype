"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Radio, AlertTriangle, Lock } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

export default function Header() {
  const [txCount, setTxCount] = useState(1_482_910);

  // Simulate live transaction counter incrementing
  useEffect(() => {
    const interval = setInterval(() => {
      setTxCount((prev) => prev + Math.floor(Math.random() * 12 + 3));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className="relative flex items-center justify-between px-6 py-4 border-b border-slate-800/80 overflow-hidden"
      style={{ background: "rgba(2,6,23,0.95)" }}
    >
      {/* Scan line effect */}
      <motion.div
        className="absolute inset-x-0 h-px top-0"
        style={{ background: "linear-gradient(90deg, transparent, #00F5FF55, transparent)" }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* ── LEFT: Logo + badge ── */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2.5">
          {/* Logo mark */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #00F5FF22, #00F5FF08)",
              border: "1px solid #00F5FF44",
              boxShadow: "0 0 20px #00F5FF33",
            }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <path
                d="M12 2L4 7v10l8 5 8-5V7L12 2z"
                stroke="#00F5FF"
                strokeWidth="1.5"
                fill="#00F5FF11"
              />
              <path d="M12 2v20M4 7l8 5 8-5" stroke="#00F5FF" strokeWidth="1.5" opacity="0.5" />
            </svg>
          </div>

          {/* Wordmark */}
          <div>
            <h1
              className="text-2xl font-bold leading-none tracking-tight"
              style={{
                fontFamily: "'Fredoka', sans-serif",
                color: "#00F5FF",
                textShadow: "0 0 20px #00F5FF88, 0 0 40px #00F5FF44",
              }}
            >
              MuleNet
            </h1>
            <p className="text-[9px] text-slate-500 uppercase tracking-widest">
              Autonomous H-GNN · Mule Detection Engine
            </p>
          </div>
        </div>

        {/* Mochatrade gateway badge */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold"
          style={{
            background: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.35)",
            color: "#10b981",
          }}
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-emerald-400"
            animate={{ opacity: [1, 0.2, 1], scale: [1, 1.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <Radio size={10} />
          Live Mochatrade Gateway
        </div>
      </div>

      {/* ── RIGHT: Metrics ── */}
      <div className="flex items-center gap-4">
        {/* Live counter */}
        <motion.div
          className="flex flex-col items-end px-4 py-2 rounded-xl border border-slate-800/60"
          style={{ background: "rgba(0,245,255,0.04)" }}
        >
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase tracking-widest mb-0.5">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 0.7, repeat: Infinity }}
            />
            Live Transactions Scanned
          </div>
          <div className="text-xl font-bold font-mono text-cyan-300">
            {txCount.toLocaleString("en-IN")}
          </div>
        </motion.div>

        {/* Ghost farms */}
        <div
          className="flex flex-col items-center px-4 py-2 rounded-xl border"
          style={{
            background: "rgba(255,140,0,0.06)",
            borderColor: "rgba(255,140,0,0.25)",
          }}
        >
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase tracking-widest mb-0.5">
            <AlertTriangle size={10} className="text-orange-400" />
            Ghost Farms
          </div>
          <div className="text-xl font-bold font-mono text-orange-400">4</div>
        </div>

        {/* Funds quarantined */}
        <div
          className="flex flex-col items-center px-4 py-2 rounded-xl border"
          style={{
            background: "rgba(220,20,60,0.06)",
            borderColor: "rgba(220,20,60,0.25)",
          }}
        >
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase tracking-widest mb-0.5">
            <Lock size={10} className="text-red-400" />
            Funds Quarantined
          </div>
          <div className="text-xl font-bold font-mono text-red-400">₹42.5M</div>
        </div>
      </div>
    </header>
  );
}
