import CreditProposalShowcase from "@/components/CreditProposalShowcase";
import FreeCreditReportOffer from "@/components/FreeCreditReportOffer";
import SettledDeals from "@/components/SettledDeals";
import WaveDivider from "@/components/WaveDivider";
import { TEAM_PHONE } from "@/data/finance-applications";

/* The sales pitch under each application form, in the order a nervous borrower
   asks: what happens next, would you take my deal, what's in it for me, who am I
   dealing with, and what's the catch. Copy lives with each application in
   data/finance-applications.js. */

export const COMPARE = [
  ["Only that lender's products", "30+ lenders compared for you"],
  ["One lender's rules on how it reads your income", "The lenders whose rules fit your situation"],
  ["Every application you try shows on your credit file", "We choose the right lender before anything is lodged"],
  ["You do the paperwork", "We handle the paperwork and deal with the lender"],
];
const HOME_LOAN_COMPARE = ["The bank's staff work for the bank", "We're legally required to act in your best interests"];

function Check() {
  return (
    <svg className="mt-1 h-4 w-4 shrink-0 text-[#1C5472]" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function Cross() {
  return (
    <svg className="mt-1 h-4 w-4 shrink-0 text-[#1C5472]/50" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function NextSteps({ steps }) {
  return (
    <section className="section-dot-grid px-4 py-14 md:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold tracking-tight text-[#1C5472] md:text-4xl">What happens after you send this</h2>
        <ol className="mt-10 grid md:grid-cols-4">
          {steps.map((step, i) => {
            const last = i === steps.length - 1;
            return (
              <li key={step.title} className="relative pb-8 pl-14 last:pb-0 md:pb-0 md:pl-0 md:pr-8 md:pt-14 md:last:pr-0">
                {!last && (
                  <span
                    className="absolute bottom-0 left-[19px] top-10 w-0.5 bg-[#39B2B2]/50 md:bottom-auto md:left-10 md:right-0 md:top-[19px] md:h-0.5 md:w-auto"
                    aria-hidden
                  />
                )}
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#1C5472] font-bold text-[#00FCB8]">
                  {i + 1}
                </span>
                <h3 className="text-lg font-bold text-[#1C5472]">{step.title}</h3>
                <p className="mt-1.5 leading-relaxed text-[#1C5472]/85">{step.desc}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function SelfEmployedVideo() {
  return (
    <section className="px-4 pb-14 pt-14 md:px-6 md:pb-20 md:pt-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,300px)_minmax(0,640px)] md:gap-14">
        <figure className="order-2 md:order-1">
          <video
            controls
            playsInline
            preload="none"
            poster="/images/articles/parramatta-lanes-video-poster.webp"
            aria-label="Video: Hassan Arif on how lenders read a self-employed borrower's tax return"
            className="mx-auto aspect-[9/16] w-full max-w-[280px] rounded-2xl bg-[#0A1628] shadow-xl"
          >
            <source src="/videos/parramatta-lanes-self-employed.mp4" type="video/mp4" />
          </video>
          <figcaption className="mt-2 text-center text-xs text-[#1C5472]/75">Figures in the video are illustrative.</figcaption>
        </figure>
        <div className="order-1 md:order-2">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#1C5472] md:text-4xl">
            Self-employed? Your tax return isn&apos;t the whole story.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#1C5472]/85">
            Lenders read self-employed income in different ways, and the first bank&apos;s answer isn&apos;t the only one. Hassan
            explains it in under a minute.
          </p>
          <a
            href="/self-employed-home-loans/how-lenders-read-your-tax-return"
            className="mt-4 inline-block font-bold text-[#1C5472] underline underline-offset-4 hover:no-underline"
          >
            How lenders read your tax return
          </a>
        </div>
      </div>
    </section>
  );
}

export function Compare({ rows }) {
  return (
    <section className="px-4 pb-14 md:px-6 md:pb-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold tracking-tight text-[#1C5472] md:text-4xl">Why not just go to the bank?</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl bg-[#1C5472]/5 p-6">
            <h3 className="text-lg font-bold text-[#1C5472]/80">Applying on your own</h3>
            <ul className="mt-4 space-y-3 text-[#1C5472]/85">
              {rows.map(([own]) => (
                <li key={own} className="flex items-start gap-3"><Cross />{own}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h3 className="text-lg font-bold text-[#1C5472]">Applying through us</h3>
            <ul className="mt-4 space-y-3 font-medium text-[#1C5472]">
              {rows.map(([, us]) => (
                <li key={us} className="flex items-start gap-3"><Check />{us}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AwardAndBroker({ app }) {
  const { broker, review } = app;
  const isSham = broker.name === "Sham";
  return (
    <section className="px-4 pb-14 md:px-6 md:pb-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#1C5472] md:text-4xl">
            {isSham ? "An award-winning broker behind your application." : "You'll talk with Hassan through the process."}
          </h2>
          <div className="mt-6 flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={broker.photo} alt={`${broker.fullName}, ${broker.title} at Frontline Financial`} width={80} height={80} loading="lazy" className="h-20 w-20 shrink-0 rounded-full object-cover" />
            <div>
              <p className="text-lg font-bold text-[#1C5472]">{broker.fullName}</p>
              <p className="text-[#1C5472]/85">{broker.title}</p>
            </div>
          </div>
          {isSham ? (
            <>
              <p className="mt-5 max-w-xl leading-relaxed text-[#1C5472]/85">
                Someone from our team makes the first call and keeps things moving. Sham runs vehicle and equipment finance at
                Frontline Financial and works with the team across 30+ lenders, recognised for this work at the Fintelligence
                Broker Awards.
              </p>
              <figure className="mt-5 max-w-xl overflow-hidden rounded-2xl bg-white shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/fintelligence-award.png"
                  alt="Sham accepting the Vehicle and Equipment Finance award at the Fintelligence Broker Awards FY25"
                  width={1024}
                  height={726}
                  loading="lazy"
                  className="h-auto w-full"
                />
                <figcaption className="p-4 text-sm text-[#1C5472]">
                  <span className="font-bold">Winner, Fintelligence Broker Awards FY25,</span> Vehicle and Equipment Finance.{" "}
                  <a
                    href="https://fintelligence.com.au/customer-success-story-frontline-financial-group/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold underline underline-offset-2 hover:no-underline"
                  >
                    Read our story
                  </a>
                </figcaption>
              </figure>
            </>
          ) : (
            <p className="mt-5 max-w-xl leading-relaxed text-[#1C5472]/85">
              Someone from our team makes the first call and keeps things moving. Hassan stays across your loan, and you&apos;ll talk
              with him through the process. He has a background in tax and accounting, so he reads your returns and financial
              statements the way a credit assessor will, before any lender sees them.
            </p>
          )}
        </div>

        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#1C5472] md:text-4xl">Common questions</h2>
          <div className="mt-6 border-t border-[#1C5472]/20">
            {app.questions.map((item) => (
              <details key={item.q} className="group border-b border-[#1C5472]/20">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left [&::-webkit-details-marker]:hidden">
                  <h3 className="font-bold text-[#1C5472]">{item.q}</h3>
                  <svg className="h-5 w-5 shrink-0 text-[#1C5472] transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="max-w-2xl pb-4 pr-8 leading-relaxed text-[#1C5472]/85">{item.a}</p>
              </details>
            ))}
          </div>
          <figure className="mt-6 rounded-2xl bg-white p-5 shadow-md">
            <div className="flex gap-0.5 text-[#FFD700]" role="img" aria-label="5 out of 5 stars">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <blockquote className="mt-2 leading-relaxed text-[#1C5472]">&ldquo;{review.text}&rdquo;</blockquote>
            <figcaption className="mt-3 text-sm text-[#1C5472]/85">{review.name}, Google review</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

export function FinalPush({ ctaLabel = "Back to your application" }) {
  return (
    <section className="cta-stripe-pattern relative bg-[#00FCB8] px-4 py-12 md:px-6 md:py-16 lg:px-8">
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-[#1C5472] md:text-5xl">About 2 minutes. Then it&apos;s our problem.</h2>
        <p className="mt-3 text-lg text-[#1C5472]">Tell us what you need and someone from our team calls you within one business day.</p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#application" className="inline-flex w-full items-center justify-center rounded-lg bg-[#1C5472] px-6 py-3 font-bold text-white transition-all duration-200 hover:scale-105 hover:opacity-90 sm:w-auto">
            {ctaLabel}
          </a>
          <a href={TEAM_PHONE.link} className="inline-flex w-full items-center justify-center rounded-lg border-2 border-[#1C5472] px-6 py-3 font-bold text-[#1C5472] transition-colors hover:bg-[#1C5472]/10 sm:w-auto">
            Call us: {TEAM_PHONE.display}
          </a>
        </div>
      </div>
    </section>
  );
}

export default function ApplicationDetails({ app }) {
  const isHomeLoan = app.slug === "home-loan";
  return (
    <>
      <div className="bg-[#1C5472]">
        <WaveDivider fill="#F5F5EF" />
      </div>
      <NextSteps steps={app.nextSteps} />
      <WaveDivider fill="#1C5472" />

      {isHomeLoan ? (
        <CreditProposalShowcase ctaHref="#application" ctaLabel="Back to your application" />
      ) : (
        <SettledDeals {...app.deals} ctaHref="#application" ctaLabel="Back to your application" />
      )}

      {app.freeReport ? (
        <>
          <div className="bg-[#1C5472]">
            <WaveDivider fill="#0A1628" />
          </div>
          <FreeCreditReportOffer />
          <div className="bg-[#0A1628]">
            <WaveDivider fill="#F5F5EF" />
          </div>
        </>
      ) : (
        <div className="bg-[#1C5472]">
          <WaveDivider fill="#F5F5EF" />
        </div>
      )}

      {isHomeLoan ? <SelfEmployedVideo /> : <div className="h-14 md:h-20" aria-hidden />}
      <Compare rows={isHomeLoan ? [...COMPARE, HOME_LOAN_COMPARE] : COMPARE} />
      <AwardAndBroker app={app} />
      <WaveDivider fill="#00FCB8" />
      <FinalPush />
    </>
  );
}
