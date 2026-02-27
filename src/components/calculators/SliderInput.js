"use client";

/**
 * Slider + number input. Number input strips leading zeros and stays in sync with slider.
 */
function formatCurrency(n) {
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
}

function stripLeadingZeros(val) {
  if (val === "" || val === "0") return val;
  const s = String(val).replace(/[^0-9.]/g, "");
  if (s.startsWith("0") && !s.startsWith("0.")) return s.replace(/^0+(?=\d)/, "") || "0";
  return s;
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
  const displayVal = currency ? formatCurrency(value) : format(value);

  const handleInputChange = (e) => {
    let raw = e.target.value.replace(/[^0-9.]/g, "");
    raw = stripLeadingZeros(raw);
    if (raw === "") {
      onChange(min ?? 0);
      return;
    }
    const num = parseFloat(raw);
    if (!Number.isNaN(num)) {
      const clamped = Math.min(max, Math.max(min, num));
      onChange(clamped);
    }
  };

  const handleInputFocus = (e) => {
    if (String(value) === "0" || value === 0) e.target.select();
  };

  return (
    <div className={className}>
      <div className="flex justify-between text-sm">
        <label className="font-medium text-[#9CA3AF]">{label}</label>
        <span className="text-[#9CA3AF]">{displayVal}</span>
      </div>
      <div className="mt-1 flex gap-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-2 flex-1 appearance-none rounded-full bg-[#1C5472] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00FCB8] [&::-webkit-slider-thumb]:shadow"
          style={{
            background: `linear-gradient(to right, #00FCB8 0%, #00FCB8 ${((value - min) / (max - min)) * 100}%, #1C5472 ${((value - min) / (max - min)) * 100}%, #1C5472 100%)`,
          }}
        />
        <input
          type="text"
          inputMode="decimal"
          id={id}
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="w-24 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#0D1B2A] px-2 py-1.5 text-sm text-white focus:border-[#00FCB8] focus:outline-none focus:ring-1 focus:ring-[#00FCB8]"
        />
      </div>
    </div>
  );
}
