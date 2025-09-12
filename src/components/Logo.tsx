import * as React from "react";

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Logo({ className = "", ...rest }: LogoProps) {
  return (
    <div
      {...rest}
      className={`select-none font-extrabold tracking-tight text-[var(--color-ink)] ${className}`}
    >
      HEMPIN<span className="ml-1 inline-block h-2 w-2 rounded-full bg-[var(--color-accent)]" />
    </div>
  );
}