'use client'

import React from 'react'

type Props = {
  label: string
  children: React.ReactElement
  side?: 'top' | 'right' | 'bottom' | 'left'
  delay?: number
  className?: string
}

/**
 * A tiny, accessible tooltip:
 * - shows on hover OR keyboard focus
 * - announces via aria-describedby
 * - no portal; purely CSS positioned
 */
export function Tooltip({ label, children, side = 'right', delay = 120, className }: Props) {
  const [open, setOpen] = React.useState(false)
  const id = React.useId()

  const show = () => setOpen(true)
  const hide = () => setOpen(false)

  // Clone the trigger to attach a11y + events
  const trigger = React.cloneElement(children, {
    'aria-describedby': open ? id : undefined,
    onFocus: (e: React.FocusEvent) => {
      children.props.onFocus?.(e)
      setTimeout(show, delay)
    },
    onBlur: (e: React.FocusEvent) => {
      children.props.onBlur?.(e)
      hide()
    },
    onMouseEnter: (e: React.MouseEvent) => {
      children.props.onMouseEnter?.(e)
      setTimeout(show, delay)
    },
    onMouseLeave: (e: React.MouseEvent) => {
      children.props.onMouseLeave?.(e)
      hide()
    },
  })

  return (
    <span className="relative inline-flex">
      {trigger}
      <span
        id={id}
        role="tooltip"
        data-side={side}
        className={[
          'ui-tooltip pointer-events-none absolute z-50 rounded-md px-2 py-1 text-xs',
          'bg-black/80 text-white shadow-lg ring-1 ring-white/10',
          'opacity-0 translate-y-0 transition-opacity',
          open ? 'opacity-100' : 'opacity-0',
          className ?? '',
        ].join(' ')}
        style={{
          // simple side positioning
          top: side === 'bottom' ? 'calc(100% + 6px)' : side === 'top' ? 'auto' : '50%',
          bottom: side === 'top' ? 'calc(100% + 6px)' : 'auto',
          left: side === 'right' ? 'calc(100% + 8px)' : 'auto',
          right: side === 'left' ? 'calc(100% + 8px)' : 'auto',
          transform:
            side === 'right' || side === 'left' ? 'translateY(-50%)' : 'none',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </span>
  )
}