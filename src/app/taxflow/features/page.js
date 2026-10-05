import Link from "next/link";
import TaxFlowHeader from "@/components/taxflow/TaxFlowHeader";
import TaxFlowAppFooter from "@/components/taxflow/TaxFlowAppFooter";
import RevealInit from "@/components/taxflow/RevealInit";
import TaxFlowWave from "@/components/taxflow/TaxFlowWave";
import TaxFlowWaveLayers from "@/components/taxflow/TaxFlowWaveLayers";
import FeatureTiles from "@/components/taxflow/FeatureTiles";
import CreditDisclosures from "@/components/taxflow/CreditDisclosures";
import { container, CtaBand } from "@/components/taxflow/TaxFlowShared";
import { ServiceHero, NAVY, DEEP } from "@/components/taxflow/ServiceLanding";
import { SHOW_TAX_SERVICES } from "@/data/taxflow-flags";

/* Features index. Short by design (owner, 4 Oct 2026): a heading tile per
   feature, each linking to that feature's one landing page, where the detail
   lives. Rules that still hold here:
   - no exact tax due dates, countdowns or "overdue" for tax deadlines
   - no fees or prices except the company registration price
   - the loans tile mentions loans, so both credit disclosures stay on the page */
export const metadata = {
  title: { absolute: "Features | TaxFlowAI — tax, receipts, quotes & invoices in one app" },
  description: SHOW_TAX_SERVICES
    ? "Flo files your receipts, your accountant does the tax, and your quotes, invoices and loan enquiries live in one Australian-hosted app."
    : "Flo files your receipts, and your quotes, invoices and loan enquiries live in the same Australian-hosted app.",
  alternates: { canonical: "/taxflow/features" },
  openGraph: {
    title: "TaxFlowAI features",
    description: SHOW_TAX_SERVICES
      ? "Flo files your receipts, your accountant handles the tax, and your quotes, invoices and loans sit in the same app."
      : "Flo files your receipts, and your quotes, invoices and loans sit in the same app.",
    url: "/taxflow/features",
  },
};

const TRUST = [
  ["/taxflow/tax-preparation", "REGISTERED TAX AGENT 26313222", "Returns are prepared and lodged by TAX7 T04 PTY LTD trading as TaxFlowAI."],
  ["/taxflow/corporate-secretarial", "ASIC AGENT 51843", "ASIC lodgements are made by Frontline Holdings Group Pty Ltd trading as TaxFlowAI by Frontline Financial."],
  ["/taxflow/security", "ISO 27001-ALIGNED", "Australian-hosted, encrypted, and two-factor sign-in on every account."],
].filter(([href]) => SHOW_TAX_SERVICES || href !== "/taxflow/tax-preparation");

export default function FeaturesPage() {
  return (
    <div className="tc-page min-h-screen">
      <RevealInit />
      <TaxFlowHeader />

      <ServiceHero
        crumb={{ name: "Features", href: "/taxflow/features" }}
        eyebrow="The app"
        title="Your tax and your business,"
        accent="under control."
        lead={
          SHOW_TAX_SERVICES
            ? "Flo files your receipts, your accountant handles the tax, and your quotes, invoices and loans sit in the same app."
            : "Flo files your receipts, and your quotes, invoices and loans sit in the same app."
        }
        image="/images/taxflow/features-hero.webp"
        imageAlt="Flo holding a phone that connects to three cards: a ticked receipt, a paid invoice, and a house and car"
      />

      <TaxFlowWaveLayers from={NAVY} to={DEEP} />
      <section id="all" style={{ background: DEEP, scrollMarginTop: "110px" }}>
        <div className={`${container} pb-14 pt-4 md:pb-20`}>
          <div className="tc-reveal flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <div>
              <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>Features</p>
              <h2 className="tc-display mt-3 text-4xl text-white md:text-5xl">Everything in one app.</h2>
            </div>
            <p className="text-[14.5px]" style={{ color: "#94A3B8" }}>Tap a feature to see how it works.</p>
          </div>

          <FeatureTiles className="tc-reveal mt-8 md:mt-10" />

          <ul className="tc-ft-trust tc-reveal mt-10">
            {TRUST.map(([href, label, body]) => (
              <li key={href}>
                <Link href={href}>
                  <b className="tc-mono">{label}</b>
                  <span>{body}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="tc-reveal mt-8 max-w-4xl border-t pt-5" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <p className="tc-mono mb-2 text-[10.5px] tracking-[0.16em]" style={{ color: "#94A3B8" }}>CREDIT SERVICES</p>
            <CreditDisclosures />
          </div>
        </div>
      </section>

      <TaxFlowWave from={DEEP} to={NAVY} />
      <CtaBand title="Your tax and your business, under control." />
      <TaxFlowAppFooter />
    </div>
  );
}
