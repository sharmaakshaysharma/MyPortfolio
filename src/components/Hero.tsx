"use client";

import React, { useState } from "react";
import { PORTFOLIO_CONFIG } from "@/data/portfolio";
import { DynamicTypewriter } from "./DynamicTypewriter";
import { AnimatedCounter } from "./AnimatedCounter";
import { ParticleNebula } from "./ParticleNebula";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import {
  ArrowRight,
  Database,
  Cpu,
  Server,
  Cloud,
  CheckCircle2,
  Play,
  Mail,
  Zap,
  Activity,
  Layers,
  Sparkles,
  Download,
  Terminal,
  Radio,
  ShieldCheck,
  Compass,
  FileCode,
  Search,
  Globe,
  Settings,
  LayoutGrid,
  ExternalLink,
  Calendar,
} from "lucide-react";

export function Hero({
  onOpenResume,
  onOpenTerminal,
}: {
  onOpenResume?: () => void;
  onOpenTerminal?: () => void;
} = {}) {
  const [pipelineActive, setPipelineActive] = useState(false);
  const [batchCount, setBatchCount] = useState(148920);
  const [activeStage, setActiveStage] = useState(0);
  const [terminalOutput, setTerminalOutput] = useState<string>(
    "SYSTEM READY // WAITING FOR INGESTION EVENT"
  );

  const simulateBatch = () => {
    if (pipelineActive) return;
    setPipelineActive(true);
    setActiveStage(1);
    setTerminalOutput("STREAM INGEST // ENCRYPTED S3 LANDING DETECTED [SSE-KMS]");

    setTimeout(() => {
      setActiveStage(2);
      setTerminalOutput("DELTA CDF // COMPUTING ROW-LEVEL MUTATIONS & PARQUET REPARTITION");
    }, 700);

    setTimeout(() => {
      setActiveStage(3);
      setTerminalOutput("GLUE CATALOG SYNC // HNSW VECTOR CHROMA INDEX UPDATED [1536-D]");
    }, 1400);

    setTimeout(() => {
      setActiveStage(4);
      setBatchCount((prev) => prev + 3200);
      setTerminalOutput("BATCH SUCCESS // +3,200 RECORDS DISPATCHED & ZERO PHI EXPOSURE GUARANTEED");
      setPipelineActive(false);
    }, 2100);
  };

  const dynamicFocusWords = [
    "Intelligent Systems.",
    "Scalable ETL Pipelines.",
    "High-Throughput APIs.",
    "Retrieval-Augmented AI.",
    "AWS Lakehouse Infrastructure.",
  ];

  return (
    <section className="relative min-h-[96vh] flex items-center justify-center pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#030508]">
      {/* Cinematic Storm & Nebula Atmospheric Backdrop */}
      <div className="absolute inset-0 cinematic-backdrop pointer-events-none" />
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />
      <ParticleNebula />
      
      {/* Volumetric Radial Light Flares */}
      <div className="absolute top-1/4 left-1/3 w-[700px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[450px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Container with Cinematic Frame */}
      <div className="relative max-w-7xl w-full mx-auto">
        {/* Floating Cockpit Frame */}
        <div className="relative rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/[0.14] backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.9)] p-6 sm:p-10 lg:p-12 overflow-hidden">
          
          {/* Atmospheric Storm Landscape Horizon & Lightning Effect (Reference Aesthetic) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl sm:rounded-[2.5rem]">
            {/* Dark dramatic cloud gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0c1828]/60 via-[#070d17]/40 to-[#020408]/90 z-0" />
            
            {/* Dramatic Storm Cloud SVG layer */}
            <svg className="absolute inset-0 w-full h-full opacity-35 object-cover mix-blend-screen" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1200 600">
              <defs>
                <radialGradient id="cloud-glow" cx="70%" cy="30%" r="50%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
                  <stop offset="40%" stopColor="#0284c7" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#000" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="horizon-glow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="80%" stopColor="#064e3b" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#022c22" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#cloud-glow)" />
              <rect y="380" width="100%" height="220" fill="url(#horizon-glow)" />
              {/* Stylized lightning branch */}
              <path d="M720,60 L705,160 L730,175 L690,290 L710,300 L660,420" stroke="#a5f3fc" strokeWidth="1.8" strokeLinecap="round" opacity="0.4" className="animate-pulse" filter="drop-shadow(0 0 8px #38bdf8)" />
            </svg>

            {/* Rolling Horizon Green/Teal Mist Glow */}
            <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-emerald-950/25 via-teal-950/15 to-transparent z-0" />
            
            {/* Lightning Ambient Glow Pulse */}
            <div className="absolute top-16 right-1/4 w-80 h-80 bg-cyan-400/[0.08] rounded-full blur-3xl animate-pulse pointer-events-none" />
          </div>

          {/* Subtle Ambient Scanline Overlay */}
          <div className="absolute inset-0 scanlines opacity-15 pointer-events-none" />

          {/* Top Bar inside the Frame (Faithful to Reference UI) */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.08] relative z-10">
            {/* User Profile / Status */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 via-emerald-400 to-indigo-500 p-[2px] shadow-[0_0_18px_rgba(0,240,255,0.4)]">
                  <div className="w-full h-full rounded-full bg-[#050811] flex items-center justify-center">
                    <span className="font-mono text-xs font-black tracking-wider text-cyan-300">
                      {PORTFOLIO_CONFIG.personal.initials}
                    </span>
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#050811] shadow-[0_0_8px_#00ff9d]" />
              </div>

              <div className="flex flex-col">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Welcome to Portfolio
                </span>
                <span className="text-sm font-extrabold text-white tracking-wide flex items-center gap-2">
                  <span>{PORTFOLIO_CONFIG.personal.name}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    v2.6
                  </span>
                </span>
              </div>
            </div>

            {/* Quick Interactive Controls (Matching Reference UI Pills: +, Search, Bell, Open For Roles) */}
            <div className="flex items-center gap-2.5 font-mono text-xs">
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 shadow-[0_0_15px_rgba(0,255,157,0.2)]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-cyber-pulse" />
                <span className="font-bold tracking-wide">OPEN FOR ROLES</span>
              </span>

              {/* Frosted Action Icons */}
              <div className="hidden sm:flex items-center gap-2 pl-2">
                {onOpenTerminal && (
                  <button
                    type="button"
                    onClick={onOpenTerminal}
                    className="w-8 h-8 rounded-full bg-cyan-500/10 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                    title="Launch Interactive Terminal (Ctrl + K)"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                  </button>
                )}
                <a
                  href="#contact"
                  className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-cyan-500/20 border border-white/[0.1] hover:border-cyan-400/40 text-slate-300 hover:text-cyan-300 flex items-center justify-center transition-all duration-200"
                  title="Direct Message"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
                <a
                  href={PORTFOLIO_CONFIG.personal.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/[0.15] border border-white/[0.1] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200"
                  title="View GitHub"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href={PORTFOLIO_CONFIG.personal.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-[#0077b5]/30 border border-white/[0.1] hover:border-[#0077b5]/50 text-slate-300 hover:text-cyan-300 flex items-center justify-center transition-all duration-200"
                  title="LinkedIn Connect"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left 1 Column: Floating Vertical Tool Dock (Inspired by Reference UI) */}
            <div className="hidden xl:flex lg:col-span-1 flex-col items-center justify-between py-4 px-2 rounded-2xl bg-white/[0.04] border border-white/[0.1] backdrop-blur-2xl shadow-xl min-h-[420px]">
              {/* Top Icons */}
              <div className="flex flex-col items-center gap-2.5 w-full">
                {/* Active Grid Icon with Left Glowing Indicator Pill */}
                <div className="relative w-full flex items-center justify-center">
                  <span className="absolute -left-2 top-1.5 bottom-1.5 w-1 rounded-r-full bg-cyan-400 shadow-[0_0_10px_#00f0ff]" />
                  <a
                    href="#"
                    className="p-2.5 rounded-xl text-cyan-300 bg-cyan-500/20 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
                    title="Overview Dashboard"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </a>
                </div>

                <a
                  href="#about"
                  className="p-2.5 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-white/[0.06] transition-all"
                  title="About Story"
                >
                  <Compass className="w-4 h-4" />
                </a>

                <a
                  href="#skills"
                  className="p-2.5 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-white/[0.06] transition-all"
                  title="Technical Skills"
                >
                  <Cpu className="w-4 h-4" />
                </a>

                <a
                  href="#projects"
                  className="p-2.5 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-white/[0.06] transition-all"
                  title="Featured Projects"
                >
                  <Layers className="w-4 h-4" />
                </a>

                <a
                  href="#architecture"
                  className="p-2.5 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-white/[0.06] transition-all"
                  title="System Architecture"
                >
                  <Server className="w-4 h-4" />
                </a>

                <a
                  href="#opensource"
                  className="p-2.5 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-white/[0.06] transition-all"
                  title="GitHub Open Source"
                >
                  <Globe className="w-4 h-4" />
                </a>

                <a
                  href="#journey"
                  className="p-2.5 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-white/[0.06] transition-all"
                  title="Career Journey"
                >
                  <Calendar className="w-4 h-4" />
                </a>
              </div>

              {/* Bottom Dock Actions */}
              <div className="flex flex-col items-center gap-2 pt-3 border-t border-white/[0.08] w-full">
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="p-2.5 rounded-xl text-emerald-400 hover:text-white hover:bg-emerald-500/20 transition-all cursor-pointer"
                  title="Curriculum Vitae"
                >
                  <Download className="w-4 h-4" />
                </button>
                <a
                  href="#contact"
                  className="p-2.5 rounded-xl text-cyan-400 hover:text-white hover:bg-cyan-500/20 transition-all"
                  title="Direct Dispatch"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href={PORTFOLIO_CONFIG.personal.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl text-slate-500 hover:text-slate-300 transition-all"
                  title="External Profile"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Middle Main Column: Dynamic Headline & Interactive Typing (6-7 Cols) */}
            <div className="lg:col-span-7 xl:col-span-6 flex flex-col items-start text-left">
              {/* Category Pill with Soft Glow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-6 shadow-[0_0_15px_rgba(0,240,255,0.25)]">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>DATA ENGINEERING &bull; BACKEND ARCHITECTURE &bull; GENAI</span>
              </div>

              {/* Dynamic Typewriter Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white leading-[1.12] mb-6">
                Building{" "}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-emerald-300 to-indigo-400 neon-text-cyan">
                  <DynamicTypewriter words={dynamicFocusWords} />
                </span>
                <span className="block text-2xl sm:text-4xl text-slate-300 font-extrabold mt-1">
                  Engineering Scalable Systems.
                </span>
              </h1>

              {/* Supporting Editorial Subtext */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mb-8">
                {PORTFOLIO_CONFIG.personal.heroSubtext}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 mb-8 w-full sm:w-auto">
                <a
                  href="#projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] active:scale-95 cursor-pointer"
                >
                  <span>Explore Featured Work</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={onOpenResume}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white/[0.05] hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-mono font-semibold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow-[0_0_20px_rgba(0,255,157,0.3)] active:scale-95 backdrop-blur-md cursor-pointer"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Resume (Preview &amp; PDF)</span>
                </button>

                <a
                  href="#contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white/[0.05] hover:bg-cyan-500/20 border border-white/[0.12] hover:border-cyan-500/40 text-slate-200 hover:text-cyan-200 font-mono font-semibold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 backdrop-blur-md cursor-pointer"
                >
                  <span>Connect</span>
                  <Mail className="w-4 h-4 text-cyan-400" />
                </a>
              </div>

              {/* Direct Links */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/[0.08] w-full max-w-md">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  CHANNELS:
                </span>
                <div className="flex items-center gap-2.5">
                  <a
                    href={PORTFOLIO_CONFIG.personal.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-white/[0.03] hover:bg-cyan-500/15 border border-white/[0.08] hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-all"
                    aria-label="GitHub Profile"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={PORTFOLIO_CONFIG.personal.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-white/[0.03] hover:bg-cyan-500/15 border border-white/[0.08] hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-all"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${PORTFOLIO_CONFIG.contact.email}`}
                    className="p-2 rounded-xl bg-white/[0.03] hover:bg-cyan-500/15 border border-white/[0.08] hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-all"
                    aria-label="Direct Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Floating Frosted Glass Telemetry Card (Directly inspired by reference UI) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Frosted Telemetry Card (Glassmorphic Widget) */}
              <div className="relative rounded-3xl bg-white/[0.05] border border-white/[0.15] backdrop-blur-3xl shadow-[0_25px_60px_-10px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] p-6 overflow-hidden">
                {/* Location / Telemetry Pin Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-cyber-pulse" />
                    <span>AWS CLOUD // S3 DATA LAKE</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    KMS SECURED
                  </span>
                </div>

                {/* Big Bold Live Metrics (Matching the large "10° C" style in reference image) */}
                <div className="mb-6">
                  <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block mb-1">
                    TOTAL PROCESSED TRANSACTIONS
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight">
                      <AnimatedCounter value={batchCount} />
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-semibold">
                      RECS
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 font-mono">
                    CDF Latency // <span className="text-cyan-300 font-semibold">32ms p99</span> &bull; Athena Sync Ready
                  </p>
                </div>

                {/* Pipeline Flow Stages */}
                <div className="space-y-2 mb-5 font-mono text-xs">
                  <div
                    className={`p-3 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                      activeStage === 1
                        ? "bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                        : "bg-black/40 border-white/[0.06] text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Cloud className="w-4 h-4 text-cyan-400" />
                      <span>01. S3 Encrypted Raw Landing</span>
                    </div>
                    {activeStage === 1 ? (
                      <span className="text-[10px] text-cyan-300 animate-pulse font-bold">
                        INGESTING...
                      </span>
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </div>

                  <div
                    className={`p-3 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                      activeStage === 2
                        ? "bg-emerald-500/20 border-emerald-400 text-white shadow-[0_0_15px_rgba(0,255,157,0.3)]"
                        : "bg-black/40 border-white/[0.06] text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Layers className="w-4 h-4 text-emerald-400" />
                      <span>02. Snappy Parquet &amp; Delta Sharing</span>
                    </div>
                    {activeStage === 2 ? (
                      <span className="text-[10px] text-emerald-300 animate-pulse font-bold">
                        WRITING...
                      </span>
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </div>

                  <div
                    className={`p-3 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                      activeStage === 3
                        ? "bg-indigo-500/20 border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                        : "bg-black/40 border-white/[0.06] text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Cpu className="w-4 h-4 text-indigo-400" />
                      <span>03. ChromaDB Vector &amp; FastAPI Edge</span>
                    </div>
                    {activeStage === 3 ? (
                      <span className="text-[10px] text-indigo-300 animate-pulse font-bold">
                        INDEXING...
                      </span>
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </div>
                </div>

                {/* Real-time Terminal Feedback Line */}
                <div className="p-2.5 rounded-xl bg-black/60 border border-white/[0.08] text-[10px] font-mono text-cyan-200 mb-4 flex items-center gap-2">
                  <span className="text-cyan-400">&gt;</span>
                  <span className="truncate">{terminalOutput}</span>
                </div>

                {/* Interactive Simulation Button */}
                <button
                  onClick={simulateBatch}
                  disabled={pipelineActive}
                  className={`w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 ${
                    pipelineActive
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400 cursor-not-allowed shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                      : "bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 hover:from-cyan-500 hover:to-emerald-400 hover:text-slate-950 text-cyan-300 border border-cyan-500/40 cursor-pointer active:scale-98 shadow-sm hover:shadow-[0_0_25px_rgba(0,240,255,0.4)]"
                  }`}
                >
                  {pipelineActive ? (
                    <>
                      <Zap className="w-3.5 h-3.5 animate-spin text-cyan-300" />
                      <span>STREAMING BATCH BURST...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>TRIGGER PIPELINE PACKET</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
