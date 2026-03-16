/**
 * Entity-specific compliance configuration.
 * Single source of truth for Brokers vs Asset Solutions — never show the wrong entity's documents.
 * When creating a new page, add it to ROUTE_ENTITY_MAP.
 */

export const ENTITY = {
  BROKERS: "brokers",
  ASSET_SOLUTIONS: "asset_solutions",
  SHARED: "shared",
};

export const ENTITY_CONFIG = {
  [ENTITY.BROKERS]: {
    legalName: "Frontline Financial Pty Ltd",
    tradingAs: "Frontline Financial",
    creditRepNumber: "553835",
    entityCRN: "575968",
    licensee: "Australian Finance Group Ltd",
    aclNumber: "389087",
    contactName: "Hassan Arif",
    contactPhone: "0422 959 486",
    contactEmail: "hassan@frontline.financial",
    address: "86b Orange Street, Greystanes, NSW, 2145",
    creditGuidePath: "/credit-guide",
    privacyConsentPath: "/privacy-consent",
    calculatorDisclaimerPath: "/calculator-disclaimer-broking",
    creditGuidePDF: "/documents/credit-guide.pdf",
    privacyConsentPDF: "/documents/privacy-consent.pdf",
    services: ["Home loans", "Mortgage broking", "Refinancing"],
    complianceFooterText:
      "Frontline Financial Pty Ltd is an authorised credit representative (CRN: 575968) of Australian Credit Licence No. 389087, authorised to engage in credit activities.",
  },
  [ENTITY.ASSET_SOLUTIONS]: {
    legalName: "Martyn Financial Pty Ltd",
    tradingAs: "Frontline Financial: Asset Solutions",
    abn: "13 681 219 198",
    creditRepNumber: "563350",
    licensee: "Fintelligence Pty Ltd",
    licenseeABN: "80 625 017 174",
    aclNumber: "511803",
    contactName: "Sham",
    contactPhone: "0450 553 877",
    contactEmail: "sham@frontline.financial",
    address: "150 George Street, Parramatta NSW 2150",
    creditGuidePath: "/credit-guide-asset-solutions",
    privacyConsentPath: "/privacy-consent-asset-solutions",
    calculatorDisclaimerPath: "/calculator-disclaimer-asset-solutions",
    creditGuidePDF: "/documents/credit-guide-asset-solutions.pdf",
    privacyConsentPDF: "/documents/privacy-consent-asset-solutions.pdf",
    services: ["Car loans", "Personal loans", "Asset finance", "Equipment finance"],
    complianceFooterText:
      "Martyn Financial Pty Ltd t/a Frontline Financial: Asset Solutions is an authorised credit representative (CRN: 563350) of Australian Credit Licence No. 511803, authorised to engage in credit activities.",
    originationFee: "Up to $2,500 (incl. GST)",
  },
};

export const ROUTE_ENTITY_MAP = {
  // ---- BROKERS pages ----
  "/brokers": ENTITY.BROKERS,
  "/credit-guide": ENTITY.BROKERS,
  "/privacy-consent": ENTITY.BROKERS,
  "/calculator-disclaimer-broking": ENTITY.BROKERS,
  "/free-eligibility-test-home-loans": ENTITY.BROKERS,
  "/free-eligibility-test": ENTITY.BROKERS,

  // ---- ASSET SOLUTIONS pages ----
  "/assetsolutions": ENTITY.ASSET_SOLUTIONS,
  "/asset-solutions": ENTITY.ASSET_SOLUTIONS,
  "/credit-guide-asset-solutions": ENTITY.ASSET_SOLUTIONS,
  "/privacy-consent-asset-solutions": ENTITY.ASSET_SOLUTIONS,
  "/calculator-disclaimer-asset-solutions": ENTITY.ASSET_SOLUTIONS,
  "/free-eligibility-test-asset-finance": ENTITY.ASSET_SOLUTIONS,

  // ---- SHARED pages ----
  "/": ENTITY.SHARED,
  "/about": ENTITY.SHARED,
  "/contact": ENTITY.SHARED,
  "/contact/thank-you": ENTITY.SHARED,
  "/financial-calculators": ENTITY.SHARED,
  "/calculators": ENTITY.SHARED,
  "/taxflow": ENTITY.SHARED,
  "/calculator-disclaimer": ENTITY.SHARED,
  "/terms": ENTITY.SHARED,
  "/privacy": ENTITY.SHARED,
};

export function getEntityForRoute(pathname) {
  if (!pathname) return ENTITY.SHARED;
  const normalized = pathname.replace(/\/$/, "") || "/";
  if (ROUTE_ENTITY_MAP[normalized]) return ROUTE_ENTITY_MAP[normalized];
  for (const [route, entity] of Object.entries(ROUTE_ENTITY_MAP)) {
    if (route !== "/" && normalized.startsWith(route)) return entity;
  }
  return ENTITY.SHARED;
}

export function getEntityConfig(entity) {
  return (entity && ENTITY_CONFIG[entity]) || null;
}
