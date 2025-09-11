import * as React from "react";

export function Button(
  { className = "", children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded font-medium bg-[var(--color-primary)] text-white hover:opacity-90 transition ${className}`}
    >
      {children}
    </button>
  );
}