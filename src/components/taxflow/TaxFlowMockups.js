"use client";

import { useState } from "react";

/* Product-UI mockup panels in the app's exact visual language.
   Shared by the home, features and persona pages. All decorative
   panels are aria-hidden or labelled; data is illustrative demo UI. */

export function Tick() {
  return (
    <svg className="mt-1 h-3 w-3 shrink-0" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M1.5 6.5l3 3 6-7" stroke="#00FCB8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* the hero current: a line that carries receipts into sorted ATO codes */
export function HeroCurrent() {
  return (
    <div className="relative mb-5 flex items-center gap-4" aria-hidden>
      <svg viewBox="0 0 430 96" className="h-20 w-full min-w-0 flex-1" fill="none" preserveAspectRatio="none">
        <defs>
          <linearGradient id="tc-flow" x1="0" y1="0" x2="430" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#39B2B2" />
            <stop offset="1" stopColor="#00FCB8" />
          </linearGradient>
        </defs>
        <g className="tc-hero-dots">
          <rect x="2" y="58" width="14" height="18" rx="2" stroke="#94A3B8" strokeOpacity="0.5" strokeWidth="1.2" transform="rotate(-8 9 67)" />
          <rect x="16" y="62" width="14" height="18" rx="2" stroke="#94A3B8" strokeOpacity="0.5" strokeWidth="1.2" transform="rotate(6 23 71)" />
          <rect x="8" y="44" width="14" height="18" rx="2" stroke="#94A3B8" strokeOpacity="0.5" strokeWidth="1.2" transform="rotate(14 15 53)" />
        </g>
        <path
          className="tc-hero-path"
          d="M30 64 C 120 64, 150 24, 240 24 S 400 48, 428 48"
          stroke="url(#tc-flow)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <g className="tc-hero-dots">
          {[0, 2, 4].map((delay) => (
            <circle key={delay} r="3.2" fill="#00FCB8">
              <animateMotion dur="6s" begin={`${delay}s`} repeatCount="indefinite" path="M30 64 C 120 64, 150 24, 240 24 S 400 48, 428 48" />
            </circle>
          ))}
        </g>
      </svg>
      <div className="flex shrink-0 flex-col gap-1.5">
        {["D1", "D5", "D9"].map((code) => (
          <span
            key={code}
            className="tc-code-chip tc-mono rounded-md border px-2 py-0.5 text-[11px]"
            style={{ borderColor: "rgba(255,255,255,0.08)", color: "#94A3B8" }}
          >
            {code}
          </span>
        ))}
      </div>
    </div>
  );
}

const DASH_TABS = {
  Personal: [
    { name: "Income Tax FY2025", status: "Lodged", tone: "ok" },
    { name: "BAS Q2 FY2026", status: "Due 28 Feb", tone: "due" },
    { name: "Vehicle Logbook", status: "12 wks · 68%", tone: "progress" },
  ],
  Company: [
    { name: "Company Tax FY2025", status: "Lodged", tone: "ok" },
    { name: "BAS Q2 FY2026", status: "Due 28 Feb", tone: "due" },
    { name: "ASIC Annual Review", status: "On track", tone: "working" },
  ],
  Trust: [
    { name: "Trust Tax FY2025", status: "Lodged", tone: "ok" },
    { name: "Distribution Resolution", status: "On track", tone: "working" },
    { name: "BAS Q2 FY2026", status: "Due 28 Feb", tone: "due" },
  ],
};

function StatusText({ status, tone }) {
  const color = tone === "ok" ? "#00FCB8" : tone === "due" ? "#F59E0B" : "#0EA5E9";
  return (
    <span className="tc-mono text-[11px] font-medium" style={{ color }}>
      {status.toUpperCase()}
    </span>
  );
}

/* a believable slice of the actual dark app — switchable entity tabs */
export function ProductScreen() {
  const [tab, setTab] = useState("Personal");
  const rows = DASH_TABS[tab];
  return (
    <div className="tc-panel w-full max-w-md p-5">
      <div className="flex items-baseline justify-between border-b pb-3" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <span className="text-[13px] font-semibold text-white">
          TaxFlow<span style={{ color: "#00FCB8" }}>AI</span>{" "}
          <span className="font-normal" style={{ color: "#94A3B8" }}>/ dashboard</span>
        </span>
        <span className="tc-mono text-[11px]" style={{ color: "#00FCB8" }}>ALL GOOD</span>
      </div>
      <div className="mt-3 flex gap-5 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }} role="tablist" aria-label="Entity accounts">
        {Object.keys(DASH_TABS).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className="tc-tab -mb-px border-b-2 pb-2 text-[13px] font-medium"
            style={tab === t ? { borderColor: "#00FCB8", color: "#ffffff" } : { borderColor: "transparent", color: "#94A3B8" }}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-2">
        {rows.map((row) => (
          <div
            key={row.name}
            className="tc-row flex items-center justify-between gap-4 border-b px-1 py-3 last:border-b-0"
            style={{ borderColor: "rgba(255,255,255,0.05)" }}
          >
            <div className="min-w-0">
              <p className="truncate text-[13px] text-white/90">{row.name}</p>
              {row.tone === "progress" && (
                <div className="mt-2 h-1 w-36 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <div className="tc-progress-fill tc-grad-line-h h-full rounded-full" style={{ "--tc-progress": "68%" }} />
                </div>
              )}
            </div>
            {row.tone === "progress" ? (
              <span className="tc-mono shrink-0 text-[11px] font-medium" style={{ color: "#00FCB8" }}>12 WKS · 68%</span>
            ) : (
              <StatusText status={row.status} tone={row.tone} />
            )}
          </div>
        ))}
      </div>
      <div
        className="mt-3 flex items-start gap-3 rounded-lg border p-3"
        style={{ borderColor: "rgba(0,252,184,0.25)", background: "rgba(0,252,184,0.06)" }}
      >
        <span
          className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ background: "linear-gradient(135deg, #39B2B2, #00FCB8)", boxShadow: "0 0 8px rgba(0,252,184,0.5)" }}
          aria-hidden
        />
        <p className="text-[12px] leading-relaxed" style={{ color: "#C9E9E0" }}>
          <span className="tc-mono font-medium" style={{ color: "#00FCB8" }}>FLO</span>
          {" — "}Upload your bank statements to get started with Q2 BAS.
        </p>
      </div>
    </div>
  );
}

/* receipt classification card — upload anywhere, auto-filed with reasoning */
export function ScannerCard() {
  return (
    <div className="tc-card p-5">
      <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <span className="tc-mono text-[11px]" style={{ color: "#94A3B8" }}>RECEIPT · AUTO-FILED</span>
        <span className="tc-mono text-[11px] font-medium" style={{ color: "#00FCB8" }}>CONFIDENCE 92%</span>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <div className="min-w-0">
          <p className="text-[15px] font-bold text-white">Officeworks</p>
          <p className="tc-mono mt-0.5 text-[11.5px]" style={{ color: "#94A3B8" }}>STATIONERY · WORK USE</p>
        </div>
        <div className="tc-grad-line-h tc-glow-line h-[2px] min-w-6 flex-1 rounded-full" aria-hidden />
        <div
          className="shrink-0 rounded-lg border px-3 py-2 text-center"
          style={{ borderColor: "rgba(0,252,184,0.4)", background: "rgba(0,252,184,0.06)" }}
        >
          <p className="tc-mono text-[15px] font-semibold" style={{ color: "#00FCB8" }}>D5</p>
          <p className="tc-mono mt-0.5 text-[9.5px]" style={{ color: "#94A3B8" }}>OTHER WORK EXP.</p>
        </div>
      </div>
      <p className="mt-4 border-t pt-3 text-[12.5px] leading-relaxed" style={{ borderColor: "rgba(255,255,255,0.08)", color: "#94A3B8" }}>
        <span className="tc-mono font-medium" style={{ color: "#00FCB8" }}>FLO</span>
        {" — "}D4 covers self-education. Officeworks stationery for general work use falls under D5.
      </p>
    </div>
  );
}

/* the D5-vs-D4 exchange */
export function FloExchange() {
  return (
    <div className="tc-panel p-6">
      <div className="flex items-center gap-3 border-b pb-4" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <span
          className="h-3 w-3 rounded-full"
          style={{ background: "linear-gradient(135deg, #39B2B2, #00FCB8)", boxShadow: "0 0 10px rgba(0,252,184,0.5)" }}
          aria-hidden
        />
        <div>
          <p className="text-[14px] font-bold text-white">Flo</p>
          <p className="tc-mono text-[10.5px]" style={{ color: "#94A3B8" }}>AI TAX ASSISTANT · ONLINE</p>
        </div>
      </div>
      <div className="mt-5 space-y-5 text-[13.5px] leading-relaxed">
        <div className="border-l-2 pl-4" style={{ borderColor: "#00FCB8" }}>
          <p className="tc-mono mb-1 text-[10.5px]" style={{ color: "#00FCB8" }}>FLO</p>
          <p style={{ color: "#C9E9E0" }}>
            I&apos;ve scanned your Officeworks receipt. Classifying as{" "}
            <span className="tc-mono font-medium" style={{ color: "#00FCB8" }}>D5 — Other work-related expenses</span>.
            Confidence: <span className="tc-mono" style={{ color: "#00FCB8" }}>92%</span>.
          </p>
        </div>
        <div className="border-l-2 pl-4" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
          <p className="tc-mono mb-1 text-[10.5px]" style={{ color: "#94A3B8" }}>YOU</p>
          <p className="text-white/85">Why D5 and not D4?</p>
        </div>
        <div className="border-l-2 pl-4" style={{ borderColor: "#00FCB8" }}>
          <p className="tc-mono mb-1 text-[10.5px]" style={{ color: "#00FCB8" }}>FLO</p>
          <p style={{ color: "#C9E9E0" }}>
            <span className="tc-mono" style={{ color: "#00FCB8" }}>D4</span> covers self-education.
            Officeworks stationery for general work use falls under{" "}
            <span className="tc-mono" style={{ color: "#00FCB8" }}>D5</span>. Want me to change it?
          </p>
        </div>
      </div>
    </div>
  );
}

/* 12-week logbook meter */
export function LogbookMeter() {
  return (
    <div className="tc-observe max-w-sm">
      <div className="flex items-baseline justify-between">
        <span className="tc-mono text-[11px]" style={{ color: "#94A3B8" }}>12-WEEK PERIOD</span>
        <span className="tc-mono text-[12px] font-semibold" style={{ color: "#00FCB8" }}>68% BUSINESS USE</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
        <div className="tc-progress-fill tc-grad-line-h h-full rounded-full" style={{ "--tc-progress": "68%" }} />
      </div>
    </div>
  );
}

/* guided deduction pages rail D1–D9 */
const DEDUCTIONS = [
  ["D1", "Car — logbook"],
  ["D2", "Travel diary"],
  ["D3", "Uniforms & laundry"],
  ["D4", "Self-education"],
  ["D5", "Working from home"],
  ["D9", "Gifts & donations"],
];

export function DeductionRail() {
  return (
    <div className="tc-card p-5">
      <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <span className="tc-mono text-[11px]" style={{ color: "#94A3B8" }}>DEDUCTIONS · GUIDED PAGES</span>
        <span className="tc-mono text-[11px]" style={{ color: "#00FCB8" }}>D1–D9</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {DEDUCTIONS.map(([code, label]) => (
          <div
            key={code}
            className="flex items-center gap-2.5 rounded-lg border px-3 py-2.5"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <span className="tc-mono text-[12px] font-semibold" style={{ color: "#00FCB8" }}>{code}</span>
            <span className="text-[12px] text-white/85">{label}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 border-t pt-3 text-[12px] leading-relaxed" style={{ borderColor: "rgba(255,255,255,0.08)", color: "#94A3B8" }}>
        <span className="tc-mono font-medium" style={{ color: "#F59E0B" }}>TRAP</span>
        {" — "}Home to work is private — even on night shift. Flo flags it before it costs you.
      </p>
    </div>
  );
}

/* WFH fixed-rate hour tracker */
export function WfhTracker() {
  const week = [7.5, 8, 0, 7.5, 6];
  return (
    <div className="tc-card p-5">
      <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <span className="tc-mono text-[11px]" style={{ color: "#94A3B8" }}>D5 · WFH HOUR TRACKER</span>
        <span className="tc-mono text-[11px]" style={{ color: "#00FCB8" }}>ATO FIXED RATE</span>
      </div>
      <div className="mt-4 flex items-end gap-2" aria-hidden>
        {week.map((h, i) => (
          <div key={i} className="flex-1">
            <div
              className="tc-grad-line-v mx-auto w-full rounded-t"
              style={{ height: `${h * 7}px`, opacity: h ? 1 : 0.15 }}
            />
            <p className="tc-mono mt-1.5 text-center text-[9.5px]" style={{ color: "#94A3B8" }}>
              {["MON", "TUE", "WED", "THU", "FRI"][i]}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-3 border-t pt-3 text-[12px]" style={{ borderColor: "rgba(255,255,255,0.08)", color: "#94A3B8" }}>
        <span className="tc-mono" style={{ color: "#00FCB8" }}>29.0 HRS</span> logged this week — records
        the ATO actually accepts.
      </p>
    </div>
  );
}

/* document vault — private synced folder */
export function VaultPanel() {
  const rows = [
    ["Receipts", "142 files"],
    ["Bank statements", "18 files"],
    ["Signed documents", "6 files"],
  ];
  return (
    <div className="tc-card p-5">
      <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <span className="tc-mono text-[11px]" style={{ color: "#94A3B8" }}>DOCUMENT VAULT</span>
        <span className="tc-mono flex items-center gap-1.5 text-[11px]" style={{ color: "#00FCB8" }}>
          <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
            <rect x="2.5" y="5" width="7" height="5" rx="1" />
            <path d="M4 5V3.5a2 2 0 014 0V5" />
          </svg>
          PRIVATE
        </span>
      </div>
      <div className="mt-2">
        {rows.map(([name, meta]) => (
          <div
            key={name}
            className="tc-row flex items-center justify-between border-b px-1 py-3 last:border-b-0"
            style={{ borderColor: "rgba(255,255,255,0.05)" }}
          >
            <span className="text-[13px] text-white/90">{name}</span>
            <span className="tc-mono text-[11px]" style={{ color: "#94A3B8" }}>{meta.toUpperCase()}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 border-t pt-3 text-[12px]" style={{ borderColor: "rgba(255,255,255,0.08)", color: "#94A3B8" }}>
        Synced to your own password-protected Dropbox folder — always yours.
      </p>
    </div>
  );
}

/* accountant booking — live availability */
export function BookingPanel() {
  return (
    <div className="tc-card p-5">
      <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <span className="tc-mono text-[11px]" style={{ color: "#94A3B8" }}>BOOK YOUR ACCOUNTANT</span>
        <span className="tc-mono text-[11px]" style={{ color: "#00FCB8" }}>LIVE AVAILABILITY</span>
      </div>
      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between gap-3 rounded-lg border p-3" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div>
            <p className="text-[13px] font-bold text-white">30 min — Teams or phone</p>
            <p className="tc-mono mt-0.5 text-[10.5px]" style={{ color: "#94A3B8" }}>TUE 11:00 · TUE 14:30 · WED 09:00</p>
          </div>
          <span className="tc-btn-primary shrink-0 rounded-lg px-3 py-1.5 text-[12px] font-bold">Book</span>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-lg border p-3" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div>
            <p className="text-[13px] font-bold text-white">1 hour — in person</p>
            <p className="tc-mono mt-0.5 text-[10.5px]" style={{ color: "#94A3B8" }}>PARRAMATTA · MARTIN PLACE</p>
          </div>
          <span className="tc-btn-primary shrink-0 rounded-lg px-3 py-1.5 text-[12px] font-bold">Book</span>
        </div>
      </div>
      <p className="mt-3 border-t pt-3 text-[12px]" style={{ borderColor: "rgba(255,255,255,0.08)", color: "#94A3B8" }}>
        Straight into your accountant&apos;s calendar. No phone tag.
      </p>
    </div>
  );
}

/* lodgement tracking list */
export function LodgementList() {
  const rows = [
    ["Income Tax FY2025", "Lodged", "ok"],
    ["BAS Q2 FY2026", "Due 28 Feb", "due"],
    ["BAS Q3 FY2026", "Opens 1 Apr", "working"],
  ];
  return (
    <div className="tc-card p-5">
      <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <span className="tc-mono text-[11px]" style={{ color: "#94A3B8" }}>LODGEMENTS</span>
        <span className="tc-mono text-[11px]" style={{ color: "#F59E0B" }}>1 DUE SOON</span>
      </div>
      <div className="mt-2">
        {rows.map(([name, status, tone]) => (
          <div
            key={name}
            className="tc-row flex items-center justify-between border-b px-1 py-3 last:border-b-0"
            style={{ borderColor: "rgba(255,255,255,0.05)" }}
          >
            <span className="text-[13px] text-white/90">{name}</span>
            <StatusText status={status} tone={tone} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* investment property card */
export function PropertyPanel() {
  return (
    <div className="tc-card p-5">
      <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <span className="tc-mono text-[11px]" style={{ color: "#94A3B8" }}>INVESTMENT PROPERTY</span>
        <span className="tc-mono text-[11px]" style={{ color: "#0EA5E9" }}>RENTED</span>
      </div>
      <div className="mt-3 space-y-2.5">
        <p className="text-[14px] font-bold text-white">12 Example St, Parramatta NSW</p>
        <div className="grid grid-cols-2 gap-2 text-[12px]">
          <div>
            <p className="tc-mono text-[10px]" style={{ color: "#94A3B8" }}>FIRST RENT RECEIVED</p>
            <p className="tc-mono mt-0.5" style={{ color: "#E2E8F0" }}>01 JUL 2024</p>
          </div>
          <div>
            <p className="tc-mono text-[10px]" style={{ color: "#94A3B8" }}>PURCHASE DATE</p>
            <p className="tc-mono mt-0.5" style={{ color: "#E2E8F0" }}>14 MAR 2024</p>
          </div>
        </div>
        <p className="border-t pt-2.5 text-[12px]" style={{ borderColor: "rgba(255,255,255,0.08)", color: "#94A3B8" }}>
          Rental income, expenses and notes tracked inline — ready for your agent at tax time.
        </p>
      </div>
    </div>
  );
}
