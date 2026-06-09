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

  printWindow.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${card.title}</title>
  <style>
    body { margin: 0; display: flex; min-height: 100vh; align-items: center; justify-content: center; background: #fff; }
    img { width: 100%; max-width: 960px; height: auto; }
  </style>
</head>
<body>
  <img src="${dataUrl}" alt="${card.title.replace(/"/g, "&quot;")}" />
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
