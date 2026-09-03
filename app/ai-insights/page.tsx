"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Cpu, Network, Zap, Target, Activity, ShieldAlert, ArrowRight } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

// Circular risk score gauge (large version)
function LargeRiskGauge({ score, label, color }: { score: number, label: string, color: string }) {
  const r = 60;
  const circ = 2 * Math.PI * r;
  const progress = (score / 100) * circ;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-36 h-36">
        <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
          <circle cx="70" cy="70" r={r} fill="none" stroke="#1e293b" strokeWidth="12" />
          <motion.circle
            cx="70" cy="70" r={r}
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: circ - progress }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 12px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold font-mono leading-none text-white" style={{ textShadow: `0 0 16px ${color}` }}>{score}</span>
          <span className="text-xs text-slate-500 mt-1">/100</span>
        </div>
      </div>
      <div className="mt-4 px-3 py-1 rounded border" style={{ color, borderColor: `${color}40`, backgroundColor: `${color}15` }}>
        <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
      </div>
    </div>
  );
}

function InsightCard({ icon: Icon, title, description, metric, metricLabel, color }: any) {
  return (
    <motion.div
      whileHover={{ y: -2, borderColor: `${color}50` }}
      className="p-5 rounded-2xl border border-slate-800/60 flex flex-col justify-between"
      style={{ background: "rgba(15,23,42,0.6)" }}
    >
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-xl" style={{ backgroundColor: `${color}20`, border: `1px solid ${color}40` }}>
            <Icon size={18} style={{ color }} />
          </div>
          <h3 className="text-sm font-bold text-white">{title}</h3>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed mb-6">{description}</p>
      </div>
      <div>
        <div className="text-2xl font-bold font-mono text-white mb-1">{metric}</div>
        <div className="text-[10px] uppercase tracking-widest text-slate-500">{metricLabel}</div>
      </div>
    </motion.div>
  );
}

export default function AiInsightsPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#030712]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar />

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 max-w-[1600px] mx-auto w-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <BrainCircuit className="text-cyan-400" />
                AI Insights & GNNExplainer
              </h1>
              <p className="text-sm text-slate-500 mt-1">Deep learning interpretability and network anomaly telemetry.</p>
            </div>
            
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700">
                <Activity size={14} className="text-emerald-400" /> Model Status: Active
              </span>
              <span className="flex items-center gap-1.5 text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700">
                <Cpu size={14} className="text-purple-400" /> Latency: 42ms
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Global Risk Gauges */}
            <div className="col-span-1 lg:col-span-3 grid grid-cols-3 gap-6">
              <div className="rounded-2xl border border-slate-800/50 p-6 flex items-center justify-around" style={{ background: "rgba(8,14,30,0.9)" }}>
                <LargeRiskGauge score={12} label="Global Network Risk" color="#34d399" />
                <div className="w-px h-32 bg-slate-800/60" />
                <div className="space-y-4">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest">Active Clusters</div>
                    <div className="text-xl font-mono text-white font-bold">14</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest">Nodes Scanned</div>
                    <div className="text-xl font-mono text-white font-bold">1.2M</div>
                  </div>
                </div>
              </div>
              
              <div className="col-span-2 rounded-2xl border border-slate-800/50 p-6" style={{ background: "rgba(8,14,30,0.9)" }}>
                <h3 className="text-sm font-bold text-white mb-4">GNN Explainer Telemetry</h3>
                <div className="grid grid-cols-2 gap-4 h-[140px]">
                  {/* Mock Chart Area */}
                  <div className="border border-slate-700/50 rounded-xl bg-slate-900/50 relative overflow-hidden flex flex-col justify-end">
                    <div className="absolute top-3 left-3 text-[10px] text-slate-400 font-bold uppercase tracking-widest">Feature Importance</div>
                    <div className="flex items-end gap-1 px-4 pb-0 h-24 w-full opacity-80">
                      {[40, 70, 30, 90, 50, 20, 80, 60, 45, 85].map((h, i) => (
                        <motion.div key={i} className="flex-1 rounded-t-sm" style={{ background: i === 3 || i === 9 ? "#DC143C" : "#00F5FF", height: `${h}%` }}
                           initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 1, delay: i * 0.05 }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="border border-slate-700/50 rounded-xl bg-slate-900/50 relative overflow-hidden flex flex-col justify-end">
                    <div className="absolute top-3 left-3 text-[10px] text-slate-400 font-bold uppercase tracking-widest">Anomaly Detection Rate</div>
                    {/* SVG Line chart mock */}
                    <svg className="w-full h-24" viewBox="0 0 200 100" preserveAspectRatio="none">
                      <motion.path d="M0,80 Q20,75 40,50 T80,40 T120,60 T160,20 T200,10 L200,100 L0,100 Z" fill="url(#grad)" opacity={0.3} />
                      <motion.path d="M0,80 Q20,75 40,50 T80,40 T120,60 T160,20 T200,10" fill="none" stroke="#A855F7" strokeWidth="3"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
                      />
                      <defs>
                        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#A855F7" stopOpacity="1" />
                          <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Insights Cards */}
            <InsightCard 
              icon={Network} 
              title="Graph Neural Network (H-GNN)" 
              description="Topology analysis reveals hidden relationships between accounts. The model leverages structural properties rather than just transaction thresholds."
              metric="99.4%" 
              metricLabel="Detection Accuracy" 
              color="#00F5FF"
            />
            <InsightCard 
              icon={Zap} 
              title="Scatter-Gather Detection" 
              description="Identified 3 new high-risk clusters exhibiting rapid fund dispersal followed by aggregation at a central node."
              metric="3 Active" 
              metricLabel="Clusters Monitored" 
              color="#DC143C"
            />
            <InsightCard 
              icon={Target} 
              title="Behavioral Profiling" 
              description="Device hashes and IP subnet matching detected anomalous logins across 14 distinct accounts from a single source."
              metric="14 Nodes" 
              metricLabel="Flagged via Device Hash" 
              color="#FF8C00"
            />
            <InsightCard 
              icon={ShieldAlert} 
              title="Mule Account Predictor" 
              description="Predictive model flagged accounts likely to be utilized as money mules based on dormant periods ending with sudden high-volume inflows."
              metric="42 Nodes" 
              metricLabel="Pre-emptively Flagged" 
              color="#A855F7"
            />
          </div>

          {/* Detailed Explainer Section */}
          <div className="rounded-2xl border border-slate-800/50 p-6" style={{ background: "rgba(8,14,30,0.9)" }}>
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BrainCircuit className="text-purple-400" />
                  Model Interpretability (GNNExplainer)
                </h3>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700">
                  Download Full Report <ArrowRight size={14} />
                </button>
             </div>
             
             <div className="grid grid-cols-2 gap-8">
               <div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    GNNExplainer highlights the specific subgraph and node features that contributed most significantly to the risk classification. This provides <strong>explainable AI</strong> for law enforcement and compliance teams, fulfilling regulatory requirements for automated decision making.
                  </p>
                  
                  <div className="space-y-3">
                    {["High transaction velocity within 24h", "Shared device hash (Xiaomi_Redmi_99X)", "Structuring pattern (below reporting threshold)", "Immediate withdrawal via ATM/Crypto"].map((reason, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                         <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400">{i+1}</div>
                         <span className="text-sm text-slate-300">{reason}</span>
                      </div>
                    ))}
                  </div>
               </div>
               
               <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 relative overflow-hidden flex items-center justify-center">
                  {/* Mock Explainer Graph visualization */}
                  <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle, #A855F7 0%, transparent 60%)"}} />
                  <svg width="300" height="200" className="relative z-10">
                     <circle cx="150" cy="100" r="30" fill="#DC143C" opacity="0.2" />
                     <circle cx="150" cy="100" r="15" fill="#DC143C" stroke="#fff" strokeWidth="2" />
                     <text x="150" y="104" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">Mule</text>
                     
                     <line x1="150" y1="100" x2="80" y2="50" stroke="#FF8C00" strokeWidth="4" strokeDasharray="4 4" />
                     <circle cx="80" cy="50" r="10" fill="#FF8C00" />
                     
                     <line x1="150" y1="100" x2="220" y2="50" stroke="#FF8C00" strokeWidth="4" strokeDasharray="4 4" />
                     <circle cx="220" cy="50" r="10" fill="#FF8C00" />
                     
                     <line x1="150" y1="100" x2="150" y2="170" stroke="#DC143C" strokeWidth="6" />
                     <circle cx="150" cy="170" r="12" fill="#A855F7" />
                     
                     <text x="80" y="35" textAnchor="middle" fontSize="10" fill="#94a3b8">Source 1</text>
                     <text x="220" y="35" textAnchor="middle" fontSize="10" fill="#94a3b8">Source 2</text>
                     <text x="150" y="195" textAnchor="middle" fontSize="10" fill="#94a3b8">Destination</text>
                  </svg>
                  <div className="absolute bottom-3 left-3 right-3 p-2 bg-slate-950/80 backdrop-blur-sm rounded border border-slate-800 text-[10px] text-slate-400 text-center">
                    Thickness indicates importance in classification weight.
                  </div>
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
