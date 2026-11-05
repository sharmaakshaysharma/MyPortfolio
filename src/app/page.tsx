"use client";

import React, { useState, useEffect } from "react";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { TechnicalExpertise } from "@/components/TechnicalExpertise";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { ArchitectureShowcase } from "@/components/ArchitectureShowcase";
import { PipelineDAGVisualizer } from "@/components/PipelineDAGVisualizer";
import { LakehouseCalculator } from "@/components/LakehouseCalculator";
import { GitHubActivity } from "@/components/GitHubActivity";
import { ExperienceJourney } from "@/components/ExperienceJourney";
import { BeyondCoding } from "@/components/BeyondCoding";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { InteractiveTerminal } from "@/components/InteractiveTerminal";
import { ResumeModal } from "@/components/ResumeModal";
import { SystemHealthBar } from "@/components/SystemHealthBar";

export default function Home() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [selectedArchitectureId, setSelectedArchitectureId] = useState<string>("healthcare-pipeline");

  // Global keydown listeners for quick access
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Backtick or Ctrl+` opens terminal
      if (e.key === "`" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
      // Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavigateToArchitecture = (diagramId: string) => {
    setSelectedArchitectureId(diagramId);
    const element = document.getElementById("architecture");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-[#030508] text-[#f1f5f9] relative selection:bg-cyan-500/30 selection:text-white">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* DevOps Cluster Health & Status Pill */}
      <div className="pt-0">
        <SystemHealthBar
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenResume={() => setResumeModalOpen(true)}
        />
      </div>

      {/* Navigation Bar */}
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenResume={() => setResumeModalOpen(true)}
      />

      {/* Futuristic Cockpit Hero Section with Particle Nebula & Live Typewriter */}
      <Hero
        onOpenResume={() => setResumeModalOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* About Section */}
      <AboutSection />

      {/* Technical Expertise & Tooling Matrix */}
      <TechnicalExpertise />

      {/* Featured Projects (Editorial Case Studies) */}
      <FeaturedProjects
        onNavigateToArchitecture={handleNavigateToArchitecture}
      />

      {/* System Design & Architecture Showcase */}
      <ArchitectureShowcase activeDiagramId={selectedArchitectureId} />

      {/* Interactive DAG ETL Pipeline Simulation & Code Inspector */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <PipelineDAGVisualizer />
      </section>

      {/* AWS Lakehouse Cost & Latency Benchmark Engine */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <LakehouseCalculator />
      </section>

      {/* Automated GitHub Open Source & Commits Activity */}
      <GitHubActivity />

      {/* Experience & Journey */}
      <ExperienceJourney />

      {/* Beyond Routine Coding */}
      <BeyondCoding />

      {/* Functional SMTP Contact Gateway */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Interactive Hacker CLI / Terminal Modal */}
      <InteractiveTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onOpenResumeModal={() => {
          setTerminalOpen(false);
          setResumeModalOpen(true);
        }}
      />

      {/* Instant Resume Quick-Preview & ATS Markdown Copy Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      {/* Command Palette (Search) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectArchitecture={handleNavigateToArchitecture}
      />
    </main>
  );
}
