import CompliancePage from "@/components/taxflow/CompliancePage";
import { TERMS_OF_SERVICE } from "@/data/compliance-content";

export const metadata = {
  title: "Terms of Service — TaxFlowAI",
  description:
    "Terms governing your use of the TaxFlowAI platform and services.",
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
