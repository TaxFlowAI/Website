"use client";

import { useState } from "react";

/**
 * Simple accessible FAQ accordion in the light brand theme.
 * items: [{ q, a }]  — `a` may be a string or JSX.
 */
export default function FAQAccordion({ items = [] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-[#1C5472]/10 overflow-hidden rounded-xl border border-[#1C5472]/10 bg-white">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-[#F5F5EF]"
            >
              <span className="font-semibold text-[#1C5472]">{item.q}</span>
              <svg
                className={`h-5 w-5 shrink-0 text-[#39B2B2] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-sm leading-relaxed text-[#1C5472]/80">{item.a}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
