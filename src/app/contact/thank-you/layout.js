// Force this segment to render at request time (thank-you page uses search params)
export const dynamic = "force-dynamic";

/* Only reached after sending the contact form, so kept out of Google. */
export const metadata = {
  title: "Message Received | Frontline Financial",
  alternates: { canonical: "/contact/thank-you" },
  robots: { index: false, follow: true },
};

export default function ThankYouLayout({ children }) {
  return children;
}
