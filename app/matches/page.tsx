'use client';

import { useState } from 'react';
import { Radio } from 'lucide-react';
import { useLiveGames } from '@/hooks/useLiveGame';
import { GameStartNotification } from '@/types/type';
import LiveGameModal from '@/components/liveGame/LiveModal';
import LiveGameCard from '@/components/liveGame/LiveGameView';
import Pagination from '@/components/Pagination';

export default function LiveGamesSection() {
  const { liveGamesList, hasLiveGames, pagination, goToPage } = useLiveGames();
  const [modal, setModal] = useState<GameStartNotification | null>(null);
  return (
    <section className="m-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-1 h-5 rounded-full bg-[#FF3B5C]"
          style={{ boxShadow: '0 0 8px #FF3B5C' }}
        />
        <h2 className="font-condensed font-700 text-base text-white tracking-widest uppercase">
          Live Now
        </h2>
        {hasLiveGames && (
          <>
            {/* Pulsing live dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3B5C] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF3B5C]" />
            </span>
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[rgba(255,59,92,0.1)] border border-[rgba(255,59,92,0.2)] text-[#FF3B5C] font-condensed font-700 text-[10px]">
              {liveGamesList.length}
            </span>
          </>
        )}
      </div>

      {/* No live games */}
      {!hasLiveGames && (
        <div className="flex flex-col items-center justify-center py-12 rounded-2xl border border-[#1A2030] bg-[#0D1017]">
          <div className="w-12 h-12 rounded-2xl bg-[#161C28] border border-[#1A2030] flex items-center justify-center mb-3">
            <Radio size={20} className="text-[#2A3040]" />
          </div>
          <p className="font-condensed font-700 text-[#3A4155] text-sm tracking-wider">
            No live games right now
          </p>
          <p className="text-[#2A3040] text-xs font-condensed mt-1">
            You'll get notified when a tracked player starts a game
          </p>
        </div>
      )}

      {/* Live game cards */}
      {hasLiveGames && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {liveGamesList.map((game: any) => (
            <LiveGameCard
              key={game.playerId?._id}
              game={game}
              onViewTeams={() => setModal(game)}
            />
          ))}
        </div>
      )}
      <Pagination
        page={pagination.page}
        pages={pagination.pages}
        total={pagination.total}
        onPageChange={(p) => goToPage(p)}
      />

      {/* Modal */}
      {modal && (
        <LiveGameModal notification={modal} onClose={() => setModal(null)} />
      )}
    </section>
  );
}
