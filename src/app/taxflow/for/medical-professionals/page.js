import TaxFlowHeader from "@/components/taxflow/TaxFlowHeader";
import TaxFlowAppFooter from "@/components/taxflow/TaxFlowAppFooter";
import RevealInit from "@/components/taxflow/RevealInit";
import CalendlyButton from "@/components/taxflow/CalendlyButton";
import MedicalBlocks from "@/components/taxflow/MedicalBlocks";
import FrontlineLmiSection from "@/components/taxflow/FrontlineLmiSection";
import DirectorSection from "@/components/taxflow/DirectorSection";
import OfficesSection from "@/components/taxflow/OfficesSection";
import ServicesCarousel from "@/components/taxflow/ServicesCarousel";
import GoogleReviewsCarousel from "@/components/taxflow/GoogleReviewsCarousel";
import TaxFlowWave from "@/components/taxflow/TaxFlowWave";
import FloTalkCta from "@/components/taxflow/FloTalkCta";
import {
  container,
  Breadcrumbs,
  TAXFLOW_SIGNIN_URL,
} from "@/components/taxflow/TaxFlowShared";

/* DRAFT — landing page for medical professionals. Not yet linked from the
   nav, footer or sitemap, and set to noindex until the copy is approved.
   TODO(owner): remove `robots` below and add the page to the footer "Who it's
   for" column, the tax-preparation persona list and sitemap.js at launch. */

export const metadata = {
  title: "Tax for medical professionals",
  description:
    "Tax returns for doctors, nurses, dentists and allied health professionals. Registration, indemnity, CPD and multiple hospital income sorted year-round, prepared and lodged by a Registered Tax Agent.",
  alternates: { canonical: "/taxflow/for/medical-professionals" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Tax for medical professionals — TaxFlowAI",
    description:
      "Registration, indemnity, CPD and multiple hospital income sorted year-round. Prepared and lodged by a Registered Tax Agent.",
    url: "/taxflow/for/medical-professionals",
  },
};

/* hero — photo fills the right half and fades into navy; on mobile it sits
   on top and fades down into the copy */
function MedicalHero() {
  const trust = [
    "Registered Tax Agent 26313222",
    "Quote approved before any work starts",
    "Parramatta & Sydney CBD",
  ];
  return (
    <section className="relative overflow-hidden" style={{ background: "#0A1628" }}>
      {/* photo */}
      <div className="relative h-64 w-full sm:h-80 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[58%] lg:[mask-image:linear-gradient(to_right,transparent_0%,black_38%)] lg:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_38%)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/taxflow/medical-hero.webp"
          alt="A surgical team in an operating theatre, with Flo the TaxFlowAI assistant in scrubs giving a thumbs-up"
          className="h-full w-full object-cover object-[62%_center]"
          width={1536}
          height={1024}
          fetchPriority="high"
        />
        {/* fades: down into the copy on mobile, left into the copy on desktop */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{ background: "linear-gradient(to bottom, rgba(10,22,40,0.15) 0%, rgba(10,22,40,0.35) 55%, #0A1628 100%)" }}
          aria-hidden
        />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{ background: "linear-gradient(to right, rgba(10,22,40,0.7) 0%, rgba(10,22,40,0.35) 45%, rgba(10,22,40,0.2) 100%)" }}
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 hidden h-32 lg:block"
          style={{ background: "linear-gradient(to top, #0A1628, transparent)" }}
          aria-hidden
        />
      </div>

      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full opacity-[0.12] blur-[120px]" style={{ background: "#00FCB8" }} aria-hidden />

      <div className="relative">
        <div className="hidden lg:block">
          <Breadcrumbs items={[{ name: "For medical professionals", href: "/taxflow/for/medical-professionals" }]} />
        </div>
        <div className={`${container} -mt-16 pb-16 sm:-mt-20 lg:mt-0 lg:flex lg:min-h-[560px] lg:items-center lg:pb-20 lg:pt-10`}>
          <div className="max-w-xl">
            <span
              className="tc-mono inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] backdrop-blur-sm"
              style={{ borderColor: "rgba(0,252,184,0.35)", background: "rgba(10,22,40,0.6)", color: "#00FCB8" }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#00FCB8", boxShadow: "0 0 8px #00FCB8" }} aria-hidden />
              For doctors, nurses &amp; allied health
            </span>
            <h1 className="tc-display mt-6 text-[2.6rem] leading-[1.05] text-white md:text-6xl">
              You look after everyone else.{" "}
              <span className="bg-gradient-to-r from-[#00FCB8] to-[#39B2B2] bg-clip-text text-transparent">
                We&apos;ll look after your tax.
              </span>
            </h1>
            <p className="mt-6 text-[16px] leading-relaxed md:text-[17px]" style={{ color: "#B7C4CF" }}>
              Registrar on rotation, GP contracting to a practice, or specialist
              running your own rooms. TaxFlowAI keeps your records organised all
              year, and a Registered Tax Agent prepares and lodges your return.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={TAXFLOW_SIGNIN_URL} className="tc-btn-primary rounded-lg px-7 py-3.5 text-[15px] font-bold">
                Get started free
              </a>
              <CalendlyButton className="tc-btn-ghost rounded-lg px-7 py-3.5 text-[15px] font-semibold">
                Talk to a human
              </CalendlyButton>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {trust.map((t) => (
                <li key={t} className="flex items-center gap-2 text-[13px]" style={{ color: "#94A3B8" }}>
                  <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M1.5 6.5l3 3 6-7" stroke="#00FCB8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MedicalProfessionalsPage() {
  return (
    <div className="tc-page min-h-screen">
      <RevealInit />
      <TaxFlowHeader />
      <MedicalHero />

      <MedicalBlocks />

      {/* Google reviews, as on the TaxFlowAI home page */}
      <TaxFlowWave from="#0A1628" to="#0E2238" />
      <GoogleReviewsCarousel edge="#0E2238" />

      {/* Frontline Financial home loans — waves from the reviews band into
          cream and back out to navy for the services section */}
      <FrontlineLmiSection from="#0E2238" to="#0A1628" />

      {/* services carousel, as on the TaxFlowAI home page */}
      <section id="services" style={{ background: "#0A1628", scrollMarginTop: "110px" }}>
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

      {/* same "Meet the director" and office locations as /taxflow/about */}
      <DirectorSection from="#0A1628" to="#0A1628" />
      <OfficesSection background="#0A1628" />

      <FloTalkCta note="General information only. It doesn't take your personal circumstances into account. Whether an expense is deductible depends on your situation; your Registered Tax Agent will advise on your return." />
      <TaxFlowAppFooter />
    </div>
  );
}
