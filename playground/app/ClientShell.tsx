'use client'

import React from 'react'
// In CI/Netlify: import the built library (../dist)
import { PanelProvider, ShellLayout } from '../../dist'

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <PanelProvider>
      <ShellLayout>{children}</ShellLayout>
    </PanelProvider>
  )
}