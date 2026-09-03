"use client";

import { FileText, Download, Filter, Calendar } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const REPORTS = [
  { id: "RPT-Aug2026", title: "Monthly AML Compliance Report", type: "Regulatory", date: "2026-09-01", status: "Generated" },
  { id: "RPT-Q3-STR", title: "Suspicious Transaction Report (STR) Q3", type: "STR", date: "2026-08-15", status: "Filed with FIU-IND" },
  { id: "RPT-MuleNet", title: "MuleNet Effectiveness Summary", type: "Internal", date: "2026-09-02", status: "Generated" },
];

export default function ReportsPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#030712]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-y-auto p-6 max-w-[1200px] mx-auto w-full">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <FileText className="text-cyan-400" /> Compliance Reports
              </h1>
              <p className="text-sm text-slate-500 mt-1">Regulatory filings, STRs, and internal audit logs.</p>
            </div>
            <button className="text-xs font-bold px-4 py-2 bg-cyan-900/40 text-cyan-400 rounded-xl border border-cyan-900/60 hover:bg-cyan-900/60">
               Generate New Report
            </button>
          </div>

          <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 overflow-hidden">
             <div className="px-5 py-3 border-b border-slate-800/60 flex items-center gap-3 bg-slate-950/50 text-xs">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 rounded border border-slate-700 text-slate-300"><Filter size={12}/> Filter</button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 rounded border border-slate-700 text-slate-300"><Calendar size={12}/> Date Range</button>
             </div>
             
             <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-800/60 text-[10px] uppercase tracking-widest text-slate-500 bg-slate-900/20">
                    <th className="px-5 py-4">Report ID</th>
                    <th className="px-5 py-4">Title</th>
                    <th className="px-5 py-4">Type</th>
                    <th className="px-5 py-4">Date</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                   {REPORTS.map((rpt, i) => (
                      <tr key={rpt.id} className="border-b border-slate-800/30 hover:bg-slate-800/30 transition-colors">
                         <td className="px-5 py-4 font-mono text-xs text-slate-400">{rpt.id}</td>
                         <td className="px-5 py-4 font-semibold text-white">{rpt.title}</td>
                         <td className="px-5 py-4 text-xs text-slate-400">{rpt.type}</td>
                         <td className="px-5 py-4 font-mono text-xs text-slate-500">{rpt.date}</td>
                         <td className="px-5 py-4">
                            <span className="px-2 py-1 bg-emerald-900/20 text-emerald-400 border border-emerald-900/40 text-[10px] rounded font-bold">
                               {rpt.status}
                            </span>
                         </td>
                         <td className="px-5 py-4 text-right">
                            <button className="p-2 text-cyan-400 hover:text-cyan-300 bg-cyan-900/20 rounded border border-cyan-900/40 inline-flex">
                               <Download size={14} />
                            </button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>

        </div>
      </div>
    </div>
  );
}
