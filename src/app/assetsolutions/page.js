"use client";

import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import WaveDivider from "@/components/WaveDivider";

const FINANCE_CARDS = [
  {
    title: "Car Loans",
    description: "New or used, we find you the best rate from 30+ lenders. Fast approval, minimal paperwork.",
    tag: "Personal & Business",
    icon: (
      <svg className="h-10 w-10 flex-shrink-0 text-[#1C5472]" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
        <circle cx="7" cy="17" r="2" />
        <path d="M9 17h6" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
  },
  {
    title: "Commercial Vehicle Finance",
    description: "Utes, vans, trucks and everything in between. Keep your business moving with flexible terms.",
    tag: "Business",
    icon: (
      <svg className="h-10 w-10 flex-shrink-0 text-[#1C5472]" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
        <path d="M15 18H9" />
        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
        <circle cx="17" cy="18" r="2" />
        <circle cx="7" cy="18" r="2" />
      </svg>
    ),
  },
  {
    title: "Equipment & Machinery",
    description: "Fund the tools that grow your business. From construction equipment to medical devices.",
    tag: "Business",
    icon: (
      <svg className="h-10 w-10 flex-shrink-0 text-[#1C5472]" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M10 18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a3 3 0 0 1-3-3 1 1 0 0 1 1-1z" />
        <path d="M13 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1l-.81 3.242a1 1 0 0 1-.97.758H8" />
        <path d="M14 4h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3" />
        <path d="M18 6h4" />
        <path d="m5 10-2 8" />
        <path d="m7 18 2-8" />
      </svg>
    ),
  },
  {
    title: "Personal Loans",
    description: "For life's bigger moments. Fast approvals, competitive rates, no hidden fees.",
    tag: "Personal",
    icon: (
      <svg className="h-10 w-10 flex-shrink-0 text-[#1C5472]" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
        <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
        <path d="m2 16 6 6" />
        <circle cx="16" cy="9" r="2.9" />
        <circle cx="6" cy="5" r="3" />
      </svg>
    ),
  },
  {
    title: "Working Capital",
    description: "Keep cash flowing when you need it most. Business lines of credit and working capital solutions.",
    tag: "Business",
    icon: (
      <svg className="h-10 w-10 flex-shrink-0 text-[#1C5472]" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-8 4 4 4-8" />
      </svg>
    ),
  },
  {
    title: "Fleet Finance",
    description: "Scale your fleet without the stress. Tailored fleet funding solutions for businesses of any size.",
    tag: "Business",
    icon: (
      <svg className="h-10 w-10 flex-shrink-0 text-[#1C5472]" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M13 6v5a1 1 0 0 0 1 1h6.102a1 1 0 0 1 .712.298l.898.91a1 1 0 0 1 .288.702V17a1 1 0 0 1-1 1h-3" />
        <path d="M5 18H3a1 1 0 0 1-1-1V8a2 2 0 0 1 2-2h12c1.1 0 2.1.8 2.4 1.8l1.176 4.2" />
        <path d="M9 18h5" />
        <circle cx="16" cy="18" r="2" />
        <circle cx="7" cy="18" r="2" />
      </svg>
    ),
  },
];

const STEPS = [
  { num: 1, title: "Tell us what you need", desc: "Fill out our quick 5-minute form with your requirements and basic details." },
  { num: 2, title: "We search 30+ lenders", desc: "Sham personally reviews your application and matches you with the best available lender for your situation." },
  { num: 3, title: "Get your options", desc: "We present you with clear options — rates, terms, repayments — no hidden fees or confusing jargon." },
  { num: 4, title: "Drive away approved", desc: "Once you choose, we handle all the paperwork and get you approved fast." },
];

export default function AssetSolutionsPage() {
  return (
    <div className="min-h-screen bg-[#F5F5EF] font-sans">
      <LayoutNav activeNav="asset-solutions" />

      {/* 1. HERO */}
      <section className="section-dot-grid-dark relative px-4 pt-12 pb-16 md:px-6 md:pt-16 md:pb-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl">
            Drive it. Build it. Fund it.
          </h1>
          <p className="mt-2 text-5xl font-bold text-[#00FCB8] md:text-6xl">
            For every Australian.
          </p>
          <p className="mt-6 text-xl text-[#39B2B2]">
            Fast approvals on car loans, equipment finance and fleet solutions for everyday Australians and growing businesses.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="#apply" className="inline-flex w-full items-center justify-center rounded-lg bg-[#00FCB8] px-8 py-4 text-lg font-bold text-[#1C5472] transition-all duration-200 hover:scale-105 hover:opacity-90 sm:w-auto">
              Apply Now
            </a>
            <a href="tel:+61422959486" className="inline-flex w-full items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-bold text-white transition-all duration-200 hover:scale-105 hover:bg-white/10 sm:w-auto">
              Talk to Sham
            </a>
          </div>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <span className="text-white">24hr Approvals</span>
            <span className="h-5 w-px bg-[#39B2B2]" aria-hidden />
            <span className="text-white">30+ Lenders</span>
            <span className="h-5 w-px bg-[#39B2B2]" aria-hidden />
            <span className="text-white">5/5 Google Reviews</span>
          </div>
        </div>
      </section>

      <WaveDivider fill="#F5F5EF" />

      {/* BOLD STATEMENT STRIP */}
      <section className="bg-[#0A1628] py-6">
        <div className="mx-auto max-w-4xl px-4 text-center text-2xl font-bold text-white md:px-6 lg:px-8">
          Too many Australians are paying too much for their car loan. <span className="text-[#00FCB8]">That ends here.</span>
        </div>
      </section>

      <WaveDivider fill="#F5F5EF" />

      {/* 2. FINANCE TYPES */}
      <section className="bg-[#F5F5EF] px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">WHAT WE FUND</p>
          <h2 className="mt-2 border-l-4 border-[#00FCB8] pl-4 text-3xl font-bold text-[#1C5472] md:text-4xl">
            Whatever you need to move forward
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FINANCE_CARDS.map((card) => (
              <article
                key={card.title}
                className="flex flex-col rounded-xl border-t-[3px] border-[#39B2B2] bg-white p-6 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start gap-4">
                  {card.icon}
                  <div className="min-w-0 flex-1">
                    <span className="inline-block rounded-full bg-[#00FCB8] px-3 py-1 text-xs font-medium text-[#1C5472]">
                      {card.tag}
                    </span>
                    <h3 className="mt-3 text-xl font-bold text-[#1C5472]">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#1C5472]">{card.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fill="#1C5472" />

      {/* 3. HOW IT WORKS */}
      <section className="bg-[#1C5472] px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">THE PROCESS</p>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            Approved in as little as 24 hours
          </h2>
          <div className="mt-14 grid gap-10 md:grid-cols-4 md:gap-0">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className={`flex flex-col items-center text-center md:border-l-2 md:border-dashed md:border-[#39B2B2] md:px-4 md:first:border-l-0 md:first:pl-0 md:last:pr-0`}
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#00FCB8] text-2xl font-bold text-[#1C5472]">
                  {step.num}
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#39B2B2]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fill="#F5F5EF" />

      {/* 4. MEET SHAM */}
      <section className="bg-[#F5F5EF] px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:items-start">
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative h-72 w-full max-w-sm overflow-hidden rounded-2xl bg-[#1C5472]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/sham.png" alt="Sham, Asset Finance Specialist" className="h-full w-full object-cover object-top" />
              </div>
              <p className="mt-4 text-2xl font-bold text-[#1C5472]">Sham</p>
              <p className="text-[#39B2B2]">Asset Finance Specialist</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">YOUR SPECIALIST</p>
              <h2 className="mt-2 text-3xl font-bold text-[#1C5472] md:text-4xl">
                You&apos;ll deal directly with Sham.
              </h2>
              <p className="mt-6 leading-relaxed text-[#1C5472]">
                No call centres. No being passed around. When you work with Frontline Financial Asset Solutions, you deal directly with Sham from start to finish — someone who genuinely cares about getting you the best outcome.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Direct line to your specialist — no middlemen",
                  "Personalised advice for your exact situation",
                  "Fast responses — typically same day",
                  "Ongoing support beyond settlement",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[#1C5472]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center text-[#00FCB8]" aria-hidden>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <blockquote className="mt-10 border-l-4 border-[#39B2B2] bg-[#1C5472] py-4 pl-6 pr-6 italic text-white">
                &quot;Sham was phenomenal to say the least. He got my loan approved in less than 24 hours. Absolute legend!&quot;
                <footer className="mt-3 not-italic text-white/90">
                  — Mikhail Alwajih <span className="text-[#FFD700]">★★★★★</span>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider fill="#1C5472" />

      {/* 5. AWARD + FEATURED ARTICLE — matches the home page block */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1C5472] via-[#164360] to-[#1C5472] px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_50%,rgba(0,252,184,0.12)_0%,transparent_50%)]" aria-hidden />
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[#00FCB8] opacity-[0.08] blur-[80px]" aria-hidden />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center md:flex-row md:items-center md:gap-0">
          <div className="flex w-full justify-center md:w-[40%]">
            <div className="trophy-shimmer relative flex shrink-0 flex-col items-center">
              <div className="relative overflow-hidden rounded-2xl border-2 border-[#00FCB8]/50 shadow-xl ring-2 ring-[#00FCB8]/20 md:rounded-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/fintelligence-award.png"
                  alt="Frontline Financial team at Fintelligence Broker Awards FY25 — Hassan Arif JP and Sham celebrating Vehicle and Equipment Finance win"
                  className="h-48 w-auto object-cover md:h-56 lg:h-64"
                  width={320}
                  height={256}
                />
              </div>
              <span className="mt-3 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em] text-[#00FCB8]/90 md:text-xs">Asset Solutions</span>
            </div>
          </div>
          <div className="my-8 h-px w-24 bg-gradient-to-r from-transparent via-[#00FCB8] to-transparent md:my-0 md:h-28 md:w-px md:bg-gradient-to-b from-transparent via-[#00FCB8] to-transparent" aria-hidden />
          <div className="w-full text-center md:w-[60%] md:pl-12 md:text-left lg:pl-16">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#00FCB8] md:text-sm">Frontline Financial: Asset Solutions</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl">
              Award Winning.
            </h2>
            <p className="mt-2 text-xl font-bold text-[#00FCB8] md:text-2xl lg:text-3xl">
              Fintelligence Broker Awards FY25
            </p>
            <p className="mt-3 text-base font-semibold text-white/95 md:text-lg">
              Winner — Vehicle &amp; Equipment Finance
            </p>
            <p className="mt-4 max-w-md text-sm text-white/80 md:mt-6">
              Recognised for excellence in car, equipment, and asset finance. We don&apos;t just broker deals — we get you behind the wheel and into the gear you need, fast.
            </p>

            {/* Featured article — Fintelligence customer success story */}
            <div className="mt-6 border-t border-white/15 pt-6 md:mt-8 md:pt-8">
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold uppercase tracking-wide text-white/70 md:justify-start">
                <span>As featured in</span>
                <span className="inline-flex items-center rounded-md bg-white px-2.5 py-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/fintelligence-logo.png"
                    alt="Fintelligence"
                    className="h-5 w-auto"
                    onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextElementSibling?.classList.remove("hidden"); }}
                  />
                  <span className="hidden text-base font-bold normal-case tracking-normal text-[#1C5472]">fintelligence<span className="text-[#00FCB8]">.</span></span>
                </span>
              </div>
              <p className="mt-3 max-w-md text-sm text-white/80">
                Fintelligence also featured us in a customer success story on how Sham and the team became Best Newcomer within their first 12 months.
              </p>
            </div>

            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
              <a
                href="https://fintelligence.com.au/customer-success-story-frontline-financial-group/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#00FCB8] px-6 py-3 font-bold text-[#0A1628] transition-all duration-200 hover:scale-105 hover:opacity-90"
              >
                Read the full article
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
              </a>
              <a href="#apply" className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#00FCB8] bg-[#00FCB8]/10 px-6 py-3 font-bold text-[#00FCB8] transition hover:bg-[#00FCB8] hover:text-[#0A1628]">
                Apply Now
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider fill="#00FCB8" />

      {/* 6. CTA */}
      <section id="apply" className="bg-[#00FCB8] px-4 py-14 md:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-[#1C5472] md:text-5xl lg:text-6xl">
            The right deal exists.
          </h2>
          <p className="mt-2 text-4xl font-bold text-[#0A1628] md:text-5xl lg:text-6xl">
            We&apos;ll find it.
          </p>
          <p className="mt-4 text-lg text-[#1C5472] md:text-xl">
            30+ lenders. One specialist who actually gives a damn. Any situation welcome. Let&apos;s get you moving.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="/contact" className="inline-flex w-full items-center justify-center rounded-lg bg-[#1C5472] px-6 py-3 font-bold text-white transition-all duration-200 hover:scale-105 hover:opacity-90 sm:w-auto">
              Apply Now
            </a>
            <a href="tel:+61422959486" className="inline-flex w-full items-center justify-center rounded-lg border-2 border-[#1C5472] bg-transparent px-6 py-3 font-bold text-[#1C5472] transition-all duration-200 hover:scale-105 hover:bg-[#1C5472]/10 sm:w-auto">
              Call Sham: +61 422 959 486
            </a>
          </div>
        </div>
      </section>

      <WaveDivider fill="#1C5472" />

      <LayoutFooter />
    </div>
  );
}
