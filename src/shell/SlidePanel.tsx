'use client';

import * as React from 'react';
import clsx from 'clsx';

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function SlidePanel({ open, onClose, children }: Props) {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const closeBtnRef = React.useRef<HTMLButtonElement>(null);
  const prevActiveRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const root = document.getElementById('app-root') || document.body; // see ShellLayout note below
    if (open) {
      // store prev focused element
      prevActiveRef.current = document.activeElement as HTMLElement | null;

      // lock background
      document.body.style.overflow = 'hidden';
      root.setAttribute('inert', ''); // block interaction behind
      // move focus inside panel
      setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 0);
    } else {
      document.body.style.overflow = '';
      root.removeAttribute('inert');
      // restore focus
      prevActiveRef.current?.focus?.();
      prevActiveRef.current = null;
    }
    return () => {
      document.body.style.overflow = '';
      root.removeAttribute('inert');
    };
  }, [open]);

  return (
    <div
      className={clsx(
        'fixed inset-0 z-40 pointer-events-none',
        open && 'pointer-events-auto'
      )}
      aria-hidden={!open}
    >
      {/* dimmer */}
      <div
        className={clsx(
          'absolute inset-0 bg-black/40 transition-opacity',
          open ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
      />
      {/* panel */}
      <div
        ref={panelRef}
        className={clsx(
          'absolute right-0 top-0 h-[100dvh] w-full sm:w-[420px] bg-neutral-950 border-l border-white/10',
          'translate-x-full transition-transform duration-300 will-change-transform',
          open && 'translate-x-0',
          // prevent rubber-banding & background scroll while inside
          'overscroll-contain flex flex-col'
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between h-12 px-3 border-b border-white/10">
          <div className="font-semibold">Panel</div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="rounded px-2 py-1 text-sm bg-white/10 ring-1 ring-white/10"
          >
            Close
          </button>
        </div>
        {/* content area fills panel; children can rely on flex column */}
        <div className="min-h-0 flex-1 overflow-y-auto p-3">{children}</div>
      </div>
    </div>
  );
}