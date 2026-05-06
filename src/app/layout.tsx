import type { Metadata } from "next";
import { DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ChatProvider } from "@/components/chat/provider";
import { AccessibilityControls } from "@/components/accessibility-controls";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://access-stamp-mxao.vercel.app"),
  title: {
    default: "Access Stamp",
    template: "%s · Access Stamp",
  },
  description:
    "A UK-focused accessibility platform for practical advice, venue access details, and an AI assistant.",
  openGraph: {
    title: "Access Stamp",
    description:
      "Practical accessibility guidance and venue details for disabled people, carers, and families in the UK.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Access Stamp",
    description:
      "Practical accessibility guidance and venue details for disabled people, carers, and families in the UK.",
  },
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-[var(--radius-ui)] focus:bg-card focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-heading"
        >
          Skip to main content
        </a>
        <ChatProvider>
          <Navbar />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <AccessibilityControls />
          <ChatWidget />
        </ChatProvider>
      </body>
    </html>
  );
}
