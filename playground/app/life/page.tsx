'use client';

import * as React from 'react';
import Link from 'next/link';
import { LIFE } from '@/life/config';
import InstallHint from '@/components/InstallHint';

export default function LifeTeaser() {
  return (
    <div className="relative min-h-[100dvh] bg-black text-white">
      {/* ambient auras */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(600px 360px at 20% 10%, rgba(16,185,129,.18), transparent 60%),' +
            'radial-gradient(600px 360px at 80% 20%, rgba(14,165,233,.15), transparent 60%),' +
            'radial-gradient(700px 420px at 50% 110%, rgba(217,70,239,.12), transparent 65%)',
        }}
      />

      <main className="mx-auto w-full max-w-2xl px-5 pb-28 pt-16 sm:pt-24">
        {/* Hero */}
        <div className="text-center">
          <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-gradient-to-br from-emerald-500/70 via-sky-500/60 to-fuchsia-500/60 blur-md" />
          <p className="text-sm uppercase tracking-wide text-white/60">{LIFE.heroKicker}</p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{LIFE.heroTitle}</h1>
          <p className="mx-auto mt-3 max-w-lg text-white/70">{LIFE.heroSub}</p>

          {/* CTAs */}
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={LIFE.ctas.market.href}
              className="w-full max-w-xs rounded-xl bg-white px-4 py-3 text-center font-semibold text-black ring-1 ring-white/20 hover:opacity-95"
            >
              {LIFE.ctas.market.label}
            </a>
            <a
              href={LIFE.ctas.fund.href}
              className="w-full max-w-xs rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-center text-sm hover:bg-white/15"
            >
              {LIFE.ctas.fund.label}
            </a>
          </div>
        </div>

        {/* Bullets */}
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {LIFE.bullets.map((b) => (
            <li
              key={b.title}
              className="rounded-lg border border-white/10 bg-white/5 p-4 ring-1 ring-white/10"
            >
              <div className="text-sm font-semibold">{b.title}</div>
              <div className="mt-1 text-sm text-white/70">{b.sub}</div>
            </li>
          ))}
        </ul>

        {/* Coming soon block */}
        <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm font-semibold">Coming soon</div>
          <p className="mt-1 text-sm text-white/70">
            Leaf XP mini-games, featured brand drops, community quests, and IRL events.
          </p>
          <div className="mt-3 text-xs text-white/50">
            Tip: install Hemp’in from your browser menu for a smoother experience.
          </div>
        </div>

        {/* back to WORK */}
        <div className="mt-10 text-center">
          <Link href="/" className="text-sm text-white/70 underline-offset-4 hover:underline">
            Switch to WORK →
          </Link>
        </div>
      </main>

      <InstallHint />
    </div>
  );
}