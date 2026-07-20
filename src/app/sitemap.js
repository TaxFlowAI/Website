const BASE = "https://frontline.financial";

/* Sitemap for the TaxFlowAI section. Other brand routes are intentionally
   not listed here; add them separately if/when the root site wants one. */
export default function sitemap() {
  const routes = [
    ["/taxflow", 1.0],
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
