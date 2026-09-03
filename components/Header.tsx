"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Radio, AlertTriangle, Lock, Activity, Cpu } from "lucide-react";

export default function Header() {
  const [txCount, setTxCount] = useState(1_482_910);

  useEffect(() => {
    const interval = setInterval(() => {
      setTxCount((prev) => prev + Math.floor(Math.random() * 14 + 4));
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className="relative flex items-center justify-between px-6 py-3 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(0,245,255,0.04) 0%, rgba(2,6,23,0.98) 100%)",
        borderBottom: "1px solid rgba(0,245,255,0.12)",
      }}
    >
      {/* Horizontal scan line */}
      <motion.div
        className="absolute inset-x-0 h-px bottom-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #00F5FF88 40%, #00F5FFcc 50%, #00F5FF88 60%, transparent 100%)",
        }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Vertical scan moving line */}
      <motion.div
        className="absolute top-0 bottom-0 w-px pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent, #00F5FF44, transparent)" }}
        animate={{ x: ["-10vw", "110vw"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* ── LEFT: Logo ── */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3">
          {/* Animated hexagon logo mark */}
          <div className="relative w-11 h-11 flex items-center justify-center">
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{
                background: "conic-gradient(from 0deg, #00F5FF, #A855F7, #DC143C, #00F5FF)",
                borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                opacity: 0.15,
              }}
            />
            <motion.div
              className="absolute inset-0.5 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(2,6,23,0.9)", border: "1px solid rgba(0,245,255,0.2)" }}
            >
              {/* Network icon */}
              <svg viewBox="0 0 28 28" width="20" height="20" fill="none">
                <circle cx="14" cy="14" r="3" fill="#00F5FF" />
                <circle cx="5"  cy="8"  r="2" fill="#00F5FF" opacity="0.7" />
                <circle cx="23" cy="8"  r="2" fill="#DC143C" opacity="0.9" />
                <circle cx="5"  cy="20" r="2" fill="#00F5FF" opacity="0.5" />
                <circle cx="23" cy="20" r="2" fill="#DC143C" opacity="0.9" />
                <line x1="14" y1="14" x2="5"  y2="8"  stroke="#00F5FF" strokeWidth="1" opacity="0.5" />
                <line x1="14" y1="14" x2="23" y2="8"  stroke="#DC143C" strokeWidth="1" opacity="0.7" />
                <line x1="14" y1="14" x2="5"  y2="20" stroke="#00F5FF" strokeWidth="1" opacity="0.4" />
                <line x1="14" y1="14" x2="23" y2="20" stroke="#DC143C" strokeWidth="1" opacity="0.7" />
              </svg>
            </motion.div>
            {/* Outer glow pulse */}
            <motion.div
              className="absolute inset-0 rounded-xl pointer-events-none"
              animate={{ boxShadow: ["0 0 0px #00F5FF44", "0 0 18px #00F5FF66", "0 0 0px #00F5FF44"] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </div>

          {/* Wordmark */}
          <div>
            <motion.h1
              className="text-3xl font-bold leading-none"
              style={{
                fontFamily: "'Fredoka', sans-serif",
                background: "linear-gradient(90deg, #00F5FF, #a5f3fc, #00F5FF)",
                backgroundSize: "200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              MuleNet
            </motion.h1>
            <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em] mt-0.5">
              Autonomous H-GNN · Mule Detection Engine v2.1
            </p>
          </div>
        </div>

        {/* Badges row */}
        <div className="flex items-center gap-2.5">
          {/* Mochatrade badge */}
          <motion.div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold"
            style={{
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.3)",
              color: "#10b981",
            }}
            animate={{ borderColor: ["rgba(16,185,129,0.2)", "rgba(16,185,129,0.5)", "rgba(16,185,129,0.2)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <Radio size={9} />
            Live Mochatrade Gateway
          </motion.div>

          {/* RBI SOP badge */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] font-bold"
            style={{
              background: "rgba(0,245,255,0.06)",
              border: "1px solid rgba(0,245,255,0.2)",
              color: "#67e8f9",
            }}
          >
            <Cpu size={9} />
            RBI SOP 2026
          </div>
        </div>
      </div>

      {/* ── RIGHT: Metric tiles ── */}
      <div className="flex items-center gap-3">
        {/* Live TX counter */}
        <div
          className="relative px-4 py-2.5 rounded-xl overflow-hidden"
          style={{
            background: "rgba(0,245,255,0.04)",
            border: "1px solid rgba(0,245,255,0.15)",
          }}
        >
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.06), transparent)" }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <div className="flex items-center gap-1.5 text-[9px] text-slate-500 uppercase tracking-widest mb-0.5">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 0.7, repeat: Infinity }}
            />
            <Activity size={9} /> Live Transactions
          </div>
          <div className="text-xl font-bold font-mono text-cyan-300 tabular-nums">
            {txCount.toLocaleString("en-IN")}
          </div>
        </div>

        {/* Ghost farms */}
        <MetricTile
          label="Ghost Farms"
          value="4"
          icon={<AlertTriangle size={9} />}
          color="#FF8C00"
          bgOpacity="0.06"
        />

        {/* Funds quarantined */}
        <MetricTile
          label="Quarantined"
          value="₹42.5M"
          icon={<Lock size={9} />}
          color="#DC143C"
          bgOpacity="0.06"
          pulse
        />
      </div>
    </header>
  );
}

function MetricTile({
  label,
  value,
  icon,
  color,
  bgOpacity,
  pulse = false,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  bgOpacity: string;
  pulse?: boolean;
}) {
  return (
    <motion.div
      className="px-4 py-2.5 rounded-xl"
      style={{
        background: `rgba(${hexToRgb(color)},${bgOpacity})`,
        border: `1px solid ${color}33`,
      }}
      animate={pulse ? { borderColor: [`${color}22`, `${color}66`, `${color}22`] } : {}}
      transition={{ duration: 1.8, repeat: Infinity }}
    >
      <div
        className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest mb-0.5"
        style={{ color: `${color}99` }}
      >
        {icon}
        {label}
      </div>
      <div className="text-xl font-bold font-mono" style={{ color }}>
        {value}
      </div>
    </motion.div>
  );
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
