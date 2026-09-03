"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Network,
  Bell,
  ArrowLeftRight,
  Bookmark,
  BrainCircuit,
  FileText,
  FolderKanban,
  Settings,
  ChevronDown,
  User,
} from "lucide-react";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Overview",        href: "/" },
  { icon: Network,         label: "Network Graph",   href: "/network" },
  { icon: Bell,            label: "Alerts",          href: "/alerts", badge: 12 },
  { icon: ArrowLeftRight,  label: "Transactions",    href: "/transactions" },
  { icon: Bookmark,        label: "Watchlist",       href: "/watchlist" },
  { icon: BrainCircuit,    label: "AI Insights",     href: "/ai-insights" },
  { icon: FileText,        label: "Reports",         href: "/reports" },
  { icon: FolderKanban,    label: "Case Management", href: "/cases" },
  { icon: Settings,        label: "Settings",        href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="flex flex-col w-56 flex-shrink-0 border-r border-slate-800/60 h-screen sticky top-0"
      style={{ background: "rgba(5,8,22,0.98)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-800/50">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #00F5FF33, #A855F711)",
            border: "1px solid #00F5FF44",
            boxShadow: "0 0 16px #00F5FF22",
          }}
        >
          <svg viewBox="0 0 28 28" width="18" height="18" fill="none">
            <polygon points="14,2 26,9 26,19 14,26 2,19 2,9" fill="#00F5FF15" stroke="#00F5FF" strokeWidth="1.5" />
            <circle cx="14" cy="14" r="3" fill="#00F5FF" />
            <line x1="14" y1="14" x2="5" y2="9"  stroke="#00F5FF" strokeWidth="1" opacity="0.6"/>
            <line x1="14" y1="14" x2="23" y2="9"  stroke="#DC143C" strokeWidth="1" opacity="0.8"/>
            <line x1="14" y1="14" x2="23" y2="19" stroke="#DC143C" strokeWidth="1" opacity="0.8"/>
            <line x1="14" y1="14" x2="5"  y2="19" stroke="#00F5FF" strokeWidth="1" opacity="0.6"/>
          </svg>
        </div>
        <div>
          <div
            className="text-base font-bold leading-none"
            style={{
              fontFamily: "'Fredoka', sans-serif",
              color: "#00F5FF",
              textShadow: "0 0 16px #00F5FF66",
            }}
          >
            MuleNet
          </div>
          <div className="text-[9px] text-slate-500 mt-0.5">Financial Fraud Intelligence</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 overflow-y-auto space-y-0.5">
        {NAV_ITEMS.map(({ icon: Icon, label, href, badge }) => {
          const active = pathname === href;
          return (
            <Link key={label} href={href}>
              <motion.div
                whileHover={{ x: 2 }}
                transition={{ duration: 0.12 }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left group relative cursor-pointer mb-0.5"
                style={{
                  background: active ? "rgba(0,245,255,0.08)" : "transparent",
                  color: active ? "#00F5FF" : "#64748b",
                  border: active ? "1px solid rgba(0,245,255,0.15)" : "1px solid transparent",
                }}
              >
                {active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full"
                    style={{ background: "#00F5FF", boxShadow: "0 0 6px #00F5FF" }}
                  />
                )}
                <Icon size={15} />
                <span className="flex-1">{label}</span>
                {badge && (
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background: "#DC143C", color: "#fff" }}
                  >
                    {badge}
                  </span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-slate-800/50">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-800/40 transition-colors">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(0,245,255,0.1)", border: "1px solid rgba(0,245,255,0.2)" }}
          >
            <User size={14} className="text-cyan-400" />
          </div>
          <div className="text-left flex-1 min-w-0">
            <div className="text-xs font-semibold text-slate-300 truncate">Analyst</div>
            <div className="text-[9px] text-slate-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              RiskOps Team
            </div>
          </div>
          <ChevronDown size={12} className="text-slate-600" />
        </button>
      </div>
    </aside>
  );
}
