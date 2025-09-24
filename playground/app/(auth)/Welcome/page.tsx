'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import GlowButton from '@/components/GlowButton';
import { useAuth } from '@/auth/useAuth';

export default function Welcome() {
  const { signInOtp } = useAuth();
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [sent, setSent] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  const send = async () => {
    setBusy(true);
    const { error } = await signInOtp(email.trim());
    setBusy(false);
    if (error) { setMessage(error); return; }
    setSent(true);
    setMessage('Check your email and open the link on this device.');
  };

  const guest = () => {
    localStorage.setItem('welcome_seen', '1');
    router.replace('/life');
  };

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-black text-white">
      {/* Orb backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-40
        [background:radial-gradient(closest-side,rgba(255,255,255,.25),transparent_70%),conic-gradient(from_120deg,rgba(16,185,129,.25),rgba(14,165,233,.2),rgba(217,70,239,.2),rgba(251,191,36,.2),rgba(16,185,129,.25))]"/>
      </div>

      <div className="mx-auto flex max-w-sm flex-col items-center gap-8 px-5 pt-16">
        <div className="text-center">
          <div className="text-3xl font-semibold">hempin</div>
          <div className="mt-1 text-sm text-white/60">Welcome to your LIFE & WORK</div>
        </div>

        {/* Big orb logo */}
        <div className="relative h-40 w-40 rounded-full ring-1 ring-white/15
            [background:radial-gradient(60%_60%_at_40%_30%,rgba(255,255,255,.9),rgba(255,255,255,.15)_60%,transparent_70%),conic-gradient(from_200deg,rgba(16,185,129,.35),rgba(14,165,233,.25),rgba(217,70,239,.25),rgba(251,191,36,.25),rgba(16,185,129,.35))]">
          <div className="absolute inset-0 animate-[spin_12s_linear_infinite] rounded-full mix-blend-overlay
              [background:conic-gradient(from_0deg,transparent,rgba(255,255,255,.12),transparent)]"/>
        </div>

        {/* Email OTP */}
        <div className="w-full space-y-2">
          <label className="block text-sm text-white/80">Continue with email</label>
          <input
            type="email"
            inputMode="email"
            autoCapitalize="none"
            placeholder="you@domain.com"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full rounded-xl bg-white/5 px-3 py-3 text-sm ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-emerald-400/70"
          />
          <GlowButton
            onClick={send}
            disabled={!email || busy}
            className="w-full"
            label="Send sign-in link"
          >
            {busy ? 'Sending…' : (sent ? 'Link sent ✓' : 'Send sign-in link')}
          </GlowButton>
          {message && <p className="text-center text-xs text-white/70">{message}</p>}
          <p className="text-center text-[11px] text-white/50">
            Tip: On iPhone home-screen PWAs, open the link in the same window for best results.  
          </p>
        </div>

        {/* Guest */}
        <button onClick={guest} className="text-sm text-white/80 underline underline-offset-4">
          Browse as guest (LIFE)
        </button>
      </div>
    </div>
  );
}