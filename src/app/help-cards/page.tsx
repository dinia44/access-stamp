import type { Metadata } from "next";
import "./help-cards.css";
import HelpCardsPage from "@/features/help-cards/HelpCardsPage";
import { SetChatContext } from "@/components/chat/set-context";

export const metadata: Metadata = {
  title: "Help Cards",
  description:
    "Save practical disability access cards for interviews, appointments, travel, care reviews and difficult conversations.",
};

export default function Page() {
  return (
    <>
      <SetChatContext page={{ kind: "none" }} />
      <HelpCardsPage />
    </>
  );
}
