import CalendlyButton from "@/components/taxflow/CalendlyButton";
import { floImage } from "@/components/taxflow/MedicalBlocks";
import { container, TAXFLOW_SIGNIN_URL } from "@/components/taxflow/TaxFlowShared";

/* Closing band: Flo saying "Talk to a human", beside the booking CTA.
   Uses /images/taxflow/flo-talk-to-human.webp once it exists; until then the
   existing waving Flo, with the bubble drawn over its baked-in "Hello!". The
   bubble sits in the image's top-right quarter, so a new image should leave
   that area clear. */
export default function FloTalkCta({ note }) {
  const src = floImage("flo-talk-to-human.webp") ?? "/images/taxflow/flo-hello.webp";
  return (
    <section className="tc-depth-blue border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
      <div className={`${container} grid items-center gap-10 py-16 md:py-24 lg:grid-cols-12 lg:gap-14`}>
        <div className="tc-reveal lg:col-span-5">
          <div className="relative mx-auto aspect-square w-full max-w-[300px] md:max-w-[380px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt="Flo, the TaxFlowAI assistant, in scrubs and a headset, waving"
              width={1254}
              height={1254}
              loading="lazy"
              className="h-full w-full object-contain"
            />
            <div
              className="absolute left-[58%] top-[12%] flex min-h-[28%] w-[40%] items-center justify-center rounded-2xl bg-white px-3 text-center font-bold leading-tight shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
              style={{ color: "#0A1628", fontSize: "clamp(15px, 4.4vw, 21px)" }}
            >
              Talk to a human
              <span
                className="absolute -bottom-2 left-6 h-4 w-4 rotate-45 bg-white"
                aria-hidden
              />
            </div>
          </div>
        </div>

        <div className="tc-reveal lg:col-span-7">
          <div className="tc-grad-line-h tc-glow-line h-[2px] w-16 rounded-full" aria-hidden />
          <h2 className="tc-display mt-7 text-4xl text-white md:text-5xl">
            Questions? A real person is fifteen minutes away.
          </h2>
          <p className="mt-5 max-w-lg text-lg" style={{ color: "#B7C4CF" }}>
            Book a free 15-minute call with the TaxFlowAI team. Bring your
            questions about packaging, HELP or your first return. No pressure, no
            obligation.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CalendlyButton className="tc-btn-primary rounded-lg px-7 py-3.5 text-[15px] font-bold">
              Talk to a human
            </CalendlyButton>
            <a href={TAXFLOW_SIGNIN_URL} className="tc-btn-ghost rounded-lg px-7 py-3.5 text-[15px] font-semibold">
              Get started free
            </a>
          </div>
          <p className="tc-mono mt-5 text-[11.5px]" style={{ color: "#94A3B8" }}>
            FREE 15-MIN CALL · NO OBLIGATION · TEAMS OR PHONE
          </p>
          {note && (
            <p className="mt-8 max-w-xl text-[12px] leading-relaxed" style={{ color: "#64748B" }}>
              {note}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
