"use client";

import { useState } from "react";
import type { HelpCard } from "@/lib/help-cards";
import { downloadHelpCardAsPng, printHelpCard } from "@/lib/help-card-png";
import { Button } from "@/components/ui/Button";

export function HelpCardQuickActions({ card }: { card: HelpCard }) {
  const [saving, setSaving] = useState(false);

  async function saveCard() {
    setSaving(true);
    try {
      await downloadHelpCardAsPng(card);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        isLoading={saving}
        onClick={() => void saveCard()}
        aria-label={`Save ${card.title} to phone`}
      >
        Save
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => void printHelpCard(card)}
        aria-label={`Print ${card.title}`}
      >
        Print
      </Button>
    </>
  );
}
