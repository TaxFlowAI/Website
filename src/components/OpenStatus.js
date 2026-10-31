"use client";

import { useEffect, useState } from "react";
import { getOpenStatus } from "@/config/business-hours";

/* "Open now · until 8pm". The static render can't know the time, so this fills in on
   the client and refreshes every minute. */
export default function OpenStatus({ className = "" }) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const update = () => setStatus(getOpenStatus());
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  if (!status) return null;
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className={`h-2 w-2 shrink-0 rounded-full ${status.open ? "bg-[#00FCB8] ring-2 ring-[#00FCB8]/30" : "bg-gray-400"}`} aria-hidden />
      {status.text}
    </span>
  );
}
