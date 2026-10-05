import CompliancePage from "@/components/taxflow/CompliancePage";
import { PRIVACY_POLICY } from "@/data/compliance-content";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How TaxFlowAI collects, holds, uses, discloses and protects your personal information.",
  alternates: { canonical: "/taxflow/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <CompliancePage
      title={PRIVACY_POLICY.title}
      version={PRIVACY_POLICY.version}
      effectiveDate={PRIVACY_POLICY.effectiveDate}
      lastReviewed={PRIVACY_POLICY.lastReviewed}
      sections={PRIVACY_POLICY.sections}
    />
  );
}
