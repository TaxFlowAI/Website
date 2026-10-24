"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/* /taxflow is TaxFlowAI (TAX7 T04), a separate business — its visitors must
   not feed Frontline Financial's Meta dataset. */
const isExcluded = (path) => path === "/taxflow" || path?.startsWith("/taxflow/");

function loadPixel() {
  if (window.fbq) return;
  /* Meta's standard base snippet, minus the PageView (fired per route below). */
  const n = (window.fbq = function () {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  });
  if (!window._fbq) window._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  /* Meta's own history and button-click auto-tracking would also fire on
     /taxflow pages after in-app navigation, so both are off. With history
     tracking off, fbevents sends only one PageView per full page load (it
     drops repeats), so client-side route changes are not counted — fine here,
     as the Financial service category already trims URLs to the domain. */
  n.disablePushState = true;
  const t = document.createElement("script");
  t.async = true;
  t.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(t);
  window.fbq("set", "autoConfig", false, PIXEL_ID);
  window.fbq("init", PIXEL_ID);
  window.fbq("track", "PageView");
}

/* Loads the Meta Pixel on the first non-/taxflow route this page load visits.
   Renders nothing; does nothing until NEXT_PUBLIC_META_PIXEL_ID is set. */
export default function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    if (!PIXEL_ID || isExcluded(pathname)) return;
    try {
      loadPixel();
    } catch {
      /* analytics must never break the page */
    }
  }, [pathname]);

  return null;
}

/* Send a Meta event. Loads the pixel first if needed: Next can hydrate a page
   (and fire its effects) before the layout's MetaPixel effect has run. */
export function trackMeta(eventName, standard = true) {
  try {
    if (!PIXEL_ID || isExcluded(window.location.pathname)) return;
    loadPixel();
    window.fbq(standard ? "track" : "trackCustom", eventName);
  } catch {
    /* analytics must never break the page */
  }
}

/* Fire Meta's standard Lead event after an enquiry is accepted by /api/contact. */
export const trackLead = () => trackMeta("Lead");
