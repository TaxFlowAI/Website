import CompliancePage from "@/components/taxflow/CompliancePage";
import { COLLECTION_NOTICE } from "@/data/compliance-content";

export const metadata = {
  title: "Collection Notice",
  description:
    "What we collect through the TaxFlowAI enquiry form and why, under Australian Privacy Principle 5.",
  alternates: { canonical: "/taxflow/collection-notice" },
};

export default function CollectionNoticePage() {
  return (
    <CompliancePage
      title={COLLECTION_NOTICE.title}
      subtitle={COLLECTION_NOTICE.subtitle}
      version={COLLECTION_NOTICE.version}
      effectiveDate={COLLECTION_NOTICE.effectiveDate}
      sections={COLLECTION_NOTICE.sections}
      linkToPrivacyAtBottom
    />
  );
}
