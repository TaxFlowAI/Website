"use client";

import { useState, useCallback } from "react";

/**
 * Strip leading zeros from numeric string (keep "0" or "0.5").
 * Prevents "010000" and "066" display.
 */
export function stripLeadingZeros(val) {
  if (val === "" || val === "0") return val;
  const s = String(val).replace(/[^0-9.]/g, "");
  if (s.startsWith("0") && !s.startsWith("0.")) return s.replace(/^0+(?=\d)/, "") || "0";
  return s;
}

/**
 * Parse numeric input: allow empty, strip leading zeros, clamp to max decimals.
 */
export function parseNumericInput(val, options = {}) {
  const { maxDecimals = 10, allowEmpty = true } = options;
  let s = String(val).replace(/[^0-9.]/g, "");
  s = s.replace(/^0+(?=\d)/, "") || (allowEmpty ? "" : "0");
  if (s === "" && allowEmpty) return "";
  const num = parseFloat(s);
  if (Number.isNaN(num)) return allowEmpty ? "" : "0";
  if (maxDecimals !== undefined && s.includes(".")) {
    const parts = s.split(".");
    if (parts[1].length > maxDecimals) parts[1] = parts[1].slice(0, maxDecimals);
    return parts.join(".");
  }
  return s;
}

/**
 * Format number with Aussie locale commas (for display on blur).
 */
export function formatWithCommas(num) {
  if (num === "" || num === null || num === undefined) return "";
  const n = Number(num);
  if (Number.isNaN(n)) return String(num);
  return n.toLocaleString("en-AU", { maximumFractionDigits: 0 });
}

/**
 * Controlled numeric input that:
 * - Strips leading zeros on change
 * - On focus: if value is "0", select all so typing replaces it
 * - Optional: format with commas on blur for dollar fields
 */
export function NumericInput({
  value,
  onChange,
  min,
  max,
  step,
  placeholder = "0",
  className = "",
  currency = false,
  maxDecimals = 2,
  id,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
}) {
  // While editing, `buf` holds the raw typed string so partial decimals like
  // "6." or "0." survive between keystrokes (the parent only stores a number).
  const [buf, setBuf] = useState(null);
  const editing = buf != null;
  const displayValue = editing
    ? buf
    : currency && value !== "" && value != null
      ? formatWithCommas(Number(value))
      : value === "" || value == null
        ? ""
        : String(value);

  const handleChange = useCallback(
    (e) => {
      let raw = e.target.value.replace(/[^0-9.]/g, "");
      // keep only the first decimal point
      const dot = raw.indexOf(".");
      if (dot !== -1) raw = raw.slice(0, dot + 1) + raw.slice(dot + 1).replace(/\./g, "");
      // strip leading zeros but preserve a leading "0."
      raw = raw.replace(/^0+(?=\d)/, "");
      // limit decimal places (whole-number fields reject the decimal point)
      if (maxDecimals <= 0) {
        raw = raw.replace(/\./g, "");
      } else if (maxDecimals < 10 && raw.includes(".")) {
        const [a, b] = raw.split(".");
        if (b.length > maxDecimals) raw = `${a}.${b.slice(0, maxDecimals)}`;
      }
      setBuf(raw);
      if (raw === "" || raw === ".") {
        onChange("");
        return;
      }
      const num = parseFloat(raw);
      if (!Number.isNaN(num)) onChange(num); // clamp on blur, not mid-type
    },
    [onChange, maxDecimals]
  );

  const handleFocus = useCallback((e) => {
    setBuf(value === "" || value == null ? "" : String(value));
    e.target.select();
  }, [value]);

  const handleBlur = useCallback(() => {
    const num = parseFloat(buf ?? "");
    if (Number.isNaN(num)) {
      onChange(min != null ? min : "");
    } else {
      let clamped = num;
      if (min != null && clamped < min) clamped = min;
      if (max != null && clamped > max) clamped = max;
      onChange(clamped);
    }
    setBuf(null);
  }, [buf, min, max, onChange]);

  return (
    <input
      type="text"
      inputMode="decimal"
      id={id}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      value={displayValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
      className={className}
    />
  );
}

export default NumericInput;
