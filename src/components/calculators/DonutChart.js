"use client";

/**
 * Lightweight SVG donut chart — no external dependency.
 * segments: [{ value, color, label }]. Renders a ring with one arc per segment
 * plus an optional centre label/value/sub.
 */
export default function DonutChart({
  segments = [],
  size = 200,
  thickness = 26,
  centerLabel,
  centerValue,
  centerSub,
}) {
  const total = segments.reduce((s, x) => s + Math.max(0, x.value || 0), 0) || 1;
  const radius = (size - thickness) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const C = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      height="100%"
      role="img"
      aria-label={segments.map((s) => `${s.label}: ${Math.round((s.value / total) * 100)}%`).join(", ")}
      style={{ maxWidth: size }}
    >
      <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#E7E5DF" strokeWidth={thickness} />
      {segments.map((seg, i) => {
        const frac = Math.max(0, seg.value || 0) / total;
        const len = frac * C;
        const el = (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth={thickness}
            strokeDasharray={`${len} ${C - len}`}
            strokeDashoffset={-offset}
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        );
        offset += len;
        return el;
      })}
      {(centerValue || centerLabel) && (
        <g>
          {centerLabel && (
            <text x={cx} y={cy - 14} textAnchor="middle" fontSize="11" fontWeight="700" fill="#39B2B2" style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {centerLabel}
            </text>
          )}
          {centerValue && (
            <text x={cx} y={cy + 6} textAnchor="middle" fontSize="20" fontWeight="800" fill="#1C5472">
              {centerValue}
            </text>
          )}
          {centerSub && (
            <text x={cx} y={cy + 24} textAnchor="middle" fontSize="11" fill="#1C5472" opacity="0.7">
              {centerSub}
            </text>
          )}
        </g>
      )}
    </svg>
  );
}
