"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";

interface VelocityMeterProps {
  value: number; // 0–100
  label?: string;
  isCritical?: boolean;
}

export default function VelocityMeter({
  value,
  label = "Zero-Dwell Velocity",
  isCritical = false,
}: VelocityMeterProps) {
  const getColor = () => {
    if (value >= 80) return "#DC143C";
    if (value >= 50) return "#FF8C00";
    return "#00F5FF";
  };

  const getStatus = () => {
    if (value >= 80) return "⚠ CRITICAL ALERT";
    if (value >= 50) return "● ELEVATED";
    return "● NOMINAL";
  };

  const color = getColor();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <Activity size={14} style={{ color }} />
          <span>{label}</span>
        </div>
        <motion.span
          key={value}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-xs font-bold tracking-widest"
          style={{ color }}
        >
          {getStatus()}
        </motion.span>
      </div>

      {/* Bar track */}
      <div className="relative h-3 rounded-full overflow-hidden bg-slate-800/80">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}88, ${color})` }}
          initial={{ width: "0%" }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        {/* Scanline shimmer */}
        {isCritical && (
          <motion.div
            className="absolute inset-y-0 w-8 rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${color}55, transparent)`,
            }}
            animate={{ left: ["-10%", "110%"] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          />
        )}
      </div>

      {/* Tick marks */}
      <div className="flex justify-between text-[10px] text-slate-600 px-0.5">
        <span>0ms</span>
        <span>250ms</span>
        <span>500ms</span>
        <span>750ms</span>
        <span>1s+</span>
      </div>

      {isCritical && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-semibold text-crimson-red text-center py-1 px-2 rounded border border-red-900/60 bg-red-950/40"
          style={{ color: "#DC143C", borderColor: "#7f1d1d88" }}
        >
          Funds dispersed in 1.4s — Scatter-Gather Detected
        </motion.div>
      )}
    </div>
  );
}

