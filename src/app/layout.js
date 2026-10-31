import localFont from "next/font/local";
import "./globals.css";
import MetaPixel from "@/components/MetaPixel";

/* Self-hosted (see src/fonts/README.md). The one variable file is listed per
   weight on purpose: only these weights exist as faces, so font-medium still
   renders at 400 and font-semibold at 700, as they did with Google Fonts. */
const dmSans = localFont({
  variable: "--font-dm-sans",
  src: [
    { path: "../fonts/dm-sans-latin.woff2", weight: "400", style: "normal" },
    { path: "../fonts/dm-sans-latin.woff2", weight: "700", style: "normal" },
  ],
});

/* The home page is a client component, so its title and description live
   here as the site-wide default. Every other page sets its own. No canonical
   here: a canonical on the root layout would be inherited by every page that
   forgets to set one. */
export const metadata = {
  metadataBase: new URL("https://frontline.financial"),
  title: "Finance Broker Parramatta | Frontline Financial",
  description:
    "Home loans and car loans from a Parramatta finance broker. We compare 30+ lenders for you. 100+ five-star Google reviews.",
  /* The home page's link preview, and the default for pages with no openGraph of their own. siteName backs
     up WEBSITE_SCHEMA on the home page. /taxflow sets its own openGraph, which replaces this. */
  openGraph: {
    siteName: "Frontline Financial",
    images: [
      {
        url: "/images/frontline-home-share.jpg",
        width: 1200,
        height: 630,
        alt: "Frontline Financial: finance made simple. Home loans and car loans at Level 49, 8 Parramatta Square.",
      },
    ],
  },
  /* F-mark icon set, dark blue on aqua (the guide's monochrome logo). The ?v= suffix makes browsers
     drop the old cached icon. Google asks for a stable icon URL, so don't bump it without a new icon. */
  icons: {
    icon: [
      { url: "/favicon.svg?v=3", type: "image/svg+xml" },
      { url: "/favicon-32.png?v=3", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48.png?v=3", type: "image/png", sizes: "48x48" },
      { url: "/favicon-96.png?v=3", type: "image/png", sizes: "96x96" },
      { url: "/favicon-192.png?v=3", type: "image/png", sizes: "192x192" },
      { url: "/favicon-512.png?v=3", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico?v=3",
    apple: { url: "/apple-touch-icon.png?v=3", sizes: "180x180" },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans antialiased`}>
        {children}
        <MetaPixel />
      </body>
    </html>
  );
}
