"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import FormConsent, { CONSENT_ERROR } from "@/components/FormConsent";
import { ENTITY } from "@/config/entities";
import { HOURS } from "@/config/business-hours";
import { trackMeta } from "@/components/MetaPixel";
import useAdAttribution from "@/components/useAdAttribution";
import { CAR_LOAN, NO_ABN, PHONE, QUESTIONS, READY_LIST, SECTIONS } from "@/data/vehicle-finance";

const DRAFT_KEY = "ff-vehicle-finance";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY_CONTACT = { fullName: "", phone: "", email: "" };

const CONTACT_STEP = { key: "contact", section: SECTIONS.length - 1 };

const CONTACT_FIELDS = [
  { key: "fullName", label: "Full name", type: "text", placeholder: "First and last name", autoComplete: "name", enterKeyHint: "next" },
  { key: "phone", label: "Mobile", type: "tel", placeholder: "04XX XXX XXX", autoComplete: "tel", inputMode: "tel", enterKeyHint: "next" },
  { key: "email", label: "Email", type: "email", placeholder: "you@example.com", autoComplete: "email", inputMode: "email", enterKeyHint: "done" },
];

/* playful status lines while the lead is on its way */
const SENDING_MESSAGES = [
  "Warming up the ute…",
  "Loading the toolbox…",
  "Checking the mirrors…",
  "Dodging the paperwork…",
  "Beeping at the slow lenders…",
  "Finding a park for your details…",
];

/* Ambition Cloud's asset type: only "Car" has a known id, and it suits utes and vans.
   A truck or anything else leaves it blank, and the consent form asks. */
const CAR_LIKE = ["Ute", "Van", "Car"];

const inputClass =
  "mt-1.5 w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-base text-[#1C5472] placeholder-gray-500 transition focus:border-[#00FCB8] focus:outline-none focus:ring-2 focus:ring-[#00FCB8]/30";

const optionClass = (selected) =>
  `rounded-xl text-base font-bold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1C5472] focus-visible:ring-offset-2 ${
    selected
      ? "bg-[#00FCB8] text-[#0A1628] shadow-md shadow-[#00FCB8]/40"
      : "border-2 border-gray-200 bg-white text-[#1C5472] hover:border-[#39B2B2] hover:bg-[#39B2B2]/5"
  }`;

/* GA4 + Meta Pixel + dataLayer when present. Keys and step names only, never answers. */
function track(eventName, fbStandard) {
  try {
    (window.dataLayer = window.dataLayer || []).push({ event: eventName });
    if (typeof window.gtag === "function") window.gtag("event", eventName);
    if (fbStandard) trackMeta(fbStandard);
    else trackMeta(eventName, false);
  } catch {
    /* analytics must never break the page */
  }
}

/* The in-app browsers can reload the page after a trip to another app, so answers
   live in sessionStorage. Storage can be blocked; the form works without it. */
const readDraft = () => {
  try {
    return JSON.parse(window.sessionStorage.getItem(DRAFT_KEY));
  } catch {
    return null;
  }
};
const writeDraft = (value) => {
  try {
    if (value) window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(value));
    else window.sessionStorage.removeItem(DRAFT_KEY);
  } catch {
    /* the draft is a convenience only */
  }
};

const VehicleGlyph = ({ children }) => (
  <svg className="h-8 w-[52px]" viewBox="0 0 32 20" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {children}
    <circle cx="9" cy="15.5" r="2.5" />
    <circle cx="23" cy="15.5" r="2.5" />
  </svg>
);

const VEHICLE_ICONS = {
  Ute: (
    <VehicleGlyph>
      <path d="M6.5 15.5h-3a1 1 0 0 1-1-1V10h13" />
      <path d="M15.5 10V5.5a1 1 0 0 1 1-1h5.4c.6 0 1.2.3 1.5.8l2.8 4.2 2 .5c.9.2 1.3 1 1.3 1.9v2.6a1 1 0 0 1-1 1h-2" />
      <path d="M11.5 15.5h9" />
      <path d="M15.5 10h11.2" />
      <path d="M20.5 4.5V10" />
    </VehicleGlyph>
  ),
  Van: (
    <VehicleGlyph>
      <path d="M6.5 15.5h-3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h17.4c.5 0 1 .2 1.3.6l4.3 5.2 2 .6c.9.3 1.5 1.1 1.5 2v2.1a1 1 0 0 1-1 1h-2" />
      <path d="M11.5 15.5h9" />
      <path d="M20 4v5.8h6" />
      <path d="M12 4v11.5" />
    </VehicleGlyph>
  ),
  Truck: (
    <VehicleGlyph>
      <path d="M6.5 15.5h-3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h15v13" />
      <path d="M18.5 7h5c.4 0 .8.2 1.1.5l4 4.3c.2.2.4.5.4.8v1.9a1 1 0 0 1-1 1h-2.5" />
      <path d="M11.5 15.5h9" />
      <path d="M22.5 7v4.5h6" />
    </VehicleGlyph>
  ),
  Car: (
    <VehicleGlyph>
      <path d="M6.5 15.5H4a1 1 0 0 1-1-1v-2.3c0-.9.6-1.7 1.5-1.9l3.2-.8 2.6-3.1c.4-.5 1-.9 1.7-.9h7c.7 0 1.3.3 1.7.8l2.7 3.2 3.1.8c.9.2 1.5 1 1.5 1.9v2.3a1 1 0 0 1-1 1h-2.5" />
      <path d="M11.5 15.5h9" />
      <path d="M8 9.5h16" />
      <path d="M16 5.5v4" />
    </VehicleGlyph>
  ),
};

const CheckIcon = ({ className = "mt-0.5 h-4 w-4 shrink-0" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
    <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

function SendingUte({ message, messageKey }) {
  return (
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
        <span key={messageKey} className="vf-msg text-base font-bold">{message}</span>
      </span>
    </>
  );
}

/* After sending: the privacy consent is the next real step, and it's also on its way
   by email. If Ambition Cloud was down there's no link, so this falls back to the call. */
function ThankYou({ result }) {
  return (
    <div className="py-2 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#00FCB8]/15">
        <CheckIcon className="h-8 w-8 text-[#00795c]" />
      </span>
      <h2 id="vf-step-heading" tabIndex={-1} className="mt-4 text-2xl font-bold text-[#1C5472] focus:outline-none">
        Thanks {result.firstName}. Your assessment request is with our team.
      </h2>

      {result.privacyLink && (
        <div className="mt-5 rounded-2xl bg-[#00FCB8]/15 p-5 text-left">
          <p className="font-bold text-[#1C5472]">Want to save time on the call?</p>
          <p className="mt-2 text-sm text-[#1C5472]/85">
            Sign our privacy consent now. We need it before we can check your options with lenders, and it includes our Credit
            Guide and Quote. Have your driver licence handy, because it asks for a photo of the front and back.
          </p>
          <a
            href={result.privacyLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("vf_privacy_click")}
            className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#00FCB8] py-3.5 text-base font-bold text-[#0A1628] shadow-lg shadow-[#00FCB8]/30 transition hover:scale-[1.02]"
          >
            Sign your privacy consent
            <ArrowIcon />
          </a>
          {result.privacyEmailed && (
            <p className="mt-3 text-xs text-[#1C5472]/80">We&apos;ve also emailed you this link. It works for 24 hours.</p>
          )}
        </div>
      )}

      <ol className="mt-5 space-y-3 text-left text-[#1C5472]">
        {CAR_LOAN.afterSubmit.map((item, i) => (
          <li key={item} className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1C5472] text-xs font-bold text-[#00FCB8]">{i + 1}</span>
            {item}
          </li>
        ))}
      </ol>

      <div className="mt-5 rounded-2xl bg-[#F5F5EF] p-5 text-left">
        <p className="font-bold text-[#1C5472]">To speed things up, have these handy</p>
        <ul className="mt-3 space-y-2 text-sm text-[#1C5472]">
          {READY_LIST.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#1C5472]" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-5 text-sm text-[#1C5472]/85">
        We take calls {HOURS.label}. In a hurry? Call{" "}
        <a href={PHONE.link} className="font-bold text-[#1C5472] underline underline-offset-2 hover:no-underline">{PHONE.display}</a>.
      </p>
    </div>
  );
}

export default function AssessmentForm() {
  const [answers, setAnswers] = useState({});
  const [contact, setContact] = useState(EMPTY_CONTACT);
  const [currentKey, setCurrentKey] = useState(QUESTIONS[0].key);
  const [note, setNote] = useState(null);
  const [errors, setErrors] = useState({});
  const [consent, setConsent] = useState(false);
  const [showConsentError, setShowConsentError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [result, setResult] = useState(null);
  const [sendingMsg, setSendingMsg] = useState(0);
  const [showSticky, setShowSticky] = useState(false);
  const startedRef = useRef(false);
  const movedRef = useRef(false);
  const advancingRef = useRef(false);
  const restoredRef = useRef(false);
  const cardRef = useRef(null);
  const consentRef = useRef(null);
  const attributionRef = useAdAttribution();

  const visible = useMemo(() => [...QUESTIONS.filter((q) => !q.showIf || q.showIf(answers)), CONTACT_STEP], [answers]);
  const stepIndex = Math.max(0, visible.findIndex((s) => s.key === currentKey));
  const step = visible[stepIndex];
  const started = stepIndex > 0;

  /* Pick up a draft after hydration; the server render shows the first question */
  useLayoutEffect(() => {
    const draft = readDraft();
    /* eslint-disable react-hooks/set-state-in-effect */
    if (draft?.currentKey) {
      setAnswers(draft.answers || {});
      setContact({ ...EMPTY_CONTACT, ...draft.contact });
      setCurrentKey(draft.currentKey);
      startedRef.current = true;
    }
    /* eslint-enable react-hooks/set-state-in-effect */
    restoredRef.current = true;
  }, []);

  useEffect(() => {
    if (restoredRef.current && !result && (currentKey !== QUESTIONS[0].key || Object.keys(answers).length)) {
      writeDraft({ answers, contact, currentKey });
    }
  }, [answers, contact, currentKey, result]);

  /* rotate the funny sending lines while the lead is in transit */
  useEffect(() => {
    if (!submitting) return undefined;
    const id = setInterval(() => setSendingMsg((i) => (i + 1) % SENDING_MESSAGES.length), 1100);
    return () => clearInterval(id);
  }, [submitting]);

  /* After each move: keep the question on screen and put the focus on it */
  useEffect(() => {
    if (!movedRef.current) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect && (rect.top < 0 || rect.bottom > window.innerHeight)) cardRef.current.scrollIntoView({ block: "start" });
    document.getElementById("vf-step-heading")?.focus({ preventScroll: true });
  }, [currentKey, result]);

  /* form_view, and on a phone a way back to the form once it has scrolled away.
     Plain scroll math, for the IG and FB in-app browsers. */
  useEffect(() => {
    let viewed = false;
    const check = () => {
      const card = cardRef.current?.getBoundingClientRect();
      if (!card) return;
      if (!viewed && card.top < window.innerHeight && card.bottom > 0) {
        viewed = true;
        track("vf_form_view");
      }
      setShowSticky(card.bottom < 0);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  /* A call is a lead too, wherever on the page the number was tapped */
  useEffect(() => {
    const onClick = (e) => {
      if (e.target.closest?.('a[href^="tel:"]')) track("vf_call_click", "Contact");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const markStarted = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    track("vf_form_start");
  };

  const goTo = (key) => {
    movedRef.current = true;
    setErrors({});
    setCurrentKey(key);
  };

  /* Tap an answer to advance. The short pause shows the choice landing; taps during it
     are ignored, so a double-tap can't skip the next question. */
  const answerAndAdvance = (question, value) => {
    if (advancingRef.current) return;
    advancingRef.current = true;
    markStarted();
    const nextAnswers = { ...answers, [question.key]: value };
    setAnswers(nextAnswers);
    track(`vf_step_${question.key}`);
    setTimeout(() => {
      advancingRef.current = false;
      const keys = [...QUESTIONS.filter((q) => !q.showIf || q.showIf(nextAnswers)).map((q) => q.key), CONTACT_STEP.key];
      setNote(question.notes?.[value] || null);
      goTo(keys[keys.indexOf(question.key) + 1]);
    }, 220);
  };

  const goBack = () => {
    setNote(null);
    if (stepIndex > 0) goTo(visible[stepIndex - 1].key);
  };

  const contactError = (key) => {
    if (key === "fullName" && !contact.fullName.trim()) return "Please enter your name.";
    if (key === "phone" && contact.phone.replace(/\D/g, "").length < 8) return "Please enter a number we can call you on.";
    if (key === "email" && !EMAIL_REGEX.test(contact.email.trim())) return "Please enter a valid email, like you@example.com.";
    return null;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (submitting) return;
    setSubmitError(null);
    setShowConsentError(false);

    const found = {};
    CONTACT_FIELDS.forEach((f) => {
      const err = contactError(f.key);
      if (err) found[f.key] = err;
    });
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`vf-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    if (!consent) {
      setShowConsentError(true);
      setSubmitError(CONSENT_ERROR);
      consentRef.current?.scrollIntoView({ block: "center" });
      return;
    }
    /* A restored draft can skip a question only if its answers were lost */
    const missing = visible.find((q) => q.options && !answers[q.key]);
    if (missing) {
      goTo(missing.key);
      return;
    }

    setSubmitting(true);
    const nameParts = contact.fullName.trim().split(/\s+/);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: nameParts[0],
          lastName: nameParts.slice(1).join(" ") || "(not provided)",
          email: contact.email.trim(),
          phone: contact.phone.trim(),
          teamMember: "sham",
          consultationService: "asset-solutions",
          services: ["Commercial vehicle finance"],
          preferredContact: "phone",
          campaign: "vehicle-finance-reels",
          applicationType: answers.abnAge === NO_ABN ? "consumer" : "commercial",
          assetType: CAR_LIKE.includes(answers.vehicle) ? "car" : undefined,
          attribution: attributionRef.current,
          message: [
            "Free assessment request: VEHICLE FINANCE landing page.",
            ...visible.filter((q) => q.options).map((q) => `${q.label}: ${answers[q.key]}`),
            "Lead source: Vehicle finance reels",
          ].join("\n"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) {
        setSubmitError(data.error || `Something went wrong. Please try again or call us on ${PHONE.display}.`);
        setSubmitting(false);
        return;
      }
      track("vf_form_submit", "Lead");
      writeDraft(null);
      movedRef.current = true;
      setResult({ firstName: nameParts[0], privacyLink: data.privacyLink, privacyEmailed: data.privacyEmailed });
    } catch {
      setSubmitError(`Something went wrong. Please try again or call us on ${PHONE.display}.`);
      setSubmitting(false);
    }
  };

  const headingClass = "text-lg font-bold text-[#1C5472] focus:outline-none";
  /* How full a section's bar is: done sections are full, the current one fills as it goes */
  const sectionFill = (i) => {
    if (i !== step.section) return i < step.section ? 100 : 0;
    const inSection = visible.filter((s) => s.section === i);
    return Math.max(12, ((inSection.findIndex((s) => s.key === step.key) + 1) / inSection.length) * 100);
  };

  return (
    <>
      <div ref={cardRef} id="application" className="relative scroll-mt-3">
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[#00FCB8] via-[#39B2B2] to-[#1C5472] opacity-70 blur-sm" aria-hidden />
        <div className="relative rounded-3xl bg-white p-5 shadow-2xl md:p-8">
          {result ? (
            <ThankYou result={result} />
          ) : (
            <>
              <h2 className="text-xl font-bold leading-tight text-[#1C5472] sm:text-2xl">Get your free assessment</h2>
              {!started && (
                <p className="mt-1 text-sm leading-snug text-[#1C5472]/85">
                  No obligation. Includes a free copy of your Equifax report.
                  <a href="#free-credit-report" className="ml-0.5 font-bold" aria-label="Conditions apply to the free credit report. See the terms.">*</a>
                </p>
              )}

              <div className="mt-3.5">
                <div className="flex items-center justify-between text-xs font-bold text-[#1C5472]">
                  <span>{SECTIONS[step.section]} · Step {step.section + 1} of {SECTIONS.length}</span>
                  <span className="rounded-full bg-[#00FCB8]/20 px-2 py-0.5 text-[#00614a]">2 min</span>
                </div>
                <div
                  className="mt-1.5 grid grid-cols-3 gap-1.5"
                  role="progressbar"
                  aria-label={`Assessment progress: ${SECTIONS[step.section]}`}
                  aria-valuemin={0}
                  aria-valuemax={visible.length}
                  aria-valuenow={stepIndex + 1}
                >
                  {SECTIONS.map((label, i) => (
                    <div key={label} className="h-1.5 overflow-hidden rounded-full bg-gray-200">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#39B2B2] to-[#00FCB8] transition-all duration-300" style={{ width: `${sectionFill(i)}%` }} />
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-4" noValidate>
                {started && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="mb-2 inline-flex items-center gap-1 py-1 text-sm font-medium text-[#1C5472]/75 transition hover:text-[#1C5472]"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                )}

                {/* reassurance after an answer that makes people think they won't qualify */}
                {note && (
                  <p className="mb-3 flex items-start gap-2.5 rounded-xl bg-[#00FCB8]/15 p-3 text-sm leading-snug text-[#1C5472]">
                    <CheckIcon />
                    {note}
                  </p>
                )}

                {step.options && (
                  <fieldset key={step.key}>
                    <legend className="contents">
                      <span id="vf-step-heading" tabIndex={-1} className={`block ${headingClass}`}>{step.question}</span>
                    </legend>
                    {step.key === "vehicle" ? (
                      <div className="mt-3 grid grid-cols-2 gap-2.5">
                        {step.options.map((opt) => {
                          const icon = VEHICLE_ICONS[opt];
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => answerAndAdvance(step, opt)}
                              aria-pressed={answers[step.key] === opt}
                              className={`${optionClass(answers[step.key] === opt)} flex items-center justify-center ${
                                icon ? "min-h-[76px] flex-col gap-0.5" : "col-span-2 min-h-12"
                              }`}
                            >
                              {icon}
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="mt-3 grid gap-2.5">
                        {step.options.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => answerAndAdvance(step, opt)}
                            aria-pressed={answers[step.key] === opt}
                            className={`${optionClass(answers[step.key] === opt)} w-full px-5 py-3.5 text-left`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </fieldset>
                )}

                {step.key === CONTACT_STEP.key && (
                  <div>
                    <h3 id="vf-step-heading" tabIndex={-1} className={headingClass}>Where do we reach you?</h3>
                    <p className="mt-0.5 text-sm text-[#1C5472]/85">Someone from our team calls you within one business day.</p>
                    <div className="mt-3 space-y-3">
                      {CONTACT_FIELDS.map((f) => (
                        <div key={f.key}>
                          <label htmlFor={`vf-${f.key}`} className="block text-sm font-bold text-[#1C5472]">{f.label}</label>
                          <input
                            id={`vf-${f.key}`}
                            type={f.type}
                            value={contact[f.key]}
                            placeholder={f.placeholder}
                            autoComplete={f.autoComplete}
                            inputMode={f.inputMode}
                            enterKeyHint={f.enterKeyHint}
                            onChange={(e) => {
                              const { value } = e.target;
                              setContact((prev) => ({ ...prev, [f.key]: value }));
                              setErrors((prev) => ({ ...prev, [f.key]: undefined }));
                            }}
                            aria-invalid={Boolean(errors[f.key])}
                            aria-describedby={errors[f.key] ? `vf-${f.key}-error` : undefined}
                            className={inputClass}
                          />
                          {errors[f.key] && (
                            <p id={`vf-${f.key}-error`} className="mt-1 text-sm text-red-700" role="alert">{errors[f.key]}</p>
                          )}
                        </div>
                      ))}
                    </div>
                    <div ref={consentRef} className={`mt-4 rounded-xl border-2 p-3 ${showConsentError ? "border-red-300" : "border-gray-200"}`}>
                      <FormConsent
                        entity={ENTITY.ASSET_SOLUTIONS}
                        value={consent}
                        onChange={(v) => {
                          setConsent(v);
                          setShowConsentError(false);
                          setSubmitError(null);
                        }}
                        showError={showConsentError}
                      />
                    </div>
                    {submitError && submitError !== CONSENT_ERROR && (
                      <p className="mt-3 text-sm text-red-700" role="alert">{submitError}</p>
                    )}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group mt-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#00FCB8] py-4 text-lg font-bold text-[#0A1628] shadow-lg shadow-[#00FCB8]/30 transition hover:scale-[1.02] hover:shadow-xl hover:shadow-[#00FCB8]/40 disabled:cursor-wait disabled:hover:scale-100"
                    >
                      {submitting ? (
                        <SendingUte message={SENDING_MESSAGES[sendingMsg]} messageKey={sendingMsg} />
                      ) : (
                        <>
                          Get my free assessment
                          <ArrowIcon />
                        </>
                      )}
                    </button>
                    <p className="mt-3 text-center text-xs leading-relaxed text-[#1C5472]/85">
                      Sending this doesn&apos;t run a credit check or lodge anything with a lender. We&apos;ll ask for ID and documents later, not here.
                    </p>
                    <p className="mt-2 text-center text-[11px] leading-relaxed text-[#1C5472]/70">
                      Approval is subject to lender assessment and credit criteria. General information only. It does not take your
                      personal circumstances into account.
                    </p>
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </div>

      {showSticky && !result && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#00FCB8]/30 bg-[#0A1628]/95 p-3 backdrop-blur md:hidden">
          <a href="#application" className="flex w-full items-center justify-center rounded-lg bg-[#00FCB8] py-3.5 font-bold text-[#0A1628]">
            {started ? "Finish my free assessment" : "Get my free assessment"}
          </a>
        </div>
      )}
    </>
  );
}
