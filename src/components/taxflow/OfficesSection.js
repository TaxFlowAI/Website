import Image from "next/image";
import Link from "next/link";
import CalendlyButton from "@/components/taxflow/CalendlyButton";
import { container } from "@/components/taxflow/TaxFlowShared";

/* "Visit us": both offices with their branded photos. Shared by
   /taxflow/about and the persona landing pages. */

export const OFFICES = [
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

export default function OfficesSection({ background = "#0A1628" }) {
  const [sydney, parramatta] = OFFICES;
  return (
  <section id="visit" style={{ background, scrollMarginTop: "110px" }}>
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
  );
}
