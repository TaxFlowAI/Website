export const metadata = {
  title: "Privacy Policy: Home Loans | Frontline Financial Brokers",
  description:
    "How Frontline Financial Brokers (Frontline Financial Pty Ltd, Authorised Credit Representative 575968 of AFG, Australian Credit Licence 389087) collects, uses, shares and protects your personal and credit information.",
  alternates: { canonical: "/privacy-policy" },
  /* Legal page: public and linked from the footer and every home-loan form, but out of Google like the other legal pages */
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyLayout({ children }) {
  return children;
}
