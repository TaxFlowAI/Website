/* SEO layout for /assetsolutions — the page itself is a client component,
   so metadata and structured data live here. Target query: asset finance
   broker Parramatta (car, equipment, fleet finance). */

export const metadata = {
  metadataBase: new URL("https://frontline.financial"),
  title: "Asset Finance Broker Parramatta | Car & Equipment Finance — Frontline Financial",
  description:
    "Award-winning asset finance broker in Parramatta. Car loans, equipment and fleet finance from 30+ lenders, 24hr approvals, 100+ five-star Google reviews. Level 49, 8 Parramatta Square.",
  alternates: { canonical: "/assetsolutions" },
  openGraph: {
    title: "Asset Finance Broker Parramatta — Frontline Financial: Asset Solutions",
    description:
      "Car loans, equipment and fleet finance from 30+ lenders. 24hr approvals, 100+ five-star Google reviews. Visit us at Level 49, 8 Parramatta Square.",
    url: "/assetsolutions",
    siteName: "Frontline Financial",
    type: "website",
    locale: "en_AU",
  },
  twitter: { card: "summary_large_image" },
};

/* FinancialService schema: real credentials only — award (Fintelligence FY25),
   100+ five-star Google reviews (shown on the page), office address and geo. */
const ASSET_SOLUTIONS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "@id": "https://frontline.financial/assetsolutions#business",
  name: "Frontline Financial: Asset Solutions",
  legalName: "Martyn Financial Pty Ltd t/a Frontline Financial: Asset Solutions",
  url: "https://frontline.financial/assetsolutions",
  telephone: "+61422959486",
  email: "sham@frontline.financial",
  description:
    "Asset finance broker in Parramatta: car loans, commercial vehicle, equipment, machinery and fleet finance from 30+ lenders. Winner — Vehicle & Equipment Finance, Fintelligence Broker Awards FY25.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Level 49, 8 Parramatta Square",
    addressLocality: "Parramatta",
    addressRegion: "NSW",
    postalCode: "2150",
    addressCountry: "AU",
  },
  geo: { "@type": "GeoCoordinates", latitude: -33.8172, longitude: 151.0036 },
  areaServed: [
    { "@type": "City", name: "Parramatta" },
    { "@type": "City", name: "Sydney" },
    { "@type": "Country", name: "Australia" },
  ],
  parentOrganization: {
    "@type": "Organization",
    name: "Frontline Financial Group",
    url: "https://frontline.financial",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    bestRating: "5",
    reviewCount: "100",
  },
  award: "Winner — Vehicle & Equipment Finance, Fintelligence Broker Awards FY25",
};

export default function AssetSolutionsLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ASSET_SOLUTIONS_SCHEMA) }}
      />
      {children}
    </>
  );
}
