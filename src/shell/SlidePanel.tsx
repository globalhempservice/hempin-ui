import * as React from 'react';

export function SlidePanel({
  open,
  onClose,
  children,
  ariaLabel = 'Panel'
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div aria-hidden={!open}>
      {/* scrim */}
      <button
        aria-label="Close"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />
      {/* panel */}
      <aside
        role="dialog"
        aria-label={ariaLabel}
        className={`fixed right-0 top-0 z-50 h-[100dvh] w-[88%] max-w-sm bg-zinc-900/95 backdrop-blur ring-1 ring-white/10 transition-transform duration-300
                    ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {children}
      </aside>
    </div>
  );
}