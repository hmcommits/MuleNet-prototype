"use client";

import { Bookmark, Search, UserMinus, ShieldAlert } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const WATCHLIST = [
  { id: "W-882", account: "0xMCH ***7E9B", alias: "Mochatrade Crypto", reason: "Known off-ramp for scatter-gather clusters", added: "2026-08-15" },
  { id: "W-883", account: "0x9A1B ***EE3F", alias: "Unknown Subnet", reason: "Linked to past mule activity", added: "2026-08-18" },
  { id: "W-884", account: "Device Xiaomi_Redmi_99X", alias: "Ghost Farm 1", reason: "Device hash matching 14 distinct mule accounts", added: "2026-09-01" },
];

export default function WatchlistPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#030712]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-y-auto p-6 max-w-[1200px] mx-auto w-full">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <Bookmark className="text-cyan-400" /> Monitored Watchlist
              </h1>
              <p className="text-sm text-slate-500 mt-1">High-risk entities under strict supervision.</p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700">
                <Search size={14} className="text-slate-500" />
                <input type="text" placeholder="Search watchlist..." className="bg-transparent outline-none text-xs text-white" />
              </div>
              <button className="text-xs font-bold px-4 py-2 bg-red-900/40 text-red-400 rounded-xl border border-red-900/60 hover:bg-red-900/60 flex items-center gap-2">
                <UserMinus size={14} /> Add Entity
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WATCHLIST.map((entity) => (
              <div key={entity.id} className="p-5 rounded-2xl border border-slate-800/60 bg-slate-900/40 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-bl-full blur-xl pointer-events-none" />
                 <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-slate-800 rounded-lg text-red-400"><ShieldAlert size={16} /></div>
                       <div>
                         <div className="text-sm font-bold text-white">{entity.alias}</div>
                         <div className="text-[10px] font-mono text-slate-400">{entity.account}</div>
                       </div>
                    </div>
                    <div className="text-[9px] text-slate-500 px-2 py-1 border border-slate-800 rounded bg-slate-950">ID: {entity.id}</div>
                 </div>
                 <div className="text-xs text-slate-400 mb-4">{entity.reason}</div>
                 <div className="flex justify-between items-center text-[10px] text-slate-500 border-t border-slate-800/60 pt-3">
                    <span>Added: {entity.added}</span>
                    <button className="text-cyan-400 hover:underline">View Telemetry</button>
                 </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
