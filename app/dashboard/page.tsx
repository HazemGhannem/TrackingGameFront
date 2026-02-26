'use client';

import Navbar from '@/components/Navbar';
import HeroStats from '@/components/Herostats';
import LiveMatches from '@/components/LiveMatches';
import Leaderboard from '@/components/LeaderBoard';
import RecentResults from '@/components/ReachentResults';
import GameFilter from '@/components/GameFilter';
import { useState } from 'react';
import PlayerSearch from '@/components/playerSearch/PlayerSearch';

export default function HomePage() {
  const [activeGame, setActiveGame] = useState('all');

  return (
    <main className="min-h-screen bg-[#080A0F] text-white font-['Barlow',sans-serif]">
      <div className="max-w-[1400px] mx-auto px-6 pb-16">
        <HeroStats />
        <div className="mt-8">
          <PlayerSearch />
        </div>
        <GameFilter active={activeGame} onChange={setActiveGame} />
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 mt-8">
          <div className="flex flex-col gap-6">
            <LiveMatches activeGame={activeGame} />
            <RecentResults activeGame={activeGame} />
          </div>
          <Leaderboard />
        </div>
      </div>
    </main>
  );
}
