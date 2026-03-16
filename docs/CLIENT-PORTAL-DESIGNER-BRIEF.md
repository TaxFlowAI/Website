# Deductly / TaxFlowAI — Client Portal Designer Brief

**Prepared by:** E&A Advisory Pty Ltd
**Date:** March 2026
**Purpose:** Web design showcase of all features available in the client (customer) portal

---

## Overview

The client portal is a web application used by individual clients and business entities to manage their tax affairs with their accountant. Clients can upload receipts, track lodgements, manage their profile, and interact with Flo — an AI assistant built into the platform.

The portal supports **dark and light themes** throughout.

---

## 1. Onboarding & Registration

### Welcome Screen
First screen seen after registering an account.

- Introduces "Flo", the AI assistant (friendly character, speech bubble UI)
- Prompt to complete tax profile (10-minute guided setup)
- Option to skip and go straight to the dashboard
- Auto-email fallback if setup is not completed

### Individual Onboarding Wizard (4 Steps)
A clean multi-step form for new clients to complete their tax profile.

**Step 1 — Entity Details**
- TFN field (8–9 digit input with masked display and visibility toggle)
- ABN field (optional)

**Step 2 — Address**
- Google Places address autocomplete
- Street address, suburb, state (dropdown), postcode, country

**Step 3 — Bank Details**
- BSB with live bank institution name lookup
- Account number (6–10 digits)
- Account name
- All fields masked with reveal controls

**Step 4 — Review & Submit**
- Summary of all entered details before submission
- Engagement acceptance modal (engagement letter, TFN collection notice, bank details privacy notice)

---

## 2. Dashboard

The central hub of the client portal. A single-page overview of the client's full tax picture.

### Status Hero
- Dynamic status banner — messages like "All good", "We're on it", "Heads up", "Almost there"
- Visual state indicator to communicate urgency at a glance

### My Accounts
- Grid of all accounts linked to the client: Personal, Sole Trader, Company, Trust, Partnership, SMSF
- Each account card shows: account type badge, entity name, number of open lodgements, overdue count
- Tap to go to account detail

### Documents & Receipts Quick Actions
- Three action cards: Upload Receipts, Upload Documents, Open Document Vault
- One-tap navigation to key functions

### Vehicle Logbook Card
- Active logbook summary: weeks elapsed, business use %, total distance
- Warning indicator for unclassified trips
- Link to full logbook management

### Investment Properties
- Inline list of all rental/investment properties
- Quick-add, edit, and delete within the dashboard
- Fields: address, date first received rent, purchase date, notes

### Request a Callback
- Embedded form: topic, message, preferred contact time
- Sends request directly to the accountant

### Frontline Financial (Partner Section)
- Expandable section showcasing 15+ loan product categories:
  Home loans, investment loans, car finance, equipment finance, business loans, SMSF loans, commercial property, development finance, bridging loans, personal loans, and more
- Each product has an enquiry modal

---

## 3. Receipt & Document Upload

A three-section upload page for all tax-related file submissions.

### AI Receipt Scanner
- Drag-and-drop interface (JPG, PNG, PDF, HEIC supported)
- AI automatically classifies each receipt into ATO deduction categories (D1–D10)
- After upload, client reviews the AI's suggestion:
  - Merchant name, amount, date
  - ATO category with confidence level and AI reasoning
  - Option to accept or change the categorisation
- Bulk upload supported

### Tax Documentation Upload
- Upload supporting documents, contracts, bank statements, etc.
- File type and size validation

### Vehicle Expenses Upload
- Dedicated section for vehicle-related expense receipts and documents

---

## 4. Profile

Personal information management page with sensitive field handling.

### Personal Details
- First name, other names, last name
- Email address (required), phone number

### Address
- Street address, suburb, state (dropdown), postcode, country

### Tax Details (Read-Only Display)
- TFN — masked by default, with a reveal toggle
- ABN (if applicable)
- Tax agent information

### Bank Details
- BSB with institution name lookup
- Account number and account name
- All sensitive fields masked
- Password-protected reveal (30-second visibility timeout)

---

## 5. Document Vault

A **password-protected** secure document repository. Clients must enter their account password to unlock it. Automatically re-locks after 45 minutes of inactivity.

### Tax Documents
- Table: file name, type, upload date, file size, accountant status, download
- Accountant assignment status badge ("Reviewed and assigned to [tax return]")

### Vehicle Documents
- Same table format, with vehicle-specific badge

### Receipts
- Table: merchant, amount, date, ATO category, financial year, status
- Status badges: Added, Review Needed, Reviewed and Assigned
- View original receipt file
- **"Flo's Input"** expandable row — shows AI reasoning for the categorisation
- Each section is individually collapsible

---

## 6. Vehicle Expenses & Logbook

A comprehensive logbook tool to meet ATO substantiation requirements for vehicle deductions.

### Vehicle Management
- Register multiple vehicles (make, model, year, registration number, engine capacity)
- Registration plate lookup for auto-fill

### Logbook Creation Wizard
- Guided setup: vehicle selection, odometer start reading, logbook period, ATO terms acceptance
- Location services notice and permission prompt

### Trip Recording
- Manual trip entry: date, start/end odometer, trip type (business/personal), business purpose
- Classify unclassified trips in bulk

### Trip Management
- View all recorded trips in a table
- Edit or delete individual trips

### Logbook Statistics
- Total distance, business use percentage, estimated deductible amount
- CSV and PDF export options

---

## 7. My Accounts (Account Detail)

Detailed view of a single account linked to the client (e.g., Personal, Company).

- Account name, type, ABN
- **Outstanding Lodgements list** — task label, financial year, period, due date
- **ASIC Compliance Tasks** (company accounts only) — task name, status (Waiting on you, In progress, Completed)
- Tap a lodgement to go to the lodgement detail page

---

## 8. Lodgement Detail

Detailed view of a single lodgement task (e.g., "Individual Tax Return FY2025").

- Task name, account, financial year, period, due date
- Accountant notes
- **Request a Callback** — embedded form specific to this lodgement

---

## 9. Investment Property Detail

Individual page for a specific investment property.

- Full address display
- Date first received rent
- Purchase date
- Notes
- Edit via Dashboard

---

## 10. Loans (Partner Page)

A static partner referral page for Frontline Financial.

- 4 key loan products listed: business, equipment, vehicle, personal
- Brief product descriptions
- Email contact call-to-action for enquiries

---

## Flo — AI Assistant

Flo is the AI assistant embedded throughout the portal. Present as a floating chat button on all pages.

- Answers questions about tax deductions, lodgement status, ATO categories
- Explains AI receipt categorisation decisions
- Provides guided help for first-time users
- Character design: friendly, knowledgeable, slightly witty tone (refer to `FLO-CHARACTER-GUIDE.md`)

---

## Design System Notes

| Element | Detail |
|---|---|
| Themes | Dark and light mode, user-toggled |
| Colour palette | Teal primary (`#00818A`), dark surface backgrounds in dark mode |
| Typography | Clean sans-serif, form-heavy layout |
| Navigation | Fixed left sidebar (desktop), collapsible on mobile |
| Forms | Inline validation, masked sensitive fields, multi-step wizards |
| Tables | Collapsible sections, status badges, action buttons per row |
| Modals | Used for confirmations, engagement terms, partner enquiries |
| AI elements | Flo avatar, AI confidence badges, expandable reasoning dropdowns |

---

## Page Map Summary

| Page | URL | Authentication |
|---|---|---|
| Welcome | `/welcome` | Required (customer) |
| Onboarding | `/onboarding/individual` | Required (customer) |
| Dashboard | `/` | Required (customer) |
| Upload | `/upload` | Required (customer) |
| Profile | `/profile` | Required (customer) |
| Document Vault | `/vault` | Required (customer) + vault password |
| Vehicle Expenses & Logbook | `/vehicle-expenses` | Required (customer) |
| Account Detail | `/accounts/:id` | Required (customer) |
| Lodgement Detail | `/deals/:id` | Required (customer) |
| Investment Property | `/investment-properties/:id` | Required (customer) |
| Loans | `/loans` | Required (customer) |
