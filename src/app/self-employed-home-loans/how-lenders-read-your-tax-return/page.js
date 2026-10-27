import Link from "next/link";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import WaveDivider from "@/components/WaveDivider";

/* Article: how lenders read a self-employed tax return. Written in Hassan's
   voice around the Parramatta Lanes reel (filmed 24 Oct 2026, organic post
   27 Oct). Supports /self-employed-home-loans for "self employed home loan
   tax return" and add-back searches. The example figures are illustrative
   and match the reel; lender policy stays general ("some lenders"). */

const PATH = "/self-employed-home-loans/how-lenders-read-your-tax-return";
const CONSULT_HREF = "/contact?service=self-employed";
const PUBLISHED = "2026-10-27";
const VIDEO = "/videos/parramatta-lanes-self-employed.mp4";
const POSTER = "/images/articles/parramatta-lanes-video-poster.webp";
const SHARE_IMAGE = "/images/articles/self-employed-tax-return-share.jpg";

export const metadata = {
  title: "Self-Employed Home Loans: How Lenders Read Your Tax Return | Frontline Financial",
  description:
    "Your tax return is built to keep tax down, and lenders start from the same profit figure. How add-backs work, with an example, from a Parramatta broker with a tax background.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Self-employed? Your tax return can undersell what you earn.",
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

const TRANSCRIPT =
  "I went to Parramatta Lanes on Saturday night, and it was packed. I had to get the skewers. Walking around, I kept noticing the same thing. Every stall is someone’s own business. People that have backed themselves. And the crazy part? Plenty of self-employed people find a home loan harder to get than someone on a salary. Not because they don’t earn enough, because after all the deductions their tax return makes it look like they earn less than what they actually do. With my tax and accounting background I’ve seen it all, and most people don’t realise that different lenders will read your numbers differently. Anyway, big respect to anyone who chose to run their own stall at the festival, and if you’re self-employed, you can also find me in Parramatta Square.";

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `https://frontline.financial${PATH}#article`,
      headline: "Self-employed? Your tax return can undersell what you earn",
      description:
        "Why a self-employed tax return can show less income than the business really earns, and how some lenders add back items like depreciation.",
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
      transcript: TRANSCRIPT,
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
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/60">
            <Link href="/" className="hover:text-[#00FCB8]">Home</Link>
            <span className="mx-2" aria-hidden>/</span>
            <Link href="/brokers" className="hover:text-[#00FCB8]">Home loans</Link>
            <span className="mx-2" aria-hidden>/</span>
            <Link href="/self-employed-home-loans" className="hover:text-[#00FCB8]">Self-employed</Link>
          </nav>
          <p className="text-sm font-bold uppercase tracking-widest text-[#00FCB8]">Self-employed home loans</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl">
            Self-employed? Your tax return can undersell what you earn.
          </h1>
          <div className="mt-8 flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hassan-broker-v2.png"
              alt="Hassan Arif JP"
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
      </section>

      <WaveDivider fill="#F5F5EF" />

      {/* ARTICLE */}
      <article className="px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-lg leading-relaxed text-[#1C5472]">
          <p>
            On Saturday night I went down to Parramatta Lanes, and it was packed. Walking past the stalls, I kept noticing
            the same thing. Every one of them was someone&apos;s own business. People who have backed themselves.
          </p>
          <p className="mt-5">
            And plenty of them would find a home loan harder to get than someone on a salary. Not because they don&apos;t
            earn enough. Because once all the deductions go through, their tax return makes it look like they earn less
            than they do. I filmed a quick video about it on the night.
          </p>

          <figure className="my-10">
            <video
              controls
              playsInline
              preload="metadata"
              poster={POSTER}
              className="mx-auto aspect-[9/16] w-full max-w-xs rounded-2xl bg-[#0A1628] shadow-xl"
            >
              <source src={VIDEO} type="video/mp4" />
            </video>
            <figcaption className="mt-3 text-center text-sm text-gray-500">
              Filmed at Parramatta Lanes, Saturday 24 October 2026.
            </figcaption>
            <details className="mx-auto mt-4 max-w-xl rounded-xl bg-white px-5 py-3 text-base shadow-sm">
              <summary className="cursor-pointer font-bold text-[#1C5472]">Read the transcript</summary>
              <p className="mt-3 text-gray-600">{TRANSCRIPT}</p>
            </details>
          </figure>

          <h2 className="mt-12 border-l-4 border-[#00FCB8] pl-4 text-2xl font-bold md:text-3xl">
            Why a tax return can undersell a business
          </h2>
          <p className="mt-5">
            If you&apos;re on a salary, a lender mostly looks at a couple of payslips. If you&apos;re self-employed, they
            want your tax returns and financials, and they work your income out from the profit.
          </p>
          <p className="mt-5">
            A good accountant&apos;s job is to keep your tax down, legally. Depreciation on the ute and equipment, a big
            repair, interest on a loan you&apos;re about to pay out. All of it comes off your profit, which is what you want
            at tax time. But it&apos;s also the figure a lender starts from when it works out what you can borrow.
          </p>

          <h2 className="mt-12 border-l-4 border-[#00FCB8] pl-4 text-2xl font-bold md:text-3xl">
            Same tax return, two different answers
          </h2>
          <p className="mt-5">
            Here&apos;s a simple example. The numbers are made up, it&apos;s not a real client.
          </p>
          <p className="mt-5">
            A business turns over $420,000. After costs, the profit and loss shows a net profit of $68,000. That&apos;s
            after $35,000 of depreciation and a $12,000 repair that won&apos;t come up every year.
          </p>

          <LenderExample />

          <p>
            Lender A takes the $68,000 and that&apos;s the income it uses. Lender B adds back the depreciation, because no
            cash actually left the business for it that year, and the one-off repair. It uses $115,000.
          </p>
          <p className="mt-5">
            Same business, same tax return, and a very different borrowing figure. Not every lender does this, and the ones
            that do each have their own rules on what they&apos;ll add back and what proof they want.
          </p>

          <h2 className="mt-12 border-l-4 border-[#00FCB8] pl-4 text-2xl font-bold md:text-3xl">
            What some lenders may add back
          </h2>
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
            There&apos;s more on that, and on full doc and low doc loans, on our{" "}
            <Link href="/self-employed-home-loans" className="font-bold underline decoration-[#00FCB8] decoration-2 underline-offset-4 hover:text-[#39B2B2]">
              self-employed home loans
            </Link>{" "}
            page.
          </p>

          <h2 className="mt-12 border-l-4 border-[#00FCB8] pl-4 text-2xl font-bold md:text-3xl">
            What I&apos;d do before you apply
          </h2>
          <p className="mt-5">
            I come from a tax and accounting background, and I&apos;ve seen it all. The first thing I do is go through your
            returns and financials the way a credit assessor will. Then we only go to lenders whose rules fit how your
            business actually earns. One application to the right lender, instead of trying a few banks and having every
            one of them show up on your credit file.
          </p>
          <p className="mt-5">
            What I won&apos;t do is tell you to change how you report your income to get a loan. That&apos;s a tax decision,
            and it&apos;s one for you and your accountant. I&apos;m happy to work with them.
          </p>
          <p className="mt-5">
            Anyway, big respect to everyone who ran a stall at the festival. If you&apos;re self-employed and thinking about
            buying, come and see me at Parramatta Square or give me a call.
          </p>
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
