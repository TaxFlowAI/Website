export const metadata = {
  title: "Calculator Disclaimer | Frontline Financial",
  description: "How our calculators work and their limits. Results are estimates only, not a loan offer or financial advice. Frontline Financial Group ABN 39 693 731 396.",
  alternates: { canonical: "/calculator-disclaimer" },
  /* Legal page: stays public and linked from the footer, but out of Google so it stops taking sitelink slots */
  robots: { index: false, follow: true },
};

export default function CalculatorDisclaimerLayout({ children }) {
  return children;
}
