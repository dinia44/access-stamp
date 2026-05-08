import type { HelpCard } from "@/lib/help-cards";

function slugifyFile(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (ctx.measureText(candidate).width <= maxWidth) {
      line = candidate;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawBullets(
  ctx: CanvasRenderingContext2D,
  items: string[],
  x: number,
  y: number,
  width: number,
  lineHeight: number,
) {
  let cursor = y;
  for (const item of items) {
    const lines = wrapText(ctx, `• ${item}`, width);
    for (const line of lines) {
      ctx.fillText(line, x, cursor);
      cursor += lineHeight;
    }
    cursor += 4;
  }
  return cursor;
}

/** Renders a pocket-sized PNG (high-res for print) matching Help Cards hub output. */
export function downloadHelpCardAsPng(card: HelpCard) {
  const canvas = document.createElement("canvas");
  const width = 1400;
  const height = 1900;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = "#f3f8ff";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(60, 60, width - 120, height - 120);
  ctx.strokeStyle = "#dbe3ef";
  ctx.lineWidth = 3;
  ctx.strokeRect(60, 60, width - 120, height - 120);

  let y = 130;
  ctx.fillStyle = "#2478d0";
  ctx.font = "700 30px Arial, sans-serif";
  ctx.fillText(`${card.category} guide`, 100, y);

  y += 65;
  ctx.fillStyle = "#0c1d34";
  ctx.font = "700 48px Arial, sans-serif";
  for (const line of wrapText(ctx, card.title, width - 200)) {
    ctx.fillText(line, 100, y);
    y += 58;
  }

  y += 8;
  ctx.fillStyle = "#2c3e54";
  ctx.font = "400 30px Arial, sans-serif";
  for (const line of wrapText(ctx, card.summary, width - 200)) {
    ctx.fillText(line, 100, y);
    y += 40;
  }

  y += 20;
  ctx.fillStyle = "#0c1d34";
  ctx.font = "700 34px Arial, sans-serif";
  ctx.fillText("Must ask", 100, y);
  y += 46;
  ctx.fillStyle = "#2c3e54";
  ctx.font = "400 27px Arial, sans-serif";
  y = drawBullets(ctx, card.mustAsk, 100, y, width - 200, 36);

  y += 12;
  ctx.fillStyle = "#0c1d34";
  ctx.font = "700 34px Arial, sans-serif";
  ctx.fillText("Checklist", 100, y);
  y += 46;
  ctx.fillStyle = "#2c3e54";
  ctx.font = "400 27px Arial, sans-serif";
  y = drawBullets(ctx, card.checklist, 100, y, width - 200, 36);

  y += 12;
  ctx.fillStyle = "#0c1d34";
  ctx.font = "700 34px Arial, sans-serif";
  ctx.fillText("Key line", 100, y);
  y += 46;
  ctx.fillStyle = "#1f4d84";
  ctx.font = "700 28px Arial, sans-serif";
  for (const line of wrapText(ctx, card.keyLine, width - 200)) {
    ctx.fillText(line, 100, y);
    y += 38;
  }

  ctx.fillStyle = "#5a6e82";
  ctx.font = "400 22px Arial, sans-serif";
  ctx.fillText("access-stamp.vercel.app/help-cards", 100, height - 110);

  const href = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = href;
  a.download = `${slugifyFile(card.title)}.png`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
