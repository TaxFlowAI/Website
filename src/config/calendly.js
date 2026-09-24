/* Calendly booking for the TaxFlowAI site.
   CALENDLY_URL is the website-specific event link. It is used three ways:
   - as the plain href on every "book a call" link (works with JS disabled),
   - inside the branded popup opened by <CalendlyButton>,
   - inside the inline calendar on /taxflow/contact (<CalendlyInline>). */
export const CALENDLY_URL = "https://calendly.com/taxflowai/taxflowai-discovery";

/* Embed styling supported by Calendly's embed API (hex without '#'). */
export const CALENDLY_BRAND = {
  background_color: "0a1628",
  text_color: "ffffff",
  primary_color: "00fcb8",
  hide_gdpr_banner: "1",
  /* our own panel carries the event details, so hide Calendly's column */
  hide_event_type_details: "1",
  hide_landing_page_details: "1",
};

export function calendlyEmbedUrl(url = CALENDLY_URL) {
  const u = new URL(url);
  Object.entries(CALENDLY_BRAND).forEach(([k, v]) => u.searchParams.set(k, v));
  return u.toString();
}
