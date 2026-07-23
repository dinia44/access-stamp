"use client";

import { useEffect, useState } from "react";
import { formatPrintDate } from "@/lib/help-cards/format";

export function HelpCardPrintFooter({ packSlug }: { packSlug: string }) {
  const [printedOn, setPrintedOn] = useState(() => formatPrintDate());

  useEffect(() => {
    function refresh() {
      setPrintedOn(formatPrintDate());
    }
    window.addEventListener("beforeprint", refresh);
    return () => window.removeEventListener("beforeprint", refresh);
  }, []);

  return (
    <p className="mt-3 hidden text-[var(--color-ink)] print:block">
      Printed from Access Stamp on {printedOn}. URL: /help-cards/{packSlug}
    </p>
  );
}
