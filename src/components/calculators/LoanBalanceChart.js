"use client";

import { useRef, useState, useEffect } from "react";

/**
 * Interactive SVG line/area chart — no external dependency.
 *
 * series: [{ values: number[], color, fill?: boolean, dashed?: boolean, label }]
 *   values[i] is the amount at month i (values[0] = month 0).
 * xMaxMonths: total months on the x-axis (a shorter scenario clamps to its last value).
 * Hover anywhere to read the value at that month (crosshair + tooltip). X-axis is in months.
 */
function fmtShort(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1)}m`;
  if (n >= 1000) return `$${Math.round(n / 1000)}k`;
  return `$${Math.round(n)}`;
}
function fmtFull(n) {
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(n || 0);
}
function niceCeil(v) {
  const pow = Math.pow(10, Math.floor(Math.log10(v)));
  const r = v / pow;
  const step = r <= 1 ? 1 : r <= 2 ? 2 : r <= 5 ? 5 : 10;
  return step * pow;
}
function niceMonthStep(maxMonths) {
  const steps = [1, 3, 6, 12, 24, 36, 60, 120, 240];
  for (const s of steps) if (maxMonths / s <= 8) return s;
  return 360;
}
const valueAt = (values, m) => (m < values.length ? values[m] : values[values.length - 1]);

export default function LoanBalanceChart({ series = [], xMaxMonths, height = 260 }) {
  const wrapRef = useRef(null);
  const [width, setWidth] = useState(720);
  const [hoverX, setHoverX] = useState(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth || 720);
    measure();
    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure);
      ro.observe(el);
    }
    return () => ro && ro.disconnect();
  }, []);

  const padL = 52;
  const padR = 16;
  const padT = 16;
  const padB = 34;

  const maxMonths = xMaxMonths || Math.max(...series.map((s) => s.values.length - 1), 1);
  const niceMax = niceCeil(Math.max(...series.flatMap((s) => s.values), 1));
  const plotW = Math.max(1, width - padL - padR);
  const plotH = height - padT - padB;
  const x = (m) => padL + (m / maxMonths) * plotW;
  const y = (v) => padT + (1 - v / niceMax) * plotH;

  const pathFor = (values) => values.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const areaFor = (values) => `${pathFor(values)} L ${x(values.length - 1).toFixed(1)} ${y(0).toFixed(1)} L ${x(0).toFixed(1)} ${y(0).toFixed(1)} Z`;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => f * niceMax);
  const monthStep = niceMonthStep(maxMonths);
  const xTicks = [];
  for (let m = 0; m <= maxMonths; m += monthStep) xTicks.push(m);

  const hoverMonth = hoverX == null ? null : Math.max(0, Math.min(maxMonths, Math.round(((hoverX - padL) / plotW) * maxMonths)));

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    if (px < padL - 6 || px > width - padR + 6) {
      setHoverX(null);
      return;
    }
    setHoverX(px);
  };

  const tooltipLeft = hoverMonth == null ? 0 : Math.max(74, Math.min(width - 74, x(hoverMonth)));

  // Draw dashed comparison lines first (underneath) so the solid primary lines stay dominant.
  const indexed = series.map((s, i) => ({ ...s, _i: i }));
  const drawOrder = [...indexed].sort((a, b) => (b.dashed ? 1 : 0) - (a.dashed ? 1 : 0));

  return (
    <div ref={wrapRef} className="relative w-full" style={{ height }}>
      <svg width={width} height={height} onMouseMove={handleMove} onMouseLeave={() => setHoverX(null)} role="img" aria-label="Loan amount over time">
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

        {/* Vertical gridlines (month ticks) */}
        {xTicks.map((m, i) => (
          <line key={`xg${i}`} x1={x(m)} y1={padT} x2={x(m)} y2={height - padB} stroke="#1C5472" strokeOpacity="0.05" strokeWidth="1" />
        ))}

        {/* Y gridlines + labels */}
        {yTicks.map((t, i) => (
          <g key={`y${i}`}>
            <line x1={padL} y1={y(t)} x2={width - padR} y2={y(t)} stroke="#1C5472" strokeOpacity="0.08" strokeWidth="1" />
            <text x={padL - 8} y={y(t) + 4} textAnchor="end" fontSize="10" fill="#1C5472" opacity="0.55">{fmtShort(t)}</text>
          </g>
        ))}

        {/* X labels (months) */}
        {xTicks.map((m, i) => (
          <text key={`x${i}`} x={x(m)} y={height - padB + 18} textAnchor="middle" fontSize="10" fill="#1C5472" opacity="0.55">
            {m === 0 ? "0" : `${m}m`}
          </text>
        ))}

        {/* Areas first, then lines (dashed comparison lines drawn underneath the solid primaries) */}
        {drawOrder.map((s) => (s.fill ? <path key={`f${s._i}`} d={areaFor(s.values)} fill={`url(#lbc-grad-${s._i})`} stroke="none" /> : null))}
        {drawOrder.map((s) => (
          <path
            key={`l${s._i}`}
            d={pathFor(s.values)}
            fill="none"
            stroke={s.color}
            strokeWidth={s.dashed ? 1.75 : 2.5}
            strokeOpacity={s.dashed ? 0.5 : 1}
            strokeDasharray={s.dashed ? "6 6" : "none"}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))}

        {/* Hover crosshair + dots */}
        {hoverMonth != null && (
          <g pointerEvents="none">
            <line x1={x(hoverMonth)} y1={padT} x2={x(hoverMonth)} y2={height - padB} stroke="#1C5472" strokeOpacity="0.35" strokeWidth="1" />
            {series.map((s, i) => (
              <circle
                key={`d${i}`}
                cx={x(hoverMonth)}
                cy={y(valueAt(s.values, hoverMonth))}
                r={s.dashed ? 3.5 : 4.5}
                fill="#fff"
                stroke={s.color}
                strokeWidth="2.5"
                strokeOpacity={s.dashed ? 0.6 : 1}
              />
            ))}
          </g>
        )}
      </svg>

      {hoverMonth != null && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 rounded-lg border border-[#1C5472]/15 bg-white px-3 py-2 shadow-lg"
          style={{ left: tooltipLeft, top: 6 }}
        >
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#1C5472]/60">
            {hoverMonth === 0 ? "Start" : `Month ${hoverMonth}`}
          </p>
          <ul className="mt-1 space-y-0.5">
            {series.map((s, i) => (
              <li key={i} className="flex items-center justify-between gap-3 whitespace-nowrap text-xs">
                <span className="flex items-center gap-1.5 text-[#1C5472]/75">
                  <span className="inline-block h-2 w-2 rounded-sm" style={{ backgroundColor: s.color }} />
                  {s.label}
                </span>
                <span className="font-bold text-[#1C5472]">{fmtFull(valueAt(s.values, hoverMonth))}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
