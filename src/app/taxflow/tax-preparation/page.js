import Link from "next/link";
import { redirect } from "next/navigation";
import TaxFlowHeader from "@/components/taxflow/TaxFlowHeader";
import TaxFlowAppFooter from "@/components/taxflow/TaxFlowAppFooter";
import RevealInit from "@/components/taxflow/RevealInit";
import TaxFlowWave from "@/components/taxflow/TaxFlowWave";
import TaxFlowWaveLayers from "@/components/taxflow/TaxFlowWaveLayers";
import GoogleReviewsCarousel from "@/components/taxflow/GoogleReviewsCarousel";
import { ProductScreen, ScannerCard, LodgementList } from "@/components/taxflow/TaxFlowMockups";
import { QuotePanel } from "@/components/taxflow/ServiceMockups";
import { container, CtaBand, FaqList, SwitchingModule } from "@/components/taxflow/TaxFlowShared";
import {
  ServiceHero,
  CredentialPlate,
  LandingHeading,
  StoryStations,
  NAVY,
  DEEP,
  BAND,
} from "@/components/taxflow/ServiceLanding";
import { faqSubset } from "@/data/taxflow-faq";
import { SHOW_TAX_SERVICES } from "@/data/taxflow-flags";

export const metadata = {
  title: "Tax Agent Parramatta & Sydney CBD",
  description:
    "Tax returns for individuals, sole traders, companies and trusts, plus BAS and CGT, lodged by Registered Tax Agent 26313222. Quote first, no subscription.",
  alternates: { canonical: "/taxflow/tax-preparation" },
  openGraph: {
    title: "Tax preparation services — TaxFlowAI",
    description:
      "Returns, activity statements and CGT prepared and lodged by a registered tax agent. You approve the price before any work starts.",
    url: "/taxflow/tax-preparation",
  },
};

const STRIP = ["Quote first", "No subscription", "Registered tax agent", "Every entity type"];

/* span is the tile width on the six-column bento; id is the anchor the
   header Services menu links to (servicesNav.js) */
const SERVICES = [
  {
    id: "individual",
    code: "INDIVIDUAL",
    span: "md:col-span-3",
    title: "Individual tax returns",
    body: "Salary and wages, work-related deductions, investments and everything the ATO asks about you.",
    tags: ["D1 to D9 deductions", "Working from home", "Dividends and interest", "Private health and Medicare"],
  },
  {
    id: "sole-trader",
    code: "SOLE TRADER",
    span: "md:col-span-3",
    title: "Sole trader returns",
    body: "Your business schedule built from records Flo has already sorted, with the tricky parts checked by a person.",
    tags: ["Income and expense review", "Vehicle logbook claims", "PSI checks", "Asset write-offs"],
  },
  {
    id: "entity-returns",
    code: "COMPANY · TRUST · PARTNERSHIP",
    span: "md:col-span-2",
    title: "Entity returns",
    body: "Annual returns with financial statements, tax reconciliations, distributions and Division 7A director-loan review.",
  },
  {
    id: "activity-statements",
    code: "BAS · IAS",
    span: "md:col-span-2",
    title: "Activity statements",
    body: "Monthly or quarterly GST, PAYG withholding and PAYG instalments, prepared from your books and lodged on time.",
  },
  {
    id: "cgt",
    code: "CGT",
    span: "md:col-span-2",
    title: "Capital gains tax",
    body: "Shares, crypto and property. Cost base, discounts and exemptions worked out and documented.",
  },
  {
    id: "rental",
    code: "RENTAL",
    span: "md:col-span-2",
    title: "Investment property schedules",
    body: "Rental income, deductible expenses, depreciation and interest apportionment for every property you own.",
  },
  {
    id: "catch-up",
    code: "CATCH-UP",
    span: "md:col-span-2",
    title: "Prior-year and overdue returns",
    body: "Behind on lodgements? Your agent brings every entity up to date and deals with the ATO on your behalf.",
  },
  {
    id: "advice",
    code: "ADVICE",
    span: "md:col-span-2",
    title: "Tax planning and advice",
    body: "Plain-English answers before decisions are made: structure, timing, and what you can and cannot claim.",
  },
];

const STATIONS = [
  {
    label: "Register",
    title: "Set up your profile, free.",
    body: "A short guided profile with Flo. Every entity you run sits on one dashboard, and every sign-in is protected by two-factor authentication from day one.",
    visual: <ProductScreen />,
  },
  {
    label: "Quote",
    title: "See the price before anything starts.",
    body: "Talk to your accountant by Teams or phone, or in person at Parramatta or Clarence Street, Sydney. You get a quote for exactly what you need, and nothing proceeds until you accept it.",
    visual: <QuotePanel />,
  },
  {
    label: "Upload",
    title: "Hand over the paperwork. Flo sorts it.",
    body: "Receipts, statements and documents go into your uploads folder. Flo files them into ATO categories and flags anything that is missing.",
    visual: <ScannerCard />,
  },
  {
    label: "Lodge",
    title: "Review, sign, lodged.",
    body: "Your registered tax agent prepares the return. You review and sign electronically, and it is lodged with the ATO. You can see the status the whole way.",
    visual: <LodgementList />,
  },
];

const BEATS = [
  { n: "01", title: "We quote", body: "A clear price for the exact service you need. No packages, no padding." },
  { n: "02", title: "You approve", body: "Accept it or don't. There is no obligation and no surprise bill.", key: true },
  { n: "03", title: "We start", body: "Work begins only after you say yes. Fees are confirmed in your engagement letter." },
];

const PERSONAS = [
  { href: "/taxflow/for/sole-traders", title: "Sole traders", desc: "BAS and quarterly deadlines, business against personal expenses, vehicle logbook." },
  { href: "/taxflow/for/employees-and-wfh", title: "Employees and WFH", desc: "Working-from-home hour tracker, D5 claims, and the records the ATO expects." },
  { href: "/taxflow/for/property-investors", title: "Property investors", desc: "Rental schedules, deductible expenses, and record keeping that holds up." },
];

export default function TaxPreparationPage() {
  /* hidden while tax services are switched off (src/data/taxflow-flags.js) */
  if (!SHOW_TAX_SERVICES) redirect("/taxflow");

  return (
    <div className="tc-page min-h-screen">
      <RevealInit />
      <TaxFlowHeader />

      <ServiceHero
        crumb={{ name: "Tax preparation", href: "/taxflow/tax-preparation" }}
        eyebrow="Tax preparation services"
        title="Tax done properly."
        accent="Lodged by a registered agent."
        lead="Returns, activity statements and capital gains for individuals, sole traders, companies, trusts and partnerships. Flo keeps you organised. A registered tax agent does the tax."
        image="/images/taxflow/service-tax.webp"
        imageAlt="Flo as an accountant holding a ticked tax return, with the Tax Practitioners Board registered badge and agent number 26313222"
        plate={
          <CredentialPlate
            label="REGISTERED TAX AGENT"
            number="26313222"
            name="TAX7 T04 Pty Ltd"
            href="https://tpb.gov.au/registrations_search"
            linkText="Verify on the TPB register ↗"
          />
        }
      />

      {/* promise strip */}
      <TaxFlowWaveLayers from={NAVY} to={DEEP} />
      <section style={{ background: DEEP }}>
        <ul className={`${container} tc-sec-strip pb-10 pt-2 md:pb-14`}>
          {STRIP.map((t) => (
            <li key={t}>
              <span className="tc-sec-dot" aria-hidden />
              {t}
            </li>
          ))}
        </ul>
      </section>
      <TaxFlowWave from={DEEP} to={NAVY} />

      {/* what we prepare */}
      <section id="services" style={{ background: NAVY, scrollMarginTop: "110px" }}>
        <div className={`${container} py-14 md:py-20`}>
          <LandingHeading
            eyebrow="What we prepare"
            title="Every return, every entity."
            lead="Each service is quoted on its own, so you only pay for what you actually need."
          />
          <div className="tc-reveal mt-10 grid items-stretch gap-4 md:grid-cols-6">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                id={s.id}
                tabIndex={-1}
                className={`tc-bento ${s.span} ${s.tags ? "tc-bento-accent" : ""}`}
                style={{ scrollMarginTop: "130px" }}
              >
                <span className="tc-lp-code tc-mono">{s.code}</span>
                <h3 className="tc-bento-title mt-4">{s.title}</h3>
                <p className="tc-bento-body">{s.body}</p>
                {s.tags && (
                  <ul className="tc-lp-tags">
                    {s.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* the process, on the current */}
      <TaxFlowWave from={NAVY} to={DEEP} />
      <section id="how-it-works" style={{ background: DEEP, scrollMarginTop: "110px" }}>
        <div className={`${container} pb-10 pt-14 md:pb-16 md:pt-20`}>
          <LandingHeading
            eyebrow="The process"
            title="From sign-up to lodged."
            lead="Four steps. Flo handles the sorting. Your registered tax agent handles the tax."
          />
          <StoryStations stations={STATIONS} />
          <p className="tc-reveal mt-8">
            <Link href="/taxflow/how-it-works" className="tc-link text-[15px] font-semibold">
              See the full walkthrough
            </Link>
          </p>
        </div>
      </section>

      {/* fees */}
      <TaxFlowWave from={DEEP} to={BAND} />
      <section id="fees" style={{ background: `linear-gradient(180deg, ${BAND} 0%, #16334B 55%, ${BAND} 100%)`, scrollMarginTop: "110px" }}>
        <div className={`${container} py-14 md:py-20`}>
          <LandingHeading
            eyebrow="How fees work"
            accent="#00FCB8"
            title="You approve the price before any work starts."
            lead="No subscriptions. No upfront charges. Just a clear quote that you choose to accept, or not."
          />
          <ol className="tc-lp-beats tc-reveal mt-10">
            {BEATS.map((b) => (
              <li key={b.n} className={`tc-lp-beat ${b.key ? "is-key" : ""}`}>
                <span className="tc-display tc-hero-accent text-5xl">{b.n}</span>
                <h3 className="mt-4 text-[19px] font-bold text-white">{b.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed" style={{ color: "#B7C4CF" }}>{b.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* proof */}
      <GoogleReviewsCarousel edge={BAND} />
      <TaxFlowWave from={BAND} to={NAVY} />

      {/* who it's for */}
      <section id="who-its-for" style={{ background: NAVY, scrollMarginTop: "110px" }}>
        <div className={`${container} py-14 md:py-20`}>
          <LandingHeading eyebrow="Who it's for" title="Built for your situation." />
          <div className="tc-reveal mt-10 grid gap-4 md:grid-cols-3">
            {PERSONAS.map((p) => (
              <Link key={p.href} href={p.href} className="tc-bento block">
                <h3 className="tc-bento-title">{p.title}</h3>
                <p className="tc-bento-body">{p.desc}</p>
                <span className="tc-mono mt-4 inline-block text-[11px] tracking-[0.14em]" style={{ color: "#00FCB8" }}>
                  BUILT FOR YOU →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SwitchingModule />

      {/* faq */}
      <section id="faq" className="border-t" style={{ background: NAVY, borderColor: "rgba(255,255,255,0.08)", scrollMarginTop: "110px" }}>
        <div className={`${container} py-14 md:py-20`}>
          <LandingHeading eyebrow="Questions" title="Tax preparation FAQ" />
          <div className="tc-reveal mt-8 max-w-3xl">
            <FaqList items={faqSubset(["fees", "who-lodges", "what-is-rta", "free-signup", "entities"])} />
          </div>
          <p className="mt-6 text-[14px]" style={{ color: "#94A3B8" }}>
            <Link href="/taxflow/faq" className="tc-link">See all FAQs</Link>
          </p>
          <p className="tc-fineprint mt-10">
            Tax agent services are provided by TAX7 T04 Pty Ltd, trading as TaxFlowAI, Registered Tax
            Agent 26313222. The platform is owned and operated by Frontline Holdings Group Pty Ltd trading as TaxFlowAI by Frontline Financial. See our{" "}
            <Link href="/taxflow/terms" className="tc-link">Terms of Service</Link> and{" "}
            <Link href="/taxflow/privacy-policy" className="tc-link">Privacy Policy</Link>.
          </p>
        </div>
      </section>

      <CtaBand />
      <TaxFlowAppFooter />
    </div>
  );
}
