"use client";

/**
 * Lightweight SVG line/area chart for a loan balance over time — no external dependency.
 *
 * series: [{ values: number[], color, fill?: boolean, dashed?: boolean, label }]
 *   values[i] is the balance at month i (values[0] = opening balance).
 * xMaxMonths: total months on the x-axis (so a shorter scenario visibly finishes early).
 * yLabel formatting is handled internally (short currency, e.g. $450k).
 */
function fmtShort(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1)}m`;
  if (n >= 1000) return `$${Math.round(n / 1000)}k`;
  return `$${Math.round(n)}`;
}

export default function LoanBalanceChart({
  series = [],
  xMaxMonths,
  height = 240,
  width = 720,
}) {
  const padL = 52;
  const padR = 16;
  const padT = 16;
  const padB = 34;

  const maxMonths = xMaxMonths || Math.max(...series.map((s) => s.values.length - 1), 1);
  const yMax = Math.max(...series.flatMap((s) => s.values), 1);
  // Round yMax up to a "nice" number for gridlines.
  const niceMax = (() => {
    const pow = Math.pow(10, Math.floor(Math.log10(yMax)));
    const r = yMax / pow;
    const step = r <= 1 ? 1 : r <= 2 ? 2 : r <= 5 ? 5 : 10;
    return step * pow;
  })();

  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const x = (m) => padL + (m / maxMonths) * plotW;
  const y = (v) => padT + (1 - v / niceMax) * plotH;

  const pathFor = (values) =>
    values.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");

  const areaFor = (values) => {
    const last = values.length - 1;
    return `${pathFor(values)} L ${x(last).toFixed(1)} ${y(0).toFixed(1)} L ${x(0).toFixed(1)} ${y(0).toFixed(1)} Z`;
  };

  // Y gridlines
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => f * niceMax);
  // X ticks every ~5 years (or yearly if short)
  const totalYears = Math.ceil(maxMonths / 12);
  const yearStep = totalYears <= 8 ? 1 : totalYears <= 16 ? 2 : 5;
  const xTicks = [];
  for (let yr = 0; yr <= totalYears; yr += yearStep) xTicks.push(yr);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} role="img" aria-label="Loan balance over time">
      <defs>
        {series.map((s, i) =>
          s.fill ? (
            <linearGradient key={i} id={`lbc-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity="0.28" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0.02" />
            </linearGradient>
          ) : null
        )}
      </defs>

      {/* Y gridlines + labels */}
      {yTicks.map((t, i) => (
        <g key={i}>
          <line x1={padL} y1={y(t)} x2={width - padR} y2={y(t)} stroke="#1C5472" strokeOpacity="0.08" strokeWidth="1" />
          <text x={padL - 8} y={y(t) + 4} textAnchor="end" fontSize="10" fill="#1C5472" opacity="0.55">
            {fmtShort(t)}
          </text>
        </g>
      ))}

      {/* X ticks + labels */}
      {xTicks.map((yr, i) => (
        <text key={i} x={x(yr * 12)} y={height - padB + 18} textAnchor="middle" fontSize="10" fill="#1C5472" opacity="0.55">
          {yr === 0 ? "Now" : `${yr}y`}
        </text>
      ))}

      {/* Area fills first */}
      {series.map((s, i) =>
        s.fill ? <path key={`f${i}`} d={areaFor(s.values)} fill={`url(#lbc-grad-${i})`} stroke="none" /> : null
      )}
      {/* Lines on top */}
      {series.map((s, i) => (
        <path
          key={`l${i}`}
          d={pathFor(s.values)}
          fill="none"
          stroke={s.color}
          strokeWidth="2.5"
          strokeDasharray={s.dashed ? "6 5" : "none"}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
