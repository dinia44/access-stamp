"use client";

import { useState } from "react";
import Link from "next/link";
import { SENSITIVE_DATA_NOTICE } from "@/lib/privacy-content";

type Props = {
  requireAcknowledgement?: boolean;
  onAcknowledgedChange?: (acknowledged: boolean) => void;
};

export function SensitiveDataNotice({ requireAcknowledgement = false, onAcknowledgedChange }: Props) {
  const [acknowledged, setAcknowledged] = useState(false);

  function setAck(value: boolean) {
    setAcknowledged(value);
    onAcknowledgedChange?.(value);
  }

  return (
    <aside className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
      <h2 className="font-semibold">Protect your personal information</h2>
      <p className="mt-2">{SENSITIVE_DATA_NOTICE}</p>
      <p className="mt-2 text-xs text-amber-900">
        See our{" "}
        <Link href="/legal/privacy" className="font-semibold underline underline-offset-2">
          privacy policy
        </Link>{" "}
        for how tool inputs are processed.
      </p>
      {requireAcknowledgement ? (
        <label className="mt-3 flex min-h-11 cursor-pointer items-start gap-3 text-sm">
          <input
            type="checkbox"
            checked={acknowledged}
            onChange={(event) => setAck(event.target.checked)}
            className="mt-1 h-4 w-4 accent-amber-700"
          />
          <span>I understand and will avoid unnecessary personal or sensitive information.</span>
        </label>
      ) : null}
    </aside>
  );
}

export function useSensitiveDataGate(requireAcknowledgement: boolean) {
  const [acknowledged, setAcknowledged] = useState(!requireAcknowledgement);
  return { acknowledged, setAcknowledged, blocked: requireAcknowledgement && !acknowledged };
}
