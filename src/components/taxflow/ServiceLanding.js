import Image from "next/image";
import TaxFlowWave from "@/components/taxflow/TaxFlowWave";
import CalendlyButton from "@/components/taxflow/CalendlyButton";
import { container, Breadcrumbs, TAXFLOW_REGISTER_URL } from "@/components/taxflow/TaxFlowShared";

/* Shared blocks for the three service landing pages (platform, tax preparation,
   corporate secretarial). Each page keeps its own story; these are the parts
   that should look identical across them. */

export const NAVY = "#0A1628";
export const DEEP = "#060D1A";
export const BAND = "#0E2238";

export function Check() {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M1.5 6.5l3 3 6-7" stroke="#00FCB8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- hero: copy left, the service scene in a glowing frame right ---------- */
export function ServiceHero({ crumb, eyebrow, title, accent, lead, image, imageAlt, tag, plate, children }) {
  return (
    <section className="tc-hero-flo relative overflow-hidden">
      <Breadcrumbs items={[crumb]} />
      <div className={`${container} grid items-center gap-10 pb-14 pt-8 md:pb-20 md:pt-12 lg:grid-cols-12 lg:gap-12`}>
        <div className="lg:col-span-6">
          <p className="tc-eyebrow" style={{ color: "#00FCB8" }}>{eyebrow}</p>
          <h1 className="tc-display mt-5 text-[2.5rem] text-white md:text-6xl lg:text-[3.9rem]">
            {title} <span className="tc-hero-accent">{accent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: "#B7C4CF" }}>
            {lead}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href={TAXFLOW_REGISTER_URL} className="tc-btn-primary rounded-lg px-7 py-3.5 text-[15px] font-bold">
              Get started free
            </a>
            <CalendlyButton className="tc-btn-ghost rounded-lg px-7 py-3.5 text-[15px] font-semibold">
              Talk to a human
            </CalendlyButton>
          </div>
          {plate && <div className="mt-8">{plate}</div>}
          {children}
        </div>
        <div className="lg:col-span-6">
          <div className="tc-lp-frame">
            <div className="tc-lp-frame-inner">
              {tag && (
                <span className="tc-mono tc-lp-frame-tag">
                  <span className="tc-sec-dot" aria-hidden />
                  {tag}
                </span>
              )}
              <Image
                src={image}
                alt={imageAlt}
                width={1672}
                height={941}
                priority
                sizes="(min-width: 1024px) 36rem, 92vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- credential plate: who is registered, and the number ---------- */
export function CredentialPlate({ label, number, name, sub, href, linkText }) {
  return (
    <div className="tc-lp-plate">
      <span>
        <span className="tc-mono tc-lp-plate-label block">{label}</span>
        <span className="tc-mono tc-lp-plate-num block">{number}</span>
      </span>
      <span>
        <span className="tc-lp-plate-name block">{name}</span>
        {sub && (
          <span className="block text-[12.5px]" style={{ color: "#94A3B8" }}>
            {sub}
          </span>
        )}
        {href && (
          <a href={href} target="_blank" rel="noopener noreferrer" className="tc-link text-[12.5px]">
            {linkText}
          </a>
        )}
      </span>
    </div>
  );
}

/* ---------- section heading ---------- */
export function LandingHeading({ eyebrow, title, lead, accent = "#39B2B2" }) {
  return (
    <div className="tc-reveal max-w-2xl">
      <p className="tc-eyebrow" style={{ color: accent }}>{eyebrow}</p>
      <h2 className="tc-display mt-4 text-4xl text-white md:text-5xl">{title}</h2>
      {lead && (
        <p className="mt-5 text-[15.5px] leading-relaxed" style={{ color: "#94A3B8" }}>
          {lead}
        </p>
      )}
    </div>
  );
}

/* ---------- stat band between two waves ---------- */
export function StatBand({ stats, from = NAVY, to = NAVY }) {
  return (
    <>
      <TaxFlowWave from={from} to={BAND} />
      <section style={{ background: `linear-gradient(180deg, ${BAND} 0%, #16334B 50%, ${BAND} 100%)` }}>
        <div className={`${container} py-12 md:py-16`}>
          <dl
            className={`tc-reveal grid gap-x-8 gap-y-10 sm:grid-cols-2 ${stats.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}
          >
            {stats.map((s) => (
              <div key={s.value}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="tc-display tc-hero-accent block text-5xl md:text-6xl">{s.value}</span>
                  <span className="mt-3 block max-w-[17rem] text-[13.5px] leading-relaxed" style={{ color: "#B7C4CF" }}>
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <TaxFlowWave from={BAND} to={to} />
    </>
  );
}

/* ---------- numbered story on the current (same spine as the security page) ---------- */
export function StoryStations({ stations }) {
  return (
    <div className="tc-story tc-observe mt-6 md:mt-10">
      <div className="tc-story-line tc-spine tc-grad-line-v" aria-hidden />
      {stations.map((s, i) => (
        <article key={s.title} className={`tc-story-row ${i % 2 ? "is-flipped" : ""}`}>
          <div className="tc-story-visual tc-reveal">{s.visual}</div>
          <div className="tc-story-node" aria-hidden>
            <span>{String(i + 1).padStart(2, "0")}</span>
          </div>
          <div className="tc-story-text tc-reveal">
            <p className="tc-mono text-[11px] font-medium tracking-[0.18em]" style={{ color: "#00FCB8" }}>
              <span className="lg:hidden">{String(i + 1).padStart(2, "0")} · </span>
              {s.label.toUpperCase()}
            </p>
            <h3 className="tc-display mt-3 text-[1.9rem] text-white md:text-[2.3rem]">{s.title}</h3>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed" style={{ color: "#94A3B8" }}>
              {s.body}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
