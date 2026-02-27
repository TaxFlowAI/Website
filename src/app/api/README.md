# API routes

## Contact (`/api/contact`)

Handles contact form submissions (email via SMTP). When the payload includes `consultationService`, the lead is also forwarded to the corresponding platform:

- `consultationService: "brokers"` → **Broker Engine** (Frontline Financial Brokers)
- `consultationService: "asset-solutions"` → **Ambition Cloud** (Frontline Financial: Asset Solutions)

---

## Ambition Cloud — Asset Solutions (`/api/ambition-cloud`)

**Platform:** Ambition Cloud (Fintelligence) — compliance, application process, submission to lenders for **Frontline Financial: Asset Solutions**.

### Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `AMBITION_CLOUD_API_KEY` | Yes (to enable) | API key from Fintelligence / Ambition Cloud |
| `AMBITION_CLOUD_API_URL` | No | Base URL (default: `https://api.fintelligence.com.au`) |
| `AMBITION_CLOUD_HEADERS` | No | JSON object of extra headers to send |

If `AMBITION_CLOUD_API_KEY` is not set, the route returns success without forwarding (so the rest of the flow still works).

### Payload (POST body)

The route accepts the same shape as the contact form and maps it for Ambition Cloud:

- `firstName`, `lastName`, `email`, `phone`, `message`, `services`, `source`

Endpoint and field names may need to be adjusted once you have the official **Ambition Cloud Inbound API** documentation from Fintelligence.

---

## Broker Engine — Brokers (`/api/broker-engine`)

**Platform:** Broker Engine — mortgage broking workflow for **Frontline Financial Brokers**.

### Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `BROKER_ENGINE_API_URL` | Yes (to enable) | Broker Engine API base URL (from Broker Engine or certified partner) |
| `BROKER_ENGINE_API_KEY` | Yes (to enable) | API key / token |
| `BROKER_ENGINE_LEADS_PATH` | No | Path after base URL (default: `leads`). Use if their API uses e.g. `api/v1/leads` or `webhook/leads`. |
| `BROKER_ENGINE_HEADERS` | No | JSON object of extra headers to send (e.g. different auth header name) |

If either URL or key is missing, the route returns success without forwarding.

### Payload (POST body)

We send: `first_name`, `last_name`, `email`, `phone`, `message`, `services`, `source`, `submitted_at`. If Broker Engine expects different field names or structure, update `buildBrokerEnginePayload()` in `src/app/api/broker-engine/route.js` to match their docs.

### If leads don’t show in Broker Engine

1. **Check env** — In the project root, `.env.local` must have `BROKER_ENGINE_API_URL` and `BROKER_ENGINE_API_KEY` set. Restart the dev server after changing.
2. **Check server logs** — When you submit the consultation form (Brokers), the terminal running `npm run dev` will log:
   - `[Broker Engine] POST <url> payload keys: [...]` if the request is sent
   - `[Broker Engine] API error. Status: XXX Response: {...}` if their API returns an error
   - `[Broker Engine] Lead created/forwarded` if the call succeeded
3. **Match their API** — Broker Engine’s real endpoint path, auth (e.g. `X-API-Key` instead of `Authorization: Bearer`), and request body may differ. Set `BROKER_ENGINE_LEADS_PATH` to their path (e.g. `api/leads`) and, if needed, adjust the code to use their exact field names and auth header.

---

## Example `.env.local`

```bash
# Ambition Cloud (Asset Solutions)
AMBITION_CLOUD_API_URL=https://api.fintelligence.com.au
AMBITION_CLOUD_API_KEY=your_ambition_cloud_api_key

# Broker Engine (Brokers)
BROKER_ENGINE_API_URL=https://api.brokerengine.com.au
BROKER_ENGINE_API_KEY=your_broker_engine_api_key
```

Replace URLs and keys with the values provided by Fintelligence and Broker Engine.

---

## How to check if it’s working

1. **Run the site**  
   `npm run dev` and open the homepage.

2. **Send a test consultation**  
   Scroll to the green “26 million Australians…” section.  
   - Choose **Frontline Financial Brokers** → fill the form → submit.  
   - Then try **Frontline Financial: Asset Solutions** → fill the form → submit.

3. **Check the thank-you page**  
   If the integration worked, you’ll see:  
   *“Your enquiry has been sent to Broker Engine / Ambition Cloud and our team will follow up.”*

4. **Check the terminal**  
   In the window where `npm run dev` is running, look for:  
   - `[Contact API] ✓ Forwarded to Broker Engine (Brokers)`  
   - `[Contact API] ✓ Forwarded to Ambition Cloud (Asset Solutions)`  
   If forwarding fails (wrong URL, key, or API error), you’ll see a log like  
   `[Contact API] Broker Engine forward failed: 401 ...` instead.

5. **Check the platforms**  
   Log into Broker Engine and Ambition Cloud and confirm the test leads appear there.
