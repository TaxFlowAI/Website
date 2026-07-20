/* Allows all crawling (no change for sibling brand routes) and points
   crawlers at the sitemap, which currently lists the TaxFlowAI section. */
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://frontline.financial/sitemap.xml",
  };
}
