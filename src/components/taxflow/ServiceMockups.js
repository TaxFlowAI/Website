/* Product-style panels for the service landing pages. They illustrate the flow
   only: no prices, no real client data, no claims beyond the page copy. */

function PanelHead({ left, right }) {
  return (
    <div className="flex items-center justify-between">
      <p className="tc-mono text-[10.5px] tracking-[0.18em]" style={{ color: "#94A3B8" }}>{left}</p>
      {right && (
        <p className="tc-mono flex items-center gap-2 text-[10.5px] tracking-[0.12em]" style={{ color: "#00FCB8" }}>
          <span className="tc-sec-dot" aria-hidden />
          {right}
        </p>
      )}
    </div>
  );
}

/* tax: the quote you approve before work starts */
export function QuotePanel() {
  return (
    <div className="tc-panel tc-sec-panel">
      <PanelHead left="YOUR QUOTE" right="AWAITING YOU" />
      <p className="tc-display mt-5 text-[1.5rem] text-white">Individual tax return</p>
      <p className="mt-1 text-[13px]" style={{ color: "#94A3B8" }}>Prepared and lodged by your registered tax agent</p>
      <div className="mt-5">
        <div className="tc-lp-panel-row">
          <span>Fixed fee</span>
          <span aria-hidden><i className="tc-lp-blur" /></span>
        </div>
        <div className="tc-lp-panel-row">
          <span>Work starts</span>
          <span>Only when you accept</span>
        </div>
      </div>
      <div className="mt-5 flex gap-3" aria-hidden>
        <span className="tc-lp-btn is-go">Accept quote</span>
        <span className="tc-lp-btn is-quiet">Not now</span>
      </div>
      <p className="tc-mono mt-5 text-[10.5px] tracking-[0.14em]" style={{ color: "#64748B" }}>
        NO SUBSCRIPTION · NO UPFRONT CHARGE
      </p>
    </div>
  );
}

/* asic 01: tell us what has changed */
export function ChangeRequestPanel() {
  return (
    <div className="tc-panel tc-sec-panel">
      <PanelHead left="MESSAGE YOUR TEAM" />
      <div className="mt-5 space-y-3">
        <p className="tc-lp-msg mr-8">
          Sam is resigning as a director at the end of the month, and we have moved office.
        </p>
        <p className="tc-lp-msg is-reply ml-8">
          Got it. We will prepare the resignation, the minutes and the ASIC notice for both changes.
        </p>
      </div>
      <div className="mt-5">
        <div className="tc-lp-panel-row">
          <span>Director resignation</span>
          <span className="tc-lp-code tc-mono">FORM 484</span>
        </div>
        <div className="tc-lp-panel-row">
          <span>Registered office change</span>
          <span className="tc-lp-code tc-mono">FORM 484</span>
        </div>
      </div>
    </div>
  );
}

/* asic 02: sign electronically */
export function SigningPanel() {
  return (
    <div className="tc-panel tc-sec-panel">
      <PanelHead left="READY TO SIGN" right="2 DOCUMENTS" />
      <div className="mt-5">
        <div className="tc-lp-panel-row">
          <span>Director resolution</span>
          <span>Signed</span>
        </div>
        <div className="tc-lp-panel-row">
          <span>Consent and resignation</span>
          <span style={{ color: "#00FCB8" }}>Sign here</span>
        </div>
      </div>
      <div className="tc-lp-sign mt-4" aria-hidden>
        <svg viewBox="0 0 150 40" fill="none">
          <path
            d="M6 28c8-14 14-22 18-20s-6 22 0 22 10-18 16-18-2 16 4 16 8-12 14-12 0 12 6 12 14-16 22-16-4 14 4 14 20-6 52-10"
            stroke="#00FCB8"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <p className="tc-mono mt-5 text-[10.5px] tracking-[0.14em]" style={{ color: "#64748B" }}>
        SIGNED ELECTRONICALLY · NO PRINTING
      </p>
    </div>
  );
}

/* asic 03: lodged and filed */
export function LodgedPanel() {
  return (
    <div className="tc-panel tc-sec-panel">
      <PanelHead left="ASIC LODGEMENT" right="ASIC AGENT 51843" />
      <div className="mt-6 flex items-center justify-between gap-4">
        <div>
          <p className="tc-display text-[1.5rem] text-white">Change to company details</p>
          <p className="mt-1 text-[13px]" style={{ color: "#94A3B8" }}>Form 484</p>
        </div>
        <span className="tc-lp-stamp" aria-hidden>LODGED</span>
      </div>
      <div className="mt-6">
        <div className="tc-lp-panel-row">
          <span>Notified within</span>
          <span>The 28-day window</span>
        </div>
        <div className="tc-lp-panel-row">
          <span>Filed to</span>
          <span>Your company vault</span>
        </div>
        <div className="tc-lp-panel-row">
          <span>Registers</span>
          <span>Updated</span>
        </div>
      </div>
    </div>
  );
}
