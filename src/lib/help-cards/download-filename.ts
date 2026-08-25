export function helpCardDownloadFilename(slug: string, reviewedAt: string, ext: "pdf" | "txt"): string {
  return `access-stamp-help-card-${slug}-${reviewedAt}.${ext}`;
}
