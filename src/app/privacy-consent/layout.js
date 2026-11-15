export const metadata = {
  title: "Privacy Consent | Frontline Financial Brokers",
  description: "How Frontline Financial Brokers collects, uses and shares your personal information when helping you with credit. Frontline Financial Pty Ltd, Authorised Credit Representative 575968 of Australian Credit Licence 389087 (AFG).",
  alternates: { canonical: "/privacy-consent" },
  /* Legal page: stays public and linked from the footer, but out of Google so it stops taking sitelink slots */
  robots: { index: false, follow: true },
};

export default function PrivacyConsentLayout({ children }) {
  return children;
}
