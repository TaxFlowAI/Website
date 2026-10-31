import { SETTLED_DEALS, SETTLED_DEALS_DISCLAIMER } from "@/data/settled-deals";

/* A wall of approved "Just settled" posts. It answers the question that stops most
   people applying: "would they even take my deal?" Swipes sideways on a phone. */
export default function SettledDeals({ ids, heading, intro, tone = "dark", ctaHref, ctaLabel }) {
  const dark = tone === "dark";
  return (
    <section
      id="just-settled"
      className={`relative scroll-mt-24 overflow-hidden px-4 py-14 md:px-6 md:py-20 lg:px-8 ${dark ? "section-dot-grid-dark" : "section-dot-grid"}`}
    >
      <div className="mx-auto max-w-7xl">
        <h2 className={`max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl ${dark ? "text-white" : "text-[#1C5472]"}`}>
          {heading}
        </h2>
        <p className={`mt-4 max-w-2xl text-lg leading-relaxed ${dark ? "text-white/85" : "text-[#1C5472]/85"}`}>{intro}</p>
        <ul className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4">
          {ids.map((id) => (
            <li key={id} className="w-[76%] shrink-0 snap-center sm:w-[46%] md:w-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/settled/${id}.webp`}
                alt={`Just settled. ${SETTLED_DEALS[id]}`}
                width={720}
                height={900}
                loading="lazy"
                className="h-auto w-full rounded-2xl shadow-[0_24px_50px_-24px_rgba(10,22,40,0.7)]"
              />
            </li>
          ))}
        </ul>
        {ctaHref && (
          <a
            href={ctaHref}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#00FCB8] px-6 py-3 font-bold text-[#1C5472] transition-all duration-200 hover:scale-105 hover:opacity-90 sm:w-auto"
          >
            {ctaLabel}
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        )}
        <p className={`mt-5 max-w-3xl text-xs leading-relaxed ${dark ? "text-white/75" : "text-[#1C5472]/75"}`}>{SETTLED_DEALS_DISCLAIMER}</p>
      </div>
    </section>
  );
}
