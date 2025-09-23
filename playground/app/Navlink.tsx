// playground/app/NavLink.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

export default function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const active = pathname === href
  return (
    <Link
      href={href}
      className={clsx(
        'inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10',
        active && 'bg-[var(--color-accent)] text-black'
      )}
    >
      {children}
    </Link>
  )
}