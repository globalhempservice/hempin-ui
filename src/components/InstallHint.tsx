'use client';

import * as React from 'react';

export default function InstallHint() {
  const [deferred, setDeferred] = React.useState<any>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onPrompt = (e: any) => {
      e.preventDefault();
      setDeferred(e);
      setVisible(true);
    };
    window.addEventListener('beforeinstallprompt', onPrompt as any);
    return () => window.removeEventListener('beforeinstallprompt', onPrompt as any);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-16 z-40 mx-auto w-[92%] max-w-md rounded-xl border border-white/10 bg-black/70 p-3 text-sm text-white/90 backdrop-blur">
      <div className="flex items-center justify-between gap-3">
        <div>Install Hemp’in for a faster, app-like experience.</div>
        <div className="flex gap-2">
          <button
            onClick={() => setVisible(false)}
            className="rounded-md bg-white/10 px-3 py-1.5 hover:bg-white/15"
          >
            Later
          </button>
          <button
            onClick={async () => {
              if (!deferred) return;
              // Show prompt
              deferred.prompt();
              await deferred.userChoice;
              setDeferred(null);
              setVisible(false);
            }}
            className="rounded-md bg-white px-3 py-1.5 font-semibold text-black"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
}