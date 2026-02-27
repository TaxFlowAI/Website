import Link from "next/link";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import WaveDivider from "@/components/WaveDivider";

export default function CalculatorDisclaimerAssetSolutionsPage() {
  return (
    <div className="min-h-screen bg-[#F5F5EF] font-sans">
      <LayoutNav activeNav="calculators" />

      <section className="bg-[#1C5472] px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">Legal</p>
          <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">Calculator Disclaimer — Car &amp; Personal Loans</h1>
          <p className="mt-4 text-[#39B2B2]">Frontline Financial: Asset Solutions</p>
        </div>
      </section>

      <WaveDivider fill="#F5F5EF" />

      <section className="px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-10 text-[#1C5472]">
          <div className="rounded-lg border border-[#39B2B2]/50 bg-[#39B2B2]/10 p-6">
            <h2 className="text-lg font-bold text-[#1C5472]">Credit representative details</h2>
            <p className="mt-2 font-semibold">Martyn Financial Pty Ltd t/a Frontline Financial: Asset Solutions</p>
            <p className="mt-1 text-sm">Authorised Credit Representative (CRN: 563350) of Australian Credit Licence No. 511803</p>
            <p className="mt-1 text-sm">Authorised to engage in credit activities.</p>
            <p className="mt-4 text-sm">Contact: Sham — Award-winning Finance Broker, FY25</p>
            <p className="text-sm">Phone: <a href="tel:+61450553877" className="text-[#00FCB8] hover:underline">0450 553 877</a></p>
            <p className="text-sm">Address: 150 George St, Parramatta NSW 2150</p>
          </div>

          <div>
            <h2 className="border-l-4 border-[#00FCB8] pl-4 text-xl font-bold text-[#1C5472]">General disclaimer</h2>
            <ul className="mt-4 list-inside list-disc space-y-2 text-sm leading-relaxed">
              <li>Calculations are estimates only and are based on the accuracy of the information you enter.</li>
              <li>Results do not constitute a loan offer, pre-approval, credit approval, or financial advice.</li>
              <li>Martyn Financial Pty Ltd t/a Frontline Financial: Asset Solutions arranges vehicle and personal finance through authorised lenders — we do not provide credit directly.</li>
              <li>All loan applications are subject to individual lender credit approval criteria and terms and conditions.</li>
              <li>Interest rates used are indicative only and subject to change without notice.</li>
              <li>The calculator does not account for all fees and charges that may apply.</li>
            </ul>
          </div>

          <div className="rounded-lg border border-[#39B2B2]/40 bg-[#F5F5EF] p-4">
            <h2 className="font-bold text-[#1C5472]">General advice warning</h2>
            <p className="mt-2 text-sm leading-relaxed">
              This information is general in nature. It has been prepared without taking into account your personal objectives, financial situation, or needs. Before acting on this information, you should consider its appropriateness having regard to your own objectives, financial situation, and needs. You should seek independent professional advice before making any financial decisions.
            </p>
          </div>

          <div>
            <h2 className="border-l-4 border-[#00FCB8] pl-4 text-xl font-bold text-[#1C5472]">Calculation methodology</h2>
            <div className="mt-4 space-y-6 text-sm">
              <div>
                <h3 className="font-bold text-[#1C5472]">Car loan with balloon</h3>
                <p className="mt-2">Loan amount = Vehicle price − Deposit. Balloon amount = Loan amount × Balloon %. Monthly repayment calculated on (Loan amount − Balloon) over the term. The balloon is due as a lump sum at the end. Total cost = (Monthly repayment × n) + Balloon.</p>
              </div>
              <div>
                <h3 className="font-bold text-[#1C5472]">Personal loan</h3>
                <p className="mt-1 font-mono text-xs text-gray-600">Monthly Repayment (M) = P × [r(1+r)^n] / [(1+r)^n − 1]</p>
                <p className="mt-2">Where P = Loan amount, r = Monthly interest rate (annual ÷ 12), n = Total monthly payments (term × 12).</p>
              </div>
              <div>
                <h3 className="font-bold text-[#1C5472]">Repayment frequency</h3>
                <p className="mt-2">Fortnightly = Monthly ÷ 2. Weekly = Monthly ÷ 4.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="border-l-4 border-[#00FCB8] pl-4 text-xl font-bold text-[#1C5472]">Assumptions &amp; limitations</h2>
            <ul className="mt-4 list-inside list-disc space-y-2 text-sm leading-relaxed">
              <li>Constant interest rate for the full loan term.</li>
              <li>Does not account for: establishment fees, ongoing fees, insurance, registration, stamp duty on vehicle, or government charges.</li>
              <li>Balloon calculations assume the balloon is payable in full at the end of the term. Tax implications (e.g. business use or novated leases) are not considered.</li>
            </ul>
          </div>

          <p className="text-sm">
            <Link href="/privacy" className="text-[#00FCB8] hover:underline">Privacy Policy</Link>
            {" · "}
            <Link href="/financial-calculators" className="text-[#00FCB8] hover:underline">Back to calculators</Link>
          </p>
        </div>
      </section>

      <WaveDivider fill="#1C5472" />
      <LayoutFooter />
    </div>
  );
}
