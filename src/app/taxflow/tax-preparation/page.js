import Link from "next/link";
import InfoPage, { InfoSection, InfoGrid, SectionHeading, StepList } from "@/components/taxflow/InfoPage";
import { LodgementList } from "@/components/taxflow/TaxFlowMockups";
import { FeesSection, FaqList, SwitchingModule } from "@/components/taxflow/TaxFlowShared";
import { faqSubset } from "@/data/taxflow-faq";

export const metadata = {
  title: "Tax preparation services",
  description:
    "Individual, sole trader, company, trust and partnership tax returns, activity statements and CGT — prepared and lodged by a Registered Tax Agent you engage through TaxFlowAI. Quote first, no subscription.",
  alternates: { canonical: "/taxflow/tax-preparation" },
  openGraph: {
    title: "Tax preparation services — TaxFlowAI",
    description:
      "Returns, activity statements and CGT prepared and lodged by Registered Tax Agents. You approve the price before any work starts.",
    url: "/taxflow/tax-preparation",
  },
};

const SERVICES = [
  {
    title: "Individual tax returns",
    body: "Salary and wages, work-related deductions (D1–D9), working-from-home claims, dividends and interest, private health and Medicare levy details.",
  },
  {
    title: "Sole trader returns",
    body: "Business schedule, income and expense review, vehicle logbook claims, personal services income (PSI) checks and asset write-offs.",
  },
  {
    title: "Company, trust and partnership returns",
    body: "Annual returns with financial statements, tax reconciliations, distributions and Division 7A director-loan review.",
  },
  {
    title: "Activity statements (BAS and IAS)",
    body: "Monthly or quarterly GST, PAYG withholding and PAYG instalments — prepared from your books and lodged on time.",
  },
  {
    title: "Capital gains tax",
    body: "Shares, crypto and property — cost base, discounts and exemptions worked out and documented for substantiation.",
  },
  {
    title: "Investment property schedules",
    body: "Rental income, deductible expenses, depreciation and interest apportionment for every property you own.",
  },
  {
    title: "Prior-year and overdue returns",
    body: "Behind on lodgements? Your agent brings every entity up to date and deals with the ATO on your behalf.",
  },
  {
    title: "Tax planning and advice",
    body: "Plain-English answers before decisions are made — structure, timing, and what you can (and can't) claim.",
  },
];

const STEPS = [
  {
    title: "Register free and complete your profile",
    desc: "Ten minutes, guided by Flo. Your TFN and bank details are encrypted and masked from the first sign-in.",
  },
  {
    title: "Engage a Registered Tax Agent",
    desc: "Pick a time that suits — 30 minutes on Teams or phone, or in person at Parramatta or Martin Place. You receive a quote for exactly what you need.",
  },
  {
    title: "Upload and let Flo sort it",
    desc: "Receipts, statements and documents go into your vault. Flo files them into ATO categories and flags anything missing.",
  },
  {
    title: "Review, sign and lodge",
    desc: "Your agent prepares the return, you review and sign electronically, and it's lodged with the ATO. Status is visible the whole way.",
  },
];

const PERSONAS = [
  { href: "/taxflow/for/sole-traders", title: "Sole traders", desc: "BAS and quarterly deadlines, business vs personal expenses, vehicle logbook." },
  { href: "/taxflow/for/employees-and-wfh", title: "Employees & WFH", desc: "WFH fixed-rate hour tracker, D5 claims, and the records the ATO expects." },
  { href: "/taxflow/for/property-investors", title: "Property investors", desc: "Rental schedules, deductible expenses, and record keeping that holds up." },
];

export default function TaxPreparationPage() {
  return (
    <InfoPage
      crumbName="Tax preparation"
      crumbHref="/taxflow/tax-preparation"
      eyebrow="Tax preparation services"
      headline="Prepared and lodged by Registered Tax Agents"
      intro={[
        "TaxFlowAI keeps you organised. A Registered Tax Agent you engage through the platform does the tax — every return, every activity statement, every entity — with a quote you approve before any work starts.",
        "Personal, sole trader, company, trust and partnership, all from the one portal.",
      ]}
      panel={<LodgementList />}
    >
      <InfoSection id="services">
        <SectionHeading
          eyebrow="What we prepare"
          title="Every return, every entity"
          lead="Each service is quoted individually — you only pay for what you actually need."
        />
        <InfoGrid items={SERVICES} cols={4} />
      </InfoSection>

      <InfoSection id="how-it-works" alt>
        <SectionHeading
          eyebrow="The process"
          title="From sign-up to lodged"
          lead="Four steps. Flo handles the sorting, your Registered Tax Agent handles the lodging."
        />
        <StepList steps={STEPS} />
        <div className="mt-9 pl-[37px]">
          <Link href="/taxflow/how-it-works" className="tc-link text-[15px] font-semibold">
            See the full walkthrough
          </Link>
        </div>
      </InfoSection>

      <FeesSection />

      <InfoSection id="who-its-for" alt>
        <SectionHeading eyebrow="Who it's for" title="Built for your situation" />
        <div className="tc-reveal mt-10 grid gap-4 md:grid-cols-3">
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
      </InfoSection>

      <SwitchingModule />

      <InfoSection id="faq">
        <SectionHeading eyebrow="Questions" title="Tax preparation FAQ" />
        <div className="tc-reveal mt-8 max-w-3xl">
          <FaqList items={faqSubset(["fees", "who-lodges", "what-is-rta", "free-signup", "entities"])} />
        </div>
        <p className="mt-6 text-[14px]" style={{ color: "#94A3B8" }}>
          <Link href="/taxflow/faq" className="tc-link">See all FAQs</Link>
        </p>
      </InfoSection>
    </InfoPage>
  );
}
