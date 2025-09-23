import * as React from 'react';
import Link from 'next/link';

export function BottomBar({
  items
}: {
  items: { href: string; label: string; icon?: React.ReactNode }[];
}) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/30 px-4 py-2 flex justify-around sm:hidden">
      {items.map(it => (
        <Link key={it.href} href={it.href} className="flex flex-col items-center text-xs gap-1">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 ring-1 ring-white/10">
            {it.icon ?? it.label[0]}
          </span>
          {it.label}
        </Link>
      ))}
    </nav>
  );
}