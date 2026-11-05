"use client";

import React, { useState } from "react";
import {
  Database,
  Zap,
  TrendingDown,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Clock,
  Sparkles,
} from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";

export function LakehouseCalculator() {
  const [dataSizeGb, setDataSizeGb] = useState<number>(500);
  const [dailyQueries, setDailyQueries] = useState<number>(50);

  // Calculations
  const monthlyQueries = dailyQueries * 30;

  // Unoptimized CSV/JSON (Full table scan on S3)
  const csvStorageMonthly = dataSizeGb * 0.023; // $0.023 per GB S3 Standard
  const csvTbScannedMonthly = (dataSizeGb / 1024) * monthlyQueries;
  const csvAthenaScanMonthly = csvTbScannedMonthly * 5.0; // $5.00 per TB scanned
  const csvTotalMonthly = csvStorageMonthly + csvAthenaScanMonthly;
  const csvAvgLatencySec = Math.max(12, Math.round((dataSizeGb / 100) * 8.5));

  // Optimized Snappy Parquet + Partition Pruning Lakehouse
  // Parquet reduces storage by 75%
  const parquetSizeGb = dataSizeGb * 0.25;
  const parquetStorageMonthly = parquetSizeGb * 0.023;
  // Columnar projection + partition pruning scans only ~12% of data
  const parquetTbScannedMonthly = ((parquetSizeGb * 0.12) / 1024) * monthlyQueries;
  const parquetAthenaScanMonthly = parquetTbScannedMonthly * 5.0;
  const parquetTotalMonthly = parquetStorageMonthly + parquetAthenaScanMonthly;
  const parquetAvgLatencySec = (1.2 + Math.min(2.0, (dataSizeGb / 1000) * 0.4)).toFixed(1);

  // Savings
  const monthlySavings = Math.max(0, csvTotalMonthly - parquetTotalMonthly);
  const annualSavings = monthlySavings * 12;
  const speedupMultiple = (csvAvgLatencySec / parseFloat(parquetAvgLatencySec)).toFixed(0);

  const presets = [
    { label: "100 GB", size: 100, queries: 30 },
    { label: "500 GB", size: 500, queries: 50 },
    { label: "2 TB", size: 2048, queries: 100 },
    { label: "5 TB", size: 5120, queries: 200 },
  ];

  return (
    <div className="relative rounded-[32px] sm:rounded-[40px] bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.015] border border-white/[0.18] backdrop-blur-3xl p-6 sm:p-8 lg:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.85),inset_0_1.5px_2px_rgba(255,255,255,0.4)] overflow-hidden">
      {/* Laser Flare Accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.08] relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2 shadow-[0_0_12px_rgba(0,240,255,0.2)]">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>ENTERPRISE ARCHITECTURE // COST &amp; LATENCY BENCHMARK</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            AWS Lakehouse Query Optimization Engine
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl font-mono">
            Interactive simulator demonstrating real compute savings when converting raw row-based exports into Snappy columnar Parquet with Delta partition pruning.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="text-slate-500 text-[11px] uppercase mr-1">Scale Preset:</span>
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setDataSizeGb(preset.size);
                setDailyQueries(preset.queries);
              }}
              className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                dataSizeGb === preset.size
                  ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.3)]"
                  : "bg-white/[0.03] border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Sliders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 relative z-10">
        <div className="lg:col-span-6 space-y-6">
          {/* Slider 1: Data Size */}
          <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.06]">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                <span>Monthly S3 Data Ingestion Footprint</span>
              </label>
              <span className="text-sm font-mono font-bold text-cyan-300">
                {dataSizeGb >= 1024 ? `${(dataSizeGb / 1024).toFixed(1)} TB` : `${dataSizeGb} GB`}
              </span>
            </div>
            <input
              type="range"
              min={50}
              max={5120}
              step={50}
              value={dataSizeGb}
              onChange={(e) => setDataSizeGb(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2">
              <span>50 GB (Small)</span>
              <span>1 TB (Mid-Market)</span>
              <span>5 TB (Enterprise Data Lake)</span>
            </div>
          </div>

          {/* Slider 2: Daily Queries */}
          <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.06]">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Athena / Analytical Query Volume</span>
              </label>
              <span className="text-sm font-mono font-bold text-emerald-300">
                {dailyQueries} queries / day
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={300}
              step={10}
              value={dailyQueries}
              onChange={(e) => setDailyQueries(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2">
              <span>10 / day (Ad-hoc)</span>
              <span>100 / day (Automated BI)</span>
              <span>300 / day (Continuous ETL Stream)</span>
            </div>
          </div>
        </div>

        {/* Results Comparison (Right 6 cols) */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Legacy Unoptimized Card */}
          <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-red-500/20">
                <span className="text-xs font-mono text-red-400 font-bold">RAW CSV / JSON</span>
                <span className="text-[10px] font-mono text-red-300 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                  UNOPTIMIZED
                </span>
              </div>
              <div className="space-y-2 text-xs font-mono text-slate-300 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Athena Scan:</span>
                  <span className="text-white">${csvAthenaScanMonthly.toFixed(2)}/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">S3 Storage:</span>
                  <span className="text-white">${csvStorageMonthly.toFixed(2)}/mo</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/[0.06]">
                  <span className="text-slate-400">Query Latency:</span>
                  <span className="text-red-400 font-bold">~{csvAvgLatencySec}s avg</span>
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-red-500/20">
              <span className="text-[10px] font-mono text-slate-400 block mb-1">Total Monthly Cost</span>
              <span className="text-2xl font-black font-mono text-red-400">
                ${csvTotalMonthly.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Optimized Parquet Card */}
          <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 shadow-[0_0_25px_rgba(0,255,157,0.15)] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-500/30">
                <span className="text-xs font-mono text-emerald-300 font-bold">SNAPPY PARQUET LAKE</span>
                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-400/40 animate-pulse">
                  OPTIMIZED
                </span>
              </div>
              <div className="space-y-2 text-xs font-mono text-slate-300 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Athena Scan:</span>
                  <span className="text-emerald-300">${parquetAthenaScanMonthly.toFixed(2)}/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">S3 Storage:</span>
                  <span className="text-emerald-300">${parquetStorageMonthly.toFixed(2)}/mo</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/[0.06]">
                  <span className="text-slate-400">Query Latency:</span>
                  <span className="text-emerald-300 font-bold">~{parquetAvgLatencySec}s avg</span>
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-emerald-500/30">
              <span className="text-[10px] font-mono text-slate-400 block mb-1">Total Monthly Cost</span>
              <span className="text-2xl font-black font-mono text-emerald-300">
                ${parquetTotalMonthly.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Big Impact Summary Banner */}
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-cyan-500/20 flex flex-wrap items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
              ANNUAL COMPUTE SAVINGS
            </span>
            <div className="text-3xl sm:text-4xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">
              ${annualSavings.toLocaleString("en-US", { maximumFractionDigits: 0 })} / yr
            </div>
          </div>
          <div className="h-10 w-px bg-white/[0.1] hidden sm:block" />
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
              QUERY LATENCY SPEEDUP
            </span>
            <div className="text-3xl sm:text-4xl font-black font-mono text-cyan-300">
              {speedupMultiple}x FASTER
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-300 max-w-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            Achieved via schema enforcement, snappy compression, and date-based partition pruning on AWS S3 &amp; Athena.
          </span>
        </div>
      </div>
    </div>
  );
}

