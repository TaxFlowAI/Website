"use client";

import { useEffect, useState } from "react";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import WaveDivider from "@/components/WaveDivider";

// End of the 2025–26 financial year, AEST
const EOFY_DEADLINE = new Date("2026-06-30T23:59:59+10:00").getTime();

const REASONS = [
  {
    title: "EOFY sales pricing",
    description: "Take advantage of end of financial year sales while suppliers and dealers are motivated to move stock.",
    icon: (
      <svg className="h-10 w-10 flex-shrink-0 text-[#1C5472]" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M3 6h18M5 6l1.5 13a2 2 0 0 0 2 1.8h7a2 2 0 0 0 2-1.8L19 6" />
        <path d="M9 6V4a3 3 0 0 1 6 0v2" />
        <path d="M9.5 13.5l1.8 1.8 3.2-3.6" />
      </svg>
    ),
  },
  {
    title: "Lock it in before year-end",
    description: "Secure your asset before the financial year closes so it's in your business and working from day one.",
    icon: (
      <svg className="h-10 w-10 flex-shrink-0 text-[#1C5472]" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="4" y="11" width="16" height="9" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        <circle cx="12" cy="15.5" r="1.2" />
      </svg>
    ),
  },
  {
    title: "Plan ahead for 2026–27",
    description: "Start the new financial year with confidence, knowing your equipment and funding are already sorted.",
    icon: (
      <svg className="h-10 w-10 flex-shrink-0 text-[#1C5472]" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 11h18" />
        <path d="M9 16l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Instant asset write-off",
    description: "You may be able to take advantage of the instant asset write-off. Conditions may apply — please speak to your accountant to check eligibility.",
    icon: (
      <svg className="h-10 w-10 flex-shrink-0 text-[#1C5472]" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 2v20" />
        <path d="M17 6H9.5a3 3 0 0 0 0 6h5a3 3 0 0 1 0 6H6" />
      </svg>
    ),
  },
];

const ASSET_TYPES = [
  "Vehicles & utes",
  "Plant & equipment",
  "Machinery",
  "Trucks & trailers",
  "Technology & fit-outs",
  "Other business assets",
];

const ASSET_IMAGES = [
  {
    src: "/images/eofy-ute.jpeg",
    alt: "Grey Toyota Hilux ute driving on a gravel road",
    caption: "Vehicles & utes",
  },
  {
    src: "/images/eofy-excavator.webp",
    alt: "Komatsu PC360 excavator in a machinery yard",
    caption: "Plant & machinery",
  },
  {
    src: "/images/eofy-equipment.webp",
    alt: "Row of commercial gym equipment stations",
    caption: "Equipment & fit-outs",
  },
];

function pad(n) {
  return String(n).padStart(2, "0");
}

function CountdownCell({ value, label }) {
  return (
    <div className="w-20 rounded-xl border border-[#00FCB8]/30 bg-white/5 px-2 py-4 md:w-24">
      <div className="text-3xl font-bold tabular-nums text-[#00FCB8] md:text-4xl">{value}</div>
      <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#39B2B2]">{label}</div>
    </div>
  );
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, EOFY_DEADLINE - Date.now());
      const s = Math.floor(diff / 1000);
      setTimeLeft({
        days: Math.floor(s / 86400),
        hours: Math.floor((s % 86400) / 3600),
        mins: Math.floor((s % 3600) / 60),
        secs: s % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex justify-center gap-3 md:gap-4" aria-label="Time remaining until 30 June 2026">
      <CountdownCell value={timeLeft ? pad(timeLeft.days) : "--"} label="Days" />
      <CountdownCell value={timeLeft ? pad(timeLeft.hours) : "--"} label="Hours" />
      <CountdownCell value={timeLeft ? pad(timeLeft.mins) : "--"} label="Minutes" />
      <CountdownCell value={timeLeft ? pad(timeLeft.secs) : "--"} label="Seconds" />
    </div>
  );
}

export default function Eofy2026Page() {
  return (
    <div className="min-h-screen bg-[#F5F5EF] font-sans">
      <LayoutNav activeNav="" />

      {/* HERO */}
      <section className="section-dot-grid-dark relative overflow-hidden px-4 pt-14 pb-16 md:px-6 md:pt-20 md:pb-20 lg:px-8">
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[#00FCB8] opacity-[0.08] blur-[100px]" aria-hidden />
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-80 w-80 -translate-x-1/2 rounded-full bg-[#39B2B2] opacity-[0.08] blur-[100px]" aria-hidden />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#00FCB8]/40 bg-[#00FCB8]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#00FCB8]">
            EOFY 2026 &middot; Asset Finance
          </p>
          <h1 className="mt-6 text-5xl font-bold leading-tight text-white md:text-6xl">
            Beat the June 30 deadline.
          </h1>
          <p className="mt-2 text-5xl font-bold text-[#00FCB8] md:text-6xl">
            Get it earning from day one.
          </p>
          <p className="mt-6 text-xl text-[#39B2B2]">
            Finance your next business asset before EOFY. Fast approvals, zero jargon — that&apos;s how we do it.
          </p>
          <div className="mt-10">
            <Countdown />
            <p className="mt-3 text-sm text-white/60">Until the end of the 2025&ndash;26 financial year</p>
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="tel:+61450553877" className="inline-flex w-full items-center justify-center rounded-lg bg-[#00FCB8] px-8 py-4 text-lg font-bold text-[#1C5472] transition-all duration-200 hover:scale-105 hover:opacity-90 sm:w-auto">
              Call Sham: 0450 553 877
            </a>
            <a href="mailto:sham@frontline.financial?subject=EOFY%202026%20asset%20finance%20enquiry" className="inline-flex w-full items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-bold text-white transition-all duration-200 hover:scale-105 hover:bg-white/10 sm:w-auto">
              Email Sham
            </a>
          </div>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <span className="text-white">24hr Approvals</span>
            <span className="h-5 w-px bg-[#39B2B2]" aria-hidden />
            <span className="text-white">30+ Lenders</span>
            <span className="h-5 w-px bg-[#39B2B2]" aria-hidden />
            <span className="text-white">5/5 Google Reviews</span>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {ASSET_IMAGES.map((image) => (
              <figure
                key={image.caption}
                className="overflow-hidden rounded-2xl border-2 border-[#00FCB8]/50 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:border-[#00FCB8]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image.src} alt={image.alt} className="h-44 w-full object-cover md:h-48" />
                <figcaption className="bg-[#0A1628] px-4 py-3 text-sm font-bold text-[#00FCB8]">
                  {image.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fill="#F5F5EF" />

      {/* BOLD STATEMENT STRIP */}
      <section className="bg-[#0A1628] py-6">
        <div className="mx-auto max-w-4xl px-4 text-center text-2xl font-bold text-white md:px-6 lg:px-8">
          The end of the financial year is fast approaching. <span className="text-[#00FCB8]">Don&apos;t miss out.</span>
        </div>
      </section>

      <WaveDivider fill="#F5F5EF" />

      {/* WHY ACT BEFORE 30 JUNE */}
      <section className="bg-[#F5F5EF] px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">THE EOFY ADVANTAGE</p>
          <h2 className="mt-2 border-l-4 border-[#00FCB8] pl-4 text-3xl font-bold text-[#1C5472] md:text-4xl">
            Why act before 30 June?
          </h2>
          <p className="mt-4 max-w-3xl text-[#1C5472]">
            Now is the perfect time to review your assets and take advantage of end of financial year sales.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {REASONS.map((reason) => (
              <article
                key={reason.title}
                className="flex flex-col rounded-xl border-t-[3px] border-[#39B2B2] bg-white p-6 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                {reason.icon}
                <h3 className="mt-4 text-xl font-bold text-[#1C5472]">{reason.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#1C5472]">{reason.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fill="#1C5472" />

      {/* WHAT WE FUND */}
      <section className="bg-[#1C5472] px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">WHAT WE FUND</p>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            Whatever your business needs
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-[#39B2B2]">
            Whether you&apos;re looking to acquire equipment, vehicles, or other assets, our team at Frontline Financial can help you structure a solution that makes sense for your business.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {ASSET_TYPES.map((type) => (
              <span
                key={type}
                className="rounded-full border border-[#39B2B2]/60 bg-white/5 px-5 py-2.5 text-sm font-medium text-white"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fill="#00FCB8" />

      {/* CTA */}
      <section id="contact" className="bg-[#00FCB8] px-4 py-14 md:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-[#1C5472] md:text-5xl lg:text-6xl">
            Let&apos;s make your assets
          </h2>
          <p className="mt-2 text-4xl font-bold text-[#0A1628] md:text-5xl lg:text-6xl">
            work harder for you.
          </p>
          <p className="mt-4 text-lg text-[#1C5472] md:text-xl">
            Get in touch with Sham today to discuss what&apos;s possible before 30 June.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="tel:+61450553877" className="inline-flex w-full items-center justify-center rounded-lg bg-[#1C5472] px-6 py-3 font-bold text-white transition-all duration-200 hover:scale-105 hover:opacity-90 sm:w-auto">
              Call Sham: 0450 553 877
            </a>
            <a href="mailto:sham@frontline.financial?subject=EOFY%202026%20asset%20finance%20enquiry" className="inline-flex w-full items-center justify-center rounded-lg border-2 border-[#1C5472] bg-transparent px-6 py-3 font-bold text-[#1C5472] transition-all duration-200 hover:scale-105 hover:bg-[#1C5472]/10 sm:w-auto">
              sham@frontline.financial
            </a>
          </div>
          <p className="mt-8 text-sm text-[#1C5472]/80">
            Sham Martyn &middot; Director &middot; Frontline Financial: Asset Solutions
          </p>
        </div>
      </section>

      <WaveDivider fill="#1C5472" />

      <LayoutFooter />
    </div>
  );
}
