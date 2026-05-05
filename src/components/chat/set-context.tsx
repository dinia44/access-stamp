"use client";

import { useEffect } from "react";
import type { PageContext } from "@/components/chat/provider";
import { useChat } from "@/components/chat/provider";

export function SetChatContext({ page }: { page: PageContext }) {
  const { setPage } = useChat();
  useEffect(() => {
    setPage(page);
  }, [page, setPage]);
  return null;
}

