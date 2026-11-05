"use client";

import React, { useState, useEffect } from "react";
import { PORTFOLIO_CONFIG } from "@/data/portfolio";
import {
  Download,
  Copy,
  Check,
  X,
  FileText,
  ExternalLink,
  ShieldCheck,
  Layers,
  Sparkles,
  Terminal,
} from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const markdownResume = `# AKSHAY SHARMA
**Software Developer | Python Developer | Data Engineer | AI/GenAI Enthusiast**
- Email: ${PORTFOLIO_CONFIG.contact.email}
- LinkedIn: ${PORTFOLIO_CONFIG.personal.socials.linkedin}
- GitHub: ${PORTFOLIO_CONFIG.personal.socials.github}

---

## PROFESSIONAL SUMMARY
Software Developer focused on backend engineering, data pipelines, cloud technologies, and intelligent applications. Experienced in architecting large-scale ETL/ELT pipelines, designing robust FastAPI microservices, and integrating Generative AI & vector search into production environments.

---

## CORE TECHNICAL SKILLS
- **Programming & Backend:** Python, FastAPI, REST APIs, SQL, Pandas
- **Data Engineering:** ETL/ELT Pipelines, Apache Spark, Delta Sharing, Parquet, Data Validation, Incremental Processing, Change Data Feed (CDF)
- **Cloud & DevOps:** AWS S3, AWS Glue, AWS Lambda, AWS ECS, AWS ECR, AWS RDS, AWS Secrets Manager, Jenkins, Docker, CI/CD
- **Databases:** PostgreSQL, MySQL, ChromaDB
- **AI & GenAI:** RAG Architectures, LangChain, LLM Integration, Vector Databases, Semantic Search, Gemini, Groq

---

## FEATURED PRODUCTION PROJECTS

### 1. Healthcare Data Engineering Platform
- Designed and engineered automated ETL pipelines for sensitive healthcare datasets.
- Implemented incremental extraction via Change Data Feed (CDF) and Snappy Parquet generation for AWS S3 lake storage.
- Integrated automated AWS Glue Data Catalog synchronization and Jenkins CI/CD execution.
- Implemented defensive record-count reconciliation and schema validation ensuring zero PHI data leakage.
- *Stack:* Python, AWS S3, AWS Glue, Apache Spark, Delta Sharing, Parquet, Jenkins, PostgreSQL

### 2. Intelligent Delivery & Logistics Tracking Engine
- Architected high-throughput backend tracking service with dynamic status workflows and route geofencing.
- Implemented real-time location streaming and defensive status validation with zero lost updates.
- *Stack:* Python, FastAPI, PostgreSQL, Docker, AWS ECS, REST APIs

### 3. Healthcare RAG & Clinical Knowledge Chatbot
- Engineered a retrieval-augmented clinical query system indexing sanitized medical documentation.
- Built HNSW semantic retrieval with ChromaDB vector store and Groq ultra-low latency inference.
- Implemented strict source citation verification and guardrails to prevent medical hallucination.
- *Stack:* Python, LangChain, ChromaDB, Groq, Gemini, FastAPI

### 4. Smart Personal Finance & Budget Analyzer
- Designed automated financial record aggregation pipeline processing multi-format transaction exports.
- Implemented expense categorization heuristics and deterministic cashflow forecast analytics.
- *Stack:* Python, Pandas, FastAPI, MySQL, Docker

---

## ARCHITECTURAL COMPETENCIES
- Defensive API Design (Pydantic validation, idempotent endpoints, rate-limiting)
- Zero-Downtime Container Deployments (AWS ECS Fargate, Docker Multi-Stage)
- Data Lake Governance (Snappy Parquet compression, Delta Sharing, Partition pruning)
- Vector Search Integration (ChromaDB embeddings, semantic similarity scoring)
`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdownResume);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      />

      {/* Modal Card (Apple VisionOS Liquid Frosted Glass Sheet) */}
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-[32px] sm:rounded-[40px] bg-slate-950/80 border border-white/[0.22] backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,0.95),inset_0_1.5px_2px_rgba(255,255,255,0.4)] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/[0.1] bg-white/[0.03]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/[0.08] border border-white/[0.18] text-cyan-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-wide">
                  Akshay Sharma — Curriculum Vitae
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold shadow-sm">
                  VERIFIED
                </span>
              </div>
              <p className="text-xs font-mono text-slate-300">
                Software Developer &bull; Data Engineer &bull; AI Enthusiast
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Copy ATS Markdown"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Copy ATS Markdown</span>
                </>
              )}
            </button>

            <a
              href="/api/resume"
              download
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors ml-1 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 font-sans text-slate-300">
          {/* Identity Header */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-white">Akshay Sharma</h1>
              <p className="text-cyan-400 font-mono text-xs mt-1">
                Software Developer | Python Developer | Data Engineer | AI/GenAI Enthusiast
              </p>
            </div>
            <div className="flex flex-col sm:items-end gap-1 font-mono text-xs text-slate-400">
              <a
                href={`mailto:${PORTFOLIO_CONFIG.contact.email}`}
                className="hover:text-cyan-300 transition-colors"
              >
                {PORTFOLIO_CONFIG.contact.email}
              </a>
              <a
                href={PORTFOLIO_CONFIG.personal.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>linkedin.com/in/akshay-pythondeveloper</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={PORTFOLIO_CONFIG.personal.socials.github}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>github.com/mobileexpert1</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Technical Competencies Matrix */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>Core Technical Stack</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                <span className="text-slate-400 block mb-1">Backend & APIs</span>
                <span className="text-white font-medium">Python, FastAPI, REST APIs, SQL, Pandas</span>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                <span className="text-slate-400 block mb-1">Data Engineering</span>
                <span className="text-emerald-300 font-medium">
                  ETL/ELT, Apache Spark, Delta Sharing, Parquet, CDF, Schema Validation
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                <span className="text-slate-400 block mb-1">Cloud Infrastructure</span>
                <span className="text-cyan-300 font-medium">
                  AWS S3, Glue, Lambda, ECS, ECR, RDS, Secrets Manager, Jenkins, Docker
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                <span className="text-slate-400 block mb-1">Databases & AI</span>
                <span className="text-indigo-300 font-medium">
                  PostgreSQL, MySQL, ChromaDB, RAG, LangChain, Gemini, Groq
                </span>
              </div>
            </div>
          </div>

          {/* Production Projects Showcase */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Enterprise Projects & Case Studies</span>
            </h2>

            <div className="space-y-4">
              {PORTFOLIO_CONFIG.projects.map((proj: { id: string; title: string; category: string; description: string; technologies: string[] }) => (
                <div
                  key={proj.id}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/25 transition-all"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <h3 className="text-sm font-bold text-white">{proj.title}</h3>
                    <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      {proj.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.technologies.map((t: string) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-black/40 border border-white/[0.08] text-[10px] font-mono text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-white/[0.08] bg-white/[0.02] flex items-center justify-between text-xs font-mono text-slate-400">
          <span className="hidden sm:inline-block">
            Press <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-white">Esc</kbd> to exit modal
          </span>
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={handleCopy}
              className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              {copied ? "Copied to clipboard!" : "Copy Markdown"}
            </button>
            <span>&bull;</span>
            <a
              href="/api/resume"
              download
              className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
            >
              Download PDF &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
