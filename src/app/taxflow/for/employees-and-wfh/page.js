import PersonaPage from "@/components/taxflow/PersonaPage";
import { WfhTracker } from "@/components/taxflow/TaxFlowMockups";

export const metadata = {
  title: "For employees & working from home",
  description:
    "A WFH hour tracker at the ATO fixed rate, guided D5 claims, and the records the ATO actually expects — TaxFlowAI for Australian employees.",
  alternates: { canonical: "/taxflow/for/employees-and-wfh" },
  openGraph: {
    title: "TaxFlowAI for employees & WFH",
    description:
      "WFH fixed-rate hour tracker, guided D5 claims, and records the ATO actually accepts.",
    url: "/taxflow/for/employees-and-wfh",
  },
};

export default function EmployeesWfhPage() {
  return (
    <PersonaPage
      crumbName="For employees & WFH"
      crumbHref="/taxflow/for/employees-and-wfh"
      eyebrow="For employees & working from home"
      headline="Claim what you're owed. Prove it if asked."
      intro="Most employees leave deductions on the table — or claim them with records that wouldn't survive a second look. TaxFlowAI tracks your working-from-home hours as they happen and guides every claim with the ATO's actual rules, in plain English."
      panel={<WfhTracker />}
      sections={[
        {
          title: "WFH fixed-rate tracker",
          body: "Log your working-from-home hours through the year and the portal keeps a running record at the ATO fixed rate — the contemporaneous log the ATO expects, built automatically as you go.",
        },
        {
          title: "Guided D5 claims",
          body: "Other work-related expenses are where good claims go wrong. Flo classifies each receipt, explains why it lands in D5 rather than D4 or nowhere, and flags the traps — home to work is private, even on night shift.",
        },
        {
          title: "Records the ATO expects",
          body: "Every receipt, log and claim lives in your private document vault, organised by category. If the ATO ever asks, the evidence is one click away — not in a shoebox.",
        },
      ]}
      relatedFeatures={[
        ["Guided deduction pages →", "/taxflow/features#deductions"],
        ["AI receipt scanner →", "/taxflow/features#scanner"],
        ["Document vault →", "/taxflow/features#vault"],
      ]}
      faqIds={["fees", "flo-ai", "who-lodges", "free-signup"]}
    />
  );
}
