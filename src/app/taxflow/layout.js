import localFont from "next/font/local";
import "./the-current.css";
import { BookingProvider } from "@/components/taxflow/BookingModal";
import { SignInProvider } from "@/components/taxflow/SignInModal";
import { SHOW_TAX_SERVICES } from "@/data/taxflow-flags";

/* Self-hosted (see src/fonts/README.md). Each variable file is listed per weight
   so only these weights exist as faces, as they did with Google Fonts. */
const outfit = localFont({
  variable: "--font-display-tf",
  src: [
    { path: "../../fonts/outfit-latin.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/outfit-latin.woff2", weight: "600", style: "normal" },
    { path: "../../fonts/outfit-latin.woff2", weight: "700", style: "normal" },
  ],
});

const dmSans = localFont({
  variable: "--font-body-tf",
  src: [
    { path: "../../fonts/dm-sans-latin.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/dm-sans-latin.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/dm-sans-latin.woff2", weight: "700", style: "normal" },
  ],
});

const jetbrainsMono = localFont({
  variable: "--font-mono-tf",
  src: [
    { path: "../../fonts/jetbrains-mono-latin.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/jetbrains-mono-latin.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/jetbrains-mono-latin.woff2", weight: "600", style: "normal" },
  ],
});

/* Metadata for the /taxflow section only — overrides the root (lending)
   metadata for every route in this segment. Child pages override title,
   description and canonical per page. No canonical here: every page sets its
   own, and one set here would be inherited by any page that forgets, telling
   Google that page is a copy of /taxflow. */
export const metadata = {
  metadataBase: new URL("https://frontline.financial"),
  title: {
    default: "TaxFlowAI | Australia's AI-Powered Tax Portal",
    template: "%s | TaxFlowAI",
  },
  description: SHOW_TAX_SERVICES
    ? "Australia's AI-powered tax portal. Snap receipts, track every ATO deadline, and work with Registered Tax Agents — free to sign up."
    : "Australia's AI-powered tax portal. Snap receipts, track every ATO deadline, and keep every entity in one app — free to sign up.",
  openGraph: {
    siteName: "TaxFlowAI",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
  },
  /* Flo-face icon set. The ?v= suffix makes browsers drop the old cached icon. */
  icons: {
    icon: [
      { url: "/favicon-taxflow.svg?v=2", type: "image/svg+xml" },
      { url: "/favicon-taxflow-32.png?v=2", type: "image/png", sizes: "32x32" },
      { url: "/favicon-taxflow-192.png?v=2", type: "image/png", sizes: "192x192" },
      { url: "/favicon-taxflow-512.png?v=2", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon-taxflow.ico?v=2",
    apple: { url: "/apple-touch-icon-taxflow.png?v=2", sizes: "180x180" },
  },
};

/* LocalBusiness + Organization schema for TaxFlowAI, the trading name of
   TAX7 T04 PTY LTD (Registered Tax Agent 26313222). The platform itself is
   owned and developed by Frontline Holdings Group Pty Ltd, trading as
   TaxFlowAI by Frontline Financial, a registered ASIC agent.
   While tax services are switched off (src/data/taxflow-flags.js) the
   organisation is described as the platform owner instead.
   Both offices; geo coordinates are approximate (TODO: confirm exact pins). */
const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://frontline.financial/taxflow#org",
      name: "TaxFlowAI",
      url: "https://frontline.financial/taxflow",
      logo: "https://frontline.financial/favicon-taxflow-512.png",
      email: "taxflowai@frontline.financial",
      telephone: "+61406909862",
      ...(SHOW_TAX_SERVICES
        ? {
            description:
              "Australian tax portal for individuals and small entities. Tax services are provided by TAX7 T04 PTY LTD trading as TaxFlowAI, Registered Tax Agent 26313222. The platform is owned and developed by Frontline Holdings Group Pty Ltd trading as TaxFlowAI by Frontline Financial.",
            legalName: "TAX7 T04 PTY LTD",
            taxID: "73 680 225 512",
          }
        : {
            description:
              "Australian tax portal for individuals and small entities. The platform is owned and developed by Frontline Holdings Group Pty Ltd trading as TaxFlowAI by Frontline Financial.",
            legalName: "Frontline Holdings Group Pty Ltd",
            taxID: "59 671 861 475",
          }),
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://frontline.financial/taxflow#parramatta",
      name: "TaxFlowAI — Parramatta",
      parentOrganization: { "@id": "https://frontline.financial/taxflow#org" },
      url: "https://frontline.financial/taxflow",
      telephone: "+61406909862",
      email: "taxflowai@frontline.financial",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Level 49, 8 Parramatta Square",
        addressLocality: "Parramatta",
        addressRegion: "NSW",
        postalCode: "2150",
        addressCountry: "AU",
      },
      geo: { "@type": "GeoCoordinates", latitude: -33.8172, longitude: 151.0036 },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://frontline.financial/taxflow#sydney",
      name: "TaxFlowAI — Sydney",
      parentOrganization: { "@id": "https://frontline.financial/taxflow#org" },
      url: "https://frontline.financial/taxflow",
      telephone: "+61406909862",
      email: "taxflowai@frontline.financial",
      address: {
        "@type": "PostalAddress",
        streetAddress: "213 Clarence Street",
        postalCode: "2000",
        addressLocality: "Sydney",
        addressRegion: "NSW",
        addressCountry: "AU",
      },
      geo: { "@type": "GeoCoordinates", latitude: -33.8717, longitude: 151.2046 },
    },
  ],
};

export default function TaxFlowLayout({ children }) {
  return (
    <div
      className={`${outfit.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      style={{ fontFamily: "var(--font-body-tf), system-ui, sans-serif" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
      />
      <BookingProvider>
        <SignInProvider>{children}</SignInProvider>
      </BookingProvider>
    </div>
  );
}
