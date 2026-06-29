"use client";

/**
 * Segmented pill toggle — a touch-friendly replacement for a radio group.
 * options: [{ value, label }]
 */
export default function SegmentedControl({ options = [], value, onChange, ariaLabel }) {
  return (
    <div role="radiogroup" aria-label={ariaLabel} className="flex w-full gap-1 rounded-xl border border-[#1C5472]/15 bg-[#F5F5EF] p-1">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={`flex-1 rounded-lg px-3 py-3 text-sm font-semibold transition ${
              active ? "bg-white text-[#1C5472] shadow-sm ring-1 ring-[#1C5472]/5" : "text-[#1C5472]/55 hover:text-[#1C5472]"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
