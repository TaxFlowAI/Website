import Link from "next/link";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";

const BROKER_DETAILS = [
  { label: "Broker/Our/Us", value: "Hassan Arif" },
  { label: "Authorised Credit Representative name and number", value: "Hassan Arif (Australian Credit Representative 553835)" },
  { label: "Organisation/Trading Name", value: "Frontline Financial" },
  { label: "Address", value: "86b Orange Street, Greystanes, NSW, 2145" },
  { label: "Mobile", value: "0422 959 486" },
  { label: "Email", value: "hassan@frontline.financial" },
  { label: "Australian Credit Licence name and number", value: "Australian Finance Group Ltd (Australian Credit Licence 389087) (Licensee)" },
  { label: "Australian Company Number of ACL holder", value: "066385822" },
];

const HOW_WE_WORK = [
  { title: "Getting to know you", text: "To kickstart your loan application, you'll need to provide some information about your goals and circumstances." },
  { title: "Let's meet", text: "We'll catch up with you to understand what matters to you and what you are looking for in a loan." },
  { title: "Let us do the work", text: "With an understanding of your requirements and objectives, we will review suitable options to find the right loan for you." },
  { title: "Presenting your loan options", text: "We'll present you with a credit proposal with tailored loan solutions and recommendations with your goals and circumstances in mind." },
  { title: "Managing your application", text: "Once you have decided to proceed with an application for a loan, you can leave it to us to lodge and manage your application." },
  { title: "Loan approval", text: "We're nearly there! We will monitor your application and let you know if your loan is approved." },
  { title: "Settlement day", text: "Congratulations! Settlement is when your loan application process is complete." },
  { title: "Here to help", text: "If your circumstances and goals happen to change, we are here to help with your future loan needs." },
];

const LENDERS_PANEL = [
  "AFG Home Loans (Align, Alpha, Bright, Edge, Link, Options, Retro)", "AMP Bank", "ANZ", "ASCF", "Australian Military Bank", "Auswide Bank", "BCU", "Bank Australia", "BankSA", "Bank of China", "Bank of Melbourne", "BOQ", "Bank of Sydney", "Bankwest", "Beyond Bank", "Commonwealth Bank", "Credit Union SA", "Firefighters Mutual Bank", "Firstmac", "Funding", "GMCU", "Granite Home Loans", "Great Southern Bank", "HSBC", "Health Professionals Bank", "Heartland Reverse Mortgages", "Hejaz", "Heritage Bank", "HomeStart", "Hume Bank", "ING", "Keystart", "La Trobe Financial", "Liberty", "ME", "Macquarie Bank", "MyState", "NAB", "Newcastle Permanent", "P&N Bank", "People's Choice", "Pepper Money", "QBank", "Queensland Country Bank", "RedZed", "Resimac", "St.George", "Suncorp", "Teachers Mutual Bank", "Capricornian Bank", "UBank", "UniBank", "Westpac", "AMMF", "Angle Finance", "AFS (Automotive Financial Services)", "GreenLight", "Alex Bank", "Latitude", "MoneyPlace", "NOW Finance", "Plenti", "SocietyOne", "Wisr",
];

const COMMONLY_USED_LICENSEE = [
  { rank: 1, name: "Macquarie Bank", pct: "13.41%" },
  { rank: 2, name: "Westpac", pct: "12.82%" },
  { rank: 3, name: "ANZ", pct: "11.68%" },
  { rank: 4, name: "Commonwealth Bank", pct: "10.34%" },
  { rank: 5, name: "NAB", pct: "9.51%" },
  { rank: 6, name: "Bankwest", pct: "5.91%" },
];

const COMMONLY_USED_US = [
  { rank: 1, name: "Commonwealth Bank", pct: "0%" },
  { rank: 2, name: "Macquarie Bank", pct: "0%" },
  { rank: 3, name: "ANZ", pct: "0%" },
  { rank: 4, name: "NAB", pct: "0%" },
  { rank: 5, name: "Bankwest", pct: "0%" },
  { rank: 6, name: "Westpac", pct: "0%" },
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

export default function CreditGuidePage() {
  return (
    <div className="min-h-screen bg-[#0A1628] font-sans text-white">
      <LayoutNav activeNav="brokers" />
      <main className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold text-white md:text-4xl">Credit Guide</h1>
          <a
            href="/documents/credit-guide.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#00FCB8] px-5 py-2.5 text-sm font-bold text-[#0A1628] transition hover:opacity-90"
          >
            Download Credit Guide (PDF)
          </a>
        </div>

        <p className="text-[#9CA3AF] leading-relaxed">
          This Credit Guide provides you with the key information that you need to know about our finance broking services offered to you.
        </p>
        <p className="mt-2 text-[#9CA3AF] leading-relaxed">
          This Credit Guide summarises our offerings, fees and commissions we may receive, and the process to follow if you have a complaint. Please don&apos;t hesitate to ask if you need more information or clarification.
        </p>

        <Section title="Broker Details" className="mt-12">
          <Card>
            <dl className="space-y-3">
              {BROKER_DETAILS.map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-1 border-b border-white/[0.08] pb-3 last:border-0 last:pb-0">
                  <dt className="text-sm font-medium text-[#9CA3AF]">{label}</dt>
                  <dd className="text-white">
                    {(label === "Mobile" && <a href="tel:+61422959486" className="hover:text-[#00FCB8]">{value}</a>) ||
                      (label === "Email" && <a href="mailto:hassan@frontline.financial" className="hover:text-[#00FCB8]">{value}</a>) ||
                      value}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        </Section>

        <Section title="We Are Here to Help" className="mt-12">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <p className="font-semibold text-[#00FCB8]">We offer choice</p>
              <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
                As a mortgage broker, we offer choice, experience and have an obligation to act in your best interests when providing credit assistance. It&apos;s why we are focused on understanding your goals and circumstances, so that we can find the right loan solution for you.
              </p>
            </Card>
            <Card>
              <p className="font-semibold text-[#00FCB8]">We offer convenience</p>
              <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
                With an understanding of what matters to you and what you are looking for, we can research home loan options on your behalf, saving you time and effort.
              </p>
            </Card>
            <Card>
              <p className="font-semibold text-[#00FCB8]">We help to progress your application</p>
              <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
                We&apos;re here to prepare and help progress your loan application, and work with our lender network to help secure your loan.
              </p>
            </Card>
          </div>
          <p className="mt-6 text-xs text-[#9CA3AF] leading-relaxed">
            Please note AFG and your mortgage broker does not provide tax, legal or accounting advice. Any information contained in this document is of a general nature only and does not take into account the objectives, financial situation or need of any particular person and is not intended to provide, and should not be relied on for, tax, legal or accounting advice. Therefore, before making any decision, you should consider the appropriateness of the information with regard to those matters and consult your own tax, legal and accounting advisors before engaging in or considering the appropriateness of any transaction.
          </p>
        </Section>

        <Section title="How We'll Work Together" className="mt-12">
          <div className="space-y-4">
            {HOW_WE_WORK.map((step, i) => (
              <Card key={i} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00FCB8] text-sm font-bold text-[#0A1628]">{i + 1}</span>
                <div>
                  <p className="font-semibold text-white">{step.title}</p>
                  <p className="mt-1 text-sm text-[#9CA3AF] leading-relaxed">{step.text}</p>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section title="Lender and Products" className="mt-12">
          <p className="text-[#9CA3AF] leading-relaxed">
            As a broker, we are able to offer choice across a number of products and have the opportunity to be accredited to arrange loans with the following lenders:
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3 md:grid-cols-4">
            {LENDERS_PANEL.map((name) => (
              <span key={name} className="rounded-lg border border-white/[0.08] bg-[#111827] px-3 py-2 text-[#9CA3AF]">
                {name}
              </span>
            ))}
          </div>
          <p className="mt-6 text-xs text-[#9CA3AF] leading-relaxed">
            As at 04/02/2026. The lenders listed above are part of our aggregator&apos;s, Australian Finance Group Ltd (AFG), lender panel through which we submit loan applications. In order to submit loan applications to these lenders, a broker is required to be accredited with that lender. We are not accredited with each of the lenders listed above. Typically, brokers are accredited with 10 to 15 lenders. If we are not accredited with a lender in the panel above, we can refer you to another AFG broker who is accredited with that lender. Please contact me for further information.
          </p>
        </Section>

        <Section title="Commonly Used Lenders by Licensee" className="mt-12">
          <p className="text-[#9CA3AF] leading-relaxed">
            The list below documents the 6 most commonly used lenders by our Licensee in the previous 12 months. This does not necessarily reflect all of the financial institutions that our Licensee is able to conduct business through.
          </p>
          <Card className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.08] text-[#9CA3AF]">
                  <th className="pb-3 pr-4 font-medium">Rank</th>
                  <th className="pb-3 pr-4 font-medium">Financial Institution</th>
                  <th className="pb-3 font-medium">% of applications (past 12 months)</th>
                </tr>
              </thead>
              <tbody>
                {COMMONLY_USED_LICENSEE.map((row) => (
                  <tr key={row.rank} className="border-b border-white/[0.08] last:border-0">
                    <td className="py-3 pr-4 text-white">{row.rank}</td>
                    <td className="py-3 pr-4 text-white">{row.name}</td>
                    <td className="py-3 text-[#9CA3AF]">{row.pct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </Section>

        <Section title="Fees, Charges, Commission and Disclosures" className="mt-12">
          <Card className="space-y-6">
            <div>
              <p className="font-semibold text-white">Fees payable by you to third parties:</p>
              <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
                When the loan application is submitted, you may need to pay the lender&apos;s application fee, valuation fees, or other fees that are associated with the loan application process, even if application for the loan is ultimately unsuccessful.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">Fees payable by you to us or the Licensee:</p>
              <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
                If a fee is payable by you, this will be disclosed in a Credit Quote that will be provided to you. If a Credit Quote is not supplied, this will indicate that we do not charge consumers any fees.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">Payments received by us or the Licensee:</p>
              <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
                We, and our Licensee or aggregator Australian Finance Group Ltd (AFG), may receive fees, commissions, or financial rewards from lenders or lessors in connection with any finance we arrange for you. These fees are not payable by you.
              </p>
              <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
                The commission / brokerage amount depends on the amount of the finance and may vary from product to product. We can provide you with information about a reasonable estimate of those commissions and how the commission is worked out if you require.
              </p>
              <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
                Commissions are paid based on a percentage of the loan balance that is drawn down which in most cases will be net of any amounts you hold in an offset account. The way commissions are calculated and paid to us by lenders may vary. By following the responsible lending requirements, we will ensure the loan recommended to you is not unsuitable for your situation and objectives.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">Fees payable by us to third parties:</p>
              <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
                We may pay fees to call centre companies, real estate agents, accountants, or lawyers and others for referring you to us. These referral fees are generally small amounts in accordance with usual business practice. These are not fees payable by you. On request you can obtain a reasonable estimate of the amount of the fee and how it is worked out. From time to time, we may also remunerate other parties through payments, rewards or benefits.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">Tiered Servicing Arrangements:</p>
              <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
                Through our relationships with lenders, we may have access to tiered servicing arrangements. The benefits of this access to these arrangements can include faster processing, better information or greater levels of assistance provided for obtaining loan approval. We will advise you of any tiered service arrangements that are in place with a particular lender that we have proposed at the time recommendations are made.
              </p>
              <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
                Access to this program is not based solely on the volume of new or existing lending our clients have with each respective lender and does not entitle us to any additional commissions or payments outside of what we have disclosed to you, or any preferential client discounts.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">Other disclosures, benefits or interests we or others may receive:</p>
              <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
                We are prohibited from accepting gifts or inducements over $300. Any benefit given to your broker greater than $100 and less than $350 will be recorded in a Gifts Register. A copy of our register is available to inspect on request. If you wish to inspect the register, please contact us.
              </p>
            </div>
          </Card>
        </Section>

        <Section title="Other Disclosures" className="mt-12">
          <Card className="space-y-6">
            <div>
              <p className="font-semibold text-white">Referrals:</p>
              <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
                We may receive referrals from a range of sources, including accountants, financial planners, real estate agents and others. If you were introduced or referred to us, we may pay the referrer a commission, fee or remunerate them in other ways. Details of any commission or fees being paid to the referrer will be included in the Credit Proposal Disclosure document provided to you.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">Credit & Valuation Reports:</p>
              <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
                We may be provided access to free services such as credit report and valuations from our lenders. Details of any relevant services we may receive because of a recommendation we make to you, will be included in the Credit Proposal Disclosure document we provide to you.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">Multiple Roles:</p>
              <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
                We may act in other roles or capacities related to the credit assistance provided to you. Each business activity is separate however we may be paid remuneration in our other business activities as a result of the credit assistance provided to you. Further details of any relevant remuneration we may receive because of a recommendation we make to you, will be included in the Credit Proposal Disclosure document we provide to you. Where we are unable to act due to a conflict of interest that cannot be managed appropriately, I will refer you to another party who will provide you services.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">Related Parties:</p>
              <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
                We have relationships with a number of related parties and associates. Details of any remuneration or possible conflicts will be included in the Credit Proposal Disclosure document provided to you.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">Shareholding:</p>
              <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
                We may directly or indirectly hold shares or other securities in AFG or the lenders we recommend. Details of any material holdings will be included in the Credit Proposal Disclosure document provided to you. If the material holding does not enable us to act due to a conflict of interest that cannot be managed appropriately, we will refer you to another party who will provide you services.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">Ownership Structures:</p>
              <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
                I may act in other roles or capacities related to the credit assistance I provide to you. Each business activity is separate however I may be paid remuneration in my other business activities as a result of the credit assistance we provide to you. Further details any will be included in the Credit Proposal Disclosure document I provide to you. Where I am unable to act in more than one capacity, I will refer you to another party who will provide you services that I am unable to due to a conflict of interest that cannot be managed appropriately by me.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">AFG & AFG Home Loans:</p>
              <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
                AFG Home Loans Pty Ltd (including AFG Securities Pty Ltd) are wholly owned subsidiaries of AFG. AFG may receive additional remuneration for any white label AFG Home Loans or securitised AFG Securities products that are settled. The remuneration received is in addition to those amounts paid to AFG as a mortgage broker aggregator and/or licensee. Details of this remuneration will be disclosed in your AFG Home Loan documentation.
              </p>
            </div>
          </Card>
        </Section>

        <Section title="About Credit Representatives" className="mt-12">
          <p className="text-[#9CA3AF] leading-relaxed">
            We are authorised to engage in credit activities by the Licensee, Australian Finance Group Ltd. As Licensee, they share responsibility in the credit assistance we provide to you.
          </p>
          <p className="mt-4 text-[#9CA3AF] leading-relaxed">
            The list below documents the 6 lenders most commonly used by us in the previous 12 months. The lenders disclosed below may be different to the lenders that the Licensee has already disclosed above. This may be due to different accreditation requirements or different types of consumers. The list below does not necessarily reflect all the financial institutions that we are able to conduct business through.
          </p>
          <Card className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.08] text-[#9CA3AF]">
                  <th className="pb-3 pr-4 font-medium">Rank</th>
                  <th className="pb-3 pr-4 font-medium">Financial Institution</th>
                  <th className="pb-3 font-medium">% of applications (past 12 months)</th>
                </tr>
              </thead>
              <tbody>
                {COMMONLY_USED_US.map((row) => (
                  <tr key={row.rank} className="border-b border-white/[0.08] last:border-0">
                    <td className="py-3 pr-4 text-white">{row.rank}</td>
                    <td className="py-3 pr-4 text-white">{row.name}</td>
                    <td className="py-3 text-[#9CA3AF]">{row.pct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <p className="mt-4 text-xs text-[#9CA3AF] leading-relaxed">
            *The Top 6 lenders are based on the total volume of loans lodged in the last 12 months. Where I may not be accredited with 6 lenders the balance of lenders is made up of the top 6 lenders of my licensee.
          </p>
          <p className="mt-2 text-xs text-[#9CA3AF] leading-relaxed">
            **The % of loans is based on the total loans lodged over the past 12 months. This will not add up to 100% where I have lodged to lenders outside of my top 6.
          </p>
          <p className="mt-4 text-sm text-[#9CA3AF] leading-relaxed">
            <strong className="text-white">How are we paid?</strong> We may receive a whole or part of the commissions received by the Licensee referred to above. This may be paid to us directly or indirectly from the Licensee. You may obtain from us information about a reasonable estimate of those commissions and how the commission is worked out if you wish.
          </p>
          <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
            Commissions are paid based on a percentage of the loan balance that is drawn down; which in most cases will be net of any amounts you hold in an offset account. The way commissions are calculated and paid to your broker by lenders may vary. By following the responsible lending requirements your broker will ensure the loan recommended to you is not unsuitable for your situations and objectives.
          </p>
          <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
            <strong className="text-white">Fees payable to third parties by us:</strong> The information set out above in relation to referral fees and other fees payable to third parties also applies to us. On request you can obtain a reasonable estimate of the amount of the fee and how it is worked out.
          </p>
        </Section>

        <Section title="Complaints" className="mt-12">
          <div className="space-y-6">
            <Card>
              <p className="font-semibold text-[#00FCB8]">Step 1:</p>
              <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
                Most complaints arise from miscommunication and can usually be fixed quickly. So, please contact Hassan first and express your concerns. You can request a written response at this time, even if the complaint is resolved in the first 5 working days.
              </p>
            </Card>
            <Card>
              <p className="font-semibold text-[#00FCB8]">Step 2:</p>
              <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
                If the issue is not satisfactorily resolved within 5 working days by talking with Hassan, we will apply our internal complaints process to manage your complaint appropriately. In this instance, the complaint will be internally escalated to our Complaints Officer. You may also contact the Complaints Officer directly.
              </p>
              <dl className="mt-4 space-y-2 rounded-lg border border-white/[0.08] bg-[#0A1628] p-4 text-sm">
                <div><dt className="text-[#9CA3AF]">Name</dt><dd className="text-white">Complaints Manager</dd></div>
                <div><dt className="text-[#9CA3AF]">Phone</dt><dd><a href="tel:0894207888" className="text-white hover:text-[#00FCB8]">08 9420 7888</a></dd></div>
                <div><dt className="text-[#9CA3AF]">Email</dt><dd><a href="mailto:compliance@afgonline.com.au" className="text-white hover:text-[#00FCB8]">compliance@afgonline.com.au</a></dd></div>
                <div><dt className="text-[#9CA3AF]">Address</dt><dd className="text-white">Level 11, 905 Hay Street, Perth, WA, 6000</dd></div>
              </dl>
              <p className="mt-4 text-xs text-[#9CA3AF] leading-relaxed">
                In some instances we may also be fulfilling the role of the Complaints Officer. This will not affect the capacity to have your complaint dealt with appropriately. By using our internal complaints process we hope to assist you to resolve your complaint quickly and fairly. The maximum timeframe in which to provide a written response to you is 30 days, although in pursuit of best practice and the reputation of our organisation, we aim to resolve these issues in a much shorter time frame.
              </p>
            </Card>
            <Card>
              <p className="font-semibold text-[#00FCB8]">Step 3:</p>
              <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
                Although we try hard to resolve a client&apos;s concern in the most considerate and direct manner, if you are not completely satisfied after the above steps have been attempted, you still have other avenues available to resolve the dispute. This is then managed externally and independently.
              </p>
              <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">
                The Australian Securities and Investments Commission external dispute resolution (EDR) process is available to you, at no cost at the contact details below.
              </p>
              <dl className="mt-4 space-y-2 rounded-lg border border-white/[0.08] bg-[#0A1628] p-4 text-sm">
                <div><dt className="text-[#9CA3AF]">Name</dt><dd className="text-white">AFCA (Australian Financial Complaints Authority)</dd></div>
                <div><dt className="text-[#9CA3AF]">Phone</dt><dd><a href="tel:1800931678" className="text-white hover:text-[#00FCB8]">1800 931 678</a></dd></div>
                <div><dt className="text-[#9CA3AF]">Email</dt><dd><a href="mailto:info@afca.org.au" className="text-white hover:text-[#00FCB8]">info@afca.org.au</a></dd></div>
                <div><dt className="text-[#9CA3AF]">Online</dt><dd><a href="https://www.afca.org.au" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#00FCB8]">www.afca.org.au</a></dd></div>
                <div><dt className="text-[#9CA3AF]">Address</dt><dd className="text-white">Australian Financial Complaints Authority, GPO Box 3, Melbourne VIC 3001</dd></div>
              </dl>
            </Card>
          </div>
        </Section>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/brokers" className="inline-flex rounded-lg bg-[#00FCB8] px-5 py-2.5 text-sm font-bold text-[#0A1628] transition hover:opacity-90">
            Back to Brokers
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
