/* Phone-sized mock-ups for /taxflow/features. They illustrate what the client
   portal does today (brief of Oct 2026): no document vault, no exact due dates
   or "overdue" for tax deadlines, no investment properties, no live calendar.
   Each one is a single labelled image for screen readers. Names and amounts
   are made-up demo data. */

const MUTED = "#94A3B8";
const AQUA = "#00FCB8";

function Phone({ label, title, right, children }) {
  return (
    <div className="tc-ph" role="img" aria-label={label}>
      <div className="tc-ph-screen">
        <div className="tc-ph-bar">
          <span className="tc-mono">{title}</span>
          {right && <span className="tc-mono" style={{ color: AQUA }}>{right}</span>}
        </div>
        {children}
      </div>
    </div>
  );
}

function Flo({ children }) {
  return (
    <div className="tc-ph-bubble">
      <p className="tc-mono mb-1 text-[10px] tracking-[0.14em]" style={{ color: AQUA }}>FLO</p>
      {children}
    </div>
  );
}

function Me({ children }) {
  return <div className="tc-ph-bubble is-me">{children}</div>;
}

function Row({ left, sub, right, tone }) {
  return (
    <div className={`tc-ph-row ${tone ? `is-${tone}` : ""}`}>
      <span className="min-w-0">
        <span className="block truncate text-[13px] font-semibold text-white">{left}</span>
        {sub && <span className="block truncate text-[11.5px]" style={{ color: MUTED }}>{sub}</span>}
      </span>
      {right && <span className="tc-mono tc-ph-status">{right}</span>}
    </div>
  );
}

/* 01a: Flo receipt scanner, as a chat */
export function ReceiptChatMock() {
  return (
    <Phone
      title="FLO · RECEIPTS"
      label="Flo chat: Corner Grocer, $84.20, looks like groceries so personal. Which account is it for? Buttons: Personal, Test Widgets Pty Ltd, Not sure."
    >
      <div className="tc-ph-receipt">
        <span className="tc-mono">RECEIPT.JPG</span>
        <span className="tc-mono" style={{ color: AQUA }}>READ</span>
      </div>
      <Flo>
        Corner Grocer, $84.20. Looks like groceries, so personal. Which account is it for?
      </Flo>
      <div className="mt-3 grid gap-2">
        <span className="tc-ph-btn is-go">Personal</span>
        <span className="tc-ph-btn">Test Widgets Pty Ltd</span>
        <span className="tc-ph-btn">Not sure</span>
      </div>
    </Phone>
  );
}

/* 01b: upload a document wizard */
export function UploadWizardMock() {
  return (
    <Phone
      title="UPLOAD A DOCUMENT"
      right="STEP 1 OF 2"
      label="Upload a document: choose Take a photo, Photo library or Choose a file, then pick the account."
    >
      <div className="grid gap-2">
        <span className="tc-ph-btn is-go">Take a photo</span>
        <span className="tc-ph-btn">Photo library</span>
        <span className="tc-ph-btn">Choose a file</span>
      </div>
      <p className="mt-4 text-[12px]" style={{ color: MUTED }}>Next: pick the account it belongs to.</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <span className="tc-ph-chip">Personal</span>
        <span className="tc-ph-chip">Test Widgets Pty Ltd</span>
      </div>
    </Phone>
  );
}

/* 01c: guided deduction pages */
export function DeductionsMock() {
  const rows = [
    ["D1", "Car: logbook", "68% business use"],
    ["D2", "Travel diary", null],
    ["D3", "Uniforms and laundry", null],
    ["D4", "Self-education", null],
    ["D5", "Working from home", null],
    ["D9", "Gifts and donations", null],
  ];
  return (
    <Phone
      title="DEDUCTIONS"
      right="D1–D9"
      label="Guided deduction pages D1 to D9, with the D1 car logbook at 68 percent business use and a warning that home to work travel is private."
    >
      {rows.map(([code, name, meta]) => (
        <div key={code} className="tc-ph-row">
          <span className="flex min-w-0 items-center gap-2.5">
            <span className="tc-mono text-[12px] font-semibold" style={{ color: AQUA }}>{code}</span>
            <span className="truncate text-[13px] text-white">{name}</span>
          </span>
          {meta && <span className="tc-mono tc-ph-status">{meta.toUpperCase()}</span>}
        </div>
      ))}
      <p className="mt-3 text-[12px] leading-relaxed" style={{ color: MUTED }}>
        <span className="tc-mono font-medium" style={{ color: "#F59E0B" }}>TRAP</span> Home to work is
        private, even on night shift.
      </p>
    </Phone>
  );
}

/* 02b: client uploads, a folder per account and per job */
export function UploadsFoldersMock() {
  return (
    <Phone
      title="CLIENT UPLOADS"
      label="Client Uploads folders: one for each account, and inside the company a folder for each job such as the tax return and the BAS."
    >
      <Row left="Personal" sub="12 files" />
      <Row left="Test Widgets Pty Ltd" sub="Company" right="OPEN" />
      <div className="tc-ph-nest">
        <Row left="Tax return FY2025" sub="Job folder · 9 files" />
        <Row left="BAS Q2 FY2026" sub="Job folder · 4 files" />
      </div>
      <Row left="Smith Family Trust" sub="3 files" />
    </Phone>
  );
}

/* 04a: Flo on every page */
export function FloHelpMock() {
  return (
    <Phone
      title="FLO · ASSISTANT"
      label="Chat with Flo: you ask why a receipt was filed under D5 and not D4. Flo explains that D4 covers self-education and stationery for general work use falls under D5."
    >
      <Me>Why D5 and not D4?</Me>
      <Flo>
        D4 covers self-education. Stationery for general work use falls under D5. Want me
        to change it?
      </Flo>
      <p className="mt-3 text-[11.5px]" style={{ color: MUTED }}>General information, not tax advice.</p>
    </Phone>
  );
}

/* 04b: request a meeting, confirmed by the accountant */
export function RequestMeetingMock() {
  return (
    <Phone
      title="REQUEST A TIME"
      label="Request a meeting: choose Teams, phone or in person at Parramatta or Clarence Street Sydney, then your accountant confirms."
    >
      <div className="grid gap-2">
        <span className="tc-ph-btn is-on">Teams</span>
        <span className="tc-ph-btn">Phone</span>
        <span className="tc-ph-btn">In person</span>
      </div>
      <p className="mt-3 text-[11.5px]" style={{ color: MUTED }}>Parramatta or Clarence Street, Sydney</p>
      <span className="tc-ph-btn is-go mt-3">Request a time</span>
      <p className="mt-3 text-[11.5px]" style={{ color: MUTED }}>Your accountant confirms the time.</p>
    </Phone>
  );
}

/* 05a: register a new company */
export function CompanyRegoMock() {
  return (
    <Phone
      title="REGISTER A COMPANY"
      right="STEP 3 OF 4"
      label="Company registration application: company name and directors complete, shareholders in progress, registered office to come, then lodged with ASIC."
    >
      <Row left="Company name" right="DONE" tone="ok" />
      <Row left="Directors" right="DONE" tone="ok" />
      <Row left="Shareholders" right="NOW" tone="info" />
      <Row left="Registered office" tone="muted" />
      <div className="tc-ph-est mt-4">
        <span className="tc-mono">NEXT</span>
        <span className="text-[13px] font-bold text-white">Lodged with ASIC</span>
      </div>
    </Phone>
  );
}
