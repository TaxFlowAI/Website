"use client";

import { useState } from "react";
import Link from "next/link";
import BrandSwitcherBar from "@/components/BrandSwitcherBar";

const TAXFLOW_SIGNIN_URL = "https://taxflowai.frontline.financial/login";

const NAV_LINKS = [
  { href: "/taxflow/features", label: "Features" },
  { href: "/taxflow/how-it-works", label: "How it works" },
  { href: "/taxflow/faq", label: "FAQ" },
  { href: "/taxflow/contact", label: "Contact" },
];

export default function TaxFlowHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <BrandSwitcherBar />
      <div
        className="border-b"
        style={{ borderColor: "rgba(255,255,255,0.08)", background: "#0A1628" }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/taxflow" className="text-lg font-bold tracking-tight md:text-xl">
            <span className="text-white">TaxFlow</span>
            <span style={{ color: "#00FCB8" }}>AI</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex" aria-label="TaxFlowAI">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="tc-nav-link text-[13.5px] font-medium"
                style={{ color: "#C7D2DC" }}
              >
                {l.label}
              </Link>
            ))}
            <a
              href="tel:+61406909862"
              className="tc-mono hidden text-[12.5px] lg:inline-block"
              style={{ color: "#94A3B8" }}
            >
              0406 909 862
            </a>
            <a
              href={TAXFLOW_SIGNIN_URL}
              className="text-[13.5px] font-medium text-white/90 transition hover:text-white"
            >
              Sign in
            </a>
            <a
              href={TAXFLOW_SIGNIN_URL}
              className="tc-btn-primary rounded-lg px-4 py-2 text-[13.5px] font-bold"
            >
              Get started
            </a>
          </nav>
          {/* mobile */}
          <div className="flex items-center gap-3 md:hidden">
            <a
              href={TAXFLOW_SIGNIN_URL}
              className="tc-btn-primary rounded-lg px-3.5 py-2 text-[13px] font-bold"
            >
              Get started
            </a>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="rounded-lg border p-2"
              style={{ borderColor: "rgba(255,255,255,0.16)", color: "#E2E8F0" }}
            >
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
                {open ? (
                  <path d="M3 3l10 10M13 3L3 13" />
                ) : (
                  <path d="M2 4.5h12M2 8h12M2 11.5h12" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {open && (
          <nav className="tc-drawer px-5 pb-4 pt-2 md:hidden" aria-label="TaxFlowAI mobile">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <a href={TAXFLOW_SIGNIN_URL}>Sign in</a>
            <a href="tel:+61406909862" className="tc-mono">0406 909 862</a>
          </nav>
        )}
      </div>
    </header>
  );
}
