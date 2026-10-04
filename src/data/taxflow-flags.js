/* Temporary switch (owner, 4 Oct 2026). While false, the TaxFlowAI site does
   not mention TAX7 T04 PTY LTD (the registered tax agent) and does not advertise
   tax preparation services:
   - /taxflow/tax-preparation and /taxflow/for/medical-professionals redirect
     to /taxflow and leave the sitemap
   - the Tax preparation card, the medical showcase, the tax-return Google
     reviews, the "switch accountant" module and the tax-agent FAQs are hidden
   - copy that names TAX7 T04 or says registered tax agents prepare and lodge
     returns uses its alternative wording
   Everything is still built. Set this to true to bring it all back.
   Not switched: the legal documents (src/data/compliance-content.js and the
   entity box and "Verify Tax Agent" link in CompliancePage.js).
   Switched back on 5 Oct 2026 at the owner's request. */
export const SHOW_TAX_SERVICES = true;
