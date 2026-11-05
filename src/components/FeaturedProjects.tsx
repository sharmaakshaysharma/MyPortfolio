"use client";

import React, { useState } from "react";
import { PORTFOLIO_CONFIG, Project } from "@/data/portfolio";
import { ProjectModal } from "./ProjectModal";
import {
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Layers,
  Database,
  CheckCircle2,
  Lock,
  Workflow,
  Sparkles,
} from "lucide-react";

interface FeaturedProjectsProps {
  onNavigateToArchitecture?: (diagramId: string) => void;
}

export function FeaturedProjects({
  onNavigateToArchitecture,
}: FeaturedProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getProjectAccent = (index: number) => {
    switch (index) {
      case 0:
        return {
          gradient: "from-emerald-500/10 via-cyan-500/5 to-transparent",
          badge: "bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-[0_0_12px_rgba(0,255,157,0.25)]",
          border: "border-emerald-500/25 hover:border-emerald-400 hover:shadow-[0_0_35px_rgba(0,255,157,0.25)]",
          accentColor: "text-emerald-400",
          glow: "neon-glow-mint-box",
        };
      case 1:
        return {
          gradient: "from-cyan-500/10 via-sky-500/5 to-transparent",
          badge: "bg-cyan-500/15 border-cyan-500/40 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.25)]",
          border: "border-cyan-500/25 hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(0,240,255,0.25)]",
          accentColor: "text-cyan-400",
          glow: "neon-glow-box",
        };
      case 2:
      default:
        return {
          gradient: "from-indigo-500/10 via-purple-500/5 to-transparent",
          badge: "bg-indigo-500/15 border-indigo-500/40 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.25)]",
          border: "border-indigo-500/25 hover:border-indigo-400 hover:shadow-[0_0_35px_rgba(99,102,241,0.25)]",
          accentColor: "text-indigo-400",
          glow: "glow-indigo",
        };
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#030508]">
      {/* Background Cyber Grid Accent */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4 shadow-[0_0_12px_rgba(0,240,255,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-cyber-pulse" />
            <span>[ SYSTEM // CASE STUDIES ]</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
            Featured Systems &amp; Case Studies
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Enterprise systems demonstrating distributed data lakes, asynchronous backend microservices, and semantic vector retrieval.
          </p>
        </div>

        {/* Editorial Project Showcase List */}
        <div className="space-y-12">
          {PORTFOLIO_CONFIG.projects.map((project, index) => {
            const style = getProjectAccent(index);
            return (
              <div
                key={project.id}
                className={`group relative rounded-3xl bg-gradient-to-b from-[#090f1a] to-[#04060c] border ${style.border} transition-all duration-300 p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden hud-corner`}
              >
                <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Metadata & Narrative */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center gap-2.5 mb-4 font-mono text-xs">
                        <span
                          className={`text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border ${style.badge}`}
                        >
                          {project.category}
                        </span>
                        <span className="text-slate-500">
                          // BLUEPRINT #{index + 1}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3 group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>

                      {/* Tagline */}
                      <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Workflows Preview */}
                      <div className="mb-6 space-y-2">
                        <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                          Core Workflows &amp; Security Assurances
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {project.keyWorkflows.slice(0, 4).map((wf, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-xs text-slate-300"
                            >
                              <CheckCircle2
                                className={`w-3.5 h-3.5 ${style.accentColor} shrink-0`}
                              />
                              <span className="truncate">{wf}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Area */}
                    <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-200 border border-cyan-500/40 hover:border-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.2)] active:scale-95"
                      >
                        <span>Deep Dive Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                      </button>

                      {project.architectureDiagramId && onNavigateToArchitecture && (
                        <button
                          onClick={() =>
                            onNavigateToArchitecture(project.architectureDiagramId)
                          }
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
                        >
                          <Workflow className="w-3.5 h-3.5" />
                          <span>View Schematic</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Key Architectural Metrics & Tech Matrix */}
                  <div className="lg:col-span-5 flex flex-col gap-4">
                    {/* Metrics Panel */}
                    <div className="p-5 rounded-2xl bg-black/60 border border-cyan-500/20 backdrop-blur-md shadow-inner">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block mb-3 font-semibold">
                        System Specifications // TELEMETRY
                      </span>
                      <div className="grid grid-cols-2 gap-3">
                        {project.metrics.map((m) => (
                          <div
                            key={m.label}
                            className="p-3 rounded-xl bg-[#080d17]/80 border border-white/[0.06]"
                          >
                            <span className="text-[10px] font-mono text-slate-500 block">
                              {m.label}
                            </span>
                            <span className="text-xs font-mono font-bold text-white mt-0.5 block truncate">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.08]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2.5">
                        Implemented Technologies
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/[0.04] border border-cyan-500/20 text-slate-300 hover:border-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Privacy & Security Note */}
                    {project.securityNotes && (
                      <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-300 flex items-center gap-2">
                        <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">
                          ZERO PHI EXPOSURE &bull; AWS KMS ENCRYPTED
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onNavigateToArchitecture={onNavigateToArchitecture}
      />
    </section>
  );
}
