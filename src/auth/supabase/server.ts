// src/auth/supabase/server.ts
import { cookies } from 'next/headers';
import { createServerClient as createSsrClient, type CookieOptions } from '@supabase/ssr';

const PARENT_DOMAIN = process.env.NEXT_PUBLIC_COOKIE_PARENT ?? '.hempin.org';
const SUPABASE_URL =
  process.env.SUPABASE_URL || (process.env.NEXT_PUBLIC_SUPABASE_URL as string);
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY || (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string);

// In dev (localhost, preview), avoid SameSite=None+Secure which breaks on http.
// In prod, enforce cross-site, parent-domain cookies so session shares across *.hempin.org.
const isProd = process.env.NODE_ENV === 'production';

function withDefaults(opts?: Partial<CookieOptions>): CookieOptions {
  return isProd
    ? {
        domain: PARENT_DOMAIN,
        path: '/',
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        ...(opts || {}),
      }
    : {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        ...(opts || {}),
      };
}

/** Primary factory used by server components / route handlers */
export function createServerClientSupabase() {
  const store = cookies();

  return createSsrClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      get(name) {
        return store.get(name)?.value;
      },
      set(name, value, options) {
        store.set({ name, value, ...withDefaults(options) });
      },
      remove(name, options) {
        store.set({
          name,
          value: '',
          ...withDefaults({ ...(options || {}), expires: new Date(0) }),
        });
      },
    },
  });
}

/** Back-compat aliases so older imports won’t break */
export const createServerSupabase = createServerClientSupabase; // your previous name
export const createServerClient = createServerClientSupabase;   // wiki name