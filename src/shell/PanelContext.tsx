'use client';

import React, {
  createContext, useCallback, useContext, useMemo, useState, type ReactNode,
} from 'react';

export type PanelAPI = {
  open: boolean;
  setOpen: (v: boolean) => void;

  /** stack management */
  stack: ReactNode[];
  current: ReactNode | null;
  push: (node: ReactNode) => void;
  pop: () => void;

  /** convenience */
  close: () => void;
  toggle: (node?: ReactNode) => void;
};

const Ctx = createContext<PanelAPI | null>(null);

export function PanelProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [stack, setStack] = useState<ReactNode[]>([]);

  const push = useCallback((node: ReactNode) => {
    setStack(s => [...s, node]);
    setOpen(true);
  }, []);

  const pop = useCallback(() => {
    setStack(s => {
      const next = s.slice(0, -1);
      if (next.length === 0) setOpen(false);
      return next;
    });
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setStack([]);
  }, []);

  const toggle = useCallback((node?: ReactNode) => {
    setOpen(o => {
      if (!o && node) setStack(s => [...s, node]);
      if (o) setStack([]);
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