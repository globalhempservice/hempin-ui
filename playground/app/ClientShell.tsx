'use client';
import React from 'react';

// Build-safe shell bits from compiled library
import { PanelProvider, ShellLayout } from '../../dist';

// New shared session
import { SessionProvider } from '@/auth/SessionProvider';
// Keep your welcome/choice UI
import AuthGate from '@/auth/AuthGate';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthGate>
        <PanelProvider>
          <ShellLayout>{children}</ShellLayout>
        </PanelProvider>
      </AuthGate>
    </SessionProvider>
  );
}