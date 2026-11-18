/* Download button on the Credit Guide and Privacy Consent pages. The PDFs in
   public/documents are printed from these pages: see public/documents/README.md. */
export default function LegalPdfButton({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#00FCB8] px-5 py-2.5 text-sm font-bold text-[#0A1628] transition hover:opacity-90 print:hidden sq-btn-aqua"
    >
      {label}
    </a>
  );
}

/* Printed (and PDF) copies only: where the document lives and its date. */
export function LegalPrintSource({ path, asAt }) {
  return (
    <p className="legal-print-only mt-1 text-xs">
      frontline.financial{path} · web copy as at {asAt}
    </p>
  );
}
