import fs from "fs";
import path from "path";
import CalendlyButton from "@/components/taxflow/CalendlyButton";
import { container, TAXFLOW_REGISTER_URL } from "@/components/taxflow/TaxFlowShared";

/* Flo images live in /public/images/taxflow/. Each slot only renders once its
   file exists, so a missing image never shows as a broken picture. */
export function floImage(file) {
  return fs.existsSync(path.join(process.cwd(), "public", "images", "taxflow", file))
    ? `/images/taxflow/${file}`
    : null;
}

/* Flo standing on the top edge of a block's visual, making a gesture. Sized by
   height; the column's top padding (FLO_PAD) is that height minus 12px, so his
   glow ring rests on the card's edge without covering any of its content. */
const FLO_PAD = "pt-[116px] md:pt-[148px] lg:pt-[164px]";

function FloPerch({ src, alt, side = "right" }) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`pointer-events-none absolute top-0 z-10 h-32 w-auto drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)] md:h-40 lg:h-44 ${
        side === "right" ? "right-4 md:right-8" : "left-4 md:left-8"
      }`}
    />
  );
}

/* Content blocks for /taxflow/for/medical-professionals.
   Copy and figures are as supplied by TaxFlowAI (see "Sources" in the brief).
   TODO(owner): re-check every dollar figure and threshold against the ATO
   and Services Australia before launch, and each 1 July after that. */


function Tick() {
  return (
    <svg className="mt-1 h-3.5 w-3.5 shrink-0" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M1.5 6.5l3 3 6-7" stroke="#00FCB8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Cross() {
  return (
    <svg className="mt-1 h-3.5 w-3.5 shrink-0" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/* one block: copy on one side, visual on the other, alternating */
function Block({ id, index, eyebrow, heading, bullets, action, visual, flo }) {
  const alt = index % 2 === 1;
  const floSrc = flo ? floImage(flo.file) : null;
  return (
    <section
      id={id}
      className="border-t"
      style={{ background: alt ? "#060D1A" : "#0A1628", borderColor: "rgba(255,255,255,0.08)", scrollMarginTop: "110px" }}
    >
      <div className={`${container} grid items-center gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-14`}>
        <div className={`tc-reveal lg:col-span-6 ${alt ? "lg:order-2" : ""}`}>
          <p className="tc-eyebrow" style={{ color: "#39B2B2" }}>{eyebrow}</p>
          <h2 className="tc-display mt-4 text-3xl leading-tight text-white md:text-4xl">{heading}</h2>
          <ul className="mt-6 space-y-3.5">
            {bullets.map((b) => (
              <li key={b.slice(0, 32)} className="flex items-start gap-3 text-[15px] leading-relaxed" style={{ color: "#B7C4CF" }}>
                <Tick />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            {action ?? (
              <CalendlyButton className="tc-btn-primary rounded-lg px-7 py-3.5 text-[15px] font-bold">
                Talk to a Human
              </CalendlyButton>
            )}
          </div>
        </div>
        <div className={`tc-reveal relative lg:col-span-6 ${alt ? "lg:order-1" : ""} ${floSrc ? FLO_PAD : ""}`}>
          {floSrc && <FloPerch src={floSrc} alt={flo.alt} side={alt ? "left" : "right"} />}
          {visual}
        </div>
      </div>
    </section>
  );
}

/* ---------- visuals ---------- */

/* Block 1: effect of packaging on an intern's year (approximate) */
function PackagingVisual() {
  const rows = [
    { label: "Less tax with packaging", value: "+$3,700", width: 100, color: "#00FCB8" },
    { label: "Higher HELP repayment", value: "−$1,550", width: 42, color: "#F59E0B" },
  ];
  return (
    <div className="tc-card p-6">
      <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <span className="tc-mono text-[11px]" style={{ color: "#94A3B8" }}>INTERN · $80,638 BASE</span>
        <span className="tc-mono text-[11px]" style={{ color: "#00FCB8" }}>PER YEAR</span>
      </div>
      <div className="mt-5 space-y-5">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="flex items-baseline justify-between text-[14px]">
              <span className="text-white/85">{r.label}</span>
              <span className="tc-mono font-semibold" style={{ color: r.color }}>{r.value}</span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
              <div className="h-full rounded-full" style={{ width: `${r.width}%`, background: r.color }} />
            </div>
          </div>
        ))}
        <div className="border-t pt-5" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="flex items-baseline justify-between">
            <span className="font-bold text-white">Better off each year</span>
            <span className="tc-mono text-2xl font-semibold" style={{ color: "#00FCB8" }}>≈ +$2,150</span>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div className="tc-grad-line-h h-full rounded-full" style={{ width: "58%" }} />
          </div>
        </div>
      </div>
      <p className="mt-5 text-[12px] leading-relaxed" style={{ color: "#64748B" }}>
        Approximate, for a public hospital intern on the base salary. Your result
        depends on your pay, your HELP balance and what you package.
      </p>
    </div>
  );
}

/* Block 2: the three repayment bands as a stepped bar */
function HelpBandsVisual() {
  const bands = [
    { rate: "0¢", range: "$0 – $69,528", height: "18%", fill: "rgba(148,163,184,0.25)", text: "#94A3B8" },
    { rate: "15¢", range: "$69,528 – $129,717", height: "62%", fill: "linear-gradient(180deg, #39B2B2, rgba(57,178,178,0.35))", text: "#39B2B2" },
    { rate: "17¢", range: "Above $129,717", height: "78%", fill: "linear-gradient(180deg, #00FCB8, rgba(0,252,184,0.35))", text: "#00FCB8" },
  ];
  return (
    <div className="tc-card p-6">
      <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <span className="tc-mono text-[11px]" style={{ color: "#94A3B8" }}>HELP REPAYMENTS · FROM 1 JULY 2026</span>
      </div>
      <div className="mt-6 flex h-52 items-end gap-3" role="img" aria-label="HELP repayment bands: nothing on the first $69,528, 15 cents per dollar up to $129,717, 17 cents per dollar above that">
        {bands.map((b) => (
          <div key={b.rate} className="flex h-full flex-1 flex-col justify-end">
            <p className="tc-mono mb-2 text-center text-xl font-semibold" style={{ color: b.text }}>{b.rate}</p>
            <div className="rounded-t-lg" style={{ height: b.height, background: b.fill }} />
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-3">
        {bands.map((b) => (
          <p key={b.range} className="tc-mono flex-1 text-center text-[10.5px] leading-snug" style={{ color: "#94A3B8" }}>
            {b.range}
          </p>
        ))}
      </div>
      <p className="mt-5 text-[12px] leading-relaxed" style={{ color: "#64748B" }}>
        Cents repaid for each dollar of repayment income within each band.
      </p>
    </div>
  );
}

/* Block 3: claim / don't claim */
function ClaimVisual() {
  const claim = [
    "AHPRA renewal",
    "Indemnity insurance",
    "College & exam fees",
    "CPD & journals",
    "Stethoscope & equipment",
    "Driving between hospitals, same day",
  ];
  const dont = [
    "Your daily commute",
    "Ordinary clothes",
    "Study that got you the job",
    "Gym & fitness",
    "Grooming & haircuts",
    "Anything your employer reimbursed",
  ];
  return (
    <div className="tc-card grid gap-6 p-6 sm:grid-cols-2">
      <div>
        <p className="tc-mono text-[11px] font-medium tracking-[0.18em]" style={{ color: "#00FCB8" }}>CLAIM</p>
        <ul className="mt-3 space-y-2.5">
          {claim.map((c) => (
            <li key={c} className="flex items-start gap-2.5 text-[14px] text-white/90">
              <Tick />
              {c}
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t pt-6 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <p className="tc-mono text-[11px] font-medium tracking-[0.18em]" style={{ color: "#94A3B8" }}>DON&apos;T CLAIM</p>
        <ul className="mt-3 space-y-2.5">
          {dont.map((d) => (
            <li key={d} className="flex items-start gap-2.5 text-[14px]" style={{ color: "#94A3B8" }}>
              <Cross />
              {d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* Block 4: employee → employee + ABN → practice owner */
function PathVisual() {
  const steps = [
    { title: "Employee", sub: "PAYG wages, tax withheld every pay" },
    { title: "Employee + ABN", sub: "Locum, assisting or telehealth on the side" },
    { title: "Practice owner", sub: "Your own rooms, staff and structure" },
  ];
  return (
    <div className="tc-card p-6">
      <ol className="relative space-y-6">
        <div className="tc-grad-line-v absolute bottom-4 left-[11px] top-4 w-[2px]" aria-hidden />
        {steps.map((s, i) => (
          <li key={s.title} className="relative flex items-start gap-4">
            <span
              className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
              style={i === 0
                ? { background: "#00FCB8", color: "#0A1628", boxShadow: "0 0 14px rgba(0,252,184,0.5)" }
                : { background: "#0A1628", color: "#94A3B8", border: "1.5px solid rgba(148,163,184,0.5)" }}
            >
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="flex flex-wrap items-center gap-2 text-[16px] font-bold text-white">
                {s.title}
                {i === 0 && (
                  <span className="tc-mono rounded-full px-2 py-0.5 text-[10px] font-medium tracking-wider" style={{ background: "rgba(0,252,184,0.15)", color: "#00FCB8" }}>
                    YOU ARE HERE
                  </span>
                )}
              </p>
              <p className="mt-1 text-[13.5px]" style={{ color: "#94A3B8" }}>{s.sub}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* Block 5: Flo image slot + a short exchange */
function FloVisual() {
  const src = floImage("flo-doctor.webp");
  return (
    <div className="relative">
      {src ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt="Flo, the TaxFlowAI assistant, dressed as a doctor"
          className="mx-auto w-full max-w-md"
          loading="lazy"
        />
      ) : (
        <div
          className="mx-auto flex aspect-square w-full max-w-md flex-col items-center justify-center rounded-3xl border-2 border-dashed p-8 text-center"
          style={{ borderColor: "rgba(0,252,184,0.45)", background: "rgba(0,252,184,0.04)" }}
        >
          <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="#00FCB8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="3" y="4" width="18" height="16" rx="2.5" />
            <circle cx="9" cy="10" r="1.8" />
            <path d="M21 16l-5-5-8 8" />
          </svg>
          <p className="tc-mono mt-4 text-[12px] font-medium tracking-[0.16em]" style={{ color: "#00FCB8" }}>FLO IMAGE PLACEHOLDER</p>
          <p className="mt-2 text-[13px]" style={{ color: "#94A3B8" }}>
            Flo dressed as a doctor. Square, transparent PNG or WebP, at least 1200 px.
          </p>
        </div>
      )}
      <div className="tc-panel relative z-10 mx-auto -mt-10 max-w-sm p-5 lg:absolute lg:-bottom-6 lg:-left-6 lg:mt-0">
        <div className="space-y-3 text-[13px] leading-relaxed">
          <div className="border-l-2 pl-3" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
            <p className="tc-mono text-[10px]" style={{ color: "#94A3B8" }}>YOU · 2:14 AM</p>
            <p className="mt-0.5 text-white/85">Can I claim my surgical loupes?</p>
          </div>
          <div className="border-l-2 pl-3" style={{ borderColor: "#00FCB8" }}>
            <p className="tc-mono text-[10px]" style={{ color: "#00FCB8" }}>FLO</p>
            <p className="mt-0.5" style={{ color: "#C9E9E0" }}>
              Yes, if you use them for work. They cost over $300, so your agent will
              claim them over their effective life. Snap the receipt and I&apos;ll file it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MedicalBlocks() {
  return (
    <>
      <Block
        id="salary-packaging"
        index={0}
        eyebrow="Salary packaging"
        heading="Your hospital will let you pay less tax. Most interns get it wrong."
        bullets={[
          "Public hospital staff can package up to $9,010 a year of everyday spending plus $2,650 of meals and entertainment, tax-free.",
          "On an intern's $80,638 base that is about $3,700 less tax in your pocket each year.",
          "The catch: packaging counts toward your HELP repayment and Medicare levy surcharge income, so your HELP repayment rises by about $1,550. Still worth it, but only if you know.",
          "We set it up with your provider and check it against your HELP position before you sign.",
        ]}
        visual={<PackagingVisual />}
        flo={{ file: "flo-salary-packaging.webp", alt: "Flo in scrubs, holding a piggy bank and giving a thumbs-up" }}
      />
      <Block
        id="help-debt"
        index={1}
        eyebrow="HELP debt"
        heading="$100,000+ of HELP debt. Here is what actually matters."
        bullets={[
          "From 1 July 2026 repayments are marginal: nothing on the first $69,528, then 15 cents per dollar up to $129,717, 17 cents above that.",
          "Your debt is indexed every 1 June. It is not interest, but it is not zero either.",
          "Paying it down early is rarely the best use of a first-year salary. We show you the numbers before you decide.",
          "Your employer withholds HELP from every pay, but overtime and a second job can leave a shortfall at tax time. We forecast it so there is no surprise bill.",
        ]}
        visual={<HelpBandsVisual />}
        flo={{ file: "flo-help-debt.webp", alt: "Flo in scrubs and a graduation cap, holding a diploma and pointing up" }}
      />
      <Block
        id="deductions"
        index={2}
        eyebrow="Deductions from day one"
        heading="Start keeping receipts before your first shift."
        bullets={[
          "AHPRA renewal, indemnity insurance, college and exam fees, CPD, journals, stethoscope and equipment, and driving between hospitals on the same day are all claimable.",
          "Your daily commute, ordinary clothes, and the study that got you the job are not. The ATO checks doctors' claims closely.",
          "Photograph every receipt into one app as you go. Claims over $300 in total need records, and a shoebox in June is how deductions get missed.",
          "We send a one-page doctor deductions checklist after your first call.",
        ]}
        visual={<ClaimVisual />}
        flo={{ file: "flo-deductions.webp", alt: "Flo in scrubs, photographing a receipt with a phone" }}
      />
      <Block
        id="going-self-employed"
        index={3}
        eyebrow="Going self-employed"
        heading="Locum shifts, private assisting, telehealth. When the ABN comes, be ready."
        bullets={[
          "Contract work means an ABN, invoices, and no tax withheld. You set aside the tax yourself and the ATO moves you onto quarterly PAYG instalments.",
          "Most medical services are GST-free, so you may not need to charge GST. Cosmetic work, reports and room rentals are different. We tell you which is which.",
          "A company or trust does not turn your income into business income. Under the personal services income rules, money earned from your own skill is taxed to you regardless of the structure.",
          "Sole trader is usually right in the early years. We tell you when, and if, a company starts paying for itself, and how the practice's payroll tax position affects your contract.",
        ]}
        visual={<PathVisual />}
        flo={{ file: "flo-self-employed.webp", alt: "Flo in scrubs, carrying a doctor's bag and waving" }}
      />
      <Block
        id="meet-flo"
        index={4}
        eyebrow="Meet Flo"
        heading="The colleague who never loses a receipt."
        bullets={[
          "Snap a receipt between patients. Flo reads it, files it under the right ATO category and shows you why.",
          "Ask Flo at 2am after a night shift: “Can I claim my loupes?” You get a plain-English answer, and Flo tells you when a question needs your agent.",
          "Before tax time, Flo flags what's missing, like an AHPRA renewal that never got uploaded.",
          "Flo organises. Your Registered Tax Agent reviews and signs off. Nothing is lodged on AI alone.",
        ]}
        action={
          <a href={TAXFLOW_REGISTER_URL} className="tc-btn-primary inline-block rounded-lg px-7 py-3.5 text-[15px] font-bold">
            Try Flo free
          </a>
        }
        visual={<FloVisual />}
      />
    </>
  );
}
