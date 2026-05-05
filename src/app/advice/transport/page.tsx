import { CategoryPage } from "@/components/advice/category-page";
import { SetChatContext } from "@/components/chat/set-context";

export default function TransportPage() {
  return (
    <>
      <SetChatContext page={{ kind: "advice" }} />
      <CategoryPage
        categorySlug="transport"
        title="Transport"
        description="Trains, buses, driving, flying, taxis, and mobility scooter rules. What to expect, and what to do when systems fail."
      />
    </>
  );
}
