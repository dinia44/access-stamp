import { CategoryPage } from "@/components/advice/category-page";
import { SetChatContext } from "@/components/chat/set-context";

export default function WorkplacePage() {
  return (
    <>
      <SetChatContext page={{ kind: "advice" }} />
      <CategoryPage
        categorySlug="workplace"
        title="Workplace"
        description="Access to Work, reasonable adjustments, discrimination, and returning to work. Clear steps you can actually follow."
      />
    </>
  );
}
