import Link from "next/link";
import InfoPage, { InfoSection, SectionHeading } from "@/components/taxflow/InfoPage";

/* ============================================================================
   APPROVED COPY — TaxFlowAI "Data Security Page" brief, 27 September 2026.
   The claims on this page are the brief's wording, used as written. Any
   rewording of the security claims must go back to TaxFlowAI for sign-off
   before publishing. Wording rules from the brief:
   - say "ISO 27001-aligned", never "certified" (no certification badges)
   - say "Hosted in AWS Sydney" / "Australian-hosted", never "all data is
     stored in Australia" as an absolute
   - say "TFNs and bank details are not stored in TaxFlowAI"
   - never "bank-level", "military-grade", "unhackable"
   - vendor names are "built on" references only, no implied endorsement
   ============================================================================ */

export const metadata = {
  title: "Data security",
  description:
    "How TaxFlowAI protects client data: hosted in AWS Sydney, encrypted in transit and at rest, two-factor authentication on every sign-in, TFNs and bank details not stored in the platform, and ISO 27001-aligned, independently audited practices.",
  alternates: { canonical: "/taxflow/security" },
  openGraph: {
    title: "Data security — TaxFlowAI",
    description:
      "Australian-hosted, encrypted end to end, two-factor authentication on every login, and ISO 27001-aligned practices.",
    url: "/taxflow/security",
  },
};

const TRUST = ["Australian-hosted", "Encrypted at rest", "2FA on every login", "ISO 27001-aligned"];

const ICON = {
  className: "h-6 w-6",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

const SECTIONS = [
  {
    id: "residency",
    label: "Australian data residency",
    title: "Hosted in Sydney, Australia.",
    body: "The TaxFlowAI platform and its database run in Amazon Web Services’ Sydney region (ap-southeast-2). Your records are stored and backed up on Australian soil, on infrastructure certified to ISO 27001, SOC 2 and IRAP-assessed standards.",
    icon: (
      <svg {...ICON}>
        <path d="M12 21s-7-5.2-7-11a7 7 0 0114 0c0 5.800-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    id: "encryption",
    label: "Encryption",
    title: "Encrypted in transit and at rest.",
    body: "Every connection uses TLS (HTTPS). Data at rest is encrypted on disk, backups are encrypted with managed keys, and integration credentials are additionally protected with AES-256 encryption inside the database itself.",
    icon: (
      <svg {...ICON}>
        <circle cx="8" cy="15" r="4" />
        <path d="M11 12l9-9M17 6l3 3M14 9l2 2" />
      </svg>
    ),
  },
  {
    id: "access",
    label: "Access & authentication",
    title: "Two-factor authentication on every sign-in.",
    body: "Every login — client or accountant — requires a password plus a one-time verification code. Client and staff portals are fully separated, access is role-based and least-privilege, and security events are audit-logged.",
    icon: (
      <svg {...ICON}>
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
        <path d="M10 9h4M10 12.5h4M11 18h2" />
      </svg>
    ),
  },
  {
    id: "minimisation",
    label: "Data minimisation",
    title: "We don’t store what we don’t need.",
    body: "Tax File Numbers and bank account details are not stored in TaxFlowAI. Sensitive identifiers stay in dedicated, purpose-built systems — so a breach of any one system can never expose them all.",
    icon: (
      <svg {...ICON}>
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12h8" />
      </svg>
    ),
  },
  {
    id: "resilience",
    label: "Resilience",
    title: "Backed up continuously.",
    body: "Our database replicates to encrypted Australian storage with roughly one second of maximum data loss, with versioned recovery points and a tested disaster recovery plan.",
    icon: (
      <svg {...ICON}>
        <path d="M20 11a8 8 0 00-14.900-3M4 13a8 8 0 0014.900 3" />
        <path d="M5 4v4h4M19 20v-4h-4" />
      </svg>
    ),
  },
];

const GOVERNANCE = {
  label: "Governance",
  title: "ISO 27001-aligned, independently audited.",
  body: "We operate a documented Information Security Management System — risk register, incident response, retention and vendor management — aligned to ISO/IEC 27001, and our application code undergoes independent security audits. We comply with the Privacy Act 1988 (Cth), including the Notifiable Data Breaches scheme.",
};

const FACTS = [
  ["Hosting", "Amazon Web Services, Sydney (ap-southeast-2)"],
  ["Encryption in transit", "TLS 1.2+ (HTTPS everywhere)"],
  ["Encryption at rest", "Encrypted storage and backups; AES-256 for stored credentials"],
  ["Authentication", "Password + one-time code (2FA) on every login; role-based access"],
  ["Backups", "Continuous replication (~1 second), encrypted, versioned, in Australia"],
  ["Sensitive identifiers", "TFNs and bank account details are not stored in the platform"],
  [
    "Governance",
    "ISO 27001-aligned ISMS; independent application security audits; Privacy Act 1988 & Notifiable Data Breaches compliance",
  ],
  ["E-signatures", "Annature — Australian, ISO 27001-certified provider"],
];

const BUILT_ON = ["Amazon Web Services", "Xero", "Stripe", "Microsoft"];

function Tick() {
  return (
    <svg className="h-3 w-3 shrink-0" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M1.5 6.5l3 3 6-7" stroke="#00FCB8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrustPanel() {
  return (
    <div className="tc-panel p-6 md:p-7">
      <p className="tc-mono text-[11px] tracking-[0.18em]" style={{ color: "#94A3B8" }}>
        AT A GLANCE
      </p>
      <ul className="mt-5 space-y-4">
        {TRUST.map((t) => (
          <li key={t} className="flex items-center gap-3 border-b pb-4 last:border-b-0 last:pb-0" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <span className="tc-sec-dot" aria-hidden />
            <span className="text-[16px] font-bold text-white">{t}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-[12.5px] leading-relaxed" style={{ color: "#64748B" }}>
        Security is a managed practice, not a promise.
      </p>
    </div>
  );
}

export default function SecurityPage() {
  return (
    <InfoPage
      crumbName="Data security"
      crumbHref="/taxflow/security"
      eyebrow="Data security"
      headline="Your data, secured the Australian way."
      intro="TaxFlowAI is built by a registered Australian tax agent with security practices aligned to ISO/IEC 27001 — Australian-hosted, encrypted end to end, and independently audited."
      panel={<TrustPanel />}
    >
      {/* five sections: residency, encryption, access, minimisation, resilience */}
      <InfoSection id="how">
        <SectionHeading
          eyebrow="How we protect your data"
          title="Five things that are always true"
          lead="Plain English, no scare tactics. Here is what protects your records every day."
        />
        <div className="tc-reveal mt-10 grid gap-4 md:grid-cols-2">
          {SECTIONS.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              className={`tc-int-card p-6 md:p-7 ${i === SECTIONS.length - 1 ? "md:col-span-2" : ""}`}
              style={{ scrollMarginTop: "120px" }}
            >
              <div className="flex items-center gap-3">
                <span className="tc-sec-icon">{s.icon}</span>
                <p className="tc-mono text-[11px] font-medium tracking-[0.18em]" style={{ color: "#00FCB8" }}>
                  {String(i + 1).padStart(2, "0")} · {s.label.toUpperCase()}
                </p>
              </div>
              <h2 className="mt-4 text-xl font-bold text-white md:text-[1.4rem]">{s.title}</h2>
              <p className="mt-2.5 max-w-3xl text-[14.5px] leading-relaxed" style={{ color: "#94A3B8" }}>
                {s.body}
              </p>
            </section>
          ))}
        </div>
      </InfoSection>

      {/* governance */}
      <InfoSection id="governance" alt>
        <div
          className="tc-reveal rounded-2xl border p-7 md:p-10"
          style={{ borderColor: "rgba(0,252,184,0.25)", background: "rgba(0,252,184,0.04)" }}
        >
          <p className="tc-eyebrow" style={{ color: "#00FCB8" }}>{GOVERNANCE.label}</p>
          <h2 className="tc-display mt-4 max-w-2xl text-3xl text-white md:text-4xl">{GOVERNANCE.title}</h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed" style={{ color: "#B7C4CF" }}>
            {GOVERNANCE.body}
          </p>
          <div className="mt-6">
            <Link href="/taxflow/privacy-policy" className="tc-link text-[14.5px] font-semibold">
              Read our Privacy Policy
            </Link>
          </div>
        </div>
      </InfoSection>

      {/* quick facts */}
      <InfoSection id="facts">
        <SectionHeading eyebrow="Quick facts" title="The details, for the detail-minded" />
        <dl className="tc-reveal tc-sec-facts mt-10">
          {FACTS.map(([k, v]) => (
            <div key={k}>
              <dt className="tc-mono">{k.toUpperCase()}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>

        <div className="tc-reveal mt-12">
          <p className="tc-mono text-[11px] tracking-[0.18em]" style={{ color: "#94A3B8" }}>
            BUILT ON
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {BUILT_ON.map((v) => (
              <span key={v} className="tc-chip tc-mono px-4 py-2.5 text-[12px] font-medium tracking-[0.06em] text-white/85">
                {v.toUpperCase()}
              </span>
            ))}
          </div>
          <p className="mt-3 text-[12px]" style={{ color: "#64748B" }}>
            Named as the platforms TaxFlowAI is built on. Their inclusion does not imply endorsement.
          </p>
        </div>
      </InfoSection>

      {/* contact + firm line */}
      <InfoSection id="contact" alt>
        <div className="tc-reveal max-w-3xl">
          <h2 className="tc-display text-3xl text-white md:text-4xl">
            Questions about our security practices?
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed" style={{ color: "#B7C4CF" }}>
            Contact{" "}
            <a href="mailto:hassan@taxflowai.com.au" className="tc-link">
              hassan@taxflowai.com.au
            </a>
            .
          </p>
        </div>
        <p
          className="tc-reveal tc-mono mt-12 border-t pt-6 text-[11.5px] leading-relaxed"
          style={{ borderColor: "rgba(255,255,255,0.08)", color: "#94A3B8" }}
        >
          TAX7 T04 PTY LTD trading as TaxFlowAI · ABN 73 680 225 512 · Registered Tax Agent 26313222
        </p>
      </InfoSection>
    </InfoPage>
  );
}
