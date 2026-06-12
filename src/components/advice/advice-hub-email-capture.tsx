"use client";

import { useState, type FormEvent } from "react";

export function AdviceHubEmailCapture() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!consent) {
      setStatus("error");
      setMessage("Please confirm you are happy for us to email you the checklist.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/pip-checklist-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent: true }),
      });
      const data = (await response.json()) as { message?: string; error?: string };
      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("ok");
      setMessage(data.message ?? "Thanks — we will send the checklist when delivery is live.");
      setEmail("");
      setConsent(false);
    } catch {
      setStatus("error");
      setMessage("Could not reach the server. Please try again later.");
    }
  }

  return (
    <section className="bg-[#FDFBF8] px-4 pb-16 pt-4 sm:px-6 sm:pb-20" aria-labelledby="advice-email-capture-heading">
      <div className="mx-auto max-w-3xl rounded-[20px] border border-[#EFE5DA] bg-white p-6 shadow-[0_12px_32px_-20px_rgba(122,80,48,0.16)] sm:p-8">
        <h2
          id="advice-email-capture-heading"
          className="font-[family-name:var(--font-heading)] text-2xl font-medium tracking-[-0.02em] text-[#20242E]"
        >
          Get the PIP renewal checklist as a printable PDF
        </h2>
        <p className="mt-3 text-sm leading-7 text-[#4A5263]">
          A one-page reminder of what to gather, how to describe daily impact, and what to send with your form.
        </p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
          {status === "error" && message ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
              {message}
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="pip-checklist-email" className="sr-only">
              Email address
            </label>
            <input
              id="pip-checklist-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={status === "loading" || status === "ok"}
              className="h-11 flex-1 rounded-full border border-[#EFE5DA] bg-[#FDFBF8] px-4 text-sm text-[#20242E] focus:border-[#F6CFB8] focus:outline-none focus:ring-2 focus:ring-[#FDE9DD] disabled:opacity-70"
              placeholder="Your email address"
              aria-invalid={status === "error"}
            />
            <button
              type="submit"
              disabled={status === "loading" || status === "ok"}
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-[#EF5B25] px-6 text-sm font-semibold text-white transition hover:bg-[#D94E1C] disabled:opacity-70"
            >
              {status === "loading" ? "Sending…" : status === "ok" ? "Requested" : "Send me the PDF"}
            </button>
          </div>

          <label className="flex items-start gap-3 text-xs leading-5 text-[#76808F]">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              disabled={status === "loading" || status === "ok"}
              className="mt-0.5 h-4 w-4 rounded border-[#EFE5DA]"
            />
            <span>
              I am happy for Access Stamp to email me the checklist and occasional practical advice updates. Unsubscribe
              any time.
            </span>
          </label>

          {status === "ok" && message ? (
            <p className="text-sm text-[#5F7444]" role="status">
              {message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
