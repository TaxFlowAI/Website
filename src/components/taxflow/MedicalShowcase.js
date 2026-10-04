import Link from "next/link";
import Image from "next/image";
import CalendlyButton from "@/components/taxflow/CalendlyButton";
import { container } from "@/components/taxflow/TaxFlowShared";

/* Home-page showcase for /taxflow/for/medical-professionals, built from that
   page's own assets. Each topic tile deep-links to its block on the page. */

const PAGE = "/taxflow/for/medical-professionals";

const TOPICS = [
  { anchor: "salary-packaging", label: "Salary packaging", sub: "Pay less tax, the right way", img: "/images/taxflow/flo-salary-packaging.webp", w: 903, h: 1226 },
  { anchor: "help-debt", label: "HELP debt", sub: "What actually matters", img: "/images/taxflow/flo-help-debt.webp", w: 954, h: 1210 },
  { anchor: "deductions", label: "Deductions", sub: "From your first shift", img: "/images/taxflow/flo-deductions.webp", w: 1001, h: 1230 },
  { anchor: "going-self-employed", label: "Locum & ABN", sub: "Be ready when it comes", img: "/images/taxflow/flo-self-employed.webp", w: 1119, h: 1219 },
];

export default function MedicalShowcase() {
  return (
    <section id="medical" className="relative overflow-hidden" style={{ background: "#0A1628", scrollMarginTop: "110px" }}>
      <div className="pointer-events-none absolute -left-40 top-20 h-[28rem] w-[28rem] rounded-full opacity-[0.10] blur-[130px]" style={{ background: "#00FCB8" }} aria-hidden />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full opacity-[0.14] blur-[130px]" style={{ background: "#39B2B2" }} aria-hidden />

      <div className={`${container} relative grid items-center gap-14 py-16 md:py-24 lg:grid-cols-12 lg:gap-12`}>
        {/* copy */}
        <div className="tc-reveal lg:col-span-6">
          <span
            className="tc-mono inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em]"
            style={{ borderColor: "rgba(0,252,184,0.35)", background: "rgba(0,252,184,0.06)", color: "#00FCB8" }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#00FCB8", boxShadow: "0 0 8px #00FCB8" }} aria-hidden />
            New · For medical professionals
          </span>
          <h2 className="tc-display mt-6 text-4xl leading-[1.05] text-white md:text-5xl">
            You look after everyone else.{" "}
            <span className="bg-gradient-to-r from-[#00FCB8] to-[#39B2B2] bg-clip-text text-transparent">
              We&apos;ll look after your tax.
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed" style={{ color: "#B7C4CF" }}>
            Doctors, nurses and allied health have their own tax story: salary
            packaging, HELP debt, AHPRA and indemnity, locum shifts on an ABN. So we
            built a page just for you.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {TOPICS.map((t) => (
              <Link
                key={t.anchor}
                href={`${PAGE}#${t.anchor}`}
                className="tc-int-card group flex items-center gap-3 p-3 pr-4"
              >
                <Image
                  src={t.img}
                  alt=""
                  width={t.w}
                  height={t.h}
                  sizes="56px"
                  className="h-14 w-auto shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-4deg]"
                />
                <span className="min-w-0">
                  <span className="block text-[14px] font-bold leading-tight text-white">{t.label}</span>
                  <span className="mt-0.5 block text-[12px] leading-snug" style={{ color: "#94A3B8" }}>{t.sub}</span>
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <CalendlyButton className="tc-btn-primary rounded-lg px-7 py-3.5 text-[15px] font-bold">
              Talk to a human
            </CalendlyButton>
            <Link href={PAGE} className="tc-link inline-flex items-center gap-2 text-[15px] font-semibold">
              Explore tax for medical professionals
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* visual: theatre photo, Flo with his clipboard, a floating stat */}
        <div className="tc-reveal relative lg:col-span-6">
          <Link href={PAGE} className="group block" aria-label="Explore tax for medical professionals">
            <div
              className="relative overflow-hidden rounded-3xl border"
              style={{ borderColor: "rgba(0,252,184,0.35)", boxShadow: "0 30px 80px -30px rgba(0,252,184,0.35), 0 20px 50px -20px rgba(0,0,0,0.6)" }}
            >
              <Image
                src="/images/taxflow/medical-hero.webp"
                alt="A surgical team in an operating theatre, with Flo in scrubs giving a thumbs-up"
                width={1536}
                height={1024}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-[4/3] w-full object-cover object-[68%_center] transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,22,40,0.55), transparent 45%)" }} aria-hidden />
            </div>
          </Link>

          {/* Flo with his clipboard, stepping out of the frame */}
          <Image
            src="/images/taxflow/flo-doctor.webp"
            alt="Flo in scrubs, waving and holding a clipboard"
            width={1254}
            height={1254}
            sizes="(min-width: 768px) 208px, 144px"
            className="pointer-events-none absolute -bottom-10 -left-2 w-36 drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] md:-bottom-14 md:-left-10 md:w-52"
          />

          {/* floating stat, from the salary-packaging block */}
          <div
            className="absolute -top-5 right-3 rounded-2xl border px-4 py-3 backdrop-blur-md md:-right-6 md:top-8"
            style={{ borderColor: "rgba(0,252,184,0.3)", background: "rgba(10,22,40,0.8)" }}
          >
            <p className="tc-mono text-[10px] tracking-[0.14em]" style={{ color: "#94A3B8" }}>INTERN SALARY PACKAGING</p>
            <p className="tc-mono mt-1 text-xl font-semibold" style={{ color: "#00FCB8" }}>≈ +$2,150 / yr</p>
            <p className="mt-0.5 text-[10.5px]" style={{ color: "#64748B" }}>Approximate, after HELP</p>
          </div>
        </div>
      </div>
    </section>
  );
}
