"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import WaveDivider from "@/components/WaveDivider";
import FinanceSelector from "@/components/FinanceSelector";
import OpenStatus from "@/components/OpenStatus";
import SettledDealsWall from "@/components/SettledDealsWall";
import LatestArticles from "@/components/LatestArticles";
import FormConsent, { CONSENT_ERROR } from "@/components/FormConsent";
import { trackLead } from "@/components/MetaPixel";
import { ENTITY } from "@/config/entities";
import { SHOW_TAX_SERVICES } from "@/data/taxflow-flags";

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

/* The two businesses as two doors: what you're buying, one line, one main
   button, one other way in. Kept this short on purpose (Hassan, 14 Nov 2026: a
   visitor has about 30 seconds). Hassan's photo is the smiling headshot he asked
   for (AI-tagged). Copy here repeats claims made elsewhere on the site only. */
const SERVICE_SIDES = [
  {
    id: "brokers",
    title: "Home loans",
    line: "30+ lenders compared, including for the self-employed.",
    cta: ["Apply for a home loan", "/apply/home-loan"],
    alt: ["Self-employed? Start here", "/self-employed-home-loans"],
    business: ["Frontline Financial Brokers", "/brokers"],
    person: "with Hassan Arif",
    photo: "/images/hassan-portrait.webp",
    photoAlt: "Hassan Arif",
    photoPosition: "50% 25%",
  },
  {
    id: "asset-solutions",
    title: "Cars and equipment",
    line: "Cars, utes, trucks and machinery, from an award-winning team.",
    cta: ["Apply for a car loan", "/apply/car-loan"],
    alt: ["Equipment finance", "/apply/equipment-finance"],
    business: ["Frontline Financial: Asset Solutions", "/assetsolutions"],
    person: "led by Sham",
    photo: "/images/sham-portrait.webp",
    photoAlt: "Sham",
    photoPosition: "50% 15%",
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
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
        <circle cx="7" cy="17" r="2" />
        <path d="M9 17h6" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
  },
];

/* Organization schema for the group home page, linking the two businesses'
   own schema (on /brokers and /assetsolutions). Rendered in the page, not the
   root layout, so it never reaches /taxflow. */
const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://frontline.financial/#org",
  name: "Frontline Financial Group",
  url: "https://frontline.financial",
  logo: "https://frontline.financial/images/logos/frontline-logo.svg",
  telephone: "+61422959486",
  email: "operations@frontline.financial",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Level 49, 8 Parramatta Square",
    addressLocality: "Parramatta",
    addressRegion: "NSW",
    postalCode: "2150",
    addressCountry: "AU",
  },
  sameAs: [
    "https://maps.google.com/?cid=1907814861488993659",
    "https://www.facebook.com/profile.php?id=61560475306366",
    "https://www.instagram.com/frontline.financial.group/",
    "https://au.linkedin.com/company/frontline-financial-group",
  ],
  subOrganization: [
    { "@id": "https://frontline.financial/brokers#business" },
    { "@id": "https://frontline.financial/assetsolutions#business" },
  ],
};

/* Asks Google to show this as the site name in search results. Google reads
   it from the home page only, so it stays here with ORG_SCHEMA. */
const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://frontline.financial/#website",
  name: "Frontline Financial",
  alternateName: "Frontline Financial Group",
  url: "https://frontline.financial/",
  publisher: { "@id": "https://frontline.financial/#org" },
};

export default function Home() {
  const router = useRouter();
  const [reviewIndex, setReviewIndex] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  // Count-up to 100+ when the reviews section scrolls into view
  useEffect(() => {
    const el = document.getElementById("review-count");
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReviewCount(100);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / 1400, 1);
          setReviewCount(Math.round(100 * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }} />
      <LayoutNav activeNav="home" />

      {/* HERO — split layout, dramatic */}
      <section id="home" className="section-dot-grid hero-gradient-animate relative w-full scroll-mt-20 overflow-hidden px-4 pt-6 pb-16 md:px-6 md:pt-16 md:pb-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-y-8 xl:grid-cols-[minmax(0,1fr)_480px]">
          <div className="text-center lg:col-start-1 lg:row-start-1 lg:self-end lg:text-left">
            <h1 className="font-bold tracking-tight text-[#1C5472]">
              <span className="block text-sm uppercase tracking-widest text-[#39B2B2] md:text-base">
                Home loan and car loan brokers in Parramatta
              </span>
              <span className="mt-3 block text-4xl leading-[1.1] sm:mt-4 sm:text-6xl xl:text-7xl">Finance made simple.</span>
            </h1>
            <p className="mt-3 text-4xl font-bold sm:mt-4 sm:text-6xl xl:text-7xl">
              <span className="hero-highlight-gradient inline-block rounded-3xl px-5 py-3 leading-[1.15] text-[#00FCB8] shadow-lg shadow-[#1C5472]/30">
                For every single Australian.
              </span>
            </p>
            <p className="mx-auto mt-4 max-w-xl text-lg font-normal leading-snug text-[#1C5472] sm:mt-6 sm:leading-normal lg:mx-0 md:text-xl">
              A real broker compares 30+ lenders for you, and someone from our team calls within one business day.
              <span className="hidden sm:inline"> 26 million Australians to help. We&apos;re starting with you.</span>
            </p>
          </div>
          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
            <FinanceSelector />
          </div>
          <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
            {/* proof first: a stranger needs a reason to trust us before they tap anything */}
            <dl className="hero-highlight-gradient grid divide-y divide-white/15 rounded-2xl text-left text-white shadow-lg shadow-[#1C5472]/30 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:grid-cols-1 lg:divide-x-0 lg:divide-y xl:grid-cols-3 xl:divide-x xl:divide-y-0">
              <div className="flex min-w-0 flex-col justify-center p-4">
                <dt className="flex gap-0.5 text-[#FFD700]" aria-label="5 out of 5 stars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </dt>
                <dd className="mt-1.5 text-lg font-bold leading-tight">5.0 on Google</dd>
                <dd className="mt-0.5 text-sm text-white/85">
                  <a href={GOOGLE_REVIEW_LINK} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:no-underline">
                    from 100+ reviews
                  </a>
                </dd>
              </div>
              <div className="flex min-w-0 items-center gap-3 p-4">
                <dt className="shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/fintelligence-fy25-seal.webp" alt="Winner seal" width={72} height={59} className="h-[59px] w-[72px]" />
                </dt>
                <dd className="min-w-0 text-sm leading-snug">
                  <span className="block text-lg font-bold leading-tight">Award winner</span>
                  <span className="text-white/85">Fintelligence FY25, Vehicle and Equipment Finance</span>
                </dd>
              </div>
              <div className="flex min-w-0 flex-col justify-center p-4">
                <dt>
                  <a
                    href="https://brokerscore.com.au/mortgage-broker/frontline-financial-group"
                    target="_blank"
                    rel="noopener"
                    className="block w-fit max-w-full rounded-xl transition-all duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00FCB8]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://brokerscore.com.au/badge/frontline-financial-group.svg?shape=label&theme=light"
                      alt="Frontline Financial Group on BrokerScore"
                      width={170}
                      height={61}
                    />
                  </a>
                </dt>
                <dd className="mt-1 text-sm text-white/85">Home loans, on BrokerScore</dd>
              </div>
            </dl>
            <div className="mt-5 flex flex-col items-center gap-x-5 gap-y-3 sm:flex-row sm:flex-wrap lg:justify-start">
              <a href="tel:+61422959486" className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[#1C5472] px-5 py-2.5 font-bold text-[#1C5472] transition-colors duration-200 hover:bg-[#1C5472]/5 sm:w-auto">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
                  <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                Call +61 422 959 486
              </a>
              <OpenStatus className="text-sm font-medium text-[#1C5472]" />
              <a href="#just-settled" className="text-sm font-bold text-[#1C5472] underline underline-offset-4 hover:no-underline">
                See deals we&apos;ve settled
              </a>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider fill="#1C5472" />

      {/* SERVICES — two doors: home loans, or cars and equipment */}
      <section id="services" aria-label="Our services" className="scroll-mt-20 bg-[#1C5472] px-4 pb-16 pt-6 md:px-6 md:pb-20 md:pt-10 lg:px-8">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          {SERVICE_SIDES.map((side, i) => (
            <article
              key={side.id}
              id={side.id}
              aria-labelledby={`${side.id}-title`}
              className={`flex scroll-mt-24 flex-col ${i === 0 ? "pb-12 lg:pb-0 lg:pr-12 xl:pr-20" : "border-t border-white/15 pt-12 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0 xl:pl-20"}`}
            >
              <h2 id={`${side.id}-title`} className="text-4xl font-bold leading-none tracking-tight text-white sm:text-5xl">
                {side.title}
              </h2>
              <p className="mt-4 max-w-xl text-pretty text-lg leading-snug text-[#BFDCE3]">{side.line}</p>
              <div className="mt-8 flex flex-col items-start gap-x-6 gap-y-4 sm:flex-row sm:items-center">
                <Link
                  href={side.cta[1]}
                  className="group inline-flex items-center gap-2 rounded-lg bg-[#00FCB8] px-6 py-3.5 text-base font-bold text-[#0A1628] transition-colors duration-200 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C5472]"
                >
                  {side.cta[0]}
                  <svg className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href={side.alt[1]}
                  className="text-base font-bold text-white underline decoration-[#00FCB8] decoration-2 underline-offset-[6px] transition-colors hover:text-[#00FCB8] focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-[#00FCB8] focus-visible:ring-offset-4 focus-visible:ring-offset-[#1C5472]"
                >
                  {side.alt[0]}
                </Link>
              </div>
              <div className="mt-10 flex items-center gap-3 text-sm text-[#BFDCE3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={side.photo}
                  alt={side.photoAlt}
                  width={48}
                  height={48}
                  loading="lazy"
                  className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-white/20"
                  style={{ objectPosition: side.photoPosition }}
                />
                <p>
                  <Link href={side.business[1]} className="font-bold text-white hover:underline hover:decoration-[#00FCB8] hover:underline-offset-4">
                    {side.business[0]}
                  </Link>
                  , {side.person}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="bg-[#1C5472]">
        <WaveDivider fill="#F5F5EF" />
      </div>

      {/* JUST SETTLED — every approved post, as proof for "would they take my deal?" */}
      <SettledDealsWall
        heading="Think your deal is too hard?"
        intro="No property. Renting with no deposit. Three months into a new job. A 15-year-old truck. A company six months old. These all settled recently."
        ctaHref="#home"
        ctaLabel="Start your application"
      />

      <WaveDivider fill="#39B2B2" />

      {/* GOOGLE REVIEWS — 100+ five-star reviews: count-up stat + rotating carousel */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#39B2B2] via-[#2E9E9E] to-[#39B2B2] px-4 py-16 md:px-6 md:py-24 lg:px-8">
        {/* glow + giant star watermark */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#00FCB8] opacity-[0.14] blur-[110px]" aria-hidden />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-[#1C5472] opacity-[0.25] blur-[110px]" aria-hidden />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
          <svg className="h-[130%] w-auto text-white opacity-[0.05]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#00FCB8] md:text-sm">
                Rated five stars. Every. Single. Review.
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">
                Trusted by clients across Australia
              </h2>
              <p className="mt-4 max-w-lg text-base text-white/85 md:text-lg">
                Over one hundred Australians have taken the time to leave us a review
                on Google — and every single one gave us five stars.
              </p>
            </div>
            {/* the big number */}
            <div id="review-count" className="rounded-3xl border border-white/25 bg-white/10 px-10 py-8 text-center shadow-[0_20px_60px_-20px_rgba(10,22,40,0.5)] backdrop-blur-sm">
              <div className="flex justify-center gap-1" aria-hidden>
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="h-7 w-7 text-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.6)] md:h-8 md:w-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mt-2 text-6xl font-extrabold tracking-tight text-white md:text-7xl">
                {reviewCount}
                <span className="text-[#00FCB8]">+</span>
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-white/85 md:text-sm">
                Five-star Google reviews
              </p>
              <p className="mt-1 text-xs text-white/70">5.0 average · 100% five stars</p>
              <a
                href={GOOGLE_REVIEW_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-[#1C5472] transition-all duration-200 hover:scale-105"
              >
                <span className="text-lg font-bold text-[#4285F4]" aria-hidden>G</span>
                Read them all on Google
              </a>
            </div>
          </div>
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
              <a href="/assetsolutions" className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#00FCB8] bg-[#00FCB8]/10 px-6 py-3 font-bold text-[#00FCB8] transition hover:bg-[#00FCB8] hover:text-[#0A1628]">
                Explore Asset Solutions
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-[#1C5472]">
        <WaveDivider fill="#F5F5EF" />
      </div>

      {/* ARTICLES — every article gets a home here, newest first */}
      <LatestArticles />

      <WaveDivider fill="#0A1628" />

      {/* OUR LOCATION — Level 49, 8 Parramatta Square + Google listing link */}
      <section className="relative overflow-hidden bg-[#0A1628] px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="pointer-events-none absolute left-0 bottom-0 h-64 w-64 rounded-full bg-[#39B2B2] opacity-[0.07] blur-[90px]" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#00FCB8] md:text-sm">Our location</p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              Visit us at Parramatta Square
            </h2>
            <p className="mt-5 text-lg font-semibold text-white">
              Level 49, 8 Parramatta Square
              <br />
              Parramatta NSW 2150
            </p>
            <p className="mt-3 max-w-md text-sm text-white/70">
              Level 49 of the 8 Parramatta Square tower, in the heart of the
              precinct — drop in for a consultation, or find us on Google for
              reviews, photos and opening hours.
            </p>
            <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row">
              <a
                href={GOOGLE_REVIEW_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#00FCB8] px-6 py-3 font-bold text-[#0A1628] transition-all duration-200 hover:scale-105 hover:opacity-90"
              >
                <span className="text-lg font-bold text-[#4285F4]" aria-hidden>G</span>
                Find us on Google
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=8%20Parramatta%20Square%2C%20Parramatta%20NSW%202150"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#00FCB8] bg-[#00FCB8]/10 px-6 py-3 font-bold text-[#00FCB8] transition hover:bg-[#00FCB8] hover:text-[#0A1628]"
              >
                Get directions
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
            <div className="mt-8 overflow-hidden rounded-2xl border-2 border-[#00FCB8]/30 shadow-xl">
              <iframe
                src="https://www.google.com/maps?q=8+Parramatta+Square,+Parramatta+NSW+2150&output=embed"
                title="Map — Frontline Financial, Level 49, 8 Parramatta Square, Parramatta NSW 2150"
                className="block h-56 w-full border-0 md:h-64"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="overflow-hidden rounded-2xl border-2 border-[#00FCB8]/30 shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/frontline-8-parramatta-square.webp"
                alt="The 8 Parramatta Square tower — Frontline Financial's office is on Level 49"
                className="block h-auto w-full max-w-md object-cover"
                width={1066}
                height={1421}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="bg-[#0A1628]">
        <WaveDivider fill="#00FCB8" />
      </div>

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
              <p className="mt-8 text-sm font-medium uppercase tracking-wider text-[#1C5472]/90">Want us to call you instead? Choose your service</p>
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
                      trackLead();
                      router.push(`/contact/thank-you?team=${serviceId}${forwarded}`);
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
          <h2 className="text-3xl font-bold text-[#1C5472] md:text-4xl">
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
              <h3 className="mt-4 text-xl font-bold">Fast answers</h3>
              <p className="mt-2 text-sm leading-relaxed">A call within one business day and a straight answer on where you stand, before anything goes to a lender.</p>
            </div>
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
            {SHOW_TAX_SERVICES
              ? "TaxFlowAI's tax services are provided by TAX7 T04 PTY LTD, Registered Tax Agent 26313222. The platform is owned and developed by Frontline Holdings Group Pty Ltd trading as TaxFlowAI by Frontline Financial."
              : "The TaxFlowAI platform is owned and developed by Frontline Holdings Group Pty Ltd trading as TaxFlowAI by Frontline Financial."}
          </p>
        </div>
      </section>

      <LayoutFooter />
    </div>
  );
}
