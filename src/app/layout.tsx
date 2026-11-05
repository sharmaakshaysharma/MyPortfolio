import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PORTFOLIO_CONFIG } from "@/data/portfolio";
import { CustomCursor } from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: `${PORTFOLIO_CONFIG.personal.name} | ${PORTFOLIO_CONFIG.personal.title}`,
  description: PORTFOLIO_CONFIG.personal.heroSubtext,
  keywords: [
    "Software Developer",
    "Data Engineer",
    "Python Developer",
    "FastAPI",
    "ETL Pipelines",
    "Delta Sharing",
    "Apache Spark",
    "AWS Glue",
    "AWS S3",
    "AWS ECS Fargate",
    "Docker",
    "RAG",
    "Generative AI",
    "ChromaDB",
    "Groq",
    "PostgreSQL",
  ],
  authors: [{ name: PORTFOLIO_CONFIG.personal.name }],
  creator: PORTFOLIO_CONFIG.personal.name,
  openGraph: {
    title: `${PORTFOLIO_CONFIG.personal.name} — ${PORTFOLIO_CONFIG.personal.title}`,
    description: PORTFOLIO_CONFIG.personal.heroSubtext,
    type: "profile",
    locale: "en_US",
    siteName: `${PORTFOLIO_CONFIG.personal.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${PORTFOLIO_CONFIG.personal.name} | ${PORTFOLIO_CONFIG.personal.title}`,
    description: PORTFOLIO_CONFIG.personal.heroSubtext,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#030508",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: PORTFOLIO_CONFIG.personal.name,
        jobTitle: PORTFOLIO_CONFIG.personal.title,
        description: PORTFOLIO_CONFIG.personal.heroSubtext,
        url: "https://akshaysharma.dev",
        sameAs: [
          PORTFOLIO_CONFIG.personal.socials.linkedin,
          PORTFOLIO_CONFIG.personal.socials.github,
        ],
        knowsAbout: [
          "Python",
          "FastAPI",
          "Data Engineering",
          "ETL Pipelines",
          "Apache Spark",
          "Delta Sharing",
          "AWS Cloud Infrastructure",
          "Docker",
          "Retrieval-Augmented Generation (RAG)",
          "Vector Databases",
        ],
      },
      {
        "@type": "WebSite",
        name: `${PORTFOLIO_CONFIG.personal.name} Portfolio`,
        url: "https://akshaysharma.dev",
        description: PORTFOLIO_CONFIG.personal.heroSubtext,
      },
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#030508] text-[#f8fafc] antialiased min-h-screen selection:bg-cyan-500/30 selection:text-white">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
