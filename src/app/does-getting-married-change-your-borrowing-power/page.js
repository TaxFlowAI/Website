import Link from "next/link";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import WaveDivider from "@/components/WaveDivider";

/* Article: how getting married changes borrowing power, through HEM. Written in
   Hassan's voice around the Sham's wedding reel (organic post 30 Oct 2026). It
   targets the question in the title, not "what is HEM", which the comparison
   sites own. Sits at the top level because /brokers/layout.js would add the
   /brokers schema to anything nested under it. On desktop the video sits in a
   sticky sidebar; on phones it follows the intro. The chart has no dollar
   figures, because HEM tables aren't public; lender policy stays general. */

const PATH = "/does-getting-married-change-your-borrowing-power";
const CONSULT_HREF = "/contact";
const PUBLISHED = "2026-10-31";
const VIDEO = "/videos/sham-wedding-hem.mp4";
const POSTER = "/images/articles/sham-wedding-video-poster.webp";
const SHARE_IMAGE = "/images/articles/married-borrowing-power-share.jpg";
const HEM_SOURCE =
  "https://melbourneinstitute.unimelb.edu.au/research/family-and-labour-economics/projects/2012/household-expenditure-measure-quarterly-updates";
const RG209 =
  "https://www.asic.gov.au/regulatory-resources/find-a-document/regulatory-guides/rg-209-credit-licensing-responsible-lending-conduct/";

export const metadata = {
  title: "Does Getting Married Change Your Borrowing Power? HEM Explained",
  description:
    "Usually, yes. Lenders count a couple's living costs, not one person's, using a benchmark called HEM. What changes, what helps, and what to do before you apply.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Does getting married change your borrowing power?",
    description: "Same guy, same car, same income. So why did the bank's numbers change after the wedding?",
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

const HOUSEHOLDS = [
  { label: "Single", width: "42%" },
  { label: "Couple", width: "64%" },
  { label: "Couple + kids", width: "84%" },
];

const SCENARIOS = [
  {
    title: "You both work and you're both on the loan",
    tag: "Usually more",
    tagClass: "bg-[#00FCB8] text-[#1C5472]",
    body: "Two incomes against one household. The extra income usually outweighs the extra living costs. Both of your debts count too, so HECS, credit cards and car loans all go in.",
  },
  {
    title: "You both work, but only one of you is on the loan",
    tag: "Depends on the lender",
    tagClass: "bg-[#39B2B2] text-white",
    body: "Applying in one name doesn't automatically make you single in the lender's eyes. Many will still count your partner in the household, and some will ask what your partner contributes. Only your income goes in, so this can come out lower than you'd expect.",
  },
  {
    title: "One of you isn't working right now",
    tag: "Usually less",
    tagClass: "bg-[#1C5472] text-white",
    body: "One income and two people's living costs. You can usually still apply together, but you can expect to borrow less than the same income would support for a single person.",
  },
];

const CHECKLIST = [
  "Be upfront about who lives with you. The application asks, and it has to be accurate.",
  "Run the numbers both ways. Applying together and applying in one name can give very different answers, and they change from lender to lender.",
  "Know what you really spend. Lenders look at your statements, so go through them before you fill in a living expenses form.",
  "Look at both sets of debts. If you're both on the loan, credit card limits, HECS and car loans count for both of you.",
  "Don't rely on old numbers. A pre-approval or calculator result from before the wedding was based on your old household.",
];

const FAQ_ITEMS = [
  {
    q: "Does getting married affect your borrowing power?",
    a: "Usually, yes. The certificate itself doesn't change anything, but your household does. Lenders count living costs for two people, and if your partner's income goes on the loan too, that usually more than makes up for it.",
  },
  {
    q: "What is HEM on a home loan?",
    a: "HEM is the Household Expenditure Measure, a benchmark of modest household spending from the Melbourne Institute. Many lenders compare it with the living costs you declare and generally use whichever is higher.",
  },
  {
    q: "Is HEM higher for couples?",
    a: "Yes. A couple's benchmark is generally higher than a single person's, but less than double it. The figure also depends on your dependants, income, location and the lender.",
  },
  {
    q: "Can I apply for a home loan without my spouse?",
    a: "Yes, you can apply in your own name. That doesn't automatically mean you're assessed as single, though. The lender may still count your partner and any dependants in the household, and may ask what your partner contributes.",
  },
  {
    q: "Does this apply to de facto couples?",
    a: "Generally, yes. Lenders look at who lives in the household, not whether you have a marriage certificate.",
  },
  {
    q: "Can I meet a mortgage broker in Parramatta?",
    a: "Yes. We're on Level 49, 8 Parramatta Square, Parramatta NSW 2150, and take calls and appointments Monday to Friday, 10:30am to 8pm. We also meet by phone and video.",
  },
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `https://frontline.financial${PATH}#article`,
      headline: "Does getting married change your borrowing power?",
      description:
        "How getting married changes what you can borrow: the Household Expenditure Measure (HEM), how lenders treat couples and sole applicants, and what to check before you apply.",
      articleSection: "Home loans",
      about: ["Borrowing power", "Household Expenditure Measure", "Home loans for couples", "Living expenses"],
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
      },
      publisher: { "@id": "https://frontline.financial/brokers#business" },
      video: { "@id": `https://frontline.financial${PATH}#video` },
    },
    {
      "@type": "VideoObject",
      "@id": `https://frontline.financial${PATH}#video`,
      name: "My business partner got married, so I worked out his HEM",
      description:
        "Hassan Arif on how getting married changes the living costs a bank assumes you spend, using his business partner Sham's wedding as the example.",
      thumbnailUrl: `https://frontline.financial${POSTER}`,
      contentUrl: `https://frontline.financial${VIDEO}`,
      uploadDate: PUBLISHED,
      duration: "PT1M16S",
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
        { "@type": "ListItem", position: 3, name: "Does getting married change your borrowing power?", item: `https://frontline.financial${PATH}` },
      ],
    },
  ],
};

const H2 = "mt-12 border-l-4 border-[#00FCB8] pl-4 text-2xl font-bold md:text-3xl";
const LINK = "font-bold underline decoration-[#00FCB8] decoration-2 underline-offset-4 hover:text-[#39B2B2]";

function HouseholdChart() {
  return (
    <figure className="my-10 overflow-hidden rounded-2xl bg-white shadow-lg">
      <div className="flex items-start justify-between gap-4 bg-[#1C5472] px-6 py-5">
        <div>
          <p className="font-bold uppercase tracking-wider text-white">The living costs a bank assumes</p>
          <p className="mt-1 text-sm text-[#bfe3df]">Same income, different household</p>
        </div>
        <span className="shrink-0 rounded-full bg-[#00FCB8] px-3 py-1 text-xs font-bold tracking-wider text-[#1C5472]">
          ILLUSTRATIVE
        </span>
      </div>
      <div className="space-y-4 p-5 md:p-6">
        {HOUSEHOLDS.map((row) => (
          <div key={row.label}>
            <p className="text-sm font-bold text-[#1C5472]">{row.label}</p>
            <div className="mt-1.5 h-7 overflow-hidden rounded-lg bg-[#eef4f2]">
              <div className="h-full rounded-lg bg-gradient-to-r from-[#39B2B2] to-[#00FCB8]" style={{ width: row.width }} />
            </div>
          </div>
        ))}
      </div>
      <figcaption className="px-6 pb-5 text-sm text-gray-500">
        Illustrative only, not real HEM figures. The actual benchmark depends on the lender, your income, where you live
        and how many dependants you have.
      </figcaption>
    </figure>
  );
}

export default function MarriedBorrowingPowerPage() {
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
            <p className="text-sm font-bold uppercase tracking-widest text-[#00FCB8]">Home loans and borrowing power</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl">
              Does getting married change your borrowing power?
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
                  <time dateTime={PUBLISHED}>31 October 2026</time> · 4 min read
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
                Usually, yes, but not because of the certificate. What changes is your household. Lenders now count
                living costs for two people, using a benchmark called HEM, whether you actually spend that much or not.
                If your partner&apos;s income goes on the loan too, that usually more than makes up for it.
              </p>
            </div>
            <p className="mt-8">
              My business partner Sham recently got married, and I was lucky enough to be one of his groomsmen. It was a
              beautiful day. There were speeches, there were tears, the whole lot.
            </p>
            <p className="mt-5">
              And all I could think about was calculating his new Medicare levy surcharge. Then I thought of something
              more important, and I started to work out his new HEM. I made a video about it, because apparently this is
              what I do at weddings.
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
                  aria-label="Video: Hassan Arif on how getting married changes the living costs a bank assumes you spend"
                  className="mx-auto aspect-[9/16] w-full max-w-xs rounded-2xl bg-[#0A1628] shadow-xl lg:max-w-none"
                >
                  <source src={VIDEO} type="video/mp4" />
                </video>
                <figcaption className="mt-3 text-center text-sm text-gray-500">
                  Sham&apos;s wedding, October 2026.
                </figcaption>
              </figure>
              <div className="mt-6 hidden rounded-xl bg-[#1C5472] p-5 text-center lg:block">
                <p className="font-bold text-white">Something changed at home?</p>
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
            <h2 className={H2}>What HEM is and why it matters</h2>
            <p className="mt-5">
              HEM stands for Household Expenditure Measure. It&apos;s a benchmark of modest household spending from the{" "}
              <a href={HEM_SOURCE} target="_blank" rel="noopener noreferrer" className={LINK}>
                Melbourne Institute
              </a>
              , updated every quarter. Lenders use it to check the living costs you tell them about.
            </p>
            <p className="mt-5">
              It covers everyday spending, not your rent or mortgage. It&apos;s set by household type, so it&apos;s different
              for a single person, a couple and a family with kids. Lenders usually factor in your income and where you
              live as well.
            </p>
            <p className="mt-5">
              Here&apos;s the part that catches people out. A lender generally compares what you say you spend with its
              benchmark and uses whichever is higher. Spend less than the benchmark and it can still use the benchmark.
              Spend more and it uses your number.
            </p>
            <p className="mt-5">
              Not every lender uses HEM, and some have their own benchmark. A benchmark also tells a lender nothing about
              you personally, as{" "}
              <a href={RG209} target="_blank" rel="noopener noreferrer" className={LINK}>
                ASIC&apos;s responsible lending guide
              </a>{" "}
              points out, so you can still expect questions about what you actually spend.
            </p>

            <h2 className={H2}>What actually changes when you get married</h2>
            <p className="mt-5">
              Take Sham. Before the wedding, the bank looked at him as one guy, one toothbrush and one Uber Eats order.
            </p>
            <p className="mt-5">
              Now he&apos;s married. Same Sham, same car, same income. But the bank now sees two people in the household,
              so on paper his living expenses just went up. It doesn&apos;t matter if they&apos;re living on love or
              two-minute noodles. If the benchmark is higher than what you actually spend, the bank uses the benchmark.
            </p>

            <HouseholdChart />

            <p>
              And it&apos;s not really about the certificate. Lenders look at who&apos;s in the household, so a de facto
              couple is generally treated the same way.
            </p>

            <h2 className={H2}>Applying together or on your own</h2>
            <p className="mt-5">
              This is where getting married can actually help. A couple&apos;s benchmark is generally higher than one
              person&apos;s, but less than double it. So what happens to your borrowing power comes down to whose income
              goes on the loan.
            </p>
            <div className="mt-6 space-y-4">
              {SCENARIOS.map((item) => (
                <div key={item.title} className="rounded-xl bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.tagClass}`}>{item.tag}</span>
                  </div>
                  <p className="mt-2 text-base text-gray-600">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-6">
              If one or both of you run a business, there&apos;s another layer, because lenders read that income
              differently. There&apos;s more on our page about{" "}
              <Link href="/self-employed-home-loans" className={LINK}>
                self-employed home loans in Parramatta
              </Link>
              .
            </p>

            <h2 className={H2}>When kids come along</h2>
            <p className="mt-5">
              And when kids come along, it goes up again. Sorry, Sham. Each dependant raises the benchmark, so the same
              income supports a smaller loan. If you&apos;re planning to buy and start a family around the same time,
              it&apos;s worth running the numbers both ways.
            </p>

            <h2 className={H2}>What to do before you apply</h2>
            <ul className="mt-5 space-y-3">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-[#39B2B2]" aria-hidden>
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6">
              If you&apos;ve just got married, had a baby, or anything&apos;s changed at home, your borrowing power has
              changed too. Send me a message and I&apos;ll run your numbers.
            </p>
            <p className="mt-5">And Sham, congratulations. You&apos;re officially more expensive in the eyes of the bank.</p>

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
          <h2 className="text-4xl font-bold text-[#1C5472] md:text-5xl">Has something changed at home?</h2>
          <p className="mt-4 text-lg text-[#1C5472] md:text-xl">
            Book a free assessment and I&apos;ll run your numbers, together and on your own, or just call and tell me where
            things are at.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={CONSULT_HREF} className="inline-flex w-full items-center justify-center rounded-lg bg-[#1C5472] px-10 py-4 font-bold text-white transition-all duration-200 hover:scale-105 hover:opacity-90 sm:w-auto">
              Get a Free Assessment
            </a>
            <a href="tel:+61422959486" className="inline-flex w-full items-center justify-center rounded-lg border-2 border-[#1C5472] bg-transparent px-10 py-4 font-bold text-[#1C5472] transition-all duration-200 hover:scale-105 hover:bg-[#1C5472]/10 sm:w-auto">
              Call Hassan: +61 422 959 486
            </a>
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-xs leading-relaxed text-[#1C5472]/80">
            General information only. This article doesn&apos;t take into account your objectives, financial situation or
            needs. The chart is illustrative and doesn&apos;t show real HEM figures. Lender criteria, fees and charges
            apply, and all applications are subject to the lender&apos;s assessment and approval. For tax questions, speak
            with your accountant. Frontline Financial Pty Ltd, authorised credit representative CRN 575968 of Australian
            Credit Licence 389087.
          </p>
        </div>
      </section>

      <WaveDivider fill="#1C5472" />

      <LayoutFooter />
    </div>
  );
}
