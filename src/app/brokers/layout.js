import { BROKERS_FAQ } from "@/data/brokers-faq";
import { HOURS } from "@/config/business-hours";
import { OFFICE, GOOGLE } from "@/config/location";

/* SEO layout for /brokers — the page itself is a client component, so
   metadata and structured data live here. Target queries: mortgage broker
   Parramatta, home loan broker Parramatta. Self-employed borrowers are the
   Brokers niche (26 Oct 2026) and have their own page. */

export const metadata = {
  title: "Mortgage Broker Parramatta | Frontline Financial Brokers",
  description:
    "Parramatta mortgage broker for home loans, self-employed borrowers, first home buyers, refinancing and investment loans. 30+ lenders, at no cost to you.",
  alternates: { canonical: "/brokers" },
  openGraph: {
    title: "Mortgage Broker Parramatta — Frontline Financial Brokers",
    description:
      "Home loans from 30+ lenders, with a specialty in self-employed borrowers. Visit us at Level 49, 8 Parramatta Square.",
    url: "/brokers",
    siteName: "Frontline Financial",
    type: "website",
    locale: "en_AU",
    images: [{ url: "/images/brokers-home-couple.webp", width: 1200, height: 548 }],
  },
  twitter: { card: "summary_large_image" },
};

/* FinancialService schema for the home-loan business. Real details only:
   legal name and licence from src/config/entities.js, office address, hours
   as on the Google Business Profile. No review markup here: the Google
   reviews belong to the group listing and are mostly car-loan reviews. */
const BROKERS_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FinancialService",
      "@id": "https://frontline.financial/brokers#business",
      name: "Frontline Financial Brokers",
      legalName: "Frontline Financial Pty Ltd",
      url: "https://frontline.financial/brokers",
      image: "https://frontline.financial/images/frontline-8-parramatta-square.webp",
      telephone: "+61422959486",
      email: "hassan@frontline.financial",
      description:
        "Mortgage broker in Parramatta: home loans, self-employed home loans, first home buyers, refinancing, investment, construction, SMSF and commercial loans. Authorised credit representative CRN 575968 of Australian Credit Licence 389087.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Level 49, 8 Parramatta Square",
        addressLocality: "Parramatta",
        addressRegion: "NSW",
        postalCode: "2150",
        addressCountry: "AU",
      },
      geo: { "@type": "GeoCoordinates", ...OFFICE.geo },
      hasMap: GOOGLE.listingUrl,
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: HOURS.days,
        opens: HOURS.opens,
        closes: HOURS.closes,
      },
      areaServed: [
        { "@type": "City", name: "Parramatta" },
        { "@type": "Place", name: "Western Sydney" },
        { "@type": "City", name: "Sydney" },
        { "@type": "State", name: "New South Wales" },
      ],
      knowsLanguage: ["en", "ar"],
      employee: {
        "@type": "Person",
        name: "Hassan Arif",
        jobTitle: "Mortgage & Finance Broker",
        sameAs: ["https://www.linkedin.com/in/hassan-arif-555382354/"],
      },
      parentOrganization: {
        "@type": "Organization",
        name: "Frontline Financial Group",
        url: "https://frontline.financial",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: BROKERS_FAQ.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

export default function BrokersLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BROKERS_SCHEMA) }}
      />
      {children}
    </>
  );
}
