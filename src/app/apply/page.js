import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import FinanceSelector from "@/components/FinanceSelector";

/* The way in for anyone who lands on /apply without a finance type. The form
   itself is at /apply/<slug>. */

export const metadata = {
  title: "Apply for Finance | Frontline Financial",
  description: "Start a home loan, car loan, equipment finance, personal loan or working capital application. About 2 minutes, no obligation.",
  alternates: { canonical: "/apply" },
  robots: { index: false, follow: true },
};

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-[#F5F5EF] font-sans">
      <LayoutNav activeNav="home" />

      <section className="section-dot-grid px-4 pt-10 pb-16 md:px-6 md:pt-16 md:pb-24 lg:px-8">
        <div className="mx-auto max-w-xl">
          <FinanceSelector headingLevel="h1" />
        </div>
      </section>

      <section className="px-4 pb-10 md:px-6 lg:px-8">
        <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-[#1C5472]/80">
          General information only. This page doesn&apos;t take into account your objectives, financial situation or
          needs. Lender criteria, fees and charges apply, and all applications are subject to the lender&apos;s
          assessment and approval.
        </p>
      </section>

      <LayoutFooter />
    </div>
  );
}
