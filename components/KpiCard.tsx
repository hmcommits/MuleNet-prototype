"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

// Tiny sparkline SVG
function Sparkline({
  data,
  color,
  width = 80,
  height = 32,
}: {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  });
  const path = `M ${pts.join(" L ")}`;
  const fill = `M 0,${height} L ${pts.join(" L ")} L ${width},${height} Z`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id={`sg-${color.replace("#", "")}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fill} fill={`url(#sg-${color.replace("#", "")})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 3px ${color})` }} />
      {/* Last dot */}
      <circle cx={width} cy={height - ((data[data.length - 1] - min) / range) * height}
        r="2.5" fill={color} style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
    </svg>
  );
}

interface KpiCardProps {
  label: string;
  value: string;
  change: string;
  changePositive: boolean;
  sparkData: number[];
  sparkColor: string;
  icon: React.ReactNode;
  iconBg: string;
  subLabel?: string;
}

export default function KpiCard({
  label,
  value,
  change,
  changePositive,
  sparkData,
  sparkColor,
  icon,
  iconBg,
  subLabel = "vs yesterday",
}: KpiCardProps) {
  const [displayed, setDisplayed] = useState(value);

  return (
    <motion.div
      className="flex-1 rounded-2xl px-5 py-4 flex flex-col gap-3 relative overflow-hidden border border-slate-800/50"
      style={{ background: "rgba(8,14,30,0.9)" }}
      whileHover={{ borderColor: "rgba(0,245,255,0.2)", y: -1 }}
      transition={{ duration: 0.15 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</p>
          <motion.p
            className="text-2xl font-bold mt-1.5 font-mono tracking-tight text-white"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {value}
          </motion.p>
          <div className="flex items-center gap-1.5 mt-1">
            {changePositive ? (
              <TrendingUp size={11} className="text-emerald-400" />
            ) : (
              <TrendingDown size={11} className="text-red-400" />
            )}
            <span
              className="text-xs font-bold"
              style={{ color: changePositive ? "#34d399" : "#f87171" }}
            >
              {change}
            </span>
            <span className="text-[10px] text-slate-600">{subLabel}</span>
          </div>
        </div>
        <div
          className="p-2.5 rounded-xl flex-shrink-0"
          style={{ background: iconBg, border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {icon}
        </div>
      </div>

      {/* Sparkline */}
      <div className="flex justify-end -mb-1">
        <Sparkline data={sparkData} color={sparkColor} width={88} height={30} />
      </div>
    </motion.div>
  );
}
