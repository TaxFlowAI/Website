"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import CalendlyFrame from "@/components/taxflow/CalendlyFrame";
import { CALENDLY_URL } from "@/config/calendly";

/* ---------- context: any component can open the booking modal ---------- */
const BookingContext = createContext(null);

export function useBooking() {
  return useContext(BookingContext);
}

export function BookingProvider({ children }) {
  const [open, setOpen] = useState(false);
  const returnFocus = useRef(null);

  const openBooking = useCallback(() => {
    returnFocus.current = typeof document !== "undefined" ? document.activeElement : null;
    setOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setOpen(false);
    const el = returnFocus.current;
    if (el && typeof el.focus === "function") el.focus();
  }, []);

  const value = useMemo(() => ({ open, openBooking, closeBooking }), [open, openBooking, closeBooking]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      {open && <BookingModal onClose={closeBooking} />}
    </BookingContext.Provider>
  );
}

/* ---------- the modal ---------- */
const STEPS = [
  { key: "time", label: "Pick a time", short: "Time" },
  { key: "details", label: "Your details", short: "Details" },
  { key: "booked", label: "Booked", short: "Booked" },
];

const POINTS = [
  "Free and no obligation. You'll never be quoted without asking",
  "The invite lands in your inbox the moment you book",
];

function BookingModal({ onClose }) {
  const [step, setStep] = useState(0);
  const closeRef = useRef(null);

  /* esc to close, lock page scroll, focus the close button */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const onEvent = useCallback((name) => {
    if (name === "calendly.date_and_time_selected") setStep(1);
    if (name === "calendly.event_scheduled") setStep(2);
  }, []);

  const booked = step === 2;

  return createPortal(
    <div className="tc-bk-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="tc-bk-panel" role="dialog" aria-modal="true" aria-labelledby="tc-bk-title">
        <button ref={closeRef} type="button" className="tc-bk-close" onClick={onClose} aria-label="Close booking">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
            <path d="M3 3l10 10M13 3L3 13" />
          </svg>
        </button>

        <div className="tc-bk-grid">
          {/* ----- branded side ----- */}
          <aside className="tc-bk-side">
            <div className="tc-bk-head">
              <div className="tc-bk-flo">
                <div className="tc-bk-flo-glow" aria-hidden />
                <Image
                  src="/images/taxflow/flo-hello.webp"
                  alt=""
                  width={1254}
                  height={1254}
                  sizes="104px"
                  priority
                  className="float-animate relative z-10 h-auto w-full"
                />
              </div>
              <div>
                <p className="tc-eyebrow" style={{ color: "#00FCB8" }}>
                  Talk to a human
                </p>
                <h2 id="tc-bk-title" className="tc-display tc-bk-title mt-1.5 text-white">
                  Book a discovery call
                </h2>
              </div>
            </div>
            <p className="tc-bk-desc leading-relaxed" style={{ color: "#B7C4CF" }}>
              Fifteen minutes on the phone with the TaxFlowAI team. No pressure — just
              whether TaxFlowAI fits you.
            </p>

            <ol className="tc-bk-steps" aria-label="Booking progress">
              {STEPS.map((s, i) => (
                <li key={s.key} className={i < step ? "is-done" : i === step ? "is-active" : ""}>
                  <span className="tc-bk-dot" aria-hidden />
                  <span className="tc-mono tc-bk-step-long text-[11px] tracking-[0.16em]">{s.label.toUpperCase()}</span>
                  <span className="tc-mono tc-bk-step-short text-[10px] tracking-[0.14em]">{s.short.toUpperCase()}</span>
                </li>
              ))}
            </ol>

            <ul className="tc-bk-points mt-6 hidden lg:block">
              {POINTS.map((p) => (
                <li key={p}>
                  <svg viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M1.5 6.5l3 3 6-7" stroke="#00FCB8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>

            <p className="tc-mono mt-auto hidden pt-8 text-[10.5px] lg:block" style={{ color: "#64748B" }}>
              POWERED BY FRONTLINE FINANCIAL · PARRAMATTA &amp; MARTIN PLACE
            </p>
          </aside>

          {/* ----- calendar / booked ----- */}
          <div className="tc-bk-main">
            {booked ? (
              <div className="tc-bk-success">
                <div className="tc-bk-tick" aria-hidden>
                  <svg viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="30" stroke="#00FCB8" strokeWidth="2" className="tc-bk-tick-ring" />
                    <path d="M20 33l8 8 16-17" stroke="#00FCB8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="tc-bk-tick-path" />
                  </svg>
                </div>
                <h3 className="tc-display mt-6 text-3xl text-white md:text-4xl">You&apos;re booked.</h3>
                <p className="mt-3 max-w-sm text-[15px] leading-relaxed" style={{ color: "#B7C4CF" }}>
                  The invite is on its way to your inbox. Flo has it on the calendar — a real
                  human will call you at the time you chose.
                </p>
                <p className="tc-mono mt-5 text-[11px]" style={{ color: "#64748B" }}>
                  NEED TO CHANGE IT? USE THE LINK IN YOUR INVITE.
                </p>
                <button type="button" onClick={onClose} className="tc-btn-primary mt-8 rounded-lg px-7 py-3 text-[15px] font-bold">
                  Done
                </button>
              </div>
            ) : (
              <CalendlyFrame url={CALENDLY_URL} height="100%" onEvent={onEvent} />
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
