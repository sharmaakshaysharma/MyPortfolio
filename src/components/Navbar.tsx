"use client";

import React, { useState, useEffect } from "react";
import { PORTFOLIO_CONFIG } from "@/data/portfolio";
import {
  Terminal,
  Menu,
  X,
  ArrowUpRight,
  Search,
  Download,
  Activity,
  Zap,
} from "lucide-react";

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenTerminal?: () => void;
  onOpenResume?: () => void;
}

export function Navbar({
  onOpenCommandPalette,
  onOpenTerminal,
  onOpenResume,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Architecture", href: "#architecture" },
    { name: "Open Source", href: "#opensource" },
    { name: "Journey", href: "#journey" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-8 left-0 right-0 z-40 transition-all duration-300 py-2 sm:py-3 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div
          className={`flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 ${
            scrolled
              ? "bg-white/[0.08] backdrop-blur-3xl border border-white/[0.22] shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1.2px_1.5px_rgba(255,255,255,0.4)]"
              : "bg-white/[0.05] backdrop-blur-2xl border border-white/[0.14] shadow-[0_12px_35px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.25)]"
          }`}
        >
          {/* Logo / Holographic Monogram */}
          <a
            href="#"
            className="flex items-center gap-3 group transition-transform active:scale-95"
            aria-label="Home"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-emerald-500/10 to-transparent border border-cyan-500/40 flex items-center justify-center group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all">
              <span className="font-mono font-bold text-sm text-cyan-300 group-hover:text-white transition-colors">
                {PORTFOLIO_CONFIG.personal.initials}
              </span>
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-cyber-pulse" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  {PORTFOLIO_CONFIG.personal.name}
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  v2.6
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                <span className="text-emerald-400 font-semibold">[SYS // ACTIVE]</span>
                <span className="text-slate-600">•</span>
                <span>Data &amp; AI</span>
              </span>
            </div>
          </a>

          {/* Desktop Nav Links (Apple Frosted Pill) */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.04] border border-white/[0.1] rounded-full px-3 py-1 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-mono text-slate-300 hover:text-white hover:bg-white/[0.1] rounded-full transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Area */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Terminal Trigger */}
            {onOpenTerminal && (
              <button
                onClick={onOpenTerminal}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 text-xs font-mono text-cyan-300 transition-all cursor-pointer shadow-[0_4px_15px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(0,240,255,0.35)]"
                title="Launch Terminal Console (Ctrl + K)"
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>CLI</span>
              </button>
            )}

            {/* Resume Preview/Download */}
            <button
              onClick={onOpenResume || (() => window.open("/api/resume", "_blank"))}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.15] border border-white/[0.16] text-xs font-mono text-slate-200 hover:text-white transition-all cursor-pointer shadow-[0_4px_15px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)]"
              title="Preview / Download Resume"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Resume</span>
            </button>

            {/* Command Palette Trigger */}
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.12] border border-white/[0.14] text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer shadow-[0_4px_15px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.25)]"
              title="Open Command Palette (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span>Search</span>
              <kbd className="text-[10px] bg-white/[0.1] px-1.5 py-0.5 rounded-full text-slate-300 border border-white/[0.15]">
                ⌘K
              </kbd>
            </button>

            {/* Direct Connect CTA (Apple Glow Pill) */}
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.5),inset_0_1px_1px_rgba(255,255,255,0.6)] hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] active:scale-95"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu & Search Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenCommandPalette}
              className="p-2 rounded-xl bg-white/[0.04] border border-cyan-500/25 text-slate-300 hover:text-cyan-400"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-cyan-400" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu (Cyberpunk HUD styling) */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 rounded-2xl bg-[#070b14]/95 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.9)] flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 text-xs font-mono text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-xl transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-[10px] text-slate-600">// NAV</span>
              </a>
            ))}
            <div className="pt-3 mt-1 border-t border-white/[0.08] flex flex-col gap-2">
              <a
                href="/api/resume"
                download
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-slate-200 font-mono text-xs flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Download Resume</span>
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 font-mono font-bold text-xs uppercase"
              >
                Initialize Connect
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
