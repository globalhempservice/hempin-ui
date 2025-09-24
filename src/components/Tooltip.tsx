// src/components/Tooltip.tsx
'use client';

import * as React from 'react';

type Props = {
  children: React.ReactNode;
  /** Text shown inside the tooltip bubble */
  content: string;
  /** Where to place the bubble relative to the trigger */
  side?: 'top' | 'bottom';
  /** Show delay in ms (hover) */
  delay?: number;
};

const bubbleBase =
  'pointer-events-none absolute z-50 rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-black shadow ' +
  'ring-1 ring-black/10 backdrop-blur';

export default function Tooltip({
  children,
  content,
  side = 'top',
  delay = 120,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const timer = React.useRef<number | null>(null);

  const show = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(true), delay) as unknown as number;
  };
  const hide = () => {
    if (timer.current) window.clearTimeout(timer.current);
    setOpen(false);
  };

  // positioning
  const pos =
    side === 'top'
      ? 'bottom-full left-1/2 -translate-x-1/2 mb-2'
      : 'top-full left-1/2 -translate-x-1/2 mt-2';

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      aria-describedby={open ? 'tooltip' : undefined}
    >
      {children}
      {open && (
        <span role="tooltip" id="tooltip" className={`${bubbleBase} ${pos}`}>
          {content}
        </span>
      )}
    </span>
  );
}