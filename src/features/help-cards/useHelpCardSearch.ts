"use client";

import { useMemo, useState } from "react";
import type { HelpCard } from "@/lib/help-cards";

export const HELP_CARD_CATEGORIES = [
  "All",
  "Police & driving",
  "Rights & complaints",
  "Work & interviews",
  "Healthcare appointments",
  "Social care",
  "Benefits & assessments",
  "Venues & travel",
  "Communication cards",
] as const;

export type HelpCardCategoryFilter = (typeof HELP_CARD_CATEGORIES)[number];

function cardHaystack(card: HelpCard) {
  return [
    card.title,
    card.summary,
    card.situation ?? "",
    card.useThisWhen ?? "",
    card.category,
    card.tags.join(" "),
    card.checklist.join(" "),
    card.mustAsk.join(" "),
    card.keyLine,
  ]
    .join(" ")
    .toLowerCase();
}

export function useHelpCardSearch(cards: HelpCard[]) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<HelpCardCategoryFilter>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cards.filter((card) => {
      if (category !== "All" && card.category !== category) return false;
      if (!q) return true;
      return cardHaystack(card).includes(q);
    });
  }, [cards, query, category]);

  const highPressure = useMemo(
    () => cards.filter((card) => card.urgency === "high"),
    [cards],
  );

  const hasActiveFilters = Boolean(query.trim() || category !== "All");

  function clearFilters() {
    setQuery("");
    setCategory("All");
  }

  return {
    query,
    setQuery,
    category,
    setCategory,
    filtered,
    highPressure,
    hasActiveFilters,
    clearFilters,
  };
}
