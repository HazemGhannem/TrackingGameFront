 import LiveGameCard from './LiveGameView';
import { useLiveGames } from '@/hooks/useLiveGame';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import LiveGameModal from './LiveModal';
import { GameStartNotification } from '@/types/type';

export default function LiveMatches() {
  const { liveGamesList } = useLiveGames();
  const router = useRouter();
  const [modal, setModal] = useState<GameStartNotification | null>(null);

  const goMatch = () => {
    router.push(`/matches`);
  };
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#FF3B5C] live-dot" />
          <h2 className="font-condensed font-700 text-lg text-white tracking-wide">
            LIVE MATCHES
          </h2>
          <span className="px-2 py-0.5 bg-[rgba(255,59,92,0.15)] text-[#FF3B5C] text-xs font-condensed font-700 rounded-md border border-[rgba(255,59,92,0.2)]">
            {liveGamesList.length}
          </span>
        </div>
        <button
          className="text-[#5A6478] text-xs hover:text-[#00E5FF] transition-colors cursor-pointer flex items-center gap-1"
          onClick={goMatch}
        >
          See all
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {liveGamesList.slice(0, 4).map((game: any) => (
          <LiveGameCard
            key={game.playerId?._id}
            game={game}
            onViewTeams={() => setModal(game)}
          />
        ))}
        {modal && (
          <LiveGameModal notification={modal} onClose={() => setModal(null)} />
        )}
        {liveGamesList.length > 4 && (
          <button
            onClick={goMatch}
            className="mt-2 py-3 cursor-pointer rounded-xl border border-[#1A2030] text-[#5A6478] hover:text-white hover:border-[rgba(255,59,92,0.3)] hover:bg-[rgba(255,59,92,0.05)] transition-all text-sm font-condensed font-700"
          >
            +{liveGamesList.length - 4} more live matches — Check all
          </button>
        )}
        {liveGamesList.length === 0 && (
          <div className="card p-10 text-center">
            <p className="text-[#3A4155] font-condensed text-lg">
              No live matches for this game
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
