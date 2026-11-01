"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import FormConsent, { CONSENT_ERROR } from "@/components/FormConsent";
import OpenStatus from "@/components/OpenStatus";
import { trackMeta } from "@/components/MetaPixel";
import useAdAttribution from "@/components/useAdAttribution";
import { getApplication, TEAM_PHONE } from "@/data/finance-applications";
import { HOURS } from "@/config/business-hours";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY_CONTACT = { fullName: "", phone: "", email: "", postcode: "" };

const CONTACT_FIELDS = [
  { key: "fullName", label: "Full name", type: "text", placeholder: "Your full name", autoComplete: "name" },
  { key: "phone", label: "Mobile", type: "tel", placeholder: "04XX XXX XXX", autoComplete: "tel", inputMode: "tel" },
  { key: "postcode", label: "Postcode", type: "text", placeholder: "2150", autoComplete: "postal-code", inputMode: "numeric", maxLength: 4 },
  { key: "email", label: "Email", type: "email", placeholder: "you@example.com", autoComplete: "email", inputMode: "email" },
];

const inputClass =
  "mt-1.5 w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-base text-[#1C5472] placeholder-gray-500 transition focus:border-[#00FCB8] focus:outline-none focus:ring-2 focus:ring-[#00FCB8]/30";

const nextButtonClass =
  "group mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#00FCB8] py-3.5 text-lg font-bold text-[#0A1628] shadow-lg shadow-[#00FCB8]/30 transition hover:scale-[1.02] hover:shadow-xl hover:shadow-[#00FCB8]/40";

const optionLabel = (option) => option.label ?? option;
const moneyDigits = (value) => (value || "").replace(/[^0-9]/g, "");
const formatMoney = (digits) => (digits ? `$${Number(digits).toLocaleString("en-AU")}` : "");
const isAnswered = (value) => Boolean(value?.trim());
const questionsFor = (app, answers) => app.steps.filter((s) => !s.showIf || s.showIf(answers));

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

/* Drafts live in sessionStorage, so a phone that reloads the page after a trip to
   the banking app doesn't lose the answers. Storage can be blocked; the form
   works without it. */
const readDraft = (key) => {
  try {
    return JSON.parse(window.sessionStorage.getItem(key));
  } catch {
    return null;
  }
};
const writeDraft = (key, value) => {
  try {
    if (value) window.sessionStorage.setItem(key, JSON.stringify(value));
    else window.sessionStorage.removeItem(key);
  } catch {
    /* the draft is a convenience only */
  }
};

/* Answered questions as label and value: the desktop sidebar and the review step. */
function SummaryRows({ rows, onEdit, tone = "light" }) {
  const dark = tone === "dark";
  return (
    <dl className={`space-y-2 text-sm ${dark ? "text-white" : "text-[#1C5472]"}`}>
      {rows.map(({ key, label, value }) => (
        <div key={key} className="flex items-baseline justify-between gap-4">
          <dt className={`shrink-0 ${dark ? "text-white/70" : "text-[#1C5472]/70"}`}>{label}</dt>
          <dd className="flex min-w-0 items-baseline gap-3 text-right font-bold">
            <span className="min-w-0 break-words">{value}</span>
            {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(key)}
                aria-label={`Edit ${label}`}
                className="shrink-0 text-xs font-bold text-[#1C5472] underline underline-offset-2 hover:no-underline"
              >
                Edit
              </button>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function ApplicationForm({ slug }) {
  const app = getApplication(slug);
  const draftKey = `ff-apply-${slug}`;

  const [ready, setReady] = useState(false);
  const [answers, setAnswers] = useState({});
  const [contact, setContact] = useState(EMPTY_CONTACT);
  const [currentKey, setCurrentKey] = useState(app.steps[0].key);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [consent, setConsent] = useState(false);
  const [showConsentError, setShowConsentError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [privacy, setPrivacy] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [note, setNote] = useState(null);
  const [showSticky, setShowSticky] = useState(false);
  const startedRef = useRef(false);
  const movedRef = useRef(false);
  const advancingRef = useRef(false);
  const cardRef = useRef(null);
  const attributionRef = useAdAttribution();
  const eventName = (suffix) => `apply_${slug.replace(/-/g, "_")}_${suffix}`;

  /* The questions that apply given the answers so far, plus contact details and review */
  const questions = useMemo(() => questionsFor(app, answers), [app, answers]);
  const visible = [
    ...questions,
    { key: "contact", section: app.sections.length - 1, type: "contact", question: "How do we reach you?" },
    { key: "review", section: app.sections.length, type: "review", question: "Check your application" },
  ];

  const stepIndex = Math.max(0, visible.findIndex((s) => s.key === currentKey));
  const step = visible[stepIndex];
  const hint = typeof step.hint === "function" ? step.hint(answers) : step.hint;

  const contactError = (key) => {
    if (key === "fullName" && !contact.fullName.trim()) return "Please enter your name.";
    if (key === "phone" && moneyDigits(contact.phone).length < 8) return "Please enter a number we can call you on.";
    if (key === "email" && !EMAIL_REGEX.test(contact.email.trim())) return "Please enter a valid email, like you@example.com.";
    if (key === "postcode" && !/^\d{4}$/.test(contact.postcode.trim())) return "Please enter your 4-digit postcode.";
    return null;
  };

  const firstIncomplete = () => {
    const unanswered = questions.find((s) => !isAnswered(answers[s.key]));
    if (unanswered) return unanswered.key;
    return CONTACT_FIELDS.some((f) => contactError(f.key)) ? "contact" : null;
  };

  /* Pick up a draft and any first answer sent by the home page selector. Read
     from window, not useSearchParams, so the page stays static. The card stays
     empty until this has run, so the first question never flashes past. */
  useLayoutEffect(() => {
    const first = app.steps[0];
    const startId = new URLSearchParams(window.location.search).get("start");
    const startLabel = first.options.find((o) => o.id === startId)?.label;
    const draft = readDraft(draftKey);
    const draftUsable = draft && (!startLabel || draft.answers?.[first.key] === startLabel);
    /* One-off read of the URL and session after hydration; the server render has neither. */
    /* eslint-disable react-hooks/set-state-in-effect */
    if (draftUsable) {
      setAnswers(draft.answers || {});
      setContact({ ...EMPTY_CONTACT, ...draft.contact });
      setCurrentKey(draft.currentKey || first.key);
      startedRef.current = true;
    } else if (startLabel) {
      const startAnswers = { [first.key]: startLabel };
      setAnswers(startAnswers);
      setCurrentKey(questionsFor(app, startAnswers)[1].key);
    }
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [app, draftKey]);

  useEffect(() => {
    if (!ready || submitted) return;
    writeDraft(draftKey, { answers, contact, currentKey });
  }, [ready, submitted, draftKey, answers, contact, currentKey]);

  /* After each move: keep the question on screen and put the focus on it */
  useEffect(() => {
    if (!movedRef.current) return;
    const card = cardRef.current;
    if (card && card.getBoundingClientRect().top < 72) card.scrollIntoView({ block: "start" });
    const target = document.getElementById("apply-step-input") || document.getElementById("apply-step-heading");
    target?.focus({ preventScroll: true });
  }, [currentKey, submitted]);

  /* On a phone, a way back to the form once it has scrolled away */
  useEffect(() => {
    const check = () => setShowSticky((cardRef.current?.getBoundingClientRect().bottom ?? 1) < 0);
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  const markStarted = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    track(eventName("start"));
  };

  const goTo = (key) => {
    movedRef.current = true;
    setErrors({});
    setCurrentKey(key);
  };

  /* Move on from a step, given the answers as they now stand. Editing from the
     review step returns there, by way of any new question the change opened up. */
  const advance = (fromKey, nextAnswers = answers) => {
    const nextQuestions = questionsFor(app, nextAnswers);
    if (editing) {
      const missing = nextQuestions.find((s) => !isAnswered(nextAnswers[s.key]));
      if (missing) {
        goTo(missing.key);
      } else {
        setEditing(false);
        goTo("review");
      }
      return;
    }
    const keys = [...nextQuestions.map((s) => s.key), "contact", "review"];
    goTo(keys[keys.indexOf(fromKey) + 1] || "review");
  };

  const goBack = () => {
    setNote(null);
    if (editing) {
      setEditing(false);
      goTo("review");
      return;
    }
    if (stepIndex > 0) goTo(visible[stepIndex - 1].key);
  };

  const editFromReview = (key) => {
    setNote(null);
    setEditing(true);
    goTo(key);
  };

  /* Tap an answer to advance. The short pause shows the choice landing; taps
     during it are ignored, so a double-tap can't skip the next question. */
  const answerAndAdvance = (key, value) => {
    if (advancingRef.current) return;
    advancingRef.current = true;
    markStarted();
    const nextAnswers = { ...answers, [key]: value };
    setAnswers(nextAnswers);
    setErrors({});
    setTimeout(() => {
      advancingRef.current = false;
      setNote(app.steps.find((s) => s.key === key)?.notes?.[value] || null);
      advance(key, nextAnswers);
    }, 220);
  };

  const summaryRows = questions
    .filter((s) => isAnswered(answers[s.key]))
    .map((s) => ({ key: s.key, label: s.label, value: answers[s.key].trim() }));

  const contactRows = [
    { key: "fullName", label: "Name", value: contact.fullName.trim() },
    { key: "phone", label: "Mobile", value: contact.phone.trim() },
    { key: "email", label: "Email", value: contact.email.trim() },
    { key: "postcode", label: "Postcode", value: contact.postcode.trim() },
  ];

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (step.type === "money" || step.type === "text") {
      const value = answers[step.key];
      const valid = step.type === "money" ? value === step.skip || Number(moneyDigits(value)) > 0 : Boolean(value?.trim());
      if (!valid) {
        setErrors({ [step.key]: step.type === "money" ? `Enter a rough amount, or tap "${step.skip}".` : `Add a few words, or tap "${step.skip}".` });
        return;
      }
      markStarted();
      setNote(null);
      advance(step.key);
      return;
    }
    if (step.type === "contact") {
      const found = {};
      CONTACT_FIELDS.forEach((f) => {
        const err = contactError(f.key);
        if (err) found[f.key] = err;
      });
      setErrors(found);
      if (Object.keys(found).length) {
        document.getElementById(`apply-${Object.keys(found)[0]}`)?.focus();
        return;
      }
      setEditing(false);
      goTo("review");
      return;
    }
    if (step.type !== "review" || submitting) return;

    setSubmitError(null);
    setShowConsentError(false);
    const missing = firstIncomplete();
    if (missing) {
      goTo(missing);
      return;
    }
    if (!consent) {
      setShowConsentError(true);
      setSubmitError(CONSENT_ERROR);
      return;
    }

    setSubmitting(true);
    const nameParts = contact.fullName.trim().split(/\s+/);
    const labelled = Object.fromEntries(summaryRows.map((r) => [r.label, r.value]));
    labelled.Postcode = contact.postcode.trim();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: nameParts[0],
          lastName: nameParts.slice(1).join(" ") || "(not provided)",
          email: contact.email.trim(),
          phone: contact.phone.trim(),
          teamMember: app.teamMember,
          consultationService: app.consultationService,
          services: [app.serviceLabel],
          preferredContact: "phone",
          campaign: `apply-${slug}`,
          /* For Ambition Cloud's add-lead on Asset Solutions leads */
          amount: moneyDigits(answers[app.amountKey]),
          postcode: contact.postcode.trim(),
          applicationType: app.applicationType?.(answers),
          assetType: app.assetType,
          attribution: attributionRef.current,
          answers: labelled,
          message: [
            `Website application: ${app.title.toUpperCase()}.`,
            ...Object.entries(labelled).map(([label, value]) => `${label}: ${value}`),
          ].join("\n"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) {
        setSubmitError(data.error || `Something went wrong. Please try again or call us on ${TEAM_PHONE.display}.`);
        setSubmitting(false);
        return;
      }
      track(eventName("submit"), "Lead");
      trackMeta(eventName("submit"), false);
      writeDraft(draftKey, null);
      movedRef.current = true;
      if (data.privacyLink) setPrivacy({ link: data.privacyLink, emailed: data.privacyEmailed });
      setSubmitted(true);
    } catch {
      setSubmitError(`Something went wrong. Please try again or call us on ${TEAM_PHONE.display}.`);
      setSubmitting(false);
    }
  };

  const progress = (stepIndex / (visible.length - 1)) * 100;
  const sectionLabels = [...app.sections, "Review"];
  /* How full a section's bar is: done sections are full, the current one fills as it goes */
  const sectionFill = (i) => {
    if (i !== step.section) return i < step.section ? 100 : 0;
    if (step.type === "review") return 100;
    const inSection = visible.filter((s) => s.section === i);
    const done = inSection.findIndex((s) => s.key === step.key);
    return Math.max(8, (done / inSection.length) * 100);
  };

  const headingClass = "text-lg font-bold text-[#1C5472] focus:outline-none sm:text-xl";
  const heading = (
    <h2 id="apply-step-heading" tabIndex={-1} className={headingClass}>{step.question}</h2>
  );
  const inputHeading = (
    <h2 className={headingClass}><label htmlFor="apply-step-input">{step.question}</label></h2>
  );

  const proposalLink = app.proposalNote && (
    <p className="text-sm text-white/85">
      {app.proposalNote}{" "}
      <a href="#credit-proposal" className="font-bold text-[#00FCB8] underline underline-offset-2 hover:no-underline">
        See a sample
      </a>
    </p>
  );

  const changeType = (
    <p className="text-sm text-white/85">
      Looking for something else?{" "}
      <Link href="/apply" className="font-bold text-[#00FCB8] underline underline-offset-2 hover:no-underline">
        Change finance type
      </Link>
    </p>
  );

  return (
    <div className="mx-auto grid max-w-7xl items-start gap-6 lg:grid-cols-[minmax(0,1fr)_520px] lg:gap-14">
      <div className="text-center lg:sticky lg:top-28 lg:text-left">
        <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
          {app.headline[0]} <span className="text-[#00FCB8]">{app.headline[1]}</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-base text-white/85 sm:text-lg lg:mx-0">{app.intro}</p>

        {/* the person they'll deal with, in the first view */}
        <div className="mx-auto mt-4 flex max-w-md items-center justify-center gap-3 text-left lg:mx-0 lg:justify-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={app.broker.photo} alt="" width={56} height={56} className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-[#00FCB8]" />
          <div className="min-w-0 text-sm leading-snug text-white/85">
            <p className="text-base font-bold text-white">{app.broker.fullName}, {app.broker.title}</p>
            <p>{app.broker.proof}</p>
          </div>
        </div>

        <div className="hidden lg:block">
          <p className="mt-4 text-sm text-white/85">
            <span className="text-[#FFD700]" aria-hidden>★★★★★</span> {app.proof}
          </p>

          {summaryRows.length < 4 && (
            <ul className="mt-4 max-w-md space-y-2 text-[15px] text-white/90">
              {app.points.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <svg className="mt-1 h-4 w-4 shrink-0 text-[#00FCB8]" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          )}

          {app.proposalNote && <div className="mt-4 max-w-md">{proposalLink}</div>}

          {/* the application so far, filling in as they answer */}
          {(submitted || step.type !== "review") && (
            <div className="mt-5 max-w-md rounded-2xl border border-white/20 bg-[#0E2E40]/50 p-5 text-left">
              <p className="text-base font-bold text-white">Your application</p>
              <div className="mt-3">
                {ready && summaryRows.length > 0 ? (
                  <SummaryRows rows={summaryRows} tone="dark" />
                ) : (
                  <p className="text-sm text-white/70">Your answers will build up here.</p>
                )}
              </div>
            </div>
          )}

          <div className="mt-4">{changeType}</div>
        </div>
      </div>

      <div className="min-w-0">
        <div ref={cardRef} className="relative scroll-mt-20">
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[#00FCB8] via-[#39B2B2] to-[#1C5472] opacity-70 blur-sm" aria-hidden />
        <div className="relative min-h-[420px] rounded-3xl bg-white p-6 shadow-2xl md:p-8">
          {submitted ? (
            <div className="py-6 text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#00FCB8]/15">
                <svg className="h-9 w-9 text-[#00b884]" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <h2 id="apply-step-heading" tabIndex={-1} className="mt-5 text-2xl font-bold text-[#1C5472] focus:outline-none">
                Thanks {contact.fullName.trim().split(/\s+/)[0]}. Your application is with our team.
              </h2>
              {app.afterSubmit ? (
                <ol className="mx-auto mt-5 max-w-md space-y-3 text-left text-[#1C5472]">
                  {app.afterSubmit.map((item, i) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1C5472] text-xs font-bold text-[#00FCB8]">{i + 1}</span>
                      {item}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-3 text-[#1C5472]/80">
                  Someone from our team will call you within one business day. We take calls {HOURS.label}.
                </p>
              )}
              {/* Ambition Cloud's signed link for this lead, same wording as /car-loan */}
              {privacy && (
                <div className="mt-6 rounded-2xl bg-[#00FCB8]/15 p-5 text-left">
                  <p className="font-bold text-[#1C5472]">Want to save time on the call?</p>
                  <p className="mt-2 text-sm text-[#1C5472]/85">
                    Sign our privacy consent now. We need it before we can check your options with lenders, and it includes our
                    Credit Guide and Quote. Have your driver licence handy, because it asks for a photo of the front and back.
                  </p>
                  <a
                    href={privacy.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex w-full items-center justify-center rounded-xl bg-[#00FCB8] py-3.5 text-base font-bold text-[#0A1628] transition hover:scale-[1.02]"
                  >
                    Sign your privacy consent
                  </a>
                  {privacy.emailed && (
                    <p className="mt-3 text-xs text-[#1C5472]/80">We&apos;ve also emailed you this link. It works for 24 hours.</p>
                  )}
                </div>
              )}
              <div className="mt-6 rounded-2xl bg-[#F5F5EF] p-5 text-left">
                <p className="font-bold text-[#1C5472]">To speed things up, have these handy</p>
                <ul className="mt-3 space-y-2 text-sm text-[#1C5472]">
                  {app.readyList.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#39B2B2]" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-5 text-sm text-[#1C5472]/80">
                In a hurry? Call us on{" "}
                <a href={TEAM_PHONE.link} className="font-bold text-[#1C5472] underline underline-offset-2 hover:no-underline">{TEAM_PHONE.display}</a>.
              </p>
            </div>
          ) : !ready ? (
            <div className="flex min-h-[370px] items-center justify-center" role="status">
              <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-[#1C5472]/20 border-t-[#1C5472] motion-reduce:animate-none" aria-hidden />
              <span className="sr-only">Loading your application</span>
            </div>
          ) : (
            <>
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-[#1C5472] sm:hidden">
                  <span>{sectionLabels[step.section]}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div
                  className="mt-1.5 grid grid-cols-4 gap-1.5 sm:mt-0"
                  role="progressbar"
                  aria-label={`Application progress: ${sectionLabels[step.section]}`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(progress)}
                >
                  {sectionLabels.map((label, i) => (
                    <div key={label} className="h-1.5 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#39B2B2] to-[#00FCB8] transition-all duration-300"
                        style={{ width: `${sectionFill(i)}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-1.5 hidden grid-cols-4 gap-1.5 text-xs font-bold sm:grid" aria-hidden>
                  {sectionLabels.map((label, i) => (
                    <span key={label} className={i === step.section ? "text-[#1C5472]" : "text-[#1C5472]/60"}>{label}</span>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-5" noValidate>
                {(stepIndex > 0 || editing) && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-[#1C5472]/70 transition hover:text-[#39B2B2]"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    {editing ? "Back to review" : "Back"}
                  </button>
                )}

                {/* reassurance after an answer that makes people think they won't qualify */}
                {note && (
                  <p className="mb-4 flex items-start gap-2.5 rounded-xl bg-[#00FCB8]/15 p-3 text-sm leading-snug text-[#1C5472]">
                    <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {note}
                  </p>
                )}

                {/* tap an answer to advance */}
                {step.options && (
                  <fieldset key={step.key}>
                    <legend className="contents">{heading}</legend>
                    {hint && <p className="mt-1 text-sm text-[#1C5472]/70">{hint}</p>}
                    <div className="mt-4 grid gap-2.5">
                      {step.options.map((option) => {
                        const label = optionLabel(option);
                        const selected = answers[step.key] === label;
                        return (
                          <button
                            key={label}
                            type="button"
                            onClick={() => answerAndAdvance(step.key, label)}
                            aria-pressed={selected}
                            className={`w-full rounded-xl px-5 py-3.5 text-left text-base font-bold transition-all duration-150 ${
                              selected
                                ? "bg-[#00FCB8] text-[#0A1628] shadow-md shadow-[#00FCB8]/40"
                                : "border-2 border-gray-200 bg-white text-[#1C5472] hover:border-[#39B2B2] hover:bg-[#39B2B2]/5"
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                )}

                {step.type === "money" && (
                  <div key={step.key}>
                    {inputHeading}
                    {hint && <p className="mt-1 text-sm text-[#1C5472]/70">{hint}</p>}
                    <div className="relative mt-3">
                      <span className="pointer-events-none absolute left-4 top-1/2 mt-[3px] -translate-y-1/2 text-xl font-bold text-[#1C5472]" aria-hidden>$</span>
                      <input
                        id="apply-step-input"
                        type="text"
                        inputMode="numeric"
                        autoComplete="off"
                        enterKeyHint="next"
                        placeholder="0"
                        value={moneyDigits(answers[step.key]) ? Number(moneyDigits(answers[step.key])).toLocaleString("en-AU") : ""}
                        onChange={(e) => {
                          markStarted();
                          const digits = moneyDigits(e.target.value).slice(0, 9);
                          setAnswers((prev) => ({ ...prev, [step.key]: formatMoney(digits) }));
                          setErrors({});
                        }}
                        aria-invalid={Boolean(errors[step.key])}
                        aria-describedby={errors[step.key] ? "apply-step-error" : undefined}
                        className={`${inputClass} pl-8 text-xl font-bold tabular-nums`}
                      />
                    </div>
                  </div>
                )}

                {step.type === "text" && (
                  <div key={step.key}>
                    {inputHeading}
                    <input
                      id="apply-step-input"
                      type="text"
                      enterKeyHint="next"
                      maxLength={120}
                      placeholder={step.placeholder}
                      autoComplete={step.autoComplete || "off"}
                      value={answers[step.key] === step.skip ? "" : answers[step.key] || ""}
                      onChange={(e) => {
                        markStarted();
                        setAnswers((prev) => ({ ...prev, [step.key]: e.target.value }));
                        setErrors({});
                      }}
                      aria-invalid={Boolean(errors[step.key])}
                      aria-describedby={errors[step.key] ? "apply-step-error" : undefined}
                      className={`${inputClass} mt-3`}
                    />
                  </div>
                )}

                {(step.type === "money" || step.type === "text") && (
                  <>
                    {errors[step.key] && (
                      <p id="apply-step-error" className="mt-2 text-sm text-red-700" role="alert">{errors[step.key]}</p>
                    )}
                    <button type="submit" className={nextButtonClass}>
                      Next
                      <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => answerAndAdvance(step.key, step.skip)}
                      className="mt-3 w-full py-1.5 text-center text-sm font-bold text-[#1C5472] underline underline-offset-2 hover:no-underline"
                    >
                      {step.skip}
                    </button>
                  </>
                )}

                {step.type === "contact" && (
                  <div>
                    {heading}
                    <p className="mt-1 text-sm text-[#1C5472]/70">Someone from our team will call you to go through it.</p>
                    <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
                      {CONTACT_FIELDS.map((f) => (
                        <div key={f.key} className={f.key === "postcode" || f.key === "phone" ? "" : "sm:col-span-2"}>
                          <label htmlFor={`apply-${f.key}`} className="block text-sm font-bold text-[#1C5472]">{f.label}</label>
                          <input
                            id={`apply-${f.key}`}
                            type={f.type}
                            value={contact[f.key]}
                            placeholder={f.placeholder}
                            autoComplete={f.autoComplete}
                            inputMode={f.inputMode}
                            maxLength={f.maxLength}
                            onChange={(e) => {
                              markStarted();
                              setContact((prev) => ({ ...prev, [f.key]: e.target.value }));
                              setErrors((prev) => ({ ...prev, [f.key]: undefined }));
                            }}
                            aria-invalid={Boolean(errors[f.key])}
                            aria-describedby={errors[f.key] ? `apply-${f.key}-error` : undefined}
                            className={inputClass}
                          />
                          {errors[f.key] && (
                            <p id={`apply-${f.key}-error`} className="mt-1 text-sm text-red-700" role="alert">{errors[f.key]}</p>
                          )}
                        </div>
                      ))}
                    </div>
                    <button type="submit" className={nextButtonClass}>
                      Review my application
                      <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                )}

                {step.type === "review" && (
                  <div>
                    {heading}
                    <div className="mt-3 rounded-2xl bg-[#F5F5EF] p-4">
                      <SummaryRows rows={summaryRows} onEdit={editFromReview} />
                      <div className="my-3 border-t border-[#1C5472]/10" />
                      <SummaryRows
                        rows={contactRows}
                        onEdit={() => {
                          setEditing(true);
                          goTo("contact");
                        }}
                      />
                    </div>
                    <div className="mt-4">
                      <FormConsent
                        entity={app.entity}
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
                      className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-[#00FCB8] py-4 text-lg font-bold text-[#0A1628] shadow-lg shadow-[#00FCB8]/30 transition hover:scale-[1.02] hover:shadow-xl hover:shadow-[#00FCB8]/40 disabled:cursor-wait disabled:hover:scale-100"
                    >
                      {submitting ? (
                        <>
                          <span className="h-5 w-5 animate-spin rounded-full border-[3px] border-[#0A1628]/25 border-t-[#0A1628] motion-reduce:animate-none" aria-hidden />
                          <span role="status">Sending…</span>
                        </>
                      ) : (
                        "Send my application"
                      )}
                    </button>
                    <p className="mt-3 text-center text-xs text-[#1C5472]/70">
                      Sending this doesn&apos;t run a credit check or lodge anything with a lender. We&apos;ll ask for ID and documents later, not here.
                    </p>
                  </div>
                )}
              </form>
            </>
          )}
        </div>
        </div>
        <div className="relative mt-5 space-y-2 text-center">
          <p className="text-sm text-white">
            Rather talk it through? Call us on{" "}
            <a href={TEAM_PHONE.link} className="font-bold text-[#00FCB8] underline underline-offset-2 hover:no-underline">{TEAM_PHONE.display}</a>
          </p>
          <p className="text-sm text-white/85"><OpenStatus /></p>
          <div className="space-y-2 lg:hidden">
            {proposalLink}
            {changeType}
          </div>
        </div>
      </div>

      {showSticky && !submitted && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#00FCB8]/30 bg-[#0A1628]/95 p-3 backdrop-blur md:hidden">
          <a href="#application" className="flex w-full items-center justify-center rounded-lg bg-[#00FCB8] py-3.5 font-bold text-[#0A1628]">
            {summaryRows.length > 1 ? "Continue your application" : "Start your application"}
          </a>
        </div>
      )}
    </div>
  );
}
