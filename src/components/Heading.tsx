import * as React from "react";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
}

const sizeByLevel: Record<HeadingLevel, string> = {
  1: "text-4xl sm:text-5xl font-extrabold tracking-tight",
  2: "text-3xl sm:text-4xl font-bold",
  3: "text-2xl sm:text-3xl font-semibold",
  4: "text-xl sm:text-2xl font-semibold",
  5: "text-lg font-semibold",
  6: "text-base font-semibold",
};

export function Heading({ as = 1, className = "", children, ...rest }: HeadingProps) {
  const Tag = (`h${as}` as unknown) as keyof JSX.IntrinsicElements;
  return (
    <Tag
      {...rest}
      className={`${sizeByLevel[as]} text-[var(--color-ink)] ${className}`}
    >
      {children}
    </Tag>
  );
}