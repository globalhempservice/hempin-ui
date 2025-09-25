'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { PanelProvider, usePanel } from './PanelContext';
import { SlidePanel } from './SlidePanel';
import { BottomSheet } from './BottomSheet';
import LeftRail from './LeftRail';
import BottomBar from './BottomBar';
import GlowButton from '../components/GlowButton';
import type { NavItem } from './types';
import clsx from 'clsx';

// session (for WORK/LIFE)
import { useSession } from '@/auth/SessionProvider';

const universes: NavItem[] = [
  {
    key: 'market',
    label: 'Market',
    abbr: 'MK',
    href: 'https://market.hempin.org',
    external: true,
    color: 'bg-amber-400',
    children: [
      { label: 'Go shopping',     href: 'https://market.hempin.org',          external: true },
      { label: 'Manage my brand', href: 'https://market.hempin.org/brand',    external: true },
      { label: 'Manage products', href: 'https://market.hempin.org/products', external: true },
      { label: 'Send an RFP',     href: 'https://market.hempin.org/rfp',      external: true },
    ],
  },
  {
    key: 'knowledge',
    label: 'Knowledge',
    abbr: 'KL',
    href: 'https://knowledge.hempin.org',
    external: true,
    color: 'bg-rose-400',
    children: [{ label: 'Browse articles', href: 'https://knowledge.hempin.org', external: true }],
  },
  {
    key: 'directory',
    label: 'Directory',
    abbr: 'DY',
    href: 'https://directory.hempin.org',
    external: true,
    color: 'bg-lime-400',
    children: [{ label: 'Find people/orgs', href: 'https://directory.hempin.org', external: true }],
  },
  { key: 'place', label: 'Place', abbr: 'PL', href: 'https://place.hempin.org', external: true, color: 'bg-cyan-400' },
  { key: 'fund',  label: 'Fund',  abbr: 'FD', href: 'https://fund.hempin.org',  external: true, color: 'bg-purple-400' },
  { key: 'event', label: 'Event', abbr: 'EV', href: 'https://event.hempin.org', external: true, color: 'bg-pink-400' },
];

const SettingsPanel: React.FC = () => {
  const { close } = usePanel();
  return (
    <div className="grid h-full grid-rows-[auto_1fr]">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-black/60 px-3 py-2 backdrop-blur">
        <h2 className="text-lg font-semibold">Settings</h2>
        <button onClick={close} className="rounded px-2 py-1 text-sm bg-white/10">Close</button>
      </div>
      <div className="min-h-0 overflow-y-auto p-4 space-y-3">
        <div className="rounded-lg bg-white/5 p-3 ring-1 ring-white/10">Account</div>
        <div className="rounded-lg bg-white/5 p-3 ring-1 ring-white/10">Privacy</div>
        <div className="rounded-lg bg-white/5 p-3 ring-1 ring-white/10">Connections</div>

        {/* Divider */}
        <div className="my-4 border-t border-white/10" />

        {/* Logout */}
        <div className="sticky bottom-0 -mx-4 bg-neutral-900/95 backdrop-blur px-4 pb-4 pt-3">
          <a
            href="/logout"
            className="block w-full rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-center font-medium text-red-300 hover:bg-red-500/15 focus:outline-none focus:ring-2 focus:ring-red-400/40"
          >
            Log out
          </a>
          <p className="mt-2 text-center text-xs text-white/50">
            You’ll be signed out of Hemp’in on this device.
          </p>
        </div>
      </div>
    </div>
  );
};

/** V1 admin chat (local-only stub) */
const InboxPanel: React.FC = () => {
  const { close } = usePanel();
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState<Array<{ from: 'me' | 'admin'; text: string }>>([
    { from: 'admin', text: 'Hi! This is Hempin admin. How can we help?' },
  ]);

  const send = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { from: 'me', text: trimmed }]);
    setInput('');
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'admin', text: 'Noted ✅ We will get back to you.' }]);
    }, 600);
  };

  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto]">
      {/* header (sticky) */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-black/60 px-3 py-2 backdrop-blur">
        <h2 className="text-lg font-semibold">Inbox — Admin</h2>
        <button onClick={close} className="rounded px-2 py-1 text-sm bg-white/10">Close</button>
      </div>

      {/* messages */}
      <div className="min-h-0 overflow-y-auto overscroll-contain p-3 space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={clsx(
              'max-w-[85%] rounded-lg p-2 text-sm',
              m.from === 'me'
                ? 'ml-auto bg-white/10 ring-1 ring-white/15'
                : 'mr-auto bg-white/5 ring-1 ring-white/10'
            )}
          >
            {m.text}
          </div>
        ))}
      </div>

      {/* input bar (sticky + keyboard-aware via SlidePanel) */}
      <div className="sticky bottom-0 border-t border-white/10 bg-black/60 backdrop-blur p-2">
        <form
          onSubmit={(e) => { e.preventDefault(); send(); }}
          className="flex min-w-0 gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-w-0 w-full rounded-md bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-[var(--color-accent,theme(colors.emerald.400))]"
            placeholder="Write a message to admin…"
          />
          <button
            type="submit"
            className="shrink-0 rounded-md bg-white/10 px-3 text-sm ring-1 ring-white/10 hover:bg-white/15"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

const TopBar: React.FC = () => {
  const { toggle } = usePanel();
  return (
    <header className="sticky top-0 z-30 flex h-12 items-center justify-between border-b border-white/10 bg-black/40 px-3 backdrop-blur supports-[backdrop-filter]:bg-black/30">
      <div className="font-semibold">Hemp’in Playground</div>
      <div className="flex items-center gap-2">
        <button title="Inbox" onClick={() => toggle('inbox')} className="rounded-md bg-white/10 px-3 py-1 text-sm ring-1 ring-white/10 hover:bg-white/15">📥</button>
        <button title="Settings" onClick={() => toggle('settings')} className="rounded-md bg-white/10 px-3 py-1 text-sm ring-1 ring-white/10 hover:bg-white/15">⚙️</button>
      </div>
    </header>
  );
};

export function ShellLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { dimension, setDimension } = useSession();

  const { current, close } = usePanel();
  const [bottomSheet, setBottomSheet] = React.useState<null | 'me' | 'notifications' | 'wallet'>(null);

  const panelOpen = current === 'settings' || current === 'inbox';
  const sheetOpen = bottomSheet !== null;
  const overlaysOpen = panelOpen || sheetOpen;

  // Single source of truth: lock/unlock background scroll
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    if (overlaysOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = prev || '';
    return () => { document.body.style.overflow = prev || ''; };
  }, [overlaysOpen]);

  return (
    <div className="grid h-[100dvh] w-full grid-rows-[auto_1fr] bg-black text-white">
      <TopBar />

      {/* App content (inert while overlays are open) */}
      <div
        className="grid h-full grid-cols-[auto_1fr] overflow-hidden"
        {...(overlaysOpen ? ({ inert: '' as any } as any) : {})}
      >
        <LeftRail items={universes} initiallyCollapsed={false} />
        <main className="relative overflow-auto pb-24 sm:pb-24">{children}</main>
      </div>

      <BottomBar onOpen={(id) => setBottomSheet(id)} />

      {/* Right slide-ins */}
      <SlidePanel open={current === 'settings'} onClose={close}>
        <SettingsPanel />
      </SlidePanel>
      <SlidePanel open={current === 'inbox'} onClose={close}>
        <InboxPanel />
      </SlidePanel>

      {/* Bottom sheets */}
      <BottomSheet open={bottomSheet === 'me'} onClose={() => setBottomSheet(null)}>
        <div className="space-y-3 text-sm">
          <div className="rounded-lg bg-white/5 p-3 ring-1 ring-white/10">Profile</div>
          <div className="rounded-lg bg-white/5 p-3 ring-1 ring-white/10">
            Status: {dimension === 'WORK' ? 'Working' : 'Living'}
          </div>

          {/* Switch WORK <-> LIFE */}
          <GlowButton
            onClick={() => {
              const next = dimension === 'WORK' ? 'LIFE' : 'WORK';
              setDimension(next);
              setBottomSheet(null);
              if (next === 'LIFE') router.push('/life');
              else router.push('/');
            }}
            className="w-full"
          >
            Switch to {dimension === 'WORK' ? 'LIFE' : 'WORK'}
          </GlowButton>
        </div>
      </BottomSheet>

      <BottomSheet open={bottomSheet === 'notifications'} onClose={() => setBottomSheet(null)}>
        <div className="space-y-2 text-sm">
          <div className="text-white/70">No notifications.</div>
        </div>
      </BottomSheet>

      <BottomSheet open={bottomSheet === 'wallet'} onClose={() => setBottomSheet(null)}>
        <div className="space-y-3 text-sm">
          <div className="rounded-lg bg-white/5 p-3 ring-1 ring-white/10">Leaf Balance: 0</div>
          <div className="rounded-lg bg-white/5 p-3 ring-1 ring-white/10">Connect Wallet</div>
        </div>
      </BottomSheet>
    </div>
  );
}

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <PanelProvider>
      <ShellLayout>{children}</ShellLayout>
    </PanelProvider>
  );
}