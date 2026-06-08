#!/usr/bin/env node
/**
 * Generates minimal valid .docx files for reasonable adjustments guide downloads.
 * DOCX is a ZIP archive of Office Open XML parts.
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "downloads");

const TEMPLATES = {
  "reasonable-adjustment-request-template.docx": `Access Stamp — Reasonable adjustment request template

Subject: Request for reasonable adjustments

Dear [Manager / HR contact],

I am writing to request reasonable adjustments under the Equality Act 2010 because I face a substantial disadvantage at work.

Barrier
Describe the workplace barrier in plain language. Focus on the task or situation, not clinical detail.

Impact
Explain how the barrier affects your ability to do your job safely, reliably, or on equal terms.

Adjustment requested
1. [Specific adjustment and how it removes the disadvantage]
2. [Alternative if the first option is not possible]

Reason
Briefly explain why this adjustment is reasonable and practical.

Next steps requested
Please confirm receipt, who will lead the response, and a date to review progress.

Thank you,
[Your name]
[Date]`,

  "workplace-barriers-checklist.docx": `Access Stamp — Workplace barriers checklist

Use this checklist to identify barriers before you write your request. Tick any that apply and add notes.

Physical environment
[ ] Desk, chair or workstation setup
[ ] Noise levels or open-plan distractions
[ ] Lighting, glare or screen use
[ ] Temperature, ventilation or air quality
[ ] Access to toilets, breaks or rest space
[ ] Equipment, tools or assistive technology
Notes:

Communication
[ ] Meetings (length, format, camera-on expectations)
[ ] Written information (clarity, timing, follow-ups)
[ ] Phone or video calls
[ ] Instructions changing at short notice
Notes:

Workload and work patterns
[ ] Deadlines or pace of work
[ ] Shift patterns or start/finish times
[ ] Hybrid or remote working options
[ ] Breaks, recovery time or fatigue
Notes:

Sensory and cognitive load
[ ] Background noise or visual clutter
[ ] Multitasking or frequent interruptions
[ ] Memory, concentration or processing time
Notes:

Policy and process barriers
[ ] Attendance or sickness policies
[ ] Performance management expectations
[ ] Recruitment, promotion or training access
Notes:

Top three barriers to address first:
1.
2.
3.`,

  "follow-up-email-template.docx": `Access Stamp — Follow-up email template

Subject: Follow-up: reasonable adjustments request dated [date]

Dear [Manager / HR contact],

Thank you for your response on [date]. I am writing to follow up on my reasonable adjustments request sent on [original date].

Current status
Briefly restate the barrier and the adjustment you requested.

What is still unclear or delayed
[ ] No written confirmation yet
[ ] No named contact or timeline
[ ] Adjustment agreed but not implemented
[ ] Partial response only

Requested next step
Please confirm by [date]:
- whether the adjustment is agreed, under review, or refused
- who is responsible for implementation
- the expected completion date

I remain willing to discuss practical options, including occupational health or Access to Work if helpful.

Thank you,
[Your name]
[Date]`,

  "reasonable-adjustment-review-notes.docx": `Access Stamp — Adjustment review notes

Guide: Reasonable adjustments at work
Review date:
Employer contact:

Adjustment agreed
Describe what was agreed and when.

Is it in place?
[ ] Fully implemented
[ ] Partly implemented
[ ] Agreed but not started
[ ] Refused or stalled

What is working
-

What is not working yet
-

Impact now
How has your ability to work changed since the adjustment (or lack of it)?

Next actions needed
[ ] Equipment or software still required
[ ] Policy or rota change still pending
[ ] Manager/HR follow-up needed
[ ] Formal escalation being considered

Notes for next review
-

Reminder: keep copies of emails, meeting notes and any occupational health summaries.`,
};

function escapeXml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function paragraphsFromText(text) {
  return text
    .split("\n")
    .map((line) => {
      const safe = escapeXml(line);
      if (!line.trim()) return "<w:p/>";
      return `<w:p><w:r><w:t xml:space="preserve">${safe}</w:t></w:r></w:p>`;
    })
    .join("");
}

function buildDocx(text) {
  const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    ${paragraphsFromText(text)}
    <w:sectPr/>
  </w:body>
</w:document>`;

  const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;

  const rels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

  return { documentXml, contentTypes, rels };
}

function writeDocx(filename, text) {
  const tmp = path.join(outDir, `.tmp-${filename.replace(".docx", "")}`);
  fs.mkdirSync(path.join(tmp, "_rels"), { recursive: true });
  fs.mkdirSync(path.join(tmp, "word"), { recursive: true });

  const parts = buildDocx(text);
  fs.writeFileSync(path.join(tmp, "[Content_Types].xml"), parts.contentTypes);
  fs.writeFileSync(path.join(tmp, "_rels", ".rels"), parts.rels);
  fs.writeFileSync(path.join(tmp, "word", "document.xml"), parts.documentXml);

  const outPath = path.join(outDir, filename);
  if (fs.existsSync(outPath)) fs.unlinkSync(outPath);
  execSync(`cd "${tmp}" && zip -qr "${outPath}" .`, { stdio: "inherit" });
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(`Wrote ${outPath}`);
}

fs.mkdirSync(outDir, { recursive: true });
for (const [filename, text] of Object.entries(TEMPLATES)) {
  writeDocx(filename, text);
}
