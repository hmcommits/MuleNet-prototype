"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, ArrowRight } from "lucide-react";

interface Alert {
  id: number;
  title: string;
  body: string;
  time: string;
}

const ATTACK_ALERT: Alert = {
  id: 1,
  title: "High-risk transaction detected!",
  body: "₹11,00,000 scatter-gather attack via Ghost Farm device. 4 mule accounts flagged. Mochatrade gateway targeted.",
  time: "21:12:47",
};

export default function AlertToast({
  isAttackActive,
  onInvestigate,
}: {
  isAttackActive: boolean;
  onInvestigate: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (isAttackActive && !dismissed) {
      const t = setTimeout(() => setVisible(true), 2200);
      return () => clearTimeout(t);
    }
    if (!isAttackActive) {
      setVisible(false);
      setDismissed(false);
    }
  }, [isAttackActive, dismissed]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          className="fixed bottom-6 right-6 z-50 w-80 rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(30,8,8,0.97), rgba(20,5,5,0.99))",
            border: "1px solid rgba(220,20,60,0.45)",
            boxShadow: "0 0 40px rgba(220,20,60,0.25), 0 20px 40px rgba(0,0,0,0.6)",
          }}
        >
          {/* Animated top bar */}
          <motion.div
            className="h-0.5 bg-red-600"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 12, ease: "linear" }}
            onAnimationComplete={() => setDismissed(true)}
          />

          <div className="p-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <motion.div
                  className="p-1.5 rounded-lg"
                  style={{ background: "rgba(220,20,60,0.2)", border: "1px solid rgba(220,20,60,0.4)" }}
                  animate={{ boxShadow: ["0 0 0px #DC143C44", "0 0 12px #DC143C88", "0 0 0px #DC143C44"] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Bell size={12} className="text-red-400" />
                </motion.div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-400">Real-Time Alert</span>
              </div>
              <button
                onClick={() => { setVisible(false); setDismissed(true); }}
                className="p-1 rounded text-slate-600 hover:text-white transition-colors"
              >
                <X size={13} />
              </button>
            </div>

            {/* Body */}
            <p className="text-sm font-bold text-white mb-1">{ATTACK_ALERT.title}</p>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">{ATTACK_ALERT.body}</p>
            <p className="text-[9px] font-mono text-slate-600 mb-3">{ATTACK_ALERT.time} IST</p>

            {/* Actions */}
            <div className="flex gap-2">
              <motion.button
                onClick={() => { onInvestigate(); setVisible(false); setDismissed(true); }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #b91c1c, #dc2626)",
                  border: "1px solid rgba(220,20,60,0.5)",
                  boxShadow: "0 0 12px rgba(220,20,60,0.3)",
                }}
              >
                Investigate Now <ArrowRight size={11} />
              </motion.button>
              <button
                onClick={() => { setVisible(false); setDismissed(true); }}
                className="px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-white border border-slate-800 hover:border-slate-600 transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
