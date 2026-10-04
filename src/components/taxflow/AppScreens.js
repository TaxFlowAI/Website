import Image from "next/image";

/* Real TaxFlowAI app screenshots (the owner's own captures: demo business
   "Smith Plumbing", Jamie Smith, fictional customers). Shown exactly as
   supplied, inside CSS phone frames. Never edit the files; to show a lower part
   of a screen use a "-scrolled" capture or `shift`.
   Alt text describes the screen, not a marketing line. */

const APP = "/images/taxflow/app/";
const SMALL = { w: 585, h: 1266 };
const LARGE = { w: 780, h: 1688 };

export const SCREENS = {
  /* invoicing */
  "invoices-list": { ...LARGE, alt: "Quotes and invoices list for Smith Plumbing showing amounts owed and overdue, with each invoice’s status" },
  "invoice-document": { ...SMALL, alt: "Invoice INV-0006 in the app showing the branded tax invoice and a Mark paid button" },
  "live-preview": { ...SMALL, alt: "Draft invoice in preview mode showing exactly what the customer will receive" },
  "brand-colours": { ...SMALL, alt: "Branding settings where the invoice colours are picked from the business’s uploaded logo" },
  "email-it-for-me": { ...SMALL, alt: "Send invoice sheet with Email it for me from the business’s own invoicing address, Text it, or send from your own email app" },
  "invoicing-address": { ...SMALL, alt: "Invoicing settings showing the business’s own invoicing email address and that customer replies go to the owner" },
  "mark-paid": { ...SMALL, alt: "Mark invoice paid sheet with the amount received, payment method and date" },
  "abn-lookup": { ...SMALL, alt: "New customer form with an ABN looked up on the Australian Business Register and the details filled in" },
  "customers-list": { ...LARGE, alt: "Customer list showing who owes money and how much is overdue, with call and text buttons for each customer" },
  "flo-chat": { ...SMALL, alt: "Flo chat showing a drafted invoice for Harbour Café with line items, GST and total, waiting for approval" },
  "flo-confirm": { ...SMALL, alt: "Flo asking the owner to tap Confirm before texting the invoice to the customer" },
  "invoice-pay-now": { ...LARGE, light: true, alt: "Customer-facing tax invoice from Smith Plumbing to Oakwood Builders with line items and GST" },
  "invoice-pay-now-bottom": { ...LARGE, light: true, alt: "Bottom of a customer invoice showing bank transfer details, the amount due and a Pay now by card button" },
  "invoice-paid": { ...LARGE, alt: "Invoice INV-0008 shown as paid, with the amount, paid date and a note that the customer viewed it" },
  "invoice-paid-payments": { ...LARGE, alt: "Invoice payments showing a card payment through Stripe and an activity log of created, sent, viewed and paid" },
  quote: { ...LARGE, light: true, alt: "Customer-facing quote from Smith Plumbing to Harbour Café" },
  "quote-accept": { ...LARGE, light: true, alt: "Bottom of a quote with the total, terms and an accept form with the customer’s name entered and the box ticked" },
  /* capture */
  home: { ...LARGE, alt: "TaxFlowAI home screen with the Flo receipt scanner, upload a document, quotes and invoices, and the client’s accounts" },
  "receipt-question": { ...LARGE, alt: "Flo receipt chat summarising a receipt from Parramatta Trade Supplies and asking which account it belongs to, with account buttons" },
  "receipt-filed": { ...LARGE, alt: "Flo receipt chat confirming the receipt was saved to Smith Plumbing Pty Ltd, with buttons to view the PDF record or upload another" },
  "upload-choose-account": { ...LARGE, alt: "Upload sheet asking which account a document is for, listing the company and personal accounts and an I’m not sure option" },
  deductions: { ...LARGE, alt: "Personal tax account on the Deductions tab, showing work-related deduction tiles" },
  "deductions-tiles": { ...LARGE, alt: "Grid of six deduction pages: car expenses, travel, clothing, self-education, other work-related, and gifts and donations" },
  "d1-logbook": { ...LARGE, alt: "Active vehicle logbook for a Toyota HiLux at week 2 of 12, showing business use, trips and kilometres" },
  "d1-trips": { ...LARGE, alt: "List of logged car trips with dates, start and end addresses, odometer readings, distance and purpose" },
  "d5-other-work": { ...LARGE, alt: "Other work-related expenses page showing receipts, an estimate and an upload area" },
  "d5-wfh-log": { ...LARGE, alt: "Working-from-home hours log with quick hour buttons and a monthly list of logged days" },
  /* organise */
  "account-overview": { ...LARGE, alt: "Business account page for Smith Plumbing Pty Ltd showing open jobs, the next job with a month estimate, and quick actions" },
  "personal-account": { ...SMALL, alt: "Personal tax account with the D1 car expenses section and the Frontline Financial apply for a loan card" },
  "job-tracker": { ...SMALL, alt: "Tax return job page with a five-step tracker at the Documents stage, an Upload documents button and a myGov link" },
  "request-callback": { ...LARGE, alt: "Request a callback form on a tax return job with topic, message and best time to call" },
  /* help */
  "flo-help": { ...LARGE, alt: "Flo answering what to upload for a tax return, labelled AI assistant, not tax advice" },
  "flo-help-end": { ...LARGE, alt: "End of a Flo answer pointing to the accountant for what can be claimed, with suggested follow-up questions" },
  /* more services */
  "company-form": { ...LARGE, alt: "Company registration form at step 3 of 5, with three proposed company names entered" },
  "company-form-people": { ...LARGE, alt: "Company registration form adding a second person as a shareholder" },
  "company-status": { ...LARGE, alt: "ASIC page showing the company registration price and an application in progress at documents signed" },
  "loan-choose": { ...SMALL, light: true, alt: "Frontline Financial loan enquiry asking what you are looking for, with home, vehicle and business options" },
  "loan-details": { ...SMALL, light: true, alt: "Loan enquiry details: when you need it, how the broker should contact you, and the credit representative disclosure" },
  "loan-sent": { ...SMALL, light: true, alt: "Enquiry sent: a Frontline Financial broker will reach out to discuss the loan" },
  /* security */
  "two-factor": { ...LARGE, alt: "Sign-in verification screen asking for a six-digit code sent by text, with options to resend by email or SMS" },
};

/* One screenshot in a phone frame. `decorative` drops the alt text (use it
   when the phone sits inside a link whose heading already names it). */
export function Phone({ id, decorative = false, priority = false, back = false, sizes = "260px", shift }) {
  const s = SCREENS[id];
  return (
    <span className={`tc-dev ${back ? "is-back" : ""} ${s.light ? "is-light" : ""}`}>
      <span className="tc-dev-screen">
        <Image
          src={`${APP}${id}.jpg`}
          alt={decorative ? "" : s.alt}
          width={s.w}
          height={s.h}
          sizes={sizes}
          quality={90}
          priority={priority}
          style={shift ? { "--shift": shift } : undefined}
        />
      </span>
    </span>
  );
}

/* One or two phones on a glowing stage.
   hero:    whole phones, the second set lower (second hidden on phones)
   row:     a panel that shows the top of each phone and fades out
   compact: a shorter row, for tight columns
   On narrow screens a two-phone row becomes a sideways swipe.
   tone="light" for the Frontline Financial-branded loans page.
   flo={{ pose, say }} puts Flo beside a hero, with his speech bubble as live
   text. Poses are the owner's approved renders in /images/taxflow/flo/
   (transparent, unedited): clipboard, folder, headset, keys, magnifier,
   present, receipt, stamp. */
export function PhoneStage({ shots, variant = "row", tone = "dark", priority = false, flo }) {
  const multi = shots.length > 1;
  return (
    <div
      className={`tc-ps is-${variant} ${multi ? "is-multi" : ""} ${tone === "light" ? "is-on-light" : ""} ${flo ? "has-flo" : ""}`}
    >
      <div className="tc-ps-track">
        {shots.map((shot, i) => {
          const { id, shift } = typeof shot === "string" ? { id: shot } : shot;
          return <Phone key={id} id={id} shift={shift} back={i > 0} priority={priority && i === 0} />;
        })}
      </div>
      {flo && (
        <div className="tc-ps-flo float-animate">
          <p className="tc-ps-bubble">{flo.say}</p>
          <Image
            src={`/images/taxflow/flo/flo-${flo.pose}.webp`}
            alt=""
            width={1254}
            height={1254}
            sizes="(min-width: 640px) 200px, 130px"
          />
        </div>
      )}
    </div>
  );
}
