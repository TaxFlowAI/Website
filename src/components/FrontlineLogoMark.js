"use client";

import { useState } from "react";

/** Frontline Financial "F" mark — uses PNG from public/images, falls back to SVG if image missing */
const LogoSvg = ({ className, ...props }) => (
  <svg
    viewBox="0 0 32 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden
    {...props}
  >
    <rect x="0" y="0" width="28" height="8" rx="4" fill="#00FCB8" />
    <rect x="0" y="16" width="20" height="8" rx="4" fill="#39B2B2" />
    <rect x="0" y="32" width="12" height="8" rx="4" fill="#1C5472" />
  </svg>
);

export default function FrontlineLogoMark({ className = "h-9 w-auto md:h-10", ...props }) {
  const [useFallback, setUseFallback] = useState(false);

  if (useFallback) {
    return <LogoSvg className={className} {...props} />;
  }

  return (
    <img
      src="/images/logos/frontline-logo-mark.svg"
      alt=""
      width={32}
      height={40}
      className={className}
      aria-hidden
      onError={() => setUseFallback(true)}
      {...props}
    />
  );
}
