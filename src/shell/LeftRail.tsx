'use client';

import * as React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import type { NavItem } from './types';
import { ChevronLeft, ChevronRight } from './icons';

type Props = {
  items: NavItem[];
  initiallyCollapsed?: boolean;
};

const ringClass = 'ring-1 ring-white/10';
const hoverRow = 'hover:bg-white/5 transition';

const RailContext = React.createContext<{ collapsed: boolean }>({ collapsed: false });

function PlanetBadge({ abbr, gradient, solid }: { abbr: string; gradient?: string; solid?: string }) {
  return (
    <span
      className={clsx(
        'inline-flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-xs font-semibold text-black',
        gradient ? gradient : solid ? solid : 'bg-white',
        ringClass,
        // Give a subtle glossy planet feel
        'shadow-inner'
      )}
    >
      {abbr}
    </span>
  );
}

export default function LeftRail({ items, initiallyCollapsed = true }: Props) {
  const [collapsed, setCollapsed] = React.useState(initiallyCollapsed);
  const [openKey, setOpenKey] = React.useState<string | null>(null);

  const toggle = () => setCollapsed((c) => !c);
  const onOpen = (key: string) => setOpenKey((k) => (k === key ? null : key));

  return (
    <RailContext.Provider value={{ collapsed }}>
      <aside
        className={clsx(
          'relative h-full border-r border-white/10',
          collapsed ? 'w-16' : 'w-60',
          'transition-all duration-300 overflow-hidden'
        )}
      >
        {/* collapse/expand control */}
        <div className="flex h-12 items-center border-b border-white/10">
          <button
            className={clsx('mx-3 rounded-md px-2 py-1 text-sm bg-white/5 hover:bg-white/10', ringClass)}
            onClick={toggle}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand' : 'Collapse'}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
          {!collapsed && <div className="select-none text-sm text-white/70">Universes</div>}
        </div>

        {/* universes list */}
        <nav className="space-y-2 p-2">
          {items.map((it) => {
            const isOpen = openKey === it.key && !collapsed && it.children?.length;
            const ItemBody = (
              <div className={clsx('flex items-center gap-3 rounded-md px-2 py-2', hoverRow)}>
                <PlanetBadge abbr={it.abbr} gradient={it.gradient} solid={it.color} />
                {!collapsed && (
                  <div className="flex flex-1 items-center justify-between">
                    <span className="text-sm">{it.label}</span>
                    {it.children && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          onOpen(it.key);
                        }}
                        className="rounded px-1 text-white/70 hover:bg-white/10"
                        title={isOpen ? 'Hide' : 'Show'}
                      >
                        {isOpen ? '–' : '+'}
                      </button>
                    )}
                  </div>
                )}
              </div>
            );

            const linkProps = it.external ? { href: it.href, target: '_self' as const } : { href: it.href };

            return (
              <div key={it.key}>
                {/* main item */}
                {it.external ? (
                  <a {...(linkProps as any)} className={clsx('block rounded-md', ringClass)} title={collapsed ? it.label : undefined}>
                    {ItemBody}
                  </a>
                ) : (
                  <Link {...(linkProps as any)} className={clsx('block rounded-md', ringClass)} title={collapsed ? it.label : undefined}>
                    {ItemBody}
                  </Link>
                )}

                {/* children accordion */}
                {!collapsed && it.children?.length ? (
                  <div
                    className={clsx(
                      'grid overflow-hidden transition-[grid-template-rows] duration-300',
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    )}
                  >
                    <div className="min-h-0">
                      <ul className="ml-10 mt-1 space-y-1">
                        {it.children.map((c) => {
                          const child = (
                            <div className={clsx('rounded-md px-2 py-1.5 text-sm text-white/80', hoverRow, ringClass)}>{c.label}</div>
                          );
                          return (
                            <li key={c.href}>
                              {c.external ? (
                                <a href={c.href} target="_self" className="block">
                                  {child}
                                </a>
                              ) : (
                                <Link href={c.href} className="block">
                                  {child}
                                </Link>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>
      </aside>
    </RailContext.Provider>
  );
}