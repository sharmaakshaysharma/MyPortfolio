"use client";

import React, { useState } from "react";
import { PORTFOLIO_CONFIG } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import confetti from "canvas-confetti";
import {
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  Send,
  Sparkles,
  MessageSquare,
  AlertCircle,
  Loader2,
  Terminal,
} from "lucide-react";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderSubject, setSenderSubject] = useState("Software / Data Engineering Opportunity");
  const [senderMessage, setSenderMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_CONFIG.contact.email);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#00ff9d", "#00f0ff", "#6366f1"],
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setStatusMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: senderName,
          email: senderEmail,
          subject: senderSubject,
          message: senderMessage,
          hp_website: honeypot,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitStatus("success");
        setStatusMessage("Message dispatched! Akshay has received your email and will respond promptly.");
        setSenderMessage("");
        confetti({
          particleCount: 75,
          spread: 75,
          origin: { y: 0.7 },
          colors: ["#00ff9d", "#00f0ff", "#38bdf8"],
        });
      } else {
        setSubmitStatus("error");
        setStatusMessage(data.error || "Failed to dispatch message via gateway.");
      }
    } catch (err: any) {
      setSubmitStatus("error");
      setStatusMessage("Transmission dropped. Please initiate contact via direct mailto.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMailtoFallback = () => {
    const mailtoUrl = `mailto:${PORTFOLIO_CONFIG.contact.email}?subject=${encodeURIComponent(
      `[Portfolio Inquiry] ${senderSubject} from ${senderName || "Visitor"}`
    )}&body=${encodeURIComponent(
      `Hi Akshay,\n\n${senderMessage}\n\nBest regards,\n${senderName}\n${senderEmail}`
    )}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#030508]">
      {/* Background Cyber Laser Horizon */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Headline, Channels & Direct Copy */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4 shadow-[0_0_12px_rgba(0,240,255,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-cyber-pulse" />
              <span>[ COMM // DISPATCH GATEWAY ]</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              {PORTFOLIO_CONFIG.contact.headline}
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mb-8">
              {PORTFOLIO_CONFIG.contact.subtext}
            </p>

            {/* Email Copy Card (Apple Frosted Glass) */}
            <div className="w-full max-w-md p-6 rounded-3xl bg-white/[0.05] border border-white/[0.15] backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.25)] mb-8">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 block mb-2 font-semibold">
                PRIMARY DIRECT ROUTING
              </span>
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-sm text-white font-medium truncate select-all">
                  {PORTFOLIO_CONFIG.contact.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/[0.2] text-xs font-mono text-cyan-300 transition-all cursor-pointer shrink-0 active:scale-95 shadow-[0_4px_15px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)]"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="mt-2 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{PORTFOLIO_CONFIG.contact.statusText}</span>
              </div>
            </div>

            {/* Social & Professional Links */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={PORTFOLIO_CONFIG.personal.socials.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.14] text-xs font-mono text-slate-300 hover:text-white transition-all shadow-sm"
              >
                <GithubIcon className="w-4 h-4 text-slate-400" />
                <span>GitHub Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </a>

              <a
                href={PORTFOLIO_CONFIG.personal.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.14] text-xs font-mono text-slate-300 hover:text-white transition-all shadow-sm"
              >
                <LinkedinIcon className="w-4 h-4 text-cyan-400" />
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Quick Inquiry Draft */}
          <div className="lg:col-span-6 w-full">
            <div className="rounded-[32px] sm:rounded-[40px] bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.015] border border-white/[0.18] backdrop-blur-3xl p-6 sm:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.85),inset_0_1.5px_2px_rgba(255,255,255,0.4)]">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-cyan-500/20">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold">
                  Direct Dispatch Console // SMTP
                </h3>
              </div>

              <form onSubmit={handleSendMessage} className="space-y-4">
                {/* Honeypot field for anti-spam (hidden from real users) */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="hp_website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-2 font-medium">
                      Your Identity / Name
                    </label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-2xl bg-white/[0.05] border border-white/[0.14] focus:border-cyan-400 focus:bg-white/[0.08] focus:shadow-[0_0_20px_rgba(0,240,255,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)] focus:outline-none text-xs text-white placeholder-slate-500 font-mono transition-all backdrop-blur-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-2 font-medium">
                      Your Email Route
                    </label>
                    <input
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 rounded-2xl bg-white/[0.05] border border-white/[0.14] focus:border-cyan-400 focus:bg-white/[0.08] focus:shadow-[0_0_20px_rgba(0,240,255,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)] focus:outline-none text-xs text-white placeholder-slate-500 font-mono transition-all backdrop-blur-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2 font-medium">
                    Subject / Project Domain
                  </label>
                  <select
                    value={senderSubject}
                    onChange={(e) => setSenderSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#090d18] border border-white/[0.14] focus:border-cyan-400 focus:outline-none text-xs text-white font-mono transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                  >
                    <option value="Software / Data Engineering Opportunity">
                      Software / Data Engineering Opportunity
                    </option>
                    <option value="Cloud Architecture / Backend Consulting">
                      Cloud Architecture / Backend Consulting
                    </option>
                    <option value="Generative AI / RAG Implementation">
                      Generative AI / RAG Implementation
                    </option>
                    <option value="Technical Collaboration & Systems Talk">
                      Technical Collaboration & Systems Talk
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2 font-medium">
                    Message Payload
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={senderMessage}
                    onChange={(e) => setSenderMessage(e.target.value)}
                    placeholder="Describe your technical requirements, systems problem, or role..."
                    className="w-full px-4 py-3 rounded-2xl bg-white/[0.05] border border-white/[0.14] focus:border-cyan-400 focus:bg-white/[0.08] focus:shadow-[0_0_20px_rgba(0,240,255,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)] focus:outline-none text-xs text-white placeholder-slate-500 font-mono resize-none transition-all backdrop-blur-xl"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 hover:from-cyan-300 hover:to-emerald-300 disabled:opacity-60 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_10px_30px_rgba(0,240,255,0.35),inset_0_1.2px_1.5px_rgba(255,255,255,0.6)] active:scale-98"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span>DISPATCHING PACKET VIA SMTP...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>DISPATCH MESSAGE TO AKSHAY</span>
                    </>
                  )}
                </button>

                {submitStatus === "success" && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-center gap-2 shadow-[0_0_15px_rgba(0,255,157,0.2)] animate-in fade-in">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{statusMessage}</span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs font-mono text-rose-300 space-y-2 animate-in fade-in">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>{statusMessage}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleMailtoFallback}
                      className="text-xs text-cyan-300 hover:underline block cursor-pointer"
                    >
                      Click here to launch local mail client (mailto) &rarr;
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
