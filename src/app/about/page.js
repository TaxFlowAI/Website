"use client";

import Link from "next/link";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import WaveDivider from "@/components/WaveDivider";

const VALUES = [
  { title: "People Over Profits", icon: "heart", desc: "We measure success by the goals our clients achieve — not by how many deals we close or how much commission we earn." },
  { title: "No Shortcuts", icon: "shield", desc: "We do the work properly. We take the time. We don't rush clients through a process just to close a deal." },
  { title: "Plain English Always", icon: "speech", desc: "Finance can be complex. We make it simple. No jargon, no confusion — just clear explanations so you can make confident decisions." },
  { title: "Genuine Options", icon: "options", desc: "We present real choices and explain the difference. You decide what's right for your goals — we make sure you have everything you need to choose." },
  { title: "Speed With Care", icon: "lightning", desc: "We move fast when it matters — without ever rushing you or cutting corners on what's important." },
  { title: "Western Sydney Proud", icon: "location", desc: "We're from this community, we serve this community, and we're committed to helping it thrive." },
];

function ValueIcon({ type, className }) {
  const c = className ?? "h-8 w-8 flex-shrink-0 text-[#00FCB8]";
  switch (type) {
    case "heart":
      return (<svg className={c} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>);
    case "shield":
      return (<svg className={c} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.42-.182-2.806-.512-4.122L15 9z" /></svg>);
    case "speech":
      return (<svg className={c} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>);
    case "options":
      return (<svg className={c} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>);
    case "lightning":
      return (<svg className={c} fill="currentColor" viewBox="0 0 24 24"><path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" /></svg>);
    case "location":
      return (<svg className={c} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);
    default:
      return null;
  }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F5F5EF] font-sans">
      <LayoutNav activeNav="about" />

      {/* 1. HERO */}
      <section className="section-dot-grid-dark relative px-4 pt-12 pb-16 md:px-6 md:pt-16 md:pb-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl">
            We want to help every Australian.
          </h1>
          <p className="mt-2 text-5xl font-bold text-[#00FCB8] md:text-6xl">
            Every. Single. One.
          </p>
          <p className="mt-6 text-xl text-[#39B2B2]">
            26 million people. A team based in Parramatta. Sounds impossible. We don&apos;t care.
          </p>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <span className="text-white">Est. in Western Sydney</span>
            <span className="h-5 w-px bg-[#39B2B2]" aria-hidden />
            <span className="text-white">150 George St, Parramatta</span>
            <span className="h-5 w-px bg-[#39B2B2]" aria-hidden />
            <span className="text-white">5/5 Google Reviews</span>
          </div>
        </div>
      </section>

      <WaveDivider fill="#F5F5EF" />

      {/* VISION STATEMENT */}
      <section className="relative bg-[#0A1628] py-20">
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[200px] font-black text-white opacity-[0.04]" aria-hidden>26M</span>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center md:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-widest text-[#00FCB8]">THE GOAL</p>
          <h2 className="mt-4 text-5xl font-bold text-white md:text-6xl">
            One team. One goal.
          </h2>
          <p className="mt-2 text-5xl font-bold text-white md:text-6xl">
            Help every Australian.
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-400">
            Not just Australians in Western Sydney. Not just Australians who earn over $100k. Not just Australians who already know what a mortgage broker does. Every. Single. One.
          </p>
          <p className="mt-6 text-base text-[#39B2B2]">
            We&apos;re a small team. The goal is enormous. We think that&apos;s exactly the right kind of problem to have.
          </p>
        </div>
      </section>

      <WaveDivider fill="#F5F5EF" />

      {/* 2. OUR STORY */}
      <section className="section-dot-grid relative px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[55%_45%] lg:items-center">
            <div>
              <p className="border-l-4 border-[#00FCB8] pl-4 text-xs font-bold uppercase tracking-widest text-[#00FCB8]">OUR STORY</p>
              <h2 className="mt-2 text-3xl font-bold text-[#1C5472] md:text-4xl">
                Built differently. On purpose.
              </h2>
              <div className="mt-6 space-y-4 text-[#1C5472]">
                <p>
                  Frontline Financial Group was built by people who had worked inside the finance industry long enough to know what wasn&apos;t working. Clients were being rushed through processes, handed whatever product was easiest to sell, and sent on their way. The goal was closing deals — not changing lives.
                </p>
                <p>
                  We started with a different approach. Slow down. Ask better questions. Understand what someone is actually trying to achieve before talking about products or rates. It sounds obvious — but in an industry that runs on volume, it&apos;s rarer than it should be.
                </p>
                <p>
                  Frontline Financial Brokers and Frontline Financial Asset Solutions grew out of that same mindset. Two separate businesses, each led by a specialist, each focused on doing one thing really well — and both built around the belief that the right outcome for the client is the only outcome worth working toward.
                </p>
                <p>
                  Most businesses set goals they know they can hit. We set the one that matters. 26 million Australians deserve access to quality finance and accounting. We&apos;re going to help as many of them as we possibly can. Starting with you.
                </p>
              </div>
            </div>
            <div className="relative flex justify-center lg:justify-end">
              <div className="absolute inset-0 flex items-center justify-center lg:right-0 lg:left-auto">
                <div className="h-64 w-64 rounded-full bg-[#39B2B2] opacity-10 lg:h-80 lg:w-80" aria-hidden />
              </div>
              <div className="relative flex flex-col gap-4">
                <div className="rounded-2xl bg-[#1C5472] px-8 py-10 shadow-xl" style={{ transform: "rotate(-2deg)" }}>
                  <p className="text-4xl font-bold text-[#00FCB8] md:text-5xl">500+</p>
                  <p className="mt-1 text-white">Clients Helped</p>
                </div>
                <div className="rounded-2xl bg-[#39B2B2] px-8 py-10 shadow-xl" style={{ transform: "rotate(2deg)", marginLeft: "1.5rem" }}>
                  <p className="text-4xl font-bold text-white md:text-5xl">15+</p>
                  <p className="mt-1 text-white">Years Combined Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider fill="#1C5472" />

      {/* 3. TWO BUSINESSES, ONE VISION */}
      <section className="bg-[#1C5472] px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">OUR BUSINESSES</p>
          <h2 className="mt-2 border-l-4 border-[#00FCB8] pl-4 text-3xl font-bold text-white md:text-4xl">
            Two specialist businesses. One shared vision.
          </h2>
          <p className="mt-4 text-[#39B2B2]">
            We don&apos;t try to be everything to everyone. Each business is led by a specialist who lives and breathes their field — so you always get genuine expertise.
          </p>
          <p className="mt-4 text-sm text-[#39B2B2]">
            Tax and accounting services delivered through TaxFlowAI are provided by E&amp;A Advisory Pty Ltd, Registered Tax Agent.
          </p>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border-t-4 border-[#00FCB8] bg-[#1a5f7a] p-8">
              <svg className="h-12 w-12 text-[#00FCB8]" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <h3 className="mt-4 text-xl font-bold text-white">Frontline Financial Brokers</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/95">
                Mortgage and commercial lending specialists helping Australians find the right home loan, investment loan, or commercial finance to achieve their property goals. We search 30+ lenders to find the option that genuinely fits your situation — at no cost to you.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-[#39B2B2]">
                {["Home Loans & First Home Buyers", "Investment Property Loans", "Refinancing & Debt Consolidation", "Commercial & Construction Loans", "SMSF Loans"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00FCB8]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/brokers" className="mt-6 inline-block font-bold text-[#00FCB8] transition-colors hover:text-[#00FCB8]/80">
                Learn more →
              </Link>
            </article>
            <article className="rounded-2xl border-t-4 border-[#39B2B2] bg-[#1a5f7a] p-8">
              <svg className="h-12 w-12 text-[#39B2B2]" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M5 17h14v-5H5v5zM5 12V8l3-4h8l3 4v4" />
                <circle cx="7.5" cy="16" r="1.5" />
                <circle cx="16.5" cy="16" r="1.5" />
              </svg>
              <h3 className="mt-4 text-xl font-bold text-white">Frontline Financial Asset Solutions</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/95">
                Car, equipment, and fleet finance specialists helping individuals and businesses acquire the assets they need to move forward. From personal vehicles to full commercial fleets — fast approvals, competitive rates, real expertise.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-[#39B2B2]">
                {["Car & Personal Vehicle Finance", "Commercial Vehicle Finance", "Equipment & Machinery Finance", "Fleet Finance Solutions", "Working Capital"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#39B2B2]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 block">
                <p className="inline-flex items-center gap-2 rounded-full border border-[#00FCB8] px-3 py-1.5 text-xs font-medium text-[#00FCB8]">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><polyline points="14 9 14 2 10 2 10 9" /><path d="M6 2h12" /><path d="M6 9H4a2 2 0 0 0-2 2v1a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6v-1a2 2 0 0 0-2-2h-2" /><line x1="12" y1="18" x2="12" y2="22" /><line x1="8" y1="22" x2="16" y2="22" /></svg>
                  Fintelligence Award Winner FY25 — Vehicle & Equipment Finance
                </p>
              </div>
              <Link href="/assetsolutions" className="mt-4 inline-block font-bold text-[#39B2B2] transition-colors hover:text-[#39B2B2]/80">
                Learn more →
              </Link>
            </article>
          </div>
        </div>
      </section>

      <WaveDivider fill="#F5F5EF" />

      {/* 4. HOW WE WORK */}
      <section className="section-dot-grid relative px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">OUR APPROACH</p>
          <h2 className="mt-2 text-3xl font-bold text-[#1C5472] md:text-4xl">
            We start by listening.
          </h2>
          <p className="mt-6 leading-relaxed text-[#1C5472]">
            Before we talk products, rates, or lenders — we talk about you. What are your goals? What does success look like for you? What&apos;s standing in the way? Only once we truly understand your situation do we start looking at options.
          </p>
          <div className="mt-12 rounded-2xl bg-[#1C5472] px-6 py-8 md:px-10 md:py-10">
            <svg className="h-12 w-12 text-[#00FCB8]" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <h3 className="mt-4 text-xl font-bold text-white">Free In-Office Consultations</h3>
            <p className="mt-3 leading-relaxed text-[#39B2B2]">
              Book an appointment to visit us at our Parramatta office for a completely free, no-obligation consultation. Bring your goals, your questions, and your situation — we&apos;ll take the time to understand exactly what you need and walk you through all available options. No pressure. No cost. No obligation.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#00FCB8] px-4 py-2 text-sm text-white">📍 150 George Street, Parramatta 2150</span>
              <a href="tel:+61422959486" className="inline-flex items-center gap-2 rounded-full border border-[#00FCB8] px-4 py-2 text-sm text-white transition-colors hover:bg-[#00FCB8]/10">📞 +61 422 959 486</a>
            </div>
            <Link href="/contact" className="mt-6 inline-block rounded-lg bg-[#00FCB8] px-6 py-3 font-bold text-[#1C5472] transition-all duration-200 hover:scale-105">
              Book a Free Consultation
            </Link>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <p className="text-3xl" aria-hidden>👂</p>
              <h4 className="mt-3 text-lg font-bold text-[#1C5472]">We Listen First</h4>
              <p className="mt-2 text-sm text-[#1C5472]">We take the time to understand your goals before we explore any options.</p>
            </div>
            <div className="text-center">
              <p className="text-3xl" aria-hidden>🔍</p>
              <h4 className="mt-3 text-lg font-bold text-[#1C5472]">We Search Thoroughly</h4>
              <p className="mt-2 text-sm text-[#1C5472]">We don&apos;t stop at the first option. We search until we find the right fit for your specific situation.</p>
            </div>
            <div className="text-center">
              <p className="text-3xl" aria-hidden>🤝</p>
              <h4 className="mt-3 text-lg font-bold text-[#1C5472]">We Stay With You</h4>
              <p className="mt-2 text-sm text-[#1C5472]">Our relationship doesn&apos;t end at settlement. We check in, review, and support you as your needs evolve.</p>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider fill="#1C5472" />

      {/* 5. OUR VALUES */}
      <section className="bg-[#1C5472] px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">WHAT WE STAND FOR</p>
          <h2 className="mt-2 border-l-4 border-[#00FCB8] pl-4 text-3xl font-bold text-white md:text-4xl">
            The principles behind everything we do.
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v) => (
              <article key={v.title} className="rounded-xl border-2 border-[#39B2B2] bg-[#0A1628] p-6 transition-all duration-200 hover:border-[#00FCB8]">
                <ValueIcon type={v.icon} />
                <h3 className="mt-4 text-lg font-bold text-white">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#39B2B2]">{v.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fill="#F5F5EF" />

      {/* 6. MEET THE TEAM */}
      <section className="bg-[#F5F5EF] px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">THE TEAM</p>
          <h2 className="mt-2 border-l-4 border-[#00FCB8] pl-4 text-3xl font-bold text-[#1C5472] md:text-4xl">
            The people behind Frontline Financial.
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <article className="rounded-2xl bg-white p-6 shadow-md transition-shadow hover:shadow-xl">
              <div className="aspect-square w-full max-w-[240px] overflow-hidden rounded-2xl bg-[#1C5472] mx-auto flex items-center justify-center">
                <img
                  src="/images/DSC01459.png?v=2"
                  alt="Hassan Arif JP"
                  className="h-full w-full object-cover"
                  onError={(e) => { e.target.style.display = "none"; e.target.nextElementSibling?.classList.remove("hidden"); }}
                />
                <span className="hidden text-6xl font-bold text-white/80" aria-hidden>HA</span>
              </div>
              <h3 className="mt-4 text-2xl font-bold text-[#1C5472]">Hassan Arif JP</h3>
              <p className="text-[#39B2B2]">Director — Frontline Financial</p>
              <p className="mt-1 text-sm text-gray-500">Accredited Member (FBAA) · Finance Broker</p>
              <p className="mt-4 text-sm leading-relaxed text-[#1C5472]">
                Hassan is Director at Frontline Financial Brokers. He also works as a tax professional with EA Advisory Pty Ltd, where he is developing TaxFlowAI and provides CFO services to small and medium-sized entities with turnover not exceeding $10 million. Hassan has over 4 years of experience working in the accounting and finance industry. Hassan has completed over 500 tax returns and has settled over 20 million in home loans, car loans, and commercial loans throughout his career. Hassan&apos;s approach: take the time to understand what the client goals are, then find the best path to get them there.
              </p>
              <p className="mt-4 text-sm italic text-gray-600">
                <span className="text-[#00FCB8]">★★★★★</span> &quot;Hassan was proactive and professional throughout the process of home loan applications and settlement leading to a successful settlement. Highly recommend his services.&quot; — Brendan Piech
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href="mailto:hassan@frontline.financial" className="rounded-full border border-[#39B2B2] px-3 py-1.5 text-sm text-[#1C5472] transition-colors hover:bg-[#39B2B2]/10">Email</a>
                <a href="tel:+61422959486" className="rounded-full border border-[#39B2B2] px-3 py-1.5 text-sm text-[#1C5472] transition-colors hover:bg-[#39B2B2]/10">Phone</a>
                <a href="https://www.linkedin.com/in/hassan-arif-555382354/" target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#39B2B2] px-3 py-1.5 text-sm text-[#1C5472] transition-colors hover:bg-[#39B2B2]/10">LinkedIn</a>
              </div>
            </article>
            <article className="rounded-2xl bg-white p-6 shadow-md transition-shadow hover:shadow-xl">
              <div className="aspect-square w-full max-w-[240px] overflow-hidden rounded-2xl bg-[#1C5472] mx-auto flex items-center justify-center">
                <img
                  src="/images/DSC01491.png"
                  alt="Sham"
                  className="h-full w-full object-cover"
                  onError={(e) => { e.target.style.display = "none"; e.target.nextElementSibling?.classList.remove("hidden"); }}
                />
                <span className="hidden text-6xl font-bold text-white/80" aria-hidden>SH</span>
              </div>
              <h3 className="mt-4 text-2xl font-bold text-[#1C5472]">Sham</h3>
              <p className="text-[#39B2B2]">Director — Frontline Financial Asset Solutions</p>
              <p className="mt-1 text-sm text-gray-500">Asset Finance Specialist · Award Winner FY25</p>
              <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#00FCB8] px-3 py-1 text-xs font-medium text-[#00FCB8]">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><polyline points="14 9 14 2 10 2 10 9" /><path d="M6 2h12" /><path d="M6 9H4a2 2 0 0 0-2 2v1a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6v-1a2 2 0 0 0-2-2h-2" /><line x1="12" y1="18" x2="12" y2="22" /><line x1="8" y1="22" x2="16" y2="22" /></svg>
                Fintelligence Award Winner FY25
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#1C5472]">
                Sham leads Frontline Financial Asset Solutions with a reputation for getting results others can&apos;t. With over 5 years in vehicle and equipment finance, he has settled more than $25 million in car, commercial, and fleet loans and helped hundreds of clients and businesses get funded. He works with 30+ lenders to secure competitive rates and regularly achieves same-day or next-day approvals. His approach: understand the client&apos;s goals first, then find the right asset finance solution to get them there — with speed, care, and a track record that speaks for itself.
              </p>
              <p className="mt-4 text-sm italic text-gray-600">
                <span className="text-[#00FCB8]">★★★★★</span> &quot;Sham was phenomenal. Approved in less than 24 hours.&quot; — Mikhail A.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href="mailto:sham@frontline.financial" className="rounded-full border border-[#39B2B2] px-3 py-1.5 text-sm text-[#1C5472] transition hover:bg-[#39B2B2]/10">Email</a>
                <a href="tel:+61450553877" className="rounded-full border border-[#39B2B2] px-3 py-1.5 text-sm text-[#1C5472] transition hover:bg-[#39B2B2]/10">Phone</a>
                <a href="https://www.linkedin.com/in/sham-frontline/" target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#39B2B2] px-3 py-1.5 text-sm text-[#1C5472] transition hover:bg-[#39B2B2]/10">LinkedIn</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <WaveDivider fill="#1C5472" />

      {/* 7. AWARDS */}
      <section className="bg-[#1C5472] px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">RECOGNITION</p>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            Award winning service.
          </h2>
          <div className="mt-12 rounded-2xl bg-[#0A1628] px-8 py-12">
            <svg className="mx-auto h-20 w-20 text-[#00FCB8]" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <polyline points="14 9 14 2 10 2 10 9" />
              <path d="M6 2h12" />
              <path d="M6 9H4a2 2 0 0 0-2 2v1a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6v-1a2 2 0 0 0-2-2h-2" />
              <line x1="12" y1="18" x2="12" y2="22" />
              <line x1="8" y1="22" x2="16" y2="22" />
            </svg>
            <h3 className="mt-4 text-2xl font-bold text-white">Fintelligence Broker Awards FY25</h3>
            <p className="mt-2 text-lg text-[#39B2B2]">Winner — Vehicle & Equipment Finance</p>
            <div className="mx-auto my-6 h-px w-16 bg-[#00FCB8]" aria-hidden />
            <p className="text-sm leading-relaxed text-[#39B2B2]">
              Awarded to Sham at Frontline Financial Asset Solutions for outstanding performance in vehicle and equipment finance — recognising exceptional client outcomes, fast approvals, and consistent excellence in asset finance broking.
            </p>
          </div>
        </div>
      </section>

      <WaveDivider fill="#39B2B2" />

      {/* 8. COMMUNITY */}
      <section className="bg-[#39B2B2] px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1C5472]">COMMUNITY</p>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            Western Sydney first.
          </h2>
          <p className="mt-2 text-3xl font-bold text-[#00FCB8] md:text-4xl">
            Australia next.
          </p>
          <p className="mt-6 max-w-2xl mx-auto leading-relaxed text-[#1C5472]">
            We started in Parramatta. The plan was never to stay small. Every workshop we run, every client we help, every person who finally understands their tax return — that&apos;s one more Australian closer to the goal. We&apos;ve got 25,999,500 to go. Let&apos;s get moving.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 text-[#1C5472]">
              <p className="text-2xl" aria-hidden>💬</p>
              <h4 className="mt-3 font-bold">Free Consultations</h4>
              <p className="mt-2 text-sm leading-relaxed">We offer completely free, no-obligation in-office consultations to anyone who wants to understand their finance options — no commitment required.</p>
            </div>
            <div className="rounded-xl bg-white p-6 text-[#1C5472]">
              <p className="text-2xl" aria-hidden>🎓</p>
              <h4 className="mt-3 font-bold">Financial Education</h4>
              <p className="mt-2 text-sm leading-relaxed">We regularly share plain-English guides, tips, and explainers to help our community make sense of mortgages, loans, and finance.</p>
            </div>
            <div className="rounded-xl bg-white p-6 text-[#1C5472]">
              <p className="text-2xl" aria-hidden>🤝</p>
              <h4 className="mt-3 font-bold">Local First</h4>
              <p className="mt-2 text-sm leading-relaxed">We actively support local Western Sydney businesses, events, and initiatives. Our community is our home.</p>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider fill="#00FCB8" />

      {/* 9. CTA */}
      <section className="cta-stripe-pattern relative bg-[#00FCB8] px-4 py-14 md:px-6 md:py-16 lg:px-8">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-[#1C5472] md:text-5xl">
            Ready to talk about your goals?
          </h2>
          <p className="mt-4 text-lg text-[#1C5472] md:text-xl">
            Book a free in-office consultation at our Parramatta office — no cost, no obligation, no pressure.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            <Link href="/contact" className="inline-flex w-full items-center justify-center rounded-lg bg-[#1C5472] px-8 py-4 font-bold text-white transition-all duration-200 hover:scale-105 hover:opacity-90 sm:w-auto">
              Book a Free Consultation
            </Link>
            <Link href="/brokers" className="inline-flex w-full items-center justify-center rounded-lg border-2 border-[#1C5472] bg-transparent px-8 py-4 font-bold text-[#1C5472] transition-all duration-200 hover:scale-105 hover:bg-[#1C5472]/10 sm:w-auto">
              Our Services
            </Link>
            <a href="tel:+61422959486" className="inline-flex w-full items-center justify-center rounded-lg border-2 border-[#1C5472] bg-transparent px-8 py-4 font-bold text-[#1C5472] transition-all duration-200 hover:scale-105 hover:bg-[#1C5472]/10 sm:w-auto">
              Call Us: +61 422 959 486
            </a>
          </div>
        </div>
      </section>

      <WaveDivider fill="#1C5472" />

      <LayoutFooter />
    </div>
  );
}
