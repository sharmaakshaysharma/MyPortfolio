"use client";

import React, { useState, useEffect } from "react";
import { PORTFOLIO_CONFIG } from "@/data/portfolio";
import { ArrowUp, Terminal, ShieldCheck, Heart, Radio } from "lucide-react";

export function Footer() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentYear, setCurrentYear] = useState<number>(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-cyan-500/25 bg-[#020407] py-14 relative text-slate-400">
      {/* Background Laser Glow */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent shadow-[0_0_15px_rgba(0,240,255,0.8)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-10 border-b border-white/[0.06]">
          {/* Brand & Monogram */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-emerald-500/10 to-transparent border border-cyan-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.25)]">
              <span className="font-mono font-bold text-xs text-cyan-300">
                {PORTFOLIO_CONFIG.personal.initials}
              </span>
            </div>
            <div>
              <div className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                <span>{PORTFOLIO_CONFIG.personal.name}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                  SYS // CORE
                </span>
              </div>
              <div className="text-xs font-mono text-slate-400">
                {PORTFOLIO_CONFIG.personal.title}
              </div>
            </div>
          </div>

          {/* Real-time Status & Clock */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#070c16] border border-emerald-500/30 text-emerald-300 shadow-[0_0_12px_rgba(0,255,157,0.2)]">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-cyber-pulse" />
              <span>ALL SYSTEMS OPERATIONAL</span>
            </div>

            {currentTime && (
              <div className="text-cyan-400 px-3.5 py-1.5 rounded-full bg-[#070c16] border border-cyan-500/20">
                LOC // {currentTime}
              </div>
            )}

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-cyan-500/15 text-slate-300 hover:text-cyan-300 border border-cyan-500/30 transition-all cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]"
              title="Return to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>

        {/* Bottom Editorial Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {currentYear} {PORTFOLIO_CONFIG.personal.name}. Designed &amp; Engineered with Next.js, TypeScript, Tailwind CSS &amp; Motion.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-500 font-mono">Zero Tracking &bull; Zero PHI Retention</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
