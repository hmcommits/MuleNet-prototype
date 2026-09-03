"use client";

import { motion } from "framer-motion";
import { Activity, Zap } from "lucide-react";

interface VelocityMeterProps {
  value: number;
  isCritical?: boolean;
}

export default function VelocityMeter({ value, isCritical = false }: VelocityMeterProps) {
  const color =
    value >= 80 ? "#DC143C" : value >= 50 ? "#FF8C00" : "#00F5FF";
  const label =
    value >= 80 ? "CRITICAL" : value >= 50 ? "ELEVATED" : "NOMINAL";

  // Arc gauge params
  const r = 48;
  const circ = Math.PI * r; // half-circle arc
  const progress = (value / 100) * circ;

  return (
    <div className="space-y-3">
      {/* Radial arc gauge */}
      <div className="flex flex-col items-center gap-1 pb-1">
        <div className="relative w-36 h-20 flex items-end justify-center overflow-visible">
          <svg
            viewBox="0 0 120 68"
            width="140"
            height="74"
            className="overflow-visible"
          >
            {/* Track arc */}
            <path
              d="M 12 60 A 48 48 0 0 1 108 60"
              fill="none"
              stroke="#1e293b"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Progress arc */}
            <motion.path
              d="M 12 60 A 48 48 0 0 1 108 60"
              fill="none"
              stroke={color}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${circ}`}
              initial={{ strokeDashoffset: circ }}
              animate={{ strokeDashoffset: circ - progress }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ filter: `drop-shadow(0 0 8px ${color})` }}
            />

            {/* Tick marks */}
            {[0, 25, 50, 75, 100].map((pct) => {
              const angle = -180 + (pct / 100) * 180;
              const rad = (angle * Math.PI) / 180;
              const x1 = 60 + (r - 6) * Math.cos(rad);
              const y1 = 60 + (r - 6) * Math.sin(rad);
              const x2 = 60 + (r + 2) * Math.cos(rad);
              const y2 = 60 + (r + 2) * Math.sin(rad);
              return (
                <line
                  key={pct}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="#334155"
                  strokeWidth="1.5"
                />
              );
            })}

            {/* Needle */}
            <motion.line
              x1="60"
              y1="60"
              initial={{ x2: 12, y2: 60 }}
              animate={{
                x2: 60 + (r - 14) * Math.cos(((-180 + (value / 100) * 180) * Math.PI) / 180),
                y2: 60 + (r - 14) * Math.sin(((-180 + (value / 100) * 180) * Math.PI) / 180),
              }}
              transition={{ duration: 1, ease: "easeOut" }}
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              style={{ filter: `drop-shadow(0 0 4px ${color})` }}
            />
            <circle cx="60" cy="60" r="4" fill={color} style={{ filter: `drop-shadow(0 0 6px ${color})` }} />

            {/* Value text */}
            <text x="60" y="52" textAnchor="middle" fontSize="14" fontWeight="bold" fill={color} fontFamily="monospace">
              {value}%
            </text>
            <text x="60" y="64" textAnchor="middle" fontSize="7" fill="#475569" fontFamily="monospace">
              VELOCITY INDEX
            </text>
          </svg>
        </div>

        {/* Status badge */}
        <motion.div
          key={label}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold"
          style={{
            color,
            background: `${color}15`,
            border: `1px solid ${color}40`,
            boxShadow: isCritical ? `0 0 12px ${color}44` : "none",
          }}
        >
          {isCritical ? <Zap size={10} /> : <Activity size={10} />}
          {label}
          {isCritical && " — 1.4s dwell"}
        </motion.div>
      </div>

      {/* Linear bar (secondary) */}
      <div className="relative h-2 rounded-full overflow-hidden bg-slate-900">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}88, ${color})` }}
          initial={{ width: "0%" }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        {isCritical && (
          <motion.div
            className="absolute inset-y-0 w-12 rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${color}66, transparent)` }}
            animate={{ left: ["-10%", "110%"] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          />
        )}
      </div>

      <div className="flex justify-between text-[9px] text-slate-700 px-0.5 font-mono">
        <span>0ms</span><span>250ms</span><span>500ms</span><span>750ms</span><span>1s+</span>
      </div>

      {isCritical && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] font-bold text-center py-1.5 px-2 rounded-lg"
          style={{
            color: "#DC143C",
            background: "rgba(220,20,60,0.08)",
            border: "1px solid rgba(220,20,60,0.25)",
          }}
        >
          ⚡ Scatter-Gather Detected · Funds dispersed in 1.4s
        </motion.div>
      )}
    </div>
  );
}
