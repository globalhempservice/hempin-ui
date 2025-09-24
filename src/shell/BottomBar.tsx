'use client';
import * as React from 'react';

type Item = {
  id: 'me' | 'notifications' | 'wallet';
  label: string;
  icon?: React.ReactNode; // can pass SVG later
  onPress?: () => void;
};

type Props = {
  onOpen: (id: Item['id']) => void;
};

const BarButton: React.FC<{ label: string; onClick: () => void; children: React.ReactNode }> = ({
  label,
  onClick,
  children
}) => (
  <button
    onClick={onClick}
    className="group relative grid h-10 w-10 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10"
  >
    {children}
    {/* tooltip */}
    <span className="pointer-events-none absolute -top-8 scale-95 rounded-md bg-black/80 px-2 py-1 text-xs text-white/80 opacity-0 shadow ring-1 ring-white/10 transition-all group-hover:opacity-100 group-hover:scale-100">
      {label}
    </span>
  </button>
);

const BottomBar: React.FC<Props> = ({ onOpen }) => {
  const items: Item[] = [
    { id: 'me', label: 'You' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'wallet', label: 'Leaf Wallet' }
  ];

  return (
    <>
      {/* Mobile: full-width bar; Desktop: centered pill */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 mb-2 grid place-items-center">
        <div className="pointer-events-auto flex items-center gap-6 rounded-2xl border border-white/10 bg-black/60 px-5 py-3 backdrop-blur supports-[backdrop-filter]:bg-black/40">
          {items.map(it => (
            <BarButton key={it.id} label={it.label} onClick={() => onOpen(it.id)}>
              <span className="text-sm font-semibold text-white/80">
                {it.id === 'me' ? '🙂' : it.id === 'notifications' ? '🔔' : '🍃'}
              </span>
            </BarButton>
          ))}
        </div>
      </div>
    </>
  );
};

export default BottomBar;