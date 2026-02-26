'use client';

import { X } from 'lucide-react';

interface RankedInfo {
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
}

interface PlayerCardProps {
  favId: string;
  playerId: string;
  gameName: string;
  tagLine: string;
  profileIconId: number;
  ranked?: RankedInfo;
  onRemove: (playerId: string) => void;
}

function rankMeta(lp: number) {
  if (lp >= 900) return { color: '#FFD700', label: 'S+' };
  if (lp >= 700) return { color: '#C0C0C0', label: 'S' };
  if (lp >= 500) return { color: '#CD7F32', label: 'A+' };
  if (lp >= 300) return { color: '#00E5FF', label: 'A' };
  return { color: '#8A94A8', label: 'B' };
}

export default function PlayerCard({
  favId,
  playerId,
  gameName,
  tagLine,
  profileIconId,
  ranked,
  onRemove,
}: PlayerCardProps) {
  const lp = ranked?.leaguePoints ?? 0;
  const { color, label } = rankMeta(lp);
  const tier = ranked?.tier ?? 'UNRANKED';
  const rank = ranked?.rank ?? '';
  const winRate = ranked
    ? Math.round((ranked.wins / (ranked.wins + ranked.losses)) * 100)
    : 0;

  return (
    <div className="group relative rounded-2xl border border-[#1A2030] bg-[#0D1017] overflow-hidden transition-all duration-300 hover:border-[rgba(0,229,255,0.15)] hover:-translate-y-0.5">
      {/* Colored left bar */}
      <div
        className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full"
        style={{ background: color, boxShadow: `0 0 8px ${color}80` }}
      />

      {/* Rank badge */}
      <div
        className="absolute top-3.5 right-10 px-2 py-0.5 rounded-md text-[10px] font-condensed font-700 tracking-wider"
        style={{
          background: `${color}15`,
          border: `1px solid ${color}30`,
          color,
        }}
      >
        {label}
      </div>

      {/* Remove button — passes playerId so the slice can filter correctly */}
      <button
        onClick={() => onRemove(playerId)}
        className="absolute top-3 right-3 w-6 h-6 rounded-lg border border-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 hover:!border-[rgba(255,59,92,0.35)] hover:bg-[rgba(255,59,92,0.08)] transition-all duration-200 cursor-pointer"
      >
        <X size={12} className="text-[#FF3B5C]" />
      </button>

      <div className="pl-5 pr-4 pt-4 pb-4 flex flex-col gap-3.5">
        {/* Avatar + name */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-[#161C28] border"
            style={{ borderColor: `${color}25` }}
          >
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/profileicon/${profileIconId}.png`}
              className="w-full h-full object-cover"
              alt={gameName}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <span className="font-condensed font-700 text-white text-[15px] truncate block">
              {gameName}
            </span>
            <span className="text-[#3A4155] text-[11px] font-condensed tracking-wider mt-0.5 block">
              #{tagLine}
            </span>
          </div>
        </div>

        <div className="h-px bg-[#1A2030]" />

        {/* Tier + LP */}
        <div className="flex items-center justify-between">
          <span
            className="font-condensed font-700 text-xs tracking-wider"
            style={{ color }}
          >
            {tier} {rank}
          </span>
          <span className="text-[#5A6478] text-[11px] font-condensed">
            {lp} LP
          </span>
        </div>

        {/* W/L bar */}
        {ranked && (
          <div className="flex items-center gap-2">
            <div className="flex-1 h-[3px] rounded-full bg-[#161C28] overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${winRate}%`,
                  background: 'linear-gradient(90deg, #00E676, #00E67688)',
                }}
              />
            </div>
            <span className="text-[11px] font-condensed text-[#5A6478] shrink-0">
              <span className="text-[#00E676]">{ranked.wins}W</span>
              {' / '}
              <span className="text-[#FF3B5C]">{ranked.losses}L</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
