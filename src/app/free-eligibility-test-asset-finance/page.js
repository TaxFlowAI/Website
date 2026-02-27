"use client";

import { useState } from "react";
import Link from "next/link";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import WaveDivider from "@/components/WaveDivider";
import FormConsent, { CONSENT_ERROR } from "@/components/FormConsent";
import { ENTITY } from "@/config/entities";

const LOAN_TYPES = ["Car loan", "Personal loan", "Equipment finance", "Other"];
const EMPLOYMENT = ["PAYG", "Self-employed", "Other"];

export default function FreeEligibilityTestAssetFinancePage() {
  const [submitted, setSubmitted] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    loanType: "",
    amount: "",
    employment: "",
    message: "",
  });
  const [consent, setConsent] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!consent) {
      setConsentError(true);
      return;
    }
    setConsentError(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F5EF] font-sans">
      <LayoutNav activeNav="calculators" />

      <section className="bg-[#1C5472] px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">Asset &amp; personal finance</p>
          <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">Free Eligibility Check</h1>
          <p className="mt-4 text-[#39B2B2]">
            Get a FREE eligibility check — no obligation. Sham will be in touch within 24 hours.
          </p>
        </div>
      </section>

      <WaveDivider fill="#F5F5EF" />

      <section className="px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-xl">
          {submitted ? (
            <div className="rounded-2xl border-2 border-[#00FCB8] bg-[#00FCB8]/10 p-8 text-center">
              <p className="text-2xl font-bold text-[#1C5472]">Thanks!</p>
              <p className="mt-2 text-[#1C5472]">Sham will be in touch within 24 hours.</p>
              <Link href="/financial-calculators" className="mt-6 inline-block font-medium text-[#00FCB8] hover:underline">Back to calculators</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-[#39B2B2]/40 bg-white p-6 shadow-lg md:p-8">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#1C5472]">Full name *</label>
                <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="mt-1 w-full rounded-lg border border-[#39B2B2]/50 px-3 py-2 text-[#1C5472]" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#1C5472]">Email *</label>
                <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="mt-1 w-full rounded-lg border border-[#39B2B2]/50 px-3 py-2 text-[#1C5472]" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#1C5472]">Phone *</label>
                <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} className="mt-1 w-full rounded-lg border border-[#39B2B2]/50 px-3 py-2 text-[#1C5472]" />
              </div>
              <div>
                <label htmlFor="loanType" className="block text-sm font-medium text-[#1C5472]">Loan type *</label>
                <select id="loanType" name="loanType" required value={formData.loanType} onChange={handleChange} className="mt-1 w-full rounded-lg border border-[#39B2B2]/50 px-3 py-2 text-[#1C5472]">
                  <option value="">Select...</option>
                  {LOAN_TYPES.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-[#1C5472]">Approximate amount needed ($)</label>
                <input id="amount" name="amount" type="text" inputMode="numeric" placeholder="e.g. 35000" value={formData.amount} onChange={handleChange} className="mt-1 w-full rounded-lg border border-[#39B2B2]/50 px-3 py-2 text-[#1C5472]" />
              </div>
              <div>
                <label htmlFor="employment" className="block text-sm font-medium text-[#1C5472]">Employment status *</label>
                <select id="employment" name="employment" required value={formData.employment} onChange={handleChange} className="mt-1 w-full rounded-lg border border-[#39B2B2]/50 px-3 py-2 text-[#1C5472]">
                  <option value="">Select...</option>
                  {EMPLOYMENT.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#1C5472]">Message (optional)</label>
                <textarea id="message" name="message" rows={3} value={formData.message} onChange={handleChange} className="mt-1 w-full rounded-lg border border-[#39B2B2]/50 px-3 py-2 text-[#1C5472]" />
              </div>
              <div>
                <FormConsent
                  entity={ENTITY.ASSET_SOLUTIONS}
                  value={consent}
                  onChange={(v) => { setConsent(v); setConsentError(false); }}
                  showError={consentError}
                />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button type="submit" className="rounded-lg bg-[#00FCB8] px-6 py-3 font-bold text-[#1C5472] transition hover:opacity-90">Submit</button>
                <a href="tel:+61450553877" className="rounded-lg border-2 border-[#1C5472] px-6 py-3 text-center font-bold text-[#1C5472] transition hover:bg-[#1C5472]/5">Call Sham: 0450 553 877</a>
              </div>
            </form>
          )}
        </div>
      </section>

      <WaveDivider fill="#1C5472" />
      <LayoutFooter />
    </div>
  );
}
