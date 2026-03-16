"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import WaveDivider from "@/components/WaveDivider";
import FormConsent, { CONSENT_ERROR } from "@/components/FormConsent";
import { ENTITY } from "@/config/entities";

const SERVICES_HASSAN = [
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

function PhoneIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}
function EmailIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
function LocationIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
function OfficeIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  );
}
function ClockIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

const GOOGLE_MAPS_URL = "https://www.google.com/maps/search/150+George+Street+Parramatta+NSW+2150";

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
          message: message.trim(),
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
      router.push(`/contact/thank-you?team=${teamParam}`);
    } catch {
      setSubmitError("Something went wrong. Please try again or call us on +61 422 959 486.");
      setSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#F5F5EF] font-sans">
      <LayoutNav activeNav="contact" />

      {/* 1. HERO */}
      <section className="section-dot-grid-dark relative px-4 pt-12 pb-20 md:px-6 md:pt-16 md:pb-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-bold text-white text-5xl sm:text-6xl tracking-tight">
            Let&apos;s talk about
          </h1>
          <p className="mt-2 font-bold text-[#00FCB8] text-5xl sm:text-6xl">your goals.</p>
          <p className="mx-auto mt-6 max-w-2xl text-[#39B2B2] text-xl">
            No pressure. No obligation. No confusing jargon. Just a conversation about what you need and how we can help.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+61422959486"
              className="flex flex-col items-center rounded-full border border-white/20 bg-[#0A1628] px-6 py-3 text-center"
            >
              <PhoneIcon className="h-6 w-6 text-[#00FCB8]" />
              <span className="mt-1 font-medium text-white">+61 422 959 486</span>
              <span className="text-xs text-[#39B2B2]">Call us anytime</span>
            </a>
            <a
              href="mailto:operations@frontline.financial"
              className="flex flex-col items-center rounded-full border border-white/20 bg-[#0A1628] px-6 py-3 text-center"
            >
              <EmailIcon className="h-6 w-6 text-[#00FCB8]" />
              <span className="mt-1 font-medium text-white">operations@frontline.financial</span>
              <span className="text-xs text-[#39B2B2]">We reply within 24 hours</span>
            </a>
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center rounded-full border border-white/20 bg-[#0A1628] px-6 py-3 text-center"
            >
              <LocationIcon className="h-6 w-6 text-[#00FCB8]" />
              <span className="mt-1 font-medium text-white">150 George St, Parramatta</span>
              <span className="text-xs text-[#39B2B2]">Mon–Fri 9am–5pm</span>
            </a>
          </div>
        </div>
        <WaveDivider fill="#F5F5EF" />
      </section>

      {/* 2. MAIN CONTACT SECTION */}
      <section className="section-dot-grid relative px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[55%_45%] lg:gap-12">
          {/* LEFT — FORM */}
          <div className="lg:order-1">
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <h2 className="font-bold text-[#1C5472] text-2xl">Get in touch</h2>
              <p className="mt-1 text-sm text-gray-500">
                Fill in your details and the right person will reach out to you directly.
              </p>
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* FIELD 1 — Who */}
                <div>
                  <label className="block text-sm font-medium text-[#1C5472]">Who do you need help from?</label>
                  <div className="mt-3 space-y-3">
                    <button
                      type="button"
                      onClick={() => setTeamMember("hassan")}
                      className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                        teamMember === "hassan"
                          ? "border-2 border-[#00FCB8] bg-[#00FCB8]/5"
                          : "border border-gray-200 bg-white"
                      }`}
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1C5472] font-bold text-white">HA</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-[#1C5472] text-sm">Hassan Arif JP</p>
                        <p className="text-xs text-gray-500">Home Loans · Investment · Commercial</p>
                        <p className="text-xs text-[#39B2B2]">Frontline Financial Brokers</p>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTeamMember("sham")}
                      className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                        teamMember === "sham"
                          ? "border-2 border-[#00FCB8] bg-[#00FCB8]/5"
                          : "border border-gray-200 bg-white"
                      }`}
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1C5472] font-bold text-white">SH</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-[#1C5472] text-sm">Sham</p>
                        <p className="text-xs text-gray-500">Car · Equipment · Fleet Finance</p>
                        <p className="text-xs text-[#39B2B2]">Frontline Financial Asset Solutions</p>
                        <span className="mt-1 inline-block rounded-full border border-[#00FCB8] px-2 py-0.5 text-xs text-[#00FCB8]">🏆 Award Winner FY25</span>
                      </div>
                    </button>
                  </div>
                  {errors.teamMember && <p className="mt-1 text-sm text-red-600">{errors.teamMember}</p>}
                </div>

                {/* Name row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1C5472]">First Name *</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-[#1C5472] focus:border-[#00FCB8] focus:outline-none focus:ring-1 focus:ring-[#00FCB8]"
                      placeholder="First name"
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1C5472]">Last Name *</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-[#1C5472] focus:border-[#00FCB8] focus:outline-none focus:ring-1 focus:ring-[#00FCB8]"
                      placeholder="Last name"
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1C5472]">Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-[#1C5472] focus:border-[#00FCB8] focus:outline-none focus:ring-1 focus:ring-[#00FCB8]"
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1C5472]">Phone Number *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-[#1C5472] focus:border-[#00FCB8] focus:outline-none focus:ring-1 focus:ring-[#00FCB8]"
                    placeholder="04XX XXX XXX"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>

                {/* Services — only show when team selected */}
                {teamMember && (
                  <div>
                    <label className="block text-sm font-medium text-[#1C5472]">What can we help you with?</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {serviceOptions.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleService(s)}
                          className={`rounded-full px-4 py-2 text-sm transition ${
                            services.includes(s)
                              ? "border border-[#00FCB8] bg-[#00FCB8] font-bold text-[#0A1628]"
                              : "border border-[#1C5472] bg-white text-[#1C5472]"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    {errors.services && <p className="mt-1 text-sm text-red-600">{errors.services}</p>}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-[#1C5472]">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-[#1C5472] focus:border-[#00FCB8] focus:outline-none focus:ring-1 focus:ring-[#00FCB8]"
                    placeholder="Tell us about your situation and what you're hoping to achieve. The more detail the better — it helps us prepare before we reach out."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1C5472]">How would you prefer we contact you?</label>
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPreferredContact("email")}
                      className={`rounded-full px-4 py-2 text-sm transition ${
                        preferredContact === "email"
                          ? "bg-[#00FCB8] font-medium text-[#0A1628]"
                          : "border border-[#1C5472] bg-white text-[#1C5472]"
                      }`}
                    >
                      📧 Email
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreferredContact("phone")}
                      className={`rounded-full px-4 py-2 text-sm transition ${
                        preferredContact === "phone"
                          ? "bg-[#00FCB8] font-medium text-[#0A1628]"
                          : "border border-[#1C5472] bg-white text-[#1C5472]"
                      }`}
                    >
                      📞 Phone call
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <FormConsent
                    entity={contactEntity}
                    value={consent}
                    onChange={(v) => { setConsent(v); setShowConsentError(false); setSubmitError(null); }}
                    showError={showConsentError}
                  />
                </div>

                {submitError && submitError !== CONSENT_ERROR && <p className="text-sm text-red-600">{submitError}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00FCB8] py-4 text-lg font-bold text-[#0A1628] transition hover:scale-105 hover:shadow-lg disabled:opacity-70"
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
                    "Send Message →"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT — INFO PANEL (sticky) */}
          <div className="lg:order-2 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl bg-[#1C5472] p-6 mb-6">
              <OfficeIcon className="h-8 w-8 text-[#00FCB8]" />
              <h3 className="mt-2 font-bold text-white">Visit us in Parramatta</h3>
              <p className="mt-2 text-sm text-[#39B2B2]">
                Come in for a free, no-obligation consultation. No appointment needed — though booking ahead means we can prepare for your specific situation.
              </p>
              <ul className="mt-4 space-y-1 text-sm text-white">
                <li>📍 150 George Street, Parramatta NSW 2150</li>
                <li>🕐 Monday – Friday: 9:00am – 5:00pm</li>
                <li>📞 +61 422 959 486</li>
              </ul>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex rounded-lg border-2 border-[#00FCB8] px-4 py-2 text-sm font-medium text-[#00FCB8] transition hover:bg-[#00FCB8]/10"
              >
                Get Directions →
              </a>
            </div>
            <div className="rounded-2xl bg-[#39B2B2] p-6 mb-6">
              <ClockIcon className="h-8 w-8 text-white" />
              <h3 className="mt-2 font-bold text-white">We get back to you fast.</h3>
              <p className="mt-2 text-sm text-white">
                Send a message and you&apos;ll hear back within one business day — usually the same day.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow">
              <div className="flex items-center gap-2">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                <span className="font-medium text-[#1C5472]">Google Reviews</span>
              </div>
              <div className="mt-2 flex text-amber-400" aria-hidden>★★★★★</div>
              <p className="font-bold text-[#1C5472]">5/5 · 44+ Reviews</p>
              <p className="mt-2 text-sm italic text-[#1C5472]">
                &ldquo;The team at Frontline Financial are extraordinary at what they do.&rdquo; — Oliver S.
              </p>
            </div>
          </div>
        </div>
      </section>

      <LayoutFooter />
    </div>
  );
}
