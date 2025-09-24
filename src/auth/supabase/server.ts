import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

const PARENT_DOMAIN = process.env.NEXT_PUBLIC_COOKIE_PARENT ?? '.hempin.org';

function withDefaults(opts?: Partial<CookieOptions>): CookieOptions {
  return {
    domain: PARENT_DOMAIN,
    path: '/',
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    ...(opts || {}),
  };
}

export function createServerSupabase() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.SUPABASE_URL || (process.env.NEXT_PUBLIC_SUPABASE_URL as string),
    process.env.SUPABASE_ANON_KEY || (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string),
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...withDefaults(options) });
        },
        remove(name, options) {
          cookieStore.set({
            name,
            value: '',
            ...withDefaults({ ...(options || {}), expires: new Date(0) }),
          });
        },
      },
    }
  );
}