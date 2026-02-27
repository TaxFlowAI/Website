import CompliancePage from "@/components/taxflow/CompliancePage";
import { PRIVACY_POLICY } from "@/data/compliance-content";

export const metadata = {
  title: "Privacy Policy — TaxFlowAI",
  description:
    "TaxFlowAI privacy policy. How we collect, hold, use, disclose, and protect your personal information.",
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
