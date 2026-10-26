export const metadata = {
  title: "Car Loan Calculator Disclaimer | Frontline Financial",
  description: "Important information about our car and personal loan calculators. Martyn Financial Pty Ltd CRN 563350, ACL 511803.",
  alternates: { canonical: "/calculator-disclaimer-asset-solutions" },
  /* Legal page: stays public and linked from the footer, but out of Google so it stops taking sitelink slots */
  robots: { index: false, follow: true },
};

export default function Layout({ children }) {
  return children;
}
