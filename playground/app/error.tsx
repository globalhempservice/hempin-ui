'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Helpful for debugging in dev / build logs
    console.error(error);
  }, [error]);

  return (
    <html>
      <body className="min-h-[100dvh] grid place-items-center bg-black text-white">
        <div className="rounded-lg bg-white/5 p-6 ring-1 ring-white/10 max-w-md">
          <h1 className="text-2xl font-semibold">Something went wrong</h1>
          <p className="text-white/70 mt-2 text-sm">
            {error.message || 'Unknown error'}
          </p>
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => reset()}
              className="rounded-md bg-white/10 px-3 py-2 ring-1 ring-white/15 hover:bg-white/10/80 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            >
              Try again
            </button>
            <a
              href="/"
              className="rounded-md bg-white/10 px-3 py-2 ring-1 ring-white/15 hover:bg-white/10/80 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            >
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}