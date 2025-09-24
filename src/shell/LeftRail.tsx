'use client';

import * as React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import type { NavItem } from './types';
import { ChevronLeft, ChevronRight } from './icons'; // if you don’t have these, replace with simple “<” “>”

type Props = {
  items: NavItem[];
  initiallyCollapsed?: boolean;
};

/** simple brand palette we can replace with your planet/gem colors later */
const ringClass = 'ring-1 ring-white/10';
const itemBase =
  'inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-xs font-semibold text-black';
const hoverRow = 'hover:bg-white/5 transition';

const RailContext = React.createContext<{ collapsed: boolean }>({ collapsed: false });

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
        <div className="h-12 border-b border-white/10 flex items-center">
          <button
            className={clsx(
              'mx-3 rounded-md px-2 py-1 text-sm',
              'bg-white/5 hover:bg-white/10', ringClass
            )}
            onClick={toggle}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand' : 'Collapse'}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
          {!collapsed && (
            <div className="text-sm text-white/70 select-none">Universes</div>
          )}
        </div>

        {/* universes list */}
        <nav className="p-2 space-y-2">
          {items.map((it) => {
            const isOpen = openKey === it.key && !collapsed && it.children?.length;
            const ItemBody = (
              <div
                className={clsx(
                  'flex items-center gap-3 rounded-md px-2 py-2', hoverRow
                )}
              >
                <span className={clsx(itemBase, it.color, ringClass, 'text-black')}>
                  {it.abbr}
                </span>
                {!collapsed && (
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-sm">{it.label}</span>
                    {it.children && (
                      <button
                        onClick={(e) => { e.preventDefault(); onOpen(it.key); }}
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

            const linkProps = it.external
              ? { href: it.href, target: '_self' as const } // open in same tab
              : { href: it.href };

            return (
              <div key={it.key}>
                {/* main item */}
                {it.external ? (
                  <a
                    {...(linkProps as any)}
                    className={clsx('block rounded-md', ringClass)}
                    title={collapsed ? it.label : undefined}
                  >
                    {ItemBody}
                  </a>
                ) : (
                  <Link
                    {...(linkProps as any)}
                    className={clsx('block rounded-md', ringClass)}
                    title={collapsed ? it.label : undefined}
                  >
                    {ItemBody}
                  </Link>
                )}

                {/* children accordion */}
                {!collapsed && it.children?.length ? (
                  <div
                    className={clsx(
                      'overflow-hidden transition-[grid-template-rows] duration-300 grid',
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    )}
                  >
                    <div className="min-h-0">
                      <ul className="mt-1 ml-10 space-y-1">
                        {it.children.map((c) => {
                          const child = (
                            <div
                              className={clsx(
                                'rounded-md px-2 py-1.5 text-sm text-white/80', hoverRow, ringClass
                              )}
                            >
                              {c.label}
                            </div>
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

        {/* NOTE: the previous floating blue orb has been removed */}
      </aside>
    </RailContext.Provider>
  );
}