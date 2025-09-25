'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

// Build-safe shell bits from compiled library
import { PanelProvider, ShellLayout } from '../../dist';

// Session from app layer
import { SessionProvider, useSession } from '@/auth/SessionProvider';
import AuthGate from '@/auth/AuthGate';

function ShellWithSession({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { dimension, setDimension } = useSession();

  return (
    <PanelProvider>
      <ShellLayout
        dimension={dimension}
        onSwitchDimension={(next) => {
          setDimension(next);
          router.push(next === 'LIFE' ? '/life' : '/');
        }}
      >
        {children}
      </ShellLayout>
    </PanelProvider>
  );
}

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthGate>
        <PanelProvider>
        <ShellWithSession>{children}</ShellWithSession>
        </PanelProvider>
      </AuthGate>
    </SessionProvider>
  );
}