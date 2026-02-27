"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ENTITY,
  getEntityForRoute,
  getEntityConfig,
} from "@/config/entities";
import { useComplianceEntityOverride } from "@/context/ComplianceEntityContext";

function EntityBlock({ config, label }) {
  if (!config) return null;
  return (
    <div className="rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm">
      {label && (
        <p className="mb-2 font-semibold uppercase tracking-wider text-white/90">
          {label}
        </p>
      )}
      <p className="text-white/80">{config.complianceFooterText}</p>
      <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        <Link
          href={config.creditGuidePath}
          className="text-[#00FCB8] transition hover:underline"
        >
          {config.creditGuidePath.includes("asset-solutions")
            ? "Credit Guide & Quote"
            : "Credit Guide"}
        </Link>
        <span className="text-white/50">|</span>
        <Link
          href={config.privacyConsentPath}
          className="text-[#00FCB8] transition hover:underline"
        >
          Privacy Consent
        </Link>
      </p>
    </div>
  );
}

export default function ComplianceFooter() {
  const pathname = usePathname();
  const overrideEntity = useComplianceEntityOverride();
  const entity = overrideEntity != null ? overrideEntity : getEntityForRoute(pathname);

  const brokersConfig = getEntityConfig(ENTITY.BROKERS);
  const assetConfig = getEntityConfig(ENTITY.ASSET_SOLUTIONS);

  if (entity === ENTITY.BROKERS) {
    return (
      <section
        className="border-t border-white/20 bg-[#1C5472] px-4 py-6 md:px-6 lg:px-8"
        aria-label="Compliance information"
      >
        <div className="mx-auto max-w-7xl">
          <EntityBlock config={brokersConfig} />
        </div>
      </section>
    );
  }

  if (entity === ENTITY.ASSET_SOLUTIONS) {
    return (
      <section
        className="border-t border-white/20 bg-[#1C5472] px-4 py-6 md:px-6 lg:px-8"
        aria-label="Compliance information"
      >
        <div className="mx-auto max-w-7xl">
          <EntityBlock config={assetConfig} />
        </div>
      </section>
    );
  }

  // SHARED: show both entities with labels
  return (
    <section
      className="border-t border-white/20 bg-[#1C5472] px-4 py-6 md:px-6 lg:px-8"
      aria-label="Compliance information"
    >
      <div className="mx-auto max-w-7xl space-y-4">
        <EntityBlock config={brokersConfig} label="Home Loans (Frontline Financial Brokers)" />
        <EntityBlock config={assetConfig} label="Asset & Personal Finance (Frontline Financial: Asset Solutions)" />
      </div>
    </section>
  );
}
