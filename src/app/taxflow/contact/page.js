"use client";

import { useState } from "react";
import Link from "next/link";
import BrandSwitcherBar from "@/components/BrandSwitcherBar";
import TaxFlowAppFooter from "@/components/taxflow/TaxFlowAppFooter";

const TAXFLOW_SIGNIN_URL = "https://taxflowai.frontline.financial/login";
const TAXFLOW_PHONE = "0406 909 862";
const TAXFLOW_PHONE_LINK = "tel:+61406909862";
const TAXFLOW_EMAIL = "taxflowai@frontline.financial";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sectionContainer = "mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16 lg:px-8";

export default function TaxFlowContactPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const validate = () => {
    const e = {};
    if (!firstName.trim()) e.firstName = "First name is required.";
    if (!lastName.trim()) e.lastName = "Last name is required.";
    if (!email.trim()) e.email = "Email is required.";
    else if (!EMAIL_REGEX.test(email)) e.email = "Please enter a valid email address.";
    if (!phone.trim()) e.phone = "Phone is required.";
    if (!message.trim()) e.message = "Please tell us how we can help.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setSubmitError(null);
    if (!validate()) return;
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
          message: message.trim(),
          teamMember: "taxflow",
          services: ["TaxFlowAI consultation"],
          preferredContact: "email",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success !== false) {
        setSubmitSuccess(true);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setSubmitError(data.error || "Something went wrong. Please try again or call us on " + TAXFLOW_PHONE + ".");
      }
    } catch {
      setSubmitError("Something went wrong. Please try again or call us on " + TAXFLOW_PHONE + ".");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1628] font-sans text-white">
      <header className="sticky top-0 z-50 w-full">
        <BrandSwitcherBar />
        <div className="border-b border-white/[0.08] bg-[#0A1628]">
          <div className={sectionContainer}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link href="/taxflow" className="text-lg font-extrabold md:text-xl">
                <span className="text-white">TaxFlow</span>
                <span className="text-[#00FCB8]">AI</span>
              </Link>
              <nav className="flex items-center gap-4 md:gap-6">
                <Link href="/taxflow#features" className="hidden text-sm font-medium text-white/80 transition hover:text-[#00FCB8] sm:inline-block">Features</Link>
                <Link href="/taxflow#pricing" className="hidden text-sm font-medium text-white/80 transition hover:text-[#00FCB8] sm:inline-block">Pricing</Link>
                <a href={TAXFLOW_SIGNIN_URL} className="rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10">Sign In</a>
                <a href={TAXFLOW_SIGNIN_URL} className="rounded-lg bg-[#00FCB8] px-4 py-2.5 text-sm font-bold text-[#0A1628] transition hover:opacity-95">Get started</a>
              </nav>
            </div>
          </div>
          <p className="border-t border-white/[0.06] bg-[#060D1A] py-1.5 text-center text-[11px] text-white/50">
            Tax services supervised by E&A Advisory Pty Ltd · Registered Tax Agent
          </p>
        </div>
      </header>

      <main className={sectionContainer}>
        <div className="mx-auto max-w-3xl">
          <h1 className="border-l-4 border-[#00FCB8] pl-4 text-3xl font-bold text-white md:text-4xl">
            Book a consultation
          </h1>
          <p className="mt-4 text-lg text-[#94a3b8]">
            Speak with the team about your tax needs. We&apos;ll get back to you quickly.
          </p>

          {submitSuccess ? (
            <div className="mt-10 rounded-xl border border-[#00FCB8]/30 bg-[#00FCB8]/10 p-6 text-center">
              <p className="font-medium text-[#00FCB8]">Thanks for getting in touch.</p>
              <p className="mt-2 text-sm text-[#94a3b8]">We&apos;ll respond to your enquiry shortly. You can also call us on <a href={TAXFLOW_PHONE_LINK} className="text-[#00FCB8] hover:underline">{TAXFLOW_PHONE}</a>.</p>
            </div>
          ) : (
            <>
              <div className="mt-10 flex flex-wrap gap-6">
                <a
                  href={TAXFLOW_PHONE_LINK}
                  className="inline-flex items-center gap-3 rounded-xl border border-white/20 bg-[#111827] px-6 py-4 text-white transition hover:border-[#00FCB8]/50 hover:bg-[#111827]/90"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00FCB8]/20 text-[#00FCB8]">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <div className="text-left">
                    <span className="block text-xs font-medium uppercase tracking-wider text-[#94a3b8]">Call us</span>
                    <span className="font-bold text-white">{TAXFLOW_PHONE}</span>
                  </div>
                </a>
                <a
                  href={`mailto:${TAXFLOW_EMAIL}`}
                  className="inline-flex items-center gap-3 rounded-xl border border-white/20 bg-[#111827] px-6 py-4 text-white transition hover:border-[#00FCB8]/50 hover:bg-[#111827]/90"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00FCB8]/20 text-[#00FCB8]">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <div className="text-left">
                    <span className="block text-xs font-medium uppercase tracking-wider text-[#94a3b8]">Email</span>
                    <span className="font-bold text-white">{TAXFLOW_EMAIL}</span>
                  </div>
                </a>
              </div>

              <form onSubmit={handleSubmit} className="mt-12 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="tf-first" className="block text-sm font-medium text-white/90">First name</label>
                    <input
                      id="tf-first"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="mt-1.5 w-full rounded-lg border border-white/20 bg-[#111827] px-4 py-3 text-white placeholder:text-white/40 focus:border-[#00FCB8] focus:outline-none focus:ring-1 focus:ring-[#00FCB8]"
                      placeholder="First name"
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="tf-last" className="block text-sm font-medium text-white/90">Last name</label>
                    <input
                      id="tf-last"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="mt-1.5 w-full rounded-lg border border-white/20 bg-[#111827] px-4 py-3 text-white placeholder:text-white/40 focus:border-[#00FCB8] focus:outline-none focus:ring-1 focus:ring-[#00FCB8]"
                      placeholder="Last name"
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="tf-email" className="block text-sm font-medium text-white/90">Email</label>
                  <input
                    id="tf-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-white/20 bg-[#111827] px-4 py-3 text-white placeholder:text-white/40 focus:border-[#00FCB8] focus:outline-none focus:ring-1 focus:ring-[#00FCB8]"
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="tf-phone" className="block text-sm font-medium text-white/90">Phone</label>
                  <input
                    id="tf-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-white/20 bg-[#111827] px-4 py-3 text-white placeholder:text-white/40 focus:border-[#00FCB8] focus:outline-none focus:ring-1 focus:ring-[#00FCB8]"
                    placeholder="0400 000 000"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="tf-message" className="block text-sm font-medium text-white/90">How can we help?</label>
                  <textarea
                    id="tf-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-white/20 bg-[#111827] px-4 py-3 text-white placeholder:text-white/40 focus:border-[#00FCB8] focus:outline-none focus:ring-1 focus:ring-[#00FCB8]"
                    placeholder="Tell us about your tax or accounting needs..."
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
                </div>
                {submitError && <p className="text-sm text-red-400">{submitError}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-lg bg-[#00FCB8] py-4 font-bold text-[#0A1628] transition hover:opacity-95 disabled:opacity-60 sm:w-auto sm:px-10"
                >
                  {submitting ? "Sending…" : "Send enquiry"}
                </button>
              </form>
            </>
          )}

          <p className="mt-10 text-sm text-white/50">
            Tax and accounting services provided by E&A Advisory Pty Ltd (Registered Tax Agent). TaxFlowAI is the technology platform.
          </p>
        </div>
      </main>

      <TaxFlowAppFooter />
    </div>
  );
}
