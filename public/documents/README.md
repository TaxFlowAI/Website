# Compliance documents

The "Download (PDF)" buttons on the Credit Guide and Privacy Consent pages serve these files. They are printed from
the pages themselves (white background, no site menus), so each PDF matches its web page.

| File | Page |
| --- | --- |
| credit-guide.pdf | /credit-guide (home loans, AFG) |
| privacy-consent.pdf | /privacy-consent (home loans, AFG's form) |
| credit-guide-asset-solutions.pdf | /credit-guide-asset-solutions (Asset Solutions, Fintelligence) |
| privacy-consent-asset-solutions.pdf | /privacy-consent-asset-solutions (Asset Solutions) |

## When a page changes

1. Edit the page, and bump that business's date in `CONSENT_DOCS` in `src/config/consent.js`. Every lead's consent
   record quotes that date, so the record always names the version the person agreed to.
2. Stop the dev server, then run `npm run build` and `npm run start -- -p 3006`.
3. Run `node scripts/build-legal-pdfs.mjs` to reprint all four PDFs, and commit them with the page change.

Never put a signed copy from Ambition Cloud or Broker Engine here. Those hold a client's name and signature.
