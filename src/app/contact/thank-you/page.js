// Server page: opt out of prerender so client ThankYouClient can use search params
export const dynamic = "force-dynamic";

import ThankYouClient from "./ThankYouClient";

export default function ThankYouPage() {
  return <ThankYouClient />;
}
