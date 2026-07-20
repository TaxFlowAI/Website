import TaxFlowHeader from "@/components/taxflow/TaxFlowHeader";
import TaxFlowAppFooter from "@/components/taxflow/TaxFlowAppFooter";
import RevealInit from "@/components/taxflow/RevealInit";
import { container, CtaBand, Breadcrumbs, FaqList } from "@/components/taxflow/TaxFlowShared";
import { TAXFLOW_FAQ } from "@/data/taxflow-faq";

export const metadata = {
  title: "FAQ",
  description:
    "How fees work, who lodges your return, how Flo's AI is checked by a human, data security, supported entities, switching accountants, and what free to sign up really means.",
  alternates: { canonical: "/taxflow/faq" },
  openGraph: {
    title: "TaxFlowAI — frequently asked questions",
    description:
      "Fees, Registered Tax Agents, security, supported entities and more — in plain English.",
    url: "/taxflow/faq",
  },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: TAXFLOW_FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <div className="tc-page min-h-screen">
      <RevealInit />
      <TaxFlowHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <Breadcrumbs items={[{ name: "FAQ", href: "/taxflow/faq" }]} />

      <section className={`${container} pb-16 pt-8 md:pb-24 md:pt-12`}>
        <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>FAQ</p>
        <h1 className="tc-display mt-4 max-w-2xl text-4xl text-white md:text-5xl">
          Questions, answered in plain English
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed" style={{ color: "#94A3B8" }}>
          The short version: free to sign up, a Registered Tax Agent lodges your
          return, and you approve every quote before any work starts.
        </p>
        <div className="mt-10 max-w-3xl">
          <FaqList items={TAXFLOW_FAQ} />
        </div>
      </section>

      <CtaBand />
      <TaxFlowAppFooter />
    </div>
  );
}
