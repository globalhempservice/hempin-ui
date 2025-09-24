'use client';
import * as React from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  height?: number; // px
  children: React.ReactNode;
};

export const BottomSheet: React.FC<Props> = ({ open, onClose, height = 260, children }) => {
  const panelRef = React.useRef<HTMLDivElement>(null);

  // Lock background scroll while open
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Close on ESC + focus sheet on open (a11y)
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const t = setTimeout(() => panelRef.current?.focus(), 0);
    return () => { window.removeEventListener('keydown', onKey); clearTimeout(t); };
  }, [open, onClose]);

  return (
    <>
      {/* scrim */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={[
          'fixed inset-0 z-40 bg-black/60 transition-opacity',
          open ? 'opacity-100 pointer-events-auto' : 'pointer-events-none opacity-0'
        ].join(' ')}
      />

      {/* sheet */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={[
          'fixed inset-x-0 z-50 rounded-t-xl border-t border-white/10 bg-zinc-900/95 backdrop-blur',
          'transition-transform duration-300 overscroll-contain',
          open ? 'translate-y-0' : 'translate-y-full pointer-events-none'
        ].join(' ')}
        style={{ bottom: 0, height }}
      >
        <div className="p-3 pb-[env(safe-area-inset-bottom)]">
          <div className="mx-auto mb-2 h-1.5 w-10 rounded-full bg-white/20" />
          {children}
        </div>
      </div>
    </>
  );
};

export default BottomSheet;