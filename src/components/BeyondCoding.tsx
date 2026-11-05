"use client";

import React from "react";
import { PORTFOLIO_CONFIG } from "@/data/portfolio";
import { Cpu, Boxes, Terminal, Code2, Compass, Sparkles } from "lucide-react";

export function BeyondCoding() {
  const iconMap: Record<string, React.ReactNode> = {
    Cpu: <Cpu className="w-5 h-5 text-indigo-400" />,
    Boxes: <Boxes className="w-5 h-5 text-cyan-400" />,
    Terminal: <Terminal className="w-5 h-5 text-emerald-400" />,
    Code2: <Code2 className="w-5 h-5 text-sky-400" />,
  };

  return (
    <section className="py-20 relative overflow-hidden bg-[#030508]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3 shadow-[0_0_12px_rgba(0,240,255,0.2)]">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>[ INTELLECT // HORIZON SCANNING ]</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Beyond Routine Code
          </h2>
          <p className="text-sm text-slate-400 max-w-xl">
            Active habits that sharpen architectural intuition and keep engineering practices grounded in modern reality.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PORTFOLIO_CONFIG.beyondCoding.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl bg-gradient-to-b from-[#090f1a] to-[#04060c] border border-cyan-500/15 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all duration-300 group flex flex-col justify-between hud-corner"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {iconMap[item.icon] || <Sparkles className="w-5 h-5 text-cyan-400" />}
                </div>
                <h3 className="text-sm font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors font-mono">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.04] text-[10px] font-mono text-cyan-400/80 uppercase tracking-wider">
                ACTIVE PURSUIT
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
