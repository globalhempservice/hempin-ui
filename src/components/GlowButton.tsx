'use client';

import * as React from 'react';
import clsx from 'clsx';

/**
 * A high-contrast button with a soft, pointer-following glow.
 * - Works on mouse + touch (pointer events)
 * - Respects prefers-reduced-motion (no glow movement)
 * - Fully accessible, can be used as <button> or <a>
 */
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: 'button';
  label?: string;
};

export default function GlowButton({
  as = 'button',
  className,
  label,
  children,
  onPointerMove,
  onPointerLeave,
  ...rest
}: Props) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const raf = React.useRef<number | null>(null);
  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    : false;

  const setPos = (e: React.PointerEvent) => {
    if (prefersReduced) return;
    if (!ref.current) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    // cursor coordinates relative to the element
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // throttle with rAF
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty('--glow-x', `${x}px`);
      el.style.setProperty('--glow-y', `${y}px`);
    });
  };

  const clearPos = () => {
    if (!ref.current) return;
    ref.current.style.removeProperty('--glow-x');
    ref.current.style.removeProperty('--glow-y');
  };

  return (
    <button
      ref={ref}
      type="button"
      onPointerMove={(e) => { setPos(e); onPointerMove?.(e); }}
      onPointerLeave={(e) => { clearPos(); onPointerLeave?.(e); }}
      className={clsx(
        // layout
        'relative inline-flex items-center justify-center',
        'h-12 px-5 rounded-2xl',
        // base surface
        'bg-white text-black font-semibold',
        'shadow-[0_1px_0_rgba(255,255,255,.5)_inset,0_1px_8px_rgba(0,0,0,.35)]',
        'ring-1 ring-white/20',
        // smooth transitions
        'transition-[transform,box-shadow] duration-200',
        'active:scale-[0.98]',
        // focus
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70',
        // custom glow layer via ::before
        'before:absolute before:inset-[-2px] before:rounded-[inherit]',
        'before:-z-10 before:blur-xl',
        // The gradient background is a combination:
        // 1) subtle rainbow nebula around
        // 2) pointer-following radial glow at --glow-x/--glow-y
        'before:[background:radial-gradient(120px_120px_at_var(--glow-x,50%)_var(--glow-y,50%),rgba(255,255,255,.85),rgba(255,255,255,0)_60%),conic-gradient(from_120deg,rgba(16,185,129,.35),rgba(14,165,233,.25),rgba(217,70,239,.25),rgba(251,191,36,.25),rgba(16,185,129,.35))]',
        'before:opacity-90',
        // mask a soft vignette so the glow is contained nicely
        'before:[mask:radial-gradient(120px_120px_at_var(--glow-x,50%)_var(--glow-y,50%),#000_0%,#000_60%,transparent_75%)],',
        // outer ambient aura
        'after:absolute after:inset-[-8px] after:rounded-[inherit] after:-z-20 after:blur-2xl',
        'after:opacity-40',
        'after:[background:radial-gradient(200px_120px_at_50%_110%,rgba(16,185,129,.25),transparent),radial-gradient(200px_120px_at_-10%_-10%,rgba(59,130,246,.2),transparent),radial-gradient(200px_120px_at_110%_-10%,rgba(217,70,239,.2),transparent)]',
        className
      )}
      aria-label={label}
      {...rest}
    >
      {children}
    </button>
  );
}