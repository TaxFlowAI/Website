import Link from "next/link";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import WaveDivider from "@/components/WaveDivider";
import { HASSAN_PROFILES } from "@/config/location";

/* Article: the cash needed to buy the median Manly apartment, 20% deposit vs 95% lending with
   LMI added to the loan. Written in Hassan's voice around the Manly reel (organic, posted
   Wed 11 Nov 2026). Figures come from the campaign's "Numbers - Manly cash needed.md" in
   FFG Marketing: CoreLogic median for the 12 months to Jul 2026, NSW duty at 2026-27 rates,
   LMI from one insurer's premium calculator, costs estimated. Keep the period on every figure,
   and re-check the median before any update. Same layout as the HEM article: the video sits
   in a sticky sidebar on desktop and follows the intro on phones. No lender names, no rates. */

const PATH = "/how-much-cash-to-buy-an-apartment-in-manly";
const CONSULT_HREF = "/contact?team=hassan";
const PUBLISHED = "2026-11-11";
const VIDEO = "/videos/manly-how-much-cash.mp4";
const POSTER = "/images/articles/manly-how-much-cash-video-poster.webp";
const SHARE_IMAGE = "/images/articles/manly-how-much-cash-share.jpg";
const MEDIAN_SOURCE = "https://www.yourinvestmentpropertymag.com.au/top-suburbs/nsw/2095-manly";
const DUTY_SOURCE = "https://www.revenue.nsw.gov.au/taxes-duties-levies-royalties/transfer-duty";

export const metadata = {
  title: "How Much Cash Do You Need to Buy an Apartment in Manly? (2026)",
  description:
    "The median Manly apartment is about $1.96M. With 20% down you'd need about $490K in cash; with a 5% deposit and LMI added to the loan, closer to $196K. The full breakdown.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "How much cash do you need to buy an apartment in Manly?",
    description: "About $490K with 20% down, or closer to $196K with 95% lending. Same apartment, less than half the cash.",
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

const PRICE = "$1,960,000";

const ROUTES = [
  {
    key: "20",
    title: "20% deposit",
    tag: "What most people think",
    tagClass: "bg-[#eef4f2] text-[#1C5472]",
    rows: [
      ["Deposit (20%)", "$392,000"],
      ["NSW stamp duty", "$89,087"],
      ["Costs (estimate)", "~$8,600"],
    ],
    total: "~$489,700",
    note: "Loan of $1,568,000. No lenders mortgage insurance.",
  },
  {
    key: "95",
    title: "95% lending",
    tag: "Some lenders",
    tagClass: "bg-[#00FCB8] text-[#1C5472]",
    rows: [
      ["Deposit (5%)", "$98,000"],
      ["NSW stamp duty", "$89,087"],
      ["Costs (estimate)", "~$8,600"],
    ],
    total: "~$195,700",
    note: "Loan of about $1,940,000, including about $78,000 of LMI added to the loan.",
  },
];

const LENDER_CHECKS = [
  "Genuine savings. Most lenders want to see part of the deposit saved over time, not just gifted or borrowed.",
  "Your income. A bigger loan means bigger repayments, and the lender has to be satisfied you can afford them.",
  "The property. Lenders and mortgage insurers have their own rules on apartment size, building type and location.",
  "The loan size. Mortgage insurance has a maximum loan amount, so 95% lending isn't on the table at every price.",
];

const FAQ_ITEMS = [
  {
    q: "How much deposit do I need for an apartment in Manly?",
    a: "On the median Manly apartment of about $1,960,000 (CoreLogic, 12 months to July 2026), a 20% deposit is $392,000 and a 5% deposit is $98,000. Stamp duty and other costs come on top, so the total cash needed is about $490,000 or about $196,000.",
  },
  {
    q: "Can I buy in Manly with a 5% deposit?",
    a: "Some lenders will lend up to 95% of the price, with lenders mortgage insurance added to the loan. It depends on the lender's policy, your income and savings, and the property. It isn't available at every price, because mortgage insurance has a maximum loan size.",
  },
  {
    q: "What is lenders mortgage insurance (LMI)?",
    a: "LMI protects the lender, not you, when you borrow more than 80% of the property's value. It's a one-off premium that can usually be added to the loan instead of paid in cash. You then pay interest on it over the life of the loan.",
  },
  {
    q: "Can stamp duty be added to the home loan?",
    a: "Generally no. Stamp duty is usually paid from your own funds at settlement, which is why it makes up a big part of the cash you need either way.",
  },
  {
    q: "Does this apply to first home buyers?",
    a: "No. These figures assume you're not a first home buyer. First home buyers in NSW can have different stamp duty and access to government schemes, which have their own price caps.",
  },
  {
    q: "Can I meet a mortgage broker in Parramatta?",
    a: "Yes. We're on Level 49, 8 Parramatta Square, Parramatta NSW 2150, and take calls and appointments Monday to Friday, 10:30am to 8pm. We also meet by phone and video, wherever you're buying.",
  },
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `https://frontline.financial${PATH}#article`,
      headline: "How much cash do you need to buy an apartment in Manly?",
      description:
        "The cash needed to buy the median Manly apartment with a 20% deposit compared with 95% lending and lenders mortgage insurance added to the loan.",
      articleSection: "Home loans",
      about: ["Home deposit", "Lenders mortgage insurance", "Stamp duty", "Manly NSW"],
      datePublished: PUBLISHED,
      dateModified: PUBLISHED,
      inLanguage: "en-AU",
      image: `https://frontline.financial${SHARE_IMAGE}`,
      mainEntityOfPage: `https://frontline.financial${PATH}`,
      author: {
        "@type": "Person",
        name: "Hassan Arif",
        jobTitle: "Mortgage and finance broker",
        url: "https://frontline.financial/brokers",
        sameAs: HASSAN_PROFILES,
      },
      publisher: { "@id": "https://frontline.financial/brokers#business" },
      video: { "@id": `https://frontline.financial${PATH}#video` },
    },
    {
      "@type": "VideoObject",
      "@id": `https://frontline.financial${PATH}#video`,
      name: "Guess how much cash you'd need to buy a Manly apartment",
      description:
        "Hassan Arif works out the cash needed to buy the median Manly apartment with a 20% deposit and with 95% lending.",
      thumbnailUrl: `https://frontline.financial${POSTER}`,
      contentUrl: `https://frontline.financial${VIDEO}`,
      uploadDate: PUBLISHED,
      duration: "PT54S",
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
        { "@type": "ListItem", position: 3, name: "How much cash do you need to buy an apartment in Manly?", item: `https://frontline.financial${PATH}` },
      ],
    },
  ],
};

const H2 = "mt-12 border-l-4 border-[#00FCB8] pl-4 text-2xl font-bold md:text-3xl";
const LINK = "font-bold underline decoration-[#00FCB8] decoration-2 underline-offset-4 hover:text-[#39B2B2]";

function CashComparison() {
  return (
    <figure className="my-10">
      <div className="grid gap-4 md:grid-cols-2">
        {ROUTES.map((r) => (
          <div
            key={r.key}
            className={`overflow-hidden rounded-2xl bg-white shadow-lg ${r.key === "95" ? "ring-2 ring-[#00FCB8]" : ""}`}
          >
            <div className="flex items-center justify-between gap-3 bg-[#1C5472] px-5 py-4">
              <p className="text-lg font-bold text-white">{r.title}</p>
              <span className={`rounded-full px-3 py-1 text-xs font-bold tracking-wider ${r.tagClass}`}>{r.tag}</span>
            </div>
            <dl className="px-5 pt-3 text-base">
              {r.rows.map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-[#39B2B2]/30 py-2.5">
                  <dt className="text-gray-600">{label}</dt>
                  <dd className="font-bold tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="flex items-baseline justify-between px-5 pt-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[#39B2B2]">Cash needed</p>
              <p className="text-3xl font-bold tabular-nums">{r.total}</p>
            </div>
            <p className="px-5 pt-2 pb-5 text-sm text-gray-500">{r.note}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 text-sm text-gray-500">
        Example only: a {PRICE} apartment in Manly, owner-occupied, not a first home buyer. Stamp duty at NSW 2026-27
        rates. LMI estimated from one insurer&apos;s premium calculator. Costs cover legal, inspections, lender and
        government fees and settlement adjustments, and are an estimate.
      </figcaption>
    </figure>
  );
}

export default function ManlyCashPage() {
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
            </nav>
            <p className="text-sm font-bold uppercase tracking-widest text-[#00FCB8]">Home loans and deposits</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl">
              How much cash do you need to buy an apartment in Manly?
            </h1>
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
                  <time dateTime={PUBLISHED}>11 November 2026</time> · 4 min read
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider fill="#F5F5EF" />

      {/* ARTICLE: short answer and intro, then the video (sidebar on desktop), then the body */}
      <article className="px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl text-lg leading-relaxed text-[#1C5472] lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-x-14">
          <div className="lg:col-start-1 lg:row-start-1">
            <div className="rounded-2xl border-2 border-[#00FCB8] bg-white p-6 shadow-md">
              <p className="text-sm font-bold uppercase tracking-widest text-[#39B2B2]">The short answer</p>
              <p className="mt-2">
                The median Manly apartment is about $1.96 million. With a 20% deposit, you&apos;d need about $490,000 in
                cash once stamp duty and costs are in. With a 5% deposit and the lenders mortgage insurance added to the
                loan, it&apos;s closer to $196,000. Same apartment, less than half the cash.
              </p>
            </div>
            <p className="mt-8">
              I was out on the water at Manly earlier this year, looking back at the apartments along the cove, and I
              couldn&apos;t stop doing the maths. So I made a video about it.
            </p>
            <p className="mt-5">
              Before you read on, have a guess: how much cash would you need to buy one of those apartments? Most people
              I ask start at around half a million.
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
                  aria-label="Video: Hassan Arif works out the cash needed to buy the median Manly apartment"
                  className="mx-auto aspect-[9/16] w-full max-w-xs rounded-2xl bg-[#0A1628] shadow-xl lg:max-w-none"
                >
                  <source src={VIDEO} type="video/mp4" />
                </video>
                <figcaption className="mt-3 text-center text-sm text-gray-500">Manly Cove, Sydney.</figcaption>
              </figure>
              <div className="mt-6 hidden rounded-xl bg-[#1C5472] p-5 text-center lg:block">
                <p className="font-bold text-white">Want your own numbers?</p>
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
            <h2 className={H2}>What an apartment in Manly costs</h2>
            <p className="mt-5">
              The median apartment price in Manly was {PRICE} over the 12 months to July 2026, from 334 sales (
              <a href={MEDIAN_SOURCE} target="_blank" rel="noopener noreferrer" className={LINK}>
                CoreLogic data
              </a>
              ). Medians move every month and other data sources come in a little lower, so treat it as a guide to the
              middle of the market, not the price of any one apartment.
            </p>

            <h2 className={H2}>The 20% deposit route</h2>
            <p className="mt-5">
              Most people think you need 20% down. On {PRICE}, that&apos;s $392,000. Then there&apos;s stamp duty, which
              in NSW comes to $89,087 on that price (
              <a href={DUTY_SOURCE} target="_blank" rel="noopener noreferrer" className={LINK}>
                Revenue NSW
              </a>
              , 2026-27 rates), plus a few thousand in legal, inspection and settlement costs. That&apos;s nearly
              $490,000 in cash before you get the keys.
            </p>

            <h2 className={H2}>The 95% lending route</h2>
            <p className="mt-5">
              Some lenders will go up to 95% of the price. Your deposit drops to $98,000. Stamp duty stays the same,
              because it&apos;s based on the price, not the loan.
            </p>
            <p className="mt-5">
              The catch is lenders mortgage insurance. On this example it&apos;s about $78,000. But you don&apos;t pay that
              in cash: it goes on the loan, and you pay it off with your mortgage. So the real number is about $196,000.
            </p>

            <CashComparison />

            <h2 className={H2}>The trade-off</h2>
            <p className="mt-5">
              Less cash upfront isn&apos;t free. The loan is bigger, so the repayments are higher, and you pay interest on
              the mortgage insurance for as long as it&apos;s part of the loan. It also means less equity in the apartment
              on day one.
            </p>
            <p className="mt-5">
              For some people that&apos;s a good trade: a strong income, not much saved yet, and prices that move faster
              than their savings. For others, waiting and saving makes more sense. It comes down to your income, your
              plans and how long you&apos;ll hold the property.
            </p>

            <h2 className={H2}>What lenders look at for 95%</h2>
            <ul className="mt-5 space-y-3">
              {LENDER_CHECKS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-[#39B2B2]" aria-hidden>
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6">
              If you run your own business, lenders also read your income differently. There&apos;s more on that on our
              page about{" "}
              <Link href="/self-employed-home-loans" className={LINK}>
                self-employed home loans
              </Link>
              .
            </p>

            <h2 className={H2}>And a house in Manly?</h2>
            <p className="mt-5">
              The median Manly house was $5,025,000 over the same period. With 20% down, that&apos;s about $1.29 million
              in cash once stamp duty (including NSW premium duty) and costs are in. A 95% loan generally isn&apos;t an
              option at that price, because of the limits on mortgage insurance.
            </p>
            <p className="mt-5">
              So, how close was your guess? If you want the numbers on a place you&apos;re actually looking at, send me a
              message and I&apos;ll work them out with you.
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
          <h2 className="text-4xl font-bold text-[#1C5472] md:text-5xl">Want your own numbers?</h2>
          <p className="mt-4 text-lg text-[#1C5472] md:text-xl">
            Book a free assessment and I&apos;ll work out the cash you&apos;d need on the place you&apos;re looking at, or
            just call and tell me where things are at.
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
            General information only. This article doesn&apos;t take into account your objectives, financial situation or
            needs. The figures are an estimate for a {PRICE} apartment in NSW, owner-occupied, not a first home buyer, at a
            95% LVR, with LMI estimated from one insurer&apos;s premium calculator and other costs estimated. A 5% deposit
            depends on lender policy and your income. Lender criteria, fees and charges apply, and all applications are
            subject to the lender&apos;s assessment and approval. Frontline Financial Pty Ltd, authorised credit
            representative CRN 575968 of Australian Credit Licence 389087.
          </p>
        </div>
      </section>

      <WaveDivider fill="#1C5472" />

      <LayoutFooter />
    </div>
  );
}
