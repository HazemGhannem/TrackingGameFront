'use client';

import Link from 'next/link';
import { Trophy, ArrowLeft } from 'lucide-react';

export default function TournamentsComingSoon() {
  return (
    <main className="min-h-screen bg-[#080A0F] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#111520] border border-[#1A2030] flex items-center justify-center mb-6">
        <Trophy className="w-8 h-8 text-[#00E5FF]" />
      </div>

      <span className="text-[#00E5FF] text-xs font-bold uppercase tracking-widest mb-3">
        Coming Soon
      </span>

      <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-3">
        Tournaments
      </h1>

      <p className="text-[#5A6478] text-sm sm:text-base max-w-sm mb-8">
        We're working on it. Tournaments will be available soon.
      </p>

      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-[#5A6478] hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>
    </main>
  );
}
