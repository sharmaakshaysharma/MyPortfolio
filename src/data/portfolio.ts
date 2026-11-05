export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  overview: string;
  problemStatement: string;
  solutionArchitecture: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
  keyWorkflows: string[];
  engineeringChallenges: { challenge: string; solution: string }[];
  keyContributions: string[];
  architectureDiagramId: string;
  links?: {
    github?: string;
    demo?: string;
    docs?: string;
  };
  securityNotes?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    experienceNotes: string;
    iconName?: string;
  }[];
}

export interface ArchitectureDiagram {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  flowSteps: {
    step: number;
    title: string;
    subtext: string;
    tech: string;
    badge: string;
    details: string;
  }[];
}

export interface JourneyMilestone {
  period: string;
  role: string;
  focus: string;
  summary: string;
  highlights: string[];
  technologies: string[];
}

export const PORTFOLIO_CONFIG = {
  personal: {
    name: "Akshay Sharma",
    surname: "Sharma",
    initials: "AS",
    title: "Software Developer & Data Engineer",
    roles: [
      "Software Developer",
      "Python Developer",
      "Data Engineer",
      "AI / GenAI Enthusiast",
    ],
    availability: {
      status: "Available for new opportunities",
      badge: "Open for High-Impact Roles & Consulting",
      isAvailable: true,
    },
    heroHeadline: "Building Intelligent Systems. Engineering Scalable Solutions.",
    heroSubtext:
      "I'm a Software Developer focused on backend engineering, data pipelines, cloud technologies, and intelligent applications. I enjoy transforming complex technical challenges into reliable, scalable solutions.",
    location: "Global / Remote",
    socials: {
      github: "https://github.com/mobileexpert1",
      githubUsername: "mobileexpert1",
      linkedin: "https://www.linkedin.com/in/akshay-pythondeveloper/",
      email: "akshaysharma38256@gmail.com",
    },
  },

  about: {
    headline: "Engineered for Reliability. Built for Scale.",
    bioParagraphs: [
      "I am a Software Developer and Data Engineer with a strong passion for designing scalable backend systems, dependable data pipelines, and intelligent AI-augmented workflows. My engineering philosophy revolves around building robust architectures that remain resilient under heavy loads and rigorous data integrity requirements.",
      "In data engineering, I have focused on large-scale ETL/ELT pipelines, particularly within healthcare domains where precision, validation, and zero data loss are mission-critical. I design workflows incorporating incremental extraction, Change Data Feed (CDF), Parquet lake storage, and automated Glue data cataloging to deliver clean, query-ready datasets.",
      "On the backend side, I specialize in Python and FastAPI, architecting clean RESTful APIs, containerizing services via Docker, and orchestrating deployments on AWS infrastructure. Lately, I am actively integrating Generative AI, vector embeddings, and RAG architectures to bring semantic intelligence to document processing and domain-specific knowledge retrieval.",
    ],
    corePrinciples: [
      {
        title: "Data Reliability & Integrity First",
        description:
          "Rigorous record validation, schema enforcement, and ACID guarantees ensure data pipelines are resilient and compliant with zero tolerance for corrupted records.",
      },
      {
        title: "Clean, Scalable Backend Services",
        description:
          "Modular API design using FastAPI, structured logging, defensive exception handling, and decoupled microservices that handle variable concurrency gracefully.",
      },
      {
        title: "Automated Cloud Workflows",
        description:
          "CI/CD automation, declarative infrastructure with AWS services (S3, Glue, ECS, RDS), and deterministic builds that eliminate manual operational bottlenecks.",
      },
      {
        title: "Pragmatic AI & RAG Engineering",
        description:
          "Grounding LLM capabilities in deterministic vector retrieval (ChromaDB, embeddings) to yield auditable, low-latency, and hallucination-resistant applications.",
      },
    ],
  },

  skillCategories: [
    {
      id: "backend",
      name: "Backend Development",
      description: "Building resilient APIs, high-performance services, and backend logic.",
      skills: [
        {
          name: "Python",
          experienceNotes:
            "Core language for APIs, data transformations, asynchronous workers, and AI pipelines.",
        },
        {
          name: "FastAPI",
          experienceNotes:
            "High-throughput asynchronous REST APIs with Pydantic type safety and automated OpenAPI specs.",
        },
        {
          name: "REST APIs",
          experienceNotes:
            "Resource-oriented endpoint design, auth workflows, payload validation, and clean versioning.",
        },
        {
          name: "SQL",
          experienceNotes:
            "Complex joins, window functions, indexing strategies, query plan analysis, and performance tuning.",
        },
        {
          name: "Pandas",
          experienceNotes:
            "Data wrangling, vectorized transformations, time-series operations, and statistical calculations.",
        },
      ],
    },
    {
      id: "data-engineering",
      name: "Data Engineering",
      description: "Architecting large-scale ETL pipelines, lakehouses, and real-time data flows.",
      skills: [
        {
          name: "ETL / ELT Pipelines",
          experienceNotes:
            "End-to-end extraction, transformation, quality gating, and analytical destination loading.",
        },
        {
          name: "Data Transformation",
          experienceNotes:
            "Normalization, schema evolution, deduplication, and high-integrity data enrichment.",
        },
        {
          name: "Apache Spark",
          experienceNotes:
            "Distributed dataframe computing, partitioned dataset writes, and cluster workload optimization.",
        },
        {
          name: "Delta Sharing",
          experienceNotes:
            "Secure, open data sharing protocol for sharing live data without replication overhead.",
        },
        {
          name: "Parquet",
          experienceNotes:
            "Columnar storage optimization, snappy compression, and partitioning strategies for rapid S3 query performance.",
        },
        {
          name: "Data Validation",
          experienceNotes:
            "Automated row count reconciliation, null check assertions, anomaly detection, and schema validation.",
        },
        {
          name: "Incremental Processing",
          experienceNotes:
            "Watermarking, delta timestamps, and high-efficiency change capture to minimize compute overhead.",
        },
        {
          name: "Change Data Feed (CDF)",
          experienceNotes:
            "Tracking row-level changes (inserts, updates, deletes) efficiently across pipeline stages.",
        },
      ],
    },
    {
      id: "cloud-devops",
      name: "Cloud & DevOps",
      description: "Managing enterprise cloud services, containerized workloads, and CI/CD pipelines.",
      skills: [
        {
          name: "AWS S3",
          experienceNotes:
            "Scalable data lake foundation, lifecycle policies, encryption-at-rest, and bucket policy access controls.",
        },
        {
          name: "AWS Glue",
          experienceNotes:
            "Serverless data integration, Glue crawlers, Data Catalog management, and metadata schema sync.",
        },
        {
          name: "AWS Lambda",
          experienceNotes:
            "Serverless event-driven execution for webhook ingestion and pipeline trigger handlers.",
        },
        {
          name: "AWS ECS & Fargate",
          experienceNotes:
            "Serverless container deployment, task definitions, autoscaling, and zero-server host management.",
        },
        {
          name: "AWS ECR",
          experienceNotes:
            "Secure private container registries with vulnerability scanning and multi-stage image tags.",
        },
        {
          name: "AWS RDS & Aurora",
          experienceNotes:
            "Managed relational databases, read replicas, automated backups, and VPC security isolation.",
        },
        {
          name: "AWS Secrets Manager",
          experienceNotes:
            "Secure storage and dynamic rotation of database credentials, API tokens, and private keys.",
        },
        {
          name: "Docker",
          experienceNotes:
            "Lightweight multi-stage container builds, predictable reproducible environments, and local dev parity.",
        },
        {
          name: "Jenkins",
          experienceNotes:
            "Automated declarative pipeline execution, scheduled ETL jobs, automated unit testing, and deployment gates.",
        },
        {
          name: "CI/CD",
          experienceNotes:
            "End-to-end continuous integration and deployment with automated test runs and rollback safeguards.",
        },
      ],
    },
    {
      id: "databases",
      name: "Databases & Storage",
      description: "Relational engines, document stores, and specialized vector databases.",
      skills: [
        {
          name: "PostgreSQL",
          experienceNotes:
            "Transactional integrity, complex analytical queries, foreign data wrappers, and schema migration management.",
        },
        {
          name: "MySQL",
          experienceNotes:
            "Relational modeling, indexing strategies, replication topology, and production query optimization.",
        },
        {
          name: "ChromaDB",
          experienceNotes:
            "Vector database for storing embeddings, cosine similarity searches, and metadata-filtered retrieval.",
        },
      ],
    },
    {
      id: "ai-genai",
      name: "AI & Generative AI",
      description: "Harnessing LLMs, semantic vector embeddings, and retrieval-augmented systems.",
      skills: [
        {
          name: "RAG Architecture",
          experienceNotes:
            "Retrieval-Augmented Generation workflows pairing vector knowledge bases with LLM context windows.",
        },
        {
          name: "LangChain",
          experienceNotes:
            "Chaining prompts, document loaders, chunking strategies, and retrieval QA pipelines.",
        },
        {
          name: "LLM Integration",
          experienceNotes:
            "Prompt engineering, structured JSON outputs, streaming token responses, and latency optimization.",
        },
        {
          name: "Vector Databases",
          experienceNotes:
            "High-dimensional vector indexing, HNSW algorithms, and hybrid keyword-vector retrieval.",
        },
        {
          name: "Semantic Search",
          experienceNotes:
            "Embedding text into dense vector spaces to enable conceptual search beyond keyword matching.",
        },
        {
          name: "Gemini",
          experienceNotes:
            "Embedding generation and multimodal reasoning using Google's frontier AI models.",
        },
        {
          name: "Groq",
          experienceNotes:
            "Ultra-low latency inference using Groq LPU systems for real-time generative responses.",
        },
      ],
    },
  ] as SkillCategory[],

  projects: [
    {
      id: "healthcare-etl-platform",
      title: "Healthcare Data Engineering Platform",
      category: "Data Engineering & Cloud",
      tagline:
        "Large-scale, HIPAA-conscious ETL pipeline processing sensitive healthcare datasets with Delta Sharing and AWS Glue.",
      description:
        "Designed and implemented high-throughput data extraction and transformation pipelines for sensitive healthcare data. Features automated schema synchronization, Delta Sharing integration, Parquet optimization, and automated Jenkins orchestration.",
      overview:
        "Engineered an enterprise healthcare data platform to ingest, clean, validate, and store large volumes of health records. Built with strict data privacy considerations, automated record count reconciliation, and incremental extraction via Change Data Feed (CDF).",
      problemStatement:
        "Healthcare datasets arrive with heterogeneous formats, inconsistent updates, and strict regulatory standards. The legacy system suffered from brittle batch failures, lack of incremental sync tracking, and lengthy query latency when analysts queried historical health records.",
      solutionArchitecture:
        "Built an automated Jenkins-driven pipeline that streams source records into raw S3 buckets, performs incremental extraction and reconciliation, writes optimized Snappy-compressed Parquet files, syncs table schemas with AWS Glue Data Catalog, and enables zero-copy partner sharing through Delta Sharing.",
      technologies: [
        "Python",
        "AWS S3",
        "AWS Glue",
        "Jenkins",
        "PostgreSQL",
        "Delta Sharing",
        "Parquet",
        "CDF",
      ],
      metrics: [
        { label: "Data Format", value: "Snappy Parquet" },
        { label: "Pipeline Automation", value: "100% Jenkins CI/CD" },
        { label: "Catalog Sync", value: "AWS Glue Catalog" },
        { label: "Sharing Protocol", value: "Delta Sharing (Zero-Copy)" },
      ],
      keyWorkflows: [
        "Automated source data ingestion with retry policies",
        "Incremental data extraction powered by Change Data Feed (CDF)",
        "Automated record count validation and schema conformance checks",
        "Optimized Parquet generation with partition pruning strategies",
        "AWS S3 data lake storage organized by bronze, silver, and gold tiers",
        "AWS Glue catalog synchronization for seamless Athena and analytical queries",
        "Delta Sharing integration for secure, compliant partner access",
      ],
      keyContributions: [
        "Engineered resilient Python ETL scripts handling schema drift and irregular date formats.",
        "Implemented rigorous record count and checksum verification, preventing silent data corruption.",
        "Integrated AWS Glue crawler automation to update metadata schemas on S3 writes.",
        "Constructed Jenkins declarative pipelines with automated Slack/email alerting on pipeline anomalies.",
      ],
      engineeringChallenges: [
        {
          challenge:
            "Handling frequent incremental updates without expensive full-table recomputations.",
          solution:
            "Leveraged Change Data Feed (CDF) and watermark timestamps to process only newly inserted or mutated records into the downstream delta lake.",
        },
        {
          challenge: "Zero data leakage and strict privacy compliance.",
          solution:
            "Enforced AWS S3 server-side encryption (SSE-KMS), segregated bucket access via IAM roles, and ensured synthetic masking of patient identifiers prior to analytical storage.",
        },
      ],
      architectureDiagramId: "healthcare-pipeline",
      securityNotes:
        "Built under zero-trust principles. All data encrypted in transit (TLS 1.3) and at rest (AWS KMS). Never exposes patient identifiers.",
    },
    {
      id: "thermoguid-ai",
      title: "ThermoGuideAI Backend Platform",
      category: "Backend & Cloud Architecture",
      tagline:
        "Intelligent heat-pump diagnostic and guidance system powered by a high-availability FastAPI and AWS ECS microservice architecture.",
      description:
        "Engineered the production backend API powering ThermoGuideAI. Containerized on AWS ECS Fargate with Application Load Balancing, Aurora PostgreSQL database, and automated Docker CI/CD.",
      overview:
        "ThermoGuideAI provides intelligent thermodynamic diagnostics and sizing calculations for heat pump systems. Designed as a high-concurrency, low-latency microservice architecture utilizing asynchronous Python (FastAPI), AWS container services, and secure credential management.",
      problemStatement:
        "Diagnostic calculations require complex thermodynamic formulas, sensor data ingestion, and rapid sub-second API responses. The application needed a scalable cloud infrastructure capable of autoscaling based on fluctuating usage spikes without operational management overhead.",
      solutionArchitecture:
        "Containerized FastAPI application deployed on AWS ECS Fargate behind an Application Load Balancer (ALB). Managed Aurora PostgreSQL for transactional and telemetry data, with container images stored in AWS ECR and secrets secured in AWS Secrets Manager.",
      technologies: [
        "Python",
        "FastAPI",
        "AWS ECS / Fargate",
        "AWS ECR",
        "AWS ALB",
        "Aurora RDS",
        "Docker",
        "PostgreSQL",
      ],
      metrics: [
        { label: "Framework", value: "FastAPI (Async)" },
        { label: "Deployment", value: "AWS ECS Fargate" },
        { label: "Containerization", value: "Docker Multi-Stage" },
        { label: "Database", value: "Amazon Aurora RDS" },
      ],
      keyWorkflows: [
        "High-performance REST API routing with Pydantic request validation",
        "Multi-stage Docker builds yielding minimal attack surface (<120MB images)",
        "Automated deployment to AWS ECS Fargate with zero-downtime rolling updates",
        "Application Load Balancer health checks and SSL termination",
        "Secure connection pooling to Amazon Aurora RDS using AWS Secrets Manager",
      ],
      keyContributions: [
        "Architected async endpoints in FastAPI, cutting p95 response latencies down to <60ms.",
        "Created production-grade Dockerfile configurations leveraging non-root execution and cache mounts.",
        "Configured AWS ECS task definitions, CPU/memory limits, and cloudwatch log streaming.",
        "Designed relational schema in PostgreSQL with strategic B-Tree indexing on diagnostic lookup keys.",
      ],
      engineeringChallenges: [
        {
          challenge:
            "Maintaining sub-second response times during concurrent diagnostic simulations.",
          solution:
            "Utilized asynchronous event loops in FastAPI along with asyncpg connection pools to eliminate database I/O blocking.",
        },
        {
          challenge: "Secure credential management in cloud deployments.",
          solution:
            "Eliminated hardcoded environment files by configuring dynamic AWS Secrets Manager integration at task bootstrap.",
        },
      ],
      architectureDiagramId: "fastapi-ecs",
      securityNotes:
        "Container runs as unprivileged user in private VPC subnets. Database access is strictly confined within security groups.",
    },
    {
      id: "ai-semantic-search-rag",
      title: "AI Semantic Search & RAG System",
      category: "AI & Generative AI",
      tagline:
        "Intelligent document intelligence and retrieval-augmented generation engine powered by ChromaDB, Gemini, and Groq.",
      description:
        "Developed an intelligent document search and Q&A engine utilizing dense vector embeddings, ChromaDB vector indexing, Gemini embedding models, and Groq high-speed LLM inference.",
      overview:
        "A complete RAG (Retrieval-Augmented Generation) pipeline that ingests heterogeneous technical documentation, executes semantic chunking, generates high-dimensional embeddings, and retrieves relevant passages to generate context-grounded answers with zero hallucination.",
      problemStatement:
        "Traditional keyword search (BM25) fails when querying technical domain manuals using conceptual or colloquial phrasing. Users needed an intelligent interface that understands semantic intent and generates verified, sourced answers from proprietary documentation.",
      solutionArchitecture:
        "Document ingestion engine splits text into recursive token chunks with overlap, generates embeddings via Gemini, indexes them into a local ChromaDB collection, and performs cosine similarity search. Relevant contexts are synthesized into prompts dispatched to Groq's high-speed inference engine for real-time streaming responses.",
      technologies: [
        "Python",
        "ChromaDB",
        "Gemini Embeddings",
        "Groq LLM",
        "RAG",
        "LangChain",
        "Vector Search",
      ],
      metrics: [
        { label: "Vector DB", value: "ChromaDB" },
        { label: "Embeddings", value: "Gemini Text Embeddings" },
        { label: "Inference Engine", value: "Groq LPU" },
        { label: "Search Paradigm", value: "Dense Semantic Vector" },
      ],
      keyWorkflows: [
        "Document parsing and recursive character text chunking with calibrated overlap",
        "Batch embedding generation via Gemini API with rate-limiting backoff",
        "Vector storage and cosine distance indexing in ChromaDB collections",
        "Top-k semantic retrieval with metadata filtering",
        "Context synthesis and prompt injection into Groq LLM for low-latency answers",
      ],
      keyContributions: [
        "Implemented custom chunking strategies preserving document hierarchy and tabular data.",
        "Integrated ChromaDB with persistent storage and metadata tagging for source citations.",
        "Built prompt orchestration pipelines enforcing grounded answers and explicit source attribution.",
        "Benchmarked embedding dimensions and similarity metrics to optimize retrieval recall.",
      ],
      engineeringChallenges: [
        {
          challenge:
            "Context window dilution and hallucinations when documents contain conflicting information.",
          solution:
            "Implemented strict system prompts demanding answers strictly derived from provided context snippets, returning 'Insufficient context' when confidence is low.",
        },
        {
          challenge: "Retrieval latency on complex queries.",
          solution:
            "Combined optimized vector indexing with Groq's ultra-fast token streaming, reducing time-to-first-token to under 300ms.",
        },
      ],
      architectureDiagramId: "rag-workflow",
      securityNotes:
        "Zero data retention policies configured on API gateways. Proprietary documents are processed locally into encrypted vector indexes.",
    },
  ] as Project[],

  architectureDiagrams: [
    {
      id: "healthcare-pipeline",
      title: "Healthcare ETL & Delta Lake Pipeline",
      subtitle:
        "Automated, HIPAA-conscious data processing with validation, Parquet optimization, and Delta Sharing",
      description:
        "Visualizing the end-to-end data lifecycle from source systems to secure partner distribution.",
      flowSteps: [
        {
          step: 1,
          title: "Raw Data Ingestion",
          subtext: "Encrypted transmission",
          tech: "Python / AWS S3",
          badge: "Ingest",
          details:
            "Raw healthcare transactions ingested into an encrypted S3 landing bucket with strict IAM controls.",
        },
        {
          step: 2,
          title: "Change Data Capture (CDF)",
          subtext: "Incremental extraction",
          tech: "Delta CDF / Watermarking",
          badge: "Extract",
          details:
            "Watermark timestamps and change feeds identify only modified or newly created records, reducing compute overhead.",
        },
        {
          step: 3,
          title: "Data Validation & Cleansing",
          subtext: "Record count & schema checks",
          tech: "Python / Pandas",
          badge: "Validate",
          details:
            "Automated assertions: null rate checks, row count reconciliation, and format verification to prevent corrupted writes.",
        },
        {
          step: 4,
          title: "Parquet Lake Storage",
          subtext: "Snappy compression",
          tech: "AWS S3 / Parquet",
          badge: "Transform",
          details:
            "Optimized columnar storage with partition pruning (year/month/day) enabling lightning-fast analytical queries.",
        },
        {
          step: 5,
          title: "AWS Glue Catalog Sync",
          subtext: "Schema metadata crawler",
          tech: "AWS Glue Data Catalog",
          badge: "Catalog",
          details:
            "Glue crawlers automatically register newly partitioned tables, keeping Athena and downstream BI systems in sync.",
        },
        {
          step: 6,
          title: "Delta Sharing Distribution",
          subtext: "Zero-copy secure sharing",
          tech: "Delta Sharing Protocol",
          badge: "Serve",
          details:
            "Secure, open protocol shares live datasets with authenticated partners without physical data duplication.",
        },
      ],
    },
    {
      id: "fastapi-ecs",
      title: "Resilient Cloud API on AWS ECS Fargate",
      subtitle:
        "High-availability containerized microservice with ALB and Aurora PostgreSQL",
      description:
        "Production backend architecture powering modern web and mobile applications with automated scaling.",
      flowSteps: [
        {
          step: 1,
          title: "Client Request & DNS",
          subtext: "TLS 1.3 encrypted",
          tech: "HTTPS / Route 53",
          badge: "Traffic",
          details:
            "Incoming requests pass through SSL termination and DDoS protection at the network edge.",
        },
        {
          step: 2,
          title: "Application Load Balancer",
          subtext: "Traffic distribution",
          tech: "AWS ALB",
          badge: "Routing",
          details:
            "Distributes incoming HTTP traffic across healthy ECS tasks with proactive health check probes.",
        },
        {
          step: 3,
          title: "FastAPI Async Services",
          subtext: "Multi-stage Docker containers",
          tech: "AWS ECS Fargate",
          badge: "Compute",
          details:
            "Non-root containerized tasks execute asynchronous Python endpoints with sub-60ms response times.",
        },
        {
          step: 4,
          title: "Secrets Injection",
          subtext: "Dynamic runtime credentials",
          tech: "AWS Secrets Manager",
          badge: "Security",
          details:
            "Tasks securely retrieve database credentials and API secrets into memory without hardcoded config files.",
        },
        {
          step: 5,
          title: "Database Tier",
          subtext: "Managed transactional store",
          tech: "Amazon Aurora RDS",
          badge: "Storage",
          details:
            "Highly available relational database with automated multi-AZ replication, connection pooling, and automated backups.",
        },
      ],
    },
    {
      id: "rag-workflow",
      title: "Semantic Search & RAG Retrieval Flow",
      subtitle:
        "Document ingestion, high-dimensional vector search, and LLM answer synthesis",
      description:
        "Step-by-step lifecycle of an intelligent query through dense vector embeddings and Groq LLM inference.",
      flowSteps: [
        {
          step: 1,
          title: "Document Ingestion",
          subtext: "PDFs, Markdown, Raw text",
          tech: "Python / Text Chunking",
          badge: "Ingestion",
          details:
            "Documents are cleaned and divided into recursive chunks with calibrated token overlap.",
        },
        {
          step: 2,
          title: "Embedding Generation",
          subtext: "Dense semantic vectors",
          tech: "Gemini Embeddings",
          badge: "Vectorize",
          details:
            "Text chunks are converted into dense vector representations capturing deep semantic meaning.",
        },
        {
          step: 3,
          title: "Vector Indexing",
          subtext: "HNSW nearest-neighbor search",
          tech: "ChromaDB",
          badge: "Index",
          details:
            "Indexed into ChromaDB collections with metadata tags for rapid cosine similarity matching.",
        },
        {
          step: 4,
          title: "Semantic Retrieval",
          subtext: "Top-k context match",
          tech: "Vector Search",
          badge: "Retrieve",
          details:
            "User queries are embedded in real time to fetch the top most semantically relevant documentation snippets.",
        },
        {
          step: 5,
          title: "Grounded Synthesis",
          subtext: "Real-time streaming inference",
          tech: "Groq LPU / LLM",
          badge: "Generate",
          details:
            "Retrieved passages and user prompt are synthesized into a verified, citation-backed response via Groq.",
        },
      ],
    },
  ] as ArchitectureDiagram[],

  journeyMilestones: [
    {
      period: "Focus: Data & Cloud Infrastructure",
      role: "Data Engineering & Pipeline Architecture",
      focus: "Enterprise Data Pipelines & Cloud Lakes",
      summary:
        "Specialized in architecting automated ETL workflows for sensitive domains. Focused on zero-loss data replication, Delta Sharing, AWS Glue cataloging, and automated Jenkins CI/CD.",
      highlights: [
        "Implemented incremental extraction with Change Data Feed (CDF) reducing compute load.",
        "Standardized Parquet data lake storage with partition optimization in AWS S3.",
        "Built automated record count validation routines to guarantee pipeline data integrity.",
      ],
      technologies: ["Python", "AWS S3", "AWS Glue", "Jenkins", "Delta Sharing", "Parquet"],
    },
    {
      period: "Focus: Backend & API Engineering",
      role: "Backend & Systems Development",
      focus: "High-Performance APIs & Containerization",
      summary:
        "Designed and built asynchronous RESTful microservices with FastAPI. Managed containerization, Docker multi-stage builds, AWS ECS Fargate deployments, and database schema optimization.",
      highlights: [
        "Constructed low-latency FastAPI services handling diagnostic and business logic.",
        "Configured AWS ECS Fargate, ALB, and secure credential handling via Secrets Manager.",
        "Optimized relational database schemas and queries in PostgreSQL and MySQL.",
      ],
      technologies: ["Python", "FastAPI", "Docker", "AWS ECS", "PostgreSQL", "Aurora RDS"],
    },
    {
      period: "Focus: AI & Semantic Applications",
      role: "AI & RAG Application Development",
      focus: "Generative AI, Vector Search & LLMs",
      summary:
        "Exploring and implementing pragmatic Generative AI applications. Architected Retrieval-Augmented Generation (RAG) pipelines pairing ChromaDB vector search with Gemini embeddings and Groq inference.",
      highlights: [
        "Engineered end-to-end RAG pipelines for domain-specific document search.",
        "Integrated vector databases with semantic retrieval and prompt engineering.",
        "Benchmarked low-latency inference using Groq LPU hardware.",
      ],
      technologies: ["ChromaDB", "Gemini", "Groq", "RAG", "LangChain", "Vector Search"],
    },
  ] as JourneyMilestone[],

  beyondCoding: [
    {
      title: "Exploring Generative AI Frontiers",
      description:
        "Continuously testing the latest embedding models, agentic workflows, and reasoning architectures to separate genuine engineering utility from hype.",
      icon: "Cpu",
    },
    {
      title: "Systems Architecture & Design Patterns",
      description:
        "Studying distributed systems, fault-tolerant consensus mechanisms, and event-driven architectures to build more resilient cloud software.",
      icon: "Boxes",
    },
    {
      title: "Modern Developer Tooling",
      description:
        "Refining automated workflows, declarative configs, and terminal tooling to maximize developer velocity and system reproducibility.",
      icon: "Terminal",
    },
    {
      title: "Building Practical Side Projects",
      description:
        "Translating new technical ideas into tangible, working software solutions that solve real-world productivity and data challenges.",
      icon: "Code2",
    },
  ],

  contact: {
    headline: "Have an Interesting Problem to Solve?",
    subtext:
      "I'm always interested in discussing software engineering, data engineering, cloud technologies, and innovative AI applications.",
    email: "akshaysharma38256@gmail.com",
    githubUrl: "https://github.com/sharmaakshaysharma",
    linkedinUrl: "https://www.linkedin.com/in/akshay-pythondeveloper/",
    statusText: "Usually responds within 24 hours",
  },
};

