// playground/src/auth/SessionProvider.tsx
'use client';

import * as React from 'react';

type Dimension = 'WORK' | 'LIFE';

type Bootstrap =
  | { ok: true; signedIn: false; user: null }
  | { ok: true; signedIn: true; user: { id: string; email: string | null } }
  | { ok: false; signedIn: false; error: string };

type Ctx = {
  loading: boolean;
  signedIn: boolean;
  user: { id: string; email: string | null } | null;
  dimension: Dimension;
  setDimension: (d: Dimension) => void;
};

const SessionContext = React.createContext<Ctx | null>(null);
const DIM_KEY = 'hempin:dimension';

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [boot, setBoot] = React.useState<Bootstrap | null>(null);
  const [dimension, setDimension] = React.useState<Dimension>('WORK');

  // bootstrap auth (cookie-based; shared across subdomains)
  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/bootstrap', { cache: 'no-store', credentials: 'include' });
        const json = (await res.json()) as Bootstrap;
        if (mounted) setBoot(json);
      } catch (e: any) {
        if (mounted) setBoot({ ok: false, signedIn: false, error: e?.message || 'bootstrap failed' });
      }
    })();
    return () => { mounted = false; };
  }, []);

  // hydrate dimension from localStorage
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(DIM_KEY) as Dimension | null;
      if (saved === 'WORK' || saved === 'LIFE') setDimension(saved);
    } catch {}
  }, []);

  const setDim = React.useCallback((d: Dimension) => {
    setDimension(d);
    try { localStorage.setItem(DIM_KEY, d); } catch {}
  }, []);

  const loading = boot === null;
  const signedIn = !!(boot && boot.ok && boot.signedIn);
  const user = signedIn ? (boot as Extract<Bootstrap, { signedIn: true }>).user : null;

  const value: Ctx = { loading, signedIn, user, dimension, setDimension: setDim };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = React.useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within <SessionProvider>');
  return ctx;
}