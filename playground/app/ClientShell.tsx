'use client'
import React from 'react'
// Build-safe: import compiled library
import { PanelProvider, ShellLayout } from '../../dist'

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <PanelProvider>
      <ShellLayout>{children}</ShellLayout>
    </PanelProvider>
  )
}