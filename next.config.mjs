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
    ];
  },
};

export default nextConfig;
