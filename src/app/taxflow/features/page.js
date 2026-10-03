import Link from "next/link";
import TaxFlowHeader from "@/components/taxflow/TaxFlowHeader";
import TaxFlowAppFooter from "@/components/taxflow/TaxFlowAppFooter";
import RevealInit from "@/components/taxflow/RevealInit";
import TaxFlowWave from "@/components/taxflow/TaxFlowWave";
import TaxFlowWaveLayers from "@/components/taxflow/TaxFlowWaveLayers";
import {
  ProductScreen,
  ScannerCard,
  FloExchange,
  LogbookMeter,
  DeductionRail,
  VaultPanel,
  BookingPanel,
  LodgementList,
  PropertyPanel,
} from "@/components/taxflow/TaxFlowMockups";
import { container, CtaBand } from "@/components/taxflow/TaxFlowShared";
import { ServiceHero, StatBand, Check, NAVY, DEEP } from "@/components/taxflow/ServiceLanding";

export const metadata = {
  title: "TaxFlowAI platform",
  description:
    "AI receipt scanning, guided ATO deduction pages (D1–D9), a private document vault, live accountant booking, vehicle logbook and lodgement tracking. Everything in the TaxFlowAI portal.",
  alternates: { canonical: "/taxflow/features" },
  openGraph: {
    title: "The TaxFlowAI platform",
    description:
      "Flo sorts your receipts, your documents live in a private vault, and every deadline for every entity sits on one dashboard.",
    url: "/taxflow/features",
  },
};

/* Four chapters, in the order a client actually uses the portal. Each feature
   is a claim the product makes today; keep new copy inside these facts. */
const CHAPTERS = [
  {
    id: "capture",
    title: "Capture",
    line: "Snap it. Flo files it.",
    lead: "Receipts stop living in shoeboxes and camera rolls. Upload once and each one lands in the right ATO category.",
    features: [
      {
        id: "scanner",
        title: "AI receipt scanner",
        body: "Drag and drop a JPG, PNG, PDF or HEIC anywhere in the portal. Flo reads it, files it, and shows its reasoning so nothing is a black box.",
        points: ["Bulk upload supported", "Every result carries a confidence level", "Reviewed by your tax agent before lodgement"],
        panel: <ScannerCard />,
      },
      {
        id: "deductions",
        title: "Guided deduction pages, D1 to D9",
        body: "One guided page per deduction type, written in plain English, with its own upload so receipts land in the right place first time.",
        points: ["Car, travel, uniforms, self-education", "Working-from-home hour tracker", "Flags the common traps before you claim"],
        panel: <DeductionRail />,
      },
    ],
  },
  {
    id: "organise",
    title: "Organise",
    line: "Everything in its place.",
    lead: "One login for every entity you run, and one private home for every document behind them.",
    features: [
      {
        id: "dashboard",
        title: "One dashboard, every entity",
        body: "Personal, sole trader, company, trust and partnership accounts side by side, with lodgement counts and overdue warnings at a glance.",
        points: ["Switch entities without switching systems", "One-tap actions on what needs you"],
        panel: <ProductScreen />,
      },
      {
        id: "vault",
        title: "Document vault",
        body: "Every client gets a private, password-protected folder. Receipts, statements and signed documents, organised and ready when you or your agent need them.",
        points: ["Your records stay yours", "Signed documents filed automatically"],
        panel: <VaultPanel />,
      },
    ],
  },
  {
    id: "track",
    title: "Track",
    line: "Nothing sneaks up on you.",
    lead: "Deadlines, logbooks and properties tracked through the year, so tax time is a review and not a scramble.",
    features: [
      {
        id: "lodgements",
        title: "Lodgement tracking",
        body: "Status, financial year, due date and accountant notes for every lodgement on every entity. Lodged, due soon, on track.",
        points: ["Live status the whole way", "Notes from your accountant in context"],
        panel: <LodgementList />,
      },
      {
        id: "logbook",
        title: "Vehicle logbook",
        body: "Register vehicles, log trips one at a time or in bulk, and see your business-use percentage build. Export CSV or PDF for substantiation.",
        points: ["The 12-week logbook period tracked for you", "ATO-compliant records"],
        panel: (
          <div className="tc-card p-5">
            <LogbookMeter />
          </div>
        ),
      },
      {
        id: "properties",
        title: "Investment properties",
        body: "Keep every rental property in one list: purchase date, date first rented and notes. Your rental schedule is already organised at tax time.",
        points: ["Add, edit and remove from the dashboard"],
        panel: <PropertyPanel />,
      },
    ],
  },
  {
    id: "help",
    title: "Get help",
    line: "A human when you need one.",
    lead: "Flo answers the everyday questions on every page. Your accountant is two clicks away for everything else.",
    features: [
      {
        id: "flo",
        title: "Flo, your AI assistant",
        body: "Ask what you can claim, why a receipt was categorised the way it was, or what to do next. Flo organises. Your registered tax agent reviews and signs off.",
        points: ["On every page of the portal", "Guided help for first-time users"],
        panel: <FloExchange />,
      },
      {
        id: "booking",
        title: "Book your accountant in two clicks",
        body: "See live availability inside the portal and pick a Teams or phone call, or an in-person appointment at Parramatta or Clarence Street, Sydney.",
        points: ["Lands straight in your accountant's calendar", "No phone tag, no email chains"],
        panel: <BookingPanel />,
      },
    ],
  },
];

const STATS = [
  { value: "D1–D9", label: "guided deduction pages, one for each ATO category" },
  { value: "5", label: "entity types on one dashboard: personal, sole trader, company, trust, partnership" },
  { value: "12 wks", label: "of logbook tracked for you, start to finish" },
  { value: "2", label: "factors on every login: password plus a one-time code" },
];

export default function FeaturesPage() {
  return (
    <div className="tc-page min-h-screen">
      <RevealInit />
      <TaxFlowHeader />

      <ServiceHero
        crumb={{ name: "Platform", href: "/taxflow/features" }}
        eyebrow="The software"
        title="Your tax,"
        accent="under control."
        lead="Flo sorts your receipts into ATO categories, your documents live in a private vault, and every deadline for every entity sits on one dashboard."
        image="/images/taxflow/service-platform.webp"
        imageAlt="Flo scanning a pile of receipts and filing them into glowing D1, D2, D5 and D9 folders"
        tag="FLO · SORTING RECEIPTS"
      />

      {/* chapter rail */}
      <TaxFlowWaveLayers from={NAVY} to={DEEP} />
      <section style={{ background: DEEP }}>
        <div className={`${container} pb-12 pt-2 md:pb-16`}>
          <ol className="tc-lp-rail">
            {CHAPTERS.map((c, i) => (
              <li key={c.id}>
                <a href={`#${c.id}`}>
                  <span className="tc-mono tc-lp-rail-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="tc-lp-rail-title">{c.title}</span>
                  <span className="tc-lp-rail-sub">{c.line}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* chapters */}
      {CHAPTERS.map((c, i) => {
        const bg = i % 2 ? DEEP : NAVY;
        const prev = i === 0 ? DEEP : i % 2 ? NAVY : DEEP;
        return (
          <div key={c.id}>
            <TaxFlowWave from={prev} to={bg} />
            <section id={c.id} style={{ background: bg, scrollMarginTop: "110px" }}>
              <div className={`${container} tc-lp-chapter py-12 md:py-20`}>
                <div className="tc-lp-chapter-head tc-reveal">
                  <p className="tc-lp-chapter-num" aria-hidden>{String(i + 1).padStart(2, "0")}</p>
                  <p className="tc-eyebrow mt-5" style={{ color: "#00FCB8" }}>{c.title}</p>
                  <h2 className="tc-display mt-3 text-4xl text-white md:text-[2.8rem]">{c.line}</h2>
                  <p className="mt-4 max-w-sm text-[15px] leading-relaxed" style={{ color: "#94A3B8" }}>
                    {c.lead}
                  </p>
                </div>
                <div>
                  {c.features.map((f) => (
                    <article key={f.id} id={f.id} className="tc-lp-feature tc-reveal" style={{ scrollMarginTop: "120px" }}>
                      <div>
                        <h3 className="tc-display text-[1.5rem] text-white">{f.title}</h3>
                        <p className="mt-3 text-[14.5px] leading-relaxed" style={{ color: "#94A3B8" }}>
                          {f.body}
                        </p>
                        <ul className="tc-lp-feature-points">
                          {f.points.map((p) => (
                            <li key={p}>
                              <Check />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="min-w-0">{f.panel}</div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </div>
        );
      })}

      <StatBand stats={STATS} from={DEEP} to={NAVY} />

      {/* what sits behind the software */}
      <section style={{ background: NAVY }}>
        <div className={`${container} grid gap-4 py-14 md:grid-cols-3 md:py-20`}>
          <Link href="/taxflow/tax-preparation" className="tc-bento tc-reveal block">
            <span className="tc-lp-code tc-mono">REGISTERED TAX AGENT 26313222</span>
            <h3 className="tc-bento-title mt-4">The tax is done by people.</h3>
            <p className="tc-bento-body">
              Returns are prepared and lodged by TAX7 T04, a registered tax agent. See tax preparation services.
            </p>
          </Link>
          <Link href="/taxflow/corporate-secretarial" className="tc-bento tc-reveal block">
            <span className="tc-lp-code tc-mono">ASIC AGENT 51843</span>
            <h3 className="tc-bento-title mt-4">Company paperwork too.</h3>
            <p className="tc-bento-body">
              Annual reviews and company changes lodged with ASIC and filed in the same vault. See ASIC services.
            </p>
          </Link>
          <Link href="/taxflow/security" className="tc-bento tc-bento-accent tc-reveal block">
            <span className="tc-lp-code tc-mono">ISO 27001-ALIGNED</span>
            <h3 className="tc-bento-title mt-4">Secured the Australian way.</h3>
            <p className="tc-bento-body">
              Australian-hosted platform, encryption, and two-factor on every login. See data security.
            </p>
          </Link>
        </div>
      </section>

      <CtaBand />
      <TaxFlowAppFooter />
    </div>
  );
}
