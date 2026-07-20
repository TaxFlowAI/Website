/* ============================================================================
   TaxFlowAI — REAL proof data only.
   ----------------------------------------------------------------------------
   Every section that consumes this file renders NOTHING until real data is
   entered here. This is deliberate: reviews, agent profiles and stats are
   regulated-service proof. Fabricated or placeholder proof breaches Australian
   Consumer Law and must never ship.

   Rules:
   - Reviews: verbatim quotes from the real Google listing. Do not paraphrase.
   - Agents: real people, real photos (no stock, no AI-generated faces).
   - Stats: only metrics that are true. Omit anything unverified.
   ============================================================================ */

/* Google reviews — section stays unpublished until rating, count, profileUrl
   AND at least one review are all filled in. */
export const GOOGLE_REVIEWS = {
  rating: null, // e.g. 4.9
  count: null, // e.g. 27
  profileUrl: null, // real Google Business listing URL
  reviews: [
    // { name: "Sam", quote: "Verbatim quote from Google.", situation: "Sole trader, Parramatta" },
  ],
};

/* "Meet your tax agents" — section stays unpublished until at least one agent
   with a real photo is added. photoSrc should live under /public. */
export const TAX_AGENTS = [
  // { photoSrc: "/images/taxflow/agents/name.jpg", firstName: "Name",
  //   credential: "Registered Tax Agent (TPB-registered)", specialty: "Small business & sole traders" },
];

/* Proof-of-scale strip — only true, supplied metrics. Renders nothing while empty. */
export const PROOF_STATS = [
  // { value: "1,200+", label: "returns lodged" },
  // { value: "2021", label: "registered since" },
];

/* Real social profile URLs. Icons are hidden while these are null — never link
   to generic homepages. */
export const SOCIAL_LINKS = {
  linkedin: null, // e.g. "https://www.linkedin.com/company/…"
  instagram: null, // e.g. "https://www.instagram.com/…"
};
