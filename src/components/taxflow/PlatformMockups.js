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
      label="Flo chat: Woolworths, $84.20, looks like groceries so personal. Which account is it for? Buttons: Personal, Test Widgets Pty Ltd, Not sure."
    >
      <div className="tc-ph-receipt">
        <span className="tc-mono">RECEIPT.JPG</span>
        <span className="tc-mono" style={{ color: AQUA }}>READ</span>
      </div>
      <Flo>
        Woolworths, $84.20. Looks like groceries, so personal. Which account is it for?
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

/* 02a: accounts on one home screen */
export function AccountsHomeMock() {
  return (
    <Phone
      title="YOUR ACCOUNTS"
      label="Home screen listing a personal account, a sole trader, a company and a trust, each with Overview, Deductions, Documents and Book tabs."
    >
      <Row left="Alex Smith" sub="Personal" right="OPEN" />
      <Row left="Smith Plumbing" sub="Sole trader" />
      <Row left="Test Widgets Pty Ltd" sub="Company" />
      <Row left="Smith Family Trust" sub="Trust" />
      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="tc-ph-chip is-on">Overview</span>
        <span className="tc-ph-chip">Deductions</span>
        <span className="tc-ph-chip">Documents</span>
        <span className="tc-ph-chip">Book</span>
      </div>
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

/* 02c: job tracker with estimated timing only */
export function JobTrackerMock() {
  return (
    <Phone
      title="TAX RETURN FY2025"
      right="STEP 3 OF 5"
      label="Job tracker for a tax return at step 3 of 5, showing what is needed from you next, an estimated month of October 2026 and a button to check exact dates on myGov."
    >
      <div className="tc-ph-steps" aria-hidden>
        <i className="is-done" />
        <i className="is-done" />
        <i className="is-now" />
        <i />
        <i />
      </div>
      <p className="tc-mono mt-4 text-[10px] tracking-[0.14em]" style={{ color: MUTED }}>WHAT WE NEED FROM YOU NEXT</p>
      <p className="mt-1 text-[13px] font-semibold text-white">Upload your private health statement</p>
      <div className="tc-ph-est mt-4">
        <span className="tc-mono">ESTIMATED</span>
        <span className="text-[14px] font-bold text-white">Oct 2026</span>
      </div>
      <span className="tc-ph-btn mt-3">Check your exact dates on myGov</span>
    </Phone>
  );
}

/* 03a: quotes and invoices list with status edges */
export function InvoiceListMock() {
  return (
    <Phone
      title="QUOTES & INVOICES"
      right="+ NEW"
      label="Quotes and invoices list with statuses: an invoice paid, an invoice viewed, a quote accepted and an invoice sent."
    >
      <Row left="INV-0042 · J. Nguyen" sub="$1,210.00" right="PAID" tone="ok" />
      <Row left="INV-0043 · Harbour Cafe" sub="$484.00" right="VIEWED" tone="info" />
      <Row left="QUO-0017 · L. Patel" sub="$3,300.00" right="ACCEPTED" tone="ok" />
      <Row left="INV-0044 · Coastal Build" sub="$935.00" right="SENT" tone="muted" />
    </Phone>
  );
}

/* 03c: the send sheet */
export function SendSheetMock() {
  return (
    <Phone
      title="SEND INVOICE"
      label="Send sheet with two choices: Email it for me, sent from smith-plumbing@invoicemail.com.au, or Text it from your own phone."
    >
      <p className="text-[13px] font-semibold text-white">INV-0044 · Coastal Build</p>
      <p className="text-[11.5px]" style={{ color: MUTED }}>$935.00 including GST</p>
      <div className="mt-4 grid gap-2">
        <span className="tc-ph-btn is-go">Email it for me</span>
        <span className="tc-ph-btn">Text it</span>
      </div>
      <p className="tc-mono mt-4 text-[10px] tracking-[0.12em]" style={{ color: MUTED }}>SENT FROM</p>
      <p className="mt-1 break-all text-[12.5px] text-white">smith-plumbing@invoicemail.com.au</p>
    </Phone>
  );
}

/* 03d: raise an invoice by chatting to Flo */
export function InvoiceChatMock() {
  return (
    <Phone
      title="FLO · INVOICES"
      label="Chat with Flo: you ask to invoice Woolworths for 3 hours at $95. Flo shows a summary to Woolworths Group Limited, by text, total $313.50, with a Confirm button."
    >
      <Me>Invoice Woolworths for 3 hours at $95.</Me>
      <Flo>
        Send this invoice?
        <span className="tc-ph-card mt-2 block">
          <span className="block text-[12px] font-bold text-white">To WOOLWORTHS GROUP LIMITED</span>
          <span className="block text-[11.5px]" style={{ color: MUTED }}>Text it · 3 hrs at $95 plus GST</span>
          <span className="mt-1 block text-[14px] font-bold" style={{ color: AQUA }}>Total $313.50</span>
        </span>
      </Flo>
      <span className="tc-ph-btn is-go mt-3">Confirm</span>
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
        D4 covers self-education. Officeworks stationery for general work use falls under D5. Want me
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

/* 05b: loan enquiry */
export function LoanEnquiryMock() {
  return (
    <Phone
      title="APPLY FOR A LOAN"
      label="Loan enquiry: choose home, refinance, car, business, personal or more, say roughly how much and when, and a broker will reach out."
    >
      <p className="text-[12px]" style={{ color: MUTED }}>What are you after?</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <span className="tc-ph-chip is-on">Home</span>
        <span className="tc-ph-chip">Refinance</span>
        <span className="tc-ph-chip">Car</span>
        <span className="tc-ph-chip">Business</span>
        <span className="tc-ph-chip">Personal</span>
        <span className="tc-ph-chip">More</span>
      </div>
      <Row left="Roughly how much?" right="$650,000" />
      <Row left="When?" right="3 MONTHS" />
      <span className="tc-ph-btn is-go mt-3">Send enquiry</span>
      <p className="mt-3 text-[11.5px]" style={{ color: MUTED }}>A broker will reach out to discuss your loan.</p>
    </Phone>
  );
}
