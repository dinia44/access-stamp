import { formatReviewDate } from "@/lib/help-cards/format";
import { authorityLabel } from "@/lib/help-cards/authority";
import type { HelpCardDownloadDocument } from "@/data/help-cards/download-types";

function pushSection(lines: string[], heading: string, body: string | string[] | undefined) {
  if (!body) return;
  if (Array.isArray(body)) {
    if (body.length === 0) return;
    lines.push(heading);
    for (const item of body) lines.push(`- ${item}`);
    lines.push("");
    return;
  }
  if (!body.trim()) return;
  lines.push(heading);
  lines.push(body.trim());
  lines.push("");
}

export function buildHelpCardDownloadPlainText(document: HelpCardDownloadDocument): string {
  const lines: string[] = [];
  lines.push("ACCESS STAMP HELP CARD");
  lines.push(document.title);
  lines.push("");

  pushSection(lines, "USE THIS WHEN", document.purpose);
  pushSection(lines, "KEY MESSAGE", document.keyMessage);
  pushSection(lines, "WHAT TO DO", document.actions);
  pushSection(lines, "WHAT TO ASK", document.questionsToAsk);

  if (document.suggestedWording) {
    lines.push(document.suggestedWording.label.toUpperCase());
    lines.push(document.suggestedWording.text);
    lines.push("");
  }

  pushSection(lines, "WHAT THIS DOES NOT COVER", document.conditions);
  pushSection(lines, "BEFORE YOU GO", document.beforeYouGo);
  pushSection(lines, "WHERE THIS APPLIES", document.appliesTo);

  if (document.sources.length > 0) {
    lines.push("OFFICIAL SOURCES");
    for (const source of document.sources) {
      lines.push(`- ${source.title} — ${source.publisher} (${authorityLabel(source.authorityType)})`);
      lines.push(`  ${source.url}`);
    }
    lines.push("");
  }

  pushSection(lines, "LAST REVIEWED", formatReviewDate(document.reviewedAt));
  pushSection(lines, "LIVE CARD", document.liveUrl);

  lines.push(document.disclaimer);
  lines.push(document.footerNote);
  lines.push("");

  return lines.join("\n");
}
