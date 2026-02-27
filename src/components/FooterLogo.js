"use client";

import { useState } from "react";

/** Footer logo: static image from public/images/logos, fallback to text if load fails. */
export default function FooterLogo() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="text-lg font-bold tracking-tight text-white">
        Frontline Financial
      </span>
    );
  }

  return (
    <img
      src="/images/logos/frontline-logo.svg?v=2"
      alt="Frontline Financial"
      className="h-10 w-auto brightness-0 invert object-contain"
      onError={() => setFailed(true)}
    />
  );
}
