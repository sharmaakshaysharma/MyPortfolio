"use client";

import React, { useState } from "react";
import { PORTFOLIO_CONFIG } from "@/data/portfolio";
import {
  Server,
  Database,
  Cloud,
  Cpu,
  Terminal,
  Search,
  CheckCircle2,
  Sparkles,
  Layers,
  Code2,
} from "lucide-react";

export function TechnicalExpertise() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All Capabilities", icon: Layers },
    { id: "backend", name: "Backend & APIs", icon: Server },
    { id: "data-engineering", name: "Data Engineering", icon: Database },
    { id: "cloud-devops", name: "Cloud & DevOps", icon: Cloud },
    { id: "databases", name: "Databases", icon: Database },
    { id: "ai-genai", name: "AI & GenAI", icon: Cpu },
  ];

  // Flatten or filter skills
  const allSkills = PORTFOLIO_CONFIG.skillCategories.flatMap((cat) =>
    cat.skills.map((s) => ({ ...s, categoryId: cat.id, categoryName: cat.name }))
  );

  const filteredSkills = allSkills.filter((skill) => {
    const matchesCategory =
      activeCategory === "all" || skill.categoryId === activeCategory;
    const matchesQuery =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.experienceNotes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#030508]">
      {/* Cyber Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4 shadow-[0_0_12px_rgba(0,240,255,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-cyber-pulse" />
            <span>[ TECH // CAPABILITY MATRIX ]</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Technical Expertise &amp; Tooling
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Technologies, frameworks, and protocols applied across production data lakes, cloud architectures, and asynchronous backend services.
          </p>
        </div>

        {/* Filter Controls Bar (Apple Frosted Glass Style) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-white/[0.04] border border-white/[0.12] backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)]">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                    isActive
                      ? "bg-white/[0.16] text-white border border-white/[0.3] shadow-[0_4px_15px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] font-bold"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Query tech matrix..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.14] focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,240,255,0.3),inset_0_1px_1px_rgba(255,255,255,0.25)] focus:outline-none text-xs text-white placeholder-slate-400 font-mono backdrop-blur-xl transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-cyan-400 font-mono"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Skills Grid (Apple Squircle Frosted Glass Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={`${skill.categoryId}-${skill.name}`}
              className="p-6 rounded-3xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.14] hover:border-white/[0.28] backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:bg-emerald-400 group-hover:shadow-[0_0_10px_#00ff9d] transition-all" />
                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors font-mono">
                      {skill.name}
                    </h3>
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/[0.08] border border-white/[0.14] text-cyan-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                    {skill.categoryName.split(" ")[0]}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mt-2">
                  {skill.experienceNotes}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  PROD // VALIDATED
                </span>
                <span className="text-slate-500">[ENTERPRISE]</span>
              </div>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-16 border border-dashed border-cyan-500/20 rounded-2xl bg-[#060a12]/50">
            <p className="text-xs font-mono text-slate-400">
              No matching technologies identified for query &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-3 text-xs font-mono text-cyan-400 hover:underline cursor-pointer"
            >
              Reset filter criteria &rarr;
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
