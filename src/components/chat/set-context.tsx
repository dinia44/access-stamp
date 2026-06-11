"use client";

import { useEffect, useRef } from "react";
import type { PageContext } from "@/components/chat/provider";
import { useChat } from "@/components/chat/provider";

function pageContextKey(page: PageContext): string {
  switch (page.kind) {
    case "venue":
      return `venue:${page.slug}`;
    case "advice-article":
      return `advice-article:${page.slug}`;
    default:
      return page.kind;
  }
}

export function SetChatContext({ page }: { page: PageContext }) {
  const { setPage } = useChat();
  const pageRef = useRef(page);
  pageRef.current = page;
  const pageKey = pageContextKey(page);

  useEffect(() => {
    setPage((current) => (pageContextKey(current) === pageKey ? current : pageRef.current));
  }, [pageKey, setPage]);

  return null;
}
