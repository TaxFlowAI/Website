"use client";

import { useState } from "react";
import FormConsent, { CONSENT_ERROR } from "@/components/FormConsent";
import { ENTITY } from "@/config/entities";
import { trackMeta } from "@/components/MetaPixel";
import useAdAttribution from "@/components/useAdAttribution";

const PHONE = "+61 422 959 486";
const PHONE_LINK = "tel:+61422959486";

/* `type` is Ambition Cloud's application type: see /api/contact/ambition-cloud.js. */
const USES = [
  { label: "A car for personal use", type: "consumer" },
  { label: "A car for my business", type: "commercial" },
  { label: "A ute or van for work", type: "commercial" },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "mt-1.5 w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-[15px] text-[#1C5472] placeholder-gray-400 transition focus:border-[#00FCB8] focus:outline-none focus:ring-2 focus:ring-[#00FCB8]/30";
const labelClass = "block text-sm font-bold text-[#1C5472]";

export default function CarLoanForm() {
  const [use, setUse] = useState(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [consent, setConsent] = useState(false);
  const [showConsentError, setShowConsentError] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [result, setResult] = useState(null);
  const attributionRef = useAdAttribution();

  const validate = () => {
    const e = {};
    if (!use) e.use = "Please pick one.";
    if (!fullName.trim()) e.fullName = "Your name is required.";
    if (!phone.trim()) e.phone = "Your number is required.";
    if (!email.trim()) e.email = "Your email is required.";
    else if (!EMAIL_REGEX.test(email)) e.email = "Please enter a valid email address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setSubmitError(null);
    setShowConsentError(false);
    if (!validate()) return;
    if (!consent) {
      setShowConsentError(true);
      setSubmitError(CONSENT_ERROR);
      return;
    }
    setSubmitting(true);
    const nameParts = fullName.trim().split(/\s+/);
    const amountDigits = amount.replace(/\D/g, "");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: nameParts[0],
          lastName: nameParts.slice(1).join(" ") || "(not provided)",
          email: email.trim(),
          phone: phone.trim(),
          teamMember: "sham",
          consultationService: "asset-solutions",
          services: ["Car loan"],
          preferredContact: "phone",
          campaign: "car-loan-form",
          amount: amountDigits,
          applicationType: use.type,
          assetType: "car",
          attribution: attributionRef.current,
          message: [
            "Website enquiry: CAR LOAN form.",
            `Buying: ${use.label}`,
            `Rough amount: ${amountDigits ? `$${Number(amountDigits).toLocaleString("en-AU")}` : "Not given"}`,
          ].join("\n"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) {
        setSubmitError(data.error || `Something went wrong. Please try again or call us on ${PHONE}.`);
        setSubmitting(false);
        return;
      }
      trackMeta("Lead");
      setResult({ firstName: nameParts[0], privacyLink: data.privacyLink, privacyEmailed: data.privacyEmailed });
    } catch {
      setSubmitError(`Something went wrong. Please try again or call us on ${PHONE}.`);
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <div className="py-6 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#00FCB8]/15">
          <svg className="h-9 w-9 text-[#00b884]" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <h2 className="mt-5 text-2xl font-bold text-[#1C5472]">Thanks {result.firstName}. Someone from our team will call you within one business day.</h2>
        {result.privacyLink && (
          <div className="mt-6 rounded-2xl bg-[#F5F5EF] p-5">
            <p className="font-bold text-[#1C5472]">Want to save time on the call?</p>
            <p className="mt-2 text-sm text-[#1C5472]/80">
              Sign our privacy consent now. We need it before we can check your options with lenders, and it includes our
              Credit Guide and Quote. Have your driver licence handy, because it asks for a photo of the front and back.
            </p>
            <a
              href={result.privacyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-center rounded-xl bg-[#00FCB8] py-3.5 text-base font-bold text-[#0A1628] shadow-lg shadow-[#00FCB8]/30 transition hover:scale-[1.02]"
            >
              Sign your privacy consent
            </a>
            {result.privacyEmailed && (
              <p className="mt-3 text-xs text-[#1C5472]/70">We&apos;ve also emailed you this link. It works for 24 hours.</p>
            )}
          </div>
        )}
        <p className="mt-5 text-sm text-[#1C5472]/80">
          In a hurry? Call{" "}
          <a href={PHONE_LINK} className="font-bold text-[#39B2B2] hover:underline">{PHONE}</a>.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-[#1C5472]">Get a call from our team</h2>
        <span className="shrink-0 rounded-full bg-[#00FCB8]/15 px-3 py-1 text-xs font-bold text-[#00795c]">1 MIN</span>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
        <fieldset>
          <legend className={labelClass}>What are you buying?</legend>
          <div className="mt-2 grid gap-2">
            {USES.map((option) => {
              const selected = use?.label === option.label;
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => { setUse(option); setErrors((prev) => ({ ...prev, use: undefined })); }}
                  aria-pressed={selected}
                  className={`w-full rounded-xl px-4 py-3 text-left text-[15px] font-bold transition-all duration-150 ${
                    selected
                      ? "bg-[#00FCB8] text-[#0A1628] shadow-md shadow-[#00FCB8]/40"
                      : "border-2 border-gray-200 bg-white text-[#1C5472] hover:border-[#39B2B2] hover:bg-[#39B2B2]/5"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          {errors.use && <p className="mt-1 text-sm text-red-600">{errors.use}</p>}
        </fieldset>

        <div>
          <label htmlFor="cl-name" className={labelClass}>Full name</label>
          <input id="cl-name" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} placeholder="Your full name" autoComplete="name" />
          {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="cl-phone" className={labelClass}>Mobile</label>
          <input id="cl-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="04XX XXX XXX" autoComplete="tel" inputMode="tel" />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="cl-email" className={labelClass}>Email</label>
          <input id="cl-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="you@example.com" autoComplete="email" inputMode="email" />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="cl-amount" className={labelClass}>
            Rough amount to borrow <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <input id="cl-amount" type="text" value={amount} onChange={(e) => setAmount(e.target.value)} className={inputClass} placeholder="$30,000" inputMode="numeric" />
        </div>

        <FormConsent entity={ENTITY.ASSET_SOLUTIONS} value={consent} onChange={setConsent} showError={showConsentError} />

        {submitError && !showConsentError && (
          <p className="text-sm text-red-600" role="alert">{submitError}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center rounded-xl bg-[#00FCB8] py-3.5 text-lg font-bold text-[#0A1628] shadow-lg shadow-[#00FCB8]/30 transition hover:scale-[1.02] hover:shadow-xl hover:shadow-[#00FCB8]/40 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? "Sending…" : "Send my enquiry"}
        </button>
      </form>
    </>
  );
}
