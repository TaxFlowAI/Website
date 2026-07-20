import Link from "next/link";
import TaxFlowHeader from "@/components/taxflow/TaxFlowHeader";
import TaxFlowAppFooter from "@/components/taxflow/TaxFlowAppFooter";
import RevealInit from "@/components/taxflow/RevealInit";
import { HeroCurrent, ProductScreen, FloExchange, Tick } from "@/components/taxflow/TaxFlowMockups";
import {
  container,
  CtaBand,
  FeesSection,
  IntegrationsSection,
  SecuritySection,
  GoogleReviewsSection,
  AgentsSection,
  StatStrip,
  SwitchingModule,
  TAXFLOW_SIGNIN_URL,
  CALENDLY_URL,
} from "@/components/taxflow/TaxFlowShared";

export const metadata = {
  title: "TaxFlowAI — Australia's AI-powered tax portal",
  description:
    "Australia's AI-powered tax portal. Snap receipts, track every ATO deadline, and work with Registered Tax Agents — free to sign up.",
  alternates: { canonical: "/taxflow" },
  openGraph: {
    title: "TaxFlowAI — Australia's AI-powered tax portal",
    description:
      "Snap receipts, track every ATO deadline, and work with Registered Tax Agents — free to sign up.",
    url: "/taxflow",
  },
};

const FEATURE_HIGHLIGHTS = [
  {
    title: "AI receipt scanner",
    desc: "Upload anywhere in the portal — Flo auto-files it into the right ATO category and shows its reasoning.",
    anchor: "scanner",
  },
  {
    title: "Guided deduction pages (D1–D9)",
    desc: "Car logbook, travel diary, uniforms, self-education, WFH hours, donations — ATO rules in plain English.",
    anchor: "deductions",
  },
  {
    title: "Document vault",
    desc: "Your own private, password-protected cloud folder — receipts, statements and signed documents in one place.",
    anchor: "vault",
  },
  {
    title: "Book your accountant in two clicks",
    desc: "Live availability — 30-min Teams or phone, or 1-hour in-person at Parramatta or Martin Place.",
    anchor: "booking",
  },
  {
    title: "Vehicle logbook",
    desc: "ATO-compliant 12-week logbook with business-use % and CSV/PDF export for substantiation.",
    anchor: "logbook",
  },
  {
    title: "Lodgement tracking",
    desc: "Every deadline for every entity, with live status — lodged, due soon, or on track.",
    anchor: "lodgements",
  },
];

const HOW_TEASER = [
  ["Step 1", "Register your account"],
  ["Step 2", "Complete your 10-minute profile"],
  ["Step 3", "Engage your tax agent"],
  ["Step 4", "Upload, track, stay on top"],
];

const PERSONAS = [
  {
    href: "/taxflow/for/sole-traders",
    title: "Sole traders",
    desc: "BAS and quarterly deadlines, business vs personal expenses, vehicle logbook.",
  },
  {
    href: "/taxflow/for/employees-and-wfh",
    title: "Employees & WFH",
    desc: "WFH fixed-rate hour tracker, D5 claims, and the records the ATO expects.",
  },
  {
    href: "/taxflow/for/property-investors",
    title: "Property investors",
    desc: "Rental schedules, deductible expenses, and record keeping that holds up.",
  },
];

const ENTITIES = ["Personal", "Sole Trader", "Company", "Trust", "Partnership"];

export default function TaxFlowHomePage() {
  return (
    <div className="tc-page min-h-screen">
      <RevealInit />
      <TaxFlowHeader />

      {/* ============ HERO ============ */}
      <section className="tc-section-spined tc-depth-blue relative overflow-hidden">
        <div className={`${container} grid items-center gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-8`}>
          <div className="lg:col-span-6">
            <p className="tc-eyebrow" style={{ color: "#00FCB8" }}>
              Tax services supervised by Registered Tax Agents
            </p>
            <h1 className="tc-display mt-5 text-[2.9rem] text-white md:text-6xl lg:text-[4.2rem]">
              Your tax,
              <br />
              under control.
            </h1>
            <p className="mt-5 max-w-md text-lg" style={{ color: "#B7C4CF" }}>
              AI sorts your receipts, Registered Tax Agents lodge your return, and
              every ATO deadline is tracked for you — free to start.
            </p>
            <p className="mt-3 max-w-md text-[14px]" style={{ color: "#94A3B8" }}>
              Tax made simple. For every Australian.
            </p>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed" style={{ color: "#94A3B8" }}>
              Lost receipts? Unclear status? Hard to reach your accountant? Flo sorts
              your receipts, your vault keeps everything safe, and you always see
              what&apos;s next.
            </p>
            <ul className="mt-7 space-y-2.5 text-[14.5px]">
              {[
                "Always know what's happening",
                "Stay organised — receipts & documents in one place",
                "Reach your accountant — upload, message, no phone tag",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-white/85">
                  <Tick />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href={TAXFLOW_SIGNIN_URL} className="tc-btn-primary rounded-lg px-6 py-3 text-[15px] font-bold">
                Get started
              </a>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="tc-btn-ghost rounded-lg px-6 py-3 text-[15px] font-semibold"
              >
                Book a free 30-min call
              </a>
            </div>
            <p className="mt-4 text-[13.5px]" style={{ color: "#94A3B8" }}>
              Start uploading in minutes — Flo files receipts as they land.
            </p>
            <p className="mt-2 text-[13.5px]" style={{ color: "#94A3B8" }}>
              Not ready to sign up?{" "}
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="tc-link">
                Talk to a real tax agent first
              </a>{" "}
              — free, no obligation.
            </p>
            <p className="tc-mono mt-4 text-[11.5px]" style={{ color: "#94A3B8" }}>
              FREE TO SIGN UP · NO CARD · NO SUBSCRIPTION
            </p>
          </div>
          <div className="lg:col-span-6 lg:pl-8">
            <HeroCurrent />
            <ProductScreen />
          </div>
        </div>
      </section>

      {/* ============ TRUST LEDGER LINE ============ */}
      <section className="border-t" style={{ borderColor: "rgba(255,255,255,0.08)", background: "#060D1A" }}>
        <div className={`${container} flex flex-wrap items-center gap-x-8 gap-y-2 py-5`}>
          {[
            ["Registered Tax Agents", null],
            ["ASIC agent 51843", null],
            ["ABN 59 671 861 475", null],
            ["Verify tax agent ↗", "https://tpb.gov.au/registrations_search"],
          ].map(([label, href]) =>
            href ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="tc-mono text-[11.5px] underline decoration-[rgba(0,252,184,0.4)] underline-offset-4 transition hover:decoration-[#00FCB8]"
                style={{ color: "#00FCB8" }}
              >
                {label.toUpperCase()}
              </a>
            ) : (
              <span key={label} className="tc-mono text-[11.5px]" style={{ color: "#94A3B8" }}>
                {label.toUpperCase()}
              </span>
            )
          )}
          <span className="tc-mono ml-auto hidden text-[11.5px] md:inline" style={{ color: "#64748B" }}>
            POWERED BY FRONTLINE FINANCIAL
          </span>
        </div>
      </section>

      {/* ============ PROOF-OF-SCALE STRIP (unpublished until real stats supplied) ============ */}
      <StatStrip />

      {/* ============ MANIFESTO ============ */}
      <section style={{ background: "#0A1628" }}>
        <div className={`${container} grid gap-10 py-16 md:py-24 lg:grid-cols-12`}>
          <div className="tc-reveal lg:col-span-7">
            <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>
              Not like every other tax platform
            </p>
            <h2 className="tc-display mt-4 text-4xl text-white md:text-5xl">
              Feel like you&apos;re <span style={{ color: "#00FCB8" }}>in control</span>,
              <br />
              not in the dark.
            </h2>
          </div>
          <div className="tc-reveal flex flex-col justify-end lg:col-span-4 lg:col-start-9">
            <p className="text-[16px] leading-relaxed" style={{ color: "#94A3B8" }}>
              We&apos;re not here to sell you software. We&apos;re here to give you
              visibility — real accountants, real deadlines, real clarity.
            </p>
            <a href={TAXFLOW_SIGNIN_URL} className="tc-link mt-5 text-[15px] font-semibold">
              Sign up to get started
            </a>
          </div>
        </div>
      </section>

      {/* ============ FEATURE HIGHLIGHTS ============ */}
      <section id="features" className="border-t" style={{ background: "#0A1628", borderColor: "rgba(255,255,255,0.08)" }}>
        <div className={`${container} py-16 md:py-24`}>
          <div className="tc-reveal flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>What you get</p>
              <h2 className="tc-display mt-4 text-4xl text-white md:text-5xl">
                Your complete tax control centre
              </h2>
            </div>
            <Link href="/taxflow/features" className="tc-link text-[15px] font-semibold">
              See all features
            </Link>
          </div>
          <div className="tc-reveal mt-12 grid gap-x-14 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {FEATURE_HIGHLIGHTS.map((f) => (
              <div key={f.anchor}>
                <h3 className="text-[17px] font-bold text-white">
                  <Link href={`/taxflow/features#${f.anchor}`} className="transition hover:text-[#00FCB8]">
                    {f.title}
                  </Link>
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed" style={{ color: "#94A3B8" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS TEASER ============ */}
      <section id="how-it-works" className="border-t" style={{ background: "#0A1628", borderColor: "rgba(255,255,255,0.08)" }}>
        <div className={`${container} py-16 md:py-24`}>
          <div className="tc-reveal max-w-xl">
            <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>The process</p>
            <h2 className="tc-display mt-4 text-4xl text-white md:text-5xl">
              Up and running in minutes
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "#94A3B8" }}>
              Register free, complete a 10-minute profile, engage a Registered Tax
              Agent, and stay on top of everything from one dashboard.
            </p>
          </div>
          <div className="tc-observe relative mt-12 max-w-2xl">
            <div className="tc-spine tc-grad-line-v absolute bottom-3 left-[5px] top-3 w-[2px]" aria-hidden />
            <ol className="space-y-7">
              {HOW_TEASER.map(([label, title]) => (
                <li key={label} className="tc-reveal relative grid grid-cols-[13px_1fr] items-baseline gap-x-6">
                  <span className="tc-node mt-1" aria-hidden />
                  <p className="text-[16px] font-bold text-white">
                    <span className="tc-mono mr-3 text-[11px] font-medium tracking-[0.18em]" style={{ color: "#00FCB8" }}>
                      {label.toUpperCase()}
                    </span>
                    {title}
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-9 pl-[37px]">
            <Link href="/taxflow/how-it-works" className="tc-link text-[15px] font-semibold">
              See the full walkthrough — including how fees work
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FEES ============ */}
      <FeesSection />

      {/* ============ INTEGRATIONS ============ */}
      <IntegrationsSection />

      {/* ============ WHO IT'S FOR ============ */}
      <section className="border-t" style={{ background: "#0A1628", borderColor: "rgba(255,255,255,0.08)" }}>
        <div className={`${container} py-16 md:py-20`}>
          <div className="tc-reveal">
            <p className="tc-eyebrow" style={{ color: "#00FCB8" }}>Who it&apos;s for</p>
            <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
              <h2 className="tc-display text-3xl text-white md:text-4xl">
                One portal for all your entities
              </h2>
              <p className="max-w-xs text-[13.5px]" style={{ color: "#94A3B8" }}>
                Manage every account in a single view — no switching between systems.
              </p>
            </div>
            <div className="relative mt-10">
              <div className="tc-grad-line-h tc-glow-line absolute left-0 right-0 top-1/2 hidden h-[1.5px] -translate-y-1/2 md:block" aria-hidden />
              <div className="relative flex flex-wrap gap-3 md:justify-between">
                {ENTITIES.map((label) => (
                  <span key={label} className="tc-chip tc-mono px-4 py-2.5 text-[12px] font-medium uppercase tracking-[0.1em] text-white/85">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="tc-reveal mt-12 grid gap-4 md:grid-cols-3">
            {PERSONAS.map((p) => (
              <Link key={p.href} href={p.href} className="tc-int-card block p-5">
                <h3 className="text-[16px] font-bold text-white">{p.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed" style={{ color: "#94A3B8" }}>
                  {p.desc}
                </p>
                <span className="tc-mono mt-3 inline-block text-[11px]" style={{ color: "#00FCB8" }}>
                  BUILT FOR YOU →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SWITCHING IS PAINLESS ============ */}
      <SwitchingModule />

      {/* ============ MEET FLO ============ */}
      <section className="tc-depth-teal border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className={`${container} grid gap-12 py-16 md:py-24 lg:grid-cols-12`}>
          <div className="tc-reveal lg:col-span-5">
            <p className="tc-eyebrow" style={{ color: "#00FCB8" }}>Your AI assistant</p>
            <h2 className="tc-display mt-4 text-4xl text-white md:text-5xl">Meet Flo</h2>
            <p className="mt-5 text-[15px] leading-relaxed" style={{ color: "#B7C4CF" }}>
              Flo is the assistant built into every page of your portal — Flo{" "}
              <em>is</em> the flow. It sorts your receipts into ATO deduction
              categories (D1–D9), explains every categorisation decision, and answers
              your tax questions in plain English.
            </p>
            <ul className="mt-7 space-y-3 text-[14px]">
              {[
                "Classifies receipts into ATO deduction categories with confidence levels",
                "Shows AI reasoning behind every categorisation decision",
                "Answers questions about tax deductions and ATO rules",
                "Guides first-time users through onboarding",
                "Floating chat button — always available on every page",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-white/85">
                  <Tick />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="tc-reveal lg:col-span-6 lg:col-start-7">
            <FloExchange />
          </div>
        </div>
      </section>

      {/* ============ MEET YOUR TAX AGENTS (unpublished until real agents supplied) ============ */}
      <AgentsSection />

      {/* ============ SECURITY ============ */}
      <SecuritySection />

      {/* ============ GOOGLE REVIEWS (unpublished until real reviews supplied) ============ */}
      <GoogleReviewsSection />

      {/* ============ CTA ============ */}
      <CtaBand />

      <TaxFlowAppFooter />
    </div>
  );
}
