"use client";

import { useState } from "react";

const TAXFLOW_PHONE = "0406 909 862";
const TAXFLOW_PHONE_LINK = "tel:+61406909862";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full rounded-lg border bg-transparent px-3.5 py-2.5 text-[14px] text-white placeholder-[#64748B] outline-none transition focus:border-[#00FCB8]";
const inputStyle = { borderColor: "rgba(255,255,255,0.16)", background: "#0F1729" };

export default function ContactForm() {
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

  if (submitSuccess) {
    return (
      <div
        className="rounded-xl border p-6 text-center"
        style={{ borderColor: "rgba(0,252,184,0.3)", background: "rgba(0,252,184,0.08)" }}
      >
        <p className="font-bold" style={{ color: "#00FCB8" }}>Thanks for getting in touch.</p>
        <p className="mt-2 text-sm" style={{ color: "#94A3B8" }}>
          We&apos;ll respond to your enquiry shortly. You can also call us on{" "}
          <a href={TAXFLOW_PHONE_LINK} className="tc-link">{TAXFLOW_PHONE}</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="tf-first" className="mb-1.5 block text-[13px] font-medium text-white/85">First name</label>
          <input id="tf-first" className={inputClass} style={inputStyle} value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" />
          {errors.firstName && <p className="mt-1 text-[12px]" style={{ color: "#EF4444" }}>{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="tf-last" className="mb-1.5 block text-[13px] font-medium text-white/85">Last name</label>
          <input id="tf-last" className={inputClass} style={inputStyle} value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="family-name" />
          {errors.lastName && <p className="mt-1 text-[12px]" style={{ color: "#EF4444" }}>{errors.lastName}</p>}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="tf-email" className="mb-1.5 block text-[13px] font-medium text-white/85">Email</label>
          <input id="tf-email" type="email" className={inputClass} style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          {errors.email && <p className="mt-1 text-[12px]" style={{ color: "#EF4444" }}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="tf-phone" className="mb-1.5 block text-[13px] font-medium text-white/85">Phone</label>
          <input id="tf-phone" type="tel" className={inputClass} style={inputStyle} value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
          {errors.phone && <p className="mt-1 text-[12px]" style={{ color: "#EF4444" }}>{errors.phone}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="tf-msg" className="mb-1.5 block text-[13px] font-medium text-white/85">How can we help?</label>
        <textarea id="tf-msg" rows={4} className={inputClass} style={inputStyle} value={message} onChange={(e) => setMessage(e.target.value)} />
        {errors.message && <p className="mt-1 text-[12px]" style={{ color: "#EF4444" }}>{errors.message}</p>}
      </div>
      {submitError && (
        <p className="rounded-lg border p-3 text-[13px]" style={{ borderColor: "rgba(239,68,68,0.4)", background: "rgba(239,68,68,0.1)", color: "#FCA5A5" }}>
          {submitError}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="tc-btn-primary rounded-lg px-7 py-3 text-[15px] font-bold disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
