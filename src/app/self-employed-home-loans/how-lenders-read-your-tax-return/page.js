import Link from "next/link";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import WaveDivider from "@/components/WaveDivider";

/* Article: how lenders assess self-employed income, for self-employed people
   in Parramatta. Written in Hassan's voice around the Parramatta Lanes reel
   (filmed 24 Oct 2026, organic post 27 Oct). Supports /self-employed-home-loans
   (which owns "self-employed home loans Parramatta") with Parramatta-local
   signals and add-back searches, and links to it with that anchor text. On desktop the
   video sits in a sticky sidebar; on phones it follows the intro. The example
   figures are illustrative and match the reel; lender policy stays general
   ("some lenders"). */

const PATH = "/self-employed-home-loans/how-lenders-read-your-tax-return";
const CONSULT_HREF = "/contact?service=self-employed";
const PUBLISHED = "2026-10-27";
const VIDEO = "/videos/parramatta-lanes-self-employed.mp4";
const POSTER = "/images/articles/parramatta-lanes-video-poster.webp";
const SHARE_IMAGE = "/images/articles/self-employed-tax-return-share.jpg";

export const metadata = {
  title: "Self-Employed in Parramatta? How Lenders Read Your Tax Return",
  description:
    "Self-employed in Parramatta and buying a home? Your tax return can show less than your business makes. How lenders read it, from a Parramatta Square broker.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Self-employed in Parramatta? Your tax return can undersell what you earn.",
    description: "Same tax return, two lenders, two very different answers. Here's why, with an example.",
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

const ADD_BACKS = [
  "Depreciation",
  "One-off costs that won’t repeat, like a major repair",
  "Interest on loans you’re paying out with the new loan",
  "Super paid above the compulsory amount",
];

const FAQ_ITEMS = [
  {
    q: "What is an add-back?",
    a: "It’s an expense a lender adds back to your profit when it works out your income, because it isn’t a cash cost you’ll keep paying. Depreciation is the most common one.",
  },
  {
    q: "Do all lenders add back depreciation?",
    a: "No. Some do and some don’t, and each lender has its own list of what it will add back and what proof it wants. That’s why the lender you choose matters.",
  },
  {
    q: "What income do lenders use if I’m self-employed?",
    a: "Most lenders start from the profit in your tax returns and financials. Some average your last two years, others use the latest year if your income is going up. Then they apply their own add-back rules.",
  },
  {
    q: "Can I meet a mortgage broker in Parramatta?",
    a: "Yes. We’re on Level 49, 8 Parramatta Square, Parramatta NSW 2150, and take calls and appointments Monday to Friday, 10:30am to 8pm. We also meet by phone and video.",
  },
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `https://frontline.financial${PATH}#article`,
      headline: "Self-employed in Parramatta? Your tax return can undersell what you earn",
      description:
        "For self-employed people in Parramatta: how lenders assess self-employed income, why a tax return can show less than the business really earns, and how some lenders add back items like depreciation.",
      articleSection: "Self-employed home loans",
      about: ["Self-employed home loans", "Home loans in Parramatta", "Self-employed income", "Add-backs"],
      spatialCoverage: { "@type": "Place", name: "Parramatta, New South Wales" },
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
      },
      publisher: { "@id": "https://frontline.financial/brokers#business" },
      video: { "@id": `https://frontline.financial${PATH}#video` },
    },
    {
      "@type": "VideoObject",
      "@id": `https://frontline.financial${PATH}#video`,
      name: "Self-employed at Parramatta Lanes: why your tax return undersells you",
      description:
        "Hassan Arif at the Parramatta Lanes festival on why self-employed people can find a home loan harder to get, and how different lenders read the same numbers.",
      thumbnailUrl: `https://frontline.financial${POSTER}`,
      contentUrl: `https://frontline.financial${VIDEO}`,
      uploadDate: PUBLISHED,
      duration: "PT43S",
      contentLocation: { "@type": "Place", name: "Parramatta Lanes, Parramatta NSW" },
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
        { "@type": "ListItem", position: 4, name: "How lenders read your tax return", item: `https://frontline.financial${PATH}` },
      ],
    },
  ],
};

const H2 = "mt-12 border-l-4 border-[#00FCB8] pl-4 text-2xl font-bold md:text-3xl";

function Line({ label, value, add = false }) {
  return (
    <div className="flex justify-between gap-3 py-1.5 text-[#1C5472]">
      <span>{label}</span>
      <span className={`font-bold tabular-nums ${add ? "text-[#078a68]" : ""}`}>{value}</span>
    </div>
  );
}

function LenderExample() {
  return (
    <figure className="my-10 overflow-hidden rounded-2xl bg-white shadow-lg">
      <div className="flex items-start justify-between gap-4 bg-[#1C5472] px-6 py-5">
        <div>
          <p className="font-bold uppercase tracking-wider text-white">How lenders read it</p>
          <p className="mt-1 text-sm text-[#bfe3df]">Same tax return, two different lenders</p>
        </div>
        <span className="shrink-0 rounded-full bg-[#00FCB8] px-3 py-1 text-xs font-bold tracking-wider text-[#1C5472]">
          ILLUSTRATIVE
        </span>
      </div>
      <div className="grid gap-4 p-5 sm:grid-cols-2 md:p-6">
        <div className="flex flex-col rounded-xl border-2 border-[#d5e4df] bg-[#eef4f2] p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-[#39B2B2]">Lender A</p>
          <div className="mb-3 mt-2">
            <Line label="Net profit" value="$68,000" />
          </div>
          <div className="mt-auto border-t-2 border-[#1C5472] pt-3">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Income used</p>
            <p className="text-4xl font-bold text-[#1C5472]">$68,000</p>
          </div>
        </div>
        <div className="flex flex-col rounded-xl border-2 border-[#00FCB8] bg-[#e6fbf4] p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-[#39B2B2]">Lender B</p>
          <div className="mb-3 mt-2">
            <Line label="Net profit" value="$68,000" />
            <Line label="+ Depreciation" value="$35,000" add />
            <Line label="+ One-off repairs" value="$12,000" add />
          </div>
          <div className="mt-auto border-t-2 border-[#1C5472] pt-3">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Income used</p>
            <p className="text-4xl font-bold text-[#078a68]">$115,000</p>
          </div>
        </div>
      </div>
      <figcaption className="px-6 pb-5 text-sm text-gray-500">
        Illustrative example only, not a real client. Some lenders add back certain expenses. Lender criteria apply.
      </figcaption>
    </figure>
  );
}

export default function TaxReturnArticlePage() {
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
            <p className="text-sm font-bold uppercase tracking-widest text-[#00FCB8]">Self-employed home loans in Parramatta</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl">
              Self-employed in Parramatta? Your tax return can undersell what you earn.
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
                  <time dateTime={PUBLISHED}>27 October 2026</time> · 3 min read
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
            <p>
              On Saturday night I went down to Parramatta Lanes, and it was packed. Walking past the stalls, I kept
              noticing the same thing. Every one of them was someone&apos;s own business. People who have backed
              themselves.
            </p>
            <p className="mt-5">
              And plenty of them would find a home loan harder to get than someone on a salary. Not because they
              don&apos;t earn enough. Because once all the deductions go through, their tax return makes it look like they
              earn less than they do. I filmed a quick video about it on the night.
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
                  aria-label="Video: Hassan Arif at Parramatta Lanes on home loans for self-employed people in Parramatta"
                  className="mx-auto aspect-[9/16] w-full max-w-xs rounded-2xl bg-[#0A1628] shadow-xl lg:max-w-none"
                >
                  <source src={VIDEO} type="video/mp4" />
                </video>
                <figcaption className="mt-3 text-center text-sm text-gray-500">
                  Filmed at Parramatta Lanes, Saturday 24 October 2026.
                </figcaption>
              </figure>
              <div className="mt-6 hidden rounded-xl bg-[#1C5472] p-5 text-center lg:block">
                <p className="font-bold text-white">Self-employed and buying?</p>
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
            <h2 className={H2}>Why your tax return can undersell your income</h2>
            <p className="mt-5">
              If you&apos;re on a salary, a lender mostly looks at a couple of payslips. If you&apos;re self-employed, they
              want your tax returns and financials, and they work your income out from the profit.
            </p>
            <p className="mt-5">
              A good accountant&apos;s job is to keep your tax down, legally. Depreciation on the ute and equipment, a big
              repair, interest on a loan you&apos;re about to pay out. All of it comes off your profit, which is what you
              want at tax time. But it&apos;s also the figure a lender starts from when it works out what you can borrow.
            </p>

            <h2 className={H2}>Same tax return, two lenders, two different answers</h2>
            <p className="mt-5">Here&apos;s a simple example. The numbers are made up, it&apos;s not a real client.</p>
            <p className="mt-5">
              A business turns over $420,000. After costs, the profit and loss shows a net profit of $68,000. That&apos;s
              after $35,000 of depreciation and a $12,000 repair that won&apos;t come up every year.
            </p>

            <LenderExample />

            <p>
              Lender A takes the $68,000 and that&apos;s the income it uses. Lender B adds back the depreciation, because
              no cash actually left the business for it that year, and the one-off repair. It uses $115,000.
            </p>
            <p className="mt-5">
              Same business, same tax return, and a very different borrowing figure. Not every lender does this, and the
              ones that do each have their own rules on what they&apos;ll add back and what proof they want.
            </p>

            <h2 className={H2}>What lenders may add back to self-employed income</h2>
            <p className="mt-5">It depends on the lender, but these are the ones that come up most:</p>
            <ul className="mt-5 space-y-3">
              {ADD_BACKS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-[#39B2B2]" aria-hidden>
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5">
              Some lenders can also count profit you&apos;ve left in your company, or income your trust has distributed.
              There&apos;s more on that, and on full doc and low doc loans, on our page about{" "}
              <Link href="/self-employed-home-loans" className="font-bold underline decoration-[#00FCB8] decoration-2 underline-offset-4 hover:text-[#39B2B2]">
                self-employed home loans in Parramatta
              </Link>
              .
            </p>

            <h2 className={H2}>Before you apply for a self-employed home loan in Parramatta</h2>
            <p className="mt-5">
              I come from a tax and accounting background, and I&apos;ve seen it all. The first thing I do is go through
              your returns and financials the way a credit assessor will. Then we only go to lenders whose rules fit how
              your business actually earns. One application to the right lender, instead of trying a few banks and having
              every one of them show up on your credit file.
            </p>
            <p className="mt-5">
              Anyway, big respect to everyone who ran a stall at the festival. If you&apos;re self-employed and thinking
              about buying, come and see me on Level 49 at 8 Parramatta Square or give me a call.
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
          <h2 className="text-4xl font-bold text-[#1C5472] md:text-5xl">Want to know how a lender would read yours?</h2>
          <p className="mt-4 text-lg text-[#1C5472] md:text-xl">
            Book a free assessment. Bring your last two years of returns if you have them, or just call and tell me where
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
            needs. The example is illustrative, not a real client. Lender criteria, fees and charges apply, and all
            applications are subject to the lender&apos;s assessment and approval. For tax advice, speak with your
            accountant. Frontline Financial Pty Ltd, authorised credit representative CRN 575968 of Australian Credit
            Licence 389087.
          </p>
        </div>
      </section>

      <WaveDivider fill="#1C5472" />

      <LayoutFooter />
    </div>
  );
}
