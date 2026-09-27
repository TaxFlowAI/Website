import Link from "next/link";
import Image from "next/image";
import TaxFlowHeader from "@/components/taxflow/TaxFlowHeader";
import TaxFlowAppFooter from "@/components/taxflow/TaxFlowAppFooter";
import RevealInit from "@/components/taxflow/RevealInit";
import TaxFlowWave from "@/components/taxflow/TaxFlowWave";
import TaxFlowWaveLayers from "@/components/taxflow/TaxFlowWaveLayers";
import { RegionPanel, TwoFactorPanel, ReplicationPanel } from "@/components/taxflow/SecurityMockups";
import { container, CtaBand, Breadcrumbs } from "@/components/taxflow/TaxFlowShared";

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

const NAVY = "#0A1628";
const DEEP = "#060D1A";
const BAND = "#0E2238";

const TRUST = ["Australian-hosted", "Encrypted at rest", "2FA on every login", "ISO 27001-aligned"];

function Art({ src, alt }) {
  return (
    <div className="tc-flo-stage relative mx-auto w-full max-w-[22rem]">
      <div className="tc-flo-glow" aria-hidden />
      <Image
        src={src}
        alt={alt}
        width={1254}
        height={1254}
        sizes="(min-width: 1024px) 22rem, 80vw"
        className="relative z-10 h-auto w-full"
      />
    </div>
  );
}

const STORY = [
  {
    id: "residency",
    label: "Australian data residency",
    title: "Hosted in Sydney, Australia.",
    body: "The TaxFlowAI platform and its database run in Amazon Web Services’ Sydney region (ap-southeast-2). Your records are stored and backed up on Australian soil, on infrastructure certified to ISO 27001, SOC 2 and IRAP-assessed standards.",
    visual: <RegionPanel />,
  },
  {
    id: "encryption",
    label: "Encryption",
    title: "Encrypted in transit and at rest.",
    body: "Every connection uses TLS (HTTPS). Data at rest is encrypted on disk, backups are encrypted with managed keys, and integration credentials are additionally protected with AES-256 encryption inside the database itself.",
    visual: (
      <Art
        src="/images/taxflow/sec-encryption.webp"
        alt="Flo guiding a document through a glowing tunnel between a laptop and a server, scrambled in transit"
      />
    ),
  },
  {
    id: "access",
    label: "Access & authentication",
    title: "Two-factor authentication on every sign-in.",
    body: "Every login — client or accountant — requires a password plus a one-time verification code. Client and staff portals are fully separated, access is role-based and least-privilege, and security events are audit-logged.",
    visual: <TwoFactorPanel />,
  },
  {
    id: "minimisation",
    label: "Data minimisation",
    title: "We don’t store what we don’t need.",
    body: "Tax File Numbers and bank account details are not stored in TaxFlowAI. Sensitive identifiers stay in dedicated, purpose-built systems — so a breach of any one system can never expose them all.",
    visual: (
      <Art
        src="/images/taxflow/sec-minimisation-v2.webp"
        alt="Flo beside a tidy filing drawer, waving away a redacted card toward a separate sealed capsule"
      />
    ),
  },
  {
    id: "resilience",
    label: "Resilience",
    title: "Backed up continuously.",
    body: "Our database replicates to encrypted Australian storage with roughly one second of maximum data loss, with versioned recovery points and a tested disaster recovery plan.",
    visual: <ReplicationPanel />,
  },
];

/* headline numbers, each taken from the brief's quick facts */
const STATS = [
  { value: "~1s", label: "maximum data loss, with continuous replication" },
  { value: "2", label: "factors on every login: password plus one-time code" },
  { value: "AES-256", label: "encryption for stored integration credentials" },
  { value: "TLS 1.2+", label: "on every connection, HTTPS everywhere" },
];

const ISMS = ["Risk register", "Incident response", "Retention", "Vendor management"];

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

export default function SecurityPage() {
  return (
    <div className="tc-page min-h-screen">
      <RevealInit />
      <TaxFlowHeader />

      {/* ============ HERO ============ */}
      <section className="tc-hero-flo relative overflow-hidden">
        <Breadcrumbs items={[{ name: "Data security", href: "/taxflow/security" }]} />
        <div className={`${container} grid items-center gap-10 pb-14 pt-8 md:pb-20 md:pt-12 lg:grid-cols-12 lg:gap-8`}>
          <div className="order-2 lg:order-1 lg:col-span-6">
            <p className="tc-eyebrow" style={{ color: "#00FCB8" }}>Data security</p>
            <h1 className="tc-display mt-5 text-[2.6rem] text-white md:text-6xl lg:text-[4.2rem]">
              Your data, secured{" "}
              <span className="tc-hero-accent">the Australian way.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: "#B7C4CF" }}>
              TaxFlowAI is built by a registered Australian tax agent with security
              practices aligned to ISO/IEC 27001 — Australian-hosted, encrypted end to
              end, and independently audited.
            </p>
            <a href="#residency" className="tc-link mt-8 inline-block text-[15px] font-semibold">
              See how it works
            </a>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-6">
            <div className="tc-flo-stage relative mx-auto w-full max-w-[30rem]">
              <div className="tc-flo-glow" aria-hidden />
              <Image
                src="/images/taxflow/sec-australia.webp"
                alt="Flo pointing to a glowing map of Australia with a pulsing node on Sydney"
                width={1254}
                height={1254}
                priority
                sizes="(min-width: 1024px) 30rem, 90vw"
                className="float-animate relative z-10 h-auto w-full"
              />
            </div>
            <p className="tc-mono mt-2 text-center text-[11px] tracking-[0.18em]" style={{ color: "#94A3B8" }}>
              AWS SYDNEY · AP-SOUTHEAST-2
            </p>
          </div>
        </div>
      </section>

      {/* ============ TRUST STRIP ============ */}
      <TaxFlowWaveLayers from={NAVY} to={DEEP} />
      <section style={{ background: DEEP }}>
        <ul className={`${container} tc-sec-strip pb-10 pt-2 md:pb-14`}>
          {TRUST.map((t) => (
            <li key={t}>
              <span className="tc-sec-dot" aria-hidden />
              {t}
            </li>
          ))}
        </ul>
      </section>
      <TaxFlowWave from={DEEP} to={NAVY} />

      {/* ============ THE STORY: five stations on the current ============ */}
      <section style={{ background: NAVY }}>
        <div className={`${container} pb-10 pt-14 md:pb-16 md:pt-20`}>
          <div className="tc-reveal max-w-2xl">
            <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>How we protect your data</p>
            <h2 className="tc-display mt-4 text-4xl text-white md:text-5xl">
              Follow your data, start to finish
            </h2>
          </div>

          <div className="tc-story tc-observe mt-6 md:mt-10">
            <div className="tc-story-line tc-spine tc-grad-line-v" aria-hidden />
            {STORY.map((s, i) => (
              <article
                key={s.id}
                id={s.id}
                className={`tc-story-row ${i % 2 ? "is-flipped" : ""}`}
                style={{ scrollMarginTop: "120px" }}
              >
                <div className="tc-story-visual tc-reveal">{s.visual}</div>
                <div className="tc-story-node" aria-hidden>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="tc-story-text tc-reveal">
                  <p className="tc-mono text-[11px] font-medium tracking-[0.18em]" style={{ color: "#00FCB8" }}>
                    <span className="lg:hidden">{String(i + 1).padStart(2, "0")} · </span>
                    {s.label.toUpperCase()}
                  </p>
                  <h3 className="tc-display mt-3 text-[1.9rem] text-white md:text-[2.3rem]">{s.title}</h3>
                  <p className="mt-4 max-w-lg text-[15px] leading-relaxed" style={{ color: "#94A3B8" }}>
                    {s.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STAT BAND ============ */}
      <TaxFlowWave from={NAVY} to={BAND} />
      <section style={{ background: `linear-gradient(180deg, ${BAND} 0%, #16334B 50%, ${BAND} 100%)` }}>
        <div className={`${container} py-12 md:py-16`}>
          <dl className="tc-reveal grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.value}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="tc-display tc-hero-accent block text-5xl md:text-6xl">{s.value}</span>
                  <span className="mt-3 block max-w-[15rem] text-[13.5px] leading-relaxed" style={{ color: "#B7C4CF" }}>
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <TaxFlowWave from={BAND} to={DEEP} />

      {/* ============ GOVERNANCE ============ */}
      <section id="governance" className="tc-depth-teal" style={{ scrollMarginTop: "110px" }}>
        <div className={`${container} grid items-center gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-8`}>
          <div className="tc-reveal lg:col-span-5">
            <Art
              src="/images/taxflow/sec-governance-v2.webp"
              alt="Flo in glasses checking a binder with a magnifying glass, holding a ticked checklist"
            />
          </div>
          <div className="tc-reveal lg:col-span-7">
            <p className="tc-eyebrow" style={{ color: "#00FCB8" }}>Governance</p>
            <h2 className="tc-display mt-4 text-4xl text-white md:text-5xl">
              ISO 27001-aligned, independently audited.
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed" style={{ color: "#B7C4CF" }}>
              We operate a documented Information Security Management System — risk
              register, incident response, retention and vendor management — aligned to
              ISO/IEC 27001, and our application code undergoes independent security
              audits. We comply with the Privacy Act 1988 (Cth), including the
              Notifiable Data Breaches scheme.
            </p>
            <ul className="mt-7 grid max-w-xl gap-3 sm:grid-cols-2">
              {ISMS.map((item) => (
                <li key={item} className="tc-int-card flex items-center gap-3 px-4 py-3 text-[14px] font-semibold text-white">
                  <svg className="h-3 w-3 shrink-0" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M1.5 6.5l3 3 6-7" stroke="#00FCB8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/taxflow/privacy-policy" className="tc-link mt-7 inline-block text-[14.5px] font-semibold">
              Read our Privacy Policy
            </Link>
          </div>
        </div>
      </section>

      {/* ============ SPEC SHEET ============ */}
      <TaxFlowWave from={DEEP} to={NAVY} />
      <section id="facts" style={{ background: NAVY, scrollMarginTop: "110px" }}>
        <div className={`${container} py-12 md:py-16`}>
          <details className="tc-sec-spec tc-reveal">
            <summary>
              <span>
                <span className="tc-eyebrow block" style={{ color: "#39B2B2" }}>Quick facts</span>
                <span className="tc-display mt-2 block text-2xl text-white md:text-3xl">
                  The spec sheet, for the detail-minded
                </span>
              </span>
            </summary>
            <dl className="tc-sec-facts mt-6">
              {FACTS.map(([k, v]) => (
                <div key={k}>
                  <dt className="tc-mono">{k.toUpperCase()}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </details>

          <div className="tc-reveal mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="tc-mono text-[11px] tracking-[0.18em]" style={{ color: "#94A3B8" }}>BUILT ON</p>
            {BUILT_ON.map((v) => (
              <span key={v} className="tc-mono text-[12.5px] font-medium tracking-[0.08em] text-white/70">
                {v.toUpperCase()}
              </span>
            ))}
          </div>
          <p className="mt-3 text-[12px]" style={{ color: "#64748B" }}>
            Named as the platforms TaxFlowAI is built on. Their inclusion does not imply endorsement.
          </p>
        </div>
      </section>

      {/* ============ CLOSING ============ */}
      <TaxFlowWaveLayers from={NAVY} to={DEEP} />
      <section id="contact" style={{ background: DEEP }}>
        <div className={`${container} grid items-center gap-8 pb-14 pt-4 md:pb-20 lg:grid-cols-12`}>
          <div className="tc-reveal lg:col-span-4">
            <div className="tc-flo-stage relative mx-auto w-56 sm:w-64 lg:w-72">
              <div className="tc-flo-glow" aria-hidden />
              <Image
                src="/images/taxflow/sec-guardian-v2.webp"
                alt="Flo holding a shield with a glowing tick, waving"
                width={1254}
                height={1254}
                sizes="18rem"
                className="float-animate relative z-10 h-auto w-full"
              />
            </div>
          </div>
          <div className="tc-reveal lg:col-span-8">
            <h2 className="tc-display text-4xl text-white md:text-5xl">
              Questions about our security practices?
            </h2>
            <p className="mt-5 text-lg leading-relaxed" style={{ color: "#B7C4CF" }}>
              Contact{" "}
              <a href="mailto:hassan@taxflowai.com.au" className="tc-link">
                hassan@taxflowai.com.au
              </a>
              .
            </p>
            <p
              className="tc-mono mt-10 border-t pt-6 text-[11.5px] leading-relaxed"
              style={{ borderColor: "rgba(255,255,255,0.08)", color: "#94A3B8" }}
            >
              TAX7 T04 PTY LTD trading as TaxFlowAI · ABN 73 680 225 512 · Registered Tax Agent 26313222
            </p>
          </div>
        </div>
      </section>

      <TaxFlowWave from={DEEP} to={NAVY} />
      <CtaBand />
      <TaxFlowAppFooter />
    </div>
  );
}
