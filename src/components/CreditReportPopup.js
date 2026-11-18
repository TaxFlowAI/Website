"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* Site-wide pop-up for the free Equifax credit report (Hassan, 15 Nov 2026).

   v2, same day: Hassan wanted it to land harder ("give it a better hit of dopamine, really show the value").
   It now opens on a locked credit file: the score rolls like a slot machine and stops on "?", the rows
   stay blurred, a FREE stamp lands, and the button unlocks it. The value is what lenders see, shown,
   not a price: never give it a dollar value (the same report is free from Equifax, so "valued at $X"
   would mislead), never promise it won't affect a score, and no fake urgency or guilt-trip "no" button.

   Timing is unchanged: about 10 seconds or half a page of scrolling, once per visitor every 30 days,
   easy to close (Google ranks pages lower on phones when a pop-up covers them straight away). Bottom
   sheet on phones, centred card on larger screens. It stays off TaxFlowAI (a separate business), the ad
   landing page, the forms and the legal pages. Animations stop under prefers-reduced-motion. */

const STORAGE_KEY = "ff-credit-report-popup";
const QUIET_DAYS = 30;
const DELAY_MS = 10000;
const SCROLL_SHARE = 0.5;
const HIDDEN_ON = [
  "/taxflow",
  "/vehicle-finance",
  "/apply",
  "/car-loan",
  "/dean",
  "/contact/thank-you",
  "/self-employed-home-loans/assessment",
  "/privacy",
  "/credit-guide",
  "/eofy-2026",
];

const VALUE = [
  "Your score, and every enquiry, account and default on your file",
  "Spot errors or old defaults before a lender does",
  "Our team walks you through it, and no application goes to any lender",
];

const FILE_ROWS = [
  ["Credit enquiries", "w-10"],
  ["Defaults", "w-7"],
  ["Accounts open", "w-9"],
  ["Repayment history", "w-14"],
];

function seenRecently() {
  try {
    const at = Number(window.localStorage.getItem(STORAGE_KEY));
    return at > 0 && Date.now() - at < QUIET_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function remember() {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    /* private mode: it may show again next visit */
  }
}

function LockIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 118 0v3" />
    </svg>
  );
}

/* The score rolls through numbers for about a second, then stops on "?": yours is the one we can't show. */
function RollingScore() {
  const [value, setValue] = useState("?");
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let n = 0;
    setValue("612");
    const t = window.setInterval(() => {
      n += 1;
      if (n > 16) {
        window.clearInterval(t);
        setValue("?");
        return;
      }
      setValue(String(380 + Math.floor(Math.random() * 520)));
    }, 70);
    return () => window.clearInterval(t);
  }, []);
  return (
    <span key={value === "?" ? "q" : "n"} className={`block text-4xl font-bold tabular-nums leading-none ${value === "?" ? "credit-popup-pop text-[#00FCB8]" : "text-white"}`}>
      {value}
    </span>
  );
}

function LockedFile() {
  return (
    <div className="credit-popup-card relative mx-auto w-full max-w-[220px] rounded-2xl bg-[#0A1628] p-3.5 sm:max-w-[250px] sm:p-4 text-white shadow-[0_25px_50px_-15px_rgba(10,22,40,0.8)] ring-1 ring-white/10">
      <div className="flex items-center gap-1.5 text-xs font-bold text-white/70">
        <LockIcon />
        <span>Your Equifax credit file</span>
      </div>
      {/* gauge: the needle sweeps, the score rolls, then both settle */}
      <div className="relative mx-auto mt-3 h-[62px] w-[120px] sm:h-[78px] sm:w-[150px]">
        <svg viewBox="0 0 150 80" className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="creditGauge" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#1C5472" />
              <stop offset="0.55" stopColor="#39B2B2" />
              <stop offset="1" stopColor="#00FCB8" />
            </linearGradient>
          </defs>
          <path d="M12 75 A63 63 0 0 1 138 75" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="11" strokeLinecap="round" />
          <path className="credit-popup-arc" d="M12 75 A63 63 0 0 1 138 75" fill="none" stroke="url(#creditGauge)" strokeWidth="11" strokeLinecap="round" pathLength="100" />
        </svg>
        <div className="credit-popup-needle absolute bottom-[3px] left-1/2 h-[42px] w-[3px] sm:h-[52px] -translate-x-1/2 rounded-full bg-white" style={{ transformOrigin: "50% 100%" }} aria-hidden />
        <div className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-white" aria-hidden />
      </div>
      <div className="mt-2 text-center sm:mt-3">
        <RollingScore />
        <span className="mt-1 block text-[11px] font-bold text-white/60">Your score</span>
      </div>
      <ul className="mt-3 space-y-1.5 max-sm:[@media(max-height:780px)]:hidden">
        {FILE_ROWS.map(([label, width], i) => (
          <li key={label} className={`${i > 1 ? "hidden sm:flex" : "flex"} items-center justify-between rounded-lg bg-white/[0.06] px-2.5 py-1.5 text-[11px]`}>
            <span className="text-white/75">{label}</span>
            <span className={`credit-popup-blur h-2.5 ${width} rounded-xs bg-[#00FCB8]/70`} aria-hidden />
          </li>
        ))}
      </ul>
      <span className="credit-popup-stamp absolute -right-4 -top-4 rounded-xl border-[3px] border-[#1C5472] bg-white px-3 py-1 text-xl font-bold tracking-wide text-[#1C5472] shadow-lg">
        FREE*
      </span>
    </div>
  );
}

export default function CreditReportPopup() {
  const pathname = usePathname() || "/";
  const hidden = HIDDEN_ON.some((p) => pathname === p || pathname.startsWith(`${p}/`) || pathname.startsWith(`${p}-`));
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (hidden || seenRecently()) return undefined;
    let done = false;
    const show = () => {
      if (done) return;
      /* on the home page, skip it if the claim form is already on screen */
      const section = document.getElementById("free-credit-report");
      if (section) {
        const r = section.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) return;
      }
      done = true;
      remember();
      setOpen(true);
    };
    const timer = window.setTimeout(show, DELAY_MS);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= SCROLL_SHARE) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [hidden, pathname]);

  useEffect(() => {
    if (!open) return undefined;
    dialogRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (hidden || !open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        onClick={() => setOpen(false)}
        className="credit-popup-backdrop absolute inset-0 cursor-default bg-[#0A1628]/65 backdrop-blur-[3px]"
      />
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="credit-report-popup-title"
        className="credit-popup-in relative grid max-h-[92dvh] w-full overflow-y-auto overflow-x-hidden rounded-t-3xl bg-white text-[#1C5472] shadow-2xl outline-none sm:max-w-[720px] sm:grid-cols-[minmax(0,290px)_minmax(0,1fr)] sm:rounded-3xl"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 rounded-md bg-white/80 p-2 text-[#1C5472] backdrop-blur transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1C5472]"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" viewBox="0 0 24 24" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {/* the hook: a locked credit file */}
        <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#00FCB8] via-[#39B2B2] to-[#1C5472] px-10 pb-5 pt-7 sm:px-8 sm:py-10">
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/25 blur-2xl" aria-hidden />
          <LockedFile />
        </div>

        <div className="px-5 pb-5 pt-5 sm:px-8 sm:pb-7 sm:pt-9">
          <h2 id="credit-report-popup-title" className="text-[1.55rem] font-bold leading-[1.1] tracking-tight sm:text-[2.1rem]">
            Lenders check this before they say yes.{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span className="absolute inset-x-[-4px] bottom-[2px] top-[45%] -z-0 -skew-x-6 rounded bg-[#00FCB8]" aria-hidden />
              <span className="relative">Seen yours?</span>
            </span>
          </h2>
          <p className="mt-2.5 text-sm leading-snug text-[#1C5472]/80 sm:mt-3 sm:text-[15px] max-sm:[@media(max-height:780px)]:hidden">
            One old default or a pile of enquiries can turn a yes into a no. See your Equifax file first. It&apos;s free with
            your finance assessment.*
          </p>
          <ul className="mt-3.5 space-y-2 sm:mt-4 sm:space-y-2.5">
            {VALUE.map((item, i) => (
              <li key={item} className="credit-popup-item flex items-start gap-2.5 text-sm font-bold leading-snug sm:text-[15px]" style={{ animationDelay: `${0.9 + i * 0.18}s` }}>
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00FCB8]">
                  <svg className="h-3 w-3 text-[#0A1628]" fill="none" stroke="currentColor" strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/#free-credit-report"
            onClick={() => setOpen(false)}
            className="credit-popup-cta group relative mt-5 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#1C5472] px-6 py-4 text-lg font-bold text-white shadow-[0_12px_30px_-10px_rgba(28,84,114,0.8)] transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00FCB8] focus-visible:ring-offset-2"
          >
            <LockIcon className="h-5 w-5 text-[#00FCB8]" />
            Unlock my free report
            <svg className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="flex items-center gap-1.5 text-xs font-bold text-[#1C5472]/80">
              <span className="text-[#F5B400]" aria-hidden>★★★★★</span>
              5.0 from 100+ Google reviews
            </span>
            <button type="button" onClick={() => setOpen(false)} className="shrink-0 py-1 text-sm font-bold text-[#1C5472]/60 hover:text-[#1C5472]">
              Maybe later
            </button>
          </div>
          <p className="mt-3 border-t border-[#1C5472]/10 pt-2.5 text-xs text-[#1C5472]/60 sm:mt-4 sm:pt-3">
            *Conditions apply.{" "}
            <Link href="/#free-credit-report-terms" onClick={() => setOpen(false)} className="underline hover:text-[#1C5472]">
              See the terms
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
