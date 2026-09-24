"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { CALENDLY_URL, calendlyEmbedUrl } from "@/config/calendly";

/* the page host, null during SSR so server and client markup match */
const noop = () => () => {};
const useHost = () =>
  useSyncExternalStore(
    noop,
    () => window.location.host,
    () => null
  );

/* Calendly's booking page in a plain iframe with the brand parameters, plus a
   shimmer skeleton while it loads and a listener for Calendly's postMessage
   events so the surrounding UI can react (progress rail, booked screen).
   No Calendly script is needed for this — the page posts the events itself. */
const EVENTS = new Set([
  "calendly.profile_page_viewed",
  "calendly.event_type_viewed",
  "calendly.date_and_time_selected",
  "calendly.event_scheduled",
]);

export default function CalendlyFrame({ url = CALENDLY_URL, height = 680, onEvent, className = "" }) {
  const [loaded, setLoaded] = useState(false);
  const host = useHost();

  /* embed_domain must be the real host, so the src exists only on the client */
  let src = null;
  if (host) {
    const u = new URL(calendlyEmbedUrl(url));
    u.searchParams.set("embed_domain", host);
    u.searchParams.set("embed_type", "Inline");
    src = u.toString();
  }

  useEffect(() => {
    if (!onEvent) return undefined;
    const onMessage = (e) => {
      if (e.origin !== "https://calendly.com") return;
      const name = e.data && e.data.event;
      if (name && EVENTS.has(name)) onEvent(name, e.data.payload);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onEvent]);

  return (
    <div className={`tc-cal-frame ${className}`} style={{ height }}>
      {!loaded && (
        <div className="tc-cal-skeleton" aria-hidden>
          <div className="tc-cal-skel-line w-1/2" />
          <div className="tc-cal-skel-grid">
            {Array.from({ length: 28 }).map((_, i) => (
              <span key={i} />
            ))}
          </div>
          <p className="tc-mono mt-6 text-[11px]" style={{ color: "#64748B" }}>
            FLO IS PULLING UP THE CALENDAR…
          </p>
        </div>
      )}
      {src && (
        <iframe
          src={src}
          title="Book a discovery call"
          onLoad={() => setLoaded(true)}
          style={{ opacity: loaded ? 1 : 0 }}
        />
      )}
    </div>
  );
}
