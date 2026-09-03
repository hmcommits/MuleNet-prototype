"use client";

import { FolderKanban, Plus, Search, MessageSquare, Clock } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const CASES = [
  { id: "CASE-2026-881", title: "Operation Scatter-Gather Intercept", status: "Open", assignee: "Analyst J.", priority: "High", updated: "10 mins ago", messages: 12 },
  { id: "CASE-2026-879", title: "Ghost Farm Ring (Xiaomi Devices)", status: "Investigating", assignee: "RiskOps Team", priority: "Critical", updated: "2 hours ago", messages: 34 },
  { id: "CASE-2026-850", title: "Crypto Off-Ramp Anomaly", status: "Closed", assignee: "Analyst M.", priority: "Medium", updated: "1 day ago", messages: 5 },
];

export default function CasesPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#030712]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-y-auto p-6 max-w-[1200px] mx-auto w-full">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <FolderKanban className="text-cyan-400" /> Case Management
              </h1>
              <p className="text-sm text-slate-500 mt-1">Investigate grouped alerts and collaborate with the fraud team.</p>
            </div>
            <div className="flex gap-2">
               <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700">
                 <Search size={14} className="text-slate-500" />
                 <input type="text" placeholder="Search cases..." className="bg-transparent outline-none text-xs text-white" />
               </div>
               <button className="text-xs font-bold px-4 py-2 bg-cyan-400 text-slate-900 rounded-xl hover:bg-cyan-300 flex items-center gap-2 shadow-[0_0_15px_rgba(0,245,255,0.3)]">
                 <Plus size={14} /> New Case
               </button>
            </div>
          </div>

          <div className="grid gap-4">
            {CASES.map((c) => (
              <div key={c.id} className="p-5 rounded-2xl border border-slate-800/60 bg-slate-900/40 flex items-center justify-between hover:bg-slate-800/40 transition-colors cursor-pointer group">
                 <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                       <FolderKanban size={18} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <div>
                       <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{c.title}</h3>
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">{c.status}</span>
                          {c.priority === 'Critical' && <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-red-900/30 text-red-400 border border-red-900/50">Critical</span>}
                       </div>
                       <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span className="font-mono text-slate-400">{c.id}</span>
                          <span className="flex items-center gap-1.5"><Clock size={12}/> Updated {c.updated}</span>
                          <span className="flex items-center gap-1.5"><MessageSquare size={12}/> {c.messages} notes</span>
                       </div>
                    </div>
                 </div>
                 
                 <div className="text-right">
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Assignee</div>
                    <div className="text-sm font-semibold text-white">{c.assignee}</div>
                 </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
