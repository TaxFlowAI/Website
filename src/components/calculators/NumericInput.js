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
  const [focused, setFocused] = useState(false);
  const displayValue = focused
    ? (value === "" ? "" : String(value))
    : currency && value !== "" && value != null
      ? formatWithCommas(Number(value))
      : value === "" || value == null
        ? ""
        : String(value);

  const handleChange = useCallback(
    (e) => {
      let raw = e.target.value.replace(/[^0-9.]/g, "");
      raw = raw.replace(/^0+(?=\d)/, "") || "";
      if (raw === "") {
        onChange("");
        return;
      }
      if (maxDecimals < 10 && raw.includes(".")) {
        const [a, b] = raw.split(".");
        if (b.length > maxDecimals) raw = `${a}.${b.slice(0, maxDecimals)}`;
      }
      const num = parseFloat(raw);
      if (!Number.isNaN(num)) {
        if (min != null && num < min) onChange(min);
        else if (max != null && num > max) onChange(max);
        else onChange(raw === "" ? "" : num);
      } else onChange(raw === "" ? "" : raw);
    },
    [onChange, min, max, maxDecimals]
  );

  const handleFocus = useCallback((e) => {
    setFocused(true);
    if (String(value) === "0" || value === 0) e.target.select();
  }, [value]);

  const handleBlur = useCallback(() => {
    setFocused(false);
    if (value === "" && min != null) onChange(min);
  }, [value, min, onChange]);

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
