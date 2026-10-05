import CompliancePage from "@/components/taxflow/CompliancePage";
import { TERMS_OF_SERVICE } from "@/data/compliance-content";

export const metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply when you use the TaxFlowAI platform and services.",
  alternates: { canonical: "/taxflow/terms" },
};

export default function TermsOfServicePage() {
  return (
    <CompliancePage
      title={TERMS_OF_SERVICE.title}
      version={TERMS_OF_SERVICE.version}
      effectiveDate={TERMS_OF_SERVICE.effectiveDate}
      sections={TERMS_OF_SERVICE.sections}
      showEntityBox={true}
    />
  );
}
