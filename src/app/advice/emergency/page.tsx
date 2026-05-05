import { CategoryPage } from "@/components/advice/category-page";
import { SetChatContext } from "@/components/chat/set-context";

export default function EmergencyPage() {
  return (
    <>
      <SetChatContext page={{ kind: "advice" }} />
      <CategoryPage
        categorySlug="emergency"
        title="Emergency & Quick Help"
        description="Breakdowns, helplines, urgent support routes, and what to document. Clear steps, with safety warnings where needed."
      />
    </>
  );
}
