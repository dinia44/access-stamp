"use client";

import Link from "next/link";
import { useState } from "react";
import { AboutSection } from "@/components/about/about-section";
import { ABOUT_BODY, ABOUT_PANEL } from "@/components/about/about-theme";
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

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
    <AboutSection aria-labelledby="about-newsletter-heading">
      <div className={`mx-auto max-w-3xl p-6 sm:p-10 ${ABOUT_PANEL}`}>
        <h2
          id="about-newsletter-heading"
          className="text-[1.875rem] font-bold leading-[1.12] tracking-[-0.025em] text-[#13201F] sm:text-4xl"
        >
          Get practical access updates before you need them.
        </h2>
        <p className={`mt-4 ${ABOUT_BODY}`}>
          Join the Access Stamp newsletter for new venue checks, practical disability guides, access planning tips, and
          updates on tools that help people make better decisions.
        </p>

        {errorAlert ? (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
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

        <form className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end" onSubmit={onSubscribe} noValidate>
          <div className="flex-1">
            <label htmlFor="about-newsletter-email" className="block text-sm font-medium text-[#13201F]">
              Email address
            </label>
            <input
              id="about-newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (status.kind !== "idle" && status.kind !== "loading") setStatus({ kind: "idle" });
              }}
              disabled={isBusy}
              className="mt-2 h-12 w-full rounded-2xl border border-[#E8C4A8] bg-[#FFF8F1] px-4 text-base text-[#13201F] placeholder:text-[#5E6A66]/80 focus:border-[#F04A16] focus:outline-none focus:ring-4 focus:ring-[#F04A16]/15 disabled:opacity-70"
              placeholder="you@example.com"
              required
              aria-invalid={invalid ? true : undefined}
              aria-describedby={
                invalid ? "about-newsletter-error about-newsletter-helper" : "about-newsletter-helper"
              }
            />
            {invalid ? (
              <p id="about-newsletter-error" className="sr-only">
                {status.message}
              </p>
            ) : null}
          </div>
          <button
            type="submit"
            disabled={isBusy}
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-primary)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-primary)]/25 focus-visible:ring-offset-2 disabled:opacity-70"
          >
            {status.kind === "loading"
              ? "Joining…"
              : status.kind === "success" || status.kind === "already_subscribed"
                ? "Joined"
                : "Join the newsletter"}
          </button>
        </form>

        <p id="about-newsletter-helper" className="mt-4 text-sm leading-6 text-[#5E6A66]">
          No spam. Just practical access information, guides, and platform updates. See our{" "}
          <Link href="/legal/privacy" className="font-semibold text-[var(--color-primary)] underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>

        {statusMessage ? (
          <p className="mt-3 text-sm font-medium text-[#2F7D32]" role="status">
            {statusMessage}
          </p>
        ) : null}
      </div>
    </AboutSection>
  );
}
