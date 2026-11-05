"use client";

import React from "react";
import { PORTFOLIO_CONFIG } from "@/data/portfolio";
import {
  ShieldCheck,
  Server,
  Workflow,
  Sparkles,
  Database,
  ArrowRight,
  Code2,
} from "lucide-react";

export function AboutSection() {
  const iconMap: Record<number, React.ReactNode> = {
    0: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    1: <Server className="w-5 h-5 text-cyan-400" />,
    2: <Workflow className="w-5 h-5 text-sky-400" />,
    3: <Sparkles className="w-5 h-5 text-indigo-400" />,
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#030508]">
      {/* Background Laser Divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4 shadow-[0_0_12px_rgba(0,240,255,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-cyber-pulse" />
            <span>[ SYSTEM OPERATOR // NARRATIVE ]</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            {PORTFOLIO_CONFIG.about.headline}
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
            Delivering robust backend architectures, high-integrity data lakes, and practical AI applications with defensive system design.
          </p>
        </div>

        {/* Narrative & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Narrative Story (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 leading-relaxed text-base sm:text-lg">
            {PORTFOLIO_CONFIG.about.bioParagraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="p-6 rounded-2xl bg-[#070c16] border border-cyan-500/15 hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300 hud-corner"
              >
                {paragraph}
              </p>
            ))}

            <div className="pt-2 flex flex-wrap gap-4 font-mono">
              <a
                href="#architecture"
                className="inline-flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <span>&gt; Review system architecture blueprints</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-slate-600">•</span>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>&gt; Read detailed project case studies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Stats & Architecture Focus (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#090f1a] to-[#04060c] border border-cyan-500/25 shadow-xl hud-corner">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-cyan-500/20">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold">
                  Engineering Stack Specifications
                </h3>
              </div>
              <ul className="space-y-3 font-mono text-xs">
                <li className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-slate-400">Backend Core</span>
                  <span className="text-cyan-300 font-medium">Python &bull; FastAPI</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-slate-400">Data Engineering</span>
                  <span className="text-white font-medium">Parquet &bull; Glue &bull; Spark</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-slate-400">Lake Protocol</span>
                  <span className="text-emerald-400 font-medium">Delta Sharing &bull; CDF</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-slate-400">Cloud Infrastructure</span>
                  <span className="text-white font-medium">AWS (S3, ECS, RDS, ECR)</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-slate-400">Vector Search & AI</span>
                  <span className="text-indigo-400 font-medium">ChromaDB &bull; Gemini &bull; Groq</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-slate-400">CI/CD & Containers</span>
                  <span className="text-white font-medium">Jenkins &bull; Docker Multi-Stage</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs shadow-inner">
              <span className="font-mono uppercase tracking-wider text-cyan-300 block mb-1 font-semibold">
                [ DOMAIN PRINCIPLE ]
              </span>
              <p className="text-slate-300 leading-normal font-sans">
                Prioritizing reproducible data contracts, defensive schema assertions, and zero-downtime containerized architectures over fragile quick fixes.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Core Engineering Principles */}
        <div>
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Core Engineering Principles
            </h3>
            <p className="text-sm text-slate-400 mt-1 font-mono">
              // Guiding architectural axioms adhered to across every data pipeline and microservice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PORTFOLIO_CONFIG.about.corePrinciples.map((principle, index) => (
              <div
                key={principle.title}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#090f1a] to-[#05080e] border border-cyan-500/15 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all duration-300 group flex flex-col justify-between hud-corner"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {iconMap[index]}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors font-mono">
                    {principle.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
