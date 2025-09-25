'use client';

import * as React from 'react';
import GlowButton from '@/components/GlowButton';
import { useAuth } from '@/auth/useAuth';

const WELCOME_KEY = 'hempin:welcome-seen';

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const boot = useAuth(); // { ok, signedIn, user } | null
  const [welcomeSeen, setWelcomeSeen] = React.useState(false);

  React.useEffect(() => {
    try {
      setWelcomeSeen(localStorage.getItem(WELCOME_KEY) === '1');
    } catch {}
  }, []);

  const continueAsGuest = () => {
    try {
      localStorage.setItem(WELCOME_KEY, '1');
    } catch {}
    setWelcomeSeen(true);
  };

  const signIn = () => {
    const origin =
      typeof window !== 'undefined'
        ? `${window.location.protocol}//${window.location.host}`
        : '/';
    window.location.href = `https://auth.hempin.org/login?next=${encodeURIComponent(origin)}`;
  };

  // Loading (bootstrap still fetching)
  if (boot === null) {
    return (
      <div className="grid min-h-[100dvh] place-items-center bg-black text-white">
        <div className="animate-pulse text-white/70">Loading…</div>
      </div>
    );
  }

  // Not signed in + hasn’t seen welcome → show welcome
  if (boot.ok && !boot.signedIn && !welcomeSeen) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-black text-white p-6">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-gradient-to-br from-emerald-500/70 via-sky-500/60 to-fuchsia-500/60 blur-md" />
          <h1 className="text-2xl font-semibold">Welcome to Hemp’in</h1>
          <p className="mt-2 text-white/70">Choose your starting dimension.</p>
        </div>
        <div className="flex w-full max-w-sm flex-col gap-3">
          <GlowButton onClick={continueAsGuest} aria-label="Continue in LIFE">
            Continue in LIFE (guest)
          </GlowButton>
          <button
            onClick={signIn}
            className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm hover:bg-white/15"
          >
            Sign in to WORK
          </button>
        </div>
      </div>
    );
  }

  // App unlocked
  return <>{children}</>;
}