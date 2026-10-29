import Link from "next/link";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import WaveDivider from "@/components/WaveDivider";

/* Self-employed home loans: the Brokers niche from 26 Oct 2026 (self-employed
   people buying residential property). Target queries: self employed home
   loan Parramatta, self employed mortgage broker, low doc home loan, home
   loan with one year tax return. Server component so the copy, metadata and
   structured data ship as plain HTML; the FAQ uses <details>, so no JS.
   Lender policy is described in general terms only ("some lenders"): no
   lender names, no approval promises, tax questions go to the accountant. */

const CONSULT_HREF = "/contact?service=self-employed";

export const metadata = {
  title: "Self-Employed Home Loans Parramatta | Frontline Financial",
  description:
    "Self-employed and buying a home? A Parramatta mortgage broker who checks 30+ lenders' rules for sole traders, company directors and ABN holders, including low doc options.",
  alternates: { canonical: "/self-employed-home-loans" },
  openGraph: {
    title: "Self-employed? Your tax return isn't the whole story.",
    description:
      "Home loans for sole traders, company directors and ABN holders. Free assessment with a Parramatta broker who reads business financials.",
    url: "/self-employed-home-loans",
    siteName: "Frontline Financial",
    type: "website",
    locale: "en_AU",
    images: [{ url: "/images/brokers-home-couple.webp", width: 1200, height: 548 }],
  },
  twitter: { card: "summary_large_image" },
};

const PAIN_POINTS = [
  {
    q: "“The bank used my taxable income, not what the business really makes.”",
    a: "Some lenders add back depreciation, one-off costs and interest on debts you’re refinancing, which can lift the income they assess.",
  },
  {
    q: "“I’ve only got one year of tax returns.”",
    a: "Not every lender needs two. Some will look at one year of returns with a recent notice of assessment.",
  },
  {
    q: "“I pay myself a small wage and leave the profit in the company.”",
    a: "Some lenders can count profit kept in a company or paid out by a trust, depending on the structure and your share of it.",
  },
  {
    q: "“Last year’s returns aren’t lodged yet.”",
    a: "Low doc loans use BAS, business bank statements or an accountant’s declaration instead. They cost more, so we weigh that up with you.",
  },
];

const WHO_WE_HELP = [
  "Sole traders and tradies",
  "Company directors",
  "Trusts and partnerships",
  "Contractors on an ABN",
  "Medical, legal and accounting professionals",
  "Businesses under two years old",
];

const HOW_LENDERS_ASSESS = [
  {
    title: "How long you’ve been trading",
    desc: "Many lenders want two years of ABN registration and tax returns. Some will consider one year of returns, and specialist lenders may consider less, usually with a larger deposit or a higher rate.",
  },
  {
    title: "Which year of income they use",
    desc: "Some lenders average your last two years. Others use the most recent year if your income is rising. If it has dropped, expect the lower figure.",
  },
  {
    title: "What they add back",
    desc: "Depending on the lender, items such as depreciation, interest on loans being refinanced, one-off expenses and super above the compulsory amount can be added back to your income.",
  },
  {
    title: "Profit kept in the business",
    desc: "Some lenders count profit retained in your company or distributed by your trust. Each has its own rules about structure and ownership.",
  },
];

const DOC_TYPES = [
  {
    name: "Full doc",
    docs: "Personal and business tax returns, ATO notices of assessment and financial statements.",
    suits: "Business owners whose returns are lodged and up to date.",
    expect: "The widest choice of lenders, standard rates and features.",
    highlight: true,
  },
  {
    name: "Low doc (alt doc)",
    docs: "BAS, business bank statements or an accountant’s declaration instead of tax returns.",
    suits: "Owners whose returns are behind, or whose recent income isn’t in them yet.",
    expect: "Fewer lenders, usually a higher rate and a bigger deposit. Many borrowers refinance to a full doc loan later.",
    highlight: false,
  },
];

const DOCS_YOU = [
  "Photo ID",
  "Last two years’ personal tax returns and ATO notices of assessment",
  "Recent statements for savings, loans and credit cards",
];

const DOCS_BUSINESS = [
  "ABN, and GST registration if you have it",
  "Last two years’ business tax returns and financial statements (company or trust)",
  "Recent BAS",
  "ATO account statement and payment plan, if you have tax debt",
  "Your accountant’s contact details",
];

const AVOID = [
  {
    title: "Restructuring right before you apply",
    desc: "Moving from sole trader to a company or trust can reset some lenders’ trading-history clock. Talk to us and your accountant first.",
  },
  {
    title: "Applying at several banks yourself",
    desc: "Every application shows on your credit file. We pick the right lender before anything is lodged.",
  },
  {
    title: "Lodging returns and BAS late",
    desc: "Lenders want them lodged and current. Late lodgement narrows your options.",
  },
  {
    title: "Leaving ATO debt unmanaged",
    desc: "Tax debt on a payment plan with repayments up to date is often workable. Unmanaged debt is much harder.",
  },
  {
    title: "Taking on new finance first",
    desc: "A new car loan or credit card just before you apply reduces how much you can borrow.",
  },
];

const PROCESS_STEPS = [
  { num: 1, title: "15-minute call", desc: "Tell us what you want to buy, how your business is set up and what you’ve lodged." },
  { num: 2, title: "We read your numbers", desc: "We go through your returns, financials and credit the way a lender will, and work out a realistic borrowing range." },
  { num: 3, title: "We shortlist lenders", desc: "Only lenders whose self-employed rules fit you, with rates, fees and trade-offs explained." },
  { num: 4, title: "Application to settlement", desc: "We prepare and lodge the application, deal with the lender and keep you, and your accountant, updated." },
];

const SUBURBS = [
  "Parramatta", "Harris Park", "Westmead", "North Parramatta", "Granville", "Merrylands",
  "Wentworthville", "Rydalmere", "Ermington", "Toongabbie", "Baulkham Hills", "Castle Hill", "Blacktown",
];

const FAQ_ITEMS = [
  {
    q: "Can I get a home loan if I’m self-employed?",
    a: "Yes. Lenders lend to sole traders, company directors and trust beneficiaries every day. The difference is how they work out your income, and their rules vary a lot from one lender to the next. That’s why comparing lenders matters more when you’re self-employed.",
  },
  {
    q: "How long do I need to be self-employed to get a home loan?",
    a: "Many lenders want two years of ABN registration and tax returns. Some will consider one year of returns, and some specialist lenders will consider a shorter trading history, usually with a larger deposit or a higher rate. If you worked in the same industry as an employee before going out on your own, some lenders take that into account.",
  },
  {
    q: "Can I get a home loan with one year of tax returns?",
    a: "Sometimes. Some lenders accept one year of personal and business returns, usually with a recent ATO notice of assessment. The loan size and deposit needed can differ, so we check which lenders fit your figures before anything is lodged.",
  },
  {
    q: "What is a low doc home loan?",
    a: "A low doc (or alt doc) loan uses other evidence of income, such as BAS, business bank statements or an accountant’s declaration, instead of full tax returns. These loans usually have a higher interest rate and need a bigger deposit. They can suit owners whose returns are behind, and many borrowers refinance to a standard loan once their returns are up to date.",
  },
  {
    q: "My accountant keeps my taxable income low. Will that reduce what I can borrow?",
    a: "It can, because most lenders start from the income in your tax returns. Some lenders add back items such as depreciation, interest on debts you’re refinancing and one-off expenses, which can lift the income they assess. How you report income is a tax decision, so talk to your accountant before changing anything.",
  },
  {
    q: "How much deposit do I need?",
    a: "It depends on the lender and the type of loan. With full documents, some lenders will lend more than 80% of the property value with lenders mortgage insurance (LMI). Low doc loans usually need a larger deposit. Government schemes for first home buyers are open to self-employed people too, and we’ll check whether you’re eligible.",
  },
  {
    q: "I have an ATO debt. Can I still get a home loan?",
    a: "Often, if the debt is on a payment plan and the repayments are up to date. Lenders will ask for your ATO statement and the plan. A tax debt with no arrangement in place makes it much harder.",
  },
  {
    q: "Does it cost anything to use Frontline Financial?",
    a: "No. Our broking service is free to you as the borrower. The lender pays us a commission once your loan settles, and we disclose it in our credit guide.",
  },
  {
    q: "Will talking to you affect my credit score?",
    a: "No. A conversation and assessment with us doesn’t lodge anything with a lender. Applications are what show on your credit file, which is why we choose the right lender first instead of trying several.",
  },
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://frontline.financial/self-employed-home-loans#service",
      name: "Self-employed home loans",
      serviceType: "Mortgage broking for self-employed borrowers",
      url: "https://frontline.financial/self-employed-home-loans",
      description:
        "Home loans for sole traders, company directors, trust beneficiaries and ABN contractors buying residential property, including full doc and low doc options.",
      provider: { "@id": "https://frontline.financial/brokers#business" },
      areaServed: [
        { "@type": "City", name: "Parramatta" },
        { "@type": "Place", name: "Western Sydney" },
        { "@type": "State", name: "New South Wales" },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://frontline.financial/" },
        { "@type": "ListItem", position: 2, name: "Home loans", item: "https://frontline.financial/brokers" },
        { "@type": "ListItem", position: 3, name: "Self-employed home loans", item: "https://frontline.financial/self-employed-home-loans" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

function Eyebrow({ children, className = "text-[#00FCB8]" }) {
  return <p className={`text-xs font-bold uppercase tracking-widest ${className}`}>{children}</p>;
}

function Check({ className = "text-[#00FCB8]" }) {
  return (
    <span className={`mt-0.5 shrink-0 ${className}`} aria-hidden>
      ✓
    </span>
  );
}

export default function SelfEmployedHomeLoansPage() {
  return (
    <div className="min-h-screen bg-[#F5F5EF] font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <LayoutNav activeNav="brokers" />

      {/* 1. HERO */}
      <section className="section-dot-grid-dark relative px-4 pt-12 pb-16 md:px-6 md:pt-16 md:pb-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/60">
            <Link href="/" className="hover:text-[#00FCB8]">Home</Link>
            <span className="mx-2" aria-hidden>/</span>
            <Link href="/brokers" className="hover:text-[#00FCB8]">Home loans</Link>
            <span className="mx-2" aria-hidden>/</span>
            <span className="text-white/80">Self-employed</span>
          </nav>
          <h1 className="font-bold text-white">
            <span className="block text-sm uppercase tracking-widest text-[#00FCB8] md:text-base">
              Self-employed home loans in Parramatta
            </span>
            <span className="mt-4 block text-4xl leading-tight md:text-6xl">
              Your tax return says you earn less than you do.
            </span>
          </h1>
          <p className="mt-6 text-xl text-[#39B2B2]">
            Lenders read self-employed income in different ways, and the first bank&apos;s answer isn&apos;t the only one.
            We check 30+ lenders&apos; rules to find the ones that fit how your business actually earns, so you can buy
            the home you want to live in or invest in.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={CONSULT_HREF} className="inline-flex w-full items-center justify-center rounded-lg bg-[#00FCB8] px-8 py-4 text-lg font-bold text-[#1C5472] transition-all duration-200 hover:scale-105 hover:opacity-90 sm:w-auto">
              Get a Free Assessment
            </a>
            <a href="tel:+61422959486" className="inline-flex w-full items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-bold text-white transition-all duration-200 hover:scale-105 hover:bg-white/10 sm:w-auto">
              Call Hassan: +61 422 959 486
            </a>
          </div>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <span className="text-white">30+ Lenders</span>
            <span className="h-5 w-px bg-[#39B2B2]" aria-hidden />
            <span className="text-white">No Cost to You</span>
            <span className="h-5 w-px bg-[#39B2B2]" aria-hidden />
            <span className="text-white">5.0 on Google, 100+ Reviews</span>
            <span className="h-5 w-px bg-[#39B2B2]" aria-hidden />
            <span className="text-white">Level 49, 8 Parramatta Square</span>
          </div>
        </div>
      </section>

      <WaveDivider fill="#F5F5EF" />

      {/* 2. SOUND FAMILIAR */}
      <section className="section-dot-grid relative px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Sound familiar?</Eyebrow>
          <h2 className="mt-2 border-l-4 border-[#00FCB8] pl-4 text-3xl font-bold text-[#1C5472] md:text-4xl">
            One bank&apos;s no isn&apos;t every lender&apos;s no.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {PAIN_POINTS.map((p) => (
              <article key={p.q} className="rounded-xl border-l-4 border-[#39B2B2] bg-white p-6 shadow-md">
                <h3 className="text-lg font-bold text-[#1C5472]">{p.q}</h3>
                <p className="mt-3 leading-relaxed text-gray-600">{p.a}</p>
              </article>
            ))}
          </div>
          <div className="mt-12">
            <h3 className="text-lg font-bold text-[#1C5472]">Who we help</h3>
            <ul className="mt-4 flex flex-wrap gap-3">
              {WHO_WE_HELP.map((w) => (
                <li key={w} className="rounded-full border border-[#39B2B2] bg-white px-4 py-2 text-sm font-medium text-[#1C5472]">
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <WaveDivider fill="#1C5472" />

      {/* 3. HOW LENDERS ASSESS */}
      <section className="bg-[#1C5472] px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>How lenders see you</Eyebrow>
          <h2 className="mt-2 border-l-4 border-[#00FCB8] pl-4 text-3xl font-bold text-white md:text-4xl">
            How lenders assess self-employed income
          </h2>
          <p className="mt-6 max-w-3xl leading-relaxed text-[#39B2B2]">
            Every lender has its own policy for business owners. These four questions decide most of the result.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_LENDERS_ASSESS.map((item, i) => (
              <article key={item.title} className="rounded-xl border-2 border-[#39B2B2] p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00FCB8] font-bold text-[#1C5472]">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/90">{item.desc}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-white/90">
            See it with numbers:{" "}
            <Link
              href="/self-employed-home-loans/how-lenders-read-your-tax-return"
              className="font-bold text-[#00FCB8] underline decoration-2 underline-offset-4 hover:opacity-80"
            >
              same tax return, two lenders, two different answers
            </Link>
            .
          </p>
        </div>
      </section>

      <WaveDivider fill="#F5F5EF" />

      {/* 4. FULL DOC VS LOW DOC */}
      <section className="bg-[#F5F5EF] px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Eyebrow className="text-[#39B2B2]">Your options</Eyebrow>
          <h2 className="mt-2 border-l-4 border-[#00FCB8] pl-4 text-3xl font-bold text-[#1C5472] md:text-4xl">
            Full doc or low doc?
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {DOC_TYPES.map((d) => (
              <article
                key={d.name}
                className={`rounded-xl p-6 md:p-8 ${d.highlight ? "border-l-4 border-[#00FCB8] bg-white shadow-md" : "bg-gray-100/80"}`}
              >
                <h3 className="text-2xl font-bold text-[#1C5472]">{d.name}</h3>
                <dl className="mt-6 space-y-4 text-[#1C5472]">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-[#39B2B2]">What the lender uses</dt>
                    <dd className="mt-1 leading-relaxed">{d.docs}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-[#39B2B2]">Suits</dt>
                    <dd className="mt-1 leading-relaxed">{d.suits}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-[#39B2B2]">What to expect</dt>
                    <dd className="mt-1 leading-relaxed">{d.expect}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-gray-600">
            Low doc loans cost more, so we only recommend one when it genuinely suits your situation, and we&apos;ll show
            you the full doc alternative side by side.
          </p>
        </div>
      </section>

      <WaveDivider fill="#1C5472" />

      {/* 5. WORK WITH HASSAN */}
      <section className="bg-[#1C5472] px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:items-start">
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative h-72 w-full max-w-sm overflow-hidden rounded-2xl bg-[#0A1628] shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hassan-broker-v2.png"
                  alt="Hassan Arif JP, mortgage and finance broker at Frontline Financial in Parramatta"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="mt-4 text-2xl font-bold text-white">Hassan Arif JP</p>
              <p className="text-[#39B2B2]">Mortgage &amp; Finance Broker</p>
            </div>
            <div>
              <Eyebrow>Your broker</Eyebrow>
              <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
                A broker who reads business financials.
              </h2>
              <p className="mt-6 leading-relaxed text-[#39B2B2]">
                Hassan has a background in tax and accounting, so he reads your returns and financial statements the way a
                credit assessor will, before any lender sees them. You deal with him from the first call to settlement.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Goes through your tax returns and financials line by line",
                  "Access to 30+ lenders, including non-bank lenders",
                  "Meet at Parramatta Square, or by phone and video",
                  "Available after hours and on weekends",
                  "Fluent in English and Arabic",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white">
                    <Check />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-white/70">
                Tax questions, such as how to structure your business or when to lodge, are for your accountant. We&apos;re
                happy to work alongside them.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider fill="#F5F5EF" />

      {/* 6. DOCUMENTS + AVOID */}
      <section className="section-dot-grid relative px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow className="text-[#39B2B2]">Get ready</Eyebrow>
            <h2 className="mt-2 border-l-4 border-[#00FCB8] pl-4 text-3xl font-bold text-[#1C5472] md:text-4xl">
              Documents to have ready
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {[["You", DOCS_YOU], ["Your business", DOCS_BUSINESS]].map(([label, list]) => (
                <div key={label} className="rounded-xl bg-white p-6 shadow-md">
                  <h3 className="text-lg font-bold text-[#1C5472]">{label}</h3>
                  <ul className="mt-4 space-y-3">
                    {list.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-[#1C5472]">
                        <Check className="text-[#39B2B2]" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-gray-600">
              Every lender&apos;s list is a little different. We confirm exactly what yours needs after the first call.
            </p>
          </div>
          <div>
            <Eyebrow className="text-[#39B2B2]">Before you apply</Eyebrow>
            <h2 className="mt-2 border-l-4 border-[#00FCB8] pl-4 text-3xl font-bold text-[#1C5472] md:text-4xl">
              Five things to avoid
            </h2>
            <ol className="mt-8 space-y-5">
              {AVOID.map((item, i) => (
                <li key={item.title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1C5472] text-sm font-bold text-[#00FCB8]">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-[#1C5472]">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <WaveDivider fill="#1C5472" />

      {/* 7. PROCESS */}
      <section className="bg-[#1C5472] px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>The process</Eyebrow>
          <h2 className="mt-2 border-l-4 border-[#00FCB8] pl-4 text-3xl font-bold text-white md:text-4xl">
            From first call to the keys
          </h2>
          <div className="mt-14 grid gap-10 md:grid-cols-4 md:gap-0">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.num}
                className="flex flex-col items-center text-center md:border-l-2 md:border-dashed md:border-[#39B2B2] md:px-4 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#00FCB8] text-xl font-bold text-[#1C5472]">
                  {step.num}
                </div>
                <h3 className="mt-4 text-base font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fill="#F5F5EF" />

      {/* 8. LOCAL */}
      <section className="bg-[#F5F5EF] px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Eyebrow className="text-[#39B2B2]">Local to Parramatta</Eyebrow>
          <h2 className="mt-2 border-l-4 border-[#00FCB8] pl-4 text-3xl font-bold text-[#1C5472] md:text-4xl">
            A mortgage broker for Western Sydney&apos;s business owners
          </h2>
          <p className="mt-6 leading-relaxed text-[#1C5472]">
            We&apos;re on Level 49 of 8 Parramatta Square, Parramatta NSW 2150, and take calls and appointments Monday to
            Friday, 10:30am to 8pm. We help
            self-employed buyers across {SUBURBS.slice(0, -1).join(", ")} and {SUBURBS[SUBURBS.length - 1]}, and right
            across Western Sydney. Can&apos;t make it in? We work by phone and video anywhere in NSW.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=8%20Parramatta%20Square%2C%20Parramatta%20NSW%202150"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border-2 border-[#1C5472] px-6 py-3 font-bold text-[#1C5472] transition-all duration-200 hover:bg-[#1C5472]/5"
            >
              Get directions
            </a>
            <a
              href="/brokers"
              className="inline-flex items-center justify-center rounded-lg border-2 border-[#39B2B2] px-6 py-3 font-bold text-[#1C5472] transition-all duration-200 hover:bg-[#39B2B2]/10"
            >
              All our home loans
            </a>
          </div>
        </div>
      </section>

      <WaveDivider fill="#1C5472" />

      {/* 9. FAQ */}
      <section className="bg-[#1C5472] px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Common questions</Eyebrow>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">Self-employed home loan FAQs</h2>
          <div className="mt-10 border-t border-[#39B2B2]">
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} className="group border-b border-[#39B2B2]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
                  <h3 className="font-bold text-white">{item.q}</h3>
                  <svg
                    className="h-5 w-5 shrink-0 text-[#00FCB8] transition-transform duration-200 group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="pb-5 pr-8 text-[#39B2B2]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fill="#00FCB8" />

      {/* 10. CTA */}
      <section className="cta-stripe-pattern relative bg-[#00FCB8] px-4 py-14 md:px-6 md:py-16 lg:px-8">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-[#1C5472] md:text-5xl">Self-employed and ready to buy?</h2>
          <p className="mt-4 text-lg text-[#1C5472] md:text-xl">
            Book a free, no-obligation assessment. Bring your last two years of returns if you have them, or just call and
            tell us where things are at.
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
            General information only. This page doesn&apos;t take into account your objectives, financial situation or
            needs. Lender criteria, fees and charges apply, and all applications are subject to the lender&apos;s
            assessment and approval. For tax advice, speak with your accountant.
          </p>
        </div>
      </section>

      <WaveDivider fill="#1C5472" />

      <LayoutFooter />
    </div>
  );
}
