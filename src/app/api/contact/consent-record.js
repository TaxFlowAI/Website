/* The consent record each Frontline lead carries: what the person ticked, which web copies
   of the documents that meant, where and when, from which IP address and device. It goes
   in the staff email (and the records inbox when CONTACT_EMAIL_RECORDS is set), the
   Ambition Cloud notes and the Broker Engine card.
   Relative imports only, so a script can load this file outside Next. */
import { ENTITY } from "../../../config/entities.js";
import { CONSENT_DOCS, consentParts, consentText } from "../../../config/consent.js";

const SITE_URL = "https://frontline.financial";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clientIp(headers) {
  const forwarded = headers?.get?.("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers?.get?.("x-real-ip") || "unknown";
}

/* `routedEntity` is the business /api/contact sends the lead to. Returns:
   - { error } when the tick doesn't fit this lead (refuse it);
   - { missing: true, ... } when the form sent no record (a page opened before the record
     existed): keep the lead and flag it;
   - otherwise the record, as HTML for the email and one line for CRM notes. */
export function buildConsentRecord({ consent, routedEntity, headers, name, email, now = new Date() }) {
  if (routedEntity !== ENTITY.BROKERS && routedEntity !== ENTITY.ASSET_SOLUTIONS) return null;

  if (consent === undefined || consent === null) {
    const html = `<p style="color:#b91c1c"><strong>Consent record: missing.</strong> This form sent no record of the tick box, probably because the page was opened before the website started keeping consent records. The form still required the tick. Confirm consent before relying on it.</p>`;
    return { missing: true, html, note: "Consent: no record sent with this enquiry (page opened before the website kept consent records). Confirm consent.", data: null };
  }
  if (typeof consent !== "object" || consent.agreed !== true) {
    return { error: "Please tick the box to agree to the Credit Guide and Privacy Consent." };
  }
  if (consent.entity !== routedEntity) {
    return { error: "Please tick the consent box again, then send." };
  }

  const parts = consentParts(routedEntity);
  const docs = CONSENT_DOCS[routedEntity];
  const page = typeof consent.page === "string" && consent.page.startsWith("/") ? consent.page.split("?")[0].slice(0, 200) : "unknown";
  const ip = clientIp(headers);
  const device = (headers?.get?.("user-agent") || "unknown").slice(0, 300);
  const build = (process.env.VERCEL_GIT_COMMIT_SHA || "local").slice(0, 7);
  const sydney = now.toLocaleString("en-AU", { timeZone: "Australia/Sydney", dateStyle: "medium", timeStyle: "medium" });
  const text = consentText(routedEntity);

  const data = {
    agreedTo: text,
    creditGuide: `${SITE_URL}${parts.creditGuidePath}`,
    privacyConsent: `${SITE_URL}${parts.privacyConsentPath}`,
    documentsUpdated: docs.updated,
    privacyPolicy: `${SITE_URL}${parts.privacyPolicyPath}`,
    privacyPolicyUpdated: docs.policyUpdated,
    page,
    at: now.toISOString(),
    ip,
    device,
    siteVersion: build,
  };

  const link = (href, label) => `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
  const html = `
<div style="margin-top:16px;padding:12px;border:1px solid #d1d5db;border-radius:8px">
<p style="margin:0 0 6px"><strong>Consent record</strong></p>
<p style="margin:0;font-size:13px;line-height:1.6">
${escapeHtml(name)} (${escapeHtml(email)}) ticked: "${escapeHtml(text)}"<br/>
Documents: ${link(data.creditGuide, parts.creditGuideLabel)} and ${link(data.privacyConsent, "Privacy Consent")} (web copies as at ${escapeHtml(docs.updated)}). ${link(data.privacyPolicy, "Privacy Policy")} (updated ${escapeHtml(docs.policyUpdated)}) linked beside the box.<br/>
Page: ${escapeHtml(SITE_URL + page)}<br/>
Time: ${escapeHtml(sydney)} Sydney time (${escapeHtml(data.at)})<br/>
IP address: ${escapeHtml(ip)}<br/>
Device: ${escapeHtml(device)}<br/>
Site version: ${escapeHtml(build)}
</p>
</div>`;
  const note = `Consent: ticked the ${parts.creditGuideLabel} and Privacy Consent (web copies as at ${docs.updated}) on ${page} at ${sydney} Sydney time, IP ${ip}. Full record in the staff email.`;
  return { missing: false, html, note, data };
}
