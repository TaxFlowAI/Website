export const metadata = {
  title: "Privacy Consent | Frontline Financial Brokers",
  description: "How Frontline Financial Brokers collects, uses and shares your personal information when helping you with credit. Australian Credit Representative 553835.",
  alternates: { canonical: "/privacy-consent" },
  /* Legal page: stays public and linked from the footer, but out of Google so it stops taking sitelink slots */
  robots: { index: false, follow: true },
};

export default function PrivacyConsentLayout({ children }) {
  return children;
}
