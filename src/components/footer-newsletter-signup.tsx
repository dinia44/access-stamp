"use client";

import Link from "next/link";
import { useState } from "react";
import { track, trackNewsletterFailure } from "@/lib/analytics";

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; message: string }
  | { kind: "invalid_email"; message: string }
  | { kind: "already_subscribed"; message: string }
  | { kind: "provider_error"; message: string }
  | { kind: "retry"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function FooterNewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubscribe(event?: React.FormEvent) {
    event?.preventDefault();
    const trimmed = email.trim();

    if (!trimmed || !EMAIL_RE.test(trimmed)) {
      setStatus({
        kind: "invalid_email",
        message: "Please enter a valid email address.",
      });
      trackNewsletterFailure("invalid_email");
      return;
    }

    setStatus({ kind: "loading" });

    try {
      const response = await fetch("/api/newsletter-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = (await response.json()) as {
        message?: string;
        error?: string;
        errorCategory?: string;
        alreadySubscribed?: boolean;
      };

      if (!response.ok) {
        if (data.errorCategory === "invalid_email" || response.status === 400) {
          setStatus({
            kind: "invalid_email",
            message: data.error ?? "Please enter a valid email address.",
          });
          trackNewsletterFailure("invalid_email");
          return;
        }
        setStatus({
          kind: "provider_error",
          message: data.error ?? "Something went wrong. Please try again.",
        });
        trackNewsletterFailure(data.errorCategory ?? "provider_error");
        return;
      }

      if (data.alreadySubscribed) {
        setStatus({
          kind: "already_subscribed",
          message: data.message ?? "You're already subscribed — thank you.",
        });
        track("newsletter_success", { category: "already_subscribed" });
        setEmail("");
        return;
      }

      setStatus({
        kind: "success",
        message: data.message ?? "Thanks — you're subscribed.",
      });
      track("newsletter_success");
      setEmail("");
    } catch {
      setStatus({
        kind: "retry",
        message: "Could not reach the server. Please try again later.",
      });
      trackNewsletterFailure("network");
    }
  }

  const isBusy = status.kind === "loading" || status.kind === "success" || status.kind === "already_subscribed";
  const invalid = status.kind === "invalid_email";
  const errorAlert =
    status.kind === "invalid_email" ||
    status.kind === "provider_error" ||
    status.kind === "retry"
      ? status.message
      : null;
  const statusMessage =
    status.kind === "success" || status.kind === "already_subscribed" ? status.message : null;

  return (
    <div
      className="mb-12 rounded-[20px] border border-[#EFE5DA] bg-white p-6 text-[#20242E] shadow-[0_12px_32px_-20px_rgba(122,80,48,0.16)] sm:p-8"
      aria-labelledby="footer-newsletter-heading"
    >
      <h2
        id="footer-newsletter-heading"
        className="font-[family-name:var(--font-heading)] text-2xl font-medium tracking-[-0.02em] text-[#20242E]"
      >
        Stay in the loop
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#4A5263]">
        Benefits and accessibility rules change often. Get an occasional email when we add venues, publish guides, or
        update what&apos;s changed — no spam, unsubscribe anytime.
      </p>

      {errorAlert ? (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {errorAlert}
          {status.kind === "provider_error" || status.kind === "retry" ? (
            <button
              type="button"
              className="mt-2 block font-semibold underline underline-offset-2"
              onClick={() => setStatus({ kind: "idle" })}
            >
              Dismiss and retry
            </button>
          ) : null}
        </div>
      ) : null}

      <form className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end" onSubmit={(e) => void onSubscribe(e)} noValidate>
        <div className="flex-1">
          <label htmlFor="footer-newsletter-email" className="block text-sm font-medium text-[#20242E]">
            Email address
          </label>
          <input
            id="footer-newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status.kind !== "idle" && status.kind !== "loading") setStatus({ kind: "idle" });
            }}
            disabled={isBusy}
            className="mt-2 h-11 w-full rounded-full border border-[#EFE5DA] bg-[#FDFBF8] px-4 text-sm text-[#20242E] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 disabled:opacity-70"
            placeholder="you@example.com"
            required
            aria-invalid={invalid ? true : undefined}
            aria-describedby={
              invalid ? "footer-newsletter-error footer-newsletter-helper" : "footer-newsletter-helper"
            }
          />
          {invalid ? (
            <p id="footer-newsletter-error" className="sr-only">
              {status.message}
            </p>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={isBusy}
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)] disabled:opacity-70"
        >
          {status.kind === "loading"
            ? "Subscribing…"
            : status.kind === "success" || status.kind === "already_subscribed"
              ? "Subscribed"
              : "Subscribe"}
        </button>
      </form>

      <p id="footer-newsletter-helper" className="mt-4 text-xs leading-5 text-[#596474]">
        We only use this to send the newsletter. See our{" "}
        <Link href="/legal/privacy" className="underline underline-offset-2 hover:text-[#4A5263]">
          Privacy Policy
        </Link>
        .
      </p>

      {statusMessage ? (
        <p className="mt-3 text-sm text-[#5F7444]" role="status">
          {statusMessage}
        </p>
      ) : null}
    </div>
  );
}
