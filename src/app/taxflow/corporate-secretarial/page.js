import Link from "next/link";
import TaxFlowHeader from "@/components/taxflow/TaxFlowHeader";
import TaxFlowAppFooter from "@/components/taxflow/TaxFlowAppFooter";
import RevealInit from "@/components/taxflow/RevealInit";
import TaxFlowWave from "@/components/taxflow/TaxFlowWave";
import TaxFlowWaveLayers from "@/components/taxflow/TaxFlowWaveLayers";
import { ChangeRequestPanel, SigningPanel, LodgedPanel } from "@/components/taxflow/ServiceMockups";
import { container, CtaBand } from "@/components/taxflow/TaxFlowShared";
import {
  ServiceHero,
  CredentialPlate,
  LandingHeading,
  StoryStations,
  StatBand,
  NAVY,
  DEEP,
} from "@/components/taxflow/ServiceLanding";

export const metadata = {
  title: "Corporate secretarial services",
  description:
    "ASIC annual reviews, director and share changes, registered office updates, name changes and deregistrations. Prepared, signed electronically and lodged by a registered ASIC agent through TaxFlowAI.",
  alternates: { canonical: "/taxflow/corporate-secretarial" },
  openGraph: {
    title: "Corporate secretarial services — TaxFlowAI",
    description:
      "Your company's ASIC obligations handled by a registered ASIC agent, tracked alongside your tax in the one portal.",
    url: "/taxflow/corporate-secretarial",
  },
};

const STRIP = ["Annual reviews", "Director changes", "Share changes", "Deregistrations"];

/* span is the tile width on the six-column bento */
const MATTERS = [
  {
    code: "ANNUAL REVIEW",
    span: "md:col-span-3",
    accent: true,
    title: "Annual company reviews",
    body: "Your ASIC annual statement checked, the solvency resolution prepared and minuted, and the review fee tracked so nothing is paid late.",
  },
  {
    code: "FORM 484",
    span: "md:col-span-3",
    accent: true,
    title: "Officeholder changes",
    body: "Appointing or resigning directors and secretaries. Consents, minutes and the ASIC notification lodged inside the 28-day window.",
  },
  {
    code: "FORM 484",
    span: "md:col-span-2",
    title: "Share transactions",
    body: "Allotments, transfers and cancellations. Member registers updated, share certificates issued and ASIC notified.",
  },
  {
    code: "FORM 484",
    span: "md:col-span-2",
    title: "Address changes",
    body: "Registered office, principal place of business and officeholder address updates lodged with ASIC.",
  },
  {
    code: "FORM 205A",
    span: "md:col-span-2",
    title: "Company name changes",
    body: "Name availability checked, the special resolution prepared and lodged, and the new certificate filed in your vault.",
  },
  {
    code: "FORM 6010",
    span: "md:col-span-2",
    title: "Deregistration and wind-up",
    body: "Voluntary deregistration or a members' voluntary winding-up. Declarations, resolutions and lodgements handled end to end.",
  },
  {
    code: "RECORDS",
    span: "md:col-span-2",
    title: "Constitutions, minutes and registers",
    body: "Company constitution, director and member resolutions, and statutory registers kept current and stored securely.",
  },
  {
    code: "NOTICES",
    span: "md:col-span-2",
    title: "ASIC correspondence",
    body: "ASIC notices routed to one place and deadlines tracked alongside your tax lodgements.",
  },
];

const STATS = [
  { value: "28 days", label: "is the window ASIC gives you to notify most company changes. We track it for you." },
  { value: "1 portal", label: "for the company and the tax, with one team that already knows your structure." },
  { value: "0 printing", label: "Resolutions, consents and forms are signed electronically." },
];

const STATIONS = [
  {
    label: "Tell us",
    title: "Tell us what has changed.",
    body: "A director resigning, shares moving, a new address. Send a message through the portal or book a call, and we work out which resolutions and ASIC forms are needed.",
    visual: <ChangeRequestPanel />,
  },
  {
    label: "Sign",
    title: "We prepare. You sign on screen.",
    body: "Resolutions, consents and ASIC forms are prepared for you and signed electronically through Annature. Legally binding, with nothing to print or post.",
    visual: <SigningPanel />,
  },
  {
    label: "Lodge",
    title: "Lodged with ASIC. Filed in your vault.",
    body: "The lodgement is made through our ASIC agent connection, your registers are updated, and every document lands in your company's vault next to its tax records.",
    visual: <LodgedPanel />,
  },
];

const WHY = [
  {
    title: "Deadlines you never miss",
    body: "ASIC charges late fees when changes are notified late. Every ASIC date sits in the same tracker as your tax deadlines.",
  },
  {
    title: "The company and the tax, together",
    body: "The team preparing your company's tax return already knows its structure. A change is reflected in both places, first time.",
  },
  {
    title: "Everything in your vault",
    body: "Certificates, resolutions, registers and ASIC receipts are filed in your company's private folder, searchable and always yours.",
  },
];

export default function CorporateSecretarialPage() {
  return (
    <div className="tc-page min-h-screen">
      <RevealInit />
      <TaxFlowHeader />

      <ServiceHero
        crumb={{ name: "Corporate secretarial", href: "/taxflow/corporate-secretarial" }}
        eyebrow="Corporate secretarial services"
        title="Company paperwork,"
        accent="lodged and filed."
        lead="Annual reviews, director and share changes, address updates and deregistrations. Tell us what has changed, sign on screen, and a registered ASIC agent lodges it."
        image="/images/taxflow/service-asic.webp"
        imageAlt="Flo stamping a company document as lodged, with a registered ASIC agent plate showing number 51843"
        plate={
          <CredentialPlate
            label="REGISTERED ASIC AGENT"
            number="51843"
            name="Frontline Holdings Group Pty Ltd"
          />
        }
      />

      {/* what we cover, at a glance */}
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

      {/* matters */}
      <section id="services" style={{ background: NAVY, scrollMarginTop: "110px" }}>
        <div className={`${container} py-14 md:py-20`}>
          <LandingHeading
            eyebrow="What we handle"
            title="From annual review to deregistration."
            lead="Each matter is quoted before any work starts, exactly like our tax services."
          />
          <div className="tc-reveal mt-10 grid items-stretch gap-4 md:grid-cols-6">
            {MATTERS.map((m) => (
              <div key={m.title} className={`tc-bento ${m.span} ${m.accent ? "tc-bento-accent" : ""}`}>
                <span className="tc-lp-code tc-mono">{m.code}</span>
                <h3 className="tc-bento-title mt-4">{m.title}</h3>
                <p className="tc-bento-body">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatBand stats={STATS} from={NAVY} to={DEEP} />

      {/* the process, on the current */}
      <section id="how-it-works" style={{ background: DEEP, scrollMarginTop: "110px" }}>
        <div className={`${container} pb-10 pt-10 md:pb-16 md:pt-14`}>
          <LandingHeading eyebrow="The process" title="Three steps, no printing." />
          <StoryStations stations={STATIONS} />
        </div>
      </section>

      {/* why */}
      <TaxFlowWave from={DEEP} to={NAVY} />
      <section id="why" style={{ background: NAVY, scrollMarginTop: "110px" }}>
        <div className={`${container} py-14 md:py-20`}>
          <LandingHeading eyebrow="Why an ASIC agent" title="One team for the company and the tax." />
          <div className="tc-reveal mt-12 grid gap-x-10 gap-y-10 md:grid-cols-3">
            {WHY.map((w, i) => (
              <div key={w.title} className="tc-value">
                <span className="tc-display tc-hero-accent text-5xl">{i + 1}</span>
                <h3 className="mt-4 text-[18px] font-bold text-white">{w.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed" style={{ color: "#B7C4CF" }}>{w.body}</p>
              </div>
            ))}
          </div>
          <p className="tc-fineprint tc-reveal mt-12">
            Corporate secretarial and ASIC agent services are provided by Frontline Holdings Group Pty Ltd
            (ABN 59 671 861 475, ASIC Agent 51843). Tax agent services are provided separately by TAX7 T04
            Pty Ltd, Registered Tax Agent 26313222. See our{" "}
            <Link href="/taxflow/terms" className="tc-link">Terms of Service</Link>.
          </p>
        </div>
      </section>

      <CtaBand />
      <TaxFlowAppFooter />
    </div>
  );
}
