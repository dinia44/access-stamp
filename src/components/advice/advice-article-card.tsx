import Link from "next/link";
import type { AdviceArticle } from "@/lib/mock-data";
import { getAdviceArticleCardImage } from "@/lib/advice-card-images";
import { GuideCoverImage } from "@/components/advice/guide-cover-image";
import { Badge, Card } from "@/components/ui";
import { cn } from "@/lib/utils";

export function AdviceArticleCard({
  article,
  badgeTone = "blue",
  className,
  meta,
  tagLimit = 3,
  showReadCta = true,
}: {
  article: AdviceArticle;
  badgeTone?: "blue" | "amber";
  className?: string;
  /** Replaces default “Updated” line */
  meta?: React.ReactNode;
  tagLimit?: number;
  showReadCta?: boolean;
}) {
  const img = getAdviceArticleCardImage(article);
  return (
    <Link href={`/advice/${article.slug}`} className={cn("group block h-full", className)}>
      <Card className="flex h-full flex-col overflow-hidden border-[#dce6f4] p-0 transition-all group-hover:-translate-y-0.5 group-hover:shadow-[var(--shadow)]">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-background-2">
          <GuideCoverImage
            src={img.src}
            alt={img.alt}
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="line-clamp-3 text-sm font-semibold text-heading">{article.title}</div>
          {meta ?? <div className="mt-2 text-xs font-semibold text-muted">Updated: {article.updated}</div>}
          {tagLimit > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {article.tags.slice(0, tagLimit).map((tag) => (
                <Badge key={tag} tone={badgeTone}>
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}
          {showReadCta ? <div className="mt-4 text-sm font-semibold text-blue">Read →</div> : null}
        </div>
      </Card>
    </Link>
  );
}
