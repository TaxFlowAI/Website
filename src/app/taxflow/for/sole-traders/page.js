import PersonaPage from "@/components/taxflow/PersonaPage";
import { LodgementList } from "@/components/taxflow/TaxFlowMockups";
import { SHOW_TAX_SERVICES } from "@/data/taxflow-flags";

export const metadata = {
  title: SHOW_TAX_SERVICES ? "Sole Trader Tax Returns & BAS" : "Tax App for Sole Traders",
  description: SHOW_TAX_SERVICES
    ? "Sole trader tax returns and BAS lodged by a registered tax agent, with business expenses sorted by Flo and an ATO-compliant car logbook. Free to sign up."
    : "BAS and income tax deadlines tracked, business and personal expenses sorted by Flo, and an ATO-compliant car logbook for Australian sole traders.",
  alternates: { canonical: "/taxflow/for/sole-traders" },
  openGraph: {
    title: "TaxFlowAI for sole traders",
    description:
      "BAS deadlines tracked, business vs personal expenses sorted, ATO-compliant vehicle logbook.",
    url: "/taxflow/for/sole-traders",
  },
};

export default function SoleTradersPage() {
  return (
    <PersonaPage
      crumbName="For sole traders"
      crumbHref="/taxflow/for/sole-traders"
      eyebrow="For sole traders"
      headline="Run the business. We'll watch the deadlines."
      intro="ABN income, BAS every quarter, expenses mixed in with your personal card — sole trader tax is a lot of small jobs that pile up. TaxFlowAI keeps them sorted as you go, so quarter-end is a review, not an archaeology dig."
      panel={<LodgementList />}
      sections={[
        {
          title: "BAS & quarterly deadlines",
          body: "Every BAS quarter and income tax deadline is tracked on your dashboard with live status — due soon, on track, lodged. No more finding out about a deadline from an ATO letter.",
        },
        {
          title: "Business vs personal expenses",
          body: "Snap receipts as they happen and Flo files each one — business or private, and into the right ATO category — showing its reasoning. Mixed-use purchases get flagged rather than guessed.",
        },
        {
          title: "Vehicle logbook",
          body: "The full ATO-compliant 12-week logbook lives in the portal: register your vehicle, log trips, watch your business-use percentage build, and export CSV or PDF for substantiation.",
        },
      ]}
      relatedFeatures={[
        ["Job tracker →", "/taxflow/features/job-tracker"],
        ["AI receipt scanner →", "/taxflow/features/receipt-scanner"],
        ["Quotes and invoices →", "/taxflow/features/invoicing"],
      ]}
      faqIds={["fees", "entities", "who-lodges", "switch"]}
    />
  );
}
