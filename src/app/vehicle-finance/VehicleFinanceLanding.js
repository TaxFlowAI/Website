import Script from "next/script";
import FrontlineLogoFull from "@/components/FrontlineLogoFull";
import LayoutFooter from "@/components/LayoutFooter";
import OpenStatus from "@/components/OpenStatus";
import WaveDivider from "@/components/WaveDivider";
import FreeCreditReportOffer from "@/components/FreeCreditReportOffer";
import { COMPARE, Compare, FinalPush, NextSteps } from "@/app/apply/[product]/ApplicationDetails";
import { HOURS } from "@/config/business-hours";
import { GOOGLE } from "@/config/location";
import { ANGLES, CAR_LOAN, PHONE, REVIEWS } from "@/data/vehicle-finance";
import AssessmentForm from "./AssessmentForm";
import { AngleBrokerAndFaq, AngleDeals } from "./AngleSections";

const STAR_PATH =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

function Stars({ className = "h-4 w-4" }) {
  return (
    <span className="flex shrink-0 gap-0.5 text-[#FFD700]" role="img" aria-label="5 out of 5 stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden>
          <path d={STAR_PATH} />
        </svg>
      ))}
    </span>
  );
}

/* One job on this page, so no site menu, no TaxFlowAI bar and no sticking to the screen */
function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 md:px-6 md:py-3 lg:px-8">
        <FrontlineLogoFull className="h-10 w-auto" />
        <div className="flex items-center gap-4">
          <span className="hidden text-sm font-medium text-[#1C5472] sm:inline-flex"><OpenStatus /></span>
          <a
            href={PHONE.link}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border-2 border-[#1C5472] px-3 text-sm font-bold text-[#1C5472] transition-colors hover:bg-[#1C5472]/10"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="sm:hidden">Call us</span>
            <span className="hidden sm:inline">{PHONE.display}</span>
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="section-dot-grid-dark relative px-4 pb-10 pt-5 md:px-6 md:pb-20 md:pt-14 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-start gap-5 lg:grid-cols-[minmax(0,1fr)_480px] lg:gap-14">
        <div className="text-center lg:sticky lg:top-10 lg:text-left">
          {/* All six are in the HTML. page.js picks one before first paint, from the ad that was tapped. */}
          {Object.entries(ANGLES).map(([key, angle]) => (
            <div key={key} className={`vf-angle vf-angle-${key}`}>
              <h1 className="text-balance text-[1.75rem] font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                {angle.headline[0]} <span className="text-[#00FCB8]">{angle.headline[1]}</span>
              </h1>
              <p className="mx-auto mt-2 max-w-xl text-pretty text-[15px] leading-snug text-white/90 sm:text-lg lg:mx-0 lg:mt-4">{angle.sub}</p>
            </div>
          ))}
          <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[13px] font-medium text-white sm:text-sm lg:mt-5 lg:justify-start">
            <li className="flex items-center gap-1.5">
              <Stars className="h-3.5 w-3.5" />
              5.0 on Google from 100+ reviews
            </li>
            <li>Winner, Fintelligence Broker Awards FY25</li>
          </ul>
          <ul className="mt-6 hidden max-w-md space-y-2.5 text-[15px] text-white/90 lg:block">
            {CAR_LOAN.points.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <svg className="mt-1 h-4 w-4 shrink-0 text-[#00FCB8]" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
                  <path d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <AssessmentForm />
          <div className="relative mx-auto mt-5 flex max-w-md items-center justify-center gap-3 text-left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={CAR_LOAN.broker.photo} alt="" width={48} height={48} className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-[#00FCB8]" />
            <p className="text-sm leading-snug text-white/90">
              <span className="font-bold text-white">Sham leads vehicle finance at Frontline Financial.</span>{" "}
              Rather talk it through? Call{" "}
              <a href={PHONE.link} className="whitespace-nowrap font-bold text-[#00FCB8] underline underline-offset-2 hover:no-underline">{PHONE.display}</a>
            </p>
          </div>
          <p className="relative mt-2 text-center text-sm text-white/85 sm:hidden"><OpenStatus /></p>
        </div>
      </div>
    </section>
  );
}

function ReviewsAndOffice() {
  return (
    <section className="section-dot-grid-dark px-4 py-14 md:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
          5.0 on Google from 100+ reviews.
        </h2>
        <ul className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
          {REVIEWS.map((review) => (
            <li key={review.name} className="w-[82%] shrink-0 snap-center sm:w-[46%] md:w-auto">
              <figure className="flex h-full flex-col rounded-2xl bg-white p-5 text-[#1C5472] shadow-md">
                <Stars />
                <blockquote className="mt-3 flex-1 leading-relaxed">&ldquo;{review.text}&rdquo;</blockquote>
                <figcaption className="mt-3 text-sm font-bold">{review.name}, Google review</figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <a
          href={GOOGLE.reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block font-bold text-[#00FCB8] underline underline-offset-4 hover:no-underline"
        >
          Read them all on Google
        </a>

        <div className="mt-12 flex flex-col gap-6 border-t border-white/20 pt-10 sm:flex-row sm:items-center sm:gap-10">
          {/* A designed graphic with the logo and the Level 49 callout, so it's never cropped */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/frontline-8-parramatta-square-800.webp"
            alt="The 8 Parramatta Square tower, with an arrow marking Frontline Financial's office on Level 49."
            width={800}
            height={1066}
            loading="lazy"
            className="h-auto w-full max-w-sm rounded-2xl shadow-[0_24px_50px_-24px_rgba(10,22,40,0.7)] sm:w-72"
          />
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">A real team in a real office.</h2>
            <p className="mt-3 text-white/90">Level 49, 8 Parramatta Square, Parramatta NSW 2150</p>
            <p className="mt-1 text-white/90">We take calls {HOURS.label}.</p>
            <a
              href={GOOGLE.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-bold text-[#00FCB8] underline underline-offset-4 hover:no-underline"
            >
              Get directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* One job: get the person from the ad through the assessment. The order after the form is
   the order a doubtful borrower asks: would you take my deal, what do I get, what happens
   next, why not just go to the bank, who are you and what's the catch, can I trust you. */
export default function VehicleFinanceLanding() {
  return (
    <div className="min-h-screen bg-[#F5F5EF] font-sans">
      <Header />
      <Hero />

      <div className="bg-[#1C5472]"><WaveDivider fill="#F5F5EF" /></div>
      <AngleDeals />

      <div className="bg-[#F5F5EF]"><WaveDivider fill="#0A1628" /></div>
      <FreeCreditReportOffer ctaLabel="Get my free assessment" />

      <div className="bg-[#0A1628]"><WaveDivider fill="#F5F5EF" /></div>
      <NextSteps steps={CAR_LOAN.nextSteps} />
      <Compare rows={COMPARE} />
      <AngleBrokerAndFaq />

      <div className="bg-[#F5F5EF]"><WaveDivider fill="#1C5472" /></div>
      <ReviewsAndOffice />

      <div className="bg-[#1C5472]"><WaveDivider fill="#00FCB8" /></div>
      <FinalPush ctaLabel="Back to your assessment" />

      <div className="bg-[#00FCB8]"><WaveDivider fill="#1C5472" /></div>
      <section className="bg-[#1C5472] px-4 pt-4 md:px-6 lg:px-8">
        <p className="mx-auto max-w-7xl text-sm leading-relaxed text-white/85">
          Approval is subject to lender assessment and credit criteria. General information only. It does not take your personal
          circumstances into account.
        </p>
      </section>
      <LayoutFooter />
      {/* room for the phone's sticky button, so it never covers the licence and legal lines */}
      <div className="h-20 bg-[#1C5472] md:hidden" aria-hidden />

      {/* Analytics, only when the ID is configured. TODO(Hassan): set NEXT_PUBLIC_GA4_ID in the
          deployment environment. The Meta Pixel loads site-wide from the root layout. Events:
          vf_form_view, vf_form_start, vf_step_<question key>, vf_form_submit (+ Meta "Lead"),
          vf_privacy_click, vf_call_click (+ Meta "Contact"). */}
      {process.env.NEXT_PUBLIC_GA4_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA4_ID}');`}
          </Script>
        </>
      )}
    </div>
  );
}
