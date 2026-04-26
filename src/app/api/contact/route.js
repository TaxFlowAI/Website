import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getRecipient(teamMember) {
  const hassan = process.env.CONTACT_EMAIL_HASSAN || "hassan@frontline.financial";
  const sham = process.env.CONTACT_EMAIL_SHAM || "sham@frontline.financial";
  const dean = process.env.CONTACT_EMAIL_DEAN || "dean@frontline.financial";
  const taxflow = process.env.CONTACT_EMAIL_TAXFLOW || "taxflowai@frontline.financial";
  const def = process.env.CONTACT_EMAIL_DEFAULT || "operations@frontline.financial";
  if (teamMember === "hassan") return hassan;
  if (teamMember === "sham") return sham;
  if (teamMember === "dean") return dean;
  if (teamMember === "taxflow") return taxflow;
  return def;
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

  const to = getRecipient(teamMember);
  const opsEmail = process.env.CONTACT_EMAIL_DEFAULT || "operations@frontline.financial";
  const deanEmail = process.env.CONTACT_EMAIL_DEAN || "dean@frontline.financial";
  // Dean campaign → ensure both ops and Dean receive a copy.
  const ccList = campaign === "dean-landing"
    ? [opsEmail, deanEmail].filter((addr) => addr && addr !== to)
    : [opsEmail].filter((addr) => addr && addr !== to);
  const cc = ccList.length ? ccList.join(", ") : undefined;
  const servicesLabel = Array.isArray(services) && services.length ? services.join(", ") : "General enquiry";
  const subject = `New Enquiry — ${firstName.trim()} ${lastName.trim()} re: ${servicesLabel}`;
  const timestamp = new Date().toISOString();
  const html = `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${firstName.trim()} ${lastName.trim()}</p>
<p><strong>Email:</strong> ${email.trim()}</p>
<p><strong>Phone:</strong> ${phone.trim()}</p>
<p><strong>Preferred contact:</strong> ${preferredContact}</p>
<p><strong>Interested in:</strong> ${servicesLabel}</p>
<p><strong>Message:</strong></p>
<p>${message.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>")}</p>
<p><strong>Submitted:</strong> ${timestamp}</p>
<hr/>
<p style="color:grey;font-size:12px">Submitted via frontline.financial contact form</p>
`;

  const hasSmtp =
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS;

  const leadPayload = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim(),
    phone: phone.trim(),
    message: (message || "").trim(),
    services,
    source: "frontline-website",
  };

  const forwardToPlatform = async (requestUrl) => {
    const origin = requestUrl ? new URL(requestUrl).origin : null;
    if (!origin) return { forwardedTo: null, forwardError: null };
    if (consultationService === "asset-solutions") {
      try {
        const r = await fetch(`${origin}/api/ambition-cloud`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadPayload),
        });
        const d = await r.json().catch(() => ({}));
        if (r.ok && d.forwarded) {
          if (process.env.NODE_ENV === "development") console.log("[Contact API] ✓ Forwarded to Ambition Cloud (Asset Solutions)");
          return { forwardedTo: "ambition-cloud", forwardError: null };
        }
        if (!r.ok && process.env.NODE_ENV === "development") {
          console.log("[Contact API] Ambition Cloud forward failed:", r.status, d);
        }
        return { forwardedTo: null, forwardError: d.error || `HTTP ${r.status}` };
      } catch (e) {
        if (process.env.NODE_ENV === "development") console.log("[Contact API] Ambition Cloud forward error:", e?.message);
        return { forwardedTo: null, forwardError: e?.message || "Network error" };
      }
    }
    // Broker Engine forwarding disabled for now — Brokers enquiries still succeed; no external forward.
    if (consultationService === "brokers") {
      return { forwardedTo: null, forwardError: null };
    }
    return { forwardedTo: null, forwardError: null };
  };

  if (!hasSmtp) {
    // No SMTP configured: still return success so form works; optionally log
    if (process.env.NODE_ENV === "development") {
      console.log("[Contact API] No SMTP configured. Would send to:", to, "CC:", cc, "Subject:", subject);
    }
    const forward = await forwardToPlatform(request.url);
    return NextResponse.json({ success: true, ...forward });
  }

  let nodemailer;
  try {
    // Module path from env so bundler does not resolve at build time when pkg is missing
    const nodemailerModule = process.env.NODEMAILER_MODULE || "nodemailer";
    nodemailer = (await import(nodemailerModule)).default;
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.log("[Contact API] nodemailer not installed. Run: npm install nodemailer");
    }
    return NextResponse.json({ success: true });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587", 10),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      cc,
      subject,
      html,
      replyTo: email.trim(),
    });
    const forward = await forwardToPlatform(request.url);
    return NextResponse.json({ success: true, ...forward });
  } catch (err) {
    console.error("[Contact API] Send failed:", err?.message || err);
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to send email." },
      { status: 500 }
    );
  }
}
