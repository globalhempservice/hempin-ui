import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/auth/supabase/server';

export async function GET() {
  try {
    const supabase = createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    const body = user
      ? { ok: true as const, signedIn: true as const, user: { id: user.id, email: user.email } }
      : { ok: true as const, signedIn: false as const, user: null };

    const res = NextResponse.json(body);
    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    res.headers.set('Pragma', 'no-cache');
    res.headers.set('Vary', 'Cookie');
    return res;
  } catch (e: any) {
    return NextResponse.json({ ok: false, signedIn: false, error: e?.message }, { status: 500 });
  }
}