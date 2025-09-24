import * as React from 'react';
import { PanelProvider, usePanel } from './PanelContext';
import { SlidePanel } from './SlidePanel';
import LeftRail from './LeftRail';      // default import
import BottomBar from './BottomBar';    // default import

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

const TopBar: React.FC = () => {
  const { toggle, current } = usePanel();
  return (
    <header className="sticky top-0 z-30 h-12 border-b border-white/10 bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/30 flex items-center justify-between px-3">
      <div className="font-semibold">Hemp’in Playground</div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => toggle('settings')}
          className="rounded-md bg-white/10 px-3 py-1 text-sm ring-1 ring-white/10"
        >
          {current === 'settings' ? 'Close' : 'Settings'}
        </button>
      </div>
    </header>
  );
};

export function ShellLayout({ children }: { children: React.ReactNode }) {
  const { current, close } = usePanel();
  return (
    <div className="h-[100dvh] w-full grid grid-rows-[auto_1fr] bg-black text-white">
      <TopBar />
      <div className="grid grid-cols-[auto_1fr] h-full">
        <LeftRail
          items={[
            { href: '/', label: 'Home' },
            { href: '/notifications', label: 'Notifs' },
            { href: '/you', label: 'You' },
          ]}
        />
        <main className="relative overflow-auto pb-16 sm:pb-0">{children}</main>
      </div>

      <BottomBar
        items={[
          { href: '/', label: 'Home' },
          { href: '/notifications', label: 'Notifications' },
          { href: '/you', label: 'You' },
        ]}
      />

      <SlidePanel open={current === 'settings'} onClose={close}>
        <SettingsPanel />
      </SlidePanel>
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