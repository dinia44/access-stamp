import { cn } from "@/lib/utils";

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
  hideLabel?: boolean;
};

export function TextInput({
  id,
  label,
  error,
  hint,
  hideLabel = false,
  className,
  ...props
}: TextInputProps) {
  const inputId = id ?? props.name;
  const errorId = error ? `${inputId}-error` : undefined;
  const hintId = hint ? `${inputId}-hint` : undefined;

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className={cn(
          "block text-sm font-semibold text-[var(--color-ink)]",
          hideLabel && "sr-only",
        )}
      >
        {label}
      </label>

      <input
        id={inputId}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
        className={cn(
          "form-input as-transition min-h-11 w-full px-4 text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/80",
          error && "border-[var(--color-error)] focus:border-[var(--color-error)]",
          className,
        )}
        {...props}
      />

      {hint ? (
        <p id={hintId} className="text-sm text-[var(--color-muted)]">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} className="form-error-text">
          {error}
        </p>
      ) : null}
    </div>
  );
}
