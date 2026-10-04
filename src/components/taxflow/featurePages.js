import {
  ReceiptChatMock,
  UploadWizardMock,
  DeductionsMock,
  UploadsFoldersMock,
  FloHelpMock,
  RequestMeetingMock,
  CompanyRegoMock,
} from "@/components/taxflow/PlatformMockups";

/* Content for /taxflow/features/<slug>, from the 4 Oct 2026 feature-pages brief.
   Copy rules that must hold on every page:
   - Australian English
   - no exact lodgement dates, countdowns or "overdue" about tax deadlines; say
     "month estimate" and point to myGov / ATO Online for exact dates
     ("overdue" as a customer-invoice status is fine)
   - no features beyond the brief (no recurring billing, bank feeds or payroll)
   - no fees or prices, except the company registration price
   - images carry their headline baked in, so never repeat that line beside them
   Where the brief marks an image as "coming", the page keeps the phone mock-up. */

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

const STRIPE_FAQ = [
  {
    q: "Do I need a Stripe account?",
    a: "You set one up inside the app in a few minutes. Your money is paid to it directly.",
  },
  {
    q: "Can customers pay by bank transfer?",
    a: "Yes. Your bank details print on the invoice, and you mark it paid in two taps.",
  },
];

const ACCESS_FAQ = {
  q: "How do I get access?",
  a: "Your accountant switches invoicing on for your business.",
};

export const FEATURE_PAGES = [
  {
    slug: "receipt-scanner",
    anchor: "scanner",
    name: "Receipt scanner",
    card: "Snap a receipt and Flo files it in the right account or job folder.",
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
      { title: "Business or personal, sorted for you", body: "Flo works out where a receipt belongs and checks with you when it isn’t sure." },
    ],
    faq: [
      { q: "What can I upload?", a: "A photo from your camera or library, or a file such as a PDF. Any file type works." },
      { q: "What if Flo gets it wrong?", a: "You can change it, and your accountant reviews everything." },
      { q: "Is my data secure?", a: "Yes. See how we protect it on our Data security page.", link: ["/taxflow/security", "Data security"] },
    ],
    related: ["upload-documents", "deductions", "client-uploads"],
  },
  {
    slug: "upload-documents",
    anchor: "upload",
    name: "Upload a document",
    card: "Send your accountant anything in two taps, straight from your phone.",
    title: "Upload tax documents from your phone | TaxFlowAI",
    description:
      "Send documents to your accountant from your phone. Choose the file, choose the account, and it lands in the right folder.",
    h1: "Send your accountant anything, in two taps.",
    intro:
      "Statements, letters, contracts. Choose the file, choose the account it’s for, and it’s with your accountant. No email attachments to chase.",
    mock: <UploadWizardMock />,
    steps: [
      ["Choose the file", "Take a photo, pick from your photo library or choose a file."],
      ["Choose the account it’s for", "Personal, or any business account you have."],
      ["It lands in that account’s folder", "Ready for your accountant, in the right place."],
    ],
    sections: [
      { title: "From your phone", body: "Take a photo of a paper document or pick a file you already have." },
      { title: "Always in the right place", body: "You pick the account, so business and personal documents never mix." },
    ],
    faq: [
      { q: "Which file types can I upload?", a: "Photos, PDFs and other files from your phone or computer." },
      {
        q: "Can I upload for my business and personal at once?",
        a: "Yes. You choose the account for each upload, so each document goes to the right folder.",
      },
      {
        q: "Who can see my documents?",
        a: "You and the accounting team working on your account. Our Privacy Policy has the detail.",
        link: ["/taxflow/privacy-policy", "Privacy Policy"],
      },
    ],
    related: ["receipt-scanner", "client-uploads", "job-tracker"],
  },
  {
    slug: "deductions",
    anchor: "deductions",
    name: "Deductions D1–D9",
    card: "One simple guided page for each ATO deduction label, D1 to D9.",
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
      {
        title: "One page per ATO label",
        body: "From D1 car expenses to D9 gifts and donations, each with its own simple page.",
      },
      {
        title: "D1 car expenses and logbook",
        body: "Add your vehicle and keep a logbook, with trip distances worked out for you.",
      },
      {
        title: "Receipts against the right label",
        body: "Receipts you snap are filed against the right deduction label.",
      },
    ],
    faq: [
      {
        q: "What are D1–D9?",
        a: "They are the ATO’s labels for work-related deductions on an individual tax return, from D1 car expenses to D9 gifts and donations.",
      },
      { q: "Do I still need receipts?", a: "Yes. Keep your records. Snap each receipt and it’s filed against the right label." },
      { q: "Does this replace my accountant?", a: "No. Your registered tax agent reviews and lodges." },
    ],
    related: ["receipt-scanner", "flo", "job-tracker"],
  },
  {
    slug: "accounts",
    anchor: "accounts",
    name: "Accounts",
    card: "Personal, company and trust accounts side by side on one home screen.",
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
    related: ["job-tracker", "client-uploads", "invoicing"],
  },
  {
    slug: "client-uploads",
    anchor: "uploads",
    name: "Client Uploads",
    card: "One tidy, secure folder for every account, organised by job.",
    title: "Client Uploads: one tidy folder per account | TaxFlowAI",
    description:
      "Everything you upload is filed into your account’s secure folder, organised by job, so your accountant never chases attachments.",
    h1: "One tidy folder for every account.",
    intro:
      "Everything you upload is filed into your account’s secure folder, organised by job, so your accountant never has to chase email attachments.",
    mock: <UploadsFoldersMock />,
    steps: [
      ["Upload or snap", "Send a document or a receipt from your phone."],
      ["Filed by account and job", "It goes into that account’s folder, under the right job."],
      ["Your accountant has it", "No attachments to forward and nothing to chase."],
    ],
    sections: [
      { title: "A folder for each account", body: "Personal, company and trust documents stay in their own folders." },
      { title: "A folder for each job", body: "A tax return or a BAS gets its own folder inside the account." },
    ],
    faq: [
      {
        q: "Where are my files stored?",
        a: "In your account’s secure folder. See our Data security page for how we protect it.",
        link: ["/taxflow/security", "Data security"],
      },
      { q: "Can I see what I’ve sent?", a: "Yes. Your uploads are listed under Documents on each account." },
      { q: "Do I need to email documents as well?", a: "No. Once it’s uploaded, your accountant has it." },
    ],
    related: ["upload-documents", "receipt-scanner", "accounts"],
  },
  {
    slug: "invoicing",
    anchor: "invoices",
    name: "Quotes and invoices",
    card: "Send quotes and tax invoices from your phone and get paid by card.",
    title: "Quotes and invoices with Stripe payments | TaxFlowAI",
    description:
      "Send professional quotes and tax invoices from your phone. Customers pay by card with Stripe and the invoice marks itself paid.",
    h1: "Invoice from your phone. Get paid by card.",
    intro:
      "Create a quote or tax invoice in seconds, send it your way, and let your customer pay by card. Switched on for your business by your accountant.",
    hero: I.invoice,
    stripe: { image: true },
    steps: [
      ["Create the quote or invoice", "With a live preview of the real document."],
      ["Send it", "By email, by text or from your own email app."],
      ["Your customer accepts or pays", "They accept the quote or pay the invoice online."],
    ],
    sections: [
      { title: "A live preview as you build", body: "Preview the real document as you build it, so there are no surprises.", image: I.preview },
      { title: "Your logo sets the colours", body: "Upload your logo and your brand colours are picked from it.", image: I.brand },
      {
        title: "Sent from your own business address",
        body: "Invoices go out from your own invoicing address, under your business name. Replies come straight to you.",
        image: I.send,
        image2: I.address,
        more: "invoice-email",
      },
      {
        title: "Customers in seconds",
        body: "Look a customer up on the Australian Business Register and their details fill in for you.",
        image: I.customers,
        more: "customers",
      },
      {
        title: "Or ask Flo to draft it",
        body: "Tell Flo who to invoice and for what. Flo drafts it and asks you to confirm before anything is sent.",
        image: I.floDraft,
        image2: I.floConfirm,
        more: "flo-invoicing",
      },
    ],
    also: [
      "GST worked out automatically. The title becomes “TAX INVOICE” when you’re GST-registered",
      "Saved products and services",
      "Quotes your customer can accept online",
      "Text the invoice link from your own phone",
      "Invoices numbered when sent, so there are no gaps",
      "Statuses at a glance: Draft, Sent, Viewed, Paid, Overdue",
      "Protection against invoice fraud: bank-detail changes are flagged to your customers",
    ],
    faq: [
      ...STRIPE_FAQ,
      {
        q: "Which email address do invoices come from?",
        a: "Your own invoicing address, for example yourbusiness@invoicemail.com.au, under your business name. Replies go to your own email.",
      },
      { q: "Is it a valid tax invoice?", a: "Yes, with your ABN, and GST when you’re registered." },
      ACCESS_FAQ,
    ],
    related: ["get-paid", "invoice-email", "flo-invoicing"],
  },
  {
    slug: "invoice-email",
    anchor: "send",
    name: "Your own business address",
    card: "Invoices go out from your own invoicing address, and replies come to you.",
    title: "Invoices sent from your own business address | TaxFlowAI",
    description:
      "Pick your invoicing address once. Invoices go out automatically under your business name and customer replies come straight to you.",
    h1: "Your invoices, from your own address.",
    intro:
      "Pick your invoicing address once. From then on, invoices go out under your business name and replies come straight to your own email.",
    hero: I.address,
    steps: [
      ["Pick your invoicing address", "For example smith-plumbing@invoicemail.com.au."],
      ["Tap Email it for me", "The email goes out automatically under your business name."],
      ["Replies come to you", "Customer replies land in your own email."],
    ],
    sections: [
      {
        title: "Email it, text it, or use your own app",
        body: "Have the app email it for you, text the link from your own phone, or send from your own email app.",
        image: I.send,
      },
      { title: "Prefer your own domain?", body: "Set up your own domain and send from that instead." },
      { title: "Under your business name", body: "Your customer sees your business, not ours." },
    ],
    faq: [
      { q: "Can I change my address?", a: "Yes, a few times a month." },
      { q: "Will it land in spam?", a: "Emails are signed and authenticated to help them reach the inbox." },
      { q: "Can I use my own domain?", a: "Yes." },
    ],
    related: ["invoicing", "get-paid", "customers"],
  },
  {
    slug: "flo-invoicing",
    anchor: "flo-invoice",
    name: "Invoice by chatting to Flo",
    card: "Tell Flo who to invoice and for what. Nothing is sent until you confirm.",
    title: "Raise invoices by chatting to Flo | TaxFlowAI",
    description:
      "Tell Flo who to invoice and for what. Flo finds the customer, builds the invoice and waits for you to tap Confirm before sending.",
    h1: "Just tell Flo.",
    intro:
      "Say it the way you would to a person. Flo finds the customer, builds the invoice and shows you a summary to check.",
    hero: I.floDraft,
    steps: [
      ["Type what you need", "For example: “Invoice Harbour Café for 2 hours’ labour and a call-out”."],
      ["Flo finds the customer and builds it", "Line items, GST and the total, drafted for you."],
      ["You check and tap Confirm", "Nothing is sent before you do."],
    ],
    sections: [
      {
        title: "You stay in charge",
        body: "Flo asks you to confirm before it emails or texts anything to your customer.",
        image: I.floConfirm,
      },
      { title: "New customer? No problem", body: "Flo can find a business on the Australian Business Register." },
    ],
    faq: [
      { q: "Can Flo send without me?", a: "No. Nothing is sent or charged until you tap Confirm." },
      { q: "Can Flo find new customers?", a: "Yes, from the Australian Business Register." },
      { q: "Is Flo giving tax advice?", a: "No. Flo is an AI assistant. Your accountant gives advice." },
    ],
    related: ["invoicing", "customers", "flo"],
  },
  {
    slug: "get-paid",
    anchor: "get-paid",
    name: "Get paid faster",
    card: "A Pay now button on every invoice, with card payments through Stripe.",
    title: "Get paid faster with Stripe card payments | TaxFlowAI",
    description:
      "Every invoice has a Pay now button. Customers pay by card through Stripe, straight to your own Stripe account, and the invoice marks itself paid.",
    h1: "Get paid faster.",
    intro:
      "Give your customer a Pay now button and the invoice looks after itself. For bank transfers, mark it paid in two taps.",
    hero: I.markPaid,
    stripe: { image: false },
    steps: [
      ["Send the quote or invoice", "By email or text, with a Pay now button on the invoice."],
      ["Your customer accepts or pays", "They accept the quote online or pay the invoice by card."],
      ["It’s marked paid", "Card payments mark themselves paid. Bank transfers take two taps."],
    ],
    sections: [
      { title: "Quotes accepted online", body: "Your customer accepts the quote online, so you both know where things stand." },
      { title: "Statuses at a glance", body: "See what’s Draft, Sent, Viewed, Paid or Overdue without opening each invoice." },
      { title: "Mark paid in two taps", body: "Paid by bank transfer or cash? Record the amount, the method and the date received." },
    ],
    faq: [...STRIPE_FAQ, ACCESS_FAQ],
    related: ["invoicing", "invoice-email", "customers"],
  },
  {
    slug: "customers",
    anchor: "customers",
    name: "Customers",
    card: "Add a customer once by ABN lookup, then reuse them on every invoice.",
    title: "Customer list with ABN lookup | TaxFlowAI",
    description:
      "Add a customer once and reuse them on every quote and invoice. Look them up by ABN or business name, or import from your phone.",
    h1: "Add a customer once. Reuse forever.",
    intro:
      "Look a business up and its details fill in for you. After that, your customer is one tap away on every quote and invoice.",
    hero: I.customers,
    steps: [
      ["Search by ABN or business name", "On the Australian Business Register."],
      ["Details fill in for you", "Check them and save."],
      ["Reuse on every quote and invoice", "Pick the customer and go."],
    ],
    sections: [
      { title: "ABN and business name lookup", body: "Find a business on the Australian Business Register by its ABN or its name." },
      { title: "Import from your phone contacts", body: "Bring a customer across from the contacts you already have." },
      { title: "Address search built in", body: "Start typing an address and pick it from the list." },
    ],
    faq: [
      { q: "Do I have to type in a customer’s details?", a: "No. Look them up by ABN or business name, or import them from your phone contacts." },
      { q: "Can I use a customer again?", a: "Yes. Add them once and reuse them on every quote and invoice." },
      ACCESS_FAQ,
    ],
    related: ["invoicing", "flo-invoicing", "get-paid"],
  },
  {
    slug: "job-tracker",
    anchor: "jobs",
    name: "Job tracker",
    card: "Follow each job through five steps and see what we need from you.",
    title: "Track your tax return, step by step | TaxFlowAI",
    description:
      "Follow your tax return through five steps, see exactly what we need from you, and get a month estimate for each job.",
    h1: "Always know where it’s up to.",
    intro:
      "Every job, like a tax return or a BAS, has its own page. You can see the stage it’s at and what we need from you next.",
    hero: I.jobTracker,
    stepsTitle: "The five stages",
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
    related: ["accounts", "upload-documents", "meetings"],
  },
  {
    slug: "flo",
    anchor: "flo",
    name: "Flo, your AI assistant",
    card: "Ask Flo about the app or what to upload. Hand over to a human any time.",
    title: "Meet Flo, your AI tax assistant | TaxFlowAI",
    description:
      "Ask Flo about the app or what to upload. Flo gives general information only, and you can hand over to your accountant any time.",
    h1: "Questions? Ask Flo. Need a human? Ask us.",
    intro:
      "Flo is on every page of the app. Ask about the app or what to upload, and hand over to your accountant whenever you like.",
    mock: <FloHelpMock />,
    steps: [
      ["Ask Flo", "Type your question on any page."],
      ["Get a plain-English answer", "General information about the app and what to upload."],
      ["Hand over when you want", "Your accountant takes it from there."],
    ],
    sections: [
      { title: "Ask about the app or what to upload", body: "Flo knows the app and can point you to the right place." },
      { title: "General information only", body: "Flo does not give tax advice. Your registered tax agent reviews and signs off." },
      { title: "A human any time", body: "Request a callback or a meeting whenever you’d rather talk to a person." },
    ],
    faq: [
      { q: "Is Flo giving tax advice?", a: "No. Flo is an AI assistant that gives general information. Your accountant gives advice." },
      { q: "What can I ask Flo?", a: "Questions about the app and what to upload." },
      { q: "Can I talk to a person?", a: "Yes. You can hand over to your accountant any time." },
    ],
    related: ["meetings", "flo-invoicing", "receipt-scanner"],
  },
  {
    slug: "meetings",
    anchor: "booking",
    name: "Request a meeting",
    card: "Book a meeting or request a callback from any account or job.",
    title: "Book a meeting with your accountant | TaxFlowAI",
    description:
      "Book a meeting or request a callback from any account or job, so your accountant knows exactly what it’s about.",
    h1: "A human when you need one.",
    intro:
      "Some things are easier to talk through. Ask for a meeting or a callback from the account or job you’re looking at.",
    mock: <RequestMeetingMock />,
    steps: [
      ["Open the account or job", "Start from the thing you want to talk about."],
      ["Book a meeting or request a callback", "Choose what suits you."],
      ["Your accountant picks it up", "They can see which job it’s about."],
    ],
    sections: [
      { title: "From any account or job", body: "Book a meeting or request a callback without leaving the page you’re on." },
      { title: "Your accountant has the context", body: "Your accountant sees which job it’s about, so you don’t have to explain twice." },
    ],
    faq: [
      { q: "Can I ask for a callback instead of a meeting?", a: "Yes. You can request a callback from any account or job." },
      { q: "Will my accountant know what it’s about?", a: "Yes. They see which job you asked from." },
      { q: "Can Flo help first?", a: "Yes. Flo can answer questions about the app and what to upload." },
    ],
    related: ["flo", "job-tracker", "accounts"],
  },
  {
    slug: "company-registration",
    anchor: "company",
    name: "Register a company",
    card: `Register a new company from the app for ${COMPANY_REGISTRATION_PRICE}, lodged by a registered ASIC agent.`,
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
    related: ["accounts", "invoicing", "meetings"],
  },
];

/* The loans page has its own Frontline Financial-branded route. It is listed
   here so sibling pages and the main features page can link to it. */
export const LOANS_PAGE = {
  slug: "loans",
  anchor: "loan",
  name: "Apply for a loan",
  card: "Start a home, car, business or personal loan enquiry with Frontline Financial.",
};

export function featureBySlug(slug) {
  if (slug === LOANS_PAGE.slug) return LOANS_PAGE;
  return FEATURE_PAGES.find((p) => p.slug === slug);
}

export function featureByAnchor(anchor) {
  if (anchor === LOANS_PAGE.anchor) return LOANS_PAGE;
  return FEATURE_PAGES.find((p) => p.anchor === anchor);
}
