import PersonaPage from "@/components/taxflow/PersonaPage";
import { PropertyPanel } from "@/components/taxflow/TaxFlowMockups";
import { SHOW_TAX_SERVICES } from "@/data/taxflow-flags";

export const metadata = {
  title: SHOW_TAX_SERVICES ? "Rental Property Tax Returns" : "Rental Property Tax Records",
  description: SHOW_TAX_SERVICES
    ? "Rental property tax returns lodged by a registered tax agent. Snap rates notices, interest statements and repair receipts all year, ready for tax time."
    : "Rates notices, interest statements and repair receipts snapped and filed through the year, so your rental schedule is ready at tax time.",
  alternates: { canonical: "/taxflow/for/property-investors" },
  openGraph: {
    title: "TaxFlowAI for property investors",
    description:
      "Rental schedules, deductible expenses and record keeping that holds up at tax time.",
    url: "/taxflow/for/property-investors",
  },
};

export default function PropertyInvestorsPage() {
  return (
    <PersonaPage
      crumbName="For property investors"
      crumbHref="/taxflow/for/property-investors"
      eyebrow="For property investors"
      headline="Your rental schedule, ready before tax time."
      intro="Rates notices, interest statements, repairs, agent fees — a rental property generates paperwork all year and demands it all back in one week of July. TaxFlowAI tracks each property inline so the rental schedule builds itself as the year goes."
      panel={<PropertyPanel />}
      sections={[
        {
          title: "Rental schedules",
          body: `Each property is tracked from the dashboard — date first rented, purchase date, income and notes — so ${
            SHOW_TAX_SERVICES ? "your Registered Tax Agent starts" : "tax time starts"
          } from an organised schedule, not a pile of statements.`,
        },
        {
          title: "Deductible expenses",
          body: "Upload rates, interest, insurance, repairs and agent fees as they arrive. Flo files them against the right property and category, with its reasoning shown — repairs and capital improvements aren't the same thing, and the difference matters.",
        },
        {
          title: "Record keeping",
          body: "Property records need to survive for years — including for CGT when you eventually sell. Everything lives in your secure uploads folder, organised by property, backed up and always yours.",
        },
      ]}
      relatedFeatures={[
        ["Job tracker →", "/taxflow/features/job-tracker"],
        ["AI receipt scanner →", "/taxflow/features/receipt-scanner"],
        ["Client uploads →", "/taxflow/features/client-uploads"],
      ]}
      faqIds={["fees", "entities", "security", "switch"]}
    />
  );
}
