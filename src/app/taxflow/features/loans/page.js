import Link from "next/link";
import Image from "next/image";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import FrontlineLogoFull from "@/components/FrontlineLogoFull";
import CreditDisclosures from "@/components/taxflow/CreditDisclosures";
import { TAXFLOW_REGISTER_URL } from "@/components/taxflow/TaxFlowShared";
import { FEATURE_IMAGES, featureBySlug } from "@/components/taxflow/featurePages";

/* Apply for a loan: the one feature page in the Frontline Financial brand
   (off-white #F6F8F2, Dark Blue #1C5472, Teal #39B2B2, Aqua Green #00FCB8,
   DM Sans, three-layer wave, official logo).
   Compliance: never "approved", "guaranteed", rates or comparison claims.
   Both credit-representative disclosures must stay visible near the CTA. */

const TITLE = "Apply for a home, car or business loan | Frontline Financial";
const DESCRIPTION =
  "Start a loan enquiry from your TaxFlowAI portal. Choose what you’re after and a Frontline Financial broker will reach out. Enquiry only.";
const URL = "/taxflow/features/loans";
const I = FEATURE_IMAGES;

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "Frontline Financial",
    images: [{ url: I.loanStart.src, width: 1536, height: 1024, alt: I.loanStart.alt }],
  },
};

const STEPS = [
  ["Choose what you’re after", "Home, vehicle, business or personal finance."],
  ["Tell us roughly how much and when", "A ballpark is fine. It takes a minute."],
  ["A broker reaches out", "A Frontline Financial broker contacts you to discuss your options."],
];

const POINTS = [
  "Enquiry only. It won’t affect your credit score",
  "Not a full application. A broker handles the rest",
  "Home, refinance, investment, construction, SMSF, commercial, car, ute/van/truck, fleet, equipment, business and personal loans",
];

const FAQ = [
  { q: "Will this affect my credit score?", a: "No. It is an enquiry only." },
  { q: "Is this a full loan application?", a: "No. You tell us what you’re after and a broker handles the rest with you." },
  {
    q: "What kinds of loans can I ask about?",
    a: "Home, refinance, investment, construction, SMSF, commercial, car, ute/van/truck, fleet, equipment, business and personal loans.",
  },
  { q: "Who will contact me?", a: "A Frontline Financial broker will reach out to discuss your options." },
];

const RELATED = ["company-registration", "accounts", "invoicing"].map(featureBySlug);

const CRUMBS = [
  { name: "TaxFlowAI", href: "/taxflow" },
  { name: "Features", href: "/taxflow/features" },
  { name: "Apply for a loan", href: URL },
];

const SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: CRUMBS.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `https://frontline.financial${c.href}`,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

const wrap = "mx-auto max-w-6xl px-5 md:px-8";
const SIZES = "(min-width:1024px) 40rem, 92vw";

/* Frontline's three-layer wave: aqua, teal, then the colour of the section below. */
function WaveLayers({ from, to }) {
  return (
    <div aria-hidden className="relative w-full overflow-hidden leading-none" style={{ background: from }}>
      <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="block h-16 w-full min-w-[1440px] md:h-24">
        <path d="M0 62C160 22 340 18 520 54C700 90 880 112 1060 78C1240 44 1340 34 1440 52V140H0Z" fill="#00FCB8" />
        <path d="M0 92C220 128 470 44 720 70C970 96 1200 132 1440 82V140H0Z" fill="#39B2B2" />
        <path d="M0 108C240 64 480 138 720 104C960 70 1200 74 1440 112V140H0Z" fill={to} />
      </svg>
    </div>
  );
}

function Buttons({ onDark = false }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <a
        href={TAXFLOW_REGISTER_URL}
        className="rounded-lg bg-[#00FCB8] px-7 py-3.5 text-[15px] font-bold text-[#1C5472] transition hover:bg-[#00E0A4]"
      >
        Get started
      </a>
      <Link
        href="/taxflow/features#loans"
        className={`rounded-lg border-2 px-7 py-3 text-[15px] font-bold transition ${
          onDark
            ? "border-white/70 text-white hover:border-[#00FCB8] hover:text-[#00FCB8]"
            : "border-[#1C5472] text-[#1C5472] hover:border-[#39B2B2] hover:text-[#39B2B2]"
        }`}
      >
        See all features
      </Link>
    </div>
  );
}

export default function LoansFeaturePage() {
  return (
    <div className="min-h-screen bg-[#F6F8F2] font-sans text-[#1C5472]">
      <LayoutNav activeNav="" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* ============ HERO ============ */}
      <section className={`${wrap} pb-12 pt-6 md:pb-16`}>
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-[12.5px] font-medium text-[#1C5472]/70">
            {CRUMBS.map((c, i) => (
              <li key={c.href} className="flex items-center gap-2">
                {i === CRUMBS.length - 1 ? (
                  <span aria-current="page" className="text-[#1C5472]">{c.name}</span>
                ) : (
                  <Link href={c.href} className="hover:text-[#39B2B2]">{c.name}</Link>
                )}
                {i < CRUMBS.length - 1 && <span aria-hidden>›</span>}
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="py-2">
              <FrontlineLogoFull className="h-11 w-auto min-w-[120px]" />
            </div>
            <h1 className="mt-6 text-[2.5rem] font-bold leading-[1.05] tracking-tight md:text-6xl">
              Need finance? <span className="text-[#39B2B2]">Start here.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#1C5472]/85">
              Start a loan enquiry from your TaxFlowAI portal. Choose what you’re after, tell us roughly how
              much and when, and a Frontline Financial broker will reach out to discuss your options.
            </p>
            <div className="mt-8">
              <Buttons />
            </div>
          </div>
          <div className="lg:col-span-7">
            <Image
              src={I.loanStart.src}
              alt={I.loanStart.alt}
              width={1536}
              height={1024}
              sizes={SIZES}
              unoptimized
              priority
              className="h-auto w-full rounded-2xl shadow-[0_30px_60px_-30px_rgba(28,84,114,0.45)]"
            />
          </div>
        </div>

        {/* mandatory disclosures, beside the CTA */}
        <div className="mt-10 rounded-2xl border border-[#1C5472]/15 bg-white p-5 md:p-6">
          <CreditDisclosures light />
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <WaveLayers from="#F6F8F2" to="#1C5472" />
      <section className="bg-[#1C5472] text-white">
        <div className={`${wrap} py-12 md:py-16`}>
          <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-[#00FCB8]">How it works</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Three steps.</h2>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {STEPS.map(([title, body], i) => (
              <li key={title} className="rounded-2xl border border-white/15 bg-white/5 p-6">
                <span className="text-5xl font-bold text-[#00FCB8]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-[19px] font-bold">{title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-white/80">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <WaveLayers from="#1C5472" to="#F6F8F2" />

      {/* ============ DETAIL ============ */}
      <section className={`${wrap} py-12 md:py-16`}>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Image
            src={I.loanChoose.src}
            alt={I.loanChoose.alt}
            width={1536}
            height={1024}
            sizes={SIZES}
            unoptimized
            className="h-auto w-full rounded-2xl shadow-[0_30px_60px_-30px_rgba(28,84,114,0.45)]"
          />
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Pick the finance you need.</h2>
            <ul className="mt-6 space-y-3">
              {POINTS.map((p) => (
                <li key={p} className="flex gap-3 text-[15.5px] leading-relaxed text-[#1C5472]/90">
                  <svg className="mt-1.5 h-3.5 w-3.5 shrink-0" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M1.5 6.5l3 3 6-7" stroke="#39B2B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
          <div className="lg:order-2">
            <Image
              src={I.loanBroker.src}
              alt={I.loanBroker.alt}
              width={1536}
              height={1024}
              sizes={SIZES}
              unoptimized
              className="h-auto w-full rounded-2xl shadow-[0_30px_60px_-30px_rgba(28,84,114,0.45)]"
            />
          </div>
          <div className="lg:order-1">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Then a real broker takes it from there.</h2>
            <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-[#1C5472]/90">
              Your enquiry goes to Frontline Financial. A broker reaches out to talk through what you’re after
              and what the next steps look like.
            </p>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="border-t border-[#1C5472]/10 bg-white">
        <div className={`${wrap} py-12 md:py-16`}>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Good to know.</h2>
          <div className="mt-8 max-w-3xl space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="rounded-xl border border-[#1C5472]/15 bg-[#F6F8F2] px-5 py-4">
                <summary className="cursor-pointer text-[16px] font-bold">{f.q}</summary>
                <p className="mt-3 text-[15px] leading-relaxed text-[#1C5472]/85">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ RELATED ============ */}
      <section className={`${wrap} py-12 md:py-16`}>
        <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-[#39B2B2]">Related features</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {RELATED.map((r) => (
            <Link
              key={r.slug}
              href={`/taxflow/features/${r.slug}`}
              className="block rounded-2xl border border-[#1C5472]/15 bg-white p-6 transition hover:border-[#39B2B2] hover:shadow-lg"
            >
              <h3 className="text-[18px] font-bold">{r.name}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-[#1C5472]/80">{r.card}</p>
              <span className="mt-4 inline-block text-[13px] font-bold text-[#39B2B2]">Learn more →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <WaveLayers from="#F6F8F2" to="#1C5472" />
      <section className="bg-[#1C5472] text-white">
        <div className={`${wrap} pb-14 pt-6 md:pb-20`}>
          <h2 className="max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">Need finance? Start here.</h2>
          <p className="mt-5 max-w-xl text-lg text-white/85">
            Sign in to your portal, open Apply for a loan, and a Frontline Financial broker will be in touch.
          </p>
          <div className="mt-8">
            <Buttons onDark />
          </div>
          <div className="mt-10 max-w-4xl border-t border-white/15 pt-6 text-white/80 [&_a]:!text-white [&_p]:!text-white/80 [&_span]:!text-white">
            <CreditDisclosures light />
          </div>
        </div>
      </section>

      <LayoutFooter />
    </div>
  );
}
