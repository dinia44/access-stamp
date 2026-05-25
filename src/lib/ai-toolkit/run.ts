import {
  mockAccessNeedsProfiler,
  mockArticleCompanion,
  mockEvidenceChecklist,
  mockLetterBuilder,
  mockVenueQuestions,
} from "@/lib/ai-toolkit/mock";
import { callOpenAiJson } from "@/lib/ai-toolkit/openai";
import {
  articleCompanionSystemPrompt,
  buildUserPayload,
  evidenceSystemPrompt,
  letterBuilderSystemPrompt,
  profilerSystemPrompt,
  venueQuestionsSystemPrompt,
} from "@/lib/ai-toolkit/prompts";
import { guidesForArea } from "@/lib/ai-toolkit/related-guides";
import type {
  AccessNeedsProfilerInput,
  AccessNeedsProfilerOutput,
  ArticleCompanionInput,
  ArticleCompanionOutput,
  EvidenceChecklistInput,
  EvidenceChecklistOutput,
  LetterBuilderInput,
  LetterBuilderOutput,
  ToolkitInputMap,
  ToolkitOutputMap,
  ToolkitRunResult,
  ToolkitToolId,
  VenueQuestionsInput,
  VenueQuestionsOutput,
  ToolkitResultSource,
} from "@/lib/ai-toolkit/types";

function mockSource(): ToolkitResultSource {
  return process.env.OPENAI_API_KEY?.trim() ? "fallback" : "mock";
}

export async function runToolkitTool<T extends ToolkitToolId>(
  tool: T,
  input: ToolkitInputMap[T],
): Promise<ToolkitRunResult<T>> {
  switch (tool) {
    case "access-needs-profiler": {
      const typed = input as AccessNeedsProfilerInput;
      const llm = await callOpenAiJson<AccessNeedsProfilerOutput>({
        system: profilerSystemPrompt(),
        user: buildUserPayload(tool, typed),
      });
      const guides = guidesForArea(typed.area);
      if (llm) {
        const output: AccessNeedsProfilerOutput = {
          ...llm,
          importantNote: llm.importantNote || "",
          relatedGuides: llm.relatedGuides?.length ? llm.relatedGuides : guides,
        };
        return { tool, source: "openai", output } as ToolkitRunResult<T>;
      }
      return { tool, source: mockSource(), output: mockAccessNeedsProfiler(typed) } as ToolkitRunResult<T>;
    }
    case "letter-builder": {
      const typed = input as LetterBuilderInput;
      const llm = await callOpenAiJson<LetterBuilderOutput>({
        system: letterBuilderSystemPrompt(),
        user: buildUserPayload(tool, typed),
      });
      if (llm) return { tool, source: "openai", output: llm } as ToolkitRunResult<T>;
      return { tool, source: mockSource(), output: mockLetterBuilder(typed) } as ToolkitRunResult<T>;
    }
    case "evidence-checklist": {
      const typed = input as EvidenceChecklistInput;
      const llm = await callOpenAiJson<EvidenceChecklistOutput>({
        system: evidenceSystemPrompt(),
        user: buildUserPayload(tool, typed),
      });
      if (llm) return { tool, source: "openai", output: llm } as ToolkitRunResult<T>;
      return { tool, source: mockSource(), output: mockEvidenceChecklist(typed) } as ToolkitRunResult<T>;
    }
    case "article-companion": {
      const typed = input as ArticleCompanionInput;
      const llm = await callOpenAiJson<ArticleCompanionOutput>({
        system: articleCompanionSystemPrompt(typed.articleSlug),
        user: buildUserPayload(tool, typed),
      });
      if (llm) return { tool, source: "openai", output: llm } as ToolkitRunResult<T>;
      return { tool, source: mockSource(), output: mockArticleCompanion(typed) } as ToolkitRunResult<T>;
    }
    case "venue-questions": {
      const typed = input as VenueQuestionsInput;
      const llm = await callOpenAiJson<VenueQuestionsOutput>({
        system: venueQuestionsSystemPrompt(),
        user: buildUserPayload(tool, typed),
      });
      if (llm) return { tool, source: "openai", output: llm } as ToolkitRunResult<T>;
      return { tool, source: mockSource(), output: mockVenueQuestions(typed) } as ToolkitRunResult<T>;
    }
    default: {
      const _exhaustive: never = tool;
      throw new Error(`Unknown tool: ${_exhaustive}`);
    }
  }
}

export type { ToolkitOutputMap, ToolkitInputMap };
