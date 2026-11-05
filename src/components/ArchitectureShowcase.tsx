"use client";

import React, { useState } from "react";
import { PORTFOLIO_CONFIG, ArchitectureDiagram } from "@/data/portfolio";
import {
  Workflow,
  ArrowRight,
  Database,
  Cloud,
  Cpu,
  Layers,
  ChevronRight,
  CheckCircle2,
  Info,
  Server,
  Sparkles,
} from "lucide-react";

interface ArchitectureShowcaseProps {
  activeDiagramId?: string;
}

export function ArchitectureShowcase({
  activeDiagramId: initialDiagramId,
}: ArchitectureShowcaseProps) {
  const [selectedDiagramId, setSelectedDiagramId] = useState<string>(
    initialDiagramId || PORTFOLIO_CONFIG.architectureDiagrams[0].id
  );
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const activeDiagram =
    PORTFOLIO_CONFIG.architectureDiagrams.find(
      (d) => d.id === selectedDiagramId
    ) || PORTFOLIO_CONFIG.architectureDiagrams[0];

  const currentStep = activeDiagram.flowSteps[activeStepIndex] || activeDiagram.flowSteps[0];

  return (
    <section id="architecture" className="py-24 relative overflow-hidden bg-[#030508]">
      {/* Background radial cyber glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4 shadow-[0_0_12px_rgba(0,240,255,0.2)]">
            <Workflow className="w-3.5 h-3.5 text-cyan-400" />
            <span>[ SYSTEM ARCHITECTURE // SCHEMATIC ]</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            How I Think About System Design
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Deconstructing end-to-end data pipelines, asynchronous APIs, and RAG retrieval flows with modularity, fault tolerance, and zero-compromise security.
          </p>
        </div>

        {/* Diagram Switcher Tabs (Apple Frosted Glass Pills) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-white/[0.04] border border-white/[0.12] backdrop-blur-xl mb-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)]">
          {PORTFOLIO_CONFIG.architectureDiagrams.map((diag) => {
            const isSelected = diag.id === activeDiagram.id;
            return (
              <button
                key={diag.id}
                onClick={() => {
                  setSelectedDiagramId(diag.id);
                  setActiveStepIndex(0);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "bg-white/[0.16] text-white border border-white/[0.3] shadow-[0_4px_15px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] font-bold"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                {diag.title}
              </button>
            );
          })}
        </div>

        {/* Interactive Architecture Console Box (Apple VisionOS Glass Sheet) */}
        <div className="rounded-[32px] sm:rounded-[40px] bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.015] border border-white/[0.18] backdrop-blur-3xl shadow-[0_30px_80px_rgba(0,0,0,0.85),inset_0_1.5px_2px_rgba(255,255,255,0.4)] p-6 sm:p-8 lg:p-10">
          {/* Active Diagram Metadata */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-cyan-500/20 gap-4">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1 font-semibold">
                SYSTEM SCHEMATIC BLUEPRINT
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {activeDiagram.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                {activeDiagram.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                ACTIVE STEP: 0{activeStepIndex + 1}
              </span>
            </div>
          </div>

          {/* Step Sequence Flow Diagram (Horizontal Pipeline Track) */}
          <div className="mb-10 overflow-x-auto pb-4">
            <div className="flex items-center min-w-[700px] gap-2.5">
              {activeDiagram.flowSteps.map((step, idx) => {
                const isActive = activeStepIndex === idx;
                const isPassed = activeStepIndex > idx;
                return (
                  <React.Fragment key={step.step}>
                    <button
                      onClick={() => setActiveStepIndex(idx)}
                      className={`flex-1 p-4 rounded-2xl border text-left transition-all cursor-pointer group font-mono ${
                        isActive
                          ? "bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_25px_rgba(0,240,255,0.35)] scale-[1.03]"
                          : isPassed
                          ? "bg-[#090e18] border-emerald-500/30 text-slate-300"
                          : "bg-[#05080e] border-white/[0.08] text-slate-500 hover:border-cyan-500/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-[9px] px-2 py-0.5 rounded ${
                            isActive
                              ? "bg-cyan-400 text-slate-950 font-bold"
                              : "bg-white/[0.06] text-slate-400"
                          }`}
                        >
                          0{step.step}
                        </span>
                        <span
                          className={`text-[9px] uppercase font-semibold ${
                            isActive ? "text-cyan-300" : "text-slate-500"
                          }`}
                        >
                          {step.badge}
                        </span>
                      </div>
                      <div
                        className={`text-xs font-bold leading-tight line-clamp-1 mb-1 font-sans ${
                          isActive ? "text-white" : "group-hover:text-cyan-300"
                        }`}
                      >
                        {step.title}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {step.tech}
                      </div>
                    </button>

                    {idx < activeDiagram.flowSteps.length - 1 && (
                      <div className="shrink-0 text-cyan-500/40 px-1">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Deep Inspection Panel for Selected Step */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 rounded-2xl bg-black/60 border border-cyan-500/25 shadow-inner">
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 font-mono">
                  <span className="text-[10px] uppercase px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400">
                    STAGE 0{currentStep.step} // NODE INSPECTOR
                  </span>
                  <span className="text-xs text-slate-400">
                    {currentStep.tech}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">
                  {currentStep.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentStep.details}
                </p>
              </div>

              {/* Prev / Next Flow Navigator Buttons */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/[0.06] font-mono">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] disabled:opacity-40 disabled:cursor-not-allowed text-xs text-slate-300 transition-colors"
                >
                  &larr; PREV NODE
                </button>
                <button
                  disabled={activeStepIndex === activeDiagram.flowSteps.length - 1}
                  onClick={() =>
                    setActiveStepIndex((prev) =>
                      Math.min(activeDiagram.flowSteps.length - 1, prev + 1)
                    )
                  }
                  className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-xs text-cyan-300 transition-all shadow-[0_0_12px_rgba(0,240,255,0.2)]"
                >
                  NEXT NODE &rarr;
                </button>
                <span className="text-[10px] text-slate-500 ml-auto">
                  STAGE {activeStepIndex + 1} OF {activeDiagram.flowSteps.length}
                </span>
              </div>
            </div>

            {/* Architectural Constraints & Design Notes */}
            <div className="lg:col-span-4 p-4 rounded-xl bg-[#080d17] border border-cyan-500/20 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-cyan-400 block mb-2 font-semibold">
                  SYSTEM DESIGN TENET
                </span>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  Components are decoupled with idempotent retries, explicit schema contracts, and deterministic state transitions.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Zero Hardcoded Secrets &bull; KMS Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
