import Link from "next/link";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import WaveDivider from "@/components/WaveDivider";

export default function CalculatorDisclaimerPage() {
  return (
    <div className="min-h-screen bg-[#F5F5EF] font-sans">
      <LayoutNav activeNav="calculators" />

      <section className="bg-[#1C5472] px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">Legal</p>
          <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">Calculator Disclaimer &amp; Methodology</h1>
          <p className="mt-4 text-[#39B2B2]">
            Important information about our financial calculators and how they work.
          </p>
        </div>
      </section>

      <WaveDivider fill="#F5F5EF" />

      <section className="px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-12 text-[#1C5472]">
          <div>
            <h2 className="border-l-4 border-[#00FCB8] pl-4 text-2xl font-bold text-[#1C5472]">General Disclaimer</h2>
            <ul className="mt-4 list-inside list-disc space-y-2 text-sm leading-relaxed">
              <li>Calculations provided by our calculators are <strong>estimates only</strong> and do not constitute a loan offer, pre-approval, or financial advice.</li>
              <li><strong>Frontline Financial Group</strong> (ABN 39 693 731 396) arranges finance through authorised lenders. We do not provide credit directly.</li>
              <li>Results depend on the accuracy of the information you enter. Interest rates used are indicative and subject to change.</li>
              <li>Individual lender criteria, fees, and charges apply. All loan applications are subject to lender credit approval, satisfactory security, and terms and conditions.</li>
              <li>Calculators do not account for all fees (e.g. establishment fees, ongoing fees, LMI, stamp duty, valuation fees, legal costs).</li>
            </ul>
          </div>

          <div>
            <h2 className="border-l-4 border-[#00FCB8] pl-4 text-2xl font-bold text-[#1C5472]">General Advice Warning</h2>
            <p className="mt-4 rounded-lg border border-[#39B2B2]/50 bg-[#39B2B2]/10 p-4 text-sm leading-relaxed">
              This information is general in nature. It has been prepared without taking into account your personal objectives, financial situation, or needs. Before acting on this information, you should consider its appropriateness having regard to your own objectives, financial situation, and needs. You should seek independent professional advice before making any financial decisions.
            </p>
          </div>

          <div>
            <h2 className="border-l-4 border-[#00FCB8] pl-4 text-2xl font-bold text-[#1C5472]">Calculation Methodology</h2>
            <div className="mt-4 space-y-6 text-sm">
              <div>
                <h3 className="font-bold text-[#1C5472]">Mortgage — Principal &amp; Interest (P&amp;I)</h3>
                <p className="mt-1 font-mono text-xs text-gray-600">M = P × [r(1+r)^n] / [(1+r)^n – 1]</p>
                <p className="mt-2">Where P = loan principal, r = monthly interest rate (annual ÷ 12), n = total number of monthly payments (years × 12).</p>
              </div>
              <div>
                <h3 className="font-bold text-[#1C5472]">Mortgage — Interest Only</h3>
                <p className="mt-1 font-mono text-xs text-gray-600">IO = (Loan balance − Offset balance) × Monthly rate</p>
                <p className="mt-2">Interest is calculated on the balance minus offset. After the interest-only period, the loan reverts to P&amp;I for the remaining term.</p>
              </div>
              <div>
                <h3 className="font-bold text-[#1C5472]">Offset account</h3>
                <p className="mt-2">Interest is calculated on (remaining balance − offset balance). The repayment amount stays the same; more of each repayment goes to principal, so the loan is paid off faster.</p>
              </div>
              <div>
                <h3 className="font-bold text-[#1C5472]">Repayment frequency</h3>
                <p className="mt-2">Fortnightly = Monthly repayment ÷ 2 (26 payments per year). Weekly = Monthly repayment ÷ 4 (52 payments per year).</p>
              </div>
              <div>
                <h3 className="font-bold text-[#1C5472]">Car loan with balloon</h3>
                <p className="mt-2">Standard loan amortisation with the balloon amount due at the end. Regular repayment is calculated so the balance at term end equals the balloon.</p>
              </div>
              <div>
                <h3 className="font-bold text-[#1C5472]">Compound interest (savings)</h3>
                <p className="mt-1 font-mono text-xs text-gray-600">FV = PV(1+r/n)^(nt) + PMT × [((1+r/n)^(nt) − 1) / (r/n)]</p>
                <p className="mt-2">Where PV = initial deposit, PMT = regular contribution, r = annual rate, n = compounding frequency per year, t = years.</p>
              </div>
              <div>
                <h3 className="font-bold text-[#1C5472]">Refinance</h3>
                <p className="mt-2">Comparison of total interest under current vs. new loan terms, plus refinancing costs. Break-even is the number of months until cumulative repayment savings exceed upfront costs.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="border-l-4 border-[#00FCB8] pl-4 text-2xl font-bold text-[#1C5472]">Assumptions &amp; Limitations</h2>
            <ul className="mt-4 list-inside list-disc space-y-2 text-sm leading-relaxed">
              <li>Calculations assume a constant interest rate for the full term (unless a split loan with a revert rate is used).</li>
              <li>Fees are not included: establishment fees, ongoing account fees, valuation fees, LMI, legal costs, stamp duty.</li>
              <li>Offset calculations assume a constant offset balance; in reality it fluctuates.</li>
              <li>Fortnightly and weekly calculations use simple division of the monthly amount.</li>
              <li>Tax implications are not considered. Comparison rates are not provided.</li>
              <li>The calculator does not account for redraw facilities or additional repayments.</li>
            </ul>
          </div>

          <div>
            <h2 className="border-l-4 border-[#00FCB8] pl-4 text-2xl font-bold text-[#1C5472]">Contact</h2>
            <p className="mt-4 text-sm">For personalised advice based on your specific circumstances:</p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>Phone: <a href="tel:+61422959486" className="font-medium text-[#00FCB8] hover:underline">+61 422 959 486</a></li>
              <li>Address: 150 George St, Parramatta NSW 2150</li>
              <li>Hassan Arif — Director, Accredited Member (FBAA), Finance Broker</li>
            </ul>
            <p className="mt-4 text-sm">
              <Link href="/privacy" className="font-medium text-[#00FCB8] hover:underline">Privacy Policy</Link>
              {" · "}
              <Link href="/financial-calculators" className="font-medium text-[#00FCB8] hover:underline">Back to calculators</Link>
            </p>
          </div>
        </div>
      </section>

      <WaveDivider fill="#1C5472" />
      <LayoutFooter />
    </div>
  );
}
