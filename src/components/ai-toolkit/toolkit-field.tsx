import { cn } from "@/lib/utils";

const inputClass =
  "h-11 w-full rounded-[var(--radius-ui)] border border-border bg-card px-3 text-sm font-normal text-text";
const textareaClass =
  "min-h-[100px] w-full rounded-[var(--radius-ui)] border border-border bg-card px-3 py-2 text-sm font-normal text-text";

export function ToolkitField({
  label,
  htmlFor,
  hint,
  required,
  children,
  className,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label htmlFor={htmlFor} className={cn("grid gap-1.5 text-sm font-semibold text-heading", className)}>
      <span>
        {label}
        {required ? <span className="text-amber"> *</span> : null}
      </span>
      {children}
      {hint ? <span className="text-xs font-normal text-muted">{hint}</span> : null}
    </label>
  );
}

export function ToolkitInput({
  id,
  name,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  id?: string;
  name?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      required={required}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={inputClass}
    />
  );
}

export function ToolkitTextarea({
  id,
  value,
  onChange,
  required,
  placeholder,
  rows = 4,
}: {
  id?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      id={id}
      value={value}
      required={required}
      placeholder={placeholder}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      className={textareaClass}
    />
  );
}

export function ToolkitSelect({
  id,
  value,
  onChange,
  options,
  required,
}: {
  id?: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <select
      id={id}
      value={value}
      required={required}
      onChange={(e) => onChange(e.target.value)}
      className={inputClass}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function ToolkitCheckboxGroup({
  options,
  selected,
  onChange,
}: {
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((o) => {
        const checked = selected.includes(o.value);
        return (
          <label
            key={o.value}
            className="flex cursor-pointer items-start gap-2 rounded-[var(--radius-ui)] border border-border bg-card px-3 py-2 text-sm font-normal text-text"
          >
            <input
              type="checkbox"
              checked={checked}
              className="mt-0.5 size-4 shrink-0 accent-blue"
              onChange={() => {
                onChange(checked ? selected.filter((x) => x !== o.value) : [...selected, o.value]);
              }}
            />
            <span>{o.label}</span>
          </label>
        );
      })}
    </div>
  );
}
