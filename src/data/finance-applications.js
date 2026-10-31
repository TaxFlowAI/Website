import { ENTITY } from "@/config/entities";

/* The finance applications behind the home page selector and /apply/<slug>.
   Each one is a list of steps. A step's `label` is the short name used in the
   summary, the email and the Broker Engine card notes. `showIf` hides a step
   unless the earlier answers call for it. Options on a first step have an id so
   the selector can link straight past it (/apply/home-loan?start=buy-home).
   `notes` are shown on the next screen when that answer is picked, at the points
   where people decide they won't qualify.

   Keep the questions few: the broker's fact find collects the rest. No licence,
   Medicare or tax file numbers, date of birth or bank details here: these answers
   travel by email.

   Selling copy reuses wording already approved for the site and the "Just settled"
   posts. Never promise approval, and never call the Asset Solutions service free:
   its assessment is free, but its Credit Guide & Quote can include a fee. Never
   promise that Hassan or Sham personally calls: someone from the team makes the
   first call. Hassan stays involved, and home loan clients talk with him through
   the process. */

export const TEAM_PHONE = { display: "+61 422 959 486", link: "tel:+61422959486" };

const BROKERS = {
  hassan: {
    name: "Hassan",
    fullName: "Hassan Arif JP",
    title: "Mortgage & Finance Broker",
    photo: "/images/avatars/hassan.webp",
    proof: "Tax and accounting background",
  },
  sham: {
    name: "Sham",
    fullName: "Sham",
    title: "Asset Finance Specialist",
    photo: "/images/avatars/sham.webp",
    proof: "Winner, Fintelligence Broker Awards FY25, Vehicle and Equipment Finance",
  },
};

const TIMING_OPTIONS = ["As soon as possible", "Within 3 months", "3 to 6 months", "Just exploring"];
const YES_NO = ["Yes", "No"];
const YES_NO_UNSURE = ["Yes", "No", "Not sure"];
const TRADING_OPTIONS = ["Less than 1 year", "1 to 2 years", "2 years or more"];
const STRUCTURE_OPTIONS = ["Sole trader", "Company", "Trust", "Partnership"];
const SELF_EMPLOYED = ["Sole trader", "Company director", "Through a trust", "Contractor on an ABN"];

const NEW_BUSINESS_NOTE = "A new company doesn't always mean starting from zero. Time trading as a sole trader can count with some lenders.";

const credit = (section) => ({
  key: "credit",
  section,
  label: "Credit history",
  question: "How's your credit history?",
  options: ["Clean, as far as I know", "A few late payments", "A default or judgement", "Not sure"],
  notes: {
    "A default or judgement": "A default doesn't always rule you out. It depends what it was, how old it is and whether it's paid.",
  },
});

const propertyOwner = (section, note) => ({
  key: "property",
  section,
  label: "Property owner",
  question: "Do you own property?",
  options: YES_NO,
  notes: { No: note },
});

const isSelfEmployed = (a) => SELF_EMPLOYED.includes(a.income);
const hasBusinessUse = (a) =>
  isSelfEmployed(a) || a.vehicleUse === "A car for my business" || a.vehicleUse === "A ute or van for work";

/* Shared by every Asset Solutions application */
const ASSET_INTRO = "A few quick questions, then someone from our team calls you to go through your options across 30+ lenders. Free assessment, no obligation.";
const ASSET_PROOF = "5.0 stars on Google from 100+ reviews. 30+ lenders.";
const ASSET_NEXT_STEPS = [
  { title: "Sign your privacy consent", desc: "We email you a secure link. We need it before we can check your options with lenders, and it includes our Credit Guide and Quote." },
  { title: "We call you", desc: "Someone from our team calls within one business day to go through your situation. Not a call centre." },
  { title: "You see your options", desc: "We check 30+ lenders, then explain the repayments, fees and trade-offs in plain English. No obligation." },
  { title: "We handle the paperwork", desc: "If you decide to go ahead, we take it to the lender and deal with them for you." },
];
const ASSET_AFTER_SUBMIT = [
  "Someone from our team calls you within one business day.",
  "We check your situation against 30+ lenders and tell you where it fits.",
  "If it fits and you want to go ahead, we handle the paperwork.",
];
const ASSET_QUESTIONS = [
  {
    q: "Is this the full loan application?",
    a: "Not yet. It gives our team what we need to call you with a straight answer. We also email you a privacy consent to sign, which we need before we can check your options with lenders. If there's a fit, we take you through the documents and the formal application. Nothing goes to a lender without your authority.",
  },
  {
    q: "Do you charge for this?",
    a: "The assessment is free and there is no obligation. If we arrange finance, the lender pays us a commission, and any fee is set out in your Credit Guide & Quote before you decide to go ahead.",
  },
  {
    q: "Will this affect my credit score?",
    a: "Sending this doesn't run a credit check. Your assessment can include one, with your consent, and that doesn't lodge an application with any lender. An application only goes in with your authority.",
  },
  {
    q: "How fast is it?",
    a: "Once we have your documents, approvals on straightforward deals often come back within a few business days. We'll give you a realistic timeframe on the call.",
  },
];
const DEFAULT_QUESTION = {
  q: "I have a default. Is it worth applying?",
  a: "Often yes. It depends on what the default was, how old it is and whether it is paid. Send it to us before you apply anywhere else, because every application shows on your file.",
};
const NEW_ABN_QUESTION = {
  q: "My ABN is new and I have no financials.",
  a: "Some lenders have no minimum trading history and some offer low doc options. Loan size and rate can be affected. We will tell you straight.",
};

const homeLoan = {
  slug: "home-loan",
  tab: "Home",
  title: "Home loan application",
  headline: ["Your home loan,", "sorted."],
  serviceLabel: "Home loan application",
  entity: ENTITY.BROKERS,
  activeNav: "brokers",
  broker: BROKERS.hassan,
  teamMember: "hassan",
  consultationService: "brokers",
  amountKey: "loanAmount",
  intro:
    "A few quick questions, then someone from our team calls you. You'll talk with Hassan through the process. He has a tax and accounting background and works with 30+ lenders. Free to you, no obligation.",
  proof: "5.0 stars on Google from 100+ reviews. 30+ lenders.",
  proposalNote: "You'll get a written credit proposal before anything goes to a lender.",
  points: [
    "Self-employed? One year of returns or low doc? It's our specialty",
    "Legally required to act in your best interests",
    "We handle the paperwork, from first call to settlement",
  ],
  selectorPitch: "Self-employed? Hassan reads business financials the way a lender will.",
  selectorQuestion: "What are you looking to do?",
  /* The email is the Broker Engine "000. Web lead" workflow, which needs the Zap running */
  afterSubmit: [
    "Check your email. A secure link to your fact find and document list is on its way.",
    "Someone from our team calls you within one business day.",
    "You get a written credit proposal with your loan options and our recommendation, and talk it through with Hassan.",
  ],
  nextSteps: [
    { title: "Check your email", desc: "A secure link to your fact find and document list arrives, so you can add the detail lenders need." },
    { title: "We call you", desc: "Someone from our team calls within one business day, to understand what matters to you and what you're looking for." },
    { title: "You get your credit proposal", desc: "Your loan options and our recommendation, in writing, with every cost set out. You talk it through with Hassan." },
    { title: "We lodge and manage it", desc: "Once you decide to go ahead, we lodge your application and deal with the lender through to settlement." },
  ],
  review: {
    name: "Brendan Piech",
    text: "Hassan was proactive and professional throughout the process of home loan applications and settlement leading to a successful settlement. Highly recommend his services.",
  },
  questions: [
    {
      q: "Is this the full loan application?",
      a: "Not yet. It gives our team what we need to start. Next you get a secure link to your fact find, where you add the detail lenders need and upload your documents. Nothing is lodged until you've read your credit proposal and decided to go ahead.",
    },
    {
      q: "Does it cost anything?",
      a: "No. Our broking service is free to you as the borrower. The lender pays us a commission once your loan settles, and we disclose it in our credit guide and your credit proposal.",
    },
    {
      q: "Will this affect my credit score?",
      a: "No. Sending this doesn't run a credit check or lodge anything with a lender. Applications are what show on your credit file, which is why we choose the right lender first instead of trying several.",
    },
    {
      q: "What if I don't have all my documents yet?",
      a: "That's fine, send this now. Every lender's list is a little different, and we confirm exactly what yours needs after the first call.",
    },
  ],
  sections: ["The loan", "Your finances", "About you"],
  readyList: [
    "Your last 2 payslips, or your last 2 years of tax returns if you're self-employed",
    "Recent statements for your savings and any loans",
    "Photo ID",
  ],
  steps: [
    {
      key: "goal",
      section: 0,
      label: "Goal",
      question: "What are you looking to do?",
      options: [
        { id: "buy-home", label: "Buy a home to live in" },
        { id: "investment", label: "Buy an investment property" },
        { id: "refinance", label: "Refinance my home loan" },
        { id: "build-renovate", label: "Build or renovate" },
      ],
    },
    {
      key: "firstHome",
      section: 0,
      label: "First home",
      question: "Will this be your first home?",
      options: YES_NO,
      showIf: (a) => a.goal === "Buy a home to live in" || a.goal === "Build or renovate",
    },
    {
      key: "propertyValue",
      section: 0,
      type: "money",
      label: "Property value",
      question: "What's the property worth, roughly?",
      hint: (a) => (a.goal === "Refinance my home loan" ? "A best guess is fine." : "Still looking? Put your budget."),
      skip: "Not sure yet",
    },
    {
      key: "loanAmount",
      section: 0,
      type: "money",
      label: "Loan amount",
      question: "How much do you want to borrow?",
      hint: (a) => (a.goal === "Refinance my home loan" ? "What you owe now, plus anything extra you need." : "A best guess is fine."),
      skip: "Not sure yet",
    },
    {
      key: "deposit",
      section: 0,
      label: "Deposit or equity",
      question: "How much deposit or equity do you have?",
      options: ["Under 10%", "10% to 20%", "20% or more", "Not sure"],
      showIf: (a) => a.goal !== "Refinance my home loan",
      notes: {
        "Under 10%": "Some lenders will go above 80% of the property's value with lenders mortgage insurance, and first home buyer schemes may help. We'll check what fits.",
      },
    },
    {
      key: "timing",
      section: 0,
      label: "Timing",
      question: "When do you want this sorted?",
      options: TIMING_OPTIONS,
    },
    {
      key: "applicants",
      section: 1,
      label: "Applying",
      question: "Who's applying?",
      options: ["Just me", "Me and my partner", "Me and someone else"],
    },
    {
      key: "income",
      section: 1,
      label: "Income type",
      question: "How do you earn your income?",
      options: ["Employee (PAYG)", ...SELF_EMPLOYED, "Something else"],
    },
    {
      key: "trading",
      section: 1,
      label: "Self-employed for",
      question: "How long have you been self-employed?",
      options: TRADING_OPTIONS,
      showIf: isSelfEmployed,
      notes: {
        "Less than 1 year": "Many lenders want two years, but some will consider a shorter trading history, usually with a larger deposit or a higher rate.",
      },
    },
    {
      key: "returns",
      section: 1,
      label: "Tax returns",
      question: "Are your tax returns up to date?",
      options: ["Yes, the last 2 years", "Only the last year", "No, I'm behind", "Not sure"],
      showIf: isSelfEmployed,
      notes: {
        "Only the last year": "Not every lender needs two years. Some will look at one year of returns with a recent notice of assessment.",
        "No, I'm behind": "Low doc loans use BAS, business bank statements or an accountant's declaration instead. They cost more, so we weigh that up with you.",
      },
    },
    {
      key: "incomeAmount",
      section: 1,
      type: "money",
      label: "Income per year",
      question: "What's your income per year, before tax?",
      hint: "Applying together? Add both incomes.",
      skip: "Not sure yet",
    },
    credit(1),
  ],
};

const carLoan = {
  slug: "car-loan",
  tab: "Car",
  title: "Car loan application",
  headline: ["Your car loan,", "sorted."],
  serviceLabel: "Car loan application",
  entity: ENTITY.ASSET_SOLUTIONS,
  activeNav: "asset-solutions",
  broker: BROKERS.sham,
  teamMember: "sham",
  consultationService: "asset-solutions",
  amountKey: "price",
  applicationType: (a) =>
    ({ "A car for personal use": "consumer", "A car for my business": "commercial", "A ute or van for work": "commercial" })[a.vehicleUse],
  assetType: "car",
  intro: ASSET_INTRO,
  proof: ASSET_PROOF,
  points: [
    "Second hand, private sale and auction buys welcome",
    "Renting, part-time or no deposit? Ask first",
    "New ABN or no financials? Low doc options exist",
  ],
  selectorPitch: "Renting, new ABN or no deposit? We've settled those too.",
  selectorQuestion: "What are you buying?",
  freeReport: true,
  deals: {
    ids: ["06-hilux-renting", "12-mazda-part-time", "04-pajero", "11-two-cars-low-doc"],
    heading: "Think your deal is too hard?",
    intro: "Renting with no deposit. Part-time income. A company just 6 months old. These all settled recently.",
  },
  afterSubmit: ASSET_AFTER_SUBMIT,
  nextSteps: ASSET_NEXT_STEPS,
  review: {
    name: "Oliver Stewart",
    text: "The team at Frontline Financial are extraordinary at what they do. I dealt with Sham personally when trying to finance my new car. He quickly gave me options over multiple lenders that ensured I got the best possible deal.",
  },
  questions: [
    ASSET_QUESTIONS[0],
    ASSET_QUESTIONS[1],
    ASSET_QUESTIONS[2],
    {
      q: "Can I finance a vehicle from a private seller or auction?",
      a: "Yes, with the right lender. The seller needs to prove they own it and a PPSR check needs to be clear. Get approved before you bid at auction.",
    },
    DEFAULT_QUESTION,
    NEW_ABN_QUESTION,
    ASSET_QUESTIONS[3],
  ],
  sections: ["The vehicle", "Your finances", "About you"],
  readyList: [
    "Your driver licence",
    "Your last 2 payslips, or your ABN details if you're self-employed",
    "The quote or listing for the vehicle, if you have one",
  ],
  steps: [
    {
      key: "vehicleUse",
      section: 0,
      label: "Buying",
      question: "What are you buying?",
      options: [
        { id: "personal", label: "A car for personal use" },
        { id: "business", label: "A car for my business" },
        { id: "ute-van", label: "A ute or van for work" },
        { id: "not-sure", label: "Not sure yet" },
      ],
    },
    {
      key: "seller",
      section: 0,
      label: "Found it?",
      question: "Have you found it yet?",
      options: ["Yes, at a dealer", "Yes, a private sale", "Yes, at an auction", "Still looking"],
      notes: {
        "Yes, a private sale": "That's fine with the right lender. The seller needs to prove they own it and a PPSR check needs to be clear.",
      },
    },
    {
      key: "price",
      section: 0,
      type: "money",
      label: "Price",
      question: "What's the price, roughly?",
      hint: "A best guess is fine.",
      skip: "Not sure yet",
    },
    {
      key: "deposit",
      section: 0,
      label: "Deposit or trade-in",
      question: "Do you have a deposit or trade-in?",
      options: ["None", "Under $5k", "$5k to $20k", "Over $20k"],
      notes: { None: "No deposit makes for a tougher file, but it's not an automatic no." },
    },
    {
      key: "timing",
      section: 0,
      label: "Timing",
      question: "When do you need it?",
      options: TIMING_OPTIONS,
    },
    {
      key: "income",
      section: 1,
      label: "Income type",
      question: "How do you earn your income?",
      options: ["Employee (PAYG)", ...SELF_EMPLOYED, "Something else"],
    },
    {
      key: "abnAge",
      section: 1,
      label: "ABN age",
      question: "How long has your ABN been active?",
      options: [...TRADING_OPTIONS, "I don't have an ABN"],
      showIf: hasBusinessUse,
      notes: { "Less than 1 year": NEW_BUSINESS_NOTE },
    },
    {
      key: "gst",
      section: 1,
      label: "GST registered",
      question: "Are you registered for GST?",
      options: YES_NO_UNSURE,
      showIf: (a) => hasBusinessUse(a) && Boolean(a.abnAge) && a.abnAge !== "I don't have an ABN",
    },
    {
      key: "incomeAmount",
      section: 1,
      type: "money",
      label: "Income per year",
      question: "What's your income per year, before tax?",
      hint: "A best guess is fine.",
      skip: "Not sure yet",
    },
    propertyOwner(1, "Not owning a home doesn't lock you out of mainstream lenders. A deposit and a clean credit file can do a lot of the work."),
    credit(1),
  ],
};

const equipmentFinance = {
  slug: "equipment-finance",
  tab: "Equipment",
  title: "Equipment finance application",
  headline: ["Your equipment finance,", "sorted."],
  serviceLabel: "Equipment finance application",
  entity: ENTITY.ASSET_SOLUTIONS,
  activeNav: "asset-solutions",
  broker: BROKERS.sham,
  teamMember: "sham",
  consultationService: "asset-solutions",
  amountKey: "price",
  applicationType: () => "commercial",
  intro: ASSET_INTRO,
  proof: ASSET_PROOF,
  points: [
    "Trucks, trailers, machinery and tools, new or used",
    "No property? Lenders also weigh your trading history, deposit and the asset",
    "New company? Time as a sole trader can count",
  ],
  selectorPitch: "Older truck, no property or a new company? Ask us first.",
  selectorQuestion: "What do you need to finance?",
  freeReport: true,
  deals: {
    ids: ["01-prime-mover", "03-hino-truck", "10-isuzu-two-directors", "07-ranger-new-trust"],
    heading: "Older trucks. No property. New trusts.",
    intro: "Think your deal is too hard? These business deals all settled recently.",
  },
  afterSubmit: ASSET_AFTER_SUBMIT,
  nextSteps: ASSET_NEXT_STEPS,
  review: {
    name: "Sosefo Langi",
    text: "I can't thank Frontline Financial enough for everything they've done to help me start my business. Sham helped me secure a loan for my vehicle, making the whole process smooth and stress-free.",
  },
  questions: [ASSET_QUESTIONS[0], ASSET_QUESTIONS[1], ASSET_QUESTIONS[2], NEW_ABN_QUESTION, DEFAULT_QUESTION, ASSET_QUESTIONS[3]],
  sections: ["The equipment", "Your business", "About you"],
  readyList: [
    "Your ABN and business details",
    "The quote or invoice for the equipment, if you have one",
    "Recent business bank statements or BAS, if you have them",
  ],
  steps: [
    {
      key: "equipmentType",
      section: 0,
      label: "Financing",
      question: "What do you need to finance?",
      options: [
        { id: "truck-trailer", label: "A truck or trailer" },
        { id: "machinery", label: "Machinery or earthmoving" },
        { id: "tools", label: "Tools and trade equipment" },
        { id: "other", label: "Something else" },
      ],
    },
    {
      key: "equipmentDetail",
      section: 0,
      type: "text",
      label: "Equipment",
      question: "Tell us what it is",
      placeholder: "e.g. 5-tonne excavator",
      skip: "Still deciding",
    },
    {
      key: "seller",
      section: 0,
      label: "Found it?",
      question: "Have you found it yet?",
      options: ["Yes, at a dealer or supplier", "Yes, a private sale", "Yes, at an auction", "Still looking"],
      notes: {
        "Yes, a private sale": "That's fine with the right lender. The seller needs to prove they own it and a PPSR check needs to be clear.",
      },
    },
    {
      key: "price",
      section: 0,
      type: "money",
      label: "Price",
      question: "What's the price, roughly?",
      hint: "A best guess is fine.",
      skip: "Not sure yet",
    },
    {
      key: "deposit",
      section: 0,
      label: "Deposit or trade-in",
      question: "Do you have a deposit or trade-in?",
      options: ["None", "Under $10k", "$10k to $50k", "Over $50k"],
      notes: { None: "No deposit makes for a tougher file, but it's not an automatic no." },
    },
    {
      key: "timing",
      section: 0,
      label: "Timing",
      question: "When do you need it?",
      options: TIMING_OPTIONS,
    },
    {
      key: "structure",
      section: 1,
      label: "Structure",
      question: "How is the business set up?",
      options: STRUCTURE_OPTIONS,
    },
    {
      key: "trading",
      section: 1,
      label: "Trading for",
      question: "How long have you been trading?",
      options: TRADING_OPTIONS,
      notes: { "Less than 1 year": NEW_BUSINESS_NOTE },
    },
    {
      key: "gst",
      section: 1,
      label: "GST registered",
      question: "Are you registered for GST?",
      options: YES_NO_UNSURE,
    },
    propertyOwner(1, "Not owning property doesn't rule you out. Lenders also weigh your trading history, your deposit and the asset itself."),
    credit(1),
  ],
};

const personalLoan = {
  slug: "personal-loan",
  tab: "Personal",
  title: "Personal loan application",
  headline: ["Your personal loan,", "sorted."],
  serviceLabel: "Personal loan application",
  entity: ENTITY.ASSET_SOLUTIONS,
  activeNav: "asset-solutions",
  broker: BROKERS.sham,
  teamMember: "sham",
  consultationService: "asset-solutions",
  amountKey: "amount",
  applicationType: () => "consumer",
  intro: ASSET_INTRO,
  proof: ASSET_PROOF,
  points: [
    "Roll your debts into one repayment and one end date",
    "New job? Some lenders look at your history in the same line of work",
    "Total cost and fees set out before you decide",
  ],
  selectorPitch: "New job or juggling repayments? Ask us first.",
  selectorQuestion: "What's it for?",
  deals: {
    ids: ["05-personal-loan-new-job", "08-debt-consolidation-credit-cards", "14-debt-consolidation-personal-loans", "12-mazda-part-time"],
    heading: "A new job. Two credit cards. Two loans at once.",
    intro: "Think your situation is too hard? These all settled recently.",
  },
  afterSubmit: ASSET_AFTER_SUBMIT,
  nextSteps: ASSET_NEXT_STEPS,
  review: {
    name: "Amy France",
    text: "I had a great experience with Frontline Financial Group. They were fast, friendly, and incredibly helpful throughout the entire loan process. Sham made everything clear and easy to understand.",
  },
  questions: [
    ASSET_QUESTIONS[0],
    ASSET_QUESTIONS[1],
    ASSET_QUESTIONS[2],
    {
      q: "I've just started a new job. Is it too soon?",
      a: "Not always. Just moved from casual to full-time? Some lenders look at your history in the same line of work, not only how long you've held the new contract.",
    },
    DEFAULT_QUESTION,
    ASSET_QUESTIONS[3],
  ],
  sections: ["The loan", "Your finances", "About you"],
  readyList: [
    "Your driver licence",
    "Your last 2 payslips",
    "Recent statements for any debts you want to roll together",
  ],
  steps: [
    {
      key: "purpose",
      section: 0,
      label: "For",
      question: "What's it for?",
      options: [
        { id: "consolidate", label: "Consolidating debts" },
        { id: "home-improvements", label: "Home improvements" },
        { id: "big-purchase", label: "A big purchase or event" },
        { id: "other", label: "Something else" },
      ],
      notes: {
        "Consolidating debts": "It can mean one repayment and a set end date. We'll compare the total cost, fees included, before you switch.",
      },
    },
    {
      key: "amount",
      section: 0,
      type: "money",
      label: "Amount",
      question: "How much do you need?",
      hint: "A best guess is fine.",
      skip: "Not sure yet",
    },
    {
      key: "timing",
      section: 0,
      label: "Timing",
      question: "When do you need it?",
      options: TIMING_OPTIONS,
    },
    {
      key: "income",
      section: 1,
      label: "Work",
      question: "How do you earn your income?",
      options: ["Full-time", "Part-time", "Casual", "Self-employed", "Something else"],
      notes: { "Part-time": "Part-time income is still income. What matters is that the repayments fit comfortably in your budget." },
    },
    {
      key: "tenure",
      section: 1,
      label: "In this work for",
      question: "How long have you been doing this work?",
      options: ["Under 6 months", "6 to 12 months", "Over a year"],
      notes: { "Under 6 months": "Just moved up from casual? Some lenders look at your history in the same line of work, not only the new contract." },
    },
    {
      key: "incomeAmount",
      section: 1,
      type: "money",
      label: "Income per year",
      question: "What's your income per year, before tax?",
      hint: "A best guess is fine.",
      skip: "Not sure yet",
    },
    {
      key: "housing",
      section: 1,
      label: "Housing",
      question: "What's your living situation?",
      options: ["Renting", "Paying a mortgage", "I own outright", "Living with family"],
    },
    credit(1),
  ],
};

const workingCapital = {
  slug: "working-capital",
  tab: "Working capital",
  title: "Working capital application",
  headline: ["Working capital,", "sorted."],
  serviceLabel: "Working capital application",
  entity: ENTITY.ASSET_SOLUTIONS,
  activeNav: "asset-solutions",
  broker: BROKERS.sham,
  teamMember: "sham",
  consultationService: "asset-solutions",
  amountKey: "amount",
  applicationType: () => "commercial",
  intro: ASSET_INTRO,
  proof: ASSET_PROOF,
  points: [
    "Business lines of credit and working capital",
    "Sole traders, companies, trusts and partnerships",
    "No full financials yet? Some lenders can use BAS and bank statements",
  ],
  selectorPitch: "Cash tied up in jobs or stock? Ask us first.",
  selectorQuestion: "What's it for?",
  deals: {
    ids: ["01-prime-mover", "11-two-cars-low-doc", "13-company-car-12-months", "04-pajero"],
    heading: "Business owners we've settled for",
    intro: "Including working capital, a prime mover and equipment for one transport business: three loans in two weeks.",
  },
  afterSubmit: ASSET_AFTER_SUBMIT,
  nextSteps: ASSET_NEXT_STEPS,
  review: {
    name: "Dan Goundar",
    text: "I would like to thank Frontline Financial Group for assisting me in securing my business loan within just a few days. The staff were incredibly nice, friendly, and professional throughout.",
  },
  questions: [ASSET_QUESTIONS[0], ASSET_QUESTIONS[1], ASSET_QUESTIONS[2], NEW_ABN_QUESTION, DEFAULT_QUESTION, ASSET_QUESTIONS[3]],
  sections: ["The funds", "Your business", "About you"],
  readyList: [
    "Your ABN and business details",
    "Your last 6 months of business bank statements, if you have them",
    "Recent BAS, if you have them",
  ],
  steps: [
    {
      key: "purpose",
      section: 0,
      label: "For",
      question: "What's it for?",
      options: [
        { id: "cash-flow", label: "Cash flow between jobs" },
        { id: "stock", label: "Stock or materials" },
        { id: "growth", label: "Taking on more work" },
        { id: "other", label: "Something else" },
      ],
    },
    {
      key: "amount",
      section: 0,
      type: "money",
      label: "Amount",
      question: "How much do you need?",
      hint: "A best guess is fine.",
      skip: "Not sure yet",
    },
    {
      key: "timing",
      section: 0,
      label: "Timing",
      question: "How soon do you need it?",
      options: TIMING_OPTIONS,
    },
    {
      key: "structure",
      section: 1,
      label: "Structure",
      question: "How is the business set up?",
      options: STRUCTURE_OPTIONS,
    },
    {
      key: "trading",
      section: 1,
      label: "Trading for",
      question: "How long have you been trading?",
      options: TRADING_OPTIONS,
      notes: { "Less than 1 year": NEW_BUSINESS_NOTE },
    },
    {
      key: "turnover",
      section: 1,
      label: "Monthly turnover",
      question: "Roughly what does the business turn over each month?",
      options: ["Under $20k", "$20k to $50k", "$50k to $100k", "Over $100k", "Not sure"],
    },
    {
      key: "gst",
      section: 1,
      label: "GST registered",
      question: "Are you registered for GST?",
      options: YES_NO_UNSURE,
    },
    {
      key: "ato",
      section: 1,
      label: "ATO debt",
      question: "Does the business have any ATO debt?",
      options: ["No", "Yes, on a payment plan", "Yes, no plan yet", "Not sure"],
      notes: {
        "Yes, on a payment plan": "Tax debt on a payment plan with repayments up to date is often workable.",
        "Yes, no plan yet": "Worth raising with us early. Your accountant can help with the ATO side.",
      },
    },
    propertyOwner(1, "Not owning property doesn't rule you out. Lenders also weigh your trading history."),
    credit(1),
  ],
};

export const APPLICATION_LIST = [homeLoan, carLoan, equipmentFinance, personalLoan, workingCapital];

export const getApplication = (slug) => APPLICATION_LIST.find((a) => a.slug === slug) || null;
