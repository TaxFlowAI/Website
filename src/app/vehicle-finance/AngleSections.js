"use client";

import { useSyncExternalStore } from "react";
import SettledDeals from "@/components/SettledDeals";
import { AwardAndBroker } from "@/app/apply/[product]/ApplicationDetails";
import { ANGLES, CAR_LOAN, angleFromSearch, faqsFor } from "@/data/vehicle-finance";

const subscribe = () => () => {};

/* These sit below the first screen, so they can pick the ad's angle up on the client.
   The hero can't wait for that: see .vf-angle in globals.css. */
function useAngle() {
  const key = useSyncExternalStore(subscribe, () => angleFromSearch(window.location.search), () => "default");
  return ANGLES[key];
}

export function AngleDeals() {
  const { deals } = useAngle();
  return <SettledDeals {...deals} tone="light" ctaHref="#application" ctaLabel="Get my free assessment" />;
}

export function AngleBrokerAndFaq() {
  const angle = useAngle();
  return <AwardAndBroker app={{ ...CAR_LOAN, questions: faqsFor(angle) }} />;
}
