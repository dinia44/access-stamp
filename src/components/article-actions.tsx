"use client";

import { useState } from "react";
import { Button } from "@/components/ui";

type Props = {
  title: string;
};

export function ArticleActions({ title }: Props) {
  const [copied, setCopied] = useState(false);

  async function onShare() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        /* user cancelled or share failed */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <>
      <Button variant="ghost" onClick={onShare}>
        {copied ? "Link copied" : "Share"}
      </Button>
      <Button variant="ghost" onClick={() => window.print()}>
        Print / Download
      </Button>
    </>
  );
}
