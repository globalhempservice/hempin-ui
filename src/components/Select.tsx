import * as React from "react";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`block w-full rounded-md border border-white/10 bg-white/5
          px-3 py-2 text-[var(--color-ink)] focus:outline-none
          focus:ring-2 focus:ring-[var(--color-accent)] ${className}`}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select";