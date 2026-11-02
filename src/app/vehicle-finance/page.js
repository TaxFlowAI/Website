import { ALL_FAQS, ANGLE_PATTERN } from "@/data/vehicle-finance";
import VehicleFinanceLanding from "./VehicleFinanceLanding";

/* Landing page for the commercial-vehicle-finance Instagram/Facebook reels.
   One job: get the viewer to submit the assessment form. */

export const metadata = {
  metadataBase: new URL("https://frontline.financial"),
  title: "Ute & Truck Finance for ABN Holders | Frontline Financial",
  description:
    "Ute, van and truck finance for ABN holders, including new ABNs, private sales and bad credit. Free, no-obligation assessment against 30+ lenders.",
  alternates: { canonical: "/vehicle-finance" },
  openGraph: {
    title: "Ute, van or truck finance, sorted.",
    description:
      "Free, no obligation assessment against 30+ lenders, including a free copy of your Equifax credit report (conditions apply).",
    url: "/vehicle-finance",
    siteName: "Frontline Financial",
    type: "website",
    locale: "en_AU",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ALL_FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

/* Runs before the hero is parsed, so the headline for the ad that was tapped is there on
   first paint and the first question never jumps. Keeps this page static and fast. */
const ANGLE_SCRIPT = `try{var m=new RegExp(${JSON.stringify(ANGLE_PATTERN)},"i").exec(new URLSearchParams(location.search).get("utm_content")||"");if(m)document.documentElement.setAttribute("data-vf-angle","r"+m[1])}catch(e){}`;

export default function VehicleFinancePage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: ANGLE_SCRIPT }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <VehicleFinanceLanding />
    </>
  );
}
