"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormConsent, { CONSENT_ERROR } from "@/components/FormConsent";
import { trackLead } from "@/components/MetaPixel";
import { ENTITY } from "@/config/entities";
import { CREDIT_REPORT_BULLETS, CreditReportTerms } from "@/components/FreeCreditReportOffer";

/* Home page: claim the free Equifax credit report (Hassan, 15 Nov 2026). It replaced the
   "26 million Australians" call-back form and the "Save time" card grid. The site-wide pop-up
   (CreditReportPopup) links here. Home loans go to Hassan and Broker Engine, everything else to
   operations and Ambition Cloud, through the same /api/contact routing the old form used. */

const PURPOSES = [
  { id: "brokers", label: "Home loan", hint: "Buying, refinancing or investing in property.", entity: ENTITY.BROKERS },
  { id: "asset-solutions", label: "Car or other loan", hint: "A car, ute, equipment, personal or business loan.", entity: ENTITY.ASSET_SOLUTIONS },
];

const labelClass = "text-sm font-bold text-[#1C5472]";
const inputClass =
  "mt-1.5 w-full rounded-xl border border-transparent bg-[#F5F5EF] px-4 py-3 text-base text-[#1C5472] placeholder-[#1C5472]/40 transition-colors focus:border-[#1C5472] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00FCB8]/60";

export default function FreeCreditReportClaim() {
  const router = useRouter();
  const [purpose, setPurpose] = useState(PURPOSES[0]);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (!consent) {
      setError(CONSENT_ERROR);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: `Free Equifax credit report claim (home page). Finance needed: ${purpose.label}`,
          services: [`Free credit report: ${purpose.label}`],
          consultationService: purpose.id,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      trackLead();
      const forwarded = data.forwardedTo ? `&forwarded=${data.forwardedTo}` : "";
      router.push(`/contact/thank-you?team=${purpose.id}${forwarded}`);
    } catch (err) {
      setError(err.message || "Failed to submit. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <section id="free-credit-report" className="relative scroll-mt-20 overflow-hidden bg-[#1C5472] px-4 py-14 md:px-6 md:py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="flex items-start gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/credit-score-phone.webp"
              alt="A phone showing a credit score with links to the full credit report and enquiries"
              width={1254}
              height={1254}
              loading="lazy"
              className="hidden h-auto w-36 shrink-0 sm:block md:w-44"
            />
            <div>
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
                Claim your free Equifax credit report.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/85">
                Know your score before the lender does. It comes free with your finance assessment, and our team walks you
                through what lenders will see.*
              </p>
            </div>
          </div>
          <ul className="mt-6 space-y-3 text-white">
            {CREDIT_REPORT_BULLETS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <svg className="mt-1 h-4 w-4 shrink-0 text-[#00FCB8]" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
                  <path d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={onSubmit} className="rounded-2xl bg-white p-6 text-[#1C5472] shadow-[0_30px_70px_-25px_rgba(10,22,40,0.75)] sm:p-8">
          <p className="text-2xl font-bold leading-tight">Get your free report</p>
          <p className="mt-1 text-sm text-[#1C5472]/75">It takes a minute. Someone from our team calls within one business day.</p>

          <div role="radiogroup" aria-label="What do you need finance for?" className="mt-6 grid grid-cols-2 gap-1 rounded-xl bg-[#F5F5EF] p-1">
            {PURPOSES.map((p) => {
              const active = purpose.id === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => {
                    setPurpose(p);
                    setConsent(false);
                  }}
                  className={`rounded-lg px-3 py-2.5 text-sm font-bold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00FCB8] ${
                    active ? "bg-[#1C5472] text-white shadow-sm" : "text-[#1C5472]/85 hover:text-[#1C5472]"
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-[#1C5472]/65">{purpose.hint}</p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <label className="block">
              <span className={labelClass}>First name</span>
              <input type="text" required autoComplete="given-name" className={inputClass} {...field("firstName")} />
            </label>
            <label className="block">
              <span className={labelClass}>Last name</span>
              <input type="text" required autoComplete="family-name" className={inputClass} {...field("lastName")} />
            </label>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className={labelClass}>Mobile</span>
              <input type="tel" required autoComplete="tel" inputMode="tel" className={inputClass} placeholder="04XX XXX XXX" {...field("phone")} />
            </label>
            <label className="block">
              <span className={labelClass}>Email</span>
              <input type="email" required autoComplete="email" className={inputClass} placeholder="you@example.com" {...field("email")} />
            </label>
          </div>

          <FormConsent
            key={purpose.id}
            entity={purpose.entity}
            value={consent}
            onChange={setConsent}
            showError={error === CONSENT_ERROR}
            className="mt-5 [&_label]:text-xs [&_label]:leading-relaxed [&_label>span]:text-[#1C5472]/75"
          />
          {error && error !== CONSENT_ERROR && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00FCB8] px-6 py-4 text-base font-bold text-[#0A1628] transition-colors duration-200 hover:bg-[#1C5472] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1C5472] focus-visible:ring-offset-2 disabled:opacity-70"
          >
            {submitting ? "Sending…" : "Claim my free report"}
            {!submitting && (
              <svg className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            )}
          </button>
          <p className="mt-3 text-center text-xs text-[#1C5472]/65">No cost, and no application goes to any lender.</p>
        </form>
      </div>
      <CreditReportTerms id="free-credit-report-terms" className="mx-auto mt-10 max-w-7xl" />
    </section>
  );
}
