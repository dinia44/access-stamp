import { jsPDF } from "jspdf";
import { buildPaRecruitmentPackPlainText } from "@/lib/care-pa-employer-sections";

/** Multi-page A4 PDF of the PA pack (same source text as the .txt export). */
export function buildPaRecruitmentPackPdf(): ArrayBuffer {
  const text = buildPaRecruitmentPackPlainText();
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const margin = 14;
  const pageH = doc.internal.pageSize.getHeight();
  const pageW = doc.internal.pageSize.getWidth();
  const maxW = pageW - 2 * margin;
  const lineHeight = 4.1;
  doc.setFont("courier", "normal");
  doc.setFontSize(8.5);

  const lines = doc.splitTextToSize(text, maxW);
  let y = margin;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (y + lineHeight > pageH - margin) {
      doc.addPage();
      y = margin;
    }
    doc.text(line, margin, y);
    y += lineHeight;
  }

  const out = doc.output("arraybuffer");
  return out;
}
