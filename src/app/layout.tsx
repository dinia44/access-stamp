import type { Metadata } from "next";
import { DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ChatProvider } from "@/components/chat/provider";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ChatWidget } from "@/components/chat-widget";

const heading = DM_Serif_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const body = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Access Stamp",
    template: "%s · Access Stamp",
  },
  description:
    "A UK-focused accessibility platform for practical advice, venue access details, and an AI assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <ChatProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatWidget />
        </ChatProvider>
      </body>
    </html>
  );
}
