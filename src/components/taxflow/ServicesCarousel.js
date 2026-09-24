"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const ICON_PROPS = {
  className: "h-9 w-9",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

const SERVICES = [
  {
    id: "platform",
    eyebrow: "The software",
    title: "TaxFlowAI platform",
    desc: "Your tax control centre. Flo sorts receipts into ATO categories, your documents live in a private vault, and every deadline for every entity is tracked in one dashboard.",
    points: [
      "AI receipt scanner with reasoning you can read",
      "Document vault, vehicle logbook and WFH tracker",
      "Live status on every lodgement",
    ],
    href: "/taxflow/features",
    cta: "Explore the platform",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
      </svg>
    ),
  },
  {
    id: "tax",
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
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
        <path d="M14 3v5h5M9 14l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "corporate",
    eyebrow: "Registered ASIC agent",
    title: "Corporate secretarial services",
    desc: "Annual reviews, officeholder and share changes, registered office updates, name changes and deregistrations — lodged with ASIC and filed in your vault.",
    points: [
      "ASIC deadlines tracked alongside your tax",
      "Documents prepared for electronic signature",
      "One team for the company and the tax",
    ],
    href: "/taxflow/corporate-secretarial",
    cta: "See ASIC services",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M15 9h.01M9 13h.01M15 13h.01M9 17h.01M15 17h.01" />
      </svg>
    ),
  },
  {
    id: "frontline",
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
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M3 11l9-8 9 8M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10" />
      </svg>
    ),
  },
];

/* Scroll-snap carousel of the four service cards. Three cards visible on
   desktop, one on mobile; arrows and dots move between cards. */
export default function ServicesCarousel() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [atEnd, setAtEnd] = useState(false);

  const scrollToCard = (i) => {
    const track = trackRef.current;
    const card = track?.children[i];
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const onScroll = () => {
      const x = track.scrollLeft;
      let best = 0;
      let bestDist = Infinity;
      Array.from(track.children).forEach((c, i) => {
        const d = Math.abs(c.offsetLeft - track.offsetLeft - x);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
      setAtEnd(x + track.clientWidth >= track.scrollWidth - 4);
    };
    onScroll();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const last = SERVICES.length - 1;

  return (
    <div className="tc-reveal">
      <div
        ref={trackRef}
        className="tc-scroll-hide -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-2 md:-mx-8 md:px-8"
        aria-label="Our services"
      >
        {SERVICES.map((s) => (
          <Link
            key={s.id}
            href={s.href}
            className="tc-svc-card flex w-[86%] shrink-0 snap-start flex-col overflow-hidden sm:w-[62%] lg:w-[calc((100%-3rem)/3)]"
          >
            <div className="tc-svc-band flex h-36 items-center justify-center">
              <span className="tc-svc-icon flex h-16 w-16 items-center justify-center rounded-2xl">{s.icon}</span>
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
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2">
          {SERVICES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollToCard(i)}
              className={`h-2 rounded-full transition-all ${i === active ? "w-8 bg-[#00FCB8]" : "w-2 bg-white/30"}`}
              aria-label={`Go to ${s.title}`}
              aria-current={i === active ? "true" : undefined}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollToCard(Math.max(0, active - 1))}
            disabled={active === 0}
            className="tc-btn-ghost rounded-full p-2.5 disabled:opacity-30"
            aria-label="Previous service"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollToCard(Math.min(last, active + 1))}
            disabled={atEnd}
            className="tc-btn-ghost rounded-full p-2.5 disabled:opacity-30"
            aria-label="Next service"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
