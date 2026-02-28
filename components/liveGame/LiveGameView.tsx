import { Eye } from 'lucide-react';
import { DDragon } from '../constants/liveGameConstant';
import { GameStartNotification } from '@/types/type';

export default function LiveGameCard({
  game,
  onViewTeams,
}: {
  game: GameStartNotification;
  onViewTeams?: () => void;
}) {
  const { playerName, championName, gameMode, gameStartTime, teams } = game;
  const elapsed = Math.floor((Date.now() - gameStartTime) / 60000);

  const bluePreview = teams.blue.slice(0, 5);
  const redPreview = teams.red.slice(0, 5);

  return (
    <div className="group relative rounded-2xl border border-[#1A2030] bg-[#0D1017] overflow-hidden hover:border-[rgba(255,59,92,0.2)] transition-all duration-300">
      {/* Live pulse bar */}
      <div className="h-[2px] bg-gradient-to-r from-[#FF3B5C] to-[#FF3B5C44]" />

      <div className="p-4 flex flex-col gap-3">
        {/* Player + champion */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden border border-[rgba(255,59,92,0.2)] shrink-0">
            <img
              src={DDragon.championIcon(championName)}
              alt={championName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-condensed font-700 text-white text-sm truncate">
              {playerName}
            </p>
            <p className="text-[#5A6478] text-xs font-condensed">
              {championName} · {gameMode}
            </p>
          </div>
          {/* Elapsed time */}
          <div className="shrink-0 text-right">
            <p className="text-[#FF3B5C] font-condensed font-700 text-xs">
              {elapsed}m
            </p>
            <p className="text-[#3A4155] text-[10px] font-condensed">elapsed</p>
          </div>
        </div>

        <div className="h-px bg-[#1A2030]" />

        {/* Team champion previews */}
        <div className="flex items-center justify-between">
          {/* Blue team */}
          <div className="flex items-center gap-1">
            {bluePreview.map((p, i) => (
              <div
                key={p.puuid ?? p.championName ?? i}
                className="w-7 h-7 rounded-lg overflow-hidden border border-[rgba(91,141,217,0.3)]"
                title={p.championName}
              >
                <img
                  src={DDragon.championIcon(p.championName)}
                  alt={p.championName}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <span className="text-[#3A4155] text-[10px] font-condensed font-700">
            VS
          </span>

          {/* Red team */}
          <div className="flex items-center gap-1">
            {redPreview.map((p) => (
              <div
                key={p.puuid}
                className="w-7 h-7 rounded-lg overflow-hidden border border-[rgba(217,91,91,0.3)]"
                title={p.championName}
              >
                <img
                  src={DDragon.championIcon(p.championName)}
                  alt={p.championName}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* View teams button */}
        <button
          onClick={onViewTeams}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-[#1A2030] hover:border-[rgba(255,59,92,0.3)] hover:bg-[rgba(255,59,92,0.05)] text-[#5A6478] hover:text-white text-xs font-condensed font-700 transition-all cursor-pointer"
        >
          <Eye size={12} />
          View full teams
        </button>
      </div>
    </div>
  );
}
