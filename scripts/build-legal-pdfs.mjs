/* Prints the four legal pages to PDF in public/documents, using the pages' print styles.
   Run against a production build (npm run build, then npm run start -- -p 3006):
     node scripts/build-legal-pdfs.mjs [baseUrl]
   Rerun whenever a Credit Guide or Privacy Consent page changes. Never put a signed copy
   from Ambition Cloud or Broker Engine here: those hold client details. */
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const base = process.argv[2] || "http://localhost:3006";
const out = resolve("public/documents");
const pages = [
  ["/credit-guide", "credit-guide.pdf"],
  ["/privacy-consent", "privacy-consent.pdf"],
  ["/credit-guide-asset-solutions", "credit-guide-asset-solutions.pdf"],
  ["/privacy-consent-asset-solutions", "privacy-consent-asset-solutions.pdf"],
];

const browsers = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
];
const browser = browsers.find((b) => existsSync(b));
if (!browser) throw new Error("No Chrome or Edge found");

/* A throwaway profile, so this never touches anyone's own browser profile */
const profile = mkdtempSync(join(tmpdir(), "legal-pdfs-"));
try {
  for (const [path, file] of pages) {
    const target = join(out, file);
    execFileSync(browser, [
      "--headless=new",
      "--disable-gpu",
      `--user-data-dir=${profile}`,
      "--no-pdf-header-footer",
      "--virtual-time-budget=8000",
      `--print-to-pdf=${target}`,
      `${base}${path}`,
    ], { stdio: "ignore" });
    console.log(`${file}: ${Math.round(statSync(target).size / 1024)} KB`);
  }
} finally {
  rmSync(profile, { recursive: true, force: true });
}
