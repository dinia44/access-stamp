"use client";

import ReactMarkdown from "react-markdown";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import type { Components } from "react-markdown";
import Link from "next/link";
import { cn } from "@/lib/utils";

const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    a: [...(defaultSchema.attributes?.a ?? ["href"]), "target", "rel"],
  },
};

const markdownComponents: Components = {
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  ul: ({ children }) => <ul className="mb-2 list-disc space-y-1 pl-5 last:mb-0">{children}</ul>,
  ol: ({ children }) => <ol className="mb-2 list-decimal space-y-1 pl-5 last:mb-0">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-heading">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children }) => {
    const normalized =
      href
        ?.replace(/^\/venues(\/|$)/i, "/venue-finder$1")
        .replace(/^\/venues(\?[^#]*)?$/i, "/venue-finder$1") ?? "#";
    const internal = normalized.startsWith("/") && !normalized.startsWith("//");
    const className =
      "font-semibold text-blue underline decoration-blue/40 underline-offset-2 hover:decoration-blue";
    if (internal) {
      return (
        <Link href={normalized} className={className}>
          {children}
        </Link>
      );
    }
    return (
      <a href={normalized} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  },
};

export function ChatMessageContent({ text, className }: { text: string; className?: string }) {
  return (
    <div className={cn("text-sm leading-6 text-heading [&_*]:break-words", className)}>
      <ReactMarkdown components={markdownComponents} rehypePlugins={[[rehypeSanitize, sanitizeSchema]]}>
        {text}
      </ReactMarkdown>
    </div>
  );
}
