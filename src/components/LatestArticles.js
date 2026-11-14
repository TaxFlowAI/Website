import Link from "next/link";
import { ARTICLES } from "@/data/articles";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/* "2026-11-11" -> "11 Nov 2026", the same on the server and in the browser */
function formatDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/* The articles, newest first, as their video posters. They scroll sideways once
   there are more than fit, so older ones stay reachable without an index page. */
export default function LatestArticles() {
  const articles = [...ARTICLES].sort((a, b) => b.published.localeCompare(a.published));
  if (!articles.length) return null;

  return (
    <section aria-labelledby="articles-heading" className="section-dot-grid overflow-hidden py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-14 lg:px-8">
        <div className="lg:pt-2">
          <h2 id="articles-heading" className="text-balance text-3xl font-bold leading-[1.1] tracking-tight text-[#1C5472] md:text-4xl">
            Things worth knowing before you borrow
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-[#1C5472]/85">
            Each one starts with a short video, then sets out the numbers in plain English.
          </p>
        </div>

        <ul className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 md:scroll-px-6 lg:scroll-px-0 [scrollbar-color:#39B2B2_transparent] [scrollbar-width:thin] md:-mx-6 md:gap-6 md:px-6 lg:mx-0 lg:px-0">
          {articles.map((a) => (
            <li key={a.href} className="w-[64vw] max-w-[15rem] shrink-0 snap-start sm:w-56 lg:w-[15.5rem]">
              <Link
                href={a.href}
                className="group block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1C5472] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F5F5EF]"
              >
                <span className="block overflow-hidden rounded-2xl bg-[#1C5472] shadow-[0_22px_40px_-26px_rgba(10,22,40,0.75)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.poster}
                    alt=""
                    width={720}
                    height={1280}
                    loading="lazy"
                    className="block aspect-[9/16] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </span>
                <time dateTime={a.published} className="mt-4 block text-sm font-medium text-[#237575]">
                  {formatDate(a.published)}
                </time>
                <span className="mt-1 block text-lg font-bold leading-snug text-[#1C5472] decoration-[#00FCB8] decoration-2 underline-offset-4 group-hover:underline">
                  {a.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
