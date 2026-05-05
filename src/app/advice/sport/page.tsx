import { CategoryPage } from "@/components/advice/category-page";
import { SetChatContext } from "@/components/chat/set-context";

export default function SportPage() {
  return (
    <>
      <SetChatContext page={{ kind: "advice" }} />
      <CategoryPage
        categorySlug="sport"
        title="Sport"
        description="Accessible gyms, leisure centres, adaptive sport, and practical checklists to help you participate with confidence."
      />
    </>
  );
}
