import PersonaPage from "@/components/taxflow/PersonaPage";
import { PropertyPanel } from "@/components/taxflow/TaxFlowMockups";

export const metadata = {
  title: "For property investors",
  description:
    "Rental schedules organised through the year, deductible expenses captured as they happen, and record keeping that holds up — TaxFlowAI for Australian property investors.",
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
          body: "Each property is tracked from the dashboard — date first rented, purchase date, income and notes — so your Registered Tax Agent starts from an organised schedule, not a pile of statements.",
        },
        {
          title: "Deductible expenses",
          body: "Upload rates, interest, insurance, repairs and agent fees as they arrive. Flo files them against the right property and category, with its reasoning shown — repairs and capital improvements aren't the same thing, and the difference matters.",
        },
        {
          title: "Record keeping",
          body: "Property records need to survive for years — including for CGT when you eventually sell. Everything lives in your private vault, organised by property, backed up and always yours.",
        },
      ]}
      relatedFeatures={[
        ["Investment properties →", "/taxflow/features#properties"],
        ["AI receipt scanner →", "/taxflow/features#scanner"],
        ["Document vault →", "/taxflow/features#vault"],
      ]}
      faqIds={["fees", "entities", "security", "switch"]}
    />
  );
}
