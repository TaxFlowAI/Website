# Frontline Financial Website — Full Compilation

This document summarises everything implemented on the Frontline Financial website: technical structure, all pages and source code, and the marketing approach (wording, mission, team, and positioning).

---

## 1. Technology stack and project setup

| Item | Detail |
|------|--------|
| **Framework** | Next.js 16.1.6 (App Router) |
| **React** | 19.2.3 |
| **Styling** | Tailwind CSS v4, PostCSS |
| **Font** | DM Sans (Google Fonts), weights 400 & 700 |
| **Dev server** | `npm run dev` — runs on port **3002** |
| **Scripts** | `dev`, `build`, `start`, `lint` |
| **Other** | nodemailer (contact form email), client-side fetch to API routes |

**Root layout** (`src/app/layout.js`):
- Global metadata: title `"Frontline Financial | Finance Made Simple"`, description for Australian financial services (Brokers + Asset Solutions).
- DM Sans applied via CSS variable `--font-dm-sans`.
- No Vite or Express; static assets served by Next.js from `public/`.

---

## 2. Source code structure

### 2.1 App routes (pages and layouts)

| Route | File(s) | Purpose |
|-------|---------|---------|
| `/` | `src/app/page.js` | Home: hero, trust badges, services cards, reviews carousel, award banner, TaxFlowAI teaser, consultation form (choose Brokers or Asset Solutions → form → redirect to thank-you). |
| `/about` | `src/app/about/page.js` | About: vision (“We want to help every Australian”), story, values, team (Hassan, Sham), awards, community, CTA. |
| `/brokers` | `src/app/brokers/page.js` | Frontline Financial Brokers: home loans, mortgage products, process steps, lenders list, FAQ, CTAs (Get a Free Assessment, Call Hassan). |
| `/asset-solutions` | `src/app/asset-solutions/page.js` | Frontline Financial: Asset Solutions: car/equipment/fleet finance, product cards, process, CTAs (Apply Now, Talk to Sham). |
| `/contact` | `src/app/contact/page.js` | Contact: hero, who to contact (Hassan / Sham / Not sure), contact form, office details, map/links. Submits to `/api/contact`; redirects to `/contact/thank-you?team=hassan|sham|team`. |
| `/contact/thank-you` | `src/app/contact/thank-you/page.js` | Thank-you: **Consultation** (`?team=brokers` or `?team=asset-solutions`) — stripe background, dark blue box, service-specific copy and CTAs; **Contact** (`?team=hassan|sham|team`) — checkmark, “You’re in good hands” / “Message received”, optional personal cards. |
| `/financial-calculators` | `src/app/financial-calculators/page.js` + `layout.js` | Financial calculators: mortgage, refinance, car loan, personal loan tabs; disclaimer; CTAs with team photos (Hassan, Sham) and links to eligibility tests. Layout metadata for calculator disclaimer. |
| `/calculators` | `src/app/calculators/page.js` | Redirect or landing for calculators (links into financial-calculators). |
| `/free-eligibility-test` | `src/app/free-eligibility-test/page.js` | Generic eligibility test entry. |
| `/free-eligibility-test-home-loans` | `src/app/free-eligibility-test-home-loans/page.js` | Home loan eligibility test (Brokers). |
| `/free-eligibility-test-asset-finance` | `src/app/free-eligibility-test-asset-finance/page.js` | Asset finance eligibility test (Asset Solutions). |
| `/calculator-disclaimer` | `src/app/calculator-disclaimer/page.js` + `layout.js` | General calculator disclaimer and methodology. |
| `/calculator-disclaimer-broking` | `src/app/calculator-disclaimer-broking/page.js` + `layout.js` | Broking (home loan) calculator disclaimer; CRN 575968, ACL 389087. |
| `/calculator-disclaimer-asset-solutions` | `src/app/calculator-disclaimer-asset-solutions/page.js` + `layout.js` | Asset Solutions calculator disclaimer; CRN 563350, ACL 511803. |
| `/taxflow` | `src/app/taxflow/page.js` + `layout.js` | TaxFlowAI product: hero, features, how it works, dashboard demo, pricing, compliance (E&A Advisory Pty Ltd). Layout title: “TaxFlowAI — Your Tax Life, Organised”. |

### 2.2 API routes

| Route | File | Purpose |
|-------|------|---------|
| `POST /api/contact` | `src/app/api/contact/route.js` | Contact form: validates name, email, phone, message; sends email via SMTP (env: SMTP_*, CONTACT_EMAIL_*). If body includes `consultationService` then also forwards lead: `"brokers"` → Broker Engine, `"asset-solutions"` → Ambition Cloud. |
| `POST /api/broker-engine` | `src/app/api/broker-engine/route.js` | Forwards leads to Broker Engine (env: BROKER_ENGINE_API_URL, BROKER_ENGINE_API_KEY). |
| `POST /api/ambition-cloud` | `src/app/api/ambition-cloud/route.js` | Forwards leads to Ambition Cloud / Fintelligence (env: AMBITION_CLOUD_API_KEY, AMBITION_CLOUD_API_URL). |

See `src/app/api/README.md` for env vars and payload shapes.

### 2.3 Components

| Component | File | Purpose |
|-----------|------|---------|
| LayoutNav | `src/components/LayoutNav.js` | Main nav: logo, services dropdown (Brokers, Asset Solutions), TaxFlowAI link, Book a Consultation, mobile menu. |
| LayoutFooter | `src/components/LayoutFooter.js` | Footer: logo, tagline (“Building toward one goal: quality finance for every Australian…”), quick links, services, contact, Terms/Privacy. |
| FrontlineLogoFull | `src/components/FrontlineLogoFull.js` | Full logo image for header; uses `/images/logos/frontline-logo.svg?v=2`. |
| FrontlineLogoMark | `src/components/FrontlineLogoMark.js` | Logo mark (F) for TaxFlow bar; uses `/images/logos/frontline-logo-mark.svg`. |
| FooterLogo | `src/components/FooterLogo.js` | Footer logo with error fallback to text “Frontline Financial”. |
| WaveDivider | `src/components/WaveDivider.js` | SVG wave between sections (fill configurable). |
| SliderInput / NumericInput | `src/components/calculators/SliderInput.js`, `NumericInput.js` | Used in financial calculators. |

### 2.4 Global styles and assets

- **CSS**: `src/app/globals.css` — Tailwind, CSS variables (brand colours), section backgrounds (dot grid, stripe pattern), TaxFlowAI teaser gradient animation, thank-you checkmark animation, etc.
- **Images**: `public/images/` — `logos/` (frontline-logo.svg, frontline-logo-mark.svg), `team/` (hassan.png, sham.png), and other SVGs. Served at `/images/...`; no proxy; PNG/JPG/WEBP/SVG all served by Next.js from `public/`.

---

## 3. Marketing approach: wording, mission, and positioning

*(Aligned with `MARKETING-APPROACH.md` and live site copy.)*

### 3.1 Brand positioning and taglines

- **Main tagline:** “Finance made simple. For every single Australian.”
- **One-line positioning:** Australian-owned financial services: mortgage and business lending (Brokers) and car, equipment, and fleet finance (Asset Solutions), with a mission to help every Australian, starting in Western Sydney.
- **Vision:** One team. One goal. Help every Australian — all 26 million.
- **Footer tagline:** “Building toward one goal: quality finance for every Australian. 500 down. Millions to go.”

### 3.2 Mission and vision statements (on site)

- **About hero:** “We want to help every Australian. Every. Single. One.” / “26 million people. A team based in Parramatta. Sounds impossible. We don’t care.”
- **Vision block:** “One team. One goal. Help every Australian.” — “Not just Western Sydney. Not just high earners. Not just people who already know what a mortgage broker does. Every. Single. One.”
- **Story:** “Built differently. On purpose.” — “Frontline Financial Group was built by people who had worked inside the finance industry long enough to know what wasn’t working… The right outcome for the client is the only outcome worth working toward.”

### 3.3 Value propositions and key messages

| Message | Where used |
|--------|------------|
| Finance made simple. For every single Australian. | Hero / brand promise |
| We’re starting with you. | Home / personalisation |
| 26 million people. That’s the goal. | Vision, ambition |
| So far: 500+ helped. Long way to go. | Social proof, momentum |
| No pressure. No obligation. No confusing jargon. | Contact / reassurance |
| We work for you — not the banks. | Brokers differentiation |
| Save time. Save money. Stress less. | Benefits summary |
| Built differently. On purpose. | About / story |
| People over profits. | Values |
| Plain English always. | Tone / trust |
| Western Sydney first. Australia next. | Community / geography |

### 3.4 Two service pillars (copy on site)

**Frontline Financial Brokers**
- Headline: “The right home loan. For every Australian.”
- Sub: Independent mortgage brokers who search 30+ lenders to find the right loan for your situation — at no cost to you.
- Process: Free Assessment → We Search the Market (Hassan personally reviews 30+ lenders) → Loan Recommendation → Application & Approval → Settlement.
- Products: Home Loans, First Home Buyers, Investment Property, Refinancing, Commercial, Construction, Debt Consolidation, SMSF.
- Primary CTA: Get a Free Assessment; Call Hassan: 0422 959 486.

**Frontline Financial: Asset Solutions**
- Headline: “Drive it. Build it. Fund it.” / “Car and equipment finance, made simple.”
- Sub: Fast approvals on car loans, equipment finance, and fleet solutions.
- Process: Tell us what you need → We search 30+ lenders (Sham personally reviews) → Get your options → Drive away approved.
- Products: Car Loans, Commercial Vehicle, Equipment & Machinery, Personal Loans, Working Capital, Fleet Finance.
- Primary CTA: Apply Now; Talk to Sham (0450 553 877 on eligibility CTAs).

### 3.5 Values (About page — “What we stand for”)

1. **People Over Profits** — Success by client goals, not deals closed or commission.
2. **No Shortcuts** — Do the work properly; don’t rush clients.
3. **Plain English Always** — No jargon; clear explanations for confident decisions.
4. **Genuine Options** — Real choices and clear explanations; you decide.
5. **Speed With Care** — Fast when it matters, without cutting corners.
6. **Western Sydney Proud** — “We’re from this community, we serve this community.”

### 3.6 Trust and proof points (repeated across site)

- ASIC regulated — Licensed & compliant  
- 5/5 Google Reviews — 44+ verified reviews  
- Award Winner FY25 — Fintelligence Broker Awards (Vehicle & Equipment Finance)  
- Australian owned — Serving clients nationwide  
- 30+ lenders — Brokers and Asset Solutions  
- No cost to you — Broking free to borrower  
- 500+ helped — “Long way to go”  
- 24hr approvals — Asset Solutions  
- 150 George St, Parramatta — Physical presence  
- Named experts: Hassan (Brokers), Sham (Asset Solutions)  

### 3.7 Tone and voice

- Plain English; no jargon.
- Confident but human: bold claims (“For every single Australian”) with concrete proof (500+ helped, 5/5 reviews, 30+ lenders).
- Inclusive: “Every Australian,” “We’re starting with you,” “We’ll figure it out together.”
- Subtle anti-bank: “We work for you — not the banks”; “Stop going direct. Start getting a better deal.”
- Local pride: Western Sydney / Parramatta; “We’re from this community, we serve this community.”

---

## 4. Team and contact

### 4.1 Team (About page)

- **Hassan Arif** — Founder & Director, Frontline Financial Brokers. CPA, Tax Agent, Finance Broker. Leads Brokers and oversees the group’s accounting arm (TaxFlowAI). Contact: phone, email, LinkedIn.
- **Sham** — Director, Frontline Financial Asset Solutions. Asset Finance Specialist, Fintelligence Award Winner FY25. Leads Asset Solutions. Quote on site: “Sham was phenomenal. Approved in less than 24 hours.” — Mikhail A.

### 4.2 Contact and lead capture

- **Phone:** +61 422 959 486 (primary; Brokers/Hassan). Asset Solutions eligibility CTAs also use 0450 553 877 (Sham).
- **Email:** operations@frontline.financial (general); routing by “who do you need?” — Hassan (Brokers), Sham (Asset Solutions), or “Not sure” (team).
- **Address:** 150 George Street, Parramatta NSW 2150; Mon–Fri 9am–5pm; Get Directions to Google Maps.
- **Form strategy:**  
  - **Home consultation:** User chooses Brokers or Asset Solutions → form (name, email, phone) → POST `/api/contact` with `consultationService: "brokers" | "asset-solutions"` → redirect to `/contact/thank-you?team=brokers|asset-solutions` with service-specific thank-you (home loan urgency vs asset solutions next steps).  
  - **Contact page:** User chooses Hassan / Sham / Not sure → full form (name, email, phone, message, preferred contact) → POST `/api/contact` → redirect to `/contact/thank-you?team=hassan|sham|team` with personalised message and optional personal cards.

### 4.3 Thank-you pages (post-submit)

- **Brokers (`?team=brokers`):** Light green stripe background; “26 million Australians need better finance.”; dark blue box “Thanks — we’ll be in touch soon.”; home loan focus and urgency (“Complete your home loan application”, “We’ll call within 1 business day”, “Interest rates can change quickly”); CTA to “Start free eligibility test” → `/free-eligibility-test-home-loans`.
- **Asset Solutions (`?team=asset-solutions`):** Same layout; “Car and equipment finance, made simple.”; same thanks box; “What happens next” and Asset Solutions services (car loans, equipment, fleet); CTA to “Free eligibility check for asset finance” → `/free-eligibility-test-asset-finance`.
- **Contact (hassan/sham/team):** Dark blue page, checkmark, “You’re in good hands” or “Message received”; optional cards for Hassan/Sham; contact details and “Back to Home” / “Our Services”.

---

## 5. TaxFlowAI

- **Product:** “Your tax life, organised.” — Smarter way to manage tax lodgements and stay connected with your accountant.
- **Home page teaser:** “+ Introducing TaxFlowAI”, “The next step in tax technology”, feature pills (Track Lodgements, Manage Documents, Accountant Connected), CTA “Explore TaxFlowAI” → `/taxflow`.
- **TaxFlow page:** Dedicated product site: hero (“Every Australian deserves a real accountant”), features, how it works, dashboard demo, pricing, compliance (E&A Advisory Pty Ltd — Registered Tax Agent). Tax services supervised by E&A Advisory; TaxFlowAI is the client portal.

---

## 6. Brand assets (referenced in code)

- **Colours:** `#1C5472` (dark blue), `#39B2B2` (teal), `#00FCB8` (aqua), `#F5F5EF` (off-white), `#0A1628` (dark navy).
- **Font:** DM Sans (variable `--font-dm-sans`).
- **Logos:** `/images/logos/frontline-logo.svg`, `/images/logos/frontline-logo-mark.svg`.
- **Team images:** `/images/team/hassan.png`, `/images/team/sham.png` (used on financial-calculators CTAs; fallback on error).

---

## 7. Compliance and disclaimers

- **Brokers:** Frontline Financial Pty Ltd, CRN 575968, ACL 389087.
- **Asset Solutions:** Martyn Financial Pty Ltd t/a Frontline Financial: Asset Solutions, CRN 563350, ACL 511803.
- **TaxFlowAI:** Tax services supervised by E&A Advisory Pty Ltd — Registered Tax Agent; TaxFlowAI is the platform.
- Calculator disclaimers: estimates only; not loan offer or financial advice; links to full disclaimer and methodology pages.

---

## 8. Summary of pages created (route list)

| # | Route | Purpose |
|---|--------|---------|
| 1 | `/` | Home |
| 2 | `/about` | About Us |
| 3 | `/brokers` | Brokers (home loans) |
| 4 | `/asset-solutions` | Asset Solutions |
| 5 | `/contact` | Contact form |
| 6 | `/contact/thank-you` | Thank-you (consultation + contact) |
| 7 | `/financial-calculators` | Financial calculators |
| 8 | `/calculators` | Calculators entry |
| 9 | `/free-eligibility-test` | General eligibility test |
| 10 | `/free-eligibility-test-home-loans` | Home loan eligibility |
| 11 | `/free-eligibility-test-asset-finance` | Asset finance eligibility |
| 12 | `/calculator-disclaimer` | General calculator disclaimer |
| 13 | `/calculator-disclaimer-broking` | Broking disclaimer |
| 14 | `/calculator-disclaimer-asset-solutions` | Asset Solutions disclaimer |
| 15 | `/taxflow` | TaxFlowAI product |

API routes: `/api/contact`, `/api/broker-engine`, `/api/ambition-cloud`.

---

*This compilation is derived from the Frontline Financial codebase and `MARKETING-APPROACH.md`. Update figures (e.g. 500+ helped, 44+ reviews) and contact details as the business grows.*
