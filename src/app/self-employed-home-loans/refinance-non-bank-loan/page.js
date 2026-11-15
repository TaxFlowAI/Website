import Link from "next/link";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import WaveDivider from "@/components/WaveDivider";
import { HASSAN_PROFILES } from "@/config/location";

/* Article: Case File 043, a self-employed couple moved from a non-bank loan to a major bank. Built from the Client R
   marketing pack and reel (FFG Marketing/Campaigns/2026-11 Non-bank to major bank). It's a real deal with every client
   figure changed (Hassan's rule, 8 Nov 2026), and the page says so. No lender names, no rates, no city or suburb.
   Targets refinance searches ("refinance a non-bank loan", "alt doc to full doc") and links back to
   /self-employed-home-loans. On desktop the reel sits in a sticky sidebar; on phones it follows the intro. */

const PATH = "/self-employed-home-loans/refinance-non-bank-loan";
const CONSULT_HREF = "/self-employed-home-loans/assessment";
const PUBLISHED = "2026-11-15";
const VIDEO = "/videos/non-bank-to-major-bank.mp4";
const POSTER = "/images/articles/non-bank-to-major-bank-video-poster.webp";
const SHARE_IMAGE = "/images/articles/non-bank-to-major-bank-share.jpg";
const CHANGED = "Numbers changed to protect our client. The scenario is real.";

export const metadata = {
  title: "Refinance a Non-Bank Loan to a Major Bank When You're Self-Employed",
  description:
    "On a non-bank or low doc loan because your business grew faster than your tax returns? How one self-employed couple moved three loans to a major bank.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Made $398,000. The bank thought $24,900.",
    description: "How a non-bank loan became an 8-month bridge to a major bank for a self-employed couple.",
    url: PATH,
    siteName: "Frontline Financial",
    type: "article",
    publishedTime: PUBLISHED,
    authors: ["Hassan Arif"],
    locale: "en_AU",
    images: [{ url: SHARE_IMAGE, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

const LENDER_RULES = [
  { rule: "Average of the last two years", counts: "$211,450", win: false },
  { rule: "Latest year, capped at 120% of the year before", counts: "$29,880", win: false },
  { rule: "Latest year on its own", counts: "$398,000", win: true },
];

const RESULTS = [
  ["Moved to a major bank", "3 loans, $2,560,000"],
  ["Loan to value ratio", "78% overall"],
  ["Lenders mortgage insurance", "None"],
  ["Equity released", "$330,000"],
  ["Interest saving", "About $7,000 a year"],
  ["Time on the non-bank loan", "About 8 months"],
];

const QUESTIONS = [
  ["When will my next tax returns be lodged?", "That month is usually the earliest you can move."],
  ["Does my latest year show the real business?", "If it’s well up on the year before, which lender reads it matters a lot."],
  ["Which lenders read that year on its own?", "Most average two years. A few don’t."],
  ["What does it cost to leave?", "Exit or early repayment fees, discharge costs and government fees."],
];

const FAQ_ITEMS = [
  {
    q: "Can I refinance from a non-bank lender to a bank?",
    a: "Often, once your income can be shown the way a bank needs it, usually through lodged tax returns and financials. It depends on your income documents, the property, your loan size and each bank’s policy, so it’s worth checking before your next accounts are done.",
  },
  {
    q: "Do all banks average two years of tax returns?",
    a: "No. Most average your last two years, some cap your latest year at a percentage of the year before, and some will use the latest year on its own if it’s the only one you provide. That difference can change what you can borrow by a lot.",
  },
  {
    q: "What is an alt doc or low doc loan?",
    a: "A loan that uses other evidence of income, such as BAS, business bank statements or an accountant’s letter, instead of full tax returns. These loans usually cost more, and many borrowers refinance to a standard loan once their returns catch up.",
  },
  {
    q: "Are there costs to leave a non-bank loan?",
    a: "There can be. Some non-bank loans have early repayment or exit fees in the first years, and there are discharge and government fees on any refinance. Check your loan contract, and we’ll work the costs into the numbers before you decide.",
  },
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `https://frontline.financial${PATH}#article`,
      headline: "Made $398,000. The bank thought $24,900. How a non-bank loan became a bridge to a major bank",
      description:
        "A self-employed couple's case study: why the banks could only see last year's tax return, how a non-bank loan bridged the gap for eight months, and how the move to a major bank worked once the new return was lodged.",
      articleSection: "Self-employed home loans",
      about: ["Self-employed home loans", "Refinancing", "Non-bank lenders", "Low doc home loans", "Self-employed income"],
      datePublished: PUBLISHED,
      dateModified: PUBLISHED,
      inLanguage: "en-AU",
      image: `https://frontline.financial${SHARE_IMAGE}`,
      mainEntityOfPage: `https://frontline.financial${PATH}`,
      author: {
        "@type": "Person",
        name: "Hassan Arif",
        jobTitle: "Mortgage and finance broker",
        url: "https://frontline.financial/self-employed-home-loans",
        sameAs: HASSAN_PROFILES,
      },
      publisher: { "@id": "https://frontline.financial/brokers#business" },
      video: { "@id": `https://frontline.financial${PATH}#video` },
    },
    {
      "@type": "VideoObject",
      "@id": `https://frontline.financial${PATH}#video`,
      name: "Made $400K. The bank thought $25K.",
      description:
        "Hassan Arif on how a self-employed couple used a non-bank loan as a bridge, then moved three investment loans to a major bank once their new tax return was lodged.",
      thumbnailUrl: `https://frontline.financial${POSTER}`,
      contentUrl: `https://frontline.financial${VIDEO}`,
      uploadDate: PUBLISHED,
      duration: "PT1M26S",
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://frontline.financial/" },
        { "@type": "ListItem", position: 2, name: "Home loans", item: "https://frontline.financial/brokers" },
        { "@type": "ListItem", position: 3, name: "Self-employed home loans", item: "https://frontline.financial/self-employed-home-loans" },
        { "@type": "ListItem", position: 4, name: "Refinance a non-bank loan", item: `https://frontline.financial${PATH}` },
      ],
    },
  ],
};

const H2 = "mt-12 border-l-4 border-[#00FCB8] pl-4 text-2xl font-bold md:text-3xl";
const LINK = "font-bold underline decoration-[#00FCB8] decoration-2 underline-offset-4 hover:text-[#39B2B2]";

function Exhibit({ src, alt, caption }) {
  return (
    <figure className="my-10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={960}
        height={1200}
        loading="lazy"
        className="mx-auto w-full max-w-md rounded-xl shadow-lg"
      />
      <figcaption className="mx-auto mt-3 max-w-md text-center text-sm text-gray-500">{caption}</figcaption>
    </figure>
  );
}

function LenderRules() {
  return (
    <figure className="my-10 overflow-hidden rounded-2xl bg-white shadow-lg">
      <div className="bg-[#1C5472] px-6 py-5">
        <p className="font-bold uppercase tracking-wider text-white">What each lender rule would count</p>
        <p className="mt-1 text-sm text-[#bfe3df]">Last year $24,900, this year $398,000. Same couple, same returns.</p>
      </div>
      <div className="divide-y divide-[#d5e4df] px-6">
        {LENDER_RULES.map((r) => (
          <div key={r.rule} className="flex items-baseline justify-between gap-4 py-4">
            <span className="text-[#1C5472]">{r.rule}</span>
            <span
              className={`shrink-0 text-2xl font-bold tabular-nums ${
                r.win ? "text-[#078a68]" : "text-gray-400 line-through decoration-[#B8322A] decoration-2"
              }`}
            >
              {r.counts}
            </span>
          </div>
        ))}
      </div>
      <figcaption className="px-6 pb-5 pt-1 text-sm text-gray-500">{CHANGED} Lender names withheld.</figcaption>
    </figure>
  );
}

function Results() {
  return (
    <div className="my-10 grid gap-3 sm:grid-cols-2">
      {RESULTS.map(([label, value]) => (
        <div key={label} className="rounded-xl border-2 border-[#d5e4df] bg-white px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[#39B2B2]">{label}</p>
          <p className="mt-1 text-xl font-bold text-[#1C5472]">{value}</p>
        </div>
      ))}
    </div>
  );
}

export default function NonBankRefinanceArticlePage() {
  return (
    <div className="min-h-screen bg-[#F5F5EF] font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <LayoutNav activeNav="brokers" />

      {/* HERO */}
      <section className="section-dot-grid-dark relative px-4 pt-12 pb-14 md:px-6 md:pt-16 md:pb-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/60">
              <Link href="/" className="hover:text-[#00FCB8]">Home</Link>
              <span className="mx-2" aria-hidden>/</span>
              <Link href="/brokers" className="hover:text-[#00FCB8]">Home loans</Link>
              <span className="mx-2" aria-hidden>/</span>
              <Link href="/self-employed-home-loans" className="hover:text-[#00FCB8]">Self-employed</Link>
            </nav>
            <p className="text-sm font-bold uppercase tracking-widest text-[#00FCB8]">Case file · Self-employed refinance</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl">
              Made $398,000. The bank thought $24,900.
            </h1>
            <p className="mt-5 text-xl text-white/85">
              How a non-bank loan became an eight-month bridge to a major bank for a self-employed couple.
            </p>
            <div className="mt-8 flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hassan-broker-v2.png"
                alt="Hassan Arif JP, mortgage broker at Frontline Financial in Parramatta"
                className="h-12 w-12 rounded-full bg-[#0A1628] object-cover"
              />
              <div className="text-sm">
                <p className="font-bold text-white">Hassan Arif JP</p>
                <p className="text-[#39B2B2]">
                  <time dateTime={PUBLISHED}>15 November 2026</time> · 5 min read
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider fill="#F5F5EF" />

      {/* ARTICLE: intro, then the video (sidebar on desktop), then the body */}
      <article className="px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl text-lg leading-relaxed text-[#1C5472] lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-x-14">
          <div className="lg:col-start-1 lg:row-start-1">
            <p className="rounded-lg border-l-4 border-[#39B2B2] bg-white px-4 py-3 text-base text-gray-600">
              {CHANGED} We keep the story and change every client figure, so nobody can tell who it is.
            </p>
            <p className="mt-6">
              Early this year a couple came to us needing to refinance three investment properties. They run their own
              company together. That company made $24,900 in the year before. This year it was on track for close to
              $400,000.
            </p>
            <p className="mt-5">
              The problem was that the big year hadn&apos;t closed yet, so no bank could see it. This is how we got a bank to
              count every dollar of it, and why we started with a non-bank loan on purpose.
            </p>
          </div>

          <aside className="my-10 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:my-0">
            <div className="lg:sticky lg:top-32">
              <figure>
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={POSTER}
                  aria-label="Video: Hassan Arif on how a self-employed couple moved from a non-bank loan to a major bank"
                  className="mx-auto aspect-[9/16] w-full max-w-xs rounded-2xl bg-[#0A1628] shadow-xl lg:max-w-none"
                >
                  <source src={VIDEO} type="video/mp4" />
                </video>
                <figcaption className="mt-3 text-center text-sm text-gray-500">{CHANGED}</figcaption>
              </figure>
              <div className="mt-6 hidden rounded-xl bg-[#1C5472] p-5 text-center lg:block">
                <p className="font-bold text-white">On a non-bank loan now?</p>
                <a
                  href={CONSULT_HREF}
                  className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-[#00FCB8] px-4 py-3 text-base font-bold text-[#1C5472] transition-opacity duration-200 hover:opacity-90"
                >
                  Get a Free Assessment
                </a>
              </div>
            </div>
          </aside>

          <div className="lg:col-start-1 lg:row-start-2">
            <h2 className={H2}>Why the banks couldn&apos;t see the income</h2>
            <p className="mt-5">
              If you&apos;re self-employed, banks lend on your last tax return, not on what you&apos;re making today. This
              couple&apos;s last lodged return said $24,900. Their accountant couldn&apos;t finalise the big year until the
              financial year closed on 30 June.
            </p>
            <p className="mt-5">
              So on paper they were still a $24,900 business, and on that income no bank could make three investment loans
              work.
            </p>

            <Exhibit
              src="/images/articles/non-bank-to-major-bank-profit.webp"
              alt="Rebuilt profit and loss statement with changed figures: net profit $24,900 in 2025 and $398,000 in 2026"
              caption={`The company's profit and loss, rebuilt with changed figures. ${CHANGED}`}
            />

            <h2 className={H2}>Why we started with a non-bank lender</h2>
            <p className="mt-5">
              A non-bank lender will lend on your quarterly business activity statements and an accountant&apos;s letter,
              not your latest tax return. It costs more. The rate is higher, and it isn&apos;t where you want to stay.
            </p>
            <p className="mt-5">
              So we used it on purpose, as a bridge. We told the clients on day one that this was temporary, and wrote the
              exit into the plan: the month their new tax return was lodged, we&apos;d apply to a bank.
            </p>

            <h2 className={H2}>Getting the new tax return done early</h2>
            <p className="mt-5">
              Many businesses lodge the year&apos;s accounts the following autumn. That would have meant another six months
              on the higher rate, at roughly $600 a month in extra interest.
            </p>
            <p className="mt-5">
              We worked with their accountant to finalise the company and personal returns in September instead. A bank
              wants the whole set: personal returns and notices of assessment, the company return, financial statements
              with the depreciation schedule, and a letter from the accountant confirming the returns were lodged. We had
              all of it ready on day one.
            </p>

            <h2 className={H2}>One more catch: most banks average two years</h2>
            <p className="mt-5">
              Even with the big year on paper, most banks average your last two years. For this couple that was $211,450,
              about half their real profit. Some lenders cap the latest year at 120% of the year before, which counted
              just $29,880.
            </p>

            <LenderRules />

            <p>
              We screened the banks&apos; self-employed policies and found a major bank that assesses the most recent
              financial year on its own when that&apos;s the only year provided. Under that one rule, every dollar of the
              $398,000 counted. That&apos;s about $187,000 more assessable income than a two-year average.
            </p>

            <Exhibit
              src="/images/articles/non-bank-to-major-bank-lenders.webp"
              alt="What each lender counted: two-year averages and a capped figure struck out, $398,000 counted by a major bank"
              caption={`Our lender comparison, with changed figures. ${CHANGED}`}
            />

            <h2 className={H2}>The curveballs</h2>
            <p className="mt-5">
              Deals like this rarely go in a straight line. Three things needed fixing along the way.
            </p>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 text-[#39B2B2]" aria-hidden>✓</span>
                <span>
                  The broker lodgement system defaulted to a two-year average and showed the loans failing. We attached
                  the bank&apos;s own calculator on the latest-year basis and explained the difference in the notes.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 text-[#39B2B2]" aria-hidden>✓</span>
                <span>
                  The cash-out had two purposes: renovating the rented properties and a deposit for the next one. Lenders
                  can treat those differently, so we split the money by purpose in the application. Your accountant is the
                  person to ask about the tax side.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 text-[#39B2B2]" aria-hidden>✓</span>
                <span>One property&apos;s full valuation came in above the bank&apos;s automated estimate, which kept the loan within 80% of its value.</span>
              </li>
            </ul>

            <h2 className={H2}>The result</h2>
            <p className="mt-5">
              Eight months after the non-bank loan, all three properties moved across to the major bank.
            </p>

            <Results />

            <Exhibit
              src="/images/articles/non-bank-to-major-bank-funding.webp"
              alt="Rebuilt funding position with changed figures: three loans totalling $2,560,000 at 78% LVR and $330,000 released"
              caption={`The funding position, rebuilt with changed figures. ${CHANGED} The saving is this client's interest difference between the two lenders.`}
            />

            <p>
              The non-bank loan did exactly the job it was there for. It held the properties together while the business
              grew, and then it was gone.
            </p>

            <h2 className={H2}>On a non-bank loan now? Ask these four questions</h2>
            <p className="mt-5">
              If you took a non-bank or low doc loan because your returns were behind your business, it&apos;s worth
              knowing when you could move, before your next accounts are done.
            </p>
            <ol className="mt-6 space-y-4">
              {QUESTIONS.map(([q, a], i) => (
                <li key={q} className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00FCB8] font-bold text-[#1C5472]">
                    {i + 1}
                  </span>
                  <span>
                    <span className="font-bold">{q}</span>
                    <span className="block text-base text-gray-600">{a}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-6">
              Lenders read self-employed income in very different ways. There&apos;s an example with add-backs in{" "}
              <Link href="/self-employed-home-loans/how-lenders-read-your-tax-return" className={LINK}>
                how lenders read your tax return
              </Link>
              , and more on full doc and low doc loans on our page about{" "}
              <Link href="/self-employed-home-loans" className={LINK}>
                self-employed home loans
              </Link>
              .
            </p>

            <h2 className={H2}>Quick answers</h2>
            <div className="mt-6 border-t border-[#39B2B2]/50">
              {FAQ_ITEMS.map((item) => (
                <details key={item.q} className="group border-b border-[#39B2B2]/50">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left [&::-webkit-details-marker]:hidden">
                    <h3 className="text-lg font-bold">{item.q}</h3>
                    <svg
                      className="h-5 w-5 shrink-0 text-[#39B2B2] transition-transform duration-200 group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="pb-4 pr-8 text-base text-gray-600">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </article>

      <WaveDivider fill="#00FCB8" />

      {/* CTA */}
      <section className="cta-stripe-pattern relative bg-[#00FCB8] px-4 py-14 md:px-6 md:py-16 lg:px-8">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-[#1C5472] md:text-5xl">Want to know if you can move yet?</h2>
          <p className="mt-4 text-lg text-[#1C5472] md:text-xl">
            Book a free assessment. Have your latest financials handy if you can. Someone from our team will call you
            within one business day, and you&apos;ll talk with me through the process.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={CONSULT_HREF} className="inline-flex w-full items-center justify-center rounded-lg bg-[#1C5472] px-10 py-4 font-bold text-white transition-all duration-200 hover:scale-105 hover:opacity-90 sm:w-auto">
              Get a Free Assessment
            </a>
            <a href="tel:+61422959486" className="inline-flex w-full items-center justify-center rounded-lg border-2 border-[#1C5472] bg-transparent px-10 py-4 font-bold text-[#1C5472] transition-all duration-200 hover:scale-105 hover:bg-[#1C5472]/10 sm:w-auto">
              Call us: +61 422 959 486
            </a>
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-xs leading-relaxed text-[#1C5472]/80">
            {CHANGED} General information only. This article doesn&apos;t take into account your objectives, financial
            situation or needs. It describes one client&apos;s outcome, and yours will depend on your own circumstances.
            Lender criteria, fees and charges apply, and all applications are subject to the lender&apos;s assessment and
            approval. For tax advice, speak with your accountant. Frontline Financial Pty Ltd, authorised credit
            representative CRN 575968 of Australian Credit Licence 389087.
          </p>
        </div>
      </section>

      <WaveDivider fill="#1C5472" />

      <LayoutFooter />
    </div>
  );
}
