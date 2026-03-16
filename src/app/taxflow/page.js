"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BrandSwitcherBar from "@/components/BrandSwitcherBar";
import TaxFlowAppFooter from "@/components/taxflow/TaxFlowAppFooter";

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

const TAXFLOW_SIGNIN_URL = "https://taxflowai.frontline.financial/login";

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

  const sectionContainer = "mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16 lg:px-8";
  const sectionHeading = "border-l-4 border-[#00FCB8] pl-4 text-3xl font-bold text-white md:text-4xl";

  return (
    <div className="min-h-screen bg-[#0A1628] font-sans text-white">
      <header className="sticky top-0 z-50 w-full">
        <BrandSwitcherBar />
        {/* TaxFlow nav row + compliance line */}
        <div className="border-b border-white/[0.08] bg-[#0A1628]">
          <div className={sectionContainer}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link href="/taxflow" className="text-lg font-extrabold md:text-xl">
                <span className="text-white">TaxFlow</span>
                <span className="taxflow-logo-ai-shimmer">AI</span>
              </Link>
              <nav className="flex items-center gap-4 md:gap-6">
                <a href="#features" className="hidden text-sm font-medium text-white/80 transition hover:text-[#00FCB8] sm:inline-block">Features</a>
                <a href="#how-it-works" className="hidden text-sm font-medium text-white/80 transition hover:text-[#00FCB8] sm:inline-block">How it works</a>
                <a href="#pricing" className="hidden text-sm font-medium text-white/80 transition hover:text-[#00FCB8] sm:inline-block">Pricing</a>
                <a href={TAXFLOW_SIGNIN_URL} className="rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10">Sign In</a>
                <a href={TAXFLOW_SIGNIN_URL} className="rounded-lg bg-[#00FCB8] px-4 py-2.5 text-sm font-bold text-[#0A1628] transition hover:opacity-95">Get started</a>
              </nav>
            </div>
          </div>
          <p className="border-t border-white/[0.06] bg-[#060D1A] py-1.5 text-center text-[11px] text-white/50">
            Tax services supervised by E&amp;A Advisory Pty Ltd · Registered Tax Agent
          </p>
        </div>
      </header>

      {/* 1. HERO — aligned with Frontline: clear headline, subline, value props, CTA */}
      <section className="relative overflow-hidden bg-[#0A1628] pt-8 pb-16 md:pt-12 md:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(15,23,41,0.9)_0%,transparent_60%)]" aria-hidden />
        <div className={`relative ${sectionContainer}`}>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h1 className="taxflow-hero-heading text-white">
                Your tax, <span className="text-[#00FCB8]">under control.</span>
              </h1>
              <p className="mt-4 text-lg text-[#94a3b8] md:text-xl">
                Tax made simple. For every Australian.
              </p>
              <p className="mt-3 text-sm text-white/80">
                Lost receipts? Unclear status? Hard to reach your accountant? Flo sorts your receipts, your vault keeps everything in one place, and you always see what&apos;s next.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-white/90">
                <li className="flex items-center gap-2"><span className="text-[#00FCB8]">✓</span> Always know what&apos;s happening</li>
                <li className="flex items-center gap-2"><span className="text-[#00FCB8]">✓</span> Stay organised — receipts &amp; documents in one place</li>
                <li className="flex items-center gap-2"><span className="text-[#00FCB8]">✓</span> Reach your accountant — upload, message, no phone tag</li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href={TAXFLOW_SIGNIN_URL} className="inline-flex items-center justify-center rounded-lg bg-[#00FCB8] px-6 py-3 font-bold text-[#0A1628] transition hover:opacity-95">
                  Get started
                </a>
                <a href="#features" className="inline-flex items-center justify-center rounded-lg border-2 border-white/40 px-6 py-3 font-bold text-white transition hover:bg-white/10">
                  See what you get
                </a>
              </div>
              <p className="mt-4 text-xs text-white/50">Free to get started · No credit card · E&amp;A Advisory Pty Ltd</p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="taxflow-card-float w-full max-w-sm rounded-2xl border border-white/10 bg-[#111827]/95 p-4 shadow-xl" style={{ boxShadow: "0 20px 40px -12px rgba(0,0,0,0.4)" }}>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-medium text-white/80">TaxFlowAI — Dashboard</span>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00FCB8] text-[10px] font-bold text-[#0A1628]">EA</div>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between rounded-lg bg-white/5 px-2.5 py-1.5 text-xs"><span className="text-white/90">Income Tax FY2025</span><span className="text-[#00FCB8]">Lodged</span></div>
                  <div className="flex justify-between rounded-lg bg-white/5 px-2.5 py-1.5 text-xs"><span className="text-white/90">BAS Q2 FY2026</span><span className="text-amber-400">Due 28 Feb</span></div>
                  <div className="flex justify-between rounded-lg bg-white/5 px-2.5 py-1.5 text-xs"><span className="text-white/90">PAYG Jan</span><span className="text-[#39B2B2]">In progress</span></div>
                </div>
                <p className="mt-3 text-[10px] text-[#00FCB8]">→ Upload bank statements</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST — Online Projects-style: badges + centered text */}
      <section className="border-y border-white/10 bg-[#111827] py-8">
        <div className="mx-auto max-w-4xl px-4">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <span className="rounded-full border border-[#00FCB8]/30 bg-[#00FCB8]/10 px-4 py-2 text-sm font-bold text-[#00FCB8]">2,800+ Returns lodged</span>
            <span className="rounded-full border border-[#00FCB8]/30 bg-[#00FCB8]/10 px-4 py-2 text-sm font-bold text-[#00FCB8]">5/5 Google Reviews</span>
            <span className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white">Registered Tax Agent</span>
          </div>
          <p className="mt-4 text-center text-sm text-[#94a3b8]">
            TaxFlowAI is powered by <strong className="text-white">Frontline Financial</strong> · E&amp;A Advisory Pty Ltd · Secure &amp; ATO-aligned
          </p>
        </div>
      </section>

      {/* 2b. NOT LIKE EVERY OTHER — Online Projects-style differentiation */}
      <section className="bg-[#0A1628] py-16 md:py-20">
        <div className={sectionContainer}>
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[#00FCB8]">Not like every other tax platform</p>
          <h2 className="mt-4 text-center text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            Feel like you&apos;re <span className="text-[#00FCB8]">in control</span>,<br />not in the dark.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-[#94a3b8]">
            We&apos;re not here to sell you software. We&apos;re here to give you visibility — real accountants, real deadlines, real clarity. No phone tag, no guesswork.
          </p>
          <div className="mt-10 flex justify-center">
            <Link href="/taxflow/contact" className="inline-flex items-center justify-center rounded-lg border-2 border-[#00FCB8] px-8 py-4 font-bold text-[#00FCB8] transition hover:bg-[#00FCB8]/10">
              Book a consultation
            </Link>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS — Frontline-style: single row of steps with dividers */}
      <section id="how-it-works" data-taxflow-section className="bg-[#0A1628]">
        <div className={sectionContainer}>
          <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">The process</p>
          <h2 className={`mt-2 ${sectionHeading}`}>Up and running in minutes</h2>
          <p className="mt-3 max-w-xl text-sm text-[#94a3b8]">
            Your accountant sets everything up — you log in and stay on top of your tax.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_STEPS.map((step) => (
              <div key={step.num} className="flex flex-col rounded-xl border border-white/10 bg-[#111827] p-5 transition hover:border-[#00FCB8]/30">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#00FCB8] text-sm font-bold text-[#0A1628]">{step.num}</span>
                  <StepIcon type={step.icon} className="h-8 w-8 flex-shrink-0 text-[#00FCB8]" />
                </div>
                <h3 className="mt-3 font-bold text-white">{step.title}</h3>
                <p className="mt-1 text-sm text-[#94a3b8]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3b. WINS ON THE BOARD — Online Projects-style stat cards */}
      <section data-taxflow-section className="bg-[#111827] py-16 md:py-20">
        <div className={sectionContainer}>
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[#00FCB8]">Wins on the board</p>
          <h2 className="mt-2 text-center text-2xl font-bold text-white md:text-3xl">Results you can count on</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-[#0A1628] p-6 text-center transition hover:border-[#00FCB8]/30">
              <p className="text-4xl font-bold text-[#00FCB8] md:text-5xl">2,800+</p>
              <p className="mt-1 text-sm font-medium text-white">Returns lodged</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#0A1628] p-6 text-center transition hover:border-[#00FCB8]/30">
              <p className="text-4xl font-bold text-[#00FCB8] md:text-5xl">5/5</p>
              <p className="mt-1 text-sm font-medium text-white">Google Reviews</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#0A1628] p-6 text-center transition hover:border-[#00FCB8]/30 sm:col-span-2 lg:col-span-1">
              <p className="text-4xl font-bold text-[#00FCB8] md:text-5xl">Real</p>
              <p className="mt-1 text-sm font-medium text-white">Accountants behind every lodgement</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURES — Frontline-style: uniform grid, left-accent heading */}
      <section id="features" data-taxflow-section className="bg-[#111827]">
        <div className={sectionContainer}>
          <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">What you get</p>
          <h2 className={`mt-2 ${sectionHeading}`}>Your tax control centre</h2>
          <p className="mt-3 max-w-xl text-sm text-[#94a3b8]">
            Flo keeps track of everything — see what&apos;s happening, what&apos;s next, and reach your accountant when you need to.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-[#0A1628] p-5 transition hover:border-[#00FCB8]/30">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00FCB8]/20 text-[#00FCB8]">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /></svg>
              </div>
              <h3 className="mt-3 font-bold text-white">Snap receipts — Flo sorts them</h3>
              <p className="mt-1 text-sm text-[#94a3b8]">AI-scanned and categorised. No more shoeboxes or lost slips.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#0A1628] p-5 transition hover:border-[#00FCB8]/30">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00FCB8]/20 text-[#00FCB8]">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00FCB8]/20 text-[#00FCB8]">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>
              </div>
              <h3 className="mt-3 font-bold text-white">Document vault</h3>
              <p className="mt-1 text-sm text-[#94a3b8]">Everything in one place. Secure storage, ready when your accountant needs it.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#0A1628] p-5 transition hover:border-[#00FCB8]/30">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00FCB8]/20 text-[#00FCB8]">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
              </div>
              <h3 className="mt-3 font-bold text-white">Track lodgements in real time</h3>
              <p className="mt-1 text-sm text-[#94a3b8]">See status, next steps, and deadlines. No more &quot;where&apos;s my return?&quot;</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#0A1628] p-5 transition hover:border-[#00FCB8]/30">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00FCB8]/20 text-[#00FCB8]">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
              </div>
              <h3 className="mt-3 font-bold text-white">Meet Flo</h3>
              <p className="mt-1 text-sm text-[#94a3b8]">Your friendly AI assistant. Flo has your back — organised, helpful.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#0A1628] p-5 transition hover:border-[#00FCB8]/30">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00FCB8]/20 text-[#00FCB8]">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
              </div>
              <h3 className="mt-3 font-bold text-white">Bank-grade security</h3>
              <p className="mt-1 text-sm text-[#94a3b8]">Secure, encrypted, ATO-aligned. Tax services by E&amp;A Advisory Pty Ltd.</p>
            </div>
          </div>
        </div>
      </section>

      {/* E&A — Frontline-style: compact strip */}
      <section className="border-t border-white/10 bg-[#0A1628] py-8">
        <div className={sectionContainer}>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-[#00FCB8]">EA</span>
              <div>
                <p className="font-bold text-white">E&amp;A Advisory Pty Ltd</p>
                <p className="text-sm text-[#94a3b8]">Registered Tax Agent · Real accountants behind every lodgement</p>
              </div>
            </div>
            <a href="https://eaadvisory.com.au/" target="_blank" rel="noopener noreferrer" className="shrink-0 text-sm font-medium text-[#00FCB8] transition hover:underline">
              eaadvisory.com.au →
            </a>
          </div>
        </div>
      </section>

      {/* 5. PRICING — Frontline-style container + left-accent heading */}
      <section id="pricing" data-taxflow-section className="bg-[#111827]">
        <div className={sectionContainer}>
          <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">Pricing</p>
          <h2 className={`mt-2 ${sectionHeading}`}>Priced for real people</h2>
          <p className="mt-3 max-w-xl text-sm text-[#94a3b8]">
            We looked at what accountants charge. We looked at what most Australians can afford. Then we built something in between. Because everyone deserves this — not just people who can spend $300 an hour.
          </p>
          <div className={`mt-16 grid gap-8 lg:grid-cols-3 lg:items-stretch ${visibleSections.has("pricing") ? "taxflow-fade-in visible" : "taxflow-fade-in"}`}>
            <div className="taxflow-pricing-card rounded-2xl border border-white/10 bg-[#111827] p-8 transition-all duration-200">
              <h3 className="text-xl font-bold text-white">Individual</h3>
              <p className="mt-2 text-4xl font-bold text-[#00FCB8]">From $20</p>
              <p className="text-sm text-gray-500">/month</p>
              <div className="my-6 h-px bg-white/10" aria-hidden />
              <ul className="space-y-3 text-sm text-white">
                {["Individual tax return lodgement", "TaxFlowAI portal access", "Document upload & storage", "Deadline tracking & reminders", "Direct accountant access"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-[#00FCB8]">✓</span> {f}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs italic text-gray-500">Tax services provided by E&amp;A Advisory Pty Ltd</p>
              <a href={TAXFLOW_SIGNIN_URL} className="mt-6 inline-block w-full rounded-lg border border-[#00FCB8] py-3 text-center font-bold text-[#00FCB8] transition hover:bg-[#00FCB8]/10">
                Get Started
              </a>
            </div>
            <div className="taxflow-pricing-card taxflow-pricing-featured relative rounded-2xl border-t-4 border-[#00FCB8] border-white/20 bg-[#00FCB8]/5 p-8 transition-all duration-200">
              <p className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#00FCB8] px-4 py-1 text-xs font-bold text-[#0A1628]">Most Popular</p>
              <h3 className="mt-2 text-xl font-bold text-white">Business</h3>
              <p className="mt-2 text-4xl font-bold text-[#00FCB8]">From $150</p>
              <p className="text-sm text-gray-500">/month</p>
              <div className="my-6 h-px bg-white/10" aria-hidden />
              <ul className="space-y-3 text-sm text-white">
                {["Everything in Individual", "Business tax return", "BAS & GST lodgements", "Bookkeeping & cloud accounting", "Simple financial reporting", "Priority response times"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-[#00FCB8]">✓</span> {f}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs italic text-gray-500">Tax services provided by E&amp;A Advisory Pty Ltd</p>
              <a href={TAXFLOW_SIGNIN_URL} className="mt-6 inline-block w-full rounded-lg bg-[#00FCB8] py-4 text-center text-lg font-bold text-[#0A1628] transition hover:scale-105">
                Get Started Free
              </a>
            </div>
            <div className="taxflow-pricing-card rounded-2xl border border-white/10 bg-[#111827] p-8 transition-all duration-200">
              <h3 className="text-xl font-bold text-white">Premium</h3>
              <p className="mt-2 text-4xl font-bold text-[#00FCB8]">Custom</p>
              <p className="text-sm text-gray-500">tailored to your needs</p>
              <div className="my-6 h-px bg-white/10" aria-hidden />
              <ul className="space-y-3 text-sm text-white">
                {["Everything in Business", "ASIC & corporate secretarial", "CGT & investment property tax", "Entity structuring & setup", "FBT returns", "Payroll"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-[#00FCB8]">✓</span> {f}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs italic text-gray-500">Tax services provided by E&amp;A Advisory Pty Ltd</p>
              <a href="tel:+61406909862" className="mt-6 inline-block w-full rounded-lg border border-[#00FCB8] py-3 text-center font-bold text-[#00FCB8] transition hover:bg-[#00FCB8]/10">
                Talk to Us
              </a>
            </div>
          </div>
          <p className="mt-8 text-center text-sm italic text-gray-500">
            Prices shown are indicative starting points. Final pricing depends on complexity and scope. All prices include GST. Tax and accounting services are provided by E&amp;A Advisory Pty Ltd, Registered Tax Agent.
          </p>
        </div>
      </section>

      {/* 5b. WE'RE A GREAT FIT IF… — Online Projects-style client-fit bullets */}
      <section className="border-t border-white/10 bg-[#0A1628] py-16 md:py-20">
        <div className={sectionContainer}>
          <h2 className="text-center text-2xl font-bold text-white md:text-3xl">
            We&apos;re a great fit if…
          </h2>
          <ul className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-2">
            {[
              "You want one place for all your tax docs",
              "You want to know your lodgement status",
              "You want an accountant who responds",
              "You want clear deadlines, no surprises",
              "You want receipts sorted, not shoeboxed",
              "You want tax made simple, not stressful",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-white">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00FCB8] text-xs font-bold text-[#0A1628]">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-12 flex justify-center">
            <Link href="/taxflow/contact" className="inline-flex items-center justify-center rounded-lg bg-[#00FCB8] px-8 py-4 font-bold text-[#0A1628] transition hover:opacity-95">
              Let&apos;s talk
            </Link>
          </div>
        </div>
      </section>

      {/* 6. CTA — Frontline-style: one container, clear CTA */}
      <section id="get-started" className="relative overflow-hidden bg-[#0A1628] border-t border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(0,252,184,0.08)_0%,transparent_60%)]" aria-hidden />
        <div className={`relative ${sectionContainer} text-center`}>
          <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-heading-tf), system-ui" }}>
            Your tax, under control.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-xl text-[#94a3b8]">
            Always know what&apos;s happening. Stay organised. Reach your accountant. Start today — free to get started.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={TAXFLOW_SIGNIN_URL} className="taxflow-btn-primary inline-flex w-full items-center justify-center rounded-lg bg-[#00FCB8] px-12 py-5 text-lg font-bold text-[#0A1628] transition hover:opacity-95 sm:w-auto">
              Get started
            </a>
            <Link href="/taxflow/contact" className="taxflow-btn-ghost inline-flex w-full items-center justify-center rounded-lg border-2 border-white/60 px-12 py-5 text-lg font-bold text-white transition sm:w-auto">
              Book a Consultation
            </Link>
          </div>
          <p className="mt-6 text-center text-xs text-gray-500">
            Tax and accounting services provided by E&amp;A Advisory Pty Ltd (Registered Tax Agent). TaxFlowAI is the technology platform.
          </p>
          <p className="mt-8 text-sm text-gray-500">
            Questions? <a href="tel:+61406909862" className="text-[#00FCB8] hover:underline">0406 909 862</a> or <a href="mailto:taxflowai@frontline.financial" className="text-[#00FCB8] hover:underline">taxflowai@frontline.financial</a>
          </p>
        </div>
      </section>

      <TaxFlowAppFooter />
    </div>
  );
}
