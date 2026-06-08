import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ChatProvider } from "@/components/chat/provider";
import { ChatWidgetLoader } from "@/components/chat/chat-widget-loader";
import { AccessibilityControls } from "@/components/accessibility-controls";
import { Footer } from "@/components/footer";
import { SiteChrome } from "@/components/site-chrome";

const display = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://access-stamp-seven.vercel.app"),
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
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-[var(--radius-ui)] focus:bg-card focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-heading"
        >
          Skip to main content
        </a>
        <ChatProvider>
          <SiteChrome>
            <main id="main-content" className="flex-1">{children}</main>
          </SiteChrome>
          <Footer />
          <AccessibilityControls />
          <ChatWidgetLoader />
        </ChatProvider>
      </body>
    </html>
  );
}
