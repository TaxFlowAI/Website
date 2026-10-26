/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Static files (PNG, JPG, WEBP, SVG, etc.) in public/ are served at the root by Next.js.
   * No proxy or rewrites send /images to a backend — this app has no separate API server.
   * Dev server (e.g. next dev -p 3002) serves both the app and public/ assets. */
  /* Pin the workspace root: a stray package-lock.json in the user's home directory
   * otherwise makes Turbopack infer C:\Users\<user> as the root, which breaks
   * tailwindcss resolution in dev. */
  turbopack: {
    root: import.meta.dirname,
  },
  /* App screenshots use quality 90 so small UI text stays sharp. */
  images: {
    qualities: [75, 90],
  },
  async redirects() {
    return [
      { source: "/asset-solutions", destination: "/assetsolutions", permanent: true },
      /* feature pages merged into their parent page (4 Oct 2026) */
      { source: "/taxflow/features/upload-documents", destination: "/taxflow/features/client-uploads", permanent: true },
      { source: "/taxflow/features/invoice-email", destination: "/taxflow/features/invoicing#address", permanent: true },
      { source: "/taxflow/features/flo-invoicing", destination: "/taxflow/features/invoicing#flo", permanent: true },
      { source: "/taxflow/features/get-paid", destination: "/taxflow/features/invoicing#stripe", permanent: true },
      { source: "/taxflow/features/customers", destination: "/taxflow/features/invoicing#customers", permanent: true },
      { source: "/taxflow/features/meetings", destination: "/taxflow/features/flo#meetings", permanent: true },
      /* Old WordPress site URLs that Google still had (Search Console, 26 Oct 2026). Each goes to the page that
         replaced it; old pages with no equivalent (blog, privacy policy, terms, EOFY 2025, thank-you) stay 404.
         Specific paths come before the :path* catch-alls. */
      { source: "/frontline-financial-brokers/:path*", destination: "/brokers", permanent: true },
      { source: "/category/frontline-financial-brokers", destination: "/brokers", permanent: true },
      { source: "/increase-borrowing-power-apra-debt-to-income-rules", destination: "/brokers", permanent: true },
      { source: "/first-home-buyer-guide-australia-2025", destination: "/brokers", permanent: true },
      { source: "/frontline-financial-asset-solutions/commercial-vehicle-finance", destination: "/vehicle-finance", permanent: true },
      { source: "/frontline-financial-asset-solutions/:path*", destination: "/assetsolutions", permanent: true },
      { source: "/frontline-financial-asset-solutions-wins-at-the-fy25-fintelligence-broker-awards", destination: "/assetsolutions", permanent: true },
      { source: "/how-to-borrow-smarter-2026-aussie-personal-loans-guide", destination: "/assetsolutions", permanent: true },
      { source: "/car-finance-options-australia-2025", destination: "/assetsolutions", permanent: true },
      { source: "/equipment-finance-for-small-businesses", destination: "/assetsolutions", permanent: true },
      { source: "/frontline-financial-accountants/business-activity-statements-bas", destination: "/taxflow/for/sole-traders", permanent: true },
      { source: "/frontline-financial-accountants/:path*", destination: "/taxflow", permanent: true },
      { source: "/accountants", destination: "/taxflow", permanent: true },
      { source: "/capital-gains-tax-australia-2026", destination: "/taxflow/for/property-investors", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/book-a-consultation", destination: "/contact", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/financial-calculator", destination: "/financial-calculators", permanent: true },
    ];
  },
};

export default nextConfig;
