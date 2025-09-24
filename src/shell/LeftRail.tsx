'use client';

import * as React from 'react';
import { NavItem } from './types';

type LeftRailProps = {
  items: NavItem[];
};

export default function LeftRail({ items }: LeftRailProps) {
  return (
    <aside className="hidden sm:flex sm:flex-col sm:w-14 sm:shrink-0 border-r border-white/15">
      <nav className="flex flex-col items-center gap-3 py-2">
        {items.map((it) => (
          <a
            key={it.href}
            href={it.href}
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg ring-1 ring-white/10 bg-white/5 text-white/80 hover:bg-white/10"
            aria-label={it.label}
            title={it.label}
          >
            {it.icon ?? <span className="text-xs">{it.label[0]}</span>}
          </a>
        ))}
      </nav>
    </aside>
  );
}