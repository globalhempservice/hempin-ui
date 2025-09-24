'use client';
import * as React from 'react';
import { PanelProvider, usePanel } from './PanelContext';
import { SlidePanel } from './SlidePanel';
import { BottomSheet } from './BottomSheet';
import LeftRail from './LeftRail';
import BottomBar from './BottomBar';
import type { NavItem } from './types';

const universes: NavItem[] = [
  { href: '/', label: 'Home', code: 'HM', colorClass: 'bg-emerald-500' },
  { href: '/notifications', label: 'Notifications', code: 'NF', colorClass: 'bg-cyan-400' },
  { href: '/you', label: 'You', code: 'YOU', colorClass: 'bg-indigo-400' },
  { href: '/market', label: 'Market', code: 'MK', colorClass: 'bg-amber-400' },
  { href: '/events', label: 'Events', code: 'EV', colorClass: 'bg-fuchsia-400' },
  { href: '/directory', label: 'Directory', code: 'DY', colorClass: 'bg-lime-400' },
  { href: '/knowledge', label: 'Knowledge', code: 'KL', colorClass: 'bg-rose-400' }
];

const SettingsPanel: React.FC = () => {
  const { close } = usePanel();
  return (
    <div className="h-full overflow-auto p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Settings</h2>
        <button onClick={close} className="rounded px-2 py-1 text-sm bg-white/10">
          Close
        </button>
      </div>
      <div className="mt-4 space-y-3">
        <div className="rounded-lg bg-white/5 p-3 ring-1 ring-white/10">Account</div>
        <div className="rounded-lg bg-white/5 p-3 ring-1 ring-white/10">Privacy</div>
        <div className="rounded-lg bg-white/5 p-3 ring-1 ring-white/10">Connections</div>
      </div>
    </div>
  );
};

const InboxPanel: React.FC = () => {
  const { close } = usePanel();
  return (
    <div className="h-full overflow-auto p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Inbox</h2>
        <button onClick={close} className="rounded px-2 py-1 text-sm bg-white/10">
          Close
        </button>
      </div>
      <div className="mt-4 space-y-3 text-sm text-white/70">
        <div className="rounded-lg bg-white/5 p-3 ring-1 ring-white/10">No messages yet.</div>
      </div>
    </div>
  );
};

const TopBar: React.FC = () => {
  const { toggle, current } = usePanel();
  return (
    <header className="sticky top-0 z-30 flex h-12 items-center justify-between border-b border-white/10 bg-black/40 px-3 backdrop-blur supports-[backdrop-filter]:bg-black/30">
      <div className="font-semibold">Hemp’in Playground</div>
      <div className="flex items-center gap-2">
        <button
          title="Inbox"
          onClick={() => toggle('inbox')}
          className="rounded-md bg-white/10 px-3 py-1 text-sm ring-1 ring-white/10 hover:bg-white/15"
        >
          📥
        </button>
        <button
          title="Settings"
          onClick={() => toggle('settings')}
          className="rounded-md bg-white/10 px-3 py-1 text-sm ring-1 ring-white/10 hover:bg-white/15"
        >
          ⚙️
        </button>
      </div>
    </header>
  );
};

export function ShellLayout({ children }: { children: React.ReactNode }) {
  const { current, close, open } = usePanel();
  const [bottomSheet, setBottomSheet] = React.useState<null | 'me' | 'notifications' | 'wallet'>(
    null
  );

  return (
    <div className="grid h-[100dvh] w-full grid-rows-[auto_1fr] bg-black text-white">
      <TopBar />
      <div className="grid h-full grid-cols-[auto_1fr]">
        <LeftRail items={universes} />
        <main className="relative overflow-auto pb-24 sm:pb-24">{children}</main>
      </div>

      <BottomBar onOpen={id => setBottomSheet(id)} />

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