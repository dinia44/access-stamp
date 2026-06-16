import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { AI_TOOLKIT_TOOLS } from "@/lib/ai-toolkit/tools-meta";
import { HOME_FOCUS } from "@/components/home/home-theme";

const TOOL_TIME: Record<string, string> = {
  "letter-builder": "5–10 minutes",
  "evidence-checklist": "5–10 minutes",
  "venue-questions": "3–5 minutes",
  "venue-fit-planner": "5–10 minutes",
  "access-needs-profiler": "10–15 minutes",
  "article-companion": "5–10 minutes",
  "tribunal-bundle-helper": "15–20 minutes",
};

export function HomeAiToolsPreview() {
  const preview = AI_TOOLKIT_TOOLS.slice(0, 4);

  return (
    <section className="border-t border-[#EFE5DA] bg-[#FDFBF8] py-16 sm:py-20" aria-labelledby="ai-tools-preview-heading">
      <PageContainer>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C8430F]">Access Stamp tools</p>
            <h2 id="ai-tools-preview-heading" className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.03em] text-[#20242E] sm:text-4xl">
              Structured tools for drafts and next steps
            </h2>
            <p className="mt-3 text-base leading-7 text-[#4A5263]">
              Guided questions to help you create practical drafts, checklists, and next steps — designed to support
              preparation, not replace professional advice.
            </p>
          </div>
          <Link
            href="/ai-toolkit"
            className={`inline-flex min-h-[44px] shrink-0 items-center text-sm font-semibold text-[#C8430F] hover:underline ${HOME_FOCUS}`}
          >
            Browse all tools
          </Link>
        </div>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {preview.map((tool) => (
            <li key={tool.id}>
              <article className="flex h-full flex-col rounded-[24px] border border-[#EFE5DA] bg-white p-6 shadow-[0_8px_24px_-16px_rgba(122,80,48,0.1)]">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#C8430F]">{tool.badge}</p>
                <h3 className="mt-2 text-lg font-semibold text-[#20242E]">{tool.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-[#4A5263]">{tool.description}</p>
                <p className="mt-3 text-xs font-medium text-[#76808F]">
                  Time: {TOOL_TIME[tool.id] ?? "5–10 minutes"}
                </p>
                <Link
                  href={tool.href}
                  className={`mt-4 inline-flex min-h-[44px] items-center text-sm font-semibold text-[#C8430F] hover:underline ${HOME_FOCUS}`}
                >
                  Open tool
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}
