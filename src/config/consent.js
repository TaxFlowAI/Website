/**
 * The consent tick box on every Frontline form, and the record each lead keeps of it.
 * FormConsent shows this wording and /api/contact rebuilds the same wording for the record,
 * so what the visitor saw and what we keep can't drift apart.
 * Relative imports only: scripts load this file outside Next.
 */
import { ENTITY, getEntityConfig } from "./entities.js";

export const PRIVACY_POLICY_PATH = "/privacy-policy";

/* When each web copy last changed. Bump the date when a document's page changes, so each
   lead's consent record names the version the person agreed to. */
export const PRIVACY_POLICY_UPDATED = "15 Nov 2026";
export const CONSENT_DOCS = {
  [ENTITY.BROKERS]: { creditGuideLabel: "Credit Guide", updated: "15 Nov 2026" },
  [ENTITY.ASSET_SOLUTIONS]: { creditGuideLabel: "Credit Guide & Quote", updated: "15 Nov 2026" },
};

/* The pieces of the tick-box sentence, for FormConsent to render with links. */
export function consentParts(entity) {
  const config = getEntityConfig(entity);
  const docs = CONSENT_DOCS[entity];
  if (!config || !docs) return null;
  const tradingAs = config.tradingAs && config.tradingAs !== config.legalName ? ` t/a ${config.tradingAs}` : "";
  return {
    creditGuideLabel: docs.creditGuideLabel,
    creditGuidePath: config.creditGuidePath,
    privacyConsentPath: config.privacyConsentPath,
    updated: docs.updated,
    party: `${config.legalName}${tradingAs} (Authorised Credit Representative CRN: ${
      config.entityCRN || config.creditRepNumber
    }, Australian Credit Licence No. ${config.aclNumber})`,
  };
}

/* The exact sentence beside the tick box. */
export function consentText(entity) {
  const p = consentParts(entity);
  if (!p) return "";
  return `I have read and agree to the ${p.creditGuideLabel} and Privacy Consent of ${p.party}.`;
}

/* What a form sends to /api/contact once the box is ticked. The page path only: the query
   string can hold ad click IDs, which travel separately as `attribution`. */
export function consentPayload(entity) {
  return {
    entity,
    agreed: true,
    page: typeof window === "undefined" ? "" : window.location.pathname,
  };
}
