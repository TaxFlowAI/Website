import Link from "next/link";
import InfoPage, { InfoSection, InfoGrid, SectionHeading } from "@/components/taxflow/InfoPage";
import { VaultPanel } from "@/components/taxflow/TaxFlowMockups";
import { FaqList } from "@/components/taxflow/TaxFlowShared";
import { faqSubset } from "@/data/taxflow-faq";

export const metadata = {
  title: "Data security",
  description:
    "How TaxFlowAI protects your data: encryption in transit and at rest, two-factor authentication, masked TFN and bank details, role-based access, your own access-controlled document folder, and payments through Stripe.",
  alternates: { canonical: "/taxflow/security" },
  openGraph: {
    title: "Data security — TaxFlowAI",
    description:
      "Encryption, two-factor authentication, masked sensitive fields and your own access-controlled document folder.",
    url: "/taxflow/security",
  },
};

const PROTECTIONS = [
  {
    title: "Encryption in transit and at rest",
    body: "Every connection to the portal is encrypted, and your data is encrypted where it's stored.",
  },
  {
    title: "Two-factor authentication",
    body: "Every sign-in requires a second factor. A password alone never gets anyone in.",
  },
  {
    title: "Sensitive fields masked",
    body: "Your TFN and bank details are encrypted and masked. They're revealed only after you re-enter your password.",
  },
  {
    title: "Role-based access",
    body: "Accountants, staff and clients each see only what their role requires — nothing more.",
  },
  {
    title: "Your own document folder",
    body: "Documents live in a private, access-controlled cloud folder (Dropbox) that belongs to you — organised and backed up.",
  },
  {
    title: "Payments through Stripe",
    body: "Invoices are paid securely online through Stripe. Card details never touch our servers.",
  },
  {
    title: "Legally binding e-signatures",
    body: "Engagement letters and resolutions are signed through Annature — bank-grade electronic signatures with a full audit trail.",
  },
  {
    title: "AI with reasoning you can read",
    body: "Flo runs on Claude by Anthropic and shows the reasoning behind every categorisation, so nothing is a black box.",
  },
];

const PRACTICES = [
  {
    title: "We collect only what the work needs",
    body: "Our Collection Notice sets out exactly what we ask for, why, and who it's shared with — your tax agent and the ATO, not marketers.",
  },
  {
    title: "Handled under Australian privacy law",
    body: "Personal information is handled in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles, as set out in our Privacy Policy.",
  },
  {
    title: "No lock-in",
    body: "Your documents and data are always yours to take with you. Export at any time, and your folder stays yours if you leave.",
  },
];

export default function SecurityPage() {
  return (
    <InfoPage
      crumbName="Data security"
      crumbHref="/taxflow/security"
      eyebrow="Data security"
      headline="Your data, protected"
      intro={[
        "A tax portal holds the most sensitive information you have: your TFN, your bank details, your income. TaxFlowAI is built so that you can focus on your tax, not on worrying about security.",
        "Here is exactly what protects your data, in plain English.",
      ]}
      panel={<VaultPanel />}
    >
      <InfoSection id="protections">
        <SectionHeading eyebrow="How we protect it" title="Eight things that are always on" />
        <InfoGrid items={PROTECTIONS} cols={4} />
      </InfoSection>

      <InfoSection id="privacy" alt>
        <SectionHeading
          eyebrow="Your privacy"
          title="Collected carefully, handled lawfully"
          lead="The documents below are the full picture. This page is the short version."
        />
        <InfoGrid items={PRACTICES} />
        <div className="tc-reveal mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px] font-semibold">
          <Link href="/taxflow/privacy-policy" className="tc-link">Privacy Policy</Link>
          <Link href="/taxflow/collection-notice" className="tc-link">Collection Notice</Link>
          <Link href="/taxflow/terms" className="tc-link">Terms of Service</Link>
          <a href="https://tpb.gov.au/registrations_search" target="_blank" rel="noopener noreferrer" className="tc-link">
            Verify your tax agent
          </a>
        </div>
      </InfoSection>

      <InfoSection id="faq">
        <SectionHeading eyebrow="Questions" title="Security FAQ" />
        <div className="tc-reveal mt-8 max-w-3xl">
          <FaqList items={faqSubset(["security", "lock-in", "who-lodges"])} />
        </div>
        <p className="mt-6 text-[14px]" style={{ color: "#94A3B8" }}>
          Found something? Email{" "}
          <a href="mailto:taxflowai@frontline.financial" className="tc-link">taxflowai@frontline.financial</a>{" "}
          and we&apos;ll respond promptly.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
