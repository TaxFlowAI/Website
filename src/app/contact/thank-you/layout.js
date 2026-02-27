// Force this segment to render at request time (thank-you page uses search params)
export const dynamic = "force-dynamic";

export default function ThankYouLayout({ children }) {
  return children;
}
