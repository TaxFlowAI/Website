import Link from "next/link";

/* Shows off the credit proposal every home loan client gets. The page in the
   middle follows "Our Recommendation" in the real document, but it's a sample:
   real proposals hold client details, so never publish a screenshot of one.
   Names, lenders and figures are made up and the sums are consistent. No interest
   rates, because an advertised rate has to carry a comparison rate; no lender
   names, in line with the rest of the site. */

const CALLOUTS = [
  {
    title: "What we get paid",
    desc: "Our commission in dollars, right at the top. The lender pays it, not you.",
  },
  {
    title: "Why this loan",
    desc: "The reasons in plain English, written for your situation.",
  },
  {
    title: "What else we looked at",
    desc: "Other loans side by side. If one looks cheaper and we didn't pick it, we tell you why.",
  },
];

const OPTIONS = [
  { lender: "Lender A", recommended: true, three: "$112,600", thirty: "$737,000", commission: "$4,290" },
  { lender: "Lender B", three: "$111,600", thirty: "$730,400", commission: "$4,290" },
  { lender: "Lender C", three: "$123,500", thirty: "$822,600", commission: "$4,290" },
];

function Marker({ n }) {
  return (
    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00FCB8] text-xs font-bold text-[#1C5472]">
      {n}
    </span>
  );
}

function SampleHeading({ marker, children }) {
  return (
    <div className="flex items-center gap-2">
      <h4 className="text-[15px] font-bold text-[#1C5472] sm:text-base">{children}</h4>
      <span aria-hidden><Marker n={marker} /></span>
    </div>
  );
}

function SamplePage() {
  return (
    <div className="relative">
      {/* the rest of the document, fanned out behind this page */}
      <div className="absolute inset-0 -rotate-2 rounded-lg bg-white/25" aria-hidden />
      <div className="absolute inset-0 rotate-1 rounded-lg bg-white/45" aria-hidden />

      <figure className="relative rounded-lg bg-white p-4 text-[#1C5472] shadow-[0_32px_70px_-28px_rgba(10,22,40,0.75)] sm:p-7">
        <div className="flex items-center justify-between gap-3 border-b border-[#1C5472]/10 pb-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logos/frontline-logo.svg" alt="Frontline Financial" width={126} height={32} className="h-7 w-auto" loading="lazy" />
          <span className="rounded-full bg-[#1C5472] px-2.5 py-1 text-[11px] font-bold tracking-wide text-white">Sample</span>
        </div>

        <h3 className="mt-4 text-xl font-bold sm:text-2xl">Our recommendation</h3>
        <dl className="mt-2.5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5 text-[13px] sm:text-sm">
          <dt className="font-bold">Lender</dt>
          <dd>Lender A</dd>
          <dt className="font-bold">Product</dt>
          <dd>Variable, principal and interest, with offset</dd>
          <dt className="font-bold">Loan amount</dt>
          <dd className="tabular-nums">$600,000</dd>
        </dl>

        <div className="mt-3.5 rounded-lg bg-[#F5F5EF] p-3">
          <div className="flex items-center gap-2">
            <p className="text-[13px] font-bold sm:text-sm">What we&apos;d be paid by the lender</p>
            <span aria-hidden><Marker n={1} /></span>
          </div>
          <div className="mt-1 flex flex-wrap gap-x-6 gap-y-0.5 text-[13px] tabular-nums sm:text-sm">
            <p>Upfront: <span className="font-bold">$4,290</span></p>
            <p>First-year ongoing: <span className="font-bold">$990</span></p>
          </div>
        </div>

        <div className="mt-4">
          <SampleHeading marker={2}>Why we chose this loan</SampleHeading>
          <div className="mt-1.5 space-y-1.5 text-[13px] leading-relaxed text-[#1C5472]/90 sm:text-sm">
            <p>You&apos;re self-employed and your latest year is your strongest. Lender A assesses your most recent financial year, so it can use your current income.</p>
            <p>Lender B shows a slightly lower cost, but it averages two years of income, which wouldn&apos;t support the amount you need. That price isn&apos;t open to you.</p>
            <p>Against Lender C, Lender A costs $10,900 less over 3 years and $85,600 less over 30. It also has the offset account you asked for.</p>
          </div>
        </div>

        <div className="mt-4">
          <SampleHeading marker={3}>The loans we compared</SampleHeading>
          <div className="mt-2 overflow-x-auto rounded-lg">
            <table className="w-full border-collapse text-left text-xs tabular-nums sm:text-[13px]">
              <thead className="bg-[#1C5472] text-white">
                <tr>
                  <th scope="col" className="px-1.5 py-2 font-bold sm:px-3">Lender</th>
                  <th scope="col" className="px-1.5 py-2 font-bold sm:px-3">Cost over 3 years</th>
                  <th scope="col" className="px-1.5 py-2 font-bold sm:px-3">Cost over 30 years</th>
                  <th scope="col" className="px-1.5 py-2 font-bold sm:px-3">Upfront commission</th>
                </tr>
              </thead>
              <tbody>
                {OPTIONS.map((o) => (
                  <tr key={o.lender} className={o.recommended ? "bg-[#00FCB8]/20" : "border-b border-[#1C5472]/10 bg-white last:border-b-0"}>
                    <th scope="row" className="px-1.5 py-2 align-top font-bold sm:px-3">
                      {o.lender}
                      {o.recommended && <span className="block text-[11px] font-bold">Recommended</span>}
                    </th>
                    <td className="px-1.5 py-2 align-top sm:px-3">{o.three}</td>
                    <td className="px-1.5 py-2 align-top sm:px-3">{o.thirty}</td>
                    <td className="px-1.5 py-2 align-top sm:px-3">{o.commission}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <figcaption className="mt-3 text-[11px] leading-snug text-[#1C5472]/75 sm:text-xs">
          Sample only. The client, lenders and figures are made up to show the layout. Cost means interest and fees.
          Your proposal uses your own numbers.
        </figcaption>
      </figure>
    </div>
  );
}

export default function CreditProposalShowcase({ ctaHref, ctaLabel, tone = "dark" }) {
  const dark = tone === "dark";
  const body = dark ? "text-white/85" : "text-[#1C5472]/85";
  const heading = dark ? "text-white" : "text-[#1C5472]";

  return (
    <section
      id="credit-proposal"
      className={`relative scroll-mt-24 overflow-hidden px-4 py-16 md:px-6 md:py-20 lg:px-8 ${dark ? "section-dot-grid-dark" : "section-dot-grid"}`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,600px)] lg:gap-16">
        <div>
          <h2 className={`text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl ${heading}`}>
            You see our working, not just the answer.
          </h2>
          <p className={`mt-5 max-w-xl text-lg leading-relaxed ${body}`}>
            Before anything goes to a lender, you get a written credit proposal. It sets out the loans we compared, what each
            one costs, why we picked one and what we get paid.
          </p>
          <ol className="mt-8 max-w-xl space-y-5">
            {CALLOUTS.map((c, i) => (
              <li key={c.title} className="flex gap-3.5">
                <Marker n={i + 1} />
                <div>
                  <h3 className={`font-bold ${heading}`}>{c.title}</h3>
                  <p className={`mt-0.5 ${body}`}>{c.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className={`mt-7 max-w-xl text-sm leading-relaxed ${body}`}>
            Also inside: your goals, the rate and repayments, every fee, and how the numbers stack up for you. You read it,
            then decide whether to go ahead.
          </p>
          {ctaHref && (
            <Link
              href={ctaHref}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#00FCB8] px-6 py-3 font-bold text-[#1C5472] transition-all duration-200 hover:scale-105 hover:opacity-90 sm:w-auto"
            >
              {ctaLabel}
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          )}
        </div>
        <SamplePage />
      </div>
    </section>
  );
}
