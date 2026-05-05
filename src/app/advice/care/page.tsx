import { CategoryPage } from "@/components/advice/category-page";
import { SetChatContext } from "@/components/chat/set-context";

export default function CarePage() {
  return (
    <>
      <SetChatContext page={{ kind: "advice" }} />
      <CategoryPage
        categorySlug="care"
        title="Care & Support"
        description="Personal budgets, hiring PAs, templates, managing care, and what to do when support breaks down."
      />
    </>
  );
}
