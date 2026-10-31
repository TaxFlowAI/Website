"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import WaveDivider from "@/components/WaveDivider";
import FormConsent, { CONSENT_ERROR } from "@/components/FormConsent";
import { trackLead } from "@/components/MetaPixel";
import { ENTITY } from "@/config/entities";
import { HOURS, getOpenStatus } from "@/config/business-hours";
import { OFFICE, GOOGLE } from "@/config/location";
import { CONTACT_FAQ } from "@/data/contact-faq";

const SERVICES_HASSAN = [
  "Self-Employed Home Loan",
  "Home Loan",
  "First Home Buyer",
  "Investment Property",
  "Refinancing",
  "Commercial Loan",
  "Construction Loan",
  "Debt Consolidation",
  "SMSF Loan",
  "Other",
];
const SERVICES_SHAM = [
  "Car Finance",
  "Commercial Vehicle",
  "Equipment Finance",
  "Fleet Finance",
  "Personal Loan",
  "Working Capital",
  "Other",
];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00FCB8]";
const FIELD =
  "mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-[#1C5472] placeholder:text-[#1C5472]/80 focus:border-[#00FCB8] focus:outline-none focus:ring-2 focus:ring-[#00FCB8]/40";

/* Hours table rows; "today" is matched against the Sydney weekday */
const HOURS_ROWS = [
  { label: "Monday to Friday", value: "10:30am – 8:00pm", days: HOURS.days },
  { label: "Saturday", value: "Closed", days: ["Saturday"] },
  { label: "Sunday", value: "Closed", days: ["Sunday"] },
  { label: "Public holidays", value: "Closed", days: [] },
];

function Icon({ d, className, strokeWidth = 1.75 }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} viewBox="0 0 24 24" aria-hidden>
      {[].concat(d).map((path) => (
        <path key={path} strokeLinecap="round" strokeLinejoin="round" d={path} />
      ))}
    </svg>
  );
}
const ICONS = {
  phone:
    "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z",
  email:
    "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
  pin: ["M15 10.5a3 3 0 11-6 0 3 3 0 016 0z", "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"],
  video:
    "M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z",
  building:
    "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21",
  train: ["M8.25 18.75L6 21m9.75-2.25L18 21", "M6.75 3h10.5A1.5 1.5 0 0118.75 4.5v10.5a3.75 3.75 0 01-3.75 3.75H9a3.75 3.75 0 01-3.75-3.75V4.5A1.5 1.5 0 016.75 3z", "M5.25 10.5h13.5M9 15h.008M15 15h.008"],
  arrow: "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3",
  external: "M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25",
  chevron: "M19.5 8.25l-7.5 7.5-7.5-7.5",
  trophy:
    "M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0",
};

function Stars({ className }) {
  return (
    <span className={`flex gap-0.5 ${className}`} aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.25 4.1 1 5.8L10 14.85 4.75 17.6l1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

function StatusDot({ open }) {
  return (
    <span className="relative flex h-2.5 w-2.5" aria-hidden>
      {open && <span className="absolute inline-flex h-full w-full rounded-full bg-[#00FCB8] opacity-60 motion-safe:animate-ping" />}
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${open ? "bg-[#00FCB8]" : "bg-[#F5C26B]"}`} />
    </span>
  );
}

export default function ContactPage() {
  const router = useRouter();
  const [teamMember, setTeamMember] = useState(null); // "hassan" | "sham"
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState("");
  const [preferredContact, setPreferredContact] = useState("email"); // "email" | "phone"
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [consent, setConsent] = useState(false);
  const [showConsentError, setShowConsentError] = useState(false);
  const [status, setStatus] = useState(null); // open/closed line, worked out in Sydney time after hydration

  /* Landing pages link here with ?service=<key> to preselect the broker and
     service, or ?team=hassan|sham for just the broker. Read from window, not
     useSearchParams, so the page stays static. */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const team = params.get("team");
    if (params.get("service") === "self-employed") {
      // One-off read of the URL after hydration; the server render has no query string.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTeamMember("hassan");
      setServices(["Self-Employed Home Loan"]);
    } else if (team === "hassan" || team === "sham") {
      setTeamMember(team);
    }
  }, []);

  /* The static render can't know the time, so the "Open now" line fills in on
     the client and refreshes every minute. */
  useEffect(() => {
    const update = () => setStatus(getOpenStatus());
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  const serviceOptions =
    teamMember === "hassan"
      ? SERVICES_HASSAN
      : teamMember === "sham"
        ? SERVICES_SHAM
        : [];

  const toggleService = (s) => {
    setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  const validate = () => {
    const e = {};
    if (!firstName.trim()) e.firstName = "First name is required.";
    if (!lastName.trim()) e.lastName = "Last name is required.";
    if (!email.trim()) e.email = "Email is required.";
    else if (!EMAIL_REGEX.test(email)) e.email = "Please enter a valid email address.";
    if (!phone.trim()) e.phone = "Phone is required.";
    if (!teamMember) e.teamMember = "Please select who you'd like to speak with.";
    if (services.length === 0) e.services = "Please select at least one service.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const contactEntity = teamMember === "hassan" ? ENTITY.BROKERS : teamMember === "sham" ? ENTITY.ASSET_SOLUTIONS : ENTITY.SHARED;

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
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          teamMember: teamMember || "team",
          services,
          /* The message box is optional here but /api/contact requires one */
          message: message.trim() || `Enquiry about: ${services.join(", ")}. No message added.`,
          preferredContact,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(data.error || "Something went wrong. Please try again or call us on +61 422 959 486.");
        setSubmitting(false);
        return;
      }
      const teamParam = teamMember === "hassan" ? "hassan" : teamMember === "sham" ? "sham" : "team";
      trackLead();
      router.push(`/contact/thank-you?team=${teamParam}`);
    } catch {
      setSubmitError("Something went wrong. Please try again or call us on +61 422 959 486.");
      setSubmitting(false);
    }
  };

  const statusText = status ? status.text : HOURS.short;

  return (
    <div className="min-h-screen bg-[#F5F5EF] font-sans selection:bg-[#00FCB8] selection:text-[#0A1628]">
      <LayoutNav activeNav="contact" />

      {/* 1. HERO: who to talk to, and the three ways to reach us */}
      <section className="section-dot-grid-dark relative px-4 pt-12 md:px-6 md:pt-16 lg:px-8">
        <div className="mx-auto max-w-6xl pb-14 md:pb-20">
          <h1 className="max-w-3xl text-balance text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Talk to a broker at <span className="text-[#00FCB8]">Parramatta Square.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#CFEAEA]">
            Home loans with Hassan. Car, ute and equipment finance with Sham. Meet us on Level 49, or by phone or
            video. No pressure, no obligation.
          </p>

          <div className="mt-10 grid divide-y divide-white/10 overflow-hidden rounded-2xl bg-[#0A1628] shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)] md:grid-cols-[1.15fr_1fr_1fr] md:divide-x md:divide-y-0">
            <a href={OFFICE.phoneHref} className={`group flex gap-4 p-6 transition-colors hover:bg-white/[0.04] ${FOCUS}`}>
              <Icon d={ICONS.phone} className="mt-1 h-6 w-6 shrink-0 text-[#00FCB8]" />
              <span>
                <span className="block text-sm text-[#CFEAEA]">Call us</span>
                <span className="mt-0.5 block text-2xl font-bold tabular-nums text-white group-hover:text-[#00FCB8]">
                  {OFFICE.phone}
                </span>
                <span className="mt-2 flex items-center gap-2 text-sm text-white" aria-live="polite">
                  {status && <StatusDot open={status.open} />}
                  {statusText}
                </span>
              </span>
            </a>
            <a href={`mailto:${OFFICE.email}`} className={`group flex gap-4 p-6 transition-colors hover:bg-white/[0.04] ${FOCUS}`}>
              <Icon d={ICONS.email} className="mt-1 h-6 w-6 shrink-0 text-[#00FCB8]" />
              <span className="min-w-0">
                <span className="block text-sm text-[#CFEAEA]">Email us</span>
                <span className="mt-0.5 block break-words text-lg font-bold text-white group-hover:text-[#00FCB8]">
                  {OFFICE.email}
                </span>
                <span className="mt-2 block text-sm text-white/85">We reply within one business day</span>
              </span>
            </a>
            <a
              href={GOOGLE.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex gap-4 p-6 transition-colors hover:bg-white/[0.04] ${FOCUS}`}
            >
              <Icon d={ICONS.pin} className="mt-1 h-6 w-6 shrink-0 text-[#00FCB8]" />
              <span>
                <span className="block text-sm text-[#CFEAEA]">Visit us</span>
                <span className="mt-0.5 block text-lg font-bold text-white group-hover:text-[#00FCB8]">{OFFICE.street}</span>
                <span className="mt-2 inline-flex items-center gap-1.5 text-sm text-white/85">
                  Parramatta NSW 2150 · Get directions
                  <Icon d={ICONS.arrow} className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                </span>
              </span>
            </a>
          </div>
        </div>
        <div className="-mx-4 md:-mx-6 lg:-mx-8">
          <WaveDivider fill="#F5F5EF" />
        </div>
      </section>

      {/* 2. FORM + OFFICE PANEL */}
      <section className="section-dot-grid relative px-4 py-14 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-12">
          {/* FORM */}
          <div>
            <div className="rounded-2xl bg-white p-6 shadow-[0_14px_36px_-18px_rgba(10,22,40,0.35)] sm:p-8">
              <h2 className="text-2xl font-bold text-[#1C5472]">Send us a message</h2>
              <p className="mt-1 text-sm text-[#1C5472]/85">
                Tell us a little about what you need and someone from our team will contact you within one business day.
              </p>
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* FIELD 1 — Who */}
                <fieldset>
                  <legend className="block text-sm font-medium text-[#1C5472]">Who do you need help from?</legend>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      aria-pressed={teamMember === "hassan"}
                      onClick={() => setTeamMember("hassan")}
                      className={`flex w-full items-center gap-4 rounded-xl p-4 text-left transition ${FOCUS} ${
                        teamMember === "hassan"
                          ? "border-2 border-[#00FCB8] bg-[#00FCB8]/5"
                          : "border border-gray-200 bg-white hover:border-[#39B2B2]"
                      }`}
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1C5472] font-bold text-white">HA</span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold text-[#1C5472]">Hassan Arif JP</span>
                        <span className="block text-xs text-[#1C5472]/85">Home loans · Investment · Commercial</span>
                        <span className="block text-xs font-medium text-[#23797A]">Frontline Financial Brokers</span>
                      </span>
                    </button>
                    <button
                      type="button"
                      aria-pressed={teamMember === "sham"}
                      onClick={() => setTeamMember("sham")}
                      className={`flex w-full items-center gap-4 rounded-xl p-4 text-left transition ${FOCUS} ${
                        teamMember === "sham"
                          ? "border-2 border-[#00FCB8] bg-[#00FCB8]/5"
                          : "border border-gray-200 bg-white hover:border-[#39B2B2]"
                      }`}
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1C5472] font-bold text-white">SH</span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold text-[#1C5472]">Sham</span>
                        <span className="block text-xs text-[#1C5472]/85">Car · Equipment · Fleet finance</span>
                        <span className="block text-xs font-medium text-[#23797A]">Frontline Financial: Asset Solutions</span>
                        <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-[#1C5472]">
                          <Icon d={ICONS.trophy} className="h-3.5 w-3.5 text-[#23797A]" />
                          FY25 Fintelligence award winner
                        </span>
                      </span>
                    </button>
                  </div>
                  {errors.teamMember && <p className="mt-1 text-sm text-red-700">{errors.teamMember}</p>}
                </fieldset>

                {/* Name row */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-first-name" className="block text-sm font-medium text-[#1C5472]">First name *</label>
                    <input
                      id="contact-first-name"
                      type="text"
                      autoComplete="given-name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={FIELD}
                      placeholder="First name"
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-700">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-last-name" className="block text-sm font-medium text-[#1C5472]">Last name *</label>
                    <input
                      id="contact-last-name"
                      type="text"
                      autoComplete="family-name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={FIELD}
                      placeholder="Last name"
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-700">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-[#1C5472]">Email address *</label>
                    <input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={FIELD}
                      placeholder="you@example.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-700">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-medium text-[#1C5472]">Phone number *</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={FIELD}
                      placeholder="04XX XXX XXX"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-700">{errors.phone}</p>}
                  </div>
                </div>

                {/* Services — only show when team selected */}
                {teamMember && (
                  <fieldset>
                    <legend className="block text-sm font-medium text-[#1C5472]">What can we help you with?</legend>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {serviceOptions.map((s) => (
                        <button
                          key={s}
                          type="button"
                          aria-pressed={services.includes(s)}
                          onClick={() => toggleService(s)}
                          className={`rounded-full px-4 py-2 text-sm transition ${FOCUS} ${
                            services.includes(s)
                              ? "border border-[#00FCB8] bg-[#00FCB8] font-bold text-[#0A1628]"
                              : "border border-[#1C5472]/40 bg-white text-[#1C5472] hover:border-[#1C5472]"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    {errors.services && <p className="mt-1 text-sm text-red-700">{errors.services}</p>}
                  </fieldset>
                )}

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-[#1C5472]">Message</label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className={FIELD}
                    placeholder="Tell us about your situation and what you're hoping to achieve. The more detail, the better we can prepare before we call."
                  />
                </div>

                <fieldset>
                  <legend className="block text-sm font-medium text-[#1C5472]">How would you like us to contact you?</legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {[
                      { key: "email", label: "Email", icon: ICONS.email },
                      { key: "phone", label: "Phone call", icon: ICONS.phone },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        aria-pressed={preferredContact === opt.key}
                        onClick={() => setPreferredContact(opt.key)}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${FOCUS} ${
                          preferredContact === opt.key
                            ? "bg-[#00FCB8] font-medium text-[#0A1628]"
                            : "border border-[#1C5472]/40 bg-white text-[#1C5472] hover:border-[#1C5472]"
                        }`}
                      >
                        <Icon d={opt.icon} className="h-4 w-4" />
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="pt-2">
                  <FormConsent
                    entity={contactEntity}
                    value={consent}
                    onChange={(v) => { setConsent(v); setShowConsentError(false); setSubmitError(null); }}
                    showError={showConsentError}
                  />
                </div>

                {submitError && submitError !== CONSENT_ERROR && <p className="text-sm text-red-700">{submitError}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl bg-[#00FCB8] py-4 text-lg font-bold text-[#0A1628] shadow-[0_10px_24px_-12px_rgba(0,160,120,0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-12px_rgba(0,160,120,0.8)] disabled:translate-y-0 disabled:opacity-70 ${FOCUS}`}
                >
                  {submitting ? (
                    <>
                      <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden>
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send message
                      <Icon d={ICONS.arrow} className="h-5 w-5" strokeWidth={2} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* OFFICE PANEL (sticky): address, hours, meeting options, reviews */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl bg-[#1C5472] p-6 text-white shadow-[0_14px_36px_-18px_rgba(10,22,40,0.45)] sm:p-7">
              <h2 className="text-xl font-bold">Office and hours</h2>

              <div className="mt-5 flex gap-3">
                <Icon d={ICONS.pin} className="mt-0.5 h-5 w-5 shrink-0 text-[#00FCB8]" />
                <address className="not-italic leading-relaxed">
                  <span className="font-semibold">{OFFICE.name}</span>
                  <br />
                  {OFFICE.street}
                  <br />
                  {OFFICE.locality} {OFFICE.region} {OFFICE.postcode}
                </address>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={GOOGLE.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 rounded-lg bg-[#00FCB8] px-4 py-2 text-sm font-bold text-[#0A1628] transition hover:opacity-90 ${FOCUS}`}
                >
                  Get directions
                  <Icon d={ICONS.arrow} className="h-4 w-4" strokeWidth={2} />
                </a>
                <a
                  href={GOOGLE.listingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 rounded-lg border border-white/35 px-4 py-2 text-sm font-medium text-white transition hover:border-[#00FCB8] hover:text-[#00FCB8] ${FOCUS}`}
                >
                  Open in Google Maps
                  <Icon d={ICONS.external} className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-6 border-t border-white/15 pt-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-bold">Phone and appointments</h3>
                  {status && (
                    <span className="flex items-center gap-2 text-xs text-[#CFEAEA]">
                      <StatusDot open={status.open} />
                      {status.open ? "Open now" : "Closed now"}
                    </span>
                  )}
                </div>
                <dl className="mt-3 space-y-1.5 text-sm">
                  {HOURS_ROWS.map((row) => {
                    const isToday = status && row.days.includes(status.today);
                    return (
                      <div
                        key={row.label}
                        className={`flex justify-between gap-4 rounded-md px-2 py-1 ${isToday ? "bg-white/10 font-semibold" : ""}`}
                      >
                        <dt>{row.label}</dt>
                        <dd className={`tabular-nums ${row.value === "Closed" ? "text-[#CFEAEA]" : ""}`}>{row.value}</dd>
                      </div>
                    );
                  })}
                </dl>
                <p className="mt-3 text-xs leading-relaxed text-[#CFEAEA]">
                  Closed over the Christmas to New Year break (24 December to 1 January).
                </p>
              </div>

              <div className="mt-6 flex gap-3 border-t border-white/15 pt-5">
                <Icon d={ICONS.video} className="mt-0.5 h-5 w-5 shrink-0 text-[#00FCB8]" />
                <p className="text-sm leading-relaxed text-white/90">
                  <span className="font-semibold text-white">In person or online.</span> We meet at the office, or by phone or
                  video, whichever suits you.
                </p>
              </div>

              <div className="mt-6 border-t border-white/15 pt-5">
                <div className="flex items-center gap-2">
                  <Stars className="text-[#F5C26B]" />
                  <span className="font-bold">5.0 from 100+ Google reviews</span>
                </div>
                <p className="mt-2 text-sm italic leading-relaxed text-white/90">
                  &ldquo;The team at Frontline Financial are extraordinary at what they do.&rdquo; Oliver S.
                </p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
                  <a
                    href={GOOGLE.reviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-[#00FCB8] underline decoration-[#00FCB8]/40 underline-offset-4 hover:decoration-[#00FCB8] ${FOCUS}`}
                  >
                    Read our reviews
                  </a>
                  <a
                    href={GOOGLE.writeReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-white underline decoration-white/40 underline-offset-4 hover:decoration-white ${FOCUS}`}
                  >
                    Leave a review
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <WaveDivider fill="#0A1628" />

      {/* 3. MAP: the Google Business Profile listing, plus how to get here */}
      <section className="relative overflow-hidden bg-[#0A1628] px-4 pt-6 md:px-6 lg:px-8">
        <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#39B2B2] opacity-[0.08] blur-[100px]" aria-hidden />
        <div className="relative mx-auto max-w-6xl">
          <h2 className="text-balance text-3xl font-bold text-white md:text-4xl">Find us at 8 Parramatta Square</h2>
          <p className="mt-3 max-w-2xl text-[#CFEAEA]">
            We&apos;re on Level 49 of the 8 Parramatta Square tower, in the heart of the Parramatta CBD.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <div className="overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-[0_20px_44px_-24px_rgba(0,0,0,0.8)]">
              <iframe
                src={GOOGLE.mapEmbedSrc}
                title="Google Maps: Frontline Financial Group, Level 49, 8 Parramatta Square, Parramatta NSW 2150"
                className="block h-80 w-full border-0 md:h-[440px]"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            <div className="flex flex-col gap-6">
              <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/frontline-8-parramatta-square.webp"
                  alt="The 8 Parramatta Square tower, where Frontline Financial's office is on Level 49"
                  className="block h-56 w-full object-cover object-[50%_30%] md:h-60"
                  width={1066}
                  height={1421}
                  loading="lazy"
                />
              </div>
              <ul className="space-y-4 text-sm text-white/90">
                <li className="flex gap-3">
                  <Icon d={ICONS.building} className="h-5 w-5 shrink-0 text-[#00FCB8]" />
                  <span>Level 49, 8 Parramatta Square, Parramatta NSW 2150</span>
                </li>
                <li className="flex gap-3">
                  <Icon d={ICONS.train} className="h-5 w-5 shrink-0 text-[#00FCB8]" />
                  <span>A short walk from Parramatta Station</span>
                </li>
                <li className="flex gap-3">
                  <Icon d={ICONS.video} className="h-5 w-5 shrink-0 text-[#00FCB8]" />
                  <span>Can&apos;t make it in? We meet by phone or video anywhere in Australia.</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <a
                  href={GOOGLE.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-lg bg-[#00FCB8] px-5 py-3 font-bold text-[#0A1628] transition hover:opacity-90 ${FOCUS}`}
                >
                  Get directions
                  <Icon d={ICONS.arrow} className="h-5 w-5" strokeWidth={2} />
                </a>
                <a
                  href={GOOGLE.listingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-lg border border-[#00FCB8]/60 px-5 py-3 font-bold text-[#00FCB8] transition hover:bg-[#00FCB8] hover:text-[#0A1628] ${FOCUS}`}
                >
                  See us on Google
                  <Icon d={ICONS.external} className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="-mx-4 mt-14 md:-mx-6 md:mt-16 lg:-mx-8">
          <WaveDivider fill="#F5F5EF" />
        </div>
      </section>

      {/* 4. FAQ */}
      <section className="section-dot-grid px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-balance text-3xl font-bold text-[#1C5472] md:text-4xl">Before you get in touch</h2>
          <div className="mt-8 divide-y divide-[#1C5472]/15 border-y border-[#1C5472]/15">
            {CONTACT_FAQ.map(({ q, a }) => (
              <details key={q} className="group">
                <summary
                  className={`flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-semibold text-[#1C5472] [&::-webkit-details-marker]:hidden ${FOCUS}`}
                >
                  {q}
                  <Icon
                    d={ICONS.chevron}
                    className="h-5 w-5 shrink-0 text-[#23797A] transition-transform duration-300 group-open:rotate-180"
                    strokeWidth={2}
                  />
                </summary>
                <p className="max-w-[65ch] pb-5 leading-relaxed text-[#1C5472]/85">{a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-[#1C5472]">
            Still have a question?{" "}
            <a href={OFFICE.phoneHref} className={`font-bold text-[#1C5472] underline decoration-[#00FCB8] decoration-2 underline-offset-4 ${FOCUS}`}>
              Call {OFFICE.phone}
            </a>
            , {HOURS.label}.
          </p>
        </div>
      </section>

      <LayoutFooter />
    </div>
  );
}
