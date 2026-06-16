type ResendRequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
};

export function getResendApiKey(): string | undefined {
  return process.env.RESEND_API_KEY?.trim() || undefined;
}

export async function resendRequest<T = unknown>(
  path: string,
  options: ResendRequestOptions = {},
): Promise<{ ok: true; data: T } | { ok: false; status: number; body: string }> {
  const apiKey = getResendApiKey();
  if (!apiKey) {
    return { ok: false, status: 0, body: "RESEND_API_KEY not configured" };
  }

  try {
    const res = await fetch(`https://api.resend.com${path}`, {
      method: options.method ?? "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const body = await res.text();
    if (!res.ok) {
      return { ok: false, status: res.status, body };
    }

    const data = body ? (JSON.parse(body) as T) : ({} as T);
    return { ok: true, data };
  } catch (error) {
    console.error("[resend] request failed", path, error);
    return { ok: false, status: 0, body: "Network error" };
  }
}
