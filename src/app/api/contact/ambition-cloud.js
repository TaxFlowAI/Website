/* Ambition Cloud (Frontline Financial: Asset Solutions). There are no published API
   docs: this format comes from Fintelligence's own Gravity Forms plugin
   (ambition-cloud-gf-add-on) and matches Ambition's Inbound API Reports screen.
   Only AMBITION_CLOUD_API_KEY is configurable. Without it a lead still reaches the
   ops inbox, and the email says it wasn't added. */

const TENANT_URL = "https://frontlinefinancial.ambitioncloud.com.au";
const SITE_URL = "https://frontline.financial";

const SOURCE_WEBSITE_FORM = "1"; // "Website form" in POST /api/list-sources
const LEAD_TYPE = "3"; // the type on past leads in Inbound API Reports
const PRIVACY_CONSENT_FORM = "19"; // "Frontline Financial - Privacy Consent" in POST /api/redirect-forms
const APPLICATION_TYPE_IDS = { consumer: "1", commercial: "2" };
const ASSET_TYPE_IDS = { car: "1" };

/* Ambition has no trigger for a new lead, so the privacy consent can't send itself.
   add-lead returns a link to the form named in redirect_form, and /api/contact emails it.
   The link is signed for this lead and expires 24 hours after add-lead. After that,
   staff send a new one with Request Privacy Consent on the application. */
export async function addAmbitionLead({
  firstName,
  lastName,
  email,
  phone,
  notes,
  campaign,
  amount,
  postcode,
  applicationType,
  assetType,
}) {
  const apiKey = process.env.AMBITION_CLOUD_API_KEY;
  if (!apiKey) return { added: false, error: "AMBITION_CLOUD_API_KEY is not set" };

  const source = campaign || "website-contact";
  const fields = {
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
    notes,
    amount: String(amount || "").replace(/\D/g, ""),
    postal_code: postcode,
    application_type_id: APPLICATION_TYPE_IDS[applicationType],
    asset_type_id: ASSET_TYPE_IDS[assetType],
    lead_type_id: LEAD_TYPE,
    source_id: SOURCE_WEBSITE_FORM,
    source_detail: `Website: ${source}`,
    campaign_source: source,
    redirect_form: PRIVACY_CONSENT_FORM,
  };
  const entries = Object.entries(fields).filter(([, value]) => value);

  try {
    const res = await fetch(`${TENANT_URL}/api/add-lead`, {
      method: "POST",
      headers: { "x-tenant-key": apiKey, referer: SITE_URL, Accept: "application/json" },
      body: new URLSearchParams(entries),
      signal: AbortSignal.timeout(10000),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || Number(data.result_code) !== 1) {
      return { added: false, error: data.result_message || `HTTP ${res.status}` };
    }
    return { added: true, refId: data.ref_id || null, privacyLink: data.fast_track_link || null };
  } catch (e) {
    return { added: false, error: e?.message || "Network error" };
  }
}

/* The privacy consent email. `firstName` and `link` must already be HTML-escaped. */
export function privacyConsentEmail({ firstName, link }) {
  const paragraph = "margin:0 0 16px;font-size:15px;line-height:1.6;color:#1C5472";
  const small = "margin:0 0 8px;font-size:12px;line-height:1.5;color:#5b7a8c";
  return {
    subject: "Next step for your finance enquiry: your privacy consent",
    html: `
<div style="background:#F6F8F2;padding:24px 12px;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden">
    <img src="${SITE_URL}/email/frontline-email-header.png" width="560" alt="Frontline Financial" style="display:block;width:100%;height:auto;border:0" />
    <div style="padding:28px 24px">
      <p style="${paragraph}">Hi ${firstName},</p>
      <p style="${paragraph}">Thanks for your enquiry. Someone from our team will call you to go through your options.</p>
      <p style="${paragraph}">To save time on the call, you can sign our privacy consent now. We need it before we can check your options with lenders, and it includes our Credit Guide and Quote. It takes a few minutes on your phone. Have your driver licence handy, because it asks for a photo of the front and back.</p>
      <p style="margin:24px 0;text-align:center">
        <a href="${link}" style="display:inline-block;padding:14px 28px;border-radius:8px;background:#00FCB8;color:#0A1628;font-size:16px;font-weight:bold;text-decoration:none">Sign your privacy consent</a>
      </p>
      <p style="${paragraph}">This link works for 24 hours. No rush if you'd rather talk first: we can go through it with you on the call and send you a new link.</p>
      <p style="${paragraph}">Any questions, reply to this email or call +61 422 959 486.</p>
      <p style="${paragraph}">Operations Team<br />Frontline Financial: Asset Solutions</p>
      <hr style="border:0;border-top:1px solid #e3e8e4;margin:24px 0" />
      <p style="${small}">You can read the consent first at <a href="${SITE_URL}/privacy-consent-asset-solutions" style="color:#1C5472">frontline.financial/privacy-consent-asset-solutions</a>.</p>
      <p style="${small}">You're getting this email because you sent us an enquiry at frontline.financial.</p>
      <p style="${small}">Level 49, 8 Parramatta Square, Parramatta NSW 2150. Martyn Financial Pty Ltd t/a Frontline Financial: Asset Solutions, authorised credit representative CRN 563350 of Australian Credit Licence 511803.</p>
    </div>
  </div>
</div>
`,
  };
}
