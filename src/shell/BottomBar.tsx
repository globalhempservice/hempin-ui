'use client';

import * as React from 'react';
import clsx from 'clsx';
import Tooltip from '../components/Tooltip';

type BottomId = 'me' | 'notifications' | 'wallet';
export default function BottomBar({ onOpen }: { onOpen: (id: BottomId) => void }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
      <div className="pointer-events-auto mx-auto w-full sm:max-w-md sm:pb-4">
        <div
          className={clsx(
            'mx-2 mb-2 flex h-12 items-center justify-around rounded-xl border border-white/10',
            'bg-zinc-900/95 backdrop-blur'
          )}
        >
          <Tooltip content="Me">
            <button
              onClick={() => onOpen('me')}
              className="rounded-md p-2 hover:bg-white/10"
              aria-label="Open profile"
            >
              👤
            </button>
          </Tooltip>
          <Tooltip content="Notifications">
            <button
              onClick={() => onOpen('notifications')}
              className="rounded-md p-2 hover:bg-white/10"
              aria-label="Open notifications"
            >
              🔔
            </button>
          </Tooltip>
          <Tooltip content="Leaf Wallet">
            <button
              onClick={() => onOpen('wallet')}
              className="rounded-md p-2 hover:bg-white/10"
              aria-label="Open wallet"
            >
              🍃
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}