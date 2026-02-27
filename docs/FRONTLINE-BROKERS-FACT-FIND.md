# Frontline Financial Brokers — Fact Find Forms

This document describes the information and details collected by the **home loan fact find** used for Frontline Financial Brokers applications.

---

## Overview

- **Purpose:** Home loan eligibility / fact find (no credit check at this stage).
- **Where used:** `/free-eligibility-test-home-loans` (replaces the old “free eligibility test” with a multi-step fact find).
- **Component:** `src/components/fact-find/FactFindWizard.js`
- **Entity:** Frontline Financial Brokers (CRN 575968, ACL 389087). Consent and compliance use `ENTITY.BROKERS` from `src/config/entities.js`.
- **Draft storage:** Drafts are saved automatically (debounced) and on submit via `POST /api/accountant/loan-applications`. All monetary amounts are stored in **cents** (integer).

---

## Entry point and contact prefill

- **URL:** `/free-eligibility-test-home-loans`
- **Optional query params** (prefill contact; e.g. from thank-you or consultation):
  - `fn` — First name  
  - `ln` — Last name  
  - `em` — Email  
  - `ph` — Phone  

Example: `/free-eligibility-test-home-loans?fn=John&ln=Smith&em=john@example.com&ph=0412345678`

These are passed into the wizard as `contact` and:
- Shown as “Completing for {firstName} · {email}” when present.
- Sent with the payload as `contactFirstName`, `contactLastName`, `contactEmail`, `contactPhone`.

---

## Steps and fields

The wizard has **5 steps**. Below are the fields and options used in the form and payload.

---

### Step 1 — Loan requirements

| Field | Type | Required | Description / options |
|-------|------|----------|------------------------|
| `purpose` | string | Yes | Loan purpose. Options: `Purchase (owner-occupied)`, `Purchase (investment)`, `Refinance`, `Construction`, `Renovation`, `Debt consolidation`, `Equity release`. |
| `propertyAddress` / `suburbArea` | string | No | Property address or suburb/area (same value stored in both). Placeholder: e.g. "Sydney CBD or 123 Main St". |
| `estimatedPriceCents` | integer (cents) | No | Estimated purchase price or property value. Entered in dollars, stored in cents. |
| `loanAmountCents` | integer (cents) | Yes | Loan amount requested. Entered in dollars, stored in cents. |
| `depositAmountCents` | integer (cents) | No | Deposit amount. Entered in dollars, stored in cents. |
| `depositSource` | string | No | e.g. savings, equity, gift. |
| `lvr` | string | No | Loan-to-value ratio (%). Note: “we’ll flag if >80%”. |
| `loanType` | string | No | Options: `Variable`, `Fixed`, `Split`. |
| `repaymentType` | string | No | Options: `Principal & interest`, `Interest only`. |
| `interestOnlyReason` | string | No | Shown only if repayment type is “Interest only”. |
| `loanTermYears` | string | No | Default `"30"`. Loan term in years. |

---

### Step 2 — Applicant details

- **Two applicants:** Checkbox “Two applicants (e.g. joint application)”. When checked, Applicant 2 section is shown.
- **Applicant 2 same as 1:** Checkbox to copy Applicant 1’s details to Applicant 2 (with optional override for “Relationship to Applicant 1”).

**Per applicant** (index 0 and 1 in `applicants[]`):

| Field | Type | Description / options |
|-------|------|----------------------|
| `maritalStatus` | string | e.g. Single, Married. |
| `numberOfDependants` | string | Number of dependants. |
| `dependantAges` | string | e.g. "5, 8". |
| `residencyStatus` | string | Options: `Australian citizen`, `Permanent resident`, `Visa holder`. |
| `visaTypeExpiry` | string | Shown only if residency is “Visa holder”. |
| `currentAddress` | string | Current residential address. |
| `timeAtAddress` | string | e.g. "2 years". |
| `residentialStatus` | string | Options: `Own`, `Rent`, `Boarding`, `Living with parents`. |
| `previousAddress` | string | “Previous address (if &lt;3 years at current)”. |
| `relationshipToOther` | string | Applicant 2 only (when not “same as 1”): e.g. Spouse, Co-borrower. |

---

### Step 3 — Employment & income

Per applicant. Income fields are **annual, gross**. Values are entered in dollars and stored in **cents**.

| Field | Type | Description / options |
|-------|------|----------------------|
| `employmentStatus` | string | Options: `PAYG full-time`, `PAYG part-time`, `Casual`, `Self-employed`, `Contractor`, `Not employed`. |
| `employerName` | string | Employer name. |
| `roleTitle` | string | Job title / role. |
| `startDate` | string | e.g. "Jan 2020". |
| `probationStatus` | string | Yes / No. |
| `previousEmployer` | string | In schema; not rendered in current UI. |
| `baseSalaryCents` | integer (cents) | Base salary (gross annual). |
| `overtimeCents` | integer (cents) | In UI: “Overtime / bonuses / commission ($ annual)”. |
| `bonusesCents` | integer (cents) | In schema; can be merged with overtime in UI. |
| `commissionCents` | integer (cents) | In schema; can be merged with overtime in UI. |
| `allowancesCents` | integer (cents) | In schema; not in current UI. |
| `abn` | string | For self-employed; in schema. |
| `businessName` | string | For self-employed; in schema. |
| `yearsTrading` | string | In schema. |
| `businessStructure` | string | In schema. |
| `lastTwoYearsProfit` | string | In schema. |
| `otherIncomeCents` | integer (cents) | Other income (e.g. rental, Centrelink). |
| `otherIncomeDetail` | string | In schema. |

---

### Step 4 — Assets

- **Current behaviour:** Placeholder text only. “Asset details can be added here. For now, we’ll capture the rest in our follow-up call.” and “You can list any property, savings, shares, super, or vehicles in the message when you submit.”
- **Data:** `data.assets` is an array (empty in current UI; structure reserved for future use).

---

### Step 5 — Liabilities

- **Current behaviour:** Placeholder text only. “Liabilities can be added here. We’ll go through any existing loans, cards, and debts in our call.” and “If you have anything urgent (e.g. current mortgage balance), add a note in the final step.”
- **Data:** `data.liabilities` is an array (empty in current UI; structure reserved for future use).

---

## Consent (Step 5)

- **Component:** `FormConsent` with `entity={ENTITY.BROKERS}` and `theme="dark"`.
- **Required to submit:** User must tick consent. If not, `showConsentError` is set and submit is blocked.
- **Content:** Uses Brokers entity config (Credit Guide, Privacy Consent, consent to contact and to collect/use/disclose information per Brokers’ privacy consent). See `src/components/FormConsent.js` and `src/config/entities.js` (ENTITY.BROKERS).

---

## Payload sent to API

**Endpoint:** `POST /api/accountant/loan-applications`

**Body (summary):**

- **Contact (from URL or empty):** `contactFirstName`, `contactLastName`, `contactEmail`, `contactPhone`
- **Draft id (if resuming):** `id`
- **Step 1:** `purpose`, `propertyAddress`, `suburbArea`, `estimatedPriceCents`, `depositAmountCents`, `depositSource`, `loanAmountCents`, `lvr`, `loanType`, `repaymentType`, `interestOnlyReason`, `loanTermYears`
- **Applicants:** `applicants` — array of 2 objects; each object has all Step 2 and Step 3 fields above (strings or integer cents as applicable).
- **Step 4 / 5:** `assets`, `liabilities` (arrays; currently empty).
- **Server-added:** `updatedAt` (ISO string).

All dollar amounts must be in **cents** (integer). The wizard uses a `toCents()` helper that parses input and multiplies by 100 where appropriate.

---

## API — draft save and submit

- **POST** (create or update draft):  
  - If `body.id` is provided and exists in store, that draft is updated; otherwise a new id is generated (`draft_<timestamp>_<random>`).  
  - Response: full draft object including `id`, `updatedAt`.
- **GET** (list or single):  
  - `GET /api/accountant/loan-applications` — list all drafts.  
  - `GET /api/accountant/loan-applications?id=<id>` — single draft by id.
- **PATCH** (by id):  
  - `PATCH /api/accountant/loan-applications/[id]` — partial update; response is full draft.

**Storage:** In-memory `Map` in `src/app/api/accountant/loan-applications/store.js`. Not persistent across server restarts; replace with DB in production.

---

## Post-submit

- On submit, the wizard shows a success view: “You’re all set.” and “We’ve saved your details. A member of our team will be in touch to discuss your home loan — no obligation, no cost to you.”
- Links: “Back to Home” and “Call us” (tel: 0422 959 486).

---

## File reference

| Item | Path |
|------|------|
| Wizard UI & fields | `src/components/fact-find/FactFindWizard.js` |
| Page (home loans) | `src/app/free-eligibility-test-home-loans/page.js` |
| Layout | `src/app/free-eligibility-test-home-loans/layout.js` |
| API route (POST/GET) | `src/app/api/accountant/loan-applications/route.js` |
| API route (GET/PATCH by id) | `src/app/api/accountant/loan-applications/[id]/route.js` |
| Draft store | `src/app/api/accountant/loan-applications/store.js` |
| Brokers entity & consent | `src/config/entities.js`, `src/components/FormConsent.js` |

---

## Option sets (for reference)

- **Purpose:** Purchase (owner-occupied), Purchase (investment), Refinance, Construction, Renovation, Debt consolidation, Equity release  
- **Loan type:** Variable, Fixed, Split  
- **Repayment type:** Principal & interest, Interest only  
- **Residency:** Australian citizen, Permanent resident, Visa holder  
- **Residential status:** Own, Rent, Boarding, Living with parents  
- **Employment status:** PAYG full-time, PAYG part-time, Casual, Self-employed, Contractor, Not employed  
