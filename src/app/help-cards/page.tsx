import type { Metadata } from "next";
import "./help-cards.css";
import HelpCardsPage from "@/features/help-cards/HelpCardsPage";
import { SetChatContext } from "@/components/chat/set-context";

export const metadata: Metadata = {
  title: "Help Cards | Access Stamp",
  description:
    "Pocket-sized scripts for real-world access, rights and support situations.",
};

export default function Page() {
  return (
    <>
      <SetChatContext page={{ kind: "none" }} />
      <HelpCardsPage />
    </>
  );
}
