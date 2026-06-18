import { SITE_CONFIG } from "@/lib/site-config";

export type ProcessingActivity = {
  id: string;
  title: string;
  dataCollected: string[];
  purpose: string;
  lawfulBasis: string;
  specialCategory?: string;
  recipients: string[];
  retention: string;
  internationalTransfer: string;
  deletion: string;
  legalReview?: boolean;
};

export const PRIVACY_LAST_UPDATED = "June 2026";

export const PRIVACY_PROCESSING: ProcessingActivity[] = [
  {
    id: "contact",
    title: "Contact form enquiries",
    dataCollected: ["Name", "Email address", "Enquiry type", "Message text", "Consent record"],
    purpose: "Respond to your enquiry and keep a record of the request.",
    lawfulBasis: "Legitimate interests (responding to enquiries) and consent where you agree to be contacted.",
    recipients: ["Access Stamp team", "Email delivery provider (Resend) where configured"],
    retention: "Up to 24 months unless a longer period is needed to resolve the enquiry.",
    internationalTransfer: "Email processors may process data outside the UK — see processor terms.",
    deletion: `Email ${SITE_CONFIG.email} with the address you used and we will delete matching contact records where possible.`,
  },
  {
    id: "newsletter",
    title: "Newsletter subscriptions",
    dataCollected: ["Email address", "Subscription timestamp"],
    purpose: "Send occasional updates about guides, venues, and product changes.",
    lawfulBasis: "Consent.",
    recipients: ["Access Stamp team", "Email delivery provider where configured"],
    retention: "Until you unsubscribe or ask for deletion.",
    internationalTransfer: "May involve processors outside the UK — see processor terms.",
    deletion: "Use unsubscribe links in emails or contact us to delete your subscription.",
  },
  {
    id: "venue-submissions",
    title: "Venue submissions",
    dataCollected: ["Venue name and location", "Access features", "Optional contact email", "Notes and photos you upload"],
    purpose: "Review and potentially publish venue access information.",
    lawfulBasis: "Legitimate interests (building a public access information service) and consent where you provide contact details.",
    recipients: ["Access Stamp review team"],
    retention: "While the listing is active and up to 24 months after rejection or removal.",
    internationalTransfer: "Stored on UK/EU hosting where possible.",
    deletion: "Contact us to request removal of submission data or published listings.",
  },
  {
    id: "venue-photos",
    title: "Uploaded venue photographs",
    dataCollected: ["Image files you upload", "AI-generated feature suggestions derived from images"],
    purpose: "Help draft venue access feature lists for human review.",
    lawfulBasis: "Legitimate interests (processing submissions) and consent when you upload.",
    recipients: ["Access Stamp", "OpenAI API when scan feature is used"],
    retention: "Images used for scan are processed transiently; do not upload identifiable people or plates.",
    internationalTransfer: "OpenAI may process outside the UK — see OpenAI API terms.",
    deletion: "Do not upload personal images; contact us if you submitted images in error.",
  },
  {
    id: "ai-tools",
    title: "AI tool inputs",
    dataCollected: ["Free text you enter into toolkit forms", "Tool selections and generated drafts"],
    purpose: "Generate practical drafts, checklists, and explanations.",
    lawfulBasis: "Legitimate interests (providing the tool) — avoid unnecessary personal data.",
    recipients: ["Access Stamp", "OpenAI API when AI generation is used"],
    retention: "Session processing; we do not intentionally store full tool inputs long term unless you submit a form.",
    internationalTransfer: "OpenAI API processing may occur outside the UK.",
    deletion: "Avoid entering unnecessary identifying information; contact us if you submitted sensitive data by mistake.",
  },
  {
    id: "chat",
    title: "AI assistant chat",
    dataCollected: ["Messages you send", "Page context metadata"],
    purpose: "Generate replies to your questions about access and guides.",
    lawfulBasis: "Legitimate interests (providing the assistant).",
    recipients: ["OpenAI API"],
    retention: "Not stored after the session ends unless logged for abuse prevention.",
    internationalTransfer: "OpenAI API processing may occur outside the UK.",
    deletion: "Avoid entering unnecessary personal data in chat.",
  },
  {
    id: "accessibility-prefs",
    title: "Local accessibility preferences",
    dataCollected: ["Text size, contrast, motion, and font preferences"],
    purpose: "Remember your display preferences in your browser.",
    lawfulBasis: "Legitimate interests (accessibility) / consent implied by use.",
    recipients: ["Stored locally in your browser only"],
    retention: "Until you clear browser storage.",
    internationalTransfer: "Does not leave your device.",
    deletion: "Clear site data in your browser settings.",
  },
  {
    id: "analytics",
    title: "Usage analytics and security logs",
    dataCollected: ["Aggregated request logs", "IP addresses in server logs where enabled"],
    purpose: "Security, abuse prevention, and performance monitoring.",
    lawfulBasis: "Legitimate interests (security and service operation).",
    recipients: ["Hosting provider (e.g. Vercel)"],
    retention: "Typically 30–90 days for logs unless needed for security investigation.",
    internationalTransfer: "Hosting providers may process globally — see host privacy notices.",
    deletion: "Contact us if you have concerns about logged data.",
    legalReview: true,
  },
];

export const SENSITIVE_DATA_NOTICE =
  "Avoid entering names, addresses, National Insurance numbers, medical record numbers, dates of birth, employer case numbers, or other identifying information unless it is genuinely necessary. Access Stamp tools support preparation and do not replace qualified legal, medical, benefits, employment, or safeguarding advice.";

export const PHOTO_UPLOAD_NOTICE =
  "Do not upload photographs containing identifiable people, children, private documents, personal belongings, vehicle registration numbers, or other personal information. Remove location metadata where possible. AI suggestions are not measurements or verification and must be reviewed before publication.";
