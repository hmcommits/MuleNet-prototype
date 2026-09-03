"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Bell, ChevronDown, Radio } from "lucide-react";

export default function TopBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="flex items-center gap-4 px-5 py-3 border-b border-slate-800/50 sticky top-0 z-20"
      style={{ background: "rgba(5,8,22,0.97)", backdropFilter: "blur(12px)" }}
    >
      {/* Search */}
      <div
        className="flex items-center gap-2.5 flex-1 max-w-xs px-3 py-2 rounded-xl"
        style={{ background: "rgba(15,23,42,0.8)", border: "1px solid rgba(30,41,59,0.8)" }}
      >
        <Search size={13} className="text-slate-500" />
        <input
          type="text"
          placeholder="Search accounts, hashes, subnets..."
          className="flex-1 bg-transparent text-xs text-slate-300 placeholder-slate-600 outline-none"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        {/* Clock */}
        <span className="font-mono text-xs text-slate-500 tabular-nums">{time} IST</span>

        {/* Live badge */}
        <motion.div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer"
          style={{
            background: "rgba(16,185,129,0.08)",
            border: "1px solid rgba(16,185,129,0.25)",
            color: "#10b981",
          }}
          whileHover={{ borderColor: "rgba(16,185,129,0.5)" }}
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <Radio size={11} />
          Live
          <ChevronDown size={11} className="opacity-60" />
        </motion.div>

        {/* Alerts bell */}
        <button className="relative p-2 rounded-xl hover:bg-slate-800/60 transition-colors">
          <Bell size={16} className="text-slate-400" />
          <span
            className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
            style={{ background: "#DC143C", color: "#fff" }}
          >
            12
          </span>
        </button>

        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
          style={{
            background: "linear-gradient(135deg, #00F5FF22, #A855F711)",
            border: "1px solid rgba(0,245,255,0.3)",
            color: "#00F5FF",
          }}
        >
          A
        </div>
      </div>
    </div>
  );
}
