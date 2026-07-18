import Link from "next/link";
import BrandSwitcherBar from "@/components/BrandSwitcherBar";
import TaxFlowAppFooter from "@/components/taxflow/TaxFlowAppFooter";

const TAXFLOW_SIGNIN_URL = "https://taxflowai.frontline.financial/login";
const ACCENT = "#00FCB8";

const sectionContainer = "mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16 lg:px-8";

export const metadata = {
  title: "How It Works — TaxFlowAI",
  description:
    "Register your free TaxFlowAI account, complete your profile, then engage a registered tax agent through the platform. Here's how it works, step by step.",
};

const STEPS = [
  {
    num: 1,
    title: "Register your account",
    desc: "Sign up free in minutes — no credit card needed. Create your secure TaxFlowAI account and you're in. Your data is encrypted from the very first click.",
    points: [
      "Free to get started, no credit card",
      "Secure, encrypted account from day one",
      "Works for individuals, sole traders, companies, trusts and partnerships",
    ],
  },
  {
    num: 2,
    title: "Complete your 10-minute profile",
    desc: "A guided 4-step wizard collects what your tax agent will need: entity details (TFN/ABN), address, bank details with BSB lookup, and a final review. Flo, your AI assistant, guides every step.",
    points: [
      "4-step onboarding wizard",
      "TFN encrypted and masked — never sent by email",
      "Flo answers questions as you go",
    ],
  },
  {
    num: 3,
    title: "Engage a registered tax agent",
    desc: "Once you've registered your account, you can engage a registered tax agent directly through the platform. Your agent is confirmed under their own Engagement Letter, so you always know exactly who is acting for you — a real accountant, accountable to the Tax Practitioners Board.",
    points: [
      "Engage your tax agent from inside the platform",
      "Engagement Letter identifies your agent and scope of services",
      "Every agent is a registered tax agent — verifiable on the TPB register",
    ],
  },
  {
    num: 4,
    title: "Upload, track, stay on top",
    desc: "Your dashboard goes live with every account in one view. Snap receipts for Flo to sort into ATO categories, track every lodgement and deadline, and reach your accountant without phone tag.",
    points: [
      "Live lodgement status across all your entities",
      "AI receipt scanning into ATO D1–D10 categories",
      "Message your accountant and request callbacks in-app",
    ],
  },
];

export default function TaxFlowHowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#0A1628] font-sans text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full">
        <BrandSwitcherBar />
        <div className="border-b border-white/[0.08] bg-[#060D1A]">
          <div className="mx-auto max-w-6xl px-4 py-4 md:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link href="/taxflow" className="text-lg font-extrabold md:text-xl">
                <span className="text-white">TaxFlow</span>
                <span className="taxflow-logo-ai-shimmer">AI</span>
              </Link>
              <nav className="flex items-center gap-3 md:gap-5">
                <Link href="/taxflow#features" className="hidden text-sm font-medium text-white/80 transition hover:text-[#00FCB8] sm:inline-block">Features</Link>
                <a href={TAXFLOW_SIGNIN_URL} className="rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10">Sign In</a>
                <a href={TAXFLOW_SIGNIN_URL} className="rounded-lg px-4 py-2.5 text-sm font-bold text-white transition hover:opacity-90" style={{ background: ACCENT }}>Get started</a>
              </nav>
            </div>
          </div>
          <p className="border-t border-white/[0.06] bg-[#060D1A] py-1 text-center text-[11px] text-white/50">
            Tax services supervised by Registered Tax Agents
          </p>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden pt-10 pb-8 md:pt-14">
        <div className={sectionContainer}>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: ACCENT }}>How it works</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            Register first. Then engage <span style={{ color: ACCENT }}>your tax agent.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-[#94a3b8]">
            TaxFlowAI is the technology platform — you own your account from day one. Once you register, you can engage a registered tax agent through the platform to handle your lodgements. Four steps, and your tax is under control.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={TAXFLOW_SIGNIN_URL} className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-bold text-white transition hover:opacity-90" style={{ background: ACCENT }}>
              Register your account
            </a>
            <Link href="/taxflow" className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-6 py-3 font-bold text-white transition hover:opacity-80">
              Back to overview
            </Link>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="border-t border-white/10 bg-[#111827]">
        <div className={sectionContainer}>
          <div className="space-y-8">
            {STEPS.map((step) => (
              <div key={step.num} className="grid gap-6 rounded-2xl border border-white/10 bg-[#0A1628] p-6 md:grid-cols-[auto_1fr] md:p-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white" style={{ background: ACCENT }}>
                  {step.num}
                </div>
                <div>
                  <h2 className="text-xl font-bold md:text-2xl">{step.title}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#94a3b8] md:text-base">{step.desc}</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {step.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-white/90">
                        <span className="mt-0.5 shrink-0" style={{ color: ACCENT }}>✓</span> {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORM vs AGENT NOTE */}
      <section className="border-t border-white/10">
        <div className={sectionContainer}>
          <div className="rounded-2xl border border-white/10 bg-[#111827] p-8 md:p-10">
            <h2 className="text-xl font-bold md:text-2xl">The platform and your tax agent — who does what</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <p className="font-bold" style={{ color: ACCENT }}>TaxFlowAI (the platform)</p>
                <p className="mt-2 text-sm leading-relaxed text-[#94a3b8]">
                  Operated by Frontline Holdings Group Pty Ltd. It keeps your documents in a secure vault, tracks your lodgements and deadlines, runs Flo (your AI assistant), and connects you with your accountant. The platform itself doesn&apos;t give tax advice.
                </p>
              </div>
              <div>
                <p className="font-bold" style={{ color: ACCENT }}>Your registered tax agent</p>
                <p className="mt-2 text-sm leading-relaxed text-[#94a3b8]">
                  The registered tax agent you engage through the platform prepares and lodges your returns, gives you tax advice, and is identified in your Engagement Letter. You can verify any registered tax agent on the{" "}
                  <a href="https://tpb.gov.au/registrations_search" target="_blank" rel="noopener noreferrer" className="underline transition hover:opacity-80" style={{ color: ACCENT }}>
                    TPB register
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10">
        <div className={`${sectionContainer} text-center`}>
          <h2 className="text-3xl font-bold md:text-4xl">Ready to get started?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[#94a3b8]">
            Register your free account now — then engage a registered tax agent and put your tax under control.
          </p>
          <div className="mt-8 flex justify-center">
            <a href={TAXFLOW_SIGNIN_URL} className="inline-flex items-center justify-center rounded-lg px-10 py-4 text-lg font-bold text-white transition hover:opacity-90" style={{ background: ACCENT }}>
              Register your account
            </a>
          </div>
          <p className="mt-6 text-xs text-white/50">
            Free to get started · No credit card · Tax services provided by the registered tax agent you engage
          </p>
        </div>
      </section>

      <TaxFlowAppFooter />
    </div>
  );
}
