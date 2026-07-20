import TaxFlowHeader from "@/components/taxflow/TaxFlowHeader";
import TaxFlowAppFooter from "@/components/taxflow/TaxFlowAppFooter";
import RevealInit from "@/components/taxflow/RevealInit";
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
import { container, CtaBand, Breadcrumbs } from "@/components/taxflow/TaxFlowShared";

export const metadata = {
  title: "Features",
  description:
    "AI receipt scanning, guided ATO deduction pages (D1–D9), a secure document vault, live accountant booking, vehicle logbook and lodgement tracking — everything in the TaxFlowAI portal.",
  alternates: { canonical: "/taxflow/features" },
  openGraph: {
    title: "TaxFlowAI features",
    description:
      "AI receipt scanning, guided deduction pages, secure document vault, live accountant booking, vehicle logbook and lodgement tracking.",
    url: "/taxflow/features",
  },
};

/* one sub-section per feature, mockup alongside; alternating layout */
const FEATURES = [
  {
    id: "scanner",
    eyebrow: "Capture",
    title: "AI receipt scanner",
    body: [
      "Upload anywhere in the portal — drag-and-drop JPG, PNG, PDF or HEIC — and your receipt is auto-filed into the right ATO category. Flo shows its reasoning for every decision, so nothing is a black box.",
      "Bulk upload is supported, and every classification carries a confidence level your Registered Tax Agent can review before anything is lodged.",
    ],
    panel: <ScannerCard />,
  },
  {
    id: "deductions",
    eyebrow: "Capture",
    title: "Guided deduction pages (D1–D9)",
    body: [
      "A guided page for each deduction type: car logbook (D1), travel diary with per-trip records (D2), uniforms & laundry (D3), self-education (D4), a working-from-home hour tracker at the ATO fixed rate (D5), and gifts & donations (D9).",
      "Each page explains the ATO rules in plain English, flags common traps — home to work is private, even on night shift — and has its own upload so receipts land in the right category first time.",
    ],
    panel: <DeductionRail />,
  },
  {
    id: "vault",
    eyebrow: "Organise",
    title: "Document vault",
    body: [
      "Secure cloud document storage — every client gets a private, password-protected folder synced to professional-grade cloud storage (Dropbox). Receipts, statements and signed documents in one place.",
      "Because the folder is yours, your records stay yours — organised, backed up, and ready whenever you or your agent need them.",
    ],
    panel: <VaultPanel />,
  },
  {
    id: "dashboard",
    eyebrow: "Organise",
    title: "Dashboard",
    body: [
      "All accounts at a glance — Personal, Sole Trader, Company, Trust, Partnership — with lodgement counts, overdue warnings, and one-tap actions.",
      "Switch entities without switching systems: every account you're connected to lives in the one view.",
    ],
    panel: <ProductScreen />,
  },
  {
    id: "logbook",
    eyebrow: "Track",
    title: "Vehicle logbook",
    body: [
      "Full ATO-compliant logbook tool. Register vehicles, log trips manually or in bulk, calculate business use %, and export CSV or PDF for ATO substantiation.",
      "The 12-week logbook period is tracked for you, so you always know how far along you are.",
    ],
    panel: (
      <div className="tc-card p-5">
        <LogbookMeter />
      </div>
    ),
  },
  {
    id: "lodgements",
    eyebrow: "Track",
    title: "Lodgement tracking",
    body: [
      "Per-lodgement status, financial year, due dates and accountant notes — for every entity you manage.",
      "Statuses use the app's own language: lodged, due soon, on track. You'll never be surprised by a deadline again.",
    ],
    panel: <LodgementList />,
  },
  {
    id: "properties",
    eyebrow: "Track",
    title: "Investment properties",
    body: [
      "Track all rental and investment properties inline. Date first received rent, purchase date, notes — add, edit, and delete directly from the dashboard.",
      "At tax time, your rental schedule is already organised for your Registered Tax Agent.",
    ],
    panel: <PropertyPanel />,
  },
  {
    id: "booking",
    eyebrow: "Get help",
    title: "Book your accountant in two clicks",
    body: [
      "Live accountant availability inside the portal — pick a 30-minute Teams or phone call, or a 1-hour in-person appointment at Parramatta or Martin Place.",
      "Your booking lands straight in the accountant's calendar. No phone tag, no email chains.",
    ],
    panel: <BookingPanel />,
  },
  {
    id: "flo",
    eyebrow: "Get help",
    title: "Flo — AI assistant",
    body: [
      "Floating chat on every page. Flo answers tax deduction questions, explains receipt categorisations, and provides guided help for first-time users.",
      "Flo organises; your Registered Tax Agent reviews and signs off. The AI does the sorting, the human does the lodging.",
    ],
    panel: <FloExchange />,
  },
];

export default function FeaturesPage() {
  return (
    <div className="tc-page min-h-screen">
      <RevealInit />
      <TaxFlowHeader />
      <Breadcrumbs items={[{ name: "Features", href: "/taxflow/features" }]} />

      <section className={`${container} pb-4 pt-8 md:pt-12`}>
        <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>What you get</p>
        <h1 className="tc-display mt-4 max-w-2xl text-4xl text-white md:text-5xl">
          Your complete tax control centre
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed" style={{ color: "#94A3B8" }}>
          Every feature you need — built into one portal, with Flo always there to
          help. Grouped by what you&apos;re actually doing: capture, organise, track,
          get help.
        </p>
      </section>

      {FEATURES.map((f, i) => (
        <section
          key={f.id}
          id={f.id}
          className="border-t"
          style={{
            background: i % 2 ? "#060D1A" : "#0A1628",
            borderColor: "rgba(255,255,255,0.08)",
            scrollMarginTop: "110px",
          }}
        >
          <div className={`${container} grid items-center gap-10 py-14 md:py-20 lg:grid-cols-12`}>
            <div className={`lg:col-span-5 ${i % 2 ? "lg:order-2 lg:col-start-8" : ""}`}>
              <div className="tc-reveal">
                <p className="tc-eyebrow" style={{ color: "#94A3B8" }}>{f.eyebrow}</p>
                <h2 className="mt-3 text-2xl font-bold text-white md:text-[1.7rem]">{f.title}</h2>
                {f.body.map((para) => (
                  <p key={para.slice(0, 24)} className="mt-3 text-[14.5px] leading-relaxed" style={{ color: "#94A3B8" }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
            <div className={`tc-reveal lg:col-span-6 ${i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
              {f.panel}
            </div>
          </div>
        </section>
      ))}

      <CtaBand />
      <TaxFlowAppFooter />
    </div>
  );
}
