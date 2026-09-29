import WaveDivider from "@/components/WaveDivider";

/* Frontline Financial (home loans) section, dropped into a TaxFlowAI page.
   Deliberately in Frontline branding — cream, dark blue, teal, aqua — with
   waves in and out of the surrounding TaxFlowAI navy. Credit is arranged by
   Frontline Financial Brokers, not TaxFlowAI; the disclosure below says so.
   `from` / `to` are the background colours of the sections either side. */

const PHONE = "+61 422 959 486";
const PHONE_LINK = "tel:+61422959486";

function Tick({ className = "h-4 w-4" }) {
  return (
    <svg className={`${className} shrink-0`} fill="none" stroke="#00FCB8" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function FrontlineLmiSection({ from = "#0A1628", to = "#060D1A" }) {
  const points = [
    "Some lenders waive lenders mortgage insurance (LMI) for eligible medical professionals, so you can buy with a smaller deposit without paying it.",
    "On a typical Sydney purchase with a 10% deposit, LMI can add tens of thousands of dollars to your loan. A waiver keeps that money in your pocket.",
    "Doctors are the most commonly eligible. Some lenders also include dentists and other registered health professionals. Limits and criteria vary by lender.",
    "Frontline Financial compares lenders for you and tells you which ones your occupation, registration and income qualify for, before any application goes in.",
  ];

  return (
    <div className="font-sans">
      <div style={{ background: from }}>
        <WaveDivider fill="#F5F5EF" />
      </div>

      <section id="no-lmi-home-loans" className="relative bg-[#F5F5EF] px-4 py-14 md:px-6 md:py-20 lg:px-8" style={{ scrollMarginTop: "110px" }}>
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* copy */}
          <div className="lg:col-span-7">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logos/frontline-logo.svg"
              alt="Frontline Financial"
              className="h-10 w-auto md:h-11"
              width={180}
              height={44}
              loading="lazy"
            />
            <p className="mt-8 border-l-4 border-[#00FCB8] pl-4 text-xs font-bold uppercase tracking-[0.2em] text-[#39B2B2]">
              Home loans for medical professionals
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-[#1C5472] md:text-4xl">
              Buying a home? Doctors can often skip LMI.
            </h2>
            <ul className="mt-6 space-y-3.5">
              {points.map((p) => (
                <li key={p.slice(0, 30)} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#1C5472]">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1C5472]">
                    <Tick className="h-3.5 w-3.5" />
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/brokers"
                className="inline-flex items-center justify-center rounded-lg bg-[#00FCB8] px-6 py-3.5 font-bold text-[#0A1628] transition-all duration-200 hover:scale-105 hover:opacity-90"
              >
                Learn more
              </a>
              <a
                href={PHONE_LINK}
                className="inline-flex items-center justify-center rounded-lg border-2 border-[#1C5472] px-6 py-3.5 font-bold text-[#1C5472] transition hover:bg-[#1C5472]/10"
              >
                Call Hassan: {PHONE}
              </a>
            </div>
          </div>

          {/* visual: with vs without a waiver */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-[#1C5472]/10">
              <div className="bg-[#1C5472] px-6 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#00FCB8]">Buying with a 10% deposit</p>
              </div>
              <div className="divide-y divide-[#1C5472]/10">
                <div className="flex items-center justify-between gap-4 px-6 py-5">
                  <div>
                    <p className="font-bold text-[#1C5472]">Most borrowers</p>
                    <p className="mt-0.5 text-sm text-[#1C5472]/70">LMI is charged, usually added to the loan</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#1C5472]/10 px-3 py-1 text-sm font-bold text-[#1C5472]">LMI payable</span>
                </div>
                <div className="flex items-center justify-between gap-4 bg-[#00FCB8]/10 px-6 py-5">
                  <div>
                    <p className="font-bold text-[#1C5472]">Eligible doctors</p>
                    <p className="mt-0.5 text-sm text-[#1C5472]/70">With a lender that offers the waiver</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#1C5472] px-3 py-1 text-sm font-bold text-[#00FCB8]">
                    <Tick className="h-3.5 w-3.5" />
                    LMI waived
                  </span>
                </div>
              </div>
              <p className="bg-[#F5F5EF]/60 px-6 py-4 text-xs leading-relaxed text-[#1C5472]/70">
                Waivers, maximum loan sizes and deposit limits depend on the lender
                and your eligibility.
              </p>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-6xl text-xs leading-relaxed text-[#1C5472]/60">
          Home loans are arranged by Frontline Financial Brokers, not TaxFlowAI.
          Frontline Financial Pty Ltd is an Authorised Credit Representative (CRN
          575968) of Australian Credit Licence 389087. Credit is subject to lender
          assessment and eligibility criteria. General information only; it does
          not take your personal circumstances into account.
        </p>
      </section>

      <div className="bg-[#F5F5EF]">
        <WaveDivider fill={to} />
      </div>
    </div>
  );
}
