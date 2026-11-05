"use client";

import React, { useEffect } from "react";
import { Project } from "@/data/portfolio";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Layers,
  ArrowRight,
  ExternalLink,
  Code2,
} from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onNavigateToArchitecture?: (diagramId: string) => void;
}

export function ProjectModal({
  project,
  onClose,
  onNavigateToArchitecture,
}: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0d1017] border border-white/[0.12] rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 sm:p-8 border-b border-white/[0.08] bg-[#0f131c]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                {project.category}
              </span>
              <span className="text-xs font-mono text-slate-500">Case Study</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-slate-300">
          {/* Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]"
              >
                <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
                  {metric.label}
                </span>
                <span className="text-xs font-mono font-bold text-cyan-300">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>

          {/* Problem Statement & Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-wider mb-2">
                <AlertCircle className="w-4 h-4" />
                <span>The Engineering Problem</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Architecture & Solution</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.solutionArchitecture}
              </p>
            </div>
          </div>

          {/* Key Workflows */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Core Workflows Implemented</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.keyWorkflows.map((workflow, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{workflow}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Engineering Challenges & Solutions */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Technical Challenges Solved</span>
            </h3>
            <div className="space-y-3">
              {project.engineeringChallenges.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                >
                  <div className="text-xs font-semibold text-rose-300/90 mb-1">
                    Challenge: {item.challenge}
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed">
                    <span className="text-emerald-400 font-medium">Solution: </span>
                    {item.solution}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Contributions */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>Key Personal Contributions</span>
            </h3>
            <ul className="space-y-2">
              {project.keyContributions.map((contrib, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs text-slate-300"
                >
                  <span className="text-cyan-400 font-mono mt-0.5">&gt;</span>
                  <span>{contrib}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Security & Compliance Notes */}
          {project.securityNotes && (
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block mb-0.5">Security & Compliance Guardrails</span>
                <span className="text-slate-400">{project.securityNotes}</span>
              </div>
            </div>
          )}

          {/* Technologies Used */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
              Technologies & Infrastructure
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-6 border-t border-white/[0.08] bg-[#0c0f16]">
          {project.architectureDiagramId && onNavigateToArchitecture ? (
            <button
              onClick={() => {
                onClose();
                onNavigateToArchitecture(project.architectureDiagramId);
              }}
              className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              <span>View System Architecture Diagram</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-white transition-colors cursor-pointer"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
}

