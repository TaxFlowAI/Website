"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* Site-wide pop-up for the free Equifax credit report (Hassan, 15 Nov 2026). It waits about
   10 seconds or half a page of scrolling, shows once per visitor every 30 days, and closes
   easily: Google ranks pages lower on phones when a pop-up covers them straight away. It sits as a
   bottom sheet on phones and a centred card on larger screens. No dollar value: the same report
   is free from Equifax, so "valued at $X" would mislead. It stays off TaxFlowAI (a separate
   business), the ad landing page, the forms and the legal pages. */

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
        className="absolute inset-0 cursor-default bg-[#0A1628]/55"
      />
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="credit-report-popup-title"
        className="credit-popup-in relative w-full overflow-hidden rounded-t-2xl outline-none bg-[#0A1628] text-white shadow-2xl sm:max-w-lg sm:rounded-2xl"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00FCB8]"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" viewBox="0 0 24 24" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <div className="flex items-center gap-5 p-6 pr-12 sm:p-8 sm:pr-14">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/credit-score-phone.webp"
            alt=""
            width={1254}
            height={1254}
            className="h-auto w-24 shrink-0 sm:w-32"
          />
          <div>
            <h2 id="credit-report-popup-title" className="text-2xl font-bold leading-tight sm:text-3xl">
              Claim your free Equifax credit report
            </h2>
            <p className="mt-2 text-base leading-snug text-white/85">
              See what lenders will see before you apply. Free with your finance assessment.*
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 px-6 pb-6 sm:flex-row sm:items-center sm:px-8 sm:pb-8">
          <Link
            href="/#free-credit-report"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center rounded-lg bg-[#00FCB8] px-6 py-3 font-bold text-[#0A1628] transition-colors duration-200 hover:bg-white"
          >
            Claim my free report
          </Link>
          <button type="button" onClick={() => setOpen(false)} className="py-2 text-sm font-bold text-white/75 hover:text-white">
            No thanks
          </button>
        </div>
        <p className="border-t border-white/10 px-6 py-3 text-xs text-white/60 sm:px-8">
          *Conditions apply.{" "}
          <Link href="/#free-credit-report-terms" onClick={() => setOpen(false)} className="underline hover:text-white">
            See the terms
          </Link>
        </p>
      </div>
    </div>
  );
}
