"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FrontlineLogoMark from "@/components/FrontlineLogoMark";

const HOW_STEPS = [
  {
    num: 1,
    title: "E&A Advisory sets you up",
    desc: "The team at E&A Advisory creates your TaxFlowAI account, links your tax obligations, and configures your lodgement calendar. Real accountants. Real setup.",
    icon: "gear",
  },
  {
    num: 2,
    title: "You get access to your portal",
    desc: "Log in to your personal dashboard and see all your upcoming lodgements, deadlines, and documents in one clear view.",
    icon: "key",
  },
  {
    num: 3,
    title: "Upload documents as requested",
    desc: "When your accountant needs something, you'll get notified. Upload directly through the portal — no more email attachments or lost documents.",
    icon: "upload",
  },
  {
    num: 4,
    title: "Stay on top of every deadline",
    desc: "TaxFlowAI tracks every ATO deadline and keeps you informed. No more surprises, no more penalties for missing lodgement dates.",
    icon: "calendar",
  },
];

const SERVICES = [
  "Individual Tax Returns",
  "Business Tax Returns",
  "BAS & GST Lodgements",
  "PAYG Withholding",
  "Payroll & STP",
  "Bookkeeping & Cloud Accounting",
  "ASIC & Corporate Secretarial",
  "Capital Gains Tax",
  "Fringe Benefits Tax",
  "Startup & Entity Structuring",
  "Investment Property Tax",
  "ATO Correspondence & Audits",
];

function StepIcon({ type, className }) {
  const c = className ?? "h-10 w-10 flex-shrink-0 text-[#00FCB8]";
  switch (type) {
    case "gear":
      return (
        <svg className={c} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case "key":
      return (
        <svg className={c} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      );
    case "upload":
      return (
        <svg className={c} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
      );
    case "calendar":
      return (
        <svg className={c} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    default:
      return null;
  }
}

const TRUST_TICKER_ITEMS = [
  "✓ Registered Tax Agent",
  "✓ CPA Qualified",
  "✓ 2,800+ Returns Lodged",
  "✓ E&A Advisory Pty Ltd",
  "✓ 5/5 Google Reviews",
  "✓ Australian Owned",
];

export default function TaxFlowPage() {
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.target.id) setVisibleSections((s) => new Set(s).add(e.target.id));
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" }
    );
    const sections = document.querySelectorAll("[data-taxflow-section]");
    sections.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A1628] font-sans text-white">
      {/* Brand switcher bar — smaller, muted */}
      <div className="border-b border-white/[0.06] bg-[#0A1628] px-4 py-1.5 md:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex flex-1 items-center justify-center gap-0">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-t-lg px-3 py-1.5 text-xs font-medium text-gray-500 transition hover:text-gray-400"
            >
              <FrontlineLogoMark className="h-4 w-auto [&_rect]:fill-current" />
              Frontline Financial
            </Link>
            <Link
              href="/taxflow"
              className="inline-flex items-center gap-1.5 rounded-t-lg border-b-[2px] border-[#00FCB8] bg-white/5 px-3 py-1.5 text-xs font-medium text-[#00FCB8]"
            >
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" /></svg>
              TaxFlowAI
            </Link>
          </div>
          <a href="tel:+61422959486" className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-white/70 transition hover:text-white/90">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            +61 422 959 486
          </a>
        </div>
      </div>

      {/* TAXFLOWAI NAVBAR — subtle border, logo shimmer, link underlines */}
      <header className="border-b border-white/[0.06] bg-[#0A1628]">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6 lg:px-8">
          <Link href="/taxflow" className="shrink-0 text-lg font-extrabold md:text-xl">
            <span className="text-white">TaxFlow</span>
            <span className="taxflow-logo-ai-shimmer">AI</span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="taxflow-nav-link text-sm font-medium text-white/90 transition hover:text-[#00FCB8]">Features</a>
            <a href="#how-it-works" className="taxflow-nav-link text-sm font-medium text-white/90 transition hover:text-[#00FCB8]">How It Works</a>
            <a href="#pricing" className="taxflow-nav-link text-sm font-medium text-white/90 transition hover:text-[#00FCB8]">Pricing</a>
            <a href="#about" className="taxflow-nav-link text-sm font-medium text-white/90 transition hover:text-[#00FCB8]">About</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="#signin" className="taxflow-btn-ghost rounded-lg border border-white/30 px-4 py-2 text-sm font-bold text-white transition">Sign In</a>
            <a href="#get-started" className="taxflow-btn-primary rounded-lg bg-[#00FCB8] px-4 py-2 text-sm font-bold text-[#0A1628] transition hover:brightness-110">Get Started Free</a>
          </div>
        </nav>
        <div className="bg-[#060D1A] py-1.5 text-center text-xs text-gray-500">
          Tax services supervised by E&amp;A Advisory Pty Ltd · Registered Tax Agent
        </div>
      </header>

      {/* 1. HERO — asymmetric split, left-aligned, depth background */}
      <section className="relative overflow-hidden px-4 pt-12 pb-20 md:px-6 md:pt-16 md:pb-28 lg:px-8" style={{ background: "radial-gradient(ellipse 80% 80% at 30% 40%, #0E1E35 0%, #0A1628 60%)" }}>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" aria-hidden />
        <div className="pointer-events-none absolute right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[#00FCB8] opacity-[0.04] blur-[100px]" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* Left 60% — heading, copy, buttons, trust */}
          <div className="max-w-xl text-left">
            <h1 className="taxflow-hero-heading text-white">
              Every Australian deserves a real <span className="text-[#00FCB8]">accountant.</span>
            </h1>
            <p className="mt-6 max-w-[500px] text-lg text-gray-400 md:text-xl">
              Most people don&apos;t have one. They miss deadlines. They overpay on tax. They lose documents in email threads. TaxFlowAI exists to fix that — for every single Australian who needs it.
            </p>
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
              <a href="#get-started" className="taxflow-btn-primary inline-flex w-full items-center justify-center rounded-lg bg-[#00FCB8] px-10 py-4 font-bold text-[#0A1628] transition sm:w-auto">
                Get Started Free
              </a>
              <a href="#how-it-works" className="taxflow-btn-ghost inline-flex w-full items-center justify-center rounded-lg border-2 border-white/40 px-10 py-4 font-bold text-white transition sm:w-auto">
                See how it works
              </a>
            </div>
            <p className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500">
              <span>✓ Free to get started</span>
              <span>✓ No credit card required</span>
              <span>✓ Tax services by E&amp;A Advisory Pty Ltd</span>
            </p>
          </div>
          {/* Right 40% — floating dashboard preview, angled, glassmorphism */}
          <div className="flex justify-center lg:justify-end">
            <div className="taxflow-card-float w-full max-w-md rotate-3 rounded-2xl border border-white/10 bg-[#111827]/90 shadow-2xl backdrop-blur-sm" style={{ boxShadow: "0 25px 50px -12px rgba(0,0,0,0.4), 0 0 60px -10px rgba(0,252,184,0.08)" }}>
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="flex gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-white/90">TaxFlowAI — Dashboard</span>
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00FCB8] text-[10px] font-bold text-[#0A1628]">EA</div>
              </div>
              <div className="grid gap-4 p-4 md:grid-cols-[1fr_auto]">
                <div>
                  <h3 className="mb-3 text-sm font-bold text-white">Your Lodgements</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-lg bg-white/5 px-2.5 py-1.5">
                      <span className="truncate text-xs text-white">Income Tax FY2025</span>
                      <span className="shrink-0 rounded-full bg-emerald-500/90 px-1.5 py-0.5 text-[10px] font-medium text-white">Lodged</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-white/5 px-2.5 py-1.5">
                      <span className="truncate text-xs text-white">BAS Q2 FY2026</span>
                      <span className="shrink-0 rounded-full bg-amber-500/90 px-1.5 py-0.5 text-[10px] font-medium text-white">Due 28 Feb</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-white/5 px-2.5 py-1.5">
                      <span className="truncate text-xs text-white">PAYG Jan</span>
                      <span className="shrink-0 rounded-full bg-[#39B2B2]/90 px-1.5 py-0.5 text-[10px] font-medium text-white">In Progress</span>
                    </div>
                  </div>
                  <p className="mt-3 text-[10px] text-[#00FCB8]">→ Upload bank statements</p>
                </div>
                <div className="space-y-2">
                  <div className="rounded-lg bg-white/5 p-2.5">
                    <p className="text-lg font-bold tabular-nums text-[#00FCB8]">3</p>
                    <p className="text-[10px] text-gray-500">Active</p>
                  </div>
                  <div className="rounded-lg bg-white/5 p-2.5">
                    <p className="text-sm font-bold tabular-nums text-white">28 Feb</p>
                    <p className="text-[10px] text-gray-500">Next</p>
                  </div>
                  <div className="rounded-lg border border-white/10 p-2.5">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-[#00FCB8] text-[10px] font-bold leading-6 text-[#0A1628]">EA</div>
                      <span className="text-[10px] text-white">E&amp;A Advisory</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 h-24 w-full bg-gradient-to-b from-transparent to-[#111827]" aria-hidden />
      </section>

      {/* 2. TRUST — scrolling ticker */}
      <section className="overflow-hidden border-y border-white/10 bg-[#111827] py-4">
        <div className="taxflow-ticker w-max px-4">
          {[...TRUST_TICKER_ITEMS, ...TRUST_TICKER_ITEMS].map((item, i) => (
            <span key={i} className="shrink-0 text-sm font-medium text-white/80">{item}</span>
          ))}
        </div>
      </section>

      {/* PROVOCATIVE STATEMENT STRIP */}
      <section className="bg-[#00FCB8] py-8">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6 lg:px-8">
          <p className="text-3xl font-bold text-[#0A1628]">
            Millions of Australians lodge their tax late every year.
          </p>
          <p className="mt-4 text-xl text-[#0A1628]">
            Most of them just needed a better system. This is it.
          </p>
        </div>
      </section>

      {/* 3. HOW IT WORKS — alternating layout, left border accent */}
      <section id="how-it-works" data-taxflow-section className="bg-[#0A1628] px-4 py-20 md:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-[#00FCB8]" aria-hidden />
            <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">THE PROCESS</p>
            <span className="h-px w-8 bg-[#00FCB8]" aria-hidden />
          </div>
          <h2 className="mt-4 text-center text-4xl font-bold text-white md:text-5xl" style={{ fontFamily: "var(--font-heading-tf), system-ui" }}>
            Up and running in minutes.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-400">
            Getting started with TaxFlowAI is simple. Your accountant sets everything up — you just log in and stay on top of your tax.
          </p>
          <div className="mt-16 space-y-12">
            {HOW_STEPS.map((step, i) => (
              <article
                key={step.num}
                className={`taxflow-fade-in flex flex-col gap-8 rounded-xl border border-white/10 bg-[#111827] p-6 md:flex-row md:items-center md:p-8 ${visibleSections.has("how-it-works") ? "visible" : ""}`}
                style={{ borderLeftWidth: "3px", borderLeftColor: "#00FCB8" }}
              >
                <div className={`flex-1 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <StepIcon type={step.icon} />
                  <h3 className="mt-4 text-lg font-bold text-white" style={{ fontFamily: "var(--font-heading-tf), system-ui" }}>{step.title}</h3>
                  <p className="mt-2 text-sm text-gray-400">{step.desc}</p>
                </div>
                <div className={`hidden h-px w-16 bg-[#00FCB8]/50 md:block ${i % 2 === 1 ? "md:order-1" : ""}`} aria-hidden />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICES */}
      <section id="features" data-taxflow-section className="bg-[#111827] px-4 py-20 md:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[#00FCB8]">WHAT&apos;S INCLUDED</p>
          <h2 className="mt-4 text-center text-4xl font-bold text-white md:text-5xl" style={{ fontFamily: "var(--font-heading-tf), system-ui" }}>
            Everything your tax life needs.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-400">
            All tax and accounting services are provided by E&amp;A Advisory Pty Ltd (Registered Tax Agent). TaxFlowAI is the client portal that connects you with your tax team — not a self-serve lodgement tool.
          </p>
          <div className={`mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${visibleSections.has("features") ? "taxflow-fade-in visible" : "taxflow-fade-in"}`}>
            {SERVICES.map((label) => (
              <div
                key={label}
                className="rounded-xl border border-white/10 bg-[#0A1628] p-6 transition-all hover:border-[#00FCB8] hover:bg-[#0A1628]/90"
              >
                <svg className="h-8 w-8 text-[#00FCB8]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <h4 className="mt-3 text-sm font-bold text-white">{label}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* E&A ADVISORY TRUST SECTION */}
      <section className="bg-[#111827] px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 py-12 px-8">
          <div className="grid gap-8 md:grid-cols-[40%_60%] md:items-center">
            <div>
              <p className="text-6xl font-bold text-[#00FCB8]">EA</p>
              <p className="mt-2 text-lg font-bold text-white">E&amp;A Advisory Pty Ltd</p>
              <p className="mt-1 text-sm text-gray-500">Registered Tax Agent</p>
              <a href="https://eaadvisory.com.au/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-medium text-[#00FCB8] transition hover:underline">
                Visit eaadvisory.com.au →
              </a>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">WHO&apos;S BEHIND YOUR TAX</p>
              <h3 className="mt-2 text-2xl font-bold text-white">Real accountants. Real compliance.</h3>
              <p className="mt-4 text-gray-400">
                TaxFlowAI is the platform. E&amp;A Advisory Pty Ltd are the registered tax agents who supervise and manage all compliance, lodgements, and accounting services delivered through TaxFlowAI.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2"><span className="text-[#00FCB8]">✓</span> Registered Tax Agent with the Tax Practitioners Board</li>
                <li className="flex items-center gap-2"><span className="text-[#00FCB8]">✓</span> Full compliance supervision and oversight</li>
                <li className="flex items-center gap-2"><span className="text-[#00FCB8]">✓</span> Real accountants behind every lodgement</li>
                <li className="flex items-center gap-2"><span className="text-[#00FCB8]">✓</span> Regulated, accountable, and qualified</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING — card hover, recommended elevated */}
      <section id="pricing" data-taxflow-section className="bg-[#0A1628] px-4 py-20 md:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[#00FCB8]">PRICING</p>
          <h2 className="mt-4 text-center text-4xl font-bold text-white md:text-5xl" style={{ fontFamily: "var(--font-heading-tf), system-ui" }}>
            Priced for real people.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-400">
            We looked at what accountants charge. We looked at what most Australians can afford. Then we built something in between. Because everyone deserves this — not just people who can spend $300 an hour.
          </p>
          <div className={`mt-16 grid gap-8 lg:grid-cols-3 lg:items-stretch ${visibleSections.has("pricing") ? "taxflow-fade-in visible" : "taxflow-fade-in"}`}>
            <div className="taxflow-pricing-card rounded-2xl border border-white/10 bg-[#111827] p-8 transition-all duration-200">
              <h3 className="text-xl font-bold text-white">Individual</h3>
              <p className="mt-2 text-4xl font-bold text-[#00FCB8]">From $330</p>
              <p className="text-sm text-gray-500">/year</p>
              <div className="my-6 h-px bg-white/10" aria-hidden />
              <ul className="space-y-3 text-sm text-white">
                {["Individual tax return lodgement", "TaxFlowAI portal access", "Document upload & storage", "Deadline tracking & reminders", "Direct accountant access"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-[#00FCB8]">✓</span> {f}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs italic text-gray-500">Tax services provided by E&amp;A Advisory Pty Ltd</p>
              <a href="#get-started" className="mt-6 inline-block w-full rounded-lg border border-[#00FCB8] py-3 text-center font-bold text-[#00FCB8] transition hover:bg-[#00FCB8]/10">
                Get Started
              </a>
            </div>
            <div className="taxflow-pricing-card taxflow-pricing-featured relative rounded-2xl border-t-4 border-[#00FCB8] border-white/20 bg-[#00FCB8]/5 p-8 transition-all duration-200">
              <p className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#00FCB8] px-4 py-1 text-xs font-bold text-[#0A1628]">Most Popular</p>
              <h3 className="mt-2 text-xl font-bold text-white">Business</h3>
              <p className="mt-2 text-4xl font-bold text-[#00FCB8]">From $880</p>
              <p className="text-sm text-gray-500">/year</p>
              <div className="my-6 h-px bg-white/10" aria-hidden />
              <ul className="space-y-3 text-sm text-white">
                {["Everything in Individual", "Business tax return", "BAS & GST lodgements", "PAYG & payroll support", "Bookkeeping & cloud accounting", "Priority response times"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-[#00FCB8]">✓</span> {f}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs italic text-gray-500">Tax services provided by E&amp;A Advisory Pty Ltd</p>
              <a href="#get-started" className="mt-6 inline-block w-full rounded-lg bg-[#00FCB8] py-4 text-center text-lg font-bold text-[#0A1628] transition hover:scale-105">
                Get Started Free
              </a>
            </div>
            <div className="taxflow-pricing-card rounded-2xl border border-white/10 bg-[#111827] p-8 transition-all duration-200">
              <h3 className="text-xl font-bold text-white">Premium</h3>
              <p className="mt-2 text-4xl font-bold text-[#00FCB8]">Custom</p>
              <p className="text-sm text-gray-500">tailored to your needs</p>
              <div className="my-6 h-px bg-white/10" aria-hidden />
              <ul className="space-y-3 text-sm text-white">
                {["Everything in Business", "ASIC & corporate secretarial", "CGT & investment property tax", "Entity structuring & setup", "FBT returns", "Dedicated account manager"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-[#00FCB8]">✓</span> {f}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs italic text-gray-500">Tax services provided by E&amp;A Advisory Pty Ltd</p>
              <a href="tel:+61422959486" className="mt-6 inline-block w-full rounded-lg border border-[#00FCB8] py-3 text-center font-bold text-[#00FCB8] transition hover:bg-[#00FCB8]/10">
                Talk to Us
              </a>
            </div>
          </div>
          <p className="mt-8 text-center text-sm italic text-gray-500">
            Prices shown are indicative starting points. Final pricing depends on complexity and scope. All prices include GST. Tax and accounting services are provided by E&amp;A Advisory Pty Ltd, Registered Tax Agent.
          </p>
        </div>
      </section>

      {/* 6. CTA — diagonal gradient */}
      <section className="relative overflow-hidden px-4 py-24 md:px-6 md:py-32 lg:px-8" style={{ background: "linear-gradient(135deg, #0A1628 0%, #0E1E35 40%, #0d2847 100%)" }}>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[400px] w-[400px] rounded-full bg-[#00FCB8] opacity-[0.05] blur-[100px]" aria-hidden />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-heading-tf), system-ui" }}>
            Enough Australians have gone without.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-xl text-gray-400">
            A real accountant. Real deadlines tracked. Real documents managed. All of it — finally accessible to everyone. Start today. It&apos;s free to get started.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="#get-started" className="taxflow-btn-primary inline-flex w-full items-center justify-center rounded-lg bg-[#00FCB8] px-12 py-5 text-lg font-bold text-[#0A1628] transition sm:w-auto">
              Get Started Free
            </a>
            <Link href="/contact" className="taxflow-btn-ghost inline-flex w-full items-center justify-center rounded-lg border-2 border-white/60 px-12 py-5 text-lg font-bold text-white transition sm:w-auto">
              Book a Consultation
            </Link>
          </div>
          <p className="mt-6 text-center text-xs text-gray-500">
            Tax and accounting services provided by E&amp;A Advisory Pty Ltd (Registered Tax Agent). TaxFlowAI is the technology platform.
          </p>
          <p className="mt-8 text-sm text-gray-500">
            Questions? Call us: <a href="tel:+61422959486" className="text-[#00FCB8] hover:underline">+61 422 959 486</a> or email <a href="mailto:operations@frontline.financial" className="text-[#00FCB8] hover:underline">operations@frontline.financial</a>
          </p>
        </div>
      </section>

      {/* TAXFLOWAI FOOTER */}
      <footer className="border-t border-[#00FCB8]/15 bg-[#060D1A] px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-bold text-lg">
                <span className="text-white">TaxFlow</span>
                <span className="text-[#00FCB8]">AI</span>
              </p>
              <p className="mt-2 text-sm text-gray-500">TaxFlowAI is the platform.</p>
              <p className="mt-1 text-sm text-gray-500">Tax services by E&amp;A Advisory Pty Ltd</p>
              <p className="mt-1 text-sm text-gray-500">Registered Tax Agent</p>
              <a href="https://eaadvisory.com.au/" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs text-[#00FCB8] transition hover:underline">eaadvisory.com.au</a>
              <div className="mt-4 flex gap-4">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 transition hover:text-[#00FCB8]" aria-label="LinkedIn">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z" /></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 transition hover:text-[#00FCB8]" aria-label="Instagram">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" /></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">Product</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li><a href="#features" className="transition hover:text-[#00FCB8]">Features</a></li>
                <li><a href="#how-it-works" className="transition hover:text-[#00FCB8]">How It Works</a></li>
                <li><a href="#pricing" className="transition hover:text-[#00FCB8]">Pricing</a></li>
                <li><a href="#signin" className="transition hover:text-[#00FCB8]">Sign In</a></li>
                <li><a href="#get-started" className="transition hover:text-[#00FCB8]">Get Started</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">Services</h4>
              <p className="mt-2 text-xs italic text-gray-500">Provided by E&amp;A Advisory Pty Ltd</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li><a href="/brokers" className="transition hover:text-[#00FCB8]">Individual Tax</a></li>
                <li><a href="/brokers" className="transition hover:text-[#00FCB8]">Business Tax</a></li>
                <li><a href="/brokers" className="transition hover:text-[#00FCB8]">BAS &amp; GST</a></li>
                <li><a href="/brokers" className="transition hover:text-[#00FCB8]">Bookkeeping</a></li>
                <li><Link href="/" className="transition hover:text-[#00FCB8]">All Services</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">Contact</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li><a href="tel:+61422959486" className="transition hover:text-[#00FCB8]">+61 422 959 486</a></li>
                <li><a href="mailto:operations@frontline.financial" className="transition hover:text-[#00FCB8]">operations@frontline.financial</a></li>
                <li>150 George Street Parramatta 2150</li>
                <li><Link href="/" className="text-[#00FCB8] transition hover:underline">Visit Frontline Financial →</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-white/10 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 text-xs text-gray-500 md:flex-row">
              <p>TaxFlowAI © 2025 · Tax services by E&amp;A Advisory Pty Ltd (Registered Tax Agent) · Platform by Frontline Financial Group · ABN 39 693 731 396</p>
              <div className="flex gap-4">
                <a href="/privacy" className="transition hover:text-[#00FCB8]">Privacy Policy</a>
                <a href="/terms" className="transition hover:text-[#00FCB8]">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
