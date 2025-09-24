'use client';
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItem } from './types';

type Props = {
  items: NavItem[];
};

const RailButton: React.FC<{
  active?: boolean;
  code?: string;
  colorClass?: string;
  label: string;
}> = ({ active, code, colorClass = 'bg-emerald-500', label }) => {
  return (
    <div
      className={[
        'mx-2 my-1 flex items-center gap-3 rounded-lg px-2 py-2',
        active ? 'bg-white/10 ring-1 ring-white/15' : 'hover:bg-white/5',
        'transition-colors',
        'group-aria-expanded:inline-flex'
      ].join(' ')}
    >
      <div
        className={[
          'grid h-8 w-8 place-items-center rounded-md text-xs font-semibold text-black',
          colorClass
        ].join(' ')}
      >
        {code ?? '??'}
      </div>
      {/* label shown when expanded */}
      <span className="hidden aria-expanded:inline-block text-sm text-white/80">
        {label}
      </span>
    </div>
  );
};

const ToggleChevron: React.FC<{ expanded: boolean }> = ({ expanded }) => (
  <svg
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d={expanded ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
  </svg>
);

/**
 * Collapsible left rail that is **always rendered** (mobile + desktop).
 * Width toggles between 64px and 240px. A small chevron hints interactivity.
 */
const LeftRail: React.FC<Props> = ({ items }) => {
  const pathname = usePathname();
  const [expanded, setExpanded] = React.useState(false);

  return (
    <aside
      aria-expanded={expanded}
      className={[
        'relative z-40 h-full border-r border-white/10 bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/30',
        'transition-[width] duration-300',
        expanded ? 'w-60' : 'w-16'
      ].join(' ')}
    >
      {/* header row */}
      <div className="flex h-12 items-center justify-between px-2">
        <div className="text-xs text-white/60 pl-1 hidden aria-expanded:block">
          Universes
        </div>
        <button
          aria-label={expanded ? 'Collapse' : 'Expand'}
          onClick={() => setExpanded(v => !v)}
          className="ml-auto rounded-md p-2 text-white/70 hover:bg-white/10"
          title={expanded ? 'Collapse' : 'Expand'}
        >
          <ToggleChevron expanded={expanded} />
        </button>
      </div>

      {/* nav */}
      <nav className="mt-1">
        {items.map(it => {
          const active = pathname === it.href;
          return (
            <Link key={it.href} href={it.href} className="block">
              <RailButton
                active={active}
                code={it.code}
                colorClass={it.colorClass}
                label={it.label}
              />
            </Link>
          );
        })}
      </nav>

      {/* footer token */}
      <div className="absolute inset-x-0 bottom-2 grid place-items-center">
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-400 opacity-80" />
      </div>
    </aside>
  );
};

export default LeftRail;