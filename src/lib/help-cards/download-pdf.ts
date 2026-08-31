import { jsPDF } from "jspdf";
import type { HelpCardDownloadDocument } from "@/data/help-cards/download-types";
import { HELP_CARD_DOCUMENT_THEME as T } from "@/lib/help-cards/download-theme";
import { formatReviewDate } from "@/lib/help-cards/format";
import { createQrMatrix } from "@/lib/help-cards/qr-matrix";

export type HelpCardPdfResult = {
  arrayBuffer: ArrayBuffer;
  pageCount: number;
};

type PdfCursor = {
  doc: jsPDF;
  y: number;
  left: number;
  width: number;
  top: number;
  bottom: number;
};

function ptToMm(pt: number): number {
  return (pt * 25.4) / 72;
}

function lineMm(fontPt: number = T.bodyPt): number {
  return ptToMm(fontPt * T.lineHeight);
}

function paintPage(doc: jsPDF) {
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();
  doc.setFillColor(...T.paperRgb);
  doc.rect(0, 0, w, h, "F");

  doc.setDrawColor(...T.rustRgb);
  doc.setLineWidth(0.35);
  const tick = 5;
  const inset = 5.5;
  // Corner ticks — stamp/document character without heavy ink.
  doc.line(inset, inset, inset + tick, inset);
  doc.line(inset, inset, inset, inset + tick);
  doc.line(w - inset, inset, w - inset - tick, inset);
  doc.line(w - inset, inset, w - inset, inset + tick);
  doc.line(inset, h - inset, inset + tick, h - inset);
  doc.line(inset, h - inset, inset, h - inset - tick);
  doc.line(w - inset, h - inset, w - inset - tick, h - inset);
  doc.line(w - inset, h - inset, w - inset, h - inset - tick);
}

function addPage(cursor: PdfCursor) {
  cursor.doc.addPage();
  paintPage(cursor.doc);
  cursor.y = cursor.top;
}

function ensureSpace(cursor: PdfCursor, height: number) {
  if (cursor.y + height > cursor.bottom) addPage(cursor);
}

function wrap(doc: jsPDF, text: string, width: number): string[] {
  return doc.splitTextToSize(text, width);
}

function setBody(doc: jsPDF, style: "normal" | "bold" = "normal") {
  doc.setFont("helvetica", style);
  doc.setFontSize(T.bodyPt);
  doc.setTextColor(...T.inkRgb);
}

function drawParagraph(cursor: PdfCursor, text: string, opts?: { bold?: boolean; color?: readonly [number, number, number]; width?: number }) {
  const doc = cursor.doc;
  const width = opts?.width ?? cursor.width;
  setBody(doc, opts?.bold ? "bold" : "normal");
  if (opts?.color) doc.setTextColor(...opts.color);
  const lines = wrap(doc, text, width);
  const height = lines.length * lineMm();
  ensureSpace(cursor, height);
  doc.text(lines, cursor.left, cursor.y);
  cursor.y += height + 0.8;
}

function drawSectionHeading(cursor: PdfCursor, label: string) {
  const doc = cursor.doc;
  const headingH = 6.4;
  ensureSpace(cursor, headingH + lineMm());
  cursor.y += 0.8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...T.rustRgb);
  doc.text(label.toUpperCase(), cursor.left, cursor.y);
  cursor.y += 1.3;
  doc.setDrawColor(...T.ruleRgb);
  doc.setLineWidth(0.22);
  doc.line(cursor.left, cursor.y, cursor.left + cursor.width, cursor.y);
  cursor.y += 3.1;
}

function drawChecklist(cursor: PdfCursor, items: string[]) {
  const doc = cursor.doc;
  const box = 2.8;
  const gap = 2.8;
  const textWidth = cursor.width - box - gap;

  for (const item of items) {
    setBody(doc);
    const lines = wrap(doc, item, textWidth);
    const height = Math.max(box, lines.length * lineMm());
    ensureSpace(cursor, height + 1.2);
    doc.setDrawColor(...T.inkRgb);
    doc.setLineWidth(0.25);
    doc.rect(cursor.left, cursor.y - 2.2, box, box);
    doc.text(lines, cursor.left + box + gap, cursor.y);
    cursor.y += height + 0.85;
  }
  cursor.y += 0.6;
}

function drawKeyMessage(cursor: PdfCursor, text: string) {
  const doc = cursor.doc;
  const padX = 3.4;
  const padY = 2.6;
  const innerWidth = cursor.width - padX * 2 - 1.2;
  setBody(doc, "bold");
  const lines = wrap(doc, text, innerWidth);
  const height = padY * 2 + lines.length * lineMm();
  ensureSpace(cursor, height + 1);
  doc.setFillColor(...T.wordingBgRgb);
  doc.setDrawColor(...T.ruleRgb);
  doc.setLineWidth(0.2);
  doc.roundedRect(cursor.left, cursor.y, cursor.width, height, 1, 1, "FD");
  doc.setFillColor(...T.rustRgb);
  doc.rect(cursor.left, cursor.y, 1.2, height, "F");
  doc.setTextColor(...T.inkRgb);
  doc.text(lines, cursor.left + padX + 1.2, cursor.y + padY + 2.8);
  cursor.y += height + 2.2;
}

function drawWording(cursor: PdfCursor, label: string, text: string) {
  const doc = cursor.doc;
  const padX = 3.6;
  const padY = 3;
  const innerWidth = cursor.width - padX * 2;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  const labelLines = wrap(doc, label.toUpperCase(), innerWidth);
  setBody(doc);
  const bodyLines = wrap(doc, text, innerWidth);
  const height = padY * 2 + labelLines.length * lineMm(8) + 1.2 + bodyLines.length * lineMm();
  ensureSpace(cursor, height + 1);
  doc.setFillColor(...T.wordingBgRgb);
  doc.setDrawColor(...T.rustRgb);
  doc.setLineWidth(0.3);
  doc.roundedRect(cursor.left, cursor.y, cursor.width, height, 1.2, 1.2, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...T.rustRgb);
  doc.text(labelLines, cursor.left + padX, cursor.y + padY + 2.2);
  setBody(doc);
  doc.text(bodyLines, cursor.left + padX, cursor.y + padY + 2.2 + labelLines.length * lineMm(8) + 1.6);
  cursor.y += height + 2.2;
}

function drawHeader(cursor: PdfCursor, document: HelpCardDownloadDocument) {
  const doc = cursor.doc;
  doc.setFont("times", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...T.inkRgb);
  doc.text("Access Stamp", cursor.left, cursor.y);

  const badge = "HELP CARD";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  const badgeW = doc.getTextWidth(badge) + 4.6;
  const badgeH = 5;
  const badgeX = cursor.left + cursor.width - badgeW;
  const badgeY = cursor.y - 3.6;
  doc.setFillColor(...T.rustRgb);
  doc.roundedRect(badgeX, badgeY, badgeW, badgeH, 0.7, 0.7, "F");
  doc.setTextColor(255, 251, 246);
  doc.text(badge, badgeX + 2.3, cursor.y);

  cursor.y += 4.2;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...T.mutedRgb);
  doc.text(document.category.toUpperCase(), cursor.left, cursor.y);
  cursor.y += 2.2;
  doc.setDrawColor(...T.ruleRgb);
  doc.setLineWidth(0.3);
  doc.line(cursor.left, cursor.y, cursor.left + cursor.width, cursor.y);
  cursor.y += 5.4;

  doc.setFont("times", "bold");
  doc.setFontSize(15.5);
  doc.setTextColor(...T.inkRgb);
  const titleLines = wrap(doc, document.title, cursor.width);
  const titleLeading = ptToMm(15.5 * 1.18);
  doc.text(titleLines, cursor.left, cursor.y);
  cursor.y += titleLines.length * titleLeading + 2.2;
}

function drawMeta(cursor: PdfCursor, document: HelpCardDownloadDocument) {
  drawSectionHeading(cursor, "Scope and sources");
  const doc = cursor.doc;
  setBody(doc);
  const facts = `Applies to ${document.appliesTo}. Last reviewed ${formatReviewDate(document.reviewedAt)}.`;
  const factLines = wrap(doc, facts, cursor.width);
  ensureSpace(cursor, factLines.length * lineMm() + 1);
  doc.text(factLines, cursor.left, cursor.y);
  cursor.y += factLines.length * lineMm() + 1.2;

  for (const source of document.sources) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    const titleLines = wrap(doc, `${source.title} — ${source.publisher}`, cursor.width);
    doc.setFont("helvetica", "normal");
    const urlLines = wrap(doc, source.url, cursor.width);
    const height = titleLines.length * lineMm(10.5) + urlLines.length * lineMm(10) + 0.8;
    ensureSpace(cursor, height);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(...T.inkRgb);
    doc.text(titleLines, cursor.left, cursor.y);
    cursor.y += titleLines.length * lineMm(10.5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...T.rustRgb);
    doc.textWithLink(urlLines[0] ?? source.url, cursor.left, cursor.y, { url: source.url });
    if (urlLines.length > 1) {
      doc.text(urlLines.slice(1), cursor.left, cursor.y + lineMm(10));
    }
    cursor.y += urlLines.length * lineMm(10) + 1.1;
    doc.setTextColor(...T.inkRgb);
  }
}

function drawQrAndLiveLink(cursor: PdfCursor, document: HelpCardDownloadDocument) {
  const doc = cursor.doc;
  const qrSize = 18;
  const quiet = 1.5;
  const matrix = createQrMatrix(document.liveUrl);
  const moduleSize = (qrSize - quiet * 2) / matrix.size;
  const textW = cursor.width - qrSize - 3.2;
  setBody(doc);
  const intro = wrap(doc, document.liveUrlLabel, textW);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  const changed = wrap(doc, "If anything has changed, this is the live page.", textW);
  const note = wrap(doc, `${document.disclaimer} ${document.footerNote}`, textW);
  const textHeight = intro.length * lineMm(11) + changed.length * lineMm(8.5) + note.length * lineMm(8.5) + 3;
  const height = Math.max(qrSize, textHeight);
  ensureSpace(cursor, height + 1.5);

  const qrY = cursor.y;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...T.ruleRgb);
  doc.setLineWidth(0.25);
  doc.rect(cursor.left, qrY, qrSize, qrSize, "FD");
  doc.setFillColor(...T.inkRgb);
  for (let y = 0; y < matrix.size; y += 1) {
    for (let x = 0; x < matrix.size; x += 1) {
      if (!matrix.modules[y]?.[x]) continue;
      doc.rect(cursor.left + quiet + x * moduleSize, qrY + quiet + y * moduleSize, moduleSize, moduleSize, "F");
    }
  }

  const textX = cursor.left + qrSize + 3.2;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(...T.rustRgb);
  doc.textWithLink(intro[0] ?? document.liveUrlLabel, textX, qrY + 4, { url: document.liveUrl });
  if (intro.length > 1) {
    doc.text(intro.slice(1), textX, qrY + 4 + lineMm(10.5));
  }
  let noteY = qrY + 4 + intro.length * lineMm(10.5) + 1.2;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...T.inkRgb);
  doc.text(changed, textX, noteY);
  noteY += changed.length * lineMm(8.5) + 1.2;
  doc.setTextColor(...T.mutedRgb);
  doc.text(note, textX, noteY);
  cursor.y = qrY + height + 1.2;
}

function drawFrontMatter(cursor: PdfCursor, document: HelpCardDownloadDocument) {
  drawHeader(cursor, document);

  drawSectionHeading(cursor, "Use this when");
  drawParagraph(cursor, document.purpose);

  drawSectionHeading(cursor, "Key message");
  drawKeyMessage(cursor, document.keyMessage);

  if (document.suggestedWording) {
    drawWording(cursor, document.suggestedWording.label, document.suggestedWording.text);
  }

  drawSectionHeading(cursor, "What to do");
  drawChecklist(cursor, document.actions);

  if (document.questionsToAsk?.length) {
    drawSectionHeading(cursor, "What to ask or confirm");
    drawChecklist(cursor, document.questionsToAsk);
  }
}

function drawBackMatter(cursor: PdfCursor, document: HelpCardDownloadDocument) {
  if (document.conditions?.length) {
    drawSectionHeading(cursor, "What this does not cover");
    drawChecklist(cursor, document.conditions);
  }
  if (document.beforeYouGo?.length) {
    drawSectionHeading(cursor, "Before you go");
    drawChecklist(cursor, document.beforeYouGo);
  }
  drawMeta(cursor, document);
  drawQrAndLiveLink(cursor, document);
}

export function buildHelpCardDownloadPdf(document: HelpCardDownloadDocument): HelpCardPdfResult {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a5",
    compress: true,
  });

  doc.setProperties({
    title: `Access Stamp Help Card — ${document.title}`,
    subject: document.purpose,
    author: "Access Stamp",
    creator: "Access Stamp",
    keywords: `help card, accessibility, ${document.category}`,
  });

  paintPage(doc);

  const cursor: PdfCursor = {
    doc,
    y: T.marginMm + 2,
    left: T.marginMm,
    width: doc.internal.pageSize.getWidth() - T.marginMm * 2,
    top: T.marginMm + 2,
    bottom: doc.internal.pageSize.getHeight() - T.marginMm - 2,
  };

  drawFrontMatter(cursor, document);
  drawBackMatter(cursor, document);

  return {
    arrayBuffer: doc.output("arraybuffer"),
    pageCount: doc.getNumberOfPages(),
  };
}
