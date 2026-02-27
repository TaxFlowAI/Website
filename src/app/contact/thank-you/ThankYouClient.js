"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const team = searchParams.get("team") || "team";
  const forwarded = searchParams.get("forwarded") || "";
  const contactQuery = [
    searchParams.get("fn") && `fn=${encodeURIComponent(searchParams.get("fn"))}`,
    searchParams.get("ln") && `ln=${encodeURIComponent(searchParams.get("ln"))}`,
    searchParams.get("em") && `em=${encodeURIComponent(searchParams.get("em"))}`,
    searchParams.get("ph") && `ph=${encodeURIComponent(searchParams.get("ph"))}`,
  ].filter(Boolean).join("&");

  const isBrokers = team === "brokers";
  const isAssetSolutions = team === "asset-solutions";
  const isHassan = team === "hassan";
  const isSham = team === "sham";
  const isConsultation = isBrokers || isAssetSolutions;
  const forwardedToBrokerEngine = forwarded === "broker-engine";
  const forwardedToAmbitionCloud = forwarded === "ambition-cloud";

  /* Consultation thank-you: light green stripe + dark blue box (Brokers or Asset Solutions) */
  if (isConsultation) {
    return (
      <div className="min-h-screen bg-[#F5F5EF] font-sans">
        <LayoutNav activeNav="home" />
        <section className="cta-stripe-pattern relative bg-[#00FCB8] px-4 py-14 md:px-6 md:py-20 lg:px-8">
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            {isBrokers && (
              <>
                <h1 className="text-4xl font-bold text-[#1C5472] md:text-5xl lg:text-6xl">
                  26 million Australians need better finance.
                </h1>
                <p className="mt-4 text-lg text-[#1C5472] md:text-xl">
                  We&apos;ve helped 500+.<br />
                  We&apos;re not stopping there. Are you next?
                </p>
              </>
            )}
            {isAssetSolutions && (
              <>
                <h1 className="text-4xl font-bold text-[#1C5472] md:text-5xl lg:text-6xl">
                  Car and equipment finance, made simple.
                </h1>
                <p className="mt-4 text-lg text-[#1C5472] md:text-xl">
                  Fast approvals. Competitive rates.<br />
                  We&apos;re here to get you behind the wheel or into the gear you need.
                </p>
              </>
            )}
            <div className="mt-10 rounded-2xl bg-[#1C5472] px-6 py-10 text-white shadow-xl md:px-10 md:py-12">
              <h2 className="text-2xl font-bold md:text-3xl">Thanks — we&apos;ll be in touch soon.</h2>
              <p className="mt-3 text-lg text-white/95">
                A member of our team will contact you shortly.
              </p>
              {(forwardedToBrokerEngine || forwardedToAmbitionCloud) && (
                <p className="mt-3 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-[#00FCB8]">
                  ✓ Your enquiry has been sent to {forwardedToBrokerEngine ? "Broker Engine" : "Ambition Cloud"} and our team will follow up.
                </p>
              )}
              {isBrokers && (
                <div className="mx-auto mt-8 max-w-xl text-left">
                  <p className="font-semibold text-[#00FCB8]">Next step: complete your home loan application</p>
                  <p className="mt-2 text-sm text-white/90">
                    Interest rates can change quickly. We&apos;ll call you within 1 business day to discuss your situation and start your free assessment — so you can lock in the right loan for you sooner.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-white/90">
                    <li className="flex items-center gap-2">✓ Free home loan eligibility check</li>
                    <li className="flex items-center gap-2">✓ Access to 30+ lenders</li>
                    <li className="flex items-center gap-2">✓ No obligation, no cost to you</li>
                  </ul>
                  <Link
                    href={contactQuery ? `/free-eligibility-test-home-loans?${contactQuery}` : "/free-eligibility-test-home-loans"}
                    className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#00FCB8] px-6 py-3 font-bold text-[#1C5472] transition hover:opacity-90"
                  >
                    Start free eligibility test →
                  </Link>
                </div>
              )}
              {isAssetSolutions && (
                <div className="mx-auto mt-8 max-w-xl text-left">
                  <p className="font-semibold text-[#00FCB8]">What happens next</p>
                  <p className="mt-2 text-sm text-white/90">
                    Our Asset Solutions team will reach out to discuss your car or equipment finance needs. We specialise in personal and commercial vehicles, machinery, and fleet — with fast approvals and competitive rates.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-white/90">
                    <li className="flex items-center gap-2">✓ Car loans & novated leasing</li>
                    <li className="flex items-center gap-2">✓ Equipment & machinery finance</li>
                    <li className="flex items-center gap-2">✓ Commercial fleet solutions</li>
                  </ul>
                  <Link
                    href="/free-eligibility-test-asset-finance"
                    className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#00FCB8] px-6 py-3 font-bold text-[#1C5472] transition hover:opacity-90"
                  >
                    Free eligibility check for asset finance →
                  </Link>
                </div>
              )}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/" className="inline-flex rounded-lg border-2 border-[#1C5472] bg-transparent px-6 py-3 font-bold text-[#1C5472] transition hover:bg-[#1C5472]/10">
                Back to Home
              </Link>
              <Link href={isBrokers ? "/brokers" : "/asset-solutions"} className="inline-flex rounded-lg bg-[#1C5472] px-6 py-3 font-bold text-white transition hover:opacity-90">
                {isBrokers ? "Home loans" : "Asset Solutions"}
              </Link>
            </div>
          </div>
        </section>
        <LayoutFooter />
      </div>
    );
  }

  /* Contact form thank-you (hassan / sham / generic) */
  return (
    <div className="min-h-screen bg-[#1C5472] font-sans">
      <LayoutNav activeNav="contact" />
      <main className="relative flex min-h-[calc(100vh-180px)] flex-col items-center justify-center px-4 py-16 md:px-6">
        <svg
          className="h-24 w-24 text-[#00FCB8] md:h-32 md:w-32"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 52 52"
        >
          <circle className="opacity-20" cx="26" cy="26" r="24" stroke="currentColor" strokeWidth={2} fill="none" />
          <path className="check-draw-path" d="M14 26l10 10 16-20" />
        </svg>
        <h1 className="mt-8 text-center text-4xl font-bold text-white sm:text-5xl">
          {isHassan || isSham ? "You're in good hands." : "Message received."}
        </h1>
        <p className="mt-4 max-w-lg text-center text-xl text-[#39B2B2]">
          {isHassan && "Hassan will reach out to you directly — usually within the same business day."}
          {isSham && "Sham will reach out to you directly — usually within the same business day."}
          {!isHassan && !isSham && "Our team will reach out within one business day."}
        </p>
        {isHassan && (
          <div className="mx-auto mt-8 max-w-lg rounded-2xl bg-[#0A1628] p-8">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#00FCB8] bg-[#1C5472] font-bold text-white">HA</span>
              <div>
                <p className="font-bold text-white">Hassan Arif JP</p>
                <p className="text-sm text-[#39B2B2]">Frontline Financial Brokers</p>
              </div>
            </div>
            <p className="mt-4 text-sm italic text-gray-400">
              Thanks for getting in touch. I personally review every enquiry and will reach out to discuss your goals. Looking forward to speaking with you.
            </p>
          </div>
        )}
        {isSham && (
          <div className="mx-auto mt-8 max-w-lg rounded-2xl bg-[#0A1628] p-8">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#00FCB8] bg-[#1C5472] font-bold text-white">SH</span>
              <div>
                <p className="font-bold text-white">Sham</p>
                <p className="text-sm text-[#39B2B2]">Frontline Financial Asset Solutions</p>
                <span className="mt-1 inline-block rounded-full border border-[#00FCB8] px-2 py-0.5 text-xs text-[#00FCB8]">🏆 Fintelligence Award Winner FY25</span>
              </div>
            </div>
            <p className="mt-4 text-sm italic text-gray-400">
              Thanks for reaching out. I&apos;ll be in touch shortly to talk through your finance options and find the right solution for you.
            </p>
          </div>
        )}
        <div className="my-10 h-px w-full max-w-md bg-white/20" />
        <div className="flex flex-wrap justify-center gap-3">
          <a href="tel:+61422959486" className="rounded-full bg-[#0A1628] px-5 py-2 text-sm text-white">📞 +61 422 959 486</a>
          <a href="mailto:operations@frontline.financial" className="rounded-full bg-[#0A1628] px-5 py-2 text-sm text-white">📧 operations@frontline.financial</a>
          <span className="rounded-full bg-[#0A1628] px-5 py-2 text-sm text-white">📍 Parramatta NSW 2150</span>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="inline-flex rounded-xl bg-[#00FCB8] px-6 py-3 font-bold text-[#0A1628] transition hover:scale-105 hover:shadow-lg">Back to Home</Link>
          <Link href="/brokers" className="inline-flex rounded-xl border-2 border-white px-6 py-3 font-medium text-white transition hover:bg-white/10">Our Services</Link>
        </div>
        <p className="mt-10 text-center text-xs text-gray-400">While you wait, feel free to explore our services and see how we can help.</p>
      </main>
      <LayoutFooter />
    </div>
  );
}

function ThankYouFallback() {
  return (
    <div className="min-h-screen bg-[#1C5472] font-sans flex items-center justify-center">
      <p className="text-[#00FCB8] font-medium">Loading...</p>
    </div>
  );
}

export default function ThankYouClient() {
  return (
    <Suspense fallback={<ThankYouFallback />}>
      <ThankYouContent />
    </Suspense>
  );
}
