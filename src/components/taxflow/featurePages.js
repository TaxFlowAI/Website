/* Content for /taxflow/features/<slug>: one page per feature, nine in all.
   The owner asked (4 Oct 2026) for fewer pages and no page-within-a-page, so the
   invoicing sub-pages (own address, Flo invoicing, get paid, customers), upload a
   document, and request a meeting live inside their parent page. The old URLs
   redirect there (next.config.mjs).
   Pictures are the owner's real app screenshots in phone frames (ids from
   AppScreens.js): `screens` for the hero, `screens` on a section for its row.
   `flo` puts one of the owner's Flo poses beside the hero, with a short line in
   his speech bubble (keep it a friendly aside, never a claim).
   Copy rules that must hold on every page:
   - Australian English
   - no exact lodgement dates, countdowns or "overdue" about tax deadlines; say
     "month estimate" and point to myGov / ATO Online for exact dates
     ("overdue" as a customer-invoice status is fine)
   - no features beyond what the app does (no recurring billing, bank feeds or
     payroll). The app has six client deduction pages: D1 to D5 and D9.
   - no fees or prices, except the company registration price */

import { SHOW_TAX_SERVICES } from "@/data/taxflow-flags";

const IMG = "/images/taxflow/features/";

/* The owner's designed composites (real screen + Flo + headline). Used as the
   social share image for a page; the pages themselves show the raw screens. */
export const FEATURE_IMAGES = {
  accounts: {
    src: `${IMG}accounts-every-entity.webp`,
    alt: "Business account page for Smith Plumbing Pty Ltd showing open jobs, the next job, and quick actions for documents, meetings and invoices",
  },
  jobTracker: {
    src: `${IMG}job-tracker.webp`,
    alt: "Tax return job page showing a five-step progress tracker at the Documents stage, with an Upload documents button",
  },
  invoice: {
    src: `${IMG}invoices-professional.webp`,
    alt: "A tax invoice on a phone with the business’s logo, ABN, customer details and a Mark paid button",
  },
  floDraft: {
    src: `${IMG}flo-invoice-draft.webp`,
    alt: "Chat with Flo showing a drafted invoice with line items, GST and total, waiting for approval",
  },
  loanStart: {
    src: `${IMG}loan-start.webp`,
    alt: "The Apply for a loan card in the TaxFlowAI app, branded Frontline Financial, with Buy a home, Refinance and Car loan options",
  },
};

const I = FEATURE_IMAGES;

/* Fixed price for a new company registration, including GST and the ASIC fee. */
export const COMPANY_REGISTRATION_PRICE = "$1,525";

/* Each page also carries its card on /taxflow/features: tag, tile (the heading),
   line and icon. */
export const FEATURE_PAGES = [
  {
    slug: "invoicing",
    tag: "Run your business",
    tile: "Quotes and invoices, paid by card.",
    line: "Send it from your phone. Your customer taps Pay now.",
    icon: "invoice",
    name: "Quotes and invoices",
    title: "Quote & Invoice App with Card Payments | TaxFlowAI",
    description:
      "Send professional quotes and tax invoices from your phone. Customers pay by card with Stripe and the invoice marks itself paid.",
    h1: "Invoice from your phone. Get paid by card.",
    intro:
      "Create a quote or tax invoice in seconds, send it your way, and let your customer pay by card. Switched on for your business by your accountant.",
    screens: ["invoices-list", "invoice-pay-now"],
    flo: { pose: "present", say: "Who owes you, at a glance." },
    og: I.invoice,
    stripe: true,
    steps: [
      ["Create the quote or invoice", "With a live preview of the real document."],
      ["Send it", "By email, by text or from your own email app."],
      ["Your customer accepts or pays", "They accept the quote or pay the invoice online."],
    ],
    sections: [
      {
        id: "preview",
        title: "A live preview, in your colours",
        body: "See the real document as you build it. Upload your logo once and your invoice colours are picked from it.",
        screens: ["live-preview", "brand-colours"],
      },
      {
        id: "address",
        title: "Sent from your own business address",
        body: "Pick an invoicing address once, like smith-plumbing@invoicemail.com.au. Emails go out under your business name and replies come straight to your own email. Prefer your own domain? Set that up instead, or text the link from your own phone.",
        screens: ["email-it-for-me", "invoicing-address"],
      },
      {
        id: "quotes",
        title: "Quotes they can accept online",
        body: "Your customer opens the quote, types their name, ticks the box and taps Accept. No printing, no scanning.",
        screens: ["quote", "quote-accept"],
      },
      {
        id: "customers",
        title: "Customers in seconds",
        body: "Look a business up by ABN or name on the Australian Business Register and its details fill in for you. Your customer list shows who owes you and what’s overdue, with call and text buttons.",
        screens: ["abn-lookup", "customers-list"],
      },
      {
        id: "flo",
        title: "Or ask Flo to draft it",
        body: "Type “Invoice Harbour Café for 2 hours’ labour and a call-out”. Flo finds the customer, builds the invoice and shows you a summary. Nothing is sent until you tap Confirm.",
        screens: ["flo-chat", "flo-confirm"],
      },
      {
        id: "mark-paid",
        title: "Paid by bank transfer? Two taps",
        body: "Record the amount, how it was paid and the date, and watch what you’re owed shrink.",
        screens: ["mark-paid"],
      },
    ],
    also: [
      "GST worked out automatically. The title becomes “TAX INVOICE” when you’re GST-registered",
      "Saved products and services",
      "Invoices numbered when sent, so there are no gaps",
      "Statuses at a glance: Draft, Sent, Viewed, Paid, Overdue",
      "Protection against invoice fraud: bank-detail changes are flagged to your customers",
    ],
    faq: [
      {
        q: "Do I need a Stripe account?",
        a: "You set one up inside the app in a few minutes. Your money is paid to it directly.",
      },
      {
        q: "Can customers pay by bank transfer?",
        a: "Yes. Your bank details print on the invoice, and you mark it paid in two taps.",
      },
      {
        q: "Which email address do invoices come from?",
        a: "Your own invoicing address, for example yourbusiness@invoicemail.com.au, under your business name. Replies go to your own email. You can change it a few times a month, or use your own domain.",
      },
      { q: "Will my invoices land in spam?", a: "Emails are signed and authenticated to help them reach the inbox." },
      { q: "Can Flo send an invoice without me?", a: "No. Nothing is sent or charged until you tap Confirm." },
      { q: "Is it a valid tax invoice?", a: "Yes, with your ABN, and GST when you’re registered." },
      { q: "How do I get access?", a: "Your accountant switches invoicing on for your business." },
    ],
  },
  {
    slug: "receipt-scanner",
    tag: "Capture",
    tile: "Snap it. Flo files it.",
    line: "Receipts read and saved to the right account.",
    icon: "receipt",
    name: "Receipt scanner",
    title: "Receipt Scanner App for Tax in Australia | TaxFlowAI",
    description:
      "Snap a receipt and Flo reads it, files it under the right account and ATO category, and keeps a PDF record ready for tax time.",
    h1: "Snap a receipt. Flo files it.",
    intro:
      "No more shoeboxes or camera rolls. Take a photo and Flo reads the receipt, asks only what it can’t work out, and saves it where your accountant will find it.",
    screens: ["receipt-question", "receipt-filed"],
    flo: { pose: "receipt", say: "Snap it. I’ll file it." },
    steps: [
      ["Take a photo or pick a file", "Use your camera, your photo library or your files."],
      ["Flo reads it and asks", "Only what it can’t work out, like which account it’s for. It even suggests one."],
      ["It’s saved for you", "To the right account, with a PDF record you can view."],
    ],
    sections: [
      {
        id: "home",
        title: "Right on your home screen",
        body: "The receipt scanner is the first thing you see when you open the app. Drop a receipt in and keep going.",
        screens: ["home"],
      },
      { title: "Any file type", body: "Camera, photo library or a PDF from your files. If you can send it, Flo can take it." },
      { title: "Big, simple buttons", body: "Built for people who aren’t tech people. Tap an answer and you’re done." },
    ],
    faq: [
      { q: "What can I upload?", a: "A photo from your camera or library, or a file such as a PDF. Any file type works." },
      { q: "What if Flo gets it wrong?", a: "You choose the account, and your accountant reviews everything. If you’re not sure, tap “let my accountant decide”." },
      { q: "Is my data secure?", a: "Yes. See how we protect it on our Data security page.", link: ["/taxflow/security", "Data security"] },
    ],
  },
  {
    slug: "deductions",
    tag: "Capture",
    tile: "Every deduction, guided.",
    line: "Car, travel, clothing, study, work costs and donations.",
    icon: "deductions",
    name: "Deductions",
    title: "Work-Related Deductions & Car Logbook App | TaxFlowAI",
    description:
      "Six guided pages for the ATO deduction labels D1 to D5 and D9, with a car logbook, a working-from-home log and receipts filed against each.",
    h1: "Every deduction, guided.",
    intro: SHOW_TAX_SERVICES
      ? "Car, travel, clothing, study, other work costs and donations each get their own simple page, in plain English. You add what applies and your registered tax agent reviews it."
      : "Car, travel, clothing, study, other work costs and donations each get their own simple page, in plain English. You add what applies, with the receipts filed against each one.",
    screens: ["deductions-tiles", "d1-logbook"],
    flo: { pose: "magnifier", say: "I’ll show you where it goes." },
    steps: [
      ["Open the deduction page", "Pick the one that applies, like car expenses or other work-related."],
      ["Add what applies to you", "Follow the prompts and snap the receipts as you go."],
      SHOW_TAX_SERVICES
        ? ["Your tax agent reviews it", "Your registered tax agent checks everything and lodges."]
        : ["It’s ready at tax time", "Every claim and receipt is in one place, filed against its label."],
    ],
    sections: [
      {
        id: "logbook",
        title: "D1: a car logbook that keeps itself",
        body: "Add your vehicle and run a 12-week logbook. Log each trip with where, why and the odometer, and watch your business-use percentage build.",
        screens: ["d1-trips"],
      },
      {
        id: "wfh",
        title: "D5: working from home, logged as you go",
        body: "Log your hours with quick buttons as the days happen, and see your running total for the year.",
        screens: ["d5-wfh-log"],
      },
      {
        title: "Six labels, six simple pages",
        body: "D1 car expenses, D2 travel, D3 clothing, D4 self-education, D5 other work-related and D9 gifts and donations.",
      },
      { title: "Receipts against the right label", body: "Each page has its own upload, so receipts land in the right place first time." },
    ],
    faq: [
      {
        q: "Which deductions are covered?",
        a: "D1 car expenses, D2 travel, D3 clothing, D4 self-education, D5 other work-related expenses (including working from home) and D9 gifts and donations. These are the ATO’s labels on the individual tax return.",
      },
      { q: "Do I still need receipts?", a: "Yes. Keep your records. Snap each receipt and it’s filed against the right label." },
      {
        q: "Does this replace my accountant?",
        a: SHOW_TAX_SERVICES
          ? "No. Your registered tax agent reviews and lodges."
          : "No. It keeps your claims and receipts organised, ready for whoever prepares your return.",
      },
    ],
  },
  {
    slug: "accounts",
    tag: "Organise",
    tile: "Every entity, side by side.",
    line: "Personal, company and trust on one home screen.",
    icon: "accounts",
    name: "Accounts",
    title: "Personal, Company & Trust Tax in One App | TaxFlowAI",
    description:
      "Personal, company and trust accounts side by side. Each one has its own jobs, documents and invoices, on one home screen.",
    h1: "Every entity, organised.",
    intro:
      "Run more than one thing? Your personal, company and trust accounts sit side by side, each with its own page.",
    screens: ["account-overview", "home"],
    flo: { pose: "present", say: "Each account, side by side." },
    og: I.accounts,
    steps: [
      ["Open the app", "Every account you have is on your home screen."],
      ["Tap an account", "See its jobs, documents and invoices on its own page."],
      ["See what’s next", "A Next up card shows the next job and a month estimate."],
    ],
    sections: [
      { title: "Side by side", body: "Personal, company and trust accounts together on one home screen, with the receipt scanner and uploads one tap away." },
      { title: "Its own jobs, documents and invoices", body: "Each account keeps its own work, so nothing gets mixed up." },
      {
        title: "Next up, with a month estimate",
        body: "Each account shows what’s next and a month estimate, with a link to check exact dates on ATO Online or myGov.",
      },
    ],
    faq: [
      { q: "Can I manage my company and personal tax together?", a: "Yes. Each has its own account, and you switch between them from one home screen." },
      { q: "Can my partner have their own account?", a: "Ask your accountant and they can set it up." },
      { q: "Where do I see exact due dates?", a: "We show a month estimate. For exact dates, check myGov or ATO Online." },
    ],
  },
  {
    slug: "job-tracker",
    tag: "Organise",
    tile: "Always know where it’s up to.",
    line: "Five steps, from started to lodged.",
    icon: "tracker",
    name: "Job tracker",
    title: "Track Your Tax Return Progress | TaxFlowAI",
    description:
      "Follow your tax return through five steps, see exactly what we need from you, and get a month estimate for each job.",
    h1: "Always know where it’s up to.",
    intro:
      "Every job, like a tax return or a BAS, has its own page. You can see the stage it’s at and what we need from you next.",
    screens: ["job-tracker"],
    flo: { pose: "clipboard", say: "Here’s your progress." },
    og: I.jobTracker,
    stepsTitle: "The five stages.",
    steps: [
      ["Started", "Your job is open."],
      ["Documents", "We tell you what we need, with an upload button right there."],
      ["Preparing", "Your accountant prepares it."],
      ["Sign-off", "You review and sign."],
      ["Lodged", "It’s lodged."],
    ],
    sections: [
      {
        id: "callback",
        title: "Help from the job itself",
        body: "Request a callback or book a meeting from the job. Pick a topic and the best time, and your accountant knows exactly what it’s about.",
        screens: ["request-callback"],
      },
      { title: "See exactly what we need", body: "The job tells you what’s missing, with an upload button right there." },
      {
        title: "A month estimate for each job",
        body: "Each job shows a month estimate, with a link to myGov or ATO Online for exact dates.",
      },
    ],
    faq: [
      { q: "When will my return be lodged?", a: "We show a month estimate, and your accountant keeps you updated." },
      { q: "What if I’m missing a document?", a: "The job tells you what’s needed." },
      { q: "Where do I see exact due dates?", a: "On myGov, or ATO Online for a business. Each job links you there." },
    ],
  },
  {
    slug: "client-uploads",
    tag: "Organise",
    tile: "One tidy folder per account.",
    line: "Send your accountant anything in two taps.",
    icon: "folder",
    name: "Uploads",
    title: "Upload Tax Documents from Your Phone | TaxFlowAI",
    description:
      "Send documents from your phone in two taps. Everything is filed into your account’s secure folder, organised by job.",
    h1: "One tidy folder for every account.",
    intro:
      "Choose the file, choose the account, and it’s with your accountant. Everything is filed by job, so nobody chases email attachments.",
    screens: ["upload-choose-account"],
    flo: { pose: "folder", say: "Filed and tidy." },
    steps: [
      ["Choose the file", "Take a photo, pick from your photo library or choose a file."],
      ["Choose the account it’s for", "Personal, any business account, or “I’m not sure”."],
      ["It’s filed by job", "Into that account’s secure folder, ready for your accountant."],
    ],
    sections: [
      {
        id: "upload",
        title: "Two taps from your home screen",
        body: "Upload a document sits right under the receipt scanner. Take a photo of a paper document or pick a file you already have, then pick the account.",
        screens: [{ id: "home", shift: "-40%" }],
      },
      { title: "A folder for each account", body: "Personal, company and trust documents stay in their own folders." },
      { title: "A folder for each job", body: "A tax return or a BAS gets its own folder inside the account." },
    ],
    faq: [
      { q: "Which file types can I upload?", a: "Photos, PDFs and other files from your phone or computer." },
      {
        q: "Can I upload for my business and personal at once?",
        a: "Yes. You choose the account for each upload, so each document goes to the right folder.",
      },
      {
        q: "Where are my files stored?",
        a: "In your account’s secure folder. See our Data security page for how we protect it.",
        link: ["/taxflow/security", "Data security"],
      },
      { q: "Can I see what I’ve sent?", a: "Yes. Your uploads are listed under Documents on each account." },
    ],
  },
  {
    slug: "flo",
    tag: "Get help",
    tile: "Ask Flo. Or ask a human.",
    line: "Answers on every page, and a callback when you need one.",
    icon: "chat",
    name: "Flo and your accountant",
    title: "Flo, Your AI Tax Assistant | TaxFlowAI",
    description:
      "Ask Flo about the app or what to upload, and request a callback or meeting with your accountant from any account or job.",
    h1: "Questions? Ask Flo. Need a human? Ask us.",
    intro:
      "Flo is on every page of the app. Ask about the app or what to upload, and reach your accountant whenever you’d rather talk to a person.",
    screens: ["flo-help", "flo-help-end"],
    flo: { pose: "headset", say: "Ask me, or ask your accountant." },
    og: I.floDraft,
    steps: [
      ["Ask Flo", "Type your question on any page."],
      ["Get a plain-English answer", "General information, with links to the right pages."],
      ["Talk to a human when you want", "Request a callback or book a meeting."],
    ],
    sections: [
      {
        id: "meetings",
        title: "A human when you need one",
        body: "Request a callback or book a meeting from any account or job. Your accountant sees which job it’s about, so you don’t explain twice.",
        screens: ["request-callback"],
      },
      { title: "Ask about the app or what to upload", body: "Flo knows the app and links you to the right page." },
      { title: "General information only", body: "Flo does not give tax advice. For what you can claim, Flo points you to your accountant." },
    ],
    faq: [
      { q: "Is Flo giving tax advice?", a: "No. Flo is an AI assistant that gives general information. Your accountant gives advice." },
      { q: "What can I ask Flo?", a: "Questions about the app and what to upload." },
      { q: "Can I ask for a callback instead of a meeting?", a: "Yes. You can request a callback from any account or job." },
    ],
  },
  {
    slug: "company-registration",
    tag: "More services",
    tile: "A new company, from the same app.",
    line: `${COMPANY_REGISTRATION_PRICE} including GST and the ASIC fee.`,
    icon: "company",
    name: "Register a company",
    title: "Register a Company in Australia Online | TaxFlowAI",
    description: `Register a new company online for ${COMPANY_REGISTRATION_PRICE} including GST and the ASIC fee. Lodged by a registered ASIC agent, then run it from the same app.`,
    h1: "A new company, from the same app.",
    intro: `Apply in the app and we lodge it with ASIC. Fixed price ${COMPANY_REGISTRATION_PRICE}, including GST and the ASIC fee.`,
    screens: ["company-form", "company-status"],
    flo: { pose: "stamp", say: "Let’s register your company." },
    steps: [
      ["Apply in the app", "Five short sections: name, address, people, director ID and terms."],
      ["We lodge it with ASIC", "Lodged by Frontline Holdings Group Pty Ltd trading as TaxFlowAI by Frontline Financial, ASIC agent 51843."],
      ["Manage its tax in the same place", "Your new company gets its own account in the app."],
    ],
    sections: [
      {
        id: "people",
        title: "Directors and shareholders, one at a time",
        body: "Add each person, tick their roles and fill in their details. Flo tells you what it needs next.",
        screens: ["company-form-people"],
      },
      { title: "Save your progress", body: "Come back any time and pick up your application where you left off." },
      {
        title: "Lodged by a registered ASIC agent",
        body: "Your application is lodged with ASIC by Frontline Holdings Group Pty Ltd trading as TaxFlowAI by Frontline Financial, ASIC agent 51843.",
      },
      {
        title: "Then run it from the same place",
        body: "Manage the company’s tax in the same app, and its ASIC paperwork too.",
        link: ["/taxflow/corporate-secretarial", "See corporate secretarial services"],
      },
    ],
    faq: [
      { q: "How much does it cost?", a: `${COMPANY_REGISTRATION_PRICE}, including GST and the ASIC fee.` },
      { q: "Who lodges the application?", a: "Frontline Holdings Group Pty Ltd trading as TaxFlowAI by Frontline Financial, a registered ASIC agent (51843)." },
      { q: "Can I stop and come back later?", a: "Yes. Your progress is saved." },
    ],
  },
];

/* The loans page has its own Frontline Financial-branded route. It is listed
   here so the features page and sibling pages can link to it. */
export const LOANS_PAGE = {
  slug: "loans",
  tag: "Frontline Financial",
  tile: "Need finance? Start here.",
  line: "Home, car, business and personal loan enquiries, right from your portal.",
  icon: "home",
  name: "Apply for a loan",
};

/* Every feature, in the order the features page shows them. */
export const ALL_FEATURES = [...FEATURE_PAGES, LOANS_PAGE];

export function featureBySlug(slug) {
  return ALL_FEATURES.find((p) => p.slug === slug);
}
