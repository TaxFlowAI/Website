"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import WaveDivider from "@/components/WaveDivider";
import FormConsent, { CONSENT_ERROR } from "@/components/FormConsent";
import { ENTITY } from "@/config/entities";

const GOOGLE_REVIEWS = [
  {
    name: "Oliver Stewart",
    stars: 5,
    text: "The team at Frontline Financial are extraordinary at what they do. I dealt with Sham personally when trying to finance my new car. He quickly gave me options over multiple lenders that ensured I got the best possible deal.",
  },
  {
    name: "Sosefo Langi",
    stars: 5,
    text: "I can't thank Frontline Financial enough for everything they've done to help me start my business. Sham helped me secure a loan for my vehicle, making the whole process smooth and stress-free. Huss has been a huge asset in getting my business up and running.",
  },
  {
    name: "Amy France",
    stars: 5,
    text: "I had a great experience with Frontline Financial Group. They were fast, friendly, and incredibly helpful throughout the entire loan process. Sham made everything clear and easy to understand.",
  },
  {
    name: "Mikhail Alwajih",
    stars: 5,
    text: "Sham was phenomenal to say the least. He got my loan approved in less than 24 hours. Absolute legend!",
  },
  {
    name: "Dan Goundar",
    stars: 5,
    text: "I would like to thank Frontline Financial Group for assisting me in securing my business loan within just a few days. The staff were incredibly nice, friendly, and professional throughout.",
  },
];

const GOOGLE_REVIEW_LINK = "https://www.google.com/search?q=frontline+financial+group&rlz=1C1RXQR_en-GBAU1181AU1181&oq=frontline+financ&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARBFGDkyBggCEEUYPDIGCAMQRRg8MgYIBBBFGEEyBggFEEUYPDIGCAYQRRhBMgYIBxBFGEHSAQgyMDM4ajBqNKgCALACAQ&sourceid=chrome&ie=UTF-8#lrd=0x22393410488c393:0x1a79eb822c43357b,1,,,,";

const TRUST_BADGES = [
  {
    icon: (
      <svg className="h-7 w-7 flex-shrink-0 text-[#00FCB8]" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    line1: "ASIC Regulated",
    line2: "Licensed & Compliant",
  },
  {
    icon: (
      <svg className="h-7 w-7 flex-shrink-0 text-[#00FCB8]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
      </svg>
    ),
    line1: "5/5 Google Reviews",
    line2: "500+ Clients Helped",
  },
  {
    icon: (
      <svg className="h-7 w-7 flex-shrink-0 text-[#00FCB8]" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <polyline points="14 9 14 2 10 2 10 9" />
        <path d="M6 2h12" />
        <path d="M6 9H4a2 2 0 0 0-2 2v1a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6v-1a2 2 0 0 0-2-2h-2" />
        <path d="M12 11l1.2 2.4 2.6.4-1.9 1.9.4 2.6-2.3-1.2-2.3 1.2.4-2.6-1.9-1.9 2.6-.4L12 11z" fill="currentColor" stroke="none" />
        <line x1="12" y1="18" x2="12" y2="22" />
        <line x1="8" y1="22" x2="16" y2="22" />
      </svg>
    ),
    line1: "Award Winner FY25",
    line2: "Fintelligence Broker Awards",
  },
  {
    icon: (
      <svg className="h-7 w-7 flex-shrink-0 text-[#00FCB8]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    line1: "Australian Owned",
    line2: "Serving Clients Nationwide",
  },
];

const CONSULTATION_SERVICES = [
  {
    id: "brokers",
    label: "Frontline Financial Brokers",
    shortLabel: "Brokers",
    description: "Home loans & mortgage",
    icon: (
      <svg className="h-16 w-16 text-[#1C5472] sm:h-20 sm:w-20" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    id: "asset-solutions",
    label: "Frontline Financial: Asset Solutions",
    shortLabel: "Asset Solutions",
    description: "Car & equipment finance",
    icon: (
      <svg className="h-16 w-16 text-[#1C5472] sm:h-20 sm:w-20" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M5 17h14v-5H5v5zM5 10h14V8l-3-4H8L5 8v2z" />
        <circle cx="7.5" cy="16.5" r="1.5" />
        <circle cx="16.5" cy="16.5" r="1.5" />
      </svg>
    ),
  },
];

export default function Home() {
  const router = useRouter();
  const [reviewIndex, setReviewIndex] = useState(0);
  const [consultationStep, setConsultationStep] = useState("choose"); // "choose" | "form"
  const [selectedService, setSelectedService] = useState(null);
  const [consultationForm, setConsultationForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [consultationConsent, setConsultationConsent] = useState(false);
  const [consultationSubmitting, setConsultationSubmitting] = useState(false);
  const [consultationSuccess, setConsultationSuccess] = useState(false);
  const [consultationError, setConsultationError] = useState("");

  useEffect(() => {
    const t = setInterval(() => {
      setReviewIndex((i) => (i + 1) % GOOGLE_REVIEWS.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5EF] font-sans">
      <LayoutNav activeNav="home" />

      {/* HERO — split layout, dramatic */}
      <section id="home" className="section-dot-grid hero-gradient-animate relative w-full overflow-hidden px-4 pt-12 pb-20 md:px-6 md:pt-16 md:pb-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-[#1C5472] sm:text-6xl lg:text-7xl">
              Finance made simple.
            </h1>
            <p className="mt-2 text-5xl font-bold text-[#00FCB8] sm:text-6xl lg:text-7xl">
              For every single Australian.
            </p>
            <p className="mx-auto mt-6 max-w-xl text-lg font-normal text-[#1C5472] lg:mx-0 md:text-xl">
              Yes, every one of them. 26 million people. That&apos;s the goal. We&apos;re starting with you.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <a href="/contact" className="inline-flex w-full items-center justify-center rounded-lg bg-[#00FCB8] px-6 py-3 font-bold text-[#1C5472] transition-all duration-200 hover:scale-105 hover:opacity-90 sm:w-auto">
                Talk to our experts
              </a>
              <a href="#services" className="inline-flex w-full items-center justify-center rounded-lg border-2 border-[#1C5472] bg-transparent px-6 py-3 font-bold text-[#1C5472] transition-all duration-200 hover:scale-105 hover:bg-[#1C5472]/5 sm:w-auto">
                Learn more
              </a>
            </div>
            <div className="mt-16 flex flex-wrap items-center justify-center gap-4 md:gap-8 lg:justify-start">
              <p className="text-5xl font-bold text-[#00FCB8] sm:text-6xl">26M</p>
              <span className="h-8 w-px bg-[#39B2B2]" aria-hidden />
              <p className="text-lg font-bold text-[#1C5472]">Australians to help</p>
              <span className="h-8 w-px bg-[#39B2B2]" aria-hidden />
              <p className="text-lg italic text-[#39B2B2]">Starting now</p>
            </div>
            <p className="mt-4 text-sm italic text-gray-500">So far: 500+ helped. Long way to go.</p>
          </div>
          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute right-0 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#39B2B2] opacity-15 lg:h-96 lg:w-96" aria-hidden />
            <div className="relative z-10">
              <div className="float-animate w-full max-w-md rounded-2xl bg-[#1C5472] p-6 shadow-[0_20px_50px_-12px_rgba(28,84,114,0.35)]">
                <p className="text-sm font-bold uppercase tracking-wider text-white/80">Your Finance Summary</p>
                <ul className="mt-4 space-y-2 text-sm text-white">
                  <li className="flex items-center gap-2">Home Loan <span className="text-[#00FCB8]">✓ Approved</span></li>
                  <li className="flex items-center gap-2">Asset Finance <span className="text-[#00FCB8]">✓ Active</span></li>
                  <li className="text-white/90">Next Review: 28 Feb</li>
                </ul>
                <div className="mt-4">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
                    <div className="h-full w-[75%] rounded-full bg-[#00FCB8]" />
                  </div>
                  <p className="mt-1 text-xs text-white/70">Profile strength 75%</p>
                </div>
              </div>
              <div className="float-animate-delay absolute -left-4 top-[85%] z-20 -rotate-3 rounded-xl bg-white px-4 py-3 shadow-lg">
                <p className="text-sm font-medium text-[#1C5472]">Latest approval: Car Loan <span className="text-[#00FCB8]">✓</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider fill="#1C5472" />

      {/* TRUST BADGES ROW */}
      <section className="bg-[#1C5472] px-4 py-8 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 place-items-center gap-6 lg:flex lg:flex-row lg:justify-center lg:gap-0">
          {TRUST_BADGES.map((badge, i) => (
            <div
              key={i}
              className={`flex flex-col items-center justify-center px-6 py-6 text-center lg:px-8 ${i < TRUST_BADGES.length - 1 ? "lg:border-r lg:border-[#39B2B2]/40" : ""}`}
            >
              <div className="trust-badge-icon-animate mb-2 flex justify-center">
                {badge.icon}
              </div>
              <p className="text-sm font-bold uppercase tracking-wide text-white">{badge.line1}</p>
              <p className="mt-0.5 text-xs font-normal text-[#39B2B2]">{badge.line2}</p>
            </div>
          ))}
        </div>
      </section>

      <WaveDivider fill="#1C5472" />

      {/* SERVICES — dramatic cards with gradient top + icon */}
      <section id="services" className="bg-[#1C5472] px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">Our Services</p>
          <h2 className="mt-2 border-l-4 border-[#00FCB8] pl-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            End-to-end finance solutions that scale with you
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <article id="brokers" className="flex min-h-[380px] flex-col overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-[#1C5472] to-[#244d66] px-6 py-10">
                <svg className="h-20 w-20 text-white/90" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span className="mt-3 text-lg font-bold text-white">Brokers</span>
              </div>
              <div className="flex flex-col p-6 md:p-8">
                <h3 className="text-xl font-bold text-[#1C5472] md:text-2xl">Frontline Financial Brokers</h3>
                <p className="mt-3 leading-relaxed text-[#1C5472]">
                  Independent mortgage and business-lending specialists who shop 30+ lenders, secure sharper rates, and handle every shred of paperwork.
                </p>
                <Link href="/brokers" className="mt-6 inline-flex items-center gap-2 font-bold text-[#39B2B2] transition-all duration-200 hover:scale-105 hover:text-[#00FCB8]">
                  Learn more
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            </article>
            <article id="asset-solutions" className="flex min-h-[380px] flex-col overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-[#1C5472] to-[#244d66] px-6 py-10">
                <svg className="h-20 w-20 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                  <line x1="12" y1="12" x2="12" y2="12" />
                  <path d="M2 12h20" />
                </svg>
                <span className="mt-3 text-lg font-bold text-white">Asset Solutions</span>
              </div>
              <div className="flex flex-col p-6 md:p-8">
                <h3 className="text-xl font-bold text-[#1C5472] md:text-2xl">Frontline Financial Asset Solutions</h3>
                <p className="mt-3 leading-relaxed text-[#1C5472]">
                  Dedicated car and equipment-finance experts who fast-track approvals from personal vehicles to full commercial fleets.
                </p>
                <Link href="/assetsolutions" className="mt-6 inline-flex items-center gap-2 font-bold text-[#39B2B2] transition-all duration-200 hover:scale-105 hover:text-[#00FCB8]">
                  Learn more
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <WaveDivider fill="#39B2B2" />

      {/* GOOGLE REVIEWS — rotating carousel: 3 cards on desktop, 1 on mobile + link to Google */}
      <section className="bg-[#39B2B2] px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="border-l-4 border-[#00FCB8] pl-4 text-3xl font-bold text-white md:text-4xl">
            Trusted by clients across Australia
          </h2>
          <a href={GOOGLE_REVIEW_LINK} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex flex-wrap items-center gap-3 text-white/90 transition hover:text-white">
            <div className="flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5">
              <span className="text-xl font-bold text-[#4285F4]">G</span>
              <span className="text-sm font-medium">Google Reviews</span>
            </div>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="h-5 w-5 text-[#FFD700]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm">5/5 · Reviews — View all</span>
          </a>
          <div className="relative mt-10 flex items-center gap-2 md:gap-4">
            <button type="button" onClick={() => setReviewIndex((i) => (i - 1 + GOOGLE_REVIEWS.length) % GOOGLE_REVIEWS.length)} className="shrink-0 rounded-full bg-white/20 p-2.5 text-white transition hover:bg-white/30" aria-label="Previous reviews">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="min-w-0 flex-1 overflow-hidden">
              <div
                className="review-carousel-track flex transition-transform duration-500 ease-out"
                style={{ "--review-index": reviewIndex }}
              >
                {[...GOOGLE_REVIEWS, GOOGLE_REVIEWS[0], GOOGLE_REVIEWS[1]].map((review, i) => (
                  <div key={i} className="w-full flex-shrink-0 px-1.5 md:w-1/2 lg:w-1/3">
                    <div className="rounded-xl bg-white p-4 text-[#1C5472] shadow-md md:p-5 lg:p-6">
                      <div className="flex gap-0.5 text-[#FFD700]">
                        {Array.from({ length: review.stars }).map((_, j) => (
                          <svg key={j} className="h-4 w-4 md:h-5 md:w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="mt-3 text-sm leading-relaxed md:text-base">&quot;{review.text}&quot;</p>
                      <div className="mt-4 flex items-center gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1C5472] text-xs font-bold text-white md:h-10 md:w-10 md:text-sm">
                          {review.name.charAt(0)}
                        </div>
                        <p className="font-bold md:text-sm">{review.name}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button type="button" onClick={() => setReviewIndex((i) => (i + 1) % GOOGLE_REVIEWS.length)} className="shrink-0 rounded-full bg-white/20 p-2.5 text-white transition hover:bg-white/30" aria-label="Next reviews">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {GOOGLE_REVIEWS.map((_, i) => (
              <button key={i} type="button" onClick={() => setReviewIndex(i)} className={`h-2 rounded-full transition-all ${i === reviewIndex ? "w-8 bg-[#00FCB8]" : "w-2 bg-white/50"}`} aria-label={`Go to slide ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fill="#F5F5EF" />

      {/* AWARD — Frontline Financial: Asset Solutions — bold, extravagant */}
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
            <a href="/assetsolutions" className="mt-6 inline-flex items-center gap-2 rounded-lg border-2 border-[#00FCB8] bg-[#00FCB8]/10 px-6 py-3 font-bold text-[#00FCB8] transition hover:bg-[#00FCB8] hover:text-[#0A1628]">
              Explore Asset Solutions
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </div>
      </section>

      <WaveDivider fill="#0A1628" />

      {/* TAXFLOWAI TEASER — matches TaxFlowAI home hero; great leap in tax technology */}
      <section id="taxflowai" className="taxflow-teaser-bg relative overflow-hidden px-4 py-20 md:px-6 md:py-28 lg:px-8">
        {/* Subtle glow orbs for depth */}
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-80 w-80 -translate-x-1/2 rounded-full bg-[#00FCB8] opacity-[0.06] blur-[100px]" aria-hidden />
        <div className="pointer-events-none absolute top-1/4 right-0 h-96 w-96 rounded-full bg-[#39B2B2] opacity-[0.05] blur-[100px]" aria-hidden />
        {/* Watermark — slightly more visible for sophistication */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
          <span className="text-[clamp(5rem,22vw,14rem)] font-bold leading-none tracking-tighter text-white/[0.06]">TaxFlowAI</span>
        </div>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          {/* Badge: + in lime green, "Introducing TaxFlowAI" in white, thin outline */}
          <p className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-[#0A1628]/80 px-4 py-2 text-sm font-medium backdrop-blur-sm">
            <span className="text-[#00FCB8]" aria-hidden>+</span>
            <span className="text-white">Introducing TaxFlowAI</span>
          </p>
          <h2 className="mt-8 text-5xl font-bold leading-tight text-white drop-shadow-sm md:text-6xl lg:text-7xl">
            Your tax life, organised.
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-xl text-white/95 md:text-2xl">
            A smarter way to manage your tax lodgements and stay connected with your accountant.
          </p>
          <p className="mt-3 text-sm font-medium uppercase tracking-widest text-[#00FCB8]/90">
            The next step in tax technology
          </p>
          {/* Feature cards — rounded outlines, distinct icon colors like TaxFlowAI hero */}
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-4 rounded-xl border border-white/20 bg-white/5 px-5 py-4 text-left shadow-lg backdrop-blur-sm transition hover:border-[#00FCB8]/30 hover:bg-white/10">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10">
                <svg className="h-6 w-6 text-white/90" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </span>
              <span className="font-medium text-white">Track Lodgements</span>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-white/20 bg-white/5 px-5 py-4 text-left shadow-lg backdrop-blur-sm transition hover:border-[#00FCB8]/30 hover:bg-white/10">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-500/20">
                <svg className="h-6 w-6 text-amber-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                </svg>
              </span>
              <span className="font-medium text-white">Manage Documents</span>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-white/20 bg-white/5 px-5 py-4 text-left shadow-lg backdrop-blur-sm transition hover:border-[#00FCB8]/30 hover:bg-white/10">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-violet-500/20">
                <svg className="h-6 w-6 text-violet-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </span>
              <span className="font-medium text-white">Accountant Connected</span>
            </div>
          </div>
          <div className="mt-12">
            <Link
              href="/taxflow"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00FCB8] px-10 py-4 text-lg font-bold text-white shadow-[0_0_30px_rgba(0,252,184,0.25)] transition-all duration-200 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,252,184,0.35)]"
            >
              Explore TaxFlowAI
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
          <p className="mt-8 text-sm text-white/70">
            Tax services supervised by E&amp;A Advisory Pty Ltd — Registered Tax Agent
          </p>
        </div>
      </section>

      <WaveDivider fill="#00FCB8" />

      {/* CTA BANNER — aqua green with stripe overlay + embedded consultation form */}
      <section id="consultation" className="cta-stripe-pattern relative bg-[#00FCB8] px-4 py-14 md:px-6 md:py-16 lg:px-8">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-[#1C5472] md:text-5xl lg:text-6xl">
            26 million Australians need better finance.
          </h2>
          <p className="mt-4 text-lg text-[#1C5472] md:text-xl">
            We&apos;ve helped 500+.<br />
            We&apos;re not stopping there. Are you next?
          </p>

          {consultationSuccess ? (
            <div className="mt-10 rounded-xl bg-[#1C5472] px-6 py-8 text-white">
              <p className="text-xl font-bold">Thanks — we&apos;ll be in touch soon.</p>
              <p className="mt-2 text-white/90">A member of our team will contact you shortly.</p>
            </div>
          ) : consultationStep === "choose" ? (
            <>
              <p className="mt-8 text-sm font-medium uppercase tracking-wider text-[#1C5472]/90">Choose your service</p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {CONSULTATION_SERVICES.map((svc) => (
                  <button
                    key={svc.id}
                    type="button"
                    onClick={() => {
                      setSelectedService(svc);
                      setConsultationStep("form");
                      setConsultationError("");
                    }}
                    className="flex flex-col items-center gap-4 rounded-xl border-2 border-[#1C5472]/30 bg-white/60 px-6 py-8 shadow-md transition-all duration-200 hover:scale-[1.02] hover:border-[#1C5472] hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1C5472] focus:ring-offset-2 focus:ring-offset-[#00FCB8]"
                  >
                    <span className="flex h-24 w-24 items-center justify-center rounded-full bg-[#1C5472]/10 text-[#1C5472]">
                      {svc.icon}
                    </span>
                    <span className="font-bold text-[#1C5472]">{svc.label}</span>
                    <span className="text-sm text-[#1C5472]/80">{svc.description}</span>
                  </button>
                ))}
              </div>
              <div className="mt-10">
                <a href="/contact" className="inline-flex w-full items-center justify-center rounded-lg border-2 border-[#1C5472] bg-transparent px-6 py-3 font-bold text-[#1C5472] transition-all duration-200 hover:scale-105 hover:bg-[#1C5472]/10 sm:w-auto">
                  Call us now
                </a>
              </div>
            </>
          ) : (
            <div className="mt-10 text-left">
              <div className="mx-auto max-w-md rounded-xl border-2 border-[#1C5472]/30 bg-white/80 p-6 shadow-lg backdrop-blur-sm md:p-8">
                <button
                  type="button"
                  onClick={() => { setConsultationStep("choose"); setSelectedService(null); setConsultationError(""); }}
                  className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-[#1C5472] hover:underline"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  Change service
                </button>
                <p className="mb-6 rounded-lg bg-[#1C5472]/10 px-3 py-2 text-sm font-medium text-[#1C5472]">
                  Service: {selectedService?.label}
                </p>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setConsultationError("");
                    if (!consultationConsent) {
                      setConsultationError(CONSENT_ERROR);
                      return;
                    }
                    setConsultationSubmitting(true);
                    try {
                      const res = await fetch("/api/contact", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          firstName: consultationForm.firstName.trim(),
                          lastName: consultationForm.lastName.trim(),
                          email: consultationForm.email.trim(),
                          phone: consultationForm.phone.trim(),
                          message: `Consultation request — ${selectedService?.label}`,
                          services: [selectedService?.label],
                          consultationService: selectedService?.id,
                        }),
                      });
                      const data = await res.json();
                      if (!res.ok) throw new Error(data.error || "Something went wrong");
                      const serviceId = selectedService?.id || "brokers";
                      const forwarded = data.forwardedTo ? `&forwarded=${data.forwardedTo}` : "";
                      const contactParams = new URLSearchParams({
                        fn: consultationForm.firstName.trim(),
                        ln: consultationForm.lastName.trim(),
                        em: consultationForm.email.trim(),
                        ph: consultationForm.phone.trim(),
                      }).toString();
                      router.push(`/contact/thank-you?team=${serviceId}${forwarded}&${contactParams}`);
                    } catch (err) {
                      setConsultationError(err.message || "Failed to submit. Please try again.");
                    } finally {
                      setConsultationSubmitting(false);
                    }
                  }}
                  className="space-y-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-medium text-[#1C5472]">First name</span>
                      <input
                        type="text"
                        required
                        value={consultationForm.firstName}
                        onChange={(e) => setConsultationForm((f) => ({ ...f, firstName: e.target.value }))}
                        className="mt-1 w-full rounded-lg border border-[#1C5472]/30 bg-white px-3 py-2.5 text-[#1C5472] placeholder-[#1C5472]/50 focus:border-[#1C5472] focus:outline-none focus:ring-1 focus:ring-[#1C5472]"
                        placeholder="First name"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-[#1C5472]">Last name</span>
                      <input
                        type="text"
                        required
                        value={consultationForm.lastName}
                        onChange={(e) => setConsultationForm((f) => ({ ...f, lastName: e.target.value }))}
                        className="mt-1 w-full rounded-lg border border-[#1C5472]/30 bg-white px-3 py-2.5 text-[#1C5472] placeholder-[#1C5472]/50 focus:border-[#1C5472] focus:outline-none focus:ring-1 focus:ring-[#1C5472]"
                        placeholder="Last name"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-sm font-medium text-[#1C5472]">Email</span>
                    <input
                      type="email"
                      required
                      value={consultationForm.email}
                      onChange={(e) => setConsultationForm((f) => ({ ...f, email: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-[#1C5472]/30 bg-white px-3 py-2.5 text-[#1C5472] placeholder-[#1C5472]/50 focus:border-[#1C5472] focus:outline-none focus:ring-1 focus:ring-[#1C5472]"
                      placeholder="you@example.com"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-[#1C5472]">Phone</span>
                    <input
                      type="tel"
                      required
                      value={consultationForm.phone}
                      onChange={(e) => setConsultationForm((f) => ({ ...f, phone: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-[#1C5472]/30 bg-white px-3 py-2.5 text-[#1C5472] placeholder-[#1C5472]/50 focus:border-[#1C5472] focus:outline-none focus:ring-1 focus:ring-[#1C5472]"
                      placeholder="04XX XXX XXX"
                    />
                  </label>
                  <div className="pt-2">
                    <FormConsent
                      entity={selectedService?.id === "asset-solutions" ? ENTITY.ASSET_SOLUTIONS : ENTITY.BROKERS}
                      value={consultationConsent}
                      onChange={setConsultationConsent}
                      showError={Boolean(consultationError && consultationError === CONSENT_ERROR)}
                    />
                  </div>
                  {consultationError && consultationError !== CONSENT_ERROR && (
                    <p className="text-sm font-medium text-red-600">{consultationError}</p>
                  )}
                  <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                    <button
                      type="submit"
                      disabled={consultationSubmitting}
                      className="w-full rounded-lg bg-[#1C5472] px-6 py-3 font-bold text-white transition-all duration-200 hover:opacity-90 disabled:opacity-70 sm:w-auto"
                    >
                      {consultationSubmitting ? "Sending…" : "Request consultation"}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setConsultationStep("choose"); setSelectedService(null); }}
                      className="w-full rounded-lg border-2 border-[#1C5472] bg-transparent px-6 py-3 font-bold text-[#1C5472] hover:bg-[#1C5472]/10 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>

      <WaveDivider fill="#F5F5EF" />

      {/* WHY CHOOSE US — dot grid + heading accent, below CTA */}
      <section className="section-dot-grid relative px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="border-l-4 border-[#00FCB8] pl-4 text-3xl font-bold text-[#1C5472] md:text-4xl">
            Save time. Save money. Stress less.
          </h2>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-xl bg-white p-8 text-center text-[#1C5472] shadow-md">
              <div className="rounded-full bg-[#39B2B2]/20 p-4">
                <svg className="h-10 w-10 text-[#1C5472]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-bold">All in one place</h3>
              <p className="mt-2 text-sm leading-relaxed">Loans and finance in one place so you don&apos;t have to juggle multiple providers.</p>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-white p-8 text-center text-[#1C5472] shadow-md">
              <div className="rounded-full bg-[#39B2B2]/20 p-4">
                <svg className="h-10 w-10 text-[#1C5472]" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-bold">Expert team</h3>
              <p className="mt-2 text-sm leading-relaxed">10+ years of industry experience, ready to guide you.</p>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-white p-8 text-center text-[#1C5472] shadow-md">
              <div className="rounded-full bg-[#39B2B2]/20 p-4">
                <svg className="h-10 w-10 text-[#1C5472]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-bold">Fast approvals</h3>
              <p className="mt-2 text-sm leading-relaxed">Streamlined process from application to approval so you get outcomes sooner.</p>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider fill="#1C5472" />

      <LayoutFooter />
    </div>
  );
}
