import Link from "next/link";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";

const DISCLOSURE_ENTITIES = [
  "Any persons who provide credit or other products or services to us, or to whom an application has been made for those products or services",
  "Any financial consultants, accountants, lawyers and advisers",
  "Any industry body, tribunal, court or otherwise in connection with any complaint",
  "Any person where you are required by law to do so",
  "Any of your associates, related entities or contractors (including printing/publication/mailing houses, IT service providers, cloud storage providers, lawyers/accountants)",
  "Our referees, such as our employers, to verify information we have provided",
  "Any person considering acquiring an interest in your business or assets",
  "Any organisation providing online verification of our identities",
  "Credit reporting bodies and other credit providers",
];

function Section({ title, children, className = "" }) {
  return (
    <section className={className}>
      <h2 className="border-l-4 border-[#00FCB8] pl-4 text-xl font-bold text-white md:text-2xl">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-xl border border-white/[0.08] bg-[#111827] p-5 md:p-6 ${className}`}>
      {children}
    </div>
  );
}

export default function PrivacyConsentPage() {
  return (
    <div className="min-h-screen bg-[#0A1628] font-sans text-white">
      <LayoutNav activeNav="brokers" />
      <main className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white md:text-4xl">Privacy Disclosure Statement and Consent</h1>
            <p className="mt-2 text-sm text-[#9CA3AF]">Each consent given in this document continues until withdrawn in writing.</p>
          </div>
          <a
            href="/documents/privacy-consent.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#00FCB8] px-5 py-2.5 text-sm font-bold text-[#0A1628] transition hover:opacity-90"
          >
            Download Privacy Consent Form (PDF)
          </a>
        </div>

        <Section title="Privacy Disclosure Statement and Consent">
          <Card className="space-y-6">
            <p className="text-[#9CA3AF] leading-relaxed">
              I/We consent to you using Personal Information, financial information and Credit Information about me/us for the purpose of arranging or providing credit, providing credit assistance, insuring credit, and for direct marketing of products and services offered by you or any organisation you are affiliated with or represent each of which may contact me/us for such a purpose including by telephone and electronically and acknowledge that you may receive a fee or commission for referring me/us to a product or service provider, such as an insurance provider.
            </p>
            <p className="text-[#9CA3AF] leading-relaxed">
              In this document &quot;you&quot; means each of Australian Finance Group Ltd AFG, each subsidiary of AFG, the Appointed Credit Service Provider and their organisation and any assignees or transferees of the commissions relating to any credit provided to me arranged by the Appointed Credit Service Provider or their organisation.
            </p>
            <p className="text-[#9CA3AF] leading-relaxed">
              In this document, &apos;Personal Information&apos; includes any sensitive information (including health information) and any information I/we tell you about any vulnerability I/we may have.
            </p>
            <p className="text-[#9CA3AF] leading-relaxed">
              The Personal Information provided by me/us will be held by you. I/We can obtain a copy of AFG&apos;s Privacy Policy at{" "}
              <a href="https://www.afgonline.com.au" target="_blank" rel="noopener noreferrer" className="text-[#00FCB8] hover:underline">www.afgonline.com.au</a>. Your privacy policy contains information about how I may access or seek correction of my Personal Information, how you manage that information and your complaints process. If I/we do not provide the requested Personal Information, I/we acknowledge that you may be unable to assist in arranging finance or providing other services.
            </p>
          </Card>
        </Section>

        <Section title="Disclosure of Personal Information" className="mt-12">
          <p className="text-[#9CA3AF] leading-relaxed">
            You may disclose Personal Information about me/us to the following types of entities, some of which may be located overseas (including in USA, Canada, Malaysia, India, Ireland, the United Kingdom, Serbia, Nepal, South Africa, Fiji, Sri Lanka, Bangladesh, Hong Kong, China, Vietnam, Croatia, Ukraine, Spain and the Philippines):
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {DISCLOSURE_ENTITIES.map((item, i) => (
              <li key={i} className="flex gap-2 rounded-lg border border-white/[0.08] bg-[#111827] px-4 py-3 text-sm text-[#9CA3AF]">
                <span className="mt-0.5 shrink-0 text-[#00FCB8]">•</span>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Credit Information" className="mt-12">
          <Card>
            <div className="space-y-4 text-sm text-[#9CA3AF] leading-relaxed">
              <p>
                I/We hereby authorise you to receive Credit Information from any lender about my/our credit affairs, and to provide any relevant real estate agent, lawyer, conveyancer, agent or person authorised by me access to my Credit Information, with details of whether finance has been approved for us, and if it has, the terms of that approval, including providing a copy of any approval letter.
              </p>
              <p>
                I/We appoint you as our agent and authorise you to obtain our Credit Information (including both consumer and commercial credit eligibility information) from a credit reporting body on our behalf. You are authorised to use that Credit Information to assist you to provide services, including credit assistance, to me/us and to assist me/us to apply for credit. You are also authorised to exchange my/our Credit Information with a credit reporting body. I/We acknowledge that you consent to these authorisations being provided in an electronic form (if applicable).
              </p>
              <p>
                In this document &apos;Credit Information&apos; is personal information or an opinion about me that has a bearing on credit that has been provided to me or that I have applied for. This includes information such as my/our identity information, the type, terms and maximum amount of credit provided to me/us, repayment history information, default information (including overdue payments), court information, new arrangement information, financial hardship arrangement information including whether I have made a financial hardship arrangement with you, personal insolvency information, disciplinary proceedings, complaints, delinquency, fraud investigations and details of any serious credit infringements. &apos;Credit eligibility information&apos; is credit reporting information supplied to you by a credit reporting body, and any information that you derive from it.
              </p>
            </div>
          </Card>
        </Section>

        <Section title="Receiving Information Electronically" className="mt-12">
          <Card>
            <p className="text-[#9CA3AF] leading-relaxed">
              I/We consent to receiving credit assistance documentation and loan application information electronically. I/We acknowledge and agree that paper documents may no longer be given, electronic communications must be regularly checked for documents and this consent to receive electronic communications may be withdrawn at any time.
            </p>
          </Card>
        </Section>

        <Section title="Video or Audio Conference Recording" className="mt-12">
          <Card>
            <p className="text-[#9CA3AF] leading-relaxed">
              I/We consent to you obtaining Personal Information, financial information and Credit Information about me/us by way of video conference and/or by way of audio conference for the purpose of arranging or providing credit, providing credit assistance or insuring credit and give my/our permission for that video and/or audio conference to be recorded and provided to a credit provider, insurer or government agency for this purpose.
            </p>
          </Card>
        </Section>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/brokers" className="inline-flex rounded-lg bg-[#00FCB8] px-5 py-2.5 text-sm font-bold text-[#0A1628] transition hover:opacity-90">
            Back to Brokers
          </Link>
          <Link href="/credit-guide" className="inline-flex rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10">
            Credit Guide
          </Link>
          <Link href="/" className="inline-flex rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10">
            Home
          </Link>
        </div>
      </main>
      <LayoutFooter />
    </div>
  );
}
