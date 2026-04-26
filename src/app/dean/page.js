"use client";

import { useState } from "react";
import Link from "next/link";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import WaveDivider from "@/components/WaveDivider";
import FormConsent, { CONSENT_ERROR } from "@/components/FormConsent";
import { ENTITY } from "@/config/entities";

const SERVICE_AREAS = [
  {
    title: "Asset Finance",
    desc: "Cars, trucks, plant & equipment — for personal use or business operations.",
    icon: (
      <svg className="h-10 w-10 text-[#00FCB8]" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M5 17h14v-5H5v5zM5 10h14V8l-3-4H8L5 8v2z" />
        <circle cx="7.5" cy="16.5" r="1.5" />
        <circle cx="16.5" cy="16.5" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Business Funding",
    desc: "Working capital, commercial loans, and tailored business lending solutions.",
    icon: (
      <svg className="h-10 w-10 text-[#00FCB8]" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
      </svg>
    ),
  },
  {
    title: "Personal Lending",
    desc: "Vehicle purchases and consumer finance — the space Dean knows best.",
    icon: (
      <svg className="h-10 w-10 text-[#00FCB8]" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 11h-6M19 8v6" />
      </svg>
    ),
  },
];

const EXPERIENCE = [
  { role: "Partner", company: "Frontline Financial: Asset Solutions", period: "Jan 2026 — Present" },
  { role: "Finance Director", company: "Quest", period: "Apr 2024 — Dec 2025" },
  { role: "Relationship Manager — Broker Distribution", company: "NAB", period: "Sep 2023 — Apr 2024" },
  { role: "Business Banker", company: "Commonwealth Bank", period: "Jul 2022 — Sep 2023" },
  { role: "Commercial Finance Broker", company: "Valiant Finance", period: "Oct 2020 — Dec 2021" },
  { role: "Finance Broker", company: "Auto Approve", period: "Feb 2020 — Oct 2020" },
];

export default function DeanPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen bg-[#F5F5EF] font-sans">
      <LayoutNav activeNav="" />

      {/* HERO */}
      <section className="section-dot-grid-dark relative overflow-hidden px-4 pt-16 pb-20 md:px-6 md:pt-20 md:pb-24 lg:px-8">
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[#00FCB8] opacity-[0.08] blur-[100px]" aria-hidden />
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-80 w-80 -translate-x-1/2 rounded-full bg-[#39B2B2] opacity-[0.08] blur-[100px]" aria-hidden />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[3fr_2fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#00FCB8]/40 bg-[#00FCB8]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#00FCB8]">
              <span aria-hidden>+</span>
              Frontline Financial: Asset Solutions
            </p>
            <h1 className="mt-6 text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
              I&apos;m back in deals.
            </h1>
            <p className="mt-2 text-5xl font-bold text-[#00FCB8] md:text-6xl lg:text-7xl">
              Just doing them differently.
            </p>
            <p className="mt-8 max-w-xl text-lg text-white/90 md:text-xl">
              After sitting out a non-compete period, I&apos;ve transitioned into a Partner role at Frontline Financial: Asset Solutions — working alongside an award-winning team to workshop scenarios, structure deals, and match clients with the right lender from the outset.
            </p>
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap">
              <a href="tel:+61450355483" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#00FCB8] px-6 py-3 font-bold text-[#1C5472] transition-all duration-200 hover:scale-105 hover:opacity-90 sm:w-auto">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.28a1 1 0 01.95.68l1.5 4.49a1 1 0 01-.5 1.21l-1.86.93a11 11 0 005.52 5.52l.93-1.86a1 1 0 011.21-.5l4.49 1.5a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z" /></svg>
                Call Dean: 0450 355 483
              </a>
              <a href="mailto:dean@frontline.financial" className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[#00FCB8] bg-transparent px-6 py-3 font-bold text-[#00FCB8] transition-all duration-200 hover:scale-105 hover:bg-[#00FCB8]/10 sm:w-auto">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                dean@frontline.financial
              </a>
              <a href="#scenario" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 px-6 py-3 font-bold text-white backdrop-blur-sm transition hover:bg-white/15 sm:w-auto">
                Send me a scenario
              </a>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/80">
              <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#00FCB8]" aria-hidden /> 6+ years across broking & banking</span>
              <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#00FCB8]" aria-hidden /> NAB, CBA, Valiant, Auto Approve</span>
              <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#00FCB8]" aria-hidden /> UNSW</span>
            </div>
          </div>

          {/* Hero photo */}
          <div className="relative">
            <div className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 rounded-full bg-[#00FCB8]/20 blur-2xl" aria-hidden />
            <div className="pointer-events-none absolute -left-6 -bottom-6 h-40 w-40 rounded-full bg-[#39B2B2]/30 blur-2xl" aria-hidden />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl ring-1 ring-[#00FCB8]/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/dean.jpg"
                alt="Dean Tinellis — Partner at Frontline Financial: Asset Solutions"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/60 to-transparent p-5 pt-16">
                <p className="text-lg font-bold text-white">Dean Tinellis</p>
                <p className="text-sm text-[#00FCB8]">Partner — Asset Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider fill="#F5F5EF" />

      {/* THE NOTE — personal letter framing */}
      <section className="section-dot-grid relative px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">A QUICK UPDATE</p>
          <h2 className="mt-2 border-l-4 border-[#00FCB8] pl-4 text-3xl font-bold text-[#1C5472] md:text-4xl">
            What&apos;s changed — and what it means for you.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-[#1C5472]">
            <p>
              Over the past few months, I&apos;ve transitioned into a new role — now working in a Partner capacity with Frontline Financial: Asset Solutions.
            </p>
            <p>
              After sitting out a non-compete period, I&apos;m back involved in deals, but in a slightly different way. I&apos;m no longer brokering directly. Instead, I work closely with a very strong team and step in to workshop scenarios, structure deals, and make sure clients are matched with the right lender and strategy from the outset.
            </p>
            <p>
              The main advantage now is access to a <strong className="text-[#1C5472]">broader lender panel</strong> and more flexibility behind the scenes — particularly in the consumer space, which everyone knows is my bread and butter. This means we can usually find solutions even when deals are a bit outside the box.
            </p>
            <p>
              If you&apos;ve got something you&apos;re working on, or just want a second set of eyes on a scenario, send it through. I&apos;m always happy to take a look and point you in the right direction.
            </p>
            <p className="pt-2 text-[#39B2B2]">— Dean</p>
          </div>
        </div>
      </section>

      <WaveDivider fill="#1C5472" />

      {/* WHAT WE'RE HELPING WITH */}
      <section className="bg-[#1C5472] px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">WHAT WE&apos;RE HELPING WITH</p>
          <h2 className="mt-2 border-l-4 border-[#00FCB8] pl-4 text-3xl font-bold text-white md:text-4xl">
            Three areas. Broader panel. Faster outcomes.
          </h2>
          <p className="mt-4 max-w-2xl text-[#39B2B2]">
            Whether the deal is straightforward or a bit outside the box, the wider lender access at Frontline Financial: Asset Solutions means there&apos;s usually a way through.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {SERVICE_AREAS.map((area) => (
              <article key={area.title} className="rounded-2xl border border-[#39B2B2]/30 bg-[#0A1628] p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[#00FCB8]">
                <div className="rounded-xl bg-[#00FCB8]/10 p-3 inline-flex">
                  {area.icon}
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">{area.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#39B2B2]">{area.desc}</p>
              </article>
            ))}
          </div>

          {/* Award strip */}
          <div className="mt-10 rounded-2xl border border-[#00FCB8]/30 bg-[#0A1628] p-6 md:flex md:items-center md:justify-between md:gap-6">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#00FCB8]/15">
                <svg className="h-6 w-6 text-[#00FCB8]" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <polyline points="14 9 14 2 10 2 10 9" /><path d="M6 2h12" /><path d="M6 9H4a2 2 0 0 0-2 2v1a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6v-1a2 2 0 0 0-2-2h-2" /><line x1="12" y1="18" x2="12" y2="22" /><line x1="8" y1="22" x2="16" y2="22" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-[#00FCB8]">Award Winner FY25</p>
                <p className="mt-1 text-white">Fintelligence Broker Awards — Vehicle &amp; Equipment Finance</p>
              </div>
            </div>
            <Link href="/assetsolutions" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#00FCB8] hover:underline md:mt-0">
              About Asset Solutions
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <WaveDivider fill="#F5F5EF" />

      {/* EXPERIENCE TIMELINE */}
      <section className="bg-[#F5F5EF] px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">DEAN&apos;S BACKGROUND</p>
          <h2 className="mt-2 border-l-4 border-[#00FCB8] pl-4 text-3xl font-bold text-[#1C5472] md:text-4xl">
            Six+ years across broking and banking.
          </h2>
          <p className="mt-4 text-[#1C5472]">
            From frontline broker to bank relationship manager to finance director — Dean has structured deals from every angle of the table.
          </p>
          <div className="mt-12 relative">
            <div className="absolute left-4 top-2 bottom-2 w-px bg-[#39B2B2]/40" aria-hidden />
            <ul className="space-y-7">
              {EXPERIENCE.map((item, i) => (
                <li key={i} className="relative pl-12">
                  <span className={`absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full ${i === 0 ? "bg-[#00FCB8]" : "bg-white border-2 border-[#39B2B2]"}`}>
                    <span className={`h-2.5 w-2.5 rounded-full ${i === 0 ? "bg-[#1C5472]" : "bg-[#39B2B2]"}`} aria-hidden />
                  </span>
                  <p className="text-sm font-medium text-[#39B2B2]">{item.period}</p>
                  <p className="mt-0.5 text-lg font-bold text-[#1C5472]">{item.role}</p>
                  <p className="text-sm text-[#1C5472]/80">{item.company}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <WaveDivider fill="#1C5472" />

      {/* SCENARIO FORM */}
      <section id="scenario" className="bg-[#1C5472] px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">SECOND SET OF EYES</p>
          <h2 className="mt-2 border-l-4 border-[#00FCB8] pl-4 text-3xl font-bold text-white md:text-4xl">
            Got a deal you&apos;re working on? Send it through.
          </h2>
          <p className="mt-4 text-[#39B2B2]">
            A quick scenario, an outside-the-box client, or just a second opinion — happy to take a look and point you in the right direction.
          </p>

          {success ? (
            <div className="mt-10 rounded-2xl border border-[#00FCB8]/40 bg-[#0A1628] px-6 py-10 text-center">
              <svg className="mx-auto h-14 w-14 text-[#00FCB8]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p className="mt-4 text-2xl font-bold text-white">Got it — thanks.</p>
              <p className="mt-2 text-[#39B2B2]">Dean will review your scenario and be in touch shortly.</p>
            </div>
          ) : (
            <form
              className="mt-10 space-y-5 rounded-2xl bg-white/5 p-6 md:p-8 backdrop-blur-sm border border-white/10"
              onSubmit={async (e) => {
                e.preventDefault();
                setError("");
                if (!consent) {
                  setError(CONSENT_ERROR);
                  return;
                }
                setSubmitting(true);
                try {
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      firstName: form.firstName.trim(),
                      lastName: form.lastName.trim(),
                      email: form.email.trim(),
                      phone: form.phone.trim(),
                      message: `Scenario for Dean (Asset Solutions): ${form.message.trim()}`,
                      services: ["Asset Solutions — Dean Tinellis Partner Enquiry"],
                      campaign: "dean-landing",
                    }),
                  });
                  const data = await res.json();
                  if (!res.ok) throw new Error(data.error || "Something went wrong");
                  setSuccess(true);
                } catch (err) {
                  setError(err.message || "Failed to submit. Please try again.");
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-white">First name</span>
                  <input
                    type="text"
                    required
                    value={form.firstName}
                    onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-white placeholder-white/50 focus:border-[#00FCB8] focus:outline-none focus:ring-1 focus:ring-[#00FCB8]"
                    placeholder="First name"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-white">Last name</span>
                  <input
                    type="text"
                    required
                    value={form.lastName}
                    onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-white placeholder-white/50 focus:border-[#00FCB8] focus:outline-none focus:ring-1 focus:ring-[#00FCB8]"
                    placeholder="Last name"
                  />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-white">Email</span>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-white placeholder-white/50 focus:border-[#00FCB8] focus:outline-none focus:ring-1 focus:ring-[#00FCB8]"
                    placeholder="you@example.com"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-white">Phone</span>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-white placeholder-white/50 focus:border-[#00FCB8] focus:outline-none focus:ring-1 focus:ring-[#00FCB8]"
                    placeholder="04XX XXX XXX"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-sm font-medium text-white">Tell me about the scenario</span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-white placeholder-white/50 focus:border-[#00FCB8] focus:outline-none focus:ring-1 focus:ring-[#00FCB8]"
                  placeholder="What are you working on? Asset, business, or consumer — give me the rough outline."
                />
              </label>
              <div className="rounded-lg bg-white/95 p-4">
                <FormConsent
                  entity={ENTITY.ASSET_SOLUTIONS}
                  value={consent}
                  onChange={setConsent}
                  showError={Boolean(error && error === CONSENT_ERROR)}
                />
              </div>
              {error && error !== CONSENT_ERROR && (
                <p className="text-sm font-medium text-[#FFB4B4]">{error}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-[#00FCB8] px-6 py-3 font-bold text-[#1C5472] transition-all duration-200 hover:scale-[1.02] hover:opacity-90 disabled:opacity-70 sm:w-auto"
              >
                {submitting ? "Sending…" : "Send scenario to Dean"}
              </button>
              <p className="text-xs text-white/60">
                Or call directly: <a href="tel:+61450355483" className="font-bold text-[#00FCB8] hover:underline">0450 355 483</a>
              </p>
            </form>
          )}
        </div>
      </section>

      <WaveDivider fill="#00FCB8" />

      {/* CTA */}
      <section className="cta-stripe-pattern relative bg-[#00FCB8] px-4 py-14 md:px-6 md:py-16 lg:px-8">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-[#1C5472] md:text-5xl">
            Hope you&apos;ve been well.
          </h2>
          <p className="mt-3 text-lg text-[#1C5472] md:text-xl">
            Good to be back in touch.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            <a href="tel:+61450355483" className="inline-flex w-full items-center justify-center rounded-lg bg-[#1C5472] px-8 py-4 font-bold text-white transition-all duration-200 hover:scale-105 hover:opacity-90 sm:w-auto">
              Call Dean
            </a>
            <a href="mailto:dean@frontline.financial" className="inline-flex w-full items-center justify-center rounded-lg border-2 border-[#1C5472] bg-transparent px-8 py-4 font-bold text-[#1C5472] transition-all duration-200 hover:scale-105 hover:bg-[#1C5472]/10 sm:w-auto">
              Email Dean
            </a>
            <Link href="/assetsolutions" className="inline-flex w-full items-center justify-center rounded-lg border-2 border-[#1C5472] bg-transparent px-8 py-4 font-bold text-[#1C5472] transition-all duration-200 hover:scale-105 hover:bg-[#1C5472]/10 sm:w-auto">
              About Asset Solutions
            </Link>
          </div>
        </div>
      </section>

      <WaveDivider fill="#1C5472" />

      <LayoutFooter />
    </div>
  );
}
