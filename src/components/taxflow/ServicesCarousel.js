"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SHOW_TAX_SERVICES } from "@/data/taxflow-flags";

const SERVICES = [
  {
    id: "platform",
    image: "/images/taxflow/service-platform.webp",
    imageAlt: "Flo scanning a pile of receipts and filing them into glowing D1, D2, D5 and D9 folders",
    eyebrow: "The software",
    title: "TaxFlowAI platform",
    desc: "Your tax control centre. Flo sorts receipts into ATO categories, your documents sit in secure uploads folders, and every job for every entity is tracked in one dashboard.",
    points: [
      "AI receipt scanner with reasoning you can read",
      "Client uploads, vehicle logbook and WFH tracker",
      "Live status on every lodgement",
    ],
    href: "/taxflow/features",
    cta: "Explore the platform",
  },
  {
    id: "tax",
    image: "/images/taxflow/service-tax.webp",
    imageAlt: "Flo as an accountant holding a ticked tax return, with the Tax Practitioners Board registered badge and agent number 26313222",
    eyebrow: "Registered Tax Agents",
    title: "Tax preparation services",
    desc: "Individual, sole trader, company, trust and partnership returns, activity statements and CGT — prepared and lodged by a Registered Tax Agent you engage through the platform.",
    points: [
      "Quote first — you approve the price before any work starts",
      "Plain-English advice on what you can claim",
      "Prior-year and overdue returns welcome",
    ],
    href: "/taxflow/tax-preparation",
    cta: "See tax services",
  },
  {
    id: "corporate",
    image: "/images/taxflow/service-asic.webp",
    imageAlt: "Flo stamping a company document as lodged, with a registered ASIC agent plate showing number 51843",
    eyebrow: "Registered ASIC agent",
    title: "Corporate secretarial services",
    desc: "Annual reviews, officeholder and share changes, registered office updates, name changes and deregistrations — lodged with ASIC and filed in your company folder.",
    points: [
      "ASIC deadlines tracked alongside your tax",
      "Documents prepared for electronic signature",
      SHOW_TAX_SERVICES ? "One team for the company and the tax" : "New companies registered through the app",
    ],
    href: "/taxflow/corporate-secretarial",
    cta: "See ASIC services",
  },
  {
    id: "frontline",
    image: "/images/taxflow/service-frontline.webp",
    imageAlt: "Frontline Financial logo beside home loan, car finance and equipment finance icons, with Flo waving",
    eyebrow: "Our group",
    title: "Frontline Financial",
    desc: "Home loans, business lending, and car, equipment and fleet finance from the Parramatta-based group that builds and operates TaxFlowAI.",
    points: [
      "Mortgage brokers searching 30+ lenders",
      "Car, equipment and fleet finance",
      "Finance made simple. For every Australian.",
    ],
    href: "/",
    cta: "Visit Frontline Financial",
  },
  /* the Tax preparation card hides while tax services are switched off
     (src/data/taxflow-flags.js) */
].filter((s) => SHOW_TAX_SERVICES || s.id !== "tax");


const N = SERVICES.length;

/* The track holds three copies of the cards: [clones] [real] [clones].
   The visible window starts on the real set. Whenever a scroll settles on a
   clone, the track jumps (with no animation) to the matching real card, so
   the carousel loops endlessly in both directions for swipes and arrows. */
const TRACK = [
  ...SERVICES.map((s) => ({ ...s, key: `pre-${s.id}`, clone: true })),
  ...SERVICES.map((s) => ({ ...s, key: s.id, clone: false })),
  ...SERVICES.map((s) => ({ ...s, key: `post-${s.id}`, clone: true })),
];

function cardLeft(track, i) {
  return track.children[i].offsetLeft - track.offsetLeft;
}

function nearestIndex(track) {
  const x = track.scrollLeft;
  let best = 0;
  let bestDist = Infinity;
  for (let i = 0; i < track.children.length; i += 1) {
    const d = Math.abs(cardLeft(track, i) - x);
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  }
  return best;
}

function scrollToCard(track, i, behavior) {
  track.scrollTo({ left: cardLeft(track, i), behavior });
}

/* map any track index back into the real set */
function realIndex(i) {
  if (i < N) return i + N;
  if (i >= 2 * N) return i - N;
  return i;
}

function ServiceCard({ s }) {
  return (
    <Link
      href={s.href}
      className="tc-svc-card flex w-[86%] shrink-0 snap-start flex-col overflow-hidden sm:w-[62%] lg:w-[calc((100%-3rem)/3)]"
      aria-hidden={s.clone || undefined}
      tabIndex={s.clone ? -1 : undefined}
    >
      <div className="tc-svc-band relative aspect-video w-full overflow-hidden">
        <Image
          src={s.image}
          alt={s.clone ? "" : s.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 62vw, 86vw"
          className="tc-svc-img object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>{s.eyebrow}</p>
        <h3 className="mt-2 text-[20px] font-bold text-white">{s.title}</h3>
        <p className="mt-2.5 text-[14px] leading-relaxed" style={{ color: "#94A3B8" }}>
          {s.desc}
        </p>
        <ul className="mt-4 space-y-2 text-[13.5px]">
          {s.points.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-white/85">
              <svg className="mt-1.5 h-3 w-3 shrink-0" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M1.5 6.5l3 3 6-7" stroke="#00FCB8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {p}
            </li>
          ))}
        </ul>
        <span className="tc-mono mt-auto pt-6 text-[11.5px] font-medium tracking-[0.12em]" style={{ color: "#00FCB8" }}>
          {s.cta.toUpperCase()} →
        </span>
      </div>
    </Link>
  );
}

export default function ServicesCarousel() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0); // 0..N-1, the real card in view
  const posRef = useRef(N); // index into TRACK of the card at the left edge

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const jump = (i) => {
      scrollToCard(track, i, "instant");
      posRef.current = i;
    };

    /* start on the first real card, without animating */
    jump(N);

    let settle = 0;

    const onScroll = () => {
      setActive(nearestIndex(track) % N);
      /* once the scroll settles on a clone, hop to its real twin */
      clearTimeout(settle);
      settle = setTimeout(() => {
        const i = nearestIndex(track);
        const r = realIndex(i);
        if (r !== i) jump(r);
        else posRef.current = i;
      }, 140);
    };

    const onResize = () => jump(posRef.current);

    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      clearTimeout(settle);
    };
  }, []);

  const glideTo = (i) => {
    const track = trackRef.current;
    if (!track) return;
    posRef.current = i;
    scrollToCard(track, i, "smooth");
  };

  const step = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    /* if a settle hasn't run yet, re-anchor to the real set first */
    const i = nearestIndex(track);
    const r = realIndex(i);
    if (r !== i) {
      scrollToCard(track, r, "instant");
      posRef.current = r;
    }
    glideTo(r + dir);
  };

  return (
    <div className="tc-reveal">
      <div
        ref={trackRef}
        className="tc-scroll-hide -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-2 md:-mx-8 md:px-8"
        aria-label="Our services"
      >
        {TRACK.map((s) => (
          <ServiceCard key={s.key} s={s} />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2">
          {SERVICES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => glideTo(N + i)}
              className={`h-2 rounded-full transition-all ${i === active ? "w-8 bg-[#00FCB8]" : "w-2 bg-white/30"}`}
              aria-label={`Go to ${s.title}`}
              aria-current={i === active ? "true" : undefined}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => step(-1)} className="tc-btn-ghost rounded-full p-2.5" aria-label="Previous service">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button type="button" onClick={() => step(1)} className="tc-btn-ghost rounded-full p-2.5" aria-label="Next service">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
