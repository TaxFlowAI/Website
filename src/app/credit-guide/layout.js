export const metadata = {
  title: "Credit Guide | Frontline Financial Brokers",
  description: "The broking services we provide, our fees and commissions, and how to make a complaint. Frontline Financial Brokers, Australian Credit Representative 553835.",
  alternates: { canonical: "/credit-guide" },
  /* Legal page: stays public and linked from the footer, but out of Google so it stops taking sitelink slots */
  robots: { index: false, follow: true },
};

export default function CreditGuideLayout({ children }) {
  return children;
}
