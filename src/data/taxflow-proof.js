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

/* Google reviews — the Frontline Financial Group listing (the team that builds
   and operates TaxFlowAI). Only reviews about tax work are included, copied
   verbatim from the listing's "tax return" topic on 2026-09-24 (5.0, 114
   reviews at that date). Update `count` when the listing grows. */
export const GOOGLE_REVIEWS = {
  business: "Frontline Financial Group",
  rating: 5.0,
  count: "114",
  profileUrl:
    "https://www.google.com/search?q=frontline+financial+group&rlz=1C1RXQR_en-GBAU1181AU1181&oq=frontline+financ&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARBFGDkyBggCEEUYPDIGCAMQRRg8MgYIBBBFGEEyBggFEEUYPDIGCAYQRRhBMgYIBxBFGEHSAQgyMDM4ajBqNKgCALACAQ&sourceid=chrome&ie=UTF-8#lrd=0x22393410488c393:0x1a79eb822c43357b,1,,,,",
  reviews: [
    {
      name: "Conor Spencer",
      quote:
        "I had a great experience working with Hassan for my tax return. He was professional, knowledgeable, and took the time to clearly explain everything, which made the whole process very straightforward and stress-free. Hassan was very responsive, and efficient. I’d highly recommend him to anyone looking for reliable and high-quality tax services.",
    },
    {
      name: "Michael Behari",
      quote:
        "Hassan was very professional, and was able to get me a very good tax return for this financial year. And also provided me with a lot of good tax tips as well. If you’re looking for a personalised service, go to Hassan!",
    },
    {
      name: "Nik Malik",
      quote:
        "Extremely organised and responsive. Frontline financial helped me lodge 4 years of outstanding business tax returns. Highly recommended",
    },
    {
      name: "Angel Lee",
      quote:
        "I engaged Hassan for assistance with my Tax Return and finance to buy my first property. He was fantastic, informing me every step of the way. Working over time to ensure my finance was approved promptly to seal the deal. Cannot thank you enough! Much appreciated.",
    },
    {
      name: "Kevin Khuu",
      quote:
        "Came across Frontline Financial for my tax accounting and finance needs, couldn’t have asked for anything better, great customer service and helpfulness. Managed to get a greater outcome then I had imagined for my tax returns and financial needs. Couldn’t recommend them enough!",
    },
    {
      name: "E B",
      quote:
        "Hassan has been so helpful doing my tax returns and helping me with my finance. If you are looking for an efficient accountant he is one of the best. I would highly recommend.",
    },
    {
      name: "Kain Divertie",
      quote:
        "Hussan has been the best by far to work with over the past year not only with my finance but also with my tax return aswell, with The best results possible definitely recommend !",
    },
    {
      name: "Amy Toma",
      quote: "Very responsive and professional service, made my tax return process super easy :)",
    },
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
