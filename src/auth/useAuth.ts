'use client';

import * as React from 'react';

type Boot =
  | { ok: true; signedIn: false; user: null }
  | { ok: true; signedIn: true; user: { id: string; email: string | null } }
  | { ok: false; signedIn: false; error: string };

export function useAuth() {
  const [boot, setBoot] = React.useState<Boot | null>(null);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/bootstrap', { cache: 'no-store', credentials: 'include' });
        const json = await res.json();
        if (mounted) setBoot(json);
      } catch (e: any) {
        if (mounted) setBoot({ ok: false, signedIn: false, error: e?.message || 'bootstrap failed' });
      }
    })();
    return () => { mounted = false; };
  }, []);

  return boot;
}