"use client";

import { useState } from "react";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import WaveDivider from "@/components/WaveDivider";

const LOAN_CARDS = [
  { title: "Home Loans", tag: "Most Popular", desc: "Owner-occupied loans for your primary residence. Variable, fixed, split — we find the structure that suits you.", icon: "house" },
  { title: "First Home Buyers", tag: "Grants Available", desc: "Navigate grants, stamp duty concessions, and LMI waivers. We guide first home buyers every step of the way.", icon: "key" },
  { title: "Investment Property Loans", tag: "Portfolio Growth", desc: "Build your portfolio with interest-only options, offset accounts, and structures designed for investors.", icon: "chart" },
  { title: "Refinancing", tag: "Save More", desc: "Already have a loan? We'll check if you're overpaying and refinance you to a better rate — often saving thousands per year.", icon: "refresh" },
  { title: "Commercial Loans", tag: "Business", desc: "Business premises, commercial property, and mixed-use lending. Structured for business owners and investors.", icon: "building" },
  { title: "Construction Loans", tag: "Build & Buy", desc: "Building your dream home? Progressive drawdown construction loans with competitive rates and flexible terms.", icon: "hammer" },
  { title: "Debt Consolidation", tag: "Simplify", desc: "Roll multiple debts into one manageable repayment. Reduce your interest burden and simplify your finances.", icon: "merge" },
  { title: "SMSF Loans", tag: "Specialist", desc: "Purchase investment property through your self-managed super fund with specialist SMSF lending solutions.", icon: "shield" },
];

const PROCESS_STEPS = [
  { num: 1, title: "Free Assessment", desc: "Tell us your goals, income, and situation. We assess your borrowing power at no cost." },
  { num: 2, title: "We Search the Market", desc: "Hassan personally reviews 30+ lenders and hundreds of products to find your best match." },
  { num: 3, title: "Loan Recommendation", desc: "We present you with clear options — rates, features, repayments — with our recommendation explained simply." },
  { num: 4, title: "Application & Approval", desc: "We prepare and lodge your application, liaise with the lender, and keep you updated every step of the way." },
  { num: 5, title: "Settlement", desc: "Your loan settles and you get the keys. We stay in touch for your next review." },
];

const FAQ_ITEMS = [
  { q: "How much does it cost to use a mortgage broker?", a: "Nothing. Our broking service is completely free to you as the borrower. We receive a commission from the lender once your loan settles — this does not affect the rate or product you receive." },
  { q: "How is Frontline Financial different from going to my bank?", a: "Your bank can only offer you their own products. We have access to 30+ lenders and are legally obligated under the best interests duty to find the right loan for your situation — not the most profitable one for us." },
  { q: "How long does the process take?", a: "From your initial assessment to approval typically takes 3–10 business days depending on the lender and complexity of your application. We'll give you a realistic timeline upfront." },
  { q: "Can you help if I've been declined before?", a: "Yes. We specialise in complex applications including self-employed borrowers, those with imperfect credit, and non-standard income situations. Where one lender says no, another may say yes." },
  { q: "Do I need a large deposit?", a: "Not always. Some lenders offer loans with as little as 5% deposit, and there are government schemes that can help first home buyers avoid Lenders Mortgage Insurance (LMI). We'll assess all options available to you." },
  { q: "Can you help with investment loans?", a: "Absolutely. We work with many property investors and understand the structuring required to grow a portfolio tax-effectively with the right loan features." },
];

function LoanIcon({ type, className }) {
  const c = className ?? "h-10 w-10 flex-shrink-0 text-white";
  switch (type) {
    case "house":
      return (<svg className={c} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>);
    case "key":
      return (<svg className={c} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>);
    case "chart":
      return (<svg className={c} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 3v18h18" /><path d="M7 16l4-8 4 4 4-8" /></svg>);
    case "refresh":
      return (<svg className={c} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>);
    case "building":
      return (<svg className={c} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>);
    case "hammer":
      return (<svg className={c} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M11.42 15.17L4.83 8.58a2 2 0 010-2.83l2.83-2.83a2 2 0 012.83 0L15.17 11.42M19 13l-7 7-4-4" /></svg>);
    case "merge":
      return (<svg className={c} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>);
    case "shield":
      return (<svg className={c} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.42-.182-2.806-.512-4.122L15 9z" /></svg>);
    default:
      return null;
  }
}

export default function BrokersPage() {
  const [faqOpen, setFaqOpen] = useState(null);

  return (
    <div className="min-h-screen bg-[#F5F5EF] font-sans">
      <LayoutNav activeNav="brokers" />

      {/* 1. HERO */}
      <section className="section-dot-grid-dark relative px-4 pt-12 pb-16 md:px-6 md:pt-16 md:pb-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl">
            The right home loan.
          </h1>
          <p className="mt-2 text-5xl font-bold text-[#00FCB8] md:text-6xl">
            For every Australian.
          </p>
          <p className="mt-6 text-xl text-[#39B2B2]">
            Independent mortgage brokers who search 30+ lenders to find the right loan for your situation — at no cost to you.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="/contact" className="inline-flex w-full items-center justify-center rounded-lg bg-[#00FCB8] px-8 py-4 text-lg font-bold text-[#1C5472] transition-all duration-200 hover:scale-105 hover:opacity-90 sm:w-auto">
              Get a Free Assessment
            </a>
            <a href="tel:+61422959486" className="inline-flex w-full items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-bold text-white transition-all duration-200 hover:scale-105 hover:bg-white/10 sm:w-auto">
              Call Hassan: +61 422 959 486
            </a>
          </div>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <span className="text-white">30+ Lenders</span>
            <span className="h-5 w-px bg-[#39B2B2]" aria-hidden />
            <span className="text-white">No Cost to You</span>
            <span className="h-5 w-px bg-[#39B2B2]" aria-hidden />
            <span className="text-white">5/5 Google Reviews</span>
          </div>
          <p className="mt-6 text-sm italic text-[#39B2B2]">We work for you — not the banks.</p>
        </div>
      </section>

      <WaveDivider fill="#F5F5EF" />

      {/* BOLD STATEMENT STRIP */}
      <section className="bg-[#0A1628] py-6">
        <div className="mx-auto max-w-4xl px-4 text-center text-2xl font-bold text-white md:px-6 lg:px-8">
          Every year, millions of Australians accept a worse rate than they deserve. <span className="text-[#00FCB8]">We&apos;re fixing that.</span>
        </div>
      </section>

      <WaveDivider fill="#F5F5EF" />

      {/* 2. WHY USE A BROKER */}
      <section className="section-dot-grid relative px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">WHY FRONTLINE</p>
          <h2 className="mt-2 border-l-4 border-[#00FCB8] pl-4 text-3xl font-bold text-[#1C5472] md:text-4xl">
            Stop going direct. Start getting a better deal.
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl bg-gray-100/80 p-6 text-gray-600">
              <h3 className="text-lg font-bold text-gray-500">What the bank wants you to do</h3>
              <ul className="mt-4 space-y-3">
                {["Limited to their own products", "No obligation to find you the best rate", "One size fits all approach", "You do all the paperwork", "Takes weeks"].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0 text-red-500" aria-hidden>✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border-l-4 border-[#39B2B2] bg-white p-6 shadow-md">
              <h3 className="text-lg font-bold text-[#1C5472]">What we actually do for you</h3>
              <ul className="mt-4 space-y-3">
                {["Access to 30+ lenders and hundreds of products", "We're legally obligated to act in your best interest", "Tailored to your exact situation", "We handle everything end to end", "Fast approvals — often within days"].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0 text-[#00FCB8]" aria-hidden>✓</span>
                    <span className="text-[#1C5472]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8 text-center text-2xl font-bold text-[#1C5472]">
            We&apos;ve done this 500+ times.
          </p>
          <p className="mt-2 text-center text-sm italic text-gray-500">
            We&apos;ll do it 25 million more.
          </p>
        </div>
      </section>

      <WaveDivider fill="#1C5472" />

      {/* 3. MEET Hassan — Your broker, above loan types */}
      <section className="bg-[#1C5472] px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:items-start">
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative h-72 w-full max-w-sm overflow-hidden rounded-2xl bg-[#0A1628] shadow-xl">
                <img
                  src="/images/hassan-broker-v2.png"
                  alt="Hassan Arif JP — Mortgage & Finance Broker"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-4 text-2xl font-bold text-white">Hassan</p>
              <p className="text-[#39B2B2]">Mortgage & Finance Broker</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">YOUR BROKER</p>
              <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
                You&apos;ll work directly with Hassan.
              </h2>
              <p className="mt-6 leading-relaxed text-[#39B2B2]">
                No junior staff, no call centres. When you come to Frontline Financial Brokers, you work directly with Hassan from your first call to settlement day and beyond. Someone who takes the time to understand your situation and genuinely fights to get you the best outcome.
              </p>
              <ul className="mt-6 space-y-3">
                {["Direct access to your broker from day one", "Available after hours and on weekends", "Fluent in English and Arabic", "Specialist in complex and non-standard applications"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center text-[#00FCB8]" aria-hidden>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <blockquote className="mt-10 border-l-4 border-[#39B2B2] bg-white py-4 pl-6 pr-6 text-[#1C5472]">
                &quot;Hassan was proactive and professional throughout the process of home loan applications and settlement leading to a successful settlement. Highly recommend his services.&quot;
                <footer className="mt-3 text-[#1C5472]/80">
                  — Brendan Piech <span className="text-[#FFD700]">★★★★★</span>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider fill="#F5F5EF" />

      {/* 4. LOAN TYPES */}
      <section className="bg-[#1C5472] px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">WHAT WE OFFER</p>
          <h2 className="mt-2 border-l-4 border-[#00FCB8] pl-4 text-3xl font-bold text-white md:text-4xl">
            Every type of loan, one team.
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LOAN_CARDS.map((card) => (
              <article
                key={card.title}
                className="relative rounded-xl border-2 border-[#39B2B2] bg-[#1C5472] p-6 transition-all duration-200 hover:scale-105 hover:border-[#00FCB8]"
              >
                <span className="absolute right-4 top-4 rounded-full bg-[#00FCB8] px-3 py-1 text-xs font-medium text-[#1C5472]">
                  {card.tag}
                </span>
                <LoanIcon type={card.icon} />
                <h3 className="mt-4 text-lg font-bold text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/90">{card.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fill="#F5F5EF" />

      {/* 5. HOW IT WORKS */}
      <section className="bg-[#F5F5EF] px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">THE PROCESS</p>
          <h2 className="mt-2 border-l-4 border-[#00FCB8] pl-4 text-3xl font-bold text-[#1C5472] md:text-4xl">
            From application to settlement — we handle it all.
          </h2>
          <div className="mt-14 grid gap-10 md:grid-cols-5 md:gap-0">
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.num}
                className={`flex flex-col items-center text-center md:border-l-2 md:border-dashed md:border-[#39B2B2] md:px-4 md:first:border-l-0 md:first:pl-0 md:last:pr-0`}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#1C5472] text-xl font-bold text-[#00FCB8]">
                  {step.num}
                </div>
                <h3 className="mt-4 text-base font-bold text-[#1C5472]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fill="#1C5472" />

      {/* 6. FAQ */}
      <section className="bg-[#1C5472] px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">COMMON QUESTIONS</p>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            Everything you need to know.
          </h2>
          <div className="mt-10 space-y-0 border-t border-[#39B2B2]">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                className="border-b border-[#39B2B2]"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  aria-expanded={faqOpen === i}
                >
                  <span className="font-bold text-white">{item.q}</span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-[#00FCB8] transition-transform duration-200 ${faqOpen === i ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ease-out ${
                    faqOpen === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="pb-5 pr-8 text-[#39B2B2]">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fill="#00FCB8" />

      {/* 8. CTA */}
      <section className="cta-stripe-pattern relative bg-[#00FCB8] px-4 py-14 md:px-6 md:py-16 lg:px-8">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-[#1C5472] md:text-5xl">
            Your loan. Your terms.
          </h2>
          <p className="mt-2 text-4xl font-bold text-[#0A1628] md:text-5xl">
            Not the bank&apos;s.
          </p>
          <p className="mt-4 text-lg text-[#1C5472] md:text-xl">
            We work for you. Not the bank. Not the lender. You. Book a free assessment and find out exactly what you qualify for — at no cost, no obligation.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="/contact" className="inline-flex w-full items-center justify-center rounded-lg bg-[#1C5472] px-10 py-4 font-bold text-white transition-all duration-200 hover:scale-105 hover:opacity-90 sm:w-auto">
              Get a Free Assessment
            </a>
            <a href="tel:+61422959486" className="inline-flex w-full items-center justify-center rounded-lg border-2 border-[#1C5472] bg-transparent px-10 py-4 font-bold text-[#1C5472] transition-all duration-200 hover:scale-105 hover:bg-[#1C5472]/10 sm:w-auto">
              Call Hassan: +61 422 959 486
            </a>
          </div>
        </div>
      </section>

      <WaveDivider fill="#1C5472" />

      <LayoutFooter />
    </div>
  );
}
