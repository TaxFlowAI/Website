# Frontline Financial website

Next.js 16 (App Router), React 19, Tailwind v4, plain JavaScript. `npm run dev` serves on port 3002. Vercel deploys
from GitHub `TaxFlowAI/Website`; the live project is "frontlinefinancial" and holds the env vars. A push to `main` goes
live, so push only with the user's OK.

## Two businesses, one repo
- Frontline Financial (most routes): Brokers (home loans) and Asset Solutions (vehicle and equipment finance).
- TaxFlowAI (`/taxflow`, `src/components/taxflow/`): the accounting practice, a separate business (TAX7 T04 is the
  registered tax agent). Its pages have strict wording rules, with `src/app/taxflow/security/page.js` as the source for
  security claims. Don't add new claims, and keep Frontline tracking and offers off `/taxflow`.
- Legal names, licence lines and addresses: `src/config/entities.js`. The office is Level 49, 8 Parramatta Square,
  Parramatta NSW 2150.

## Marketing and brand live in Dropbox
- Marketing root: `C:\Users\Hassa\Frontline Financial Dropbox\Hassan Arif\Frontline Financial\FFG Marketing`.
  Sessions here can open it (`.claude/settings.local.json`). Its `CLAUDE.md` has the brand rules, both licence lines,
  Meta IDs and campaign status. Read it before any marketing-facing change.
- Brand guide, official logos and DM Sans are in `FFG Marketing/_Brand/`. The guide wins over anything in this repo,
  including `MARKETING-APPROACH.md` and `WEBSITE-COMPILATION.md`.
- Campaign assets and ad copy are in `FFG Marketing/Campaigns/<yyyy-mm> <name>/`. Copy only web-sized exports into
  `public/`, never raw video.

## Brand in code
- Tokens are in `src/app/globals.css`: dark blue #1C5472, teal #39B2B2, aqua #00FCB8. The off-white here is #F5F5EF;
  the guide's is #F6F8F2.
- Components: `FrontlineLogoFull.js`, `FrontlineLogoMark.js` and `WaveDivider.js` in `src/components/`.
- Licence wording is on the credit-guide and calculator-disclaimer pages. Quote it exactly as the marketing
  `CLAUDE.md` gives it.

## Campaign landing pages and tracking
- `/vehicle-finance` (`src/app/vehicle-finance/`) is the Meta campaign landing page: a 7-question quiz that posts to
  `/api/contact` and fires the Meta `Lead` event (plus GA4 `vf_form_submit` once GA4 is set up).
- `/self-employed-home-loans` (server component, `src/app/self-employed-home-loans/page.js`) is the Brokers niche page
  (self-employed borrowers, from 26 Oct 2026). Its buttons go to `/self-employed-home-loans/assessment`, a six-question
  quiz (noindex) that fires the Meta `Lead` event. `/contact?service=self-employed` still preselects Hassan and
  "Self-Employed Home Loan". Lender policy stays general ("some lenders"), with no lender names.
- Pages about Hassan link to `/contact?team=hassan` (`team=sham` also works), which preselects him, so the enquiry
  reaches Broker Engine. Phone links and the credit guide's email address can't go through the form.
- `/car-loan` (`src/app/car-loan/`, noindex) is a one-page car loan enquiry.
- `/api/contact` emails the right inbox through Resend. Asset Solutions leads go straight to Ambition Cloud
  (`src/app/api/contact/ambition-cloud.js`, needs `AMBITION_CLOUD_API_KEY`). That returns a link to its Privacy Consent form,
  which the route emails to the client. This creates real leads, so don't test it with real keys without the user's OK.
  Brokers leads (`consultationService: "brokers"` or `teamMember: "hassan"`) go to the Zapier webhook in
  `ZAPIER_BROKERS_WEBHOOK_URL`, and the Zap creates the Broker Engine card. Quiz answers travel as `answers`
  ({label: value}) plus a `summary` block for the card notes.
- The Meta pixel (`src/components/MetaPixel.js`, loaded in `src/app/layout.js`) runs site-wide except `/taxflow`, switched
  on by the Vercel env var `NEXT_PUBLIC_META_PIXEL_ID`. Lead fires on the home consultation, `/contact`, `/dean` and
  `/vehicle-finance` forms. Test custom events on the live site: Meta drops some of them from localhost.
- GA4 (`NEXT_PUBLIC_GA4_ID`) is not set yet.
- Never submit test leads to the live site without the user's OK. They reach the CRM and the ops inbox.
