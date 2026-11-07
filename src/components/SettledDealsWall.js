"use client";

import { useState } from "react";
import { SETTLED_DEALS, SETTLED_DEALS_DISCLAIMER } from "@/data/settled-deals";

/* Every approved "Just settled" post at once, in two rows drifting in opposite
   directions, so the home page shows the volume rather than a sample. Each row is
   drawn twice for a seamless loop; the second copy is hidden from screen readers.
   Moving content needs a way to stop it, hence the pause button. With reduced
   motion the rows stand still and scroll sideways instead. Figures in STATS come
   from claims already on the site (/about, the home page): keep them in step. */

const ROWS = [
  ["01-prime-mover", "06-hilux-renting", "05-personal-loan-new-job", "12-mazda-part-time", "03-hino-truck", "09-hilux-not-a-homeowner", "08-debt-consolidation-credit-cards", "15-caravan"],
  ["02-ranger-raptor", "11-two-cars-low-doc", "14-debt-consolidation-personal-loans", "07-ranger-new-trust", "10-isuzu-two-directors", "13-company-car-12-months", "04-pajero"],
];

const STATS = [
  ["500+", "clients helped"],
  ["$25M+", "in car, commercial and fleet loans settled"],
  ["100+", "five-star Google reviews"],
];

/* Seconds per post, so both rows drift at the same speed */
const SECONDS_PER_POST = 6;

function Row({ ids, reverse }) {
  const copy = (hidden) =>
    ids.map((id) => (
      <li key={`${hidden ? "b" : "a"}-${id}`} className={`w-52 shrink-0 pr-4 sm:w-60 md:pr-5 ${hidden ? "deals-copy" : ""}`} aria-hidden={hidden || undefined}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/images/settled/${id}.webp`}
          alt={hidden ? "" : `Just settled. ${SETTLED_DEALS[id]}`}
          width={720}
          height={900}
          loading="lazy"
          className="h-auto w-full rounded-2xl shadow-[0_20px_40px_-22px_rgba(10,22,40,0.7)]"
        />
      </li>
    ));
  return (
    <div className="deals-row">
      <ul
        className={`deals-track flex w-max ${reverse ? "deals-track-reverse" : ""}`}
        style={{ "--deals-duration": `${ids.length * SECONDS_PER_POST}s` }}
      >
        {copy(false)}
        {copy(true)}
      </ul>
    </div>
  );
}

export default function SettledDealsWall({ heading, intro, ctaHref, ctaLabel }) {
  const [paused, setPaused] = useState(false);

  return (
    <section id="just-settled" className="section-dot-grid relative scroll-mt-24 overflow-hidden py-14 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12 lg:px-8">
        <div>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-[#1C5472] md:text-4xl lg:text-5xl">{heading}</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#1C5472]/85">{intro}</p>
        </div>
        <dl className="grid grid-cols-3 gap-4 sm:gap-8">
          {STATS.map(([figure, label]) => (
            <div key={label} className="min-w-0">
              <dt className="text-3xl font-bold leading-none tracking-tight text-[#1C5472] md:text-4xl">{figure}</dt>
              <dd className="mt-1.5 max-w-[9rem] text-sm leading-snug text-[#1C5472]/85">{label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="deals-wall mt-10 space-y-4 md:space-y-5" data-paused={paused || undefined}>
        {ROWS.map((ids, i) => (
          <Row key={ids[0]} ids={ids} reverse={i % 2 === 1} />
        ))}
      </div>

      <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between md:px-6 lg:px-8">
        {ctaHref && (
          <a
            href={ctaHref}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#00FCB8] px-6 py-3 font-bold text-[#1C5472] transition-all duration-200 hover:scale-105 hover:opacity-90 sm:w-auto"
          >
            {ctaLabel}
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        )}
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="deals-pause inline-flex items-center justify-center gap-2 self-center rounded-full border border-[#1C5472]/30 px-4 py-2 text-sm font-bold text-[#1C5472] transition-colors hover:bg-[#1C5472]/5 sm:self-auto"
        >
          {paused ? (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M8 5v14l11-7z" /></svg>
          ) : (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M7 5h3v14H7zM14 5h3v14h-3z" /></svg>
          )}
          {paused ? "Play" : "Pause"}
        </button>
      </div>
      <p className="mx-auto mt-5 max-w-7xl px-4 text-xs leading-relaxed text-[#1C5472]/75 md:px-6 lg:px-8">{SETTLED_DEALS_DISCLAIMER}</p>
    </section>
  );
}
