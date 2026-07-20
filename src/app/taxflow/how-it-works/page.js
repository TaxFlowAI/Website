import Link from "next/link";
import TaxFlowHeader from "@/components/taxflow/TaxFlowHeader";
import TaxFlowAppFooter from "@/components/taxflow/TaxFlowAppFooter";
import RevealInit from "@/components/taxflow/RevealInit";
import { container, CtaBand, Breadcrumbs, FeesSection, FaqList } from "@/components/taxflow/TaxFlowShared";
import { faqSubset } from "@/data/taxflow-faq";

export const metadata = {
  title: "How it works",
  description:
    "Register free, complete a 10-minute profile, engage a Registered Tax Agent, and stay on top of every ATO deadline. You approve the price before any work starts.",
  alternates: { canonical: "/taxflow/how-it-works" },
  openGraph: {
    title: "How TaxFlowAI works",
    description:
      "Register free, complete a 10-minute profile, engage a Registered Tax Agent — you approve the price before any work starts.",
    url: "/taxflow/how-it-works",
  },
};

const STEPS = [
  {
    label: "Step 1",
    title: "Register your account",
    desc: "Sign up free in minutes — no credit card needed. Your secure TaxFlowAI account is ready straight away, with two-factor authentication from the first sign-in.",
    points: [
      "Free to sign up — no card, no subscription",
      "Works for individuals, sole traders, companies, trusts and partnerships",
      "Your private document folder is created for you",
    ],
  },
  {
    label: "Step 2",
    title: "Complete your 10-minute profile",
    desc: "A guided 4-step wizard collects what your tax agent will need: entity details (TFN/ABN), address, bank details with BSB lookup, and a final review. Flo guides every step.",
    points: [
      "4-step onboarding wizard",
      "TFN encrypted and masked — revealed only with password re-entry",
      "Flo answers questions as you go",
    ],
  },
  {
    label: "Step 3",
    title: "Engage your tax agent",
    desc: "Engage a Registered Tax Agent through the platform. They review your needs, send you a quote for exactly the service you require, and nothing proceeds until you accept it. The engagement letter is signed electronically.",
    points: [
      "A quote first — you approve the price before any work starts",
      "Engagement letter signed electronically, legally binding",
      "Every agent is registered — verifiable on the TPB register",
    ],
  },
  {
    label: "Step 4",
    title: "Upload, track, stay on top",
    desc: "Your dashboard goes live with every account in one view. Snap receipts for Flo to sort, track every lodgement and deadline, and book time with your accountant when you need it.",
    points: [
      "AI receipt scanning into ATO deduction categories",
      "Live lodgement status across all your entities",
      "Book a 30-min call or 1-hour office visit in two clicks",
    ],
  },
];

const AFTER_SIGNUP = [
  ["Straight away", "Your account and private document folder are live. Start uploading receipts immediately — Flo files them as they land."],
  ["Within the first week", "Complete your profile when it suits you, browse the deduction pages, and — if you want professional help — request a quote from a Registered Tax Agent."],
  ["At tax time", "Everything is already organised. Your agent works from your sorted receipts and records, and you track lodgement progress live."],
];

export default function HowItWorksPage() {
  return (
    <div className="tc-page min-h-screen">
      <RevealInit />
      <TaxFlowHeader />
      <Breadcrumbs items={[{ name: "How it works", href: "/taxflow/how-it-works" }]} />

      {/* hero */}
      <section className={`${container} pb-6 pt-8 md:pt-12`}>
        <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>The process</p>
        <h1 className="tc-display mt-4 max-w-2xl text-4xl text-white md:text-5xl">
          Up and running in minutes.
          <br />
          <span style={{ color: "#00FCB8" }}>In control</span> all year.
        </h1>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed" style={{ color: "#94A3B8" }}>
          Four steps from sign-up to sorted — and you approve the price before any
          work starts.
        </p>
      </section>

      {/* the four stations */}
      <section className="border-t" style={{ background: "#0A1628", borderColor: "rgba(255,255,255,0.08)" }}>
        <div className={`${container} py-14 md:py-20`}>
          <div className="tc-observe relative max-w-3xl">
            <div className="tc-spine tc-grad-line-v absolute bottom-3 left-[5px] top-3 w-[2px]" aria-hidden />
            <ol className="space-y-12">
              {STEPS.map((step) => (
                <li key={step.label} className="tc-reveal relative grid grid-cols-[13px_1fr] gap-x-6">
                  <span className="tc-node mt-1.5" aria-hidden />
                  <div>
                    <p className="tc-mono text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: "#00FCB8" }}>
                      {step.label}
                    </p>
                    <h2 className="mt-1.5 text-[21px] font-bold text-white">{step.title}</h2>
                    <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed" style={{ color: "#94A3B8" }}>
                      {step.desc}
                    </p>
                    <ul className="mt-3.5 space-y-2 text-[13.5px]">
                      {step.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-white/85">
                          <svg className="mt-1 h-3 w-3 shrink-0" viewBox="0 0 12 12" fill="none" aria-hidden>
                            <path d="M1.5 6.5l3 3 6-7" stroke="#00FCB8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* fees — expanded */}
      <FeesSection expanded />

      {/* what happens after you sign up */}
      <section className="border-t" style={{ background: "#060D1A", borderColor: "rgba(255,255,255,0.08)" }}>
        <div className={`${container} py-16 md:py-20`}>
          <div className="tc-reveal max-w-xl">
            <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>After you sign up</p>
            <h2 className="tc-display mt-4 text-3xl text-white md:text-4xl">
              What happens next
            </h2>
          </div>
          <div className="tc-reveal mt-10 grid gap-4 md:grid-cols-3">
            {AFTER_SIGNUP.map(([when, what]) => (
              <div key={when} className="tc-card p-5">
                <p className="tc-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "#00FCB8" }}>
                  {when}
                </p>
                <p className="mt-2.5 text-[14px] leading-relaxed" style={{ color: "#94A3B8" }}>
                  {what}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ subset */}
      <section className="border-t" style={{ background: "#0A1628", borderColor: "rgba(255,255,255,0.08)" }}>
        <div className={`${container} py-16 md:py-20`}>
          <div className="tc-reveal flex flex-wrap items-end justify-between gap-4">
            <h2 className="tc-display text-3xl text-white md:text-4xl">Common questions</h2>
            <Link href="/taxflow/faq" className="tc-link text-[14px] font-semibold">
              See all FAQs
            </Link>
          </div>
          <div className="tc-reveal mt-8 max-w-3xl">
            <FaqList items={faqSubset(["fees", "who-lodges", "free-signup", "lock-in"])} />
          </div>
        </div>
      </section>

      <CtaBand />
      <TaxFlowAppFooter />
    </div>
  );
}
