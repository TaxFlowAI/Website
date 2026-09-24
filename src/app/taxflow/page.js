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
import { container, CtaBand } from "@/components/taxflow/TaxFlowShared";

export const metadata = {
  title: "TaxFlowAI — Smarter tax, effortless deductions",
  description:
    "Australia's AI-powered tax portal. Flo sorts your receipts into ATO deduction categories, Registered Tax Agents lodge your return, and every deadline is tracked — free to sign up. Built by Frontline Financial Group.",
  alternates: { canonical: "/taxflow" },
  openGraph: {
    title: "TaxFlowAI — Smarter tax, effortless deductions",
    description:
      "Flo sorts your receipts, Registered Tax Agents lodge your return, every deadline tracked — free to sign up.",
    url: "/taxflow",
  },
};

/* Section edge colours — each wave is painted on the colour above it and
   filled with the colour below it, exactly like the Frontline home page. */
const NAVY = "#0A1628";
const DEEP = "#060D1A";
const REVIEWS = "#0E2238";

const TRUST_LINE = [
  ["Connects you with Registered Tax Agents", null],
  ["ASIC agent 51843", null],
  ["ABN 59 671 861 475", null],
  ["Verify tax agent ↗", "https://tpb.gov.au/registrations_search"],
];

const ABOUT_POINTS = [
  "Registered Tax Agents prepare and lodge every return — verify them on the TPB register",
  "A registered ASIC agent handles your company paperwork",
  "Message through the portal and a person reads it — no bots answering for us",
];

const SECURITY_CARDS = [
  { title: "Encrypted in transit and at rest", body: "Your data is protected on the move and in storage." },
  { title: "Two-factor authentication", body: "Every sign-in, every time. A password alone never gets anyone in." },
  { title: "TFN and bank details masked", body: "Sensitive fields are encrypted and revealed only after you re-enter your password." },
  { title: "Role-based access", body: "People only see what their role requires — nothing more." },
  { title: "Your own document folder", body: "Documents live in a private, access-controlled cloud folder that belongs to you." },
  { title: "Payments through Stripe", body: "Invoices are paid securely online. Card details never touch our servers." },
];

export default function TaxFlowHomePage() {
  return (
    <div className="tc-page min-h-screen">
      <RevealInit />
      <TaxFlowHeader />

      {/* ============ HERO — Flo ============ */}
      <section id="hero" className="tc-hero-flo relative overflow-hidden">
        <div className={`${container} grid items-center gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-6 lg:py-24`}>
          <div className="order-2 lg:order-1 lg:col-span-7">
            <p className="tc-eyebrow" style={{ color: "#00FCB8" }}>
              Meet Flo
            </p>
            <h1 className="tc-display mt-5 text-[2.9rem] text-white md:text-6xl lg:text-[4.8rem]">
              Smarter Tax,
              <br />
              <span className="tc-hero-accent">Effortless Deductions</span>
            </h1>
            <p className="mt-7 max-w-md text-xl leading-relaxed" style={{ color: "#B7C4CF" }}>
              Australia&apos;s AI-powered tax portal, with real tax agents behind it.
            </p>
            <Link href="/taxflow/how-it-works" className="tc-link mt-8 inline-block text-[15px] font-semibold">
              See how it works
            </Link>
          </div>

          <div className="order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end">
            <div className="tc-flo-stage relative w-64 sm:w-80 lg:w-[26rem]">
              <div className="tc-flo-glow" aria-hidden />
              <Image
                src="/images/taxflow/flo-hello.webp"
                alt="Flo, the TaxFlowAI assistant, waving and saying hello"
                width={1254}
                height={1254}
                priority
                sizes="(min-width: 1024px) 26rem, (min-width: 640px) 20rem, 16rem"
                className="float-animate relative z-10 h-auto w-full"
              />
              <div className="tc-flo-shadow" aria-hidden />
            </div>
          </div>
        </div>
      </section>

      {/* ============ LAYERED WAVE ============ */}
      <TaxFlowWaveLayers from={NAVY} to={NAVY} />

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
            <p className="mt-5 max-w-lg text-lg leading-relaxed" style={{ color: "#B7C4CF" }}>
              TaxFlowAI is built and run by the Frontline Financial Group team in
              Parramatta.
            </p>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed" style={{ color: "#94A3B8" }}>
              Flo does the sorting. Real, TPB-registered tax agents prepare and lodge
              your work, and our ASIC agent team keeps your company paperwork in order.
              The AI keeps you organised; the humans are accountable for the result.
            </p>
            <ul className="mt-7 space-y-3 text-[14.5px]">
              {ABOUT_POINTS.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-white/85">
                  <Tick />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/taxflow/about" className="tc-btn-primary rounded-lg px-6 py-3 text-[15px] font-bold">
                More about us
              </Link>
              <CalendlyButton className="tc-btn-ghost rounded-lg px-6 py-3 text-[15px] font-semibold">
                Talk to a human
              </CalendlyButton>
            </div>
            <p className="mt-4 text-[13px]" style={{ color: "#94A3B8" }}>
              Free, no obligation. Parramatta and Martin Place, or Teams and phone Australia-wide.
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

      {/* ============ GOOGLE REVIEWS ============ */}
      <TaxFlowWave from={NAVY} to={REVIEWS} />
      <GoogleReviewsCarousel edge={REVIEWS} />
      <TaxFlowWave from={REVIEWS} to={NAVY} />

      {/* ============ SERVICES (carousel) ============ */}
      <section id="services" style={{ background: NAVY, scrollMarginTop: "110px" }}>
        <div className={`${container} py-16 md:py-24`}>
          <div className="tc-reveal max-w-2xl">
            <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>Services</p>
            <h2 className="tc-display mt-4 text-4xl text-white md:text-5xl">
              Everything tax, in one place
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "#94A3B8" }}>
              Software to stay organised, Registered Tax Agents to lodge, an ASIC agent
              for your company — and the Frontline Financial group behind it all.
            </p>
          </div>
          <div className="mt-12">
            <ServicesCarousel />
          </div>
        </div>
      </section>

      {/* ============ DATA SECURITY ============ */}
      <TaxFlowWave from={NAVY} to={DEEP} />
      <section id="security" className="tc-depth-teal">
        <div className={`${container} grid gap-10 py-16 md:py-24 lg:grid-cols-12`}>
          <div className="tc-reveal lg:col-span-4">
            <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>Data security</p>
            <h2 className="tc-display mt-4 text-4xl text-white md:text-5xl">
              Your data, protected
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed" style={{ color: "#94A3B8" }}>
              A tax portal holds the most sensitive information you have. TaxFlowAI is
              built so you can focus on your tax — not on worrying about security.
            </p>
            <Link href="/taxflow/security" className="tc-link mt-6 inline-block text-[15px] font-semibold">
              How we protect your data
            </Link>
          </div>
          <div className="tc-reveal grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {SECURITY_CARDS.map((c) => (
              <div key={c.title} className="tc-int-card flex gap-4 p-5">
                <svg className="mt-1 h-4 w-4 shrink-0" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M1.5 6.5l3 3 6-7" stroke="#00FCB8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <h3 className="text-[15.5px] font-bold text-white">{c.title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed" style={{ color: "#94A3B8" }}>
                    {c.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <TaxFlowWave from={DEEP} to={NAVY} />
      <CtaBand />

      <TaxFlowAppFooter />
    </div>
  );
}
