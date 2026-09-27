/* Product-style panels for the security page story. Every label here is a
   fact from the approved security brief (27 Sept 2026) — do not add claims. */

function Dot() {
  return <span className="tc-sec-dot" aria-hidden />;
}

/* 01 — residency */
export function RegionPanel() {
  const rows = [
    ["Platform", "Sydney"],
    ["Database", "Sydney"],
    ["Backups", "Australia"],
  ];
  return (
    <div className="tc-panel tc-sec-panel">
      <div className="flex items-center justify-between">
        <p className="tc-mono text-[10.5px] tracking-[0.18em]" style={{ color: "#94A3B8" }}>
          HOSTING REGION
        </p>
        <p className="tc-mono text-[10.5px] tracking-[0.12em]" style={{ color: "#00FCB8" }}>
          AP-SOUTHEAST-2
        </p>
      </div>
      <div className="mt-5 flex items-center gap-4">
        <span className="tc-sec-pin" aria-hidden>
          <span />
        </span>
        <div>
          <p className="tc-display text-[1.7rem] text-white">Sydney, Australia</p>
          <p className="mt-1 text-[13px]" style={{ color: "#94A3B8" }}>
            Amazon Web Services
          </p>
        </div>
      </div>
      <ul className="mt-6">
        {rows.map(([k, v]) => (
          <li key={k} className="tc-sec-row">
            <span>{k}</span>
            <span className="flex items-center gap-2 text-white">
              <Dot />
              {v}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* 03 — two-factor sign-in */
export function TwoFactorPanel() {
  return (
    <div className="tc-panel tc-sec-panel">
      <p className="tc-mono text-[10.5px] tracking-[0.18em]" style={{ color: "#94A3B8" }}>
        SIGN IN
      </p>
      <div className="mt-5">
        <p className="text-[12px]" style={{ color: "#94A3B8" }}>Password</p>
        <div className="tc-sec-field mt-1.5">
          <span className="tracking-[0.3em] text-white/80">••••••••••</span>
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M1.5 6.5l3 3 6-7" stroke="#00FCB8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="mt-5">
        <p className="text-[12px]" style={{ color: "#94A3B8" }}>One-time verification code</p>
        <div className="mt-1.5 grid grid-cols-6 gap-2" aria-hidden>
          {["4", "8", "2", "", "", ""].map((d, i) => (
            <span key={i} className={`tc-sec-code ${d ? "is-filled" : ""} ${i === 3 ? "is-caret" : ""}`}>
              {d}
            </span>
          ))}
        </div>
      </div>
      <p className="tc-mono mt-6 text-[10.5px] tracking-[0.14em]" style={{ color: "#64748B" }}>
        PASSWORD + ONE-TIME CODE · EVERY LOGIN
      </p>
    </div>
  );
}

/* 05 — continuous backup */
export function ReplicationPanel() {
  return (
    <div className="tc-panel tc-sec-panel">
      <div className="flex items-center justify-between">
        <p className="tc-mono text-[10.5px] tracking-[0.18em]" style={{ color: "#94A3B8" }}>
          REPLICATION
        </p>
        <p className="tc-mono flex items-center gap-2 text-[10.5px] tracking-[0.12em]" style={{ color: "#00FCB8" }}>
          <Dot />
          CONTINUOUS
        </p>
      </div>
      <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="tc-sec-db">
          <p className="text-[13px] font-bold text-white">Database</p>
          <p className="mt-0.5 text-[11.5px]" style={{ color: "#94A3B8" }}>Sydney</p>
        </div>
        <div className="tc-sec-flow" aria-hidden>
          <span />
        </div>
        <div className="tc-sec-db">
          <p className="text-[13px] font-bold text-white">Encrypted storage</p>
          <p className="mt-0.5 text-[11.5px]" style={{ color: "#94A3B8" }}>Australia</p>
        </div>
      </div>
      <div className="mt-6 flex items-end justify-between gap-4">
        <div>
          <p className="tc-display tc-hero-accent text-[2.4rem]">~1 second</p>
          <p className="text-[12.5px]" style={{ color: "#94A3B8" }}>maximum data loss</p>
        </div>
        <div className="flex gap-1.5" aria-hidden>
          {[0.35, 0.5, 0.7, 1].map((o) => (
            <span key={o} className="tc-sec-version" style={{ opacity: o }} />
          ))}
        </div>
      </div>
      <p className="tc-mono mt-5 text-[10.5px] tracking-[0.14em]" style={{ color: "#64748B" }}>
        VERSIONED RECOVERY POINTS · TESTED RECOVERY PLAN
      </p>
    </div>
  );
}
