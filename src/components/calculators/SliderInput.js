"use client";

import { useState } from "react";

/**
 * Slider with an editable, formatted value field top-right.
 * The value field shows formatted output (currency / custom format) when idle,
 * and a raw editable number while focused. Clamps to [min, max] on blur so
 * typing intermediate values doesn't fight the user.
 */
function fmtCurrency(n) {
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
}

export default function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  format = (v) => v,
  currency = false,
  className = "",
  id,
}) {
  const [buf, setBuf] = useState(null); // raw string while editing, else null
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;
  const display = buf != null ? buf : currency ? fmtCurrency(value) : String(format(value));

  const handleChange = (e) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "").replace(/^0+(?=\d)/, "");
    setBuf(raw);
    const num = parseFloat(raw);
    if (!Number.isNaN(num) && num >= min && num <= max) onChange(num);
  };

  const handleBlur = () => {
    const num = parseFloat(buf ?? "");
    if (Number.isNaN(num)) onChange(min);
    else onChange(Math.min(max, Math.max(min, num)));
    setBuf(null);
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-[#1C5472]">{label}</label>
        <input
          id={id}
          type="text"
          inputMode="decimal"
          value={display}
          onChange={handleChange}
          onFocus={(e) => { setBuf(String(value)); e.target.select(); }}
          onBlur={handleBlur}
          className="w-32 rounded-lg border border-[#1C5472]/20 bg-white px-3 py-1.5 text-right text-sm font-bold text-[#1C5472] focus:border-[#00FCB8] focus:outline-none focus:ring-1 focus:ring-[#00FCB8]"
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="mt-3 h-2.5 w-full cursor-pointer appearance-none rounded-full [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[#00FCB8] [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[#00FCB8]"
        style={{ background: `linear-gradient(to right, #00FCB8 0%, #00FCB8 ${pct}%, rgba(28,84,114,0.12) ${pct}%, rgba(28,84,114,0.12) 100%)` }}
      />
    </div>
  );
}
