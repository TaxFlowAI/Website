"use client";

import { useEffect, useRef, useState } from "react";
import FormConsent, { CONSENT_ERROR } from "@/components/FormConsent";
import { ENTITY } from "@/config/entities";
import { trackMeta } from "@/components/MetaPixel";

const PHONE = "+61 422 959 486";
const PHONE_LINK = "tel:+61422959486";

/* six taps about the deal, then contact details. `label` is the short name used
   in the summary, the email and the Broker Engine card notes. */
const QUALIFIERS = [
  {
    key: "goal",
    label: "Goal",
    question: "What are you looking to do?",
    options: ["Buy a home to live in", "Buy an investment property", "Refinance my home loan", "Not sure yet"],
  },
  {
    key: "income",
    label: "Income",
    question: "How do you earn your income?",
    options: ["Sole trader", "Company director", "Through a trust", "Contractor on an ABN", "Wage plus a side business"],
  },
  {
    key: "trading",
    label: "Self-employed for",
    question: "How long have you been self-employed?",
    options: ["Less than 1 year", "1 to 2 years", "2 years or more"],
  },
  {
    key: "returns",
    label: "Tax returns",
    question: "Are your tax returns up to date?",
    options: ["Yes, the last 2 years", "Only the last year", "No, I'm behind", "Not sure"],
  },
  {
    key: "borrow",
    label: "Borrowing",
    question: "Roughly how much do you want to borrow?",
    options: ["Under $500k", "$500k to $800k", "$800k to $1.2m", "Over $1.2m", "Not sure yet"],
  },
  {
    key: "deposit",
    label: "Deposit or equity",
    question: "How much deposit or equity do you have?",
    options: ["Under 10%", "10% to 20%", "20% or more", "Not sure"],
  },
];

const TEXT_STEPS = [
  { key: "fullName", type: "text", label: "What's your name?", placeholder: "Your name", autoComplete: "name" },
  { key: "phone", type: "tel", label: "Best number for Hassan to call?", placeholder: "04XX XXX XXX", autoComplete: "tel", inputMode: "tel" },
  { key: "email", type: "email", label: "And your email?", placeholder: "you@example.com", autoComplete: "email", inputMode: "email" },
];

/* wizard: 0-5 qualifiers, 6-8 contact, 9 consent+send */
const FIRST_TEXT_STEP = QUALIFIERS.length;
const FINAL_STEP = QUALIFIERS.length + TEXT_STEPS.length;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SENDING_MESSAGES = [
  "Opening a fresh file…",
  "Dusting off the depreciation schedule…",
  "Lining up 30+ lenders' rules…",
  "Sharpening Hassan's pencil…",
];

function track(eventName, fbStandard) {
  try {
    if (typeof window === "undefined") return;
    (window.dataLayer = window.dataLayer || []).push({ event: eventName });
    if (typeof window.gtag === "function") window.gtag("event", eventName);
    if (fbStandard) trackMeta(fbStandard);
    else trackMeta(eventName, false);
  } catch {
    /* analytics must never break the page */
  }
}

const inputClass =
  "mt-1.5 w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-[15px] text-[#1C5472] placeholder-gray-400 transition focus:border-[#00FCB8] focus:outline-none focus:ring-2 focus:ring-[#00FCB8]/30";

export default function AssessmentForm() {
  const [answers, setAnswers] = useState({});
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [showConsentError, setShowConsentError] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [step, setStep] = useState(0);
  const [sendingMsg, setSendingMsg] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!submitting) return;
    const id = setInterval(() => setSendingMsg((i) => (i + 1) % SENDING_MESSAGES.length), 1100);
    return () => clearInterval(id);
  }, [submitting]);

  /* focus the input on each contact step; the qualifiers are taps */
  useEffect(() => {
    if (step >= FIRST_TEXT_STEP && step < FINAL_STEP) {
      document.getElementById("hl-step-input")?.focus();
    }
  }, [step]);

  const onFirstInteraction = () => {
    if (!startedRef.current) {
      startedRef.current = true;
      track("hl_form_start");
    }
  };

  /* tap an answer to advance. Advance is tied to the question's own step so a
     double-tap can't skip the next question. */
  const setAnswer = (key, val) => {
    onFirstInteraction();
    setAnswers((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    const ownStep = QUALIFIERS.findIndex((q) => q.key === key);
    setTimeout(() => setStep((s) => (s === ownStep ? s + 1 : s)), 220);
  };

  const textErrors = (key) => {
    if (key === "fullName" && !fullName.trim()) return "Your name is required.";
    if (key === "phone" && !phone.trim()) return "Your number is required.";
    if (key === "email") {
      if (!email.trim()) return "Your email is required.";
      if (!EMAIL_REGEX.test(email)) return "Please enter a valid email address.";
    }
    return null;
  };

  const validateStep = (i) => {
    const e = {};
    if (i < FIRST_TEXT_STEP) {
      const q = QUALIFIERS[i];
      if (!answers[q.key]) e[q.key] = "Please pick one.";
    } else if (i < FINAL_STEP) {
      const s = TEXT_STEPS[i - FIRST_TEXT_STEP];
      const err = textErrors(s.key);
      if (err) e[s.key] = err;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* the first step that still needs an answer, or null */
  const firstIncompleteStep = () => {
    const qi = QUALIFIERS.findIndex((q) => !answers[q.key]);
    if (qi >= 0) return qi;
    const ti = TEXT_STEPS.findIndex((s) => textErrors(s.key));
    return ti >= 0 ? FIRST_TEXT_STEP + ti : null;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (step < FINAL_STEP) {
      if (validateStep(step)) setStep(step + 1);
      return;
    }
    setSubmitError(null);
    setShowConsentError(false);
    const missing = firstIncompleteStep();
    if (missing !== null) {
      validateStep(missing);
      setStep(missing);
      return;
    }
    if (!consent) {
      setShowConsentError(true);
      setSubmitError(CONSENT_ERROR);
      return;
    }
    setSendingMsg(0);
    setSubmitting(true);
    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "(not provided)";
    const labelled = Object.fromEntries(QUALIFIERS.map((q) => [q.label, answers[q.key]]));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email: email.trim(),
          phone: phone.trim(),
          teamMember: "hassan",
          consultationService: "brokers",
          services: ["Self-Employed Home Loan"],
          preferredContact: "phone",
          campaign: "self-employed-assessment",
          answers: labelled,
          message: [
            "Free assessment request: SELF-EMPLOYED HOME LOAN quiz.",
            ...QUALIFIERS.map((q) => `${q.label}: ${answers[q.key]}`),
          ].join("\n"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) {
        setSubmitError(data.error || `Something went wrong. Please try again or call us on ${PHONE}.`);
        setSubmitting(false);
        return;
      }
      track("hl_form_submit", "Lead");
      setSubmitted(true);
    } catch {
      setSubmitError(`Something went wrong. Please try again or call us on ${PHONE}.`);
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-10 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#00FCB8]/15">
          <svg className="h-9 w-9 text-[#00b884]" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <h2 className="mt-5 text-2xl font-bold text-[#1C5472]">Thanks. Hassan will call you within one business day.</h2>
        <p className="mt-3 text-[#1C5472]/80">
          If you have your last two years of tax returns handy, keep them nearby for the call. In a hurry? Call{" "}
          <a href={PHONE_LINK} className="font-bold text-[#39B2B2] hover:underline">{PHONE}</a>.
        </p>
      </div>
    );
  }

  const progress = (step / (FINAL_STEP + 1)) * 100;

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-[#1C5472]">Get your free assessment</h2>
        <span className="shrink-0 rounded-full bg-[#00FCB8]/15 px-3 py-1 text-xs font-bold text-[#00795c]">2 MIN</span>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs font-bold text-[#39B2B2]">
          <span>{step < FINAL_STEP ? `Question ${step + 1} of ${FINAL_STEP}` : "Last step"}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#39B2B2] to-[#00FCB8] transition-all duration-300"
            style={{ width: `${Math.max(6, progress)}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} onFocusCapture={onFirstInteraction} className="mt-6" noValidate>
        {step > 0 && (
          <button
            type="button"
            onClick={() => { setErrors({}); setStep(step - 1); }}
            className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-gray-400 transition hover:text-[#39B2B2]"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        )}

        {/* qualifier steps: tap an answer to advance */}
        {step < FIRST_TEXT_STEP && (() => {
          const q = QUALIFIERS[step];
          return (
            <fieldset key={q.key}>
              <legend className="text-lg font-bold text-[#1C5472]">{q.question}</legend>
              <div className="mt-4 grid gap-2.5">
                {q.options.map((opt) => {
                  const selected = answers[q.key] === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setAnswer(q.key, opt)}
                      aria-pressed={selected}
                      className={`w-full rounded-xl px-5 py-3.5 text-left text-base font-bold transition-all duration-150 ${
                        selected
                          ? "scale-[1.02] bg-[#00FCB8] text-[#0A1628] shadow-md shadow-[#00FCB8]/40"
                          : "border-2 border-gray-200 bg-white text-[#1C5472] hover:border-[#39B2B2] hover:bg-[#39B2B2]/5"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {errors[q.key] && <p className="mt-2 text-sm text-red-600">{errors[q.key]}</p>}
              <p className="mt-3 text-center text-xs text-gray-400">Tap one to continue</p>
            </fieldset>
          );
        })()}

        {/* contact steps */}
        {step >= FIRST_TEXT_STEP && step < FINAL_STEP && (() => {
          const s = TEXT_STEPS[step - FIRST_TEXT_STEP];
          const value = s.key === "fullName" ? fullName : s.key === "phone" ? phone : email;
          const setter = s.key === "fullName" ? setFullName : s.key === "phone" ? setPhone : setEmail;
          return (
            <div key={s.key}>
              <label htmlFor="hl-step-input" className="block text-lg font-bold text-[#1C5472]">{s.label}</label>
              <input
                id="hl-step-input"
                type={s.type}
                value={value}
                onChange={(e) => setter(e.target.value)}
                className={inputClass}
                placeholder={s.placeholder}
                autoComplete={s.autoComplete}
                inputMode={s.inputMode}
                enterKeyHint="next"
              />
              {errors[s.key] && <p className="mt-1 text-sm text-red-600">{errors[s.key]}</p>}
              <button
                type="submit"
                className="group mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#00FCB8] py-3.5 text-lg font-bold text-[#0A1628] shadow-lg shadow-[#00FCB8]/30 transition hover:scale-[1.02] hover:shadow-xl hover:shadow-[#00FCB8]/40"
              >
                Next
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          );
        })()}

        {/* final step: summary + consent + send */}
        {step === FINAL_STEP && (
          <div>
            <p className="text-lg font-bold text-[#1C5472]">Ready to send</p>
            <dl className="mt-3 space-y-1.5 rounded-2xl bg-[#F5F5EF] p-4 text-sm text-[#1C5472]">
              {[
                ...QUALIFIERS.map((q) => [q.label, answers[q.key]]),
                ["Name", fullName],
                ["Number", phone],
                ["Email", email],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4">
                  <dt className="shrink-0 text-[#1C5472]/60">{label}</dt>
                  <dd className="text-right font-bold">{value || "—"}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4">
              <FormConsent
                entity={ENTITY.BROKERS}
                value={consent}
                onChange={(v) => { setConsent(v); setShowConsentError(false); setSubmitError(null); }}
                showError={showConsentError}
              />
            </div>
            {submitError && submitError !== CONSENT_ERROR && <p className="mt-3 text-sm text-red-600">{submitError}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#00FCB8] py-4 text-lg font-bold text-[#0A1628] shadow-lg shadow-[#00FCB8]/30 transition hover:scale-[1.02] hover:shadow-xl hover:shadow-[#00FCB8]/40 disabled:cursor-wait"
            >
              {submitting ? (
                <span className="flex items-center gap-3" role="status" aria-live="polite">
                  <span className="h-5 w-5 animate-spin rounded-full border-[3px] border-[#0A1628]/25 border-t-[#0A1628] motion-reduce:animate-none" aria-hidden />
                  <span key={sendingMsg} className="text-base">{SENDING_MESSAGES[sendingMsg]}</span>
                </span>
              ) : (
                "Send to Hassan"
              )}
            </button>
            <p className="mt-3 text-center text-xs text-gray-400">Sending this doesn&apos;t run a credit check or lodge anything with a lender.</p>
          </div>
        )}
      </form>
    </>
  );
}
