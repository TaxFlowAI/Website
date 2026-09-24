import TaxFlowHeader from "@/components/taxflow/TaxFlowHeader";
import TaxFlowAppFooter from "@/components/taxflow/TaxFlowAppFooter";
import RevealInit from "@/components/taxflow/RevealInit";
import { container, CtaBand, Breadcrumbs } from "@/components/taxflow/TaxFlowShared";

/* Shared shell for the TaxFlowAI information pages (About, Tax preparation,
   Corporate secretarial, Data security): header, breadcrumb, hero, sections,
   closing CTA and the unchanged footer. */
export default function InfoPage({ crumbName, crumbHref, eyebrow, headline, intro, panel, children }) {
  const paras = Array.isArray(intro) ? intro : [intro];
  return (
    <div className="tc-page min-h-screen">
      <RevealInit />
      <TaxFlowHeader />
      <Breadcrumbs items={[{ name: crumbName, href: crumbHref }]} />

      <section className={`${container} grid gap-12 pb-14 pt-8 md:pt-12 lg:grid-cols-12`}>
        <div className={panel ? "lg:col-span-6" : "lg:col-span-8"}>
          <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>{eyebrow}</p>
          <h1 className="tc-display mt-4 text-4xl text-white md:text-5xl">{headline}</h1>
          <div className="mt-5 max-w-xl space-y-3 text-[15px] leading-relaxed" style={{ color: "#94A3B8" }}>
            {paras.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </div>
        {panel && <div className="lg:col-span-6 lg:pt-4">{panel}</div>}
      </section>

      {children}

      <CtaBand />
      <TaxFlowAppFooter />
    </div>
  );
}

/* Alternating section band. `alt` uses the deeper navy. */
export function InfoSection({ id, alt = false, children }) {
  return (
    <section
      id={id}
      className="border-t"
      style={{
        background: alt ? "#060D1A" : "#0A1628",
        borderColor: "rgba(255,255,255,0.08)",
        scrollMarginTop: "110px",
      }}
    >
      <div className={`${container} py-14 md:py-20`}>{children}</div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, lead, accent = "#39B2B2" }) {
  return (
    <div className="tc-reveal max-w-2xl">
      {eyebrow && (
        <p className="tc-eyebrow" style={{ color: accent }}>
          {eyebrow}
        </p>
      )}
      <h2 className="tc-display mt-4 text-3xl text-white md:text-4xl">{title}</h2>
      {lead && (
        <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "#94A3B8" }}>
          {lead}
        </p>
      )}
    </div>
  );
}

/* Grid of surface cards: { label?, title, body }. */
export function InfoGrid({ items, cols = 3 }) {
  const colClass =
    cols === 2
      ? "md:grid-cols-2"
      : cols === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "md:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`tc-reveal mt-10 grid gap-4 ${colClass}`}>
      {items.map((it, i) => (
        <div key={it.title} className="tc-int-card p-5">
          <p className="tc-mono text-[11px] font-medium tracking-[0.18em]" style={{ color: "#00FCB8" }}>
            {it.label ?? String(i + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-2 text-[16px] font-bold text-white">{it.title}</h3>
          <p className="mt-2 text-[13.5px] leading-relaxed" style={{ color: "#94A3B8" }}>
            {it.body}
          </p>
        </div>
      ))}
    </div>
  );
}

/* Numbered steps on the glowing spine used across the site. */
export function StepList({ steps }) {
  return (
    <div className="tc-observe relative mt-12 max-w-2xl">
      <div className="tc-spine tc-grad-line-v absolute bottom-3 left-[5px] top-3 w-[2px]" aria-hidden />
      <ol className="space-y-8">
        {steps.map((s, i) => (
          <li key={s.title} className="tc-reveal relative grid grid-cols-[13px_1fr] gap-x-6">
            <span className="tc-node mt-1.5" aria-hidden />
            <div>
              <p className="tc-mono text-[11px] font-medium tracking-[0.18em]" style={{ color: "#00FCB8" }}>
                STEP {i + 1}
              </p>
              <h3 className="mt-1.5 text-[18px] font-bold text-white">{s.title}</h3>
              <p className="mt-1.5 max-w-lg text-[14.5px] leading-relaxed" style={{ color: "#94A3B8" }}>
                {s.desc}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
