import { CategoryPage } from "@/components/advice/category-page";
import { SetChatContext } from "@/components/chat/set-context";

export default function TravelPage() {
  return (
    <>
      <SetChatContext page={{ kind: "advice" }} />
      <CategoryPage
        categorySlug="travel"
        title="Travel"
        description="Flying, battery rules, accessible accommodation, insurance, and planning ahead. Practical checks and clear next steps."
      />
    </>
  );
}

