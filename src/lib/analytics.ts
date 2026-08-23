/**
 * Privacy-preserving soft-launch analytics helpers.
 * No-op in production until a real stack is configured; console in development only.
 * NEVER pass raw queries, emails, messages, health text, or precise location.
 */

export type AnalyticsEventName =
  | "search_submitted"
  | "search_zero_results"
  | "venue_opened"
  | "filter_selected"
  | "a11y_panel_opened"
  | "a11y_panel_closed"
  | "contact_success"
  | "contact_failure_category"
  | "newsletter_success"
  | "newsletter_failure_category"
  | "ai_tool_started"
  | "ai_tool_completed"
  | "ai_tool_failed"
  | "feedback_opened"
  | "feedback_submitted";

/** Safe property bag — only coarse categories / counts / booleans. */
export type AnalyticsProps = {
  category?: string;
  result_count?: number;
  filter_key?: string;
  tool?: string;
  source?: string;
  has_query?: boolean;
  has_filters?: boolean;
};

const DEV = process.env.NODE_ENV === "development";

function sanitize(props?: AnalyticsProps): AnalyticsProps | undefined {
  if (!props) return undefined;
  const out: AnalyticsProps = {};
  if (typeof props.category === "string" && props.category.length <= 64) {
    out.category = props.category;
  }
  if (typeof props.result_count === "number" && Number.isFinite(props.result_count)) {
    out.result_count = Math.max(0, Math.floor(props.result_count));
  }
  if (typeof props.filter_key === "string" && /^[a-z0-9_-]{1,48}$/i.test(props.filter_key)) {
    out.filter_key = props.filter_key;
  }
  if (typeof props.tool === "string" && /^[a-z0-9_-]{1,48}$/i.test(props.tool)) {
    out.tool = props.tool;
  }
  if (typeof props.source === "string" && /^[a-z0-9_-]{1,48}$/i.test(props.source)) {
    out.source = props.source;
  }
  if (typeof props.has_query === "boolean") out.has_query = props.has_query;
  if (typeof props.has_filters === "boolean") out.has_filters = props.has_filters;
  return out;
}

/** Track a named product event without PII. */
export function track(event: AnalyticsEventName, props?: AnalyticsProps): void {
  const safe = sanitize(props);
  if (typeof window === "undefined") return;

  // Optional future hook (e.g. Vercel Analytics / custom endpoint) — keep payload sanitized.
  const w = window as Window & { __accessStampAnalytics?: (e: string, p?: AnalyticsProps) => void };
  if (typeof w.__accessStampAnalytics === "function") {
    try {
      w.__accessStampAnalytics(event, safe);
      return;
    } catch {
      /* ignore provider errors */
    }
  }

  if (DEV) {
    console.info("[analytics]", event, safe ?? {});
  }
}

export function trackContactFailure(category: string): void {
  track("contact_failure_category", { category });
}

export function trackNewsletterFailure(category: string): void {
  track("newsletter_failure_category", { category });
}
