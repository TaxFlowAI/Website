import Link from "next/link";
import Image from "next/image";
import TaxFlowHeader from "@/components/taxflow/TaxFlowHeader";
import TaxFlowAppFooter from "@/components/taxflow/TaxFlowAppFooter";
import RevealInit from "@/components/taxflow/RevealInit";
import TaxFlowWave from "@/components/taxflow/TaxFlowWave";
import CalendlyButton from "@/components/taxflow/CalendlyButton";
import DirectorSection, { DIRECTOR } from "@/components/taxflow/DirectorSection";
import OfficesSection from "@/components/taxflow/OfficesSection";
import { Tick } from "@/components/taxflow/TaxFlowMockups";
import { container, CtaBand, Breadcrumbs } from "@/components/taxflow/TaxFlowShared";

export const metadata = {
  title: "About us",
  description:
    "TaxFlowAI is Australia's AI-powered tax portal. Tax services by TAX7 T04 PTY LTD, Registered Tax Agent 26313222, on a platform owned and developed by Frontline Holdings Group. Meet the director and visit us in Sydney or Parramatta.",
  alternates: { canonical: "/taxflow/about" },
  openGraph: {
    title: "About TaxFlowAI",
    description:
      "Australia's AI-powered tax portal. The platform, the people and the group behind it, with offices in Sydney and Parramatta.",
    url: "/taxflow/about",
  },
};

const NAVY = "#0A1628";
const DEEP = "#060D1A";
const BAND = "#0E2238";

/* speed and commitment: each point is something the site already promises */
const PACE = [
  "Every deadline tracked, for every entity",
  "Status you can see at every stage, start to finish",
  "A clear quote first, so work starts without back-and-forth",
];

/* the three frustrations the portal was built to remove */
const FIXES = [
  {
    pain: "Lost receipts",
    fix: "Every receipt filed as it lands",
    body: "Snap it or upload it. Flo sorts it into the right ATO category and shows its reasoning.",
  },
  {
    pain: "“Where’s my return?”",
    fix: "Status you can see",
    body: "Next steps and every deadline for every entity, visible at a glance.",
  },
  {
    pain: "Phone tag with your accountant",
    fix: "One place to talk",
    body: "Upload, message and book a time in the portal. A person reads it.",
  },
];

const PARTS = [
  {
    label: "The platform",
    title: "TaxFlowAI",
    body: "The technology. Flo sorts receipts, your documents live in a private vault, and every deadline is tracked in one dashboard.",
    image: "/images/taxflow/service-platform.webp",
    href: "/taxflow/features",
    cta: "Explore the platform",
  },
  {
    label: "The tax",
    title: "Registered Tax Agent",
    body: "Your return is prepared and lodged by TAX7 T04, Registered Tax Agent 26313222, a firm you can look up on the public register.",
    image: "/images/taxflow/service-tax.webp",
    href: "/taxflow/tax-preparation",
    cta: "See tax services",
  },
  {
    label: "The company",
    title: "Registered ASIC agent",
    body: "Annual reviews, officeholder and share changes, address updates and deregistrations, prepared for signature and lodged with ASIC.",
    image: "/images/taxflow/service-asic.webp",
    href: "/taxflow/corporate-secretarial",
    cta: "See ASIC services",
  },
  {
    label: "The group",
    title: "Frontline Financial Group",
    body: "The TaxFlowAI platform is owned and developed by Frontline Holdings Group, the team behind Frontline Financial Brokers and Asset Solutions.",
    image: "/images/taxflow/service-frontline.webp",
    href: "/",
    cta: "Visit Frontline Financial",
  },
];

const VALUES = [
  {
    title: "Plain English, always",
    body: "ATO rules explained the way you’d explain them to a mate. No jargon and no black boxes.",
  },
  {
    title: "You approve the price first",
    body: "Signing up is free. A Registered Tax Agent quotes the work, and nothing proceeds until you accept.",
  },
  {
    title: "Always know what’s happening",
    body: "Status, next steps and deadlines are visible at a glance. No more guessing what to send.",
  },
  {
    title: "Your data stays yours",
    body: "No lock-in. Your documents and data are always yours to take with you.",
  },
];

export default function AboutPage() {
  return (
    <div className="tc-page min-h-screen">
      <RevealInit />
      <TaxFlowHeader />

      {/* ============ HERO ============ */}
      <section className="tc-hero-flo relative overflow-hidden">
        <Breadcrumbs items={[{ name: "About us", href: "/taxflow/about" }]} />
        <div className={`${container} grid items-center gap-10 pb-14 pt-8 md:pb-20 md:pt-12 lg:grid-cols-12 lg:gap-10`}>
          <div className="lg:col-span-6">
            <p className="tc-eyebrow" style={{ color: "#00FCB8" }}>About us</p>
            <h1 className="tc-display mt-5 text-[2.7rem] text-white md:text-6xl lg:text-[4.2rem]">
              Tax made simple.{" "}
              <span className="tc-hero-accent">For every Australian.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: "#B7C4CF" }}>
              We spent long enough inside finance and tax to know what wasn&apos;t working
              for clients. So we built the portal we wished they had, and put real
              people behind it.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#visit" className="tc-btn-primary rounded-lg px-6 py-3 text-[15px] font-bold">
                Come and visit
              </a>
              <CalendlyButton className="tc-btn-ghost rounded-lg px-6 py-3 text-[15px] font-semibold">
                Talk to a human
              </CalendlyButton>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="tc-about-card relative">
              <Image
                src="/images/taxflow/about-team.webp"
                alt="The Frontline Financial Group team at a boardroom table in Parramatta, with Flo sitting on the table beside them"
                width={1672}
                height={940}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="block h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ MEET THE DIRECTOR ============ */}
      <DirectorSection from={NAVY} to={NAVY} />

      {/* ============ SPEED AND COMMITMENT ============ */}
      <section id="pace" style={{ background: NAVY, scrollMarginTop: "110px" }}>
        <div className={`${container} grid items-center gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-12`}>
          <div className="tc-reveal lg:col-span-7">
            <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>Speed and commitment</p>
            <h2 className="tc-display mt-4 text-4xl text-white md:text-5xl lg:text-[3.4rem]">
              Built for pace.{" "}
              <span className="tc-hero-accent">Committed to the finish.</span>
            </h2>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed" style={{ color: "#B7C4CF" }}>
              Tax is an endurance event with hard deadlines. We treat it like one:
              steady preparation, no shortcuts, and a strong finish. The goal is
              simple. Be the most efficient tax firm in the country.
            </p>
            <ul className="mt-7 space-y-3 text-[15px]">
              {PACE.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-white/90">
                  <Tick />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/taxflow/how-it-works" className="tc-link text-[15px] font-semibold">
                See how it works
              </Link>
            </div>
          </div>

          {/* the image file is shown as supplied; the frame only chooses
              which part of it is visible */}
          <figure className="tc-reveal tc-director-inset lg:col-span-5">
            <div className="tc-director-inset-img">
              <Image
                src="/images/taxflow/director-racing-flo.webp"
                alt={`${DIRECTOR.name} mid-race on a lakeside path, with Flo sprinting alongside`}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                style={{ objectPosition: "50% 56%" }}
              />
            </div>
            <figcaption>
              <span className="tc-mono">OFF THE CLOCK</span>
              Racing Flo.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ============ WHY WE BUILT IT ============ */}
      <TaxFlowWave from={NAVY} to={DEEP} />
      <section id="why" style={{ background: DEEP }}>
        <div className={`${container} grid gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-8`}>
          <div className="tc-reveal lg:col-span-4">
            <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>Why we built it</p>
            <h2 className="tc-display mt-4 text-4xl text-white md:text-5xl">
              Three things that drove clients mad.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed" style={{ color: "#94A3B8" }}>
              Each one now has a fix built into the portal.
            </p>
          </div>
          <ol className="tc-reveal lg:col-span-8">
            {FIXES.map((f, i) => (
              <li key={f.pain} className="tc-fix">
                <span className="tc-fix-num tc-mono">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="tc-fix-pain">{f.pain}</p>
                  <p className="tc-fix-title">{f.fix}</p>
                  <p className="mt-1.5 max-w-lg text-[14.5px] leading-relaxed" style={{ color: "#94A3B8" }}>
                    {f.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <TaxFlowWave from={DEEP} to={NAVY} />

      {/* ============ FOUR PARTS, ONE PORTAL ============ */}
      <section id="what-we-are" style={{ background: NAVY }}>
        <div className={`${container} py-14 md:py-20`}>
          <div className="tc-reveal max-w-2xl">
            <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>What we are</p>
            <h2 className="tc-display mt-4 text-4xl text-white md:text-5xl">Four parts, one portal</h2>
            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "#94A3B8" }}>
              Software to keep you organised, registered professionals for your tax and
              your company, and an established group behind them.
            </p>
          </div>
          <div className="tc-reveal tc-eq is-four mt-10">
            {PARTS.map((p, i) => (
              <div key={p.title} className="contents">
                <Link href={p.href} className="tc-svc-card tc-eq-card flex flex-col overflow-hidden">
                  <div className="tc-svc-band relative aspect-video w-full overflow-hidden">
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="tc-svc-img object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="tc-eyebrow" style={{ color: "#00FCB8" }}>{p.label}</p>
                    <h3 className="mt-2 text-[18px] font-bold leading-snug text-white">{p.title}</h3>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed" style={{ color: "#94A3B8" }}>{p.body}</p>
                    <span className="tc-mono mt-auto pt-5 text-[11px] font-medium tracking-[0.12em]" style={{ color: "#00FCB8" }}>
                      {p.cta.toUpperCase()} →
                    </span>
                  </div>
                </Link>
                {i < PARTS.length - 1 && (
                  <span className="tc-eq-plus" aria-hidden>
                    +
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VALUES ============ */}
      <TaxFlowWave from={NAVY} to={BAND} />
      <section id="how-we-work" style={{ background: `linear-gradient(180deg, ${BAND} 0%, #16334B 50%, ${BAND} 100%)` }}>
        <div className={`${container} py-14 md:py-20`}>
          <div className="tc-reveal max-w-2xl">
            <p className="tc-eyebrow" style={{ color: "#00FCB8" }}>How we work</p>
            <h2 className="tc-display mt-4 text-4xl text-white md:text-5xl">Built differently. On purpose.</h2>
          </div>
          <div className="tc-reveal mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <div key={v.title} className="tc-value">
                <span className="tc-display tc-hero-accent text-5xl">{i + 1}</span>
                <h3 className="mt-4 text-[18px] font-bold text-white">{v.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed" style={{ color: "#B7C4CF" }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <TaxFlowWave from={BAND} to={NAVY} />

      {/* ============ VISIT US ============ */}
      <OfficesSection background={NAVY} />

      {/* ============ WHO'S WHO ============ */}
      <TaxFlowWave from={NAVY} to={DEEP} />
      <section id="who-is-who" style={{ background: DEEP }}>
        <div className={`${container} pb-14 pt-4 md:pb-20`}>
          <div className="tc-reveal max-w-3xl text-[14px] leading-relaxed" style={{ color: "#94A3B8" }}>
            <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>Who&apos;s who, legally</p>
            <p className="mt-4">
              <strong className="text-white">Tax services:</strong> TAX7 T04 PTY LTD trading as TaxFlowAI
              (ABN 73 680 225 512), Registered Tax Agent 26313222. This is the firm that prepares and lodges
              your tax work.
            </p>
            <p className="mt-3">
              <strong className="text-white">Platform owner &amp; ASIC agent:</strong> Frontline Holdings Group
              Pty Ltd (ABN 59 671 861 475), ASIC Agent 51843. This is the company that owns and develops the
              TaxFlowAI platform and provides the corporate secretarial services.
            </p>
            <p className="mt-3">
              Check any tax agent&apos;s registration on the{" "}
              <a href="https://tpb.gov.au/registrations_search" target="_blank" rel="noopener noreferrer" className="tc-link">
                Tax Practitioners Board register
              </a>
              . See also our{" "}
              <Link href="/taxflow/privacy-policy" className="tc-link">Privacy Policy</Link>,{" "}
              <Link href="/taxflow/collection-notice" className="tc-link">Collection Notice</Link> and{" "}
              <Link href="/taxflow/terms" className="tc-link">Terms of Service</Link>.
            </p>
          </div>
        </div>
      </section>

      <TaxFlowWave from={DEEP} to={NAVY} />
      <CtaBand />
      <TaxFlowAppFooter />
    </div>
  );
}
