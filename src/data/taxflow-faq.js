// TaxFlowAI FAQ — single source of truth.
// Used by /taxflow/faq (with FAQPage schema) and by per-page subsets.
// Answers must stay consistent with the fees model: free sign-up, quote-first,
// no obligation, no dollar amounts. The registered tax agent may be named:
// TAX7 T04 PTY LTD trading as TaxFlowAI, Registered Tax Agent 26313222.

export const TAXFLOW_FAQ = [
  {
    id: "fees",
    q: "How do fees work?",
    a: "Signing up is free — no card, no subscription, no upfront cost. When you engage a Registered Tax Agent through the platform, they review what you need and send you a quote for exactly that service. Nothing proceeds until you accept the quote, and fees are confirmed in your engagement letter.",
  },
  {
    id: "who-lodges",
    q: "Who prepares and lodges my return?",
    a: "A Registered Tax Agent. Tax services are provided by TAX7 T04 PTY LTD trading as TaxFlowAI, Registered Tax Agent 26313222. The platform organises your receipts, documents and deadlines, and your return is prepared and lodged by registered professionals. The platform itself is owned and developed by Frontline Holdings Group Pty Ltd.",
  },
  {
    id: "what-is-rta",
    q: "What is a Registered Tax Agent?",
    a: "A tax practitioner registered with the Tax Practitioners Board (TPB), Australia's regulator for tax agents. Only registered agents can legally charge a fee to prepare and lodge tax returns. You can check any agent's registration on the TPB's public register.",
  },
  {
    id: "security",
    q: "Is my data secure?",
    a: "Yes. The TaxFlowAI platform and its database are hosted in Amazon Web Services’ Sydney region, your data is encrypted in transit and at rest, and every sign-in requires a password plus a one-time verification code. Tax File Numbers and bank account details are not stored in TaxFlowAI. Our security practices are aligned to ISO/IEC 27001 and our application code undergoes independent security audits.",
  },
  {
    id: "entities",
    q: "What entities do you support?",
    a: "Personal, sole trader, company, trust and partnership — all in the one portal. You can manage every entity you're connected to from a single dashboard, without switching between systems.",
  },
  {
    id: "flo-ai",
    q: "How does Flo's AI work — does a human check it?",
    a: "Flo classifies your receipts into ATO deduction categories and shows you the reasoning behind every decision, so nothing is a black box. Before anything is lodged, your Registered Tax Agent reviews the numbers — the AI organises, the human signs off.",
  },
  {
    id: "switch",
    q: "Can I switch from my current accountant?",
    a: "Yes, and it's simpler than most people expect. Once you engage a Registered Tax Agent through TaxFlowAI, they can request your details from your previous accountant and pick up your lodgement history with the ATO. You don't need to have an awkward break-up conversation.",
  },
  {
    id: "offices",
    q: "Where are your offices?",
    a: "Level 49, 8 Parramatta Square, Parramatta NSW 2150, and 213 Clarence Street, Sydney NSW 2000. You can book a 1-hour in-person appointment at either office, or a 30-minute Teams or phone call, straight from the portal.",
  },
  {
    id: "free-signup",
    q: "What does \"free to sign up\" actually mean?",
    a: "Exactly that. Creating your account, uploading receipts, using Flo and tracking your deadlines costs nothing, with no card required and no subscription. You only ever pay for professional services you've specifically been quoted for — and accepted.",
  },
  {
    id: "lock-in",
    q: "Am I locked in?",
    a: "No. There's no subscription and no lock-in contract. Your documents and data are always yours to take with you — they live in your own cloud folder, so leaving is as simple as walking away with what's already yours.",
  },
];

export function faqSubset(ids) {
  return TAXFLOW_FAQ.filter((f) => ids.includes(f.id));
}
