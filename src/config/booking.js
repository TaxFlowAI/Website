/* Self-booking for home loan appointments with Hassan (Frontline Financial Brokers).
   Offered on the home-loan thank-you screens only, after the enquiry has reached
   Broker Engine, so every booking is already a lead with a card. A Calendly booking
   on its own creates no card and no Meta Lead.

   The event lives in the Calendly account that also runs the TaxFlowAI discovery
   call (src/config/calendly.js), so its URL says "taxflowai". The popup keeps that
   out of sight; the plain link is only the fallback. Hours, length and meeting
   options are set in Calendly, so the copy here doesn't repeat them. */
export const HOME_LOAN_BOOKING = {
  url: "https://calendly.com/taxflowai/home-loan-appointment",
  host: "Hassan",
};

/* Frontline colours for the embed (hex without '#'). Calendly ignores them on its
   free plan, which is fine. Name and email come from the form just sent, so the
   client doesn't type them twice. */
export function homeLoanBookingEmbedUrl({ embedDomain, name, email }) {
  const u = new URL(HOME_LOAN_BOOKING.url);
  u.searchParams.set("embed_domain", embedDomain);
  u.searchParams.set("embed_type", "Inline");
  u.searchParams.set("background_color", "ffffff");
  u.searchParams.set("text_color", "1c5472");
  u.searchParams.set("primary_color", "39b2b2");
  if (name) u.searchParams.set("name", name);
  if (email) u.searchParams.set("email", email);
  return u.toString();
}
