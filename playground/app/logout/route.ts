// playground/app/logout/route.ts
import { redirect } from 'next/navigation';
import { createServerSupabase } from '@/auth/supabase/server';

export async function GET() {
  try {
    const supabase = createServerSupabase();
    await supabase.auth.signOut(); // clears the .hempin.org cookies via our custom cookie adapter
  } finally {
    // back to app root (or '/(auth)/Welcome' if you prefer)
    redirect('/');
  }
}