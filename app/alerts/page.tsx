"use client";

import { motion } from "framer-motion";
import { Bell, ShieldAlert, AlertTriangle, Eye, CheckCircle } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const ALERTS = [
  { id: "ALT-921", level: "critical", type: "Scatter-Gather", target: "A/c 0xMCH ***7E9B", time: "2 mins ago", msg: "High-velocity fund dispersal detected across 4 mule accounts." },
  { id: "ALT-920", level: "high",     type: "Device Hash Match", target: "Ghost Farm",     time: "14 mins ago", msg: "14 logins from Xiaomi_Redmi_99X across distinct accounts." },
  { id: "ALT-919", level: "high",     type: "Structuring",      target: "A/c 0x8F9A",      time: "1 hour ago",  msg: "Multiple deposits just below reporting thresholds." },
  { id: "ALT-918", level: "medium",   type: "Dormant Wakeup",   target: "A/c 0x3C4D",      time: "3 hours ago", msg: "Account active after 14 months of dormancy with large inflow." },
];

export default function AlertsPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#030712]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-y-auto p-6 max-w-[1200px] mx-auto w-full">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <Bell className="text-cyan-400" /> Actionable Alerts
              </h1>
              <p className="text-sm text-slate-500 mt-1">Real-time system generated flags requiring analyst review.</p>
            </div>
            <button className="text-xs font-bold px-4 py-2 bg-slate-800 rounded-lg text-white border border-slate-700 hover:bg-slate-700">
               Acknowledge All
            </button>
          </div>

          <div className="grid gap-4">
            {ALERTS.map((alert, i) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl border border-slate-800/50 flex items-center gap-6"
                style={{ background: "rgba(15,23,42,0.5)" }}
              >
                <div className="p-3 rounded-full" style={{
                  background: alert.level === 'critical' ? 'rgba(220,20,60,0.1)' : alert.level === 'high' ? 'rgba(255,140,0,0.1)' : 'rgba(0,245,255,0.1)',
                  color: alert.level === 'critical' ? '#DC143C' : alert.level === 'high' ? '#FF8C00' : '#00F5FF'
                }}>
                  {alert.level === 'critical' ? <ShieldAlert /> : <AlertTriangle />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-bold text-white">{alert.type}</span>
                    <span className="text-[10px] font-mono text-slate-500">{alert.id}</span>
                  </div>
                  <p className="text-xs text-slate-400">{alert.msg}</p>
                </div>
                
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Target</div>
                  <div className="text-xs font-mono font-bold text-white">{alert.target}</div>
                  <div className="text-[10px] text-slate-500 mt-1">{alert.time}</div>
                </div>
                
                <div className="w-px h-12 bg-slate-800 mx-2" />
                
                <div className="flex gap-2">
                   <button className="p-2 rounded-lg bg-cyan-900/20 text-cyan-400 border border-cyan-900/50 hover:bg-cyan-900/40"><Eye size={16}/></button>
                   <button className="p-2 rounded-lg bg-emerald-900/20 text-emerald-400 border border-emerald-900/50 hover:bg-emerald-900/40"><CheckCircle size={16}/></button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
