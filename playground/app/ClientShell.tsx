// playground/app/ClientShell.tsx
'use client'

import React from 'react'
// IMPORTANT: import from source, not from dist
import { PanelProvider, ShellLayout } from '../../src'

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <PanelProvider>
      <ShellLayout>{children}</ShellLayout>
    </PanelProvider>
  )
}