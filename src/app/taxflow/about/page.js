import Link from "next/link";
import Image from "next/image";
import InfoPage, { InfoSection, InfoGrid, SectionHeading } from "@/components/taxflow/InfoPage";
import CalendlyButton from "@/components/taxflow/CalendlyButton";

export const metadata = {
  title: "About us",
  description:
    "TaxFlowAI is Australia's AI-powered tax portal, built and operated by Frontline Financial Group in Parramatta. Meet the platform, the Registered Tax Agents and the group behind it.",
  alternates: { canonical: "/taxflow/about" },
  openGraph: {
    title: "About TaxFlowAI",
    description:
      "Australia's AI-powered tax portal, built and operated by Frontline Financial Group. The platform, the Registered Tax Agents and the group behind it.",
    url: "/taxflow/about",
  },
};

const WHAT_WE_ARE = [
  {
    label: "The platform",
    title: "TaxFlowAI",
    body: "The technology. Flo sorts receipts into ATO deduction categories, your documents live in a private vault, and every deadline for every entity is tracked in one dashboard.",
  },
  {
    label: "The people",
    title: "Registered Tax Agents",
    body: "Your return is prepared and lodged by a Registered Tax Agent you engage through the platform — a real, TPB-registered professional you can look up on the public register.",
  },
  {
    label: "The group",
    title: "Frontline Financial Group",
    body: "TaxFlowAI is built and operated by Frontline Financial Group — the Parramatta-based team behind Frontline Financial Brokers and Frontline Financial: Asset Solutions.",
  },
];

const VALUES = [
  {
    title: "Plain English, always",
    body: "ATO rules explained the way you'd explain them to a mate. No jargon and no black boxes — Flo even shows the reasoning behind every categorisation.",
  },
  {
    title: "You approve the price first",
    body: "Signing up is free. When you need a service, a Registered Tax Agent quotes it, and nothing proceeds until you accept.",
  },
  {
    title: "Always know what's happening",
    body: "Status, next steps and deadlines are visible at a glance. No more “where's my return?” and no more guessing what to send.",
  },
  {
    title: "Your data stays yours",
    body: "Documents live in your own access-controlled folder. There's no lock-in — take everything with you whenever you like.",
  },
];

const OFFICES = [
  { name: "Parramatta", lines: ["Level 49, 8 Parramatta Square", "Parramatta NSW 2150"] },
  { name: "Sydney CBD", lines: ["Martin Place", "Sydney NSW"] },
];

export default function AboutPage() {
  return (
    <InfoPage
      crumbName="About us"
      crumbHref="/taxflow/about"
      eyebrow="About us"
      headline="Tax made simple. For every Australian."
      intro={[
        "TaxFlowAI is Australia's AI-powered tax portal. It was built by Frontline Financial Group, a Western Sydney team that had spent long enough inside finance and tax to know what wasn't working for clients: lost receipts, unclear status, and an accountant who was hard to reach.",
        "So we built the portal we wished our clients had — one place to upload, track and talk — and paired it with real Registered Tax Agents who prepare and lodge the work.",
      ]}
      panel={
        <Image
          src="/images/taxflow/about-team.webp"
          alt="The Frontline Financial Group team at a boardroom table in Parramatta, with Flo sitting on the table beside them"
          width={1672}
          height={940}
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-auto w-full rounded-2xl border"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        />
      }
    >
      <InfoSection id="what-we-are">
        <SectionHeading
          eyebrow="What we are"
          title="Three parts, one portal"
          lead="Software to keep you organised, registered professionals to do the tax, and an established group standing behind both."
        />
        <InfoGrid items={WHAT_WE_ARE} />
      </InfoSection>

      <InfoSection id="how-we-work" alt>
        <SectionHeading
          eyebrow="How we work"
          title="Built differently. On purpose."
          lead="We're not here to sell you software. We're here to give you visibility — real accountants, real deadlines, real clarity."
        />
        <InfoGrid items={VALUES} cols={2} />
      </InfoSection>

      <InfoSection id="offices">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Where to find us"
              title="Parramatta first. Australia next."
              lead="Meet your tax agent on Teams or by phone from anywhere in Australia, or in person at either office."
            />
            <div className="tc-reveal mt-8 space-y-2 text-[14.5px]" style={{ color: "#94A3B8" }}>
              <p>
                <a href="tel:+61406909862" className="tc-link">0406 909 862</a>
              </p>
              <p>
                <a href="mailto:taxflowai@frontline.financial" className="tc-link">
                  taxflowai@frontline.financial
                </a>
              </p>
            </div>
            <div className="tc-reveal mt-8 flex flex-wrap items-center gap-4">
              <CalendlyButton className="tc-btn-primary rounded-lg px-6 py-3 text-[14.5px] font-bold">
                Book a free 30-min call
              </CalendlyButton>
              <Link href="/taxflow/contact" className="tc-btn-ghost rounded-lg px-6 py-3 text-[14.5px] font-semibold">
                Contact us
              </Link>
            </div>
          </div>
          <div className="tc-reveal grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {OFFICES.map((o) => (
              <div key={o.name} className="tc-card p-5">
                <p className="tc-mono text-[11px] font-medium tracking-[0.18em]" style={{ color: "#00FCB8" }}>
                  {o.name.toUpperCase()}
                </p>
                {o.lines.map((l) => (
                  <p key={l} className="mt-1 text-[14.5px] text-white/90">
                    {l}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </InfoSection>

      <InfoSection id="who-is-who" alt>
        <SectionHeading eyebrow="Who's who, legally" title="Clear lines, on purpose" />
        <div
          className="tc-reveal mt-8 max-w-3xl rounded-xl border p-6 text-[14.5px] leading-relaxed md:p-8"
          style={{ borderColor: "rgba(0,252,184,0.25)", background: "rgba(0,252,184,0.04)", color: "#94A3B8" }}
        >
          <p>
            <strong className="text-white">TaxFlowAI</strong> is a technology platform, not a registered tax
            agent. Tax services are provided by the Registered Tax Agent you engage through the platform,
            identified in your engagement letter.
          </p>
          <p className="mt-3">
            <strong className="text-white">Platform &amp; ASIC agent:</strong> Frontline Holdings Group Pty Ltd
            (ABN 59 671 861 475, ASIC Agent 51843).
          </p>
          <p className="mt-3">
            You can check any tax agent&apos;s registration on the{" "}
            <a
              href="https://tpb.gov.au/registrations_search"
              target="_blank"
              rel="noopener noreferrer"
              className="tc-link"
            >
              Tax Practitioners Board register
            </a>
            . Our{" "}
            <Link href="/taxflow/privacy-policy" className="tc-link">Privacy Policy</Link>,{" "}
            <Link href="/taxflow/collection-notice" className="tc-link">Collection Notice</Link> and{" "}
            <Link href="/taxflow/terms" className="tc-link">Terms of Service</Link> set out how the platform
            works and how your information is handled.
          </p>
        </div>
      </InfoSection>
    </InfoPage>
  );
}
