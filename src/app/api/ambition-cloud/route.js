import { NextResponse } from "next/server";

/**
 * Ambition Cloud (Fintelligence) API integration for Frontline Financial: Asset Solutions.
 * Used for compliance, application process, and submission to lenders.
 *
 * Configure via env:
 *   AMBITION_CLOUD_API_URL  - e.g. https://api.fintelligence.com.au
 *   AMBITION_CLOUD_API_KEY  - API key from Fintelligence/Ambition Cloud
 *
 * When not configured, POST returns 200 with { forwarded: false } so the rest of the flow still works.
 */

const DEFAULT_BASE_URL = "https://api.fintelligence.com.au";

function getConfig() {
  const baseUrl = process.env.AMBITION_CLOUD_API_URL || DEFAULT_BASE_URL;
  const apiKey = process.env.AMBITION_CLOUD_API_KEY;
  return { baseUrl, apiKey, enabled: Boolean(apiKey) };
}

/**
 * Map our lead payload to the shape expected by Ambition Cloud Inbound API.
 * Adjust this once you have official API docs from Fintelligence.
 */
function buildAmbitionPayload(body) {
  const {
    firstName,
    lastName,
    email,
    phone,
    message,
    services = [],
    source = "frontline-website",
  } = body;
  return {
    first_name: firstName?.trim(),
    last_name: lastName?.trim(),
    email: email?.trim(),
    phone: phone?.trim(),
    message: message?.trim(),
    services: Array.isArray(services) ? services : [services].filter(Boolean),
    source,
    submitted_at: new Date().toISOString(),
  };
}

export async function POST(request) {
  const { baseUrl, apiKey, enabled } = getConfig();

  if (!enabled) {
    if (process.env.NODE_ENV === "development") {
      console.log("[Ambition Cloud] Not configured (AMBITION_CLOUD_API_KEY missing). Lead not forwarded.");
    }
    return NextResponse.json({ success: true, forwarded: false });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  const payload = buildAmbitionPayload(body);
  const url = `${baseUrl.replace(/\/$/, "")}/inbound/lead`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        ...(process.env.AMBITION_CLOUD_HEADERS
          ? JSON.parse(process.env.AMBITION_CLOUD_HEADERS)
          : {}),
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { raw: text };
    }

    if (!res.ok) {
      console.error("[Ambition Cloud] API error:", res.status, data);
      return NextResponse.json(
        { success: false, error: data?.message || data?.error || "Ambition Cloud API error", forwarded: false },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, forwarded: true, response: data });
  } catch (err) {
    console.error("[Ambition Cloud] Request failed:", err?.message || err);
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to forward to Ambition Cloud", forwarded: false },
      { status: 502 }
    );
  }
}
