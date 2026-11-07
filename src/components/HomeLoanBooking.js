"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HOME_LOAN_BOOKING, homeLoanBookingEmbedUrl } from "@/config/booking";
import { trackMeta } from "@/components/MetaPixel";

/* "Want to lock in a time?" card for the home-loan thank-you screens. The button
   opens Calendly in a popup on our own page (so its taxflowai URL never shows);
   it's a real link, so ctrl/cmd-click, middle-click and no-JS still work.
   When Calendly reports a booking, the card says so and Meta gets a Schedule event.
   tone: "light" on white cards, "dark" on the dark blue thank-you boxes. */
export default function HomeLoanBooking({ name = "", email = "", tone = "light", className = "" }) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [booked, setBooked] = useState(false);
  const [src, setSrc] = useState(null);
  const triggerRef = useRef(null);
  const closeRef = useRef(null);
  const dark = tone === "dark";

  const openPopup = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    /* embed_domain has to be the real host, so the src is built on click */
    setSrc(homeLoanBookingEmbedUrl({ embedDomain: window.location.host, name: name.trim(), email: email.trim() }));
    setLoaded(false);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  /* Calendly posts its events to the parent page */
  useEffect(() => {
    const onMessage = (e) => {
      if (e.origin !== "https://calendly.com") return;
      if (e.data?.event !== "calendly.event_scheduled") return;
      setBooked((was) => {
        if (!was) trackMeta("Schedule");
        return true;
      });
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  /* while open: Escape closes, the page behind doesn't scroll */
  useEffect(() => {
    if (!open) return undefined;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const box = dark ? "border border-white/15 bg-white/5" : "border border-[#39B2B2]/30 bg-[#39B2B2]/10";
  const heading = dark ? "text-white" : "text-[#1C5472]";
  const body = dark ? "text-white/85" : "text-[#1C5472]/85";
  const button = dark
    ? "bg-[#00FCB8] text-[#0A1628]"
    : "bg-[#1C5472] text-white";

  return (
    <div className={`rounded-2xl p-5 text-left ${box} ${className}`}>
      {booked ? (
        <>
          <p className={`font-bold ${heading}`}>Your appointment is booked.</p>
          <p className={`mt-2 text-sm ${body}`}>The confirmation, with the time and how you&apos;re meeting, is in your inbox.</p>
        </>
      ) : (
        <>
          <p className={`font-bold ${heading}`}>Want to lock in a time with {HOME_LOAN_BOOKING.host}?</p>
          <p className={`mt-2 text-sm ${body}`}>
            Pick a time for your appointment: at our Parramatta Square office, by phone or on Microsoft Teams.
          </p>
          <a
            ref={triggerRef}
            href={HOME_LOAN_BOOKING.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={openPopup}
            className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-bold transition hover:scale-[1.02] ${button}`}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
              <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
              <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
            </svg>
            See available times
          </a>
        </>
      )}

      {open && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A1628]/75 p-3 sm:p-6"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Book a time with ${HOME_LOAN_BOOKING.host}`}
            className="relative flex h-[min(760px,92vh)] w-full max-w-[1020px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#1C5472]/10 px-5 py-3">
              <p className="font-bold text-[#1C5472]">Book a time with {HOME_LOAN_BOOKING.host}</p>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#1C5472] transition hover:bg-[#1C5472]/10"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" viewBox="0 0 24 24" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <div className="relative flex-1">
              {!loaded && (
                <p className="absolute inset-0 flex items-center justify-center text-sm text-[#1C5472]/70">Loading the calendar…</p>
              )}
              {src && (
                <iframe
                  src={src}
                  title={`Book a time with ${HOME_LOAN_BOOKING.host}`}
                  onLoad={() => setLoaded(true)}
                  className="h-full w-full border-0"
                  style={{ opacity: loaded ? 1 : 0 }}
                />
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
