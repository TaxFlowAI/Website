"use client";

import { useState } from "react";
import Link from "next/link";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import WaveDivider from "@/components/WaveDivider";

const LOAN_TYPES = ["Home loan", "Car loan", "Refinance", "Other"];
const EMPLOYMENT = ["PAYG", "Self-employed", "Other"];

export default function FreeEligibilityTestPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    loanType: "",
    loanAmount: "",
    employment: "",
    message: "",
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire to API / email notification to Hassan/Sham
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F5EF] font-sans">
      <LayoutNav activeNav="calculators" />

      <section className="bg-[#1C5472] px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">Free assessment</p>
          <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">Free Eligibility Test</h1>
          <p className="mt-4 text-[#39B2B2]">
            See what you qualify for — no obligation, no credit check impact. Our team will review your situation and get back to you.
          </p>
        </div>
      </section>

      <WaveDivider fill="#F5F5EF" />

      <section className="px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-xl">
          {submitted ? (
            <div className="rounded-2xl border-2 border-[#00FCB8] bg-[#00FCB8]/10 p-8 text-center">
              <p className="text-2xl font-bold text-[#1C5472]">Thanks!</p>
              <p className="mt-2 text-[#1C5472]">Our team will be in touch within 24 hours.</p>
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
                <label htmlFor="loanType" className="block text-sm font-medium text-[#1C5472]">Loan type interest *</label>
                <select id="loanType" name="loanType" required value={formData.loanType} onChange={handleChange} className="mt-1 w-full rounded-lg border border-[#39B2B2]/50 px-3 py-2 text-[#1C5472]">
                  <option value="">Select...</option>
                  {LOAN_TYPES.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="loanAmount" className="block text-sm font-medium text-[#1C5472]">Approximate loan amount ($)</label>
                <input id="loanAmount" name="loanAmount" type="text" inputMode="numeric" placeholder="e.g. 500000" value={formData.loanAmount} onChange={handleChange} className="mt-1 w-full rounded-lg border border-[#39B2B2]/50 px-3 py-2 text-[#1C5472]" />
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
                <label className="flex items-start gap-3">
                  <input type="checkbox" name="consent" required checked={formData.consent} onChange={handleChange} className="mt-1 h-4 w-4 rounded border-[#39B2B2] text-[#00FCB8]" />
                  <span className="text-sm text-[#1C5472]">I consent to Frontline Financial Group contacting me regarding my enquiry. <Link href="/privacy" className="text-[#00FCB8] hover:underline">Privacy Policy</Link></span>
                </label>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button type="submit" className="rounded-lg bg-[#00FCB8] px-6 py-3 font-bold text-[#1C5472] transition hover:opacity-90">Submit</button>
                <a href="tel:+61422959486" className="rounded-lg border-2 border-[#1C5472] px-6 py-3 text-center font-bold text-[#1C5472] transition hover:bg-[#1C5472]/5">Call Sham: +61 422 959 486</a>
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
