import { NextResponse } from "next/server";

/**
 * Broker Engine API integration for Frontline Financial Brokers.
 * Used for mortgage broking workflow, lodgement, and lender submission.
 *
 * Configure via env:
 *   BROKER_ENGINE_API_URL  - Broker Engine API base URL (obtain from Broker Engine / certified partner)
 *   BROKER_ENGINE_API_KEY  - API key or token
 *
 * When not configured, POST returns 200 with { forwarded: false } so the rest of the flow still works.
 */

function getConfig() {
  const baseUrl = process.env.BROKER_ENGINE_API_URL;
  const apiKey = process.env.BROKER_ENGINE_API_KEY;
  const path = process.env.BROKER_ENGINE_LEADS_PATH || "leads";
  return { baseUrl, apiKey, path, enabled: Boolean(baseUrl && apiKey) };
}

/**
 * Map our lead payload to the shape expected by Broker Engine.
 * Adjust endpoint and payload once you have official API docs from Broker Engine.
 */
function buildBrokerEnginePayload(body) {
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
  const { baseUrl, apiKey, path, enabled } = getConfig();

  if (!enabled) {
    console.warn("[Broker Engine] Not configured. Set BROKER_ENGINE_API_URL and BROKER_ENGINE_API_KEY in .env.local. Lead not forwarded.");
    return NextResponse.json({ success: true, forwarded: false });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  const payload = buildBrokerEnginePayload(body);
  const pathNormalized = path.startsWith("/") ? path.slice(1) : path;
  const url = `${baseUrl.replace(/\/$/, "")}/${pathNormalized}`;

  console.log("[Broker Engine] POST", url, "payload keys:", Object.keys(payload));

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        ...(process.env.BROKER_ENGINE_HEADERS
          ? JSON.parse(process.env.BROKER_ENGINE_HEADERS)
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
      console.error("[Broker Engine] API error. Status:", res.status, "Response:", JSON.stringify(data));
      return NextResponse.json(
        { success: false, error: data?.message || data?.error || `Broker Engine returned ${res.status}`, forwarded: false },
        { status: 502 }
      );
    }

    console.log("[Broker Engine] Lead created/forwarded. Response:", JSON.stringify(data).slice(0, 200));
    return NextResponse.json({ success: true, forwarded: true, response: data });
  } catch (err) {
    console.error("[Broker Engine] Request failed:", err?.message || err);
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to forward to Broker Engine", forwarded: false },
      { status: 502 }
    );
  }
}
