import { SHOW_TAX_SERVICES } from "@/data/taxflow-flags";
import { FRONTLINE_SERVICE_MENU } from "@/data/frontline-services";

/* The Services dropdown in the TaxFlowAI header (ServicesMenu.js): each service
   and the services within it. Keep it in step with the pages it links to:
   - platform items: the feature pages in featurePages.js (name, and a short
     line from that feature's card on /taxflow/features)
   - tax preparation and corporate secretarial items: the tile ids on those
     pages, so each link lands on its own tile
   Lines are kept to one line in the panel (about 36 characters).
   - loans are listed only under Frontline Financial, where the two credit
     disclosures show (CreditDisclosures.js)
   `match` is the path prefixes that pre-select a service when the menu opens. */
export const SERVICES_MENU = [
  {
    id: "platform",
    eyebrow: "The software",
    label: "TaxFlowAI platform",
    href: "/taxflow/features",
    match: ["/taxflow/features"],
    kicker: "Features",
    lead: "Your tax control centre, with every entity in one app.",
    overview: "See all features",
    items: [
      { label: "Quotes and invoices", line: "Your customer taps Pay now.", href: "/taxflow/features/invoicing" },
      { label: "Receipt scanner", line: "Snap it. Flo files it.", href: "/taxflow/features/receipt-scanner" },
      { label: "Deductions", line: "Every deduction, guided.", href: "/taxflow/features/deductions" },
      { label: "Accounts", line: "Every entity, side by side.", href: "/taxflow/features/accounts" },
      { label: "Job tracker", line: "Always know where it’s up to.", href: "/taxflow/features/job-tracker" },
      { label: "Uploads", line: "One tidy folder per account.", href: "/taxflow/features/client-uploads" },
      { label: "Flo and your accountant", line: "Ask Flo. Or ask a human.", href: "/taxflow/features/flo" },
      { label: "Register a company", line: "A new company, from the same app.", href: "/taxflow/features/company-registration" },
    ],
  },
  {
    id: "tax",
    eyebrow: "Registered Tax Agents",
    label: "Tax preparation",
    href: "/taxflow/tax-preparation",
    match: ["/taxflow/tax-preparation", "/taxflow/for/"],
    kicker: "What we prepare",
    lead: "Prepared and lodged by a registered tax agent. Quote first.",
    overview: "See tax services",
    items: [
      { label: "Individual tax returns", line: "Salary, deductions and investments.", href: "/taxflow/tax-preparation#individual" },
      { label: "Sole trader returns", line: "Built from records Flo has sorted.", href: "/taxflow/tax-preparation#sole-trader" },
      { label: "Entity returns", line: "Companies, trusts and partnerships.", href: "/taxflow/tax-preparation#entity-returns" },
      { label: "Activity statements", line: "GST and PAYG, monthly or quarterly.", href: "/taxflow/tax-preparation#activity-statements" },
      { label: "Capital gains tax", line: "Shares, crypto and property.", href: "/taxflow/tax-preparation#cgt" },
      { label: "Investment property schedules", line: "Income, expenses and depreciation.", href: "/taxflow/tax-preparation#rental" },
      { label: "Prior-year and overdue returns", line: "Brought up to date with the ATO.", href: "/taxflow/tax-preparation#catch-up" },
      { label: "Tax planning and advice", line: "Answers before decisions are made.", href: "/taxflow/tax-preparation#advice" },
    ],
  },
  {
    id: "corporate",
    eyebrow: "Registered ASIC agent",
    label: "Corporate secretarial",
    href: "/taxflow/corporate-secretarial",
    match: ["/taxflow/corporate-secretarial"],
    kicker: "What we handle",
    lead: "Prepared for signing on screen, lodged with ASIC and filed.",
    overview: "See ASIC services",
    items: [
      { label: "Register a new company", line: "Apply in the app. We lodge it.", href: "/taxflow/features/company-registration" },
      { label: "Annual company reviews", line: "Statement, solvency and review fee.", href: "/taxflow/corporate-secretarial#annual-review" },
      { label: "Officeholder changes", line: "Directors and secretaries.", href: "/taxflow/corporate-secretarial#officeholders" },
      { label: "Share transactions", line: "Issue, transfer or cancel shares.", href: "/taxflow/corporate-secretarial#shares" },
      { label: "Address changes", line: "Office and officeholder addresses.", href: "/taxflow/corporate-secretarial#addresses" },
      { label: "Company name changes", line: "Checked, resolved and lodged.", href: "/taxflow/corporate-secretarial#name-change" },
      { label: "Deregistration and wind-up", line: "Closing a company, end to end.", href: "/taxflow/corporate-secretarial#deregistration" },
      { label: "Company records", line: "Constitution, minutes, registers.", href: "/taxflow/corporate-secretarial#records" },
      { label: "ASIC correspondence", line: "ASIC notices in one place.", href: "/taxflow/corporate-secretarial#notices" },
    ],
  },
  {
    id: "frontline",
    eyebrow: "Our group",
    label: "Frontline Financial",
    href: "/",
    match: ["/taxflow/features/loans"],
    kicker: "Lending and finance",
    lead: "Home loans and asset finance from the group behind TaxFlowAI.",
    overview: "Visit Frontline Financial",
    groups: FRONTLINE_SERVICE_MENU,
    app: {
      label: "Apply for a loan",
      line: "Home, car, business and personal loan enquiries, right from your portal.",
      href: "/taxflow/features/loans",
    },
    credit: true,
  },
].filter((s) => SHOW_TAX_SERVICES || s.id !== "tax");

/* The service a page belongs to (longest matching prefix), else the first. */
export function serviceForPath(pathname = "") {
  let best = SERVICES_MENU[0];
  let bestLength = 0;
  for (const s of SERVICES_MENU) {
    for (const prefix of s.match) {
      if (pathname.startsWith(prefix) && prefix.length > bestLength) {
        best = s;
        bestLength = prefix.length;
      }
    }
  }
  return best.id;
}
