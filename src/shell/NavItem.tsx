'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Tooltip } from '../components/Tooltip'
import clsx from 'clsx'
import React from 'react'

type Props = {
  href: string
  label: string
  icon?: React.ReactNode
  layout?: 'rail' | 'tab'
}

export function NavItem({ href, label, icon, layout = 'rail' }: Props) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(href + '/')

  const base =
    layout === 'rail'
      ? 'nav-rail-item'
      : 'nav-tab-item'

  return (
    <Tooltip label={label} side={layout === 'rail' ? 'right' : 'top'}>
      <Link
        href={href}
        className={clsx(base, isActive && 'is-active')}
        aria-current={isActive ? 'page' : undefined}
      >
        {icon ? <span className="shrink-0">{icon}</span> : null}
        {layout === 'tab' ? <span className="ml-2">{label}</span> : null}
      </Link>
    </Tooltip>
  )
}