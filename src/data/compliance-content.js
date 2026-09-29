// TaxFlowAI legal documents — website versions.
//
// UPDATED 29 September 2026 on the owner's instruction, to match the
// platform as it stands after the September 2026 changes. Every factual
// statement below comes from the owner or from the app builder's written
// answers of the same date. This revision has NOT yet been reviewed by a
// lawyer and should be before it is relied on.
//
// What changed from the 1 March 2026 versions:
// - Names both entities: Frontline Holdings Group Pty Ltd owns and operates
//   the platform; TAX7 T04 PTY LTD is the registered tax agent.
// - The platform no longer collects or stores TFNs or bank details.
// - Hosting is AWS Sydney (was Render, United States).
// - Lists the service providers and where each processes information.
// - Documents are held in Dropbox (United States).
// - Discloses that some staff are located overseas.
//
// Owner decisions, 29 September 2026. Do not add these back:
// - No mention of a planned move to Microsoft 365 storage.
// - No statement about overseas staff and Tax File Numbers. That is covered
//   in the Engagement Letter, not in the public documents.
//
// CFG: EMAIL = taxflowai@frontline.financial
// CFG: PHONE = 0422 959 486
// CFG: URL_PRIVACY = https://frontline.financial/taxflow/privacy-policy
// CFG: URL_COLLECTION = https://frontline.financial/taxflow/collection-notice
// CFG: ADDR_FH = Level 49, 8 Parramatta Square, Parramatta NSW 2150
// CFG: EFFECTIVE_DATE = 29 September 2026

export const PRIVACY_POLICY = {
  title: "Privacy Policy",
  version: "1.2",
  effectiveDate: "29 September 2026",
  lastReviewed: "29 September 2026",
  sections: [
    {
      heading: "1. Scope",
      content: `This policy describes how we collect, hold, use, disclose, and protect your personal information when you use TaxFlowAI. "We" means Frontline Holdings Group Pty Ltd (ABN: 59 671 861 475), which owns and operates the TaxFlowAI platform under the registered business name "TaxFlowAI by Frontline Financial" and is a registered ASIC agent (Agent Number: 51843). Tax agent services are provided by TAX7 T04 PTY LTD (ABN: 73 680 225 512), a registered tax agent (Tax Agent Number: 26313222) trading as TaxFlowAI; it also handles your information in connection with those services. We handle your information in accordance with the Privacy Act 1988 (Cth), the Australian Privacy Principles (APPs), and the Privacy (Tax File Number) Rule 2015.`
    },
    {
      heading: "2. What We Collect",
      content: `We collect: identity and contact details (name, DOB, address, email, phone, occupation); business identifiers (ABN, ACN where relevant); documents and receipts you upload; payment information (card payments are processed by Stripe and we do not store your card number); identity verification information, where we need to verify who you are; technical and account information (login credentials, IP address, audit logs); and, for company clients, company and director information needed for ASIC-related services. We only collect what is reasonably necessary to provide our services.

The TaxFlowAI platform does not collect or store your Tax File Number (TFN) or bank account details as records. Where they are needed for tax agent services, your tax agent collects them from you directly and holds them in its own practice management systems. Documents you upload, such as tax returns and notices of assessment, may contain them.`
    },
    {
      heading: "3. How We Collect and Hold It",
      content: `We collect information directly from you (registration, forms, uploads, messages, bookings), from your tax agent when they set up your account, from public registers (e.g. ABR, ASIC) where relevant, and automatically (e.g. IP address, browser type) for security and logging.

We hold it in secure systems. Information is encrypted in transit and at rest, every sign-in requires a password and a one-time verification code, access is role-based, and security events are logged. The platform, its database and its backups are hosted in Amazon Web Services' Sydney region. Documents you upload are held in Dropbox, which stores them in the United States.`
    },
    {
      heading: "4. Purposes and Who We Share With",
      content: `We use your information to provide tax and (where applicable) ASIC-related services, communicate with you, process payments, verify your identity, comply with law, and maintain security.

We may disclose it to: TAX7 T04 PTY LTD, as the registered tax agent; the ATO and, for company clients, ASIC; the service providers listed in section 5, who help us run the platform; staff located overseas who assist with lodgement preparation; and regulators when required by law. We do not sell or trade your personal information.

Staff located overseas work under system-enforced access controls and cannot run exports of client data.`
    },
    {
      heading: "5. Overseas Disclosure and Service Providers",
      content: `Some of our service providers and staff are located outside Australia, so your information may be stored or accessed overseas, mainly in the United States. Where we disclose information overseas, we take reasonable steps so the recipient handles it consistently with the APPs. You can contact us to ask which countries apply.

Our service providers, what they do, and where they process information:

Amazon Web Services: platform hosting, database and backups (Australia).

Dropbox: storage of documents you upload (United States).

Microsoft 365: email (Australia).

Xero and Xero Practice Manager: accounting and tax data for lodgement (Australia and other countries).

Anthropic, with OpenAI as a backup: AI processing of the receipt, document or message being handled (United States). Under their commercial terms, your content is not used to train their models.

Stripe: card payments (multiple countries).

Resend: email delivery (United States).

Twilio: SMS, including sign-in codes (United States and other countries).

Annature: electronic signatures (Australia).

Didit: identity verification (multiple countries).

Calendly: appointment bookings (United States).

Google Maps: address lookup (multiple countries).

Cloudflare: protection against automated abuse (multiple countries).

Vercel: hosting of our public website (multiple countries).`
    },
    {
      heading: "6. Tax File Number",
      content: `The TaxFlowAI platform does not collect or store your TFN as a record. Where your TFN is needed for tax agent services, it is collected by your tax agent, TAX7 T04 PTY LTD, and held in its practice management systems in line with the Privacy (Tax File Number) Rule 2015. We do not send TFNs by email or store them in cookies or logs.

Documents you upload may contain your TFN. They are held as described in section 3, and access to them is restricted to staff working on your file.

You are not obliged to provide your TFN, but withholding it may affect the services that can be provided (e.g. higher withholding). If you suspect TFN misuse, contact the ATO on 13 28 61.`
    },
    {
      heading: "7. Access and Correction",
      content: `You can request access to or correction of the personal information we hold about you. You can view much of it in your TaxFlowAI profile; for a full export or to correct details, contact us. We will respond within 30 days.`
    },
    {
      heading: "8. Complaints",
      content: `If you believe we have breached your privacy, contact us (see Contact below). We will acknowledge within 5 business days and aim to respond within 30 days. If you are not satisfied, you may complain to the Office of the Australian Information Commissioner (OAIC): oaic.gov.au or 1300 363 992. For tax agent issues you may also contact the Tax Practitioners Board (tpb.gov.au or 1300 362 829).`
    },
    {
      heading: "9. Changes and Contact",
      content: `We may update this policy from time to time; we will update the effective date and, for material changes, notify you via the platform or email. Continued use of TaxFlowAI after changes means you accept the updated policy. For any privacy enquiries or requests, contact us: Email: taxflowai@frontline.financial; Phone: 0422 959 486; Post: Level 49, 8 Parramatta Square, Parramatta NSW 2150.`
    }
  ]
};

export const COLLECTION_NOTICE = {
  title: "Collection Notice — Initial Enquiry Form",
  subtitle: "Australian Privacy Principle 5 — Notification of Collection",
  version: "1.2",
  effectiveDate: "29 September 2026",
  sections: [
    {
      heading: "1. Who Is Collecting Your Information",
      content: `Your information is collected by Frontline Holdings Group Pty Ltd (ABN: 59 671 861 475, ACN: 671 861 475), which owns and operates the TaxFlowAI platform under the registered business name "TaxFlowAI by Frontline Financial" and is a registered ASIC agent (Agent Number: 51843). For company clients, Frontline Holdings also provides ASIC compliance services including annual reviews, company lodgements, and changes to company details under the Corporations Act 2001 (Cth).

Tax agent services are not provided by Frontline Holdings. They are provided by TAX7 T04 PTY LTD (ABN: 73 680 225 512), a registered tax agent (Tax Agent Number: 26313222) trading as TaxFlowAI. If you engage it, the engagement is confirmed in your Engagement Letter, and it is responsible for providing you with tax agent services.`
    },
    {
      heading: "2. What Information We Collect From This Form",
      content: `When you submit the initial enquiry form, we collect only the following: first name, last name, email address, phone number, and the message you write. If you book a call, the booking form collects your name, your contact details and the time you choose.

We do not collect sensitive information (such as your Tax File Number, financial details, or health information) through these forms. The TaxFlowAI platform does not collect or store Tax File Numbers or bank account details at any stage; where they are needed, your tax agent collects them from you directly once you are a client.`
    },
    {
      heading: "3. Why We Collect This Information",
      content: `We collect your contact details to respond to your enquiry about tax agent and/or ASIC compliance services, to contact you by phone or email to discuss your needs, to provide you with information about services offered, and to send you a follow-up if we are unable to reach you initially.

We will not use your information for any other purpose without your consent.`
    },
    {
      heading: "4. What Happens If You Choose Not to Provide This Information",
      content: `Providing your information is voluntary. However, if you do not provide your name and at least one contact method (email or phone), we will not be able to respond to your enquiry.`
    },
    {
      heading: "5. Who We May Share Your Information With",
      content: `Your enquiry details may be shared with: TAX7 T04 PTY LTD, the registered tax agent (who may respond to your enquiry about tax agent services); Frontline Holdings Group Pty Ltd (the platform operator and ASIC agent that stores and manages your enquiry data); and the service providers that host our website and platform, deliver our email, and take our bookings. These include Amazon Web Services, Vercel, Resend and Calendly.

We will not sell, rent, or disclose your information to any other third party for marketing purposes.`
    },
    {
      heading: "6. Overseas Disclosure",
      content: `The TaxFlowAI platform, its database and its backups are hosted in Amazon Web Services' Sydney region. Some of the service providers that handle enquiries are located overseas, mainly in the United States, including those that host this website, deliver email and take bookings. Where information is disclosed overseas, we take reasonable steps so the recipient handles it consistently with the Australian Privacy Principles.

Our Privacy Policy lists our service providers and where each one processes information.`
    },
    {
      heading: "7. How Long We Keep Your Information",
      content: `If you do not proceed to register as a client, your enquiry details will be retained for up to 2 years and then securely deleted. If you do register, your information will become part of your client record and will be subject to the full TaxFlowAI Privacy Policy.`
    },
    {
      heading: "8. Your Rights",
      content: `You have the right to request access to the personal information we hold about you, request correction of any information that is inaccurate, incomplete, or out of date, and request deletion of your enquiry data if you do not wish to proceed.

To exercise any of these rights, contact us at taxflowai@frontline.financial.`
    },
    {
      heading: "9. Complaints",
      content: `If you believe your privacy has been breached, contact us at taxflowai@frontline.financial. If you are not satisfied with our response, you can lodge a complaint with the Office of the Australian Information Commissioner (OAIC) at oaic.gov.au or 1300 363 992.`
    },
    {
      heading: "10. Contact Us",
      content: `Email: taxflowai@frontline.financial
Phone: 0422 959 486
Post: Level 49, 8 Parramatta Square, Parramatta NSW 2150

Our full privacy policy is available at https://frontline.financial/taxflow/privacy-policy.`
    }
  ]
};

// TaxFlowAI Terms of Service — platform use only; tax agent services under Engagement Letter
export const TERMS_OF_SERVICE = {
  title: "Terms of Service",
  version: "1.1",
  effectiveDate: "29 September 2026",
  sections: [
    {
      heading: "1. Agreement and Scope",
      content: `These terms govern your use of the TaxFlowAI platform (the "Platform"), which is owned and operated by Frontline Holdings Group Pty Ltd (ABN: 59 671 861 475) under the registered business name "TaxFlowAI by Frontline Financial". By accessing or using the Platform, you agree to these terms. If you do not agree, do not use the Platform. Tax agent services provided through the Platform are supplied by TAX7 T04 PTY LTD (ABN: 73 680 225 512), a registered tax agent (Tax Agent Number: 26313222) trading as TaxFlowAI, under a separate Engagement Letter; those services are governed by that letter and any related engagement terms, not solely by these Terms of Service.`
    },
    {
      heading: "2. The Service",
      content: `TaxFlowAI is a web-based platform that supports the management of your tax affairs, including document storage, lodgement tracking, and communication with your accountant. Once you register an account, you can engage TAX7 T04 PTY LTD, the registered tax agent, through the Platform. The Platform may also support ASIC-related services for company clients, which are provided by Frontline Holdings Group Pty Ltd as a registered ASIC agent. The Platform is a technology tool; it does not substitute for professional tax or legal advice. You are responsible for the accuracy of information you provide and for acting on any advice you receive from your tax agent.`
    },
    {
      heading: "3. Your Obligations",
      content: `You must: provide accurate and complete information when registering and using the Platform; keep your login details secure and not share them with others; use the Platform only for lawful purposes and in line with these terms; not attempt to gain unauthorised access to the Platform, other users' accounts, or our systems; and not misuse, disrupt, or interfere with the Platform or our services. You must not upload content that is illegal, offensive, or infringes others' rights. We may suspend or terminate your access if you breach these terms.`
    },
    {
      heading: "4. Account and Access",
      content: `Access to the Platform may require registration and acceptance of these terms and any applicable engagement documents. You are responsible for all activity under your account. We may suspend or terminate your access to the Platform for breach of these terms, for operational or legal reasons, or on reasonable notice. Where your access is linked to a client relationship with the registered tax agent, cessation of that relationship may also affect your Platform access.`
    },
    {
      heading: "5. Intellectual Property and Your Content",
      content: `The Platform, including its software, design, branding, and content (other than content you submit), is owned by Frontline Holdings Group Pty Ltd or its licensors. You do not acquire any right to that material except a limited right to use the Platform as permitted under these terms. You retain ownership of content you upload. You grant us and our service providers a licence to use, store, and process that content as necessary to operate the Platform and provide services to you (including to the registered tax agent). You warrant that you have the right to provide such content and that it does not breach any law or third-party rights.`
    },
    {
      heading: "6. Privacy",
      content: `Personal information we collect and hold is handled in accordance with our Privacy Policy, which also lists our service providers and explains where information is stored. By using the Platform you agree to the collection and use of your information as described in that policy. Our Privacy Policy is available at /taxflow/privacy-policy.`
    },
    {
      heading: "7. Disclaimers",
      content: `The Platform is provided "as is". We do not warrant that the Platform will be uninterrupted, error-free, or free of harmful components. We are not liable for any reliance you place on the Platform as a substitute for professional advice. Outcomes of your tax or ASIC matters depend on your circumstances and the advice and actions of your tax agent; we do not guarantee any particular result. Nothing in these terms excludes, restricts, or modifies any consumer guarantee or other right you have under the Australian Consumer Law or other law that cannot be excluded by agreement.`
    },
    {
      heading: "8. Limitation of Liability",
      content: `To the maximum extent permitted by law, Frontline Holdings Group Pty Ltd and its directors, employees, and contractors are not liable for any indirect, incidental, special, or consequential loss or damage (including loss of data, revenue, or profit) arising from or in connection with your use of the Platform or these terms. Our total liability for any claim arising out of or relating to the Platform or these terms is limited to the amount you paid to us for use of the Platform in the 12 months before the claim (or, if no such amount, to $100). These limits apply whether the claim is in contract, tort (including negligence), or otherwise. Where liability cannot be excluded by law, our liability is limited to the minimum amount permitted by that law.`
    },
    {
      heading: "9. Changes to Terms and Service",
      content: `We may change these terms from time to time. We will post the updated terms on the Platform and update the effective date. Material changes may be notified by email or a notice when you next log in. Continued use of the Platform after the change takes effect means you accept the new terms. We may also change or discontinue features of the Platform on reasonable notice where practicable.`
    },
    {
      heading: "10. General",
      content: `These terms are governed by the laws of New South Wales and the Commonwealth of Australia. Any dispute is subject to the exclusive jurisdiction of the courts of that state and the Commonwealth. If any part of these terms is invalid or unenforceable, the rest remains in effect. These terms (together with the Privacy Policy and any Engagement Letter or other documents we specify) constitute the agreement between you and Frontline Holdings Group Pty Ltd regarding use of the Platform. For enquiries about these terms or the Platform, contact us using the details in the Contact section below.`
    }
  ]
};

// Configurable constants
export const COMPLIANCE_CONFIG = {
  EMAIL: "taxflowai@frontline.financial",
  PHONE: "0422 959 486",
  PRIVACY_URL: "https://frontline.financial/taxflow/privacy-policy",
  COLLECTION_NOTICE_URL: "https://frontline.financial/taxflow/collection-notice",
  TERMS_URL: "https://frontline.financial/taxflow/terms",
  // platform owner and operator, and registered ASIC agent
  FH_NAME: "Frontline Holdings Group Pty Ltd",
  FH_ABN: "59 671 861 475",
  FH_ACN: "671 861 475",
  FH_ASIC: "51843",
  FH_ADDRESS: "Level 49, 8 Parramatta Square, Parramatta NSW 2150",
  // registered tax agent, trading as TaxFlowAI
  TAX_NAME: "TAX7 T04 PTY LTD",
  TAX_ABN: "73 680 225 512",
  TAX_AGENT_NO: "26313222",
  EFFECTIVE_DATE: "29 September 2026",
};
