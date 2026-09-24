"use client";

import { useEffect, useRef, useState } from "react";
import { GOOGLE_REVIEWS } from "@/data/taxflow-proof";

const STAR_PATH =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

function Star({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden>
      <path d={STAR_PATH} />
    </svg>
  );
}

/* Google reviews — REAL data only, gated on taxflow-proof.js. Renders nothing
   until rating, count, profileUrl and at least one verbatim review exist.
   Layout mirrors the Frontline Financial home page carousel on the dark
   TaxFlowAI palette: count-up stat card + rotating three-up carousel.
   `edge` is the exact colour at the top and bottom of the section so the
   page's wave dividers can match it. */
export default function GoogleReviewsCarousel({ edge = "#0E2238" }) {
  const { business, rating, count, profileUrl, reviews } = GOOGLE_REVIEWS;
  const published = Boolean(rating && count && profileUrl && reviews.length > 0);
  const total = reviews.length;
  const target = parseInt(String(count).replace(/,/g, ""), 10) || 0;
  const suffix = String(count).replace(/^[\d,]+/, "");

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [shown, setShown] = useState(0);
  const countRef = useRef(null);

  /* count-up once the stat card scrolls into view */
  useEffect(() => {
    if (!published || !countRef.current) return undefined;
    let raf = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const run = () => {
      if (reduce) {
        setShown(target);
        return;
      }
      const t0 = performance.now();
      const dur = 1400;
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setShown(Math.round(eased * target));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(countRef.current);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [published, target]);

  /* auto-advance, paused on hover / focus */
  useEffect(() => {
    if (!published || paused || total < 2) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 6000);
    return () => clearInterval(id);
  }, [published, paused, total]);

  if (!published) return null;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);
  const track = total >= 3 ? [...reviews, reviews[0], reviews[1]] : reviews;

  return (
    <section
      id="reviews"
      className="relative overflow-hidden px-5 py-16 md:px-8 md:py-24"
      style={{ background: `linear-gradient(180deg, ${edge} 0%, #16334B 50%, ${edge} 100%)` }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* glow + giant star watermark, as on the Frontline home page */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#00FCB8] opacity-[0.10] blur-[110px]" aria-hidden />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-[#39B2B2] opacity-[0.16] blur-[110px]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
        <Star className="h-[130%] w-auto text-white opacity-[0.035]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div className="tc-reveal">
            <p className="tc-eyebrow" style={{ color: "#00FCB8" }}>
              Rated five stars. Every. Single. Review.
            </p>
            <h2 className="tc-display mt-4 border-l-4 border-[#00FCB8] pl-4 text-4xl text-white md:text-5xl">
              Trusted by Australians
            </h2>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed md:text-lg" style={{ color: "#B7C4CF" }}>
              TaxFlowAI is built and run by the team at {business}. Over one hundred
              Australians have taken the time to review them on Google — and every
              single one gave five stars.
            </p>
          </div>

          {/* the big number */}
          <div
            ref={countRef}
            className="tc-reveal rounded-3xl border px-10 py-8 text-center shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm"
            style={{ borderColor: "rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.05)" }}
          >
            <div className="flex justify-center gap-1" aria-hidden>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="tc-star h-7 w-7 md:h-8 md:w-8" />
              ))}
            </div>
            <p className="tc-display mt-2 text-6xl text-white md:text-7xl">
              {shown}
              <span style={{ color: "#00FCB8" }}>{suffix}</span>
            </p>
            <p className="tc-mono mt-1 text-[11px] uppercase tracking-[0.2em] text-white/85">
              Five-star Google reviews
            </p>
            <p className="mt-1 text-xs" style={{ color: "#94A3B8" }}>
              {rating.toFixed(1)} average · {business}
            </p>
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-[#0A1628] transition-all duration-200 hover:scale-105"
            >
              <span className="text-lg font-bold text-[#4285F4]" aria-hidden>G</span>
              Read them all on Google
            </a>
          </div>
        </div>

        {/* carousel */}
        <div className="relative mt-10 flex items-center gap-2 md:gap-4">
          <button
            type="button"
            onClick={prev}
            className="shrink-0 rounded-full p-2.5 text-white transition hover:bg-white/20"
            style={{ background: "rgba(255,255,255,0.1)" }}
            aria-label="Previous reviews"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="min-w-0 flex-1 overflow-hidden">
            <div
              className="review-carousel-track flex transition-transform duration-500 ease-out"
              style={{ "--review-index": index }}
            >
              {track.map((r, i) => (
                <div key={`${r.name}-${i}`} className="w-full flex-shrink-0 px-1.5 md:w-1/2 lg:w-1/3">
                  <figure className="tc-review-card flex h-full flex-col p-5 md:p-6">
                    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                      {[1, 2, 3, 4, 5].map((j) => (
                        <Star key={j} className="tc-star h-4 w-4 md:h-5 md:w-5" />
                      ))}
                    </div>
                    <blockquote className="mt-3 flex-1 text-[14px] leading-relaxed text-white/90 md:text-[15px]">
                      &ldquo;{r.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-4 flex items-center gap-2.5">
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                        style={{ background: "rgba(0,252,184,0.15)", color: "#00FCB8" }}
                        aria-hidden
                      >
                        {r.name.charAt(0)}
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-white">{r.name}</span>
                        <span className="tc-mono block text-[10px] uppercase tracking-[0.12em]" style={{ color: "#94A3B8" }}>
                          Google review
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={next}
            className="shrink-0 rounded-full p-2.5 text-white transition hover:bg-white/20"
            style={{ background: "rgba(255,255,255,0.1)" }}
            aria-label="Next reviews"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {reviews.map((r, i) => (
            <button
              key={r.name}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-[#00FCB8]" : "w-2 bg-white/40"}`}
              aria-label={`Go to review ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
