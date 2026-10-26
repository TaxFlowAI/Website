export const metadata = {
  title: "Home Loan Calculator Disclaimer | Frontline Financial",
  description: "Important information about our mortgage and refinance calculators. Frontline Financial Pty Ltd CRN 575968, ACL 389087.",
  alternates: { canonical: "/calculator-disclaimer-broking" },
  /* Legal page: stays public and linked from the footer, but out of Google so it stops taking sitelink slots */
  robots: { index: false, follow: true },
};

export default function Layout({ children }) {
  return children;
}
