"use client";

import { Settings, User, Shield, Bell, Database } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

export default function SettingsPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#030712]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-y-auto p-6 max-w-[1200px] mx-auto w-full">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <Settings className="text-cyan-400" /> System Settings
              </h1>
              <p className="text-sm text-slate-500 mt-1">Configure H-GNN model parameters, alerts, and access controls.</p>
            </div>
            <button className="text-xs font-bold px-4 py-2 bg-cyan-400 text-slate-900 rounded-xl hover:bg-cyan-300">
               Save Changes
            </button>
          </div>

          <div className="flex gap-8">
             {/* Settings Nav */}
             <div className="w-48 flex flex-col gap-2">
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-800 text-cyan-400 font-semibold text-sm border border-slate-700">
                  <Shield size={16} /> Model Config
                </button>
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800/50 text-slate-400 font-medium text-sm">
                  <User size={16} /> Users & Roles
                </button>
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800/50 text-slate-400 font-medium text-sm">
                  <Bell size={16} /> Notifications
                </button>
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800/50 text-slate-400 font-medium text-sm">
                  <Database size={16} /> Data Sources
                </button>
             </div>
             
             {/* Settings Content */}
             <div className="flex-1 space-y-6">
                <div className="p-6 rounded-2xl border border-slate-800/60 bg-slate-900/40">
                   <h2 className="text-lg font-bold text-white mb-4">H-GNN Model Parameters</h2>
                   
                   <div className="space-y-5">
                      <div>
                         <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">Risk Threshold Score</label>
                         <div className="flex items-center gap-4">
                            <input type="range" min="0" max="100" defaultValue="80" className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
                            <span className="text-sm font-mono font-bold text-white bg-slate-800 px-3 py-1 rounded border border-slate-700">80</span>
                         </div>
                         <p className="text-[10px] text-slate-500 mt-1.5">Nodes with a score above this threshold will automatically be flagged as High Risk.</p>
                      </div>
                      
                      <div className="border-t border-slate-800/60 pt-5">
                         <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">GNNExplainer Verbosity</label>
                         <select className="w-full bg-slate-800 border border-slate-700 text-sm text-white rounded-lg px-4 py-2.5 outline-none">
                            <option>High (Include all 3-hop connections)</option>
                            <option>Medium (Include 2-hop immediate clusters)</option>
                            <option>Low (Only direct edges)</option>
                         </select>
                      </div>

                      <div className="border-t border-slate-800/60 pt-5">
                         <label className="flex items-center gap-3 cursor-pointer group">
                           <div className="w-10 h-5 bg-cyan-900/40 rounded-full border border-cyan-800 relative">
                              <div className="w-3 h-3 bg-cyan-400 rounded-full absolute top-[3px] right-[4px] shadow-[0_0_8px_#00F5FF]" />
                           </div>
                           <span className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">Auto-quarantine Critical Nodes</span>
                         </label>
                         <p className="text-[10px] text-slate-500 mt-1.5 ml-13">Automatically suspend accounts that score &gt;95 in real-time.</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
