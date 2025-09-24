'use client';

import React, {
  createContext, useCallback, useContext, useMemo, useState, type ReactNode,
} from 'react';

export type PanelKey = 'settings' | 'inbox' | string | null;

export type PanelAPI = {
  open: boolean;
  setOpen: (v: boolean) => void;

  /** we manage a stack of panel keys */
  stack: string[];
  current: PanelKey;

  push: (key: string) => void;
  pop: () => void;

  close: () => void;
  toggle: (key?: string) => void;
};

const Ctx = createContext<PanelAPI | null>(null);

export function PanelProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [stack, setStack] = useState<string[]>([]);

  const push = useCallback((key: string) => {
    setStack((s) => [...s, key]);
    setOpen(true);
  }, []);

  const pop = useCallback(() => {
    setStack((s) => {
      const next = s.slice(0, -1);
      if (next.length === 0) setOpen(false);
      return next;
    });
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setStack([]);
  }, []);

  const toggle = useCallback((key?: string) => {
    setOpen((o) => {
      if (!o && key) setStack([key]); // opening: seed with the key
      if (o) setStack([]);            // closing: clear stack
      return !o;
    });
  }, []);

  const current = stack.length ? stack[stack.length - 1] : null;

  const value = useMemo<PanelAPI>(
    () => ({ open, setOpen, stack, current, push, pop, close, toggle }),
    [open, stack, current, push, pop, close, toggle]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePanel() {
  const v = useContext(Ctx);
  if (!v) throw new Error('usePanel must be used within <PanelProvider>');
  return v;
}