import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { PORTFOLIO_CONFIG } from "@/data/portfolio";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "Akshay_Sharma_Resume.pdf");

  // If a binary PDF exists in public directory, stream it
  if (fs.existsSync(filePath)) {
    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Akshay_Sharma_Resume.pdf"',
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  // Structured Plain Text / Markdown Resume Fallback
  const resumeText = `================================================================================
AKSHAY SHARMA
${PORTFOLIO_CONFIG.personal.title}
Email: ${PORTFOLIO_CONFIG.personal.socials.email}
LinkedIn: ${PORTFOLIO_CONFIG.personal.socials.linkedin}
GitHub: ${PORTFOLIO_CONFIG.personal.socials.github}
================================================================================

EXECUTIVE SUMMARY
${PORTFOLIO_CONFIG.personal.heroSubtext}

TECHNICAL COMPETENCIES
- Programming & Backend: Python, FastAPI, REST APIs, SQL, Pandas
- Data Engineering: ETL/ELT Pipelines, Data Transformation, Apache Spark, Delta Sharing, Parquet, Data Validation, Incremental Data Processing, Change Data Feed (CDF)
- Cloud & DevOps: AWS S3, AWS Glue, AWS Lambda, AWS ECS/Fargate, AWS ECR, AWS RDS/Aurora, AWS Secrets Manager, Docker, Jenkins, CI/CD
- Databases: PostgreSQL, MySQL, ChromaDB
- AI & Generative AI: RAG Architecture, LangChain, LLM Integration, Vector Databases, Semantic Search, Gemini Embeddings, Groq

FEATURED ENGINEERING PROJECTS

1. Healthcare Data Engineering Platform
- Designed and implemented large-scale healthcare ETL pipelines processing sensitive datasets.
- Implemented incremental extraction via Change Data Feed (CDF) and Snappy Parquet generation.
- Automated AWS Glue Data Catalog synchronization and Jenkins deployment workflows.
- Guaranteed zero PHI data leakage with AWS KMS encryption.

2. ThermoGuideAI Backend Platform
- Architected high-throughput asynchronous REST APIs in FastAPI with p95 <60ms.
- Containerized on AWS ECS Fargate behind Application Load Balancers.
- Deployed Amazon Aurora RDS with dynamic credential injection via AWS Secrets Manager.

3. AI Semantic Search & RAG System
- Engineered end-to-end document ingestion, text chunking, and ChromaDB vector indexing.
- Benchmarked Gemini dense embeddings and Groq LPU inference for real-time grounded synthesis.

PROFESSIONAL EXPERIENCE & JOURNEY
- Data Engineering & Cloud Architecture: Focused on automated ETL, Delta Sharing, and AWS Glue.
- Backend & Systems Development: Built asynchronous FastAPI microservices and Docker containers.
- AI & Semantic Applications: Developed retrieval-augmented generation (RAG) and vector search.

================================================================================
Generated automatically by Akshay Sharma Portfolio System
`;

  return new NextResponse(resumeText, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": 'attachment; filename="Akshay_Sharma_Resume.txt"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}

