import type { HelpCard } from "@/lib/help-cards";
import { toPng } from "html-to-image";
import { helpCardPreviewId } from "@/components/help-cards/help-card-preview";

function slugifyFile(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function downloadHelpCardAsPng(card: HelpCard) {
  const element = document.getElementById(helpCardPreviewId(card.slug));
  if (!element) return;

  const dataUrl = await toPng(element, {
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: "#ffffff",
  });

  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = `access-stamp-${slugifyFile(card.title)}.png`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sourcesFooter(card: HelpCard) {
  if (!card.sources?.length) {
    return "<p>Practical prompts, not legal advice.</p>";
  }

  const items = card.sources
    .map(
      (source) =>
        `<li><strong>${escapeHtml(source.title)}</strong> — ${escapeHtml(source.publisher)} (${escapeHtml(source.lastChecked)})</li>`,
    )
    .join("");

  const reviewed = card.lastReviewed
    ? `<p><strong>Last reviewed:</strong> ${escapeHtml(card.lastReviewed)}</p>`
    : "";

  return `${reviewed}<h2>Sources checked</h2><ul>${items}</ul>`;
}

export async function printHelpCard(card: HelpCard) {
  const element = document.getElementById(helpCardPreviewId(card.slug));
  if (!element) return;

  const dataUrl = await toPng(element, {
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: "#ffffff",
  });

  const printWindow = window.open("", "_blank", "noopener,noreferrer,width=900,height=600");
  if (!printWindow) return;

  const footer = sourcesFooter(card);

  printWindow.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(card.title)}</title>
  <style>
    body { margin: 0; padding: 24px; background: #fff; color: #000; font-family: system-ui, sans-serif; }
    img { width: 100%; max-width: 960px; height: auto; display: block; margin: 0 auto 24px; }
    footer { max-width: 960px; margin: 0 auto; font-size: 12px; line-height: 1.6; border-top: 1px solid #ccc; padding-top: 16px; }
    footer h2 { font-size: 14px; margin: 0 0 8px; }
    footer ul { margin: 0; padding-left: 18px; }
  </style>
</head>
<body>
  <img src="${dataUrl}" alt="${escapeHtml(card.title)}" />
  <footer>${footer}</footer>
  <script>
    window.onload = function () {
      window.print();
      window.onafterprint = function () { window.close(); };
    };
  </script>
</body>
</html>`);
  printWindow.document.close();
}
