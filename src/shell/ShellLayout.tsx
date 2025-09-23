import * as React from 'react';
import { PanelProvider, usePanel } from './PanelContext';
import { SlidePanel } from './SlidePanel';
import LeftRail from './LeftRail';      // <-- default import
import BottomBar from './BottomBar';    // <-- default import

function SettingsPanel() { /* unchanged */ }

// ... TopBar unchanged ...

export function ShellLayout({ children }: { children: React.ReactNode }) {
  const { current, close } = usePanel();
  return (
    <div className="h-[100dvh] w-full grid grid-rows-[auto_1fr] bg-black text-white">
      <TopBar />
      <div className="grid grid-cols-[auto_1fr] h-full">
        <LeftRail items={[
          { href: '/', label: 'Home' },
          { href: '/notifications', label: 'Notifs' },
          { href: '/you', label: 'You' },
        ]} />
        <main className="relative overflow-auto pb-16 sm:pb-0">
          {children}
        </main>
      </div>

      <BottomBar items={[
        { href: '/', label: 'Home' },
        { href: '/notifications', label: 'Notifications' },
        { href: '/you', label: 'You' },
      ]} />

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