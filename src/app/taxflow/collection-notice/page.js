import CompliancePage from "@/components/taxflow/CompliancePage";
import { COLLECTION_NOTICE } from "@/data/compliance-content";

export const metadata = {
  title: "Collection Notice — TaxFlowAI",
  description:
    "Australian Privacy Principle 5 — Notification of collection for the TaxFlowAI initial enquiry form.",
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
