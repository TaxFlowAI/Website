import Link from "next/link";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import { LegalPrintSource } from "@/components/LegalPdfButton";
import { CONSENT_DOCS } from "@/config/consent";
import { ENTITY } from "@/config/entities";

/* Frontline Financial Brokers (home loans, AFG). Asset Solutions has its own policy at
   /privacy-policy-asset-solutions, and TaxFlowAI at /taxflow/privacy-policy.
   Keep it true: when a form, tool or service provider changes, update the lists below and
   policyUpdated in src/config/consent.js (each lead's consent record quotes it). */

const UPDATED = CONSENT_DOCS[ENTITY.BROKERS].policyUpdated;

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
const strong = "font-semibold text-white";

export default function PrivacyPolicyPage() {
  return (
    <div className="legal-doc min-h-screen bg-[#0A1628] font-sans text-white">
      <LayoutNav activeNav="brokers" />
      <main className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <h1 className="text-3xl font-bold text-white md:text-4xl">Privacy Policy: Home Loans</h1>
        <p className="mt-2 text-sm text-[#9CA3AF]">Frontline Financial Brokers · Updated {UPDATED}</p>
        <LegalPrintSource path="/privacy-policy" asAt={UPDATED} />

        <Section title="Who we are" className="mt-10">
          <p>
            Frontline Financial Pty Ltd (ABN 39 693 731 396) trading as Frontline Financial Brokers arranges home loans. We
            are Authorised Credit Representative 575968 of Australian Finance Group Ltd (AFG), Australian Credit Licence
            389087. Our office is Level 49, 8 Parramatta Square, Parramatta NSW 2150.
          </p>
          <p>
            This policy explains how we handle your personal information, including credit information, when you contact us
            through this website or we help you with a home loan. We handle it in line with the Australian Privacy Principles
            in the Privacy Act 1988 and, for credit information, Part IIIA of that Act and the Credit Reporting Code.
          </p>
          <p>
            When you apply, you also sign AFG&apos;s{" "}
            <Link href="/privacy-consent" className={linkClass}>Privacy Disclosure Statement and Consent</Link>. That consent
            and{" "}
            <a href="https://www.afgonline.com.au" target="_blank" rel="noopener noreferrer" className={linkClass}>
              AFG&apos;s privacy policy
            </a>{" "}
            apply as well as this one.
          </p>
          <p>
            Vehicle, equipment, personal and business finance is arranged by a separate business, Frontline Financial: Asset
            Solutions, which has its{" "}
            <Link href="/privacy-policy-asset-solutions" className={linkClass}>own privacy policy</Link>. So does TaxFlowAI, the
            accounting business at frontline.financial/taxflow (
            <Link href="/taxflow/privacy-policy" className={linkClass}>its policy</Link>).
          </p>
        </Section>

        <Section title="What we collect">
          <List
            items={[
              <>
                <span className={strong}>When you fill in a form on this website:</span> your name, email and mobile, and what
                you tell us about the loan you need, such as the property, the amount, your postcode, how you earn your income
                and your answers to our questions.
              </>,
              <>
                <span className={strong}>When we help you apply:</span> identity details and documents such as your driver
                licence, your date of birth and address, your employment and income, assets, debts and expenses, bank
                statements, tax returns and business financials, and credit information, including credit reports. If you tell
                us about your health or another hardship, we hold that too, so we can take it into account.
              </>,
              <>
                <span className={strong}>About your visit:</span> your IP address, browser and device, the pages you view, and
                the ad or link that brought you here.
              </>,
              <>
                <span className={strong}>When you tick the consent box on our forms:</span> the wording you agreed to, the
                documents it refers to, the page, the time, your IP address and your device. That is our record of your consent.
              </>,
            ]}
          />
        </Section>

        <Section title="How we collect it">
          <List
            items={[
              "From you: through our website forms, calls, emails, meetings and video calls (recorded only with your consent), and our online fact find and document upload tools.",
              "From others, with your consent: credit reporting bodies, lenders, identity verification services, and people you authorise, such as your accountant or employer. Sometimes from the person or business who referred you to us.",
              "Automatically: through cookies and similar tools on this website (see below).",
            ]}
          />
        </Section>

        <Section title="Why we use it">
          <List
            items={[
              "To reply to your enquiry and call you back.",
              "To give you credit assistance: understand your needs and your financial situation, make sure a loan isn't unsuitable for you, as the National Consumer Credit Protection Act 2009 requires, and apply to lenders on your behalf.",
              "To verify your identity, as anti-money laundering law requires.",
              "To keep the records the law and AFG require, and to handle complaints.",
              "To run and improve this website and see which of our ads work.",
              "To tell you about products and services that may help you. You can opt out at any time.",
            ]}
          />
          <p>If you don&apos;t give us the information we ask for, we may not be able to help you.</p>
        </Section>

        <Section title="Who we share it with">
          <List
            items={[
              "The lenders you apply to, mortgage insurers, and providers of related products such as insurance, if you want them.",
              "AFG, our licensee and aggregator. Its systems are how we lodge applications, and it checks our work.",
              "Credit reporting bodies and identity verification services.",
              "People you authorise, such as your accountant, solicitor, conveyancer, valuer or real estate agent.",
              "The person or business who referred you to us, where your consent allows it.",
              "Frontline Financial: Asset Solutions, if you ask about vehicle, equipment, personal or business finance.",
              "Courts, regulators and government agencies, where the law requires it.",
            ]}
          />
          <p>We also use service providers that hold or process information for us:</p>
          <List
            items={[
              "website hosting (Vercel) and email delivery from our website forms (Resend);",
              "our client management system (Broker Engine) and its fact find and document tools;",
              "appointment booking (Calendly) and, when we use it, workflow automation (Zapier);",
              "document storage (Dropbox) and our email provider;",
              "advertising (Meta, see below).",
            ]}
          />
          <p>We don&apos;t sell your personal information.</p>
        </Section>

        <Section title="Information that goes overseas">
          <p>
            Some of these providers are based overseas or store information overseas, mainly in the United States. That
            includes Vercel, Resend, Calendly, Zapier, Dropbox and Meta. AFG may also share information with organisations
            overseas: its privacy consent lists the countries. We use established providers that protect information under
            their own privacy and security terms.
          </p>
        </Section>

        <Section title="Cookies and advertising">
          <p>
            This website uses the Meta Pixel, except on the TaxFlowAI pages. It tells Meta when someone visits a page or sends
            an enquiry, so we can see which ads work and show our ads to people who may need us. Meta receives your IP address,
            browser details and a cookie ID, and may link the visit to a Facebook or Instagram account under{" "}
            <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className={linkClass}>
              Meta&apos;s privacy policy
            </a>
            . You can block cookies in your browser and change how Meta uses your activity in its ad settings.
          </p>
          <p>If we add other tools, such as Google Analytics, we&apos;ll list them here.</p>
        </Section>

        <Section title="Credit reports">
          <p>
            With your consent, we may get your credit report from a credit reporting body to understand your position and
            prepare your application. We give the credit reporting body only the identity details it needs to find your file.
          </p>
          <p>
            You can ask a credit reporting body for a free copy of your credit report, ask it not to use your information to
            pre-screen you for direct marketing, or ask it to freeze your file for a time if you believe you have been, or are
            about to be, a victim of fraud.
          </p>
        </Section>

        <Section title="Automated decisions and AI">
          <p>
            We don&apos;t make decisions about you by computer program alone. A person on our team reviews every enquiry and
            application. We may use software, including AI tools, to help organise information and prepare documents, and
            someone on our team checks that work. Lenders and AFG may use automated tools in their own assessments, and their
            privacy policies explain how. You can ask for any decision about you to be reviewed by a person.
          </p>
        </Section>

        <Section title="Keeping it safe">
          <p>
            We keep your information in password-protected systems that only our team and our service providers can reach, and
            we take reasonable steps to protect it from misuse, interference, loss, and unauthorised access, change or
            disclosure. If a data breach is likely to cause you serious harm, we&apos;ll tell you and the Office of the
            Australian Information Commissioner. We keep credit assistance records for at least 7 years, as the law requires.
            When we no longer need information, we destroy it or remove anything that identifies you.
          </p>
        </Section>

        <Section title="Marketing">
          <p>
            We may contact you about products and services that may suit you. Every marketing email has an unsubscribe link, or
            you can ask us to stop at any time using the details below.
          </p>
        </Section>

        <Section title="Seeing or correcting your information">
          <p>
            You can ask for the information we hold about you, or ask us to correct it, using the details below. We reply within
            30 days, at no charge. If we can&apos;t give you access or make a correction, we&apos;ll tell you why in writing.
          </p>
        </Section>

        <Section title="Complaints">
          <p>
            If you&apos;re unhappy with how we&apos;ve handled your information, contact Hassan first. If it isn&apos;t sorted
            within 5 working days, it goes to AFG&apos;s Complaints Officer: 08 9420 7888,{" "}
            <a href="mailto:compliance@afgonline.com.au" className={linkClass}>compliance@afgonline.com.au</a>, Level 11, 905 Hay
            Street, Perth WA 6000. You&apos;ll have a written response within 30 days.
          </p>
          <p>If you&apos;re not satisfied with our answer, you can contact:</p>
          <List
            items={[
              <>
                the Australian Financial Complaints Authority (AFCA): 1800 931 678,{" "}
                <a href="https://www.afca.org.au" target="_blank" rel="noopener noreferrer" className={linkClass}>afca.org.au</a>,
                GPO Box 3, Melbourne VIC 3001; or
              </>,
              <>
                the Office of the Australian Information Commissioner (OAIC): 1300 363 992,{" "}
                <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" className={linkClass}>oaic.gov.au</a>.
              </>,
            ]}
          />
        </Section>

        <Section title="Contact us">
          <p>
            Hassan Arif, Frontline Financial Brokers:{" "}
            <a href="mailto:hassan@frontline.financial" className={linkClass}>hassan@frontline.financial</a>,{" "}
            <a href="tel:+61422959486" className={linkClass}>0422 959 486</a>, or by post to Level 49, 8 Parramatta Square,
            Parramatta NSW 2150.
          </p>
          <p>
            We update this policy when the way we handle information changes. The date at the top shows the current version.
          </p>
        </Section>

        <div className="mt-12 flex flex-wrap gap-4 print:hidden">
          <Link href="/brokers" className="inline-flex rounded-lg bg-[#00FCB8] px-5 py-2.5 text-sm font-bold text-[#0A1628] transition hover:opacity-90 sq-btn-aqua">
            Back to Brokers
          </Link>
          <Link href="/credit-guide" className="inline-flex rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10">
            Credit Guide
          </Link>
          <Link href="/privacy-consent" className="inline-flex rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10">
            Privacy Consent
          </Link>
        </div>
      </main>
      <LayoutFooter />
    </div>
  );
}
