import Link from "next/link";
import { GOOGLE_REVIEWS, TAX_AGENTS, PROOF_STATS } from "@/data/taxflow-proof";

export const TAXFLOW_SIGNIN_URL = "https://taxflowai.frontline.financial/login";
export const CALENDLY_URL = "https://calendly.com/taxflowai/discovery-call";

export const container = "mx-auto max-w-6xl px-5 md:px-8";

/* ---------- closing CTA band (every page) ---------- */
export function CtaBand() {
  return (
    <section className="tc-depth-blue border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
      <div className={`${container} py-16 md:py-24`}>
        <div className="max-w-2xl">
          <div className="tc-grad-line-h tc-glow-line h-[2px] w-16 rounded-full" aria-hidden />
          <h2 className="tc-display mt-7 text-4xl text-white md:text-5xl">
            Your tax, under control.
          </h2>
          <p className="mt-5 max-w-lg text-lg" style={{ color: "#B7C4CF" }}>
            Always know what&apos;s happening. Stay organised. Reach your accountant.
            Start today — free to get started.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href={TAXFLOW_SIGNIN_URL} className="tc-btn-primary rounded-lg px-7 py-3.5 text-[15px] font-bold">
              Get started
            </a>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="tc-btn-ghost rounded-lg px-7 py-3.5 text-[15px] font-semibold"
            >
              Book a free 30-min call
            </a>
          </div>
          <p className="mt-4 text-[13.5px]" style={{ color: "#94A3B8" }}>
            Not ready to sign up?{" "}
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="tc-link">
              Talk to a real tax agent first
            </a>{" "}
            — free, no obligation.
          </p>
          <p className="tc-mono mt-4 text-[11.5px]" style={{ color: "#94A3B8" }}>
            FREE TO SIGN UP · NO CARD · NO SUBSCRIPTION · YOU APPROVE EVERY QUOTE
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- breadcrumbs (non-home pages) + BreadcrumbList schema ---------- */
export function Breadcrumbs({ items }) {
  const trail = [{ name: "TaxFlowAI", href: "/taxflow" }, ...items];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `https://frontline.financial${it.href}`,
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className={`${container} pt-6`}>
      <ol className="tc-crumbs flex flex-wrap items-center gap-2">
        {trail.map((it, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={it.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page">{it.name}</span>
              ) : (
                <Link href={it.href}>{it.name}</Link>
              )}
              {!last && <span aria-hidden>/</span>}
            </li>
          );
        })}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </nav>
  );
}

/* ---------- how fees work — quote-first model ---------- */
const FEE_STEPS = [
  {
    label: "01",
    title: "Sign up free",
    desc: "No card, no subscription, no upfront cost. Your account, receipts, Flo and deadline tracking cost nothing.",
  },
  {
    label: "02",
    title: "Get a quote for exactly what you need",
    desc: "A Registered Tax Agent reviews your situation and sends you a quote for the specific service you require — nothing more.",
  },
  {
    label: "03",
    title: "Nothing proceeds until you accept",
    desc: "No obligation, no surprise bills. You approve the price before any work starts.",
  },
];

export function FeesSection({ expanded = false }) {
  return (
    <section
      id="fees"
      className="border-t"
      style={{ background: "#0A1628", borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div className={`${container} py-16 md:py-24`}>
        <div className="max-w-xl">
          <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>How fees work</p>
          <h2 className="tc-display mt-4 text-4xl text-white md:text-5xl">
            You approve the price before any work starts
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "#94A3B8" }}>
            No subscriptions. No upfront charges. No surprises. Just a clear quote for
            the exact service you need — that you choose to accept, or not.
          </p>
        </div>
        <div className="tc-observe relative mt-14 max-w-2xl">
          <div className="tc-spine tc-grad-line-v absolute bottom-3 left-[5px] top-3 w-[2px]" aria-hidden />
          <ol className="space-y-10">
            {FEE_STEPS.map((step) => (
              <li key={step.label} className="tc-reveal relative grid grid-cols-[13px_1fr] gap-x-6">
                <span className="tc-node mt-1.5" aria-hidden />
                <div>
                  <p className="tc-mono text-[11px] font-medium tracking-[0.18em]" style={{ color: "#00FCB8" }}>
                    {step.label}
                  </p>
                  <h3 className="mt-1.5 text-[19px] font-bold text-white">{step.title}</h3>
                  <p className="mt-1.5 max-w-lg text-[14.5px] leading-relaxed" style={{ color: "#94A3B8" }}>
                    {step.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        {expanded && (
          <div className="tc-reveal mt-12 max-w-2xl rounded-xl border p-6" style={{ borderColor: "rgba(255,255,255,0.08)", background: "#0F1729" }}>
            <h3 className="text-[16px] font-bold text-white">Why we work this way</h3>
            <p className="mt-2 text-[14px] leading-relaxed" style={{ color: "#94A3B8" }}>
              Tax needs vary — a simple individual return and a company with a trust
              behind it are different jobs. A quote for your actual situation is fairer
              than a one-size-fits-all subscription you may not use. And because you see
              the price first, the decision is always yours.
            </p>
          </div>
        )}
        <p className="mt-8 text-[12px]" style={{ color: "#64748B" }}>
          Fees are confirmed in your engagement letter and quote.
        </p>
      </div>
    </section>
  );
}

/* ---------- integrations — "plays well with the tools you trust" ---------- */
const INTEGRATIONS = [
  {
    name: "Dropbox",
    line: "Your documents live in your own secure Dropbox folder — organised, backed up, and always yours.",
  },
  {
    name: "Xero",
    line: "Works natively with Xero and Xero Practice Manager so your books and your tax return stay in sync.",
  },
  {
    name: "Calendly",
    line: "Real-time accountant availability — book a meeting in two clicks.",
  },
  {
    name: "Annature",
    line: "Sign engagement letters electronically — legally binding, bank-grade e-signatures.",
  },
  {
    name: "Stripe",
    line: "Pay invoices securely online. Card details never touch our servers.",
  },
  {
    name: "Claude by Anthropic",
    line: "Flo runs on Claude, frontier AI from Anthropic, for accurate receipt classification with reasoning you can read.",
  },
];

export function IntegrationsSection() {
  return (
    <section className="border-t" style={{ background: "#060D1A", borderColor: "rgba(255,255,255,0.08)" }}>
      <div className={`${container} py-16 md:py-20`}>
        <div className="tc-reveal max-w-xl">
          <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>Integrations</p>
          <h2 className="tc-display mt-4 text-3xl text-white md:text-4xl">
            Plays well with the tools you trust
          </h2>
        </div>
        <div className="tc-reveal mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INTEGRATIONS.map((tool) => (
            <div key={tool.name} className="tc-int-card p-5">
              {/* TODO: replace typographic wordmark with official white/mono SVG logo */}
              <p className="tc-mono text-[13px] font-semibold tracking-[0.06em] text-white">
                {tool.name.toUpperCase()}
              </p>
              <p className="mt-2.5 text-[13px] leading-relaxed" style={{ color: "#94A3B8" }}>
                {tool.line}
              </p>
            </div>
          ))}
        </div>
        <p className="tc-reveal mt-8 text-[13.5px]" style={{ color: "#B7C4CF" }}>
          No lock-in. Your documents and data are always yours to take with you.
        </p>
      </div>
    </section>
  );
}

/* ---------- security — concrete statements ---------- */
const SECURITY_POINTS = [
  "Encryption in transit and at rest — your data is protected on the move and in storage.",
  "Two-factor authentication on every sign-in.",
  "Sensitive fields — your TFN and bank details — are encrypted and masked, revealed only after you re-enter your password.",
  "Role-based access: people only see what their role requires.",
  "Your documents are stored in your own access-controlled cloud folder.",
];

export function SecuritySection() {
  return (
    <section className="border-t" style={{ background: "#0A1628", borderColor: "rgba(255,255,255,0.08)" }}>
      <div className={`${container} grid gap-10 py-16 md:py-20 lg:grid-cols-12`}>
        <div className="tc-reveal lg:col-span-4">
          <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>Security</p>
          <h2 className="tc-display mt-4 text-3xl text-white md:text-4xl">
            Your security matters
          </h2>
          <p className="mt-4 text-[14.5px]" style={{ color: "#94A3B8" }}>
            So you can focus on your tax — not on worrying about security.
          </p>
        </div>
        <div className="tc-reveal lg:col-span-7 lg:col-start-6">
          <ul className="space-y-4 text-[14.5px] leading-relaxed" style={{ color: "#94A3B8" }}>
            {SECURITY_POINTS.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <svg className="mt-1 h-3 w-3 shrink-0" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M1.5 6.5l3 3 6-7" stroke="#00FCB8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- Google reviews — REAL data only, gated on taxflow-proof.js ----------
   Renders nothing until rating, count, profileUrl and at least one verbatim
   review are supplied. Never ship placeholder or invented reviews. */
export function GoogleReviewsSection() {
  const { rating, count, profileUrl, reviews } = GOOGLE_REVIEWS;
  const published = Boolean(rating && count && profileUrl && reviews.length > 0);
  if (!published) return null;
  return (
    <section className="border-t" style={{ background: "#060D1A", borderColor: "rgba(255,255,255,0.08)" }}>
      <div className={`${container} py-16 md:py-20`}>
        <div className="tc-reveal flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>What clients say</p>
            <h2 className="tc-display mt-4 text-3xl text-white md:text-4xl">
              Rated on Google
            </h2>
          </div>
          <p className="tc-mono text-[12px]" style={{ color: "#94A3B8" }}>
            ★ {rating} ON GOOGLE · {count} REVIEWS
          </p>
        </div>
        <div className="tc-reveal mt-10 grid gap-4 md:grid-cols-3">
          {reviews.slice(0, 5).map((r) => (
            <figure key={r.name + r.quote.slice(0, 16)} className="tc-card p-5">
              <blockquote className="text-[14px] italic leading-relaxed" style={{ color: "#94A3B8" }}>
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="tc-mono mt-4 text-[11px]" style={{ color: "#64748B" }}>
                — {r.name.toUpperCase()}
                {r.situation ? ` · ${r.situation.toUpperCase()}` : ""} · GOOGLE REVIEW
              </figcaption>
            </figure>
          ))}
        </div>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="tc-link mt-8 inline-block text-[14px] font-semibold"
        >
          Read all reviews on Google
        </a>
      </div>
    </section>
  );
}

/* ---------- "Meet your tax agents" — REAL people only, gated ----------
   Renders nothing until real agents (with real photos) are supplied in
   taxflow-proof.js. No stock photos, no AI-generated faces. */
export function AgentsSection() {
  if (TAX_AGENTS.length === 0) return null;
  return (
    <section className="border-t" style={{ background: "#0A1628", borderColor: "rgba(255,255,255,0.08)" }}>
      <div className={`${container} py-16 md:py-20`}>
        <div className="tc-reveal max-w-xl">
          <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>The humans</p>
          <h2 className="tc-display mt-4 text-3xl text-white md:text-4xl">
            Meet your tax agents
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "#94A3B8" }}>
            Real, TPB-registered tax agents prepare and lodge your return —
            here&apos;s who you&apos;re working with.
          </p>
        </div>
        <div className="tc-reveal mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TAX_AGENTS.slice(0, 4).map((agent) => (
            <div key={agent.firstName} className="tc-card p-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={agent.photoSrc}
                alt={`${agent.firstName} — ${agent.credential}`}
                className="h-20 w-20 rounded-full border object-cover"
                style={{ borderColor: "rgba(0,252,184,0.3)" }}
                loading="lazy"
              />
              <p className="mt-4 text-[16px] font-bold text-white">{agent.firstName}</p>
              <p className="tc-mono mt-1 text-[10.5px]" style={{ color: "#00FCB8" }}>
                {agent.credential.toUpperCase()}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed" style={{ color: "#94A3B8" }}>
                {agent.specialty}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- proof-of-scale strip — true metrics only, gated ---------- */
export function StatStrip() {
  const stats = [...PROOF_STATS];
  const { rating, count, profileUrl } = GOOGLE_REVIEWS;
  if (rating && count && profileUrl) {
    stats.push({ value: `★ ${rating}`, label: `on Google (${count} reviews)` });
  }
  if (stats.length === 0) return null;
  return (
    <section className="border-t" style={{ background: "#0A1628", borderColor: "rgba(255,255,255,0.08)" }}>
      <div className={`${container} flex flex-wrap items-center gap-x-10 gap-y-3 py-5`}>
        {stats.map((s) => (
          <p key={s.label} className="text-[13.5px]" style={{ color: "#94A3B8" }}>
            <span className="tc-mono font-semibold" style={{ color: "#00FCB8" }}>{s.value}</span>{" "}
            {s.label}
          </p>
        ))}
      </div>
    </section>
  );
}

/* ---------- "switching is painless" reassurance module ---------- */
export function SwitchingModule() {
  return (
    <section className="border-t" style={{ background: "#060D1A", borderColor: "rgba(255,255,255,0.08)" }}>
      <div className={`${container} py-14 md:py-16`}>
        <div className="tc-reveal max-w-3xl rounded-xl border p-6 md:p-8" style={{ borderColor: "rgba(0,252,184,0.25)", background: "rgba(0,252,184,0.04)" }}>
          <h2 className="text-xl font-bold text-white md:text-2xl">
            Already have an accountant?
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "#94A3B8" }}>
            Switching is simpler than most people expect. Engage a Registered Tax
            Agent through TaxFlowAI and they&apos;ll request your details from your
            previous accountant and pick up your lodgement history with the ATO — no
            awkward break-up conversation, no starting from scratch.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a href={TAXFLOW_SIGNIN_URL} className="tc-btn-primary rounded-lg px-6 py-3 text-[14.5px] font-bold">
              Get started
            </a>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="tc-btn-ghost rounded-lg px-6 py-3 text-[14.5px] font-semibold"
            >
              Book a free call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ list renderer (native details/summary) ---------- */
export function FaqList({ items }) {
  return (
    <div className="space-y-3">
      {items.map((f) => (
        <details key={f.id} className="tc-faq">
          <summary>{f.q}</summary>
          <div>{f.a}</div>
        </details>
      ))}
    </div>
  );
}
