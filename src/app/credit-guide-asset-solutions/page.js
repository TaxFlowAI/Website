import Link from "next/link";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";

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

export default function CreditGuideAssetSolutionsPage() {
  return (
    <div className="min-h-screen bg-[#0A1628] font-sans text-white">
      <LayoutNav activeNav="asset-solutions" />
      <main className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold text-white md:text-4xl">Credit Guide & Quote</h1>
          <a
            href="/documents/credit-guide-asset-solutions.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#00FCB8] px-5 py-2.5 text-sm font-bold text-[#0A1628] transition hover:opacity-90"
          >
            Download Credit Guide (PDF)
          </a>
        </div>

        <Section title="Key Information">
          <Card className="border-[#00FCB8]/30">
            <p className="text-[#9CA3AF] leading-relaxed">
              This Credit Guide & Quote is provided by Martyn Financial Pty Ltd t/as Frontline Financial: Asset Solutions (ABN 13 681 219 198), Authorised Credit Representative #563350 of Fintelligence Pty Ltd (ABN 80 625 017 174), Australian Credit Licence #511803. Our address is 150 George Street Parramatta NSW 2150 Australia. Our contact details are phone – <a href="tel:0450553877" className="text-white hover:text-[#00FCB8]">0450 553 877</a> and email via <a href="mailto:sham@frontline.financial" className="text-white hover:text-[#00FCB8]">sham@frontline.financial</a>.
            </p>
          </Card>
        </Section>

        <Section title="Our Credit Services" className="mt-12">
          <Card>
            <p className="text-[#9CA3AF] leading-relaxed">
              We will assist you to select a loan or lease to meet your needs. The credit providers we most commonly use are Pepper Asset Finance Pty Ltd, Secure Funding Pty Ltd (Liberty), Latitude Financial Services, WISR, Firstmac and Plenti, although we do use others.
            </p>
          </Card>
        </Section>

        <Section title="Information We Will Require From You" className="mt-12">
          <Card>
            <p className="text-[#9CA3AF] leading-relaxed">
              We are obliged to ensure any loan or lease we suggest or assist you to apply for, including an increase to an existing credit limit, is not unsuitable for your purposes. This includes if the loan or lease does not meet your requirements or objectives, if you are unable to make the repayments, or you could only do so with substantial hardship. Therefore, we will need some information from you. It is important that the information you provide is entirely accurate.
            </p>
          </Card>
        </Section>

        <Section title="Copies of Our Assessment" className="mt-12">
          <Card>
            <p className="text-[#9CA3AF] leading-relaxed">
              At any time within 7 years of us providing you with credit assistance, you may request a copy of the preliminary credit assessment. We will provide you with this documentation within 7 business days of receiving your request. However, if your request is more than 2 years after the date of our Credit Quote, we may take up to 21 business days after receiving the request.
            </p>
          </Card>
        </Section>

        <Section title="Fees Payable By You To Us" className="mt-12">
          <Card>
            <p className="text-[#9CA3AF] leading-relaxed">
              We may charge you up to $2500 (incl. GST) as an Origination Fee for our services when providing credit assistance, although this is only payable should the loan proceed. It is a one-off fee, payable at loan settlement. This fee may be paid directly to us, or part of the loan disbursements. If via loan disbursement, this will increase your loan by the fee amount.
            </p>
          </Card>
        </Section>

        <Section title="Fees Payable By You To Third Parties" className="mt-12">
          <Card>
            <p className="text-[#9CA3AF] leading-relaxed">
              When the application for a loan or lease is submitted and ultimately proceeds to settlement, you may be required to pay fees to third parties associated with the application; such as the credit provider&apos;s application fee, security registration fee, inspection fee or other fees. If applicable, these will be detailed in the Credit Proposal document and provided to you before you apply for finance. You can ask us how they are worked out.
            </p>
          </Card>
        </Section>

        <Section title="Commissions Received By Us" className="mt-12">
          <Card>
            <p className="text-[#9CA3AF] leading-relaxed">
              Commissions may be payable to us by the credit provider for any loan or lease that is settled. The amount varies between lenders and the amount of credit that you receive. These are not directly payable by you, and these will be disclosed within the Credit Proposal document that will be provided to you before applying for finance. You can ask us for an estimate of these commissions and how they are worked out.
            </p>
          </Card>
        </Section>

        <Section title="Commissions Payable By Us" className="mt-12">
          <Card>
            <p className="text-[#9CA3AF] leading-relaxed">
              If you are referred to us by a third party, we may pay that entity a commission for the introduction of your business. For example, we may pay commissions to real estate agents, car or boat dealerships and accountants. These commissions are not directly payable by you. You can ask us for an estimate of these payments and how they are worked out.
            </p>
          </Card>
        </Section>

        <Section title="Complaints" className="mt-12">
          <Card>
            <p className="text-[#9CA3AF] leading-relaxed">
              We hope that you&apos;re pleased with our service, although if you do have a complaint you can contact our Complaints Officer on – <a href="tel:0450553877" className="text-white hover:text-[#00FCB8]">0450 553 877</a> and email via <a href="mailto:sham@frontline.financial" className="text-white hover:text-[#00FCB8]">sham@frontline.financial</a> or mail to the address listed in the &apos;Key Information&apos; section above. Please provide us with as much detail as possible in your complaint so we can address promptly and hopefully resolve it to your satisfaction.
            </p>
            <p className="mt-4 text-[#9CA3AF] leading-relaxed">
              If you are not satisfied with the outcome of our attempt to resolve your complaint, you may refer the matter to the Australian Financial Complaints Authority Australia on phone <a href="tel:1800931678" className="text-white hover:text-[#00FCB8]">1800 931 678</a> or by writing to GPO Box 3 Melbourne VIC 3001. The Australian Financial Complaints Authority Australia is a no-charge external and independent dispute resolution service.
            </p>
            <dl className="mt-4 space-y-2 rounded-lg border border-white/[0.08] bg-[#0A1628] p-4 text-sm">
              <div><dt className="text-[#9CA3AF]">Name</dt><dd className="text-white">AFCA (Australian Financial Complaints Authority)</dd></div>
              <div><dt className="text-[#9CA3AF]">Phone</dt><dd><a href="tel:1800931678" className="text-white hover:text-[#00FCB8]">1800 931 678</a></dd></div>
              <div><dt className="text-[#9CA3AF]">Address</dt><dd className="text-white">GPO Box 3, Melbourne VIC 3001</dd></div>
            </dl>
          </Card>
        </Section>

        <Section title="Your Acknowledgement and Agreement" className="mt-12">
          <Card className="border-[#00FCB8]/20 bg-[#0d1f33]">
            <div className="space-y-4 text-sm text-[#9CA3AF] leading-relaxed">
              <p>
                I/We acknowledge that I/we have read the contents of this document and understand its content.
              </p>
              <p>
                I/We acknowledge and agree that I/we will pay you up to the maximum quoted fees and charges for your services if you obtain approval for our loan and it subsequently settles.
              </p>
              <p>
                I/We understand that the fees in the amount of up to a maximum of $2500 (incl. GST) will be included in the loan amount or lease repayments unless I/we have instructed otherwise.
              </p>
              <p>
                I/We acknowledge and provide my/our consent to receive this Credit Guide & Quote and any other disclosure documents such as the Credit Proposal by electronic means. The consent I/we provided is based on my/our understanding that paper disclosure documents may not be provided and therefore I/we will check nominated electronic communication means for receipt of these documents.
              </p>
              <p>
                I/We understand that I/we may withdraw my/our consent to receive these disclosure documents at any time by contacting the licensee as per above contact details.
              </p>
            </div>
          </Card>
        </Section>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/asset-solutions" className="inline-flex rounded-lg bg-[#00FCB8] px-5 py-2.5 text-sm font-bold text-[#0A1628] transition hover:opacity-90">
            Back to Asset Solutions
          </Link>
          <Link href="/privacy-consent-asset-solutions" className="inline-flex rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10">
            Privacy Consent
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
