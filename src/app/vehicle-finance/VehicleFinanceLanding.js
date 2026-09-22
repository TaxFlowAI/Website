"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import WaveDivider from "@/components/WaveDivider";
import FormConsent, { CONSENT_ERROR } from "@/components/FormConsent";
import { ENTITY } from "@/config/entities";

/* ================= real data only ================= */

const PHONE = "+61 422 959 486";
const PHONE_LINK = "tel:+61422959486";
const GOOGLE_REVIEW_LINK = "https://www.google.com/search?q=frontline+financial+group&rlz=1C1RXQR_en-GBAU1181AU1181&oq=frontline+financ&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARBFGDkyBggCEEUYPDIGCAMQRRg8MgYIBBBFGEEyBggFEEUYPDIGCAYQRRhBMgYIBxBFGEHSAQgyMDM4ajBqNKgCALACAQ&sourceid=chrome&ie=UTF-8#lrd=0x22393410488c393:0x1a79eb822c43357b,1,,,,";

/* Real Google reviews, verbatim and unedited — vehicle/asset mentions first.
   TODO(Hassan): confirm selection + supply dates before go-live. */
const REVIEWS = [
  { name: "Oliver S.", text: "The team at Frontline Financial are extraordinary at what they do. I dealt with Sham personally when trying to finance my new car. He quickly gave me options over multiple lenders that ensured I got the best possible deal." },
  { name: "Mikhail A.", text: "Sham was phenomenal to say the least. He got my loan approved in less than 24 hours. Absolute legend!" },
  { name: "Amy F.", text: "I had a great experience with Frontline Financial Group. They were fast, friendly, and incredibly helpful throughout the entire loan process. Sham made everything clear and easy to understand." },
  { name: "Dan G.", text: "I would like to thank Frontline Financial Group for assisting me in securing my business loan within just a few days. The staff were incredibly nice, friendly, and professional throughout." },
];

const FAQS = [
  ["Do you charge for the assessment?", "No. The assessment is free and there is no obligation. If we arrange finance, the lender pays us a commission, which we disclose in your credit guide."],
  ["Will you run a credit check?", "Yes — as part of your free assessment we run a credit check and provide you with a free copy of your Equifax report. It lets us read your file the way a lender would, before any lender does."],
  ["Will it affect my credit?", "Only if we submit an application — which we cannot do without your authority. The assessment and your free Equifax report do not lodge an application with any lender."],
  ["Can I finance a vehicle from a private seller or auction?", "Yes, with the right lender. The seller needs to prove they own it and a PPSR check needs to be clear. Get approved before you bid at auction."],
  ["I have a default. Is it worth applying?", "Often yes. It depends on what the default was, how old it is and whether it is paid. Send it to us before you apply anywhere else, because every application shows on your file."],
  ["My ABN is new and I have no financials.", "Some lenders have no minimum trading history and some offer low doc options. Loan size and rate can be affected. We will tell you straight."],
  ["How fast is it?", "Once we have your documents, approvals on straightforward deals often come back within a few business days. We will give you a realistic timeframe on the call."],
];

/* the four qualifiers */
const QUALIFIERS = [
  { key: "abn", label: "Do you have a valid ABN?", options: ["Yes", "No"] },
  { key: "gst", label: "Are you GST registered?", options: ["Yes", "No", "Not sure"] },
  { key: "deposit", label: "Do you have any deposit towards your vehicle?", options: ["Yes", "No"] },
  { key: "property", label: "Are you a property owner?", options: ["Yes", "No"] },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* playful status lines while the lead is on its way */
const SENDING_MESSAGES = [
  "Warming up the ute…",
  "Loading the toolbox…",
  "Checking the mirrors…",
  "Dodging the paperwork…",
  "Beeping at the slow lenders…",
  "Finding a park for your details…",
];

/* wizard: one question per screen. 0-2 contact, 3-6 qualifiers, 7 consent+send */
const TEXT_STEPS = [
  { key: "fullName", type: "text", label: "What's your name?", placeholder: "Your name", autoComplete: "name" },
  { key: "phone", type: "tel", label: "Best number to call you on?", placeholder: "04XX XXX XXX", autoComplete: "tel", inputMode: "tel" },
  { key: "email", type: "email", label: "And your email?", placeholder: "you@example.com", autoComplete: "email", inputMode: "email" },
];
const FINAL_STEP = TEXT_STEPS.length + QUALIFIERS.length; // 7
const QUESTION_COUNT = FINAL_STEP; // 7 questions before the send screen

/* analytics: GA4 + Meta Pixel + dataLayer when present (scripts load only
   when the env IDs are configured — see bottom of component). */
function track(eventName, fbStandard) {
  try {
    if (typeof window === "undefined") return;
    (window.dataLayer = window.dataLayer || []).push({ event: eventName });
    if (typeof window.gtag === "function") window.gtag("event", eventName);
    if (typeof window.fbq === "function") {
      if (fbStandard) window.fbq("track", fbStandard);
      else window.fbq("trackCustom", eventName);
    }
  } catch {
    /* analytics must never break the page */
  }
}

const inputClass =
  "mt-1.5 w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-[15px] text-[#1C5472] placeholder-gray-400 transition focus:border-[#00FCB8] focus:outline-none focus:ring-2 focus:ring-[#00FCB8]/30";

export default function VehicleFinanceLanding() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState({ abn: "", gst: "", deposit: "", property: "" });
  const [consent, setConsent] = useState(false);
  const [showConsentError, setShowConsentError] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [showSticky, setShowSticky] = useState(false);
  const [step, setStep] = useState(0);
  const [sendingMsg, setSendingMsg] = useState(0);
  const startedRef = useRef(false);
  const formRef = useRef(null);

  /* rotate the funny sending lines while the lead is in transit */
  useEffect(() => {
    if (!submitting) {
      setSendingMsg(0);
      return;
    }
    const id = setInterval(
      () => setSendingMsg((i) => (i + 1) % SENDING_MESSAGES.length),
      1100
    );
    return () => clearInterval(id);
  }, [submitting]);

  /* focus the input when arriving on a text step (after first interaction,
     so the keyboard doesn't pop on page load) */
  useEffect(() => {
    if (step > 0 && step < TEXT_STEPS.length) {
      document.getElementById("vf-step-input")?.focus();
    }
  }, [step]);

  /* sticky CTA + form_view — plain scroll math (IG/FB in-app browsers) */
  useEffect(() => {
    let viewed = false;
    const check = () => {
      const form = formRef.current;
      if (!form) return;
      const vh = window.innerHeight;
      const f = form.getBoundingClientRect();
      const formInView = f.top < vh && f.bottom > 0;
      if (formInView && !viewed) {
        viewed = true;
        track("vf_form_view");
      }
      setShowSticky(!formInView && f.bottom <= 0);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  const onFirstInteraction = () => {
    if (!startedRef.current) {
      startedRef.current = true;
      track("vf_form_start");
    }
  };

  /* qualifier pill tap: record the answer, give tap feedback, auto-advance.
     Advance is tied to the question's own step index so a double-tap can't
     queue two advances and skip the next question. */
  const setAnswer = (key, val) => {
    onFirstInteraction();
    setAnswers((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    const ownStep = TEXT_STEPS.length + QUALIFIERS.findIndex((q) => q.key === key);
    setTimeout(() => setStep((s) => (s === ownStep ? s + 1 : s)), 220);
  };

  const validateStep = (i) => {
    const e = {};
    if (i === 0 && !fullName.trim()) e.fullName = "Your name is required.";
    if (i === 1 && !phone.trim()) e.phone = "Your number is required.";
    if (i === 2) {
      if (!email.trim()) e.email = "Your email is required.";
      else if (!EMAIL_REGEX.test(email)) e.email = "Please enter a valid email address.";
    }
    if (i >= TEXT_STEPS.length && i < FINAL_STEP) {
      const q = QUALIFIERS[i - TEXT_STEPS.length];
      if (!answers[q.key]) e[q.key] = "Please pick one.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validate = () => {
    const e = {};
    if (!fullName.trim()) e.fullName = "Your name is required.";
    if (!phone.trim()) e.phone = "Your number is required.";
    if (!email.trim()) e.email = "Your email is required.";
    else if (!EMAIL_REGEX.test(email)) e.email = "Please enter a valid email address.";
    QUALIFIERS.forEach((q) => {
      if (!answers[q.key]) e[q.key] = "Please pick one.";
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    /* before the last screen, the form's submit = advance one step */
    if (step < FINAL_STEP) {
      if (validateStep(step)) setStep(step + 1);
      return;
    }
    setSubmitError(null);
    setShowConsentError(false);
    if (!validate()) {
      /* something upstream is missing — take the user straight to it */
      let firstInvalid = null;
      if (!fullName.trim()) firstInvalid = 0;
      else if (!phone.trim()) firstInvalid = 1;
      else if (!email.trim() || !EMAIL_REGEX.test(email)) firstInvalid = 2;
      else {
        const qi = QUALIFIERS.findIndex((q) => !answers[q.key]);
        if (qi >= 0) firstInvalid = TEXT_STEPS.length + qi;
      }
      if (firstInvalid !== null) setStep(firstInvalid);
      return;
    }
    if (!consent) {
      setShowConsentError(true);
      setSubmitError(CONSENT_ERROR);
      return;
    }
    setSubmitting(true);
    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "(not provided)";
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email: email.trim(),
          phone: phone.trim(),
          teamMember: "sham",
          services: ["Commercial vehicle finance"],
          preferredContact: "phone",
          campaign: "vehicle-finance-reels",
          message: [
            "Free assessment request — VEHICLE FINANCE REELS landing page.",
            `Valid ABN: ${answers.abn}`,
            `GST registered: ${answers.gst}`,
            `Deposit towards vehicle: ${answers.deposit}`,
            `Property owner: ${answers.property}`,
            "Lead source: Vehicle finance reels",
          ].join("\n"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) {
        setSubmitError(data.error || `Something went wrong. Please try again or call us on ${PHONE}.`);
        setSubmitting(false);
        return;
      }
      track("vf_form_submit", "Lead");
      setSubmitted(true);
    } catch {
      setSubmitError(`Something went wrong. Please try again or call us on ${PHONE}.`);
      setSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById("assessment-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#F5F5EF] font-sans">
      <LayoutNav activeNav="asset-solutions" />

      {/* ============ 1. HERO + FORM ============ */}
      <section id="assessment-form" className="section-dot-grid-dark relative scroll-mt-20 px-4 pt-10 pb-14 md:px-6 md:pt-14 md:pb-20 lg:px-8">
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-[#00FCB8] opacity-[0.08] blur-[100px]" aria-hidden />
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[1fr_460px] lg:gap-14">
          {/* headline */}
          <div className="text-center lg:sticky lg:top-28 lg:text-left">
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Commercial vehicle finance, <span className="text-[#00FCB8]">sorted.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-[#39B2B2] lg:mx-0">
              Free, no obligation assessment. We check your situation against 30+
              lenders and tell you where it fits — including a free copy of your
              Equifax credit report.
            </p>
            <p className="mt-5 text-sm text-white/85">
              <span className="text-[#FFD700]" aria-hidden>★★★★★</span> 5.0 stars on
              Google from 100+ reviews. Winner, Fintelligence Broker Awards FY25,
              Vehicle and Equipment Finance.
            </p>
            <ul className="mx-auto mt-6 hidden max-w-md space-y-2.5 text-left text-[15px] text-white/85 lg:block">
              {[
                "Second hand, private sale and auction buys welcome",
                "Default on file? Often still doable — ask first",
                "New ABN, no financials — low doc options exist",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <svg className="mt-1 h-4 w-4 shrink-0 text-[#00FCB8]" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* the form card */}
          <div ref={formRef} className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[#00FCB8] via-[#39B2B2] to-[#1C5472] opacity-70 blur-sm" aria-hidden />
            <div className="relative rounded-3xl bg-white p-6 shadow-2xl md:p-8">
              {submitted ? (
                <div className="py-10 text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#00FCB8]/15">
                    <svg className="h-9 w-9 text-[#00b884]" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <h2 className="mt-5 text-2xl font-bold text-[#1C5472]">Thanks. We will call you within one business day.</h2>
                  <p className="mt-3 text-[#1C5472]/80">
                    If you want to move faster, call{" "}
                    <a href={PHONE_LINK} className="font-bold text-[#39B2B2] hover:underline">{PHONE}</a>.
                  </p>
                </div>
              ) : (
                <>
                  {/* header: title + progress */}
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-2xl font-bold text-[#1C5472]">Get your free assessment</h2>
                    <span className="shrink-0 rounded-full bg-[#00FCB8]/15 px-3 py-1 text-xs font-bold text-[#00795c]">2 MIN</span>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs font-bold text-[#39B2B2]">
                      <span>{step < FINAL_STEP ? `Question ${step + 1} of ${QUESTION_COUNT}` : "Last step"}</span>
                      <span>{Math.round((step / (FINAL_STEP + 1)) * 100)}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#39B2B2] to-[#00FCB8] transition-all duration-300"
                        style={{ width: `${Math.max(6, (step / (FINAL_STEP + 1)) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} onFocusCapture={onFirstInteraction} className="mt-6" noValidate>
                    {/* back */}
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

                    {/* text steps 0-2 */}
                    {step < TEXT_STEPS.length && (() => {
                      const s = TEXT_STEPS[step];
                      const value = s.key === "fullName" ? fullName : s.key === "phone" ? phone : email;
                      const setter = s.key === "fullName" ? setFullName : s.key === "phone" ? setPhone : setEmail;
                      return (
                        <div key={s.key}>
                          <label htmlFor="vf-step-input" className="block text-lg font-bold text-[#1C5472]">{s.label}</label>
                          <input
                            id="vf-step-input"
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

                    {/* qualifier steps 3-6 — tap an answer to advance */}
                    {step >= TEXT_STEPS.length && step < FINAL_STEP && (() => {
                      const q = QUALIFIERS[step - TEXT_STEPS.length];
                      return (
                        <fieldset key={q.key}>
                          <legend className="text-lg font-bold text-[#1C5472]">{q.label}</legend>
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

                    {/* final step — summary + consent + send */}
                    {step === FINAL_STEP && (
                      <div>
                        <p className="text-lg font-bold text-[#1C5472]">Ready to send</p>
                        <dl className="mt-3 space-y-1.5 rounded-2xl bg-[#F5F5EF] p-4 text-sm text-[#1C5472]">
                          {[
                            ["Name", fullName],
                            ["Number", phone],
                            ["Email", email],
                            ["Valid ABN", answers.abn],
                            ["GST registered", answers.gst],
                            ["Deposit", answers.deposit],
                            ["Property owner", answers.property],
                          ].map(([label, value]) => (
                            <div key={label} className="flex justify-between gap-4">
                              <dt className="text-[#1C5472]/60">{label}</dt>
                              <dd className="font-bold">{value || "—"}</dd>
                            </div>
                          ))}
                        </dl>
                        <div className="mt-4">
                          <FormConsent
                            entity={ENTITY.ASSET_SOLUTIONS}
                            value={consent}
                            onChange={(v) => { setConsent(v); setShowConsentError(false); setSubmitError(null); }}
                            showError={showConsentError}
                          />
                        </div>
                        {submitError && submitError !== CONSENT_ERROR && <p className="mt-3 text-sm text-red-600">{submitError}</p>}
                        <button
                          type="submit"
                          disabled={submitting}
                          className="group relative mt-5 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#00FCB8] py-4 text-lg font-bold text-[#0A1628] shadow-lg shadow-[#00FCB8]/30 transition hover:scale-[1.02] hover:shadow-xl hover:shadow-[#00FCB8]/40 disabled:cursor-wait"
                        >
                          {submitting ? (
                            <>
                              <style>{`
                                @keyframes vf-drive { 0%,100% { transform: translateY(0) rotate(0deg); } 25% { transform: translateY(-1.5px) rotate(-1deg); } 75% { transform: translateY(0.5px) rotate(1deg); } }
                                @keyframes vf-wheel { to { transform: rotate(360deg); } }
                                @keyframes vf-puff { 0% { opacity: 0.9; transform: translateX(0) scale(0.6); } 100% { opacity: 0; transform: translateX(-14px) scale(1.4); } }
                                @keyframes vf-road { to { transform: translateX(-16px); } }
                                @keyframes vf-msg { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
                                .vf-drive { animation: vf-drive 0.7s ease-in-out infinite; }
                                .vf-wheel { animation: vf-wheel 0.5s linear infinite; transform-origin: center; transform-box: fill-box; }
                                .vf-puff { animation: vf-puff 0.9s ease-out infinite; }
                                .vf-puff2 { animation-delay: 0.45s; }
                                .vf-road { animation: vf-road 0.4s linear infinite; }
                                .vf-msg { animation: vf-msg 0.3s ease-out; }
                                @media (prefers-reduced-motion: reduce) {
                                  .vf-drive, .vf-wheel, .vf-puff, .vf-puff2, .vf-road, .vf-msg { animation: none; }
                                }
                              `}</style>
                              <span className="flex items-center gap-3" role="status" aria-live="polite">
                                <svg className="vf-drive h-7 w-14" viewBox="0 0 56 28" fill="none" aria-hidden>
                                  {/* exhaust puffs */}
                                  <circle className="vf-puff" cx="6" cy="19" r="2.4" fill="#0A1628" opacity="0.35" />
                                  <circle className="vf-puff vf-puff2" cx="8" cy="16" r="1.7" fill="#0A1628" opacity="0.25" />
                                  {/* ute body: cab + tray */}
                                  <path d="M13 18v-6c0-1.1.9-2 2-2h9l4-6h9c1.6 0 2.9.7 3.8 1.9L45 12h5c1.7 0 3 1.3 3 3v3" stroke="#0A1628" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                  <path d="M29 4l-3.4 6H37V4h-8z" fill="#0A1628" opacity="0.15" />
                                  <path d="M24 12h22" stroke="#0A1628" strokeWidth="2" strokeLinecap="round" />
                                  {/* wheels with spokes so the spin reads */}
                                  <g className="vf-wheel">
                                    <circle cx="21" cy="19" r="5" stroke="#0A1628" strokeWidth="2.4" fill="#00FCB8" />
                                    <path d="M21 15.4v7.2M17.4 19h7.2" stroke="#0A1628" strokeWidth="1.6" strokeLinecap="round" />
                                  </g>
                                  <g className="vf-wheel">
                                    <circle cx="44" cy="19" r="5" stroke="#0A1628" strokeWidth="2.4" fill="#00FCB8" />
                                    <path d="M44 15.4v7.2M40.4 19h7.2" stroke="#0A1628" strokeWidth="1.6" strokeLinecap="round" />
                                  </g>
                                  {/* road rushing past */}
                                  <g className="vf-road">
                                    <path d="M6 26h6M18 26h6M30 26h6M42 26h6M54 26h6M66 26h6" stroke="#0A1628" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                                  </g>
                                </svg>
                                <span key={sendingMsg} className="vf-msg text-base font-bold">
                                  {SENDING_MESSAGES[sendingMsg]}
                                </span>
                              </span>
                            </>
                          ) : (
                            <>
                              Get my free assessment
                              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </>
                          )}
                        </button>
                        <p className="mt-3 text-center text-xs text-gray-500">
                          A member of our team will reach out within one business day. No spam, no pressure.
                        </p>
                        <p className="mt-2 text-center text-[11px] leading-relaxed text-gray-400">
                          Approval is subject to lender assessment and credit criteria.
                          General information only — it does not take your personal
                          circumstances into account.
                        </p>
                      </div>
                    )}
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <WaveDivider fill="#1C5472" />

      {/* ============ 2. AWARD-WINNING TEAM — Sham ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1C5472] via-[#164360] to-[#1C5472] px-4 py-14 md:px-6 md:py-20 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_50%,rgba(0,252,184,0.12)_0%,transparent_50%)]" aria-hidden />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 md:flex-row md:gap-14">
          <div className="flex shrink-0 flex-col items-center">
            <div className="overflow-hidden rounded-2xl border-2 border-[#00FCB8]/50 shadow-xl ring-2 ring-[#00FCB8]/20 md:rounded-3xl">
              {/* the real awards-night photo, as used on the homepage */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/fintelligence-award.png"
                alt="Sham accepting the Vehicle & Equipment Finance award at the Fintelligence Broker Awards FY25"
                className="h-48 w-auto object-cover md:h-64"
                width={1024}
                height={726}
              />
            </div>
            <span className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#00FCB8]/90 md:text-xs">Asset Solutions</span>
          </div>
          <div className="text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#00FCB8] md:text-sm">Who will actually call you</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl">
              Award Winning.
            </h2>
            <p className="mt-2 text-xl font-bold text-[#00FCB8] md:text-2xl">
              Fintelligence Broker Awards FY25
            </p>
            <p className="mt-2 text-base font-semibold text-white/95 md:text-lg">
              Winner — Vehicle &amp; Equipment Finance
            </p>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/80 md:mx-0 md:mt-5">
              Sham runs vehicle and equipment finance at Frontline Financial. He&apos;s
              the one who calls you, reads your situation against 30+ lenders, and
              chases the approval — recognised for exactly this work at the
              Fintelligence Broker Awards.
            </p>
            <button
              type="button"
              onClick={scrollToForm}
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-[#00FCB8] px-6 py-3 font-bold text-[#0A1628] transition-all duration-200 hover:scale-105 hover:opacity-90"
            >
              Get Sham to look at my situation
            </button>
          </div>
        </div>
      </section>

      <WaveDivider fill="#39B2B2" />

      {/* ============ 3. GOOGLE REVIEWS — 100+ ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#39B2B2] via-[#2E9E9E] to-[#39B2B2] px-4 py-14 md:px-6 md:py-20 lg:px-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#00FCB8] opacity-[0.14] blur-[110px]" aria-hidden />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
          <svg className="h-[130%] w-auto text-white opacity-[0.05]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#00FCB8] md:text-sm">
                Rated five stars. Every. Single. Review.
              </p>
              <h2 className="mt-3 border-l-4 border-[#00FCB8] pl-4 text-3xl font-bold text-white md:text-4xl">
                Trusted by clients across Australia
              </h2>
              <p className="mt-4 max-w-lg text-base text-white/85 md:text-lg">
                Over one hundred Australians have reviewed us on Google — and every
                single one gave us five stars.
              </p>
            </div>
            {/* the 100+ badge */}
            <div className="rounded-3xl border border-white/25 bg-white/10 px-10 py-8 text-center shadow-[0_20px_60px_-20px_rgba(10,22,40,0.5)] backdrop-blur-sm">
              <div className="flex justify-center gap-1" aria-hidden>
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="h-7 w-7 text-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mt-2 text-6xl font-extrabold tracking-tight text-white md:text-7xl">
                100<span className="text-[#00FCB8]">+</span>
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-white/85 md:text-sm">
                Five-star Google reviews
              </p>
              <p className="mt-1 text-xs text-white/70">5.0 average · 100% five stars</p>
              <a
                href={GOOGLE_REVIEW_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-[#1C5472] transition-all duration-200 hover:scale-105"
              >
                <span className="text-lg font-bold text-[#4285F4]" aria-hidden>G</span>
                Read them all on Google
              </a>
            </div>
          </div>
          {/* Real Google reviews, verbatim. TODO(Hassan): confirm selection + dates. */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {REVIEWS.map((review) => (
              <figure key={review.name} className="rounded-xl bg-white p-5 text-[#1C5472] shadow-md">
                <div className="flex gap-0.5 text-[#FFD700]" aria-label="5 out of 5 stars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-3 text-sm leading-relaxed">&ldquo;{review.text}&rdquo;</blockquote>
                <figcaption className="mt-3 font-bold">{review.name} · Google review</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ OUR LOCATION — as per the homepage ============ */}
      <section className="relative overflow-hidden bg-[#0A1628] px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="pointer-events-none absolute left-0 bottom-0 h-64 w-64 rounded-full bg-[#39B2B2] opacity-[0.07] blur-[90px]" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#00FCB8] md:text-sm">Our location</p>
            <h2 className="mt-3 border-l-4 border-[#00FCB8] pl-4 text-3xl font-bold text-white md:text-4xl">
              Visit us at Parramatta Square
            </h2>
            <p className="mt-5 text-lg font-semibold text-white">
              Level 49, 8 Parramatta Square
              <br />
              Parramatta NSW 2150
            </p>
            <p className="mt-3 max-w-md text-sm text-white/70">
              Level 49 of the 8 Parramatta Square tower, in the heart of the
              precinct — drop in to talk vehicle or equipment finance, or find us
              on Google for reviews, photos and opening hours.
            </p>
            <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row">
              <a
                href={GOOGLE_REVIEW_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#00FCB8] px-6 py-3 font-bold text-[#0A1628] transition-all duration-200 hover:scale-105 hover:opacity-90"
              >
                <span className="text-lg font-bold text-[#4285F4]" aria-hidden>G</span>
                Find us on Google
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=8%20Parramatta%20Square%2C%20Parramatta%20NSW%202150"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#00FCB8] bg-[#00FCB8]/10 px-6 py-3 font-bold text-[#00FCB8] transition hover:bg-[#00FCB8] hover:text-[#0A1628]"
              >
                Get directions
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
            <div className="mt-8 overflow-hidden rounded-2xl border-2 border-[#00FCB8]/30 shadow-xl">
              <iframe
                src="https://www.google.com/maps?q=8+Parramatta+Square,+Parramatta+NSW+2150&output=embed"
                title="Map — Frontline Financial, Level 49, 8 Parramatta Square, Parramatta NSW 2150"
                className="block h-56 w-full border-0 md:h-64"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="overflow-hidden rounded-2xl border-2 border-[#00FCB8]/30 shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/frontline-8-parramatta-square.webp"
                alt="The 8 Parramatta Square tower — Frontline Financial's office is on Level 49"
                className="block h-auto w-full max-w-md object-cover"
                width={1066}
                height={1421}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ 4. HOW IT WORKS ============ */}
      <section className="bg-[#0A1628] px-4 py-14 md:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="border-l-4 border-[#00FCB8] pl-4 text-3xl font-bold text-white md:text-4xl">
            How it works
          </h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              ["Fill in the form.", "Takes two minutes."],
              ["We call you within one business day and assess your situation.", "Free, no obligation."],
              ["If it fits, we take it to the lender and handle the paperwork.", ""],
            ].map(([main, sub], i) => (
              <li key={main} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00FCB8] text-lg font-bold text-[#0A1628]" aria-hidden>
                  {i + 1}
                </span>
                <p className="mt-4 font-bold text-white">{main}</p>
                {sub && <p className="mt-1 text-sm text-[#39B2B2]">{sub}</p>}
              </li>
            ))}
          </ol>
          <button
            type="button"
            onClick={scrollToForm}
            className="mt-8 inline-flex w-full items-center justify-center rounded-lg bg-[#00FCB8] px-8 py-3.5 font-bold text-[#0A1628] transition-all duration-200 hover:scale-105 hover:opacity-90 sm:w-auto"
          >
            Start step one
          </button>
        </div>
      </section>

      <WaveDivider fill="#F5F5EF" />

      {/* ============ 5. WHO THIS IS FOR ============ */}
      <section className="px-4 py-14 md:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="border-l-4 border-[#00FCB8] pl-4 text-3xl font-bold text-[#1C5472] md:text-4xl">
            Who this is for
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Second hand, private sale or auction",
                body: "Marketplace finds and auction buys can be financed. Get approved before you bid.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />,
              },
              {
                title: "Credit default on file",
                body: "A default changes which lender reads your file. It does not always end the loan.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.42-.182-2.806-.512-4.122z" />,
              },
              {
                title: "New ABN or no financials",
                body: "Some lenders set no minimum trading history. Low doc options exist.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
              },
            ].map((card) => (
              <div key={card.title} className="rounded-2xl bg-white p-6 shadow-md">
                <svg className="h-9 w-9 text-[#00FCB8]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden>
                  {card.icon}
                </svg>
                <h3 className="mt-3 font-bold text-[#1C5472]">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#1C5472]/80">{card.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[#1C5472]">
            Not sure which one you are?{" "}
            <button type="button" onClick={scrollToForm} className="font-bold text-[#39B2B2] underline underline-offset-2 hover:text-[#1C5472]">
              Fill in the form
            </button>{" "}
            and we will tell you.
          </p>
        </div>
      </section>

      {/* ============ 6. FAQ ============ */}
      <section className="bg-white px-4 py-14 md:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="border-l-4 border-[#00FCB8] pl-4 text-3xl font-bold text-[#1C5472] md:text-4xl">
            Straight answers
          </h2>
          <div className="mt-8 space-y-3">
            {FAQS.map(([q, a]) => (
              <details key={q} className="group rounded-xl border border-gray-200 bg-[#F5F5EF]">
                <summary className="flex cursor-pointer items-baseline justify-between gap-4 px-5 py-4 font-bold text-[#1C5472] [&::-webkit-details-marker]:hidden">
                  {q}
                  <span className="shrink-0 text-[#00FCB8] group-open:hidden" aria-hidden>+</span>
                  <span className="hidden shrink-0 text-[#00FCB8] group-open:inline" aria-hidden>–</span>
                </summary>
                <p className="px-5 pb-4 text-sm leading-relaxed text-[#1C5472]/80">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 7. CALL NOW STRIP ============ */}
      <section className="bg-[#0A1628] px-4 py-8 md:px-6 lg:px-8">
        <p className="mx-auto max-w-4xl text-center text-white">
          Prefer to talk now? Call{" "}
          <a href={PHONE_LINK} className="font-bold text-[#00FCB8] hover:underline">{PHONE}</a>.
          {" "}Monday to Friday, 9am to 5pm.
        </p>
      </section>

      {/* ============ 8. COMPLIANCE + FOOTER ============ */}
      <section className="border-t border-white/10 bg-[#0A1628] px-4 py-6 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-2 text-center text-xs leading-relaxed text-white/60">
          <p>
            Frontline Financial: Asset Solutions is an Authorised Credit
            Representative (CRN 563350) of Australian Credit Licence 511803.
            Frontline Financial Brokers is an Authorised Credit Representative
            (CRN 575968) of Australian Credit Licence 389087.
          </p>
          <p>
            Approval is subject to lender assessment and credit criteria. General
            information only. It does not take your personal circumstances into
            account.
          </p>
        </div>
      </section>
      <LayoutFooter />

      {/* ============ STICKY MOBILE CTA — back up to the form ============ */}
      {showSticky && !submitted && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#00FCB8]/30 bg-[#0A1628]/95 p-3 backdrop-blur md:hidden">
          <button
            type="button"
            onClick={scrollToForm}
            className="flex w-full items-center justify-center rounded-lg bg-[#00FCB8] py-3.5 font-bold text-[#0A1628]"
          >
            Get my free assessment
          </button>
        </div>
      )}

      {/* ============ ANALYTICS — load only when IDs are configured ============
          TODO(Hassan): set NEXT_PUBLIC_GA4_ID and NEXT_PUBLIC_META_PIXEL_ID in
          the deployment environment. Events: vf_form_view, vf_form_start,
          vf_form_submit (+ Meta standard "Lead"). */}
      {process.env.NEXT_PUBLIC_GA4_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA4_ID}');`}
          </Script>
        </>
      )}
      {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${process.env.NEXT_PUBLIC_META_PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      )}
    </div>
  );
}
