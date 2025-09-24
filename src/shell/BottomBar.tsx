'use client';

import * as React from 'react';
import { NavItem } from './types';

type BottomBarProps = {
  items: NavItem[];
};

export default function BottomBar({ items }: BottomBarProps) {
  return (
    <nav className="sm:hidden fixed bottom-0 inset-x-0 z-50 border-t border-white/15 bg-zinc-900/95 backdrop-blur">
      <ul className="grid grid-cols-[auto_1fr] place-items-center px-4 py-2 w-[88%] mx-auto">
        {items.map((it) => (
          <li key={it.href} className="w-full">
            <a
              href={it.href}
              className="w-full inline-flex items-center justify-center px-3 py-2 rounded-md text-sm text-white/80 hover:bg-white/10"
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}