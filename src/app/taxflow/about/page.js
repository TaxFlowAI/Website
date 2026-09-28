import Link from "next/link";
import Image from "next/image";
import TaxFlowHeader from "@/components/taxflow/TaxFlowHeader";
import TaxFlowAppFooter from "@/components/taxflow/TaxFlowAppFooter";
import RevealInit from "@/components/taxflow/RevealInit";
import TaxFlowWave from "@/components/taxflow/TaxFlowWave";
import TaxFlowWaveLayers from "@/components/taxflow/TaxFlowWaveLayers";
import CalendlyButton from "@/components/taxflow/CalendlyButton";
import { Tick } from "@/components/taxflow/TaxFlowMockups";
import { container, CtaBand, Breadcrumbs } from "@/components/taxflow/TaxFlowShared";

export const metadata = {
  title: "About us",
  description:
    "TaxFlowAI is Australia's AI-powered tax portal. Tax services by TAX7 T04 PTY LTD, Registered Tax Agent 26313222, on a platform owned and developed by Frontline Holdings Group. Meet the director and visit us in Sydney or Parramatta.",
  alternates: { canonical: "/taxflow/about" },
  openGraph: {
    title: "About TaxFlowAI",
    description:
      "Australia's AI-powered tax portal. The platform, the people and the group behind it, with offices in Sydney and Parramatta.",
    url: "/taxflow/about",
  },
};

const NAVY = "#0A1628";
const DEEP = "#060D1A";
const BAND = "#0E2238";

/* Facts from the director's own profile and words. Do not add credentials. */
const DIRECTOR = {
  name: "Hassan Arif",
  title: "Founder & Director, TaxFlowAI",
  quote:
    "I started TaxFlowAI and Frontline Financial because everyday Australians don’t get access to strong tax and finance services. There aren’t enough professionals to meet demand. I want TaxFlowAI to be the most efficient tax firm in the country.",
  bio: [
    "Hassan trained as an accountant, with a Bachelor of Business (Accounting) from Western Sydney University. He worked his way up through practice, from intern to bookkeeper to accountant, then spent two years as a finance and insurance manager.",
    "He founded Frontline Financial in October 2023, and built TaxFlowAI to bring the same service to tax. Alongside that he works as a Senior Accountant at TAX7 T04, the registered tax agent that provides TaxFlowAI’s tax services.",
  ],
  credentials: [
    ["Roles", "Founder & Director, TaxFlowAI. Senior Accountant, TAX7 T04 PTY LTD"],
    ["Education", "Bachelor of Business (Accounting), Western Sydney University"],
    ["Accreditation", "Accredited Member, FBAA"],
    ["Appointment", "Justice of the Peace, NSW"],
    ["Volunteering", "MATW Project, disaster and humanitarian relief"],
  ],
  path: [
    ["2020", "Accounting intern"],
    ["2021", "Bookkeeper"],
    ["2022", "Accountant"],
    ["2022", "Finance & insurance manager"],
    ["2023", "Founded Frontline Financial"],
  ],
};

/* speed and commitment: each point is something the site already promises */
const PACE = [
  "Every deadline tracked, for every entity",
  "Status you can see at every stage, start to finish",
  "A clear quote first, so work starts without back-and-forth",
];

/* the three frustrations the portal was built to remove */
const FIXES = [
  {
    pain: "Lost receipts",
    fix: "Every receipt filed as it lands",
    body: "Snap it or upload it. Flo sorts it into the right ATO category and shows its reasoning.",
  },
  {
    pain: "“Where’s my return?”",
    fix: "Status you can see",
    body: "Next steps and every deadline for every entity, visible at a glance.",
  },
  {
    pain: "Phone tag with your accountant",
    fix: "One place to talk",
    body: "Upload, message and book a time in the portal. A person reads it.",
  },
];

const PARTS = [
  {
    label: "The platform",
    title: "TaxFlowAI",
    body: "The technology. Flo sorts receipts, your documents live in a private vault, and every deadline is tracked in one dashboard.",
    image: "/images/taxflow/service-platform.webp",
    href: "/taxflow/features",
    cta: "Explore the platform",
  },
  {
    label: "The tax",
    title: "Registered Tax Agent",
    body: "Your return is prepared and lodged by TAX7 T04, Registered Tax Agent 26313222, a firm you can look up on the public register.",
    image: "/images/taxflow/service-tax.webp",
    href: "/taxflow/tax-preparation",
    cta: "See tax services",
  },
  {
    label: "The company",
    title: "Registered ASIC agent",
    body: "Annual reviews, officeholder and share changes, address updates and deregistrations, prepared for signature and lodged with ASIC.",
    image: "/images/taxflow/service-asic.webp",
    href: "/taxflow/corporate-secretarial",
    cta: "See ASIC services",
  },
  {
    label: "The group",
    title: "Frontline Financial Group",
    body: "The TaxFlowAI platform is owned and developed by Frontline Holdings Group, the team behind Frontline Financial Brokers and Asset Solutions.",
    image: "/images/taxflow/service-frontline.webp",
    href: "/",
    cta: "Visit Frontline Financial",
  },
];

const VALUES = [
  {
    title: "Plain English, always",
    body: "ATO rules explained the way you’d explain them to a mate. No jargon and no black boxes.",
  },
  {
    title: "You approve the price first",
    body: "Signing up is free. A Registered Tax Agent quotes the work, and nothing proceeds until you accept.",
  },
  {
    title: "Always know what’s happening",
    body: "Status, next steps and deadlines are visible at a glance. No more guessing what to send.",
  },
  {
    title: "Your data stays yours",
    body: "No lock-in. Your documents and data are always yours to take with you.",
  },
];

const OFFICES = [
  {
    id: "sydney",
    city: "Sydney CBD",
    address: ["213 Clarence Street", "Sydney NSW 2000"],
    note: "Look for the TAX7 sign above the bus shelter, a short walk from Town Hall and Wynyard.",
    image: "/images/taxflow/office-clarence-branded.png",
    alt: "213 Clarence Street, Sydney, with the TAX7 Accountants sign above the bus shelter and Flo pointing to the entrance",
    w: 1586,
    h: 992,
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=213%20Clarence%20Street%2C%20Sydney%20NSW%202000",
  },
  {
    id: "parramatta",
    city: "Parramatta",
    address: ["Level 49, 8 Parramatta Square", "Parramatta NSW 2150"],
    note: "The tall one. Take the lift to Level 49, a few minutes from Parramatta station.",
    image: "/images/taxflow/office-parramatta-branded.png",
    alt: "The 8 Parramatta Square tower at dusk with a glowing line marking Level 49 and Flo pointing up to it",
    w: 1086,
    h: 1448,
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=8%20Parramatta%20Square%2C%20Parramatta%20NSW%202150",
  },
];

/* The office images are finished artwork (callouts, wordmark and wave are part
   of the image), shown whole and unaltered at their own aspect ratio. */
function OfficeShot({ office }) {
  return (
    <div className="tc-office is-plain">
      <Image
        src={office.image}
        alt={office.alt}
        width={office.w}
        height={office.h}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="block h-auto w-full"
      />
    </div>
  );
}

function OfficeDetails({ office }) {
  return (
    <div>
      <p className="tc-mono text-[11px] font-medium tracking-[0.18em]" style={{ color: "#00FCB8" }}>
        {office.city.toUpperCase()}
      </p>
      <p className="tc-display mt-2 text-[1.7rem] leading-tight text-white">
        {office.address[0]}
        <br />
        {office.address[1]}
      </p>
      <p className="mt-3 max-w-sm text-[14px] leading-relaxed" style={{ color: "#94A3B8" }}>
        {office.note}
      </p>
      <a
        href={office.directions}
        target="_blank"
        rel="noopener noreferrer"
        className="tc-btn-ghost mt-5 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-[14px] font-semibold"
      >
        Get directions
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>
  );
}

export default function AboutPage() {
  const [sydney, parramatta] = OFFICES;
  return (
    <div className="tc-page min-h-screen">
      <RevealInit />
      <TaxFlowHeader />

      {/* ============ HERO ============ */}
      <section className="tc-hero-flo relative overflow-hidden">
        <Breadcrumbs items={[{ name: "About us", href: "/taxflow/about" }]} />
        <div className={`${container} grid items-center gap-10 pb-14 pt-8 md:pb-20 md:pt-12 lg:grid-cols-12 lg:gap-10`}>
          <div className="lg:col-span-6">
            <p className="tc-eyebrow" style={{ color: "#00FCB8" }}>About us</p>
            <h1 className="tc-display mt-5 text-[2.7rem] text-white md:text-6xl lg:text-[4.2rem]">
              Tax made simple.{" "}
              <span className="tc-hero-accent">For every Australian.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: "#B7C4CF" }}>
              We spent long enough inside finance and tax to know what wasn&apos;t working
              for clients. So we built the portal we wished they had, and put real
              people behind it.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#visit" className="tc-btn-primary rounded-lg px-6 py-3 text-[15px] font-bold">
                Come and visit
              </a>
              <CalendlyButton className="tc-btn-ghost rounded-lg px-6 py-3 text-[15px] font-semibold">
                Talk to a human
              </CalendlyButton>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="tc-about-card relative">
              <Image
                src="/images/taxflow/about-team.webp"
                alt="The Frontline Financial Group team at a boardroom table in Parramatta, with Flo sitting on the table beside them"
                width={1672}
                height={940}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="block h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ MEET THE DIRECTOR ============ */}
      <TaxFlowWaveLayers from={NAVY} to={DEEP} />
      <section id="director" className="tc-depth-teal" style={{ scrollMarginTop: "110px" }}>
        <div className={`${container} grid gap-10 pb-14 pt-6 md:pb-20 lg:grid-cols-12 lg:gap-12`}>
          <div className="tc-reveal lg:col-span-5">
            <div className="tc-director-photo">
              <Image
                src="/images/taxflow/director-portrait.webp"
                alt={`${DIRECTOR.name}, ${DIRECTOR.title} of TaxFlowAI`}
                width={1342}
                height={2000}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="block h-auto w-full"
              />
              <div className="tc-director-plate">
                <p className="tc-display text-[1.35rem] text-white">{DIRECTOR.name}</p>
                <p className="tc-mono mt-0.5 text-[10.5px] tracking-[0.16em]" style={{ color: "#00FCB8" }}>
                  {DIRECTOR.title.toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          <div className="tc-reveal lg:col-span-7">
            <p className="tc-eyebrow" style={{ color: "#00FCB8" }}>Meet the director</p>
            <h2 className="tc-display mt-4 text-4xl text-white md:text-5xl">{DIRECTOR.name}</h2>

            <blockquote className="tc-director-quote mt-7">
              <p>{DIRECTOR.quote}</p>
            </blockquote>

            <div className="mt-7 max-w-2xl space-y-3 text-[15px] leading-relaxed" style={{ color: "#94A3B8" }}>
              {DIRECTOR.bio.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <ol className="tc-director-path mt-8" aria-label="Career path">
              {DIRECTOR.path.map(([year, role], i) => (
                <li key={role} className={i === DIRECTOR.path.length - 1 ? "is-now" : ""}>
                  <span className="tc-mono">{year}</span>
                  <span>{role}</span>
                </li>
              ))}
            </ol>

            <dl className="tc-sec-facts mt-8">
              {DIRECTOR.credentials.map(([k, v]) => (
                <div key={k}>
                  <dt className="tc-mono">{k.toUpperCase()}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      <TaxFlowWave from={DEEP} to={NAVY} />

      {/* ============ SPEED AND COMMITMENT ============ */}
      <section id="pace" style={{ background: NAVY, scrollMarginTop: "110px" }}>
        <div className={`${container} grid items-center gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-12`}>
          <div className="tc-reveal lg:col-span-7">
            <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>Speed and commitment</p>
            <h2 className="tc-display mt-4 text-4xl text-white md:text-5xl lg:text-[3.4rem]">
              Built for pace.{" "}
              <span className="tc-hero-accent">Committed to the finish.</span>
            </h2>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed" style={{ color: "#B7C4CF" }}>
              Tax is an endurance event with hard deadlines. We treat it like one:
              steady preparation, no shortcuts, and a strong finish. The goal is
              simple. Be the most efficient tax firm in the country.
            </p>
            <ul className="mt-7 space-y-3 text-[15px]">
              {PACE.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-white/90">
                  <Tick />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/taxflow/how-it-works" className="tc-link text-[15px] font-semibold">
                See how it works
              </Link>
            </div>
          </div>

          {/* the image file is shown as supplied; the frame only chooses
              which part of it is visible */}
          <figure className="tc-reveal tc-director-inset lg:col-span-5">
            <div className="tc-director-inset-img">
              <Image
                src="/images/taxflow/director-racing-flo.webp"
                alt={`${DIRECTOR.name} mid-race on a lakeside path, with Flo sprinting alongside`}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                style={{ objectPosition: "50% 56%" }}
              />
            </div>
            <figcaption>
              <span className="tc-mono">OFF THE CLOCK</span>
              Racing Flo.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ============ WHY WE BUILT IT ============ */}
      <TaxFlowWave from={NAVY} to={DEEP} />
      <section id="why" style={{ background: DEEP }}>
        <div className={`${container} grid gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-8`}>
          <div className="tc-reveal lg:col-span-4">
            <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>Why we built it</p>
            <h2 className="tc-display mt-4 text-4xl text-white md:text-5xl">
              Three things that drove clients mad.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed" style={{ color: "#94A3B8" }}>
              Each one now has a fix built into the portal.
            </p>
          </div>
          <ol className="tc-reveal lg:col-span-8">
            {FIXES.map((f, i) => (
              <li key={f.pain} className="tc-fix">
                <span className="tc-fix-num tc-mono">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="tc-fix-pain">{f.pain}</p>
                  <p className="tc-fix-title">{f.fix}</p>
                  <p className="mt-1.5 max-w-lg text-[14.5px] leading-relaxed" style={{ color: "#94A3B8" }}>
                    {f.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <TaxFlowWave from={DEEP} to={NAVY} />

      {/* ============ FOUR PARTS, ONE PORTAL ============ */}
      <section id="what-we-are" style={{ background: NAVY }}>
        <div className={`${container} py-14 md:py-20`}>
          <div className="tc-reveal max-w-2xl">
            <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>What we are</p>
            <h2 className="tc-display mt-4 text-4xl text-white md:text-5xl">Four parts, one portal</h2>
            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "#94A3B8" }}>
              Software to keep you organised, registered professionals for your tax and
              your company, and an established group behind them.
            </p>
          </div>
          <div className="tc-reveal tc-eq is-four mt-10">
            {PARTS.map((p, i) => (
              <div key={p.title} className="contents">
                <Link href={p.href} className="tc-svc-card tc-eq-card flex flex-col overflow-hidden">
                  <div className="tc-svc-band relative aspect-video w-full overflow-hidden">
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="tc-svc-img object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="tc-eyebrow" style={{ color: "#00FCB8" }}>{p.label}</p>
                    <h3 className="mt-2 text-[18px] font-bold leading-snug text-white">{p.title}</h3>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed" style={{ color: "#94A3B8" }}>{p.body}</p>
                    <span className="tc-mono mt-auto pt-5 text-[11px] font-medium tracking-[0.12em]" style={{ color: "#00FCB8" }}>
                      {p.cta.toUpperCase()} →
                    </span>
                  </div>
                </Link>
                {i < PARTS.length - 1 && (
                  <span className="tc-eq-plus" aria-hidden>
                    +
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VALUES ============ */}
      <TaxFlowWave from={NAVY} to={BAND} />
      <section id="how-we-work" style={{ background: `linear-gradient(180deg, ${BAND} 0%, #16334B 50%, ${BAND} 100%)` }}>
        <div className={`${container} py-14 md:py-20`}>
          <div className="tc-reveal max-w-2xl">
            <p className="tc-eyebrow" style={{ color: "#00FCB8" }}>How we work</p>
            <h2 className="tc-display mt-4 text-4xl text-white md:text-5xl">Built differently. On purpose.</h2>
          </div>
          <div className="tc-reveal mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <div key={v.title} className="tc-value">
                <span className="tc-display tc-hero-accent text-5xl">{i + 1}</span>
                <h3 className="mt-4 text-[18px] font-bold text-white">{v.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed" style={{ color: "#B7C4CF" }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <TaxFlowWave from={BAND} to={NAVY} />

      {/* ============ VISIT US ============ */}
      <section id="visit" style={{ background: NAVY, scrollMarginTop: "110px" }}>
        <div className={`${container} py-14 md:py-20`}>
          <div className="tc-reveal flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>Visit us</p>
              <h2 className="tc-display mt-4 text-4xl text-white md:text-5xl">
                Two offices. <span className="tc-hero-accent">Come say hi.</span>
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "#94A3B8" }}>
                One at street level in the city, one forty-nine floors up in Parramatta.
                Or stay on the couch and meet us on Teams or the phone.
              </p>
            </div>
            <a href="tel:+61406909862" className="tc-mono text-[13px] tracking-[0.08em]" style={{ color: "#00FCB8" }}>
              0406 909 862
            </a>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Parramatta — tall */}
            <div className="tc-reveal lg:col-span-5">
              <OfficeShot office={parramatta} />
              <div className="mt-6">
                <OfficeDetails office={parramatta} />
              </div>
            </div>
            {/* Sydney — wide */}
            <div className="tc-reveal lg:col-span-7">
              <OfficeShot office={sydney} />
              <div className="mt-6">
                <OfficeDetails office={sydney} />
              </div>
              <div
                className="mt-10 rounded-2xl border p-6 md:p-7"
                style={{ borderColor: "rgba(0,252,184,0.25)", background: "rgba(0,252,184,0.04)" }}
              >
                <p className="text-[17px] font-bold text-white">Rather not travel?</p>
                <p className="mt-2 text-[14.5px] leading-relaxed" style={{ color: "#94A3B8" }}>
                  Most clients never need to come in. Book a call and we&apos;ll sort it
                  from wherever you are in Australia.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <CalendlyButton className="tc-btn-primary rounded-lg px-6 py-3 text-[14.5px] font-bold">
                    Talk to a human
                  </CalendlyButton>
                  <Link href="/taxflow/contact" className="tc-link text-[14.5px] font-semibold">
                    Or send an enquiry
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHO'S WHO ============ */}
      <TaxFlowWave from={NAVY} to={DEEP} />
      <section id="who-is-who" style={{ background: DEEP }}>
        <div className={`${container} pb-14 pt-4 md:pb-20`}>
          <div className="tc-reveal max-w-3xl text-[14px] leading-relaxed" style={{ color: "#94A3B8" }}>
            <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>Who&apos;s who, legally</p>
            <p className="mt-4">
              <strong className="text-white">Tax services:</strong> TAX7 T04 PTY LTD trading as TaxFlowAI
              (ABN 73 680 225 512), Registered Tax Agent 26313222. This is the firm that prepares and lodges
              your tax work.
            </p>
            <p className="mt-3">
              <strong className="text-white">Platform owner &amp; ASIC agent:</strong> Frontline Holdings Group
              Pty Ltd (ABN 59 671 861 475), ASIC Agent 51843. This is the company that owns and develops the
              TaxFlowAI platform and provides the corporate secretarial services.
            </p>
            <p className="mt-3">
              Check any tax agent&apos;s registration on the{" "}
              <a href="https://tpb.gov.au/registrations_search" target="_blank" rel="noopener noreferrer" className="tc-link">
                Tax Practitioners Board register
              </a>
              . See also our{" "}
              <Link href="/taxflow/privacy-policy" className="tc-link">Privacy Policy</Link>,{" "}
              <Link href="/taxflow/collection-notice" className="tc-link">Collection Notice</Link> and{" "}
              <Link href="/taxflow/terms" className="tc-link">Terms of Service</Link>.
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
