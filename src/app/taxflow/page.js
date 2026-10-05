import Link from "next/link";
import Image from "next/image";
import TaxFlowHeader from "@/components/taxflow/TaxFlowHeader";
import TaxFlowAppFooter from "@/components/taxflow/TaxFlowAppFooter";
import RevealInit from "@/components/taxflow/RevealInit";
import TaxFlowWave from "@/components/taxflow/TaxFlowWave";
import TaxFlowWaveLayers from "@/components/taxflow/TaxFlowWaveLayers";
import ServicesCarousel from "@/components/taxflow/ServicesCarousel";
import GoogleReviewsCarousel from "@/components/taxflow/GoogleReviewsCarousel";
import { Tick } from "@/components/taxflow/TaxFlowMockups";
import CalendlyButton from "@/components/taxflow/CalendlyButton";
import MedicalShowcase from "@/components/taxflow/MedicalShowcase";
import { container, CtaBand } from "@/components/taxflow/TaxFlowShared";
import { SHOW_TAX_SERVICES } from "@/data/taxflow-flags";
import HeroShowreel from "@/components/taxflow/HeroShowreel";

export const metadata = {
  title: {
    absolute: SHOW_TAX_SERVICES
      ? "AI Tax Return App with a Registered Tax Agent | TaxFlowAI"
      : "AI Tax App for Receipts, Deductions & Deadlines | TaxFlowAI",
  },
  description: SHOW_TAX_SERVICES
    ? "Snap receipts and Flo sorts them into ATO deduction categories. A registered tax agent lodges your return and every deadline is tracked. Free to sign up."
    : "Snap receipts and Flo sorts them into ATO deduction categories. Every entity on one home screen and every deadline tracked. Free to sign up.",
  alternates: { canonical: "/taxflow" },
  openGraph: {
    title: "TaxFlowAI — Smarter tax, effortless deductions",
    description: SHOW_TAX_SERVICES
      ? "Flo sorts your receipts, Registered Tax Agents lodge your return, every deadline tracked — free to sign up."
      : "Flo sorts your receipts, every entity in one app, every deadline tracked — free to sign up.",
    url: "/taxflow",
  },
};

/* Section edge colours — each wave is painted on the colour above it and
   filled with the colour below it, exactly like the Frontline home page. */
const NAVY = "#0A1628";
const DEEP = "#060D1A";
const REVIEWS = "#0E2238";

const TRUST_LINE = SHOW_TAX_SERVICES
  ? [
      ["TAX7 T04 Pty Ltd · Registered Tax Agent 26313222", null],
      ["Platform by Frontline Holdings Group trading as TaxFlowAI by Frontline Financial · ASIC agent 51843", null],
      ["Verify tax agent ↗", "https://tpb.gov.au/registrations_search"],
    ]
  : [["Platform by Frontline Holdings Group trading as TaxFlowAI by Frontline Financial · ASIC agent 51843", null]];

const ABOUT_POINTS = [
  ...(SHOW_TAX_SERVICES
    ? ["Registered Tax Agents prepare and lodge every return — verify them on the TPB register"]
    : []),
  "A registered ASIC agent handles your company paperwork",
  "Message through the portal and a person reads it — no bots answering for us",
];

/* Approved wording from the TaxFlowAI security brief (27 Sept 2026) — do not
   reword without sign-off. See src/app/taxflow/security/page.js. */
const SECURITY_TRUST = ["Australian-hosted", "Encrypted at rest", "2FA on every login", "ISO 27001-aligned"];

export default function TaxFlowHomePage() {
  return (
    <div className="tc-page min-h-screen">
      <RevealInit />
      <TaxFlowHeader />

      {/* ============ HERO — Flo ============ */}
      <section id="hero" className="tc-hero-flo relative overflow-hidden">
        <div className={`${container} grid items-center gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-6 lg:py-24`}>
          <div className="lg:col-span-7">
            <p className="tc-eyebrow" style={{ color: "#00FCB8" }}>
              Meet Flo
            </p>
            <h1 className="tc-display mt-5 text-[2.9rem] text-white md:text-6xl lg:text-[4.8rem]">
              Smarter Tax,
              <br />
              <span className="tc-hero-accent">Effortless Deductions</span>
            </h1>
            <p className="mt-7 max-w-md text-xl leading-relaxed" style={{ color: "#B7C4CF" }}>
              Australia&apos;s AI-powered tax portal, with real{" "}
              {SHOW_TAX_SERVICES ? "tax agents" : "people"} behind it.
            </p>
            <Link href="/taxflow/how-it-works" className="tc-link mt-8 inline-block text-[15px] font-semibold">
              See how it works
            </Link>
          </div>

          {/* The phone swipes through real app screens while Flo dances
              between them. Screens and Flo renders are the owner's, unedited. */}
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <HeroShowreel />
          </div>
        </div>
      </section>

      {/* ============ LAYERED WAVE ============ */}
      <TaxFlowWaveLayers from={NAVY} to={NAVY} draw />

      {/* ============ ABOUT US — team photo hero ============ */}
      <section id="about" className="tc-section-spined tc-depth-blue relative overflow-hidden" style={{ scrollMarginTop: "110px" }}>
        <div className={`${container} grid items-center gap-12 pb-12 pt-10 md:pb-16 md:pt-14 lg:grid-cols-12 lg:gap-10`}>
          <div className="tc-reveal lg:col-span-6">
            <p className="tc-eyebrow" style={{ color: "#00FCB8" }}>
              About us
            </p>
            <h2 className="tc-display mt-4 text-4xl text-white md:text-5xl">
              Real humans behind it.
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed" style={{ color: "#94A3B8" }}>
              {SHOW_TAX_SERVICES
                ? "Flo does the sorting. Registered tax agents prepare and lodge your work, and our ASIC agent team keeps your company paperwork in order. The AI keeps you organised; the humans are accountable for the result."
                : "Flo does the sorting, and our ASIC agent team keeps your company paperwork in order. The AI keeps you organised; the humans are accountable for the result."}
            </p>
            <ul className="mt-7 space-y-3 text-[14.5px]">
              {ABOUT_POINTS.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-white/85">
                  <Tick />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <CalendlyButton className="tc-btn-primary rounded-lg px-6 py-3 text-[15px] font-bold">
                Talk to a human
              </CalendlyButton>
              <Link href="/taxflow/about" className="tc-link text-[15px] font-semibold">
                More about us
              </Link>
            </div>
            <p className="mt-4 text-[13.5px]" style={{ color: "#94A3B8" }}>
              A free 15-minute call by phone or Teams, with no obligation. TaxFlowAI is free to sign up.
            </p>
          </div>
          <div className="tc-reveal lg:col-span-6">
            <div className="tc-about-card relative">
              <Image
                src="/images/taxflow/about-team.webp"
                alt="The Frontline Financial Group team working at a boardroom table in Parramatta, with Flo sitting on the table beside them"
                width={1672}
                height={940}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="block h-auto w-full"
              />
            </div>
          </div>
        </div>

        {/* registrations — moved here from under the hero */}
        <div className={`${container} pb-12 md:pb-16`}>
          <div
            className="tc-reveal flex flex-wrap items-center gap-x-8 gap-y-2 border-t pt-5"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            {TRUST_LINE.map(([label, href]) =>
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
        </div>
      </section>

      {/* ============ GOOGLE REVIEWS ============
          every review is about tax returns, so they hide with the tax services */}
      {SHOW_TAX_SERVICES && (
        <>
          <TaxFlowWave from={NAVY} to={REVIEWS} />
          <GoogleReviewsCarousel edge={REVIEWS} />
          <TaxFlowWave from={REVIEWS} to={NAVY} />
        </>
      )}

      {/* ============ SERVICES (carousel) ============ */}
      <section id="services" tabIndex={-1} style={{ background: NAVY, scrollMarginTop: "110px" }}>
        <div className={`${container} py-16 md:py-24`}>
          <div className="tc-reveal max-w-2xl">
            <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>Services</p>
            <h2 className="tc-display mt-4 text-4xl text-white md:text-5xl">
              {SHOW_TAX_SERVICES ? "Everything tax, in one place" : "Everything in one place"}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "#94A3B8" }}>
              {SHOW_TAX_SERVICES
                ? "Software to stay organised, Registered Tax Agents to lodge, an ASIC agent for your company — and the Frontline Financial group behind it all."
                : "Software to stay organised, an ASIC agent for your company — and the Frontline Financial group behind it all."}
            </p>
          </div>
          <div className="mt-12">
            <ServicesCarousel />
          </div>
        </div>
      </section>

      {/* ============ DATA SECURITY ============ */}
      <TaxFlowWave from={NAVY} to={DEEP} />
      <section id="security" className="tc-depth-teal" style={{ scrollMarginTop: "110px" }}>
        <div className={`${container} py-16 md:py-24`}>
          {/* intro: copy + guardian Flo */}
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="tc-reveal order-2 lg:order-1 lg:col-span-7">
              <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>Data security</p>
              <h2 className="tc-display mt-4 text-4xl text-white md:text-5xl lg:text-[3.6rem]">
                Your data, secured{" "}
                <span className="tc-hero-accent">the Australian way.</span>
              </h2>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed" style={{ color: "#B7C4CF" }}>
                {SHOW_TAX_SERVICES
                  ? "TaxFlowAI's tax services are provided by a registered Australian tax agent, on a platform with security practices aligned to ISO/IEC 27001. Australian-hosted and encrypted in transit and at rest."
                  : "TaxFlowAI is built with security practices aligned to ISO/IEC 27001. Australian-hosted and encrypted in transit and at rest."}
              </p>
              <Link href="/taxflow/security" className="tc-link mt-7 inline-block text-[15px] font-semibold">
                How we protect your data
              </Link>
            </div>
            <div className="tc-reveal order-1 lg:order-2 lg:col-span-5">
              <div className="tc-flo-stage relative mx-auto w-60 sm:w-72 lg:ml-auto lg:mr-0 lg:w-[22rem]">
                <div className="tc-flo-glow" aria-hidden />
                <Image
                  src="/images/taxflow/flo-security.webp"
                  alt="Flo flexing beside a chained and locked vault, under a protective shield"
                  width={1254}
                  height={1254}
                  sizes="(min-width: 1024px) 22rem, 18rem"
                  className="float-animate relative z-10 h-auto w-full"
                />
              </div>
            </div>
          </div>

          {/* trust strip */}
          <ul
            className="tc-sec-strip tc-reveal mt-12 border-y py-6"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            {SECURITY_TRUST.map((t) => (
              <li key={t}>
                <span className="tc-sec-dot" aria-hidden />
                {t}
              </li>
            ))}
          </ul>

          {/* bento */}
          <div className="tc-reveal mt-8 grid items-stretch gap-4 md:grid-cols-6">
            {/* Australia — wide */}
            <div className="tc-bento md:col-span-4">
              <div className="flex flex-wrap items-center gap-5">
                <span className="tc-sec-pin" aria-hidden>
                  <span />
                </span>
                <div className="min-w-[12rem] flex-1">
                  <h3 className="tc-bento-title">Hosted in Australia.</h3>
                  <p className="tc-bento-body">
                    The platform, its database and its backups run in Amazon Web Services’
                    Sydney region.
                  </p>
                </div>
                <p className="tc-mono text-[11px] tracking-[0.16em]" style={{ color: "#00FCB8" }}>
                  SYDNEY · AP-SOUTHEAST-2
                </p>
              </div>
            </div>

            {/* encryption */}
            <div className="tc-bento md:col-span-2">
              <div className="tc-sec-flow mb-5 w-full" aria-hidden>
                <span />
              </div>
              <h3 className="tc-bento-title">Everything is encrypted.</h3>
              <p className="tc-bento-body">In transit and at rest.</p>
            </div>

            {/* 2FA */}
            <div className="tc-bento md:col-span-2">
              <div className="tc-code-type mb-5 grid max-w-[15rem] grid-cols-6 gap-1.5" aria-hidden>
                {["4", "8", "2", "", "", ""].map((d, i) => (
                  <span
                    key={i}
                    className={`tc-sec-code text-[0.95rem] ${d ? "is-filled" : ""} ${i === 3 ? "is-caret" : ""}`}
                  >
                    {d}
                  </span>
                ))}
              </div>
              <h3 className="tc-bento-title">Every login is double-checked.</h3>
              <p className="tc-bento-body">
                Password plus a one-time verification code, for every user, every time.
              </p>
            </div>

            {/* minimisation */}
            <div className="tc-bento md:col-span-2">
              <div className="tc-bento-redact mb-5" aria-hidden>
                <span className="tc-mono">TFN</span>
                <i />
                <b className="tc-mono">NOT STORED</b>
              </div>
              <h3 className="tc-bento-title">We keep only what we need.</h3>
              <p className="tc-bento-body">
                Tax File Numbers and bank account details are not stored in the platform.
              </p>
            </div>

            {/* backups */}
            <div className="tc-bento md:col-span-2">
              <p className="tc-display tc-hero-accent mb-3 text-[2.6rem] leading-none">~1 second</p>
              <h3 className="tc-bento-title">Backed up continuously.</h3>
              <p className="tc-bento-body">
                Our database replicates to encrypted Australian storage with roughly one
                second of maximum data loss.
              </p>
            </div>

            {/* managed practice — full width */}
            <div className="tc-bento tc-bento-accent md:col-span-6">
              <div className="flex flex-wrap items-center justify-between gap-5">
                <div className="min-w-[15rem] flex-1">
                  <h3 className="tc-bento-title">Security is a managed practice, not a promise.</h3>
                  <p className="tc-bento-body">
                    ISO 27001-aligned controls and continuous backups.
                  </p>
                </div>
                <Link
                  href="/taxflow/security"
                  className="tc-btn-ghost shrink-0 rounded-lg px-6 py-3 text-[14.5px] font-semibold"
                >
                  See the full security page
                </Link>
              </div>
            </div>
          </div>
          <p className="tc-reveal tc-fineprint mt-8">
            A summary only. Full details of how we collect, store, share and protect
            your information are in our{" "}
            <Link href="/taxflow/privacy-policy" className="tc-link">Privacy Policy</Link> and{" "}
            <Link href="/taxflow/terms" className="tc-link">Terms of Service</Link>.
          </p>
        </div>
      </section>

      {/* ============ FOR MEDICAL PROFESSIONALS (showcase) ============ */}
      <TaxFlowWave from={DEEP} to={NAVY} />
      {SHOW_TAX_SERVICES && <MedicalShowcase />}

      {/* ============ CTA ============ */}
      <CtaBand />

      <TaxFlowAppFooter />
    </div>
  );
}
