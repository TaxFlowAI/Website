import VehicleFinanceLanding from "./VehicleFinanceLanding";

/* Landing page for the commercial-vehicle-finance Instagram/Facebook reels.
   One job: get the viewer to submit the assessment form. */

export const metadata = {
  metadataBase: new URL("https://frontline.financial"),
  title: "Commercial Vehicle Finance | Free Assessment | Frontline Financial",
  description:
    "Ute, van or truck finance for your business. Second hand, private sale, new ABN or a default on file. Free no obligation assessment against 30+ lenders.",
  alternates: { canonical: "/vehicle-finance" },
  openGraph: {
    title: "Commercial vehicle finance, sorted.",
    description:
      "Free, no obligation assessment against 30+ lenders — including a free copy of your Equifax credit report (conditions apply).",
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
  mainEntity: [
    ["Do you charge for the assessment?", "No. The assessment is free and there is no obligation. If we arrange finance, the lender pays us a commission, which we disclose in your credit guide."],
    ["Will you run a credit check?", "Yes — as part of your free assessment we run a credit check and, where you are eligible, provide you with a free copy of your Equifax report. It lets us read your file the way a lender would, before any lender does. Conditions apply."],
    ["Will it affect my credit?", "Only if we submit an application — which we cannot do without your authority. The assessment and your free Equifax report do not lodge an application with any lender."],
    ["Can I finance a vehicle from a private seller or auction?", "Yes, with the right lender. The seller needs to prove they own it and a PPSR check needs to be clear. Get approved before you bid at auction."],
    ["I have a default. Is it worth applying?", "Often yes. It depends on what the default was, how old it is and whether it is paid. Send it to us before you apply anywhere else, because every application shows on your file."],
    ["My ABN is new and I have no financials.", "Some lenders have no minimum trading history and some offer low doc options. Loan size and rate can be affected. We will tell you straight."],
    ["How fast is it?", "Once we have your documents, approvals on straightforward deals often come back within a few business days. We will give you a realistic timeframe on the call."],
  ].map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function VehicleFinancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <VehicleFinanceLanding />
    </>
  );
}
