"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { COMPLIANCE_CONFIG } from "@/data/compliance-content";

export default function CompliancePage({
  title,
  subtitle,
  version,
  effectiveDate,
  lastReviewed,
  sections,
  children,
  showEntityBox = true,
  linkToPrivacyAtBottom,
}) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    document.title = `${title} — TaxFlowAI`;
  }, [title]);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const metaText = lastReviewed
    ? `Version ${version} | Effective: ${effectiveDate} | Last reviewed: ${lastReviewed}`
    : `Version ${version} | Effective: ${effectiveDate}`;

  return (
    <div className="compliance-page">
      <div className="compliance-header">
        <div className="compliance-brand">
          E&A Advisory Pty Ltd
        </div>
        <Link
          href="/taxflow"
          className="compliance-back-link"
        >
          ← Back to website
        </Link>
      </div>

      <div className="compliance-content">
        <h1 className="compliance-title">{title}</h1>
        {subtitle && <p className="compliance-subtitle">{subtitle}</p>}

        <div className="compliance-meta">{metaText}</div>

        {showEntityBox && (
          <div className="compliance-entity-box">
            <div>
              <strong>Platform operator:</strong> {COMPLIANCE_CONFIG.FH_NAME}{" "}
              (ABN: {COMPLIANCE_CONFIG.FH_ABN}) — ASIC Agent No.{" "}
              {COMPLIANCE_CONFIG.FH_ASIC}
            </div>
            <div>
              <strong>Tax agent:</strong> {COMPLIANCE_CONFIG.EA_NAME} (ABN:{" "}
              {COMPLIANCE_CONFIG.EA_ABN}) — TAN: {COMPLIANCE_CONFIG.EA_TAN}
            </div>
          </div>
        )}

        {/* Table of contents */}
        {sections && sections.length > 5 && (
          <nav className="compliance-toc" aria-label="Table of contents">
            <h2>Contents</h2>
            {sections.map((s, i) => (
              <a key={i} href={`#section-${i}`} className="toc-link">
                {s.heading}
              </a>
            ))}
          </nav>
        )}

        {/* Sections */}
        {sections &&
          sections.map((s, i) => (
            <section
              key={i}
              id={`section-${i}`}
              className="compliance-section"
              aria-labelledby={`section-heading-${i}`}
            >
              <h2 id={`section-heading-${i}`}>{s.heading}</h2>
              {s.content.split("\n\n").map((para, j) => (
                <p key={j}>{para}</p>
              ))}
            </section>
          ))}

        {/* For custom content (Terms placeholder) */}
        {children}

        {linkToPrivacyAtBottom && (
          <p className="compliance-link-bottom">
            <Link href="/taxflow/privacy-policy">Full Privacy Policy</Link>
          </p>
        )}

        <div className="compliance-contact">
          <h2>Contact</h2>
          <p>Email: {COMPLIANCE_CONFIG.EMAIL}</p>
          <p>Phone: {COMPLIANCE_CONFIG.PHONE}</p>
          <p>Address: {COMPLIANCE_CONFIG.FH_ADDRESS}</p>
        </div>
      </div>

      {showBackToTop && (
        <button
          type="button"
          className="compliance-back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          Back to top
        </button>
      )}

      <div className="compliance-page-footer">
        <Link href="/taxflow/privacy-policy">Privacy Policy</Link>
        <span> | </span>
        <Link href="/taxflow/collection-notice">Collection Notice</Link>
        <span> | </span>
        <Link href="/taxflow/terms">Terms of Service</Link>
        <span> | </span>
        <a
          href="https://tpb.gov.au/registrations_search"
          target="_blank"
          rel="noopener noreferrer"
        >
          Verify Tax Agent (TAN: {COMPLIANCE_CONFIG.EA_TAN})
        </a>
      </div>
    </div>
  );
}
