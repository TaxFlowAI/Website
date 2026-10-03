import Link from "next/link";
import Image from "next/image";
import TaxFlowHeader from "@/components/taxflow/TaxFlowHeader";
import TaxFlowAppFooter from "@/components/taxflow/TaxFlowAppFooter";
import RevealInit from "@/components/taxflow/RevealInit";
import TaxFlowWave from "@/components/taxflow/TaxFlowWave";
import TaxFlowWaveLayers from "@/components/taxflow/TaxFlowWaveLayers";
import {
  ReceiptChatMock,
  UploadWizardMock,
  DeductionsMock,
  AccountsHomeMock,
  UploadsFoldersMock,
  JobTrackerMock,
  InvoiceListMock,
  SendSheetMock,
  InvoiceChatMock,
  FloHelpMock,
  RequestMeetingMock,
  CompanyRegoMock,
  LoanEnquiryMock,
} from "@/components/taxflow/PlatformMockups";
import { container, CtaBand } from "@/components/taxflow/TaxFlowShared";
import { ServiceHero, StatBand, Check, NAVY, DEEP } from "@/components/taxflow/ServiceLanding";

/* Features page, rewritten to the Oct 2026 portal brief. Rules that must hold:
   - no Document Vault, no "password-protected" folders, no investment properties
   - no exact tax due dates, countdowns or "overdue" for tax deadlines: estimated
     month plus a myGov / ATO Online Services link only
   - booking is "request a time", confirmed by the accountant; no live calendar
   - no card fee stated, and never "free" next to card payments
   - both credit disclosures, word for word, wherever loans are mentioned
   - no internal systems named beyond "Australian-hosted" */
export const metadata = {
  title: { absolute: "Features | TaxFlowAI — tax, receipts, quotes & invoices in one app" },
  description:
    "Flo files your receipts, your accountant does the tax, and your quotes, invoices and loan enquiries live in one Australian-hosted app.",
  alternates: { canonical: "/taxflow/features" },
  openGraph: {
    title: "TaxFlowAI features",
    description:
      "Flo files your receipts, your accountant handles the tax, and your quotes, invoices and loans sit in the same app.",
    url: "/taxflow/features",
  },
};

/* Fixed price for a new company registration, including GST and the ASIC fee. */
const COMPANY_REGISTRATION_PRICE = "$1,525";

const CREDIT_BROKING =
  "Frontline Financial Pty Ltd is an authorised credit representative (CRN: 575968) of Australian Credit Licence No. 389087, authorised to engage in credit activities.";
const CREDIT_ASSET =
  "Martyn Financial Pty Ltd t/a Frontline Financial: Asset Solutions is an authorised credit representative (CRN: 563350) of Australian Credit Licence No. 511803, authorised to engage in credit activities.";

function CreditDisclosures({ className = "" }) {
  return (
    <div className={className}>
      <p className="tc-lp-legal">
        {CREDIT_BROKING} Home loans, refinance, investment, construction, SMSF, commercial and debt
        consolidation. <Link href="/credit-guide" className="tc-link">Credit guide</Link> ·{" "}
        <Link href="/privacy-consent" className="tc-link">Privacy consent</Link>
      </p>
      <p className="tc-lp-legal">
        {CREDIT_ASSET} Car, commercial vehicle, equipment, personal, working capital and fleet.{" "}
        <Link href="/credit-guide-asset-solutions" className="tc-link">Credit guide</Link> ·{" "}
        <Link href="/privacy-consent-asset-solutions" className="tc-link">Privacy consent</Link>
      </p>
    </div>
  );
}

const CHAPTERS = [
  {
    id: "capture",
    title: "Capture",
    line: "Snap it. Flo files it.",
    lead: "No more shoeboxes or camera rolls. Take a photo and it lands in the right place.",
    features: [
      {
        id: "scanner",
        title: "Flo receipt scanner",
        body: "Snap or upload a receipt and Flo reads it. Flo asks only what it can't work out, then files it in the right account or job folder.",
        points: [
          "Camera, photo library or files. Any file type",
          "A PDF of the conversation is filed with it",
          "Big, simple buttons. No tech skills needed",
        ],
        panel: <ReceiptChatMock />,
      },
      {
        id: "upload",
        title: "Upload a document",
        body: "Three taps and it's done. Take a photo, pick from your library or choose a file, then pick the account.",
        points: ["Take a photo, photo library or choose a file", "Pick the account it belongs to"],
        panel: <UploadWizardMock />,
      },
      {
        id: "deductions",
        title: "Guided deduction pages, D1 to D9",
        body: "One guided page per deduction type, in plain English, with its own upload so receipts land in the right place first time.",
        points: [
          "D1 car logbook with your business-use percentage",
          "Travel, uniforms, self-education, working from home",
          "Flags the traps. Home to work is private, even on night shift",
        ],
        panel: <DeductionsMock />,
      },
    ],
  },
  {
    id: "organise",
    title: "Organise",
    line: "Everything in its place.",
    lead: "One login for every account you run, and a clear view of where each job is up to.",
    features: [
      {
        id: "accounts",
        title: "Your accounts on one home screen",
        body: "See your personal, sole trader, company, trust and partnership accounts together. Each one has its own page.",
        points: ["Overview, Deductions, Documents and Book on every account", "Switch accounts without switching apps"],
        panel: <AccountsHomeMock />,
      },
      {
        id: "uploads",
        title: "Client Uploads",
        body: "Every account has its own secure uploads folder, and every job gets its own folder too. Nothing ends up in the wrong place.",
        points: ["A folder for each account", "A folder for each job, like a tax return or BAS"],
        panel: <UploadsFoldersMock />,
      },
      {
        id: "jobs",
        title: "Job tracker",
        body: "Always know where a job is up to. Each one shows a simple five-step tracker and what we need from you next.",
        points: [
          "Estimated timing, shown as a month",
          "Check your exact dates on myGov, or ATO Online Services for a business",
        ],
        panel: <JobTrackerMock />,
      },
    ],
  },
  {
    id: "business",
    title: "Run your business",
    line: "Quotes and invoices, done from your phone.",
    lead: "Get quotes out and get paid without leaving the app. Switched on per business by your accountant.",
    image: "/images/taxflow/features-business.webp",
    imageAlt: "Flo in a tool belt beside a ute, tapping Pay now on an invoice as it flies off as a paper plane",
    features: [
      {
        id: "invoices",
        title: "Quotes and invoices",
        body: "Create a quote or invoice in seconds and see the real document as you build it.",
        points: [
          "Save your products and services",
          "GST set automatically",
          "Your logo and brand colours, picked from your logo",
        ],
        panel: <InvoiceListMock />,
      },
      {
        id: "send",
        title: "Sent from your own business address",
        body: "Every business gets its own address, like smith-plumbing@invoicemail.com.au. Emails go out automatically and replies come straight to you.",
        points: ["Email it for me, in one tap", "Or text the invoice link from your own phone"],
        panel: <SendSheetMock />,
      },
      {
        id: "flo-invoice",
        title: "Raise an invoice by chatting to Flo",
        body: "Tell Flo who to invoice and for what. Flo finds the customer, builds the invoice and shows you a summary.",
        points: ["Finds customers on the Australian Business Register", "Nothing is sent until you tap Confirm"],
        panel: <InvoiceChatMock />,
      },
    ],
    pair: [
      {
        id: "get-paid",
        title: "Get paid faster",
        body: "Customers accept quotes and pay invoices online with a Pay now button.",
        points: [
          "Card payments go straight into your own Stripe account",
          "Mark bank transfers paid in one tap",
          "Statuses at a glance: Sent, Viewed, Paid, Overdue, Expired, Accepted",
        ],
      },
      {
        id: "customers",
        title: "Customers",
        body: "Add a customer once and reuse them on every quote and invoice.",
        points: ["Add from your phone contacts", "Or look them up by ABN", "Address search built in"],
      },
    ],
  },
  {
    id: "help",
    title: "Get help",
    line: "A human when you need one.",
    lead: "Flo answers the everyday questions. Your accountant is there for everything else.",
    features: [
      {
        id: "flo",
        title: "Flo, your AI assistant",
        body: "Flo is on every page and knows your accounts and the page you're on. Flo organises. Your registered tax agent reviews and signs off.",
        points: ["Explains deductions in plain English", "Links to the right ATO page", "General information, not tax advice"],
        panel: <FloHelpMock />,
      },
      {
        id: "booking",
        title: "Request a meeting",
        body: "Pick how you'd like to meet and request a time. Your accountant confirms it.",
        points: ["Teams or phone", "In person at Parramatta or Clarence Street, Sydney"],
        panel: <RequestMeetingMock />,
      },
    ],
  },
  {
    id: "more",
    title: "More services",
    line: "A company, or a loan, from the same app.",
    lead: "The other jobs that come with running a business or a household, started from your portal.",
    features: [
      {
        id: "company",
        title: "Register a new company",
        body: `Apply online from your portal and track it through to ASIC registration. Fixed price ${COMPANY_REGISTRATION_PRICE}, including GST and the ASIC fee.`,
        points: [
          "Company name, directors, shareholders and registered office",
          "Lodged by Frontline Holdings Group, ASIC Agent 51843",
        ],
        panel: <CompanyRegoMock />,
      },
      {
        id: "loan",
        title: "Apply for a loan",
        body: "Choose what you're after, tell us roughly how much and when, and a Frontline Financial broker will reach out to discuss your loan.",
        points: [
          "Home, refinance, car, business, personal and more",
          "Enquiry only. It won't affect your credit score",
        ],
        panel: <LoanEnquiryMock />,
        legal: true,
      },
    ],
  },
];

const STATS = [
  { value: "9", label: "guided deduction pages, D1 to D9" },
  { value: "5", label: "entity types on one home screen" },
  { value: "1 tap", label: "to send an invoice or mark it paid" },
  { value: "AU", label: "Australian-hosted platform" },
];

function Feature({ f }) {
  return (
    <article
      id={f.id}
      className={`tc-lp-feature tc-reveal ${f.panel ? "" : "is-text"}`}
      style={{ scrollMarginTop: "120px" }}
    >
      <div>
        <h3 className="tc-display text-[1.5rem] text-white">{f.title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "#94A3B8" }}>
          {f.body}
        </p>
        <ul className="tc-lp-feature-points">
          {f.points.map((p) => (
            <li key={p}>
              <Check />
              {p}
            </li>
          ))}
        </ul>
        {f.legal && <CreditDisclosures className="mt-5" />}
      </div>
      {f.panel && <div className="min-w-0">{f.panel}</div>}
    </article>
  );
}

export default function FeaturesPage() {
  return (
    <div className="tc-page min-h-screen">
      <RevealInit />
      <TaxFlowHeader />

      <ServiceHero
        crumb={{ name: "Features", href: "/taxflow/features" }}
        eyebrow="The app"
        title="Your tax and your business,"
        accent="under control."
        lead="Flo files your receipts, your accountant handles the tax, and your quotes, invoices and loans sit in the same app."
        image="/images/taxflow/features-hero.webp"
        imageAlt="Flo holding a phone that connects to three cards: a ticked receipt, a paid invoice, and a house and car"
      />

      {/* chapter rail */}
      <TaxFlowWaveLayers from={NAVY} to={DEEP} />
      <section style={{ background: DEEP }}>
        <div className={`${container} pb-12 pt-2 md:pb-16`}>
          <ol className="tc-lp-rail is-five">
            {CHAPTERS.map((c, i) => (
              <li key={c.id}>
                <a href={`#${c.id}`}>
                  <span className="tc-mono tc-lp-rail-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="tc-lp-rail-title">{c.title}</span>
                  <span className="tc-lp-rail-sub">{c.line}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* chapters */}
      {CHAPTERS.map((c, i) => {
        const bg = i % 2 ? DEEP : NAVY;
        const prev = i === 0 ? DEEP : i % 2 ? NAVY : DEEP;
        return (
          <div key={c.id}>
            <TaxFlowWave from={prev} to={bg} />
            <section id={c.id} style={{ background: bg, scrollMarginTop: "110px" }}>
              <div className={`${container} tc-lp-chapter py-12 md:py-20`}>
                <div className="tc-lp-chapter-head tc-reveal">
                  <p className="tc-lp-chapter-num" aria-hidden>{String(i + 1).padStart(2, "0")}</p>
                  <p className="tc-eyebrow mt-5" style={{ color: "#00FCB8" }}>{c.title}</p>
                  <h2 className="tc-display mt-3 text-4xl text-white md:text-[2.6rem]">{c.line}</h2>
                  <p className="mt-4 max-w-sm text-[15px] leading-relaxed" style={{ color: "#94A3B8" }}>
                    {c.lead}
                  </p>
                  {c.image && (
                    <div className="tc-lp-frame-inner mt-6 border" style={{ borderColor: "rgba(0,252,184,0.25)" }}>
                      <Image src={c.image} alt={c.imageAlt} width={1672} height={941} sizes="(min-width: 1024px) 24rem, 92vw" />
                    </div>
                  )}
                </div>
                <div>
                  {c.features.map((f) => (
                    <Feature key={f.id} f={f} />
                  ))}
                  {c.pair && (
                    <div className="tc-lp-pair">
                      {c.pair.map((f) => (
                        <Feature key={f.id} f={f} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        );
      })}

      <StatBand stats={STATS} from={NAVY} to={DEEP} />

      {/* trust and compliance */}
      <section id="trust" style={{ background: DEEP, scrollMarginTop: "110px" }}>
        <div className={`${container} py-12 md:py-16`}>
          <div className="tc-reveal max-w-2xl">
            <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>Trust and compliance</p>
            <h2 className="tc-display mt-4 text-4xl text-white md:text-5xl">Who stands behind it.</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Link href="/taxflow/tax-preparation" className="tc-bento tc-reveal block">
              <span className="tc-lp-code tc-mono">REGISTERED TAX AGENT 26313222</span>
              <h3 className="tc-bento-title mt-4">The tax is done by people.</h3>
              <p className="tc-bento-body">
                Returns are prepared and lodged by TAX7 T04 PTY LTD trading as TaxFlowAI.
              </p>
            </Link>
            <Link href="/taxflow/corporate-secretarial" className="tc-bento tc-reveal block">
              <span className="tc-lp-code tc-mono">ASIC AGENT 51843</span>
              <h3 className="tc-bento-title mt-4">Company paperwork too.</h3>
              <p className="tc-bento-body">
                ASIC lodgements are made by Frontline Holdings Group Pty Ltd.
              </p>
            </Link>
            <Link href="/taxflow/security" className="tc-bento tc-bento-accent tc-reveal block">
              <span className="tc-lp-code tc-mono">ISO 27001-ALIGNED</span>
              <h3 className="tc-bento-title mt-4">Secured the Australian way.</h3>
              <p className="tc-bento-body">
                Australian-hosted platform, encryption and two-factor sign-in. Nothing is sent on your
                behalf without your confirmation.
              </p>
            </Link>
          </div>
          <div className="tc-reveal mt-8 max-w-4xl border-t pt-5" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <p className="tc-mono mb-2 text-[10.5px] tracking-[0.16em]" style={{ color: "#94A3B8" }}>CREDIT SERVICES</p>
            <CreditDisclosures />
          </div>
        </div>
      </section>

      <TaxFlowWave from={DEEP} to={NAVY} />
      <CtaBand title="Your tax and your business, under control." />
      <TaxFlowAppFooter />
    </div>
  );
}
