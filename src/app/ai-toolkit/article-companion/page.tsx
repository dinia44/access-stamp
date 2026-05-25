import type { Metadata } from "next";
import { ArticleCompanionTool } from "@/components/ai-toolkit/tools/article-companion-tool";

export const metadata: Metadata = {
  title: "AI Article Companion",
  description: "Personalise any Access Stamp guide into a checklist and next steps.",
};

export default function Page() {
  return <ArticleCompanionTool />;
}
