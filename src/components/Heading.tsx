import * as React from 'react';
import clsx from 'clsx';

type As = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingProps = {
  as?: As;
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>;

const base = 'font-semibold tracking-tight text-white';

const sizes: Record<As, string> = {
  h1: 'text-3xl sm:text-4xl',
  h2: 'text-2xl sm:text-3xl',
  h3: 'text-xl sm:text-2xl',
  h4: 'text-lg',
  h5: 'text-base',
  h6: 'text-sm',
};

/**
 * Note: we use React.createElement to keep the TS signature for HTMLHeadingElement.
 * This avoids JSX inferring an SVG type in DTS generation.
 */
export function Heading({ as = 'h2', className, children, ...rest }: HeadingProps) {
  return React.createElement(
    as,
    {
      className: clsx(base, sizes[as], className),
      ...rest,
    },
    children
  );
}

export default Heading;