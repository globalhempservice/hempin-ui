'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import GlowButton from '../../../src/components/GlowButton';
import { useAuth } from '../../src/auth/useAuth';
import { supabase } from '../../src/auth/supabaseClient';

function Card({ title, onClick }: { title: 'WORK' | 'LIFE'; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group w-full rounded-2xl border border-white/10 bg-white/5 p-5 text-left ring-1 ring-white/10 hover:bg-white/10"
    >
      <div className="mb-2 h-10 w-10 rounded-full bg-white/10 ring-1 ring-white/10" />
      <div className="text-2xl font-semibold">{title}</div>
      <div className="mt-1 text-sm text-white/60">
        {title === 'WORK' ? 'Manage brands, products, places.' : 'Shop, events, discover places.'}
      </div>
    </button>
  );
}

export default function Dimension() {
  const { user } = useAuth();
  const router = useRouter();

  const choose = async (dim: 'WORK' | 'LIFE') => {
    localStorage.setItem('last_dimension', dim);
    localStorage.setItem('welcome_seen', '1');
    if (user) {
      await supabase.from('profiles').upsert({ id: user.id, preferred_dimension: dim, welcome_seen: true });
    }
    router.replace(dim === 'WORK' ? '/work' : '/life');
  };

  return (
    <div className="mx-auto max-w-sm p-5 pt-12 text-white">
      <h1 className="mb-6 text-3xl font-semibold">Choose your dimension</h1>
      <div className="space-y-4">
        <Card title="LIFE" onClick={() => choose('LIFE')} />
        <Card title="WORK" onClick={() => choose('WORK')} />
      </div>
      <div className="mt-8 text-center">
        <GlowButton onClick={() => choose('LIFE')} className="w-full">Start with LIFE</GlowButton>
      </div>
    </div>
  );
}