import * as React from "react";

type Variant = "solid" | "subtle";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
}

export function Badge({ variant = "solid", className = "", children, ...rest }: BadgeProps) {
  const base = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
  const styles =
    variant === "solid"
      ? "bg-[var(--color-accent)] text-white"
      : "border border-white/15 text-[var(--color-accent)]";
  return (
    <span {...rest} className={`${base} ${styles} ${className}`}>
      {children}
    </span>
  );
}