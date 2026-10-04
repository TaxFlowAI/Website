import Link from "next/link";
import { Phone } from "@/components/taxflow/AppScreens";
import { ALL_FEATURES } from "@/components/taxflow/featurePages";

/* The /taxflow/features index: one card per feature, each showing the real app
   screen in a phone (AppScreens.js), linking to that feature's single landing
   page. The card shows the top of the phone; `shift` scrolls the screen to the
   part that matters. Phones: a swipeable row. 640px and up: a grid.
   Styles: .tc-sh in the-current.css. Card id = page slug, so "See all features"
   on a landing page lands on its card. */

const SCREENS = {
  invoicing: ["invoices-list", "invoice-pay-now"],
  "receipt-scanner": ["receipt-question"],
  deductions: ["deductions-tiles"],
  accounts: ["account-overview"],
  "job-tracker": ["job-tracker"],
  "client-uploads": [{ id: "upload-choose-account", shift: "-50%" }],
  flo: ["flo-help"],
  "company-registration": ["company-form"],
  loans: ["loan-choose", "loan-sent"],
};

/* card width on the grid */
const SIZE = {
  invoicing: "is-w2 is-split",
  "company-registration": "is-sm-full",
  loans: "is-wide is-split is-frontline",
};

function Arrow() {
  return (
    <span className="tc-sh-go" aria-hidden>
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </span>
  );
}

function FrontlineWave() {
  return (
    <svg className="tc-sh-wave" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden>
      <path d="M0 62C160 22 340 18 520 54C700 90 880 112 1060 78C1240 44 1340 34 1440 52V140H0Z" fill="#00FCB8" fillOpacity="0.55" />
      <path d="M0 92C220 128 470 44 720 70C970 96 1200 132 1440 82V140H0Z" fill="#39B2B2" />
      <path d="M0 108C240 64 480 138 720 104C960 70 1200 74 1440 112V140H0Z" fill="#1C5472" />
    </svg>
  );
}

export default function FeatureTiles({ className = "" }) {
  return (
    <>
      <div className={`tc-sh-rail ${className}`}>
        {ALL_FEATURES.map((f) => {
          const screens = SCREENS[f.slug] || [];
          const size = SIZE[f.slug] || "";
          return (
            <Link
              key={f.slug}
              id={f.slug}
              href={`/taxflow/features/${f.slug}`}
              className={`tc-sh ${size}`}
              style={{ scrollMarginTop: "120px" }}
            >
              <span className="tc-sh-text">
                <span className="tc-sh-tag tc-mono">{f.tag}</span>
                <h3 className="tc-sh-title">{f.tile}</h3>
                <span className="tc-sh-line">{f.line}</span>
                {f.slug === "invoicing" && (
                  /* Stripe's official badge, unmodified */
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src="/images/logos/powered-by-stripe-white.svg"
                    alt="Powered by Stripe"
                    width={150}
                    height={34}
                    className="tc-sh-stripe"
                  />
                )}
              </span>
              <span className="tc-sh-stage" aria-hidden>
                {screens.map((shot, i) => {
                  const { id, shift } = typeof shot === "string" ? { id: shot } : shot;
                  return <Phone key={id} id={id} shift={shift} back={i > 0} decorative sizes="220px" />;
                })}
              </span>
              {size.includes("is-frontline") && <FrontlineWave />}
              <Arrow />
            </Link>
          );
        })}
      </div>
      <p className="tc-sh-hint tc-mono" aria-hidden>
        SWIPE FOR ALL {ALL_FEATURES.length} FEATURES →
      </p>
    </>
  );
}
