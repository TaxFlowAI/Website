import Link from "next/link";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import { LegalPrintSource } from "@/components/LegalPdfButton";
import { CONSENT_DOCS } from "@/config/consent";
import { ENTITY } from "@/config/entities";

/* Frontline Financial: Asset Solutions (Martyn Financial Pty Ltd, Fintelligence ACL 511803).
   Laid out in the section order of Fintelligence's own privacy policy and worded from the
   Privacy Consent clients sign in Ambition Cloud (Hassan, 15 Nov 2026: "use the Fintelligence
   format for now"). It says nothing about overseas disclosure on purpose: that is being
   worked out separately. Bump policyUpdated in src/config/consent.js when this changes. */

const UPDATED = CONSENT_DOCS[ENTITY.ASSET_SOLUTIONS].policyUpdated;
const PHONE = "0450 553 877";
const EMAIL = "sham@frontline.financial";
const POST = "Level 49, 8 Parramatta Square, Parramatta NSW 2150";

function Section({ title, children, className = "mt-12" }) {
  return (
    <section className={className}>
      <h2 className="border-l-4 border-[#00FCB8] pl-4 text-xl font-bold text-white md:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-[#9CA3AF]">{children}</div>
    </section>
  );
}

function List({ items }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

const linkClass = "text-[#00FCB8] hover:underline";

function Contact() {
  return (
    <>
      phone <a href="tel:0450553877" className={linkClass}>{PHONE}</a>, email{" "}
      <a href={`mailto:${EMAIL}`} className={linkClass}>{EMAIL}</a>, or registered post to {POST}
    </>
  );
}

export default function PrivacyPolicyAssetSolutionsPage() {
  return (
    <div className="legal-doc min-h-screen bg-[#0A1628] font-sans text-white">
      <LayoutNav activeNav="asset-solutions" />
      <main className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <h1 className="text-3xl font-bold text-white md:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-[#9CA3AF]">Frontline Financial: Asset Solutions · Updated {UPDATED}</p>
        <LegalPrintSource path="/privacy-policy-asset-solutions" asAt={UPDATED} />

        <Section title="About this policy" className="mt-10">
          <p>
            Martyn Financial Pty Ltd t/as Frontline Financial: Asset Solutions (ABN 13 681 219 198), Authorised Credit
            Representative #563350 of Fintelligence Pty Ltd (ABN 80 625 017 174), Australian Credit Licence #511803 (referred
            to as &quot;Frontline Financial: Asset Solutions&quot;/we/us) arranges vehicle, equipment, personal and business
            finance.
          </p>
          <p>
            This policy explains how we collect, hold, use and disclose personal information and credit information, through
            this website and when we give you credit assistance. We are bound by the Privacy Act 1988 (Cth), including the
            Australian Privacy Principles, and the Privacy (Credit Reporting) Code.
          </p>
          <p>
            When you apply for finance, you also sign our{" "}
            <Link href="/privacy-consent-asset-solutions" className={linkClass}>Privacy Consent</Link>, which sets out the
            purposes we use your information for, the credit providers we may apply to and your consents. This policy and that
            consent work together.
          </p>
          <p>
            Home loans are arranged by a separate business, Frontline Financial Brokers, with its{" "}
            <Link href="/privacy-policy" className={linkClass}>own privacy policy</Link>.
          </p>
        </Section>

        <Section title="Our commitment to protect your privacy">
          <p>
            We only collect the information we need to help you, and we only use or disclose it for the purposes we collected
            it for, purposes you would reasonably expect, purposes you consent to, or where the law allows or requires it.
          </p>
        </Section>

        <Section title="Personal information">
          <p>
            Personal information is information or an opinion about an identifiable or reasonably identifiable person. The
            personal information we collect and hold includes your name, date of birth, gender, telephone number, address,
            email, employment details and any other information we may need to identify you, as well as your income, assets,
            debts and expenses, and details of the vehicle, equipment or other finance you need.
          </p>
          <p>
            Credit information is personal information that relates to credit that a person has applied for or has been
            provided. The credit information we collect may include your records of credit you have applied for (including the
            name of the credit provider, the type of credit and the amount of credit), default information or any other
            information that has a bearing on your credit worthiness used to determine your eligibility for credit. Credit
            information also includes credit reporting information supplied to us by a credit reporting body and any
            information that we derive from it.
          </p>
          <p>
            When you use this website, we also collect your IP address, browser and device, the pages you view and the ad or
            link that brought you here. When you tick the consent box on our forms, we record the wording you agreed to, the
            documents it refers to, the page, the time, your IP address and your device, as our record of your consent.
          </p>
        </Section>

        <Section title="Why we collect your personal information">
          <p>We collect, hold, use and disclose your personal and credit information to:</p>
          <List
            items={[
              "reply to your enquiry and call you back;",
              "assess and verify your identity and financial situation;",
              "assess your credit application or your suitability as a guarantor to a credit application;",
              "provide such information to a guarantor or related applicant;",
              "exchange your information with a credit reporting body;",
              <>
                disclose your information to credit providers as set out in the Credit Provider Schedule in our{" "}
                <Link href="/privacy-consent-asset-solutions" className={linkClass}>Privacy Consent</Link> to arrange credit;
              </>,
              "disclose your information to our aggregation partner, Fintelligence Pty Ltd;",
              "disclose your information to an insurer to arrange insurance you wish to obtain;",
              "obtain from, and disclose to, third parties such as your employer, landlord, real estate agent, lending institution and guarantor who are reasonably necessary to arrange finance and/or insurance;",
              "refer you to other organisations, service providers or business partners, or obtain referrals from them to you;",
              "run and improve this website, and see which of our ads work; and",
              "tell you about products and services that may suit you (see Direct marketing).",
            ]}
          />
          <p>
            We are required by the Anti-Money Laundering and Counter-Terrorism Financing Act 2006 (Cth) to collect and use
            personal and credit information from you in order to identify you. We are also required by the National Consumer
            Credit Protection Act 2009 (Cth) to collect credit information and personal information about you and take
            reasonable steps to verify it, including your financial situation. This verification may include enquiring via a
            credit reporting body.
          </p>
          <p>
            We don&apos;t make decisions about you by computer program alone. A person on our team reviews every enquiry and
            application.
          </p>
          <p>We may not be able to help you with credit if you don&apos;t give us the information we ask for.</p>
        </Section>

        <Section title="How do we collect your personal information?">
          <p>
            We collect it from you wherever we can: through our website forms, calls, emails, meetings and our online
            application and Privacy Consent. With your consent, we also collect it from credit reporting bodies, credit
            providers, your employer, accountant or other people you authorise, identity verification services, and anyone who
            refers you to us.
          </p>
          <p>
            Our website uses cookies and the Meta Pixel (not on the TaxFlowAI pages). The pixel tells Meta when someone visits a
            page or sends an enquiry, so we can see which ads work and show our ads to people who may need us. Meta receives your
            IP address, browser details and a cookie ID, under{" "}
            <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className={linkClass}>
              Meta&apos;s privacy policy
            </a>
            . You can block cookies in your browser.
          </p>
        </Section>

        <Section title="Do we disclose your personal information?">
          <p>We disclose or exchange your personal and credit information with:</p>
          <List
            items={[
              "potential credit providers and/or insurers as part of our credit assistance process;",
              "third parties to verify the details provided are correct, including your agents, guardians, attorneys and employers;",
              "our related bodies corporate, assignees, agents, contractors and advisers;",
              "our aggregation partner, Fintelligence Pty Ltd, whose systems we use and which may review our files as part of compliance audits;",
              "the service providers that run our website, email and client management systems for us;",
              "law enforcement, government and regulatory bodies;",
              "any person who refers you to us for credit assistance;",
              "joint applicants and guarantors;",
              "any financial institution to, or from which, a payment is made; and",
              "debt collection agencies.",
            ]}
          />
          <p>
            If you ask about a home loan, we pass your enquiry to Frontline Financial Brokers. We don&apos;t sell your personal
            information.
          </p>
        </Section>

        <Section title="Credit-related information">
          <p>We may exchange personal and credit information with a credit reporting body to:</p>
          <List
            items={[
              "obtain a credit report on an applicant or guarantor, as an access seeker in the credit assistance process, by giving it details such as name, date of birth and address;",
              "use the information it provides to help us conduct a preliminary assessment of a proposed credit application and its suitability for the applicant; and",
              "ask it whether the information an applicant or guarantor gave us matches its records, to verify their identity.",
            ]}
          />
          <p>
            Our current credit reporting body is Equifax. You can contact them on 13 8332, Monday to Friday 8.30am to 6.00pm
            Eastern Standard Time, or via{" "}
            <a href="https://www.equifax.com.au" target="_blank" rel="noopener noreferrer" className={linkClass}>
              www.equifax.com.au
            </a>
            , where you can also read their privacy policy.
          </p>
          <p>
            Credit providers we apply to may also make their own credit enquiry and may ask for your consent again. How each
            handles your information is on its website, listed in the Credit Provider Schedule.
          </p>
        </Section>

        <Section title="Notifiable matters">
          <p>You have the right to ask a credit reporting body:</p>
          <List
            items={[
              "for a free copy of the information it holds about you;",
              "not to use your information to pre-screen you for direct marketing; and",
              "not to use or disclose your information for 21 days (a ban period) if you believe you have been, or are likely to be, a victim of fraud.",
            ]}
          />
        </Section>

        <Section title="Notifiable data breaches">
          <p>
            If a data breach involving your information is likely to cause you serious harm, we will tell you and the Office of
            the Australian Information Commissioner as soon as practicable, as the Notifiable Data Breaches scheme requires.
          </p>
        </Section>

        <Section title="Direct marketing">
          <p>
            We would like to contact you from time to time with marketing information about the products and services we
            provide. You can opt out of receiving direct marketing from us at any time, at no charge: use the unsubscribe link in
            any marketing email, or email <a href={`mailto:${EMAIL}`} className={linkClass}>{EMAIL}</a>.
          </p>
        </Section>

        <Section title="Updating your personal information">
          <p>
            Please tell us if your details change, so the information we hold is accurate, up to date and complete.
          </p>
        </Section>

        <Section title="Access and correction">
          <p>
            You have the right to ask us for the personal and credit information we hold about you, to correct any of it that
            is shown to be incorrect, and for copies of this policy and our Privacy Consent. Contact us: <Contact />.
          </p>
          <p>
            There is no charge for making a request. We aim to respond within 7 days, and we will give you a decision within 30
            days. If we can&apos;t give you access or make a correction, we&apos;ll tell you why in writing.
          </p>
        </Section>

        <Section title="Using government identifiers">
          <p>
            We only collect government identifiers, such as your driver licence number, where we need them to verify your
            identity or the law requires it. We never use them as our own way of identifying you.
          </p>
        </Section>

        <Section title="Dealing with us without identifying yourself">
          <p>
            You can ask us general questions without telling us who you are. To arrange credit for you, we need to identify
            you.
          </p>
        </Section>

        <Section title="Sensitive information">
          <p>
            We only collect sensitive information, such as health information, with your consent and where it is relevant to
            your finance, for example if you tell us about a hardship.
          </p>
        </Section>

        <Section title="How safe and secure is your personal information?">
          <p>
            We take reasonable steps to protect your information from misuse, interference, loss, and unauthorised access,
            change or disclosure. We keep it in password-protected systems that only our team and the service providers who run
            them for us can reach. We keep credit assistance records for at least 7 years, as the law requires. When we no
            longer need information, we destroy it or remove anything that identifies you.
          </p>
        </Section>

        <Section title="Complaints">
          <p>
            If you have a complaint about how we handle your information, contact our Complaints Officer: <Contact />. We will
            acknowledge your complaint within 7 days and aim to give you a decision within 30 days.
          </p>
          <p>If you are not satisfied with our response, you can contact:</p>
          <List
            items={[
              <>
                the Australian Financial Complaints Authority (AFCA): 1800 931 678,{" "}
                <a href="https://www.afca.org.au" target="_blank" rel="noopener noreferrer" className={linkClass}>www.afca.org.au</a>,
                GPO Box 3, Melbourne VIC 3001; or
              </>,
              <>
                the Office of the Australian Information Commissioner (OAIC): 1300 363 992,{" "}
                <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" className={linkClass}>www.oaic.gov.au</a>.
              </>,
            ]}
          />
        </Section>

        <Section title="Further information">
          <p>
            For any privacy question, contact us: <Contact />.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            We update this policy when the way we handle information changes. The latest version is always on this page, and
            the date at the top shows when it last changed.
          </p>
        </Section>

        <div className="mt-12 flex flex-wrap gap-4 print:hidden">
          <Link href="/assetsolutions" className="inline-flex rounded-lg bg-[#00FCB8] px-5 py-2.5 text-sm font-bold text-[#0A1628] transition hover:opacity-90">
            Back to Asset Solutions
          </Link>
          <Link href="/credit-guide-asset-solutions" className="inline-flex rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10">
            Credit Guide &amp; Quote
          </Link>
          <Link href="/privacy-consent-asset-solutions" className="inline-flex rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10">
            Privacy Consent
          </Link>
        </div>
      </main>
      <LayoutFooter />
    </div>
  );
}
