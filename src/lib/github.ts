import { PORTFOLIO_CONFIG } from "@/data/portfolio";

export interface GitHubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  stars: number;
  forks: number;
  language: string | null;
  topics: string[];
  updatedAt: string;
  isFork: boolean;
}

export interface GitHubActivityEvent {
  id: string;
  type: string;
  repoName: string;
  repoUrl: string;
  message?: string;
  createdAt: string;
}

export interface GitHubDataResponse {
  username: string;
  repositories: GitHubRepo[];
  recentActivity: GitHubActivityEvent[];
  isFallback: boolean;
  cachedAt: string;
}

// Fallback curated repositories in case GitHub API rate limits or network issues occur
const FALLBACK_REPOSITORIES: GitHubRepo[] = [
  {
    id: 101,
    name: "healthcare-etl-lakehouse",
    fullName: "akshay/healthcare-etl-lakehouse",
    description:
      "Enterprise healthcare ETL pipeline with Delta Sharing, AWS Glue catalog sync, and automated record count validation.",
    htmlUrl: "https://github.com/mobileexpert1/healthcare-etl-lakehouse",
    homepage: null,
    stars: 14,
    forks: 3,
    language: "Python",
    topics: ["data-engineering", "aws-glue", "delta-sharing", "parquet", "etl"],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    isFork: false,
  },
  {
    id: 102,
    name: "thermoguid-fastapi-backend",
    fullName: "akshay/thermoguid-fastapi-backend",
    description:
      "High-throughput asynchronous FastAPI microservice with ECS Fargate deployment, ALB health probes, and Aurora RDS.",
    htmlUrl: "https://github.com/mobileexpert1/thermoguid-fastapi-backend",
    homepage: null,
    stars: 22,
    forks: 5,
    language: "Python",
    topics: ["fastapi", "docker", "aws-ecs", "aurora-rds", "microservices"],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    isFork: false,
  },
  {
    id: 103,
    name: "chromadb-gemini-rag",
    fullName: "akshay/chromadb-gemini-rag",
    description:
      "Semantic search and context retrieval engine using ChromaDB vector store, Gemini embeddings, and Groq inference.",
    htmlUrl: "https://github.com/mobileexpert1/chromadb-gemini-rag",
    homepage: null,
    stars: 38,
    forks: 8,
    language: "Python",
    topics: ["rag", "chromadb", "gemini", "groq", "semantic-search"],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    isFork: false,
  },
  {
    id: 104,
    name: "aws-data-lake-automation",
    fullName: "akshay/aws-data-lake-automation",
    description:
      "Terraform and Python automation scripts for AWS S3 partitioning, lifecycle policies, and Glue crawlers.",
    htmlUrl: "https://github.com/mobileexpert1/aws-data-lake-automation",
    homepage: null,
    stars: 17,
    forks: 4,
    language: "Python",
    topics: ["aws", "s3", "glue", "automation", "data-lake"],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
    isFork: false,
  },
];

const FALLBACK_ACTIVITY: GitHubActivityEvent[] = [
  {
    id: "act-1",
    type: "PushEvent",
    repoName: "healthcare-etl-lakehouse",
    repoUrl: "https://github.com/mobileexpert1/healthcare-etl-lakehouse",
    message: "feat: add automated schema drift detection for S3 parquet writes",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },
  {
    id: "act-2",
    type: "PushEvent",
    repoName: "thermoguid-fastapi-backend",
    repoUrl: "https://github.com/mobileexpert1/thermoguid-fastapi-backend",
    message: "perf: optimize asyncpg connection pool parameters for ECS Fargate",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 42).toISOString(),
  },
  {
    id: "act-3",
    type: "PushEvent",
    repoName: "chromadb-gemini-rag",
    repoUrl: "https://github.com/mobileexpert1/chromadb-gemini-rag",
    message: "refactor: implement recursive token overlap chunking for domain manuals",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
  },
];

export async function fetchGitHubData(customUsername?: string): Promise<GitHubDataResponse> {
  const username =
    customUsername ||
    process.env.GITHUB_USERNAME ||
    "mobileexpert1";

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "AkshaySharma-Portfolio-App",
    };

    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    // Fetch public repos with Next.js 1-hour cache
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=12&type=public`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    );

    if (!reposRes.ok) {
      console.warn(`GitHub API repos returned ${reposRes.status}, falling back to curated data.`);
      return {
        username,
        repositories: FALLBACK_REPOSITORIES,
        recentActivity: FALLBACK_ACTIVITY,
        isFallback: true,
        cachedAt: new Date().toISOString(),
      };
    }

    const reposData = await reposRes.json();

    if (!Array.isArray(reposData)) {
      return {
        username,
        repositories: FALLBACK_REPOSITORIES,
        recentActivity: FALLBACK_ACTIVITY,
        isFallback: true,
        cachedAt: new Date().toISOString(),
      };
    }

    const parsedRepos: GitHubRepo[] = reposData
      .filter((repo: any) => !repo.fork && !repo.private)
      .slice(0, 6)
      .map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        htmlUrl: repo.html_url,
        homepage: repo.homepage,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        topics: repo.topics || [],
        updatedAt: repo.updated_at,
        isFork: repo.fork,
      }));

    // Fetch public events for commit activity
    let parsedActivity: GitHubActivityEvent[] = [];
    try {
      const eventsRes = await fetch(
        `https://api.github.com/users/${username}/events/public?per_page=10`,
        {
          headers,
          next: { revalidate: 3600 },
        }
      );

      if (eventsRes.ok) {
        const eventsData = await eventsRes.json();
        if (Array.isArray(eventsData)) {
          parsedActivity = eventsData
            .filter((event: any) => event.type === "PushEvent")
            .slice(0, 4)
            .map((event: any) => {
              const commitMsg =
                event.payload?.commits?.[0]?.message?.split("\n")?.[0] ||
                "Pushed updates to repository";
              return {
                id: event.id,
                type: event.type,
                repoName: event.repo?.name?.split("/")?.[1] || event.repo?.name,
                repoUrl: `https://github.com/${event.repo?.name}`,
                message: commitMsg,
                createdAt: event.created_at,
              };
            });
        }
      }
    } catch {
      // Activity fetch is non-blocking
    }

    return {
      username,
      repositories: parsedRepos.length > 0 ? parsedRepos : FALLBACK_REPOSITORIES,
      recentActivity: parsedActivity.length > 0 ? parsedActivity : FALLBACK_ACTIVITY,
      isFallback: false,
      cachedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error fetching live GitHub data:", error);
    return {
      username,
      repositories: FALLBACK_REPOSITORIES,
      recentActivity: FALLBACK_ACTIVITY,
      isFallback: true,
      cachedAt: new Date().toISOString(),
    };
  }
}
