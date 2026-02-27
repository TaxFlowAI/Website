"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import FormConsent from "@/components/FormConsent";
import { ENTITY } from "@/config/entities";

const STEPS = [
  { id: 1, title: "Loan requirements", short: "Loan" },
  { id: 2, title: "Applicant details", short: "Applicants" },
  { id: 3, title: "Employment & income", short: "Income" },
  { id: 4, title: "Assets", short: "Assets" },
  { id: 5, title: "Liabilities", short: "Liabilities" },
];

const PURPOSE_OPTIONS = [
  "Purchase (owner-occupied)",
  "Purchase (investment)",
  "Refinance",
  "Construction",
  "Renovation",
  "Debt consolidation",
  "Equity release",
];

const LOAN_TYPE_OPTIONS = ["Variable", "Fixed", "Split"];
const REPAYMENT_OPTIONS = ["Principal & interest", "Interest only"];
const RESIDENCY_OPTIONS = ["Australian citizen", "Permanent resident", "Visa holder"];
const RESIDENTIAL_STATUS_OPTIONS = ["Own", "Rent", "Boarding", "Living with parents"];
const EMPLOYMENT_STATUS_OPTIONS = [
  "PAYG full-time",
  "PAYG part-time",
  "Casual",
  "Self-employed",
  "Contractor",
  "Not employed",
];

const defaultApplicant = () => ({
  maritalStatus: "",
  numberOfDependants: "",
  dependantAges: "",
  residencyStatus: "",
  visaTypeExpiry: "",
  currentAddress: "",
  timeAtAddress: "",
  residentialStatus: "",
  previousAddress: "",
  relationshipToOther: "",
  employmentStatus: "",
  employerName: "",
  roleTitle: "",
  startDate: "",
  probationStatus: "",
  previousEmployer: "",
  baseSalaryCents: "",
  overtimeCents: "",
  bonusesCents: "",
  commissionCents: "",
  allowancesCents: "",
  abn: "",
  businessName: "",
  yearsTrading: "",
  businessStructure: "",
  lastTwoYearsProfit: "",
  otherIncomeCents: "",
  otherIncomeDetail: "",
});

function toCents(val) {
  if (val === "" || val == null) return null;
  const n = parseInt(String(val).replace(/[^0-9]/g, ""), 10);
  return isNaN(n) ? null : n;
}

export default function FactFindWizard({ contact = {} }) {
  const [step, setStep] = useState(1);
  const [draftId, setDraftId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);
  const [showConsentError, setShowConsentError] = useState(false);
  const [twoApplicants, setTwoApplicants] = useState(false);
  const [applicant2SameAs1, setApplicant2SameAs1] = useState(false);
  const [data, setData] = useState({
    // Step 1
    purpose: "",
    propertyAddress: "",
    suburbArea: "",
    estimatedPriceCents: "",
    depositAmountCents: "",
    depositSource: "",
    loanAmountCents: "",
    lvr: "",
    loanType: "",
    repaymentType: "",
    interestOnlyReason: "",
    loanTermYears: "30",
    // Applicants (step 2 + 3)
    applicants: [defaultApplicant(), defaultApplicant()],
    // Step 4 – assets (simplified as single list)
    assets: [],
    // Step 5 – liabilities
    liabilities: [],
  });

  const hasContact = contact.firstName || contact.email;
  const applicant1 = data.applicants[0] || defaultApplicant();
  const applicant2 = data.applicants[1] || defaultApplicant();

  const update = useCallback((path, value) => {
    setData((prev) => {
      const next = { ...prev };
      if (path === "applicants") {
        next.applicants = value;
        return next;
      }
      if (path.startsWith("applicants.0.")) {
        const key = path.replace("applicants.0.", "");
        next.applicants = [...(prev.applicants || [defaultApplicant(), defaultApplicant()])];
        next.applicants[0] = { ...next.applicants[0], [key]: value };
        return next;
      }
      if (path.startsWith("applicants.1.")) {
        const key = path.replace("applicants.1.", "");
        next.applicants = [...(prev.applicants || [defaultApplicant(), defaultApplicant()])];
        next.applicants[1] = { ...next.applicants[1], [key]: value };
        return next;
      }
      next[path] = value;
      return next;
    });
  }, []);

  const saveDraft = useCallback(async () => {
    setSaving(true);
    try {
      const payload = {
        ...data,
        contactFirstName: contact.firstName,
        contactLastName: contact.lastName,
        contactEmail: contact.email,
        contactPhone: contact.phone,
        id: draftId,
      };
      const res = await fetch("/api/accountant/loan-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.id) setDraftId(result.id);
    } catch (e) {
      console.error("Draft save failed", e);
    } finally {
      setSaving(false);
    }
  }, [data, draftId, contact]);

  useEffect(() => {
    const t = setTimeout(saveDraft, 1500);
    return () => clearTimeout(t);
  }, [data, saveDraft]);

  const goNext = () => {
    if (step < 5) setStep(step + 1);
  };
  const goPrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!consent) {
      setShowConsentError(true);
      return;
    }
    setShowConsentError(false);
    setSaving(true);
    try {
      await saveDraft();
      setSubmitted(true);
    } finally {
      setSaving(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0A1628] font-sans text-white">
        <LayoutNav activeNav="calculators" />
        <section className="px-4 py-20 md:px-6 md:py-28 lg:px-8">
          <div className="mx-auto max-w-xl rounded-2xl border border-[#00FCB8]/30 bg-[#1C5472] p-8 text-center">
            <h1 className="text-2xl font-bold text-[#00FCB8] md:text-3xl">You&apos;re all set.</h1>
            <p className="mt-3 text-white/90">
              We&apos;ve saved your details. A member of our team will be in touch to discuss your home loan — no obligation, no cost to you.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/" className="rounded-lg bg-[#00FCB8] px-6 py-3 font-bold text-[#0A1628] transition hover:opacity-90">Back to Home</Link>
              <a href="tel:+61422959486" className="rounded-lg border-2 border-[#00FCB8] px-6 py-3 font-bold text-[#00FCB8] transition hover:bg-[#00FCB8]/10">Call us</a>
            </div>
          </div>
        </section>
        <LayoutFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1628] font-sans text-white">
      <LayoutNav activeNav="calculators" />
      <section className="border-b border-white/10 bg-[#1C5472] px-4 py-8 md:px-6 md:py-10 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">Home loans</p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">Complete your home loan fact find</h1>
          <p className="mt-2 text-white/90">
            This helps us understand your situation so we can find the right loan for you. No credit check — just the details we need. You can save and come back anytime.
          </p>
          {hasContact && (
            <p className="mt-4 rounded-lg bg-[#00FCB8]/20 px-4 py-2 text-sm font-medium text-[#00FCB8]">
              Completing for {contact.firstName || "you"}
              {contact.email && ` · ${contact.email}`}
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-2">
            {STEPS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStep(s.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  step === s.id ? "bg-[#00FCB8] text-[#0A1628]" : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                {s.short}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:px-6 md:py-14 lg:px-8">
        <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
          {step === 1 && (
            <div className="space-y-6 rounded-2xl border border-white/10 bg-[#111827] p-6 md:p-8">
              <h2 className="text-xl font-bold text-[#00FCB8]">Step 1 — Loan requirements</h2>
              <p className="text-sm text-white/70">Tell us what you&apos;re looking for. We&apos;ll use this to match you with the right options.</p>
              <div>
                <label className="block text-sm font-medium text-white/90">Purpose *</label>
                <select value={data.purpose} onChange={(e) => update("purpose", e.target.value)} required className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white" id="purpose">
                  <option value="">Select...</option>
                  {PURPOSE_OPTIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90">Property address or suburb/area</label>
                <input type="text" value={data.propertyAddress || data.suburbArea} onChange={(e) => { update("propertyAddress", e.target.value); update("suburbArea", e.target.value); }} placeholder="e.g. Sydney CBD or 123 Main St" className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white placeholder-white/40" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-white/90">Estimated purchase price / property value ($)</label>
                  <input type="text" inputMode="numeric" value={data.estimatedPriceCents ? (Number(data.estimatedPriceCents) / 100).toLocaleString() : ""} onChange={(e) => update("estimatedPriceCents", toCents(e.target.value) ?? "")} placeholder="e.g. 800000" className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white placeholder-white/40" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90">Loan amount requested ($)</label>
                  <input type="text" inputMode="numeric" value={data.loanAmountCents ? (Number(data.loanAmountCents) / 100).toLocaleString() : ""} onChange={(e) => update("loanAmountCents", toCents(e.target.value) ?? "")} placeholder="e.g. 500000" required className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white placeholder-white/40" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-white/90">Deposit amount ($)</label>
                  <input type="text" inputMode="numeric" value={data.depositAmountCents ? (Number(data.depositAmountCents) / 100).toLocaleString() : ""} onChange={(e) => update("depositAmountCents", toCents(e.target.value) ?? "")} placeholder="e.g. 100000" className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white placeholder-white/40" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90">Deposit source</label>
                  <input type="text" value={data.depositSource} onChange={(e) => update("depositSource", e.target.value)} placeholder="e.g. savings, equity, gift" className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white placeholder-white/40" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-white/90">LVR (%) — we&apos;ll flag if &gt;80%</label>
                  <input type="text" inputMode="numeric" value={data.lvr} onChange={(e) => update("lvr", e.target.value)} placeholder="e.g. 80" className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white placeholder-white/40" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90">Loan type</label>
                  <select value={data.loanType} onChange={(e) => update("loanType", e.target.value)} className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white" id="loanType">
                    <option value="">Select...</option>
                    {LOAN_TYPE_OPTIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90">Repayment type</label>
                  <select value={data.repaymentType} onChange={(e) => update("repaymentType", e.target.value)} className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white" id="repaymentType">
                    <option value="">Select...</option>
                    {REPAYMENT_OPTIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </div>
              {data.repaymentType === "Interest only" && (
                <div>
                  <label className="block text-sm font-medium text-white/90">Reason for interest only (if any)</label>
                  <input type="text" value={data.interestOnlyReason} onChange={(e) => update("interestOnlyReason", e.target.value)} className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white placeholder-white/40" />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-white/90">Loan term (years)</label>
                <input type="text" inputMode="numeric" value={data.loanTermYears} onChange={(e) => update("loanTermYears", e.target.value)} placeholder="30" className="mt-1 w-full max-w-[120px] rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 rounded-2xl border border-white/10 bg-[#111827] p-6 md:p-8">
              <h2 className="text-xl font-bold text-[#00FCB8]">Step 2 — Applicant details</h2>
              <p className="text-sm text-white/70">Who&apos;s applying? Add a second applicant if it&apos;s a joint application.</p>
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={twoApplicants} onChange={(e) => setTwoApplicants(e.target.checked)} className="h-4 w-4 rounded border-white/30 text-[#00FCB8]" />
                <span className="text-sm text-white/90">Two applicants (e.g. joint application)</span>
              </label>
              <div className="space-y-6">
                <h3 className="font-medium text-white">Applicant 1</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm text-white/80">Marital status</label>
                    <input type="text" value={applicant1.maritalStatus} onChange={(e) => update("applicants.0.maritalStatus", e.target.value)} placeholder="e.g. Single, Married" className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white placeholder-white/40" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/80">Number of dependants</label>
                    <input type="text" inputMode="numeric" value={applicant1.numberOfDependants} onChange={(e) => update("applicants.0.numberOfDependants", e.target.value)} placeholder="0" className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white placeholder-white/40" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-white/80">Dependant ages (if any)</label>
                  <input type="text" value={applicant1.dependantAges} onChange={(e) => update("applicants.0.dependantAges", e.target.value)} placeholder="e.g. 5, 8" className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white placeholder-white/40" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm text-white/80">Residency status</label>
                    <select value={applicant1.residencyStatus} onChange={(e) => update("applicants.0.residencyStatus", e.target.value)} className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white">
                      <option value="">Select...</option>
                      {RESIDENCY_OPTIONS.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  {applicant1.residencyStatus === "Visa holder" && (
                    <div>
                      <label className="block text-sm text-white/80">Visa type / expiry</label>
                      <input type="text" value={applicant1.visaTypeExpiry} onChange={(e) => update("applicants.0.visaTypeExpiry", e.target.value)} className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white placeholder-white/40" />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-white/80">Current address</label>
                  <input type="text" value={applicant1.currentAddress} onChange={(e) => update("applicants.0.currentAddress", e.target.value)} className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white placeholder-white/40" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm text-white/80">Time at address</label>
                    <input type="text" value={applicant1.timeAtAddress} onChange={(e) => update("applicants.0.timeAtAddress", e.target.value)} placeholder="e.g. 2 years" className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white placeholder-white/40" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/80">Residential status</label>
                    <select value={applicant1.residentialStatus} onChange={(e) => update("applicants.0.residentialStatus", e.target.value)} className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white">
                      <option value="">Select...</option>
                      {RESIDENTIAL_STATUS_OPTIONS.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-white/80">Previous address (if &lt;3 years at current)</label>
                  <input type="text" value={applicant1.previousAddress} onChange={(e) => update("applicants.0.previousAddress", e.target.value)} className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white placeholder-white/40" />
                </div>
              </div>
              {twoApplicants && (
                <div className="space-y-4 border-t border-white/10 pt-8">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={applicant2SameAs1}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setApplicant2SameAs1(checked);
                        if (checked) {
                          setData((prev) => ({
                            ...prev,
                            applicants: [prev.applicants[0], { ...prev.applicants[0], relationshipToOther: applicant2.relationshipToOther || "Co-borrower" }],
                          }));
                        }
                      }}
                      className="h-4 w-4 rounded border-white/30 text-[#00FCB8]"
                    />
                    <span className="text-sm text-white/90">Applicant 2 — same as Applicant 1 (address, etc.)</span>
                  </label>
                  {!applicant2SameAs1 && (
                    <>
                      <h3 className="font-medium text-white">Applicant 2</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-sm text-white/80">Relationship to Applicant 1</label>
                          <input type="text" value={applicant2.relationshipToOther} onChange={(e) => update("applicants.1.relationshipToOther", e.target.value)} placeholder="e.g. Spouse, Co-borrower" className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white placeholder-white/40" />
                        </div>
                        <div>
                          <label className="block text-sm text-white/80">Marital status</label>
                          <input type="text" value={applicant2.maritalStatus} onChange={(e) => update("applicants.1.maritalStatus", e.target.value)} className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white placeholder-white/40" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-white/80">Current address</label>
                        <input type="text" value={applicant2.currentAddress} onChange={(e) => update("applicants.1.currentAddress", e.target.value)} className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white placeholder-white/40" />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-sm text-white/80">Time at address</label>
                          <input type="text" value={applicant2.timeAtAddress} onChange={(e) => update("applicants.1.timeAtAddress", e.target.value)} className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white placeholder-white/40" />
                        </div>
                        <div>
                          <label className="block text-sm text-white/80">Residential status</label>
                          <select value={applicant2.residentialStatus} onChange={(e) => update("applicants.1.residentialStatus", e.target.value)} className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white">
                            <option value="">Select...</option>
                            {RESIDENTIAL_STATUS_OPTIONS.map((o) => (
                              <option key={o} value={o}>{o}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 rounded-2xl border border-white/10 bg-[#111827] p-6 md:p-8">
              <h2 className="text-xl font-bold text-[#00FCB8]">Step 3 — Employment & income</h2>
              <p className="text-sm text-white/70">We need this for both applicants. Income figures: annual, gross.</p>
              {[0, 1].map((i) => (!twoApplicants && i === 1 ? null : (
                <div key={i} className="space-y-4 border border-white/10 rounded-xl p-4">
                  <h3 className="font-medium text-[#00FCB8]">Applicant {i + 1}</h3>
                  <div>
                    <label className="block text-sm text-white/80">Employment status</label>
                    <select value={data.applicants[i]?.employmentStatus} onChange={(e) => update(`applicants.${i}.employmentStatus`, e.target.value)} className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white">
                      <option value="">Select...</option>
                      {EMPLOYMENT_STATUS_OPTIONS.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm text-white/80">Employer name</label>
                      <input type="text" value={data.applicants[i]?.employerName} onChange={(e) => update(`applicants.${i}.employerName`, e.target.value)} className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white placeholder-white/40" />
                    </div>
                    <div>
                      <label className="block text-sm text-white/80">Role / title</label>
                      <input type="text" value={data.applicants[i]?.roleTitle} onChange={(e) => update(`applicants.${i}.roleTitle`, e.target.value)} className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white placeholder-white/40" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm text-white/80">Start date</label>
                      <input type="text" value={data.applicants[i]?.startDate} onChange={(e) => update(`applicants.${i}.startDate`, e.target.value)} placeholder="e.g. Jan 2020" className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white placeholder-white/40" />
                    </div>
                    <div>
                      <label className="block text-sm text-white/80">Probation?</label>
                      <input type="text" value={data.applicants[i]?.probationStatus} onChange={(e) => update(`applicants.${i}.probationStatus`, e.target.value)} placeholder="Yes / No" className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white placeholder-white/40" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-white/80">Base salary (gross annual $)</label>
                    <input type="text" inputMode="numeric" value={data.applicants[i]?.baseSalaryCents ? (Number(data.applicants[i].baseSalaryCents) / 100).toLocaleString() : ""} onChange={(e) => update(`applicants.${i}.baseSalaryCents`, toCents(e.target.value) ?? "")} placeholder="e.g. 85000" className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white placeholder-white/40" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm text-white/80">Overtime / bonuses / commission ($ annual)</label>
                      <input type="text" inputMode="numeric" value={data.applicants[i]?.overtimeCents ? (Number(data.applicants[i].overtimeCents) / 100).toLocaleString() : ""} onChange={(e) => update(`applicants.${i}.overtimeCents`, toCents(e.target.value) ?? "")} placeholder="0" className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white placeholder-white/40" />
                    </div>
                    <div>
                      <label className="block text-sm text-white/80">Other income ($ annual)</label>
                      <input type="text" inputMode="numeric" value={data.applicants[i]?.otherIncomeCents ? (Number(data.applicants[i].otherIncomeCents) / 100).toLocaleString() : ""} onChange={(e) => update(`applicants.${i}.otherIncomeCents`, toCents(e.target.value) ?? "")} placeholder="e.g. rental, Centrelink" className="mt-1 w-full rounded-lg border border-white/20 bg-[#0A1628] px-3 py-2.5 text-white placeholder-white/40" />
                    </div>
                  </div>
                </div>
              )))}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 rounded-2xl border border-white/10 bg-[#111827] p-6 md:p-8">
              <h2 className="text-xl font-bold text-[#00FCB8]">Step 4 — Assets</h2>
              <p className="text-sm text-white/70">Property, savings, super, vehicles — anything you own that we should know about.</p>
              <div className="rounded-lg border border-dashed border-white/20 p-6 text-center text-white/60">
                <p>Asset details can be added here. For now, we&apos;ll capture the rest in our follow-up call.</p>
                <p className="mt-2 text-sm">You can list any property, savings, shares, super, or vehicles in the message when you submit.</p>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6 rounded-2xl border border-white/10 bg-[#111827] p-6 md:p-8">
              <h2 className="text-xl font-bold text-[#00FCB8]">Step 5 — Liabilities</h2>
              <p className="text-sm text-white/70">Existing loans, credit cards, HECS — so we can see the full picture.</p>
              <div className="rounded-lg border border-dashed border-white/20 p-6 text-center text-white/60">
                <p>Liabilities can be added here. We&apos;ll go through any existing loans, cards, and debts in our call.</p>
                <p className="mt-2 text-sm">If you have anything urgent (e.g. current mortgage balance), add a note in the final step.</p>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="mb-6 rounded-lg border border-white/20 bg-[#0A1628]/50 p-4">
              <FormConsent
                entity={ENTITY.BROKERS}
                value={consent}
                onChange={(v) => { setConsent(v); setShowConsentError(false); }}
                showError={showConsentError}
                theme="dark"
              />
            </div>
          )}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <button type="button" onClick={goPrev} disabled={step === 1} className="rounded-lg border border-white/30 px-5 py-2.5 font-medium text-white transition hover:bg-white/10 disabled:opacity-40">
              Back
            </button>
            {step < 5 ? (
              <button type="button" onClick={goNext} className="rounded-lg bg-[#00FCB8] px-6 py-2.5 font-bold text-[#0A1628] transition hover:opacity-90">
                Next step
              </button>
            ) : (
              <button type="submit" disabled={saving} className="rounded-lg bg-[#00FCB8] px-6 py-3 font-bold text-[#0A1628] transition hover:opacity-90 disabled:opacity-70">
                {saving ? "Saving…" : "Submit fact find"}
              </button>
            )}
          </div>
          {saving && <p className="mt-2 text-sm text-white/60">Draft saved automatically.</p>}
        </form>
      </section>
      <LayoutFooter />
    </div>
  );
}
