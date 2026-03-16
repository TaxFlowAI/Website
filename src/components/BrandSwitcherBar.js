"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PHONE_MAIN = "+61 422 959 486";
const PHONE_MAIN_LINK = "tel:+61422959486";
const PHONE_TAXFLOW = "0406 909 862";
const PHONE_TAXFLOW_LINK = "tel:+61406909862";

export default function BrandSwitcherBar() {
  const pathname = usePathname();
  const isTaxFlow = pathname?.startsWith("/taxflow");
  const phone = isTaxFlow ? PHONE_TAXFLOW : PHONE_MAIN;
  const phoneLink = isTaxFlow ? PHONE_TAXFLOW_LINK : PHONE_MAIN_LINK;

  return (
    <div className="bg-[#0A1628] px-4 py-1 md:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex flex-1 items-center justify-center gap-0">
          <Link
            href="/"
            className={`inline-flex items-center rounded-t-lg px-4 py-1.5 text-sm font-medium transition ${
              !isTaxFlow
                ? "border-b-[3px] border-[#00FCB8] bg-white/10 text-white"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Frontline Financial
          </Link>
          <Link
            href="/taxflow"
            className={`inline-flex items-center gap-1.5 rounded-t-lg px-4 py-1.5 text-sm font-medium transition ${
              isTaxFlow
                ? "border-b-[3px] border-[#00FCB8] bg-white/10 text-white"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <svg className={`h-4 w-4 ${isTaxFlow ? "text-[#00FCB8]" : ""}`} fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
            </svg>
            TaxFlowAI
          </Link>
        </div>
        <a
          href={phoneLink}
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-white transition hover:text-white/90"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          {phone}
        </a>
      </div>
    </div>
  );
}
