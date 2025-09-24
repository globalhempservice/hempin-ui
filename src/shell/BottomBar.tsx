'use client'

import * as React from 'react';
import type { NavItem } from './types';

export type BottomBarProps = { items: NavItem[] };

export default function BottomBar() {
  return (
    <nav className="sm:hidden fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto max-w-screen-xl grid grid-cols-3">
        <NavItem href="/" label="Home" layout="tab" />
        <NavItem href="/notifications" label="Notifications" layout="tab" />
        <NavItem href="/you" label="You" layout="tab" />
      </div>
    </nav>
  )
}