import fs from "node:fs";
import path from "node:path";

export type GuideDownloadResource = {
  id: string;
  title: string;
  description: string;
  file: string;
  filename: string;
  format: string;
};

export type GuideOfficialLink = {
  label: string;
  href: string;
};

export type GuideResourcePack = {
  slug: string;
  summary: string[];
  downloads: GuideDownloadResource[];
  officialLinks: GuideOfficialLink[];
  fullGuideCta: {
    heading: string;
    text: string;
    primaryLabel: string;
    secondaryLabel: string;
    tertiaryLabel: string;
    primaryHref: string;
    templateHref: string;
  };
};

export type GuideTocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

const CONTENT_ROOT = path.join(process.cwd(), "content", "guides");

const RESOURCE_SLUGS = ["reasonable-adjustments-at-work"] as const;

export function hasGuideResourcePack(slug: string): slug is (typeof RESOURCE_SLUGS)[number] {
  return (RESOURCE_SLUGS as readonly string[]).includes(slug);
}

export function getGuideResourcePack(slug: string): GuideResourcePack | null {
  if (!hasGuideResourcePack(slug)) return null;
  const filePath = path.join(CONTENT_ROOT, slug, "resources.json");
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw) as GuideResourcePack;
}

export function getGuideFullGuideMarkdown(slug: string): string | null {
  if (!hasGuideResourcePack(slug)) return null;
  const filePath = path.join(CONTENT_ROOT, slug, "full-guide.md");
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf8");
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function buildGuideToc(markdown: string): GuideTocItem[] {
  const items: GuideTocItem[] = [];
  for (const line of markdown.split("\n")) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/\*\*/g, "").trim();
    if (text.startsWith("Disclaimer")) continue;
    items.push({ id: slugifyHeading(text), text, level });
  }
  return items;
}

/** Plain text for read-aloud — strips markdown syntax lightly. */
export function markdownToPlainText(markdown: string): string {
  return markdown
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/\[(.+?)\]\(.+?\)/g, "$1")
    .replace(/^>\s+/gm, "")
    .replace(/^\|\s*---.+\|$/gm, "")
    .replace(/\|/g, " ")
    .replace(/^[-*]\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function getGuideFullGuideTitle(markdown: string): string {
  const first = markdown.split("\n").find((line) => line.startsWith("# "));
  return first ? first.replace(/^#\s+/, "").trim() : "Full guide";
}
