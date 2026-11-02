import { getApplication } from "@/data/finance-applications";

/* The /vehicle-finance landing page, where the commercial vehicle reels send people
   on Meta. Each ad's URL carries utm_content={{ad.name}}, e.g. "R1 Ute Too Old - A",
   and the page opens on that ad's own hook. Headlines and subs come from the ad copy
   (FFG Marketing/Campaigns/2026-10 Commercial Vehicle Finance Reels), so they carry
   no approval promises. Ad names have to keep starting R1 to R5. Anything else,
   including organic links, gets `default`. */

export const ANGLE_PATTERN = "^R([1-5])\\b";

export const angleFromSearch = (search) => {
  try {
    const match = new RegExp(ANGLE_PATTERN, "i").exec(new URLSearchParams(search).get("utm_content") || "");
    return match ? `r${match[1]}` : "default";
  } catch {
    return "default";
  }
};

const AGE_QUESTION = "How old can the vehicle be?";
const PRIVATE_QUESTION = "Can I finance a vehicle from a private seller or auction?";
const DEFAULT_QUESTION = "I have a default. Is it worth applying?";
const NEW_ABN_QUESTION = "My ABN is new and I have no financials.";
const LOW_DOC_QUESTION = "No tax return yet. What do lenders look at?";

export const ANGLES = {
  default: {
    headline: ["Ute, van or truck finance,", "sorted."],
    sub: "Find out where your deal fits before you apply anywhere. We check 30+ lenders for you.",
    deals: {
      ids: ["03-hino-truck", "06-hilux-renting", "04-pajero", "11-two-cars-low-doc"],
      heading: "Think your deal is too hard?",
      intro: "A 15-year-old truck. Renting with no deposit. A company just 6 months old. These all settled recently.",
    },
  },
  r1: {
    headline: ["Bank says your ute's", "too old?"],
    sub: "Lenders look at its age at the end of the loan. A different lender or term can change the answer.",
    deals: {
      ids: ["03-hino-truck", "12-mazda-part-time", "06-hilux-renting", "10-isuzu-two-directors"],
      heading: "Older vehicles can still get across the line.",
      intro: "A 15-year-old truck with no deposit. An 11-year-old car on part-time income. These settled recently.",
    },
    faq: AGE_QUESTION,
  },
  r2: {
    headline: ["Found it on Marketplace?", "You can still finance it."],
    sub: "Finance isn't just for dealer stock. Private sales and auctions can work too.",
    deals: {
      ids: ["06-hilux-renting", "03-hino-truck", "09-hilux-not-a-homeowner", "01-prime-mover"],
      heading: "Think your deal is too hard?",
      intro: "Renting with no deposit. A 15-year-old truck. No property behind a prime mover. These all settled recently.",
    },
    faq: PRIVATE_QUESTION,
  },
  r3: {
    headline: ["An old default", "isn't an automatic no."],
    sub: "It changes which lender looks at it and how the deal is put together.",
    deals: {
      ids: ["06-hilux-renting", "10-isuzu-two-directors", "11-two-cars-low-doc", "03-hino-truck"],
      heading: "Every file has its hurdle.",
      intro: "Renting. No deposit. No property. No full financials. These all settled recently.",
    },
    faq: DEFAULT_QUESTION,
  },
  r4: {
    headline: ["New ABN?", "Some lenders have no minimum."],
    sub: "Most want 2 years of trading. Some don't. Experience, a deposit and a clean credit file can count.",
    deals: {
      ids: ["04-pajero", "13-company-car-12-months", "07-ranger-new-trust", "09-hilux-not-a-homeowner"],
      heading: "New businesses can get across the line.",
      intro: "A company just 6 months old. A 12-month-old company. A brand-new trust. These all settled recently.",
    },
    faq: NEW_ABN_QUESTION,
  },
  r5: {
    headline: ["No tax return?", "That's what low doc is for."],
    sub: "Lenders look at the vehicle, your credit file and your bank statements instead.",
    deals: {
      ids: ["11-two-cars-low-doc", "13-company-car-12-months", "04-pajero", "02-ranger-raptor"],
      heading: "No full financials doesn't have to mean no finance.",
      intro: "Two cars in 4 weeks, the second on a low-doc loan. A 12-month-old company on low doc. These settled recently.",
    },
    faq: LOW_DOC_QUESTION,
  },
};

/* The car loan application's selling copy (next steps, FAQ, broker) applies here as is */
export const CAR_LOAN = getApplication("car-loan");

const FAQS = [
  ...CAR_LOAN.questions,
  {
    q: AGE_QUESTION,
    a: "It depends on the lender. Most cap the vehicle's age at the end of the loan, not today, so a 2016 ute on a five-year loan counts as 15 years old by the end. Over the limit isn't always a no. A shorter term or a different lender can change the answer.",
  },
  {
    q: LOW_DOC_QUESTION,
    a: "This is what low doc finance is for. Instead of tax returns, the lender looks at the vehicle itself, your credit file and how your bank statements look. Loan size and rate can be affected.",
  },
];

/* The question the visitor's ad raised goes first */
export const faqsFor = (angle) => {
  const first = FAQS.filter((item) => item.q === angle.faq);
  return [...first, ...FAQS.filter((item) => item.q !== angle.faq)];
};

export const ALL_FAQS = FAQS;

export const PHONE = { display: "+61 422 959 486", link: "tel:+61422959486" };

/* Tap questions first and contact details last: the form only sends at the very end,
   so asking for a name up front costs people and captures nothing. `section` drives the
   three-part progress bar, and `label` is the line in the lead email and Ambition Cloud
   notes. Never send an answer to the Meta pixel, only the question's key. Wording and
   reassurance notes match /apply/car-loan. */
export const NO_ABN = "I don't have an ABN";

export const SECTIONS = ["The vehicle", "Your situation", "Your details"];

export const QUESTIONS = [
  {
    key: "vehicle",
    section: 0,
    label: "Vehicle",
    question: "What are you looking to finance?",
    options: ["Ute", "Van", "Truck", "Car", "Something else"],
  },
  {
    key: "seller",
    section: 0,
    label: "Found it?",
    question: "Have you found it yet?",
    options: ["Yes, at a dealer", "Yes, a private sale", "Yes, at an auction", "Still looking"],
    notes: {
      "Yes, a private sale": "That's fine with the right lender. The seller needs to prove they own it and a PPSR check needs to be clear.",
      "Yes, at an auction": "Auction buys can work too. Talk to us before you bid.",
    },
  },
  {
    key: "abnAge",
    section: 1,
    label: "ABN age",
    question: "How long has your ABN been active?",
    options: ["Less than 1 year", "1 to 2 years", "2 years or more", NO_ABN],
    notes: {
      "Less than 1 year": "Some lenders have no minimum trading history. Time in your trade can count too.",
      [NO_ABN]: "No problem. We also arrange car loans without an ABN, so send this through and we'll go through your options.",
    },
  },
  {
    key: "gst",
    section: 1,
    label: "GST registered",
    question: "Are you registered for GST?",
    options: ["Yes", "No", "Not sure"],
    showIf: (answers) => Boolean(answers.abnAge) && answers.abnAge !== NO_ABN,
  },
  {
    key: "deposit",
    section: 1,
    label: "Deposit towards vehicle",
    question: "Do you have any deposit towards your vehicle?",
    options: ["Yes", "No"],
    notes: { No: "No deposit makes for a tougher file, but it's not an automatic no." },
  },
  {
    key: "property",
    section: 1,
    label: "Property owner",
    question: "Are you a property owner?",
    options: ["Yes", "No"],
    notes: { No: "Not owning a home doesn't lock you out of mainstream lenders. A deposit and a clean credit file can do a lot of the work." },
  },
  {
    key: "credit",
    section: 1,
    label: "Credit history",
    question: "How's your credit history?",
    options: ["Clean, as far as I know", "A few late payments", "A default or judgement", "Not sure"],
    notes: {
      "A default or judgement": "A default doesn't always rule you out. It depends what it was, how old it is and whether it's paid.",
    },
  },
];

export const READY_LIST = [
  "Your driver licence",
  "Your ABN",
  "The vehicle's build year, plus the quote or listing if you have one",
];

/* Real Google reviews, verbatim and unedited. Oliver's sits with the broker section. */
export const REVIEWS = [
  { name: "Amy F.", text: "I had a great experience with Frontline Financial Group. They were fast, friendly, and incredibly helpful throughout the entire loan process. Sham made everything clear and easy to understand." },
  { name: "Dan G.", text: "I would like to thank Frontline Financial Group for assisting me in securing my business loan within just a few days. The staff were incredibly nice, friendly, and professional throughout." },
  { name: "Mikhail A.", text: "Sham was phenomenal to say the least. He got my loan approved in less than 24 hours. Absolute legend!" },
];
