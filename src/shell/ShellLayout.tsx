'use client';

import * as React from 'react';
import { PanelProvider, usePanel } from './PanelContext';
import { SlidePanel } from './SlidePanel';
import { BottomSheet } from './BottomSheet';
import LeftRail from './LeftRail';
import BottomBar from './BottomBar';
import type { NavItem } from './types';

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
  { key: 'knowledge', label: 'Knowledge', abbr: 'KL', href: 'https://knowledge.hempin.org', external: true, color: 'bg-rose-400',
    children: [{ label: 'Browse articles', href: 'https://knowledge.hempin.org', external: true }] },
  { key: 'directory', label: 'Directory', abbr: 'DY', href: 'https://directory.hempin.org', external: true, color: 'bg-lime-400',
    children: [{ label: 'Find people/orgs', href: 'https://directory.hempin.org', external: true }] },
  { key: 'place', label: 'Place', abbr: 'PL', href: 'https://place.hempin.org', external: true, color: 'bg-cyan-400' },
  { key: 'fund', label: 'Fund', abbr: 'FD', href: 'https://fund.hempin.org', external: true, color: 'bg-purple-400' },
  { key: 'event', label: 'Event', abbr: 'EV', href: 'https://event.hempin.org', external: true, color: 'bg-pink-400' },
];

const SettingsPanel: React.FC = () => {
  const { close } = usePanel();
  return (
    <div className="h-full overflow-auto p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Settings</h2>
        <button onClick={close} className="rounded px-2 py-1 text-sm bg-white/10">Close</button>
      </div>
      <div className="mt-4 space-y-3">
        <div className="rounded-lg bg-white/5 p-3 ring-1 ring-white/10">Account</div>
        <div className="rounded-lg bg-white/5 p-3 ring-1 ring-white/10">Privacy</div>
        <div className="rounded-lg bg-white/5 p-3 ring-1 ring-white/10">Connections</div>
      </div>
    </div>
  );
};

// V1 admin chat (local-only stub)
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
    // pretend admin replies later; you can wire real API when ready
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'admin', text: 'Noted ✅ We will get back to you.' }]);
    }, 600);
  };

  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto]">
      <div className="flex items-center justify-between border-b border-white/10 p-3">
        <h2 className="text-lg font-semibold">Inbox — Admin</h2>
        <button onClick={close} className="rounded px-2 py-1 text-sm bg-white/10">Close</button>
      </div>

      <div className="overflow-auto p-3 space-y-2">
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

      <div className="border-t border-white/10 p-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full rounded-md bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-[var(--color-accent,theme(colors.emerald.400))]"
            placeholder="Write a message to admin…"
          />
          <button type="submit" className="rounded-md bg-white/10 px-3 text-sm ring-1 ring-white/10 hover:bg-white/15">
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
  const { current, close } = usePanel();
  const [bottomSheet, setBottomSheet] = React.useState<null | 'me' | 'notifications' | 'wallet'>(null);

  return (
    <div className="grid h-[100dvh] w-full grid-rows-[auto_1fr] bg-black text-white">
      <TopBar />
      <div className="grid h-full grid-cols-[auto_1fr]">
        <LeftRail items={universes} initiallyCollapsed={false} />
        <main className="relative overflow-auto pb-24 sm:pb-24">{children}</main>
      </div>

      <BottomBar onOpen={(id) => setBottomSheet(id)} />

      {/* Right slide-ins */}
      <SlidePanel open={current === 'settings'} onClose={close}><SettingsPanel /></SlidePanel>
      <SlidePanel open={current === 'inbox'} onClose={close}><InboxPanel /></SlidePanel>

      {/* Bottom sheets */}
      <BottomSheet open={bottomSheet === 'me'} onClose={() => setBottomSheet(null)}>
        <div className="space-y-3 text-sm">
          <div className="rounded-lg bg-white/5 p-3 ring-1 ring-white/10">Profile</div>
          <div className="rounded-lg bg-white/5 p-3 ring-1 ring-white/10">Status: Online</div>
          <div className="rounded-lg bg-white/5 p-3 ring-1 ring-white/10">Switch account</div>
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