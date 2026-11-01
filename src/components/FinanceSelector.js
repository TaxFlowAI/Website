"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import OpenStatus from "@/components/OpenStatus";
import { trackMeta } from "@/components/MetaPixel";
import useAdAttribution from "@/components/useAdAttribution";
import { APPLICATION_LIST, TEAM_PHONE } from "@/data/finance-applications";

const ICON_CLASS = "h-6 w-6";

function Icon({ children }) {
  return (
    <svg className={ICON_CLASS} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
      {children}
    </svg>
  );
}

const ICONS = {
  "home-loan": (
    <Icon>
      <path d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </Icon>
  ),
  "car-loan": (
    <Icon>
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </Icon>
  ),
  "equipment-finance": (
    <Icon>
      <path d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    </Icon>
  ),
  "personal-loan": (
    <Icon>
      <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </Icon>
  ),
  "working-capital": (
    <Icon>
      <path d="M3 3v18h18" />
      <path d="M7 16l4-8 4 4 4-8" />
    </Icon>
  ),
  "not-sure": (
    <Icon>
      <path d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </Icon>
  ),
};

const COLUMNS = 3;
const TABS = [...APPLICATION_LIST, { slug: "not-sure", tab: "Not sure" }];

const ROW_CLASS =
  "group flex min-h-12 items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 text-[15px] font-bold text-[#1C5472] transition-colors duration-150 hover:bg-[#00FCB8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00FCB8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C5472]";

const Arrow = () => (
  <svg className="h-5 w-5 shrink-0 text-[#39B2B2] transition-[transform,color] duration-200 group-hover:translate-x-1 group-hover:text-[#1C5472]" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
    <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const onSelectorClick = () => trackMeta("finance_selector_click", false);

/* Pick a finance type, then answer its first question: each answer links into
   that type's application with the question already filled in. "Not sure" goes
   straight to a person, so nobody leaves because they can't pick a box. */
export default function FinanceSelector({ headingLevel: Heading = "h2" }) {
  const [active, setActive] = useState(0);
  const [switched, setSwitched] = useState(false);
  const tabRefs = useRef([]);
  /* Tags on the home page or /apply URL have to reach the form these rows link to */
  useAdAttribution();
  const tab = TABS[active];
  const app = tab.steps ? tab : null;

  const choose = (i) => {
    setActive(i);
    setSwitched(true);
  };

  const onTabKeyDown = (e) => {
    const count = TABS.length;
    const moves = {
      ArrowRight: (active + 1) % count,
      ArrowLeft: (active - 1 + count) % count,
      ArrowDown: (active + COLUMNS) % count,
      ArrowUp: (active - COLUMNS + count) % count,
      Home: 0,
      End: count - 1,
    };
    if (!(e.key in moves)) return;
    e.preventDefault();
    choose(moves[e.key]);
    tabRefs.current[moves[e.key]]?.focus();
  };

  const rowProps = (i) => (switched ? { className: "finance-row-in", style: { animationDelay: `${i * 35}ms` } } : {});

  return (
    <div className="hero-highlight-gradient relative overflow-hidden rounded-3xl text-left shadow-[0_28px_60px_-24px_rgba(28,84,114,0.7)]">
      <div className="relative z-10 p-5 pb-4 sm:p-7 sm:pb-5">
        <Heading className="text-2xl font-bold tracking-tight text-white sm:text-3xl">What are you financing?</Heading>

        <div role="tablist" aria-label="Type of finance" className="relative mt-4 grid grid-cols-3 grid-rows-2 rounded-2xl bg-[#0E2E40]/70 p-1" onKeyDown={onTabKeyDown}>
          <span
            className="finance-tab-indicator absolute left-1 top-1 h-[calc((100%-0.5rem)/2)] w-[calc((100%-0.5rem)/3)] rounded-xl bg-[#00FCB8]"
            style={{ transform: `translate(${(active % COLUMNS) * 100}%, ${Math.floor(active / COLUMNS) * 100}%)` }}
            aria-hidden
          />
          {TABS.map((item, i) => {
            const selected = i === active;
            return (
              <button
                key={item.slug}
                ref={(el) => { tabRefs.current[i] = el; }}
                type="button"
                role="tab"
                id={`finance-tab-${item.slug}`}
                aria-selected={selected}
                aria-controls="finance-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => choose(i)}
                className={`relative z-10 flex min-h-[62px] flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 text-center text-[13px] font-bold leading-tight transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C5472] sm:text-sm ${
                  selected ? "text-[#1C5472]" : "text-white/85 hover:text-white"
                }`}
              >
                {ICONS[item.slug]}
                {item.tab}
              </button>
            );
          })}
        </div>

        <div id="finance-panel" role="tabpanel" aria-labelledby={`finance-tab-${tab.slug}`} className="mt-4">
          <p className="text-base font-bold text-white">{app ? app.selectorQuestion : "Not sure what you need? Talk to a person."}</p>
          {app ? (
            <ul key={app.slug} className="mt-2.5 grid gap-2">
              {app.steps[0].options.map((option, i) => (
                <li key={option.id} {...rowProps(i)}>
                  <Link href={`/apply/${app.slug}?start=${option.id}`} onClick={onSelectorClick} className={ROW_CLASS}>
                    {option.label}
                    <Arrow />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="mt-2.5 grid gap-2">
              <li {...rowProps(0)}>
                <a href={TEAM_PHONE.link} onClick={onSelectorClick} className={ROW_CLASS}>
                  Call us
                  <span className="shrink-0 text-sm font-medium tabular-nums">{TEAM_PHONE.display}</span>
                </a>
              </li>
              <li {...rowProps(1)}>
                <Link href="/contact" onClick={onSelectorClick} className={ROW_CLASS}>
                  Send us a message
                  <Arrow />
                </Link>
              </li>
            </ul>
          )}
        </div>

        {app ? (
          <div className="mt-4 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={app.broker.photo} alt="" width={48} height={48} className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-[#00FCB8]" />
            <p className="text-sm leading-snug text-white">
              <span className="font-bold">Someone from our team calls you within one business day.</span>{" "}
              <span className="text-white/90">{app.selectorPitch}</span>
            </p>
          </div>
        ) : (
          <p className="mt-4 text-sm font-bold text-white"><OpenStatus /></p>
        )}

        <p className="mt-3 text-xs leading-snug text-white/80">
          About 2 minutes. Free assessment, no obligation. Sending it doesn&apos;t run a credit check or go to a lender.
          General information only. Approval is subject to lender criteria.
        </p>
      </div>

      {/* the brand's layered waves, closing off the card */}
      <svg className="block h-8 w-full sm:h-10" viewBox="0 0 480 48" preserveAspectRatio="none" aria-hidden>
        <path d="M0 22C70 4 130 4 210 18C300 34 390 34 480 12V48H0Z" fill="#39B2B2" />
        <path d="M0 36C80 22 150 24 230 34C320 45 400 42 480 28V48H0Z" fill="#00FCB8" />
      </svg>
    </div>
  );
}
