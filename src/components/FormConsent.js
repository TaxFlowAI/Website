"use client";

import { useState } from "react";
import Link from "next/link";
import { ENTITY, getEntityConfig } from "@/config/entities";

const CONSENT_ERROR = "You must agree to the Credit Guide and Privacy Consent to proceed.";

function ConsentCheckbox({ config, checked, onChange, creditGuideLabel = "Credit Guide", theme = "light" }) {
  if (!config) return null;
  const textClass = theme === "dark" ? "text-white/80" : "text-[#1C5472]";
  return (
    <label className="flex cursor-pointer items-start gap-3 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 rounded border-[#39B2B2]/50 text-[#00FCB8] focus:ring-[#00FCB8]"
        aria-describedby={config.entityCRN ? undefined : undefined}
      />
      <span className={textClass}>
        I have read and agree to the{" "}
        <Link href={config.creditGuidePath} className="font-medium text-[#00FCB8] underline hover:no-underline" target="_blank" rel="noopener noreferrer">
          {creditGuideLabel}
        </Link>{" "}
        and{" "}
        <Link href={config.privacyConsentPath} className="font-medium text-[#00FCB8] underline hover:no-underline" target="_blank" rel="noopener noreferrer">
          Privacy Consent
        </Link>{" "}
        of {config.legalName}
        {config.tradingAs && config.tradingAs !== config.legalName && ` t/a ${config.tradingAs}`}
        {" "}(Authorised Credit Representative CRN: {config.entityCRN || config.creditRepNumber}, Australian Credit Licence No. {config.aclNumber}).
      </span>
    </label>
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
  const brokersConfig = getEntityConfig(ENTITY.BROKERS);
  const assetConfig = getEntityConfig(ENTITY.ASSET_SOLUTIONS);

  const isShared = entity === ENTITY.SHARED || entity === "shared";

  const handleBrokersConsent = (checked) => {
    setBrokersChecked(checked);
    if (isShared) onChange(checked || assetChecked);
    else onChange(checked);
  };

  const handleAssetConsent = (checked) => {
    setAssetChecked(checked);
    if (isShared) onChange(checked || brokersChecked);
    else onChange(checked);
  };

  if (entity === ENTITY.BROKERS) {
    return (
      <div className={className}>
        <ConsentCheckbox
          config={brokersConfig}
          creditGuideLabel="Credit Guide"
          checked={value}
          onChange={onChange}
          theme={theme}
        />
        {showError && !value && (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {CONSENT_ERROR}
          </p>
        )}
      </div>
    );
  }

  if (entity === ENTITY.ASSET_SOLUTIONS) {
    return (
      <div className={className}>
        <ConsentCheckbox
          config={assetConfig}
          creditGuideLabel="Credit Guide & Quote"
          checked={value}
          onChange={onChange}
          theme={theme}
        />
        {showError && !value && (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {CONSENT_ERROR}
          </p>
        )}
      </div>
    );
  }

  // SHARED: show both checkboxes; user must tick the one that matches their enquiry
  const sharedValue = brokersChecked || assetChecked;
  return (
    <div className={`space-y-4 ${className}`}>
      <p className={`text-sm font-medium ${theme === "dark" ? "text-white/90" : "text-[#1C5472]"}`}>
        I have read and agree to the following (tick the one that applies to your enquiry):
      </p>
      <div className="space-y-3">
        <ConsentCheckbox
          config={brokersConfig}
          creditGuideLabel="Credit Guide"
          checked={brokersChecked}
          onChange={(checked) => handleBrokersConsent(checked)}
          theme={theme}
        />
        <ConsentCheckbox
          config={assetConfig}
          creditGuideLabel="Credit Guide & Quote"
          checked={assetChecked}
          onChange={(checked) => handleAssetConsent(checked)}
          theme={theme}
        />
      </div>
      {showError && !sharedValue && (
        <p className="text-sm text-red-600" role="alert">
          {CONSENT_ERROR}
        </p>
      )}
    </div>
  );
}

export { CONSENT_ERROR };
