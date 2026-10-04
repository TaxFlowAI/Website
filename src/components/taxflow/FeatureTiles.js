import Link from "next/link";
import { ALL_FEATURES } from "@/components/taxflow/featurePages";

/* The /taxflow/features index: one tile per feature, each linking to its single
   landing page. Tile id = the page slug, so "See all features" on a landing
   page can return to the right tile. Layout lives in the-current.css (.tc-ft). */

const ICONS = {
  invoice: (
    <>
      <path d="M6 3h9l3 3v15H6z" />
      <path d="M15 3v3h3" />
      <path d="M9 11h6M9 15h4" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 3h12v18l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5L6 21z" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </>
  ),
  deductions: (
    <>
      <path d="M10 6h10M10 12h10M10 18h10" />
      <path d="M4 6l1.2 1.2L7.5 5M4 12l1.2 1.2L7.5 11M4 18l1.2 1.2L7.5 17" />
    </>
  ),
  accounts: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="2" />
      <rect x="13" y="4" width="7" height="7" rx="2" />
      <rect x="4" y="13" width="7" height="7" rx="2" />
      <rect x="13" y="13" width="7" height="7" rx="2" />
    </>
  ),
  tracker: (
    <>
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
      <path d="M7 12h3M14 12h3" />
    </>
  ),
  folder: (
    <>
      <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <path d="M12 16v-5M9.8 13.2L12 11l2.2 2.2" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5h16v11H9l-5 4z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </>
  ),
  company: (
    <>
      <path d="M4 21V5l8-2v18M12 9h8v12M3 21h18" />
      <path d="M7 8h2M7 12h2M7 16h2M15 13h2M15 17h2" />
    </>
  ),
  home: (
    <>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-6h4v6" />
    </>
  ),
};

function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {ICONS[name]}
    </svg>
  );
}

function Arrow() {
  return (
    <span className="tc-ft-go" aria-hidden>
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </span>
  );
}

/* tile width on the bento: hero spans 4 of 6 columns and two rows */
const SIZE = {
  invoicing: "is-hero",
  "receipt-scanner": "is-w2",
  deductions: "is-w2",
  accounts: "is-w2",
  "job-tracker": "is-w2",
  "client-uploads": "is-w2",
  flo: "is-w3",
  "company-registration": "is-w3 is-sm-full",
  loans: "is-wide is-frontline",
};

/* a decorative slice of an invoice, for the hero tile */
function InvoiceGlimpse() {
  return (
    <span className="tc-ft-inv" aria-hidden>
      <span className="tc-ft-inv-top">
        <span className="tc-mono">INV-0042</span>
        <span className="tc-ft-chip tc-mono">PAID</span>
      </span>
      <span className="tc-ft-inv-name">Harbour Café</span>
      <span className="tc-ft-inv-amt">$1,210.00</span>
      <span className="tc-ft-pay">Pay now</span>
      <span className="tc-ft-steps tc-mono">
        <i>DRAFT</i>
        <i>SENT</i>
        <i>VIEWED</i>
        <i className="is-on">PAID</i>
      </span>
    </span>
  );
}

function FrontlineWave() {
  return (
    <svg className="tc-ft-wave" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden>
      <path d="M0 62C160 22 340 18 520 54C700 90 880 112 1060 78C1240 44 1340 34 1440 52V140H0Z" fill="#00FCB8" fillOpacity="0.18" />
      <path d="M0 92C220 128 470 44 720 70C970 96 1200 132 1440 82V140H0Z" fill="#39B2B2" fillOpacity="0.45" />
      <path d="M0 108C240 64 480 138 720 104C960 70 1200 74 1440 112V140H0Z" fill="#0E3A52" fillOpacity="0.7" />
    </svg>
  );
}

export default function FeatureTiles({ className = "" }) {
  return (
    <div className={`tc-ft-grid ${className}`}>
      {ALL_FEATURES.map((f, i) => {
        const size = SIZE[f.slug] || "is-w2";
        const hero = size.includes("is-hero");
        const frontline = size.includes("is-frontline");
        return (
          <Link key={f.slug} id={f.slug} href={`/taxflow/features/${f.slug}`} className={`tc-ft ${size}`} style={{ scrollMarginTop: "120px" }}>
            {frontline && <FrontlineWave />}
            <span className="tc-ft-num" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
            <span className="tc-ft-icon">
              <Icon name={f.icon} />
            </span>
            <span className="tc-ft-body">
              <span className="tc-ft-tag tc-mono">{f.tag}</span>
              <h3 className="tc-ft-title">{f.tile}</h3>
              <span className="tc-ft-line">{f.line}</span>
              {hero && (
                /* Stripe's official badge, unmodified */
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src="/images/logos/powered-by-stripe-white.svg"
                  alt="Powered by Stripe"
                  width={150}
                  height={34}
                  className="tc-ft-stripe"
                />
              )}
            </span>
            {hero && <InvoiceGlimpse />}
            <Arrow />
          </Link>
        );
      })}
    </div>
  );
}
