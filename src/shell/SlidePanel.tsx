'use client';

import * as React from 'react';
import clsx from 'clsx';

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function SlidePanel({ open, onClose, children }: Props) {
  // lock background scroll while open
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // close on ESC
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div
      // use visibility to keep from focus issues; and a high z-index
      className={clsx(
        'fixed inset-0 z-[60]',
        open ? 'visible' : 'invisible'
      )}
      aria-hidden={!open}
    >
      {/* dim backdrop */}
      <button
        type="button"
        onClick={onClose}
        className={clsx(
          'absolute inset-0 bg-black/50 transition-opacity',
          open ? 'opacity-100' : 'opacity-0'
        )}
        // make backdrop unfocusable by AT (button keeps it clickable)
        aria-hidden="true"
      />

      {/* panel */}
      <div
        role="dialog"
        aria-modal="true"
        className={clsx(
          'absolute right-0 top-0 h-full w-full max-w-md',
          'bg-neutral-900/95 backdrop-blur',
          'shadow-xl ring-1 ring-white/10',
          'transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full',
          // keep content above iOS home indicator
          'pb-[env(safe-area-inset-bottom)]'
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default SlidePanel;