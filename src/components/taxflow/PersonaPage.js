import Link from "next/link";
import TaxFlowHeader from "@/components/taxflow/TaxFlowHeader";
import TaxFlowAppFooter from "@/components/taxflow/TaxFlowAppFooter";
import RevealInit from "@/components/taxflow/RevealInit";
import { container, CtaBand, Breadcrumbs, FaqList } from "@/components/taxflow/TaxFlowShared";
import { faqSubset } from "@/data/taxflow-faq";

/* Shared template for /taxflow/for/* persona pages. */
export default function PersonaPage({
  crumbName,
  crumbHref,
  eyebrow,
  headline,
  intro,
  sections,
  panel,
  faqIds,
  relatedFeatures,
}) {
  return (
    <div className="tc-page min-h-screen">
      <RevealInit />
      <TaxFlowHeader />
      <Breadcrumbs items={[{ name: crumbName, href: crumbHref }]} />

      <section className={`${container} grid gap-12 pb-14 pt-8 md:pt-12 lg:grid-cols-12`}>
        <div className="lg:col-span-6">
          <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>{eyebrow}</p>
          <h1 className="tc-display mt-4 text-4xl text-white md:text-5xl">{headline}</h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed" style={{ color: "#94A3B8" }}>
            {intro}
          </p>
        </div>
        <div className="lg:col-span-6 lg:pt-4">{panel}</div>
      </section>

      <section className="border-t" style={{ background: "#0A1628", borderColor: "rgba(255,255,255,0.08)" }}>
        <div className={`${container} py-14 md:py-20`}>
          <div className="grid gap-x-14 gap-y-10 md:grid-cols-3">
            {sections.map((s) => (
              <div key={s.title} className="tc-reveal">
                <h2 className="text-[17px] font-bold text-white">{s.title}</h2>
                <p className="mt-2 text-[14px] leading-relaxed" style={{ color: "#94A3B8" }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
          <div className="tc-reveal mt-12 flex flex-wrap gap-x-6 gap-y-2">
            {relatedFeatures.map(([label, href]) => (
              <Link key={href} href={href} className="tc-link text-[14px] font-semibold">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t" style={{ background: "#060D1A", borderColor: "rgba(255,255,255,0.08)" }}>
        <div className={`${container} py-14 md:py-20`}>
          <div className="tc-reveal flex flex-wrap items-end justify-between gap-4">
            <h2 className="tc-display text-3xl text-white md:text-4xl">Common questions</h2>
            <Link href="/taxflow/faq" className="tc-link text-[14px] font-semibold">
              See all FAQs
            </Link>
          </div>
          <div className="tc-reveal mt-8 max-w-3xl">
            <FaqList items={faqSubset(faqIds)} />
          </div>
        </div>
      </section>

      <CtaBand />
      <TaxFlowAppFooter />
    </div>
  );
}
