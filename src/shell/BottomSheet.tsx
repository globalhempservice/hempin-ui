'use client';
import * as React from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  height?: number; // px
  children: React.ReactNode;
};

export const BottomSheet: React.FC<Props> = ({ open, onClose, height = 260, children }) => {
  return (
    <>
      {/* scrim */}
      <div
        onClick={onClose}
        className={[
          'fixed inset-0 z-40 bg-black/60 transition-opacity',
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        ].join(' ')}
      />
      {/* sheet */}
      <div
        className={[
          'fixed inset-x-0 z-50 rounded-t-xl border-t border-white/10 bg-zinc-900/95 backdrop-blur',
          'transition-transform duration-300',
          open ? 'translate-y-0' : 'translate-y-full'
        ].join(' ')}
        style={{ bottom: 0, height }}
      >
        <div className="p-3">
          <div className="mx-auto mb-2 h-1.5 w-10 rounded-full bg-white/20" />
          {children}
        </div>
      </div>
    </>
  );
};