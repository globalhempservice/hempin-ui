'use client';
import React from 'react';

// Build-safe shell bits from compiled library
import { PanelProvider, ShellLayout } from '../../dist';

// Gate: welcome + sign-in/guest choice (hook-based, no provider)
import AuthGate from '@/auth/AuthGate';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      <PanelProvider>
        <ShellLayout>{children}</ShellLayout>
      </PanelProvider>
    </AuthGate>
  );
}