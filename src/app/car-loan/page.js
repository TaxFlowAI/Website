import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import CarLoanForm from "./CarLoanForm";

/* A one-page car loan enquiry. /api/contact emails operations, adds the lead to
   Ambition Cloud and emails the client the privacy consent link. Kept out of
   search (noindex) because it's a form, not content. */

export const metadata = {
  title: "Car Loan Enquiry | Frontline Financial",
  description:
    "Tell us what you're buying and someone from our team calls you to go through your options across 30+ lenders. Free assessment, no obligation.",
  alternates: { canonical: "/car-loan" },
  robots: { index: false, follow: true },
};

const POINTS = ["Cars, utes and vans, new or used", "For personal or business use", "Access to 30+ lenders"];

export default function CarLoanPage() {
  return (
    <div className="min-h-screen bg-[#F5F5EF] font-sans">
      <LayoutNav activeNav="asset-solutions" />

      <section className="section-dot-grid-dark relative px-4 pt-10 pb-14 md:px-6 md:pt-14 md:pb-20 lg:px-8">
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-[#00FCB8] opacity-[0.08] blur-[100px]" aria-hidden />
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[1fr_460px] lg:gap-14">
          <div className="text-center lg:sticky lg:top-28 lg:text-left">
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Buying a car? Let&apos;s <span className="text-[#00FCB8]">sort the finance.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-[#39B2B2] lg:mx-0">
              Tell us what you&apos;re buying and someone from our team calls you to go through your options. Free assessment, no
              obligation.
            </p>
            <p className="mt-5 text-sm text-white/85">
              <span className="text-[#FFD700]" aria-hidden>★★★★★</span> 5.0 stars on Google from 100+ reviews. Winner,
              Fintelligence Broker Awards FY25, Vehicle and Equipment Finance.
            </p>
            <ul className="mx-auto mt-6 hidden max-w-md space-y-2.5 text-left text-[15px] text-white/85 lg:block">
              {POINTS.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <svg className="mt-1 h-4 w-4 shrink-0 text-[#00FCB8]" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[#00FCB8] via-[#39B2B2] to-[#1C5472] opacity-70 blur-sm" aria-hidden />
            <div className="relative rounded-3xl bg-white p-6 shadow-2xl md:p-8">
              <CarLoanForm />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:px-6 lg:px-8">
        <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-[#1C5472]/80">
          General information only. This page doesn&apos;t take into account your objectives, financial situation or
          needs. Lender criteria, fees and charges apply, and all applications are subject to the lender&apos;s
          assessment and approval. Martyn Financial Pty Ltd t/a Frontline Financial: Asset Solutions, authorised credit
          representative CRN 563350 of Australian Credit Licence 511803.
        </p>
      </section>

      <LayoutFooter />
    </div>
  );
}
