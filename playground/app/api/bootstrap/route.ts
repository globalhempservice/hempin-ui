// playground/app/api/bootstrap/route.ts
import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/auth/supabase/server';

export async function GET() {
  try {
    const supabase = createServerSupabase();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      return NextResponse.json(
        { ok: false as const, signedIn: false as const, error: error.message },
        { status: 200 }
      );
    }

    if (!user) {
      // not signed in
      const res = NextResponse.json({ ok: true as const, signedIn: false as const, user: null });
      res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
      res.headers.set('Pragma', 'no-cache');
      res.headers.set('Vary', 'Cookie');
      return res;
    }

    // signed in
    const res = NextResponse.json({
      ok: true as const,
      signedIn: true as const,
      user: { id: user.id, email: user.email },
    });
    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    res.headers.set('Pragma', 'no-cache');
    res.headers.set('Vary', 'Cookie');
    return res;
  } catch (e: any) {
    return NextResponse.json(
      { ok: false as const, signedIn: false as const, error: e?.message || 'bootstrap failed' },
      { status: 200 }
    );
  }
}