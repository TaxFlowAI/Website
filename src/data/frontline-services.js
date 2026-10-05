/* Frontline Financial's two businesses and the services within each. Shared by
   the Frontline "Our Services" menu (LayoutNav.js) and the Frontline Financial
   part of the TaxFlowAI Services menu (components/taxflow/servicesNav.js).
   The services are names only: each business has one page. */
export const FRONTLINE_SERVICE_MENU = [
  {
    label: "Frontline Financial Brokers",
    href: "/brokers",
    activeKey: "brokers",
    services: [
      "Home Loans",
      "First Home Buyers",
      "Investment Property Loans",
      "Refinancing",
      "Commercial Loans",
      "Construction Loans",
      "Debt Consolidation",
      "SMSF Loans",
    ],
  },
  {
    label: "Frontline Financial: Asset Solutions",
    href: "/assetsolutions",
    activeKey: "asset-solutions",
    services: [
      "Car Loans",
      "Commercial Vehicle Finance",
      "Equipment & Machinery",
      "Personal Loans",
      "Working Capital",
      "Fleet Finance",
    ],
  },
];
