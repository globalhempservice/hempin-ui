'use client'

import * as react from 'react';
import { NavItem } from './types';

export type LeftRailProps = { items: NavItem[] };

export default function LeftRail() {
  return (
    <aside className="fixed left-0 top-0 h-[100dvh] w-16 sm:w-14 z-40 grid grid-rows-[auto_1fr] border-r border-white/10 bg-zinc-900/95 backdrop-blur">
      <div className="p-3">
        <div className="text-white/70 text-sm font-semibold select-none">H</div>
      </div>

      <nav className="flex flex-col items-center gap-3 py-3">
        <NavItem href="/" label="Home" layout="rail" />
        <NavItem href="/notifications" label="Notifications" layout="rail" />
        <NavItem href="/you" label="You" layout="rail" />
      </nav>
    </aside>
  )
}