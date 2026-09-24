"use client";

import { CALENDLY_URL } from "@/config/calendly";
import { useBooking } from "@/components/taxflow/BookingModal";

/* A booking link that opens the TaxFlowAI booking modal. Renders as a real
   <a> to the Calendly page, so it still works with JS off, when the modal
   provider isn't mounted, or with ctrl/cmd-click and middle-click. */
export default function CalendlyButton({ children, className, url = CALENDLY_URL, ...rest }) {
  const booking = useBooking();

  const onClick = (e) => {
    if (!booking || e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    booking.openBooking();
  };

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}
