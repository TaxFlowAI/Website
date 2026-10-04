import Link from "next/link";

/* The two credit-representative disclosures. Both must appear, word for word,
   wherever loans are mentioned: home-type loans are handled by one entity and
   car, equipment, business and personal loans by another. Each carries its own
   credit guide and privacy consent links. */
export const CREDIT_BROKING =
  "Frontline Financial Pty Ltd is an authorised credit representative (CRN: 575968) of Australian Credit Licence No. 389087, authorised to engage in credit activities.";
export const CREDIT_ASSET =
  "Martyn Financial Pty Ltd t/a Frontline Financial: Asset Solutions is an authorised credit representative (CRN: 563350) of Australian Credit Licence No. 511803, authorised to engage in credit activities.";

export default function CreditDisclosures({ className = "", light = false }) {
  const text = light ? "text-[13px] leading-relaxed text-[#1C5472]/80" : "tc-lp-legal";
  const link = light ? "font-semibold text-[#1C5472] underline decoration-[#39B2B2] underline-offset-2" : "tc-link";
  const scope = light ? "font-bold text-[#1C5472]" : "font-semibold text-white/90";
  return (
    <div className={className}>
      <p className={text}>
        <span className={scope}>
          Home loans, refinance, investment, construction, SMSF, commercial and debt consolidation:
        </span>{" "}
        {CREDIT_BROKING}{" "}
        <Link href="/credit-guide" className={link}>Credit guide</Link> ·{" "}
        <Link href="/privacy-consent" className={link}>Privacy consent</Link>
      </p>
      <p className={`${text} ${light ? "mt-3" : ""}`}>
        <span className={scope}>Car, ute/van/truck, fleet, equipment, business and personal loans:</span>{" "}
        {CREDIT_ASSET}{" "}
        <Link href="/credit-guide-asset-solutions" className={link}>Credit guide</Link> ·{" "}
        <Link href="/privacy-consent-asset-solutions" className={link}>Privacy consent</Link>
      </p>
    </div>
  );
}
