---
target: TaxFlowAI home page
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\Hassa\\frontline-website\\src\\app\\taxflow\\page.js"
target_fingerprint: "sha256:56a924570507cda6c48717ada0babc980a25256db373849a754b36ef290fc3d8"
target_path: "C:\\Users\\Hassa\\frontline-website\\src\\app\\taxflow\\page.js"
timestamp: 2026-10-04T22-26-17Z
slug: src-app-taxflow-page-js
closed: true
---
Method: dual-agent (A: a4cfb2bc99e31284b · B: ad6b1451060a0b69b)

Target: src/app/taxflow/page.js (localhost:3002/taxflow), reviewed with SHOW_TAX_SERVICES = true.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | No current-page state in the nav; review counter shows "0" until it counts up |
| 2 | Match System / Real World | 2 | TAX7 T04, ASIC agent 51843, TPB, AP-SOUTHEAST-2, ISO/IEC 27001 arrive before the value |
| 3 | User Control and Freedom | 3 | Reviews auto-advance every 6 seconds with no pause on touch |
| 4 | Consistency and Standards | 2 | Two owners named, three labels for the same booking call, three grid widths |
| 5 | Error Prevention | 3 | "Get started" opens another domain with no cue, same tab in some places and a new tab in others |
| 6 | Recognition Rather Than Recall | 3 | "Free to sign up" only appears at the very bottom; no How it works in the nav |
| 7 | Flexibility and Efficiency | n/a | Marketing page with no repeat-use workflow |
| 8 | Aesthetic and Minimalist Design | 2 | Security facts stated 3 to 4 times; gradient text three times plus glows |
| 9 | Error Recovery | 3 | Sign-in pop-up errors are plain and recover in place |
| 10 | Help and Documentation | n/a | Landing page; help is the FAQ, phone and free call |
| **Total** | | **21/32** | **Acceptable (66%)** |

## Design Specificity Verdict

Design review: the assets are yours; the frame around them is a template. Flo in four situational poses, the real team photo, the TFN redaction bar marked "NOT STORED", the 2FA code cells and "SYDNEY · AP-SOUTHEAST-2" are things only TaxFlowAI could show. The scaffolding (a mono uppercase label over every section, a gradient phrase in the headline used three times, glow blobs, a bento grid and a carousel) could ship for any AI-and-finance startup. Biggest miss: Flo never does anything; the product's real act, a receipt becoming an ATO deduction category with readable reasoning, appears only as an illustration inside a carousel card.

Automated scan: file scan of page.js plus 11 components found 2 issues: a thick left border on the reviews heading (GoogleReviewsCarousel.js:107) and inline gradient text (MedicalShowcase.js:36). In-browser scan at 1440x900 flagged 63 elements with 93 findings. Agreed with the review on the template layer: labels above headings (3), the "Meet Flo" chip, gradient text (3). Caught what the review missed: a 10px "Google review" label (GoogleReviewsCarousel.js:189), seven other sub-12px labels (page.js:187-198, 299; MedicalShowcase.js:116-118; closing band fine print), carousel dots animating width, hover movement on medical icons. Brand choices, not faults: mint-on-navy colour (22), radial glows (18), mint glows (11). False positives: an orange glow no element has, the parent site's cream body background, the redaction stripes.

Visual overlays: live in the in-app browser tab titled "[Human] TaxFlowAI…".

## Overall Impression

Strong, warm raw material (Flo, a real team, 114 five-star reviews, concrete security proof) in a generic frame, slowed by entity jargon and repetition. Biggest opportunity: let Flo show the product doing its job, and say each thing once.

## What's Working

1. Flo as a recurring character whose pose matches each section's job.
2. Security proof instead of shield icons, scoped to stay true.
3. Real trust devices built properly: register link, real staff, links that work without JS, focus rings and reduced motion.

## Priority Issues

[P1] "Encrypted end to end" is not a confirmed claim
- What: page.js:249-250 and security/page.js:50, :170 say "encrypted end to end". Confirmed: at rest plus TLS in transit. The bento says "In transit and at rest".
- Why: misleading-conduct risk on the trust page; four encryption wordings.
- Fix: "encrypted in transit and at rest" in all three places; drop the trust strip, keep the bento, one link to /taxflow/security.
- Suggested command: /impeccable distill

[P1] Two different owners
- What: page.js:118 "owned and built by Frontline Holdings Group" vs GoogleReviewsCarousel.js:111 "owned and built by Frontline Financial Group" (business name from taxflow-proof.js:20). Holdings is correct.
- Why: contradictory ownership on a tax page; four entity names in two scrolls.
- Fix: reviews line "Reviews of the Frontline Financial team behind TaxFlowAI"; registration numbers only in the trust line and footer.
- Suggested command: /impeccable clarify

[P2] The strongest buttons point away from signing up
- What: first solid aqua buttons are "More about us" (page.js:149) and "Explore tax for medical professionals" (MedicalShowcase.js:70); body "Get started" only in the closing band; "Free to sign up" only as 11.5px text at the bottom; three labels for the free call. Owner asked for an awareness-only hero; keep it.
- Fix: "Talk to a human" solid in About, "More about us" as a text link, medical button outline, one call label, drop "Talk to a human first", surface "Free to sign up · you approve every quote" near About.
- Suggested command: /impeccable clarify

[P2] Flo never shows what the product does
- What: hero (page.js:67-81) has no product moment; real app screens only on feature pages. Keep the owner's headline.
- Fix: one real product moment under the headline: a receipt becoming "D5 · Work-related" with Flo's one-line reason, or a real app screen in a phone frame beside Flo.
- Suggested command: /impeccable shape

[P2] Three content widths, and a footer that fails contrast
- What: reviews 32px wider (GoogleReviewsCarousel.js:87, 101); services track -mx-8 (ServicesCarousel.js:222) starts left of the heading, clips a 4th card at 1280px, flush to screen edge on mobile; footer styled by globals.css:513-558 (#0a0a14, centred, legal line #555 11.5px at 2.6:1, links about 4.1:1).
- Fix: shared container for reviews; scroll padding or 2x2 grid for services; footer in brand navy, left-aligned, legal text #94A3B8.
- Suggested command: /impeccable layout

## Persona Red Flags

Jordan: no clear first action or explanation of Flo; free-to-join only on the last line; TAX7 T04 / ASIC / TPB before the product; HELP, AHPRA, Locum & ABN unexplained; three names for one call.
Riley: "0 five-star Google reviews" until the counter runs; contradictory owner lines; four encryption wordings; auto-advance ignores reduced motion; clipped 4th service card.
Casey: 9,588px page; first in-body CTA about 1,500px down; sticky header 13% of screen; 8x8px carousel dots; 2,200px security section on mobile.

## Minor Observations

- Review counter should start at 114, not 0 (GoogleReviewsCarousel.js:32).
- Pause reviews auto-advance under reduced motion; add a pause control.
- Headings jump h2 to footer h4.
- Title Case H1 vs sentence-case headings; inconsistent full stops.
- Gradient text built two ways.
- Mortgage card inside "Everything tax, in one place".
- "Get started" same tab in three places, new tab in footer.
- Footer "Who it's for" omits medical.

## Questions to Consider

1. What happens when the hero sorts one real receipt in front of the visitor?
2. Should the page answer "what is this?" before "is this legitimate?"
3. Should the slot before the closing band go to one audience or route all five?
4. Could the security section be one confident sentence and three proofs?
