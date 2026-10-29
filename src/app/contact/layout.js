import { HOURS } from "@/config/business-hours";
import { OFFICE, GOOGLE, SOCIAL } from "@/config/location";
import { CONTACT_FAQ } from "@/data/contact-faq";

export const metadata = {
  title: "Contact Frontline Financial | Parramatta Square",
  description:
    "Visit us at Level 49, 8 Parramatta Square, call +61 422 959 486 (Monday to Friday, 10:30am to 8pm) or send a message. Meet in person or by phone or video. We reply within one business day.",
  alternates: { canonical: "/contact" },
};

/* The office as one place: the same name, address, phone, hours and map pin
   as the Google Business Profile. The two businesses keep their own schema on
   /brokers and /assetsolutions. No review markup: Google ignores self-served
   review stars for a business's own site. */
const CONTACT_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FinancialService",
      "@id": "https://frontline.financial/contact#office",
      name: OFFICE.name,
      url: "https://frontline.financial/contact",
      image: "https://frontline.financial/images/frontline-8-parramatta-square.webp",
      logo: "https://frontline.financial/images/logos/frontline-logo.svg",
      telephone: "+61422959486",
      email: OFFICE.email,
      description:
        "Finance broker at Parramatta Square for home loans (Frontline Financial Brokers) and car, ute, truck and equipment finance (Frontline Financial: Asset Solutions). Meetings in person or by phone or video.",
      address: {
        "@type": "PostalAddress",
        streetAddress: OFFICE.street,
        addressLocality: OFFICE.locality,
        addressRegion: OFFICE.region,
        postalCode: OFFICE.postcode,
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
        { "@type": "State", name: "New South Wales" },
      ],
      sameAs: [GOOGLE.listingUrl, SOCIAL.facebook, SOCIAL.instagram, SOCIAL.linkedin],
      parentOrganization: { "@id": "https://frontline.financial/#org" },
    },
    {
      "@type": "FAQPage",
      mainEntity: CONTACT_FAQ.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

export default function ContactLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(CONTACT_SCHEMA) }} />
      {children}
    </>
  );
}
