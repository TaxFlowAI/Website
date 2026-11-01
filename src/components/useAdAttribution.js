"use client";

import { useEffect, useRef } from "react";

/* Ad attribution: the UTM tags (+ Meta's fbclid) on the landing URL, e.g.
   ?utm_source=meta&utm_campaign=…&utm_content=R1 Ute Too Old - A. Kept in
   sessionStorage for the visit (first ad touch wins) and sent with the lead,
   so the lead email shows which ad brought it in. */
const ATTRIBUTION_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"];
const ATTRIBUTION_STORAGE_KEY = "ff_attribution";

function readAttribution() {
  const fromUrl = {};
  try {
    const params = new URLSearchParams(window.location.search);
    ATTRIBUTION_KEYS.forEach((key) => {
      const value = params.get(key)?.trim();
      if (value) fromUrl[key] = value.slice(0, 200);
    });
  } catch {
    /* attribution must never break the page */
  }
  try {
    const stored = JSON.parse(sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY) || "null");
    if (stored && Object.keys(stored).length) return stored;
    if (Object.keys(fromUrl).length) {
      sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(fromUrl));
    }
  } catch {
    /* storage blocked (some in-app browsers) — fall back to this URL */
  }
  return fromUrl;
}

/* Captures the ad's tags on landing, before any quiz step. The returned ref's
   `current` goes in the /api/contact body as `attribution`. */
export default function useAdAttribution() {
  const attributionRef = useRef({});
  useEffect(() => {
    attributionRef.current = readAttribution();
  }, []);
  return attributionRef;
}
