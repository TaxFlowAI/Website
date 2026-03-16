"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import WaveDivider from "@/components/WaveDivider";
import SliderInput from "@/components/calculators/SliderInput";
import NumericInput from "@/components/calculators/NumericInput";
import { ComplianceEntityContext } from "@/context/ComplianceEntityContext";
import { ENTITY } from "@/config/entities";

const TABS = [
  { id: "mortgage", label: "Mortgage", icon: "🏠", entity: "broking" },
  { id: "refinance", label: "Refinance", icon: "🔄", entity: "broking" },
  { id: "car", label: "Car Loan", icon: "🚗", entity: "asset" },
  { id: "personal", label: "Personal Loan", icon: "💰", entity: "asset" },
];

function formatCurrency(n) {
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
}

function downloadCSV(headers, rows, filename) {
  const escape = (v) => (typeof v === "string" && (v.includes(",") || v.includes('"') || v.includes("\n")) ? `"${String(v).replace(/"/g, '""')}"` : String(v));
  const line = (arr) => arr.map(escape).join(",");
  const csv = [line(headers), ...rows.map((r) => line(r))].join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

const BrokingDisclaimer = () => (
  <div className="mt-8 rounded-lg border border-[rgba(255,255,255,0.15)] bg-[#0D1B2A]/50 p-4 text-xs text-[#9CA3AF]">
    <p className="font-semibold text-white">Important information</p>
    <p className="mt-2 leading-relaxed">
      Frontline Financial Pty Ltd is an authorised credit representative (CRN: 575968) of Australian Credit Licence No. 389087, authorised to engage in credit activities.
    </p>
    <p className="mt-2 leading-relaxed">
      This calculator provides estimates for illustrative purposes only. It does not constitute a loan offer, pre-approval, or financial advice. <Link href="/calculator-disclaimer-broking" className="font-medium text-[#00FCB8] hover:underline">View full disclaimer &amp; methodology →</Link>
    </p>
  </div>
);

const AssetDisclaimer = () => (
  <div className="mt-8 rounded-lg border border-[rgba(255,255,255,0.15)] bg-[#0D1B2A]/50 p-4 text-xs text-[#9CA3AF]">
    <p className="font-semibold text-white">Important information</p>
    <p className="mt-2 leading-relaxed">
      Martyn Financial Pty Ltd t/a Frontline Financial: Asset Solutions is an authorised credit representative (CRN: 563350) of Australian Credit Licence No. 511803, authorised to engage in credit activities.
    </p>
    <p className="mt-2 leading-relaxed">
      This calculator provides estimates for illustrative purposes only. It does not constitute a loan offer, pre-approval, or financial advice. <Link href="/calculator-disclaimer-asset-solutions" className="font-medium text-[#00FCB8] hover:underline">View full disclaimer &amp; methodology →</Link>
    </p>
  </div>
);

function CTAProfilePhoto({ caption, src }) {
  const [error, setError] = useState(false);
  const className = "cta-profile-photo h-[200px] w-[200px] flex-shrink-0 rounded-xl object-cover md:h-[250px] md:w-[200px]";
  const fallback = (
    <div
      className={`${className} flex items-center justify-center border-2 border-dashed border-[rgba(255,255,255,0.15)] bg-white/5`}
      style={{ minHeight: "200px", minWidth: "200px" }}
    >
      <p className="text-center text-sm text-white/50">{caption}</p>
    </div>
  );
  if (!src || error) return fallback;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={caption}
      className={className}
      width={200}
      height={250}
      onError={() => setError(true)}
    />
  );
}

function BrokingCTA() {
  return (
    <div className="mt-10 rounded-2xl bg-gradient-to-r from-[#1C5472] to-[#0A1628] p-6 text-white md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-bold md:text-2xl">🏡 Ready to see what you qualify for?</h3>
          <p className="mt-2 text-[#39B2B2]">
            Get a <strong>FREE home loan eligibility assessment</strong> — no obligation, no credit check impact.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="tel:+61422959486" className="inline-flex items-center justify-center rounded-lg bg-[#00FCB8] px-6 py-3 font-bold text-[#0A1628] transition hover:opacity-90">
              Call Hassan: 0422 959 486
            </a>
          </div>
        </div>
        <div className="hidden md:block">
          <CTAProfilePhoto caption="Hassan Arif JP" src="/images/DSC01459.png?v=3" />
        </div>
      </div>
    </div>
  );
}

function AssetCTA() {
  return (
    <div className="mt-10 rounded-2xl bg-gradient-to-r from-[#1C5472] to-[#0A1628] p-6 text-white md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-bold md:text-2xl">🚗 Ready to get behind the wheel?</h3>
          <p className="mt-2 text-[#39B2B2]">
            Get a <strong>FREE car loan eligibility check</strong> — fast approvals, competitive rates. Sham — Award-winning finance broker, FY25.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="tel:+61450553877" className="inline-flex items-center justify-center rounded-lg bg-[#00FCB8] px-6 py-3 font-bold text-[#0A1628] transition hover:opacity-90">
              Call Sham: 0450 553 877
            </a>
          </div>
        </div>
        <div className="hidden md:block">
          <CTAProfilePhoto caption="Sham" src="/images/DSC01491.png" />
        </div>
      </div>
    </div>
  );
}

function PersonalLoanCTA() {
  return (
    <div className="mt-10 rounded-2xl bg-gradient-to-r from-[#1C5472] to-[#0A1628] p-6 text-white md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-bold md:text-2xl">💰 Need funds for something important?</h3>
          <p className="mt-2 text-[#39B2B2]">
            Fast approvals, competitive rates. Sham — Award-winning finance broker, FY25.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="tel:+61450553877" className="inline-flex items-center justify-center rounded-lg bg-[#00FCB8] px-6 py-3 font-bold text-[#0A1628] transition hover:opacity-90">
              Call Sham: 0450 553 877
            </a>
          </div>
        </div>
        <div className="hidden md:block">
          <CTAProfilePhoto caption="Sham" src="/images/DSC01491.png" />
        </div>
      </div>
    </div>
  );
}

export default function FinancialCalculatorsPage() {
  const [activeTab, setActiveTab] = useState("mortgage");

  // ─── Mortgage state ─────────────────────────────────────────────────────
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [termYears, setTermYears] = useState(30);
  const [repaymentType, setRepaymentType] = useState("pi");
  const [ioPeriodYears, setIoPeriodYears] = useState(5);
  const [offsetBalance, setOffsetBalance] = useState(0);
  const [frequency, setFrequency] = useState("monthly");
  const [mortgageExpandTable, setMortgageExpandTable] = useState(false);

  const monthlyRate = (annual) => annual / 100 / 12;
  const numPayments = (years) => Math.round(years * 12);

  // Mortgage calculation: P&I or IO with IO period then P&I; offset; frequency
  const mortgageResult = useMemo(() => {
    const P = Math.max(0, loanAmount);
    const r = monthlyRate(interestRate);
    const n = numPayments(termYears);
    const offset = Math.max(0, offsetBalance);
    if (P <= 0 || n <= 0) return null;

    const isIO = repaymentType === "io";
    const ioMonths = isIO ? numPayments(Math.min(ioPeriodYears, termYears)) : 0;
    const piMonths = n - ioMonths;

    let pmtMonthly;
    if (!isIO || ioMonths === 0) {
      pmtMonthly = (r * P * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else {
      pmtMonthly = (P - Math.min(offset, P)) * r;
    }

    const rows = [];
    let balance = P;
    let totalInterest = 0;
    let totalOffsetSaving = 0;
    let piPayment = pmtMonthly;
    for (let i = 1; i <= n; i++) {
      const inIOPeriod = isIO && i <= ioMonths;
      let pmt = inIOPeriod ? Math.max(0, balance - Math.min(offset, balance)) * r : piPayment;
      if (inIOPeriod && i === ioMonths && piMonths > 0) {
        const balAfterIO = balance;
        piPayment = (r * balAfterIO * Math.pow(1 + r, piMonths)) / (Math.pow(1 + r, piMonths) - 1);
        pmt = (balance - Math.min(offset, balance)) * r;
      }
      const interestBearing = Math.max(0, balance - offset);
      const interest = interestBearing * r;
      const noOffsetInterest = balance * r;
      const offsetSaving = offset > 0 ? noOffsetInterest - interest : 0;
      totalOffsetSaving += offsetSaving;
      const principal = Math.min(pmt - interest, balance);
      totalInterest += interest;
      balance -= principal;
      const finalPmt = i === n ? pmt + Math.max(0, balance) : pmt;
      rows.push({
        payment: i,
        paymentAmount: i === n && balance > 0 ? pmt + balance : finalPmt,
        principal,
        interest,
        offsetSaving,
        balance: Math.max(0, balance),
        isIO: inIOPeriod,
      });
      if (balance <= 0) break;
    }

    let displayPmt = isIO && ioMonths > 0 ? (P - Math.min(offset, P)) * r : pmtMonthly;
    if (frequency === "fortnightly") displayPmt /= 2;
    if (frequency === "weekly") displayPmt /= 4;

    return {
      pmtMonthly: isIO && ioMonths > 0 ? (P - Math.min(offset, P)) * r : pmtMonthly,
      repaymentDisplay: displayPmt,
      totalInterest,
      totalPaid: loanAmount + totalInterest,
      totalOffsetSaving,
      rows,
      frequency,
    };
  }, [loanAmount, interestRate, termYears, repaymentType, ioPeriodYears, offsetBalance, frequency]);

  const downloadMortgageCSV = useCallback(() => {
    if (!mortgageResult) return;
    const headers = ["Payment #", "Payment", "Principal", "Interest", "Offset Saving", "Balance"];
    const rows = mortgageResult.rows.map((r) => [
      r.payment,
      formatCurrency(r.paymentAmount),
      formatCurrency(r.principal),
      formatCurrency(r.interest),
      formatCurrency(r.offsetSaving || 0),
      formatCurrency(r.balance),
    ]);
    downloadCSV(headers, rows, "mortgage-amortisation.csv");
  }, [mortgageResult]);

  // ─── Car loan state & result ────────────────────────────────────────────
  const [vehiclePrice, setVehiclePrice] = useState(50000);
  const [deposit, setDeposit] = useState(10000);
  const [carRate, setCarRate] = useState(8);
  const [carTerm, setCarTerm] = useState(5);
  const [balloonPct, setBalloonPct] = useState(20);
  const [carFrequency, setCarFrequency] = useState("monthly");

  const carLoanAmount = Math.max(0, vehiclePrice - deposit);
  const carResult = useMemo(() => {
    const P = carLoanAmount;
    const FV = P * (balloonPct / 100);
    const r = monthlyRate(carRate);
    const n = numPayments(carTerm);
    if (P <= 0 || n <= 0) return null;
    const pvBalloon = FV / Math.pow(1 + r, n);
    const pmt = ((P - pvBalloon) * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    let balance = P;
    let totalInterest = 0;
    const rows = [];
    for (let i = 1; i <= n; i++) {
      const interest = balance * r;
      const principal = i < n ? pmt - interest : balance - FV;
      totalInterest += interest;
      balance -= principal;
      rows.push({ payment: i, paymentAmount: i < n ? pmt : interest + (balance - FV), principal, interest, balance: Math.max(0, balance) });
    }
    let rep = pmt;
    if (carFrequency === "fortnightly") rep = pmt / 2;
    if (carFrequency === "weekly") rep = pmt / 4;
    return { pmt, repaymentDisplay: rep, totalInterest, balloon: FV, rows };
  }, [carLoanAmount, carRate, carTerm, balloonPct, carFrequency]);

  const downloadCarCSV = useCallback(() => {
    if (!carResult) return;
    downloadCSV(
      ["Payment #", "Payment", "Principal", "Interest", "Balance"],
      carResult.rows.map((r) => [r.payment, formatCurrency(r.paymentAmount), formatCurrency(r.principal), formatCurrency(r.interest), formatCurrency(r.balance)]),
      "car-loan-amortisation.csv"
    );
  }, [carResult]);

  // ─── Refinance state & result ───────────────────────────────────────────
  const [refBalance, setRefBalance] = useState(450000);
  const [refCurrentRate, setRefCurrentRate] = useState(6.5);
  const [refRemainingYears, setRefRemainingYears] = useState(25);
  const [refNewRate, setRefNewRate] = useState(5.5);
  const [refNewTermYears, setRefNewTermYears] = useState(25);
  const [refFees, setRefFees] = useState(1000);

  const refResult = useMemo(() => {
    const P = refBalance;
    const rCur = monthlyRate(refCurrentRate);
    const nCur = numPayments(refRemainingYears);
    const rNew = monthlyRate(refNewRate);
    const nNew = numPayments(refNewTermYears);
    const fees = Math.max(0, refFees);
    if (P <= 0 || nCur <= 0 || nNew <= 0) return null;
    const pmtCur = (rCur * P * Math.pow(1 + rCur, nCur)) / (Math.pow(1 + rCur, nCur) - 1);
    const intCur = pmtCur * nCur - P;
    const pmtNew = (rNew * P * Math.pow(1 + rNew, nNew)) / (Math.pow(1 + rNew, nNew) - 1);
    let bal = P;
    let intNew = 0;
    for (let i = 0; i < nNew; i++) {
      intNew += bal * rNew;
      bal -= pmtNew - bal * rNew;
    }
    const savings = intCur - (intNew + fees);
    const monthlySavings = pmtCur - pmtNew;
    const breakEven = monthlySavings > 0 ? Math.ceil(fees / monthlySavings) : null;
    return { pmtCurrent: pmtCur, pmtNew, totalInterestCurrent: intCur, totalInterestNew: intNew, savings, monthlySavings, breakEvenMonths: breakEven, fees };
  }, [refBalance, refCurrentRate, refRemainingYears, refNewRate, refNewTermYears, refFees]);

  // ─── Personal loan state & result ───────────────────────────────────────
  const [personalAmount, setPersonalAmount] = useState(15000);
  const [personalRate, setPersonalRate] = useState(12);
  const [personalTermYears, setPersonalTermYears] = useState(5);
  const [personalFrequency, setPersonalFrequency] = useState("monthly");
  const [personalExpandTable, setPersonalExpandTable] = useState(false);

  const personalResult = useMemo(() => {
    const P = Math.max(0, personalAmount);
    const r = monthlyRate(personalRate);
    const n = numPayments(personalTermYears);
    if (P <= 0 || n <= 0) return null;
    const pmt = (r * P * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    let balance = P;
    let totalInterest = 0;
    const rows = [];
    for (let i = 1; i <= n; i++) {
      const interest = balance * r;
      const principal = pmt - interest;
      totalInterest += interest;
      balance -= principal;
      rows.push({ payment: i, paymentAmount: pmt, principal, interest, balance: Math.max(0, balance) });
    }
    let rep = pmt;
    if (personalFrequency === "fortnightly") rep = pmt / 2;
    if (personalFrequency === "weekly") rep = pmt / 4;
    return { pmt, repaymentDisplay: rep, totalInterest, totalPaid: P + totalInterest, rows };
  }, [personalAmount, personalRate, personalTermYears, personalFrequency]);

  const downloadPersonalCSV = useCallback(() => {
    if (!personalResult) return;
    downloadCSV(
      ["Payment #", "Payment", "Principal", "Interest", "Balance"],
      personalResult.rows.map((r) => [r.payment, formatCurrency(r.paymentAmount), formatCurrency(r.principal), formatCurrency(r.interest), formatCurrency(r.balance)]),
      "personal-loan-amortisation.csv"
    );
  }, [personalResult]);

  const complianceEntityOverride =
    activeTab === "mortgage" || activeTab === "refinance"
      ? ENTITY.BROKERS
      : activeTab === "car" || activeTab === "personal"
        ? ENTITY.ASSET_SOLUTIONS
        : null;

  return (
    <ComplianceEntityContext.Provider value={complianceEntityOverride}>
    <div className="min-h-screen bg-[#0A1628] font-sans">
      <LayoutNav activeNav="calculators" />

      <section className="bg-[#1C5472] px-4 py-10 md:px-6 md:py-14 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">Tools</p>
          <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">Financial Calculators</h1>
          <p className="mt-4 text-[#39B2B2]">
            Mortgage, refinance, car and personal loans. Estimates for illustrative purposes only. Download amortisation tables.
          </p>
        </div>
      </section>

      <WaveDivider fill="#0A1628" />

      <section className="px-4 py-8 md:px-6 md:py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-4 border-b border-[rgba(255,255,255,0.15)] pb-6 md:grid-cols-2 md:gap-6">
            <div className="flex flex-col gap-4 rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#111827]/80 px-5 py-4 md:px-6 md:py-5">
              <div>
                <h2 className="text-base font-bold uppercase tracking-wide text-white md:text-lg">Asset &amp; Personal Finance</h2>
                <p className="mt-0.5 text-xs font-medium text-[#9CA3AF]">Frontline Financial: Asset Solutions</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {TABS.filter((t) => t.entity === "asset").map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                      activeTab === tab.id ? "bg-[#00FCB8] text-[#0A1628]" : "border border-[rgba(255,255,255,0.15)] bg-transparent text-[#9CA3AF] hover:bg-white/5"
                    }`}
                  >
                    <span aria-hidden>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#111827]/80 px-5 py-4 md:px-6 md:py-5">
              <div>
                <h2 className="text-base font-bold uppercase tracking-wide text-white md:text-lg">Home Loans</h2>
                <p className="mt-0.5 text-xs font-medium text-[#9CA3AF]">Frontline Financial Brokers</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {TABS.filter((t) => t.entity === "broking").map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                      activeTab === tab.id ? "bg-[#00FCB8] text-[#0A1628]" : "border border-[rgba(255,255,255,0.15)] bg-transparent text-[#9CA3AF] hover:bg-white/5"
                    }`}
                  >
                    <span aria-hidden>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Mortgage tab ───────────────────────────────────────────── */}
          {activeTab === "mortgage" && (
            <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-6 shadow-xl md:p-8">
              <h2 className="text-xl font-bold text-white md:text-2xl">Mortgage calculator (with offset)</h2>
              <p className="mt-1 text-sm text-[#9CA3AF]">Principal &amp; Interest or Interest Only. Optional offset account.</p>

              <div className="mt-8 grid gap-8 lg:grid-cols-[1fr,340px]">
                <div className="space-y-6">
                  <SliderInput label="Loan amount ($)" value={loanAmount} onChange={setLoanAmount} min={50000} max={5000000} step={10000} currency />
                  <div>
                    <label className="block text-sm font-medium text-[#9CA3AF]">Interest rate (% p.a.)</label>
                    <NumericInput value={interestRate} onChange={(v) => setInterestRate(v === "" ? 0 : Number(v))} min={0.1} max={25} maxDecimals={2} className="mt-1 w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#0D1B2A] px-3 py-2 text-white focus:border-[#00FCB8] focus:outline-none focus:ring-1 focus:ring-[#00FCB8]" />
                  </div>
                  <SliderInput label="Loan term (years)" value={termYears} onChange={setTermYears} min={1} max={30} />
                  <div>
                    <span className="block text-sm font-medium text-[#9CA3AF]">Repayment type</span>
                    <div className="mt-2 flex gap-4">
                      <label className="flex cursor-pointer items-center gap-2">
                        <input type="radio" name="repType" checked={repaymentType === "pi"} onChange={() => setRepaymentType("pi")} className="accent-[#00FCB8]" />
                        <span className="text-white">Principal &amp; Interest</span>
                      </label>
                      <label className="flex cursor-pointer items-center gap-2">
                        <input type="radio" name="repType" checked={repaymentType === "io"} onChange={() => setRepaymentType("io")} className="accent-[#00FCB8]" />
                        <span className="text-white">Interest Only</span>
                      </label>
                    </div>
                  </div>
                  {repaymentType === "io" && (
                    <div>
                      <label className="block text-sm font-medium text-[#9CA3AF]">Interest-only period (years)</label>
                      <NumericInput value={ioPeriodYears} onChange={(v) => setIoPeriodYears(v === "" ? 1 : Number(v))} min={1} max={10} className="mt-1 w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#0D1B2A] px-3 py-2 text-white focus:border-[#00FCB8] focus:outline-none focus:ring-1 focus:ring-[#00FCB8]" />
                      <p className="mt-1 text-xs text-[#6B7280]">After this period, repayments revert to P&amp;I for the remaining term.</p>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-[#9CA3AF]">Offset account balance ($)</label>
                    <NumericInput value={offsetBalance} onChange={(v) => setOffsetBalance(v === "" ? 0 : Number(v))} min={0} max={loanAmount} currency className="mt-1 w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#0D1B2A] px-3 py-2 text-white focus:border-[#00FCB8] focus:outline-none focus:ring-1 focus:ring-[#00FCB8]" />
                    <p className="mt-1 text-xs text-[#6B7280]">Interest is calculated on (loan balance − offset). Repayment stays the same; more goes to principal.</p>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-[#9CA3AF]">Repayment frequency</span>
                    <div className="mt-2 flex gap-4">
                      {["monthly", "fortnightly", "weekly"].map((f) => (
                        <label key={f} className="flex cursor-pointer items-center gap-2">
                          <input type="radio" name="freq" checked={frequency === f} onChange={() => setFrequency(f)} className="accent-[#00FCB8]" />
                          <span className="text-white capitalize">{f}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-gradient-to-br from-[#00FCB8] to-[#39B2B2] p-6 text-[#0A1628]">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#0A1628]/80">Estimated repayment</p>
                  {mortgageResult && (
                    <>
                      <p className="mt-1 text-3xl font-bold transition md:text-4xl">{formatCurrency(mortgageResult.repaymentDisplay)}</p>
                      <p className="text-sm text-[#0A1628]/80">per {frequency === "monthly" ? "month" : frequency === "fortnightly" ? "fortnight" : "week"}</p>
                      <div className="mt-6 space-y-3 border-t border-[#0A1628]/20 pt-4">
                        <div>
                          <p className="text-xs text-[#0A1628]/80">Total interest</p>
                          <p className="text-xl font-bold">{formatCurrency(mortgageResult.totalInterest)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#0A1628]/80">Total amount paid</p>
                          <p className="text-xl font-bold">{formatCurrency(mortgageResult.totalPaid)}</p>
                        </div>
                        {offsetBalance > 0 && mortgageResult.totalOffsetSaving > 0 && (
                          <div>
                            <p className="text-xs text-[#0A1628]/80">Interest saved with offset</p>
                            <p className="text-xl font-bold text-[#1C5472]">{formatCurrency(mortgageResult.totalOffsetSaving)}</p>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {mortgageResult && (
                <>
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                    <p className="text-sm text-[#9CA3AF]">Amortisation table</p>
                    <button type="button" onClick={downloadMortgageCSV} className="inline-flex items-center gap-2 rounded-lg bg-[#00FCB8] px-4 py-2 text-sm font-bold text-[#0A1628] hover:opacity-90">
                      Download CSV
                    </button>
                  </div>
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[rgba(255,255,255,0.15)] text-left text-[#9CA3AF]">
                          <th className="py-2 pr-4">#</th>
                          <th className="py-2 pr-4">Payment</th>
                          <th className="py-2 pr-4">Principal</th>
                          <th className="py-2 pr-4">Interest</th>
                          {offsetBalance > 0 && <th className="py-2 pr-4">Offset saving</th>}
                          <th className="py-2">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(mortgageExpandTable ? mortgageResult.rows : mortgageResult.rows.slice(0, 12)).map((r) => (
                          <tr key={r.payment} className={`border-b border-white/5 ${r.isIO ? "bg-[#39B2B2]/10" : ""}`}>
                            <td className="py-2 pr-4 text-[#9CA3AF]">{r.payment}</td>
                            <td className="py-2 pr-4 text-white">{formatCurrency(r.paymentAmount)}</td>
                            <td className="py-2 pr-4 text-white">{formatCurrency(r.principal)}</td>
                            <td className="py-2 pr-4 text-white">{formatCurrency(r.interest)}</td>
                            {offsetBalance > 0 && <td className="py-2 pr-4 text-[#00FCB8]">{formatCurrency(r.offsetSaving || 0)}</td>}
                            <td className="py-2 text-white">{formatCurrency(r.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {mortgageResult.rows.length > 12 && (
                      <button type="button" onClick={() => setMortgageExpandTable(!mortgageExpandTable)} className="mt-3 text-sm font-medium text-[#00FCB8] hover:underline">
                        {mortgageExpandTable ? "Show first 12 months only" : "Show full table"}
                      </button>
                    )}
                  </div>
                </>
              )}

              <BrokingDisclaimer />
              <BrokingCTA />
            </div>
          )}

          {/* ─── Car loan tab ────────────────────────────────────────────── */}
          {activeTab === "car" && (
            <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-6 shadow-xl md:p-8">
              <h2 className="text-xl font-bold text-white md:text-2xl">Car loan calculator (with balloon)</h2>
              <div className="mt-8 grid gap-8 lg:grid-cols-[1fr,340px]">
                <div className="space-y-6">
                  <SliderInput label="Vehicle price ($)" value={vehiclePrice} onChange={setVehiclePrice} min={1000} max={500000} step={1000} currency />
                  <div>
                    <label className="block text-sm font-medium text-[#9CA3AF]">Deposit ($)</label>
                    <NumericInput value={deposit} onChange={(v) => setDeposit(v === "" ? 0 : Number(v))} min={0} max={vehiclePrice} currency className="mt-1 w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#0D1B2A] px-3 py-2 text-white focus:border-[#00FCB8] focus:outline-none focus:ring-1 focus:ring-[#00FCB8]" />
                  </div>
                  <p className="text-sm text-[#9CA3AF]">Loan amount: {formatCurrency(carLoanAmount)}</p>
                  <div>
                    <label className="block text-sm font-medium text-[#9CA3AF]">Interest rate (% p.a.)</label>
                    <NumericInput value={carRate} onChange={(v) => setCarRate(v === "" ? 0 : Number(v))} min={0.1} max={25} maxDecimals={2} className="mt-1 w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#0D1B2A] px-3 py-2 text-white focus:border-[#00FCB8] focus:outline-none focus:ring-1 focus:ring-[#00FCB8]" />
                  </div>
                  <SliderInput label="Term (years)" value={carTerm} onChange={setCarTerm} min={1} max={7} />
                  <SliderInput label="Balloon (%)" value={balloonPct} onChange={setBalloonPct} min={0} max={50} format={(v) => `${v}%`} />
                  <div>
                    <span className="block text-sm font-medium text-[#9CA3AF]">Frequency</span>
                    <div className="mt-2 flex gap-4">
                      {["monthly", "fortnightly", "weekly"].map((f) => (
                        <label key={f} className="flex cursor-pointer items-center gap-2">
                          <input type="radio" name="carFreq" checked={carFrequency === f} onChange={() => setCarFrequency(f)} className="accent-[#00FCB8]" />
                          <span className="text-white capitalize">{f}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-[#00FCB8] to-[#39B2B2] p-6 text-[#0A1628]">
                  {carResult && (
                    <>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#0A1628]/80">Repayment</p>
                      <p className="mt-1 text-3xl font-bold">{formatCurrency(carResult.repaymentDisplay)}</p>
                      <p className="text-sm text-[#0A1628]/80">per {carFrequency === "monthly" ? "month" : carFrequency === "fortnightly" ? "fortnight" : "week"}</p>
                      <div className="mt-6 space-y-3 border-t border-[#0A1628]/20 pt-4">
                        <div>
                          <p className="text-xs text-[#0A1628]/80">Balloon at end</p>
                          <p className="text-xl font-bold">{formatCurrency(carResult.balloon)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#0A1628]/80">Total interest</p>
                          <p className="text-xl font-bold">{formatCurrency(carResult.totalInterest)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#0A1628]/80">Total cost (repayments + balloon)</p>
                          <p className="text-xl font-bold">{formatCurrency(carResult.rows.reduce((s, r) => s + r.paymentAmount, 0) + carResult.balloon)}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              {carResult && (
                <>
                  <div className="mt-8 flex justify-between">
                    <p className="text-sm text-[#9CA3AF]">Amortisation</p>
                    <button type="button" onClick={downloadCarCSV} className="rounded-lg bg-[#00FCB8] px-4 py-2 text-sm font-bold text-[#0A1628] hover:opacity-90">Download CSV</button>
                  </div>
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[rgba(255,255,255,0.15)] text-left text-[#9CA3AF]">
                          <th className="py-2 pr-4">#</th>
                          <th className="py-2 pr-4">Payment</th>
                          <th className="py-2 pr-4">Principal</th>
                          <th className="py-2 pr-4">Interest</th>
                          <th className="py-2">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {carResult.rows.slice(0, 12).map((r) => (
                          <tr key={r.payment} className="border-b border-white/5">
                            <td className="py-2 pr-4 text-gray-400">{r.payment}</td>
                            <td className="py-2 pr-4 text-white">{formatCurrency(r.paymentAmount)}</td>
                            <td className="py-2 pr-4 text-white">{formatCurrency(r.principal)}</td>
                            <td className="py-2 pr-4 text-white">{formatCurrency(r.interest)}</td>
                            <td className="py-2 text-white">{formatCurrency(r.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
              <AssetDisclaimer />
              <AssetCTA />
            </div>
          )}

          {/* ─── Refinance tab ───────────────────────────────────────────── */}
          {activeTab === "refinance" && (
            <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-6 shadow-xl md:p-8">
              <h2 className="text-xl font-bold text-white md:text-2xl">Refinance calculator</h2>
              <div className="mt-8 grid gap-8 lg:grid-cols-[1fr,340px]">
                <div className="space-y-6">
                  <SliderInput label="Current balance ($)" value={refBalance} onChange={setRefBalance} min={10000} max={3000000} step={10000} currency />
                  <div>
                    <label className="block text-sm font-medium text-[#9CA3AF]">Current rate (% p.a.)</label>
                    <NumericInput value={refCurrentRate} onChange={(v) => setRefCurrentRate(v === "" ? 0 : Number(v))} min={0.1} max={25} maxDecimals={2} className="mt-1 w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#0D1B2A] px-3 py-2 text-white focus:border-[#00FCB8] focus:outline-none focus:ring-1 focus:ring-[#00FCB8]" />
                  </div>
                  <SliderInput label="Remaining term (years)" value={refRemainingYears} onChange={setRefRemainingYears} min={1} max={30} />
                  <div>
                    <label className="block text-sm font-medium text-[#9CA3AF]">New rate (% p.a.)</label>
                    <NumericInput value={refNewRate} onChange={(v) => setRefNewRate(v === "" ? 0 : Number(v))} min={0.1} max={25} maxDecimals={2} className="mt-1 w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#0D1B2A] px-3 py-2 text-white focus:border-[#00FCB8] focus:outline-none focus:ring-1 focus:ring-[#00FCB8]" />
                  </div>
                  <SliderInput label="New term (years)" value={refNewTermYears} onChange={setRefNewTermYears} min={1} max={30} />
                  <div>
                    <label className="block text-sm font-medium text-[#9CA3AF]">Refinance costs ($)</label>
                    <NumericInput value={refFees} onChange={(v) => setRefFees(v === "" ? 0 : Number(v))} min={0} currency className="mt-1 w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#0D1B2A] px-3 py-2 text-white focus:border-[#00FCB8] focus:outline-none focus:ring-1 focus:ring-[#00FCB8]" />
                    <p className="mt-1 text-xs text-[#6B7280]">Typical: discharge, application, valuation, legal/settlement fees.</p>
                  </div>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-[#00FCB8] to-[#39B2B2] p-6 text-[#0A1628]">
                  {refResult && (
                    <>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#0A1628]/80">New repayment</p>
                      <p className="mt-1 text-3xl font-bold">{formatCurrency(refResult.pmtNew)}/mo</p>
                      <div className="mt-6 space-y-3 border-t border-[#0A1628]/20 pt-4">
                        <div>
                          <p className="text-xs text-[#0A1628]/80">Monthly savings</p>
                          <p className={`text-xl font-bold ${refResult.monthlySavings >= 0 ? "text-[#1C5472]" : ""}`}>{formatCurrency(refResult.monthlySavings)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#0A1628]/80">Annual savings</p>
                          <p className="text-xl font-bold">{formatCurrency(refResult.monthlySavings * 12)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#0A1628]/80">Total interest saved</p>
                          <p className="text-xl font-bold">{formatCurrency(refResult.totalInterestCurrent - refResult.totalInterestNew)}</p>
                        </div>
                        {refResult.breakEvenMonths != null && (
                          <div>
                            <p className="text-xs text-[#0A1628]/80">Break-even</p>
                            <p className="text-xl font-bold">Costs recovered in {refResult.breakEvenMonths} months</p>
                          </div>
                        )}
                        <div>
                          <p className="text-xs text-[#0A1628]/80">Net savings (after costs)</p>
                          <p className={`text-xl font-bold ${refResult.savings >= 0 ? "text-[#1C5472]" : ""}`}>{formatCurrency(refResult.savings)}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <BrokingDisclaimer />
              <BrokingCTA />
            </div>
          )}

          {/* ─── Personal Loan tab ──────────────────────────────────────── */}
          {activeTab === "personal" && (
            <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111827] p-6 shadow-xl md:p-8">
              <h2 className="text-xl font-bold text-white md:text-2xl">Personal loan calculator</h2>
              <div className="mt-8 grid gap-8 lg:grid-cols-[1fr,340px]">
                <div className="space-y-6">
                  <SliderInput label="Loan amount ($)" value={personalAmount} onChange={setPersonalAmount} min={2000} max={100000} step={1000} currency />
                  <div>
                    <label className="block text-sm font-medium text-[#9CA3AF]">Interest rate (% p.a.)</label>
                    <NumericInput value={personalRate} onChange={(v) => setPersonalRate(v === "" ? 0 : Number(v))} min={0.1} max={25} maxDecimals={2} className="mt-1 w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#0D1B2A] px-3 py-2 text-white focus:border-[#00FCB8] focus:outline-none focus:ring-1 focus:ring-[#00FCB8]" />
                  </div>
                  <SliderInput label="Term (years)" value={personalTermYears} onChange={setPersonalTermYears} min={1} max={7} />
                  <div>
                    <span className="block text-sm font-medium text-[#9CA3AF]">Repayment frequency</span>
                    <div className="mt-2 flex gap-4">
                      {["monthly", "fortnightly", "weekly"].map((f) => (
                        <label key={f} className="flex cursor-pointer items-center gap-2">
                          <input type="radio" name="personalFreq" checked={personalFrequency === f} onChange={() => setPersonalFrequency(f)} className="accent-[#00FCB8]" />
                          <span className="text-white capitalize">{f}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-[#00FCB8] to-[#39B2B2] p-6 text-[#0A1628]">
                  {personalResult && (
                    <>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#0A1628]/80">Estimated repayment</p>
                      <p className="mt-1 text-3xl font-bold">{formatCurrency(personalResult.repaymentDisplay)}</p>
                      <p className="text-sm text-[#0A1628]/80">per {personalFrequency === "monthly" ? "month" : personalFrequency === "fortnightly" ? "fortnight" : "week"}</p>
                      <div className="mt-6 space-y-3 border-t border-[#0A1628]/20 pt-4">
                        <div>
                          <p className="text-xs text-[#0A1628]/80">Total interest</p>
                          <p className="text-xl font-bold">{formatCurrency(personalResult.totalInterest)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#0A1628]/80">Total amount paid</p>
                          <p className="text-xl font-bold">{formatCurrency(personalResult.totalPaid)}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              {personalResult && (
                <>
                  <div className="mt-8 flex justify-between">
                    <p className="text-sm text-[#9CA3AF]">Amortisation</p>
                    <button type="button" onClick={downloadPersonalCSV} className="rounded-lg bg-[#00FCB8] px-4 py-2 text-sm font-bold text-[#0A1628] hover:opacity-90">Download CSV</button>
                  </div>
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[rgba(255,255,255,0.15)] text-left text-[#9CA3AF]">
                          <th className="py-2 pr-4">#</th>
                          <th className="py-2 pr-4">Payment</th>
                          <th className="py-2 pr-4">Principal</th>
                          <th className="py-2 pr-4">Interest</th>
                          <th className="py-2">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(personalExpandTable ? personalResult.rows : personalResult.rows.slice(0, 12)).map((r) => (
                          <tr key={r.payment} className="border-b border-white/5">
                            <td className="py-2 pr-4 text-[#9CA3AF]">{r.payment}</td>
                            <td className="py-2 pr-4 text-white">{formatCurrency(r.paymentAmount)}</td>
                            <td className="py-2 pr-4 text-white">{formatCurrency(r.principal)}</td>
                            <td className="py-2 pr-4 text-white">{formatCurrency(r.interest)}</td>
                            <td className="py-2 text-white">{formatCurrency(r.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {personalResult.rows.length > 12 && (
                      <button type="button" onClick={() => setPersonalExpandTable(!personalExpandTable)} className="mt-3 text-sm font-medium text-[#00FCB8] hover:underline">
                        {personalExpandTable ? "Show first 12 months only" : "Show full table"}
                      </button>
                    )}
                  </div>
                </>
              )}
              <AssetDisclaimer />
              <PersonalLoanCTA />
            </div>
          )}
        </div>
      </section>

      <WaveDivider fill="#1C5472" />
      <LayoutFooter />
    </div>
    </ComplianceEntityContext.Provider>
  );
}
