import Link from "next/link";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import WaveDivider from "@/components/WaveDivider";

export default function CalculatorDisclaimerBrokingPage() {
  return (
    <div className="min-h-screen bg-[#F5F5EF] font-sans">
      <LayoutNav activeNav="calculators" />

      <section className="bg-[#1C5472] px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">Legal</p>
          <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">Calculator Disclaimer — Home Loans &amp; Refinance</h1>
          <p className="mt-4 text-[#39B2B2]">Frontline Financial (Broking)</p>
        </div>
      </section>

      <WaveDivider fill="#F5F5EF" />

      <section className="px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-10 text-[#1C5472]">
          <div className="rounded-lg border border-[#39B2B2]/50 bg-[#39B2B2]/10 p-6">
            <h2 className="text-lg font-bold text-[#1C5472]">Credit representative details</h2>
            <p className="mt-2 font-semibold">Frontline Financial Pty Ltd</p>
            <p className="mt-1 text-sm">Authorised Credit Representative (CRN: 575968) of Australian Credit Licence No. 389087</p>
            <p className="mt-1 text-sm">Authorised to engage in credit activities.</p>
            <p className="mt-4 text-sm">Contact: Hassan Arif — Director, Accredited Member (FBAA), Finance Broker</p>
            <p className="text-sm">Phone: <a href="tel:+61422959486" className="text-[#00FCB8] hover:underline">0422 959 486</a></p>
            <p className="text-sm">Address: 150 George St, Parramatta NSW 2150</p>
          </div>

          <div>
            <h2 className="border-l-4 border-[#00FCB8] pl-4 text-xl font-bold text-[#1C5472]">General disclaimer</h2>
            <ul className="mt-4 list-inside list-disc space-y-2 text-sm leading-relaxed">
              <li>Calculations are estimates only and are based on the accuracy of the information you enter.</li>
              <li>Results do not constitute a loan offer, pre-approval, credit approval, or financial advice.</li>
              <li>Frontline Financial Pty Ltd arranges home loan finance through authorised lenders — we do not provide credit directly.</li>
              <li>All loan applications are subject to individual lender credit approval criteria, satisfactory security, and terms and conditions.</li>
              <li>Interest rates used are indicative only and are subject to change without notice. Actual repayments may differ based on the lender&apos;s specific calculation method.</li>
              <li>The calculator does not account for all fees and charges that may apply, including but not limited to: establishment fees, ongoing account fees, valuation fees, Lenders Mortgage Insurance (LMI), legal/conveyancing costs, stamp duty, or government charges.</li>
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
                <h3 className="font-bold text-[#1C5472]">Mortgage — Principal &amp; Interest</h3>
                <p className="mt-1 font-mono text-xs text-gray-600">Monthly Repayment (M) = P × [r(1+r)^n] / [(1+r)^n − 1]</p>
                <p className="mt-2">Where: P = Loan principal, r = Monthly interest rate (annual rate ÷ 12), n = Total number of monthly payments (term in years × 12).</p>
              </div>
              <div>
                <h3 className="font-bold text-[#1C5472]">Interest-only repayment</h3>
                <p className="mt-1 font-mono text-xs text-gray-600">Monthly IO Payment = (Loan Balance − Offset Balance) × (Annual Rate ÷ 12)</p>
                <p className="mt-2">After the interest-only period, repayments revert to Principal &amp; Interest calculated on the remaining balance over the remaining term.</p>
              </div>
              <div>
                <h3 className="font-bold text-[#1C5472]">Offset account</h3>
                <p className="mt-2">Each month, interest is calculated on (Remaining Balance − Offset Balance). The repayment amount remains the same as without an offset. More of each repayment goes toward principal, so the loan is paid off faster. Assumption: the offset balance remains constant; in practice it fluctuates.</p>
              </div>
              <div>
                <h3 className="font-bold text-[#1C5472]">Loan split</h3>
                <p className="mt-2">Each split is calculated independently using its own interest rate and repayment type. Combined repayment is the sum of both. When the fixed period on Split 2 ends, it reverts to the specified revert rate and is recalculated as P&amp;I for the remaining term.</p>
              </div>
              <div>
                <h3 className="font-bold text-[#1C5472]">Repayment frequency</h3>
                <p className="mt-2">Fortnightly = Monthly repayment ÷ 2 (26 payments per year). Weekly = Monthly repayment ÷ 4 (52 payments per year). Paying fortnightly effectively makes ~13 monthly payments per year, which can reduce the loan term.</p>
              </div>
              <div>
                <h3 className="font-bold text-[#1C5472]">Refinance calculator</h3>
                <p className="mt-2">Compares total interest payable under current vs. new loan terms. Break-even = Total refinance costs ÷ monthly savings. Net savings = Total interest saved − refinance costs − break costs.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="border-l-4 border-[#00FCB8] pl-4 text-xl font-bold text-[#1C5472]">Assumptions &amp; limitations</h2>
            <ul className="mt-4 list-inside list-disc space-y-2 text-sm leading-relaxed">
              <li>Constant interest rate for the full term (unless split loan with revert rate).</li>
              <li>Does not factor in: establishment fees, ongoing fees, LMI, valuation fees, legal costs, stamp duty, or government charges.</li>
              <li>Offset calculations assume a constant offset balance. Fortnightly/weekly use simple division of the monthly amount.</li>
              <li>Tax implications and comparison rates are not provided. Redraw, additional repayments, and rate changes are not modelled.</li>
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
