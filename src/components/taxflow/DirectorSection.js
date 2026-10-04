import Image from "next/image";
import TaxFlowWave from "@/components/taxflow/TaxFlowWave";
import TaxFlowWaveLayers from "@/components/taxflow/TaxFlowWaveLayers";
import { container } from "@/components/taxflow/TaxFlowShared";
import { SHOW_TAX_SERVICES } from "@/data/taxflow-flags";

const DEEP = "#060D1A";

/* Facts from the director's own profile and words. Do not add credentials.
   Shared by /taxflow/about and the persona landing pages. While tax services
   are switched off (src/data/taxflow-flags.js) the TAX7 T04 role and the
   "tax firm" sentence of the quote are left out; nothing is reworded. */
export const DIRECTOR = {
  name: "Hassan Arif",
  title: "Founder & Director, TaxFlowAI",
  quote:
    "I started TaxFlowAI and Frontline Financial because everyday Australians don’t get access to strong tax and finance services. There aren’t enough professionals to meet demand." +
    (SHOW_TAX_SERVICES ? " I want TaxFlowAI to be the most efficient tax firm in the country." : ""),
  bio: [
    "Hassan trained as an accountant, with a Bachelor of Business (Accounting) from Western Sydney University. He worked his way up through practice, from intern to bookkeeper to accountant, then spent two years as a finance and insurance manager.",
    "He founded Frontline Financial in October 2023, and built TaxFlowAI to bring the same service to tax." +
      (SHOW_TAX_SERVICES
        ? " Alongside that he works as a Senior Accountant at TAX7 T04, the registered tax agent that provides TaxFlowAI’s tax services."
        : ""),
  ],
  credentials: [
    ["Roles", SHOW_TAX_SERVICES ? "Founder & Director, TaxFlowAI. Senior Accountant, TAX7 T04 PTY LTD" : "Founder & Director, TaxFlowAI"],
    ["Education", "Bachelor of Business (Accounting), Western Sydney University"],
    ["Accreditation", "Accredited Member, FBAA"],
    ["Appointment", "Justice of the Peace, NSW"],
    ["Volunteering", "MATW Project, disaster and humanitarian relief"],
  ],
  path: [
    ["2020", "Accounting intern"],
    ["2021", "Bookkeeper"],
    ["2022", "Accountant"],
    ["2022", "Finance & insurance manager"],
    ["2023", "Founded Frontline Financial"],
  ],
};

/* "Meet the director": wave in, teal-depth band, wave out.
   `from` / `to` are the background colours of the sections either side. */
export default function DirectorSection({ from = "#0A1628", to = "#0A1628" }) {
  return (
    <>
      <TaxFlowWaveLayers from={from} to={DEEP} />
      <section id="director" className="tc-depth-teal" style={{ scrollMarginTop: "110px" }}>
        <div className={`${container} grid gap-10 pb-14 pt-6 md:pb-20 lg:grid-cols-12 lg:gap-12`}>
          <div className="tc-reveal lg:col-span-5">
            <div className="tc-director-photo">
              <Image
                src="/images/taxflow/director-portrait.webp"
                alt={`${DIRECTOR.name}, ${DIRECTOR.title} of TaxFlowAI`}
                width={1342}
                height={2000}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="block h-auto w-full"
              />
              <div className="tc-director-plate">
                <p className="tc-display text-[1.35rem] text-white">{DIRECTOR.name}</p>
                <p className="tc-mono mt-0.5 text-[10.5px] tracking-[0.16em]" style={{ color: "#00FCB8" }}>
                  {DIRECTOR.title.toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          <div className="tc-reveal lg:col-span-7">
            <p className="tc-eyebrow" style={{ color: "#00FCB8" }}>Meet the director</p>
            <h2 className="tc-display mt-4 text-4xl text-white md:text-5xl">{DIRECTOR.name}</h2>

            <blockquote className="tc-director-quote mt-7">
              <p>{DIRECTOR.quote}</p>
            </blockquote>

            <div className="mt-7 max-w-2xl space-y-3 text-[15px] leading-relaxed" style={{ color: "#94A3B8" }}>
              {DIRECTOR.bio.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <ol className="tc-director-path mt-8" aria-label="Career path">
              {DIRECTOR.path.map(([year, role], i) => (
                <li key={role} className={i === DIRECTOR.path.length - 1 ? "is-now" : ""}>
                  <span className="tc-mono">{year}</span>
                  <span>{role}</span>
                </li>
              ))}
            </ol>

            <dl className="tc-sec-facts mt-8">
              {DIRECTOR.credentials.map(([k, v]) => (
                <div key={k}>
                  <dt className="tc-mono">{k.toUpperCase()}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      <TaxFlowWave from={DEEP} to={to} />
    </>
  );
}
