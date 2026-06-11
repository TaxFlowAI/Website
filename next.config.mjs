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
    ];
  },
};

export default nextConfig;
