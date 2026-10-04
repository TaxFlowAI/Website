import Link from "next/link";
import Image from "next/image";
import TaxFlowHeader from "@/components/taxflow/TaxFlowHeader";
import TaxFlowAppFooter from "@/components/taxflow/TaxFlowAppFooter";
import RevealInit from "@/components/taxflow/RevealInit";
import TaxFlowWave from "@/components/taxflow/TaxFlowWave";
import TaxFlowWaveLayers from "@/components/taxflow/TaxFlowWaveLayers";
import { container, CtaBand, Breadcrumbs, TAXFLOW_REGISTER_URL } from "@/components/taxflow/TaxFlowShared";
import { LandingHeading, Check, NAVY, DEEP, BAND } from "@/components/taxflow/ServiceLanding";
import { FEATURE_IMAGES, featureBySlug } from "@/components/taxflow/featurePages";

/* One landing page per feature (/taxflow/features/<slug>). Template order:
   breadcrumb, hero, [Stripe band], how it works, detail sections, FAQ with
   FAQPage JSON-LD, related features, final CTA band.
   The supplied images are real app screens with Flo and the headline baked in:
   always shown whole (never cropped or stretched), full width on phones. */

const IMG_SIZES = "(min-width:1024px) 40rem, 92vw";

export function FeatureImage({ image, priority = false, className = "" }) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={1536}
      height={1024}
      sizes={IMG_SIZES}
      priority={priority}
      className={`tc-fp-img ${className}`}
    />
  );
}

/* ---------- Stripe highlight band (invoicing and get-paid pages) ---------- */
const STRIPE_POINTS = [
  "Card payments through Stripe Checkout",
  "Paid straight to your own Stripe account",
  "Invoice marks itself paid, no chasing or reconciling",
  "Set up Stripe inside the app in a few minutes",
  "Bank transfer? Mark it paid in two taps",
];

export function StripeBand({ showImage = true }) {
  return (
    <>
      <TaxFlowWave from={DEEP} to={BAND} />
      <section
        id="stripe"
        style={{ background: `linear-gradient(180deg, ${BAND} 0%, #16334B 55%, ${BAND} 100%)`, scrollMarginTop: "110px" }}
      >
        <div className={`${container} grid items-center gap-10 py-14 md:py-20 ${showImage ? "lg:grid-cols-2" : ""}`}>
          <div className="tc-reveal">
            {/* Stripe's official badge, used unmodified (white version for dark backgrounds). */}
            <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logos/powered-by-stripe-white.svg"
                alt="Powered by Stripe"
                width={150}
                height={34}
                className="h-[38px] w-auto"
              />
            </a>
            <h2 className="tc-display mt-5 text-4xl text-white md:text-5xl">Get paid faster with Stripe</h2>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed" style={{ color: "#D5DEE6" }}>
              Every invoice has a <strong className="text-white">Pay now</strong> button. Your customer taps it
              and pays by card in seconds through Stripe’s secure checkout. The money goes straight into{" "}
              <strong className="text-white">your own Stripe account</strong>, never through us, and the invoice
              is marked <strong className="text-white">paid automatically</strong>.
            </p>
            <ul className={`tc-lp-feature-points mt-6 ${showImage ? "" : "md:grid-cols-2"}`}>
              {STRIPE_POINTS.map((p) => (
                <li key={p}>
                  <Check />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          {showImage && (
            <div className="tc-reveal">
              <FeatureImage image={FEATURE_IMAGES.markPaid} />
            </div>
          )}
        </div>
      </section>
      <TaxFlowWave from={BAND} to={NAVY} />
    </>
  );
}

function faqSchema(faq) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export default function FeaturePage({ page }) {
  const imageRows = page.sections.filter((s) => s.image);
  const textCards = page.sections.filter((s) => !s.image);
  const related = page.related.map(featureBySlug).filter(Boolean);

  return (
    <div className="tc-page min-h-screen">
      <RevealInit />
      <TaxFlowHeader />

      {/* ============ HERO ============ */}
      <section className="tc-hero-flo relative overflow-hidden">
        <Breadcrumbs
          items={[
            { name: "Features", href: "/taxflow/features" },
            { name: page.name, href: `/taxflow/features/${page.slug}` },
          ]}
        />
        <div className={`${container} grid items-center gap-10 pb-14 pt-8 md:pb-20 md:pt-12 lg:grid-cols-12 lg:gap-10`}>
          <div className="lg:col-span-5">
            <h1 className="tc-display text-[2.4rem] text-white md:text-5xl lg:text-[3.3rem]">{page.h1}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: "#B7C4CF" }}>
              {page.intro}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={TAXFLOW_REGISTER_URL} className="tc-btn-primary rounded-lg px-7 py-3.5 text-[15px] font-bold">
                Get started
              </a>
              <Link href={`/taxflow/features#${page.anchor}`} className="tc-btn-ghost rounded-lg px-7 py-3.5 text-[15px] font-semibold">
                See all features
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7">
            {page.hero ? <FeatureImage image={page.hero} priority /> : page.mock}
          </div>
        </div>
      </section>

      {/* ============ STRIPE ============ */}
      {page.stripe ? (
        <>
          <TaxFlowWaveLayers from={NAVY} to={DEEP} />
          <StripeBand showImage={page.stripe.image} />
        </>
      ) : (
        <TaxFlowWaveLayers from={NAVY} to={NAVY} />
      )}

      {/* ============ HOW IT WORKS ============ */}
      <section id="how-it-works" style={{ background: NAVY, scrollMarginTop: "110px" }}>
        <div className={`${container} py-12 md:py-16`}>
          <LandingHeading eyebrow="How it works" title={page.stepsTitle || "Three steps."} />
          <ol className={`tc-lp-beats tc-reveal mt-10 ${page.steps.length > 3 ? "is-many" : ""}`}>
            {page.steps.map(([title, body], i) => (
              <li key={title} className="tc-lp-beat">
                <span className="tc-display tc-hero-accent text-5xl">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-[19px] font-bold text-white">{title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed" style={{ color: "#B7C4CF" }}>{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ DETAIL ============ */}
      <TaxFlowWave from={NAVY} to={DEEP} />
      <section id="detail" style={{ background: DEEP, scrollMarginTop: "110px" }}>
        <div className={`${container} py-12 md:py-20`}>
          <LandingHeading eyebrow="In detail" title="What you get." />

          {imageRows.map((s, i) => (
            <article key={s.title} className={`tc-fp-row tc-reveal ${i % 2 ? "is-flipped" : ""}`}>
              <div className="tc-fp-row-media">
                <FeatureImage image={s.image} />
                {s.image2 && <FeatureImage image={s.image2} className="mt-4" />}
              </div>
              <div className="tc-fp-row-text">
                <h3 className="tc-display text-[1.7rem] text-white md:text-[2rem]">{s.title}</h3>
                <p className="mt-4 max-w-lg text-[15.5px] leading-relaxed" style={{ color: "#94A3B8" }}>{s.body}</p>
                {s.more && (
                  <Link href={`/taxflow/features/${s.more}`} className="tc-link mt-5 inline-block text-[14.5px] font-semibold">
                    Learn more →
                  </Link>
                )}
              </div>
            </article>
          ))}

          {textCards.length > 0 && (
            <div className={`tc-reveal mt-10 grid gap-4 ${textCards.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
              {textCards.map((s) => (
                <div key={s.title} className="tc-bento">
                  <h3 className="tc-bento-title">{s.title}</h3>
                  <p className="tc-bento-body">{s.body}</p>
                  {s.link && (
                    <Link href={s.link[0]} className="tc-link mt-4 inline-block text-[13.5px] font-semibold">
                      {s.link[1]} →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}

          {page.also && (
            <div className="tc-reveal tc-bento tc-bento-accent mt-10">
              <h3 className="tc-bento-title">Also included</h3>
              <ul className="tc-lp-feature-points md:grid-cols-2">
                {page.also.map((a) => (
                  <li key={a}>
                    <Check />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <TaxFlowWave from={DEEP} to={NAVY} />
      <section id="faq" style={{ background: NAVY, scrollMarginTop: "110px" }}>
        <div className={`${container} py-12 md:py-16`}>
          <LandingHeading eyebrow="Questions" title="Good to know." />
          <div className="tc-reveal mt-8 max-w-3xl space-y-3">
            {page.faq.map((f) => (
              <details key={f.q} className="tc-faq">
                <summary>{f.q}</summary>
                <div>
                  {f.a}
                  {f.link && (
                    <>
                      {" "}
                      <Link href={f.link[0]} className="tc-link">{f.link[1]}</Link>
                    </>
                  )}
                </div>
              </details>
            ))}
          </div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(page.faq)) }} />
        </div>
      </section>

      {/* ============ RELATED ============ */}
      <section id="related" className="border-t" style={{ background: NAVY, borderColor: "rgba(255,255,255,0.08)" }}>
        <div className={`${container} py-12 md:py-16`}>
          <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>Related features</p>
          <div className="tc-reveal mt-6 grid gap-4 md:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/taxflow/features/${r.slug}`} className="tc-bento block">
                <h3 className="tc-bento-title">{r.name}</h3>
                <p className="tc-bento-body">{r.card}</p>
                <span className="tc-mono mt-4 inline-block text-[11px] tracking-[0.14em]" style={{ color: "#00FCB8" }}>
                  LEARN MORE →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Your tax and your business, under control." />
      <TaxFlowAppFooter />
    </div>
  );
}
