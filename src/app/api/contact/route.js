import { NextResponse } from "next/server";
import { addAmbitionLead, privacyConsentEmail } from "./ambition-cloud";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SEND_FAILED_MESSAGE =
  "Something went wrong sending your message. Please try again, or call us on +61 422 959 486.";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Quiz answers arrive as { "Question label": "Answer" }. Keep only short strings so the
// webhook can't be used to pass anything else along.
function cleanAnswers(answers) {
  if (!answers || typeof answers !== "object" || Array.isArray(answers)) return {};
  const clean = {};
  for (const [label, value] of Object.entries(answers).slice(0, 20)) {
    if (typeof value === "string" && value.trim()) clean[label.slice(0, 80)] = value.trim().slice(0, 200);
  }
  return clean;
}

// Each business line's leads go to one inbox:
// Brokers → Hassan; Asset Solutions (incl. vehicle finance and Dean's page) → operations; TaxFlowAI → taxflowai.
function getRecipient({ teamMember, consultationService, campaign }) {
  const brokers = process.env.CONTACT_EMAIL_BROKERS || "hassan@frontline.financial";
  const assetSolutions = process.env.CONTACT_EMAIL_ASSET_SOLUTIONS || "operations@frontline.financial";
  const taxflow = process.env.CONTACT_EMAIL_TAXFLOW || "taxflowai@frontline.financial";
  if (consultationService === "brokers" || teamMember === "hassan") return brokers;
  if (consultationService === "asset-solutions" || teamMember === "sham" || campaign === "dean-landing") {
    return assetSolutions;
  }
  if (teamMember === "taxflow") return taxflow;
  return process.env.CONTACT_EMAIL_DEFAULT || "operations@frontline.financial";
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    teamMember,
    services = [],
    message,
    preferredContact = "email",
    consultationService,
    campaign,
    answers,
    amount,
    postcode,
    applicationType,
    assetType,
  } = body;

  if (!firstName || typeof firstName !== "string" || !firstName.trim()) {
    return NextResponse.json({ success: false, error: "First name is required." }, { status: 400 });
  }
  if (!lastName || typeof lastName !== "string" || !lastName.trim()) {
    return NextResponse.json({ success: false, error: "Last name is required." }, { status: 400 });
  }
  if (!email || typeof email !== "string" || !email.trim()) {
    return NextResponse.json({ success: false, error: "Email is required." }, { status: 400 });
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ success: false, error: "Please provide a valid email address." }, { status: 400 });
  }
  if (!phone || typeof phone !== "string" || !phone.trim()) {
    return NextResponse.json({ success: false, error: "Phone is required." }, { status: 400 });
  }
  if (!message || typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ success: false, error: "Message is required." }, { status: 400 });
  }

  const to = getRecipient({ teamMember, consultationService, campaign });
  const isBrokers = consultationService === "brokers" || teamMember === "hassan";
  const isAssetSolutions =
    !isBrokers && (consultationService === "asset-solutions" || teamMember === "sham" || campaign === "dean-landing");
  const servicesLabel = Array.isArray(services) && services.length ? services.join(", ") : "General enquiry";
  const subject = `New Enquiry — ${firstName.trim()} ${lastName.trim()} re: ${servicesLabel}`;
  const timestamp = new Date().toISOString();
  const ambition = isAssetSolutions
    ? await addAmbitionLead({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        notes: [`Services: ${servicesLabel}`, `Preferred contact: ${preferredContact}`, message.trim()].join("\n"),
        campaign,
        amount,
        postcode,
        applicationType,
        assetType,
      })
    : null;
  if (ambition && !ambition.added) console.error("[Contact API] Ambition Cloud add-lead failed:", ambition.error);
  const ambitionLine = !ambition
    ? ""
    : ambition.added
      ? `<p><strong>Ambition Cloud:</strong> added${ambition.refId ? ` (ref ${escapeHtml(ambition.refId)})` : ""}.</p>`
      : `<p style="color:#b91c1c"><strong>Ambition Cloud: NOT added. Please enter this lead by hand.</strong></p>`;
  const html = `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${escapeHtml(`${firstName.trim()} ${lastName.trim()}`)}</p>
<p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
<p><strong>Phone:</strong> ${escapeHtml(phone.trim())}</p>
<p><strong>Preferred contact:</strong> ${escapeHtml(preferredContact)}</p>
<p><strong>Interested in:</strong> ${escapeHtml(servicesLabel)}</p>
<p><strong>Message:</strong></p>
<p>${escapeHtml(message.trim()).replace(/\n/g, "<br/>")}</p>
<p><strong>Submitted:</strong> ${timestamp}</p>
${ambitionLine}
<hr/>
<p style="color:grey;font-size:12px">Submitted via frontline.financial contact form</p>
`;

  const resendApiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.CONTACT_EMAIL_FROM || "Frontline Financial Website <website@frontline.financial>";

  const leadPayload = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim(),
    phone: phone.trim(),
    message: (message || "").trim(),
    services,
    source: "frontline-website",
  };

  /* Sent separately from the ops email: a failure here must not fail the enquiry. */
  const sendPrivacyEmail = async () => {
    if (!ambition?.privacyLink || !resendApiKey) return false;
    try {
      const privacy = privacyConsentEmail({
        firstName: escapeHtml(firstName.trim()),
        link: escapeHtml(ambition.privacyLink),
      });
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Frontline Financial: Asset Solutions <operations@frontline.financial>",
          to: [email.trim()],
          subject: privacy.subject,
          html: privacy.html,
          reply_to: "operations@frontline.financial",
        }),
      });
      if (res.ok) return true;
      console.error("[Contact API] Privacy consent email failed:", res.status);
      return false;
    } catch (e) {
      console.error("[Contact API] Privacy consent email error:", e?.message || e);
      return false;
    }
  };

  const forwardToPlatform = async () => {
    if (ambition) {
      return {
        forwardedTo: ambition.added ? "ambition-cloud" : null,
        forwardError: ambition.added ? null : ambition.error,
        privacyLink: ambition.privacyLink || null,
        privacyEmailed: await sendPrivacyEmail(),
      };
    }
    // Home-loan leads go to a Zapier webhook, which creates the card in Broker Engine.
    if (isBrokers) {
      return forwardToBrokerEngine();
    }
    return { forwardedTo: null, forwardError: null };
  };

  const forwardToBrokerEngine = async () => {
    const hookUrl = process.env.ZAPIER_BROKERS_WEBHOOK_URL;
    if (!hookUrl) return { forwardedTo: null, forwardError: null };
    const quizAnswers = cleanAnswers(answers);
    try {
      const r = await fetch(hookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadPayload,
          fullName: `${leadPayload.firstName} ${leadPayload.lastName}`,
          services: servicesLabel,
          preferredContact,
          campaign: campaign || "website-contact",
          answers: quizAnswers,
          /* One block of text for the card's notes */
          summary: [
            `Source: ${campaign || "website-contact"}`,
            ...Object.entries(quizAnswers).map(([label, value]) => `${label}: ${value}`),
            `Services: ${servicesLabel}`,
            `Preferred contact: ${preferredContact}`,
            `Message: ${leadPayload.message}`,
          ].join("\n"),
          submittedAt: timestamp,
        }),
      });
      if (r.ok) return { forwardedTo: "zapier", forwardError: null };
      console.error("[Contact API] Zapier forward failed:", r.status);
      return { forwardedTo: null, forwardError: `HTTP ${r.status}` };
    } catch (e) {
      console.error("[Contact API] Zapier forward error:", e?.message || e);
      return { forwardedTo: null, forwardError: e?.message || "Network error" };
    }
  };

  if (!resendApiKey) {
    // Locally, let the form complete without a key so pages can be tested.
    if (process.env.NODE_ENV === "development") {
      console.log("[Contact API] RESEND_API_KEY not set. Would send to:", to, "Subject:", subject);
      const forward = await forwardToPlatform();
      return NextResponse.json({ success: true, ...forward });
    }
    // In production a missing key would silently drop the lead, so fail loudly instead.
    console.error("[Contact API] RESEND_API_KEY is not set; enquiry from", email.trim(), "was not emailed.");
    return NextResponse.json({ success: false, error: SEND_FAILED_MESSAGE }, { status: 500 });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
        reply_to: email.trim(),
      }),
    });
    if (!res.ok) {
      const detail = await res.json().catch(() => ({}));
      throw new Error(`Resend ${res.status}: ${detail.message || res.statusText}`);
    }
    const forward = await forwardToPlatform();
    return NextResponse.json({ success: true, ...forward });
  } catch (err) {
    // Log the real Resend error server-side; never expose it to the visitor.
    console.error("[Contact API] Send failed:", err?.message || err);
    return NextResponse.json({ success: false, error: SEND_FAILED_MESSAGE }, { status: 500 });
  }
}
