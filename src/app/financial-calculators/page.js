"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import WaveDivider from "@/components/WaveDivider";
import NumericInput from "@/components/calculators/NumericInput";
import SegmentedControl from "@/components/calculators/SegmentedControl";
import DonutChart from "@/components/calculators/DonutChart";
import LoanBalanceChart from "@/components/calculators/LoanBalanceChart";
import FAQAccordion from "@/components/calculators/FAQAccordion";
import { ComplianceEntityContext } from "@/context/ComplianceEntityContext";
import { ENTITY } from "@/config/entities";

const TABS = [
  { id: "mortgage", label: "Mortgage", icon: "house", entity: "broking", sub: "Brokers" },
  { id: "refinance", label: "Refinance", icon: "refresh", entity: "broking", sub: "Brokers" },
  { id: "car", label: "Car Loan", icon: "car", entity: "asset", sub: "Asset Solutions" },
  { id: "personal", label: "Personal Loan", icon: "personal", entity: "asset", sub: "Asset Solutions" },
];

/** Tab icons — matched to the Frontline services pages (Brokers / Asset Solutions). */
function TabIcon({ type, className }) {
  const common = { className, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", viewBox: "0 0 24 24", "aria-hidden": true };
  switch (type) {
    case "house":
      return <svg {...common}><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
    case "refresh":
      return <svg {...common}><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>;
    case "car":
      return <svg {...common}><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" /></svg>;
    case "personal":
      return <svg {...common}><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" /><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" /><path d="m2 16 6 6" /><circle cx="16" cy="9" r="2.9" /><circle cx="6" cy="5" r="3" /></svg>;
    default:
      return null;
  }
}

const PRINCIPAL_COLOR = "#39B2B2";
const INTEREST_COLOR = "#1C5472";

const fmt = (n) =>
  new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n || 0);
const fmt0 = (n) =>
  new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n || 0);

const FREQ_OPTIONS = [
  { value: "monthly", label: "Monthly" },
  { value: "fortnightly", label: "Fortnightly" },
  { value: "weekly", label: "Weekly" },
];

function freqNoun(freq) {
  return freq === "monthly" ? "month" : freq === "fortnightly" ? "fortnight" : "week";
}
function perPeriod(monthly, freq) {
  if (freq === "fortnightly") return (monthly * 12) / 26;
  if (freq === "weekly") return (monthly * 12) / 52;
  return monthly;
}
function monthsLabel(m) {
  const y = Math.floor(m / 12);
  const mo = m % 12;
  if (y && mo) return `${y} yr ${mo} mo`;
  if (y) return `${y} year${y > 1 ? "s" : ""}`;
  return `${mo} month${mo !== 1 ? "s" : ""}`;
}

/** Running total of interest paid, per month (index 0 = $0 at the start). */
function cumulativeInterest(rows) {
  const out = [0];
  let acc = 0;
  for (const r of rows) {
    acc += r.interest;
    out.push(acc);
  }
  return out;
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

// ─── Mortgage amortisation engine (monthly), supports IO→P&I, offset, extra ──
function buildMortgageSchedule({ P, annualRate, termMonths, repaymentType, ioPeriodMonths, offset, extraMonthly }) {
  const r = annualRate / 100 / 12;
  const n = Math.max(1, Math.round(termMonths));
  const isIO = repaymentType === "io";
  const ioMonths = isIO ? Math.min(Math.round(ioPeriodMonths), n) : 0;
  const piMonths = n - ioMonths;
  const off = Math.max(0, offset || 0);
  const extra = Math.max(0, extraMonthly || 0);

  const amort = (principal, months) =>
    months <= 0 ? 0 : r > 0 ? (r * principal * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1) : principal / months;

  let piPayment = isIO ? 0 : amort(P, n);
  let revertPayment = isIO ? null : piPayment; // P&I payment after the IO period ends
  const balances = [P];
  const rows = [];
  let balance = P;
  let totalInterest = 0;
  const scheduledPayment = isIO ? Math.max(0, P - off) * r : piPayment; // headline (excl. extra)
  let payoffMonth = n;

  for (let i = 1; i <= n; i++) {
    const inIO = isIO && i <= ioMonths;
    if (isIO && i === ioMonths + 1 && piMonths > 0) {
      piPayment = amort(balance, piMonths);
      revertPayment = piPayment;
    }

    const interestBearing = Math.max(0, balance - off);
    const interest = interestBearing * r;
    const offsetSaving = off > 0 ? balance * r - interest : 0;

    const basePayment = inIO ? interest : piPayment;
    let payment = basePayment + extra;
    let principal = payment - interest;
    if (principal >= balance) {
      principal = balance;
      payment = principal + interest;
    }
    if (principal < 0) principal = 0;

    totalInterest += interest;
    balance = Math.max(0, balance - principal);
    rows.push({ payment: i, paymentAmount: payment, principal, interest, offsetSaving, balance, isIO: inIO });
    balances.push(balance);
    if (balance <= 0.01) {
      payoffMonth = i;
      break;
    }
  }
  return { rows, balances, totalInterest, payoffMonth, scheduledPayment, revertPayment };
}

// ─── Shared light-theme field styles ────────────────────────────────────────
const labelCls = "block text-sm font-semibold text-[#1C5472]";
const helpCls = "mt-1.5 text-xs text-[#1C5472]/60";

/** Compact unit toggle (e.g. % / $) shown beside a field label. */
function UnitToggle({ value, onChange, options }) {
  return (
    <div className="inline-flex rounded-lg border border-[#1C5472]/15 bg-[#F5F5EF] p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={`rounded-md px-3.5 py-1 text-sm font-bold transition ${value === o.value ? "bg-white text-[#1C5472] shadow-sm" : "text-[#1C5472]/55 hover:text-[#1C5472]"}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Big, bulky labelled numeric field with optional $ prefix / unit suffix and column span. */
function NumberField({ label, help, value, onChange, min, max, currency, maxDecimals = 2, prefix, suffix, full, labelRight }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      {labelRight ? (
        <div className="flex items-center justify-between gap-3">
          <label className={labelCls}>{label}</label>
          {labelRight}
        </div>
      ) : (
        <label className={labelCls}>{label}</label>
      )}
      <div className="relative mt-2">
        {prefix && <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-[#1C5472]/45">{prefix}</span>}
        <NumericInput
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          currency={currency}
          maxDecimals={maxDecimals}
          className={`w-full rounded-xl border-2 border-[#1C5472]/15 bg-white py-3.5 text-xl font-bold text-[#1C5472] transition focus:border-[#00FCB8] focus:outline-none focus:ring-2 focus:ring-[#00FCB8]/25 ${prefix ? "pl-9" : "pl-4"} ${suffix ? "pr-16" : "pr-4"}`}
        />
        {suffix && <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#1C5472]/50">{suffix}</span>}
      </div>
      {help && <p className={helpCls}>{help}</p>}
    </div>
  );
}

function SegmentedField({ label, options, value, onChange, full }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <span className={labelCls}>{label}</span>
      <div className="mt-1.5">
        <SegmentedControl options={options} value={value} onChange={onChange} ariaLabel={label} />
      </div>
    </div>
  );
}

/** Sticky results column wrapper. */
function ResultsPanel({ children }) {
  return <div className="space-y-4 lg:sticky lg:top-24">{children}</div>;
}

function HeadlineCard({ caption, amount, sub, note, stats }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#00FCB8] to-[#39B2B2] p-7 text-[#0A1628] shadow-md">
      <p className="text-xs font-bold uppercase tracking-wider text-[#0A1628]/80">{caption}</p>
      <p className="mt-1.5 text-5xl font-extrabold leading-none tracking-tight">{amount}</p>
      {sub && <p className="mt-2 text-sm text-[#0A1628]/80">{sub}</p>}
      {note && <div className="mt-3 rounded-lg bg-[#0A1628]/10 px-3 py-2 text-sm text-[#0A1628]">{note}</div>}
      {stats && (
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[#0A1628]/20 pt-5">
          {stats.map((s, i) => (
            <div key={i}>
              <p className="text-xs text-[#0A1628]/80">{s.label}</p>
              <p className="text-xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BreakdownCard({ segments, centerLabel, centerValue, legend }) {
  return (
    <div className="rounded-2xl border border-[#1C5472]/10 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-[#1C5472]">Where your money goes</p>
      <div className="mt-4 flex items-center gap-5">
        <div className="h-[150px] w-[150px] shrink-0">
          <DonutChart segments={segments} centerLabel={centerLabel} centerValue={centerValue} thickness={24} />
        </div>
        <ul className="min-w-0 flex-1 space-y-4">
          {legend.map((r, i) => (
            <li key={i}>
              <span className="flex items-center gap-2 text-xs text-[#1C5472]/70">
                <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: r.color }} aria-hidden />
                {r.label}
              </span>
              <span className="mt-0.5 block text-lg font-bold text-[#1C5472]">{fmt0(r.value)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ResultStat({ label, value, accent }) {
  return (
    <div>
      <p className="text-xs font-medium text-[#1C5472]/70">{label}</p>
      <p className={`text-xl font-bold ${accent ? "text-[#0A6B57]" : "text-[#1C5472]"}`}>{value}</p>
    </div>
  );
}

function ChartCard({ title, legend, children, note }) {
  return (
    <div className="mt-6 rounded-2xl border border-[#1C5472]/10 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-[#1C5472]">{title}</p>
        {legend && <div className="flex flex-wrap gap-4 text-xs text-[#1C5472]/70">{legend}</div>}
      </div>
      <div className="mt-3">{children}</div>
      {note && <p className="mt-2 text-xs text-[#1C5472]/60">{note}</p>}
    </div>
  );
}

const SolidLegend = ({ color, label }) => (
  <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-4 rounded-full" style={{ background: color }} />{label}</span>
);
const DashedLegend = ({ label }) => (
  <span className="flex items-center gap-1.5"><span className="inline-block h-0 w-4 border-t-2 border-dashed border-[#1C5472]" />{label}</span>
);

// ─── Disclaimers ─────────────────────────────────────────────────────────────
const BrokingDisclaimer = () => (
  <div className="mt-8 rounded-lg border border-[#1C5472]/15 bg-[#1C5472]/5 p-4 text-xs text-[#1C5472]/75">
    <p className="font-semibold text-[#1C5472]">Important information</p>
    <p className="mt-2 leading-relaxed">
      Frontline Financial Pty Ltd is an authorised credit representative (CRN: 575968) of Australian Credit Licence No. 389087, authorised to engage in credit activities.
    </p>
    <p className="mt-2 leading-relaxed">
      This calculator provides estimates for illustrative purposes only. It does not account for fees, charges or LMI, and does not constitute a loan offer, pre-approval, or financial advice.{" "}
      <Link href="/calculator-disclaimer-broking" className="font-medium text-[#39B2B2] hover:underline">View full disclaimer &amp; methodology →</Link>
    </p>
  </div>
);

const AssetDisclaimer = () => (
  <div className="mt-8 rounded-lg border border-[#1C5472]/15 bg-[#1C5472]/5 p-4 text-xs text-[#1C5472]/75">
    <p className="font-semibold text-[#1C5472]">Important information</p>
    <p className="mt-2 leading-relaxed">
      Martyn Financial Pty Ltd t/a Frontline Financial: Asset Solutions is an authorised credit representative (CRN: 563350) of Australian Credit Licence No. 511803, authorised to engage in credit activities.
    </p>
    <p className="mt-2 leading-relaxed">
      This calculator provides estimates for illustrative purposes only. It does not account for fees or charges, and does not constitute a loan offer, pre-approval, or financial advice.{" "}
      <Link href="/calculator-disclaimer-asset-solutions" className="font-medium text-[#39B2B2] hover:underline">View full disclaimer &amp; methodology →</Link>
    </p>
  </div>
);

function CTAProfilePhoto({ caption, src }) {
  const [error, setError] = useState(false);
  const className = "h-[120px] w-[120px] flex-shrink-0 rounded-xl object-cover";
  if (!src || error) {
    return (
      <div className={`${className} flex items-center justify-center border-2 border-dashed border-white/20 bg-white/5`}>
        <p className="text-center text-xs text-white/50">{caption}</p>
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={caption} className={className} width={120} height={120} onError={() => setError(true)} />;
}

function ContactCTA({ emoji, title, blurb, name, phone, tel }) {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-r from-[#1C5472] to-[#0A1628] p-6 text-white md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-bold md:text-2xl">{emoji} {title}</h3>
          <p className="mt-2 text-[#39B2B2]">{blurb}</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={tel} className="inline-flex items-center justify-center rounded-lg bg-[#00FCB8] px-6 py-3 font-bold text-[#0A1628] transition hover:opacity-90">
              Call {name}: {phone}
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-6 py-3 font-bold text-white transition hover:bg-white/10">
              Book a free consultation
            </Link>
          </div>
        </div>
        <div className="hidden md:block">
          <CTAProfilePhoto caption={name} src={name === "Sham" ? "/images/DSC01491.png" : "/images/DSC01459.png?v=3"} />
        </div>
      </div>
    </div>
  );
}

function FAQBlock({ title, items }) {
  return (
    <div className="mt-10">
      <h3 className="text-lg font-bold text-[#1C5472]">{title}</h3>
      <div className="mt-4">
        <FAQAccordion items={items} />
      </div>
    </div>
  );
}

function AmortTable({ rows, expand, setExpand, showOffset, download }) {
  return (
    <>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm font-semibold text-[#1C5472]">Amortisation schedule</p>
        <button type="button" onClick={download} className="inline-flex items-center gap-2 rounded-lg bg-[#1C5472] px-4 py-2 text-sm font-bold text-white transition hover:opacity-90">
          Download CSV
        </button>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1C5472]/15 text-left text-[#1C5472]/60">
              <th className="py-2 pr-4 font-semibold">#</th>
              <th className="py-2 pr-4 font-semibold">Payment</th>
              <th className="py-2 pr-4 font-semibold">Principal</th>
              <th className="py-2 pr-4 font-semibold">Interest</th>
              {showOffset && <th className="py-2 pr-4 font-semibold">Offset saving</th>}
              <th className="py-2 font-semibold">Balance</th>
            </tr>
          </thead>
          <tbody>
            {(expand ? rows : rows.slice(0, 12)).map((r) => (
              <tr key={r.payment} className={`border-b border-[#1C5472]/5 ${r.isIO ? "bg-[#39B2B2]/5" : ""}`}>
                <td className="py-2 pr-4 text-[#1C5472]/60">{r.payment}</td>
                <td className="py-2 pr-4 text-[#1C5472]">{fmt(r.paymentAmount)}</td>
                <td className="py-2 pr-4 text-[#1C5472]">{fmt(r.principal)}</td>
                <td className="py-2 pr-4 text-[#1C5472]">{fmt(r.interest)}</td>
                {showOffset && <td className="py-2 pr-4 text-[#0A6B57]">{fmt(r.offsetSaving || 0)}</td>}
                <td className="py-2 text-[#1C5472]">{fmt(r.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length > 12 && (
          <button type="button" onClick={() => setExpand(!expand)} className="mt-3 text-sm font-semibold text-[#39B2B2] hover:underline">
            {expand ? "Show first 12 months only" : `Show full table (${rows.length} payments)`}
          </button>
        )}
      </div>
    </>
  );
}

// ─── FAQ content ─────────────────────────────────────────────────────────────
const MORTGAGE_FAQS = [
  { q: "How are my home loan repayments calculated?", a: "We use the standard principal-and-interest amortisation formula with interest compounding monthly on your outstanding balance. Each repayment covers the interest accrued that month, and the remainder reduces your principal — so early repayments are mostly interest and later ones are mostly principal." },
  { q: "What is an offset account and how does it save me money?", a: "An offset account is a transaction account linked to your home loan. Its balance is 'offset' against your loan, so you only pay interest on the difference. Park your salary and savings there and you reduce the interest charged each month — without locking the money away. Enter an offset balance above to see the interest you'd save and how much sooner you'd be debt-free." },
  { q: "Do extra repayments really make a difference?", a: "Yes — because every extra dollar comes straight off your principal, you avoid all the future interest that dollar would have attracted. Even a modest extra amount each month can cut years off a 30-year loan. Use the 'extra repayments' field to model it." },
  { q: "Does this calculator include fees, LMI or rate changes?", a: "No. It assumes a single fixed interest rate for the whole term and excludes establishment fees, ongoing fees, Lenders Mortgage Insurance and government charges. It's a guide to compare scenarios — your Frontline broker can give you precise, lender-specific numbers." },
  { q: "What interest rate should I enter?", a: "Use the rate you've been quoted, or a current market rate as a starting point. Try nudging the rate up and down to stress-test your repayments — lenders assess you at a buffer above the actual rate." },
];
const REFINANCE_FAQS = [
  { q: "How much could I save by refinancing?", a: "Refinancing to a lower rate reduces the interest charged on your balance, which lowers your repayments and the total interest over the life of the loan. The calculator shows your monthly saving, annual saving and total interest saved after costs — based on the balance, rates and terms you enter." },
  { q: "What is the break-even point?", a: "Switching lenders usually involves some costs (discharge, application, valuation and settlement fees). The break-even point is how many months of repayment savings it takes to recover those costs. After that, you're ahead." },
  { q: "Will extending my loan term cost me more?", a: "Lowering your rate but stretching the term back out to 30 years can reduce your monthly repayment yet increase total interest. Try matching the new term to your remaining term to see the difference, and ask your broker about keeping repayments steady to pay off faster." },
  { q: "What costs are involved in refinancing?", a: "Typical costs include a discharge fee from your current lender, plus application, valuation and settlement fees with the new lender. Some lenders offer cashback or waive fees. Enter your expected costs above to see the true net benefit." },
];
const CAR_FAQS = [
  { q: "What is a balloon (residual) payment?", a: "A balloon is a lump sum left owing at the end of your car loan. A higher balloon lowers your regular repayments, but you'll need to pay it out, refinance it or sell the car to cover it at the end — and you pay interest on it along the way. Slide the balloon up and down to see the trade-off." },
  { q: "How is my car loan repayment calculated?", a: "We amortise the financed amount (vehicle price minus deposit) over your chosen term at the rate you enter, allowing for any balloon at the end. Interest compounds monthly on the outstanding balance." },
  { q: "Should I put down a deposit?", a: "A deposit reduces the amount you finance, which lowers both your repayments and the total interest you pay. It can also help with approval and pricing. The calculator updates your loan amount as you change the deposit." },
  { q: "What interest rate will I actually get?", a: "Car loan rates depend on your credit profile, the age and type of vehicle, the loan term and whether the loan is secured. Frontline Financial: Asset Solutions compares multiple lenders to find you a sharp rate — the figure here is just an estimate." },
];
const PERSONAL_FAQS = [
  { q: "How is my personal loan repayment calculated?", a: "We use standard principal-and-interest amortisation with monthly compounding over your chosen term. There's no balloon — the loan reduces to zero by the final repayment." },
  { q: "What's the difference between a secured and unsecured personal loan?", a: "A secured loan is backed by an asset (often a vehicle), which usually means a lower rate. An unsecured loan isn't tied to an asset and is typically priced a little higher. Your rate also depends on your credit profile and the loan term." },
  { q: "Can I pay my personal loan off early?", a: "Most personal loans let you make extra repayments or pay out early to save on interest, though some fixed-rate loans may have an early-repayment cost. We can help you choose a flexible product." },
  { q: "What loan term should I choose?", a: "A shorter term means higher repayments but less interest overall; a longer term lowers the repayment but costs more in total. Adjust the term above to find a repayment that's comfortable without over-paying on interest." },
];

const GOOGLE_REVIEWS = [
  { name: "Oliver Stewart", text: "Sham quickly gave me options over multiple lenders that ensured I got the best possible deal on my new car." },
  { name: "Mikhail Alwajih", text: "Sham was phenomenal. He got my loan approved in less than 24 hours. Absolute legend!" },
  { name: "Amy France", text: "Fast, friendly, and incredibly helpful throughout the entire loan process. Everything was clear and easy to understand." },
];

export default function FinancialCalculatorsPage() {
  const [activeTab, setActiveTab] = useState("mortgage");

  // ─── Mortgage state ─────────────────────────────────────────────────────
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [termYears, setTermYears] = useState(30);
  const [repaymentType, setRepaymentType] = useState("pi");
  const [ioPeriodYears, setIoPeriodYears] = useState(5);
  const [offsetBalance, setOffsetBalance] = useState(0);
  const [extraRepayment, setExtraRepayment] = useState(0);
  const [frequency, setFrequency] = useState("monthly");
  const [mortgageExpandTable, setMortgageExpandTable] = useState(false);

  const numPayments = (years) => Math.round(years * 12);

  const mortgage = useMemo(() => {
    const P = Math.max(0, loanAmount);
    const n = numPayments(termYears);
    if (n <= 0) return null;
    const common = { P, annualRate: interestRate, termMonths: n, repaymentType, ioPeriodMonths: numPayments(ioPeriodYears) };
    const scenario = buildMortgageSchedule({ ...common, offset: offsetBalance, extraMonthly: extraRepayment });
    const baseline = buildMortgageSchedule({ ...common, offset: 0, extraMonthly: 0 });
    const hasLever = offsetBalance > 0 || extraRepayment > 0;
    return {
      scenario,
      baseline,
      hasLever,
      interestSaved: Math.max(0, baseline.totalInterest - scenario.totalInterest),
      monthsSaved: Math.max(0, baseline.payoffMonth - scenario.payoffMonth),
      termMonths: n,
      repaymentDisplay: perPeriod(scenario.scheduledPayment, frequency),
      revertDisplay: scenario.revertPayment != null ? perPeriod(scenario.revertPayment, frequency) : null,
      totalInterest: scenario.totalInterest,
      totalPaid: P + scenario.totalInterest,
    };
  }, [loanAmount, interestRate, termYears, repaymentType, ioPeriodYears, offsetBalance, extraRepayment, frequency]);

  const downloadMortgageCSV = useCallback(() => {
    if (!mortgage) return;
    downloadCSV(
      ["Payment #", "Payment", "Principal", "Interest", "Offset Saving", "Balance"],
      mortgage.scenario.rows.map((r) => [r.payment, fmt(r.paymentAmount), fmt(r.principal), fmt(r.interest), fmt(r.offsetSaving || 0), fmt(r.balance)]),
      "mortgage-amortisation.csv"
    );
  }, [mortgage]);

  // ─── Car loan state & result ────────────────────────────────────────────
  const [vehiclePrice, setVehiclePrice] = useState(50000);
  const [deposit, setDeposit] = useState(10000);
  const [carRate, setCarRate] = useState(8);
  const [carTerm, setCarTerm] = useState(5);
  const [balloonPct, setBalloonPct] = useState(20);
  const [balloonMode, setBalloonMode] = useState("percent"); // "percent" | "amount"
  const [balloonAmount, setBalloonAmount] = useState(8000);
  const [carFrequency, setCarFrequency] = useState("monthly");
  const [carExpandTable, setCarExpandTable] = useState(false);

  const carLoanAmount = Math.max(0, vehiclePrice - deposit);

  // Switching unit keeps the balloon equivalent (e.g. 20% of $40k ↔ $8,000).
  const handleBalloonMode = (mode) => {
    if (mode === balloonMode) return;
    if (mode === "amount") setBalloonAmount(Math.round((carLoanAmount * balloonPct) / 100));
    else setBalloonPct(carLoanAmount > 0 ? Math.min(50, Math.round((balloonAmount / carLoanAmount) * 100)) : 0);
    setBalloonMode(mode);
  };
  const carResult = useMemo(() => {
    const P = carLoanAmount;
    const FV = Math.min(P, Math.max(0, balloonMode === "amount" ? balloonAmount : (P * balloonPct) / 100));
    const r = carRate / 100 / 12;
    const n = numPayments(carTerm);
    if (n <= 0) return null;
    const pvBalloon = n > 0 ? FV / Math.pow(1 + r, n) : FV;
    const pmt = n <= 0 ? 0 : r > 0 ? ((P - pvBalloon) * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : (P - FV) / n;
    let balance = P;
    let totalInterest = 0;
    const rows = [];
    const balances = [P];
    for (let i = 1; i <= n; i++) {
      const interest = balance * r;
      const principal = i < n ? pmt - interest : balance - FV;
      totalInterest += interest;
      balance -= principal;
      // Final row = last regular installment (interest + principal) plus the balloon lump sum.
      rows.push({ payment: i, paymentAmount: i < n ? pmt : interest + principal + FV, principal, interest, balance: Math.max(0, balance) });
      balances.push(Math.max(0, balance));
    }
    return { pmt, repaymentDisplay: perPeriod(pmt, carFrequency), totalInterest, balloon: FV, rows, balances, financed: P };
  }, [carLoanAmount, carRate, carTerm, balloonPct, balloonMode, balloonAmount, carFrequency]);

  const downloadCarCSV = useCallback(() => {
    if (!carResult) return;
    downloadCSV(
      ["Payment #", "Payment", "Principal", "Interest", "Balance"],
      carResult.rows.map((r) => [r.payment, fmt(r.paymentAmount), fmt(r.principal), fmt(r.interest), fmt(r.balance)]),
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
    const rCur = refCurrentRate / 100 / 12;
    const nCur = numPayments(refRemainingYears);
    const rNew = refNewRate / 100 / 12;
    const nNew = numPayments(refNewTermYears);
    const fees = Math.max(0, refFees);
    if (nCur <= 0 || nNew <= 0) return null;
    const pmtCur = rCur > 0 ? (rCur * P * Math.pow(1 + rCur, nCur)) / (Math.pow(1 + rCur, nCur) - 1) : P / nCur;
    const pmtNew = rNew > 0 ? (rNew * P * Math.pow(1 + rNew, nNew)) / (Math.pow(1 + rNew, nNew) - 1) : P / nNew;
    let balC = P;
    let intCur = 0;
    const balancesCur = [P];
    const cumIntCur = [0];
    for (let i = 0; i < nCur; i++) {
      const interest = balC * rCur;
      intCur += interest;
      balC = Math.max(0, balC - (pmtCur - interest));
      balancesCur.push(balC);
      cumIntCur.push(intCur);
    }
    let balN = P;
    let intNew = 0;
    const balancesNew = [P];
    const cumIntNew = [0];
    for (let i = 0; i < nNew; i++) {
      const interest = balN * rNew;
      intNew += interest;
      balN = Math.max(0, balN - (pmtNew - interest));
      balancesNew.push(balN);
      cumIntNew.push(intNew);
    }
    const monthlySavings = pmtCur - pmtNew;
    const breakEven = monthlySavings > 0 ? Math.ceil(fees / monthlySavings) : null;
    const totalInterestSaved = intCur - intNew;
    return { pmtCurrent: pmtCur, pmtNew, totalInterestCurrent: intCur, totalInterestNew: intNew, monthlySavings, breakEvenMonths: breakEven, totalInterestSaved, netSavings: totalInterestSaved - fees, fees, balancesCur, balancesNew, cumIntCur, cumIntNew, nCur, nNew };
  }, [refBalance, refCurrentRate, refRemainingYears, refNewRate, refNewTermYears, refFees]);

  // ─── Personal loan state & result ───────────────────────────────────────
  const [personalAmount, setPersonalAmount] = useState(15000);
  const [personalRate, setPersonalRate] = useState(12);
  const [personalTermYears, setPersonalTermYears] = useState(5);
  const [personalFrequency, setPersonalFrequency] = useState("monthly");
  const [personalExpandTable, setPersonalExpandTable] = useState(false);

  const personalResult = useMemo(() => {
    const P = Math.max(0, personalAmount);
    const r = personalRate / 100 / 12;
    const n = numPayments(personalTermYears);
    if (n <= 0) return null;
    const pmt = r > 0 ? (r * P * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : P / n;
    let balance = P;
    let totalInterest = 0;
    const rows = [];
    const balances = [P];
    for (let i = 1; i <= n; i++) {
      const interest = balance * r;
      const principal = pmt - interest;
      totalInterest += interest;
      balance -= principal;
      rows.push({ payment: i, paymentAmount: pmt, principal, interest, balance: Math.max(0, balance) });
      balances.push(Math.max(0, balance));
    }
    return { pmt, repaymentDisplay: perPeriod(pmt, personalFrequency), totalInterest, totalPaid: P + totalInterest, rows, balances, principal: P };
  }, [personalAmount, personalRate, personalTermYears, personalFrequency]);

  const downloadPersonalCSV = useCallback(() => {
    if (!personalResult) return;
    downloadCSV(
      ["Payment #", "Payment", "Principal", "Interest", "Balance"],
      personalResult.rows.map((r) => [r.payment, fmt(r.paymentAmount), fmt(r.principal), fmt(r.interest), fmt(r.balance)]),
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
      <div className="min-h-screen bg-[#F5F5EF] font-sans">
        <LayoutNav activeNav="calculators" />

        {/* ─── COMPACT HERO ─────────────────────────────────────────────── */}
        <section className="section-dot-grid px-4 pt-8 pb-6 md:px-6 md:pt-10 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#39B2B2]">Free finance tools</p>
            <h1 className="mt-1.5 text-3xl font-bold tracking-tight text-[#1C5472] md:text-4xl">Financial calculators</h1>
          </div>
        </section>

        {/* ─── TAB BAR ──────────────────────────────────────────────────── */}
        <section className="px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {TABS.map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    aria-pressed={active}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${
                      active ? "border-[#1C5472] bg-[#1C5472] shadow-md" : "border-[#1C5472]/12 bg-white hover:border-[#39B2B2] hover:shadow-sm"
                    }`}
                  >
                    <TabIcon type={tab.icon} className={`h-6 w-6 shrink-0 ${active ? "text-[#00FCB8]" : "text-[#39B2B2]"}`} />
                    <span className="flex min-w-0 flex-col leading-tight">
                      <span className={`text-sm font-bold ${active ? "text-white" : "text-[#1C5472]"}`}>{tab.label}</span>
                      <span className={`truncate text-[11px] font-medium ${active ? "text-white/70" : "text-[#1C5472]/55"}`}>{tab.sub}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── CALCULATOR BODY ──────────────────────────────────────────── */}
        <section className="px-4 pb-12 pt-5 md:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* ── Mortgage ── */}
            {activeTab === "mortgage" && mortgage && (
              <div className="rounded-2xl border border-[#1C5472]/10 bg-white p-5 shadow-lg md:p-7">
                <h2 className="text-xl font-bold text-[#1C5472] md:text-2xl">Mortgage calculator</h2>
                <p className="mt-1 text-sm text-[#1C5472]/70">Principal &amp; Interest or Interest Only, with optional offset and extra repayments.</p>

                <div className="mt-6 grid gap-7 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start">
                  <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
                    <NumberField label="Loan amount" value={loanAmount} onChange={(v) => setLoanAmount(v === "" ? 0 : Number(v))} min={50000} max={5000000} currency prefix="$" maxDecimals={0} />
                    <NumberField label="Loan term" value={termYears} onChange={(v) => setTermYears(v === "" ? 1 : Number(v))} min={1} max={30} suffix="years" maxDecimals={0} />
                    <NumberField label="Interest rate" value={interestRate} onChange={(v) => setInterestRate(v === "" ? 0 : Number(v))} min={0.1} max={25} suffix="% p.a." />
                    <NumberField label="Offset balance" value={offsetBalance} onChange={(v) => setOffsetBalance(v === "" ? 0 : Number(v))} min={0} max={loanAmount} currency prefix="$" maxDecimals={0} />
                    <SegmentedField full label="Repayment type" value={repaymentType} onChange={setRepaymentType} options={[{ value: "pi", label: "Principal & Interest" }, { value: "io", label: "Interest Only" }]} />
                    {repaymentType === "io" && (
                      <NumberField label="Interest-only period" value={ioPeriodYears} onChange={(v) => setIoPeriodYears(v === "" ? 1 : Number(v))} min={1} max={10} suffix="yrs" maxDecimals={0} help="Then reverts to P&I." />
                    )}
                    <NumberField full={repaymentType !== "io"} label="Extra repayment" value={extraRepayment} onChange={(v) => setExtraRepayment(v === "" ? 0 : Number(v))} min={0} currency prefix="$" suffix="/mo" maxDecimals={0} help="Paid straight off your principal." />
                    <SegmentedField full label="Repayment frequency" value={frequency} onChange={setFrequency} options={FREQ_OPTIONS} />
                  </div>

                  <ResultsPanel>
                    <HeadlineCard
                      caption="Estimated repayment"
                      amount={fmt(mortgage.repaymentDisplay)}
                      sub={`per ${freqNoun(frequency)}${repaymentType === "io" ? " (interest only)" : ""}`}
                      note={repaymentType === "io" && mortgage.revertDisplay != null ? (
                        <>Then <strong className="font-extrabold">{fmt(mortgage.revertDisplay)}</strong> per {freqNoun(frequency)} (P&amp;I) after the {ioPeriodYears}-year interest-only period.</>
                      ) : null}
                      stats={[
                        { label: "Total interest", value: fmt0(mortgage.totalInterest) },
                        { label: "Total to repay", value: fmt0(mortgage.totalPaid) },
                      ]}
                    />
                    <BreakdownCard
                      segments={[
                        { value: loanAmount, color: PRINCIPAL_COLOR, label: "Principal" },
                        { value: mortgage.totalInterest, color: INTEREST_COLOR, label: "Interest" },
                      ]}
                      centerLabel="Total"
                      centerValue={fmt0(mortgage.totalPaid)}
                      legend={[
                        { color: PRINCIPAL_COLOR, label: "Principal borrowed", value: loanAmount },
                        { color: INTEREST_COLOR, label: "Interest", value: mortgage.totalInterest },
                      ]}
                    />
                  </ResultsPanel>
                </div>

                {mortgage.hasLever && (mortgage.interestSaved > 0 || mortgage.monthsSaved > 0) && (
                  <div className="mt-6 flex items-start gap-4 rounded-2xl border-2 border-[#00FCB8] bg-[#00FCB8]/10 p-5">
                    <svg className="mt-0.5 h-7 w-7 shrink-0 text-[#0A6B57]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                    <div>
                      <p className="font-bold text-[#1C5472]">
                        With your {offsetBalance > 0 && extraRepayment > 0 ? "offset & extra repayments" : offsetBalance > 0 ? "offset account" : "extra repayments"}, you could:
                      </p>
                      <p className="mt-1 text-[#1C5472]/85">
                        Save <span className="font-bold text-[#0A6B57]">{fmt0(mortgage.interestSaved)}</span> in interest and be debt-free{" "}
                        <span className="font-bold text-[#0A6B57]">{monthsLabel(mortgage.monthsSaved)}</span> sooner.
                      </p>
                    </div>
                  </div>
                )}

                <ChartCard
                  title="Loan balance & interest paid"
                  legend={<><SolidLegend color={PRINCIPAL_COLOR} label="Loan balance" /><SolidLegend color={INTEREST_COLOR} label="Interest paid" />{mortgage.hasLever && <DashedLegend label="Standard repayments" />}</>}
                >
                  <LoanBalanceChart
                    xMaxMonths={mortgage.termMonths}
                    series={
                      mortgage.hasLever
                        ? [
                            { values: mortgage.baseline.balances, color: PRINCIPAL_COLOR, dashed: true, label: "Balance — standard" },
                            { values: cumulativeInterest(mortgage.baseline.rows), color: INTEREST_COLOR, dashed: true, label: "Interest — standard" },
                            { values: mortgage.scenario.balances, color: PRINCIPAL_COLOR, fill: true, label: "Loan balance" },
                            { values: cumulativeInterest(mortgage.scenario.rows), color: INTEREST_COLOR, label: "Interest paid" },
                          ]
                        : [
                            { values: mortgage.scenario.balances, color: PRINCIPAL_COLOR, fill: true, label: "Loan balance" },
                            { values: cumulativeInterest(mortgage.scenario.rows), color: INTEREST_COLOR, label: "Interest paid" },
                          ]
                    }
                  />
                </ChartCard>

                <AmortTable rows={mortgage.scenario.rows} expand={mortgageExpandTable} setExpand={setMortgageExpandTable} showOffset={offsetBalance > 0} download={downloadMortgageCSV} />
                <FAQBlock title="Mortgage calculator FAQs" items={MORTGAGE_FAQS} />
                <BrokingDisclaimer />
                <ContactCTA emoji="🏡" title="Ready to see what you qualify for?" blurb="Get a free home loan eligibility assessment — no obligation, no credit-check impact." name="Hassan" phone="0422 959 486" tel="tel:+61422959486" />
              </div>
            )}

            {/* ── Refinance ── */}
            {activeTab === "refinance" && refResult && (
              <div className="rounded-2xl border border-[#1C5472]/10 bg-white p-5 shadow-lg md:p-7">
                <h2 className="text-xl font-bold text-[#1C5472] md:text-2xl">Refinance calculator</h2>
                <p className="mt-1 text-sm text-[#1C5472]/70">See how much a sharper rate could save you — and when you&apos;d break even on the switching costs.</p>

                <div className="mt-6 grid gap-7 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start">
                  <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
                    <NumberField label="Current balance" value={refBalance} onChange={(v) => setRefBalance(v === "" ? 0 : Number(v))} min={10000} max={3000000} currency prefix="$" maxDecimals={0} />
                    <NumberField label="Refinance costs" value={refFees} onChange={(v) => setRefFees(v === "" ? 0 : Number(v))} min={0} currency prefix="$" maxDecimals={0} help="Discharge, application, valuation & settlement fees." />
                    <NumberField label="Current rate" value={refCurrentRate} onChange={(v) => setRefCurrentRate(v === "" ? 0 : Number(v))} min={0.1} max={25} suffix="% p.a." />
                    <NumberField label="New rate" value={refNewRate} onChange={(v) => setRefNewRate(v === "" ? 0 : Number(v))} min={0.1} max={25} suffix="% p.a." />
                    <NumberField label="Remaining term" value={refRemainingYears} onChange={(v) => setRefRemainingYears(v === "" ? 1 : Number(v))} min={1} max={30} suffix="years" maxDecimals={0} />
                    <NumberField label="New term" value={refNewTermYears} onChange={(v) => setRefNewTermYears(v === "" ? 1 : Number(v))} min={1} max={30} suffix="years" maxDecimals={0} />
                  </div>

                  <ResultsPanel>
                    <HeadlineCard
                      caption="New repayment"
                      amount={fmt(refResult.pmtNew)}
                      sub="per month"
                      stats={[
                        { label: "Monthly saving", value: fmt0(refResult.monthlySavings) },
                        { label: "Per year", value: fmt0(refResult.monthlySavings * 12) },
                      ]}
                    />
                    <div className="space-y-4 rounded-2xl border border-[#1C5472]/10 bg-white p-5 shadow-sm">
                      <ResultStat label="Total interest saved (after costs)" value={fmt0(refResult.netSavings)} accent={refResult.netSavings >= 0} />
                      {refResult.breakEvenMonths != null ? (
                        <ResultStat label="Break-even on switching costs" value={`${refResult.breakEvenMonths} months`} />
                      ) : (
                        <ResultStat label="Break-even" value="No monthly saving" />
                      )}
                      <div className="grid grid-cols-2 gap-4">
                        <ResultStat label="Interest — current" value={fmt0(refResult.totalInterestCurrent)} />
                        <ResultStat label="Interest — new" value={fmt0(refResult.totalInterestNew)} accent />
                      </div>
                    </div>
                  </ResultsPanel>
                </div>

                <ChartCard title="Loan balance & interest paid" legend={<><SolidLegend color={PRINCIPAL_COLOR} label="Loan balance" /><SolidLegend color={INTEREST_COLOR} label="Interest paid" /><DashedLegend label="Current loan" /></>}>
                  <LoanBalanceChart
                    xMaxMonths={Math.max(refResult.nCur, refResult.nNew)}
                    series={[
                      { values: refResult.balancesCur, color: PRINCIPAL_COLOR, dashed: true, label: "Balance — current" },
                      { values: refResult.cumIntCur, color: INTEREST_COLOR, dashed: true, label: "Interest — current" },
                      { values: refResult.balancesNew, color: PRINCIPAL_COLOR, fill: true, label: "Loan balance — new" },
                      { values: refResult.cumIntNew, color: INTEREST_COLOR, label: "Interest paid — new" },
                    ]}
                  />
                </ChartCard>

                <FAQBlock title="Refinance FAQs" items={REFINANCE_FAQS} />
                <BrokingDisclaimer />
                <ContactCTA emoji="🔄" title="Could you be on a sharper rate?" blurb="Get a free refinance health-check — we compare 30+ lenders to find your best fit." name="Hassan" phone="0422 959 486" tel="tel:+61422959486" />
              </div>
            )}

            {/* ── Car loan ── */}
            {activeTab === "car" && carResult && (
              <div className="rounded-2xl border border-[#1C5472]/10 bg-white p-5 shadow-lg md:p-7">
                <h2 className="text-xl font-bold text-[#1C5472] md:text-2xl">Car loan calculator</h2>
                <p className="mt-1 text-sm text-[#1C5472]/70">Work out your repayments, with an optional balloon (residual) payment.</p>

                <div className="mt-6 grid gap-7 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start">
                  <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
                    <NumberField label="Vehicle price" value={vehiclePrice} onChange={(v) => setVehiclePrice(v === "" ? 0 : Number(v))} min={1000} max={500000} currency prefix="$" maxDecimals={0} />
                    <NumberField label="Deposit / trade-in" value={deposit} onChange={(v) => setDeposit(v === "" ? 0 : Number(v))} min={0} max={vehiclePrice} currency prefix="$" maxDecimals={0} />
                    <div className="flex items-center justify-between rounded-xl bg-[#39B2B2]/10 px-4 py-3.5 font-semibold text-[#1C5472] sm:col-span-2">
                      <span className="text-sm">Amount financed</span>
                      <span className="text-xl font-bold">{fmt0(carLoanAmount)}</span>
                    </div>
                    <NumberField label="Interest rate" value={carRate} onChange={(v) => setCarRate(v === "" ? 0 : Number(v))} min={0.1} max={25} suffix="% p.a." />
                    <NumberField label="Term" value={carTerm} onChange={(v) => setCarTerm(v === "" ? 1 : Number(v))} min={1} max={7} suffix="years" maxDecimals={0} />
                    <NumberField
                      full
                      label="Balloon / residual"
                      labelRight={<UnitToggle value={balloonMode} onChange={handleBalloonMode} options={[{ value: "percent", label: "%" }, { value: "amount", label: "$" }]} />}
                      {...(balloonMode === "percent"
                        ? { value: balloonPct, onChange: (v) => setBalloonPct(v === "" ? 0 : Number(v)), min: 0, max: 50, suffix: "%", maxDecimals: 0 }
                        : { value: balloonAmount, onChange: (v) => setBalloonAmount(v === "" ? 0 : Number(v)), min: 0, max: Math.round(carLoanAmount * 0.5) || 0, currency: true, prefix: "$", maxDecimals: 0 })}
                      help={balloonMode === "percent"
                        ? `≈ ${fmt0((carLoanAmount * balloonPct) / 100)} of the amount financed`
                        : `≈ ${carLoanAmount > 0 ? Math.round((balloonAmount / carLoanAmount) * 100) : 0}% of the amount financed`}
                    />
                    <SegmentedField full label="Repayment frequency" value={carFrequency} onChange={setCarFrequency} options={FREQ_OPTIONS} />
                  </div>

                  <ResultsPanel>
                    <HeadlineCard
                      caption="Estimated repayment"
                      amount={fmt(carResult.repaymentDisplay)}
                      sub={`per ${freqNoun(carFrequency)}`}
                      stats={[
                        { label: "Balloon at end", value: fmt0(carResult.balloon) },
                        { label: "Total interest", value: fmt0(carResult.totalInterest) },
                      ]}
                    />
                    <BreakdownCard
                      segments={[
                        { value: carResult.financed, color: PRINCIPAL_COLOR, label: "Financed" },
                        { value: carResult.totalInterest, color: INTEREST_COLOR, label: "Interest" },
                      ]}
                      centerLabel="Total cost"
                      centerValue={fmt0(carResult.financed + carResult.totalInterest)}
                      legend={[
                        { color: PRINCIPAL_COLOR, label: "Amount financed", value: carResult.financed },
                        { color: INTEREST_COLOR, label: "Interest", value: carResult.totalInterest },
                      ]}
                    />
                  </ResultsPanel>
                </div>

                <ChartCard
                  title="Loan balance & interest paid"
                  legend={<><SolidLegend color={PRINCIPAL_COLOR} label="Loan balance" /><SolidLegend color={INTEREST_COLOR} label="Interest paid" /></>}
                  note={carResult.balloon > 0 ? `The balance levels off at your balloon payment of ${fmt0(carResult.balloon)}, due as a lump sum at the end of the term.` : null}
                >
                  <LoanBalanceChart
                    xMaxMonths={numPayments(carTerm)}
                    series={[
                      { values: carResult.balances, color: PRINCIPAL_COLOR, fill: true, label: "Loan balance" },
                      { values: cumulativeInterest(carResult.rows), color: INTEREST_COLOR, label: "Interest paid" },
                    ]}
                  />
                </ChartCard>

                <AmortTable rows={carResult.rows} expand={carExpandTable} setExpand={setCarExpandTable} showOffset={false} download={downloadCarCSV} />
                <FAQBlock title="Car loan FAQs" items={CAR_FAQS} />
                <AssetDisclaimer />
                <ContactCTA emoji="🚗" title="Ready to get behind the wheel?" blurb="Get a free car loan eligibility check — fast approvals, competitive rates. Sham — Award-winning finance broker, FY25." name="Sham" phone="0450 553 877" tel="tel:+61450553877" />
              </div>
            )}

            {/* ── Personal loan ── */}
            {activeTab === "personal" && personalResult && (
              <div className="rounded-2xl border border-[#1C5472]/10 bg-white p-5 shadow-lg md:p-7">
                <h2 className="text-xl font-bold text-[#1C5472] md:text-2xl">Personal loan calculator</h2>
                <p className="mt-1 text-sm text-[#1C5472]/70">Estimate the repayments and total interest on a personal loan.</p>

                <div className="mt-6 grid gap-7 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start">
                  <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
                    <NumberField label="Loan amount" value={personalAmount} onChange={(v) => setPersonalAmount(v === "" ? 0 : Number(v))} min={2000} max={100000} currency prefix="$" maxDecimals={0} />
                    <NumberField label="Term" value={personalTermYears} onChange={(v) => setPersonalTermYears(v === "" ? 1 : Number(v))} min={1} max={7} suffix="years" maxDecimals={0} />
                    <NumberField full label="Interest rate" value={personalRate} onChange={(v) => setPersonalRate(v === "" ? 0 : Number(v))} min={0.1} max={25} suffix="% p.a." />
                    <SegmentedField full label="Repayment frequency" value={personalFrequency} onChange={setPersonalFrequency} options={FREQ_OPTIONS} />
                  </div>

                  <ResultsPanel>
                    <HeadlineCard
                      caption="Estimated repayment"
                      amount={fmt(personalResult.repaymentDisplay)}
                      sub={`per ${freqNoun(personalFrequency)}`}
                      stats={[
                        { label: "Total interest", value: fmt0(personalResult.totalInterest) },
                        { label: "Total to repay", value: fmt0(personalResult.totalPaid) },
                      ]}
                    />
                    <BreakdownCard
                      segments={[
                        { value: personalResult.principal, color: PRINCIPAL_COLOR, label: "Principal" },
                        { value: personalResult.totalInterest, color: INTEREST_COLOR, label: "Interest" },
                      ]}
                      centerLabel="Total"
                      centerValue={fmt0(personalResult.totalPaid)}
                      legend={[
                        { color: PRINCIPAL_COLOR, label: "Principal borrowed", value: personalResult.principal },
                        { color: INTEREST_COLOR, label: "Interest", value: personalResult.totalInterest },
                      ]}
                    />
                  </ResultsPanel>
                </div>

                <ChartCard
                  title="Loan balance & interest paid"
                  legend={<><SolidLegend color={PRINCIPAL_COLOR} label="Loan balance" /><SolidLegend color={INTEREST_COLOR} label="Interest paid" /></>}
                >
                  <LoanBalanceChart
                    xMaxMonths={numPayments(personalTermYears)}
                    series={[
                      { values: personalResult.balances, color: PRINCIPAL_COLOR, fill: true, label: "Loan balance" },
                      { values: cumulativeInterest(personalResult.rows), color: INTEREST_COLOR, label: "Interest paid" },
                    ]}
                  />
                </ChartCard>

                <AmortTable rows={personalResult.rows} expand={personalExpandTable} setExpand={setPersonalExpandTable} showOffset={false} download={downloadPersonalCSV} />
                <FAQBlock title="Personal loan FAQs" items={PERSONAL_FAQS} />
                <AssetDisclaimer />
                <ContactCTA emoji="💰" title="Need funds for something important?" blurb="Fast approvals, competitive rates. Sham — Award-winning finance broker, FY25." name="Sham" phone="0450 553 877" tel="tel:+61450553877" />
              </div>
            )}
          </div>
        </section>

        {/* ─── TRUST / REVIEWS ──────────────────────────────────────────── */}
        <WaveDivider fill="#1C5472" />
        <section className="bg-[#1C5472] px-4 py-14 md:px-6 md:py-16 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">Why Frontline</p>
              <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">Numbers are a start. A broker gets it done.</h2>
              <p className="mx-auto mt-3 max-w-2xl text-white/80">
                These tools give you the picture. Our award-winning brokers compare 30+ lenders, handle the paperwork and get you a real outcome — at no cost to you.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {GOOGLE_REVIEWS.map((review, i) => (
                <div key={i} className="rounded-xl bg-white p-5 text-[#1C5472] shadow-md">
                  <div className="flex gap-0.5 text-[#FFD700]">
                    {[0, 1, 2, 3, 4].map((j) => (
                      <svg key={j} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed">&quot;{review.text}&quot;</p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1C5472] text-sm font-bold text-white">{review.name.charAt(0)}</div>
                    <p className="text-sm font-bold">{review.name}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-lg bg-[#00FCB8] px-7 py-3 font-bold text-[#1C5472] transition hover:scale-105 hover:opacity-90">
                Book a free consultation
              </Link>
              <Link href="/about" className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-7 py-3 font-bold text-white transition hover:bg-white/10">
                Learn more about us
              </Link>
            </div>
          </div>
        </section>

        <WaveDivider fill="#1C5472" />
        <LayoutFooter />
      </div>
    </ComplianceEntityContext.Provider>
  );
}
