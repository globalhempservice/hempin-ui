'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import type { NavItem } from './types';
import { ChevronLeft, ChevronRight } from './icons';

type Props = {
  items: NavItem[];
  initiallyCollapsed?: boolean;
};

const LS_KEY = 'leftrail:collapsed';
const ringClass = 'ring-1 ring-white/10';
const itemBase =
  'inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-xs font-semibold text-black';
const hoverRow = 'hover:bg-white/5 transition';

export default function LeftRail({ items, initiallyCollapsed = true }: Props) {
  const pathname = usePathname();

  // hydrate collapsed from localStorage
  const [collapsed, setCollapsed] = React.useState(initiallyCollapsed);
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw != null) setCollapsed(raw === '1');
    } catch {}
  }, []);
  React.useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, collapsed ? '1' : '0');
    } catch {}
  }, [collapsed]);

  const [openKey, setOpenKey] = React.useState<string | null>(null);
  const toggle = () => setCollapsed(c => !c);
  const onOpen = (key: string) => setOpenKey(k => (k === key ? null : key));

  // keyboard helpers
  const onItemKeyDown = (e: React.KeyboardEvent, it: NavItem) => {
    const hasChildren = !!(it.children && it.children.length);
    if (!hasChildren) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen(it.key);
    }
    if (e.key === 'ArrowRight') {
      if (openKey !== it.key) onOpen(it.key);
    }
    if (e.key === 'ArrowLeft') {
      if (openKey === it.key) onOpen(it.key); // close
    }
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    if (/^https?:\/\//.test(href)) return false; // external: not marked active
    return pathname === href || pathname?.startsWith(href + '/');
  };

  return (
    <aside
      className={clsx(
        // CHANGED: make the whole rail sticky & full viewport height, and flex so inner list can scroll
        'sticky top-0 h-[100dvh] border-r border-white/10',
        'flex flex-col', // allow header + scrollable body
        collapsed ? 'w-16' : 'w-60',
        'transition-all duration-300 overflow-hidden'
      )}
      aria-label="Left navigation"
    >
      {/* collapse/expand control (kept) */}
      <div className="h-12 border-b border-white/10 flex items-center bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/40">
        <button
          className={clsx(
            'mx-3 rounded-md px-2 py-1 text-sm',
            'bg-white/5 hover:bg-white/10',
            ringClass
          )}
          onClick={toggle}
          aria-expanded={!collapsed}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand' : 'Collapse'}
          type="button"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
        {!collapsed && <div className="text-sm text-white/70 select-none">Universes</div>}
      </div>

      {/* CHANGED: make the list area scroll independently */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <nav className="p-2 space-y-2">
          {items.map((it) => {
            const hasChildren = !!(it.children && it.children.length);
            const open = !!(openKey === it.key && !collapsed && hasChildren);
            const active = isActive(it.href);

            const badge = (
              <span className={clsx(itemBase, it.color, ringClass, 'text-black')}>
                {it.abbr}
              </span>
            );

            // CHANGED: row is now a button that toggles, not a link
            const RowButton = (
              <button
                type="button"
                onClick={() => hasChildren && onOpen(it.key)}
                onKeyDown={(e) => onItemKeyDown(e, it)}
                className={clsx('w-full text-left block rounded-md', ringClass)}
                title={collapsed ? it.label : undefined}
                aria-expanded={open}
                aria-controls={hasChildren ? `sect-${it.key}` : undefined}
              >
                <div
                  className={clsx(
                    'flex items-center gap-3 rounded-md px-2 py-2',
                    hoverRow,
                    active && 'bg-white/10 ring-1 ring-white/15'
                  )}
                >
                  {badge}
                  {!collapsed && (
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-sm">{it.label}</span>
                      {hasChildren && (
                        <span
                          className="rounded px-1 text-white/70 hover:bg-white/10"
                          aria-hidden="true"
                        >
                          {open ? '–' : '+'}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </button>
            );

            return (
              <div key={it.key}>
                {/* CHANGED: render the button (no navigation on main row) */}
                {RowButton}

                {/* children accordion */}
                {!collapsed && hasChildren ? (
                  <div
                    id={`sect-${it.key}`}
                    className={clsx(
                      'overflow-hidden transition-[grid-template-rows] duration-300 grid',
                      open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    )}
                    aria-hidden={!open}
                  >
                    <div className="min-h-0">
                      <ul className="mt-1 ml-10 space-y-1">
                        {it.href ? (
                          <li key={`open-${it.key}`}>
                            {/* keep your external behavior: target _self for universe homes */}
                            {it.external ? (
                              <a href={it.href} target="_self" className="block">
                                <div className={clsx('rounded-md px-2 py-1.5 text-sm text-white/90', hoverRow, ringClass)}>
                                  Open {it.label}
                                </div>
                              </a>
                            ) : (
                              <Link href={it.href} className="block">
                                <div className={clsx('rounded-md px-2 py-1.5 text-sm text-white/90', hoverRow, ringClass)}>
                                  Open {it.label}
                                </div>
                              </Link>
                            )}
                          </li>
                        ) : null}

                        {it.children!.map((c) => {
                          const child = (
                            <div
                              className={clsx(
                                'rounded-md px-2 py-1.5 text-sm text-white/80',
                                hoverRow,
                                ringClass
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
      </div>
    </aside>
  );
}