/* The free Equifax report offer from /vehicle-finance, for the vehicle and equipment
   applications. Its terms limit it to vehicle or equipment finance, so it stays off
   the home loan, personal loan and working capital pages. Same terms as that page:
   change both together. */
export default function FreeCreditReportOffer({ ctaHref = "#application" }) {
  return (
    <section id="free-credit-report" className="relative scroll-mt-24 overflow-hidden bg-[#0A1628] px-4 py-14 md:px-6 md:py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative mx-auto w-full max-w-xs md:max-w-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/credit-score-phone.webp"
            alt="A phone showing a credit score with links to the full credit report and enquiries"
            width={1254}
            height={1254}
            loading="lazy"
            className="h-auto w-full"
          />
          <span className="absolute left-0 top-3 rotate-[-8deg] rounded-full bg-[#00FCB8] px-4 py-2 text-sm font-bold text-[#0A1628]">Free*</span>
        </div>
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
            Know your score <span className="text-[#00FCB8]">before the lender does.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
            Your free assessment includes a copy of your Equifax credit report, and our team walks you through what lenders will
            see, so there are no surprises when your application goes in.*
          </p>
          <ul className="mt-6 max-w-xl space-y-3 text-white">
            {["Every enquiry, account and default on file", "Spot errors or old defaults before you apply", "It doesn't lodge an application with any lender"].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <svg className="mt-1 h-4 w-4 shrink-0 text-[#00FCB8]" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
                  <path d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
          <a
            href={ctaHref}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#00FCB8] px-6 py-3 font-bold text-[#0A1628] transition-all duration-200 hover:scale-105 hover:opacity-90 sm:w-auto"
          >
            Back to your application
          </a>
          <div className="mt-6 max-w-xl text-xs leading-relaxed text-white/70">
            <p className="font-bold text-white/80">*Free Equifax credit report: terms and conditions</p>
            <ul className="mt-1.5 list-disc space-y-1 pl-4">
              <li>
                Offered at our discretion as part of an assessment for vehicle or equipment finance. We may decline to provide
                the report if, after reviewing your enquiry, we determine you do not meet the criteria for the finance you are seeking.
              </li>
              <li>Obtaining your report requires your consent and identity verification. Accessing it for this purpose does not lodge a finance application with any lender.</li>
              <li>One report per customer. The offer may be changed or withdrawn at any time.</li>
              <li>You are also entitled to request a free copy of your credit report directly from Equifax and other credit reporting bodies.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
