# API routes

## Contact (`/api/contact`)

Handles contact form submissions, emailed to staff through the [Resend](https://resend.com) API from `website@frontline.financial` (domain verified in Resend; DNS records at GoDaddy).

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes | Resend API key (`re_…`). Without it, development logs the enquiry and returns success; production returns an error so the visitor sees the phone number instead of a false "sent". |
| `CONTACT_EMAIL_FROM` | No | Sender (default: `Frontline Financial Website <website@frontline.financial>`). Must be on a domain verified in Resend. |
| `CONTACT_EMAIL_BROKERS`, `_ASSET_SOLUTIONS`, `_TAXFLOW` | No | One inbox per business line (defaults: hassan@, operations@, taxflowai@). Asset Solutions includes the vehicle finance and Dean landing pages. No CCs. |
| `CONTACT_EMAIL_DEFAULT` | No | Fallback for an enquiry that matches no business line (default: operations@). |
| `ZAPIER_BROKERS_WEBHOOK_URL` | No | Zapier "Catch Hook" URL. Home-loan leads are posted here, and the Zap creates the Broker Engine card. Unset = no forward. Keep it server-only (never `NEXT_PUBLIC_`). |

Send failures are logged as `[Contact API] Send failed: Resend <status>: <message>` (check Vercel → Logs).

The vehicle finance page also sends `attribution` — the UTM tags and `fbclid` from the URL the visitor landed on (e.g. a Meta ad link with `utm_content={{ad.name}}`). The staff email then carries a **Source** block (Meta ad, campaign, source / medium), or "Source: direct / unknown" when the visit had no tags. Without `RESEND_API_KEY`, development logs the full email body, so this can be checked locally. Leave `AMBITION_CLOUD_API_KEY` and `ZAPIER_BROKERS_WEBHOOK_URL` unset as well, because the lead is still forwarded without Resend.

After the email is sent, the lead is also forwarded:

- Brokers (`consultationService: "brokers"` or `teamMember: "hassan"`) → the Zapier webhook → **Broker Engine** (Frontline Financial Brokers). Broker Engine has no public API, so Zapier's "New Card" action does the write. The body carries the contact fields, `campaign`, `answers` ({label: value} from a quiz) and `summary` (one text block for the card notes). Failures log as `[Contact API] Zapier forward …` and don't affect the visitor.
- Asset Solutions (`consultationService: "asset-solutions"`, `teamMember: "sham"` or `campaign: "dean-landing"`) → **Ambition Cloud**. See below.

---

## Ambition Cloud — Asset Solutions (`src/app/api/contact/ambition-cloud.js`)

**Platform:** Ambition Cloud (Fintelligence) — compliance, application process, submission to lenders for **Frontline Financial: Asset Solutions**.

| Variable | Required | Description |
|----------|----------|-------------|
| `AMBITION_CLOUD_API_KEY` | Yes (to enable) | Tenant API key: Ambition Cloud > Settings > API Keys and Security. Without it, the lead still reaches the ops inbox, marked as not added. |

There are no published API docs. The format comes from Fintelligence's Gravity Forms plugin (`ambition-cloud-gf-add-on`): a form-encoded `POST https://frontlinefinancial.ambitioncloud.com.au/api/add-lead` with an `x-tenant-key` header. `POST /api` tests the key, and `/api/list-sources`, `/api/default-fields` and `/api/redirect-forms` list the IDs in use. Ambition's Inbound API Reports screen logs each request.

- **Order:** the lead is added before the ops email, so the email can say whether it landed. A failure logs `[Contact API] Ambition Cloud add-lead failed: ...`, and the email asks staff to enter the lead by hand. The visitor still sees success.
- **Privacy consent:** Ambition has no trigger for a new lead, so it can't send this itself. `redirect_form` asks add-lead for a link to the "Frontline Financial - Privacy Consent" form (`fast_track_link`), and `/api/contact` emails that link to the client from operations@ and returns it as `privacyLink`.
- **Optional body fields:** `amount`, `postcode`, `applicationType` (`consumer` or `commercial`) and `assetType` (`car`).

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
AMBITION_CLOUD_API_KEY=your_ambition_cloud_api_key

# Broker Engine (Brokers)
BROKER_ENGINE_API_URL=https://api.brokerengine.com.au
BROKER_ENGINE_API_KEY=your_broker_engine_api_key
```

Replace the keys with the real values. A real key on localhost creates real leads and sends real emails.

---

## How to check if it’s working

Don't send test leads without the user's OK: they reach the CRM and the inboxes. To test a form safely, leave the keys unset, or stub `window.fetch` in the browser.

After a real test, check Ambition Cloud's Inbound API Reports and Opportunities, the "Ambition Cloud:" line in the ops email, and the privacy consent email.
