import * as React from "react";

export function Button(
  { className = "", children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      className={`hip-btn ${className}`}
    >
      {children}
    </button>
  );
}