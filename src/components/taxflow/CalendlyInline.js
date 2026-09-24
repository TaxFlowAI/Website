"use client";

import { useCallback, useState } from "react";
import CalendlyFrame from "@/components/taxflow/CalendlyFrame";
import { CALENDLY_URL } from "@/config/calendly";

/* Inline calendar for the contact page: the same branded frame as the modal,
   with a "you're booked" state once Calendly reports the booking. */
export default function CalendlyInline({ url = CALENDLY_URL, height = 720 }) {
  const [booked, setBooked] = useState(false);
  const onEvent = useCallback((name) => {
    if (name === "calendly.event_scheduled") setBooked(true);
  }, []);

  return (
    <div className="tc-calendly-inline" style={{ minHeight: booked ? 0 : height }}>
      {booked ? (
        <div className="tc-bk-success py-14">
          <div className="tc-bk-tick" aria-hidden>
            <svg viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="30" stroke="#00FCB8" strokeWidth="2" className="tc-bk-tick-ring" />
              <path d="M20 33l8 8 16-17" stroke="#00FCB8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="tc-bk-tick-path" />
            </svg>
          </div>
          <h3 className="tc-display mt-6 text-3xl text-white md:text-4xl">You&apos;re booked.</h3>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed" style={{ color: "#B7C4CF" }}>
            The invite is on its way to your inbox. A real human will call you at the time you chose.
          </p>
        </div>
      ) : (
        <CalendlyFrame url={url} height={height} onEvent={onEvent} />
      )}
    </div>
  );
}
