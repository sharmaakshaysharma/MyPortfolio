"use client";

import React, { useState, useEffect } from "react";
import { Activity, ShieldCheck, Terminal, Cpu, FileText } from "lucide-react";

interface SystemHealthBarProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export function SystemHealthBar({ onOpenTerminal, onOpenResume }: SystemHealthBarProps) {
  const [ping, setPing] = useState(18);

  useEffect(() => {
    const interval = setInterval(() => {
      setPing(16 + Math.floor(Math.random() * 8));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#020409]/95 backdrop-blur-xl border-b border-cyan-500/20 py-1 px-4 sm:px-6 lg:px-8 text-[11px] font-mono h-8 flex items-center">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-3 text-slate-400">
        {/* Left: Cluster Telemetry Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-cyber-pulse" />
            <span className="text-slate-300 font-bold">EDGE CLUSTER // ACTIVE</span>
          </div>
          <span className="text-slate-600 hidden sm:inline">&bull;</span>
          <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
            <span>S3 Lakehouse:</span>
            <span className="text-emerald-400">99.99% SLA</span>
          </div>
          <span className="text-slate-600 hidden md:inline">&bull;</span>
          <div className="hidden md:flex items-center gap-1.5 text-slate-400">
            <span>FastAPI Edge:</span>
            <span className="text-cyan-300">{ping}ms</span>
          </div>
        </div>

        {/* Right: Quick Action Triggers */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={onOpenTerminal}
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-cyan-500/10 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 transition-all cursor-pointer"
            title="Launch Terminal Console (Ctrl + K)"
          >
            <Terminal className="w-3 h-3 text-cyan-400" />
            <span>Terminal</span>
            <kbd className="hidden sm:inline-block px-1 py-0.2 rounded bg-black/50 text-[9px] text-cyan-400 border border-cyan-500/30">
              Ctrl+K
            </kbd>
          </button>

          <button
            onClick={onOpenResume}
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 transition-all cursor-pointer"
            title="Quick Preview Resume"
          >
            <FileText className="w-3 h-3 text-emerald-400" />
            <span>Resume</span>
          </button>
        </div>
      </div>
    </div>
  );
}
