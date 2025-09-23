import * as React from 'react';
import Link from 'next/link';

export function LeftRail({
  items
}: {
  items: { href: string; label: string; icon?: React.ReactNode }[];
}) {
  return (
    <div className="hidden sm:flex sm:flex-col sm:w-14 sm:shrink-0 sm:items-center sm:gap-3 sm:py-3 border-r border-white/10 bg-black/40 backdrop-blur">
      {items.map((it) => (
        <Link key={it.href} href={it.href} className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10">
          {it.icon ?? <span className="text-xs">{it.label[0]}</span>}
        </Link>
      ))}
    </div>
  );
}