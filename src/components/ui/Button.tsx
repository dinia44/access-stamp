"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./Spinner";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger" | "chip";
type ButtonSize = "sm" | "md" | "lg" | "icon";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-primary)] text-white shadow-sm shadow-[var(--color-primary)]/20 hover:bg-[var(--color-primary-hover)] hover:brightness-105",
  secondary:
    "border border-[var(--color-border-mid)] bg-white text-[var(--color-ink)] hover:border-[var(--color-primary)]/40 hover:bg-[var(--background-2)]",
  ghost:
    "bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)]",
  outline:
    "border border-[var(--color-border-mid)] bg-transparent text-[var(--color-ink)] hover:bg-[var(--background-2)]",
  danger:
    "bg-[var(--color-error)] text-white hover:brightness-105",
  chip:
    "border border-[var(--color-border)] bg-[var(--background-2)] text-[var(--color-ink)] hover:bg-white data-[selected=true]:border-[var(--color-secondary)] data-[selected=true]:bg-[#EDF7ED] data-[selected=true]:text-[var(--color-secondary)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-base",
  icon: "h-11 w-11 p-0",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      leftIcon,
      rightIcon,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={isLoading || undefined}
        className={cn(
          "as-transition inline-flex items-center justify-center gap-2 rounded-2xl font-semibold",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--as-focus)]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--as-bg)]",
          "disabled:cursor-not-allowed disabled:opacity-55",
          "active:scale-[0.98]",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {isLoading ? <Spinner /> : leftIcon}
        <span>{isLoading ? "Loading…" : children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  },
);

Button.displayName = "Button";
