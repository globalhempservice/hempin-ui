'use client';

import * as React from 'react';
import clsx from 'clsx';

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function SlidePanel({ open, onClose, children }: Props) {
  // keyboard-aware padding for iOS Safari
  React.useEffect(() => {
    if (!open || !('visualViewport' in window)) return;
    const vv = window.visualViewport!;
    const set = () => {
      const kb = Math.max(0, (window.innerHeight - vv.height - vv.offsetTop) || 0);
      document.documentElement.style.setProperty('--kb', `${kb}px`);
    };
    set();
    vv.addEventListener('resize', set);
    vv.addEventListener('scroll', set);
    return () => {
      vv.removeEventListener('resize', set);
      vv.removeEventListener('scroll', set);
      document.documentElement.style.setProperty('--kb', `0px`);
    };
  }, [open]);

  return (
    <div
      className={clsx(
        'fixed inset-0 z-[60]',
        open ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
      )}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        className={clsx(
          'absolute inset-0 bg-black/50 transition-opacity',
          open ? 'opacity-100' : 'opacity-0'
        )}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        className={clsx(
          'absolute right-0 top-0 h-full w-full max-w-md',
          'bg-neutral-900/95 backdrop-blur',
          'shadow-xl ring-1 ring-white/10',
          'transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full',
          // prevent scroll chaining & keep above home indicator & keyboard
          'pb-[calc(env(safe-area-inset-bottom)+var(--kb))] overflow-hidden overscroll-contain flex flex-col'
        )}
      >
        {/* Child content takes the space; make sure inner containers can scroll */}
        <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

export default SlidePanel;