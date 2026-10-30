import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import AssessmentForm from "./AssessmentForm";

/* Self-employed home loan assessment: a six-question quiz plus contact details.
   The CTAs on /self-employed-home-loans link here. /api/contact emails Hassan and
   forwards the lead to Zapier, which creates the Broker Engine card. Kept out of
   search (noindex) because it's a form, not content. */

export const metadata = {
  title: "Free Self-Employed Home Loan Assessment | Frontline Financial",
  description:
    "Six quick questions, then a call from Hassan, a Parramatta broker with a tax and accounting background. Free and no obligation.",
  alternates: { canonical: "/self-employed-home-loans/assessment" },
  robots: { index: false, follow: true },
};

const POINTS = [
  "Sole traders, company directors, trusts and ABN contractors",
  "One year of tax returns? Some lenders will still look at it",
  "Returns behind? Low doc options exist, at a cost",
];

export default function SelfEmployedAssessmentPage() {
  return (
    <div className="min-h-screen bg-[#F5F5EF] font-sans">
      <LayoutNav activeNav="brokers" />

      <section className="section-dot-grid-dark relative px-4 pt-10 pb-14 md:px-6 md:pt-14 md:pb-20 lg:px-8">
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-[#00FCB8] opacity-[0.08] blur-[100px]" aria-hidden />
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[1fr_460px] lg:gap-14">
          <div className="text-center lg:sticky lg:top-28 lg:text-left">
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Self-employed? See <span className="text-[#00FCB8]">where you stand.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-[#39B2B2] lg:mx-0">
              Six quick questions, then Hassan calls you. He has a tax and accounting background, so he reads your
              returns the way a lender will, before any lender sees them. Free, no obligation.
            </p>
            <p className="mt-5 text-sm text-white/85">
              <span className="text-[#FFD700]" aria-hidden>★★★★★</span> 5.0 stars on Google from 100+ reviews. 30+
              lenders.
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
              <AssessmentForm />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:px-6 lg:px-8">
        <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-[#1C5472]/80">
          General information only. This page doesn&apos;t take into account your objectives, financial situation or
          needs. Lender criteria, fees and charges apply, and all applications are subject to the lender&apos;s
          assessment and approval. For tax advice, speak with your accountant.
        </p>
      </section>

      <LayoutFooter />
    </div>
  );
}
