"use client";

import React, { useState, useEffect } from "react";
import { GitHubRepo, GitHubActivityEvent, GitHubDataResponse } from "@/lib/github";
import {
  GitBranch,
  Star,
  GitFork,
  ArrowUpRight,
  RefreshCw,
  GitCommit,
  CheckCircle2,
  Code2,
  Sparkles,
} from "lucide-react";

export function GitHubActivity() {
  const [data, setData] = useState<GitHubDataResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const res = await fetch("/api/github");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error("Failed to load GitHub data:", err);
    } finally {
      setLoading(false);
      if (isManual) setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const languageColors: Record<string, string> = {
    Python: "bg-blue-400",
    TypeScript: "bg-sky-400",
    JavaScript: "bg-amber-400",
    SQL: "bg-emerald-400",
    HTML: "bg-rose-400",
    Shell: "bg-purple-400",
  };

  return (
    <section id="opensource" className="py-24 relative overflow-hidden bg-[#090b10]">
      {/* Background Accent */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4">
              <GitBranch className="w-3.5 h-3.5" />
              <span>AUTOMATED GITHUB SYNCHRONIZATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3">
              Open Source & Public Repositories
            </h2>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
              Real-time synchronization with public codebases, engineering experiments, and open infrastructure templates.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => loadData(true)}
              disabled={refreshing || loading}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer disabled:opacity-50"
              title="Refresh GitHub Feed"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${refreshing ? "animate-spin" : ""}`} />
              <span>{refreshing ? "Syncing..." : "Sync Live Data"}</span>
            </button>
          </div>
        </div>

        {/* Repositories & Recent Activity Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Repositories Grid (8 Columns) */}
          <div className="lg:col-span-8">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] animate-pulse h-44"
                  >
                    <div className="h-4 bg-white/10 rounded w-3/4 mb-3" />
                    <div className="h-3 bg-white/5 rounded w-full mb-2" />
                    <div className="h-3 bg-white/5 rounded w-2/3 mb-6" />
                    <div className="h-3 bg-white/10 rounded w-1/3" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data?.repositories.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.htmlUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-6 rounded-3xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.14] hover:border-white/[0.28] backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <Code2 className="w-4 h-4 text-cyan-400 group-hover:text-emerald-400 transition-colors" />
                          <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                            {repo.name}
                          </h3>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4">
                        {repo.description || "Open source repository by Akshay Sharma."}
                      </p>

                      {repo.topics && repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {repo.topics.slice(0, 3).map((topic) => (
                            <span
                              key={topic}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.05] text-slate-400"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.04] text-[11px] font-mono text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            languageColors[repo.language || ""] || "bg-cyan-400"
                          }`}
                        />
                        <span className="text-slate-300">{repo.language || "Python"}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-slate-400">
                          <Star className="w-3 h-3 text-amber-400" />
                          {repo.stars}
                        </span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <GitFork className="w-3 h-3" />
                          {repo.forks}
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Recent Commits Activity Feed (4 Columns - Apple Glass Card) */}
          <div className="lg:col-span-4 p-6 rounded-[28px] bg-white/[0.06] border border-white/[0.18] backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,0.7),inset_0_1.2px_1.5px_rgba(255,255,255,0.35)]">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.06]">
              <GitCommit className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300">
                Recent Public Commits
              </h3>
            </div>

            <div className="space-y-4">
              {data?.recentActivity && data.recentActivity.length > 0 ? (
                data.recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.1] transition-colors"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                      <span className="text-cyan-400 font-semibold truncate max-w-[150px]">
                        {activity.repoName}
                      </span>
                      <span className="text-slate-500 text-[10px]">
                        {new Date(activity.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-normal line-clamp-2">
                      {activity.message}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-xs font-mono text-slate-500 py-4 text-center">
                  Loading recent commits...
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3 h-3" />
                Live API Sync
              </span>
              <span>Public Scope Only</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

