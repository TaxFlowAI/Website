"use client";

import Link from "next/link";

const TAXFLOW_SIGNIN_URL = "https://taxflowai.frontline.financial/login";
const TAXFLOW_PHONE = "0406 909 862";
const TAXFLOW_PHONE_LINK = "tel:+61406909862";

/**
 * TaxFlowAI app footer — DO NOT CHANGE structure/legal links.
 * Non-negotiable: keep exactly as-is:
 * - E&A Advisory Pty Ltd
 * - Privacy Policy | Collection Notice | Terms of Service | Verify Tax Agent (TAN: 26100253)
 * - Tax Agent and Platform/ASIC entity details
 * - Copyright line (TaxFlowAI © 2025 · Tax services by E&A Advisory · Platform by Frontline Financial Group)
 * See docs/DESIGN-BRIEF-TAXFLOWAI-WEBSITE.md
 */
export default function TaxFlowAppFooter() {
  return (
    <footer className="app-footer-taxflow border-t border-[#00FCB8]/15 bg-[#060D1A] px-4 py-16 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-bold text-lg">
              <span className="text-white">TaxFlow</span>
              <span className="text-[#00FCB8]">AI</span>
            </p>
            <p className="mt-2 text-sm text-gray-500">
              TaxFlowAI is the platform.
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Tax services by E&A Advisory Pty Ltd
            </p>
            <p className="mt-1 text-sm text-gray-500">Registered Tax Agent</p>
            <a
              href="https://eaadvisory.com.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-xs text-[#00FCB8] transition hover:underline"
            >
              eaadvisory.com.au
            </a>
            <div className="mt-4 flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 transition hover:text-[#00FCB8]"
                aria-label="LinkedIn"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 transition hover:text-[#00FCB8]"
                aria-label="Instagram"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">
              Product
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-500">
              <li>
                <a href="#features" className="transition hover:text-[#00FCB8]">
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="transition hover:text-[#00FCB8]"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a href={TAXFLOW_SIGNIN_URL} className="transition hover:text-[#00FCB8]" target="_blank" rel="noopener noreferrer">
                  Sign In
                </a>
              </li>
              <li>
                <a href={TAXFLOW_SIGNIN_URL} className="transition hover:text-[#00FCB8]" target="_blank" rel="noopener noreferrer">
                  Get Started
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">
              Services
            </h4>
            <p className="mt-2 text-xs italic text-gray-500">
              Provided by E&A Advisory Pty Ltd
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/brokers" className="transition hover:text-[#00FCB8]">
                  Individual Tax
                </Link>
              </li>
              <li>
                <Link href="/brokers" className="transition hover:text-[#00FCB8]">
                  Business Tax
                </Link>
              </li>
              <li>
                <Link href="/brokers" className="transition hover:text-[#00FCB8]">
                  BAS & GST
                </Link>
              </li>
              <li>
                <Link href="/brokers" className="transition hover:text-[#00FCB8]">
                  Bookkeeping
                </Link>
              </li>
              <li>
                <Link href="/" className="transition hover:text-[#00FCB8]">
                  All Services
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">
              Contact
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-500">
              <li>
                <a
                  href={TAXFLOW_PHONE_LINK}
                  className="transition hover:text-[#00FCB8]"
                >
                  {TAXFLOW_PHONE}
                </a>
              </li>
              <li>
                <a
                  href="mailto:taxflowai@frontline.financial"
                  className="transition hover:text-[#00FCB8]"
                >
                  taxflowai@frontline.financial
                </a>
              </li>
              <li>150 George Street Parramatta 2150</li>
              <li>
                <Link
                  href="/"
                  className="text-[#00FCB8] transition hover:underline"
                >
                  Visit Frontline Financial →
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="footer-content-taxflow">
            <div className="footer-brand-taxflow">
              E&A Advisory Pty Ltd
            </div>
            <div className="footer-links-taxflow">
              <Link href="/taxflow/privacy-policy">Privacy Policy</Link>
              <span className="footer-separator-taxflow">|</span>
              <Link href="/taxflow/collection-notice">Collection Notice</Link>
              <span className="footer-separator-taxflow">|</span>
              <Link href="/taxflow/terms">Terms of Service</Link>
              <span className="footer-separator-taxflow">|</span>
              <a
                href="https://tpb.gov.au/registrations_search"
                target="_blank"
                rel="noopener noreferrer"
              >
                Verify Tax Agent (TAN: 26100253)
              </a>
            </div>
            <div className="footer-entities-taxflow">
              Tax Agent: E&A Advisory Pty Ltd (ABN: 84 649 414 862, TAN:
              26100253)
              <br />
              Platform & ASIC Agent: Frontline Holdings Group Pty Ltd (ABN: 59
              671 861 475, ASIC Agent: 51843)
            </div>
            <p className="mt-4 text-xs text-gray-500">
              TaxFlowAI © 2025 · Tax services by E&A Advisory Pty Ltd (Registered
              Tax Agent) · Platform by Frontline Financial Group
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
