/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Static files (PNG, JPG, WEBP, SVG, etc.) in public/ are served at the root by Next.js.
   * No proxy or rewrites send /images to a backend — this app has no separate API server.
   * Dev server (e.g. next dev -p 3002) serves both the app and public/ assets. */
  async redirects() {
    return [
      { source: "/asset-solutions", destination: "/assetsolutions", permanent: true },
    ];
  },
};

export default nextConfig;
