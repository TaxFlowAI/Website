import {
  ReceiptChatMock,
  UploadWizardMock,
  DeductionsMock,
  UploadsFoldersMock,
  FloHelpMock,
  RequestMeetingMock,
  CompanyRegoMock,
} from "@/components/taxflow/PlatformMockups";

/* Content for /taxflow/features/<slug>: one page per feature, nine in all.
   The owner asked (4 Oct 2026) for fewer pages and no page-within-a-page, so the
   invoicing sub-pages (own address, Flo invoicing, get paid, customers), upload a
   document, and request a meeting live inside their parent page. The old URLs
   redirect there (next.config.mjs).
   Copy rules that must hold on every page:
   - Australian English
   - no exact lodgement dates, countdowns or "overdue" about tax deadlines; say
     "month estimate" and point to myGov / ATO Online for exact dates
     ("overdue" as a customer-invoice status is fine)
   - no features beyond the brief (no recurring billing, bank feeds or payroll)
   - no fees or prices, except the company registration price
   - images carry their headline baked in, so never repeat that line beside them
   Where no app image exists yet, the page uses a phone mock-up. */

const IMG = "/images/taxflow/features/";

export const FEATURE_IMAGES = {
  home: {
    src: `${IMG}home-everything-in-one-place.webp`,
    alt: "TaxFlowAI home screen with the Flo receipt scanner, upload a document, quotes and invoices, and a list of the client’s accounts",
  },
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
  preview: {
    src: `${IMG}invoices-live-preview.webp`,
    alt: "Draft invoice in preview mode showing exactly what the customer will receive",
  },
  brand: {
    src: `${IMG}invoices-brand-colours.webp`,
    alt: "Branding settings where the business’s colours are picked from its uploaded logo",
  },
  send: {
    src: `${IMG}send-email-it-for-me.webp`,
    alt: "Send invoice sheet with Email it for me from the business’s own invoicing address, Text it, or send from your own email app",
  },
  address: {
    src: `${IMG}send-invoicing-address.webp`,
    alt: "Invoicing settings showing the business’s own invoicing email address and that customer replies go to the owner’s email",
  },
  floDraft: {
    src: `${IMG}flo-invoice-draft.webp`,
    alt: "Chat with Flo showing a drafted invoice with line items, GST and total, waiting for approval",
  },
  floConfirm: {
    src: `${IMG}flo-invoice-confirm.webp`,
    alt: "Flo asking the owner to confirm before texting the invoice to the customer",
  },
  markPaid: {
    src: `${IMG}get-paid-mark-paid.webp`,
    alt: "Mark invoice paid sheet with amount, payment method and date received",
  },
  customers: {
    src: `${IMG}customers-abn-lookup.webp`,
    alt: "New customer form with an ABN looked up on the Australian Business Register and details filled in automatically",
  },
  loanStart: {
    src: `${IMG}loan-start.webp`,
    alt: "The Apply for a loan card in the TaxFlowAI app, branded Frontline Financial, with Buy a home, Refinance and Car loan options",
  },
  loanChoose: {
    src: `${IMG}loan-choose.webp`,
    alt: "Loan type picker with home, vehicle, business and personal options",
  },
  loanBroker: {
    src: `${IMG}loan-broker.webp`,
    alt: "Enquiry sent confirmation saying a Frontline Financial broker will reach out",
  },
};

const I = FEATURE_IMAGES;

/* Fixed price for a new company registration, including GST and the ASIC fee. */
export const COMPANY_REGISTRATION_PRICE = "$1,525";

/* Each page also carries its tile on /taxflow/features: tag, tile (the heading),
   line and icon. */
export const FEATURE_PAGES = [
  {
    slug: "invoicing",
    tag: "Run your business",
    tile: "Quotes and invoices, paid by card.",
    line: "Send it from your phone. Your customer taps Pay now.",
    icon: "invoice",
    name: "Quotes and invoices",
    title: "Quotes and invoices with Stripe payments | TaxFlowAI",
    description:
      "Send professional quotes and tax invoices from your phone. Customers pay by card with Stripe and the invoice marks itself paid.",
    h1: "Invoice from your phone. Get paid by card.",
    intro:
      "Create a quote or tax invoice in seconds, send it your way, and let your customer pay by card. Switched on for your business by your accountant.",
    hero: I.invoice,
    stripe: true,
    steps: [
      ["Create the quote or invoice", "With a live preview of the real document."],
      ["Send it", "By email, by text or from your own email app."],
      ["Your customer accepts or pays", "They accept the quote or pay the invoice online."],
    ],
    sections: [
      {
        id: "preview",
        title: "A live preview as you build",
        body: "See the real document as you build it, so there are no surprises for you or your customer.",
        image: I.preview,
      },
      {
        id: "branding",
        title: "Your logo sets the colours",
        body: "Upload your logo once and your invoice colours are picked from it.",
        image: I.brand,
      },
      {
        id: "address",
        title: "Sent from your own business address",
        body: "Pick an invoicing address once, like smith-plumbing@invoicemail.com.au. Emails go out under your business name and replies come straight to your own email. Prefer your own domain? Set that up instead, or text the link from your own phone.",
        image: I.send,
        image2: I.address,
      },
      {
        id: "customers",
        title: "Customers in seconds",
        body: "Look a business up by ABN or name on the Australian Business Register and its details fill in for you. Or import from your phone contacts, with address search built in.",
        image: I.customers,
      },
      {
        id: "flo",
        title: "Or ask Flo to draft it",
        body: "Type “Invoice Harbour Café for 2 hours’ labour and a call-out”. Flo finds the customer, builds the invoice and shows you a summary. Nothing is sent until you tap Confirm.",
        image: I.floDraft,
        image2: I.floConfirm,
      },
    ],
    also: [
      "GST worked out automatically. The title becomes “TAX INVOICE” when you’re GST-registered",
      "Saved products and services",
      "Quotes your customer can accept online",
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
    line: "Receipts read, sorted and filed for you.",
    icon: "receipt",
    name: "Receipt scanner",
    title: "Receipt scanner: snap it, Flo files it | TaxFlowAI",
    description:
      "Take a photo of a receipt and Flo reads it, asks only what it can’t work out and files it in the right account or job folder.",
    h1: "Snap a receipt. Flo files it.",
    intro:
      "No more shoeboxes or camera rolls. Take a photo and Flo reads the receipt, asks only what it can’t work out, and files it where your accountant will find it.",
    mock: <ReceiptChatMock />,
    steps: [
      ["Take a photo or pick a file", "Use your camera, your photo library or your files."],
      ["Flo reads it and asks", "Only what it can’t work out, like which account it’s for."],
      ["It’s filed for you", "In the right account or job folder, with a PDF of the conversation."],
    ],
    sections: [
      { title: "Any file type", body: "Camera, photo library or a PDF from your files. If you can send it, Flo can take it." },
      { title: "Big, simple buttons", body: "Built for people who aren’t tech people. Tap an answer and you’re done." },
      { title: "Business or personal, sorted", body: "Flo works out where a receipt belongs and checks with you when it isn’t sure." },
    ],
    faq: [
      { q: "What can I upload?", a: "A photo from your camera or library, or a file such as a PDF. Any file type works." },
      { q: "What if Flo gets it wrong?", a: "You can change it, and your accountant reviews everything." },
      { q: "Is my data secure?", a: "Yes. See how we protect it on our Data security page.", link: ["/taxflow/security", "Data security"] },
    ],
  },
  {
    slug: "deductions",
    tag: "Capture",
    tile: "Every deduction, guided.",
    line: "D1 to D9, one simple page each.",
    icon: "deductions",
    name: "Deductions D1–D9",
    title: "Guided work-related deductions D1–D9 | TaxFlowAI",
    description:
      "One simple guided page for each ATO deduction label, from D1 car expenses to D9 gifts and donations, with receipts filed against the right label.",
    h1: "Every deduction, guided.",
    intro:
      "Each ATO deduction label gets its own simple page, in plain English. You add what applies to you and your registered tax agent reviews it.",
    mock: <DeductionsMock />,
    steps: [
      ["Open the deduction page", "Pick the label that applies, like car expenses or working from home."],
      ["Add what applies to you", "Follow the prompts and snap the receipts as you go."],
      ["Your tax agent reviews it", "Your registered tax agent checks everything and lodges."],
    ],
    sections: [
      { title: "One page per ATO label", body: "From D1 car expenses to D9 gifts and donations, each with its own simple page." },
      { title: "D1 car expenses and logbook", body: "Add your vehicle and keep a logbook, with trip distances worked out for you." },
      { title: "Receipts against the right label", body: "Receipts you snap are filed against the right deduction label." },
    ],
    faq: [
      {
        q: "What are D1–D9?",
        a: "They are the ATO’s labels for work-related deductions on an individual tax return, from D1 car expenses to D9 gifts and donations.",
      },
      { q: "Do I still need receipts?", a: "Yes. Keep your records. Snap each receipt and it’s filed against the right label." },
      { q: "Does this replace my accountant?", a: "No. Your registered tax agent reviews and lodges." },
    ],
  },
  {
    slug: "accounts",
    tag: "Organise",
    tile: "Every entity, side by side.",
    line: "Personal, company and trust on one home screen.",
    icon: "accounts",
    name: "Accounts",
    title: "All your entities in one app | TaxFlowAI",
    description:
      "Personal, company and trust accounts side by side. Each one has its own jobs, documents and invoices, on one home screen.",
    h1: "Every entity, organised.",
    intro:
      "Run more than one thing? Your personal, company and trust accounts sit side by side, each with its own page.",
    hero: I.accounts,
    steps: [
      ["Open the app", "Every account you have is on your home screen."],
      ["Tap an account", "See its jobs, documents and invoices on its own page."],
      ["See what’s next", "A Next up card shows the next job and a month estimate."],
    ],
    sections: [
      {
        title: "Side by side",
        body: "Personal, company and trust accounts together on one home screen, with the receipt scanner and uploads one tap away.",
        image: I.home,
      },
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
    title: "Track your tax return, step by step | TaxFlowAI",
    description:
      "Follow your tax return through five steps, see exactly what we need from you, and get a month estimate for each job.",
    h1: "Always know where it’s up to.",
    intro:
      "Every job, like a tax return or a BAS, has its own page. You can see the stage it’s at and what we need from you next.",
    hero: I.jobTracker,
    stepsTitle: "The five stages.",
    steps: [
      ["Started", "Your job is open."],
      ["Documents", "We tell you what we need, with an upload button right there."],
      ["Preparing", "Your accountant prepares it."],
      ["Sign-off", "You review and sign."],
      ["Lodged", "It’s lodged."],
    ],
    sections: [
      { title: "See exactly what we need", body: "The job tells you what’s missing, with an upload button right there." },
      {
        title: "A month estimate for each job",
        body: "Each job shows a month estimate, with a link to myGov or ATO Online for exact dates.",
      },
      { title: "Help from the job itself", body: "Request a callback or book a meeting from the job, so your accountant knows what it’s about." },
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
    title: "Client Uploads: one tidy folder per account | TaxFlowAI",
    description:
      "Send documents from your phone in two taps. Everything is filed into your account’s secure folder, organised by job.",
    h1: "One tidy folder for every account.",
    intro:
      "Choose the file, choose the account, and it’s with your accountant. Everything is filed by job, so nobody chases email attachments.",
    mock: <UploadsFoldersMock />,
    steps: [
      ["Choose the file", "Take a photo, pick from your photo library or choose a file."],
      ["Choose the account it’s for", "Personal, or any business account you have."],
      ["It’s filed by job", "Into that account’s secure folder, ready for your accountant."],
    ],
    sections: [
      {
        id: "upload",
        title: "Two taps from your phone",
        body: "Take a photo of a paper document or pick a file you already have, then pick the account. Done.",
        visual: <UploadWizardMock />,
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
    line: "Answers on every page, and a meeting when you need one.",
    icon: "chat",
    name: "Flo and your accountant",
    title: "Meet Flo, your AI tax assistant | TaxFlowAI",
    description:
      "Ask Flo about the app or what to upload, and book a meeting or callback with your accountant from any account or job.",
    h1: "Questions? Ask Flo. Need a human? Ask us.",
    intro:
      "Flo is on every page of the app. Ask about the app or what to upload, and book your accountant whenever you’d rather talk to a person.",
    mock: <FloHelpMock />,
    steps: [
      ["Ask Flo", "Type your question on any page."],
      ["Get a plain-English answer", "General information about the app and what to upload."],
      ["Talk to a human when you want", "Book a meeting or request a callback."],
    ],
    sections: [
      {
        id: "meetings",
        title: "A human when you need one",
        body: "Book a meeting or request a callback from any account or job. Your accountant sees which job it’s about, so you don’t explain twice.",
        visual: <RequestMeetingMock />,
      },
      { title: "Ask about the app or what to upload", body: "Flo knows the app and can point you to the right place." },
      { title: "General information only", body: "Flo does not give tax advice. Your registered tax agent reviews and signs off." },
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
    title: "Register a new company online | TaxFlowAI",
    description: `Apply for a new company in the app for ${COMPANY_REGISTRATION_PRICE} including GST and the ASIC fee. Lodged by a registered ASIC agent.`,
    h1: "A new company, from the same app.",
    intro: `Apply in the app and we lodge it with ASIC. Fixed price ${COMPANY_REGISTRATION_PRICE}, including GST and the ASIC fee.`,
    mock: <CompanyRegoMock />,
    steps: [
      ["Apply in the app", "Company name, directors, shareholders and registered office."],
      ["We lodge it with ASIC", "Lodged by Frontline Holdings Group Pty Ltd, ASIC agent 51843."],
      ["Manage its tax in the same place", "Your new company gets its own account in the app."],
    ],
    sections: [
      { title: "Save your progress", body: "Apply in the app and come back to it whenever you like." },
      {
        title: "Lodged by a registered ASIC agent",
        body: "Your application is lodged with ASIC by Frontline Holdings Group Pty Ltd, ASIC agent 51843.",
      },
      {
        title: "Then run it from the same place",
        body: "Manage the company’s tax in the same app, and its ASIC paperwork too.",
        link: ["/taxflow/corporate-secretarial", "See corporate secretarial services"],
      },
    ],
    faq: [
      { q: "How much does it cost?", a: `${COMPANY_REGISTRATION_PRICE}, including GST and the ASIC fee.` },
      { q: "Who lodges the application?", a: "Frontline Holdings Group Pty Ltd, a registered ASIC agent (51843)." },
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
