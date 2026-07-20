import TaxFlowHeader from "@/components/taxflow/TaxFlowHeader";
import TaxFlowAppFooter from "@/components/taxflow/TaxFlowAppFooter";
import RevealInit from "@/components/taxflow/RevealInit";
import ContactForm from "@/components/taxflow/ContactForm";
import { container, CtaBand, Breadcrumbs, CALENDLY_URL } from "@/components/taxflow/TaxFlowShared";

export const metadata = {
  title: "Contact",
  description:
    "Book a free 30-minute call, or reach TaxFlowAI at 150 George Street Parramatta or Martin Place Sydney. Phone 0406 909 862, email taxflowai@frontline.financial.",
  alternates: { canonical: "/taxflow/contact" },
  openGraph: {
    title: "Contact TaxFlowAI",
    description:
      "Book a free 30-minute call, or visit us in Parramatta or Martin Place, Sydney.",
    url: "/taxflow/contact",
  },
};

const OFFICES = [
  {
    name: "Parramatta",
    address: "150 George Street, Parramatta NSW 2150",
    mapSrc:
      "https://www.google.com/maps?q=150+George+Street,+Parramatta+NSW+2150&output=embed",
  },
  {
    name: "Sydney",
    address: "Martin Place, Sydney NSW 2000",
    mapSrc:
      "https://www.google.com/maps?q=Martin+Place,+Sydney+NSW+2000&output=embed",
  },
];

export default function TaxFlowContactPage() {
  return (
    <div className="tc-page min-h-screen">
      <RevealInit />
      <TaxFlowHeader />
      <Breadcrumbs items={[{ name: "Contact", href: "/taxflow/contact" }]} />

      {/* hero + calendly front and centre */}
      <section className={`${container} pb-10 pt-8 md:pt-12`}>
        <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>Contact</p>
        <h1 className="tc-display mt-4 max-w-2xl text-4xl text-white md:text-5xl">
          Talk to a human
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed" style={{ color: "#94A3B8" }}>
          The fastest way to see if TaxFlowAI fits: a free, no-obligation 30-minute
          call. Or send an enquiry and we&apos;ll come back to you.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="tc-btn-primary rounded-lg px-7 py-3.5 text-[15px] font-bold"
          >
            Book a free 30-min call
          </a>
          <span className="tc-mono text-[11.5px]" style={{ color: "#94A3B8" }}>
            NO OBLIGATION · TEAMS OR PHONE
          </span>
        </div>
      </section>

      {/* details + form */}
      <section className="border-t" style={{ background: "#0A1628", borderColor: "rgba(255,255,255,0.08)" }}>
        <div className={`${container} grid gap-12 py-14 md:py-20 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <h2 className="text-xl font-bold text-white">Get in touch</h2>
            <ul className="mt-5 space-y-3 text-[14.5px]" style={{ color: "#94A3B8" }}>
              <li>
                Phone:{" "}
                <a href="tel:+61406909862" className="tc-link tc-mono text-[13.5px]">0406 909 862</a>
              </li>
              <li>
                Email:{" "}
                <a href="mailto:taxflowai@frontline.financial" className="tc-link">taxflowai@frontline.financial</a>
              </li>
              <li>
                {/* TODO: confirm office hours */}
                Hours: <span className="tc-mono text-[13px]" style={{ color: "#64748B" }}>TO BE CONFIRMED</span>
              </li>
            </ul>
            <div className="mt-8 space-y-8">
              {OFFICES.map((office) => (
                <div key={office.name}>
                  <h3 className="text-[15px] font-bold text-white">{office.name}</h3>
                  <p className="mt-1 text-[13.5px]" style={{ color: "#94A3B8" }}>{office.address}</p>
                  <div className="tc-map mt-3">
                    <iframe
                      src={office.mapSrc}
                      title={`Map — TaxFlowAI ${office.name} office`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="text-xl font-bold text-white">Send an enquiry</h2>
            <p className="mt-2 text-[13.5px]" style={{ color: "#94A3B8" }}>
              We&apos;ll get back to you quickly.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
      <TaxFlowAppFooter />
    </div>
  );
}
