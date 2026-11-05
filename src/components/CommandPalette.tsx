"use client";

import React, { useState, useEffect } from "react";
import { PORTFOLIO_CONFIG } from "@/data/portfolio";
import {
  Search,
  X,
  ArrowRight,
  Database,
  Server,
  Cloud,
  Cpu,
  Mail,
  Copy,
  ExternalLink,
  Workflow,
  Sparkles,
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
  onSelectArchitecture?: (diagramId: string) => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onSelectProject,
  onSelectArchitecture,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery("");
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickNav = [
    { name: "About Me", href: "#about", category: "Navigation" },
    { name: "Technical Expertise", href: "#skills", category: "Navigation" },
    { name: "Featured Projects", href: "#projects", category: "Navigation" },
    { name: "System Design & Architecture", href: "#architecture", category: "Navigation" },
    { name: "Open Source & Public Repositories", href: "#opensource", category: "Navigation" },
    { name: "Experience & Journey", href: "#journey", category: "Navigation" },
    { name: "Contact & Collaboration", href: "#contact", category: "Navigation" },
    { name: "Download Resume (PDF/TXT)", href: "/api/resume", category: "Action", isDownload: true },
  ];

  const filteredNav = quickNav.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProjects = PORTFOLIO_CONFIG.projects.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
      p.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredDiagrams = PORTFOLIO_CONFIG.architectureDiagrams.filter(
    (d) =>
      d.title.toLowerCase().includes(query.toLowerCase()) ||
      d.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#0e111a] border border-white/[0.12] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08] bg-[#121622]">
          <Search className="w-4 h-4 text-cyan-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a section, project, or architecture diagram..."
            className="w-full bg-transparent text-sm font-mono text-white placeholder-slate-500 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="text-xs text-slate-500 hover:text-slate-300 font-mono"
            >
              CLEAR
            </button>
          ) : (
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.08] text-slate-400">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-4">
          {/* Projects */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-500">
                Featured Case Studies
              </div>
              <div className="space-y-1 mt-1">
                {filteredProjects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => {
                      onClose();
                      const el = document.getElementById("projects");
                      el?.scrollIntoView({ behavior: "smooth" });
                      if (onSelectProject) onSelectProject(proj.id);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-white/[0.05] transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-cyan-300">
                        {proj.title}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400">
                        {proj.category}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Architecture Diagrams */}
          {filteredDiagrams.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-500">
                Architecture Blueprints
              </div>
              <div className="space-y-1 mt-1">
                {filteredDiagrams.map((diag) => (
                  <button
                    key={diag.id}
                    onClick={() => {
                      onClose();
                      const el = document.getElementById("architecture");
                      el?.scrollIntoView({ behavior: "smooth" });
                      if (onSelectArchitecture) onSelectArchitecture(diag.id);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-white/[0.05] transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Workflow className="w-3.5 h-3.5 text-cyan-400" />
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-cyan-300">
                          {diag.title}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate max-w-sm">
                          {diag.subtitle}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Items */}
          {filteredNav.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-500">
                Quick Navigation
              </div>
              <div className="space-y-1 mt-1">
                {filteredNav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    download={item.isDownload ? "Akshay_Sharma_Resume" : undefined}
                    onClick={onClose}
                    className="p-2.5 rounded-xl hover:bg-white/[0.05] transition-colors flex items-center justify-between group block"
                  >
                    <span className="text-xs text-slate-200 group-hover:text-white">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {item.isDownload ? "Download ↓" : "Jump →"}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {filteredProjects.length === 0 &&
            filteredDiagrams.length === 0 &&
            filteredNav.length === 0 && (
              <div className="text-center py-8 text-xs text-slate-500 font-mono">
                No matching portfolio records for &quot;{query}&quot;.
              </div>
            )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-white/[0.06] bg-[#0b0d14] flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Use &uarr; &darr; to navigate, Enter to select</span>
          <span>Akshay Portfolio v2.0</span>
        </div>
      </div>
    </div>
  );
}

