import Link from "next/link";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import { LegalPrintSource } from "@/components/LegalPdfButton";
import { PRIVACY_POLICY_UPDATED } from "@/config/consent";

/* Both Frontline businesses and this website (not /taxflow, which has its own policy).
   Keep it true: when a form, tool or service provider changes, update the lists below and
   PRIVACY_POLICY_UPDATED in src/config/consent.js (each lead's consent record quotes it). */

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
      <LayoutNav activeNav="home" />
      <main className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <h1 className="text-3xl font-bold text-white md:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-[#9CA3AF]">Updated {PRIVACY_POLICY_UPDATED}</p>
        <LegalPrintSource path="/privacy-policy" asAt={PRIVACY_POLICY_UPDATED} />

        <Section title="Who we are" className="mt-10">
          <p>
            Two businesses work together as Frontline Financial, from Level 49, 8 Parramatta Square, Parramatta NSW 2150:
          </p>
          <List
            items={[
              <>
                <span className={strong}>Home loans:</span> Frontline Financial Pty Ltd (ABN 39 693 731 396) trading as
                Frontline Financial Brokers, Authorised Credit Representative 575968 of Australian Finance Group Ltd (AFG),
                Australian Credit Licence 389087.
              </>,
              <>
                <span className={strong}>Vehicle, equipment, personal and business finance:</span> Martyn Financial Pty Ltd
                (ABN 13 681 219 198) trading as Frontline Financial: Asset Solutions, Authorised Credit Representative 563350 of
                Fintelligence Pty Ltd, Australian Credit Licence 511803.
              </>,
            ]}
          />
          <p>
            In this policy, &quot;we&quot; means the business you deal with. It covers this website and how both businesses
            handle your personal information, including credit information. We handle it in line with the Australian Privacy
            Principles in the Privacy Act 1988 and, for credit information, Part IIIA of that Act and the Credit Reporting Code.
          </p>
          <p>
            When you apply for finance, you also sign a privacy consent for the business helping you: AFG&apos;s{" "}
            <Link href="/privacy-consent" className={linkClass}>Privacy Disclosure Statement and Consent</Link> for home loans,
            or our <Link href="/privacy-consent-asset-solutions" className={linkClass}>Privacy Consent</Link> for Asset
            Solutions. That consent, and our licensee&apos;s own privacy policy, apply as well as this one.
          </p>
          <p>
            The TaxFlowAI pages at frontline.financial/taxflow belong to a separate accounting business, with its{" "}
            <Link href="/taxflow/privacy-policy" className={linkClass}>own privacy policy</Link>.
          </p>
        </Section>

        <Section title="What we collect">
          <List
            items={[
              <>
                <span className={strong}>When you fill in a form on this website:</span> your name, email and mobile, and what
                you tell us about the finance you need, such as the type of loan and amount, the vehicle or property, your
                postcode, how long you&apos;ve had an ABN, and your answers to our questions.
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
                <span className={strong}>When you tick a consent box on our forms:</span> the wording you agreed to, the
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
              "To keep the records the law and our licensees require, and to handle complaints.",
              "To run and improve this website and see which of our ads work.",
              "To tell you about products and services that may help you. You can opt out at any time.",
            ]}
          />
          <p>If you don&apos;t give us the information we ask for, we may not be able to help you.</p>
        </Section>

        <Section title="Who we share it with">
          <List
            items={[
              "The lenders you apply to, and providers of related products such as insurance, if you want them.",
              "Our licensees: AFG for home loans and Fintelligence for Asset Solutions. Their systems are how we lodge applications, and they check our work.",
              "Credit reporting bodies (currently Equifax) and identity verification services.",
              "People you authorise, such as your accountant, solicitor, conveyancer, valuer or real estate agent.",
              "The person or business who referred you to us, where your privacy consent allows it.",
              "The other Frontline business, if you ask about something it handles.",
              "Courts, regulators and government agencies, where the law requires it.",
            ]}
          />
          <p>We also use service providers that hold or process information for us:</p>
          <List
            items={[
              "website hosting (Vercel) and email delivery from our website forms (Resend);",
              "our client management systems: Broker Engine for home loans and Ambition Cloud for Asset Solutions;",
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
            With your consent, we may get your credit report from a credit reporting body (currently Equifax) to understand your
            position and prepare your application. We give the credit reporting body only the identity details it needs to find
            your file.
          </p>
          <p>
            You can ask a credit reporting body for a free copy of your credit report, ask it not to use your information to
            pre-screen you for direct marketing, or ask it to freeze your file for a time if you believe you have been, or are
            about to be, a victim of fraud. Equifax: 13 8332,{" "}
            <a href="https://www.equifax.com.au" target="_blank" rel="noopener noreferrer" className={linkClass}>
              equifax.com.au
            </a>
            .
          </p>
        </Section>

        <Section title="Automated decisions and AI">
          <p>
            We don&apos;t make decisions about you by computer program alone. A person on our team reviews every enquiry and
            application. We may use software, including AI tools, to help organise information and prepare documents, and
            someone on our team checks that work. Lenders and our licensees may use automated tools in their own assessments,
            and their privacy policies explain how.
          </p>
        </Section>

        <Section title="Keeping it safe">
          <p>
            We keep your information in password-protected systems that only our team and our service providers can reach, and
            we take reasonable steps to protect it from misuse, interference, loss, and unauthorised access, change or
            disclosure. We keep credit assistance records for at least 7 years, as the law requires. When we no longer need
            information, we destroy it or remove anything that identifies you.
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
            If you&apos;re unhappy with how we&apos;ve handled your information, contact us first. We&apos;ll confirm we have your
            complaint and aim to resolve it within 30 days.
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
          <List
            items={[
              <>
                <span className={strong}>Home loans (Frontline Financial Brokers):</span>{" "}
                <a href="mailto:hassan@frontline.financial" className={linkClass}>hassan@frontline.financial</a>,{" "}
                <a href="tel:+61422959486" className={linkClass}>0422 959 486</a>
              </>,
              <>
                <span className={strong}>Vehicle, equipment, personal and business finance (Frontline Financial: Asset Solutions):</span>{" "}
                <a href="mailto:sham@frontline.financial" className={linkClass}>sham@frontline.financial</a>,{" "}
                <a href="tel:0450553877" className={linkClass}>0450 553 877</a>
              </>,
              "By post: Level 49, 8 Parramatta Square, Parramatta NSW 2150.",
            ]}
          />
          <p>
            We update this policy when the way we handle information changes. The date at the top shows the current version.
          </p>
        </Section>

        <div className="mt-12 flex flex-wrap gap-4 print:hidden">
          <Link href="/" className="inline-flex rounded-lg bg-[#00FCB8] px-5 py-2.5 text-sm font-bold text-[#0A1628] transition hover:opacity-90">
            Home
          </Link>
          <Link href="/credit-guide" className="inline-flex rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10">
            Home loans Credit Guide
          </Link>
          <Link href="/credit-guide-asset-solutions" className="inline-flex rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10">
            Asset Solutions Credit Guide &amp; Quote
          </Link>
        </div>
      </main>
      <LayoutFooter />
    </div>
  );
}
