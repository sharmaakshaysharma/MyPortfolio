"use client";

import React, { useState, useEffect, useRef } from "react";
import { PORTFOLIO_CONFIG } from "@/data/portfolio";
import { Terminal, X, Minimize2, Maximize2, ShieldCheck, Zap } from "lucide-react";

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResumeModal?: () => void;
}

interface CommandOutput {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export function InteractiveTerminal({
  isOpen,
  onClose,
  onOpenResumeModal,
}: InteractiveTerminalProps) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isMaximized, setIsMaximized] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      if (history.length === 0) {
        setHistory([
          {
            id: "welcome",
            command: "system --init",
            timestamp: new Date().toLocaleTimeString(),
            output: (
              <div className="space-y-1 text-slate-300">
                <p className="text-cyan-400 font-bold">
                  AKSHAY SHARMA // HYPER-TERMINAL v2.6.0 [EDGE-CLUSTER-01]
                </p>
                <p className="text-xs text-slate-400">
                  Type <span className="text-emerald-400 font-bold">&apos;help&apos;</span> to inspect available commands, or <span className="text-cyan-400 font-bold">&apos;cat resume&apos;</span> to read career credentials.
                </p>
              </div>
            ),
          },
        ]);
      }
    }
  }, [isOpen]);

  // Scroll to bottom on output change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Global keydown: Ctrl+K or Escape
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // Add to command history for up/down arrows
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    let outputNode: React.ReactNode = null;

    switch (cmd) {
      case "help":
        outputNode = (
          <div className="space-y-1.5 text-xs font-mono">
            <p className="text-cyan-300 font-semibold mb-1">AVAILABLE COMMANDS:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              <div><span className="text-emerald-400 font-bold">help</span> — List system commands</div>
              <div><span className="text-emerald-400 font-bold">whoami</span> — Identity &amp; focus areas</div>
              <div><span className="text-emerald-400 font-bold">skills</span> — Verified technical matrix</div>
              <div><span className="text-emerald-400 font-bold">projects</span> — Core enterprise architectures</div>
              <div><span className="text-emerald-400 font-bold">cat resume</span> — Experience &amp; ATS summary</div>
              <div><span className="text-emerald-400 font-bold">calc [gb]</span> — S3 lakehouse query calculator</div>
              <div><span className="text-emerald-400 font-bold">status</span> — Real-time telemetry &amp; pings</div>
              <div><span className="text-emerald-400 font-bold">github</span> — Open GitHub repository</div>
              <div><span className="text-emerald-400 font-bold">linkedin</span> — Open LinkedIn profile</div>
              <div><span className="text-emerald-400 font-bold">clear</span> — Purge terminal history</div>
              <div><span className="text-emerald-400 font-bold">exit</span> — Close terminal</div>
            </div>
          </div>
        );
        break;

      case "whoami":
        outputNode = (
          <div className="space-y-1.5 text-xs font-mono">
            <p className="text-white font-bold">{PORTFOLIO_CONFIG.personal.name}</p>
            <p className="text-cyan-300">{PORTFOLIO_CONFIG.personal.title}</p>
            <p className="text-slate-400">{PORTFOLIO_CONFIG.personal.heroSubtext}</p>
            <p className="text-emerald-400 mt-2">
              LOCATION: {PORTFOLIO_CONFIG.personal.location} &bull; STATUS: {PORTFOLIO_CONFIG.personal.availability.status}
            </p>
          </div>
        );
        break;

      case "skills":
        outputNode = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-cyan-300 font-semibold">VERIFIED PRODUCTION MATRIX:</p>
            <div className="space-y-1 text-slate-300">
              <p><span className="text-cyan-400 font-bold">[Backend]:</span> Python, FastAPI, REST APIs, SQL, Pandas</p>
              <p><span className="text-emerald-400 font-bold">[Data Lake]:</span> Apache Spark, Delta Sharing, Snappy Parquet, Glue, CDF, Data Validation</p>
              <p><span className="text-indigo-400 font-bold">[Cloud &amp; DevOps]:</span> AWS S3, Glue, Lambda, ECS Fargate, ECR, RDS, Secrets Manager, Jenkins, Docker</p>
              <p><span className="text-sky-400 font-bold">[AI &amp; GenAI]:</span> RAG, LangChain, ChromaDB, Groq, Gemini, Semantic Search</p>
            </div>
          </div>
        );
        break;

      case "projects":
        outputNode = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-cyan-300 font-semibold">PRODUCTION CASE STUDIES:</p>
            {PORTFOLIO_CONFIG.projects.map((p: { id: string; title: string; description: string; technologies: string[] }, idx: number) => (
              <div key={p.id} className="pb-1 border-b border-white/[0.06]">
                <p className="text-white font-bold">0{idx + 1}. {p.title}</p>
                <p className="text-slate-400 text-[11px]">{p.description}</p>
                <p className="text-emerald-400 text-[10px]">Stack: {p.technologies.join(", ")}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "cat":
        if (args[0] === "resume" || args[0] === "cv") {
          outputNode = (
            <div className="space-y-2 text-xs font-mono">
              <p className="text-emerald-400 font-bold">=== CURRICULUM VITAE // AKSHAY SHARMA ===</p>
              <p className="text-slate-300">Software Developer | Python Developer | Data Engineer</p>
              <p className="text-cyan-300">Specialization: S3 Lakehouses, Delta Sharing, FastAPI Microservices, Vector RAG</p>
              <p className="text-slate-400">Direct Download: <a href="/api/resume" download className="text-emerald-400 underline">/api/resume (PDF)</a></p>
              {onOpenResumeModal && (
                <button
                  onClick={onOpenResumeModal}
                  className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/40 border border-cyan-400/40 text-[11px] cursor-pointer"
                >
                  &gt; Launch GUI Resume Previewer
                </button>
              )}
            </div>
          );
        } else {
          outputNode = <p className="text-red-400 text-xs font-mono">cat: {args.join(" ")}: No such file. Try &apos;cat resume&apos;</p>;
        }
        break;

      case "calc": {
        const sizeGb = parseFloat(args[0]) || 500;
        const csvCost = ((sizeGb / 1024) * 5 * 30).toFixed(2);
        const parquetCost = (((sizeGb * 0.15) / 1024) * 5 * 30).toFixed(2);
        const savings = (parseFloat(csvCost) - parseFloat(parquetCost)).toFixed(2);

        outputNode = (
          <div className="space-y-1.5 text-xs font-mono p-2.5 rounded bg-black/60 border border-cyan-500/30">
            <p className="text-cyan-300 font-bold">LAKEHOUSE QUERY OPTIMIZATION ENGINE:</p>
            <p className="text-slate-400">Data Footprint: <span className="text-white font-bold">{sizeGb} GB</span> (30 queries/month)</p>
            <p className="text-red-400">Raw CSV/JSON Scan Cost: ${csvCost}/mo (Latency: ~38s)</p>
            <p className="text-emerald-400">Snappy Parquet Partitioned Scan Cost: ${parquetCost}/mo (Latency: ~1.4s)</p>
            <p className="text-cyan-300 font-bold">Estimated Monthly Compute Savings: ${savings} (85% reduction)</p>
          </div>
        );
        break;
      }

      case "status":
        outputNode = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-cyan-300 font-bold">INFRASTRUCTURE TELEMETRY:</p>
            <p className="text-emerald-400">&bull; AWS S3 Lakehouse: 99.99% SLA [ONLINE]</p>
            <p className="text-emerald-400">&bull; FastAPI Microservices: 18ms p95 [OPTIMAL]</p>
            <p className="text-emerald-400">&bull; Delta Sharing Protocol: Active CDF Streams [HEALTHY]</p>
            <p className="text-emerald-400">&bull; ChromaDB Vector Engine: HNSW Index 1536-D [READY]</p>
            <p className="text-emerald-400">&bull; SMTP Relay: Encrypted TLS [OPERATIONAL]</p>
          </div>
        );
        break;

      case "github":
        window.open(PORTFOLIO_CONFIG.personal.socials.github, "_blank");
        outputNode = <p className="text-emerald-400 text-xs font-mono">Redirecting to {PORTFOLIO_CONFIG.personal.socials.github}...</p>;
        break;

      case "linkedin":
        window.open(PORTFOLIO_CONFIG.personal.socials.linkedin, "_blank");
        outputNode = <p className="text-emerald-400 text-xs font-mono">Redirecting to {PORTFOLIO_CONFIG.personal.socials.linkedin}...</p>;
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "exit":
      case "quit":
        onClose();
        return;

      default:
        outputNode = (
          <p className="text-red-400 text-xs font-mono">
            Command not recognized: &apos;{trimmed}&apos;. Type <span className="text-cyan-300 font-bold">&apos;help&apos;</span> for documentation.
          </p>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: trimmed,
        output: outputNode,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx < commandHistory.length) {
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const available = ["help", "whoami", "skills", "projects", "cat resume", "calc", "status", "github", "linkedin", "clear", "exit"];
      const match = available.find((c) => c.startsWith(inputVal.trim()));
      if (match) {
        setInputVal(match);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
      />

      {/* Terminal Window (Apple macOS Frosted Glass) */}
      <div
        className={`relative flex flex-col rounded-[28px] bg-slate-950/85 border border-white/[0.2] backdrop-blur-3xl shadow-[0_30px_90px_rgba(0,0,0,0.95),inset_0_1.5px_2px_rgba(255,255,255,0.35)] overflow-hidden z-10 transition-all duration-200 ${
          isMaximized
            ? "w-full h-full max-w-full max-h-full rounded-none"
            : "w-full max-w-3xl h-[650px] max-h-[90vh]"
        }`}
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-white/[0.04] border-b border-white/[0.1] select-none">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-110 transition-all shadow-[0_0_6px_rgba(255,95,86,0.6)] cursor-pointer"
                title="Close"
              />
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-110 transition-all shadow-[0_0_6px_rgba(255,189,46,0.6)] cursor-pointer"
                title="Maximize/Restore"
              />
              <button
                onClick={() => setHistory([])}
                className="w-3 h-3 rounded-full bg-[#27c93f] hover:brightness-110 transition-all shadow-[0_0_6px_rgba(39,201,63,0.6)] cursor-pointer"
                title="Clear screen"
              />
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>akshay@edge-cluster:~ (zsh)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block text-[10px] font-mono text-cyan-400/70 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
              Press [Tab] to Autocomplete
            </span>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Buffer */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 font-mono text-xs sm:text-sm cursor-text scrollbar-thin"
        >
          {history.map((item) => (
            <div key={item.id} className="space-y-1.5">
              <div className="flex items-center gap-2 text-cyan-300 font-bold">
                <span className="text-emerald-400">akshay@cluster:~$</span>
                <span>{item.command}</span>
                <span className="text-[10px] text-slate-600 font-normal ml-auto">
                  {item.timestamp}
                </span>
              </div>
              <div className="pl-3 border-l-2 border-cyan-500/20 py-0.5">
                {item.output}
              </div>
            </div>
          ))}

          {/* Active Prompt Line */}
          <div className="flex items-center gap-2 text-cyan-300 font-bold">
            <span className="text-emerald-400">akshay@cluster:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white font-mono focus:outline-none caret-cyan-400 text-xs sm:text-sm"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>
          <div ref={bottomRef} />
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-[#050914] border-t border-cyan-500/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>HINT: Type &apos;calc 500&apos; or &apos;skills&apos;</span>
          <span>Ctrl + K to toggle</span>
        </div>
      </div>
    </div>
  );
}
