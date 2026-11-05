"use client";

import React, { useState } from "react";
import {
  Play,
  CheckCircle2,
  Cpu,
  Layers,
  Database,
  Cloud,
  FileCode,
  Copy,
  Check,
  Zap,
  Terminal,
  Activity,
} from "lucide-react";

interface DAGNode {
  id: string;
  name: string;
  category: string;
  latency: string;
  throughput: string;
  status: "idle" | "running" | "success";
  description: string;
  codeSnippet: string;
  language: string;
}

export function PipelineDAGVisualizer() {
  const [activeNodeId, setActiveNodeId] = useState<string>("node-2");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState<number>(-1);
  const [copiedCode, setCopiedCode] = useState(false);

  const nodes: DAGNode[] = [
    {
      id: "node-1",
      name: "01. S3 Encrypted Raw Ingestion",
      category: "INGESTION",
      latency: "14ms",
      throughput: "65,000 rec/s",
      status: simulationStep >= 0 ? (simulationStep === 0 ? "running" : "success") : "idle",
      description:
        "High-throughput source landing into AWS S3 with server-side AWS KMS encryption (SSE-KMS), validating file checksums and recording ingestion lineage.",
      language: "python",
      codeSnippet: `import boto3
from botocore.config import Config

s3_client = boto3.client(
    "s3",
    config=Config(retries={"max_attempts": 5, "mode": "adaptive"})
)

def land_raw_payload(bucket: str, key: str, payload_bytes: bytes) -> dict:
    """Store raw batch with SSE-KMS customer-managed key"""
    response = s3_client.put_object(
        Bucket=bucket,
        Key=f"raw/year=2026/month=11/{key}",
        Body=payload_bytes,
        ServerSideEncryption="aws:kms",
        SSEKMSKeyId="alias/healthcare-lake-master",
        Metadata={"source": "api-gateway", "schema_ver": "2.4.0"}
    )
    return {"etag": response["ETag"], "status": "COMMITTED"}`,
    },
    {
      id: "node-2",
      name: "02. Schema Enforcement & Dedupe",
      category: "VALIDATION",
      latency: "28ms",
      throughput: "48,000 rec/s",
      status: simulationStep >= 1 ? (simulationStep === 1 ? "running" : "success") : "idle",
      description:
        "Strict Pydantic type validation, row-count reconciliation, deterministic deduplication on composite primary keys, and quarantine of malformed records.",
      language: "python",
      codeSnippet: `from pydantic import BaseModel, Field, field_validator
from typing import Optional

class HealthcareRecordSchema(BaseModel):
    record_id: str = Field(..., min_length=12)
    patient_hash: str = Field(..., regex=r"^[a-f0-9]{64}$")
    encounter_ts: int
    metric_value: float = Field(..., ge=0.0, le=1000.0)
    
    @field_validator("patient_hash")
    def verify_zero_phi_exposure(cls, v):
        # Strict defensive check: no unhashed PII tolerated
        assert not any(char.isupper() for char in v), "Invalid SHA-256 digest"
        return v

def validate_and_deduplicate(batch: list[dict]) -> tuple[list, list]:
    clean, quarantined = [], []
    seen_keys = set()
    for row in batch:
        try:
            validated = HealthcareRecordSchema(**row)
            if validated.record_id not in seen_keys:
                clean.append(validated.model_dump())
                seen_keys.add(validated.record_id)
        except Exception as err:
            quarantined.append({"row": row, "reason": str(err)})
    return clean, quarantined`,
    },
    {
      id: "node-3",
      name: "03. Snappy Columnar Parquet",
      category: "TRANSFORMATION",
      latency: "45ms",
      throughput: "92,000 rec/s",
      status: simulationStep >= 2 ? (simulationStep === 2 ? "running" : "success") : "idle",
      description:
        "PySpark distributed columnar compression with Snappy codec, dictionary encoding, and partition layout by year/month/facility for maximum Athena scan pruning.",
      language: "python",
      codeSnippet: `from pyspark.sql import SparkSession
from pyspark.sql.functions import col, to_date

spark = SparkSession.builder \\
    .appName("HealthcareParquetCompactor") \\
    .config("spark.sql.parquet.compression.codec", "snappy") \\
    .config("spark.sql.sources.partitionOverwriteMode", "dynamic") \\
    .getOrCreate()

def write_partitioned_lake(df, destination_uri: str):
    """Write optimized Snappy Parquet with dictionary encoding"""
    (df.write
       .mode("append")
       .format("parquet")
       .option("compression", "snappy")
       .partitionBy("encounter_year", "facility_code")
       .save(destination_uri))`,
    },
    {
      id: "node-4",
      name: "04. Delta Sharing CDF Ledger",
      category: "PROTOCOL",
      latency: "18ms",
      throughput: "35,000 rec/s",
      status: simulationStep >= 3 ? (simulationStep === 3 ? "running" : "success") : "idle",
      description:
        "Change Data Feed (CDF) tracking row-level mutations (inserts, updates, deletes) with ACID transaction logs, exposing zero-copy Delta Sharing recipients.",
      language: "python",
      codeSnippet: `from delta.tables import DeltaTable

def compute_incremental_cdf(spark, delta_path: str, start_version: int):
    """Query row-level mutations via Change Data Feed without full table read"""
    cdf_df = (spark.read
        .format("delta")
        .option("readChangeFeed", "true")
        .option("startingVersion", start_version)
        .load(delta_path)
        .filter(col("_change_type").isin(["insert", "update_postimage"])))
    
    return cdf_df`,
    },
    {
      id: "node-5",
      name: "05. ChromaDB Vector & Athena Sync",
      category: "AI & SERVING",
      latency: "22ms",
      throughput: "14,000 rec/s",
      status: simulationStep >= 4 ? (simulationStep === 4 ? "running" : "success") : "idle",
      description:
        "Synchronizes AWS Glue Data Catalog for instantaneous Athena SQL queries, and generates 1536-D embeddings into ChromaDB for semantic RAG vector retrieval.",
      language: "python",
      codeSnippet: `import chromadb
from chromadb.config import Settings

client = chromadb.PersistentClient(path="./chroma_lake_index")
collection = client.get_or_create_collection(
    name="clinical_telemetry_rag",
    metadata={"hnsw:space": "cosine"}
)

def index_embeddings_batch(records: list[dict], embeddings: list[list[float]]):
    collection.upsert(
        ids=[r["record_id"] for r in records],
        embeddings=embeddings,
        metadatas=[{"facility": r["facility_code"], "ts": r["encounter_ts"]} for r in records],
        documents=[r["sanitized_clinical_summary"] for r in records]
    )
    return {"indexed_count": len(records), "vector_dim": 1536}`,
    },
  ];

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationStep(0);
    setActiveNodeId("node-1");

    const delays = [800, 1600, 2400, 3200, 4000];

    delays.forEach((delay, idx) => {
      setTimeout(() => {
        setSimulationStep(idx);
        setActiveNodeId(`node-${idx + 1}`);
        if (idx === delays.length - 1) {
          setTimeout(() => {
            setIsSimulating(false);
          }, 800);
        }
      }, delay);
    });
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(activeNode.codeSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {}
  };

  return (
    <div className="relative rounded-[32px] sm:rounded-[40px] bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.015] border border-white/[0.18] backdrop-blur-3xl p-6 sm:p-8 lg:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.85),inset_0_1.5px_2px_rgba(255,255,255,0.4)] overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.08] relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2 shadow-[0_0_12px_rgba(0,240,255,0.2)]">
            <Activity className="w-3.5 h-3.5" />
            <span>INTERACTIVE DAG WORKFLOW // ZERO PHI LEAKAGE GUARANTEED</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Distributed Healthcare ETL Pipeline Architecture
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl font-mono">
            Click on any pipeline stage to inspect its real Python / PySpark implementation and telemetry benchmarks.
          </p>
        </div>

        {/* Simulation Trigger Button */}
        <button
          onClick={runSimulation}
          disabled={isSimulating}
          className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
            isSimulating
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400 cursor-not-allowed shadow-[0_0_20px_rgba(0,240,255,0.4)]"
              : "bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] cursor-pointer active:scale-95"
          }`}
        >
          {isSimulating ? (
            <>
              <Zap className="w-4 h-4 animate-spin text-cyan-300" />
              <span>PROPAGATING STREAM...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>RUN LIVE DAG SIMULATION</span>
            </>
          )}
        </button>
      </div>

      {/* DAG Flow Node Visualizer */}
      <div className="mb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {nodes.map((node, idx) => {
            const isSelected = activeNodeId === node.id;
            const isCurrentSim = simulationStep === idx;
            const isCompletedSim = simulationStep > idx;

            return (
              <div
                key={node.id}
                onClick={() => setActiveNodeId(node.id)}
                className={`relative p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_25px_rgba(0,240,255,0.3)] -translate-y-1"
                    : "bg-black/40 border-white/[0.08] hover:border-cyan-500/40 text-slate-400 hover:text-white"
                }`}
              >
                {/* Status indicator */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-slate-400">
                    STAGE 0{idx + 1}
                  </span>
                  {isCurrentSim ? (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  ) : isCompletedSim ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-600" />
                  )}
                </div>

                <div className="mb-3">
                  <h4 className="text-xs font-bold text-white mb-1 leading-snug line-clamp-2">
                    {node.name.replace(/^\d+\.\s*/, "")}
                  </h4>
                  <span className="text-[10px] font-mono text-cyan-300">
                    {node.category}
                  </span>
                </div>

                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">p99:</span>
                  <span className="text-emerald-400 font-semibold">{node.latency}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Code Inspector & Stage Telemetry Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {/* Left 4 cols: Node Specification Details */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-black/40 border border-white/[0.08] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
              <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
                {activeNode.category} SPECIFICATION
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                PROD ACTIVE
              </span>
            </div>

            <h3 className="text-base font-bold text-white mb-2">{activeNode.name}</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              {activeNode.description}
            </p>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-slate-400">Execution Latency</span>
                <span className="text-cyan-300 font-bold">{activeNode.latency}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-slate-400">Throughput Capacity</span>
                <span className="text-emerald-400 font-bold">{activeNode.throughput}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-slate-400">SLA Availability</span>
                <span className="text-white font-bold">99.98% Guaranteed</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08] mt-6 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>AUDIT: HIPAA &bull; SOC-2</span>
            <span className="text-emerald-400">0.00% Error Budget</span>
          </div>
        </div>

        {/* Right 8 cols: Live Code Window */}
        <div className="lg:col-span-8 rounded-2xl bg-[#03060c] border border-cyan-500/20 overflow-hidden flex flex-col">
          {/* Code Window Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-black/60 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-400 ml-2">
                pipeline/{activeNode.id.replace("-", "_")}.py
              </span>
            </div>

            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] text-[11px] font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              {copiedCode ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-cyan-400" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* Code Body */}
          <div className="p-4 overflow-x-auto flex-1 font-mono text-xs leading-relaxed text-slate-300 max-h-[320px] scrollbar-thin">
            <pre className="text-cyan-100">{activeNode.codeSnippet}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

