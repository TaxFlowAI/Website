"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ENTITY } from "@/config/entities";
import { consentParts } from "@/config/consent";

const CONSENT_ERROR = "You must agree to the Credit Guide and Privacy Consent to proceed.";

/* The wording comes from consentParts, which /api/contact also uses to write the consent
   record on each lead. Change it there, never here. */
function ConsentCheckbox({ entity, checked, onChange, theme = "light" }) {
  const p = consentParts(entity);
  if (!p) return null;
  const textClass = theme === "dark" ? "text-white/80" : "text-[#1C5472]";
  const linkClass = `font-medium underline hover:no-underline ${theme === "dark" ? "text-[#00FCB8]" : "text-[#1C5472]"}`;
  return (
    <label className="flex cursor-pointer items-start gap-3 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-5 w-5 shrink-0 rounded border-[#39B2B2]/50 accent-[#1C5472] focus:ring-[#00FCB8]"
      />
      <span className={textClass}>
        I have read and agree to the{" "}
        <Link href={p.creditGuidePath} className={linkClass} target="_blank" rel="noopener noreferrer">
          {p.creditGuideLabel}
        </Link>{" "}
        and{" "}
        <Link href={p.privacyConsentPath} className={linkClass} target="_blank" rel="noopener noreferrer">
          Privacy Consent
        </Link>{" "}
        of {p.party}.
      </span>
    </label>
  );
}

/* The Privacy Policy of the business whose box is shown */
function PolicyNote({ entity, theme }) {
  const p = consentParts(entity);
  if (!p) return null;
  return (
    <p className={`mt-2 pl-8 text-xs ${theme === "dark" ? "text-white/60" : "text-[#1C5472]/70"}`}>
      Our{" "}
      <Link
        href={p.privacyPolicyPath}
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:no-underline"
      >
        Privacy Policy
      </Link>{" "}
      explains how we handle your details. We keep a record of when you tick this box.
    </p>
  );
}

export default function FormConsent({
  entity,
  value = false,
  onChange,
  showError = false,
  className = "",
  theme = "light",
}) {
  const [brokersChecked, setBrokersChecked] = useState(false);
  const [assetChecked, setAssetChecked] = useState(false);

  const isShared = entity === ENTITY.SHARED || entity === "shared";

  /* A tick is for one business's documents. If the form switches business (another person,
     another product), clear it so the visitor ticks again for the documents now shown:
     our own boxes during render, the form's value in an effect. */
  const [shownEntity, setShownEntity] = useState(entity);
  if (shownEntity !== entity) {
    setShownEntity(entity);
    setBrokersChecked(false);
    setAssetChecked(false);
  }
  const lastEntity = useRef(entity);
  useEffect(() => {
    if (lastEntity.current === entity) return;
    lastEntity.current = entity;
    if (value) onChange(false);
  }, [entity, value, onChange]);

  const handleBrokersConsent = (checked) => {
    setBrokersChecked(checked);
    onChange(checked || assetChecked);
  };

  const handleAssetConsent = (checked) => {
    setAssetChecked(checked);
    onChange(checked || brokersChecked);
  };

  if (entity === ENTITY.BROKERS || entity === ENTITY.ASSET_SOLUTIONS) {
    return (
      <div className={className}>
        <ConsentCheckbox entity={entity} checked={value} onChange={onChange} theme={theme} />
        <PolicyNote entity={entity} theme={theme} />
        {showError && !value && (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {CONSENT_ERROR}
          </p>
        )}
      </div>
    );
  }

  if (!isShared) return null;

  // SHARED: show both checkboxes; user must tick the one that matches their enquiry
  const sharedValue = brokersChecked || assetChecked;
  return (
    <div className={`space-y-4 ${className}`}>
      <p className={`text-sm font-medium ${theme === "dark" ? "text-white/90" : "text-[#1C5472]"}`}>
        I have read and agree to the following (tick the one that applies to your enquiry):
      </p>
      <div className="space-y-3">
        <ConsentCheckbox entity={ENTITY.BROKERS} checked={brokersChecked} onChange={handleBrokersConsent} theme={theme} />
        <ConsentCheckbox entity={ENTITY.ASSET_SOLUTIONS} checked={assetChecked} onChange={handleAssetConsent} theme={theme} />
      </div>
      <PolicyNote entity={assetChecked ? ENTITY.ASSET_SOLUTIONS : ENTITY.BROKERS} theme={theme} />
      {showError && !sharedValue && (
        <p className="text-sm text-red-600" role="alert">
          {CONSENT_ERROR}
        </p>
      )}
    </div>
  );
}

export { CONSENT_ERROR };
