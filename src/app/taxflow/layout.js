import { Outfit, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./the-current.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display-tf",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body-tf",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono-tf",
});

/* Metadata for the /taxflow section only — overrides the root (lending)
   metadata for every route in this segment. Child pages override title,
   description and canonical per page. */
export const metadata = {
  metadataBase: new URL("https://frontline.financial"),
  title: {
    default: "TaxFlowAI — Australia's AI-powered tax portal",
    template: "%s — TaxFlowAI",
  },
  description:
    "Australia's AI-powered tax portal. Snap receipts, track every ATO deadline, and work with Registered Tax Agents — free to sign up.",
  alternates: { canonical: "/taxflow" },
  openGraph: {
    siteName: "TaxFlowAI",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon-taxflow.svg",
  },
};

/* AccountingService / LocalBusiness + Organization schema for TaxFlowAI.
   Both offices; geo coordinates are approximate (TODO: confirm exact pins). */
const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://frontline.financial/taxflow#org",
      name: "TaxFlowAI",
      url: "https://frontline.financial/taxflow",
      logo: "https://frontline.financial/favicon-taxflow.svg",
      email: "taxflowai@frontline.financial",
      telephone: "+61406909862",
      description:
        "Australian tax portal for individuals and small entities. Tax services provided by Registered Tax Agents; TaxFlowAI is the technology platform.",
      parentOrganization: {
        "@type": "Organization",
        name: "Frontline Holdings Group Pty Ltd",
      },
    },
    {
      "@type": "AccountingService",
      "@id": "https://frontline.financial/taxflow#parramatta",
      name: "TaxFlowAI — Parramatta",
      parentOrganization: { "@id": "https://frontline.financial/taxflow#org" },
      url: "https://frontline.financial/taxflow",
      telephone: "+61406909862",
      email: "taxflowai@frontline.financial",
      address: {
        "@type": "PostalAddress",
        streetAddress: "150 George Street",
        addressLocality: "Parramatta",
        addressRegion: "NSW",
        postalCode: "2150",
        addressCountry: "AU",
      },
      geo: { "@type": "GeoCoordinates", latitude: -33.815, longitude: 151.0011 },
    },
    {
      "@type": "AccountingService",
      "@id": "https://frontline.financial/taxflow#sydney",
      name: "TaxFlowAI — Sydney",
      parentOrganization: { "@id": "https://frontline.financial/taxflow#org" },
      url: "https://frontline.financial/taxflow",
      telephone: "+61406909862",
      email: "taxflowai@frontline.financial",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Martin Place",
        addressLocality: "Sydney",
        addressRegion: "NSW",
        addressCountry: "AU",
      },
      geo: { "@type": "GeoCoordinates", latitude: -33.8678, longitude: 151.21 },
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
      {children}
    </div>
  );
}
