import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`block w-full rounded-md border border-white/10 bg-white/5
          px-3 py-2 text-[var(--color-ink)] placeholder-white/60
          focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]
          ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";