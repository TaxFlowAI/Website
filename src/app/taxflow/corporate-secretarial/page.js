import Link from "next/link";
import InfoPage, { InfoSection, InfoGrid, SectionHeading, StepList } from "@/components/taxflow/InfoPage";
import { VaultPanel } from "@/components/taxflow/TaxFlowMockups";
import { TAXFLOW_SIGNIN_URL } from "@/components/taxflow/TaxFlowShared";
import CalendlyButton from "@/components/taxflow/CalendlyButton";

export const metadata = {
  title: "Corporate secretarial services",
  description:
    "ASIC annual reviews, director and share changes, registered office updates, name changes and deregistrations — prepared, signed electronically and lodged by a registered ASIC agent through TaxFlowAI.",
  alternates: { canonical: "/taxflow/corporate-secretarial" },
  openGraph: {
    title: "Corporate secretarial services — TaxFlowAI",
    description:
      "Your company's ASIC obligations handled by a registered ASIC agent, tracked alongside your tax in the one portal.",
    url: "/taxflow/corporate-secretarial",
  },
};

const SERVICES = [
  {
    title: "Annual company reviews",
    body: "ASIC annual statement checked, solvency resolution prepared and minuted, and the review fee tracked so nothing is paid late.",
  },
  {
    title: "Officeholder changes",
    body: "Appointing or resigning directors and secretaries — consents, minutes and the ASIC notification (Form 484) lodged inside the 28-day window.",
  },
  {
    title: "Share transactions",
    body: "Allotments, transfers and cancellations — member registers updated, share certificates issued and ASIC notified.",
  },
  {
    title: "Registered office and address changes",
    body: "Registered office, principal place of business and officeholder address updates lodged with ASIC.",
  },
  {
    title: "Company name changes",
    body: "Name availability checked, special resolution prepared, Form 205 lodged and the new certificate filed in your vault.",
  },
  {
    title: "Deregistration and wind-up",
    body: "Voluntary deregistration (Form 6010) or a members' voluntary winding-up — declarations, resolutions and lodgements handled end to end.",
  },
  {
    title: "Constitutions, minutes and registers",
    body: "Company constitution, director and member resolutions, and statutory registers kept current and stored securely.",
  },
  {
    title: "ASIC correspondence",
    body: "ASIC notices routed to one place, deadlines tracked alongside your tax lodgements, and late fees avoided.",
  },
];

const STEPS = [
  {
    title: "Tell us what's changed",
    desc: "A director resigning, shares moving, a new address — send a message through the portal or book a call.",
  },
  {
    title: "We prepare, you sign electronically",
    desc: "Resolutions, consents and ASIC forms are prepared for you and signed through Annature — legally binding, no printing.",
  },
  {
    title: "We lodge with ASIC and file the record",
    desc: "The lodgement is made through our ASIC agent connection and every document lands in your company's vault, next to its tax records.",
  },
];

const WHY = [
  {
    title: "Deadlines you never miss",
    body: "ASIC gives you 28 days to notify most changes and charges late fees when you don't. Every ASIC date sits in the same tracker as your tax deadlines.",
  },
  {
    title: "The company and the tax, together",
    body: "The team preparing your company's tax return already knows its structure. Changes are reflected in both places, first time.",
  },
  {
    title: "Everything in your vault",
    body: "Certificates, resolutions, registers and ASIC receipts are filed in your company's private folder — searchable and always yours.",
  },
];

export default function CorporateSecretarialPage() {
  return (
    <InfoPage
      crumbName="Corporate secretarial"
      crumbHref="/taxflow/corporate-secretarial"
      eyebrow="Corporate secretarial services"
      headline="Your company's ASIC obligations, handled"
      intro={[
        "Running a company comes with paperwork that has nothing to do with tax: annual reviews, officeholder changes, share movements, address updates. Frontline Holdings Group Pty Ltd is a registered ASIC agent (No. 51843) and handles it through the same portal you use for your tax.",
        "Tell us what's changed, sign electronically, and we lodge it with ASIC.",
      ]}
      panel={<VaultPanel />}
    >
      <InfoSection id="services">
        <SectionHeading
          eyebrow="What we handle"
          title="From annual review to deregistration"
          lead="Each matter is quoted before any work starts, exactly like our tax services."
        />
        <InfoGrid items={SERVICES} cols={4} />
      </InfoSection>

      <InfoSection id="how-it-works" alt>
        <SectionHeading eyebrow="The process" title="Three steps, no printing" />
        <StepList steps={STEPS} />
      </InfoSection>

      <InfoSection id="why">
        <SectionHeading eyebrow="Why an ASIC agent" title="One team for the company and the tax" />
        <InfoGrid items={WHY} />
        <div className="tc-reveal mt-10 flex flex-wrap items-center gap-4">
          <a href={TAXFLOW_SIGNIN_URL} className="tc-btn-primary rounded-lg px-6 py-3 text-[14.5px] font-bold">
            Get started
          </a>
          <CalendlyButton className="tc-btn-ghost rounded-lg px-6 py-3 text-[14.5px] font-semibold">
            Book a free call
          </CalendlyButton>
        </div>
      </InfoSection>

      <InfoSection id="note" alt>
        <div
          className="tc-reveal max-w-3xl rounded-xl border p-6 text-[14px] leading-relaxed md:p-8"
          style={{ borderColor: "rgba(255,255,255,0.08)", background: "#0F1729", color: "#94A3B8" }}
        >
          <p>
            Corporate secretarial and ASIC agent services are provided by{" "}
            <strong className="text-white">Frontline Holdings Group Pty Ltd</strong> (ABN 59 671 861 475,
            ASIC Agent 51843). Tax agent services are provided separately by the Registered Tax Agent you
            engage through the platform. See our{" "}
            <Link href="/taxflow/terms" className="tc-link">Terms of Service</Link>.
          </p>
        </div>
      </InfoSection>
    </InfoPage>
  );
}
