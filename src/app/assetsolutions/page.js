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
        <path d="M5 17h14v-5H5v5zM5 12V8l3-4h8l3 4v4" />
        <circle cx="7.5" cy="16" r="1.5" />
        <circle cx="16.5" cy="16" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Commercial Vehicle Finance",
    description: "Utes, vans, trucks and everything in between. Keep your business moving with flexible terms.",
    tag: "Business",
    icon: (
      <svg className="h-10 w-10 flex-shrink-0 text-[#1C5472]" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M3 15h4v3H3zM17 15h4v3h-4z" />
        <path d="M5 15V9l2-4h10l2 4v6" />
        <path d="M7 9h10" />
        <circle cx="7" cy="18" r="1.5" />
        <circle cx="17" cy="18" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Equipment & Machinery",
    description: "Fund the tools that grow your business. From construction equipment to medical devices.",
    tag: "Business",
    icon: (
      <svg className="h-10 w-10 flex-shrink-0 text-[#1C5472]" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        <path d="M12 5l2 2-2 2-2-2z" />
      </svg>
    ),
  },
  {
    title: "Personal Loans",
    description: "For life's bigger moments. Fast approvals, competitive rates, no hidden fees.",
    tag: "Personal",
    icon: (
      <svg className="h-10 w-10 flex-shrink-0 text-[#1C5472]" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        <rect x="2" y="12" width="20" height="8" rx="1" />
        <path d="M6 16v-2M10 16v-2M14 16v-2M18 16v-2" />
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
        <path d="M5 14H3v4h2M9 14H7v4h2M13 14h-2v4h2M17 14h-2v4h2M21 14h-2v4h2" />
        <path d="M3 14v-4l2-4h12l2 4v4" />
        <path d="M5 10h2M9 10h2M13 10h2M17 10h2M21 10h-2" />
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
                <img src="/images/sham.png" alt="Sham — Asset Finance Specialist" className="h-full w-full object-cover" />
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

      {/* 5. AWARD STRIP */}
      <section className="bg-[#1C5472] px-4 py-14 md:px-6 md:py-16 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center md:flex-row md:items-center md:gap-0">
          <div className="flex w-full justify-center md:w-[40%]">
            <div className="trophy-shimmer relative flex shrink-0 overflow-hidden rounded-2xl border-2 border-[#00FCB8]/50 shadow-xl md:rounded-3xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/fintelligence-award.png"
                alt="Frontline Financial team at Fintelligence Broker Awards FY25 — Hassan Arif JP and Sham celebrating Vehicle and Equipment Finance win"
                className="h-44 w-auto object-cover md:h-52"
                width={280}
                height={224}
              />
            </div>
          </div>
          <div className="my-6 h-px w-16 bg-[#00FCB8] md:my-0 md:h-20 md:w-px" aria-hidden />
          <div className="w-full text-center md:w-[60%] md:pl-10 md:text-left lg:pl-14">
            <p className="text-2xl font-bold text-[#00FCB8] md:text-3xl">Fintelligence Broker Awards FY25</p>
            <p className="mt-1 text-xl font-bold text-white md:text-2xl">Winner — Vehicle & Equipment Finance</p>
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
