"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import { CREDIT_PROVIDERS } from "./credit-providers";

const USE_INFO_LIST = [
  "assess and verify your identity and financial situation;",
  "assess your credit application or your suitability as a guarantor to a credit application;",
  "provide such information to a guarantor or related applicant;",
  "exchange your information with a credit reporting body;",
  "disclose your information to credit providers as set out in our 'Credit Provider Schedule' to arrange credit;",
  "disclose your information to our aggregation partners as set out in the Aggregation Partners section of this document;",
  "disclose your information to an insurer to arrange insurance you wish to obtain;",
  "obtain from, and disclose to, third parties such as your employer, landlord, real estate agent, lending institution, and guarantor who are deemed as reasonably necessary to arrange finance and/or insurance; and",
  "refer you to other organisations, service providers, or business partners or obtain referrals from them to you.",
];

const AUTHORITY_LIST = [
  "where you are the borrower — obtaining information or a report about your commercial activities or commercial credit worthiness for the purpose of assessing your application from any business which provides information about the commercial credit worthiness of persons (this includes a credit reporting body);",
  "where you are the borrower — giving to and obtaining from any credit provider named in your credit application or in a credit report on you issued by a credit reporting agency, information about your credit arrangements for the purposes of: assessing your application for credit; notifying a default by you; allowing another credit provider to ascertain the status of your finance arrangements with us where you are in default with one or more other credit providers; and generally assessing your credit worthiness;",
  "where you are the borrower — disclosing personal and credit information to a person you have nominated to act as guarantor for the purpose of the guarantor considering whether to offer to act as a guarantor or offer property as security for the credit; and",
  "where you are the guarantor — obtaining a report about your credit worthiness from a credit reporting body for the purpose of assessing whether to accept you as a guarantor.",
];

const DISCLOSURES_LIST = [
  "a. potential credit providers and/or insurers as part of our credit assistance process;",
  "b. third parties to verify the details provided are correct, including with your agents, guardians, attorneys and employers;",
  "c. our related body corporates, assignees, agents, contractors, and advisers;",
  "d. law enforcement, government, and regulatory bodies;",
  "e. any person who refers you to us for credit assistance;",
  "f. joint applicants and guarantors;",
  "g. any financial institution to, or from which a payment is made;",
  "h. debt collection agencies; and",
  "i. anyone who refers you to us.",
];

const RIGHTS_LIST = [
  "that we provide you with the personal and credit information we hold about you;",
  "that we correct any personal and credit information we hold about you that is shown to be incorrect;",
  "for copies of our Privacy Policy and this document;",
  "the credit reporting body does not use your personal information for assessment purposes or direct marketing; and",
  "the credit reporting body provides you with a copy of information it holds about you.",
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

export default function PrivacyConsentAssetSolutionsPage() {
  const [search, setSearch] = useState("");

  const filteredProviders = useMemo(() => {
    if (!search.trim()) return CREDIT_PROVIDERS;
    const q = search.trim().toLowerCase();
    return CREDIT_PROVIDERS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.abn.replace(/\s/g, "").includes(q.replace(/\s/g, "")) ||
        p.website.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-[#0A1628] font-sans text-white">
      <LayoutNav activeNav="asset-solutions" />
      <main className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold text-white md:text-4xl">Privacy Consent</h1>
          <a
            href="/documents/privacy-consent-asset-solutions.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#00FCB8] px-5 py-2.5 text-sm font-bold text-[#0A1628] transition hover:opacity-90"
          >
            Download Privacy Consent (PDF)
          </a>
        </div>

        <Section title="Intro / Entity Details">
          <Card className="space-y-4">
            <p className="text-[#9CA3AF] leading-relaxed">
              Martyn Financial Pty Ltd t/as Frontline Financial: Asset Solutions (ABN 13 681 219 198), Authorised Credit Representative #563350 of Fintelligence Pty Ltd (ABN 80 625 017 174), Australian Credit Licence #511803 (referred to as &quot;Frontline Financial: Asset Solutions&quot;/we/us).
            </p>
            <p className="text-[#9CA3AF] leading-relaxed">
              By signing this document, you agree we can collect, hold, use and exchange personal and credit information about you for these stated purposes. The Privacy Policy also contains information on how you can complain about a breach of the privacy laws, how you can access or request to correct your personal and credit information that we hold about you and how to have that information amended.
            </p>
            <p className="text-[#9CA3AF] leading-relaxed">
              Frontline Financial: Asset Solutions will collect, store, disclose and use personal information and credit information that you provide to us in accordance with the terms of this Privacy Consent and our Privacy Policy. You may obtain a copy of our Privacy Policy by contacting us on <a href="tel:0450553877" className="text-white hover:text-[#00FCB8]">0450 553 877</a> or by emailing us at <a href="mailto:sham@frontline.financial" className="text-white hover:text-[#00FCB8]">sham@frontline.financial</a>.
            </p>
          </Card>
        </Section>

        <Section title="What Is Personal Information?" className="mt-12">
          <Card>
            <p className="text-[#9CA3AF] leading-relaxed">
              Personal information is information or an opinion about an identifiable or reasonably identifiable person. The personal information we will collect and hold will include your name, date of birth, gender, telephone number, address, email, employment details and any other information we may need to identify you.
            </p>
          </Card>
        </Section>

        <Section title="What Is Credit Information?" className="mt-12">
          <Card>
            <p className="text-[#9CA3AF] leading-relaxed">
              Credit information is personal information that relates to credit that a person has applied for or has been provided. The credit information that we will collect from you may include your records of credit that you have applied for (including the name of the credit provider, the type of credit and the amount of credit), default information or any other information that has a bearing on your credit worthiness used to determine your eligibility for credit. Credit information also includes credit reporting information supplied to us by a credit reporting body and any information that we derive from it.
            </p>
          </Card>
        </Section>

        <Section title="How We Use Your Information" className="mt-12">
          <p className="text-[#9CA3AF] leading-relaxed">We will collect, hold, disclose and use your personal and credit information to:</p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-[#9CA3AF]">
            {USE_INFO_LIST.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-[#9CA3AF] leading-relaxed">
            We may not be able to proceed with credit assistance without the ability to collect, hold, disclose and use your personal and credit information.
          </p>
        </Section>

        <Section title="Identity & Financial Situation Verification" className="mt-12">
          <Card>
            <p className="text-[#9CA3AF] leading-relaxed">
              We are required by the Anti-Money Laundering and Counter-Terrorism Financing Act 2006 (Cth) to collect and use personal and credit information from you in order to identify you. We are also required by the National Consumer Credit Protection Act 2009 (Cth) to collect credit information and personal information about you and take reasonable steps to verify this, including your financial situation. This verification may include enquiring via a credit reporting body.
            </p>
          </Card>
        </Section>

        <Section title="Authority To Make Requests" className="mt-12">
          <p className="text-[#9CA3AF] leading-relaxed">
            You authorise us to make requests for personal and credit information from credit providers and credit reporting bodies. By signing this Privacy Consent, you consent to the credit providers listed in the schedule to this consent doing any of the following:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-[#9CA3AF]">
            {AUTHORITY_LIST.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-[#9CA3AF] leading-relaxed">
            You acknowledge and agree that the information referred to above can include any information about your personal and/or commercial credit worthiness, credit standing, credit history or credit capacity which the Privacy Act 1988 (Cth) allows credit providers to give to or receive from each other.
          </p>
        </Section>

        <Section title="Credit Reporting Bodies" className="mt-12">
          <Card>
            <div className="space-y-4 text-sm text-[#9CA3AF] leading-relaxed">
              <p>We may exchange personal and credit information with a credit reporting body as detailed below:</p>
              <ul className="list-inside list-disc space-y-1">
                <li>disclosure of details such as name, date of birth and address to obtain a credit report on the applicant or guarantor in our capacity as an access seeker in the credit assistance process;</li>
                <li>use any information provided by a credit reporting body to assist us in conducting a preliminary assessment of a proposed credit application and its suitability to the applicant; and</li>
                <li>request a credit reporting body to provide us with an assessment of whether information provided by the applicant or guarantor matches that in the credit report to verify the identity of applicant and/or guarantor.</li>
              </ul>
              <p>
                Our current credit reporting body is Equifax. You can contact them on phone <a href="tel:138332" className="text-white hover:text-[#00FCB8]">13 8332</a> during opening hours of Mon-Fri 8.30am to 6.00pm Eastern Standard Time, or via their website <a href="https://www.equifax.com.au" target="_blank" rel="noopener noreferrer" className="text-[#00FCB8] hover:underline">www.equifax.com.au</a>. You can also obtain their Privacy Policy from their website at <a href="https://www.equifax.com.au" target="_blank" rel="noopener noreferrer" className="text-[#00FCB8] hover:underline">www.equifax.com.au</a>.
              </p>
            </div>
          </Card>
        </Section>

        <Section title="Disclosures" className="mt-12">
          <p className="text-[#9CA3AF] leading-relaxed">We will disclose or exchange your personal and credit information to the following persons:</p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-[#9CA3AF]">
            {DISCLOSURES_LIST.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-[#9CA3AF] leading-relaxed">We will not disclose your personal and credit information to any overseas recipient.</p>
        </Section>

        <Section title="Your Rights" className="mt-12">
          <p className="text-[#9CA3AF] leading-relaxed">You have the right to ask:</p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-[#9CA3AF]">
            {RIGHTS_LIST.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-[#9CA3AF] leading-relaxed">
            To access and/or seek correction of your personal or credit information we hold, or make a complaint about privacy, you can contact us on phone number <a href="tel:0450553877" className="text-white hover:text-[#00FCB8]">0450 553 877</a> or by emailing us at <a href="mailto:sham@frontline.financial" className="text-white hover:text-[#00FCB8]">sham@frontline.financial</a> or registered post to 150 George Street Parramatta NSW 2150 Australia.
          </p>
        </Section>

        <Section title="Marketing" className="mt-12">
          <Card>
            <p className="text-[#9CA3AF] leading-relaxed">
              We would like to contact you from time to time with marketing information about the products and services we provide. You can opt-out of receiving direct marketing communication from us at any time.
            </p>
            <p className="mt-4 text-[#9CA3AF] leading-relaxed">
              If you do NOT want to receive marketing information from us, please email <a href="mailto:sham@frontline.financial" className="text-white hover:text-[#00FCB8]">sham@frontline.financial</a>.
            </p>
          </Card>
        </Section>

        <Section title="Electronic Communication" className="mt-12">
          <Card>
            <div className="space-y-4 text-[#9CA3AF] leading-relaxed">
              <p>
                If you provide us with an email address or mobile phone number, you consent for us to use these details to send you, or make available to you, notices and relevant documents, including those from a credit provider or insurer. You are therefore responsible for maintaining appropriate software, hardware and associated processes to receive, access, review, print and save copies of such documents.
              </p>
              <p>
                This consent applies to all types of communication that is permitted by law to occur electronically. Therefore, paper (hard copy) documents may not be provided to you, unless we are obliged to by law. You must regularly check advised electronic communication mediums for communication from us. If your details change, you must promptly notify us.
              </p>
              <p>
                If you wish to withdraw your consent to electronic communication, please notify us on phone number <a href="tel:0450553877" className="text-white hover:text-[#00FCB8]">0450 553 877</a> or by emailing us at <a href="mailto:sham@frontline.financial" className="text-white hover:text-[#00FCB8]">sham@frontline.financial</a> or registered post to 150 George Street Parramatta NSW 2150 Australia.
              </p>
            </div>
          </Card>
        </Section>

        <Section title="Credit Provider Schedule" className="mt-12">
          <Card>
            <div className="space-y-4 text-sm text-[#9CA3AF] leading-relaxed">
              <p>
                We may submit a credit application to credit providers listed in our &apos;Credit Provider Schedule&apos;. If a credit provider holds pertinent credit eligibility information, the credit provider must share this information with us, yourself or someone you have authorised to act on your behalf.
              </p>
              <p>
                Credit providers may also engage directly with a credit reporting body to make a credit enquiry and you can ascertain the details on this and how they handle personal and credit information via their websites which are listed in our &apos;Credit Provider Schedule&apos;. If your credit application proceeds with a credit provider you may be asked again for your consent to collect, store and use and disclose your personal and credit information by this credit provider.
              </p>
              <p>
                Credit providers may provide your personal information (including information about your driver licence or passport) to an organisation providing verification of your identity, (including credit reporting bodies), to request an assessment of whether that information matches information held by the issuer of the identification document via the use of third party systems (this may also include electronic identity verification). Alternative means of verifying your identity may be available.
              </p>
            </div>
          </Card>
          <div className="mt-4">
            <label htmlFor="credit-provider-search" className="sr-only">Search credit providers</label>
            <input
              id="credit-provider-search"
              type="search"
              placeholder="Search by name, ABN or website..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-white/[0.08] bg-[#111827] px-4 py-2.5 text-white placeholder-[#6B7280] focus:border-[#00FCB8] focus:outline-none focus:ring-1 focus:ring-[#00FCB8]"
            />
            <p className="mt-2 text-xs text-[#9CA3AF]">
              Showing {filteredProviders.length} of {CREDIT_PROVIDERS.length} credit providers
            </p>
          </div>
          <div className="mt-4 overflow-x-auto rounded-xl border border-white/[0.08] bg-[#111827]">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.08] text-[#9CA3AF]">
                  <th className="px-4 py-3 font-medium">Credit Provider</th>
                  <th className="px-4 py-3 font-medium">ABN / ACN</th>
                  <th className="px-4 py-3 font-medium">Website</th>
                </tr>
              </thead>
              <tbody>
                {filteredProviders.map((row, i) => (
                  <tr key={i} className={`border-b border-white/[0.06] last:border-0 ${i % 2 === 1 ? "bg-white/[0.02]" : ""}`}>
                    <td className="px-4 py-3 text-white">{row.name}</td>
                    <td className="px-4 py-3 text-[#9CA3AF]">{row.abn}</td>
                    <td className="px-4 py-3">
                      <a href={row.website} target="_blank" rel="noopener noreferrer" className="text-[#00FCB8] hover:underline">
                        {row.website.replace(/^https?:\/\//, "")}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Aggregation Partners" className="mt-12">
          <Card>
            <p className="text-[#9CA3AF] leading-relaxed">
              We have finance aggregation arrangements with the following entities who assist us in having access to a wide range of credit providers. We may utilise their systems as part of our credit assistance process and other platforms for potential ongoing client contact. We may also share your details as part of compliance audits.
            </p>
            <ul className="mt-4 list-inside list-disc text-[#9CA3AF]">
              <li>Fintelligence Pty Ltd (ABN 80 625 017 174), Australian Credit Licence #511803</li>
            </ul>
          </Card>
        </Section>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/asset-solutions" className="inline-flex rounded-lg bg-[#00FCB8] px-5 py-2.5 text-sm font-bold text-[#0A1628] transition hover:opacity-90">
            Back to Asset Solutions
          </Link>
          <Link href="/credit-guide-asset-solutions" className="inline-flex rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10">
            Credit Guide & Quote
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
