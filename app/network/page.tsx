"use client";

import { useState } from "react";
import { Network, Globe2, Zap, ZoomIn, ZoomOut, Maximize } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import GraphVisualizer from "@/components/GraphVisualizer";

export default function NetworkPage() {
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [isAttackActive, setIsAttackActive] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#030712]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 max-w-[1600px] mx-auto w-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <Network className="text-cyan-400" />
                Network Graph Explorer
              </h1>
              <p className="text-sm text-slate-500 mt-1">Full-screen H-GNN topological view of the financial network.</p>
            </div>
            
            <div className="flex items-center gap-2">
               <button className="p-2 rounded bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-white"><ZoomIn size={16}/></button>
               <button className="p-2 rounded bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-white"><ZoomOut size={16}/></button>
               <button className="p-2 rounded bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-white"><Maximize size={16}/></button>
            </div>
          </div>

          <div className="flex-1 rounded-2xl border border-slate-800/50 overflow-hidden min-w-0 flex flex-col" style={{ background: "rgba(8,14,30,0.9)", minHeight: 600 }}>
             <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800/50">
                <div className="flex items-center gap-2">
                  <div className="text-[9px] text-slate-500 px-1.5 py-0.5 rounded border border-slate-800/60">ⓘ Active Topology</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-[10px] text-slate-500 mr-4">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" /> Normal Account
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500 mr-4">
                    <span className="w-2 h-2 rounded-full bg-red-500" /> Money Mule
                  </div>
                  <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium text-slate-400 border border-slate-800 hover:border-slate-600 transition-colors">
                    <Globe2 size={11} /> 3D Layout
                  </button>
                </div>
             </div>
             <div className="flex-1 relative">
                <GraphVisualizer 
                   onNodeSelect={setSelectedNode} 
                   onAttackStart={() => setIsAttackActive(true)}
                   onAttackReset={() => setIsAttackActive(false)}
                />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
