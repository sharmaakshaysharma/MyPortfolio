"use client";

import React from "react";
import { PORTFOLIO_CONFIG } from "@/data/portfolio";
import {
  Calendar,
  Layers,
  ArrowRight,
  CheckCircle2,
  Workflow,
  Sparkles,
} from "lucide-react";

export function ExperienceJourney() {
  return (
    <section id="journey" className="py-24 relative overflow-hidden bg-[#030508]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4 shadow-[0_0_12px_rgba(0,240,255,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-cyber-pulse" />
            <span>[ CHRONO // FLIGHT PATH &amp; DELIVERABLES ]</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Experience &amp; Journey
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Key milestones highlighting practical execution across distributed data pipelines, cloud-native backend services, and generative retrieval systems.
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative pl-6 sm:pl-10 border-l border-cyan-500/30 space-y-12 max-w-4xl">
          {PORTFOLIO_CONFIG.journeyMilestones.map((milestone, idx) => (
            <div key={idx} className="relative group">
              {/* Futuristic Glowing Pin */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-2 w-4 h-4 rounded-full bg-[#030508] border-2 border-cyan-400 group-hover:border-emerald-400 group-hover:scale-125 transition-all shadow-[0_0_12px_rgba(0,240,255,0.6)]" />

              {/* Milestone Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#090f1a] to-[#04060c] border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300 shadow-xl hud-corner">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block mb-1">
                      // {milestone.period}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {milestone.role}
                    </h3>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 w-fit">
                    {milestone.focus}
                  </span>
                </div>

                {/* Summary */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {milestone.summary}
                </p>

                {/* Highlights List */}
                <div className="mb-6 space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                    Key Deliverables &amp; Implementations
                  </span>
                  <div className="space-y-2">
                    {milestone.highlights.map((highlight, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-start gap-2.5 text-xs text-slate-300 font-sans"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Applied Technologies */}
                <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase mr-1">
                    TECH STACK:
                  </span>
                  {milestone.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-[#060a12] border border-cyan-500/20 text-slate-300 hover:border-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
