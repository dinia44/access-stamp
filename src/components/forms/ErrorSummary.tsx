"use client";

import { useEffect, useRef } from "react";

type FieldError = {
  id: string;
  message: string;
};

type Props = {
  title?: string;
  errors: FieldError[];
  onFocus?: () => void;
};

export function ErrorSummary({ title = "There is a problem", errors, onFocus }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (errors.length) {
      ref.current?.focus();
      onFocus?.();
    }
  }, [errors, onFocus]);

  if (!errors.length) return null;

  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="alert"
      aria-labelledby="error-summary-title"
      className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900"
    >
      <h2 id="error-summary-title" className="font-semibold">
        {title}
      </h2>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        {errors.map((error) => (
          <li key={error.id}>
            <a href={`#${error.id}`} className="underline underline-offset-2 hover:text-red-950">
              {error.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
