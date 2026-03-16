"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BrandSwitcherBar from "@/components/BrandSwitcherBar";
import TaxFlowAppFooter from "@/components/taxflow/TaxFlowAppFooter";

const TAXFLOW_SIGNIN_URL = "https://taxflowai.frontline.financial/login";
const ACCENT = "#00FCB8";

const HOW_STEPS = [
  {
    num: 1,
    title: "E&A Advisory sets you up",
    desc: "Real accountants create your account, link your tax obligations, and configure your lodgement calendar.",
    icon: "gear",
  },
  {
    num: 2,
    title: "Complete your 10-minute profile",
    desc: "A 4-step wizard: entity details (TFN/ABN), address, bank details with BSB lookup, and review. Flo guides every step.",
    icon: "user",
  },
  {
    num: 3,
    title: "Your dashboard is live",
    desc: "See all your accounts — Personal, Sole Trader, Company, Trust, Partnership, SMSF — with live lodgement status.",
    icon: "key",
  },
  {
    num: 4,
    title: "Upload, track, stay on top",
    desc: "Snap receipts for Flo to sort, track every ATO deadline, reach your accountant — no phone tag, no surprises.",
    icon: "calendar",
  },
];

const PORTAL_FEATURES = [
  {
    title: "Dashboard",
    desc: "Dynamic status hero. All accounts at a glance — Personal, Sole Trader, Company, Trust, Partnership, SMSF — with lodgement counts, overdue warnings, and one-tap actions.",
    icon: "grid",
    badge: null,
  },
  {
    title: "AI Receipt Scanner",
    desc: "Drag-and-drop (JPG, PNG, PDF, HEIC). Flo auto-classifies each receipt into ATO D1–D10 categories with confidence levels, merchant details, and full AI reasoning. Bulk upload supported.",
    icon: "camera",
    badge: "Powered by Flo",
  },
  {
    title: "Document Vault",
    desc: "Password-protected secure repository. Tax docs, vehicle documents, and receipts — each with accountant assignment status badges.",
    icon: "lock",
    badge: "Encrypted",
  },
  {
    title: "Vehicle Logbook",
    desc: "Full ATO-compliant logbook tool. Register vehicles, log trips manually or in bulk, calculate business use %, and export CSV or PDF for ATO substantiation.",
    icon: "car",
    badge: "ATO Compliant",
  },
  {
    title: "Investment Properties",
    desc: "Track all rental and investment properties inline. Date first received rent, purchase date, notes — add, edit, and delete directly from the dashboard.",
    icon: "home",
    badge: null,
  },
  {
    title: "Lodgement Tracking",
    desc: "Per-lodgement status, financial year, due dates, accountant notes, and an embedded callback request form on every lodgement detail page.",
    icon: "calendar",
    badge: null,
  },
  {
    title: "Flo — AI Assistant",
    desc: "Floating chat on every page. Flo answers tax deduction questions, explains receipt categorisations, and provides guided help for first-time users.",
    icon: "ai",
    badge: null,
  },
  {
    title: "Frontline Financial",
    desc: "Partner section with 15+ loan products: home loans, investment loans, car finance, equipment finance, business loans, SMSF loans, and more — each with a direct enquiry modal.",
    icon: "loan",
    badge: "Partner",
  },
  {
    title: "Callback Requests",
    desc: "Embedded request form on the dashboard and every lodgement page. Topic, message, preferred contact time — straight to your accountant.",
    icon: "phone",
    badge: null,
  },
];

const ACCOUNT_TYPES = [
  { label: "Personal", icon: "👤" },
  { label: "Sole Trader", icon: "🧾" },
  { label: "Company", icon: "🏢" },
  { label: "Trust", icon: "🔐" },
  { label: "Partnership", icon: "🤝" },
  { label: "SMSF", icon: "💰" },
];

function FeatureIcon({ type }) {
  const cls = "h-5 w-5";
  switch (type) {
    case "grid":
      return <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>;
    case "camera":
      return <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" /></svg>;
    case "lock":
      return <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>;
    case "car":
      return <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>;
    case "home":
      return <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>;
    case "user":
      return <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>;
    case "calendar":
      return <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>;
    case "ai":
      return <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>;
    case "loan":
      return <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>;
    case "phone":
      return <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>;
    default:
      return null;
  }
}

function StepIcon({ type }) {
  const cls = "h-8 w-8 flex-shrink-0 text-[#00FCB8]";
  switch (type) {
    case "gear":
      return <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
    case "user":
      return <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>;
    case "key":
      return <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>;
    case "calendar":
      return <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>;
    default:
      return null;
  }
}

export default function TaxFlowPage() {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [isDark, setIsDark] = useState(true);

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

  // Theme values
  const bg1 = isDark ? "#0A1628" : "#f0f4f8";
  const bg2 = isDark ? "#111827" : "#ffffff";
  const bgDeep = isDark ? "#060D1A" : "#e2e8f0";
  const textPrimary = isDark ? "#ffffff" : "#0d1b2a";
  const textMuted = isDark ? "#94a3b8" : "#475569";
  const border = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const accentLight = isDark ? "rgba(0,129,138,0.15)" : "rgba(0,129,138,0.1)";
  const cardBg = isDark ? "#111827" : "#ffffff";
  const cardAlt = isDark ? "#0A1628" : "#f8fafc";
  const rowBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)";

  const sectionContainer = "mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16 lg:px-8";

  return (
    <div className="min-h-screen font-sans" style={{ background: bg1, color: textPrimary }}>

      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full">
        <BrandSwitcherBar />
        <div style={{ borderBottom: `1px solid ${border}`, background: bgDeep }}>
          <div className="mx-auto max-w-6xl px-4 py-4 md:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link href="/taxflow" className="text-lg font-extrabold md:text-xl">
                <span style={{ color: textPrimary }}>TaxFlow</span>
                <span className="taxflow-logo-ai-shimmer">AI</span>
              </Link>
              <nav className="flex items-center gap-3 md:gap-5">
                <a href="#features" className="hidden text-sm font-medium transition hover:opacity-100 sm:inline-block" style={{ color: `${textPrimary}b3` }}>Features</a>
                <a href="#how-it-works" className="hidden text-sm font-medium transition hover:opacity-100 sm:inline-block" style={{ color: `${textPrimary}b3` }}>How it works</a>
                <button
                  onClick={() => setIsDark(!isDark)}
                  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                  className="rounded-lg p-2 transition hover:opacity-80"
                  style={{ background: accentLight, color: ACCENT }}
                >
                  {isDark ? (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>
                  )}
                </button>
                <a href={TAXFLOW_SIGNIN_URL} className="rounded-lg px-3 py-2 text-sm font-medium transition hover:opacity-80" style={{ color: `${textPrimary}e6` }}>Sign In</a>
                <a href={TAXFLOW_SIGNIN_URL} className="rounded-lg px-4 py-2.5 text-sm font-bold text-white transition hover:opacity-90" style={{ background: ACCENT }}>Get started</a>
              </nav>
            </div>
          </div>
          <p className="border-t py-1 text-center text-[11px]" style={{ borderColor: border, color: `${textPrimary}66` }}>
            Tax services supervised by E&amp;A Advisory Pty Ltd · Registered Tax Agent
          </p>
        </div>
      </header>

      {/* 1. HERO */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-20" style={{ background: bg1 }}>
        <div className={`relative ${sectionContainer}`}>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h1 className="taxflow-hero-heading" style={{ color: textPrimary }}>
                Your tax, <span style={{ color: ACCENT }}>under control.</span>
              </h1>
              <p className="mt-4 text-lg md:text-xl" style={{ color: textMuted }}>
                Tax made simple. For every Australian.
              </p>
              <p className="mt-3 text-sm" style={{ color: `${textPrimary}cc` }}>
                Lost receipts? Unclear status? Hard to reach your accountant? Flo sorts your receipts, your vault keeps everything safe, and you always see what&apos;s next.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {[
                  "Always know what's happening",
                  "Stay organised — receipts & documents in one place",
                  "Reach your accountant — upload, message, no phone tag",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2" style={{ color: `${textPrimary}e6` }}>
                    <span style={{ color: ACCENT }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href={TAXFLOW_SIGNIN_URL} className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-bold text-white transition hover:opacity-90" style={{ background: ACCENT }}>
                  Get started
                </a>
                <a href="#features" className="inline-flex items-center justify-center rounded-lg border-2 px-6 py-3 font-bold transition hover:opacity-80" style={{ borderColor: `${textPrimary}55`, color: textPrimary }}>
                  See what you get
                </a>
              </div>
              <p className="mt-4 text-xs" style={{ color: `${textPrimary}66` }}>Free to get started · No credit card · E&amp;A Advisory Pty Ltd</p>
            </div>

            {/* Dashboard mockup */}
            <div className="flex justify-center lg:justify-end">
              <div className="taxflow-card-float w-full max-w-sm rounded-2xl p-4 shadow-xl" style={{ border: `1px solid ${border}`, background: cardBg, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.3)" }}>
                <div className="flex items-center justify-between pb-3" style={{ borderBottom: `1px solid ${border}` }}>
                  <span className="text-xs font-medium" style={{ color: `${textPrimary}b3` }}>TaxFlowAI — Dashboard</span>
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: ACCENT }}>All good</span>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-1.5">
                  {["Personal", "Company", "SMSF"].map((acct) => (
                    <div key={acct} className="rounded-lg px-2 py-1.5 text-center text-[9px] font-medium" style={{ background: accentLight, color: ACCENT }}>{acct}</div>
                  ))}
                </div>
                <div className="mt-3 space-y-1.5">
                  <div className="flex justify-between rounded-lg px-2.5 py-1.5 text-xs" style={{ background: rowBg }}>
                    <span style={{ color: `${textPrimary}e6` }}>Income Tax FY2025</span>
                    <span style={{ color: ACCENT }}>Lodged</span>
                  </div>
                  <div className="flex justify-between rounded-lg px-2.5 py-1.5 text-xs" style={{ background: rowBg }}>
                    <span style={{ color: `${textPrimary}e6` }}>BAS Q2 FY2026</span>
                    <span className="text-amber-500">Due 28 Feb</span>
                  </div>
                  <div className="flex justify-between rounded-lg px-2.5 py-1.5 text-xs" style={{ background: rowBg }}>
                    <span style={{ color: `${textPrimary}e6` }}>Vehicle Logbook</span>
                    <span className="text-blue-400">12 wks · 68%</span>
                  </div>
                </div>
                <div className="mt-3 flex items-start gap-2 rounded-lg p-2.5" style={{ background: accentLight }}>
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: ACCENT }}>F</span>
                  <p className="text-[10px]" style={{ color: ACCENT }}>Hi! Upload your bank statements to get started with Q2 BAS.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST */}
      <section className="py-8" style={{ borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`, background: bg2 }}>
        <div className="mx-auto max-w-4xl px-4">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {[
              { label: "5/5 Google Reviews", accent: true },
              { label: "Registered Tax Agent", accent: false },
              { label: "ATO-Aligned", accent: false },
            ].map(({ label, accent }) => (
              <span key={label} className="rounded-full px-4 py-2 text-sm font-medium" style={accent
                ? { border: `1px solid rgba(0,129,138,0.3)`, background: accentLight, color: ACCENT, fontWeight: 700 }
                : { border: `1px solid ${border}`, background: rowBg, color: textPrimary }}>
                {label}
              </span>
            ))}
          </div>
          <p className="mt-4 text-center text-sm" style={{ color: textMuted }}>
            TaxFlowAI is powered by <strong style={{ color: textPrimary }}>Frontline Financial</strong> · E&amp;A Advisory Pty Ltd · Secure &amp; Australian
          </p>
        </div>
      </section>

      {/* 2b. NOT LIKE EVERY OTHER */}
      <section className="py-16 md:py-20" style={{ background: bg1 }}>
        <div className={sectionContainer}>
          <p className="text-center text-xs font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Not like every other tax platform</p>
          <h2 className="mt-4 text-center text-3xl font-bold leading-tight md:text-4xl lg:text-5xl" style={{ color: textPrimary }}>
            Feel like you&apos;re <span style={{ color: ACCENT }}>in control</span>,<br />not in the dark.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg" style={{ color: textMuted }}>
            We&apos;re not here to sell you software. We&apos;re here to give you visibility — real accountants, real deadlines, real clarity.
          </p>
          <div className="mt-10 flex justify-center">
            <a href={TAXFLOW_SIGNIN_URL} className="inline-flex items-center justify-center rounded-lg border-2 px-8 py-4 font-bold transition hover:opacity-80" style={{ borderColor: ACCENT, color: ACCENT }}>
              Sign up for free
            </a>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section id="how-it-works" data-taxflow-section style={{ background: bg1 }}>
        <div className={sectionContainer}>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: ACCENT }}>The process</p>
          <h2 className="mt-2 border-l-4 pl-4 text-3xl font-bold md:text-4xl" style={{ borderColor: ACCENT, color: textPrimary }}>Up and running in minutes</h2>
          <p className="mt-3 max-w-xl text-sm" style={{ color: textMuted }}>
            Your accountant sets everything up. Complete a 10-minute onboarding wizard and you&apos;re live.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_STEPS.map((step) => (
              <div key={step.num} className="flex flex-col rounded-xl p-5 transition" style={{ border: `1px solid ${border}`, background: cardBg }}>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: ACCENT }}>{step.num}</span>
                  <StepIcon type={step.icon} />
                </div>
                <h3 className="mt-3 font-bold" style={{ color: textPrimary }}>{step.title}</h3>
                <p className="mt-1 text-sm" style={{ color: textMuted }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PORTAL FEATURES */}
      <section id="features" data-taxflow-section style={{ background: bg2 }}>
        <div className={sectionContainer}>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: ACCENT }}>What you get</p>
          <h2 className="mt-2 border-l-4 pl-4 text-3xl font-bold md:text-4xl" style={{ borderColor: ACCENT, color: textPrimary }}>Your complete tax control centre</h2>
          <p className="mt-3 max-w-xl text-sm" style={{ color: textMuted }}>
            Every feature you need — built into one portal, with Flo always there to help.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PORTAL_FEATURES.map((feat) => (
              <div key={feat.title} className="flex flex-col rounded-xl p-5 transition" style={{ border: `1px solid ${border}`, background: cardAlt }}>
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: accentLight, color: ACCENT }}>
                    <FeatureIcon type={feat.icon} />
                  </div>
                  {feat.badge && (
                    <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: accentLight, color: ACCENT }}>{feat.badge}</span>
                  )}
                </div>
                <h3 className="mt-3 font-bold" style={{ color: textPrimary }}>{feat.title}</h3>
                <p className="mt-1 text-sm" style={{ color: textMuted }}>{feat.desc}</p>
              </div>
            ))}
          </div>

          {/* Your security matters */}
          <div className="mt-16 rounded-2xl p-8 md:p-10" style={{ border: `1px solid ${border}`, background: cardBg }}>
            <h3 className="text-xl font-bold md:text-2xl" style={{ color: textPrimary }}>Your security matters</h3>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed" style={{ color: textMuted }}>
              We take the protection of your data seriously. Your information is encrypted in transit and at rest, stored on secure infrastructure, and accessed only by authorised personnel. We follow industry-standard practices to keep your tax documents and personal details safe — so you can focus on your tax, not on worrying about security.
            </p>
          </div>
        </div>
      </section>

      {/* 4b. ACCOUNT TYPES */}
      <section className="py-12" style={{ background: bg1 }}>
        <div className={sectionContainer}>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Who it covers</p>
          <h2 className="mt-2 text-2xl font-bold md:text-3xl" style={{ color: textPrimary }}>One portal for all your entities</h2>
          <p className="mt-2 text-sm" style={{ color: textMuted }}>Manage every account in a single view — no switching between systems.</p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {ACCOUNT_TYPES.map(({ label, icon }) => (
              <div key={label} className="flex flex-col items-center rounded-xl p-4 text-center transition" style={{ border: `1px solid ${border}`, background: cardBg }}>
                <span className="text-2xl">{icon}</span>
                <span className="mt-2 text-sm font-medium" style={{ color: textPrimary }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4c. FLO SECTION */}
      <section className="py-16 md:py-20" style={{ background: bg2 }}>
        <div className={sectionContainer}>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Your AI assistant</p>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl" style={{ color: textPrimary }}>Meet Flo</h2>
              <p className="mt-4 text-base" style={{ color: textMuted }}>
                Flo is the friendly AI assistant built into every page of your portal. Flo sorts your receipts into ATO deduction categories (D1–D10), explains every categorisation decision, and answers your tax questions in plain English.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Classifies receipts into ATO D1–D10 categories with confidence levels",
                  "Shows AI reasoning behind every categorisation decision",
                  "Answers questions about tax deductions and ATO rules",
                  "Guides first-time users through onboarding",
                  "Floating chat button — always available on every page",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2" style={{ color: `${textPrimary}e6` }}>
                    <span className="mt-0.5 shrink-0" style={{ color: ACCENT }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Flo chat mockup */}
            <div className="flex justify-center">
              <div className="w-full max-w-xs rounded-2xl p-4 shadow-lg" style={{ border: `1px solid ${border}`, background: cardBg }}>
                <div className="flex items-center gap-2 pb-3" style={{ borderBottom: `1px solid ${border}` }}>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: ACCENT }}>F</span>
                  <div>
                    <p className="text-sm font-bold" style={{ color: textPrimary }}>Flo</p>
                    <p className="text-[10px]" style={{ color: textMuted }}>AI Tax Assistant</p>
                  </div>
                  <span className="ml-auto h-2 w-2 rounded-full bg-green-400"></span>
                </div>
                <div className="mt-3 space-y-3">
                  <div className="rounded-xl rounded-tl-none px-3 py-2 text-xs text-white" style={{ background: ACCENT }}>
                    I&apos;ve scanned your Officeworks receipt. Classifying as <strong>D5 — Other work-related expenses</strong>. Confidence: 92%.
                  </div>
                  <div className="rounded-xl rounded-tr-none px-3 py-2 text-xs" style={{ background: rowBg, color: textPrimary }}>
                    Why D5 and not D4?
                  </div>
                  <div className="rounded-xl rounded-tl-none px-3 py-2 text-xs text-white" style={{ background: ACCENT }}>
                    D4 covers self-education. Officeworks stationery for general work use falls under D5. Want me to change it?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* E&A STRIP */}
      <section className="py-8" style={{ borderTop: `1px solid ${border}`, background: bg1 }}>
        <div className={sectionContainer}>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold" style={{ color: ACCENT }}>EA</span>
              <div>
                <p className="font-bold" style={{ color: textPrimary }}>E&amp;A Advisory Pty Ltd</p>
                <p className="text-sm" style={{ color: textMuted }}>Registered Tax Agent · Real accountants behind every lodgement</p>
              </div>
            </div>
            <a href="https://eaadvisory.com.au/" target="_blank" rel="noopener noreferrer" className="shrink-0 text-sm font-medium transition hover:underline" style={{ color: ACCENT }}>
              eaadvisory.com.au →
            </a>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section id="get-started" className="relative overflow-hidden" style={{ borderTop: `1px solid ${border}`, background: bg1 }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,129,138,0.08) 0%, transparent 60%)" }} aria-hidden />
        <div className={`relative ${sectionContainer} text-center`}>
          <h2 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-heading-tf), system-ui", color: textPrimary }}>
            Your tax, under control.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-xl" style={{ color: textMuted }}>
            Always know what&apos;s happening. Stay organised. Reach your accountant. Start today — free to get started.
          </p>
          <div className="mt-10 flex justify-center">
            <a href={TAXFLOW_SIGNIN_URL} className="taxflow-btn-primary inline-flex w-full items-center justify-center rounded-lg px-12 py-5 text-lg font-bold text-white transition hover:opacity-90 sm:w-auto" style={{ background: ACCENT }}>
              Get started
            </a>
          </div>
          <p className="mt-6 text-center text-xs" style={{ color: `${textPrimary}66` }}>
            Tax and accounting services provided by E&amp;A Advisory Pty Ltd (Registered Tax Agent). TaxFlowAI is the technology platform.
          </p>
          <p className="mt-8 text-sm" style={{ color: textMuted }}>
            Questions? <a href="tel:+61406909862" className="hover:underline" style={{ color: ACCENT }}>0406 909 862</a> or <a href="mailto:taxflowai@frontline.financial" className="hover:underline" style={{ color: ACCENT }}>taxflowai@frontline.financial</a>
          </p>
        </div>
      </section>

      <TaxFlowAppFooter />
    </div>
  );
}
