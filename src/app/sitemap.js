const BASE = "https://frontline.financial";

/* Sitemap: core Frontline Financial marketing pages + the TaxFlowAI section. */
export default function sitemap() {
  const routes = [
    ["/", 1.0],
    ["/assetsolutions", 0.9],
    ["/vehicle-finance", 0.8],
    ["/brokers", 0.9],
    ["/about", 0.7],
    ["/contact", 0.8],
    ["/financial-calculators", 0.6],
    ["/taxflow", 1.0],
    ["/taxflow/about", 0.8],
    ["/taxflow/tax-preparation", 0.9],
    ["/taxflow/corporate-secretarial", 0.9],
    ["/taxflow/security", 0.7],
    ["/taxflow/features", 0.9],
    ["/taxflow/how-it-works", 0.9],
    ["/taxflow/faq", 0.8],
    ["/taxflow/contact", 0.8],
    ["/taxflow/for/sole-traders", 0.7],
    ["/taxflow/for/employees-and-wfh", 0.7],
    ["/taxflow/for/property-investors", 0.7],
    ["/taxflow/privacy-policy", 0.3],
    ["/taxflow/collection-notice", 0.3],
    ["/taxflow/terms", 0.3],
  ];
  return routes.map(([path, priority]) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
