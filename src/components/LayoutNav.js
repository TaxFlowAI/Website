"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import FrontlineLogoFull from "@/components/FrontlineLogoFull";

export default function LayoutNav({ activeNav = "home" }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isTaxFlowSite, setIsTaxFlowSite] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTaxFlowSite(window.location.hostname.includes("taxflow") || window.location.pathname.startsWith("/taxflow"));
    }
  }, []);

  const linkClass = (active) =>
    active
      ? "text-sm font-medium text-[#00FCB8] transition-colors"
      : "text-sm font-medium text-[#1C5472] transition-colors hover:text-[#39B2B2]";

  const dropdownLinkClass = (active) =>
    active
      ? "flex items-center gap-2 rounded-md py-2 px-3 text-sm font-medium text-[#00FCB8] bg-[#00FCB8]/10 transition-colors"
      : "flex items-center gap-2 rounded-md py-2 px-3 text-sm text-[#1C5472] transition-colors hover:bg-[#F5F5EF] hover:text-[#1C5472]";

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* BRAND SWITCHER BAR */}
      <div className="bg-[#0A1628] px-4 py-2 md:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex flex-1 items-center justify-center gap-0">
            <Link
              href="/"
              className={`inline-flex items-center rounded-t-lg px-4 py-2 text-sm font-medium transition ${
                !isTaxFlowSite
                  ? "border-b-[3px] border-[#00FCB8] bg-white/10 text-white"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Frontline Financial
            </Link>
            <Link
              href="/taxflow"
              className={`inline-flex items-center gap-1.5 rounded-t-lg px-4 py-2 text-sm font-medium transition ${
                isTaxFlowSite
                  ? "border-b-[3px] border-[#00FCB8] text-[#00FCB8]"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" /></svg>
              TaxFlowAI
            </Link>
          </div>
          <a href="tel:+61422959486" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-white transition hover:text-white/90">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            +61 422 959 486
          </a>
        </div>
      </div>
      {/* MAIN NAVBAR */}
      <nav className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 md:px-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center">
            <FrontlineLogoFull className="h-9 w-auto md:h-10" />
          </Link>
          <div className="hidden flex-1 items-center justify-center gap-6 lg:flex">
            <Link href="/" className={linkClass(activeNav === "home")}>Home</Link>
            <div className="relative" onMouseEnter={() => setServicesDropdownOpen(true)} onMouseLeave={() => setServicesDropdownOpen(false)}>
              <button className="flex items-center gap-1 text-sm font-medium text-[#1C5472] transition-colors hover:text-[#39B2B2]">
                Our Services
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div
                className={`absolute left-1/2 top-full z-50 mt-0 min-w-[320px] -translate-x-1/2 overflow-visible rounded-lg border border-gray-100 bg-white py-2 shadow-xl transition-opacity duration-200 ${servicesDropdownOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
              >
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full" aria-hidden>
                  <div className="border-8 border-transparent border-b-white" />
                </div>
                <div className="px-4 py-2">
                  <p className="mb-3 border-b border-[#00FCB8] pb-2 text-xs font-bold uppercase tracking-widest text-[#00FCB8]">Frontline Financial</p>
                  <Link href="/brokers" className={dropdownLinkClass(activeNav === "brokers")}>
                    <span className="text-[#39B2B2]" aria-hidden>🏠</span>
                    Brokers — Home loans, car loans &amp; commercial finance
                  </Link>
                  <Link href="/asset-solutions" className={dropdownLinkClass(activeNav === "asset-solutions")}>
                    <span className="text-[#39B2B2]" aria-hidden>🚗</span>
                    Asset Solutions — Car, equipment &amp; fleet finance
                  </Link>
                </div>
              </div>
            </div>
            <Link href="/about" className={linkClass(activeNav === "about")}>About Us</Link>
            <Link href="/financial-calculators" className={linkClass(activeNav === "calculators")}>Financial Calculators</Link>
            <Link href="/contact" className={linkClass(activeNav === "contact")}>Contact</Link>
          </div>
          <Link href="/contact" className="shrink-0 rounded-lg bg-[#00FCB8] px-4 py-2.5 text-sm font-bold text-[#1C5472] transition-all duration-200 hover:scale-105 hover:opacity-90">Book a Consultation</Link>
          <button type="button" className="inline-flex items-center justify-center rounded-lg p-2 text-[#1C5472] lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="border-t border-[#1C5472]/10 bg-white px-4 py-4 lg:hidden">
            <div className="flex flex-col gap-2">
              <Link href="/" className={`py-2 font-medium ${activeNav === "home" ? "text-[#00FCB8]" : "text-[#1C5472]"}`} onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <span className="py-2 font-medium text-[#1C5472]">Our Services</span>
              <Link href="/brokers" className={`pl-6 py-1 text-sm ${activeNav === "brokers" ? "text-[#00FCB8] font-medium" : "text-[#1C5472]"}`} onClick={() => setMobileMenuOpen(false)}>Frontline Financial Brokers</Link>
              <Link href="/asset-solutions" className={`pl-6 py-1 text-sm ${activeNav === "asset-solutions" ? "text-[#00FCB8] font-medium" : "text-[#1C5472]"}`} onClick={() => setMobileMenuOpen(false)}>Frontline Financial Asset Solutions</Link>
              <Link href="/about" className={`py-2 font-medium ${activeNav === "about" ? "text-[#00FCB8]" : "text-[#1C5472]"}`} onClick={() => setMobileMenuOpen(false)}>About Us</Link>
              <Link href="/financial-calculators" className={`py-2 font-medium ${activeNav === "calculators" ? "text-[#00FCB8]" : "text-[#1C5472]"}`} onClick={() => setMobileMenuOpen(false)}>Financial Calculators</Link>
              <Link href="/contact" className={`py-2 font-medium ${activeNav === "contact" ? "text-[#00FCB8]" : "text-[#1C5472]"}`} onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <Link href="/contact" className="mt-2 rounded-lg bg-[#00FCB8] py-3 text-center font-bold text-[#1C5472] transition-all duration-200 hover:scale-105" onClick={() => setMobileMenuOpen(false)}>Book a Consultation</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
